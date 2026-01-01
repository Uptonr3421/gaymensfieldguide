import Script from 'next/script';

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  image?: string;
  url: string;
  keywords?: string[];
}

export default function ArticleSchema({
  title,
  description,
  publishDate,
  modifiedDate,
  author,
  image,
  url,
  keywords = []
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image || "https://gaymensfieldguide.com/images/blog/moe-timeline.webp",
    "datePublished": publishDate,
    "dateModified": modifiedDate || publishDate,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Gay Mens Field Guide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gaymensfieldguide.com/images/blog/moe-timeline.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(keywords.length > 0 && { "keywords": keywords.join(", ") })
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
