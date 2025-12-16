import os
import re
import random
import concurrent.futures

# Configuration
MDX_DIR = "src/app/blog/(content)"
MAX_WORKERS = 5

# Game/Component Mapping based on keywords
GAME_MAP = {
    "security": ["IoTScanner", "TuringTest", "PromptTyper"],
    "hack": ["PromptTyper", "IoTScanner"],
    "linux": ["StackBuilder", "LatencySimulator"],
    "code": ["VibeSnake", "StackBuilder"],
    "ai": ["TuringTest", "ContextCollapse", "PromptTyper"],
    "gpu": ["ResourceBalancer"],
    "hardware": ["ResourceBalancer", "IoTScanner"],
    "saas": ["SaaSCalculator", "UnsubscribeMaze"],
    "business": ["SaaSCalculator", "UnsubscribeMaze"],
    "privacy": ["IoTScanner", "UnsubscribeMaze"],
    "network": ["LatencySimulator", "IoTScanner"]
}

DEFAULT_GAMES = ["QuizEngine", "TechHead2Head", "ConflictBento"]

def get_game_for_file(filename):
    """Deterministically pick a game based on filename keywords."""
    name = filename.lower()
    for keyword, games in GAME_MAP.items():
        if keyword in name:
            return random.choice(games)
    return random.choice(DEFAULT_GAMES)

def inject_game(filepath):
    """
    Injects a retro mini-game into the MDX file if one is missing.
    """
    filename = os.path.basename(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if any interactive component is already present
    existing_imports = re.findall(r"import\s+{?\s*(\w+)\s*}?\s+from\s+['\"].*Antigravity", content)
    
    # Heuristic: If we have less than 2 interactive components, add another one for "MAXIMUM VIBE"
    if len(existing_imports) >= 2:
        return f"SKIP: {filename} (Already has {len(existing_imports)} games)"

    # Pick a game
    game_name = get_game_for_file(filename)
    
    # Prepare Import
    import_stmt = f"import {{ {game_name} }} from '@/components/Antigravity/{game_name}';"
    if game_name == "ConflictBento": # Default export
         import_stmt = f"import ConflictBento from '@/components/Antigravity/ConflictBento';"
    
    # Prepare Content Injection
    injection_code = f"\n\n<div className=\"my-8\">\n  <{game_name} />\n</div>\n\n"
    
    # 1. Add Import
    if import_stmt not in content:
        last_import = content.rfind("import ")
        if last_import != -1:
            end_of_line = content.find("\n", last_import)
            content = content[:end_of_line+1] + import_stmt + "\n" + content[end_of_line+1:]
        else:
            content = import_stmt + "\n" + content

    # 2. Add Game Component
    conclusion_match = re.search(r"##\s*Conclusion", content, re.IGNORECASE)
    if conclusion_match:
        insert_pos = conclusion_match.start()
        content = content[:insert_pos] + injection_code + content[insert_pos:]
    else:
        content += injection_code

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    return f"INJECTED: {game_name} into {filename}"

def worker(filepath):
    try:
        result = inject_game(filepath)
        return result
    except Exception as e:
        return f"ERROR: {filepath} - {str(e)}"

def main():
    print(f"STARTING PARALLEL GAME INJECTION (Workers: {MAX_WORKERS})")
    
    files = [os.path.join(MDX_DIR, f) for f in os.listdir(MDX_DIR) if f.endswith(".mdx")]
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        results = list(executor.map(worker, files))
        
    for res in results:
        print(res)

    print("\nGAME INJECTION COMPLETE.")

if __name__ == "__main__":
    main()
