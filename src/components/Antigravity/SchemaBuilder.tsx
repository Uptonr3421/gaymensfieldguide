import Script from 'next/script';

type SchemaProps = {
  article?: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    author: string;
  };
  breadcrumbs?: {
    name: string;
    item: string;
  }[];
  questions?: {
    question: string;
    answer: string;
  }[];
};

export function SchemaBuilder({ article, breadcrumbs, questions }: SchemaProps) {
  const schemas = [];

  // 1. Article Schema
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: article.headline,
      description: article.description,
      image: article.image,
      datePublished: article.datePublished,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Gay Men\'s Field Guide',
        logo: {
          '@type': 'ImageObject',
          url: 'https://gaymensfieldguide.com/logo.png', // Update with real logo
        },
      },
    });
  }

  // 2. Breadcrumb Schema
  if (breadcrumbs) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `https://gaymensfieldguide.com${crumb.item}`,
      })),
    });
  }

  // 3. FAQ Schema
  if (questions) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`schema-${index}`}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
