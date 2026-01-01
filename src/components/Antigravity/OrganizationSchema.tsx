import Script from 'next/script';

export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Gay Mens Field Guide",
    "alternateName": ["GMFG", "The Field Guide"],
    "url": "https://gaymensfieldguide.com",
    "logo": "https://gaymensfieldguide.com/icon.svg",
    "description": "The definitive editorial for the post-code era. We engineer vibe.",
    "sameAs": []
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Gay Mens Field Guide",
    "alternateName": "GMFG",
    "url": "https://gaymensfieldguide.com",
    "description": "The definitive editorial for the post-code era featuring AI, tech culture, and vibe coding.",
    "publisher": {
      "@type": "Organization",
      "name": "Gay Mens Field Guide"
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
