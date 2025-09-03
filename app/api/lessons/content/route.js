import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 })
    }

    // 构建MDX文件路径
    const mdxPath = path.join(process.cwd(), 'app', '[locale]', '(dashboard)', '(route)', 'course', slug, 'index.mdx')
    
    try {
      const content = await fs.readFile(mdxPath, 'utf8')
      return NextResponse.json({ content })
    } catch (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在，返回简化的空内容
        return NextResponse.json({ content: '欢迎学习本节课程！\n\n在这里编写课程内容...' })
      }
      throw error
    }
  } catch (error) {
    console.error('Error reading MDX file:', error)
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { slug, content } = await request.json()
    
    if (!slug || typeof content !== 'string') {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
    }

    // 构建MDX文件路径和目录
    const mdxDir = path.join(process.cwd(), 'app', '[locale]', '(dashboard)', '(route)', 'course', slug)
    const mdxPath = path.join(mdxDir, 'index.mdx')
    
    // 确保目录存在
    await fs.mkdir(mdxDir, { recursive: true })
    
    // 保存文件
    await fs.writeFile(mdxPath, content, 'utf8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving MDX file:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}