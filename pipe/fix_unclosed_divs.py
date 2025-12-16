import os
import re

content_dir = "src/app/blog/(content)"

def fix_unclosed_divs(filepath):
    """Find and fix unclosed div tags in MDX files"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Pattern: Find divs that are opened but not closed before the next heading or component
    # Look for: <div...> followed by whitespace/newlines but no </div> before ## or <Component
    lines = content.split('\n')
    fixed_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check if this line opens a div
        if '<div' in line and not '</div>' in line and not '/>' in line:
            # Look ahead to see if there's a closing tag
            found_closing = False
            j = i + 1
            
            # Search next 10 lines for closing div
            while j < min(i + 10, len(lines)):
                if '</div>' in lines[j]:
                    found_closing = True
                    break
                # If we hit a heading or new component, we need to close the div
                if lines[j].strip().startswith('##') or lines[j].strip().startswith('<'):
                    if not lines[j].strip().startswith('</'):
                        break
                j += 1
            
            # If no closing tag found, add one before the next element
            if not found_closing:
                fixed_lines.append(line)
                # Add Image component if it's missing
                if 'aspect-video' in line or 'aspect-[' in line:
                    # Extract image path from nearby comments or use default
                    image_path = '/images/blog/default-thumb.png'
                    fixed_lines.append(f'  <Image src="{image_path}" alt="ARTICLE_IMAGE" fill className="object-cover" />')
                fixed_lines.append('</div>')
                i += 1
                continue
        
        fixed_lines.append(line)
        i += 1
    
    content = '\n'.join(fixed_lines)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Process all MDX files
fixed_count = 0
for filename in os.listdir(content_dir):
    if filename.endswith('.mdx'):
        filepath = os.path.join(content_dir, filename)
        try:
            if fix_unclosed_divs(filepath):
                fixed_count += 1
                print(f"Fixed unclosed divs: {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print(f"\nFixed {fixed_count} files with unclosed divs")
