import os
import re

content_dir = "src/app/blog/(content)"

def clean_mdx_structure(content):
    """Clean up malformed MDX structure"""
    lines = content.split('\n')
    cleaned = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Skip orphaned closing divs that appear before content
        if line.strip() == '</div>' and i > 0:
            # Check if previous line was also a closing div or empty
            prev_line = lines[i-1].strip() if i > 0 else ''
            if prev_line in ['', '</div>'] or prev_line.startswith('{/*'):
                i += 1
                continue
        
        # Fix: Remove duplicate Image components (keep only the one with actual path)
        if '<Image src="/images/blog/default-thumb.png"' in line:
            # Look ahead for the real image
            if i + 2 < len(lines) and '<Image src="/images/blog/' in lines[i+2] and 'default-thumb' not in lines[i+2]:
                # Skip this default placeholder, keep the real one
                i += 1
                continue
        
        cleaned.append(line)
        i += 1
    
    return '\n'.join(cleaned)

# Process all MDX files
fixed_count = 0
for filename in os.listdir(content_dir):
    if filename.endswith('.mdx'):
        filepath = os.path.join(content_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            cleaned = clean_mdx_structure(content)
            
            if cleaned != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(cleaned)
                fixed_count += 1
                print(f"Cleaned: {filename}")
        except Exception as e:
            print(f"Error: {filename} - {e}")

print(f"\nCleaned {fixed_count} MDX files")
