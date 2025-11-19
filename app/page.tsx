import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Home - Vibecoding, Creative Coding & Developer Lifestyle",
  description: "Vibecoding meets culture: Creative coding tutorials, tech insights, and developer lifestyle. Shop unique dev merch and join the Cleveland coding community.",
}

export default function Home() {
  return (
    <>
      {/* Hero Section with Stunning Visual Effects */}
      <section className="relative -mx-4 -mt-10 mb-16 overflow-hidden rounded-3xl" aria-labelledby="hero-heading">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-cyan-600 opacity-90 animate-gradient-shift" />
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
          <div className="particle particle-4" />
          <div className="particle particle-5" />
        </div>

        {/* Hero Image with Overlay */}
        <div 
          className="relative h-[600px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-splash.jpg')" }}
          role="img"
          aria-label="Vibecoding hero banner with colorful gradient design"
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
          
          {/* Hero Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p 
              className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300 animate-fade-in-down"
              aria-label="Site tagline"
            >
              {siteConfig.hero.kicker}
            </p>
            
            <h1 
              id="hero-heading"
              className="mb-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up"
            >
              <span className="bg-gradient-to-r from-fuchsia-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent animate-gradient-text">
                {siteConfig.hero.headline}
              </span>
            </h1>
            
            <p 
              className="mb-10 max-w-2xl text-lg text-slate-200 sm:text-xl md:text-2xl animate-fade-in"
            >
              {siteConfig.hero.subheading}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up-delayed">
              <Link
                href="/posts"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-fuchsia-300"
                aria-label="Explore coding articles and tutorials"
              >
                <span className="relative z-10">Explore Articles</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              
              <Link
                href="/shop"
                className="rounded-full border-2 border-white/80 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 hover:border-white focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label="Shop developer merchandise"
              >
                Shop Merch
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg 
              className="h-6 w-6 text-white/80" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-16 grid gap-6 sm:grid-cols-3" aria-label="Site statistics">
        <div className="group rounded-2xl border border-slate-200/60 bg-white/50 p-6 text-center backdrop-blur transition-all hover:scale-105 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50">
          <div className="mb-2 text-4xl font-bold text-fuchsia-600 dark:text-fuchsia-400">96+</div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Posts Archived</div>
        </div>
        
        <div className="group rounded-2xl border border-slate-200/60 bg-white/50 p-6 text-center backdrop-blur transition-all hover:scale-105 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50">
          <div className="mb-2 text-4xl font-bold text-cyan-600 dark:text-cyan-400">10</div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Editorial Beats</div>
        </div>
        
        <div className="group rounded-2xl border border-slate-200/60 bg-white/50 p-6 text-center backdrop-blur transition-all hover:scale-105 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50">
          <div className="mb-2 text-4xl font-bold text-purple-600 dark:text-purple-400">3</div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Languages</div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="mb-16" aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
          What We Cover
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-fuchsia-50 to-purple-50 p-6 transition-all hover:scale-105 hover:shadow-xl dark:from-fuchsia-950/20 dark:to-purple-950/20 dark:border-white/10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500 text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Vibecoding Tutorials</h3>
            <p className="text-slate-600 dark:text-slate-400">Creative coding guides, modern web development, and Next.js deep dives.</p>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 transition-all hover:scale-105 hover:shadow-xl dark:from-cyan-950/20 dark:to-blue-950/20 dark:border-white/10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Tech Culture</h3>
            <p className="text-slate-600 dark:text-slate-400">Insights on developer culture, tech trends, and the future of coding.</p>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-purple-50 to-pink-50 p-6 transition-all hover:scale-105 hover:shadow-xl dark:from-purple-950/20 dark:to-pink-950/20 dark:border-white/10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Developer Wellness</h3>
            <p className="text-slate-600 dark:text-slate-400">Work-life balance, mental health, and thriving as a creative developer.</p>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 p-12 text-center text-white"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 bg-[url('/images/hero-splash.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10">
          <h2 id="cta-heading" className="mb-4 text-3xl font-bold sm:text-4xl">
            Join the Vibecoding Community
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Get the latest tutorials, insights, and exclusive merch drops.
          </p>
          <Link
            href="/about"
            className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-fuchsia-600 transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Learn more about our community"
          >
            Learn More About Us
          </Link>
        </div>
      </section>
    </>
  )
}
