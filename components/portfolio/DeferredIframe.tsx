'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  title: string
  className?: string
  allow?: string
  allowFullScreen?: boolean
}

export default function DeferredIframe({
  src,
  title,
  className,
  allow,
  allowFullScreen,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current

    if (!node || shouldLoad) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          src={src}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow={allow}
          allowFullScreen={allowFullScreen}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(66,215,255,0.16),transparent_35%),linear-gradient(180deg,rgba(14,19,26,0.55),rgba(4,7,11,0.96))] p-6 text-center"
        >
          <span className="rounded-full border border-white/12 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.24em] text-vision-text/74">
            Load Preview
          </span>
        </button>
      )}
    </div>
  )
}
