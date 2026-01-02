import { Metadata } from 'next';
import { EDITORIAL_FEED } from '@/data/editorial';
import BentoFeed from '@/components/Experimental/BentoFeed';
import HeroAnimation from '@/components/HeroAnimation';
import WebPageSchema from '@/components/Antigravity/WebPageSchema';
import BreadcrumbListSchema from '@/components/Antigravity/BreadcrumbListSchema';

export const metadata: Metadata = {
  title: 'Blog // The Field Guide',
  description: 'Notes from the field. Engineering vibe in the post-code era. Technical deep dives, philosophical musings, and hardware reviews.',
  keywords: ['Tech Blog', 'AI', 'Vibe Coding', 'Local LLM', 'Privacy', 'Hardware', 'Software'],
  openGraph: {
    title: 'GMFG Blog // Transmissions',
    description: 'Field notes, technical deep dives, and philosophical musings from the post-code era.',
    images: ['/images/blog/moe-timeline.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GMFG Blog',
    description: 'Notes from the field. Engineering vibe.',
  },
};

export default function BlogIndex() {
  const articles = EDITORIAL_FEED;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {/* Structured Data Schemas */}
      <WebPageSchema
        name="Blog - Gay Mens Field Guide"
        description="Notes from the field. Engineering vibe in the post-code era. Technical deep dives, philosophical musings, and hardware reviews."
        url="https://gaymensfieldguide.com/blog"
      />
      <BreadcrumbListSchema
        items={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" }
        ]}
      />
      
      {/* Background Texture */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

      {/* Hero Section - Compact Standard Header */}
      <div className="relative pt-32 pb-8 px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 backdrop-blur-sm z-10">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block px-2 py-0.5 mb-3 text-[10px] font-mono font-bold tracking-widest uppercase bg-black text-white">
               Archive_V.2.0
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">
              TRANSMISSIONS
            </h1>
          </div>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-md font-medium leading-relaxed mb-1">
            Recent field notes, technical deep dives, and philosophical musings.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <BentoFeed articles={articles} />
      </section>
    </div>
  );
}
