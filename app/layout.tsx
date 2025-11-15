import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import "./globals.css"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { siteConfig } from "@/lib/site-config"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-50">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
            <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-16 pt-8 sm:px-6 lg:px-10">
              <header className="border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
                    <span className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                      <Image
                        src="/images/gaymensfieldguidelogo.jpg"
                        alt="Gay Men's Field Guide logo"
                        fill
                        sizes="48px"
                        className="object-cover"
                        priority
                      />
                    </span>
                    <div>
                      <p className="text-base uppercase tracking-[0.2em] text-fuchsia-200">{siteConfig.name}</p>
                      <p className="text-sm text-slate-300">{siteConfig.tagline}</p>
                    </div>
                  </Link>
                  <nav className="ml-auto flex flex-wrap items-center gap-4 text-sm font-medium text-slate-200">
                    {siteConfig.nav.map((item) => (
                      <Link key={item.href} href={item.href} className="transition hover:text-white">
                        {item.label}
                      </Link>
                    ))}
                    <ModeToggle />
                  </nav>
                </div>
              </header>
              <main className="flex-1 py-10">{children}</main>
              <footer className="border-t border-white/10 pt-6 text-sm text-slate-300">
                <p className="font-semibold text-slate-100">{siteConfig.name}</p>
                <p className="mt-2 text-slate-300">{siteConfig.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-wide text-slate-400">
                  <span>{siteConfig.location}</span>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                    {siteConfig.email}
                  </a>
                  <a href={siteConfig.social.instagram} className="hover:text-white" target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </div>
              </footer>
            </div>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
