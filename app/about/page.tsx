import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description:
    "Behind Gay Men's Field Guide: the mission, the editor, and the promise to blend cinematic storytelling with practical queer adventure resources.",
  openGraph: {
    title: "About | Gay Men's Field Guide",
    description:
      "Meet the editor and the ethos behind Gay Men's Field Guide—a cinematic, mobile-first home for queer stories, shop drops, and guides.",
  },
}

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2C2C2C] via-[#1B4332]/80 to-black p-8 text-white shadow-2xl">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">About the Field Guide</p>
            <h1 className="text-4xl font-semibold leading-tight">A cinematic home for queer adventure</h1>
            <p className="text-base text-white/80">
              Gay Men&apos;s Field Guide blends editorial storytelling, curated shop drops, and resource-rich guides. Every page is crafted for mobile readers, clean accessibility, and premium visuals that honor queer community.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
              <span className="rounded-full border border-white/20 px-3 py-1">Editorial</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Shop</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Guides</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">What drives us</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden />
                Sophisticated visuals with WCAG-conscious contrast.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#E07A5F]" aria-hidden />
                Stories and products that respect queer men&apos;s time, budgets, and safety.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
                Lighthouse-ready performance and thumb-friendly flows.
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Meet the editor</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            Upton Rand writes and curates Gay Men&apos;s Field Guide from Cleveland, Ohio. The work blends hands-on product testing, queer culture reporting, and a bias toward ethical tech. Expect interviews, rituals for co-ops, and road-tested gear notes.
          </p>
          <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/80 p-4 text-xs text-slate-700 dark:border-slate-700/70 dark:bg-slate-800/60 dark:text-slate-200">
            <p className="font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Office hours</p>
            <p className="mt-1">Send collaborations, product pitches, or story ideas.</p>
            <Link
              href="mailto:hello@gaymensfieldguide.com"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332] underline-offset-4 transition hover:text-[#D4A574] dark:text-[#D4A574]"
            >
              hello@gaymensfieldguide.com
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <div className="space-y-3 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Brand pillars</h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden />
              <span>Authenticity first—no stock tropes, always diverse queer representation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#E07A5F]" aria-hidden />
              <span>Performance obsessed—targeting 90+ Lighthouse scores with responsive images and code splitting.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              <span>Community-powered—future phases include user submissions, embedded maps, and collaborative playlists.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Roadmap</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Where we&apos;re headed</h2>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              Guided shop experiences, swipe-ready photo essays, and embedded checkout flows are in progress. Expect mobile-optimized UI patterns, accessible nav, and structured data on every launch.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">Performance</span>
              <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">Accessibility</span>
              <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">Editorial polish</span>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/80 p-5 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-800/60 dark:text-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Want to collaborate?</h3>
            <p className="mt-2">
              Reach out for partnerships, product testing, or co-authored guides. The Field Guide is open to brands and creators who value community, consent, and sustainability.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1B4332] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A574]"
              >
                Contact form
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-[#D4A574] dark:border-slate-700 dark:text-white"
              >
                Visit the shop
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
