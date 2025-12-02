import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { allPosts } from "contentlayer/generated"

import { NeonAnimation } from "@/components/NeonAnimation"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Gay Men's Field Guide | Sophisticated Adventure for Gay Men",
  description:
    "Explore the Gay Men's Field Guide: cinematic storytelling, curated shop picks, and community resources built for modern gay adventurers.",
}

const sortedPosts = allPosts
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const thumbnailRail = sortedPosts.slice(0, 5)
const articleRail = sortedPosts.slice(0, 8)

export default function Home() {
  return (
    <>
      {/* Full-Screen Animated Background */}
      <section className="relative w-full min-h-screen overflow-hidden bg-black" aria-labelledby="hero-heading">
        <NeonAnimation />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 py-12">
          <div className="text-center max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white/80">Cinematic digital magazine • Built for gay men</span>
            </div>

            <h1
              id="hero-heading"
              className="mb-6 text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight"
            >
              Gay Men&apos;s Field Guide
            </h1>

            <p className="mb-12 text-lg sm:text-xl text-white/80 leading-relaxed">
              Sophisticated adventure meets modern masculinity. Now tuned for vibe coders, LLM edge explorers, and anyone who wants the fastest AI news without losing the cinematic feel.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/blog"
                className="group relative inline-flex items-center gap-3 rounded-full bg-white text-black px-6 py-3 text-base font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Latest stories</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white/90 transition hover:border-white/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Shop the edit
              </Link>
            </div>
          </div>

          <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {["Editorial", "Shop", "Guides"].map((pillar) => (
              <div
                key={pillar}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg backdrop-blur-sm"
              >
                <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">{pillar}</div>
                <p className="text-lg font-semibold text-white mb-2">
                  {pillar === "Editorial"
                    ? "Cinematic features and culture deep-dives"
                    : pillar === "Shop"
                      ? "Performance-ready gear curated for the journey"
                      : "City, trail, and resource guides built for community"}
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
                  {pillar === "Editorial"
                    ? "Mobile-first storytelling with a premium, magazine-quality reading experience."
                    : pillar === "Shop"
                      ? "Future-ready commerce with quick views, ethical sourcing, and a thumb-friendly cart."
                      : "Handpicked places, campsites, and services crafted to help you belong wherever you roam."}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden>
            <svg
              className="h-6 w-6 text-white/40"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      <main className="relative z-20 bg-[#0b0b0f] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/60" aria-hidden />

        <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr] items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">The mission</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">A cinematic home for modern gay adventure</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                We&apos;re building Gay Men&apos;s Field Guide into a premium, mobile-first destination that blends editorial storytelling, elevated e-commerce, and a curated resource hub. Every page is designed for thumb-friendly navigation, luminous imagery, and clear calls to action.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {["Performance-first builds", "Lighthouse-ready accessibility", "Responsive imagery", "Parallax-ready hero moments"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold text-white mb-1">{item}</p>
                    <p className="text-sm text-white/70">Crafted to hit 90+ scores, keep pages fast, and look incredible on any device.</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-black/40 to-green-950/40 p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold mb-4">Early access newsletter</h3>
              <p className="text-white/75 mb-6 leading-relaxed">
                Get launch updates, behind-the-scenes process, and first looks at our editorial features and shop drops.
              </p>
              <form className="space-y-4" aria-label="Join the Gay Men's Field Guide newsletter">
                <label className="block text-sm font-medium text-white/80" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-white text-black px-4 py-3 font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Join the list
                </button>
                <p className="text-xs text-white/60">We respect your inbox. Unsubscribe anytime.</p>
              </form>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">Live blog</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Thumbnail carousel for the latest drops</h2>
              <p className="text-white/75 mt-2 max-w-3xl">
                Built for mobile-first browsing: swipe through the freshest posts covering AI news, model updates, and edge-ready rituals for vibe coders.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 underline-offset-4 hover:text-white"
            >
              Visit the blog hub <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="-mx-6 mt-6 overflow-x-auto pb-4">
            <div className="flex gap-4 px-1 sm:px-6 snap-x snap-mandatory">
              {thumbnailRail.map((post) => (
                <Link
                  key={post._id}
                  href={post.slug}
                  className="group relative flex min-w-[260px] max-w-xs flex-col rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/40 snap-start"
                >
                  <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-teal-500/10 to-emerald-500/20">
                    {post.thumbnail ? (
                      <Image
                        src={post.thumbnail}
                        alt={`${post.title} thumbnail`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 280px, 70vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white/70">
                        Fresh dispatch
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white/90">
                      {formatDate(post.date)}
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">{post.category}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-white">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-1 text-sm text-white/70">{post.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">Navigation</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Pick your next move</h2>
              <p className="text-white/75 mt-3 max-w-3xl">
                Shortcut into the parts of the Field Guide built for vibe coders, LLM tinkerers, and adventure planners. Every lane is tuned for mobile fingers and late-night inspiration.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 hover:text-white"
            >
              See the blog hub
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[{
              label: "Inside co-ops",
              href: "/posts/inside-co-ops-for-vibe-coders",
              description: "Blueprints for sharing cloud credits, prompts, and rituals with your crew.",
            },
            {
              label: "Latest dispatches",
              href: "/blog",
              description: "A curated home for field notes, prompt recipes, and culture pieces.",
            },
            {
              label: "Shop the edit",
              href: "/shop",
              description: "Gear and goods that keep the essays ad-free and the campfire burning.",
            },
            {
              label: "Meet the editor",
              href: "/about",
              description: "Understand the ethos behind the Field Guide and how to collaborate.",
            }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-green-900/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                <div className="relative space-y-2">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-sm text-white/75">{item.description}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/80">Navigate <span aria-hidden>→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">Article carousel</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Eight live AI + edge updates</h2>
              <p className="text-white/75 mt-2 max-w-3xl">
                Covering model updates, vibe coding rituals, and ops notes for edge users. Scroll sideways on mobile or tap through on desktop.
              </p>
            </div>
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 underline-offset-4 hover:text-white"
            >
              View the archive <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="-mx-6 mt-6 overflow-x-auto pb-4">
            <div className="flex gap-4 px-1 sm:px-6 snap-x snap-mandatory">
              {articleRail.map((post) => (
                <article
                  key={post._id}
                  className="group flex min-w-[280px] max-w-sm flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/40 snap-start"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/60">
                    <span>{post.category}</span>
                    <span className="text-white/50">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-white">{post.title}</h3>
                  {post.description && (
                    <p className="mt-2 text-sm text-white/70">{post.description}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-200/80">
                    {(post.tags ?? []).slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-emerald-500/10 px-2 py-1">{tag}</span>
                    ))}
                  </div>
                  <Link
                    href={post.slug}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 underline-offset-4 transition hover:text-white"
                  >
                    Read update <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">Featured voices</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Built with the community</h2>
            <p className="text-white/75 mt-3 max-w-3xl">
              Real stories from gay men who navigate adventure, creativity, and modern masculinity with intention.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {[
              {
                quote: "Finally, a space that speaks to gay men without dumbing down the gear talk or the adventure planning.",
                author: "Marcus, Seattle",
                role: "Outdoor educator"
              },
              {
                quote: "The editorial quality is stunning. Every feature feels like it was crafted for my late-night reading sessions.",
                author: "James, Brooklyn",
                role: "Creative director"
              },
              {
                quote: "I appreciate the focus on ethical sourcing and community-first commerce. This is how modern brands should operate.",
                author: "David, Portland",
                role: "Sustainability consultant"
              }
            ].map((testimonial, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-black/40 to-green-950/20 p-6 shadow-lg">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 leading-relaxed mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">What&apos;s coming</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Content pillars at launch</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 hover:text-white"
            >
              Explore the roadmap
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Adventure-ready shop", "Editorial features", "Community guides"].map((heading, index) => (
              <div key={heading} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-green-900/10" aria-hidden />
                <div className="relative flex h-full flex-col gap-3">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/60">{`0${index + 1}`}</p>
                  <h3 className="text-2xl font-semibold text-white">{heading}</h3>
                  <p className="text-white/75 leading-relaxed">
                    {heading === "Adventure-ready shop"
                      ? "Responsive product grids, quick views, and a frictionless cart tuned for mobile hands."
                      : heading === "Editorial features"
                        ? "Long-form stories with sticky TOCs, cinematic headers, and accessible typography."
                        : "Curated routes, campsites, and city picks with embeddable maps and community notes."}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                    Learn more
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">For the Innovators</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Vibe Coding &amp; The LLM Edge</h2>
            <p className="text-white/75 mt-3 max-w-3xl">
              Dive into the world of &ldquo;vibe coding&rdquo; and explore the cutting edge of Large Language Models. This space is dedicated
              to developers and creators who are pushing the boundaries of what&rsquo;s possible with code and AI.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/blog/vibe-coding-intro"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-900/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              <div className="relative space-y-2">
                <p className="text-sm font-semibold text-white">What is Vibe Coding?</p>
                <p className="text-sm text-white/75">An introduction to the philosophy and practice of coding with intuition and creativity.</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/80">Read More <span aria-hidden>→</span></span>
              </div>
            </Link>
            <Link
              href="/blog/llm-edge-applications"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-900/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              <div className="relative space-y-2">
                <p className="text-sm font-semibold text-white">LLMs at the Edge</p>
                <p className="text-sm text-white/75">Exploring practical applications and new frontiers for language models in modern development.</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/80">Read More <span aria-hidden>→</span></span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
