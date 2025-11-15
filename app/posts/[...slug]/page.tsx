import { Metadata } from "next"
import { notFound } from "next/navigation"

import { allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"
import { formatDate } from "@/lib/utils"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
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
      <Mdx code={post.body.code} />
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 text-sm text-slate-600 dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-300">
        <p>
          Thanks for wandering along. When you’re ready for a tangible souvenir, the <a href="/shop">merch table</a> is stocked
          with limited runs and hosted checkout links.
        </p>
      </div>
    </article>
  )
}
