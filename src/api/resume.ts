import { request } from './client'
import type { ResumeData, WorkExperience, Education, Project, ResumeSkillEntry, SkillCategory, ResumeLink, PublicUser } from '../types/resume'

const OWNER_ID = import.meta.env.VITE_OWNER_USER_ID

export async function fetchResume(): Promise<ResumeData> {
  const [resume, owner] = await Promise.all([
    request<{ id: string; userId: string; tagline: string | null; title: string | null }>(
      'GET',
      `/api/v1/resumes/active?user_id=${OWNER_ID}`,
    ),
    request<PublicUser>('GET', `/api/v1/users/${OWNER_ID}`),
  ])

  const [workExperience, education, projects, skills, skillCategories, links] = await Promise.all([
    request<WorkExperience[]>('GET', `/api/v1/resumes/${resume.id}/work-experience`),
    request<Education[]>('GET', `/api/v1/resumes/${resume.id}/education`),
    request<Project[]>('GET', `/api/v1/resumes/${resume.id}/projects`),
    request<ResumeSkillEntry[]>('GET', `/api/v1/resumes/${resume.id}/skills`),
    request<SkillCategory[]>('GET', '/api/v1/skill-categories'),
    request<ResumeLink[]>('GET', `/api/v1/resumes/${resume.id}/links`),
  ])

  return { ...resume, owner, workExperience, education, projects, skills, skillCategories, links }
}
