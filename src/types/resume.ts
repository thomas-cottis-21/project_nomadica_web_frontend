export interface Bullet {
  id: string
  experienceId: string
  content: string
  sortOrder: number
}

export interface WorkExperience {
  id: string
  resumeId: string
  company: string
  role: string
  location: string | null
  startDate: string
  endDate: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
  bullets: Bullet[]
}

export interface Education {
  id: string
  resumeId: string
  institution: string
  degree: string
  startYear: number
  endYear: number | null
  sortOrder: number
  createdAt: string
}

export interface Technology {
  id: string
  name: string
}

export interface Project {
  id: string
  resumeId: string
  name: string
  description: string | null
  githubUrl: string | null
  liveUrl: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
  technologies: Technology[]
}

export interface Skill {
  id: string
  name: string
  categoryId: string
}

export interface ResumeSkillEntry {
  skillId: string
  sortOrder: number
  skill: Skill | null
}

export interface SkillCategory {
  id: string
  name: string
  sortOrder: number
  skills: Skill[]
}

export interface ResumeLink {
  id: string
  resumeId: string
  label: string
  url: string
  sortOrder: number
}

export interface PublicUser {
  id: string
  email: string
  displayName: string
  bio: string | null
  avatarUrl: string | null
  roles: string[]
}

export interface ResumeData {
  id: string
  userId: string
  tagline: string | null
  title: string | null
  workExperience: WorkExperience[]
  education: Education[]
  projects: Project[]
  skills: ResumeSkillEntry[]
  skillCategories: SkillCategory[]
  links: ResumeLink[]
  owner: PublicUser
}
