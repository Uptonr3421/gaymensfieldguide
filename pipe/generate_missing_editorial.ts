
import fs from 'fs';
import path from 'path';

// Mock the existing slugs to avoid duplication
// Read editorial.ts to get real existing slugs
import { EDITORIAL_FEED } from '../src/data/editorial';
const existingSlugs = EDITORIAL_FEED.map(article => article.slug);
console.log(`Found ${existingSlugs.length} existing articles.`);

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
        id: `GEN-${index + 200}`, // Safety buffer for IDs
        title: title,
        subtitle: subtitle,
        authorId: authors[Math.floor(Math.random() * authors.length)],
        tag: tags[Math.floor(Math.random() * tags.length)],
        readTime: `${Math.floor(Math.random() * 5) + 5} MIN`,
        variant: variants[Math.floor(Math.random() * variants.length)],
        slug: slug,
        date: '2025-08-15',
        image: '/images/blog/default-thumb.png',
        featured: false,
        gridArea: 'standard'
    });
});

if (newArticles.length > 0) {
    console.log(`📝 Generated ${newArticles.length} new entries.`);
    
    // Format as TS objects (not just JSON)
    // We want to avoid quotes on keys if possible, but JSON is valid JS.
    // However, let's try to match the style or just use JSON5-ish format.
    // Simple JSON stringify is fine for imports.
    
    const newEntriesString = newArticles.map(article => {
        return `  {
    id: '${article.id}',
    title: ${JSON.stringify(article.title)},
    subtitle: ${JSON.stringify(article.subtitle)},
    authorId: '${article.authorId}',
    tag: '${article.tag}',
    readTime: '${article.readTime}',
    variant: '${article.variant}',
    slug: '${article.slug}',
    date: '${article.date}',
    image: '${article.image}',
    gridArea: 'standard'
  }`;
    }).join(',\n');

    const editorialPath = path.join(process.cwd(), 'src/data/editorial.ts');
    let editorialContent = fs.readFileSync(editorialPath, 'utf8');
    
    // Find the end of the array
    const lastBracketIndex = editorialContent.lastIndexOf('];');
    
    if (lastBracketIndex !== -1) {
        const updatedContent = editorialContent.substring(0, lastBracketIndex) + 
                              ',\n' + newEntriesString + 
                              '\n];';
        fs.writeFileSync(editorialPath, updatedContent, 'utf8');
        console.log("✅ Appended to src/data/editorial.ts");
    } else {
        console.error("❌ Could not find closing bracket in editorial.ts");
    }
} else {
    console.log("No new articles found.");
}
