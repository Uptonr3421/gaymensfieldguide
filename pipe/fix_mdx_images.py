import os
import re

content_dir = "src/app/blog/(content)"

def fix_mdx_file(filepath):
    """Fix malformed image syntax in MDX files"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Pattern 1: <p className="..."><Image ... /></p> - Remove the wrapping <p> tags
    content = re.sub(
        r'<p className="[^"]*">\s*<Image\s+([^>]+)/>\s*</p>',
        r'<Image \1/>',
        content,
        flags=re.MULTILINE
    )
    
    # Pattern 2: Images wrapped in placeholder text like: <p>...<Image.../></p>
    content = re.sub(
        r'<p[^>]*>\s*.*?\[IMAGE.*?\].*?<Image\s+([^>]+)/>\s*</p>',
        r'<Image \1/>',
        content,
        flags=re.DOTALL
    )
    
    # Pattern 3: Remove [IMAGE_PLACEHOLDER: ...] divs entirely and replace with proper Image
    content = re.sub(
        r'<div[^>]*>\s*<p[^>]*>\[IMAGE_PLACEHOLDER:[^\]]+\]</p>\s*</div>',
        '',
        content,
        flags=re.MULTILINE
    )
    
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
        if fix_mdx_file(filepath):
            fixed_count += 1
            print(f"Fixed: {filename}")

print(f"\nFixed {fixed_count} MDX files")
