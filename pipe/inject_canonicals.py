import os
import re

def inject_canonical(filepath):
    # Determine slug from filename
    filename = os.path.basename(filepath)
    slug = filename.replace('.mdx', '')
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if metadata export exists
    if 'export const metadata = {' not in content:
        print(f"Skipping {filename}: No metadata export found.")
        return

    # Check if 'alternates' is already present
    if 'alternates:' in content:
        print(f"Skipping {filename}: Canonical already present.")
        return

    # Prepare canonical string
    canonical_entry = f"    alternates: {{\n      canonical: '/blog/{slug}',\n    }},"
    
    # Regex replacement to inject it into the metadata object
    # It looks for the closing bracket of the metadata object `}` or the last property.
    # We'll try to insert it before the closing brace of the export object.
    
    # Pattern: export const metadata = { ... };
    # We want to replace the last property's end or just append before `};`
    
    # Simple approach: Replace `export const metadata = {` with `export const metadata = {\n  alternates: { canonical: '/blog/${slug}' },`
    # This puts it at the top of the object.
    
    new_content = content.replace(
        'export const metadata = {',
        f"export const metadata = {{\n  alternates: {{\n    canonical: '/blog/{slug}',\n  }},\n"
    )

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename} with canonical tag.")
    else:
        print(f"Failed to update {filename}.")

def main():
    root_dir = r"c:\GMFG-Vercel\src\app\blog\(content)"
    for filename in os.listdir(root_dir):
        if filename.endswith(".mdx"):
            filepath = os.path.join(root_dir, filename)
            inject_canonical(filepath)

if __name__ == "__main__":
    main()
