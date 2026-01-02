import Script from 'next/script';

interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
}

export default function WebPageSchema({ name, description, url }: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Gay Mens Field Guide",
      "url": "https://gaymensfieldguide.com"
    },
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Gay Mens Field Guide",
      "url": "https://gaymensfieldguide.com"
    }
  };

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
