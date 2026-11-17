# Store, ad and rating policy checklist

Policies move; verify anything decision-critical with a fresh WebSearch (official sites like partner.steamgames.com, support.google.com and grac.or.kr may be blocked from the container — use search results and cite them).

## Web (own site)
- Ads: Google AdSense **H5 Games Ads** (Ad Placement API, beta): rewarded + interstitial at natural breaks only. Needs AdSense approval, `ads.txt`, EU consent (CMP), privacy policy. Keep `CFG.adClient=''` until approved.
- AdSense terms list Android Trusted Web Activities / Custom Tabs as supported viewing frames, so the same ads can run inside the TWA.

## CrazyGames
- SDK v3 only; their ad calls; no other ad networks, no external links or donations. Exclusivity deals may limit other platforms and the English title — check the contract before reusing names on Steam/Play.

## Google Play
- Target API 36. Personal accounts: closed test with 12 testers × 14 days.
- Families/kids policy: declare "not designed for children" for finance/risk themes.
- Ads in app = follow Play ads policy (no unexpected full-screen ads, no ads that mimic UI).
- Simulated gambling: virtual currency with no cash-out is allowed but must not look like a casino; content rating questionnaire answers must be honest.

## Steam
- **No ads as a business model, no rewards for watching ads** (Valve rule, Feb 2025). Product placement/cross-promo only.
- No selling access to Steam features, no external payment links. Paid or F2P (IAP through Steam only).
- Content survey: describe simulated-gambling-like mechanics honestly; mature-content flags affect visibility.
- English store page first; Korean as an extra language.

## South Korea
- Games sold to Korean users need a GRAC rating (or a self-rating operator). Check whether the store handles it (Google Play: IARC covers it; Steam: verify current status).
- Avoid anything that could be judged 사행성 (gambling-like): no cash-out, no paid random boxes, no casino imagery, no "bet" words. Leverage/crash mechanics are the main risk — keep them calm and educational.

## Ad / monetization decision table
| Platform | Ads | IAP | Donate link |
|---|---|---|---|
| Web | AdSense H5 when approved (opt-in rewarded + rare interstitial) | no | allowed |
| CrazyGames | CrazyGames SDK only | no | no |
| Android TWA | same as web (AdSense in TWA) | Play Billing only | no |
| Steam | **never** | Steam only (or none) | no |
