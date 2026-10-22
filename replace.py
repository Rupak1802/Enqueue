import os
import re

directory = 'c:/Users/Rupak/Downloads/Buildora-website-main/Buildora-website-main'

replacements = [
    (r'\bBuildora\b', 'Enqueue'),
    (r'\bbuildora\b', 'enqueue'),
    (r'\bBUILDORA\b', 'ENQUEUE'),
    (r'Rohithan P D', 'RUPAK B'),
    (r'Mr\.P\.D\.Rohithan', 'Mr. Rupak B'),
    (r'Rohithan', 'Rupak')
]

for root, dirs, files in os.walk(directory):
    if 'node_modules' in root or '.git' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements:
                new_content = re.sub(old, new, new_content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {filepath}')
