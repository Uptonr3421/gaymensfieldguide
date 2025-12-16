import os
import re

MDX_DIR = "src/app/blog/(content)"

def fix_priority_syntax(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix the specific breakage: " / priority >" -> " priority />"
    # Also handle " priority >" if it wasn't self closing initially but regex messed it up?
    # My regex was (<Image[^>]+)(>|/>)
    # If it was <Image ... />
    # Group 1: <Image ... /
    # Group 2: >
    # New: <Image ... / priority >
    # We want: <Image ... priority />
    
    # Pattern to find the broken tag
    broken_pattern = r"(/ priority >)"
    
    if re.search(broken_pattern, content):
        new_content = content.replace("/ priority >", "priority />")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return f"FIXED: {os.path.basename(filepath)}"
    
    return None

files = [os.path.join(MDX_DIR, f) for f in os.listdir(MDX_DIR) if f.endswith(".mdx")]
count = 0
for f in files:
    res = fix_priority_syntax(f)
    if res:
        print(res)
        count += 1

print(f"Fixed {count} files.")
