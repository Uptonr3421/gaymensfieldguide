"use client";
import React, { useState, useEffect } from 'react';
import { InteractiveContainer } from './InteractiveContainer';

interface ResourceBalancerProps {
  initialTech: number;
  initialNature: number;
}

export function ResourceBalancer({ initialTech = 50, initialNature = 50 }: ResourceBalancerProps) {
  const [tech, setTech] = useState(initialTech);
  const [nature, setNature] = useState(initialNature);
  const [year, setYear] = useState(2025);
  const [status, setStatus] = useState('STABLE');

  useEffect(() => {
    if (tech > 80 && nature < 20) setStatus('DYSTOPIAN_COLLAPSE');
    else if (tech < 20 && nature > 80) setStatus('PRIMITIVE_REGRESSION');
    else if (tech > 60 && nature > 60) setStatus('SOLARPUNK_UTOPIA');
    else setStatus('STABLE');
  }, [tech, nature]);

  const adjust = (type: 'tech' | 'nature', amount: number) => {
    if (type === 'tech') setTech(t => Math.min(Math.max(t + amount, 0), 100));
    if (type === 'nature') setNature(n => Math.min(Math.max(n + amount, 0), 100));
    setYear(y => y + 1);
  };

  return (
    <InteractiveContainer title={`SIM_YEAR_${year}`} type="simulation">
      <div className="font-mono text-sm p-4 space-y-6">
        <div className="flex justify-between items-center bg-zinc-900 p-2 border border-zinc-700">
             <span className="text-zinc-500">SOCIETY_STATUS</span>
             <span className={`font-bold ${status === 'SOLARPUNK_UTOPIA' ? 'text-neon-green' : status === 'STABLE' ? 'text-white' : 'text-neon-red'}`}>
                {status}
             </span>
        </div>

        <div className="space-y-4">
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-blue-400">TECHNOLOGY</span>
                    <span className="text-zinc-400">{tech}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${tech}%` }} />
                </div>
                <div className="flex gap-2 mt-2">
                    <button onClick={() => adjust('tech', 10)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs py-2">+ AI_GRID</button>
                    <button onClick={() => adjust('tech', -10)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs py-2">- DE_INDUSTRIALIZE</button>
                </div>
            </div>

            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-green-400">NATURE</span>
                    <span className="text-zinc-400">{nature}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all" style={{ width: `${nature}%` }} />
                </div>
                <div className="flex gap-2 mt-2">
                     <button onClick={() => adjust('nature', 10)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs py-2">+ REWILDING</button>
                     <button onClick={() => adjust('nature', -10)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs py-2">- URBAN_SPRAWL</button>
                </div>
            </div>
        </div>

        {status === 'SOLARPUNK_UTOPIA' && (
            <div className="p-4 bg-green-900/20 border border-green-500/30 text-green-400 text-center animate-bounce">
                ACHIEVEMENT: HARMONY REACHED
            </div>
        )}
      </div>
    </InteractiveContainer>
  );
}
