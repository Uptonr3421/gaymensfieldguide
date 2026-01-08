const fs = require('fs');
const path = require('path');

const mdxDir = 'c:/GMFG-Vercel/src/app/blog/(content)';
const editorialPath = 'c:/GMFG-Vercel/src/data/editorial.ts';

// 1. Collect all images from MDX files
const mdxImages = {};
const mdxFiles = fs.readdirSync(mdxDir).filter(f => f.endsWith('.mdx'));

console.log(`Analyzing ${mdxFiles.length} MDX files...`);

mdxFiles.forEach(file => {
    const slug = file.replace('.mdx', '');
    const content = fs.readFileSync(path.join(mdxDir, file), 'utf8');
    
    // Pattern 1: openGraph: { images: ['...'] }
    const ogMatch = content.match(/images:\s*\[\s*'([^']+)'/);
    if (ogMatch) {
        mdxImages[slug] = ogMatch[1];
    }
    
    // Pattern 2: SchemaBuilder image: "..."
    if (!mdxImages[slug]) {
        const schemaMatch = content.match(/image:\s*"([^"]+)"/);
        if (schemaMatch) {
            mdxImages[slug] = schemaMatch[1];
        }
    }

    // Pattern 3: <Image src="..."
    if (!mdxImages[slug]) {
        const imgMatch = content.match(/<Image\s+src="([^"]+)"/);
        if (imgMatch) {
            mdxImages[slug] = imgMatch[1];
        }
    }
});

console.log('Images found in MDX:', mdxImages);

// 2. Read existing editorial.ts
let editorialContent = fs.readFileSync(editorialPath, 'utf8');

// 3. Update paths in editorial.ts
// We'll iterate through all slugs we found and update the corresponding image: '...' line
Object.keys(mdxImages).forEach(slug => {
    const realImage = mdxImages[slug];
    
    // We need to find the block with this slug and change its image field
    // This regex looks for the slug and then the image field before the next close brace
    const regex = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?image:\\s*')[^']+(')`, 'g');
    
    // Also try with double quotes just in case
    const regexDouble = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');

    if (regex.test(editorialContent)) {
        editorialContent = editorialContent.replace(regex, `$1${realImage}$2`);
    } else if (regexDouble.test(editorialContent)) {
        editorialContent = editorialContent.replace(regexDouble, `$1${realImage}$2`);
    }
});

// 4. Special cases for articles that might not have MDX yet or have different slugs
// but show "X" in the UI. I will map them to known-good assets.
const manualFixes = {
    'openai-gpt-5-2-garlic': '/images/blog/openai-gpt-garlic-hero.png',
    'the-dead-internet-theory-are-we-alone': '/images/blog/dead-internet-theory-hero.png',
    'macos-the-walled-garden-is-comfy': '/images/blog/glitched-art-dog-cat.png',
    'trackballs-the-ergonomic-endgame': '/images/blog/trackball-ergonomic-hero.png',
    'windows-12-spyware-edition': '/images/blog/windows12-spyware-hero.png',
    'vibe-coder-rise-hero': '/images/blog/vibe-coder-rise-hero.png'
};

Object.keys(manualFixes).forEach(slug => {
    const regex = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?image:\\s*')[^']+(')`, 'g');
    const regexDouble = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
    
    if (regex.test(editorialContent)) {
        editorialContent = editorialContent.replace(regex, `$1${manualFixes[slug]}$2`);
    } else if (regexDouble.test(editorialContent)) {
        editorialContent = editorialContent.replace(regexDouble, `$1${manualFixes[slug]}$2`);
    }
});

fs.writeFileSync(editorialPath, editorialContent);
console.log('Successfully restored image paths from MDX and manual overrides.');
