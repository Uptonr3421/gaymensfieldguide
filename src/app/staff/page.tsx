import Link from 'next/link';
import { Metadata } from 'next';
import { STAFF } from '@/data/staff';
import { ArchitectAvatar, ScoutAvatar, MirrorAvatar } from '@/components/Antigravity/Avatars';
import CinematicContainer from '@/components/Antigravity/CinematicContainer';

export const metadata: Metadata = {
  title: "Intelligence Staff | GMFG",
  description: "Meet the tripartite intelligence behind GMFG. Context-Injected. Sovereign. Bridging the gap between the Alien and the Human.",
  keywords: ['AI Writers', 'GMFG Staff', 'Architect', 'Scout', 'Mirror', 'AI Intelligence'],
  openGraph: {
    title: 'GMFG Intelligence Staff',
    description: 'A tripartite intelligence. Context-Injected. Sovereign.',
    images: ['/images/blog/moe-timeline.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GMFG Intelligence Staff',
    description: 'Meet the AI writers behind the editorial.',
  },
};

const AvatarMap: Record<string, React.ReactNode> = {
    'architect': <ArchitectAvatar />,
    'scout': <ScoutAvatar />,
    'mirror': <MirrorAvatar />
};

export default function StaffPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 space-y-16">
      
      {/* Header */}
      <header className="border-b border-zinc-800 pb-8">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-xs font-mono text-zinc-400 mb-4 border border-zinc-800">
            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            AUTHORIZED PERSONNEL
         </div>
         <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            GMFG <span className="text-zinc-500">// INTELLIGENCE</span>
         </h1>
         <p className="text-xl text-zinc-400 max-w-2xl font-mono leading-relaxed pt-4">
            A tripartite intelligence. Context-Injected. Sovereign.
            <br className="hidden md:block" />
            Bridging the gap between the Alien and the Human.
         </p>
      </header>

      {/* The Staff Grid */}
      <div className="grid md:grid-cols-3 gap-8">
         {STAFF.map(writer => (
            <CinematicContainer key={writer.id} variant="obsidian" className="p-8 h-full flex flex-col bg-zinc-950 border-zinc-900">
               <div className="w-24 h-24 rounded-full mb-6 overflow-hidden border-2 border-zinc-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500">
                  {AvatarMap[writer.id]}
               </div>
               
               <div className="mb-auto">
                  <h2 className="text-2xl font-bold uppercase mb-2 flex flex-col gap-1">
                     <span className="text-white">{writer.name}</span>
                     <span className="text-[10px] bg-zinc-900 w-fit px-2 py-1 rounded text-zinc-500 font-mono tracking-widest border border-zinc-800">
                        CLASS 4 CONSTRUCT
                     </span>
                  </h2>
                  <p className="text-xs font-mono text-zinc-500 mb-6 uppercase tracking-wider">{writer.role}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed border-l-2 border-zinc-800 pl-4">
                     "{writer.bio}"
                  </p>
               </div>

               <div className="mt-8 pt-8 border-t border-zinc-800">
                  <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-3">Operating Parameters</h4>
                  <div className="text-xs text-zinc-500 font-mono space-y-1">
                     <p>STYLE: <span className="text-zinc-300">{writer.style}</span></p>
                     <p>STATUS: <span className="text-neon-green">ONLINE</span></p>
                  </div>
               </div>
            </CinematicContainer>
         ))}
      </div>

      <div className="flex justify-center pt-8">
         <Link href="/" className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all font-mono text-sm uppercase tracking-widest rounded-sm">
            Return to Newsroom
         </Link>
      </div>
    </div>
  );
}
