#!/usr/bin/env node
/**
 * animal-idle-rpg 빌드 스크립트
 *
 * src/ 안의 조각들(마크업 셸 · CSS · 모듈 JS)을 하나의 index.html로 인라인한다.
 * 의존성 0 — node build.mjs 만으로 동작한다.
 *
 * shell.html 안의 다음 주석이 치환된다:
 *   <!--INLINE:css-->      → src/manifest.json 의 css 목록을 <style>로
 *   <!--INLINE:js-->       → src/manifest.json 의 js 목록을 <script>로 (순서 보장)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'src');
const manifest = JSON.parse(readFileSync(join(src, 'manifest.json'), 'utf8'));

const read = (rel) => {
  const p = join(src, rel);
  if (!existsSync(p)) throw new Error(`빠진 파일: src/${rel}`);
  return readFileSync(p, 'utf8').trim();
};

const css = manifest.css.map((f) => `/* ── ${f} ── */\n${read(f)}`).join('\n\n');
const js = manifest.js
  .map((f) => `/* ══ ${f} ══ */\n${read(f)}`)
  .join('\n\n');

let out = read(manifest.shell);
out = out.replace('<!--INLINE:css-->', `<style>\n${css}\n</style>`);
out = out.replace('<!--INLINE:js-->', `<script>\n${js}\n</script>`);

const target = join(root, 'index.html');
writeFileSync(target, out);
const kb = (Buffer.byteLength(out) / 1024).toFixed(1);
console.log(`index.html 생성 완료 — ${kb}KB (css ${manifest.css.length}개, js ${manifest.js.length}개)`);
