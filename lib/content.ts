import content from './content.json'
import driveFiles from './drive-files.json'
import { projectArchiveConfigs } from './project-archives'
import type {
  AboutContent,
  ContactContent,
  ContactInfo,
  DriveResourceGroup,
  NavLink,
  PortfolioCategory,
  Project,
  Service,
  ShowreelVideo,
  Site,
  SocialLinks,
  Testimonial,
} from './types'

const generatedGroupMeta: Record<string, { slug: string; title: string; description: string }> = {
  'web media designing': {
    slug: 'web-media-designing',
    title: 'Web Media Designing',
    description: 'Landing page and emailer resources including source files, previews, templates, and image assets.',
  },
  'visual communication': {
    slug: 'visual-communication',
    title: 'Visual Communication',
    description: 'Visual communication presentations, PDFs, and Illustrator source files covering logo studies, color work, and poster systems.',
  },
  'scripting and storyboard': {
    slug: 'storyboarding-and-scripting',
    title: 'Scripting & Storyboard',
    description: 'Storyboards, scripts, screenplay documents, AI exploration, and supporting development assets.',
  },
  'digital film making': {
    slug: 'digital-filmmaking-and-editing',
    title: 'Digital Filmmaking & Editing',
    description: 'Film projects, scripts, teaser exports, and cinematic production material.',
  },
  'premiere pro': {
    slug: 'digital-filmmaking-and-editing',
    title: 'Digital Filmmaking & Editing',
    description: 'Film projects, scripts, teaser exports, and cinematic production material.',
  },
  'after effects': {
    slug: 'motion-graphics-animation-design',
    title: 'Motion Graphics, Animation & Design',
    description: 'After Effects experiments, Photoshop work, Animate GIFs, and Illustrator branding and design assets.',
  },
  photoshop: {
    slug: 'motion-graphics-animation-design',
    title: 'Motion Graphics, Animation & Design',
    description: 'After Effects experiments, Photoshop work, Animate GIFs, and Illustrator branding and design assets.',
  },
  animate: {
    slug: 'motion-graphics-animation-design',
    title: 'Motion Graphics, Animation & Design',
    description: 'After Effects experiments, Photoshop work, Animate GIFs, and Illustrator branding and design assets.',
  },
  illustrator: {
    slug: 'motion-graphics-animation-design',
    title: 'Motion Graphics, Animation & Design',
    description: 'After Effects experiments, Photoshop work, Animate GIFs, and Illustrator branding and design assets.',
  },
}

const generatedGroups = new Map<string, DriveResourceGroup>()

for (const row of driveFiles as Array<Record<string, unknown>>) {
  const folder = String(row['Folder Path'] ?? '')
  const parts = folder.split('›').map((item) => item.trim()).filter(Boolean)
  const key = (parts[1] ?? parts[0] ?? 'archive').toLowerCase()
  const meta =
    generatedGroupMeta[key] ??
    {
      slug: key.replace(/\s+/g, '-'),
      title: parts[1] ?? parts[0] ?? 'Archive',
      description: 'Imported files from the Drive export.',
    }

  if (!generatedGroups.has(meta.slug)) {
    generatedGroups.set(meta.slug, {
      slug: meta.slug,
      title: meta.title,
      description: meta.description,
      resources: [],
    })
  }

  generatedGroups.get(meta.slug)!.resources.push({
    title: String(row['File Name'] ?? ''),
    type: String(row['Category'] ?? ''),
    folder,
    view_url: String(row['View Link'] ?? ''),
    embed_url: row['Embed Link'] ? String(row['Embed Link']) : undefined,
    mime_type: row['MIME Type'] ? String(row['MIME Type']) : undefined,
    size_bytes: typeof row['Size (bytes)'] === 'number' ? Number(row['Size (bytes)']) : undefined,
    last_modified: row['Last Modified'] ? String(row['Last Modified']) : undefined,
  })
}

export const site: Site = content.site

export const navigationLinks: NavLink[] = content.navigation.links

export const contactInfo: ContactInfo = content.contact.contact_info

export const socialLinks: SocialLinks = content.contact.social_links

export const projects: Project[] = content.projects.map((project) => ({
  ...project,
  type: project.type as Project['type'],
}))

export function isAutoImportedProject(project: Project) {
  return (
    project.type === 'Imported' ||
    project.categories.includes('imported') ||
    project.description.startsWith('Auto-imported from Drive export.') ||
    project.description.startsWith('Imported project for ')
  )
}

export const curatedProjects: Project[] = projects.filter((project) => !isAutoImportedProject(project))

export const services: Service[] = content.services

export const portfolioCategories: PortfolioCategory[] = content.portfolio.categories

export const testimonials: Testimonial[] = content.testimonials

export const showreelVideos: ShowreelVideo[] = content.showreel.videos

export const homepageContent = {
  hero: content.homepage.hero,
  featured_projects: {
    title: content.homepage.featured_projects.title,
    project_ids: content.homepage.featured_projects.projects,
  },
  cta_section: content.homepage.cta_section,
}

export const aboutContent: AboutContent = {
  seo: content.about.seo,
  intro: content.about.sections.intro,
  full_bio: content.about.sections.full_bio,
  passions: content.about.sections.passions.items,
  education: content.about.sections.education.items[0],
  experience: {
    ...content.about.sections.experience.items[0],
    tools: content.about.sections.experience.items[0].tools
      .split(',')
      .map((tool) => tool.trim()),
  },
}

export const contactContent: ContactContent = {
  seo: content.contact.seo,
  headline: content.contact.headline,
  subtext: content.contact.subtext,
  best_for: content.contact.best_for,
  response_style: content.contact.response_style,
  availability: content.contact.availability,
  freelance_status: 'Currently available for freelance projects and collaborations',
}

export const skills = content.skills

export const showreelContent = {
  seo: content.showreel.seo,
  intro: content.showreel.intro,
}

export const driveResources: DriveResourceGroup[] = Array.from(generatedGroups.values())

export const projectArchives = projectArchiveConfigs

export const rawContent = content
