import os
import re

content_dir = "src/app/blog/(content)"

def fix_mdx_html(filepath):
    """Fix malformed HTML in MDX files"""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    fixed_lines = []
    skip_next = 0
    
    for i, line in enumerate(lines):
        if skip_next > 0:
            skip_next -= 1
            continue
        
        # Pattern 1: Orphaned </div> after {/* HEADER */}
        if line.strip() == '</div>' and i > 0:
            prev = lines[i-1].strip()
            # If previous line is a comment or another closing tag, skip this orphan
            if prev.startswith('{/*') or prev == '</div>' or prev == '':
                continue
        
        # Pattern 2: </div> followed by opening tag content (should be inside the div)
        if line.strip() == '</div>' and i + 1 < len(lines):
            next_line = lines[i+1].strip()
            # If next line starts with content that should be in the div, skip the early close
            if next_line.startswith('<h1') or next_line.startswith('<span'):
                continue
        
        # Pattern 3: Duplicate Image components - keep only the real one
        if '<Image src="/images/blog/default-thumb.png"' in line:
            # Look ahead for real image
            found_real = False
            for j in range(i+1, min(i+5, len(lines))):
                if '<Image src="/images/blog/' in lines[j] and 'default-thumb' not in lines[j]:
                    found_real = True
                    break
            if found_real:
                continue  # Skip the placeholder
        
        # Pattern 4: Orphaned absolute positioned div after a closed container
        if line.strip().startswith('<div className="absolute'):
            if i > 0 and '</div>' in lines[i-1]:
                # This div is outside its container, skip it
                continue
        
        fixed_lines.append(line)
    
    content = ''.join(fixed_lines)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Process all MDX files
for filename in os.listdir(content_dir):
    if filename.endswith('.mdx'):
        filepath = os.path.join(content_dir, filename)
        try:
            fix_mdx_html(filepath)
            print(f"Fixed: {filename}")
        except Exception as e:
            print(f"Error: {filename} - {e}")

print("\nAll MDX files processed")
