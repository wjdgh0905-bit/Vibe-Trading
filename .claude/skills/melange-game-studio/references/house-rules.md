# House rules — details

These rules are the owner's product promise and the reason the games pass store and age-rating review. Apply them to every feature, text and reward, in every language build.

## 1. Money and risk
- Virtual money only. Never sell currency, never let real payments change risk outcomes, never offer cash-out or trading of items between players.
- Paid items (if a store ever allows IAP) are cosmetic or convenience only, shown with the exact item before purchase.
- Risk features (leverage, max-buy/영끌, loans, credit grades) must look and sound **calm**:
  - Show the downside next to the upside ("10배 · 청산 −9%").
  - Never celebrate taking risk; celebrate good decisions (selling on time, paying back).
  - After bankruptcy, retirement/prestige or any fresh start, reset risk pickers to the safe default (1×, not max-buy) so new money is not sent out at the old high risk.
  - Interest/fees are charged by the rule every time; no hidden skips (a skipped charge is a bug, but changing *when* it is charged is an economy change → owner approval).
- Bonuses must not stack into a risk-free exploit (e.g. a protective item does not work on max-buy rounds).

## 2. No gambling look or wording
- Avoid casino vocabulary in KO and EN: 판돈/베팅/잭팟/올인/대박 확률, bet, wager, jackpot, all-in, spin, slot, casino, gamble. Use 투자금 / buy amount / Max Buy / gift / reward.
  - Examples already applied: 판돈→투자금, 행운의 부적→안전 부적, all-in→Max Buy, "of your stake"→"of your buy".
- No slot-machine reels, roulette wheels, spinning reveals, coin showers tied to risk, flashing "WIN" banners.
- A timing mechanic like "sell before the crash" must read as a market/skill game: chart, news, partner commentary, history lessons — not a multiplier counter on a rocket.

## 3. No loot boxes or random reveals
- Rewards are **fixed and shown before** the player claims them (daily gift, chests, ad rewards, mission rewards).
- Random *events in gameplay* (market moves, crash timing, card shuffles) are fine; random *prizes* behind a reveal are not — not even cheap ones. If an old feature has random prizes, plan to convert it to fixed rewards (owner decision).

## 4. No dark patterns
- Gameplay clocks are fine (count-up preferred). Never tie a countdown to buying, ads or reward expiry.
- No fake urgency, countdown pressure to buy, guilt ("your pet is sad you left"), streak-loss threats, or app-icon badges/notifications to pull players back.
- No confirm-shaming ("No, I like losing money").
- Ads: off by default until an ad network is approved. When on: rewarded ads only on the player's tap, never during a round or a boss fight, capped per day, and the game must stay fully playable without them. Interstitials only at natural breaks and rare.
- Steam builds have **no ads at all** (Valve bans ad-based monetization and rewards for watching ads).

## 5. Numbers
- Every number on screen shows at most 2 decimals (money, %, multipliers, rates, times). Large numbers use the language's units (KO 만/억/조…, EN K/M/B/T or e-notation beyond) — never raw floats.
- Test this with a decimal scan across all screens (see testing.md).

## 6. Saves
- Old saves always load. Every save shape change needs a migration with a version key and a test that loads a save from the previous release.
- Storage failure (private mode, quota) must fall back to memory with a clear warning and a backup code, never a crash or silent loss.
- Import/restore is atomic: if it fails midway, the current progress stays.

## 7. Platform wording
| Platform | Must not mention | Use instead |
|---|---|---|
| Steam / PC | 광고/ads, browser, phone, home screen, iPhone, web URL, CrazyGames, AdSense, cookies | "this PC", copy result text only |
| CrazyGames | other sites, external links, donation | CrazyGames SDK features only |
| Android app | "browser", "add to home screen" | "this device / app" |
| Web | — | may mention ads only when ads are actually on |

## 8. Age rating and audience
- Target PEGI-12 / 12+ style content: no gore, no sexual content, mild cartoon conflict only.
- Finance themes: keep it educational (real crash history notes are good), never imply the game teaches how to get rich.
