const fs = require('fs');

const editorialPath = 'c:/GMFG-Vercel/src/data/editorial.ts';
let content = fs.readFileSync(editorialPath, 'utf8');

// Scrub any weird trailing quotes inside the values
content = content.replace(/(\.png|'|\.webp|'|")['"](\s*[,}])/g, '$1$2');

// Actually, let's just do a clean fix:
content = content.replace(/"image":\s*"([^"]+)'"/g, '"image": "$1"');
content = content.replace(/"image":\s*"([^"]+)"'/g, '"image": "$1"');

fs.writeFileSync(editorialPath, content);
console.log('Cleaned up trailing quotes.');
