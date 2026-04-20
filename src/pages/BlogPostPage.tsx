import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Navbar from '../components/Navbar'
import { fetchPost } from '../api/blog'
import type { BlogPost } from '../types/blog'
import './BlogPostPage.css'

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug?: string }>()
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetchPost(slug).then(setPost).catch(() => setError(true))
  }, [slug])

  if (error) return <div className="post-loading">Failed to load post.</div>
  if (post === undefined) return <div className="post-loading">Loading...</div>
  if (post === null) return <div className="post-loading">Post not found.</div>

  return (
    <div className="post-page">
      <Navbar alwaysSolid />

      {/* ── Hero ── */}
      <div
        className="post-hero"
        style={{ backgroundImage: post.coverImageUrl ? `url(${post.coverImageUrl})` : undefined }}
      >
        <div className="post-hero-overlay" />
        <div className="post-hero-body">
          <div className="post-hero-tags">
            {post.tags.map(tag => (
              <span key={tag.id} className="post-tag">{tag.name}</span>
            ))}
          </div>
          <h1 className="post-hero-title">{post.title}</h1>
          <p className="post-hero-meta">
            {formatDate(post.publishedAt)}
            {post.readingTimeMinutes ? ` · ${post.readingTimeMinutes} min read` : ''}
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="post-body-wrapper">
        <article className="post-body">
          <div className="prose">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>

        <footer className="post-footer">
          <div className="post-footer-tags">
            {post.tags.map(tag => (
              <span key={tag.id} className="post-tag post-tag--dark">{tag.name}</span>
            ))}
          </div>
          <Link to="/blog" className="post-back">← Back to Blog</Link>
        </footer>
      </div>
    </div>
  )
}
