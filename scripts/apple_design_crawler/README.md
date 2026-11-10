# Apple Design (KR) crawler

Crawls https://developer.apple.com/kr/design/ into Markdown + JSON.

```bash
pip install requests beautifulsoup4 lxml
python scripts/apple_design_crawler/crawl.py --out data/apple_design_kr
python scripts/apple_design_crawler/crawl.py --limit 10   # smoke run
python scripts/apple_design_crawler/crawl.py --skip-hig   # marketing pages only
```

Sources:

- Static pages (`/kr/design/`, `awards/*`, `get-started`, `resources`, `whats-new`): HTML → title, body text, links.
- Human Interface Guidelines: JS SPA, so content is read from the DocC JSON at
  `/tutorials/data/kr/design/human-interface-guidelines/<slug>.json` and rendered to Markdown
  (headings, paragraphs, lists, tables, asides, images, cross-links).

Output (`data/apple_design_kr/`):

- `README.md` — table of contents
- `index.json` — per-page metadata (url, title, abstract, images, links)
- `pages/**/*.md` — one Markdown file per page

Respects `robots.txt` (the design section is allowed) and throttles to one request per `--delay` seconds.
