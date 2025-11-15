import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPosts } from "@/.contentlayer/generated"
import { Mdx } from "@/components/mdx-components"
import { formatDate, formatLanguage, getCategoryClassName, getCategoryLabel, readingTimeLabel } from "@/lib/utils"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((entry) => entry.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="space-y-8">
      <div className="space-y-3">
        <Link href="/posts" className="text-sm text-fuchsia-200 hover:text-white">
          ← Back to all posts
        </Link>
        <h1 className="text-3xl font-semibold text-white">{post.title}</h1>
        {post.description && <p className="text-lg text-slate-300">{post.description}</p>}
        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
          <span>{formatDate(post.date)}</span>
          <span>{readingTimeLabel(post.readingTime)}</span>
          <span>{formatLanguage(post.language)}</span>
          <span className={`rounded-full px-3 py-1 text-[0.65rem] ${getCategoryClassName(post.category)}`}>
            {getCategoryLabel(post.category)}
          </span>
        </div>
      </div>
      <div className="prose prose-invert max-w-none">
        <Mdx code={post.body.code} />
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-300">
        <p>Share the piece, tip a creator, or forward it to your queer mastermind group.</p>
        <p className="mt-2">
          Questions or pitches? Email <a className="underline" href="mailto:hello@gaymensfieldguide.com">hello@gaymensfieldguide.com</a>.
        </p>
      </div>
    </article>
  )
}
