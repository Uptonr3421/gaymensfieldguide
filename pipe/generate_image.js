const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.GOOGLE_GEMINI_API;
const baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
const model = 'models/gemini-2.5-flash-image-preview'; 

async function generate(prompt, outputPath) {
  if (!apiKey) { console.error('No API Key found. Please set GOOGLE_GEMINI_API in your .env.local file.'); process.exit(1); }

  const postData = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
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
            
            // Try to get base64 data first
            const base64Image = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            
            if (base64Image) {
                fs.writeFileSync(outputPath, Buffer.from(base64Image, 'base64'));
                console.log(`✅ Image saved to: ${outputPath}`);
                process.exit(0);
            } else {
                // If base64 data is not found, try to get a URL
                const url = response.candidates?.[0]?.content?.parts?.[0]?.text;
                if (url && url.startsWith('http')) {
                    console.log(`Downloading image from URL: ${url}`);
                     https.get(url, (imgRes) => {
                        const fileStream = fs.createWriteStream(outputPath);
                        imgRes.pipe(fileStream);
                        fileStream.on('finish', () => { fileStream.close(); console.log(`✅ Image downloaded and saved to: ${outputPath}`); process.exit(0); });
                    }).on('error', (e) => { console.error(`❌ Error downloading image from URL: ${e.message}`); process.exit(1); });
                } else {
                    console.error('❌ No image data or URL found in API response.');
                    console.error('API Response:', JSON.stringify(response, null, 2));
                    process.exit(1);
                }
            }
        } catch (e) {
            console.error('❌ Error parsing API response:', e);
            process.exit(1);
        }
      } else {
        console.error(`❌ API request failed with status: ${res.statusCode}`);
        console.error('Response body:', data);
        process.exit(1);
      }
    });
  });

  req.on('error', (e) => { console.error(`❌ Request error: ${e.message}`); process.exit(1); });
  req.write(postData);
  req.end();
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node generate_image.js <prompt> <output_path>');
    process.exit(1);
}
generate(args[0], args[1]);