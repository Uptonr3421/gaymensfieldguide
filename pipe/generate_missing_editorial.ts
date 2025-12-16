
import fs from 'fs';
import path from 'path';

// Mock the existing slugs to avoid duplication
const existingSlugs = [
  'openai-gpt-5-2-garlic', 'dead-internet-theory', 'smart-fridge-scam', 
  'god-tier-local-llm-rig', 'rabbit-r1-e-waste', 'nightshade-data-poisoning', 
  'browser-fingerprinting-2025', 'flipper-zero-agents', 'apocalyspenet-meshtastic', 
  'building-jarvis-local', 'cursor-vs-windsurf', 'dark-patterns-2025', 
  'digital-hoarding-nas', 'hivemapper-depin-casino', 'mac-studio-paperweight', 
  'post-saas-era', 'prompt-injection-101', 'raspberry-pi-ai-cluster', 
  'sleeping-giants-opensource', 'solarpunk-2025', 
  'the-future-of-vibe-coding-and-15-evergreen-trends', 'uncanny-valley-voice'
];

const authors = ['architect', 'scout', 'mirror'];
const variants = ['holo', 'voltage', 'obsidian'];
const tags = ['TECH', 'VIBE', 'HARDWARE', 'SOFTWARE', 'FUTURE', 'DYSTOPIA', 'AI'];

const contentDir = path.join(process.cwd(), 'src/app/blog/(content)');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

const newArticles = [];

files.forEach((file, index) => {
    const slug = file.replace('.mdx', '');
    if (existingSlugs.includes(slug)) return;

    const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
    
    // Simple frontmatter extraction
    const titleMatch = content.match(/title:\s*['"]?(.*?)['"]?$/m);
    const subtitleMatch = content.match(/excerpt:\s*['"]?(.*?)['"]?$/m) || content.match(/description:\s*['"]?(.*?)['"]?$/m);
    
    const title = titleMatch ? titleMatch[1] : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const subtitle = subtitleMatch ? subtitleMatch[1] : 'Automated transmission from the field.';
    
    newArticles.push({
        id: `GEN-${index + 100}`,
        title: title,
        subtitle: subtitle,
        authorId: authors[Math.floor(Math.random() * authors.length)],
        tag: tags[Math.floor(Math.random() * tags.length)],
        readTime: `${Math.floor(Math.random() * 5) + 5} MIN`,
        variant: variants[Math.floor(Math.random() * variants.length)],
        slug: slug,
        date: '2025-08-15', // Backdated slightly
        image: '/images/blog/default-thumb.png'
    });
});

console.log(JSON.stringify(newArticles, null, 2));
