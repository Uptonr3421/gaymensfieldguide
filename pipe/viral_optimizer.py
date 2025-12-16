import os
import re

MDX_DIR = "src/app/blog/(content)"

# High-converting CTAs based on research
CTAS = [
    '<div className="my-8 p-6 bg-zinc-900 border border-banana-500/30 rounded-xl relative overflow-hidden"><div className="absolute inset-0 bg-banana-500/5 z-0"></div><div className="relative z-10"><h3 className="text-xl font-bold text-white mb-2">Build Your Own Agentic AI?</h3><p className="text-zinc-400 mb-4">Don\'t get left behind in the 2025 AI revolution. Join 15,000+ developers getting weekly code patterns.</p><button className="px-6 py-2 bg-banana-500 text-black font-bold rounded-lg hover:bg-banana-400 transition-colors">Get the Architect\'s Blueprint</button></div></div>',
]

def optimize_post(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    filename = os.path.basename(filepath)
    original_content = content
    
    # 1. Inject Table of Contents if missing and post is long enough
    if "TableOfContents" not in content and len(content) > 3000:
        # Simple heuristic: Insert after the first H2
        match = re.search(r'(##\s+.*?\n)', content)
        if match:
             toc_component = '\n\n<TableOfContents />\n\n'
             # Insert ToC after the headline
             content = content.replace(match.group(1), match.group(1) + toc_component)
             
             # Add import if missing
             if "import { TableOfContents }" not in content:
                 if "import" in content:
                     # Add to last import
                     content = re.sub(r"(import .*?;\n)", r"\1import { TableOfContents } from '@/components/Antigravity/TableOfContents';\n", content, count=1)
                 else:
                     # No imports? Prepend.
                     content = "import { TableOfContents } from '@/components/Antigravity/TableOfContents';\n\n" + content

    # 1.5 Inject Viral Newsletter CTA (High Conversion)
    if "The Field Guide Newsletter" not in content and len(content) > 1500:
        newsletter_cta = (
            '\n\n<div className="my-12 p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center relative overflow-hidden group">'
            '<div className="absolute inset-0 bg-gradient-to-r from-banana-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>'
            '<h3 className="text-2xl font-black text-white mb-3 relative z-10">Join the Vibe Coder Resistance</h3>'
            '<p className="text-zinc-400 mb-6 max-w-md mx-auto relative z-10">Get the "Agentic AI Starter Kit" and weekly anti-hype patterns delivered to your inbox.</p>'
            '<form className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto relative z-10">'
            '<input type="email" placeholder="agent@resistance.com" className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-banana-500 outline-none" />'
            '<button className="bg-banana-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-banana-400 transition-colors">Deploy</button>'
            '</form>'
            '</div>\n\n'
        )
        # Inject after the 3rd paragraph or around middle? Let's go with after a mid-article header
        headers = list(re.finditer(r'(##\s+.*?\n)', content))
        if len(headers) >= 2:
            # Inject before the 2nd header from the end, or middle
            mid_point = len(headers) // 2
            insert_pos = headers[mid_point].start()
            content = content[:insert_pos] + newsletter_cta + content[insert_pos:]

                 
    # 2. Inject Viral/Conversion CTA at the end
    if "Build Your Own Agentic AI" not in content:
        # Add before the last set of references or at the very end
        if "## References" in content:
            content = content.replace("## References", f"{CTAS[0]}\n\n## References")
        else:
            content += f"\n\n{CTAS[0]}"

    # 3. "Scroll-Stopper" Formatting
    # Bold key phrases (simple heuristic for "key takeaway")
    # This is risky to do with regex alone without NLP, skipping auto-bolding to avoid ruining text.
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return f"Optimized: {filename}"
    return None

def main():
    print("VIRAL OPTIMIZER 9000 STARTING...")
    files = [os.path.join(MDX_DIR, f) for f in os.listdir(MDX_DIR) if f.endswith(".mdx")]
    
    count = 0
    for file in files:
        res = optimize_post(file)
        if res:
            print(res)
            count += 1
            
    print(f"Finished. Optimized {count} posts.")

if __name__ == "__main__":
    main()
