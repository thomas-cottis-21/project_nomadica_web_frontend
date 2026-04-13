import type { BlogData, BlogPost, BlogPostSummary } from '../types/blog'

/**
 * Fetches all post summaries (no content field).
 * Swap for: return fetch('/api/posts').then(r => r.json())
 */
export async function fetchPosts(): Promise<BlogPostSummary[]> {
  const { default: data } = await import('../data/blog.json')
  return (data as BlogData).posts.map(({ content: _content, ...post }) => post)
}

/**
 * Fetches a single post by slug (includes full content).
 * Swap for: return fetch(`/api/posts/${slug}`).then(r => r.json())
 */
export async function fetchPost(slug: string): Promise<BlogPost | null> {
  const { default: data } = await import('../data/blog.json')
  return (data as BlogData).posts.find(p => p.slug === slug) ?? null
}
