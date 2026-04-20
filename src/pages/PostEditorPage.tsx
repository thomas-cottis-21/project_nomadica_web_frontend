import { useEffect, useState } from 'react'
import './PostEditorPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createPost,
  deletePost,
  fetchPostById,
  fetchTags,
  publishPost,
  updatePost,
} from '../api/blog'
import type { BlogPost, Tag } from '../types/blog'

export default function PostEditorPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = !id
  const navigate = useNavigate()

  const [post, setPost] = useState<BlogPost | null>(null)
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [readingTimeMinutes, setReadingTimeMinutes] = useState('')
  const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loads: Promise<unknown>[] = [fetchTags().then(setAvailableTags)]

    if (!isNew && id) {
      loads.push(
        fetchPostById(id).then(p => {
          setPost(p)
          setTitle(p.title)
          setExcerpt(p.excerpt ?? '')
          setContent(p.content)
          setCoverImageUrl(p.coverImageUrl ?? '')
          setReadingTimeMinutes(p.readingTimeMinutes?.toString() ?? '')
          setSelectedTagIds(new Set(p.tags.map(t => t.id)))
        })
      )
    }

    Promise.all(loads)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setIsLoading(false))
  }, [id])

  function toggleTag(tagId: string) {
    setSelectedTagIds(prev => {
      const next = new Set(prev)
      next.has(tagId) ? next.delete(tagId) : next.add(tagId)
      return next
    })
  }

  function buildPayload() {
    return {
      title,
      excerpt: excerpt || undefined,
      content,
      coverImageUrl: coverImageUrl || undefined,
      readingTimeMinutes: readingTimeMinutes ? parseInt(readingTimeMinutes) : undefined,
      tagIds: Array.from(selectedTagIds),
    }
  }

  async function handleSave() {
    setError(null)
    setIsSaving(true)
    try {
      if (isNew) {
        const created = await createPost(buildPayload())
        navigate(`/editor/${created.id}`, { replace: true })
      } else {
        const updated = await updatePost(id!, buildPayload())
        setPost(updated)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  async function handlePublish() {
    if (!post) return
    setError(null)
    setIsSaving(true)
    try {
      await handleSave()
      await publishPost(post.id)
      navigate('/blog', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Publish failed')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!post || !confirm('Delete this post? This cannot be undone.')) return
    try {
      await deletePost(post.id)
      navigate('/blog', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  if (isLoading) return <div className="editor-loading">Loading…</div>

  const isDraft = !post?.publishedAt

  return (
    <div className="post-editor">
      <button className="editor-back" onClick={() => navigate(-1)}>← Back</button>
      <div className="editor-header">
        <h1>{isNew ? 'New post' : 'Edit post'}</h1>
        {post && (
          <span className={`status-badge ${isDraft ? 'draft' : 'published'}`}>
            {isDraft ? 'Draft' : 'Published'}
          </span>
        )}
      </div>

      {error && <p className="editor-error">{error}</p>}

      <div className="editor-form">
        <div className="field">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Post title"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="excerpt">Excerpt</label>
          <input
            id="excerpt"
            type="text"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Short summary"
          />
        </div>

        <div className="field">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your post here…"
            rows={20}
            required
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="coverImageUrl">Cover image URL</label>
            <input
              id="coverImageUrl"
              type="url"
              value={coverImageUrl}
              onChange={e => setCoverImageUrl(e.target.value)}
              placeholder="https://…"
            />
          </div>

          <div className="field">
            <label htmlFor="readingTime">Reading time (minutes)</label>
            <input
              id="readingTime"
              type="number"
              min={1}
              value={readingTimeMinutes}
              onChange={e => setReadingTimeMinutes(e.target.value)}
              placeholder="5"
            />
          </div>
        </div>

        {availableTags.length > 0 && (
          <div className="field">
            <label>Tags</label>
            <div className="tag-picker">
              {availableTags.map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  className={`tag-option ${selectedTagIds.has(tag.id) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="editor-actions">
        <button onClick={handleSave} disabled={isSaving || !title || !content}>
          {isSaving ? 'Saving…' : 'Save draft'}
        </button>

        {isDraft && (
          <button
            className="publish-btn"
            onClick={handlePublish}
            disabled={isSaving || !title || !content}
          >
            {isSaving ? 'Publishing…' : 'Publish'}
          </button>
        )}

        {post && (
          <button className="delete-btn" onClick={handleDelete} disabled={isSaving}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
