import Script from 'next/script';

export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Gay Men's Field Guide",
    "alternateName": "GMFG",
    "url": "https://gaymensfieldguide.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://gaymensfieldguide.com/images/blog/moe-timeline.webp",
      "width": 1200,
      "height": 630
    },
    "description": "The definitive editorial for the post-code era. We engineer vibe. Featuring insights on AI, technology, and modern development practices.",
    "foundingDate": "2024",
    "sameAs": []
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Gay Men's Field Guide",
    "alternateName": "GMFG",
    "url": "https://gaymensfieldguide.com",
    "description": "The definitive editorial for the post-code era featuring AI, technology, and vibe coding insights.",
    "publisher": {
      "@type": "Organization",
      "name": "Gay Men's Field Guide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gaymensfieldguide.com/images/blog/moe-timeline.webp"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://gaymensfieldguide.com/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
