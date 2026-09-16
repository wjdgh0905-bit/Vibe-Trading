#!/usr/bin/env python3
"""Crawl https://developer.apple.com/kr/design/ into Markdown + JSON.

Two sources are combined:

* Static marketing pages (``/kr/design/``, ``awards``, ``get-started``,
  ``resources``, ``whats-new``) are fetched as HTML and reduced to
  title / headings / body text / links.
* Human Interface Guidelines pages are a JS single-page app.  The rendered
  content lives in DocC JSON at
  ``/tutorials/data/kr/design/human-interface-guidelines/<slug>.json`` and is
  converted to Markdown here.

Usage::

    python scripts/apple_design_crawler/crawl.py --out data/apple_design_kr
    python scripts/apple_design_crawler/crawl.py --limit 20   # quick smoke run

Respects robots.txt (``/kr/design/`` is allowed) and rate-limits requests.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
from collections import deque
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag

import requests
from bs4 import BeautifulSoup

BASE = "https://developer.apple.com"
ROOT_PATH = "/kr/design/"
HIG_PATH = "/kr/design/human-interface-guidelines"
HIG_DATA_PREFIX = "/tutorials/data"
USER_AGENT = "vibe-trading-apple-design-crawler/1.0 (+https://github.com/HKUDS/Vibe-Trading)"
DEFAULT_DELAY = 0.5
TIMEOUT = 30


# --------------------------------------------------------------------------- #
# HTTP
# --------------------------------------------------------------------------- #
class Fetcher:
    def __init__(self, delay: float = DEFAULT_DELAY):
        self.session = requests.Session()
        self.session.headers["User-Agent"] = USER_AGENT
        self.delay = delay
        self._last = 0.0
        self.count = 0

    def _throttle(self) -> None:
        wait = self.delay - (time.monotonic() - self._last)
        if wait > 0:
            time.sleep(wait)
        self._last = time.monotonic()

    def get(self, url: str, retries: int = 3) -> requests.Response | None:
        for attempt in range(retries):
            self._throttle()
            try:
                resp = self.session.get(url, timeout=TIMEOUT)
                self.count += 1
                if resp.status_code == 200:
                    return resp
                if resp.status_code in (404, 410):
                    return None
            except requests.RequestException as exc:  # pragma: no cover - network
                print(f"  ! {url}: {exc}", file=sys.stderr)
            time.sleep(2 ** attempt)
        return None


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #
def norm_path(href: str, current: str) -> str | None:
    """Resolve ``href`` against ``current`` and return a site path, or None."""
    if not href or href.startswith(("mailto:", "javascript:", "tel:")):
        return None
    abs_url, _frag = urldefrag(urljoin(current, href))
    parsed = urlparse(abs_url)
    if parsed.netloc and parsed.netloc != "developer.apple.com":
        return None
    path = parsed.path
    if "?" in href and not parsed.path:
        return None
    return path or "/"


def slug_for(path: str) -> str:
    rel = path[len(ROOT_PATH):].strip("/") or "index"
    return re.sub(r"[^a-zA-Z0-9_\-/]", "_", rel)


# --------------------------------------------------------------------------- #
# Static HTML pages
# --------------------------------------------------------------------------- #
def parse_static(html: bytes, url: str) -> dict:
    soup = BeautifulSoup(html, "lxml", from_encoding="utf-8")
    for tag in soup(["script", "style", "noscript", "svg"]):
        tag.decompose()
    # Strip global chrome so text reflects the page itself.
    for sel in ("#ac-globalnav", "#globalnav", "#ac-gn-placeholder",
                "#globalfooter", "#ac-globalfooter", ".footer", "footer", "nav"):
        for tag in soup.select(sel):
            tag.decompose()

    title = (soup.title.get_text(strip=True) if soup.title else "").strip()
    desc_tag = soup.find("meta", attrs={"name": "description"})
    description = desc_tag.get("content", "").strip() if desc_tag else ""

    main = soup.find("main") or soup.body or soup
    headings = [
        {"level": int(h.name[1]), "text": h.get_text(" ", strip=True)}
        for h in main.find_all(re.compile(r"^h[1-6]$"))
        if h.get_text(strip=True)
    ]
    paragraphs = [
        p.get_text(" ", strip=True)
        for p in main.find_all(["p", "li"])
        if len(p.get_text(strip=True)) > 0
    ]
    links = []
    seen = set()
    for a in main.find_all("a", href=True):
        path = norm_path(a["href"], url)
        text = a.get_text(" ", strip=True)
        if path and (path, text) not in seen:
            seen.add((path, text))
            links.append({"text": text, "path": path})

    return {
        "url": url,
        "kind": "static",
        "title": title,
        "description": description,
        "headings": headings,
        "paragraphs": paragraphs,
        "links": links,
    }


def static_to_markdown(page: dict) -> str:
    out = [f"# {page['title'] or page['url']}", "", f"Source: {page['url']}", ""]
    if page["description"]:
        out += [f"> {page['description']}", ""]
    for p in page["paragraphs"]:
        out.append(p)
        out.append("")
    out += ["## Links", ""]
    for link in page["links"]:
        out.append(f"- [{link['text'] or link['path']}]({BASE}{link['path']})")
    return "\n".join(out).rstrip() + "\n"


# --------------------------------------------------------------------------- #
# DocC JSON (Human Interface Guidelines)
# --------------------------------------------------------------------------- #
def hig_data_url(path: str) -> str:
    return f"{BASE}{HIG_DATA_PREFIX}{path.rstrip('/')}.json"


class DocCRenderer:
    """Convert DocC render-JSON blocks into Markdown."""

    def __init__(self, doc: dict):
        self.refs: dict = doc.get("references", {})

    # -- inline ------------------------------------------------------------- #
    def inline(self, nodes: list) -> str:
        parts = []
        for n in nodes or []:
            t = n.get("type")
            if t == "text":
                parts.append(n.get("text", ""))
            elif t in ("strong", "emphasis", "strikethrough"):
                mark = {"strong": "**", "emphasis": "*", "strikethrough": "~~"}[t]
                parts.append(f"{mark}{self.inline(n.get('inlineContent'))}{mark}")
            elif t == "codeVoice":
                parts.append(f"`{n.get('code', '')}`")
            elif t == "reference":
                ref = self.refs.get(n.get("identifier"), {})
                title = ref.get("title") or n.get("identifier", "")
                url = ref.get("url", "")
                if url and url.startswith("/"):
                    url = BASE + url
                parts.append(f"[{title}]({url})" if url else title)
            elif t == "image":
                parts.append(self.image(n.get("identifier")))
            elif t == "newTerm":
                parts.append(f"*{self.inline(n.get('inlineContent'))}*")
            elif t == "inlineHead":
                parts.append(self.inline(n.get("inlineContent")))
            elif "inlineContent" in n:
                parts.append(self.inline(n["inlineContent"]))
            elif "text" in n:
                parts.append(n["text"])
        return "".join(parts)

    def image(self, identifier: str | None) -> str:
        ref = self.refs.get(identifier or "", {})
        alt = ref.get("alt") or identifier or "image"
        variants = ref.get("variants") or []
        url = variants[0].get("url", "") if variants else ""
        if url.startswith("/"):
            url = BASE + url
        return f"![{alt}]({url})" if url else f"[image: {alt}]"

    # -- block -------------------------------------------------------------- #
    def blocks(self, nodes: list, depth: int = 0) -> list[str]:
        out: list[str] = []
        for n in nodes or []:
            t = n.get("type")
            if t == "heading":
                out += ["#" * min(6, n.get("level", 2) + 0) + " " + n.get("text", ""), ""]
            elif t == "paragraph":
                out += [self.inline(n.get("inlineContent")), ""]
            elif t in ("unorderedList", "orderedList"):
                for i, item in enumerate(n.get("items", []), 1):
                    bullet = "-" if t == "unorderedList" else f"{i}."
                    lines = self.blocks(item.get("content", []), depth + 1)
                    text = "\n".join(lines).strip()
                    first, *rest = text.split("\n")
                    out.append(f"{'  ' * depth}{bullet} {first}")
                    out += [f"{'  ' * depth}  {r}" if r else "" for r in rest]
                out.append("")
            elif t == "aside":
                label = n.get("name") or n.get("style", "Note")
                body = "\n".join(self.blocks(n.get("content", []))).strip()
                out += [f"> **{label}:** " + body.replace("\n", "\n> "), ""]
            elif t == "codeListing":
                lang = n.get("syntax") or ""
                out += [f"```{lang}", *n.get("code", []), "```", ""]
            elif t == "table":
                rows = n.get("rows", [])
                if rows:
                    header, *body = rows
                    fmt = lambda row: "| " + " | ".join(  # noqa: E731
                        " ".join(self.blocks(cell)).replace("\n", " ").strip() for cell in row
                    ) + " |"
                    out.append(fmt(header))
                    out.append("|" + " --- |" * len(header))
                    out += [fmt(r) for r in body]
                    out.append("")
            elif t == "image":
                out += [self.image(n.get("identifier")), ""]
            elif t == "video":
                ref = self.refs.get(n.get("identifier"), {})
                out += [f"[video: {ref.get('alt') or n.get('identifier')}]", ""]
            elif t == "links":
                for ident in n.get("items", []):
                    ref = self.refs.get(ident, {})
                    url = ref.get("url", "")
                    if url.startswith("/"):
                        url = BASE + url
                    abstract = self.inline(ref.get("abstract", []))
                    line = f"- [{ref.get('title', ident)}]({url})"
                    if abstract:
                        line += f" — {abstract}"
                    out.append(line)
                out.append("")
            elif t == "row":
                for col in n.get("columns", []):
                    out += self.blocks(col.get("content", []), depth)
            elif t == "tabNavigator":
                for tab in n.get("tabs", []):
                    out += [f"**{tab.get('title', '')}**", ""]
                    out += self.blocks(tab.get("content", []), depth)
            elif t == "termList":
                for item in n.get("items", []):
                    term = self.inline(item.get("term", {}).get("inlineContent"))
                    definition = "\n".join(self.blocks(item.get("definition", {}).get("content", []))).strip()
                    out += [f"- **{term}**: {definition}", ""]
            elif t == "small":
                out += [self.inline(n.get("inlineContent")), ""]
            elif "content" in n:
                out += self.blocks(n["content"], depth)
            elif "inlineContent" in n:
                out += [self.inline(n["inlineContent"]), ""]
        return out


def parse_hig(doc: dict, path: str) -> tuple[dict, str, list[str]]:
    r = DocCRenderer(doc)
    meta = doc.get("metadata", {})
    title = meta.get("title", path)
    abstract = r.inline(doc.get("abstract", []))

    md = [f"# {title}", "", f"Source: {BASE}{path}", ""]
    if abstract:
        md += [f"> {abstract}", ""]
    for section in doc.get("primaryContentSections", []):
        md += r.blocks(section.get("content", []))
    for section in doc.get("topicSections", []):
        md += [f"## {section.get('title', section.get('anchor', 'Topics'))}", ""]
        md += r.blocks([{"type": "links", "items": section.get("identifiers", [])}])
    for section in doc.get("seeAlsoSections", []):
        md += [f"## {section.get('title', 'See Also')}", ""]
        md += r.blocks([{"type": "links", "items": section.get("identifiers", [])}])

    child_paths = sorted({
        ref["url"].split("#", 1)[0] for ref in doc.get("references", {}).values()
        if isinstance(ref.get("url"), str) and ref["url"].startswith(HIG_PATH)
    })
    page = {
        "url": BASE + path,
        "kind": "hig",
        "title": title,
        "abstract": abstract,
        "role": meta.get("role"),
        "images": [
            {"alt": v.get("alt"), "urls": [BASE + x["url"] if x.get("url", "").startswith("/") else x.get("url") for x in v.get("variants", [])]}
            for v in doc.get("references", {}).values() if v.get("type") == "image"
        ],
        "links": child_paths,
    }
    return page, "\n".join(md).rstrip() + "\n", child_paths


# --------------------------------------------------------------------------- #
# Crawl driver
# --------------------------------------------------------------------------- #
def crawl(out_dir: Path, limit: int | None, delay: float, skip_hig: bool) -> dict:
    fetcher = Fetcher(delay)
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "pages").mkdir(exist_ok=True)

    queue: deque[str] = deque([ROOT_PATH])
    seen: set[str] = {ROOT_PATH}
    index: list[dict] = []
    failed: list[str] = []

    def enqueue(path: str) -> None:
        if not path.startswith(ROOT_PATH.rstrip("/")):
            return
        if not path.startswith(ROOT_PATH) and path != ROOT_PATH.rstrip("/"):
            return
        if skip_hig and path.startswith(HIG_PATH):
            return
        # Normalise: static pages end with '/', HIG pages don't.
        if path.startswith(HIG_PATH):
            path = path.rstrip("/")
        elif not path.endswith("/"):
            path += "/"
        if path not in seen:
            seen.add(path)
            queue.append(path)

    while queue:
        if limit is not None and len(index) >= limit:
            break
        path = queue.popleft()
        is_hig = path.startswith(HIG_PATH)
        url = hig_data_url(path) if is_hig else BASE + path
        print(f"[{len(index) + 1}] {path}", flush=True)
        resp = fetcher.get(url)
        if resp is None:
            failed.append(path)
            continue

        if is_hig:
            try:
                doc = resp.json()
            except ValueError:
                failed.append(path)
                continue
            page, md, children = parse_hig(doc, path)
            for child in children:
                enqueue(child)
        else:
            page = parse_static(resp.content, BASE + path)
            md = static_to_markdown(page)
            for link in page["links"]:
                enqueue(link["path"])

        slug = slug_for(path)
        md_path = out_dir / "pages" / f"{slug}.md"
        md_path.parent.mkdir(parents=True, exist_ok=True)
        md_path.write_text(md, encoding="utf-8")
        page["file"] = str(md_path.relative_to(out_dir))
        index.append(page)

    summary = {
        "root": BASE + ROOT_PATH,
        "crawled_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "requests": fetcher.count,
        "pages": len(index),
        "failed": failed,
        "index": index,
    }
    (out_dir / "index.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    write_toc(out_dir, index)
    return summary


def write_toc(out_dir: Path, index: list[dict]) -> None:
    lines = ["# Apple Design (KR) crawl", "", f"Root: {BASE}{ROOT_PATH}", "",
             f"{len(index)} pages", ""]
    for kind, label in (("static", "## Design pages"), ("hig", "## Human Interface Guidelines")):
        lines += [label, ""]
        for p in sorted((p for p in index if p["kind"] == kind), key=lambda p: p["url"]):
            lines.append(f"- [{p['title']}]({p['file']}) — {p['url']}")
        lines.append("")
    (out_dir / "README.md").write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", type=Path, default=Path("data/apple_design_kr"))
    ap.add_argument("--limit", type=int, default=None, help="stop after N pages")
    ap.add_argument("--delay", type=float, default=DEFAULT_DELAY, help="seconds between requests")
    ap.add_argument("--skip-hig", action="store_true", help="only crawl static /kr/design/ pages")
    args = ap.parse_args(argv)

    summary = crawl(args.out, args.limit, args.delay, args.skip_hig)
    print(f"\n{summary['pages']} pages, {summary['requests']} requests, "
          f"{len(summary['failed'])} failed -> {args.out}")
    for f in summary["failed"]:
        print(f"  failed: {f}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
