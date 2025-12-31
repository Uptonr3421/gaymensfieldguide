import React from 'react';

interface CinematicContainerProps {
  children: React.ReactNode;
  variant?: 'holo' | 'obsidian' | 'voltage' | 'field';
  className?: string;
}

export default function CinematicContainer({ children, variant = 'holo', className = '' }: CinematicContainerProps) {
  const baseStyles = "relative overflow-hidden transition-[opacity,box-shadow] duration-700 group isolate";
  
  const variants = {
    holo: "bg-industrial-900/60 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]",
    obsidian: "bg-black border border-industrial-800 shadow-[inset_0_0_100px_rgba(0,0,0,1)] hover:border-industrial-600",
    voltage: "bg-industrial-950/80 backdrop-blur-md border-l-[6px] border-banana-500 shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:shadow-[0_0_50px_rgba(234,179,8,0.2)]",
    field: "bg-paper/70 dark:bg-industrial-900/80 backdrop-blur-md border border-industrial-300 dark:border-industrial-700 shadow-lg hover:border-banana-500 transition-colors"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {/* Cinematic Glitch / Shine (Global) */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-45 translate-x-[-150%] group-hover:animate-shine-slow" />
      </div>

      {/* Voltage Arcs (Voltage Variant) */}
      {variant === 'voltage' && (
         <div className="absolute top-0 left-0 w-[2px] h-full bg-banana-400 opacity-50 shadow-[0_0_15px_#EAB308]" />
      )}

      {/* Field Notebook Technical Markers (Field Variant) */}
      {variant === 'field' && (
        <>
          {/* Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-industrial-400 dark:border-industrial-600 rounded-tl-sm opacity-60" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-industrial-400 dark:border-industrial-600 rounded-tr-sm opacity-60" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-industrial-400 dark:border-industrial-600 rounded-bl-sm opacity-60" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-industrial-400 dark:border-industrial-600 rounded-br-sm opacity-60" />
          
          {/* Mid-Point Crosshairs */}
          <div className="absolute top-1/2 left-0 w-2 h-[1px] bg-banana-500/50" />
          <div className="absolute top-1/2 right-0 w-2 h-[1px] bg-banana-500/50" />
          <div className="absolute top-0 left-1/2 h-2 w-[1px] bg-banana-500/50" />
          <div className="absolute bottom-0 left-1/2 h-2 w-[1px] bg-banana-500/50" />

          {/* Technical Data Label */}
          <div className="absolute top-3 right-4 font-mono text-[9px] tracking-widest text-industrial-400 opacity-50">
             FIELD_DATA // V.1.0
          </div>
        </>
      )}

      {/* Obsidian Depth (Obsidian Variant) */}
      {variant === 'obsidian' && (
         <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      )}

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />

      <div className={`relative z-10 w-full h-full ${variant === 'field' ? 'p-8' : ''}`}>
         {children}
      </div>
    </div>
  );
}
