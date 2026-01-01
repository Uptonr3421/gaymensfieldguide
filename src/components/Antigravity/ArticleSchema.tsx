import Script from 'next/script';

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export default function ArticleSchema({
  title,
  description,
  slug,
  datePublished = '2025-01-01',
  dateModified = '2025-01-01',
  author = 'GMFG Editorial'
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": `https://gaymensfieldguide.com/blog/${slug}`,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Gay Mens Field Guide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gaymensfieldguide.com/icon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://gaymensfieldguide.com/blog/${slug}`
    }
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
