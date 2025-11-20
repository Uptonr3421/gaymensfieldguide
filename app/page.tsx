import type { Metadata } from "next"
import Link from "next/link"
import { NeonAnimation } from "@/components/NeonAnimation"

export const metadata: Metadata = {
  title: "Gay Men's Field Guide - Coming Soon",
  description: "Gay Men's Field Guide is coming soon. In the meantime, discover Bespoke Ethos - Cleveland small business AI consulting built with the vibe.",
}

export default function Home() {
  return (
    <>
      {/* Full-Screen Animated Background */}
      <section className="relative w-full h-screen overflow-hidden bg-black" aria-labelledby="hero-heading">
        {/* Neon Animation Background */}
        <NeonAnimation />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
          {/* Main Content */}
          <div className="text-center max-w-2xl">
            {/* Status Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white/80">Site Under Development</span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="mb-6 text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight"
            >
              Gay Men&apos;s Field Guide
            </h1>

            {/* Subheading */}
            <p className="mb-12 text-lg sm:text-xl text-white/70 leading-relaxed">
              We&apos;re crafting something extraordinary. While we prepare the ultimate resource for gay men&apos;s culture, tech, and wellness, discover how we&apos;re helping small businesses thrive.
            </p>

            {/* CTA Button - Bespoke Ethos */}
            <Link
              href="https://bespokeethos.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex flex-col items-center gap-4 mb-8"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                
                {/* Button */}
                <div className="relative bg-black border border-white/30 rounded-2xl px-8 py-6 backdrop-blur-sm hover:border-white/60 transition-all group-hover:shadow-2xl">
                  <div className="text-sm font-semibold text-cyan-400 mb-1">Explore Now</div>
                  <div className="text-2xl font-bold text-white">Bespoke Ethos</div>
                  <div className="text-sm text-white/70 mt-2">Cleveland Small Business AI Consulting</div>
                  <div className="text-xs text-white/50 mt-1">Built with the Vibe</div>
                </div>
              </div>
            </Link>

            {/* Secondary Text */}
            <p className="text-sm text-white/50 max-w-md mx-auto">
              Discover how AI automation can transform your Cleveland business. From workflow optimization to strategic growth, we&apos;re here to help.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="h-6 w-6 text-white/40"
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
    </>
  )
}
