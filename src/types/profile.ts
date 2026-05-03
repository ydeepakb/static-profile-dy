export interface Profile {
  fullName: string
  headline: string
  location: string
  email: string
  phone: string
  summary: string
  links: {
    github?: string
    linkedin?: string
    website?: string
  }
}

export interface Experience {
  company: string
  companyDomain?: string
  logoUrl?: string
  role: string
  location: string
  startDate: string
  endDate: string
  highlights: string[]
}

export interface Education {
  degree: string
  institution: string
  year: string
  score?: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface ToolGroup {
  category: string
  items: string[]
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Project {
  name: string
  description: string
  tech: string[]
  url?: string
}

export interface PersonalWorkItem {
  title: string
  summary: string
  highlights: string[]
  tech: string[]
}

export interface ResumeData {
  profile: Profile
  experience: Experience[]
  education: Education[]
  skills: SkillGroup[]
  tools: ToolGroup[]
  certifications: Certification[]
  projects: Project[]
  personalWork: PersonalWorkItem[]
}
