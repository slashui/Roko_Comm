import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request) {
    try {
        const courseData = await request.json()

        if (!courseData) {
            return new NextResponse('Course data is required', { status: 400 })
        }

        // 构建course.json的文件路径
        const publicFilePath = path.join(process.cwd(), 'public', 'course.json')
        const libsFilePath = path.join(process.cwd(), 'libs', 'course.json')

        // 将数据写入两个位置的文件
        fs.writeFileSync(publicFilePath, JSON.stringify(courseData, null, 2), 'utf8')
        fs.writeFileSync(libsFilePath, JSON.stringify(courseData, null, 2), 'utf8')

        return NextResponse.json({
            success: true,
            message: 'Course data updated successfully'
        })

    } catch (error) {
        console.error('Update course error:', error)
        return new NextResponse(`Failed to update course data: ${error.message}`, { status: 500 })
    }
}