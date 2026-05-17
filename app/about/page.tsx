import type { Metadata } from 'next'
import Image from 'next/image'
import { aboutContent, contactContent, site, skills } from '@/lib/content'
import portraitImage from '@/app/images/WhatsApp Image 2026-05-12 at 5.53.45 PM.jpeg'

export const metadata: Metadata = {
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
}

export default function About() {
  return (
    <div className="page-hero pt-28">
      <section className="px-4 pb-12 pt-8 md:pb-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="panel-strong cinema-card rounded-[2rem] p-8 md:p-12">
            <p className="eyebrow mb-4">About {site.author}</p>
            <h1
              className="text-[4rem] leading-[0.9] gradient-text md:text-[5.5rem]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              About {site.author}
            </h1>
            <p className="mt-6 text-base leading-8 text-vision-text/74 md:text-lg">
              {aboutContent.intro.short_bio}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ['Age', '20'],
                ['City', 'Ghaziabad'],
                ['State', 'Uttar Pradesh'],
                ['Freelance', contactContent.freelance_status.replace('Currently ', '')],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-vision-text/45">{label}</p>
                  <p className="mt-2 text-sm text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel cinema-card rounded-[2rem] overflow-hidden">
            <div className="relative min-h-[32rem] bg-black/20">
              <Image
                src={portraitImage}
                alt="Sanya portrait"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="eyebrow mb-2">Creative Profile</p>
                <p className="max-w-sm text-sm leading-7 text-vision-text/78">
                  Fantasy-driven visuals, cinematic teasers, motion design, and brand systems
                  that feel immersive and emotionally precise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="section-shell panel cinema-card rounded-[2rem] p-8 md:p-12">
          <p className="eyebrow mb-4">My Journey</p>
          <div className="grid gap-6 lg:grid-cols-2">
            <p className="text-sm leading-8 text-vision-text/72">{aboutContent.full_bio.paragraph_1}</p>
            <p className="text-sm leading-8 text-vision-text/72">{aboutContent.full_bio.paragraph_2}</p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <p className="text-sm leading-8 text-vision-text/72">
              Beyond technical execution, my approach is rooted in understanding the
              &quot;why&quot; behind every visual. Whether it&apos;s a high-energy cinematic teaser or a
              minimalist brand identity, the goal is always the same: to create something
              meaningful.
            </p>
            <p className="text-sm leading-8 text-vision-text/72">
              My experience in storyboarding and sequential art has taught me the importance of
              pacing and visual composition. These skills inform every VFX and motion graphics
              project I undertake. I&apos;m constantly exploring new ways to push the boundaries of
              digital artistry.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="section-shell">
          <div className="mb-8">
            <p className="eyebrow mb-3">Perspective</p>
            <h2
              className="text-5xl gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What Drives My Work
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {aboutContent.passions.map((item) => (
              <div key={item.question} className="panel cinema-card rounded-[1.6rem] p-6">
                <h3 className="mb-3 text-lg font-semibold text-vision-gold">{item.question}</h3>
                <p className="text-sm leading-7 text-vision-text/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <div className="panel cinema-card rounded-[1.8rem] p-8">
            <p className="eyebrow mb-3">Education</p>
            <h2
              className="text-4xl gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {aboutContent.education.degree}
            </h2>
            <p className="mt-2 text-vision-cyan">{aboutContent.education.school}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-vision-text/45">
              {aboutContent.education.duration}
            </p>
            <p className="mt-5 text-sm leading-7 text-vision-text/70">
              {aboutContent.education.description}
            </p>
          </div>

          <div className="panel cinema-card rounded-[1.8rem] p-8">
            <p className="eyebrow mb-3">Professional Experience</p>
            <h2
              className="text-4xl gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {aboutContent.experience.role}
            </h2>
            <p className="mt-2 text-vision-cyan">{aboutContent.experience.company}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-vision-text/45">
              {aboutContent.experience.duration}
            </p>
            <p className="mt-5 text-sm leading-7 text-vision-text/70">
              {aboutContent.experience.description}
            </p>
            <p className="mt-4 text-sm leading-7 text-vision-text/62">
              {aboutContent.experience.achievements}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {aboutContent.experience.tools.map((tool) => (
                <span key={tool} className="metric-chip rounded-full px-3 py-1 text-xs">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-10">
        <div className="section-shell">
          <div className="mb-8">
            <p className="eyebrow mb-3">Skills and Tools</p>
            <h2
              className="text-5xl gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Creative Toolkit
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: 'Animation & Motion', items: skills.technical, tone: 'text-vision-cyan' },
              { title: 'Video & Post', items: skills.creative, tone: 'text-vision-gold' },
              { title: 'Design & Software', items: skills.software, tone: 'text-vision-text/90' },
            ].map((group) => (
              <div key={group.title} className="panel cinema-card rounded-[1.6rem] p-6">
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
    </div>
  )
}
