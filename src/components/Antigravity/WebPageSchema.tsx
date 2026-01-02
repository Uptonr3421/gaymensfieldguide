import Script from 'next/script';

interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: {
    name: string;
    item: string;
  }[];
}

export default function WebPageSchema({ title, description, url, breadcrumbs }: WebPageSchemaProps) {
  const schemas = [];

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Gay Mens Field Guide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gaymensfieldguide.com/images/blog/moe-timeline.webp"
      }
    }
  };

  schemas.push(webPageSchema);

  // Breadcrumb Schema (if provided)
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `https://gaymensfieldguide.com${crumb.item}`
      }))
    };
    schemas.push(breadcrumbSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`webpage-schema-${index}`}
          id={`webpage-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
