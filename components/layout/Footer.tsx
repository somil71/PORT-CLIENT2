'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Youtube } from 'lucide-react'
import { contactInfo, navigationLinks, rawContent, socialLinks } from '@/lib/content'

export default function Footer() {
  const instagramLink = socialLinks.instagram[0]
  const brand = rawContent.navigation.brand

  return (
    <footer className="px-4 pb-6 pt-20">
      <div className="section-shell panel cinema-card rounded-[2rem] p-8 md:p-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div>
            <p className="eyebrow mb-4">{brand}</p>
            <h3 className="mb-4 text-4xl gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
              Cinematic visuals for modern storytelling
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-[#d7ccb4]/90">
              A portfolio built around editing, compositing, motion graphics, and visual storytelling for brands, filmmakers, and digital campaigns.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Quick Links</p>
            <div className="grid gap-3 text-sm text-[#d7ccb4]/80">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} className="cursor-interactive hover:text-[#c5a059]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">Contact</p>
            <div className="space-y-3 text-sm text-[#d7ccb4]/78">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#c5a059]" />
                <a href={`mailto:${contactInfo.email}`} className="cursor-interactive hover:text-[#c5a059]">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#c5a059]" />
                <a href={`tel:${contactInfo.phone}`} className="cursor-interactive hover:text-[#c5a059]">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#c5a059]" />
                <span>Ghaziabad, UP, India</span>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 text-[#d7ccb4]/80">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-interactive hover:text-[#c5a059]">
                  <Linkedin size={20} />
                </a>
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="cursor-interactive hover:text-[#c5a059]" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.5 2c-1.5 0-2.7 1.2-2.7 2.8v8.4c0 1.5 1.2 2.7 2.8 2.7h8.4c1.5 0 2.7-1.2 2.7-2.8V7.8c0-1.5-1.2-2.7-2.8-2.7H7.3m9.4 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                </a>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="cursor-interactive hover:text-[#c5a059]">
                  <Youtube size={20} />
                </a>
                <a href={socialLinks.behance} target="_blank" rel="noopener noreferrer" className="cursor-interactive hover:text-[#c5a059]" aria-label="Behance">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.5 8.5H11v1H8.5v-1zm4.5 6h2.5c.55 0 1-.45 1-1s-.45-1-1-1h-2.5v2zm-7 0h1.5c.55 0 1-.45 1-1s-.45-1-1-1H6v2zm9-5h3.5v1h-3.5v-1zM6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6zm7 1h4v1h-4V6zm-1 7h5c.55 0 1-.45 1-1s-.45-1-1-1h-5v2zm0 3h3v1h-3v-1zM5 9h3v1H5V9zm0 3h3v1H5v-1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-5 text-center text-sm text-[#d7ccb4]/60">
          <p>{rawContent.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
