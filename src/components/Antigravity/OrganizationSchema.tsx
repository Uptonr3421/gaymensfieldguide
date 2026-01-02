import Script from 'next/script';

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Gay Mens Field Guide",
    "alternateName": ["The Field Guide", "GMFG"],
    "url": "https://gaymensfieldguide.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://gaymensfieldguide.com/images/blog/moe-timeline.webp",
      "width": 1200,
      "height": 630
    },
    "description": "The definitive editorial for the post-code era. We engineer vibe. Featuring the latest on GPT-5.2 'Garlic' and the Mixture of Experts.",
    "sameAs": []
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
