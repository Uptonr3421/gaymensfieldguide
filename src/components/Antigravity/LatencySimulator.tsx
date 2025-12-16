"use client";
import React, { useState, useEffect } from 'react';
import { InteractiveContainer } from './InteractiveContainer';

export function LatencySimulator() {
  const [mode, setMode] = useState<'cloud' | 'local'>('cloud');
  const [request, setRequest] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    if (request) {
        setResponse(null);
        const delay = mode === 'cloud' ? 1500 : 50; 
        const timer = setTimeout(() => {
            setResponse(mode === 'cloud' ? 'I found that for you in 1.5 seconds.' : 'Done (0.05s).');
            setRequest(false);
        }, delay);
        return () => clearTimeout(timer);
    }
  }, [request, mode]);

  return (
    <InteractiveContainer title="LATENCY_TEST: CLOUD_VS_LOCAL" type="simulation">
      <div className="font-mono text-sm p-6 text-center">
         <div className="flex justify-center gap-4 mb-8">
            <button 
                onClick={() => setMode('cloud')}
                className={`px-4 py-2 border ${mode === 'cloud' ? 'border-neon-red text-neon-red' : 'border-zinc-700 text-zinc-500'}`}
            >
                ALEXA (CLOUD)
            </button>
            <button 
                onClick={() => setMode('local')}
                className={`px-4 py-2 border ${mode === 'local' ? 'border-neon-green text-neon-green' : 'border-zinc-700 text-zinc-500'}`}
            >
                JARVIS (LOCAL)
            </button>
         </div>

         <div className="mb-4">
            <button 
                onClick={() => setRequest(true)}
                disabled={request}
                className="bg-white text-black font-black text-xl px-8 py-4 hover:scale-105 transition-transform active:scale-95 disabled:opacity-50"
            >
                {request ? 'PROCESSING...' : 'TURN_ON_LIGHTS'}
            </button>
         </div>

         <div className="h-12 flex items-center justify-center">
            {response && (
                <div className={`text-lg font-bold ${mode === 'cloud' ? 'text-neon-red' : 'text-neon-green'} animate-in fade-in slide-in-from-bottom-2`}>
                    {response}
                </div>
            )}
         </div>

         <p className="text-zinc-500 text-xs mt-4">
            {mode === 'cloud' ? 'PATH: VOICE -> WIFI -> AWS (US-EAST-1) -> AUTH -> PROCESS -> AWS -> WIFI -> LIGHT' : 'PATH: VOICE -> LOCAL_LLM -> LIGHT'}
         </p>
      </div>
    </InteractiveContainer>
  );
}
