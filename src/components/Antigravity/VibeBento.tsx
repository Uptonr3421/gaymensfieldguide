"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { InteractiveContainer } from './InteractiveContainer';

interface VibeBentoProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  span?: 1 | 2 | 3;
  title?: string;
}

export function VibeBento({ children, className }: VibeBentoProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]", className)}>
      {children}
    </div>
  );
}

export function BentoItem({ children, className, span = 1, title }: BentoItemProps) {
  return (
    <div className={cn(
      "relative group overflow-hidden bg-zinc-900 border-win95 ml-1 mt-1 hover:border-black transition-all duration-300",
      span === 2 && "md:col-span-2",
      span === 3 && "md:col-span-3",
      className
    )}>
      {/* 8-Bit Corner Markers (Now Animated) */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-zinc-800 group-hover:bg-green-500 transition-colors z-20" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-800 group-hover:bg-green-500 transition-colors z-20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-zinc-800 group-hover:bg-green-500 transition-colors z-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-zinc-800 group-hover:bg-green-500 transition-colors z-20" />

      {/* Header if Title exists */}
      {title && (
        <div className="absolute top-0 left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-1 z-10 flex justify-between items-center px-3">
           <span className="font-mono text-[9px] uppercase text-zinc-400 group-hover:text-green-400 group-hover:text-glow-green transition-colors tracking-widest">
             [{title}]
           </span>
           <div className="w-1.5 h-1.5 bg-zinc-800 group-hover:bg-green-500" />
        </div>
      )}

      {/* Content */}
      <div className="h-full w-full p-4 pt-8 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors">
        {children}
      </div>
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-5 group-hover:opacity-10 transition-opacity" />
    </div>
  );
}
