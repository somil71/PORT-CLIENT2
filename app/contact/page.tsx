'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { contactContent, contactInfo, services, socialLinks, testimonials } from '@/lib/content'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'VFX',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'VFX',
      budget: '',
      message: '',
    })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="page-hero pt-28">
      <section className="px-4 pb-12 pt-8">
        <div className="section-shell panel-strong cinema-card rounded-[2rem] p-8 md:p-12">
          <p className="eyebrow mb-4">Contact</p>
          <h1
            className="text-[4rem] leading-[0.9] gradient-text md:text-[5.8rem]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {contactContent.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-vision-text/72 md:text-lg">
            {contactContent.subtext}
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="section-shell grid gap-6 md:grid-cols-3">
          <div className="panel cinema-card rounded-[1.6rem] p-6">
            <Mail className="mb-4 text-vision-cyan" size={28} />
            <p className="eyebrow mb-2">Email</p>
            <a href={`mailto:${contactInfo.email}`} className="text-sm text-vision-text/76 hover:text-vision-cyan">
              {contactInfo.email}
            </a>
          </div>
          <div className="panel cinema-card rounded-[1.6rem] p-6">
            <Phone className="mb-4 text-vision-cyan" size={28} />
            <p className="eyebrow mb-2">Phone</p>
            <a href={`tel:${contactInfo.phone}`} className="text-sm text-vision-text/76 hover:text-vision-cyan">
              {contactInfo.phone}
            </a>
          </div>
          <div className="panel cinema-card rounded-[1.6rem] p-6">
            <MapPin className="mb-4 text-vision-cyan" size={28} />
            <p className="eyebrow mb-2">Availability</p>
            <p className="text-sm leading-7 text-vision-text/72">{contactContent.availability}</p>
          </div>
        </div>
        <div className="section-shell mt-6">
          <div className="panel-strong cinema-card rounded-[1.6rem] p-6">
            <p className="eyebrow mb-2">Freelance Status</p>
            <p className="text-sm leading-7 text-vision-text/72">{contactContent.freelance_status}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="section-shell">
          <div className="mb-8">
            <p className="eyebrow mb-3">Services</p>
            <h2
              className="text-5xl gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What I Can Help With
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="panel cinema-card rounded-[1.6rem] p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.26em] text-vision-cyan">
                  {service.tagline}
                </p>
                <h3 className="text-lg font-semibold text-vision-gold">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-vision-text/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="section-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="panel-strong cinema-card rounded-[2rem] p-8 md:p-10">
            <p className="eyebrow mb-3">Project Form</p>
            <h2
              className="text-4xl gradient-text"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Start a Conversation
            </h2>
            <p className="mt-3 text-sm leading-7 text-vision-text/68">{contactContent.response_style}</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-vision-text/72">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-vision-text outline-none focus:border-vision-cyan/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-vision-text/72">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-vision-text outline-none focus:border-vision-cyan/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-vision-text/72">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-vision-text outline-none focus:border-vision-cyan/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-vision-text/72">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-vision-text outline-none focus:border-vision-cyan/40"
                >
                  <option>VFX</option>
                  <option>Animation</option>
                  <option>Video Editing</option>
                  <option>Branding</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm text-vision-text/72">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-vision-text outline-none focus:border-vision-cyan/40"
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-vision-text/58">
                {submitted ? "Thanks, I'll reply soon." : contactContent.best_for}
              </span>
              <button
                type="submit"
                className="cta-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.18em]"
              >
                Send Message
                <Send size={16} />
              </button>
            </div>
          </form>

          <div className="grid gap-6">
            <div className="panel cinema-card rounded-[1.8rem] p-8">
              <p className="eyebrow mb-3">Online</p>
              <h3
                className="text-4xl gradient-text"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Find me online
              </h3>
              <div className="mt-6 grid gap-3 text-sm text-vision-text/72">
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-vision-cyan/40">
                  LinkedIn
                </a>
                <a href={socialLinks.instagram[0]} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-vision-cyan/40">
                  Instagram
                </a>
                <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-vision-cyan/40">
                  YouTube
                </a>
                <a href={socialLinks.behance} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-vision-cyan/40">
                  Behance
                </a>
              </div>
            </div>

            <div className="panel cinema-card rounded-[1.8rem] p-8">
              <p className="eyebrow mb-4">Testimonial</p>
              <blockquote className="text-base leading-8 text-vision-text/78">
                "{testimonials[0].text}"
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-vision-gold">
                {testimonials[0].name}, {testimonials[0].role} - {testimonials[0].company}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
