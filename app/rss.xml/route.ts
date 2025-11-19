import { generateRssXml } from "@/lib/rss"

export async function GET() {
  const body = await generateRssXml()

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
