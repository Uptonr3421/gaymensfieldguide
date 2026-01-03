import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { EDITORIAL_FEED } from '@/data/editorial';
import { STAFF } from '@/data/staff';
import StaffAvatar from '@/components/Antigravity/StaffAvatar';
import SplashHero from '@/components/SplashHero';

const BentoFeed = dynamic(() => import('@/components/Experimental/BentoFeed'));
const MarketingCTA = dynamic(() => import('@/components/MarketingCTA'));

export const metadata: Metadata = {
  title: 'THE GUIDE // Vibe Coder Editorial',
  description: 'The definitive editorial for the post-code era. We engineer vibe. Featuring the latest on GPT-5.2 "Garlic" and the Mixture of Experts.',
  keywords: ['Vibe Coding', 'AI Editorial', 'GPT-5', 'Local LLM', 'Tech Culture', 'Nano Banana'],
  openGraph: {
    title: 'THE GUIDE // Vibe Coder Editorial',
    description: 'We don\'t "prompt." We engineer vibe. The definitive editorial for the post-code era.',
    images: ['/images/blog/moe-timeline.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE GUIDE // GMFG',
    description: 'The definitive editorial for the post-code era. We engineer vibe.',
    images: ['/images/blog/moe-timeline.webp'],
  },
};

export default function Home() {
  const featuredArticles = EDITORIAL_FEED.slice(0, 5);
  const feedArticles = EDITORIAL_FEED.slice(5);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* SPLIT HERO - Logo + Carousel */}
      <SplashHero featuredArticles={featuredArticles} />

      {/* Primary Feed */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-16 border-b-4 border-zinc-800 pb-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
            Latest Transmissions
          </h2>
          <span className="font-mono text-sm font-bold text-banana animate-pulse">
            FEED_ACTIVE
          </span>
        </div>

        <BentoFeed articles={feedArticles} />
      </section>

      {/* The Bureau Grid (Team) */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
         <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
         
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">The Staff</h2>
            <span className="font-mono text-xs text-zinc-400">AUTHORIZED_PERSONNEL</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {STAFF.map(writer => (
              <div key={writer.id} className="group relative bg-black border border-zinc-800 p-8 hover:border-orange-500 transition-colors">
                <div className="absolute top-4 right-4 font-mono text-[10px] text-zinc-400">
                  ID: {writer.id}
                </div>
                
                <StaffAvatar id={writer.id} initial={writer.name[0]} role={writer.id as any} />
                
                <h3 className="text-xl font-bold mb-2 text-white">{writer.name}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-banana mb-4">
                  {writer.role}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
                  {writer.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing CTA */}
      <MarketingCTA />
    </div>
  );
}
