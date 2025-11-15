import Link from "next/link"

import { allPosts } from "contentlayer/generated"

import { PostCard } from "@/components/post-card"
import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products"

const latestPosts = allPosts
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)

const featuredProducts = products.slice(0, 3)

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-10 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Field Notes for Kindred Spirits
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          Gay Men’s Field Guide
        </h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-200">
          Writer Upton Rand documents the rituals, relationships, and quiet revolutions of queer men making a life together off
          the beaten path. Essays drop when they are ready—no push alerts, just thoughtful dispatches from the field.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
          <Link
            href="/posts"
            className="inline-flex items-center rounded-full border border-slate-900 px-5 py-2 uppercase tracking-wide transition hover:bg-slate-900 hover:text-white dark:border-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900"
          >
            Read the latest field notes
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center rounded-full px-5 py-2 uppercase tracking-wide text-slate-900 underline-offset-4 transition hover:underline dark:text-slate-100"
          >
            Visit the merch table
          </Link>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-slate-50">Latest Field Notes</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Long-form reflections on intimacy, culture, and chosen family from the desk of Upton Rand.
            </p>
          </div>
          <Link
            href="/posts"
            className="text-sm font-medium text-slate-900 underline-offset-4 transition hover:underline dark:text-slate-100"
          >
            View all posts
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-slate-50">The Merch Table</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Limited-run goods with no on-site inventory. Checkout links go straight to our fulfillment partners.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-slate-900 underline-offset-4 transition hover:underline dark:text-slate-100"
          >
            Explore the shop
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
