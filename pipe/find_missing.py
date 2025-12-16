import json
import os
import re

def normalize_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug

def find_missing_topics():
    with open('pipe/topics.json', 'r') as f:
        topics = json.load(f)

    blog_dir = r"c:\GMFG-Vercel\src\app\blog\(content)"
    existing_files = os.listdir(blog_dir)
    
    missing = []
    for topic in topics:
        slug = normalize_slug(topic)
        # Check if any existing filename starts with this slug (approximate match)
        # or if the topic title is already in editorial.ts (we'll assume file existence is the source of truth for "generated")
        
        # Simple check: Does a file with a similar name exist?
        # We can try to match the slug against the filenames.
        
        found = False
        for f in existing_files:
            if slug in f or f.replace('.mdx', '') in slug:
                found = True
                break
        
        if not found:
            missing.append(topic)
            
    print(f"Total Topics: {len(topics)}")
    print(f"Missing MDX: {len(missing)}")
    if missing:
        print("Missing Topics:")
        print(json.dumps(missing, indent=2))
        
        # Update topics.json to ONLY run these?
        # user said "do all", creating content is good.
        with open('pipe/topics_missing.json', 'w') as f:
            json.dump(missing, f)

if __name__ == "__main__":
    find_missing_topics()
