import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

const posts = [...allPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" })

const formatDate = (date: string) => dateFormatter.format(new Date(date))

export default function Home() {
  if (!posts.length) {
    return (
      <div className="prose dark:prose-invert">
        <p>There are no published posts yet. Please check back soon.</p>
      </div>
    )
  }

  return (
    <div className="prose dark:prose-invert">
      {posts.map((post) => (
        <article
          key={post._id}
          className="not-prose space-y-2 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0 dark:border-gray-800"
        >
          <div className="space-y-1">
            <Link href={post.slug}>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                {post.title}
              </h2>
            </Link>
            {post.description && (
              <p className="text-base text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
            )}
          </div>
          <time
            dateTime={post.date}
            className="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {formatDate(post.date)}
          </time>
        </article>
      ))}
    </div>
  )
}
