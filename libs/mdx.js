import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function getLesson(slug) {
  const coursePath = join(process.cwd(), 'content/courses', `${slug}/index.mdx`)
  
  try {
    const source = readFileSync(coursePath, 'utf8')
    const { data: frontmatter, content } = matter(source)
    const mdxSource = await serialize(content)
    
    return {
      frontmatter,
      content: mdxSource
    }
  } catch (error) {
    throw new Error(`Failed to load lesson: ${slug}`)
  }
}