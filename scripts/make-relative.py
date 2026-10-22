import os
import re

def process_html_file(file_path, depth):
    prefix = "./" if depth == 0 else "../" * depth

    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Assets: /_next/, /logo-, /favicon, /images/, /videos/
    asset_prefixes = ["/_next/", "/logo-", "/favicon.png", "/images/", "/videos/"]
    for asset in asset_prefixes:
        clean = asset.lstrip("/")
        target = prefix + clean
        html = html.replace(f'href="{asset}', f'href="{target}')
        html = html.replace(f'src="{asset}', f'src="{target}')
        html = html.replace(f'"{asset}', f'"{target}')
        html = html.replace(f"'{asset}", f"'{target}")
        html = html.replace(f'url({asset}', f'url({target}')
        html = html.replace(f'url("{asset}', f'url("{target}')

    # 2. Internal page navigation links
    # href="/" -> href="./" or "../"
    html = re.sub(r'href="/"', f'href="{prefix}"', html)
    
    # href="/services/..." -> href="./services/..." or "../services/..."
    routes = ["services", "work", "team", "contact", "404"]
    for r in routes:
        html = html.replace(f'href="/{r}/', f'href="{prefix}{r}/')
        html = html.replace(f'href="/{r}"', f'href="{prefix}{r}/')

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)

def main():
    root_dir = "html-version"
    if not os.path.isdir(root_dir):
        print(f"Directory {root_dir} not found.")
        return

    count = 0
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                rel = os.path.relpath(path, root_dir)
                depth = len(rel.split(os.sep)) - 1
                process_html_file(path, depth)
                count += 1

    print(f"Successfully processed {count} HTML files in {root_dir} with relative paths.")

if __name__ == "__main__":
    main()
