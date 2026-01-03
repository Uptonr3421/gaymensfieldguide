import Script from 'next/script';

type SchemaProps = {
  article?: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    url?: string; // Optional canonical URL of the article
  };
  breadcrumbs?: {
    name: string;
    item: string;
  }[];
  questions?: {
    question: string;
    answer: string;
  }[];
  howTo?: {
    name: string;
    description: string;
    step: {
      name: string;
      text: string;
      image?: string;
      url?: string;
    }[];
  };
};

export function SchemaBuilder({ article, breadcrumbs, questions, howTo }: SchemaProps) {
  const schemas = [];

  // 1. BlogPosting Schema
  if (article) {
    const articleUrl = article.url || 
      (breadcrumbs && breadcrumbs.length > 0 
        ? `https://gaymensfieldguide.com${breadcrumbs[breadcrumbs.length - 1].item}`
        : 'https://gaymensfieldguide.com');

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
        '@id': articleUrl
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

  // 4. HowTo Schema
  if (howTo) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      step: howTo.step.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image ? {
          '@type': 'ImageObject',
          url: step.image,
        } : undefined,
        url: step.url,
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
