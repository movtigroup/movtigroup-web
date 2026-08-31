#!/usr/bin/env python3
"""Convert Jekyll posts to Nuxt Content format"""
import os
import re
import shutil

SRC = "/opt/data/tahatehran.github.io/_posts"
DST_EN = "/opt/data/movtigroup-web/content/en"
DST_FA = "/opt/data/movtigroup-web/content/fa"

def parse_frontmatter(text):
    """Parse YAML frontmatter from Jekyll post"""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', text, re.DOTALL)
    if not match:
        return {}, text
    fm = {}
    for line in match.group(1).split('\n'):
        if ':' in line:
            key, val = line.split(':', 1)
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            # Handle list values like [docker, tutorial]
            if val.startswith('[') and val.endswith(']'):
                val = [v.strip() for v in val[1:-1].split(',')]
            fm[key] = val
    return fm, match.group(2)

def convert_post(filepath):
    """Convert a single Jekyll post to Nuxt Content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fm, body = parse_frontmatter(content)
    
    lang = fm.get('lang', 'fa')
    title = fm.get('title', 'Untitled')
    date = fm.get('date', '2024-01-01')
    description = fm.get('description', '')
    category = fm.get('category', '')
    if isinstance(category, list):
        category = category[0] if category else ''
    author = fm.get('author', 'MovtiGroup')
    tags = fm.get('tags', [])
    if isinstance(tags, str):
        tags = [tags]
    
    # Create slug from filename
    filename = os.path.basename(filepath)
    # Remove date prefix and extension
    slug_match = re.match(r'\d{4}-\d{2}-\d{2}-(.*?)\.(en\.)?md$', filename)
    if slug_match:
        slug = slug_match.group(1)
    else:
        slug = os.path.splitext(filename)[0]
    
    # Format date
    date_str = date[:10] if isinstance(date, str) else '2024-01-01'
    
    # Build new frontmatter
    new_fm = f"""---
title: "{title}"
date: {date_str}
lang: {lang}
category: "{category}"
author: "{author}"
description: "{description}"
---
"""
    
    # Clean up body - remove Jekyll-specific syntax
    clean_body = body
    # Remove Liquid tags
    clean_body = re.sub(r'{%.*?%}', '', clean_body)
    clean_body = re.sub(r'{{.*?}}', '', clean_body)
    
    return new_fm + clean_body, lang, slug

def main():
    if not os.path.exists(SRC):
        print(f"Source not found: {SRC}")
        return
    
    os.makedirs(DST_EN, exist_ok=True)
    os.makedirs(DST_FA, exist_ok=True)
    
    converted = 0
    for filename in sorted(os.listdir(SRC)):
        if not filename.endswith('.md'):
            continue
        
        filepath = os.path.join(SRC, filename)
        try:
            content, lang, slug = convert_post(filepath)
            
            if lang == 'en':
                dst_dir = DST_EN
            else:
                dst_dir = DST_FA
            
            dst_path = os.path.join(dst_dir, f"{slug}.md")
            with open(dst_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            converted += 1
            if converted % 20 == 0:
                print(f"Converted {converted} posts...")
                
        except Exception as e:
            print(f"Error converting {filename}: {e}")
    
    print(f"\nDone! Converted {converted} posts total.")
    print(f"English posts: {len(os.listdir(DST_EN))}")
    print(f"Farsi posts: {len(os.listdir(DST_FA))}")

if __name__ == '__main__':
    main()
