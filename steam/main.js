// 떡상 계좌 키우기 — PC(Steam) 창. ../game 의 웹 빌드를 그대로 띄움 (광고·서비스워커·외부 SDK 없음).
// 저장: 웹판과 같은 localStorage(사용자 폴더/Local Storage). 언어: 처음엔 OS 언어, Ctrl+Shift+L로 전환.
'use strict';
const { app, BrowserWindow, protocol, net, shell, session, Menu, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const GAME = fs.existsSync(path.join(__dirname, 'game', 'index.html'))
  ? path.join(__dirname, 'game')            // 포장된 앱: resources/app/game
  : path.join(__dirname, '..', 'game');      // 개발: 저장소의 game/
const ORIGIN = 'app://game/';

app.setName('Ddeoksang');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true, codeCache: true } }]);

const GOT_LOCK = app.requestSingleInstanceLock();
if (!GOT_LOCK) app.quit();

const CFG = () => path.join(app.getPath('userData'), 'settings.json');
let cfg = {};
function loadCfg() { try { cfg = JSON.parse(fs.readFileSync(CFG(), 'utf8')) || {}; } catch (e) { cfg = {}; } }
function saveCfg() { try { fs.writeFileSync(CFG(), JSON.stringify(cfg)); } catch (e) {} }
function argLang() { const a = process.argv.find(s => /^--lang=/.test(s)); return a ? a.slice(7) : ''; }
function pickLang() {
  const a = argLang(); if (a === 'ko' || a === 'en') return a;
  if (cfg.lang === 'ko' || cfg.lang === 'en') return cfg.lang;
  const sys = (app.getPreferredSystemLanguages()[0] || app.getLocale() || '').toLowerCase();
  return sys.startsWith('ko') ? 'ko' : 'en';
}
const startUrl = lang => lang === 'ko' ? ORIGIN : ORIGIN + 'en/';

let win = null, curLang = 'en';
function flush() { try { session.defaultSession.flushStorageData(); } catch (e) {} }

function serveGame() {
  protocol.handle('app', async req => {
    const u = new URL(req.url);
    if (u.host !== 'game') return new Response('', { status: 404 });
    let p; try { p = decodeURIComponent(u.pathname); } catch (e) { return new Response('', { status: 400 }); }
    if (p.endsWith('/')) p += 'index.html';
    const f = path.normalize(path.join(GAME, p));
    if (f !== GAME && !f.startsWith(GAME + path.sep)) return new Response('', { status: 403 });
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) return new Response('', { status: 404 });
    return net.fetch(pathToFileURL(f).toString());
  });
}

function lockDown(ses) {
  const ok = new Set(['clipboard-sanitized-write', 'fullscreen']);
  ses.setPermissionRequestHandler((wc, perm, cb) => cb(ok.has(perm)));
  ses.setPermissionCheckHandler((wc, perm) => ok.has(perm));
}

function fitBounds(b) {
  const wa = screen.getPrimaryDisplay().workAreaSize;   // 첫 창: 1280x800, 화면이 더 작으면(노트북 125%·150% 배율 등) 화면 안에 맞춤
  const def = { width: Math.min(1280, Math.max(400, wa.width - 40)), height: Math.min(800, Math.max(300, wa.height - 40)) };   // G-014: 높이 하한 600을 없앰 (1366x768 노트북·배율 125%면 600보다 작음)
  if (!b || !b.width) return def;
  const d = screen.getDisplayMatching(b).workArea;
  const vis = b.x < d.x + d.width - 80 && b.x + b.width > d.x + 80 && b.y >= d.y - 20 && b.y < d.y + d.height - 80;
  return vis ? Object.assign({}, b, { width: Math.min(b.width, d.width), height: Math.min(b.height, d.height) }) : { width: Math.min(b.width, d.width), height: Math.min(b.height, d.height) };   // G-014: 저장된 크기도 지금 화면보다 크면 줄임 (큰 모니터 → 노트북)
}

function createWindow() {
  const lang = curLang = pickLang();
  win = new BrowserWindow(Object.assign({
    minWidth: Math.min(400, Math.max(300, screen.getPrimaryDisplay().workAreaSize.width - 40)), minHeight: Math.min(600, Math.max(300, screen.getPrimaryDisplay().workAreaSize.height - 40)), backgroundColor: '#090c13', show: false, autoHideMenuBar: true,
    title: lang === 'ko' ? '떡상 계좌 키우기' : 'Stonks Tycoon',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false, spellcheck: false, devTools: !app.isPackaged }
  }, fitBounds(cfg.bounds)));
  if (cfg.full) win.setFullScreen(true);
  win.once('ready-to-show', () => win.show());
  if (typeof cfg.zoom === 'number') win.webContents.on('did-finish-load', () => win.webContents.setZoomLevel(cfg.zoom));

  // 게임 밖으로 나가는 이동은 막고, https 링크만 기본 브라우저로 연다
  win.webContents.on('will-navigate', (e, url) => {
    if (url.startsWith(ORIGIN)) return;
    e.preventDefault();
    if (/^https:\/\//.test(url)) shell.openExternal(url);
  });
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https:\/\//.test(url)) shell.openExternal(url); return { action: 'deny' }; });

  win.webContents.on('before-input-event', (e, i) => {
    if (i.type !== 'keyDown') return;
    const k = (i.key || '').toLowerCase(), mod = i.control || i.meta;
    if (k === 'f11' || (i.alt && k === 'enter')) { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
    else if (mod && i.shift && k === 'l') { cfg.lang = curLang = curLang === 'ko' ? 'en' : 'ko'; saveCfg(); flush(); win.loadURL(startUrl(curLang)); e.preventDefault(); }
    else if (mod && (k === '=' || k === '+')) { zoom(0.5); e.preventDefault(); }
    else if (mod && k === '-') { zoom(-0.5); e.preventDefault(); }
    else if (mod && k === '0') { zoom(null); e.preventDefault(); }
    else if (k === 'f5' || (mod && k === 'r')) { e.preventDefault(); }   // 실수로 새로고침 막기
  });

  const keep = () => { if (!win || win.isDestroyed()) return; cfg.full = win.isFullScreen(); if (!cfg.full && !win.isMaximized() && !win.isMinimized()) cfg.bounds = win.getBounds(); };
  win.on('resize', keep); win.on('move', keep);
  win.on('enter-full-screen', keep); win.on('leave-full-screen', keep);
  win.on('close', () => { keep(); saveCfg(); });
  win.on('closed', () => { win = null; flush(); });
  win.loadURL(startUrl(lang));
}

function zoom(d) {
  if (!win) return;
  const z = d === null ? 0 : Math.max(-3, Math.min(3, win.webContents.getZoomLevel() + d));
  win.webContents.setZoomLevel(z); cfg.zoom = z; saveCfg();
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => {
  if (!GOT_LOCK) return;
  loadCfg();
  Menu.setApplicationMenu(null);
  serveGame();
  lockDown(session.defaultSession);
  createWindow();
});
app.on('before-quit', flush);
app.on('window-all-closed', () => { flush(); app.quit(); });
