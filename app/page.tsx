export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-center text-white p-8">
      {/* Background Effect: Subtle pulsating gradient */}
      <div className="absolute inset-0 z-0 opacity-20 bg-gradient-to-br from-fuchsia-600/50 via-transparent to-cyan-600/50 animate-pulse" />

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400">
          GMFG
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Gay Men's Field Guide
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-10">
          Field Notes for the Digital Queer.
        </p>

        {/* The main "Coming Soon" message with a cool effect */}
        <p className="text-4xl md:text-6xl font-black uppercase tracking-widest text-white animate-bounce-slow">
          Coming Soon
        </p>

        <p className="mt-8 text-lg text-gray-400">
          We're building a new vibe: a coding website, blog, and store. Check back soon for the launch.
        </p>
      </div>
    </div>
  )
}
