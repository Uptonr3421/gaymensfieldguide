import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" })

export default function Home() {
  const posts = allPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post._id} className="prose dark:prose-invert">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            <time dateTime={post.date}>
              {post.date ? dateFormatter.format(new Date(post.date)) : "Undated"}
            </time>
          </p>
          <Link href={post.slug} className="no-underline">
            <h2 className="mt-1 mb-2 text-2xl font-semibold">{post.title}</h2>
          </Link>
          {post.description && (
            <p className="text-base text-slate-700 dark:text-slate-200">
              {post.description}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
