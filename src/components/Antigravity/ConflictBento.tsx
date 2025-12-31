'use client';

import React from 'react';
import { InteractiveContainer } from './InteractiveContainer';
import { cn } from '@/lib/utils';

interface ConflictItem {
  label: string;
  value: string;
}

interface ConflictBentoProps {
  title?: string;
  items?: ConflictItem[];
  className?: string; // Allow className prop
}

export default function ConflictBento({ 
  title = "WARNING: CONFLICT_DETECTED",
  items = [
    { label: "ERROR", value: "DATA_MISSING" },
    { label: "STATUS", value: "UNKNOWN" }
  ],
  className 
}: ConflictBentoProps) {
  return (
    <InteractiveContainer title={title} type="exploit" className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative p-4 bg-zinc-950/80 border-win95-inset hover:bg-black transition-colors"
          >
            {/* Label */}
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 group-hover:text-green-400 transition-colors">
              {item.label}
            </h4>
            
            {/* Value (Glowing) */}
            <p className="font-mono text-xl md:text-2xl font-bold text-zinc-300 group-hover:text-glow-green group-hover:text-green-400 transition-colors">
              {item.value}
            </p>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-800 group-hover:border-green-500 transition-colors" />
            
            {/* Scanline overlay for item */}
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-5" />
          </div>
        ))}
      </div>
    </InteractiveContainer>
  );
}
