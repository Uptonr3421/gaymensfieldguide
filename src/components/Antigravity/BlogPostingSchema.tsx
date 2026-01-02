import Script from 'next/script';

interface BlogPostingSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
  keywords?: string[];
}

export default function BlogPostingSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
  keywords
}: BlogPostingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": image.startsWith('http') ? image : `https://gaymensfieldguide.com${image}`,
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
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
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": keywords?.join(', ') || '',
    "inLanguage": "en-US"
  };

  return (
    <Script
      id="blogposting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
