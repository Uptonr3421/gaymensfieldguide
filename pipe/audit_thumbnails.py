#!/usr/bin/env python3
"""
Thumbnail Audit Script for GMFG Blog Posts
Compares editorial.ts images vs actual files in public/images/blog/
"""

import os
import re
from pathlib import Path

# Paths
ROOT = Path(__file__).parent.parent
EDITORIAL_TS = ROOT / "src" / "data" / "editorial.ts"
BLOG_IMAGES = ROOT / "public" / "images" / "blog"

def get_editorial_images():
    """Extract all image paths from editorial.ts"""
    content = EDITORIAL_TS.read_text(encoding="utf-8")
    # Match: image: '/images/blog/filename.png'
    pattern = r"image:\s*['\"]([^'\"]+)['\"]"
    matches = re.findall(pattern, content)
    return matches

def get_actual_images():
    """Get list of actual image files"""
    if not BLOG_IMAGES.exists():
        return []
    return [f.name for f in BLOG_IMAGES.iterdir() if f.is_file()]

def main():
    editorial_images = get_editorial_images()
    actual_images = set(get_actual_images())
    
    print(f"\n{'='*60}")
    print(f"GMFG THUMBNAIL AUDIT REPORT")
    print(f"{'='*60}")
    print(f"\nTotal articles in editorial.ts: {len(editorial_images)}")
    print(f"Total images in public/images/blog/: {len(actual_images)}")
    
    missing = []
    found = []
    
    for img_path in editorial_images:
        # Extract filename from path
        filename = img_path.split("/")[-1]
        if filename in actual_images:
            found.append((img_path, filename))
        else:
            missing.append((img_path, filename))
    
    print(f"\n✅ FOUND: {len(found)}")
    print(f"❌ MISSING: {len(missing)}")
    
    if missing:
        print(f"\n{'='*60}")
        print("MISSING THUMBNAILS (Need Fix):")
        print(f"{'='*60}")
        for img_path, filename in missing:
            print(f"  ❌ {filename}")
            print(f"     Path: {img_path}")
        
        print(f"\n{'='*60}")
        print("AVAILABLE IMAGES (for remapping):")
        print(f"{'='*60}")
        for img in sorted(actual_images):
            print(f"  📷 {img}")
    
    # Show images in folder but NOT used in editorial
    used_filenames = set(img.split("/")[-1] for img in editorial_images)
    unused = actual_images - used_filenames
    if unused:
        print(f"\n{'='*60}")
        print(f"UNUSED IMAGES ({len(unused)} files not in editorial.ts):")
        print(f"{'='*60}")
        for img in sorted(unused):
            print(f"  🔸 {img}")
    
    return len(missing)

if __name__ == "__main__":
    exit(main())
