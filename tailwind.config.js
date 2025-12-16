/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        banana: {
          100: '#FEF9C3', 
          DEFAULT: '#FACC15', // Core Nano Banana
          600: '#CA8A04',
        },
        // Neon Accents for 8-Bit Mode
        neon: {
          yellow: '#FACC15',
          blue: '#3B82F6',
          red: '#EF4444',
          green: '#22C55E',
          lime: '#84CC16', // Added for selection highlight
          purple: '#A855F7', // Neon purple for AI reveals
        },
        industrial: {
          DEFAULT: '#4B5563', 
          800: '#1F2937', 
          900: '#111827', // Deep Background
          950: '#030712', // Near Black
        },
        paper: {
           DEFAULT: '#F5F5F4', 
           dark: '#1c1917', 
        }
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'], 
      },
      backgroundImage: {
        'scanlines': "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
        'scanlines-container': "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite',
        'crt-flicker': 'crt-flicker 0.15s ease-in-out infinite alternate',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'crt-flicker': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}
