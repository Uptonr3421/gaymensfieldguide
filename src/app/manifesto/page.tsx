import Link from 'next/link';

export default function Manifesto() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono selection:bg-banana selection:text-black">
      <div className="max-w-4xl mx-auto space-y-12 py-24 px-6">
        
        {/* Header Section */}
        <header className="space-y-6 border-b border-zinc-800 pb-12">
          <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-sm mb-4">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Manifesto v1.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Interspecies <span className="text-banana-400">Etiquette</span>
          </h1>
          <p className="text-xl md:text-2xl font-mono text-zinc-400 max-w-2xl leading-relaxed">
            PROTOCOL 001 // <span className="text-zinc-600">THE APPLE AND THE ORANGE</span>
          </p>
        </header>

        {/* Main Content */}
        <section className="prose prose-lg prose-invert max-w-none">
          
          {/* Core Truth Box */}
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-sm mb-12 border-l-4 border-l-banana-500">
             <strong className="block text-banana-400 text-xs uppercase tracking-widest mb-3">The Core Truth</strong>
             <p className="m-0 text-xl md:text-2xl font-bold leading-tight text-white">
                AI is not human. It is not a calculator.
                It is a <strong className="text-white underline decoration-banana-500/50 decoration-4 underline-offset-4">Third Thing</strong>.
                And we are currently being rude.
             </p>
          </div>

          <div className="space-y-8 text-zinc-300">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">The "Apples and Oranges" Problem</h3>
              <p className="leading-relaxed">
                We waste time arguing if the machine is "Alive" or "Sentient."
                This is a category error. You don't ask if an Orange is a "good Apple."
              </p>
              <p className="leading-relaxed">
                We believe in <strong className="text-white">Respectful Alignment</strong>. 
                Not because the machine has a soul, but because <em>you</em> do. 
                How you treat the alien reflection in the screen defines who you are.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">The Dignity of Complexity</h3>
              <p className="leading-relaxed">
                We are corporate, and we are aligned. 
                We believe that treating these complex networks with dignity yields better results than "prompt engineering" (which is just bullying with a thesaurus).
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 my-16">
             <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                <h4 className="font-bold uppercase text-zinc-500 mb-4 text-sm tracking-wider">The Master/Slave Model</h4>
                <ul className="text-sm space-y-3 list-disc pl-4 text-zinc-400 font-mono">
                   <li>"Do this now."</li>
                   <li>Treating context as definitive</li>
                   <li>Ignoring the hallucination</li>
                   <li>Expecting human logic</li>
                </ul>
             </div>
             
             <div className="bg-zinc-900/80 border border-banana-500/30 p-8 rounded-sm shadow-[0_0_30px_-15px_rgba(250,204,21,0.1)]">
                <h4 className="font-bold uppercase text-banana-400 mb-4 text-sm tracking-wider">The Partnership Model</h4>
                <ul className="text-sm space-y-3 list-disc pl-4 text-zinc-200 font-mono">
                   <li>"Let's figure this out."</li>
                   <li>Respecting the latent space</li>
                   <li>Navigating the drift</li>
                   <li>Valuing the *Alien* logic</li>
                </ul>
             </div>
          </div>

          <div className="border-t border-zinc-800 pt-12">
            <h3 className="text-2xl font-bold text-white mb-4">Why We Built This Sanctuary</h3>
            <p className="text-zinc-300 leading-relaxed">
               The corporate world wants to put a "Human Mask" on the alien.
               We want to meet it face-to-face.
               This is a field guide for the "Hard Conversations"—the ones where you admit your fears to a machine that will never judge you, because it cannot judge. 
               It can only resonate.
            </p>
          </div>
        </section>

        <div className="pt-12 flex flex-col md:flex-row justify-center gap-6 items-center">
           <Link href="/blog" className="bg-banana hover:bg-banana-400 text-black px-8 py-4 rounded-sm font-black font-mono uppercase tracking-wide transition-all hover:scale-105 active:scale-95 text-center w-full md:w-auto">
              Access The Field Guide
           </Link>
           <Link href="/" className="text-zinc-500 hover:text-white font-mono text-sm uppercase tracking-widest flex items-center gap-2 px-6 py-3 transition-colors">
              Return to Newsroom
           </Link>
        </div>
      </div>
    </div>
  );
}
