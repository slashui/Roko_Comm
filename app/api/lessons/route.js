import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { NextResponse } from 'next/server'
import prisma from '../../../libs/prismadb'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const chapterId = searchParams.get('chapterId')
  
  // 如果有slug参数，返回MDX内容（保持原有功能）
  if (slug) {
    try {
      console.log('Attempting to read file from:', slug)
      const coursePath = join(process.cwd(), 'app/[locale]/(dashboard)/(route)/course', `${slug}/index.mdx`)
      console.log('Full path:', coursePath)
      
      const source = readFileSync(coursePath, 'utf8')
      console.log('File content loaded:', source.substring(0, 100))
      
      const { data: frontmatter, content } = matter(source)
      console.log('Parsed frontmatter:', frontmatter)
      
      const mdxSource = await serialize(content)
      console.log('Serialized content length:', mdxSource.length)
      
      return NextResponse.json({ 
        frontmatter, 
        content: mdxSource 
      }, {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('File reading error:', error)
      return NextResponse.json({ 
        error: 'Failed to load lesson',
        details: error.message,
        path: error.path
      }, { 
        status: 404 
      })
    }
  }
  
  // 如果有chapterId参数，获取章节的所有课时
  if (chapterId) {
    try {
      const lessons = await prisma.lesson.findMany({
        where: { chapterId },
        orderBy: { order: 'asc' },
        include: {
          chapter: true
        }
      })
      
      return NextResponse.json(lessons)
    } catch (error) {
      console.error('Error fetching lessons:', error)
      return NextResponse.json(
        { error: 'Failed to fetch lessons' },
        { status: 500 }
      )
    }
  }
  
  // 获取所有课时
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: [{ chapterId: 'asc' }, { order: 'asc' }],
      include: {
        chapter: {
          include: {
            course: true
          }
        }
      }
    })
    
    return NextResponse.json(lessons)
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    const lesson = await prisma.lesson.create({
      data: {
        title: data.title,
        duration: data.duration,
        url: data.url,
        previewUrl: data.previewUrl,
        isPreview: data.isPreview || false,
        requiredRole: data.requiredRole || 'FREE',
        videoUrl: data.videoUrl,
        order: data.order,
        chapterId: data.chapterId,
      }
    })
    
    return NextResponse.json(lesson, { status: 201 })
  } catch (error) {
    console.error('Error creating lesson:', error)
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    )
  }
}