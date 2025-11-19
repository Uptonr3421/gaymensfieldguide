export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://gaymensfieldguide.com/#website",
        "url": "https://gaymensfieldguide.com",
        "name": "Gay Men's Field Guide",
        "description": "Vibecoding meets culture: Creative coding tutorials, tech insights, and developer lifestyle. Shop unique dev merch and join the Cleveland coding community.",
        "publisher": {
          "@id": "https://gaymensfieldguide.com/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://gaymensfieldguide.com/#organization",
        "name": "Gay Men's Field Guide",
        "url": "https://gaymensfieldguide.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gaymensfieldguide.com/images/hero-splash.jpg"
        },
        "sameAs": [
          "https://www.instagram.com/gaymensfieldguide",
          "https://www.youtube.com/@GayMensFieldGuide"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "hello@gaymensfieldguide.com",
          "contactType": "customer service"
        }
      },
      {
        "@type": "Blog",
        "@id": "https://gaymensfieldguide.com/#blog",
        "url": "https://gaymensfieldguide.com/posts",
        "name": "Gay Men's Field Guide Blog",
        "description": "Creative coding tutorials, tech culture insights, and developer lifestyle content",
        "publisher": {
          "@id": "https://gaymensfieldguide.com/#organization"
        },
        "inLanguage": "en-US",
        "about": [
          {
            "@type": "Thing",
            "name": "Web Development"
          },
          {
            "@type": "Thing",
            "name": "Creative Coding"
          },
          {
            "@type": "Thing",
            "name": "Developer Lifestyle"
          },
          {
            "@type": "Thing",
            "name": "Tech Culture"
          }
        ]
      },
      {
        "@type": "Store",
        "@id": "https://gaymensfieldguide.com/#store",
        "url": "https://gaymensfieldguide.com/shop",
        "name": "Gay Men's Field Guide Shop",
        "description": "Unique developer merchandise and creative coding apparel"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
