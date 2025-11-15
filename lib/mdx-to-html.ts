import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkMdx from "remark-mdx"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import type { Schema } from "hast-util-sanitize"

const schema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema?.attributes,
    a: [...(defaultSchema?.attributes?.a ?? []), ["rel", "nofollow"], ["target"]],
    code: [...(defaultSchema?.attributes?.code ?? []), ["className"], ["data-language"]],
    pre: [...(defaultSchema?.attributes?.pre ?? []), ["className"]],
    span: [...(defaultSchema?.attributes?.span ?? []), ["className"]],
  },
}

export async function mdxToHtml(raw: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .process(raw)

  return String(file).trim()
}
