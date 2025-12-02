import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"

import { allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"
import { formatDate } from "@/lib/utils"

interface PostProps {
  params: {
    slug: string[]
  }
}

type Post = (typeof allPosts)[number]

async function getPostFromParams(
  params: PostProps["params"]
): Promise<Post | null> {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
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
    <article className="prose-custom space-y-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Field Note</p>
        <h1 className="mb-2 text-balance text-4xl md:text-5xl">{post.title}</h1>
        <div className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        {post.description && (
          <p className="text-lg text-slate-600 dark:text-slate-300">{post.description}</p>
        )}
      </div>
      {(post.thumbnail || (post.graphics && post.graphics.length > 0)) && (
        <div className="grid gap-4 rounded-3xl border border-slate-200/70 bg-white/60 p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60 md:grid-cols-[1.1fr_1fr]">
          {post.thumbnail && (
            <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-100/50 dark:border-slate-800/70 dark:bg-slate-900">
              <Image
                src={post.thumbnail}
                alt={`${post.title} cover art`}
                width={900}
                height={540}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          )}
          {post.graphics && post.graphics.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {post.graphics.slice(0, 3).map((graphic) => (
                <div
                  key={graphic}
                  className="overflow-hidden rounded-xl border border-slate-200/60 bg-slate-100/30 dark:border-slate-800/70 dark:bg-slate-900/60"
                >
                  <Image
                    src={graphic}
                    alt={`${post.title} graphic`}
                    width={600}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Mdx code={post.body.code} />
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 text-sm text-slate-600 dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-300">
        <p>
          Thanks for wandering along. When you’re ready for a tangible souvenir, the <Link href="/shop">merch table</Link> is
          stocked with limited runs and hosted checkout links.
        </p>
      </div>
    </article>
  )
}
