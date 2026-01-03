"use client";
import React from 'react';
import { cn } from '@/lib/utils';

interface InteractiveContainerProps {
  children: React.ReactNode;
  title?: string;
  type?: 'game' | 'simulation' | 'exploit' | 'bento';
  className?: string;
}

/**
 * InteractiveContainer
 * 
 * The standard "Toy Box" wrapper for GMFG.
 * Wraps interactive elements in an 8-bit / Industrial container.
 * 
 * Features:
 * - Neon accents based on type.
 * - Scanline texture background.
 * - Monospace header.
 */
export function InteractiveContainer({ 
  children, 
  title = "VIBE_MODULE_v1.0",
  type = 'bento',
  className 
}: InteractiveContainerProps) {
  
  const borderColors = {
    game: 'border-neon-yellow',
    simulation: 'border-neon-blue',
    exploit: 'border-neon-red',
    bento: 'border-zinc-700'
  };

  const typeColor = borderColors[type] || borderColors.bento;

  return (
    <div className={cn(
      "relative group w-full overflow-hidden bg-zinc-900 my-8 border-win95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      className
    )}>
      {/* Header Bar */}
      <div className={cn(
        "flex items-center justify-between px-3 py-1 bg-zinc-800 border-b-2 border-zinc-950",
      )}>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 group-hover:text-glow-green group-hover:text-green-400 transition-colors duration-300">
          [{type.toUpperCase()}] :: {title}
        </span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-none border border-zinc-950 bg-zinc-600" />
          <div className="w-2 h-2 rounded-none border border-zinc-950 bg-zinc-600" />
        </div>
      </div>

      {/* Content Area with Scanlines */}
      <div className="relative p-6 border-win95-inset bg-zinc-950/50 m-2">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-scanlines-container mix-blend-overlay" />
        <div className="relative z-10 font-mono">
          {children}
        </div>
      </div>

      {/* Footer / Status Line */}
      <div className="px-3 py-1 bg-zinc-800 border-t-2 border-zinc-950 flex justify-between items-center">
         <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 animate-pulse inline-block" />
            SYS_READY
         </span>
         <span className="text-[10px] font-mono text-zinc-600">ID: GMFG-SYS-01</span>
      </div>
    </div>
  );
}
