import Link from "next/link"
import { allPosts } from "@/.contentlayer/generated"
import { formatDate, formatLanguage, getCategoryClassName, getCategoryLabel, readingTimeLabel } from "@/lib/utils"

export const metadata = {
  title: "Archive",
  description: "Every post from Gay Men's Field Guide."
}

function getPosts() {
  return [...allPosts].sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
}

export default function PostsPage() {
  const posts = getPosts()

  return (
    <section className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Archive</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">All posts</h1>
        <p className="mt-2 text-sm text-slate-300">
          Essays, memos, and dispatches from 2024 and beyond. Filter by vibes, not by paywall.
        </p>
      </header>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post._id} className="rounded-3xl border border-white/10 bg-slate-900/40 p-5">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>{formatDate(post.date)}</span>
              <span>{readingTimeLabel(post.readingTime)}</span>
              <span>{formatLanguage(post.language)}</span>
              <span className={`rounded-full px-3 py-1 text-[0.65rem] ${getCategoryClassName(post.category)}`}>
                {getCategoryLabel(post.category)}
              </span>
            </div>
            <Link href={post.slug} className="mt-3 block">
              <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
              {post.description && <p className="mt-2 text-slate-300">{post.description}</p>}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
