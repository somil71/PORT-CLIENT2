import type { Metadata } from 'next'
import { site } from '@/lib/content'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import LenisSmoothScroll from '@/components/ui/LenisSmoothScroll'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  authors: [{ name: site.author }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${site.url}`,
    title: site.title,
    description: site.description,
    siteName: site.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <LenisSmoothScroll>
          <div className="relative min-h-screen overflow-hidden">
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </div>
        </LenisSmoothScroll>
      </body>
    </html>
  )
}
