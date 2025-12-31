'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/editorial';
import { ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import CinematicContainer from '@/components/Antigravity/CinematicContainer';

interface HeroCarouselProps {
  featuredArticles: BlogPost[];
}

export default function HeroCarousel({ featuredArticles }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredArticles.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  const currentArticle = featuredArticles[currentIndex];

  return (
    <div className="relative w-full max-w-7xl mx-auto mb-24">
      {/* Navigation Controls */}
      <div className="absolute top-1/2 -left-4 -right-4 -translate-y-1/2 flex justify-between z-20 pointer-events-none px-4">
        <button 
          onClick={prevSlide}
          aria-label="Previous slide"
          className="pointer-events-auto p-4 bg-zinc-900 border border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all group"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          aria-label="Next slide"
          className="pointer-events-auto p-4 bg-zinc-900 border border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all group"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 relative overflow-hidden group">
        
        {/* Background Grid/Noise for "Dark Square" vibe */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(24,24,27,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(24,24,27,0.8)_2px,transparent_2px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 p-4 opacity-50">
           <div className="flex items-center gap-2 font-mono text-xs text-orange-400/70">
              <span className="w-2 h-2 bg-orange-500 animate-pulse" />
              <span>SYSTEM_GMFG // FEED_LIVE</span>
           </div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content (Left) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3">
               <span className="px-2 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                  {currentArticle.tag}
               </span>
               <span className="text-zinc-500 text-xs font-mono border-l border-zinc-800 pl-3">
                  TRANSMISSION_{(currentIndex + 1).toString().padStart(2, '0')}
               </span>
            </div>
            
            <Link href={`/blog/${currentArticle.slug}`} className="block group/title">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase group-hover/title:text-orange-500 transition-colors">
                {currentArticle.title}
              </h2>
            </Link>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl border-l-2 border-zinc-800 pl-6">
              {currentArticle.subtitle}
            </p>

            <div className="flex items-center gap-6 pt-4">
              <Link 
                href={`/blog/${currentArticle.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-wide hover:bg-orange-500 hover:text-white transition-colors"
              >
                Read Transmission <Terminal className="w-4 h-4 ml-2" />
              </Link>
              <div className="flex gap-2">
                 {featuredArticles.map((_, idx) => (
                   <button 
                     key={idx}
                     onClick={() => { setIsAutoPlaying(false); setCurrentIndex(idx); }}
                     className={cn(
                       "w-12 h-1 transition-all",
                       idx === currentIndex ? "bg-orange-500" : "bg-zinc-800 hover:bg-zinc-700"
                     )}
                   />
                 ))}
              </div>
            </div>
          </div>

          {/* Image Content (Right) - 500x500 Tightly Cropped */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
             <Link href={`/blog/${currentArticle.slug}`} className="relative block w-full max-w-[500px] aspect-square group/image">
                <div className="absolute -inset-4 bg-zinc-800/50 transform rotate-3 group-hover/image:rotate-6 transition-transform duration-500" />
                <div className="absolute -inset-4 bg-orange-500/10 transform -rotate-3 group-hover/image:-rotate-6 transition-transform duration-500" />
                
                <CinematicContainer className="w-full h-full relative z-10 border-2 border-zinc-700 group-hover/image:border-orange-500 transition-colors bg-black overflow-hidden">
                   <Image
                      src={currentArticle.image}
                      alt={currentArticle.title}
                      fill
                      className="object-cover transform group-hover/image:scale-110 transition-transform duration-700 ease-in-out filter sepia-[0.2] contrast-125 saturate-50 group-hover/image:filter-none"
                   />
                   
                   {/* Overlay Scanlines */}
                   <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none mix-blend-overlay" />
                </CinematicContainer>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
