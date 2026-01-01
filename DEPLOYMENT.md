# Deployment Guide - Gay Men's Field Guide

## Overview
This Next.js 16 application is optimized for deployment on Vercel with static generation and API routes.

## Prerequisites
- Node.js 20+ (recommended: 20.19.6)
- npm or pnpm
- Vercel CLI (optional, for local testing)

## Environment Variables

### Required for Deployment
Create a `.env` file based on `.env.example`:

```bash
# Google Gemini API (for AI features)
GOOGLE_GEMINI_API=your_api_key_here
GOOGLE_CLOUD_PROJECT=your_project_id

# Optional: Backup API keys for rate limiting
GOOGLE_GEMINI_API_BACKUP_1=backup_key_1
GOOGLE_GEMINI_API_BACKUP_2=backup_key_2
GOOGLE_CLOUD_PROJECT_BACKUP=backup_project_id
```

### Vercel Environment Variables
Add these in your Vercel project settings:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env`
3. Set for Production, Preview, and Development environments

## Build Process

### Local Build
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Build Outputs
- Static pages: Pre-rendered at build time
- API routes: Serverless functions
- Images: Optimized with Next.js Image Optimization

## Deployment on Vercel

### Automatic Deployment (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Push to main branch
4. Vercel automatically builds and deploys

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

## Performance Optimizations

### Implemented
- ✅ Static page generation (SSG) for blog posts
- ✅ Image optimization (AVIF/WebP)
- ✅ Code splitting with vendor chunks
- ✅ CSS optimization (optimizeCss: true)
- ✅ Font optimization with next/font
- ✅ Compression enabled
- ✅ Cache headers for static assets

### Cache Headers
```
Images:        1 year (immutable)
Fonts:         1 year (immutable)
Static assets: 1 year (immutable)
```

## SEO Configuration

### Implemented
- ✅ Canonical URLs on all pages
- ✅ Schema.org structured data:
  - Organization schema
  - WebSite schema with SearchAction
  - Article schema for blog posts
  - Breadcrumb schema
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ robots.txt
- ✅ sitemap.xml

### Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Accessibility

### Implemented
- ✅ Skip navigation link
- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML (article, nav, main, header)
- ✅ Color contrast ratios (WCAG AA compliant)
- ✅ Keyboard navigation support

## Monitoring

### Vercel Analytics
Integrated via `@vercel/analytics` package:
```tsx
import { Analytics } from "@vercel/analytics/react";
// Added in layout.tsx
```

### Google Analytics
Tag ID: G-QMLM24T4QK
- Loaded with `strategy="lazyOnload"`
- Minimal performance impact

## Troubleshooting

### Build Failures
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors
- Check `tsconfig.json` settings
- Ensure all dependencies are up to date
- Run `npm run build` locally first

### Missing Environment Variables
- Verify all required variables are set in Vercel
- Check variable names match exactly (case-sensitive)
- Redeploy after adding new variables

## Domain Configuration

### Custom Domain
1. Add domain in Vercel: Project Settings → Domains
2. Configure DNS:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
3. SSL certificate auto-provisioned by Vercel

### Current Domain
- Production: `gaymensfieldguide.com`
- Preview: `[branch]-gaymensfieldguide.vercel.app`

## CI/CD Pipeline

### GitHub Actions (Optional)
If using GitHub Actions for additional checks:
```yaml
name: Build Check
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check Google Search Console for crawl errors
- [ ] Test SEO with Lighthouse (target: 90+)
- [ ] Verify analytics tracking
- [ ] Test all API routes
- [ ] Check image optimization
- [ ] Validate schema.org markup
- [ ] Test mobile responsiveness

## Support
For deployment issues, contact:
- GMFG Technical Team
- [Create GitHub Issue](https://github.com/Uptonr3421/gaymensfieldguide/issues)
