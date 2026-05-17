'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { navigationLinks } from '@/lib/content'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-black/20 px-5 py-4 shadow-2xl backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-3 cursor-interactive">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-[#c5a059]/25 bg-[#c5a059]/10 text-xl text-[#c5a059]">
            A
          </div>
          <div>
            <p className="text-3xl leading-none tracking-[0.1em] gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
              AESTHETE
            </p>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#e8dcc5]/70">
              Cinematic Archive
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`cursor-interactive rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(link.href)
                  ? 'bg-[#c5a059]/18 text-[#c5a059]'
                  : 'text-[#d7ccb4] hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="rounded-3xl border border-white/10 bg-white/5 p-3 text-[#d7ccb4] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="section-shell mt-3 rounded-[1.6rem] border border-white/10 bg-black/20 p-4 backdrop-blur-2xl md:hidden">
          <div className="space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm transition ${
                  isActive(link.href)
                    ? 'bg-[#c5a059]/18 text-[#c5a059]'
                    : 'bg-white/[0.03] text-[#d7ccb4] hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  )
}
