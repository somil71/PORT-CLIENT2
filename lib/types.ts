export interface Site {
  title: string
  description: string
  url: string
  author: string
}

export interface NavLink {
  label: string
  href: string
}

export interface ProjectProcess {
  challenge: string
  concept: string
  steps: string[]
  proud_decisions: string
  learned: string
}

export interface Project {
  id: string
  title: string
  slug: string
  categories: string[]
  year: number
  type: 'Client' | 'Personal' | 'Academic' | 'Freelance' | 'Imported'
  media_type: string
  summary: string
  detail_line: string
  description: string
  role: string
  team: string
  client: string
  goal: string
  target_audience: string
  outcome: string
  tools: string[]
  color_mood: string
  process?: ProjectProcess
  metadata: {
    featured_homepage: boolean
    in_showreel: boolean
    detail_page: boolean
  }
  video_link?: string
  resource_group_slugs?: string[]
  reference_links?: Array<{
    label: string
    url: string
  }>
}

export interface PortfolioCategory {
  slug: string
  name: string
  intro: string
  description: string
}

export interface Service {
  id: string
  title: string
  tagline: string
  description: string
  for_who: string
  deliverables: string
  why_hire: string
}

export interface ContactInfo {
  email: string
  phone: string
  whatsapp?: string
}

export interface SocialLinks {
  linkedin: string
  instagram: string[]
  youtube: string
  behance: string
}

export interface AboutContent {
  seo: {
    title: string
    description: string
  }
  intro: {
    short_bio: string
  }
  full_bio: {
    paragraph_1: string
    paragraph_2: string
  }
  passions: Array<{
    question: string
    answer: string
  }>
  education: {
    degree: string
    school: string
    duration: string
    description: string
  }
  experience: {
    role: string
    company: string
    duration: string
    description: string
    achievements: string
    tools: string[]
  }
}

export interface ContactContent {
  seo: {
    title: string
    description: string
  }
  headline: string
  subtext: string
  best_for: string
  response_style: string
  availability: string
  freelance_status: string
}

export interface ShowreelVideo {
  id: string
  title: string
  category: string
  description: string
  link: string
  featured_reel: boolean
  is_short: boolean
  homepage: boolean
}

export interface Testimonial {
  name: string
  role: string
  company: string
  text: string
}

export interface DriveResource {
  title: string
  type: string
  folder: string
  view_url: string
  embed_url?: string
  mime_type?: string
  size_bytes?: number
  last_modified?: string
}

export interface DriveResourceGroup {
  slug: string
  title: string
  description: string
  resources: DriveResource[]
}

export interface ProjectArchiveSection {
  title: string
  description: string
  resource_titles: string[]
}

export interface ProjectArchiveConfig {
  hero_resource_title?: string
  sections: ProjectArchiveSection[]
}
