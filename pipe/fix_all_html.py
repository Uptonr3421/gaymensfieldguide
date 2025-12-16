import os
import re
from html.parser import HTMLParser

content_dir = "src/app/blog/(content)"

class TagValidator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
    
    def handle_starttag(self, tag, attrs):
        self.stack.append(tag)
    
    def handle_endtag(self, tag):
        if not self.stack:
            self.errors.append(f"Unexpected closing tag: {tag}")
        elif self.stack[-1] != tag:
            self.errors.append(f"Mismatched tags: expected {self.stack[-1]}, got {tag}")
        else:
            self.stack.pop()
    
    def has_unclosed_tags(self):
        return len(self.stack) > 0

def fix_mdx_html_structure(filepath):
    """Fix HTML structure in MDX files by ensuring all tags are properly closed"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract all InteractiveContainer blocks
    pattern = r'(<InteractiveContainer[^>]*>)(.*?)(</InteractiveContainer>)'
    
    def fix_container(match):
        opening = match.group(1)
        body = match.group(2)
        closing = match.group(3)
        
        # Count opening and closing divs
        open_divs = body.count('<div')
        close_divs = body.count('</div>')
        
        # If there are more opening divs than closing, add closing tags before </InteractiveContainer>
        if open_divs > close_divs:
            missing = open_divs - close_divs
            # Add the missing closing divs
            body = body.rstrip() + '\n' + ('  </div>\n' * missing)
        
        return opening + body + closing
    
    fixed = re.sub(pattern, fix_container, content, flags=re.DOTALL)
    
    if fixed != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(fixed)
        return True
    return False

# Process all MDX files
fixed_count = 0
for filename in os.listdir(content_dir):
    if filename.endswith('.mdx'):
        filepath = os.path.join(content_dir, filename)
        try:
            if fix_mdx_html_structure(filepath):
                fixed_count += 1
                print(f"Fixed: {filename}")
        except Exception as e:
            print(f"Error: {filename} - {e}")

print(f"\nFixed {fixed_count} files")
