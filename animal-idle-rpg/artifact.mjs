/** index.html → 아티팩트용 조각(래퍼 태그 제거). 사용: node artifact.mjs <out> */
import { readFileSync, writeFileSync } from 'node:fs';
let s = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
s = s.replace(/^[\s\S]*?<head>\n?/, '')
     .replace(/<\/head>\s*<body>\n?/, '')
     .replace(/<\/body>\s*<\/html>\s*$/, '')
     .replace(/^\s*<meta charset[^>]*>\n?/m, '')
     .replace(/^\s*<meta name="viewport"[^>]*>\n?/m, '');
s = s.replace('<title>모닥불 무리 — 방치형 동물 RPG</title>', '<title>모닥불 무리</title>');
writeFileSync(process.argv[2] || '/tmp/artifact.html', s);
console.log('ok', (Buffer.byteLength(s)/1024).toFixed(1) + 'KB');
