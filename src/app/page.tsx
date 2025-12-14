import HeroAnimation from '@/components/HeroAnimation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { EDITORIAL_FEED } from '@/data/editorial';
import BentoFeed from '@/components/Experimental/BentoFeed';
import { STAFF } from '@/data/staff';
import CinematicContainer from '@/components/Antigravity/CinematicContainer';
import StaffAvatar from '@/components/Antigravity/StaffAvatar';
import MarketingCTA from '@/components/MarketingCTA';
import HeroCarousel from '@/components/HeroCarousel';

export const metadata: Metadata = {
  title: 'The Field Guide // Antigravity',
  description: 'The definitive editorial for the post-code era. We engineer vibe. Featuring the latest on GPT-5.2 "Garlic" and the Mixture of Experts.',
  openGraph: {
    title: 'The Field Guide // Antigravity',
    description: 'We don\'t "prompt." We engineer vibe. The definitive editorial for the post-code era.',
    images: ['/images/blog/moe-timeline.png'],
    type: 'website',
  },
};

export default function Home() {
  const featuredArticles = EDITORIAL_FEED.slice(0, 3); // Top 3 Carousel
  const feedArticles = EDITORIAL_FEED.slice(3); // Rest of feed

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Subtle Grid Texture for "Crisp White" feel */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 backdrop-blur-sm z-10">
        
        {/* Header Text */}
        <div className="max-w-7xl mx-auto mb-12 flex flex-col items-center text-center">
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-mono font-bold tracking-[0.2em] uppercase bg-black text-white">
               EST. 2025 // EDITORIAL_BOARD
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6">
               THE FIELD GUIDE
            </h1>
            <p className="max-w-2xl text-lg md:text-xl font-medium text-zinc-500 dark:text-zinc-400">
               Authentic reporting on the post-code era. <span className="text-orange-600 font-bold">No hype. Just vibe.</span>
            </p>
<<<<<<< HEAD
=======
            <div className="flex items-center gap-4 text-sm text-industrial-500 font-mono">
              <span>{featured.tag}</span>
              <span>•</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
          <div className="aspect-square bg-industrial-900 rounded-sm border border-industrial-800 overflow-hidden">
            <img 
              src="/images/ai-memory/article_thumbnail.png" 
              alt={featured.title} 
              className="w-full h-full object-cover"
            />
          </div>
>>>>>>> 8b72cb615716d94284734e472138cda7e2a698a7
        </div>

        {/* The Carousel */}
        <HeroCarousel featuredArticles={featuredArticles} />

      </section>

      {/* Primary Feed (Dark Cards on White) */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-16 border-b-4 border-black pb-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
            Latest Transmissions
          </h2>
          <span className="font-mono text-sm font-bold text-orange-600 animate-pulse">
            LIVE_FEED_ACTIVE
          </span>
        </div>

        <BentoFeed articles={feedArticles} />
      </section>

      {/* The Bureau Grid (Team) */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
         {/* Dark Background Texture */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
         
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">The Staff</h2>
            <span className="font-mono text-xs text-zinc-500">AUTHORIZED_PERSONNEL_ONLY</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {STAFF.map(writer => (
              <div key={writer.id} className="group relative bg-black border border-zinc-800 p-8 hover:border-orange-500 transition-colors">
                <div className="absolute top-4 right-4 font-mono text-[10px] text-zinc-600">
                  ID: {writer.id}
                </div>
                
                <StaffAvatar id={writer.id} initial={writer.name[0]} role={writer.id as any} />
                
                <h3 className="text-xl font-bold mb-2 text-white">{writer.name}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-4">
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

      {/* Marketing / Ad Integration */}
      <MarketingCTA />
    </div>
  );
}
