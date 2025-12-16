"use client";
import React, { useState } from 'react';
import { InteractiveContainer } from './InteractiveContainer';

export function StackBuilder() {
  const [bill, setBill] = useState(0);
  const [stack, setStack] = useState<{name: string, price: number, type: string}[]>([]);

  const tools = [
    { name: 'Supabase', price: 0, enterprise: 25, type: 'DB' },
    { name: 'Vercel', price: 0, enterprise: 20, type: 'Host' },
    { name: 'Clerk', price: 0, enterprise: 99, type: 'Auth' },
    { name: 'Resend', price: 0, enterprise: 50, type: 'Email' },
    { name: 'PostHog', price: 0, enterprise: 150, type: 'Analytics' }
  ];

  const addToStack = (tool: any, isEnterprise: boolean) => {
    const cost = isEnterprise ? tool.enterprise : tool.price;
    setStack([...stack, { ...tool, price: cost, name: isEnterprise ? `${tool.name} (Pro)` : `${tool.name} (Free)` }]);
    setBill(b => b + cost);
  };

  const reset = () => {
    setStack([]);
    setBill(0);
  };

  return (
    <InteractiveContainer title="YOUR_SAAS_STACK_BUILDER" type="simulation">
      <div className="font-mono text-xs md:text-sm p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <h4 className="text-zinc-500 mb-2">AVAILABLE_TOOLS</h4>
            <div className="space-y-2">
                {tools.map((t, i) => (
                    <div key={i} className="flex justify-between items-center bg-zinc-900 border border-zinc-700 p-2">
                        <span>{t.name}</span>
                        <div className="flex gap-1">
                            <button onClick={() => addToStack(t, false)} className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] text-green-400">FREE</button>
                            <button onClick={() => addToStack(t, true)} className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] text-orange-400">PRO (${t.enterprise})</button>
                        </div>
                    </div>
                ))}
            </div>
             <button onClick={reset} className="mt-4 text-xs text-zinc-500 hover:text-white underline">RESET_STACK</button>
        </div>

        <div className="bg-black border border-dashed border-zinc-800 p-4 relative">
            <h4 className="text-zinc-500 mb-2">CURRENT_BILL</h4>
            <div className="text-4xl font-black text-white mb-4">
                ${bill}<span className="text-sm text-zinc-600">/mo</span>
            </div>
            
            <div className="space-y-1 max-h-32 overflow-y-auto">
                {stack.map((item, i) => (
                    <div key={i} className="flex justify-between text-zinc-400 text-xs">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                    </div>
                ))}
            </div>

            {bill > 100 && (
                <div className="absolute bottom-2 right-2 text-neon-red font-bold animate-pulse text-xs">
                    WARNING: RUNWAY_DEPLETING
                </div>
            )}
             {bill === 0 && stack.length > 2 && (
                <div className="absolute bottom-2 right-2 text-neon-green font-bold text-xs">
                    STATUS: INDIE_HACKER_GOD
                </div>
            )}
        </div>
      </div>
    </InteractiveContainer>
  );
}
