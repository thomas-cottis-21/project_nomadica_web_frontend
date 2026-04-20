import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { fetchResume } from '../api/resume'
import type { ResumeData } from '../types/resume'
import './ResumePage.css'

function formatPeriod(startDate: string, endDate: string | null): string {
  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${fmt(startDate)} – ${endDate ? fmt(endDate) : 'Present'}`
}

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchResume().then(setResume).catch(() => setError(true))
  }, [])

  if (error) return <div className="resume-loading">Failed to load resume.</div>
  if (!resume) return <div className="resume-loading">Loading...</div>

  const resumeSkillIds = new Set(resume.skills.map(e => e.skillId))
  const activeCategories = resume.skillCategories
    .filter(cat => cat.skills.some(s => resumeSkillIds.has(s.id)))
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div className="resume-page">
      <Navbar alwaysSolid />

      {/* ── Header ── */}
      <header className="resume-header">
        <div className="resume-header-inner">
          <p className="resume-eyebrow">Resume</p>
          <h1 className="resume-name">{resume.owner.displayName}</h1>
          {resume.title && <p className="resume-title">{resume.title}</p>}
          {resume.tagline && <p className="resume-tagline">{resume.tagline}</p>}
          <div className="resume-contact">
            {resume.links.length > 0 && (
              <div className="resume-links">
                {resume.links.map(link => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            <a href="/resume.pdf" className="resume-download" download>Download PDF</a>
          </div>
        </div>
      </header>

      <div className="resume-body">

        {/* ── Skills ── */}
        {activeCategories.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <div className="skills-grid">
              {activeCategories.map(cat => (
                <div key={cat.id} className="skill-group">
                  <h3 className="skill-category">{cat.name}</h3>
                  <ul className="skill-tags">
                    {cat.skills
                      .filter(s => resumeSkillIds.has(s.id))
                      .map(s => (
                        <li key={s.id} className="skill-tag">{s.name}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Experience ── */}
        {resume.workExperience.length > 0 && (
          <section className="resume-section resume-section--alt">
            <h2 className="resume-section-title">Experience</h2>
            <div className="timeline">
              {resume.workExperience
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(job => (
                  <div key={job.id} className="timeline-item">
                    <div className="timeline-marker" />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <div>
                          <h3 className="timeline-role">{job.role}</h3>
                          <p className="timeline-company">
                            {job.company}{job.location ? ` · ${job.location}` : ''}
                          </p>
                        </div>
                        <span className="timeline-period">
                          {formatPeriod(job.startDate, job.endDate)}
                        </span>
                      </div>
                      <ul className="timeline-bullets">
                        {job.bullets
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map(b => <li key={b.id}>{b.content}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ── Projects ── */}
        {resume.projects.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Projects</h2>
            <div className="projects-grid">
              {resume.projects
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-card-body">
                      <h3 className="project-name">{project.name}</h3>
                      {project.description && (
                        <p className="project-description">{project.description}</p>
                      )}
                      <ul className="project-stack">
                        {project.technologies.map(t => (
                          <li key={t.id} className="project-tag">{t.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="project-links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live ↗</a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ── Education ── */}
        {resume.education.length > 0 && (
          <section className="resume-section resume-section--alt">
            <h2 className="resume-section-title">Education</h2>
            <div className="education-list">
              {resume.education
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(edu => (
                  <div key={edu.id} className="education-item">
                    <div>
                      <h3 className="education-institution">{edu.institution}</h3>
                      <p className="education-degree">{edu.degree}</p>
                    </div>
                    <span className="education-period">
                      {edu.startYear} – {edu.endYear ?? 'Present'}
                    </span>
                  </div>
                ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
