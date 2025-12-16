'use client';
import * as React from 'react';

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Grid Floor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(200px)] opacity-20" />

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.1)_0%,_transparent_70%)]" />
      
      {/* The Cube - CSS 3D Wireframe */}
      <div 
        className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="w-full h-full relative animate-spin-slow"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Wireframe Faces */}
          {[
            'translateZ(100px)',
            'rotateY(180deg) translateZ(100px)',
            'rotateY(90deg) translateZ(100px)',
            'rotateY(-90deg) translateZ(100px)',
            'rotateX(90deg) translateZ(100px)',
            'rotateX(-90deg) translateZ(100px)'
          ].map((transform, i) => (
            <div 
              key={i}
              className="absolute inset-0 border-2 border-green-500/50 bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
              style={{ transform }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="font-mono text-xs text-green-500/50 animate-pulse">
                   {['VIBE', 'CODE', 'DATA', 'NULL', 'VOID', 'ROOT'][i]}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glitch Overlay Text */}
      <div className="absolute bottom-10 left-10 font-mono text-xs text-green-500/50">
        <div className="animate-pulse">RENDER_ENGINE: ONLINE</div>
        <FrameCounter />
      </div>
    </div>
  );
}

function FrameCounter() {
  const [frames, setFrames] = React.useState(0);
  
  React.useEffect(() => {
    setFrames(Math.floor(Math.random() * 9999));
  }, []);

  return <div>FRAMES: {frames}</div>;
}
