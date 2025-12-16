import os
import re

content_dir = "src/app/blog/(content)"

def fix_interactive_containers(content):
    """Fix broken InteractiveContainer structures"""
    lines = content.split('\n')
    fixed = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Find InteractiveContainer opening
        if '<InteractiveContainer' in line and not line.strip().endswith('/>'):
            # Collect all lines until we find the closing tag
            container_lines = [line]
            i += 1
            depth = 1
            
            while i < len(lines) and depth > 0:
                current = lines[i]
                
                # Skip orphaned closing divs right after opening
                if current.strip() == '</div>' and i > 0:
                    prev = lines[i-1].strip()
                    if prev.startswith('<div') or prev.startswith('<InteractiveContainer'):
                        i += 1
                        continue
                
                container_lines.append(current)
                
                if '</InteractiveContainer>' in current:
                    depth -= 1
                
                i += 1
            
            # Reconstruct with proper structure
            fixed.extend(container_lines)
            continue
        
        fixed.append(line)
        i += 1
    
    return '\n'.join(fixed)

# Process all MDX files
for filename in os.listdir(content_dir):
    if filename.endswith('.mdx'):
        filepath = os.path.join(content_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            fixed = fix_interactive_containers(content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
            
            print(f"Processed: {filename}")
        except Exception as e:
            print(f"Error: {filename} - {e}")

print("\nAll files processed")
