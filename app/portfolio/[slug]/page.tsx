import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailExperience from '@/components/portfolio/ProjectDetailExperience'
import { curatedProjects, driveResources, projectArchives, projects } from '@/lib/content'

type PageProps = {
  params: {
    slug: string
  }
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null

  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`
    }

    const videoId = parsed.searchParams.get('v')
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  } catch {
    return null
  }
}

function getYouTubeThumbnail(url?: string) {
  if (!url) return null

  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      return `https://img.youtube.com/vi/${parsed.pathname.slice(1)}/hqdefault.jpg`
    }

    const videoId = parsed.searchParams.get('v')
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
  } catch {
    return null
  }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((item) => item.slug === params.slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${project.title} | Vision VFX`,
    description: project.summary,
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((item) => item.slug === params.slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = curatedProjects
    .filter(
      (item) =>
        item.slug !== project.slug &&
        item.categories.some((category) => project.categories.includes(category))
    )
    .slice(0, 3)

  const embedUrl = getYouTubeEmbedUrl(project.video_link)
  const heroImage = getYouTubeThumbnail(project.video_link)
  const matchingResourceGroups = driveResources.filter((group) =>
    project.resource_group_slugs?.includes(group.slug)
  )
  const flatResources = matchingResourceGroups.flatMap((group) => group.resources)
  const archiveConfig = projectArchives[project.slug]

  return (
    <ProjectDetailExperience
      project={project}
      embedUrl={embedUrl}
      heroImage={heroImage}
      resources={flatResources}
      archiveSections={archiveConfig?.sections ?? []}
      relatedProjects={relatedProjects}
    />
  )
}
