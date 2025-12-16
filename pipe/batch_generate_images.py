import asyncio
import os
import re
import json
import subprocess
import sys
from pathlib import Path

# Config
MDX_DIR = Path("src/app/blog/(content)")
IMAGE_DIR = Path("public/images/blog")

SEMAPHORE_LIMIT = 2

async def generate_image(prompt, filename, semaphore):
    async with semaphore:
        await asyncio.sleep(60) # Stagger requests to 1 per minute per agent, total 2/min
        print(f"🎨 Generating: {filename}...")
        cmd = ["node", "pipe/generate_image.js", prompt, str(IMAGE_DIR / filename)]
        
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await proc.communicate()
        
        if proc.returncode == 0:
            print(f"✅ Saved: {filename}")
            return True
        else:
            print(f"❌ Failed: {filename}")
            print(stderr.decode())
            return False

async def main():
    if not MDX_DIR.exists():
        print("MDX Directory not found.")
        return

    # Create the JS wrapper for Gemini API
    js_code = """
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.GOOGLE_GEMINI_API;
const baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
const model = 'models/gemini-2.5-flash-image-preview'; 

async function generate(prompt, outputPath) {
  if (!apiKey) { console.error('No API Key'); process.exit(1); }

  const postData = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }]
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = https.request(`${baseUrl}/${model}:generateContent?key=${apiKey}`, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        try {
            const response = JSON.parse(data);
            const base64Image = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            
            if (base64Image) {
                fs.writeFileSync(outputPath, Buffer.from(base64Image, 'base64'));
                console.log('Saved to ' + outputPath);
                process.exit(0);
            } else {
                const url = response.candidates?.[0]?.content?.parts?.[0]?.text;
                if (url && url.startsWith('http')) {
                     https.get(url, (imgRes) => {
                        const fileStream = fs.createWriteStream(outputPath);
                        imgRes.pipe(fileStream);
                        fileStream.on('finish', () => { fileStream.close(); process.exit(0); });
                    }).on('error', (e) => { console.error(e); process.exit(1); });
                } else {
                    console.error('No image data found in response');
                    console.error(JSON.stringify(response, null, 2));
                    process.exit(1);
                }
            }
        } catch (e) {
            console.error('Parse error', e);
            process.exit(1);
        }
      } else {
        console.error(`Status: ${res.statusCode}`);
        console.error(data);
        process.exit(1);
      }
    });
  });

  req.on('error', (e) => { console.error(e); process.exit(1); });
  req.write(postData);
  req.end();
}

const args = process.argv.slice(2);
generate(args[0], args[1]);
"""
    with open("pipe/vertex_fix.js", "w") as f:
        f.write(js_code)

    semaphore = asyncio.Semaphore(SEMAPHORE_LIMIT)
    tasks = []
    
    files = list(MDX_DIR.glob("*.mdx"))
    print(f"Found {len(files)} MDX files.")
    
    files_to_process = []
    
    for file_path in files:
        content = file_path.read_text(encoding='utf-8')
        
        placeholders = re.findall(r'\[IMAGE_PLACEHOLDER:\s*([A-Z0-9_]+)\]', content)
        existing_images = re.findall(r'<Image src="/images/blog/([^\"]+)" alt="([^\"]+)"', content)
        
        items_to_check = []
        for key in placeholders:
             filename = f"{key.lower().replace('_', '-')}.png"
             items_to_check.append((key, filename, 'placeholder'))
        
        for filename, key in existing_images:
             items_to_check.append((key, filename, 'image_tag'))

        if items_to_check:
            for key, filename, type in items_to_check:
                if (IMAGE_DIR / filename).exists():
                    continue
                
                prompt = f"{key.replace('_', ' ')}. Photorealistic, 8-bit Noir, Dark Industrial, Neon Yellow accents, Cinematic lighting. High detail."
                tasks.append(generate_image(prompt, filename, semaphore))
                if type == 'placeholder':
                    files_to_process.append((file_path, key, filename))

    if tasks:
        print(f"Queueing {len(tasks)} images...")
        results = await asyncio.gather(*tasks)
        
        print("Updating MDX files...")
        for file_path, key, filename in files_to_process:
            content = file_path.read_text(encoding='utf-8')
            replacement = f'<Image src="/images/blog/{filename}" alt="{key}" fill className="object-cover" />'
            content = content.replace(f'[IMAGE_PLACEHOLDER: {key}]', replacement)
            
            if "import Image" not in content:
                content = "import Image from 'next/image';\n" + content
                
            file_path.write_text(content, encoding='utf-8')
            
    else:
        print("No missing images found.")

    if os.path.exists("pipe/vertex_fix.js"):
        os.remove("pipe/vertex_fix.js")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    asyncio.run(main())