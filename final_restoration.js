const fs = require('fs');
const path = require('path');

const jsonPath = 'c:/GMFG-Vercel/new_editorial.json';
const tsPath = 'c:/GMFG-Vercel/src/data/editorial.ts';
const blogDir = 'c:/GMFG-Vercel/public/images/blog';
const aiDir = 'c:/GMFG-Vercel/public/images/ai-memory';

const articles = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Get all files for mapping
const allFiles = [
    ...fs.readdirSync(blogDir).map(f => ({ name: f, dir: '/images/blog/', full: path.join(blogDir, f), size: fs.statSync(path.join(blogDir, f)).size })),
    ...fs.readdirSync(aiDir).map(f => ({ name: f, dir: '/images/ai-memory/', full: path.join(aiDir, f), size: fs.statSync(path.join(aiDir, f)).size }))
];

const fileMap = {};
allFiles.forEach(f => {
    const base = path.parse(f.name).name;
    if (!fileMap[base]) fileMap[base] = [];
    fileMap[base].push(f);
});

const bestFiles = {};
Object.keys(fileMap).forEach(base => {
    bestFiles[base] = fileMap[base].sort((a, b) => b.size - a.size)[0];
});

const finalArticles = articles.map(a => {
    const slug = a.slug;
    let found = bestFiles[slug] || bestFiles[slug.replace(/-/g, '_')] || bestFiles[slug + '-hero'] || bestFiles[slug + '-thumb'] || bestFiles[slug.replace('-2025', '')];
    
    if (!found) {
        const parts = slug.split('-');
        for (let part of parts) {
            if (part.length < 3 || ['the', 'and', 'for', 'with', 'was', 'era', 'are', 'not', 'can'].includes(part.toLowerCase())) continue;
            found = Object.values(bestFiles).find(f => f.name.toLowerCase().includes(part.toLowerCase()) && f.size > 10000);
            if (found) break;
        }
    }

    // Clean up title/subtitle
    const cleanup = (str) => {
        if (!str) return '';
        return str
            .replace(/ \| GMFG.*$/, '')
            .replace(/: The Nano Banana Perspective.*$/, '')
            .replace(/\\".*$/, '')
            .replace(/"/g, '')
            .replace(/,$/, '')
            .trim();
    };

    return {
        ...a,
        title: cleanup(a.title),
        subtitle: cleanup(a.subtitle),
        image: found ? (found.dir + found.name) : '/images/blog/default-thumb.png'
    };
});

// Ensure Garlic is in there (it has a special ID in the original)
if (!finalArticles.find(a => a.id === '000-GARLIC')) {
    finalArticles.push({
        id: '000-GARLIC',
        title: 'OpenAI Announced GPT-5.2 (Garlic)',
        subtitle: 'Internal codename "Garlic". It remembers more, works smarter, and uses a whole team of experts.',
        authorId: 'architect',
        tag: 'COVER_STORY',
        readTime: '15 MIN',
        variant: 'voltage',
        slug: 'openai-gpt-5-2-garlic',
        date: '2025-10-15',
        image: '/images/blog/openai-gpt-garlic-hero.png',
        featured: true,
        gridArea: 'large'
    });
}

// Reorder so newest are first
finalArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

const tsContent = `export interface Article {
  id: string;
  title: string;
  subtitle: string;
  authorId: 'architect' | 'scout' | 'mirror';
  tag: string;
  readTime: string;
  variant: 'holo' | 'voltage' | 'obsidian';
  featured?: boolean;
  gridArea?: 'large' | 'tall' | 'wide' | 'standard'; 
  slug: string;
  date: string;
  image: string;
}

export type BlogPost = Article;

export const EDITORIAL_FEED: Article[] = ${JSON.stringify(finalArticles, null, 2)};
`;

fs.writeFileSync(tsPath, tsContent);
console.log('Final restoration complete. All articles should have real images now.');
