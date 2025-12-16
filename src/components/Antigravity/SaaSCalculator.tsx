"use client";
import React, { useState } from 'react';
import { InteractiveContainer } from './InteractiveContainer';

export function SaaSCalculator() {
  const [services, setServices] = useState([
    { name: 'Netflix', price: 22, type: 'Media' },
    { name: 'Spotify', price: 12, type: 'Media' },
    { name: 'Adobe Creative Cloud', price: 60, type: 'Work' },
    { name: 'Dropbox', price: 15, type: 'Storage' },
    { name: 'ChatGPT Plus', price: 20, type: 'Work' },
    { name: 'Midjourney', price: 30, type: 'Work' }
  ]);
  
  const [years, setYears] = useState(5);

  const totalMonthly = services.reduce((acc, curr) => acc + curr.price, 0);
  const totalLifetime = totalMonthly * 12 * years;
  const investingGap = totalLifetime * 1.4; // 7% compound interest roughly

  return (
    <InteractiveContainer title="THE_SUBSCRIPTION_BLEED" type="simulation">
      <div className="font-mono text-xs md:text-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h4 className="text-zinc-500 mb-4 border-b border-zinc-700 pb-2">YOUR_MONTHLY_RENT</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {services.map((s, i) => (
                        <div key={i} className="flex justify-between items-center group hover:bg-zinc-800 p-1 rounded cursor-pointer" 
                             onClick={() => setServices(prev => prev.filter((_, idx) => idx !== i))}>
                            <span className="text-zinc-300 group-hover:line-through">{s.name}</span>
                            <span className="text-zinc-500">${s.price}</span>
                        </div>
                    ))}
                    <div className="pt-2 border-t border-dashed border-zinc-800 flex justify-between font-bold">
                        <span className="text-white">TOTAL</span>
                        <span className="text-neon-red">${totalMonthly}/mo</span>
                    </div>
                </div>
                <p className="text-[10px] text-zinc-600 mt-2">*Click items to cancel them.</p>
            </div>

            <div className="text-center flex flex-col justify-center">
                <p className="text-zinc-500 mb-1">COST OVER {years} YEARS</p>
                <div className="text-4xl font-black text-white mb-4">
                    ${totalLifetime.toLocaleString()}
                </div>
                
                <p className="text-zinc-500 mb-1">IF INVESTED (S&P 500)</p>
                <div className="text-4xl font-black text-neon-green mb-6">
                    ${investingGap.toLocaleString()}
                </div>

                <div className="bg-zinc-800 p-3 text-[10px] text-zinc-400">
                    <span className="block text-white font-bold mb-1">LOCAL_ALTERNATIVE_COST</span>
                    NAS ($400) + Plex ($0) + Obsidian ($0) + Stable Diffusion ($0)<br/>
                    <span className="text-neon-yellow font-bold text-lg mt-1 block">
                        $400 one-time
                    </span>
                </div>
            </div>
        </div>
      </div>
    </InteractiveContainer>
  );
}
