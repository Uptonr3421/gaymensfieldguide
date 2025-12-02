import { defineDocumentType, makeSource } from "contentlayer/source-files"

/** @type {import('contentlayer/source-files').ComputedFields} */
const baseComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

const postComputedFields = {
  ...baseComputedFields,
  readingTime: {
    type: "number",
    resolve: (doc) => {
      const words = doc.body.raw.split(/\s+/g).length
      return Math.max(1, Math.round(words / 200))
    },
  },
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields: baseComputedFields,
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    language: {
      type: "string",
      required: true,
    },
    featured: {
      type: "boolean",
    },
    thumbnail: {
      type: "string",
      description: "Path to the lead image used in cards and carousels",
    },
    graphics: {
      type: "list",
      of: { type: "string" },
      description: "Inline gallery assets for the post body",
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: postComputedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
})
