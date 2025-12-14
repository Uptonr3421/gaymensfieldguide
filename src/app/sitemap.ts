import { MetadataRoute } from 'next';
import { EDITORIAL_FEED } from '@/data/editorial';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gaymensfieldguide.com'; // Optimization Target

  // 1. Static Routes
  const routes = [
    '',
    '/blog',
    '/manifesto',
    // '/arsenal',

    '/staff',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  // 2. Manual Editorial Feed
  const editorialPosts = EDITORIAL_FEED.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Dynamic Mass-Produced MDX (The Factory)
  const blogDir = path.join(process.cwd(), 'src/app/blog/(content)');
  let dynamicPosts: MetadataRoute.Sitemap = [];
  
  try {
      if (fs.existsSync(blogDir)) {
          const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
          dynamicPosts = files.map(file => ({
              url: `${baseUrl}/blog/${file.replace('.mdx', '')}`,
              lastModified: new Date().toISOString(),
              changeFrequency: 'weekly' as const,
              priority: 0.8,
          }));
      }
  } catch (e) {
      console.error("Sitemap Generation Error:", e);
  }

  // Deduplicate (in case Editorial is also in folder)
  const allPosts = [...editorialPosts, ...dynamicPosts];
  const uniquePosts = Array.from(new Map(allPosts.map(item => [item.url, item])).values());

  return [...routes, ...uniquePosts];
}
