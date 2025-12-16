
import { Metadata } from 'next';

export function getArticleMetadata(title: string, description: string, image?: string, slug?: string): Metadata {
  return {
    title: `${title} // The Field Guide`,
    description: description,
    openGraph: {
      title: `${title} // The Field Guide`,
      description: description,
      images: image ? [image] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: image ? [image] : [],
    },
    alternates: slug ? {
      canonical: `/blog/${slug}`,
    } : undefined,
  };
}
