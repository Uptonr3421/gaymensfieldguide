import os
import re
import json

BLOG_DIR = "src/app/blog/(content)"
APP_DIR = "src/app"

def analyze_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Nano Banana Images (Heuristic: Images in specific folders or with specific classes)
    # We count unique Image components with src="/images/blog/..." as "Nano Banana" candidates
    banana_images = re.findall(r'<Image[^>]*src=["\']/images/blog/([^"\']+)["\']', content)
    banana_count = len(set(banana_images)) # Unique images

    # 2. Interactive Containers
    # We check for specific interactive component names
    interactive_components = [
        "InteractiveContainer", "QuizEngine", "IoTScanner", "ResourceBalancer", 
        "SaaSCalculator", "TechHead2Head", "TuringTest", "VibeSnake", "UnsubscribeMaze",
        "StackBuilder", "LatencySimulator", "PromptTyper", "ContextCollapse"
    ]
    container_count = 0
    for comp in interactive_components:
        if f"<{comp}" in content:
            container_count += 1

    # 3. Lazy Loading Check
    # Next.js <Image> defaults to lazy, but we check if we EXPLICITLY set it or if priority is abused.
    # We check if NON-priority images exist (which are implicitly lazy).
    has_lazy = "priority" not in content or content.count("<Image") > content.count("priority")

    # 4. Accessibility (ARIA/Alt)
    # Check if images have alt tags
    images_without_alt = len(re.findall(r'<Image(?!.*alt=)[^>]*>', content))
    # Check generic divs with click handlers but no role (rough check)
    bad_clicks = len(re.findall(r'<div[^>]*onClick(?!.*role=)[^>]*>', content))

    return {
        "file": os.path.basename(filepath),
        "banana_images": banana_count,
        "interactive_containers": container_count,
        "is_lazy_enacted": has_lazy,
        "accessibility_issues": images_without_alt + bad_clicks
    }

def main():
    report = {
        "blogs": [],
        "summary": {
            "total_blogs": 0,
            "one_plus_images": 0,
            "two_plus_images": 0,
            "has_interactive": 0,
            "fully_accessible_heuristic": 0
        }
    }

    if os.path.exists(BLOG_DIR):
        for f in os.listdir(BLOG_DIR):
            if f.endswith(".mdx"):
                data = analyze_file(os.path.join(BLOG_DIR, f))
                report["blogs"].append(data)

    # Summarize
    report["summary"]["total_blogs"] = len(report["blogs"])
    report["summary"]["one_plus_images"] = sum(1 for b in report["blogs"] if b["banana_images"] >= 1)
    report["summary"]["two_plus_images"] = sum(1 for b in report["blogs"] if b["banana_images"] >= 2)
    report["summary"]["has_interactive"] = sum(1 for b in report["blogs"] if b["interactive_containers"] >= 1)
    
    # Accessibility Heuristic (0 issues found by regex)
    report["summary"]["fully_accessible_heuristic"] = sum(1 for b in report["blogs"] if b["accessibility_issues"] == 0)

    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    main()
