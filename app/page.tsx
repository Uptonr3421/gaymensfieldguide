import type { Metadata } from "next"
import Link from "next/link"

import { allPosts } from "contentlayer/generated"

import { NeonAnimation } from "@/components/NeonAnimation"
import { products } from "@/data/products"
import { guides } from "@/data/guides"

export const metadata: Metadata = {
  title: "Gay Men's Field Guide | Sophisticated Adventure for Gay Men",
  description:
    "Explore the Gay Men's Field Guide: cinematic storytelling, curated shop picks, and community resources built for modern gay adventurers.",
}

export default function Home() {
  const posts = allPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const featuredPost = posts[0]
  const featuredProducts = products.slice(0, 3)
  const featuredGuides = guides.slice(0, 3)

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
              Sophisticated adventure meets modern masculinity. Discover immersive storytelling, elevated gear picks, and curated guides designed to help you explore with confidence.
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

        <section className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">Latest story</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Editorial worth lingering on</h2>
              <p className="mt-2 max-w-3xl text-white/75">
                Fresh from the field—tight storytelling, practical rituals, and queer futurism tuned for the trail.
              </p>
            </div>
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white"
            >
              Browse all field notes
              <span aria-hidden>→</span>
            </Link>
          </div>

          {featuredPost && (
            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-black/40 to-green-950/40 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,165,116,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(224,122,95,0.16),transparent_35%)]" aria-hidden />
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{featuredPost.category}</p>
                  <h3 className="text-3xl md:text-4xl font-semibold leading-tight text-white">
                    <Link href={featuredPost.slug} className="transition hover:text-[#D4A574]">
                      {featuredPost.title}
                    </Link>
                  </h3>
                  {featuredPost.description && (
                    <p className="text-base text-white/80 leading-relaxed">{featuredPost.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-white/70">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                      <span className="h-2 w-2 rounded-full bg-[#E07A5F]" aria-hidden />
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {featuredPost.readingTime && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                        <span className="h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden />
                        {featuredPost.readingTime} min read
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={featuredPost.slug}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Read the feature
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white/85 transition hover:border-white hover:text-white"
                    >
                      See the blog hub
                    </Link>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold text-white">Inside this chapter</h4>
                  <ul className="mt-4 space-y-3 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#E07A5F]" aria-hidden />
                      Co-op rituals, prompt swaps, and ethics checks for experimental crews.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden />
                      Thumb-friendly reading with sticky table of contents planned for every feature.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
                      Related posts, pull quotes, and alt text-first imagery for accessibility.
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          )}
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">Shop showcase</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Gear that funds the journey</h2>
              <p className="mt-2 max-w-3xl text-white/75">
                Premium basics and camp-friendly staples with Stripe-hosted checkout links. Each purchase keeps the essays ad-free and the guides growing.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white"
            >
              Visit the shop
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/shop#${product.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#1B4332]/30 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                <div className="relative space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">Featured drop</p>
                      <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">{product.price}</span>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">{product.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/85">Quick add <span aria-hidden>→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">Guides</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Belong anywhere you land</h2>
              <p className="mt-2 max-w-3xl text-white/75">
                City nights, backcountry mornings, and support resources curated for queer men who roam.
              </p>
            </div>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white"
            >
              Explore all guides
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guide#${guide.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/30"
              >
                <div className="absolute inset-0 opacity-80 transition-opacity group-hover:opacity-100" aria-hidden>
                  <div
                    className="h-full w-full rounded-xl"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.65), rgba(27,67,50,0.65)), url(${guide.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
                <div className="relative flex h-full flex-col justify-between gap-3 text-white">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/70">{guide.category}</p>
                    <h3 className="text-2xl font-semibold leading-tight">{guide.title}</h3>
                    <p className="text-sm text-white/80 leading-relaxed">{guide.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                    {guide.action}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
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
      </main>
    </>
  )
}
