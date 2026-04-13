export interface ResumeContact {
  email: string
  github: string
  linkedin: string
}

export interface ResumeSkillGroup {
  category: string
  items: string[]
}

export interface ResumeExperience {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export interface ResumeProject {
  name: string
  description: string
  stack: string[]
  github: string
  live: string | null
}

export interface ResumeEducation {
  institution: string
  degree: string
  period: string
}

export interface ResumeData {
  name: string
  title: string
  tagline: string
  contact: ResumeContact
  skills: ResumeSkillGroup[]
  experience: ResumeExperience[]
  projects: ResumeProject[]
  education: ResumeEducation[]
}
