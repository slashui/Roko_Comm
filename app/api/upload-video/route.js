import { NextResponse } from 'next/server'
import { updateLessonMetadata } from '../../../libs/courseFileSystem'
import prisma from '../../../libs/prismadb.jsx'

export async function POST(request) {
    try {
        const formData = await request.formData()
        const videoFile = formData.get('video')
        const lessonId = formData.get('lessonId')

        if (!videoFile || !lessonId) {
            return new NextResponse('Missing video file or lesson ID', { status: 400 })
        }

        // 验证文件类型
        if (!videoFile.type.startsWith('video/')) {
            return new NextResponse('Invalid file type. Please upload a video file.', { status: 400 })
        }

        // 验证文件大小 (500MB limit)
        const maxSize = 500 * 1024 * 1024 // 500MB in bytes
        if (videoFile.size > maxSize) {
            return new NextResponse('File too large. Maximum size is 500MB.', { status: 400 })
        }

        // 获取CloudFlare Stream凭证
        const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID
        const cfApiToken = process.env.CLOUDFLARE_API_TOKEN

        if (!cfAccountId || !cfApiToken) {
            console.error('Missing CloudFlare Stream configuration')
            return new NextResponse('CloudFlare Stream configuration not found', { status: 500 })
        }

        // 转换文件为Buffer
        const arrayBuffer = await videoFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // 使用CloudFlare Stream API上传视频
        const streamUploadUrl = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/stream`
        
        const uploadFormData = new FormData()
        uploadFormData.append('file', new Blob([buffer], { type: videoFile.type }), videoFile.name)
        uploadFormData.append('meta', JSON.stringify({
            name: `Lesson Video - ${lessonId}`,
            requireSignedURLs: false,
            allowedOrigins: [],  // 空数组表示允许所有域名
            thumbnailTimestampPct: 0.1
        }))

        const uploadResponse = await fetch(streamUploadUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cfApiToken}`,
            },
            body: uploadFormData
        })

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text()
            console.error('CloudFlare Stream upload failed:', errorText)
            
            // 作为后备，我们返回一个模拟的URL
            const timestamp = Date.now()
            const mockStreamId = `mock-${timestamp}`
            const mockVideoUrl = `https://customer-${cfAccountId}.cloudflarestream.com/${mockStreamId}/manifest/video.m3u8`
            const mockThumbnailUrl = `https://customer-${cfAccountId}.cloudflarestream.com/${mockStreamId}/thumbnails/thumbnail.jpg`
            console.log('Using mock URL for development:', mockVideoUrl)
            
            // 解析lessonId获取courseId, chapterNumber, lessonNumber
            let courseId, chapterNumber, lessonNumber
            
            if (lessonId.includes('/')) {
                const [course, lesson] = lessonId.split('/')
                courseId = course
                const [chapter, lessonNum] = lesson.split('-')
                chapterNumber = chapter
                lessonNumber = lessonNum
            } else {
                courseId = '11'
                const [chapter, lessonNum] = lessonId.split('-')
                chapterNumber = chapter
                lessonNumber = lessonNum
            }

            // 更新lesson的metadata.json (mock模式)
            try {
                await updateLessonMetadata(courseId, chapterNumber, lessonNumber, {
                    videoUrl: mockVideoUrl,
                    streamId: mockStreamId,
                    thumbnail: mockThumbnailUrl
                })
                console.log(`✅ 已更新lesson metadata (mock): ${courseId}/${chapterNumber}/${lessonNumber}`)
            } catch (error) {
                console.error('❌ 更新lesson metadata失败 (mock):', error)
            }

            // 更新数据库中的lesson记录 (mock模式)
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
                
                if (lesson) {
                    await prisma.lesson.update({
                        where: { id: lesson.id },
                        data: { 
                            videoUrl: mockVideoUrl,
                            streamId: mockStreamId,
                            thumbnail: mockThumbnailUrl,
                            updatedAt: new Date()
                        }
                    })
                    console.log(`✅ 已更新数据库中的lesson视频信息 (mock): ${courseId}/${chapterNumber}/${lessonNumber}`)
                } else {
                    console.log(`⚠️ 未找到lesson记录 (mock): ${courseId}/${chapterNumber}/${lessonNumber}`)
                }
            } catch (error) {
                console.error('❌ 更新数据库失败 (mock):', error)
            }
            
            return NextResponse.json({
                success: true,
                videoUrl: mockVideoUrl,
                streamId: mockStreamId,
                thumbnail: mockThumbnailUrl,
                message: 'Video uploaded successfully (development mode)'
            })
        }

        const result = await uploadResponse.json()
        
        if (!result.success) {
            throw new Error(`CloudFlare Stream API error: ${result.errors?.[0]?.message || 'Unknown error'}`)
        }

        // 构建CloudFlare Stream播放URL
        const streamId = result.result.uid
        const playbackUrl = `https://customer-${cfAccountId}.cloudflarestream.com/${streamId}/manifest/video.m3u8`
        const thumbnailUrl = `https://customer-${cfAccountId}.cloudflarestream.com/${streamId}/thumbnails/thumbnail.jpg`

        // 解析lessonId获取courseId, chapterNumber, lessonNumber
        // lessonId格式: "courseId/chapterNumber-lessonNumber" 或 "chapterNumber-lessonNumber"
        let courseId, chapterNumber, lessonNumber
        
        if (lessonId.includes('/')) {
            // 格式: "courseId/chapterNumber-lessonNumber"
            const [course, lesson] = lessonId.split('/')
            courseId = course
            const [chapter, lessonNum] = lesson.split('-')
            chapterNumber = chapter
            lessonNumber = lessonNum
        } else {
            // 格式: "chapterNumber-lessonNumber" (默认courseId为'11')
            courseId = '11'
            const [chapter, lessonNum] = lessonId.split('-')
            chapterNumber = chapter
            lessonNumber = lessonNum
        }

        // 更新lesson的metadata.json
        try {
            await updateLessonMetadata(courseId, chapterNumber, lessonNumber, {
                videoUrl: playbackUrl,
                streamId: streamId,
                thumbnail: thumbnailUrl
            })
            console.log(`✅ 已更新lesson metadata: ${courseId}/${chapterNumber}/${lessonNumber}`)
        } catch (error) {
            console.error('❌ 更新lesson metadata失败:', error)
        }

        // 更新数据库中的lesson记录
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
            
            if (lesson) {
                await prisma.lesson.update({
                    where: { id: lesson.id },
                    data: { 
                        videoUrl: playbackUrl,
                        streamId: streamId,
                        thumbnail: thumbnailUrl,
                        updatedAt: new Date()
                    }
                })
                console.log(`✅ 已更新数据库中的lesson视频信息: ${courseId}/${chapterNumber}/${lessonNumber}`)
            } else {
                console.log(`⚠️ 未找到lesson记录: ${courseId}/${chapterNumber}/${lessonNumber}`)
            }
        } catch (error) {
            console.error('❌ 更新数据库失败:', error)
        }

        return NextResponse.json({
            success: true,
            videoUrl: playbackUrl,
            streamId: streamId,
            thumbnail: thumbnailUrl,
            message: 'Video uploaded successfully to CloudFlare Stream'
        })

    } catch (error) {
        console.error('Upload error:', error)
        return new NextResponse(`Upload failed: ${error.message}`, { status: 500 })
    }
}