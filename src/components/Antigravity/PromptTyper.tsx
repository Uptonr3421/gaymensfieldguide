'use client';

import React, { useState, useEffect, useRef } from 'react';
import { InteractiveContainer } from './InteractiveContainer';
import { Terminal, CheckCircle, AlertTriangle } from 'lucide-react';

const PROMPTS = [
    "sudo rm -rf /legacy_code && deploy --force",
    "generate a vibe-coded manifesto for the post-saas era",
    "optimize --target=universal_truth --mode=chaos",
    "initiate sequence: massive_context_window_overflow",
    "analyze sentiment: humanity is cooked but we are vibing"
];

interface PromptTyperProps {
  customPrompt?: string;
  topic?: string;
}

export function PromptTyper({ customPrompt, topic = "HUMAN_VS_MODEL" }: PromptTyperProps) {
  const [targetPrompt, setTargetPrompt] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  
  const aiInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (customPrompt) {
        setTargetPrompt(customPrompt);
    } else {
        setTargetPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    }
  }, [customPrompt]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    if (!startTime) {
        setStartTime(Date.now());
        startAiRace();
    }

    if (val === targetPrompt) {
        finish(true);
    }
  };

  const startAiRace = () => {
      // AI moves at constant speed
      let progress = 0;
      aiInterval.current = setInterval(() => {
          progress += 1.5; // Tunable difficulty
          setAiProgress(progress);
          if (progress >= 100) {
              finish(false);
          }
      }, 100);
  };

  const finish = (humanWon: boolean) => {
      if (aiInterval.current) clearInterval(aiInterval.current);
      setCompleted(true);
      if (humanWon) {
          const duration = (Date.now() - (startTime || 0)) / 1000 / 60; // minutes
          const words = targetPrompt.split(" ").length;
          setWpm(Math.round(words / duration));
      } else {
          setFailed(true);
      }
  };

  const reset = () => {
    setTargetPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setCompleted(false);
    setFailed(false);
    setAiProgress(0);
  };

  // Human Progress
  const humanProgress = Math.min(100, (input.length / targetPrompt.length) * 100);

  return (
    <InteractiveContainer title={`${topic}_LATENCY_TEST`} type="simulation">
        <div className="p-4 font-mono text-xs">
            
            <div className="mb-8 space-y-4">
                {/* AI BAR */}
                <div className="relative">
                    <div className="flex justify-between mb-1 text-zinc-500">
                        <span>MODEL_V5 (AUTO-REGRESSIVE)</span>
                        <span>{Math.round(aiProgress)}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-red-600 transition-[width] duration-100 ease-linear"
                            style={{ width: `${aiProgress}%` }}
                        />
                    </div>
                </div>

                {/* HUMAN BAR */}
                <div className="relative">
                    <div className="flex justify-between mb-1 text-zinc-500">
                        <span>YOU (BIOLOGICAL NEURAL NET)</span>
                        <span>{Math.round(humanProgress)}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-neon-green transition-[width] duration-75"
                            style={{ width: `${humanProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {!completed ? (
                <div className="bg-zinc-950 border border-zinc-800 p-6 text-center">
                    <p className="text-zinc-500 mb-2">TYPE THIS PROMPT:</p>
                    <p className="text-lg text-white mb-6 font-bold select-none">{targetPrompt}</p>
                    
                    <div className="relative">
                         <Terminal className="absolute left-3 top-3 text-zinc-500" size={16} />
                         <input 
                            type="text" 
                            value={input}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-700 p-3 pl-10 text-banana-500 focus:outline-none focus:border-banana-500 transition-colors"
                            placeholder="Start typing to initialize race..."
                            autoComplete="off"
                         />
                    </div>
                </div>
            ) : (
                <div className={`p-8 border ${failed ? 'border-red-600 bg-red-950/20' : 'border-neon-green bg-green-950/20'} text-center`}>
                    {failed ? (
                        <>
                            <AlertTriangle className="mx-auto text-red-600 mb-4" size={32} />
                            <h3 className="text-2xl font-black text-red-500 mb-2">LATENCY TOO HIGH</h3>
                            <p className="text-zinc-400 mb-4">The model replaced you.</p>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mx-auto text-neon-green mb-4" size={32} />
                            <h3 className="text-2xl font-black text-white mb-2">SUPERIOR INTELLECT</h3>
                            <p className="text-zinc-400 mb-4">Speed: {wpm} WPM</p>
                        </>
                    )}
                    <button 
                        onClick={reset}
                        className="bg-zinc-800 text-white px-6 py-2 font-bold hover:bg-zinc-700"
                    >
                        RUN_AGAIN
                    </button>
                </div>
            )}

        </div>
    </InteractiveContainer>
  );
}
