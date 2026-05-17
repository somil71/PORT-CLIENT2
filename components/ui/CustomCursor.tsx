'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const body = document.body
    const cursorNode = cursorRef.current
    const ringNode = ringRef.current
    let x = 0
    let y = 0
    let frame = 0

    const render = () => {
      frame = 0

      if (cursorNode) {
        cursorNode.style.left = `${x}px`
        cursorNode.style.top = `${y}px`
      }

      if (ringNode) {
        ringNode.style.left = `${x}px`
        ringNode.style.top = `${y}px`
      }
    }

    const update = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY

      if (!frame) {
        frame = window.requestAnimationFrame(render)
      }
    }

    const onPointerDown = () => cursorNode?.classList.add('custom-cursor--active')
    const onPointerUp = () => cursorNode?.classList.remove('custom-cursor--active')
    const onPointerEnter = () => body.classList.add('cursor-hidden')
    const onPointerLeave = () => body.classList.remove('cursor-hidden')
    const onPointerOver = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest('a, button, .cursor-interactive')) {
        cursorNode?.classList.add('custom-cursor--hover')
      }
    }
    const onPointerOut = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest('a, button, .cursor-interactive') === null) {
        cursorNode?.classList.remove('custom-cursor--hover')
      }
    }

    window.addEventListener('mousemove', update)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointerenter', onPointerEnter)
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerover', onPointerOver)
    window.addEventListener('pointerout', onPointerOut)

    return () => {
      window.removeEventListener('mousemove', update)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointerenter', onPointerEnter)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerover', onPointerOver)
      window.removeEventListener('pointerout', onPointerOut)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      body.classList.remove('cursor-hidden')
    }
  }, [])

  return (
    <div>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </div>
  )
}
