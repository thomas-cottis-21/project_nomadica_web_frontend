export interface Tag {
  id: string
  name: string
  slug: string
  createdAt: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  coverImageUrl: string | null
  readingTimeMinutes: number | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  authorId: string
  tags: Tag[]
}

export type BlogPostSummary = Omit<BlogPost, 'content'>
