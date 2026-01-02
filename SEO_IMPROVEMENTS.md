# SEO Improvements Documentation

## Overview
This document outlines all SEO improvements implemented for the Gay Men's Field Guide website.

## Implemented Changes

### 1. Structured Data (Schema.org)

#### Organization Schema
Location: `src/components/Antigravity/OrganizationSchema.tsx`
```json
{
  "@type": "Organization",
  "name": "Gay Men's Field Guide",
  "url": "https://gaymensfieldguide.com",
  "logo": {...},
  "description": "..."
}
```

#### WebSite Schema with SearchAction
Enables Google Search integration:
```json
{
  "@type": "WebSite",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://gaymensfieldguide.com/blog?search={search_term_string}"
  }
}
```

#### Article Schema
Location: `src/components/Antigravity/ArticleSchema.tsx`
- Applied to all blog posts
- Includes author, publish date, images
- Enhances rich snippets in search results

#### Breadcrumb Schema
Location: `src/components/Antigravity/BreadcrumbSchema.tsx`
- Improves navigation in search results
- Shows page hierarchy

### 2. Canonical URLs

Added to all pages:
- Home: `/`
- Blog index: `/blog`
- Blog posts: `/blog/[slug]`
- Manifesto: `/manifesto`
- Arsenal: `/arsenal`
- Staff: `/staff`

Format:
```tsx
alternates: {
  canonical: 'https://gaymensfieldguide.com/path'
}
```

### 3. Meta Tags

#### Open Graph
All pages include:
- `og:title`
- `og:description`
- `og:url`
- `og:type` (website/article)
- `og:image`

#### Twitter Cards
- Card type: `summary_large_image`
- Optimized images (1200x630px)
- Descriptive titles and descriptions

### 4. Page Titles
Format: `Page Name | GMFG`

Examples:
- Home: `GMFG: The Vibe Coding Editorial`
- Blog: `Blog // The Field Guide`
- Posts: `[Article Title] | GMFG`

### 5. Heading Structure

#### Guidelines
- H1: Page title (one per page)
- H2: Major sections
- H3: Sub-sections
- H4-H6: Detailed hierarchies

#### Implementation
```tsx
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

### 6. Link Optimization

#### Internal Links
- Descriptive anchor text
- Keyboard accessible
- ARIA labels where needed

#### External Links
- `rel="noopener noreferrer"` for security
- Opens in new tab when appropriate

### 7. Image Optimization

#### Next.js Image Component
```tsx
<Image
  src="..."
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority={boolean} // For above-fold images
/>
```

#### Formats
- Primary: AVIF (best compression)
- Fallback: WebP
- Legacy: JPEG/PNG

#### Sizes
- Device-optimized
- Responsive srcsets
- Lazy loading (below fold)

## SEO Best Practices

### 1. Content Quality
- ✅ Unique, high-quality content
- ✅ Regular updates
- ✅ Comprehensive coverage
- ✅ Original research and insights

### 2. Technical SEO
- ✅ Fast page load times
- ✅ Mobile-responsive design
- ✅ HTTPS everywhere
- ✅ Clean URL structure
- ✅ XML sitemap
- ✅ Robots.txt

### 3. On-Page SEO
- ✅ Optimized titles (50-60 chars)
- ✅ Meta descriptions (150-160 chars)
- ✅ Header hierarchy
- ✅ Internal linking
- ✅ Alt text for images
- ✅ Keyword optimization

### 4. User Experience
- ✅ Fast loading times
- ✅ Mobile-friendly
- ✅ Easy navigation
- ✅ Accessible design
- ✅ Clear CTAs

## Monitoring and Maintenance

### Google Search Console
Monitor:
- Indexing status
- Search performance
- Core Web Vitals
- Mobile usability
- Structured data errors

### Lighthouse Audits
Target scores:
- Performance: 90+
- SEO: 95+
- Accessibility: 95+
- Best Practices: 95+

### Regular Tasks
- [ ] Weekly: Check Search Console for errors
- [ ] Monthly: Run Lighthouse audits
- [ ] Quarterly: Update structured data
- [ ] Annually: Review and update content

## Testing Tools

### Structured Data Testing
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

### SEO Audits
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Ahrefs Site Audit](https://ahrefs.com/site-audit)
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/)

### Mobile Testing
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## Future Improvements

### Planned
- [ ] FAQ schema for common questions
- [ ] Video schema for embedded videos
- [ ] Product schema for hardware arsenal
- [ ] Review schema for product reviews
- [ ] Local business schema (if applicable)

### Consideration
- [ ] AMP pages for mobile
- [ ] Progressive Web App (PWA)
- [ ] Internationalization (i18n)
- [ ] Multi-language support

## Resources

### Documentation
- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Vercel Analytics](https://vercel.com/analytics)

## Contact
For SEO-related questions or issues:
- Technical Lead: GMFG Editorial Team
- GitHub Issues: [gaymensfieldguide/issues](https://github.com/Uptonr3421/gaymensfieldguide/issues)
