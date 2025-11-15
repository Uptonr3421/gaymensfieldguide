import { generateRssFeed } from "@/lib/rss"

export const revalidate = 3600

export function GET() {
  const feed = generateRssFeed()

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
    },
  })
}
