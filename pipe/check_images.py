
import re
import os

def check_images():
    editorial_path = r'c:\GMFG-Vercel\src\data\editorial.ts'
    images_dir = r'c:\GMFG-Vercel\public\images\blog'
    
    with open(editorial_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find all "image": "..." entries
    matches = re.findall(r'image:\s*[\'"](.*?)[\'"]', content)
    
    print(f"Found {len(matches)} image references in editorial.ts")
    
    missing = []
    for img_path in matches:
        # img_path is like /images/blog/filename.png
        filename = os.path.basename(img_path)
        full_path = os.path.join(images_dir, filename)
        
        if not os.path.exists(full_path):
            missing.append(img_path)
    
    if missing:
        print("MISSING IMAGES:")
        for m in missing:
            print(m)
    else:
        print("All images referenced in editorial.ts exist in public/images/blog!")

if __name__ == '__main__':
    check_images()
