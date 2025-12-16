"use client";
import React, { useState } from 'react';
import { InteractiveContainer } from './InteractiveContainer';

interface TuringTestProps {
  scenarios: {
    id: number;
    audioSrc?: string; // Placeholder for real audio
    transcript: string;
    isAI: boolean;
    reveal: string;
  }[];
}

export function TuringTest({ scenarios = [
  { id: 1, transcript: "I'm not sure specifically, but I think it was around 2 PM.", isAI: true, reveal: "Slight hesitation was simulated." },
  { id: 2, transcript: "Uhh, let me check the schedule real quick.", isAI: false, reveal: "The 'uhh' was organic." }
] }: TuringTestProps) {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleGuess = (guessAI: boolean) => {
    if (revealed) return;
    if (guessAI === scenarios[current].isAI) {
      setScore(s => s + 1);
    }
    setRevealed(true);
  };

  const next = () => {
    setRevealed(false);
    if (current < scenarios.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setFinished(true);
    }
  };

  const scenario = scenarios[current];

  return (
    <InteractiveContainer title="VOICE_TURING_TEST_v2.0" type="game">
      <div className="font-mono text-sm p-2">
        {!finished ? (
          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 border border-zinc-700 relative overflow-hidden group">
               <div className="absolute top-2 right-2 flex gap-1">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className={`w-1 h-1 rounded-full ${i < 3 ? 'bg-red-500 animate-pulse' : 'bg-zinc-800'}`} />
                 ))}
               </div>
               
               <div className="text-center mb-6">
                 <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-4 border border-zinc-600">
                    <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                 </div>
                 <p className="text-zinc-300 italic">"{scenario.transcript}"</p>
               </div>

               {!revealed ? (
                 <div className="grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => handleGuess(false)}
                     className="py-12 border border-zinc-600 hover:bg-zinc-800 hover:border-zinc-400 transition-all text-xl font-bold text-zinc-300"
                   >
                     HUMAN
                   </button>
                   <button 
                     onClick={() => handleGuess(true)}
                     className="py-12 border border-zinc-600 hover:bg-zinc-800 hover:border-zinc-400 transition-all text-xl font-bold text-zinc-300"
                   >
                     AI
                   </button>
                 </div>
               ) : (
                 <div className="text-center animate-in fade-in zoom-in duration-300">
                   <div className={`text-4xl font-black mb-2 ${scenario.isAI ? 'text-neon-purple' : 'text-neon-green'}`}>
                     {scenario.isAI ? 'IT WAS AI' : 'IT WAS HUMAN'}
                   </div>
                   <p className="text-zinc-400 mb-6">{scenario.reveal}</p>
                   <button 
                     onClick={next}
                     className="bg-white text-black px-8 py-3 font-bold hover:bg-zinc-200"
                   >
                     NEXT_SUBJECT
                   </button>
                 </div>
               )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-black mb-2">TEST_COMPLETE</h3>
            <p className="text-zinc-400">YOU DETECTED {score} / {scenarios.length} IMPOSTORS</p>
            {score < scenarios.length ? (
                <p className="text-neon-red mt-4 font-bold">WARNING: YOU ARE VULNERABLE TO VISHING.</p>
            ) : (
                <p className="text-neon-green mt-4 font-bold">STATUS: PARANOID (GOOD).</p>
            )}
          </div>
        )}
      </div>
    </InteractiveContainer>
  );
}
