import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Navbar from '../components/Navbar'
import { fetchPost } from '../services/blogService'
import type { BlogPost } from '../types/blog'
import './BlogPostPage.css'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined)

  useEffect(() => {
    if (!slug) return
    fetchPost(slug).then(setPost)
  }, [slug])

  if (post === undefined) return <div className="post-loading">Loading...</div>
  if (post === null) return <div className="post-loading">Post not found.</div>

  return (
    <div className="post-page">
      <Navbar alwaysSolid />

      {/* ── Hero ── */}
      <div className="post-hero" style={{ backgroundImage: `url(${post.coverImage})` }}>
        <div className="post-hero-overlay" />
        <div className="post-hero-body">
          <div className="post-hero-tags">
            {post.tags.map(tag => (
              <span key={tag} className="post-tag">{tag}</span>
            ))}
          </div>
          <h1 className="post-hero-title">{post.title}</h1>
          <p className="post-hero-meta">
            {formatDate(post.publishedAt)} · {post.readingTime} min read
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
              <span key={tag} className="post-tag post-tag--dark">{tag}</span>
            ))}
          </div>
          <Link to="/blog" className="post-back">← Back to Blog</Link>
        </footer>
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
