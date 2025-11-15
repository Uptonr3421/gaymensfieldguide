# Gay Men's Field Guide

A modern Next.js 13 project for [gaymensfieldguide.com](https://gaymensfieldguide.com) built with the Contentlayer blog starter, reimagined for long-form writing and a lightweight merch experience.

## Tech stack

- **Next.js App Router** deployed on Vercel
- **Contentlayer** with Markdown/MDX content checked into git
- **Tailwind CSS** with typography plugin for prose styling
- **Hosted checkout links** (Stripe) for commerce without a database

## Local development

```bash
pnpm install
pnpm dev
```

Content lives in `content/` and products are defined in `data/products.ts`. Update either file, commit the change, and redeploy to publish new essays or merch.

### RSS feed

- Build step automatically publishes `/rss.xml` with the latest posts for feed readers.
