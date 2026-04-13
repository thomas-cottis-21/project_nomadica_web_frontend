export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  readingTime: number
  coverImage: string
  tags: string[]
}

export type BlogPostSummary = Omit<BlogPost, 'content'>

export interface BlogData {
  posts: BlogPost[]
}
