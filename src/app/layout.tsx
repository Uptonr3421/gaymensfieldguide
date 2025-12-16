import { Inter, JetBrains_Mono } from 'next/font/google';
import ImpactMeter from '../components/Antigravity/ImpactMeter';
import SkipLink from '../components/Antigravity/SkipLink';
import OrganizationSchema from '../components/Antigravity/OrganizationSchema';
import { ReadingProgress } from '../components/Antigravity/ReadingProgress';
import SickNav from '../components/SickNav';
import Footer from '../components/Footer';
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

import type { Metadata } from 'next';

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
      url: '/images/blog/moe-timeline.png',
      width: 1200,
      height: 630,
      alt: 'GMFG - The Vibe Coding Editorial',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GMFG // The Vibe Coding Editorial',
    description: 'The definitive editorial for the post-code era.',
    images: ['/images/blog/moe-timeline.png'],
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''} />
      </body>
    </html>
  );
}
