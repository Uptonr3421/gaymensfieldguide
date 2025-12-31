'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/data/editorial';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SplashHeroProps {
  featuredArticles: Article[];
}

export default function SplashHero({ featuredArticles }: SplashHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredArticles.length]);

  const currentArticle = featuredArticles[currentIndex];

  return (
    <section className="relative min-h-[85vh] pt-32 lg:pt-40 border-b-4 border-orange-500">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full">
        
        {/* SPLIT LAYOUT */}
        <div className="grid lg:grid-cols-2 gap-0 min-h-[70vh]">
          
          {/* LEFT SIDE - Logo & Branding */}
          <div className="relative flex flex-col justify-center items-center lg:items-start p-8 lg:p-12 border-r-0 lg:border-r-4 border-zinc-800">
            
            {/* Geometric Logo Mark */}
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-4 border-orange-500 transform rotate-45" />
              <div className="absolute inset-4 border-2 border-zinc-600 transform rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black text-orange-500">G</span>
              </div>
            </div>
            
            {/* Title */}
            <div className="text-center lg:text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-400 block mb-4">
                VIBE_CODED // 2025
              </span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                <span className="block text-white">THE</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                  GUIDE
                </span>
              </h1>
              <p className="mt-6 text-lg text-zinc-400 max-w-md leading-relaxed">
                The definitive editorial for the <span className="text-orange-400 font-semibold">post-code era</span>. 
                We don't prompt. We engineer vibe.
              </p>
              
              {/* CTA */}
              <div className="mt-8 flex gap-4">
                <Link 
                  href="/blog" 
                  className="px-6 py-3 bg-orange-500 text-black font-bold uppercase text-sm tracking-wide hover:bg-orange-400 transition-colors"
                >
                  Enter Archive
                </Link>
                <Link 
                  href="/manifesto" 
                  className="px-6 py-3 border-2 border-zinc-700 text-zinc-300 font-bold uppercase text-sm tracking-wide hover:border-orange-500 hover:text-orange-500 transition-colors"
                >
                  Manifesto
                </Link>
              </div>
            </div>
            
            {/* Bold Divider Line (visible on mobile) */}
            <div className="lg:hidden w-full h-1 bg-zinc-800 mt-12" />
          </div>
          
          {/* RIGHT SIDE - Carousel Thumbnails */}
          <div className="relative flex flex-col justify-center p-8 lg:p-12 bg-zinc-900/30">
            
            {/* Section Label */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-orange-400 uppercase tracking-widest">
                FEATURED_TRANSMISSIONS
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setIsAutoPlaying(false); setCurrentIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length); }}
                  className="p-2 border border-zinc-700 text-zinc-400 hover:border-orange-500 hover:text-orange-500 transition-colors"
                  aria-label="Previous article"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => { setIsAutoPlaying(false); setCurrentIndex((prev) => (prev + 1) % featuredArticles.length); }}
                  className="p-2 border border-zinc-700 text-zinc-400 hover:border-orange-500 hover:text-orange-500 transition-colors"
                  aria-label="Next article"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Main Featured Image - Slide Panel */}
            <div 
              id={`slide-${currentIndex}`} 
              role="tabpanel" 
              aria-labelledby={`tab-${currentIndex}`}
              className="mb-6"
            >
              <Link href={`/blog/${currentArticle.slug}`} className="relative block aspect-video bg-black border-2 border-zinc-800 overflow-hidden group">
                <Image
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-orange-500/90 text-black text-[10px] font-bold uppercase tracking-wider">
                    {currentArticle.tag}
                  </span>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                    {currentArticle.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                    {currentArticle.subtitle}
                  </p>
                </div>
              </Link>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="flex gap-3">
              {featuredArticles.map((article, idx) => (
                <button
                  key={article.id}
                  onClick={() => { setIsAutoPlaying(false); setCurrentIndex(idx); }}
                  aria-label={`View article: ${article.title}`}
                  aria-pressed={idx === currentIndex}
                  className={cn(
                    "relative flex-1 aspect-video bg-zinc-900 border-2 overflow-hidden transition-all",
                    idx === currentIndex 
                      ? "border-orange-500 ring-2 ring-orange-500/30" 
                      : "border-zinc-800 opacity-50 hover:opacity-100 hover:border-zinc-600"
                  )}
                >
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 20vw, 100px"
                    className="object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Featured articles">
              {featuredArticles.map((article, idx) => (
                <button
                  key={idx}
                  id={`tab-${idx}`}
                  onClick={() => { setIsAutoPlaying(false); setCurrentIndex(idx); }}
                  aria-label={`Go to slide ${idx + 1}: ${article.title}`}
                  aria-controls={`slide-${idx}`}
                  aria-selected={idx === currentIndex}
                  role="tab"
                  className={cn(
                    "h-1 transition-all",
                    idx === currentIndex ? "w-8 bg-orange-500" : "w-4 bg-zinc-700 hover:bg-zinc-600"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
