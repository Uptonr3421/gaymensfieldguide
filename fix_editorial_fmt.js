const fs = require('fs');
const editorialPath = 'c:/GMFG-Vercel/src/data/editorial.ts';
let content = fs.readFileSync(editorialPath, 'utf8');

// The articles are objects like { ... "image": "/path/..." }
// Let's find any "image": "something" (missing closing quote or with weird trailing characters)
// and replace it with "image": "/path/..."

content = content.replace(/"image":\s*["']([^"']+)["']?\s*,?/g, (match, path) => {
    // Trim any trailing single quotes that might have slipped in
    const cleanPath = path.replace(/'$/, '');
    return `"image": "${cleanPath}"`;
});

fs.writeFileSync(editorialPath, content);
console.log('Fixed all image field formatting.');
