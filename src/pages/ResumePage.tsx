import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { fetchResume } from '../services/resumeService'
import type { ResumeData } from '../types/resume'
import './ResumePage.css'

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeData | null>(null)

  useEffect(() => {
    fetchResume().then(setResume)
  }, [])

  if (!resume) return <div className="resume-loading">Loading...</div>

  return (
    <div className="resume-page">
      <Navbar alwaysSolid />

      {/* ── Header ── */}
      <header className="resume-header">
        <div className="resume-header-inner">
          <p className="resume-eyebrow">Resume</p>
          <h1 className="resume-name">{resume.name}</h1>
          <p className="resume-title">{resume.title}</p>
          <p className="resume-tagline">{resume.tagline}</p>
          <div className="resume-contact">
            <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a>
            <a href={resume.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="/resume.pdf" className="resume-download" download>Download PDF</a>
          </div>
        </div>
      </header>

      <div className="resume-body">

        {/* ── Skills ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Skills</h2>
          <div className="skills-grid">
            {resume.skills.map(group => (
              <div key={group.category} className="skill-group">
                <h3 className="skill-category">{group.category}</h3>
                <ul className="skill-tags">
                  {group.items.map(item => (
                    <li key={item} className="skill-tag">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="resume-section resume-section--alt">
          <h2 className="resume-section-title">Experience</h2>
          <div className="timeline">
            {resume.experience.map((job, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{job.role}</h3>
                      <p className="timeline-company">{job.company} · {job.location}</p>
                    </div>
                    <span className="timeline-period">{job.period}</span>
                  </div>
                  <ul className="timeline-bullets">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Projects</h2>
          <div className="projects-grid">
            {resume.projects.map(project => (
              <div key={project.name} className="project-card">
                <div className="project-card-body">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-stack">
                    {project.stack.map(tag => (
                      <li key={tag} className="project-tag">{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer">Live ↗</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section className="resume-section resume-section--alt">
          <h2 className="resume-section-title">Education</h2>
          <div className="education-list">
            {resume.education.map((edu, i) => (
              <div key={i} className="education-item">
                <div>
                  <h3 className="education-institution">{edu.institution}</h3>
                  <p className="education-degree">{edu.degree}</p>
                </div>
                <span className="education-period">{edu.period}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
