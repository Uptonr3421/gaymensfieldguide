import Script from 'next/script';

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Gay Mens Field Guide",
    "alternateName": "The Field Guide",
    "url": "https://bespoke-ethos.vercel.app",
    "logo": "https://bespoke-ethos.vercel.app/images/blog/moe-timeline.webp",
    "description": "The definitive editorial for the post-code era. We engineer vibe.",
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
