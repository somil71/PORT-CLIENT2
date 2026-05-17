import type { Metadata } from 'next'
import Link from 'next/link'
import {
  curatedProjects,
  getProjectResources,
  portfolioCategories,
  projectArchives,
  rawContent,
} from '@/lib/content'
import {
  getResourcePreviewImage,
  getYouTubeThumbnail,
  pickProjectPreviewResource,
} from '@/lib/project-media'

export const metadata: Metadata = {
  title: rawContent.portfolio.seo.title,
  description: rawContent.portfolio.seo.description,
}

const projectAccentMap: Record<string, string> = {
  'baahubali-teaser-vfx': 'rgba(255, 191, 71, 0.22)',
  'memory-corruption-comic': 'rgba(157, 78, 221, 0.24)',
  'raid-action-trailer': 'rgba(255, 92, 92, 0.2)',
  'she-never-left-part1': 'rgba(66, 215, 255, 0.18)',
  'she-never-left-part2': 'rgba(132, 104, 255, 0.18)',
  'luxury-landing-page-design': 'rgba(66, 215, 255, 0.18)',
  'myntra-emailer-campaign': 'rgba(255, 122, 162, 0.18)',
  'visual-communication-studies': 'rgba(255, 191, 71, 0.18)',
  'storyboard-screenwriting-lab': 'rgba(115, 160, 255, 0.18)',
  'premiere-editing-practice-lab': 'rgba(255, 122, 90, 0.18)',
  'after-effects-motion-graphics-lab': 'rgba(142, 103, 255, 0.2)',
  'photoshop-poster-and-matte-series': 'rgba(66, 215, 255, 0.16)',
  'animate-fundamentals-studies': 'rgba(255, 191, 71, 0.16)',
  'illustrator-brand-identity-suite': 'rgba(77, 212, 164, 0.12)',
}

function getProjectImage(project: (typeof curatedProjects)[number]) {
  const videoThumbnail = getYouTubeThumbnail(project.video_link)

  if (videoThumbnail) {
    return videoThumbnail
  }

  const previewResource = pickProjectPreviewResource(
    getProjectResources(project),
    projectArchives[project.slug]?.hero_resource_title
  )

  return previewResource ? getResourcePreviewImage(previewResource) : null
}

function getProjectAccent(project: (typeof curatedProjects)[number]) {
  return projectAccentMap[project.slug] ?? 'rgba(66, 215, 255, 0.16)'
}

function getProjectMediaClass(project: (typeof curatedProjects)[number]) {
  const mediaType = project.media_type.toLowerCase()

  if (
    mediaType.includes('image') ||
    mediaType.includes('pdf') ||
    mediaType.includes('gif') ||
    mediaType.includes('brand') ||
    mediaType.includes('web design') ||
    mediaType.includes('email design') ||
    mediaType.includes('script')
  ) {
    return 'object-contain p-4'
  }

  return 'object-cover'
}

function getCollageClass(project: (typeof curatedProjects)[number], index: number) {
  const pattern = index % 6

  if (project.media_type.toLowerCase().includes('gif')) {
    return 'md:row-span-2'
  }

  if (project.media_type.toLowerCase().includes('pdf')) {
    return 'xl:col-span-2'
  }

  if (pattern === 0) return 'xl:col-span-2'
  if (pattern === 2) return 'md:row-span-2'
  if (pattern === 4) return 'xl:col-span-2'

  return ''
}

function getCoverClass(project: (typeof curatedProjects)[number], index: number) {
  const pattern = index % 6
  const mediaType = project.media_type.toLowerCase()

  if (mediaType.includes('gif')) return 'min-h-[28rem]'
  if (mediaType.includes('pdf')) return 'min-h-[22rem] xl:min-h-[30rem]'
  if (pattern === 0) return 'min-h-[24rem] xl:min-h-[30rem]'
  if (pattern === 2) return 'min-h-[30rem]'
  if (pattern === 4) return 'min-h-[22rem] xl:min-h-[28rem]'

  return 'min-h-[22rem]'
}

const allProjects = [...curatedProjects].sort((left, right) => {
  const leftFeatured = Number(left.metadata.featured_homepage)
  const rightFeatured = Number(right.metadata.featured_homepage)

  if (leftFeatured !== rightFeatured) {
    return rightFeatured - leftFeatured
  }

  return right.year - left.year
})

const featuredProjects = allProjects.slice(0, 3)

export default function PortfolioPage() {
  return (
    <div className="page-hero pt-36">
      <section className="px-4 pb-10 pt-6">
        <div className="section-shell panel-strong cinema-card rounded-[2.2rem] p-6 md:p-10 xl:p-12">
          <div className="spotlight-grid items-stretch">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="eyebrow mb-4">Portfolio</p>
                <h1
                  className="max-w-5xl text-[3.6rem] leading-[0.88] text-white md:text-[5.5rem] xl:text-[7rem]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Building Creative Portfolio Architecture
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-vision-text/74 md:text-lg">
                  {rawContent.portfolio.intro}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-vision-text/45">
                    Total Projects
                  </p>
                  <p
                    className="mt-3 text-5xl text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {curatedProjects.length}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-vision-text/45">
                    Disciplines
                  </p>
                  <p
                    className="mt-3 text-5xl text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {portfolioCategories.length}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-vision-text/45">
                    Featured Focus
                  </p>
                  <p
                    className="mt-3 text-5xl text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    3
                  </p>
                </div>
              </div>
            </div>

            <div className="project-cover min-h-[28rem] rounded-[1.8rem]">
              {getProjectImage(featuredProjects[0]) ? (
                <img
                  src={getProjectImage(featuredProjects[0]) ?? ''}
                  alt={featuredProjects[0].title}
                  className="h-full w-full object-cover"
                  decoding="async"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(14,19,26,0.32),rgba(4,7,11,0.92))]" />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(160deg, ${getProjectAccent(featuredProjects[0])}, transparent 42%)`,
                }}
              />
              <p className="project-watermark">Spotlight Project</p>
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                <p className="mb-2 text-xs uppercase tracking-[0.28em] text-vision-text/58">
                  {featuredProjects[0].year} / {featuredProjects[0].type}
                </p>
                <h2
                  className="max-w-xl text-4xl leading-[0.94] text-white md:text-5xl"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {featuredProjects[0].title}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-vision-text/74">
                  {featuredProjects[0].summary}
                </p>
                <div className="mt-5">
                  <Link
                    href={`/portfolio/${featuredProjects[0].slug}`}
                    prefetch={false}
                    className="inline-flex rounded-full border border-vision-cyan/30 bg-black/25 px-5 py-3 text-sm font-medium text-vision-cyan hover:border-vision-cyan/60 hover:bg-vision-cyan/10"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="section-shell flex flex-wrap gap-3">
          {portfolioCategories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="metric-chip rounded-full px-4 py-2 text-sm hover:border-vision-cyan/50 hover:text-vision-cyan"
            >
              {category.name}
            </a>
          ))}
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="section-shell">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">All Projects</p>
              <h2
                className="text-4xl text-white md:text-6xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Every Project, Shown Properly
              </h2>
            </div>
          </div>

          <div className="grid auto-rows-[minmax(16rem,auto)] gap-6 md:grid-cols-2 xl:grid-cols-4">
            {allProjects.map((project, index) => {
              const projectImage = getProjectImage(project)
              const accent = getProjectAccent(project)
              const collageClass = getCollageClass(project, index)
              const coverClass = getCoverClass(project, index)
              const mediaClass = getProjectMediaClass(project)
              const compactSummary =
                project.summary.length > 110 ? `${project.summary.slice(0, 107)}...` : project.summary

              return (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  prefetch={false}
                  className={`panel-strong cinema-card group rounded-[1.8rem] p-4 hover:-translate-y-1 ${collageClass}`}
                >
                  <div className={`project-cover ${coverClass}`}>
                    {projectImage ? (
                      <img
                        src={projectImage}
                        alt={project.title}
                        className={`h-full w-full ${mediaClass}`}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(14,19,26,0.32),rgba(4,7,11,0.92))]" />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(160deg, ${accent}, transparent 42%)`,
                      }}
                    />
                    <p className="project-watermark">{project.media_type}</p>
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-vision-text/55">
                        {project.year} / {project.type}
                      </p>
                      <h3
                        className="text-3xl leading-[0.95] text-white"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-1 pb-1 pt-5">
                    <p className="text-sm leading-7 text-vision-text/68">{compactSummary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.categories.slice(0, 2).map((categorySlug) => {
                        const category = portfolioCategories.find((item) => item.slug === categorySlug)
                        return category ? (
                          <span
                            key={`${project.id}-${category.slug}`}
                            className="metric-chip rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
                          >
                            {category.name}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
