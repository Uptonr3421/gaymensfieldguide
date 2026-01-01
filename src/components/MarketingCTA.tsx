'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for classnames

export default function MarketingCTA() {
  return (
    <section className="relative w-full py-24 bg-zinc-950 overflow-hidden border-y border-win95" aria-label="Advertising Opportunity">
      {/* Background Noise & Scanlines */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none mix-blend-overlay" />
      
      {/* Glitch Decor */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-neon-yellow/5 blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-neon-blue/5 blur-[100px] animate-pulse" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-block mb-4 px-3 py-1 bg-neon-yellow/10 border border-neon-yellow text-neon-yellow font-mono text-xs uppercase tracking-widest animate-pulse">
          Advertise With Us
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight glitch-text">
          Reach the <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-yellow-500">Post-Code</span> Generation.
        </h2>
        
        <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          We don't serve ads. We serve **Vibe**. Partner with GMFG to embed your brand into the cultural operating system of the future. 
          High-engagement artifacts. Deep-tech context. Zero fluff.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link 
            href="/advertise" 
            className="group relative px-8 py-4 bg-neon-yellow hover:bg-yellow-400 text-black font-bold uppercase tracking-widest text-sm transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            <span className="relative z-10">Start Campaign</span>
          </Link>
          
          <Link 
            href="/media-kit" 
            className="px-8 py-4 bg-transparent border-2 border-zinc-700 text-white font-bold uppercase tracking-widest text-sm hover:border-white hover:bg-white/5 transition-all"
          >
            Download Media Kit
          </Link>
        </div>

        <div className="mt-12 flex justify-center gap-8 text-zinc-300 font-mono text-xs uppercase">
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full" />
             <span>350k Monthly Vibes</span>
          </div>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full" />
             <span>89% Dev Audience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
