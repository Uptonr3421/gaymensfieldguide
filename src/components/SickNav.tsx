'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: './HOME', href: '/' },
  { label: './ARTICLES', href: '/blog' },
  { label: './MANIFESTO', href: '/manifesto' },
  // { label: './ARSENAL', href: '/arsenal' }, // Hidden: Store Closed
];

export default function SickNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none",
      scrolled ? "py-2" : "py-4"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto px-4 md:px-6 transition-all duration-500",
        scrolled ? "md:max-w-5xl" : "" // Shrink on scroll
      )}>
        <nav aria-label="Main Navigation" className="pointer-events-auto bg-zinc-950/80 backdrop-blur-md border-win95 shadow-[0_0_20px_rgba(0,0,0,0.5)] p-2 md:p-3 flex items-center justify-between group overflow-hidden relative">
          
          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10 mix-blend-overlay" />

          {/* Logo Section */}
          <Link href="/" aria-label="Gay Men's Field Guide Home" className="relative flex items-center gap-3 px-2 py-1 hover:bg-zinc-900 transition-colors rounded-sm group/logo">
             <div className="w-8 h-8 bg-zinc-900 border border-zinc-700 flex items-center justify-center relative overflow-hidden">
                <span className="font-black text-xs text-white">G</span>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-600" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-600" />
             </div>
             <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tighter text-zinc-200 group-hover/logo:text-white transition-all">
                  GMFG<span className="text-zinc-600">_OS</span>
                </span>
                {/* <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest hidden md:block">
                  v2.0.4 [STABLE]
                </span> */}
             </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 border-win95-inset" role="menubar">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={cn(
                    "px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-all relative overflow-hidden",
                    isActive 
                      ? "bg-orange-500/10 text-orange-400 font-bold border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  )}
                >
                  {isActive && <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-orange-500 animate-pulse rounded-full" />}
                  <span className={isActive ? "pl-2" : ""}>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* System Status Ticker */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-zinc-800 text-[10px] font-mono text-zinc-600" aria-hidden="true">
             <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-orange-500" />
                <span>ONLINE</span>
             </div>
             <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-yellow-500 animate-pulse" />
                <span>VRAM: 98%</span>
             </div>
          </div>
          
          {/* Mobile Menu Button (Hamburger) */}
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white border border-transparent hover:border-zinc-700" 
            aria-label="Toggle Mobile Menu"
            aria-expanded="false" // In a real app, bind this to state
          >
             <div className="space-y-1">
                <div className="w-5 h-0.5 bg-current" />
                <div className="w-5 h-0.5 bg-current" />
                <div className="w-3 h-0.5 bg-current ml-auto" />
             </div>
          </button>

        </nav>
      </div>
    </header>
  );
}
