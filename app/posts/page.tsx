import Link from "next/link"
import type { Metadata } from "next"

import { allPosts } from "contentlayer/generated"

import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: "Field Notes",
  description: "An archive of essays and dispatches from Upton Rand's Gay Men's Field Guide.",
}

const posts = allPosts
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function PostsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Archive</p>
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-slate-50">Field Notes</h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Long-form reflections on kinship, queer care, and carving out softer spaces. Subscribe the old fashioned way: bookmark
          this page and drop in when you crave a new dispatch.
        </p>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Prefer a feed reader? <Link href="/rss.xml" className="font-medium underline">Subscribe via RSS</Link>.
        </div>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="rounded-3xl border border-dashed border-slate-300/80 bg-white/70 p-6 text-sm text-slate-600 dark:border-slate-700/80 dark:bg-slate-900/50 dark:text-slate-300">
        <p>
          Want to support the project? <Link href="/shop" className="font-medium underline">Browse the merch table</Link>—each
          purchase keeps the essays ad-free and the adventures well supplied.
        </p>
      </div>
    </div>
  )
}
