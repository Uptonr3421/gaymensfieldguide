import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { Inter } from "next/font/google"

import "./globals.css"

import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"
import { siteConfig } from "@/lib/site-config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://gaymensfieldguide.com"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "vibecoding",
    "creative coding",
    "web development",
    "coding blog",
    "developer lifestyle",
    "tech culture",
    "programming tutorials",
    "Next.js",
    "React",
    "developer community",
    "Cleveland tech",
    "coding shop",
    "developer merch",
    "tech wellness",
    "creative developer",
    "indie hacker",
    "modern web development",
    "coding aesthetics",
    "developer culture",
    "programming community"
  ],
  authors: [{ name: "Gay Men's Field Guide" }],
  creator: "Gay Men's Field Guide",
  publisher: "Gay Men's Field Guide",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: "https://gaymensfieldguide.com",
    locale: "en_US",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero-splash.jpg",
        width: 1200,
        height: 630,
        alt: "Gay Men's Field Guide - Vibecoding, Tech Culture, and Developer Lifestyle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/hero-splash.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#d946ef" />
        <StructuredData />
      </head>
      <body
        className={`min-h-screen bg-slate-50 text-slate-900 antialiased transition dark:bg-slate-950 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-48 bg-gradient-to-b from-fuchsia-500/20 via-transparent to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-8">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-slate-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
              aria-label="Skip to main content"
            >
              Skip to content
            </a>

            <header 
              className="sticky top-6 z-20 mb-10 rounded-2xl border border-slate-200/60 bg-white/90 px-6 py-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70"
              role="banner"
            >
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/" 
                  className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white hover:text-fuchsia-600 dark:hover:text-fuchsia-300 transition-colors"
                  aria-label="Gay Men's Field Guide - Home"
                >
                  {siteConfig.name}
                </Link>
                <p className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-slate-400" aria-label="Location">Est. Cleveland</p>
                <nav className="ml-auto flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300" aria-label="Main navigation">
                  {siteConfig.nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="transition hover:text-fuchsia-600 dark:hover:text-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 rounded"
                      aria-label={item.label}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <ModeToggle />
                </nav>
              </div>
            </header>

            <main id="main" className="flex-1 pb-12" role="main">
              <div className="space-y-12">{children}</div>
            </main>

            <footer 
              className="mt-auto border-t border-slate-200/60 pt-8 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400"
              role="contentinfo"
            >
              <p>{siteConfig.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500">
                <span>{siteConfig.location}</span>
                <a
                  className="text-fuchsia-700 transition hover:text-fuchsia-500 dark:text-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded"
                  href={`mailto:${siteConfig.contactEmail}`}
                  aria-label={`Email us at ${siteConfig.contactEmail}`}
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </footer>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
