import os
import re

MDX_DIR = "src/app/blog/(content)"

# Updated with High-Value 2025 Keywords from Search
KEYWORDS_TO_INJECT = [
    "Agentic AI", "Generative AI 2025", "Multimodal AI", "AI Privacy", "Local LLM", "Self-Hosted", "Data Sovereignty"
]

def optimize_layout(content):
    # Ensure short paragraphs for readability (Basic heuristic)
    # This is tricky with regex, simpler to just focus on structural elements that improve layout
    
    # 1. Add Tldr / Key Takeaways if missing
    if "## TL;DR" not in content and "## Key Takeaways" not in content:
        # Insert after intro (first 200 chars approx, or after first paragraph)
        # Finding the first paragraph break
        match = re.search(r'\n\n', content[200:]) 
        if match:
             insert_pos = 200 + match.start()
             # We rely on manual polish for exact placement, but this forces a structure
             # Actually, let's look for the first header
             header_match = re.search(r'(##\s+.*?\n)', content)
             if header_match:
                 tldr = f"\n\n### Key Takeaways\n- **The Big Shift**: How {KEYWORDS_TO_INJECT[0]} is changing the game.\n- **Actionable Insight**: Immediate steps to secure your {KEYWORDS_TO_INJECT[3]}.\n- **Future Proof**: Why {KEYWORDS_TO_INJECT[4]}s are the ultimate privacy shield.\n\n"
                 content = content[:header_match.start()] + tldr + content[header_match.start():]
    
    return content

def main():
    print("VIRAL LAYOUT POLISHER STARTING...")
    files = [os.path.join(MDX_DIR, f) for f in os.listdir(MDX_DIR) if f.endswith(".mdx")]
    
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = optimize_layout(content)
        
        if len(new_content) != len(content):
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Polished Layout: {os.path.basename(file)}")

if __name__ == "__main__":
    main()
