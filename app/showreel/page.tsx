import type { Metadata } from 'next'
import DeferredIframe from '@/components/portfolio/DeferredIframe'
import { rawContent, showreelVideos } from '@/lib/content'

export const metadata: Metadata = {
  title: rawContent.showreel.seo.title,
  description: rawContent.showreel.seo.description,
}

function getYouTubeEmbedUrl(url: string) {
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

function getYouTubeThumbnail(url: string) {
  try {
    const parsed = new URL(url)
    const videoId = parsed.hostname.includes('youtu.be')
      ? parsed.pathname.slice(1)
      : parsed.searchParams.get('v')

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
  } catch {
    return null
  }
}

export default function ShowreelPage() {
  const featuredVideo = showreelVideos.find((video) => video.featured_reel) ?? showreelVideos[0]
  const otherVideos = showreelVideos.filter((video) => video.id !== featuredVideo.id)
  const featuredEmbedUrl = getYouTubeEmbedUrl(featuredVideo.link)
  const groupedVideos = otherVideos.reduce<Record<string, typeof otherVideos>>((accumulator, video) => {
    if (!accumulator[video.category]) {
      accumulator[video.category] = []
    }

    accumulator[video.category].push(video)
    return accumulator
  }, {})

  return (
    <div className="page-hero pt-28">
      <section className="px-4 pb-12 pt-8">
        <div className="section-shell panel-strong cinema-card rounded-[2rem] p-8 md:p-12">
          <p className="eyebrow mb-4">Showreel</p>
          <h1
            className="text-[4rem] leading-[0.9] gradient-text md:text-[5.8rem]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            My Work in Motion
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-vision-text/72 md:text-lg">
            {rawContent.showreel.intro}
          </p>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="section-shell panel cinema-card rounded-[2rem] p-8 md:p-10">
          <div className="mb-8">
            <p className="eyebrow mb-3">Featured Reel</p>
            <h2
              className="text-5xl gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {featuredVideo.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-vision-text/68">
              {featuredVideo.description}
            </p>
          </div>

          {featuredEmbedUrl ? (
            <div className="video-container border border-white/8 bg-black/20">
              <DeferredIframe
                src={featuredEmbedUrl}
                title={featuredVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-4 pb-24 pt-8">
        <div className="section-shell">
          {Object.entries(groupedVideos).map(([category, videos]) => (
            <div key={category} className="mb-14 last:mb-0">
              <div className="mb-8">
                <p className="eyebrow mb-3">Work Category</p>
                <h2
                  className="text-5xl gradient-text"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {category}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {videos.map((video) => {
                  const thumbnail = getYouTubeThumbnail(video.link)
                  return (
                    <a
                      key={video.id}
                      href={video.link}
                      target="_blank"
                      rel="noreferrer"
                      className="panel cinema-card rounded-[1.8rem] p-4 hover:-translate-y-1"
                    >
                      <div className="media-frame relative overflow-hidden rounded-[1.2rem]">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={video.title}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,8,11,0.3),rgba(6,8,11,0.68))]" />
                        <div className="relative z-10 flex min-h-[16rem] flex-col justify-end p-6">
                          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-vision-text/45">
                            {video.is_short ? 'Short Form' : category}
                          </p>
                          <h3
                            className="text-4xl leading-none text-white"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {video.title}
                          </h3>
                        </div>
                      </div>
                      <div className="px-3 pb-3 pt-5">
                        <p className="text-sm leading-7 text-vision-text/68">{video.description}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
