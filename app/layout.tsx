import "./globals.css"

import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import { Analytics } from "@/components/analytics"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

const siteUrl = "https://gaymensfieldguide.com"
const siteDescription =
  "Stories, strategies, and soft skills for queer men who build community off the beaten path."

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gay Men’s Field Guide",
    template: "%s · Gay Men’s Field Guide",
  },
  description: siteDescription,
  authors: [{ name: "Upton Rand" }],
  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
  openGraph: {
    title: "Gay Men’s Field Guide",
    description: siteDescription,
    url: siteUrl,
    siteName: "Gay Men’s Field Guide",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gay Men’s Field Guide",
    description: siteDescription,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-stone-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50 ${inter.variable} ${playfair.variable}`}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 px-4 pb-16 pt-10 md:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-4xl">{children}</div>
            </main>
            <SiteFooter />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
