'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function LenisSmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.08,
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    })
    let frame = 0
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'

    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      root.style.scrollBehavior = previousScrollBehavior
    }
  }, [])

  return <>{children}</>
}
