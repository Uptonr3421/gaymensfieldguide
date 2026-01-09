const fs = require('fs');
const path = require('path');

const editorialPath = 'c:/GMFG-Vercel/src/data/editorial.ts';
const blogDir = 'c:/GMFG-Vercel/public/images/blog';
const aiDir = 'c:/GMFG-Vercel/public/images/ai-memory';

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

let editorialContent = fs.readFileSync(editorialPath, 'utf8');

// Match slugs - more flexible for quotes
const slugRegex = /"slug":\s*"([^"]+)"|'slug':\s*'([^']+)'|slug:\s*'([^']+)'|slug:\s*"([^"]+)"/g;
let match;
const foundSlugs = [];
while ((match = slugRegex.exec(editorialContent)) !== null) {
    foundSlugs.push(match[1] || match[2] || match[3] || match[4]);
}

console.log(`Found ${foundSlugs.length} slugs to process.`);

foundSlugs.forEach(slug => {
    let found = bestFiles[slug] || bestFiles[slug.replace(/-/g, '_')] || bestFiles[slug + '-hero'] || bestFiles[slug + '-thumb'] || bestFiles[slug.replace('-2025', '')];
    
    if (!found) {
        const parts = slug.split('-');
        for (let part of parts) {
            if (part.length < 3 || ['the', 'and', 'for', 'with', 'was', 'era', 'are', 'not', 'can'].includes(part.toLowerCase())) continue;
            found = Object.values(bestFiles).find(f => f.name.toLowerCase().includes(part.toLowerCase()) && f.size > 10000);
            if (found) break;
        }
    }

    if (found && found.size > 10000) {
        const imagePath = found.dir + found.name;
        console.log(`Mapping ${slug} -> ${imagePath} (${found.size} bytes)`);
        
        // Flexible replacement for both "image": and image:
        const replaceRegex = new RegExp(`(("slug"|slug):\\s*["']${slug}["'][\\s\\S]*?("image"|image):\\s*["'])[^"']+([^"']*)`, 'g');
        editorialContent = editorialContent.replace(replaceRegex, (match, p1) => {
            return p1 + imagePath + (match.endsWith('"') ? '"' : "'");
        });
    } else {
        console.log(`UNABLE TO FIND REAL IMAGE FOR: ${slug}`);
    }
});

fs.writeFileSync(editorialPath, editorialContent);
console.log('Search and Rescue complete.');
