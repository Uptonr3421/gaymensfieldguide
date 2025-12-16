
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image from 'next/image';

// Antigravity Components (Explicit imports to avoid Next.js 16 build proxy error)
import { InteractiveContainer } from '@/components/Antigravity/InteractiveContainer';
import { TechHead2Head } from '@/components/Antigravity/TechHead2Head';
import ConflictBento from '@/components/Antigravity/ConflictBento';
import { VibeBento, BentoItem } from '@/components/Antigravity/VibeBento';
import Breadcrumbs from '@/components/Antigravity/Breadcrumbs';
import FAQSchema from '@/components/Antigravity/FAQSchema';
import { SchemaBuilder } from '@/components/Antigravity/SchemaBuilder';
import { QuizEngine } from '@/components/Antigravity/QuizEngine';
import { SimulatorEngine } from '@/components/Antigravity/SimulatorEngine';
import { TuringTest } from '@/components/Antigravity/TuringTest';
import { ResourceBalancer } from '@/components/Antigravity/ResourceBalancer';
import { SaaSCalculator } from '@/components/Antigravity/SaaSCalculator';
import { UnsubscribeMaze } from '@/components/Antigravity/UnsubscribeMaze';
import { StackBuilder } from '@/components/Antigravity/StackBuilder';
import { LatencySimulator } from '@/components/Antigravity/LatencySimulator';
import { IoTScanner } from '@/components/Antigravity/IoTScanner';
import { Callout } from '@/components/Antigravity/Callout';
import { VibeSnake } from '@/components/Antigravity/VibeSnake';
import { PromptTyper } from '@/components/Antigravity/PromptTyper';
import { ContextCollapse } from '@/components/Antigravity/ContextCollapse';
import { TableOfContents } from '@/components/Antigravity/TableOfContents';

const COMPONENTS = {
  Image,
  InteractiveContainer,
  TechHead2Head,
  ConflictBento,
  VibeBento,
  BentoItem,
  Breadcrumbs,
  FAQSchema,
  SchemaBuilder,
  QuizEngine,
  SimulatorEngine,
  TuringTest,
  ResourceBalancer,
  SaaSCalculator,
  UnsubscribeMaze,
  StackBuilder,
  LatencySimulator,
  IoTScanner,
  Callout,
  VibeSnake,
  PromptTyper,
  ContextCollapse,
  TableOfContents,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/app/blog/(content)');
  if (!fs.existsSync(contentDir)) return [];
  
  const files = fs.readdirSync(contentDir);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    
    // Quick title generation
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + " | GMFG";
    
    return { 
        title,
        description: `Deep dive into ${slug}. Vibe coding analysis.`
    };
}

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params; // Await params for Next.js 15+ compat
  const { slug } = resolvedParams;
  const filePath = path.join(process.cwd(), 'src/app/blog/(content)', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, 'utf8');

  // Compile MDX
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source,
    components: COMPONENTS,
    options: { parseFrontmatter: true }
  });

  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-neon-yellow selection:text-black">
        {/* Progress Bar or Nav could go here */}
        
        <div className="prose prose-invert prose-zinc max-w-3xl mx-auto py-24 px-6 md:px-0">
            <header className="mb-12 border-b border-zinc-800 pb-8">
                <span className="text-neon-yellow font-mono text-xs tracking-widest uppercase mb-4 block">
                    TRANSMISSION_ID: {slug.toUpperCase()}
                </span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-none">
                    {frontmatter.title || slug.replace(/-/g, ' ').toUpperCase()}
                </h1>
                <div className="flex items-center gap-4 text-zinc-500 font-mono text-xs">
                    <span>DATE: 2025-10-XX</span>
                    <span>//</span>
                    <span>AUTHOR: ARCHITECT</span>
                </div>
            </header>
            
            {/* Main Content */}
            <div className="data-article-content">
                {content}
            </div>

            {/* Footer / Read Next could go here */}
        </div>
    </article>
  );
}
