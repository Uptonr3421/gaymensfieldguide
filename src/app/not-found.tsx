import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Signal Lost | GMFG',
  description: 'The page you are looking for has drifted into the void.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-950">
      <div className="text-center px-6 max-w-2xl">
        
        {/* Glitch Effect Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-red-500/30 rounded-full">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400">
            SIGNAL_LOST
          </span>
        </div>

        {/* 404 Display */}
        <h1 className="text-[8rem] md:text-[12rem] font-black tracking-tighter leading-none mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-600 via-zinc-400 to-zinc-700">
            404
          </span>
        </h1>

        {/* Message */}
        <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-8 leading-relaxed">
          The page you seek has <span className="text-red-400">drifted into the void</span>.
          <br className="hidden md:block" />
          Perhaps it never existed. Perhaps it was a hallucination.
        </p>

        {/* Terminal-style info */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 mb-8 text-left font-mono text-sm">
          <p className="text-zinc-500 mb-2">$ locate requested_page</p>
          <p className="text-red-400 mb-2">ERROR: Resource not found in latent space</p>
          <p className="text-zinc-500 mb-2">$ suggest --alternatives</p>
          <p className="text-zinc-300">→ /blog, /manifesto, /arsenal, /staff</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold uppercase tracking-wide text-sm hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all"
          >
            Return to Base
          </Link>
          <Link 
            href="/blog" 
            className="px-8 py-4 bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold uppercase tracking-wide text-sm hover:border-zinc-500 hover:text-white transition-all"
          >
            Browse Archive
          </Link>
        </div>

      </div>
    </div>
  );
}
