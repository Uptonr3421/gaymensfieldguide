import os
import re

def ensure_metadata(filepath):
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if "export const metadata" in content:
        return # Already has metadata

    # Extract Title from H1
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1) if title_match else filename.replace('.mdx', '').replace('-', ' ').title()
    
    # Extract Description (First paragraph after H1)
    # We look for the first non-header, non-empty line
    description = "Deep dive into " + title + "."
    
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if line.startswith('#'): continue
        if line.strip() == '': continue
        if line.strip().startswith('<'): continue # Skip components
        if len(line) > 50:
            description = line.strip().replace('"', "'")[:160]
            break
            
    slug = filename.replace('.mdx', '')
    
    # Escape quotes for JS string
    safe_title = title.replace('"', '\\"').replace("'", "\\'")
    safe_description = description.replace('"', '\\"').replace("'", "\\'")
    
    metadata_block = f"""
export const metadata = {{
  title: "{safe_title}",
  description: "{safe_description}",
  alternates: {{
    canonical: '/blog/{slug}',
  }},
}};

"""
    # Prepend
    new_content = metadata_block + content
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"✅ Injected Metadata into {filename}")

def main():
    root_dir = r"c:\GMFG-Vercel\src\app\blog\(content)"
    for filename in os.listdir(root_dir):
        if filename.endswith(".mdx"):
            filepath = os.path.join(root_dir, filename)
            ensure_metadata(filepath)

if __name__ == "__main__":
    main()
