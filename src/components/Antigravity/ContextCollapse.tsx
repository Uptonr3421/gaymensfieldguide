'use client';

import React, { useState, useEffect } from 'react';
import { InteractiveContainer } from './InteractiveContainer';
import { Brain, Database, Cpu, Globe, Lock, Shield, Zap, Radio } from 'lucide-react';

const ICONS = [Brain, Database, Cpu, Globe, Lock, Shield, Zap, Radio];

interface ContextCollapseProps {
  topic?: string;
}

export function ContextCollapse({ topic = "CONTEXT_COLLAPSE" }: ContextCollapseProps) {
  const [cards, setCards] = useState<{id: number, iconId: number, match: boolean, flipped: boolean}[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [timer, setTimer] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [victory, setVictory] = useState(false);

  // Init Game
  const initGame = () => {
    // Take 6 pairs (12 cards)
    const selection = ICONS.slice(0, 6); 
    const gameIcons = [...selection, ...selection]
        .map((Icon, i) => ({ id: i, iconId: selection.indexOf(Icon), match: false, flipped: false }))
        .sort(() => Math.random() - 0.5);

    setCards(gameIcons);
    setFlipped([]);
    setSolved([]);
    setTimer(100);
    setGameOver(false);
    setVictory(false);
    setStarted(true);
  };

  // Timer
  useEffect(() => {
      if (!started || gameOver || victory) return;
      const interval = setInterval(() => {
          setTimer(t => {
              if (t <= 0) {
                  setGameOver(true);
                  return 0;
              }
              return t - 0.5; // Drain rate
          });
      }, 100);
      return () => clearInterval(interval);
  }, [started, gameOver, victory]);

  // Check Match
  useEffect(() => {
      if (flipped.length === 2) {
          const [first, second] = flipped;
          const card1 = cards.find(c => c.id === first);
          const card2 = cards.find(c => c.id === second);
          
          if (card1 && card2 && card1.iconId === card2.iconId) {
              setSolved(prev => [...prev, card1.iconId]);
              setFlipped([]);
          } else {
              setTimeout(() => setFlipped([]), 800);
          }
      }
  }, [flipped, cards]);

  // Check Win
  useEffect(() => {
      if (solved.length === 6) {
          setVictory(true);
      }
  }, [solved]);

  const handleCardClick = (id: number) => {
     if (!started || gameOver || victory) return;
     if (flipped.length >= 2) return;
     if (flipped.includes(id)) return;
     
     const card = cards.find(c => c.id === id);
     if (solved.includes(card!.iconId)) return;

     setFlipped(prev => [...prev, id]);
  };

  return (
    <InteractiveContainer title={`${topic}_PREVENTION`} type="game">
      <div className="p-4 flex flex-col items-center">
          
        {!started ? (
            <div className="text-center py-12">
                <Brain className="mx-auto w-12 h-12 text-zinc-600 mb-4 animate-pulse" />
                <h3 className="text-white font-bold mb-2">MEMORY_INTEGRITY_CHECK</h3>
                <p className="text-zinc-500 text-xs mb-6 max-w-xs mx-auto">Match the data pairs before your context window collapses.</p>
                <button 
                    onClick={initGame}
                    className="bg-neon-yellow text-black font-bold px-8 py-3 hover:bg-yellow-400 transition-colors"
                >
                    START_SEQUENCE
                </button>
            </div>
        ) : (
            <>
                {/* Timer Bar */}
                <div className="w-full h-2 bg-zinc-800 rounded-full mb-6 overflow-hidden">
                    <div 
                        className={`h-full transition-[width] duration-100 ${timer < 30 ? 'bg-red-600' : 'bg-neon-green'}`}
                        style={{ width: `${timer}%` }} 
                    />
                </div>

                {gameOver ? (
                    <div className="text-center py-8 animate-in zoom-in">
                        <h3 className="text-red-500 font-black text-2xl mb-2">SYSTEM_CRASH</h3>
                         <button onClick={initGame} className="text-white underline">Retry</button>
                    </div>
                ) : victory ? (
                     <div className="text-center py-8 animate-in zoom-in">
                        <h3 className="text-neon-green font-black text-2xl mb-2">INTEGRITY_RESTORED</h3>
                        <p className="text-zinc-400 text-xs">Context Saved.</p>
                        <button onClick={initGame} className="text-white underline mt-4">Play Again</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
                        {cards.map(card => {
                            const Icon = ICONS[card.iconId];
                            const isFlipped = flipped.includes(card.id) || solved.includes(card.iconId);
                            const isSolved = solved.includes(card.iconId);

                            return (
                                <button
                                    key={card.id}
                                    onClick={() => handleCardClick(card.id)}
                                    className={`aspect-square flex items-center justify-center border transition-transform transition-colors duration-300 transform ${isFlipped ? 'rotate-y-180 bg-zinc-800 border-zinc-600' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'}`}
                                >
                                    {isFlipped ? (
                                        <Icon className={isSolved ? 'text-neon-green' : 'text-white'} size={24} />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </>
        )}
      </div>
    </InteractiveContainer>
  );
}
