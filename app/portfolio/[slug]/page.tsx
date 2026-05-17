import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailExperience from '@/components/portfolio/ProjectDetailExperience'
import { curatedProjects, getProjectResources, projectArchives, projects } from '@/lib/content'
import {
  getResourcePreviewImage,
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
  pickProjectPreviewResource,
} from '@/lib/project-media'

type PageProps = {
  params: {
    slug: string
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

  const archiveConfig = projectArchives[project.slug]
  const flatResources = getProjectResources(project)
  const previewResource = pickProjectPreviewResource(
    flatResources,
    archiveConfig?.hero_resource_title
  )
  const embedUrl = getYouTubeEmbedUrl(project.video_link)
  const heroImage =
    getYouTubeThumbnail(project.video_link) ??
    (previewResource ? getResourcePreviewImage(previewResource) : null)

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
