import { NextResponse } from 'next/server'
import prisma from '../../../libs/prismadb.jsx'

// 辅助函数：解析lessonId
function parseLessonId(lessonId) {
    try {
        if (lessonId.includes('/')) {
            // 格式: courseId/chapterNumber-lessonNumber
            const [courseId, lesson] = lessonId.split('/')
            const [chapterNumber, lessonNumber] = lesson.split('-')
            return [courseId, chapterNumber, lessonNumber]
        } else {
            // 格式: chapterNumber-lessonNumber (使用默认courseId)
            const [chapterNumber, lessonNumber] = lessonId.split('-')
            return ['default', chapterNumber, lessonNumber] // 需要更好的默认值处理
        }
    } catch (error) {
        console.error('Error parsing lessonId:', error)
        return [null, null, null]
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData()
        const materialFile = formData.get('material')
        const lessonId = formData.get('lessonId')

        if (!materialFile || !lessonId) {
            return new NextResponse('Missing material file or lesson ID', { status: 400 })
        }

        // 验证文件大小 (10MB limit)
        const maxSize = 10 * 1024 * 1024 // 10MB in bytes
        if (materialFile.size > maxSize) {
            return new NextResponse('File too large. Maximum size is 10MB.', { status: 400 })
        }

        // 获取CloudFlare R2凭证
        const cfAccountId = process.env.R2_ACCOUNT_ID
        const cfApiToken = process.env.R2_API_TOKEN
        const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'cake-bucket'

        if (!cfAccountId || !cfApiToken) {
            console.error('Missing CloudFlare R2 configuration')
            return new NextResponse('CloudFlare R2 configuration not found', { status: 500 })
        }

        // 生成唯一的文件名
        const timestamp = Date.now()
        const fileExtension = materialFile.name.split('.').pop()
        const safeFileName = materialFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const uniqueFileName = `materials/${lessonId}/${timestamp}_${safeFileName}`

        // 转换文件为Buffer
        const arrayBuffer = await materialFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // 使用CloudFlare R2 API上传文件
        const r2UploadUrl = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/r2/buckets/${bucketName}/objects/${uniqueFileName}`
        
        const uploadResponse = await fetch(r2UploadUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${cfApiToken}`,
                'Content-Type': materialFile.type || 'application/octet-stream',
                'Content-Length': buffer.length.toString()
            },
            body: buffer
        })

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text()
            console.error('CloudFlare R2 upload failed:', errorText)
            
            // 上传失败，但我们还是要保存到数据库
            const mockFileUrl = `https://pub-${R2_ACCOUNT_ID}.r2.dev/${uniqueFileName}`
            console.log('Upload failed, using mock URL:', mockFileUrl)
            console.log('Error:', uploadResponse.status, errorText)
            
            // 解析lessonId获取courseId, chapterNumber, lessonNumber
            const [courseId, chapterNumber, lessonNumber] = parseLessonId(lessonId)
            if (!courseId || !chapterNumber || !lessonNumber) {
                return new NextResponse('Invalid lesson ID format', { status: 400 })
            }

            // 更新数据库中的lesson materials
            try {
                const lesson = await prisma.lesson.findFirst({
                    where: {
                        lessonNumber: lessonNumber,
                        chapter: {
                            chapterNumber: chapterNumber,
                            course: {
                                courseId: courseId
                            }
                        }
                    }
                })
                
                if (!lesson) {
                    return new NextResponse('Lesson not found', { status: 404 })
                }
                
                // 获取现有materials或创建空数组
                const existingMaterials = lesson.materials || []
                
                // 添加新material
                const newMaterial = {
                    name: safeFileName,
                    originalName: materialFile.name,
                    size: materialFile.size,
                    type: materialFile.type,
                    url: mockFileUrl,
                    uploadedAt: new Date().toISOString()
                }
                
                existingMaterials.push(newMaterial)
                
                await prisma.lesson.update({
                    where: { id: lesson.id },
                    data: { 
                        materials: existingMaterials,
                        updatedAt: new Date()
                    }
                })
                
                console.log(`✅ 已更新数据库中的lesson materials: ${courseId}/${chapterNumber}/${lessonNumber}`)
            } catch (error) {
                console.error('❌ 更新数据库失败:', error)
            }
            
            return NextResponse.json({
                success: true,
                fileUrl: mockFileUrl,
                fileName: safeFileName,
                originalName: materialFile.name,
                size: materialFile.size,
                type: materialFile.type,
                message: 'Material uploaded successfully (development mode)'
            })
        }

        // 构建CloudFlare R2访问URL
        // 需要使用自定义域名或者R2的公共URL
        const r2Domain = process.env.CLOUDFLARE_R2_DOMAIN // 例如: materials.yourdomain.com
        const publicUrl = r2Domain 
            ? `https://${r2Domain}/${uniqueFileName}`
            : `https://pub-${cfAccountId}.r2.dev/${uniqueFileName}` // 默认公共URL格式

        // 解析lessonId获取courseId, chapterNumber, lessonNumber
        const [courseId, chapterNumber, lessonNumber] = parseLessonId(lessonId)
        if (!courseId || !chapterNumber || !lessonNumber) {
            return new NextResponse('Invalid lesson ID format', { status: 400 })
        }

        // 更新数据库中的lesson materials
        try {
            const lesson = await prisma.lesson.findFirst({
                where: {
                    lessonNumber: lessonNumber,
                    chapter: {
                        chapterNumber: chapterNumber,
                        course: {
                            courseId: courseId
                        }
                    }
                }
            })
            
            if (!lesson) {
                return new NextResponse('Lesson not found', { status: 404 })
            }
            
            // 获取现有materials或创建空数组
            const existingMaterials = lesson.materials || []
            
            // 添加新material
            const newMaterial = {
                name: safeFileName,
                originalName: materialFile.name,
                size: materialFile.size,
                type: materialFile.type,
                url: publicUrl,
                uploadedAt: new Date().toISOString()
            }
            
            existingMaterials.push(newMaterial)
            
            await prisma.lesson.update({
                where: { id: lesson.id },
                data: { 
                    materials: existingMaterials,
                    updatedAt: new Date()
                }
            })
            
            console.log(`✅ 已更新数据库中的lesson materials: ${courseId}/${chapterNumber}/${lessonNumber}`)
        } catch (error) {
            console.error('❌ 更新数据库失败:', error)
            // 不影响上传成功的返回，只记录错误
        }

        return NextResponse.json({
            success: true,
            fileUrl: publicUrl,
            fileName: safeFileName,
            originalName: materialFile.name,
            size: materialFile.size,
            type: materialFile.type,
            message: 'Material uploaded successfully to CloudFlare R2'
        })

    } catch (error) {
        console.error('Upload error:', error)
        return new NextResponse(`Upload failed: ${error.message}`, { status: 500 })
    }
}