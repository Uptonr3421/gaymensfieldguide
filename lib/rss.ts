import { allPosts } from "contentlayer/generated"

import { mdxToHtml } from "@/lib/mdx-to-html"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaymensfieldguide.com"
const SITE_TITLE = "Gay Men's Field Guide"
const SITE_DESCRIPTION =
  "Practical essays and field notes for gay men navigating love, work, and life."

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function escapeCdata(value: string) {
  return value.replaceAll("]]>", "]]]]><![CDATA[>")
}

export async function generateRssXml(): Promise<string> {
  const items = await Promise.all(
    allPosts
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(async (post) => {
        const url = new URL(post.slug, SITE_URL).toString()
        const content = await mdxToHtml(post.body.raw)

        return `      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        ${post.description ? `<description>${escapeXml(post.description)}</description>` : ""}
        <content:encoded><![CDATA[${escapeCdata(content)}]]></content:encoded>
      </item>`
      })
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
${items.join("\n")}
  </channel>
</rss>\n`
}
