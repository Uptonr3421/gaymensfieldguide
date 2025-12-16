import os

def strip_toc(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    for line in lines:
        if 'import { TableOfContents }' in line:
            continue
        # if '<TableOfContents />' in line:
        #    continue
        new_lines.append(line)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

def main():
    root_dir = r"c:\GMFG-Vercel\src\app\blog\(content)"
    for filename in os.listdir(root_dir):
        if filename.endswith(".mdx"):
            filepath = os.path.join(root_dir, filename)
            strip_toc(filepath)
            print(f"Stripped ToC from {filepath}")

if __name__ == "__main__":
    main()
