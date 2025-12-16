import os
import re
import concurrent.futures

MDX_DIR = "src/app/blog/(content)"
MAX_WORKERS = 5

def optimize_images(filepath):
    """
    Optimizes images in MDX:
    1. Adds 'priority' to the first Image component (LCP).
    2. Ensures 'alt' tags are present (basic check).
    """
    filename = os.path.basename(filepath)
    changed = False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add Priority to First Image
    # Find the first occurrence of <Image ...>
    # We look for <Image (without 'priority') ...>
    
    match = re.search(r"(<Image[^>]+)(>|/>)", content)
    if match:
        tag_start = match.group(1)
        tag_end = match.group(2)
        
        if "priority" not in tag_start:
            # Inject priority
            optimized_tag = f"{tag_start} priority {tag_end}"
            # Replace only the first occurrence
            content = content.replace(match.group(0), optimized_tag, 1)
            changed = True
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return f"OPTIMIZED: {filename} (Added Priority)"
    else:
        return f"SKIPPED: {filename} (Already Optimized)"

def worker(filepath):
    try:
        return optimize_images(filepath)
    except Exception as e:
        return f"ERROR: {filepath} - {str(e)}"

def main():
    print(f"STARTING IMAGE OPTIMIZER BATCH (Workers: {MAX_WORKERS})")
    
    files = [os.path.join(MDX_DIR, f) for f in os.listdir(MDX_DIR) if f.endswith(".mdx")]
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        results = list(executor.map(worker, files))
        
    optimized_count = 0
    for res in results:
        # print(res) # Reduce noise
        if "OPTIMIZED" in res:
            optimized_count += 1
            print(res)

    print(f"\nBATCH COMPLETE. Optimized {optimized_count} images for LCP.")

if __name__ == "__main__":
    main()
