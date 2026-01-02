import Script from 'next/script';

type SchemaProps = {
  article?: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
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

  // 1. BlogPosting Schema (more specific than TechArticle for blog posts)
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.headline,
      description: article.description,
      image: {
        '@type': 'ImageObject',
        url: article.image,
      },
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Gay Mens Field Guide',
        logo: {
          '@type': 'ImageObject',
          url: 'https://gaymensfieldguide.com/images/blog/moe-timeline.webp',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': article.image.includes('http') 
          ? article.image.replace(/\/images\/.*$/, '')
          : 'https://gaymensfieldguide.com'
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
