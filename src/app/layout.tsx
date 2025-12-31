import { Inter, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import SkipLink from '../components/Antigravity/SkipLink';
import OrganizationSchema from '../components/Antigravity/OrganizationSchema';
import SickNav from '../components/SickNav';
import Footer from '../components/Footer';
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

import type { Metadata } from 'next';

// Dynamically import client-only components
const ImpactMeter = dynamic(() => import('../components/Antigravity/ImpactMeter'), { 
  ssr: false 
});
const ReadingProgress = dynamic(() => import('../components/Antigravity/ReadingProgress').then(mod => ({ default: mod.ReadingProgress })), { 
  ssr: false 
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gaymensfieldguide.com'),
  title: {
    template: '%s | GMFG',
    default: 'GMFG: The Vibe Coding Editorial',
  },
  description: 'The definitive editorial for the post-code era. We engineer vibe. Featuring the latest on GPT-5.2 "Garlic" and the Mixture of Experts.',
  keywords: ['Vibe Coding', 'AI', 'GPT-5.2', 'Garlic', 'Mixture of Experts', 'Nano Banana', 'Gay Mens Field Guide', 'Local LLM', 'Privacy', 'Tech Editorial'],
  authors: [{ name: 'GMFG Editorial', url: 'https://gaymensfieldguide.com' }],
  creator: 'GMFG',
  publisher: 'Gay Mens Field Guide',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'GMFG // Antigravity',
    description: 'We don\'t "prompt." We engineer vibe. The definitive editorial for the post-code era.',
    url: 'https://gaymensfieldguide.com',
    siteName: 'Gay Mens Field Guide',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: '/images/blog/moe-timeline.webp',
      width: 1200,
      height: 630,
      alt: 'GMFG - The Vibe Coding Editorial',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GMFG // The Vibe Coding Editorial',
    description: 'The definitive editorial for the post-code era.',
    images: ['/images/blog/moe-timeline.webp'],
  },
  verification: {
    google: 'google1cd91746b71a2414',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`antialiased scroll-smooth dark ${inter.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="theme-color" content="#FACC15" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen font-sans bg-paper dark:bg-paper-dark text-industrial-900 dark:text-industrial-50 bg-noise selection:bg-banana selection:text-black">
        <SkipLink />
        <SickNav />
        <main id="main-content" className="pt-24">
           {children}
        </main>
        <ImpactMeter />
        <ReadingProgress />
        <OrganizationSchema />
        <Analytics />
        <GoogleAnalytics gaId="G-QMLM24T4QK" />
      </body>
    </html>
  );
}
