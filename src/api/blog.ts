import { request } from './client'
import type { BlogPost, BlogPostSummary, Tag } from '../types/blog'

export function fetchPosts(): Promise<BlogPostSummary[]> {
  return request('GET', '/api/v1/posts')
}

export function fetchPost(slug: string): Promise<BlogPost> {
  return request('GET', `/api/v1/posts/by-slug/${slug}`)
}

export function fetchPostById(id: string): Promise<BlogPost> {
  return request('GET', `/api/v1/posts/${id}`)
}

export function fetchTags(): Promise<Tag[]> {
  return request('GET', '/api/v1/posts/tags')
}

export interface PostCreatePayload {
  title: string
  excerpt?: string
  content: string
  coverImageUrl?: string
  readingTimeMinutes?: number
  tagIds: string[]
}

export function createPost(payload: PostCreatePayload): Promise<BlogPost> {
  return request('POST', '/api/v1/posts', {
    title: payload.title,
    excerpt: payload.excerpt ?? null,
    content: payload.content,
    cover_image_url: payload.coverImageUrl ?? null,
    reading_time_minutes: payload.readingTimeMinutes ?? null,
    tag_ids: payload.tagIds,
  })
}

export function updatePost(id: string, payload: Partial<PostCreatePayload>): Promise<BlogPost> {
  return request('PATCH', `/api/v1/posts/${id}`, {
    title: payload.title,
    excerpt: payload.excerpt,
    content: payload.content,
    cover_image_url: payload.coverImageUrl,
    reading_time_minutes: payload.readingTimeMinutes,
    tag_ids: payload.tagIds,
  })
}

export function publishPost(id: string): Promise<BlogPost> {
  return request('POST', `/api/v1/posts/${id}/publish`)
}

export function deletePost(id: string): Promise<void> {
  return request('DELETE', `/api/v1/posts/${id}`)
}
