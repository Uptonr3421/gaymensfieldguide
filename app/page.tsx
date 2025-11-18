import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

import { formatDate } from "@/lib/utils"

export default function Home() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="space-y-10">
      {posts.map((post) => (
        <article key={post._id} className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <div className="flex flex-col gap-2">
            <dl>
              <dt className="sr-only">Published on</dt>
              <dd className="text-sm text-slate-600 dark:text-slate-400">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </dd>
            </dl>
            <Link href={post.slug} className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {post.title}
            </Link>
            {post.description && (
              <p className="text-base text-slate-700 dark:text-slate-300">{post.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
