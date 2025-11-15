import Link from "next/link"
import { allPosts } from "@/.contentlayer/generated"
import { products } from "@/data/products"
import { siteConfig } from "@/lib/site-config"
import {
  formatDate,
  formatLanguage,
  getCategoryClassName,
  getCategoryLabel,
  readingTimeLabel,
} from "@/lib/utils"

function getSortedPosts() {
  return [...allPosts].sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
}

export default function Home() {
  const posts = getSortedPosts()
  const featuredPost = posts.find((post) => post.featured) ?? posts[0]
  const rest = featuredPost ? posts.filter((post) => post._id !== featuredPost._id) : posts
  const latestPosts = rest.slice(0, 3)

  const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1
    return acc
  }, {})

  const languageCounts = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.language] = (acc[post.language] ?? 0) + 1
    return acc
  }, {})

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  const shopPreview = products.slice(0, 2)

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-600/20 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-fuchsia-900/20">
        <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-200">Now Publishing</p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Field notes on tech, sex, culture, and commerce for queer folks everywhere.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-200">{siteConfig.description}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-slate-200">
          {Object.entries(languageCounts).map(([language, count]) => (
            <span key={language} className="rounded-full border border-white/20 px-3 py-1 text-[0.7rem]">
              {formatLanguage(language)} · {count} posts
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/posts" className="inline-flex items-center rounded-full bg-white px-5 py-2 font-semibold text-slate-900">
            Browse the archive ↗
          </Link>
          <a
            href="https://mailchi.mp/uptonrand/field-notes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-slate-100 transition hover:border-white"
          >
            Subscribe for dispatches
          </a>
        </div>
      </section>

      {featuredPost && (
        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Featured</p>
          <Link href={featuredPost.slug} className="mt-3 block">
            <h2 className="text-2xl font-semibold text-white">{featuredPost.title}</h2>
            {featuredPost.description && <p className="mt-2 text-slate-300">{featuredPost.description}</p>}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>{formatDate(featuredPost.date)}</span>
            <span>•</span>
            <span>{readingTimeLabel(featuredPost.readingTime)}</span>
            <span>•</span>
            <span>{formatLanguage(featuredPost.language)}</span>
            <span className={`rounded-full px-3 py-1 text-[0.65rem] ${getCategoryClassName(featuredPost.category)}`}>
              {getCategoryLabel(featuredPost.category)}
            </span>
          </div>
        </section>
      )}

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Latest dispatches</h3>
          <Link href="/posts" className="text-sm text-fuchsia-200 hover:text-white">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article key={post._id} className="rounded-2xl border border-white/10 p-5">
              <div className={`mb-3 inline-flex rounded-full px-3 py-1 text-[0.65rem] font-semibold ${getCategoryClassName(post.category)}`}>
                {getCategoryLabel(post.category)}
              </div>
              <Link href={post.slug}>
                <h4 className="text-lg font-semibold text-white">{post.title}</h4>
                {post.description && <p className="mt-2 text-sm text-slate-300">{post.description}</p>}
              </Link>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                <span>{formatDate(post.date)}</span>
                <span>{readingTimeLabel(post.readingTime)}</span>
                <span>{formatLanguage(post.language)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Editorial beats</p>
            <h3 className="text-2xl font-semibold text-white">Where the conversation lives</h3>
          </div>
          <Link href="/about" className="text-sm font-semibold text-fuchsia-200 hover:text-white">
            Learn about the project →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {topCategories.map(([category, count]) => (
            <div key={category} className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{getCategoryLabel(category)}</p>
              <p className="text-xs uppercase tracking-wide text-slate-400">{count} posts and counting</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Shop the field kit</h3>
          <Link href="/shop" className="text-sm text-fuchsia-200 hover:text-white">
            View shop
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {shopPreview.map((product) => (
            <article key={product.id} className="rounded-3xl border border-white/10 bg-slate-900/50 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.price}</p>
              <h4 className="mt-2 text-xl font-semibold text-white">{product.title}</h4>
              <p className="mt-2 text-sm text-slate-300">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.7rem] text-slate-300">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={product.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
              >
                Checkout via Stripe ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-dashed border-white/20 p-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Stay in the loop</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Receive Sunday dispatches & mutual-aid calls to action.</h3>
        <p className="mt-3 text-sm text-slate-300">
          We keep it lightweight: one email, three sections, always actionable.
        </p>
        <a
          href="https://mailchi.mp/uptonrand/field-notes"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white"
        >
          Join the list →
        </a>
      </section>
    </div>
  )
}
