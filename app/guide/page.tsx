import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

import { guides } from "@/data/guides"

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Curated city nights, camping weekends, and queer wellness resources for gay men who want to belong anywhere they land.",
  openGraph: {
    title: "Guides | Gay Men's Field Guide",
    description:
      "Curated city nights, camping weekends, and queer wellness resources for gay men who want to belong anywhere they land.",
  },
}

export default function GuidePage() {
  return (
    <div className="space-y-10">
      <header className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1B4332]/50 via-black/60 to-[#2C2C2C] p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Resource hub</p>
            <h1 className="text-4xl font-semibold leading-tight">Guides for cinematic queer adventures</h1>
            <p className="text-base text-white/80">
              Bookmark-worthy itineraries, backcountry picks, and queer wellness essentials. Everything here is designed for mobile-first browsing with clear calls to action.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
              <span className="rounded-full border border-white/20 px-3 py-1">City Guides</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Camping</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Resources</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">What to expect</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden />
                Mobile-first cards with alt text-first imagery.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#E07A5F]" aria-hidden />
                Clear CTAs to open maps, checklists, and emergency resources.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
                Future-ready for embedded maps and user submissions.
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Featured</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Start exploring</h2>
          </div>
          <Link
            href="/contact"
            className="text-sm font-semibold text-[#1B4332] underline-offset-4 transition hover:text-[#D4A574] dark:text-[#D4A574]"
          >
            Suggest a guide
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              id={guide.slug}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/70 dark:bg-slate-900"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 400px, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden />
                <p className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {guide.category}
                </p>
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-[#1B4332] dark:text-white">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200">{guide.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332] underline-offset-4 dark:text-[#D4A574]">
                  {guide.action}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/60">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Accessibility & SEO</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Built to be seen and usable</h2>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              Each guide is planned with semantic HTML, alt text-first media, structured data, and generous tap targets so readers on 375px viewports can navigate without friction.
            </p>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden />
                Table of contents patterns and sticky nav for long-form guides.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#E07A5F]" aria-hidden />
                Schema-ready content types for city guides, camping spots, and resource lists.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                Responsive grids that degrade gracefully on low bandwidth connections.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/80 p-5 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-800/60 dark:text-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">What&apos;s next</h3>
            <p className="mt-2">
              Embedding maps, swipe-friendly photo galleries, and user submissions are on deck. If you have a campsite, route, or bar to feature, drop us a note and we&apos;ll credit you.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332] underline-offset-4 transition hover:text-[#D4A574] dark:text-[#D4A574]"
            >
              Share a recommendation
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
