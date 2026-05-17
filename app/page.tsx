import type { Metadata } from 'next'
import Link from 'next/link'
import { homepageContent, projects, site, skills } from '@/lib/content'
import { getYouTubeThumbnail } from '@/lib/project-media'

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
}

const featuredAccentMap: Record<string, string> = {
  'baahubali-teaser-vfx': 'rgba(197, 160, 89, 0.22)',
  'memory-corruption-comic': 'rgba(114, 216, 255, 0.24)',
  'raid-action-trailer': 'rgba(255, 148, 109, 0.2)',
}

export default function Home() {
  const featuredProjectIds = homepageContent.featured_projects.project_ids
  const featuredProjects = projects.filter((project) => featuredProjectIds.includes(project.id))

  return (
    <div className="pt-24">
      <section className="page-hero px-4 pb-12 pt-10 md:pb-20 md:pt-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="panel-strong cinema-card rounded-[2rem] p-8 md:p-10 lg:p-14">
            <div className="mb-6 flex items-center gap-4">
              <span className="eyebrow">Vision VFX Studio</span>
              <div className="kicker-line" />
            </div>

            <h1
              className="max-w-4xl text-[4.2rem] leading-[0.88] md:text-[6rem] lg:text-[7rem] gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {homepageContent.hero.headline}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-vision-text/72 md:text-lg">
              {homepageContent.hero.subheadline}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {homepageContent.hero.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="metric-chip rounded-full bg-white/5 px-4 py-2 text-sm text-white/88"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={homepageContent.hero.cta_primary.href}
                className="cta-primary rounded-full px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.18em]"
              >
                {homepageContent.hero.cta_primary.text}
              </Link>
              <Link
                href={homepageContent.hero.cta_secondary.href}
                className="cta-secondary rounded-full px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.18em]"
              >
                {homepageContent.hero.cta_secondary.text}
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="panel cinema-card rounded-[1.7rem] p-6">
              <p className="eyebrow mb-3">Creative Positioning</p>
              <h2
                className="text-3xl leading-none text-vision-text"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Full-spectrum visual direction
              </h2>
              <p className="mt-4 text-sm leading-7 text-vision-text/68">
                Work that moves like a short film: layered, polished, and designed to linger in
                memory.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel cinema-card rounded-[1.5rem] p-6">
                <p className="text-4xl gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                  5
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-vision-text/50">
                  Featured Projects
                </p>
              </div>
              <div className="panel cinema-card rounded-[1.5rem] p-6">
                <p className="text-4xl gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                  AAFT
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-vision-text/50">
                  Academic + Freelance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="section-shell">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">Featured Work</p>
              <h2 className="text-5xl gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                {homepageContent.featured_projects.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-vision-text/66">
              A curated edit of cinema, motion design, and visual storytelling built around mood,
              texture, and detail.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="panel cinema-card group overflow-hidden rounded-[1.8rem] p-0 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden rounded-[1.8rem] bg-slate-950">
                  {getYouTubeThumbnail(project.video_link) ? (
                    <img
                      src={getYouTubeThumbnail(project.video_link) ?? ''}
                      alt={project.title}
                      className="h-[22rem] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-[22rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(14,19,26,0.32),rgba(4,7,11,0.92))]" />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(160deg, ${featuredAccentMap[project.slug] ?? 'rgba(66, 215, 255, 0.16)'}, transparent 42%)`,
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="metric-chip rounded-full px-3 py-1 text-xs">
                        0{index + 1}
                      </span>
                      <span className="text-xs uppercase tracking-[0.24em] text-vision-text/45">
                        {project.media_type}
                      </span>
                    </div>
                    <h3
                      className="mt-4 max-w-xs text-4xl leading-none text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-950 px-5 py-6">
                  <p className="text-sm leading-7 text-vision-text/70">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.16em] text-vision-text/56"
                      >
                        {category.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:py-12">
        <div className="section-shell panel cinema-card rounded-[2rem] p-8 md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">Skills Snapshot</p>
              <h2 className="text-5xl gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                Tools Behind the Work
              </h2>
            </div>
            <Link href="/about" className="text-sm text-vision-cyan hover:text-vision-gold">
              View full profile
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: 'Animation & Motion', items: skills.technical, tone: 'text-vision-cyan' },
              { title: 'Video & Post', items: skills.creative, tone: 'text-vision-gold' },
              { title: 'Design & Software', items: skills.software, tone: 'text-vision-text/90' },
            ].map((group) => (
              <div key={group.title} className="panel-strong cinema-card rounded-[1.6rem] p-6">
                <h3 className={`mb-4 text-lg font-semibold ${group.tone}`}>{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-sm text-vision-text/72"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 md:pb-28">
        <div className="section-shell panel-strong cinema-card rounded-[2.2rem] p-8 md:p-12 lg:p-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow mb-3">Next Step</p>
              <h2
                className="text-5xl leading-none gradient-text md:text-6xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {homepageContent.cta_section.headline}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-vision-text/72 md:text-base">
                {homepageContent.cta_section.subtext}
              </p>
              <Link
                href={homepageContent.cta_section.button_href}
                className="cta-primary mt-6 inline-block rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.18em]"
              >
                {homepageContent.cta_section.button_text}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
