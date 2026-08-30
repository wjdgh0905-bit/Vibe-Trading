// MELANGE TATTOO — site behavior: gallery grid, guest spots, FAQ accordion, mobile nav.
// Gallery photos and guest-spot cities are data-driven from /content/*.json so they can be
// updated without touching this file or index.html.

(function () {
  'use strict';

  function placeholderSVG(motif) {
    return `
      <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${motif} — photo coming soon">
        <rect width="400" height="500" fill="#f2f1ec"/>
        <path d="M0 340 Q 50 300 100 340 T 200 340 T 300 340 T 400 340 V500 H0 Z" fill="#ebf0fd"/>
        <path d="M0 380 Q 50 350 100 380 T 200 380 T 300 380 T 400 380 V500 H0 Z" fill="#1c46c7" opacity="0.85"/>
        <text x="200" y="220" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#1a1a18">${motif}</text>
        <text x="200" y="250" text-anchor="middle" font-family="sans-serif" font-size="12" letter-spacing="2" fill="#55534d">PHOTO COMING SOON</text>
      </svg>`;
  }

  function renderGallery(items) {
    const grid = document.getElementById('gallery-grid');
    const filterRow = document.getElementById('gallery-filters');
    if (!grid) return;

    const motifs = ['All', ...Array.from(new Set(items.map((i) => i.motif)))];

    filterRow.innerHTML = motifs
      .map((m, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-motif="${m}">${m}</button>`)
      .join('');

    function draw(motif) {
      const filtered = motif === 'All' ? items : items.filter((i) => i.motif === motif);
      grid.innerHTML = filtered
        .map((item) => {
          const inner = item.placeholder
            ? `<div class="placeholder-card">${placeholderSVG(item.motif)}</div>`
            : `<img src="${item.image}" alt="${item.motif}${item.placement ? ' — ' + item.placement : ''} tattoo by Melange" loading="lazy">`;
          return `<div class="gallery-item" data-motif="${item.motif}">
            ${inner}
            <div class="gallery-caption">${item.motif}${item.placement ? ' · ' + item.placement : ''}</div>
          </div>`;
        })
        .join('');
    }

    draw('All');
    filterRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterRow.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      draw(btn.dataset.motif);
    });
  }

  function renderGuestSpots(data) {
    const regionRow = document.getElementById('region-row');
    const spotsEl = document.getElementById('spots-list');
    if (!regionRow || !spotsEl) return;

    regionRow.innerHTML = data.regions
      .map((r) => `<div class="region-chip"><span class="dot"></span>${r}</div>`)
      .join('');

    if (!data.spots || data.spots.length === 0) {
      spotsEl.innerHTML = `<div class="spots-empty">No confirmed guest spots right now — follow <a href="https://instagram.com/melange.tattoo" target="_blank" rel="noopener">@melange.tattoo</a> on Instagram for the next announced city.</div>`;
      return;
    }

    spotsEl.innerHTML = data.spots
      .map(
        (s) => `<div class="spot-card">
          <div><div class="city">${s.city}, ${s.country}</div><div style="color:var(--ink-soft);font-size:0.85rem;margin-top:0.2rem;">${s.dateRange || ''}</div></div>
          <div class="status">${s.status || 'Booking Open'}</div>
        </div>`
      )
      .join('');
  }

  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.parentElement.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  function initNav() {
    const header = document.getElementById('site-header');
    const toggle = document.getElementById('nav-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => header.classList.toggle('open'));
    header.querySelectorAll('.nav-links a').forEach((a) =>
      a.addEventListener('click', () => header.classList.remove('open'))
    );
  }

  async function loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return res.json();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    initFAQ();
    initNav();
    try {
      const gallery = await loadJSON('content/gallery.json');
      renderGallery(gallery);
    } catch (e) {
      console.error(e);
    }
    try {
      const guestSpots = await loadJSON('content/guest-spots.json');
      renderGuestSpots(guestSpots);
    } catch (e) {
      console.error(e);
    }
  });
})();
