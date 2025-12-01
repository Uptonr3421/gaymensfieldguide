import Link from "next/link"
import type { Metadata } from "next"

import { allPosts } from "contentlayer/generated"

import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dispatches for vibe coders, LLM edge explorers, and queer makers who want the inside co-ops before they trend.",
}

const posts = allPosts
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const featuredPosts = posts.filter((post) => post.featured).slice(0, 3)

export default function BlogPage() {
  return (
    <div className="space-y-12">
      <header className="overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-fuchsia-50 to-emerald-50 p-8 shadow-sm dark:border-slate-800/80 dark:from-slate-950 dark:via-fuchsia-950/40 dark:to-emerald-900/20">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">Blog</p>
            <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-slate-50">
              A dispatch hub for vibe coders and LLM edge explorers
            </h1>
            <p className="max-w-2xl text-base text-slate-700 dark:text-slate-200">
              Field-ready essays, prompt recipes, and cooperative intel built for the people shipping after midnight. Get the inside co-ops before they hit the mainstream algorithms and map the next moves with us.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <Link
                href={posts[0]?.slug ?? "/posts"}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500 dark:bg-white dark:text-slate-900"
              >
                Read the latest
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/60 px-4 py-2 text-slate-800 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-50"
              >
                Browse the archive
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              <span>LLM playgrounds</span>
              <span>Creative stacks</span>
              <span>Queer futurism</span>
              <span>Analog rituals</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Inside co-ops</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-50">Fresh drops for the experimenters</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-500" aria-hidden />
                <span>Rapid prompts for shipping portfolio-ready visuals and storyboards in an evening sprint.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                <span>Micro-co-op playbooks for queer dev crews who split cloud credits, datasets, and late-night QA.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                <span>LLM edge experiments that keep ethics, consent, and community care in the workflow.</span>
              </li>
            </ul>
            <Link
              href="/posts/inside-co-ops-for-vibe-coders"
              className="mt-6 inline-flex items-center text-sm font-semibold text-fuchsia-700 underline-offset-4 transition hover:underline dark:text-fuchsia-300"
            >
              Read the co-op blueprint
            </Link>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Featured</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Stories worth bookmarking</h2>
          </div>
          <Link
            href="/posts"
            className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline dark:text-slate-100"
          >
            View all posts
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {(featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3)).map((post) => (
            <article
              key={post._id}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-emerald-500/10" aria-hidden />
              <div className="relative space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">{post.category}</p>
                <h3 className="font-display text-2xl font-semibold text-slate-900 transition-colors group-hover:text-fuchsia-700 dark:text-slate-50 dark:group-hover:text-fuchsia-200">
                  <Link href={post.slug}>{post.title}</Link>
                </h3>
                {post.description && <p className="text-sm text-slate-700 dark:text-slate-200">{post.description}</p>}
                <Link
                  href={post.slug}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 underline-offset-4 transition hover:underline dark:text-slate-100"
                >
                  Open story
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Latest dispatches</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Fresh from the field</h2>
          </div>
          <Link
            href="/rss.xml"
            className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline dark:text-slate-100"
          >
            Subscribe via RSS
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.slice(0, 4).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Navigation</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Find your lane</h2>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              Whether you&apos;re prototyping with LLMs, plotting a co-op build, or browsing gear for the next queer camping trip, the Field Guide has a path.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  label: "Co-op playbooks",
                  href: "/posts/inside-co-ops-for-vibe-coders",
                  description: "Resource-sharing rituals for crews who build and rest together.",
                },
                {
                  label: "Field notes archive",
                  href: "/posts",
                  description: "Long-form essays on kinship, culture, and queer-led invention.",
                },
                {
                  label: "Gear & shop",
                  href: "/shop",
                  description: "Limited drops that fund independent publishing and trail snacks.",
                },
                {
                  label: "About the guide",
                  href: "/about",
                  description: "Meet the writer and the ethos behind the project.",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group block rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:border-fuchsia-300 hover:bg-white dark:border-slate-800/70 dark:bg-slate-900/80 dark:hover:border-fuchsia-500/50"
                >
                  <p className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-fuchsia-700 dark:text-slate-50 dark:group-hover:text-fuchsia-200">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/70 p-6 text-sm text-slate-700 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Stay nimble</h3>
            <p className="mt-2">
              The Gay Men&apos;s Field Guide is built to be thumb-friendly, ethical, and fast. Bookmark this blog for late-night inspo, trade the inside co-ops with your crew, and send us the prompts that unlocked your last aha moment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
