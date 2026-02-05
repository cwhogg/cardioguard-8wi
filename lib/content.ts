import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

interface PostFrontmatter {
  title: string
  description: string
  date: string
  targetKeywords?: string[]
  ideaName?: string
  status?: string
  [key: string]: any
}

interface Post {
  slug: string
  title: string
  description: string
  type: string
  date: string
  content: string
  targetKeywords?: string[]
  ideaName?: string
  status?: string
  frontmatter: PostFrontmatter
}

const typeToDirectoryMap = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparison',
  'faq': 'content/faq'
}

export async function getAllPosts(type: keyof typeof typeToDirectoryMap): Promise<Post[]> {
  const contentDirectory = typeToDirectoryMap[type]
  
  try {
    if (!fs.existsSync(contentDirectory)) {
      return []
    }
    
    const files = fs.readdirSync(contentDirectory)
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async file => {
          const slug = file.replace('.md', '')
          return getPostBySlug(type, slug)
        })
        .filter(Boolean)
    )
    
    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(`Error reading posts from ${contentDirectory}:`, error)
    return []
  }
}

export async function getPostBySlug(type: keyof typeof typeToDirectoryMap, slug: string): Promise<Post | null> {
  const contentDirectory = typeToDirectoryMap[type]
  const filePath = path.join(contentDirectory, `${slug}.md`)
  
  try {
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark().use(remarkHtml).process(content)
    const htmlContent = processedContent.toString()
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      type,
      date: data.date || new Date().toISOString(),
      content: htmlContent,
      targetKeywords: data.targetKeywords,
      ideaName: data.ideaName,
      status: data.status,
      frontmatter: data
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}