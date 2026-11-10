# Apple Design (KR) 크롤링 분석

크롤링 일자: 2026-09-16 · 대상: https://developer.apple.com/kr/design/ · 184페이지 · 약 149만 자

## 1. 사이트 구조

| 영역 | 페이지 수 | 비고 |
| --- | --- | --- |
| 디자인 메인 / 시작하기 / 리소스 / What's new | 4 | 정적 HTML |
| Apple 디자인 어워드 (2020–2026) | 8 | 정적 HTML, 연도별 수상작 |
| Human Interface Guidelines (HIG) | 172 | DocC JSON 기반 SPA |

HIG는 6개 최상위 섹션으로 나뉩니다.

| 섹션 | 하위 페이지 |
| --- | --- |
| 시작하기 (getting-started) | 8 |
| 기본 사항 (foundations) | 18 |
| 패턴 (patterns) | 25 |
| 구성요소 (components) | 8 그룹 (실제 항목은 그룹 하위에 다수) |
| 입력 (inputs) | 13 |
| 기술 (technologies) | 29 |

페이지 역할: article 157, collectionGroup 14, collection 1.

## 2. 문서 형식의 규칙성

HIG 문서 172개 중 대부분이 동일한 골격을 따릅니다.

| 섹션 제목 | 등장 페이지 수 |
| --- | --- |
| 리소스 | 157 |
| 플랫폼 고려 사항 | 148 |
| 모범 사례 | 129 |
| 변경 기록 | 113 |

즉 "개요 → 모범 사례 → 플랫폼 고려 사항 → 리소스 → 변경 기록" 템플릿이 표준입니다. 기계 처리(RAG 청킹, 요약)에 유리한 구조입니다.

## 3. 플랫폼 언급 빈도 (HIG 본문)

| 플랫폼 | 언급 횟수 |
| --- | --- |
| visionOS | 610 |
| iOS | 442 |
| iPadOS | 436 |
| macOS | 411 |
| watchOS | 344 |
| tvOS | 287 |
| Liquid Glass | 82 |

visionOS가 가장 많이 언급됩니다. 각 문서의 "플랫폼 고려 사항" 절에서 visionOS 전용 지침이 별도 문단으로 반복되기 때문입니다.

## 4. 가장 긴 문서 (자 수)

| 페이지 | 자 수 |
| --- | --- |
| typography | 37,476 |
| whats-new | 35,815 |
| wallet | 32,095 |
| widgets | 31,897 |
| color | 30,122 |
| apple-pay | 28,347 |
| live-activities | 25,336 |
| complications | 24,169 |

타이포그래피·색상 같은 기본 사항과 Wallet·Apple Pay 같은 기술 문서가 명세표 때문에 가장 깁니다. HIG 전체 이미지 참조는 3,704개입니다.

## 5. What's new 변경 이력 (416건)

| 유형 | 건수 |
| --- | --- |
| Guidance (HIG 갱신) | 300 |
| Articles | 46 |
| Videos | 37 |
| Resources (UI Kit, 도구) | 33 |

날짜별 최다: 2023-06-05 (51건), 2023-06-21 (50건), 2024-06-10 (39건), 2025-06-09 (36건), 2026-06-08 (22건). 매년 6월 WWDC 직후 대규모 갱신이 일어나는 패턴이 뚜렷합니다.

최신 변경 (2026-09-09): Designing for iPhone Duo 신규, Layout·Branding·SharePlay 갱신.
2026-06: Icon Composer 2 beta, SF Symbols 8 beta, Pass Designer, iOS 27 / macOS 27 UI Kit.

## 6. 한국어판 vs 영문판 차이

| 항목 | 영문 | 한국어 |
| --- | --- | --- |
| HIG 페이지 수 | 173 | 172 |
| 누락 | – | designing-for-iphone-duo (2026-09-09 신규) |

한국어판은 최신 신규 페이지 1건만 미번역 상태이며, 나머지 172페이지는 제목·요약이 모두 한국어로 번역되어 있습니다. What's new 페이지 자체는 `/kr/` 경로에서도 영문으로 제공됩니다.

## 7. 활용 제안

- HIG 172개 문서는 섹션 구조가 일정하므로 "모범 사례" 절만 추출해 디자인 체크리스트를 만들 수 있습니다.
- `index.json`의 `links`로 페이지 간 그래프를 구성하면 구성요소 ↔ 패턴 ↔ 기술 관계를 탐색할 수 있습니다.
- 매년 6월 이후 재크롤링하면 대부분의 변경을 한 번에 반영할 수 있습니다.
