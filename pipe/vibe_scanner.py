import sys
# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

import asyncio
import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env.local'))

# Configure Gemini
API_KEY = os.getenv("GOOGLE_GEMINI_API") or os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    print("❌ ERROR: No GOOGLE_GEMINI_API or GOOGLE_API_KEY found in .env.local")
    sys.exit(1)

print(f"✅ Vibe Scanner: Authenticated with verified billing key (Length: {len(API_KEY)})")
print("✅ Quota Mode: High-Volume (Billing-Backed)")

# Note: Using the new Google Gen AI SDK
client = genai.Client(api_key=API_KEY)

# Placeholder for genai-processors (simulating the structure for now as we set up)
# In a real implementation, we would import processors here.

async def scan_vibe(target_topic):
    print(f"🍌 NANO BANANA VIBE SCANNER INITIALIZED")
    print(f"📡 Target: {target_topic}")
    
    # Simulating the "Industrial Pipe" process
    print("⚙️  Spinning up genai-processors...")
    
    prompt = f"""
    You are the "Vibe Coder" Editor (Gemini 3 Pro Persona).
    
    TASK: Write a COVER ARTICLE about: '{target_topic}'
    CONTEXT: Search for high quality, real-world info on this topic. 
    
    TONE: Undeniably good, infused with reality, real voice, fun, "Nano Banana" aesthetic.
    
    REQUIRED SECTIONS:
    1. HEADLINE (H1): '{target_topic}' (or a punchy variation)
    2. THE SCOOP (H2): What is actually happening? Real facts.
    3. THE VIBE (H2): Why should we care? Cultural impact.
    4. KEY INSIGHT (Callout): A specific technical or cultural detail that proves you know your stuff.
    5. THE VERDICT (H2): Strategic advice. Buy/Sell/Build/Delete?
    
    NOTE: This is a context-aware Gemini Pro 3 voice.
    OUTPUT FORMAT: PURE MDX (No conversational filler before/after).
    Do not use ```mdx``` code blocks. Just output the content.
    """
    
    try:
        # Check available models (debugging)
        # for m in client.models.list():
        #    print(m.name)

        response = client.models.generate_content(
            model='gemini-2.0-flash-exp', # Upgrade to 2.0 Flash for Search Grounding if available, or fallback to 1.5-pro
            contents=prompt,
            config={
                'tools': [{'google_search': {}}] # ENABLE GROUNDING
            }
        )
        
        content = response.text
        
        # CLEANUP LOGIC
        # 1. Strip ```mdx and ``` blocks
        content = content.replace("```mdx", "").replace("```markdown", "").replace("```", "")
        
        # 2. Strip conversational preambles (heuristic)
        # Find the first H1 or H2
        lines = content.split('\n')
        clean_lines = []
        started = False
        for line in lines:
            if line.strip().startswith('#'):
                started = True
            if started:
                clean_lines.append(line)
                
        if started:
            content = '\n'.join(clean_lines)
        else:
            # Fallback if no headers found, just use the stripped content
            pass 
        
        # Save to file
        
        # Save to file
        # Slugify the topic
        slug = target_topic.lower().replace(" ", "-").replace(":", "").replace("?", "").replace(".", "").replace(",", "")
        filename = f"src/app/blog/(content)/{slug}.mdx"
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
            
        print(f"✅ Vibe Scan Complete. Artifact saved to: {filename}")
        
    except Exception as e:
        print(f"❌ Vibe Scan Failed: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python vibe_scanner.py '<topic>'")
        sys.exit(1)
        
    topic = sys.argv[1]
    asyncio.run(scan_vibe(topic))
