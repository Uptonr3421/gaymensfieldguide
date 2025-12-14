import Link from 'next/link';
import { Suspense } from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-6 w-6 bg-zinc-900 dark:bg-white rounded-sm" />
            <span className="font-mono font-bold text-zinc-900 dark:text-white text-sm uppercase tracking-wider">
              GMFG
            </span>
          </Link>
          
          <div className="hidden md:flex h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-2" />
          
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/manifesto" label="Manifesto" />
            {/* <NavLink href="/arsenal" label="Hardware" /> */}

            <NavLink href="/blog" label="Blog" />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-zinc-900 text-white dark:bg-white dark:text-black px-3 py-1.5 text-xs font-mono font-bold uppercase hover:opacity-80 transition-opacity">
            Connect
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href} 
      className="text-xs font-mono uppercase tracking-wide text-industrial-600 dark:text-industrial-400 hover:text-banana-600 dark:hover:text-banana-300 transition-colors"
    >
      {label}
    </Link>
  );
}
