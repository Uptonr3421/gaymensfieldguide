"use client";

import React, { useState, useEffect } from 'react';

// 🍌 "Nano Banana" Impact Meter
// Visualizes the "Weight" of the current Vibe Coding session.
// STYLE: 8-bit Video Game / Cube Dark Theme

export default function ImpactMeter() {
  const [isCompact, setIsCompact] = useState(true);
  const [stats, setStats] = useState({ 
      tokens: 0, 
      max: 1000000, 
      cost: 0.00, 
      currentModel: "models/gemini-2.5-pro" 
  });
  const [isLoading, setIsLoading] = useState(false);

  // Poll for status on mount/hover
  useEffect(() => {
    const fetchStats = () => fetch('/api/status').then(r => r.json()).then(setStats).catch(() => {});
    fetchStats();
    // Poll every 10s
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  /* Voice Chat Logic */
  const [isListening, setIsListening] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // 2-Minute Safety Timer
  useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isListening) {
          interval = setInterval(() => {
              setSessionTime(prev => {
                  if (prev >= 120) { // 120 seconds = 2 minutes
                      setIsListening(false);
                      const audio = new Audio('/audio/shutdown.mp3'); 
                      audio.play().catch(() => {});
                      alert("⚠️ Session Limit Reached (2 min). Microphone Deactivated.");
                      return 0;
                  }
                  return prev + 1;
              });
          }, 1000);
      } else {
          setSessionTime(0);
      }
      return () => clearInterval(interval);
  }, [isListening]);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Browser does not support Speech API. Use Chrome.");
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false; 
    recognition.lang = 'en-US';
    
    setIsListening(true);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("🎤 Heard:", transcript);
        setIsListening(false); 
        await processVoiceQuery(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  const processVoiceQuery = async (text: string) => {
      setIsLoading(true);
      try {
          const res = await fetch('/api/chat/voice', {
              method: 'POST',
              body: JSON.stringify({ message: text })
          });
          const data = await res.json();
          
          if (data.stats) {
              setStats(data.stats); // 🍌 LIVE TOKEN UPDATE
          }
          
          if(data.audio) {
              const audio = new Audio(data.audio);
              audio.play();
          }
      } catch (e) {
          console.error(e);
      }
      setIsLoading(false);
  };

  const usagePercent = (stats.tokens / stats.max) * 100;
  // Compact View: "⚡ 14.5k / 1M"
  const compactLabel = `⚡ ${(stats.tokens / 1000).toFixed(1)}k / ${stats.max / 1000000}M`;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 transition-[width] duration-300 ${isCompact ? 'w-auto' : 'w-72'} 
        bg-zinc-950 border-win95-inset shadow-[0_0_15px_rgba(0,0,0,0.8)] 
        font-mono text-xs text-zinc-300 overflow-hidden select-none`}
      onMouseEnter={() => setIsCompact(false)}
      onMouseLeave={() => setIsCompact(true)}
      onClick={() => setIsCompact(!isCompact)}
    >
      {/* Scanline Overlay */}
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none z-10" />

      {/* Progress Bar Background */}
      <div className="absolute top-0 left-0 h-1 bg-zinc-900 w-full z-20">
        <div 
          className="h-full bg-banana-500 shadow-[0_0_10px_theme('colors.banana.500')]" 
          style={{ width: `${usagePercent}%` }}
        />
      </div>

      <div className="p-3 relative z-30 cursor-pointer">
        {isCompact ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_theme('colors.green.500')]" />
            <span className="font-bold text-banana-400 text-glow-yellow">{compactLabel}</span>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-3">
             {/* Header */}
             <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Antigravity v2.5</span>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-500 text-glow-green">ONLINE</span>
                </div>
             </div>
             
             {/* Stats Grid */}
             <div className="space-y-1">
                <div className="flex justify-between">
                    <span className="text-zinc-500">Context Window</span>
                    <span className="text-white text-glow-yellow font-bold">{stats.tokens.toLocaleString()} <span className="text-zinc-600">/ 1M</span></span>
                </div>
                
                <div className="flex justify-between">
                    <span className="text-zinc-500">Est. Cost</span>
                    <span className="text-banana-400 font-bold">${stats.cost.toFixed(4)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-zinc-500">Model</span>
                    <span className="text-purple-400 text-glow-red truncate max-w-[120px]">{stats.currentModel.split('/')[1] || stats.currentModel}</span>
                </div>
             </div>
             
             {/* Action Buttons */}
             <div className="grid grid-cols-2 gap-2 mt-1">
                 <button 
                    className={`col-span-1 py-2 bg-red-950/40 border border-red-900/50 hover:bg-red-900/60 hover:border-red-500 text-center text-[10px] font-bold uppercase tracking-wider transition-colors transition-shadow
                        ${isListening ? 'text-red-100 animate-pulse border-red-500 shadow-[0_0_10px_theme("colors.red.900")]' : 'text-red-400'}`}
                    onClick={(e) => { e.stopPropagation(); startListening(); }}
                 >
                    {isListening ? '🛑 REC' : '🎤 Voice'}
                 </button>
                 
                 <button 
                    className="col-span-1 py-2 bg-zinc-900 border border-zinc-700 hover:border-banana-500 hover:text-banana-400 text-center text-[10px] uppercase tracking-wider text-zinc-400 transition-colors"
                    onClick={async (e) => {
                        e.stopPropagation();
                        setIsLoading(true);
                        await fetch('/api/compact', { method: 'POST' }); 
                        // Optimistic update
                        setStats(prev => ({...prev, tokens: Math.floor(prev.tokens * 0.7)}));
                        setIsLoading(false);
                    }}
                 >
                    {isLoading ? '...' : '📉 Compact'}
                 </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
