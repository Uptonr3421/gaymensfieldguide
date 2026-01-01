import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Brand & Manifest */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">
              GMFG
            </h2>
            <div className="font-mono text-sm text-zinc-300 space-y-2 leading-relaxed max-w-sm">
              <p>
                The definitive editorial for the post-code era. We engineer vibe.
              </p>
              <p>
                Built with Next.js 16, Tailwind, and local batch processing.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 text-sm font-mono uppercase tracking-widest">
             <div className="space-y-4">
                <h3 className="text-zinc-400 font-semibold">Navigation</h3>
                <ul className="space-y-2 text-zinc-200">
                   <li><Link href="/staff" className="hover:text-white transition-colors">Staff</Link></li>
                   <li><Link href="/manifesto" className="hover:text-white transition-colors">Manifesto</Link></li>
                   <li><Link href="/arsenal" className="hover:text-white transition-colors">Hardware</Link></li>
                </ul>
             </div>
             <div className="space-y-4">
                <h3 className="text-zinc-400 font-semibold">Legal</h3>
                <ul className="space-y-2 text-zinc-200">
                   <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
                   <li><span className="opacity-50 cursor-not-allowed" aria-label="Privacy policy coming soon">Privacy</span></li>
                   <li><span className="opacity-50 cursor-not-allowed" aria-label="Terms of service coming soon">Terms</span></li>
                </ul>
             </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-400">
           <div>
              &copy; 2025 GMFG. Open Source.
           </div>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              SYSTEM ACTIVE
           </div>
        </div>
      </div>
    </footer>
  );
}
