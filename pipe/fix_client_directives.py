import os

TARGET_DIR = "src/components/Antigravity"
HOOKS = ["useState", "useEffect", "useRef", "useCallback", "useMemo", "useContext", "useReducer"]

def fix_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check if uses hooks
    uses_hooks = any(hook in content for hook in HOOKS)
    
    # Check if already has directive
    has_directive = "use client" in content[:100] # Check first 100 chars
    
    if uses_hooks and not has_directive:
        print(f"Fixing {filepath}...")
        new_content = '"use client";\n' + content
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
    else:
        print(f"Skipping {filepath} (Hooks: {uses_hooks}, Directive: {has_directive})")

def main():
    if not os.path.exists(TARGET_DIR):
        print(f"Directory {TARGET_DIR} not found.")
        return

    for filename in os.listdir(TARGET_DIR):
        if filename.endswith(".tsx"):
            fix_file(os.path.join(TARGET_DIR, filename))

if __name__ == "__main__":
    main()
