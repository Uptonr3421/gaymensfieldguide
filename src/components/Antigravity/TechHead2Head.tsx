'use client';

import React, { useState } from 'react';
import { InteractiveContainer } from './InteractiveContainer';
import { cn } from '@/lib/utils';

interface Spec {
  label: string;
  leftValue: string;
  rightValue: string;
  winner?: 'left' | 'right' | 'tie';
}

interface TechHead2HeadProps {
  leftName: string;
  rightName: string;
  specs: Spec[];
}

export function TechHead2Head({ leftName, rightName, specs }: TechHead2HeadProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const leftScore = specs.filter(s => s.winner === 'left').length;
  const rightScore = specs.filter(s => s.winner === 'right').length;

  return (
    <InteractiveContainer type="game" title="TECH_DEATHMATCH_SIMULATOR">
      {/* Scoreboard Header */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-center font-mono uppercase tracking-wider relative z-10">
        <div className={cn(
          "p-3 border-win95 bg-zinc-950/80", 
          leftScore > rightScore ? "text-neon-yellow text-glow-green border-neon-yellow/50" : "text-zinc-500"
        )}>
          <h3 className="text-xs md:text-sm font-bold mb-1">{leftName}</h3>
          <div className="text-3xl md:text-4xl">{leftScore}</div>
        </div>
        
        <div className="flex items-center justify-center text-zinc-700 font-bold text-xl italic">
          VS
        </div>
        
        <div className={cn(
          "p-3 border-win95 bg-zinc-950/80",
          rightScore > leftScore ? "text-neon-yellow text-glow-green border-neon-yellow/50" : "text-zinc-500"
        )}>
          <h3 className="text-xs md:text-sm font-bold mb-1">{rightName}</h3>
          <div className="text-3xl md:text-4xl">{rightScore}</div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-2">
        {specs.map((spec, idx) => (
          <div 
            key={idx}
            onMouseEnter={() => setHoveredRow(idx)}
            onMouseLeave={() => setHoveredRow(null)}
            className={cn(
              "grid grid-cols-3 gap-2 p-3 text-xs md:text-sm font-mono border-win95-inset transition-[background-color,border-color,opacity] duration-200",
              hoveredRow === idx ? "bg-zinc-900 border-zinc-700" : "bg-zinc-950/30 border-transparent"
            )}
          >
            {/* Left Value */}
            <div className={cn(
              "text-right flex items-center justify-end gap-2",
              spec.winner === 'left' ? "text-green-400 text-glow-green font-bold" : "text-zinc-600"
            )}>
              {spec.winner === 'left' && <span className="text-[10px] hidden md:inline text-green-600">◀</span>}
              {spec.leftValue}
            </div>

            {/* Label */}
            <div className="flex items-center justify-center">
               <span className="text-[9px] md:text-[10px] uppercase text-zinc-500 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-sm whitespace-nowrap">
                 {spec.label}
               </span>
            </div>

            {/* Right Value */}
            <div className={cn(
              "text-left flex items-center justify-start gap-2",
              spec.winner === 'right' ? "text-green-400 text-glow-green font-bold" : "text-zinc-600"
            )}>
              {spec.rightValue}
              {spec.winner === 'right' && <span className="text-[10px] hidden md:inline text-green-600">▶</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Verdict */}
      <div className="mt-6 text-center">
        <div className="inline-block px-6 py-2 bg-black border-win95 text-neon-yellow text-xs font-mono uppercase animate-pulse">
          {leftScore > rightScore ? `VERDICT: ${leftName}` : rightScore > leftScore ? `VERDICT: ${rightName}` : "VERDICT: DRAW"}
        </div>
      </div>
    </InteractiveContainer>
  );
}
