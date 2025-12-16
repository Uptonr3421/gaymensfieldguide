'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// GAME CONSTANTS
const CONSTANTS = {
    GRAVITY: 0.8,
    JUMP_FORCE: -12,
    SPEED: 6,
    SPAWN_RATE: 100, // Frames between obstacles
    GROUND_Y: 300,
    SCREEN_WIDTH: 800,
    SCREEN_HEIGHT: 400
};

export const SuperPiper = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // GAME STATE (Mutable Ref for performance loop)
    const stateRef = useRef({
        player: { 
            x: 100, 
            y: CONSTANTS.GROUND_Y - 50, 
            width: 40, 
            height: 50, 
            vy: 0, 
            isGrounded: true 
        },
        obstacles: [] as { x: number, y: number, width: number, height: number, type: 'BOX' | 'BIRD' }[],
        frame: 0
    });

    // --- CORE GAME LOOP ---
    const update = useCallback(() => {
        if (gameState !== 'PLAYING') return;
        const state = stateRef.current;
        const player = state.player;

        // 1. PHYSICS
        player.vy += CONSTANTS.GRAVITY;
        player.y += player.vy;

        // Ground Collision
        if (player.y > CONSTANTS.GROUND_Y - player.height) {
            player.y = CONSTANTS.GROUND_Y - player.height;
            player.vy = 0;
            player.isGrounded = true;
        }

        // 2. OBSTACLES (Spawn & Move)
        state.frame++;
        if (state.frame % CONSTANTS.SPAWN_RATE === 0) {
            // Randomly spawn Ground Box or Air Bird
            const isBird = Math.random() > 0.7;
            state.obstacles.push({
                x: CONSTANTS.SCREEN_WIDTH,
                y: isBird ? CONSTANTS.GROUND_Y - 90 : CONSTANTS.GROUND_Y - 40,
                width: 40,
                height: 40,
                type: isBird ? 'BIRD' : 'BOX'
            });
            
            // Increase diffculty
            if (state.frame % 500 === 0) CONSTANTS.SPEED += 0.5;
        }

        // Move Obstacles
        state.obstacles.forEach(obs => obs.x -= CONSTANTS.SPEED);
        // Remove off-screen
        state.obstacles = state.obstacles.filter(obs => obs.x > -100);

        // 3. COLLISION DETECTION (AABB)
        const pBox = { l: player.x + 5, r: player.x + player.width - 5, t: player.y + 5, b: player.y + player.height - 5 };
        
        for (const obs of state.obstacles) {
            const oBox = { l: obs.x, r: obs.x + obs.width, t: obs.y, b: obs.y + obs.height };
            
            if (pBox.l < oBox.r && pBox.r > oBox.l && pBox.t < oBox.b && pBox.b > oBox.t) {
                setGameState('GAME_OVER');
                if (score > highScore) setHighScore(score);
                return; // Stop update
            }
        }

        // 4. SCORE
        if (state.frame % 10 === 0) {
            setScore(s => s + 1);
        }

    }, [gameState, score, highScore]);

    // --- DRAW LOOP ---
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.fillStyle = '#87CEEB'; // Simple Sky
        ctx.fillRect(0, 0, CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);

        // Ground
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(0, CONSTANTS.GROUND_Y, CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT - CONSTANTS.GROUND_Y);
        ctx.fillStyle = '#4CAF50'; // Grass
        ctx.fillRect(0, CONSTANTS.GROUND_Y, CONSTANTS.SCREEN_WIDTH, 10);

        // Player (Simple Piper)
        const p = stateRef.current.player;
        ctx.save();
        ctx.translate(p.x, p.y);
        
        // Hair (Blonde)
        ctx.fillStyle = '#FFD700'; ctx.fillRect(-5, -5, 50, 20);
        // Head
        ctx.fillStyle = '#FFC0CB'; ctx.fillRect(10, 0, 20, 20);
        // Body (Rainbow)
        const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];
        colors.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(10, 20 + (i * 3), 20, 3); });
        // Skirt (Blue)
        ctx.fillStyle = '#2196F3'; ctx.fillRect(10, 40, 20, 10);
        
        ctx.restore();

        // Obstacles
        stateRef.current.obstacles.forEach(obs => {
            if (obs.type === 'BOX') {
                ctx.fillStyle = '#3E2723';
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                ctx.strokeStyle = '#fff';
                ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
            } else {
                // Bird/Glitch
                ctx.fillStyle = '#E91E63';
                ctx.beginPath();
                ctx.moveTo(obs.x, obs.y + 20);
                ctx.lineTo(obs.x + 20, obs.y);
                ctx.lineTo(obs.x + 40, obs.y + 20);
                ctx.fill();
            }
        });

        // UI
        if (gameState === 'START') {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, 0, CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);
            ctx.fillStyle = '#FFF';
            ctx.font = '30px monospace';
            ctx.textAlign = 'center';
            ctx.fillText("TAP OR SPACE TO JUMP", CONSTANTS.SCREEN_WIDTH/2, CONSTANTS.SCREEN_HEIGHT/2);
        }

    }, [gameState]);

    // --- LOOP MANAGEMENT ---
    useEffect(() => {
        let frameId: number;
        const loop = () => {
            update();
            draw();
            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId);
    }, [update, draw]);

    // --- CONTROLS ---
    const jump = useCallback(() => {
        if (gameState === 'START' || gameState === 'GAME_OVER') {
            // Reset
            setGameState('PLAYING');
            setScore(0);
            stateRef.current = {
                player: { x: 100, y: CONSTANTS.GROUND_Y - 50, width: 40, height: 50, vy: 0, isGrounded: true },
                obstacles: [],
                frame: 0
            };
            return;
        }

        if (stateRef.current.player.isGrounded) {
            stateRef.current.player.vy = CONSTANTS.JUMP_FORCE;
            stateRef.current.player.isGrounded = false;
        }
    }, [gameState]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [jump]);

    return (
        <div className="w-full max-w-[800px] mx-auto border-4 border-zinc-700 bg-zinc-900 rounded-lg overflow-hidden touch-manipulation select-none relative shadow-2xl mb-12 scanlines">
            {/* CANVAS LAYER */}
            <canvas 
                ref={canvasRef} 
                width={800} 
                height={400} 
                className="w-full h-auto block cursor-pointer opacity-90 contrast-125 saturate-150"
                onMouseDown={jump}
                onTouchStart={(e) => { e.preventDefault(); jump(); }}
            />
            
            {/* HTML UI OVERLAY (Clean & Sharp) */}
            <div className="flex justify-between p-4 bg-zinc-900/90 text-white font-mono text-sm border-t border-zinc-800 absolute bottom-0 w-full z-20">
                <span className="text-neon-cyan drop-shadow-md">SCORE: {score}</span>
                <span className="text-neon-pink drop-shadow-md">HIGH: {highScore}</span>
            </div>

            {gameState === 'GAME_OVER' && (
                 <div 
                    className="absolute inset-x-0 top-10 flex flex-col items-center justify-center pointer-events-none" 
                    style={{ textShadow: '2px 2px 0 #000' }}
                 >
                     <h2 className="text-4xl font-black text-white bg-red-600 px-4 py-2 transform -rotate-2">GAME OVER</h2>
                     <p className="text-white mt-2 animate-pulse">Tap to Restart</p>
                 </div>
            )}
        </div>
    );
};
