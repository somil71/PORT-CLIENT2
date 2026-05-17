'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import DeferredIframe from '@/components/portfolio/DeferredIframe'
import type { DriveResource, Project, ProjectArchiveSection } from '@/lib/types'

type Props = {
  project: Project
  embedUrl: string | null
  heroImage: string | null
  resources: DriveResource[]
  archiveSections: ProjectArchiveSection[]
  relatedProjects: Project[]
}

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function getProjectMode(project: Project) {
  if (project.categories.includes('video-editing') || project.categories.includes('digital-filmmaking') || project.categories.includes('vfx')) {
    return {
      sceneTitle: 'Scene Timeline',
      mediaTitle: 'Frame Sequence',
      notesTitle: 'Production Notes',
      archiveTitle: 'Production Archive',
    }
  }

  if (project.categories.includes('2d-animation') || project.categories.includes('motion-graphics')) {
    return {
      sceneTitle: 'Motion Timeline',
      mediaTitle: 'Kinetic Studies',
      notesTitle: 'Animation Notes',
      archiveTitle: 'Motion Archive',
    }
  }

  if (project.categories.includes('graphic-design')) {
    return {
      sceneTitle: 'Identity Sequence',
      mediaTitle: 'Exhibition Wall',
      notesTitle: 'Design Notes',
      archiveTitle: 'Asset Archive',
    }
  }

  return {
    sceneTitle: 'Creative Timeline',
    mediaTitle: 'Media Board',
    notesTitle: 'Project Notes',
    archiveTitle: 'Archive Access',
  }
}

function getResourceKind(resource: DriveResource) {
  const type = resource.type.toLowerCase()

  if (type.includes('video') || resource.embed_url?.includes('/preview')) return 'video'
  if (type.includes('gif')) return 'gif'
  if (type.includes('image')) return 'image'
  if (type.includes('pdf')) return 'pdf'
  if (type.includes('html') || type.includes('css') || type.includes('javascript') || type.includes('text') || type.includes('docx') || type.includes('illustrator') || type.includes('after effects') || type.includes('premiere')) return 'doc'

  return 'doc'
}

function getTileClass(resource: DriveResource, index: number) {
  const kind = getResourceKind(resource)
  const title = resource.title.toLowerCase()

  if (kind === 'video') return index === 0 ? 'md:col-span-2 aspect-video' : 'aspect-video'
  if (kind === 'pdf') return 'aspect-[4/5]'
  if (kind === 'gif') return 'aspect-square'
  if (title.includes('storyboard') || title.includes('poster') || title.includes('cover') || title.includes('portrait')) return 'aspect-[3/4]'

  return 'aspect-[4/3]'
}

function renderMedia(resource: DriveResource) {
  const kind = getResourceKind(resource)

  if ((kind === 'image' || kind === 'gif') && resource.embed_url) {
    return (
      <img
        src={resource.embed_url}
        alt={resource.title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    )
  }

  if ((kind === 'video' || kind === 'pdf') && resource.embed_url) {
    return (
      <DeferredIframe
        src={resource.embed_url}
        title={resource.title}
        className="h-full w-full"
        allow="autoplay; fullscreen"
      />
    )
  }

  return (
    <div className="flex h-full items-end bg-[linear-gradient(180deg,rgba(19,27,36,0.2),rgba(5,8,12,0.9))] p-5">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-vision-text/44">{resource.type}</p>
        <p className="mt-2 text-lg font-semibold text-white">{resource.title}</p>
      </div>
    </div>
  )
}

export default function ProjectDetailExperience({
  project,
  embedUrl,
  heroImage,
  resources,
  archiveSections,
  relatedProjects,
}: Props) {
  const mode = getProjectMode(project)
  const resourcesByTitle = new Map(resources.map((resource) => [resource.title, resource]))
  const resolvedSections = archiveSections
    .map((section) => ({
      ...section,
      resources: section.resource_titles
        .map((title) => resourcesByTitle.get(title))
        .filter((resource): resource is DriveResource => Boolean(resource)),
    }))
    .filter((section) => section.resources.length > 0)

  const curatedResources =
    resolvedSections.flatMap((section) => section.resources).length > 0
      ? resolvedSections.flatMap((section) => section.resources)
      : resources
  const matchedTitles = new Set(curatedResources.map((resource) => resource.title))
  const remainingResources = resources.filter((resource) => !matchedTitles.has(resource.title))
  const visualResources = curatedResources
    .filter((resource) => ['video', 'gif', 'image', 'pdf'].includes(getResourceKind(resource)))
    .slice(0, 8)
  const noteResources = curatedResources.filter((resource) => getResourceKind(resource) === 'doc').slice(0, 6)

  return (
    <div className="page-hero pt-36">
      <section className="px-4 pb-8 pt-8">
        <div className="section-shell">
          <Link href="/portfolio" className="text-sm text-vision-cyan hover:text-vision-gold">
            Back to Portfolio
          </Link>
        </div>
      </section>

      <motion.section
        className="px-4 pb-10"
        initial="hidden"
        animate="visible"
        variants={reveal}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="section-shell grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="panel-strong cinema-card rounded-[2.2rem] p-8 md:p-10 xl:sticky xl:top-32 xl:h-fit">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="metric-chip rounded-full px-3 py-1 text-xs">{project.year}</span>
              <span className="metric-chip rounded-full px-3 py-1 text-xs">{project.type}</span>
              <span className="metric-chip rounded-full px-3 py-1 text-xs">{project.media_type}</span>
            </div>
            <p className="eyebrow mb-4">Creative Case File</p>
            <h1
              className="text-[3.4rem] leading-[0.88] text-white md:text-[5.2rem]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-vision-text/74 md:text-lg">
              {project.detail_line}
            </p>
            <p className="mt-8 text-sm leading-8 text-vision-text/62">{project.summary}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-vision-text/45">Role</p>
                <p className="mt-2 text-sm text-white">{project.role}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-vision-text/45">Client</p>
                <p className="mt-2 text-sm text-white">{project.client}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.24em] text-vision-text/45">Outcome</p>
                <p className="mt-2 text-sm leading-7 text-vision-text/74">{project.outcome}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="metric-chip rounded-full px-3 py-1 text-xs">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              className="panel cinema-card rounded-[2.2rem] p-4"
              variants={reveal}
              transition={{ delay: 0.1, duration: 0.65, ease: 'easeOut' }}
            >
              <div className="project-cover min-h-[26rem] rounded-[1.7rem]">
                {embedUrl ? (
                  <DeferredIframe
                    src={embedUrl}
                    title={project.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : heroImage ? (
                  <img
                    src={heroImage}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(14,19,26,0.32),rgba(4,7,11,0.92))]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="eyebrow mb-2">Primary Scene</p>
                    <p className="max-w-lg text-sm leading-7 text-vision-text/78">{project.color_mood}</p>
                  </div>
                  {project.video_link ? (
                    <a
                      href={project.video_link}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-vision-cyan/30 bg-black/30 px-5 py-3 text-sm text-vision-cyan hover:border-vision-cyan/60 hover:bg-vision-cyan/10"
                    >
                      Open Source Video
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="panel cinema-card rounded-[2rem] p-8"
              variants={reveal}
              transition={{ delay: 0.16, duration: 0.65, ease: 'easeOut' }}
            >
              <p className="eyebrow mb-3">Overview</p>
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-5 text-sm leading-8 text-vision-text/74 md:text-base">
                  {project.description.split('\n\n').map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-vision-text/45">Goal</p>
                  <p className="mt-3 text-sm leading-7 text-vision-text/74">{project.goal}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.24em] text-vision-text/45">Audience</p>
                  <p className="mt-3 text-sm leading-7 text-vision-text/74">{project.target_audience}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {project.process ? (
        <motion.section
          className="px-4 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="section-shell panel cinema-card rounded-[2rem] p-8 md:p-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3">{mode.sceneTitle}</p>
                <h2 className="text-5xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Behind the Build
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                ['Challenge', project.process.challenge],
                ['Concept', project.process.concept],
                ['Proud Decisions', project.process.proud_decisions],
                ['What I Learned', project.process.learned],
              ].map(([title, copy]) => (
                <div key={title} className="panel-strong cinema-card rounded-[1.4rem] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-vision-gold/80">{title}</p>
                  <p className="mt-4 text-sm leading-7 text-vision-text/72">{copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.process.steps.map((step, index) => (
                <span key={step} className="rounded-full border border-vision-gold/20 bg-vision-gold/10 px-3 py-1 text-sm text-vision-gold">
                  {`${index + 1}. ${step}`}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      ) : null}

      {visualResources.length > 0 ? (
        <motion.section
          className="px-4 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={reveal}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="section-shell">
            <div className="mb-8">
              <p className="eyebrow mb-3">{mode.mediaTitle}</p>
              <h2 className="text-5xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Adaptive Media Wall
              </h2>
            </div>

            <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visualResources.map((resource, index) => (
                <motion.div
                  key={`${resource.title}-${index}`}
                  className={`panel cinema-card overflow-hidden rounded-[1.7rem] p-3 ${getTileClass(resource, index)}`}
                  variants={reveal}
                  transition={{ delay: index * 0.04, duration: 0.55, ease: 'easeOut' }}
                >
                  <div className="relative h-full overflow-hidden rounded-[1.2rem] border border-white/6 bg-black/30">
                    {renderMedia(resource)}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#05080c] via-[#05080c]/60 to-transparent p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-vision-text/45">{resource.type}</p>
                      <p className="mt-2 text-sm font-semibold text-white">{resource.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      ) : null}

      {noteResources.length > 0 || project.reference_links?.length ? (
        <motion.section
          className="px-4 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="section-shell grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="panel cinema-card rounded-[2rem] p-8">
              <p className="eyebrow mb-3">{mode.notesTitle}</p>
              <h2 className="text-5xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Production Desk
              </h2>
              <div className="mt-6 grid gap-4">
                {noteResources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.view_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-5 hover:border-vision-cyan/35 hover:bg-white/[0.05]"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-vision-text/44">{resource.type}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{resource.title}</p>
                    <p className="mt-2 text-xs leading-6 text-vision-text/50">{resource.folder}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="panel cinema-card rounded-[2rem] p-8">
              <p className="eyebrow mb-3">Reference Field</p>
              <h2 className="text-5xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Inputs and Influences
              </h2>
              <div className="mt-6 grid gap-3">
                {project.reference_links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-vision-text/76 hover:border-vision-cyan/40 hover:text-vision-cyan"
                  >
                    {link.label}
                  </a>
                ))}
                {!project.reference_links?.length ? (
                  <div className="rounded-[1.2rem] border border-dashed border-white/10 px-4 py-6 text-sm text-vision-text/52">
                    This project is presented as a standalone case study without external learning links.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </motion.section>
      ) : null}

      {resolvedSections.length > 0 || remainingResources.length > 0 ? (
        <motion.section
          className="px-4 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="section-shell panel cinema-card rounded-[2rem] p-8 md:p-10">
            <div className="mb-8">
              <p className="eyebrow mb-3">{mode.archiveTitle}</p>
              <h2 className="text-5xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Archive Access
              </h2>
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              {resolvedSections.map((section) => (
                <div key={section.title} className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-6">
                  <p className="eyebrow mb-2">{section.title}</p>
                  <p className="mb-5 text-sm leading-7 text-vision-text/66">{section.description}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.resources.map((resource) => (
                      <div key={resource.title} className="rounded-[1.2rem] border border-white/8 bg-black/20 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-vision-text/44">{resource.type}</p>
                        <p className="mt-3 text-base font-semibold text-white">{resource.title}</p>
                        <p className="mt-2 text-xs leading-6 text-vision-text/50">{resource.folder}</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <a href={resource.view_url} target="_blank" rel="noreferrer" className="text-sm text-vision-cyan hover:text-vision-gold">
                            View
                          </a>
                          {resource.embed_url ? (
                            <a href={resource.embed_url} target="_blank" rel="noreferrer" className="text-sm text-vision-text/70 hover:text-vision-cyan">
                              Open Asset
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {remainingResources.length > 0 ? (
                <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-6 xl:col-span-2">
                  <p className="eyebrow mb-2">Complete Folder Archive</p>
                  <p className="mb-5 text-sm leading-7 text-vision-text/66">
                    Every remaining file from the imported Drive export that belongs to this project scope.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {remainingResources.map((resource) => (
                      <div key={resource.title} className="rounded-[1.2rem] border border-white/8 bg-black/20 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-vision-text/44">{resource.type}</p>
                        <p className="mt-3 text-base font-semibold text-white">{resource.title}</p>
                        <p className="mt-2 text-xs leading-6 text-vision-text/50">{resource.folder}</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <a href={resource.view_url} target="_blank" rel="noreferrer" className="text-sm text-vision-cyan hover:text-vision-gold">
                            View
                          </a>
                          {resource.embed_url ? (
                            <a href={resource.embed_url} target="_blank" rel="noreferrer" className="text-sm text-vision-text/70 hover:text-vision-cyan">
                              Open Asset
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </motion.section>
      ) : null}

      <motion.section
        className="px-4 pb-24 pt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={reveal}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="section-shell panel cinema-card rounded-[2rem] p-8 md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">Continue Exploring</p>
              <h2 className="text-5xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Related Projects
              </h2>
            </div>
            <Link href="/contact" className="text-sm text-vision-cyan hover:text-vision-gold">
              Let&apos;s work together
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedProjects.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                prefetch={false}
                className="panel-strong cinema-card rounded-[1.5rem] p-6 hover:-translate-y-1"
              >
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-vision-text/45">{item.media_type}</p>
                <h3 className="text-3xl leading-none text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-vision-text/68">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
