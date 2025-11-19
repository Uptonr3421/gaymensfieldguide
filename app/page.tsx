import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

const highlightThemes = [
  "Safety & wellness roadmaps",
  "Dating culture decoded",
  "Destination deep-dives",
  "Queer-owned experiences",
]

export default function Home() {
  const posts = [...allPosts].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return bTime - aTime
  })

  const featuredPost = posts[0]
  const curatedPosts = posts.slice(0, 6)

  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-100">
      <div className="aurora" aria-hidden />
      <div className="grid-overlay" aria-hidden />
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />
      <div className="orb orb-3" aria-hidden />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-6 py-16 sm:px-10 lg:py-24">
        <section className="grid gap-12 lg:grid-cols-[1.25fr,0.75fr] lg:items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 shadow-lg shadow-fuchsia-500/10">
              <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.75)]" aria-hidden />
              Fresh field intel every week
            </div>

            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.6em] text-white/50">Gay Mens Field Guide</p>
              <h1 className="text-4xl font-semibold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                Navigate queer travel, culture, and connection with cinematic clarity.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                A living atlas for gay and queer men who want more than generic recs. We pair
                on-the-ground reporting with data-backed insight so every adventure feels intentional,
                safe, and joy-filled.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {featuredPost && (
                <Link
                  href={featuredPost.slug}
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-400 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-fuchsia-500/30 transition hover:scale-[1.02] hover:shadow-rose-500/30"
                >
                  Read the latest dispatch
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              )}
              <Link
                href="/posts"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white/80 backdrop-blur transition hover:border-white hover:text-white"
              >
                Browse the archive
              </Link>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-white/80 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">Highlights</p>
              <span className="text-xs text-white/70">Updated live</span>
            </div>
            <div className="grid gap-4">
              {highlightThemes.map((theme) => (
                <div key={theme} className="glass-card">
                  <p className="text-base font-semibold text-white">{theme}</p>
                  <p className="text-sm text-white/60">Meticulously scouted by locals & fixers.</p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.03] p-4 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-white/50">Dispatches</p>
              <p className="text-4xl font-semibold text-white">{posts.length}</p>
              <p className="text-xs text-white/60">field notes published and counting</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">Latest reports</p>
              <h2 className="text-3xl font-semibold text-white">Field intel ready for your next trip</h2>
            </div>
            <p className="max-w-lg text-sm text-white/70">
              Every guide blends culture, safety, nightlife, and wellness cues so you know how to show up
              with respect and confidence.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {curatedPosts.map((post) => (
              <Link
                href={post.slug}
                key={post._id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/40 transition hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-white/[0.06]"
              >
                <div className="absolute inset-px rounded-[22px] border border-white/5" aria-hidden />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/50">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500/50 to-orange-400/50 text-base font-semibold text-white">
                      {post.title.slice(0, 1)}
                    </span>
                    {post.date && (
                      <time dateTime={post.date} className="text-white/70">
                        {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(post.date))}
                      </time>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-white transition group-hover:text-fuchsia-200">
                    {post.title}
                  </h3>
                  {post.description && <p className="text-white/70">{post.description}</p>}
                  <p className="text-sm font-semibold text-fuchsia-200">Dive into the field notes →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/40">Mission control</p>
            <h2 className="text-3xl font-semibold text-white">What makes a Gay Mens Field Guide drop special?</h2>
            <ul className="space-y-4 text-sm text-white/70">
              <li>✺ Sourced from queer fixers embedded in the destination.</li>
              <li>✺ Actionable context on safety, consent, and etiquette.</li>
              <li>✺ Layered itineraries that flex for solo trips or group escapes.</li>
              <li>✺ Playful rituals and wellness practices to keep you grounded.</li>
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
            >
              Meet the editors →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {posts.slice(0, 4).map((post) => (
              <Link
                key={post._id}
                href={post.slug}
                className="glass-panel group"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">Field Note</p>
                <h3 className="text-lg font-semibold text-white group-hover:text-fuchsia-200">{post.title}</h3>
                {post.description && <p className="text-sm text-white/60">{post.description}</p>}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
