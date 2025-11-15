import Link from "next/link"

import type { Post } from "contentlayer/generated"

import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <span>{formatDate(post.date)}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold text-slate-900 transition-colors group-hover:text-slate-700 dark:text-slate-50 dark:group-hover:text-slate-200">
        <Link href={post.slug}>{post.title}</Link>
      </h3>
      {post.description && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{post.description}</p>}
      <Link
        href={post.slug}
        className="mt-6 inline-flex items-center text-sm font-medium text-slate-900 underline-offset-4 transition hover:underline dark:text-slate-100"
      >
        Read field note
      </Link>
    </article>
  )
}
