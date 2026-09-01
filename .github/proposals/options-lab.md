# 제안: Options Lab (변동성 표면 · Greeks 대시보드 · 페이오프/시나리오 탐색기)

- **상태**: 제안 (Draft)
- **로드맵 항목**: `Options Lab` — Vol surface, Greeks dashboard, payoff/scenario explorer (현재 `Planned`)
- **작성일**: 2026-08-31

## 1. 배경

Vibe-Trading은 이미 옵션 관련 백엔드 구성요소를 상당수 보유하고 있습니다.

- `agent/src/tools/options_chain_tool.py`: 종목별 옵션 체인(행사가, 만기, `implied_volatility` 등)을 조회하는 MCP/agent 도구
- `agent/src/tools/options_pricing_tool.py`: Black-Scholes 이론가 및 Greeks(delta/gamma/theta/vega) 계산 도구
- `agent/src/skills/options-payoff/`, `options-strategy/`, `options-advanced/`: 페이오프 구조·전략 스킬
- `agent/backtest/engines/options_portfolio.py`: 옵션 포트폴리오 백테스트 엔진
- 파생상품 관련 swarm preset(`derivatives_strategy_desk.yaml`, `convertible_bond_team.yaml`)

반면 Web UI(`frontend/src/pages/`)에는 이 데이터를 시각화하는 화면이 없습니다. 사용자는 옵션 관련 분석을 오직 채팅으로 에이전트에게 요청해 텍스트/표 형태로만 받을 수 있고, 변동성 표면이나 페이오프 다이어그램처럼 시각적으로 파악해야 하는 정보를 그래프로 직접 볼 수 없습니다. 로드맵에는 `Options Lab`이 `Planned`로 이미 등재되어 있으나 착수되지 않은 상태입니다.

## 2. 목표

기존 백엔드 도구를 재사용해, 다음 세 가지 뷰를 제공하는 새 Web UI 페이지 `Options Lab`(`/options`)을 추가합니다.

1. **Vol Surface (변동성 표면)**: 특정 종목의 만기 × 행사가에 따른 implied volatility를 3D surface 또는 heatmap으로 시각화
2. **Greeks Dashboard**: 옵션 체인 전체 또는 사용자가 구성한 포지션(다리, leg) 묶음의 delta/gamma/theta/vega를 합산해 표/차트로 표시
3. **Payoff & Scenario Explorer**: 콜/풋/스프레드 등 여러 leg로 구성된 전략의 만기 손익 곡선을 그리고, 기초자산 가격·변동성·경과일을 슬라이더로 조정하며 시나리오를 즉시 재계산

## 3. 범위 (In Scope)

- `GET /options/chain?symbol=&expiration=`: `OptionsChainTool`을 감싸는 REST 엔드포인트 (조회 전용)
- `POST /options/surface`: 종목의 전체 만기에 대한 옵션 체인을 모아 `(expiry, strike, iv)` 격자를 반환 (`OptionsChainTool` 다건 호출 + 캐싱)
- `POST /options/greeks`: leg 배열(spot, strike, expiry, iv, type, quantity)을 받아 `OptionsPricingTool`의 BS 계산을 재사용해 개별/합산 Greeks 반환
- `POST /options/payoff`: 동일한 leg 배열과 가격/변동성/경과일 범위를 받아 만기 및 임의 시점 손익 곡선 데이터 반환
- 프런트엔드: `frontend/src/pages/OptionsLab.tsx` + 좌측 네비게이션 항목 추가, 기존 차트 라이브러리(RunDetail/AlphaZoo에서 쓰는 것과 동일한 스택) 재사용
- 읽기 전용 기능만 다룸 — 실주문 제출과는 완전히 분리 (기존 `trading_place_order`/mandate 게이트에 영향 없음)

## 4. 범위 제외 (Out of Scope)

- 옵션 실주문 제출/브로커 연동 (기존 connector 레이어의 별도 논의 필요)
- 미국 외 시장의 옵션 데이터 소스 확장 (1차 버전은 기존 yfinance 기반 체인 데이터로 한정)
- 변동성 모델링 고도화(SVI, SABR 등 파라메트릭 곡선 피팅)는 2차 이후 과제로 분리

## 5. 구현 개요

### 5.1 백엔드
- 새 라우터 `agent/api/routers/options.py`에 위 4개 엔드포인트 추가 (기존 `runs`, `alpha` 라우터와 동일한 패턴)
- `/options/surface`, `/options/greeks`, `/options/payoff`는 순수 계산/집계이므로 `OptionsChainTool`·`OptionsPricingTool`을 그대로 호출하고 agent 실행(run) 리소스는 소비하지 않음
- 만기별 체인 다건 조회 시 짧은 TTL 캐시(기존 `VIBE_TRADING_DATA_CACHE`와 별개의 인메모리 캐시)를 둬 표면 렌더링 시 반복 조회 비용을 줄임

### 5.2 프런트엔드
- `OptionsLab.tsx`: 종목/만기 선택 → surface 조회 → heatmap 렌더링
- leg builder 컴포넌트: 콜/풋/수량/행사가/만기를 추가·삭제하며 실시간으로 `/options/greeks`, `/options/payoff` 재호출
- 슬라이더(기초자산 가격, IV, 경과일)로 시나리오 재계산 — 디바운스 처리로 과도한 API 호출 방지

### 5.3 테스트
- 백엔드: 새 라우터에 대한 API 테스트(`agent/tests/test_options_*`) — 정상 응답, 잘못된 심볼/만기, 빈 체인 처리
- 프런트엔드: `frontend/src/pages/__tests__/`에 vitest 컴포넌트 테스트 추가 (leg 추가/삭제, 슬라이더 변경 시 payoff 곡선 갱신)

## 6. 리스크 및 고려사항

- **데이터 공급자 한계**: yfinance 옵션 데이터는 실시간이 아니며 유동성 낮은 종목은 IV가 결측되거나 이상치일 수 있음 → 결측/이상치는 그래프에서 명시적으로 표시(회색 처리)하고 에러로 취급하지 않음
- **계산 비용**: 만기가 많은 종목의 전체 표면 조회는 체인 API를 여러 번 호출해야 함 → 캐싱 + 사용자가 명시적으로 "표면 불러오기"를 눌러야 조회 시작
- **UI 복잡도**: 3D surface는 라이브러리 선택(예: 기존 스택에 plotly/echarts 계열이 있는지 확인 필요)에 따라 1차 버전은 heatmap(2D)으로 축소하고 3D는 후속 반복으로 미룰 수 있음

## 7. 단계별 출시 계획

| 단계 | 내용 |
|------|------|
| 1단계 | `/options/chain`, `/options/greeks` REST 엔드포인트 + Greeks Dashboard 화면 |
| 2단계 | Payoff & Scenario Explorer (leg builder, 슬라이더) |
| 3단계 | Vol Surface heatmap, 이후 3D 표면 |

## 8. 열린 질문

- 표면/Greeks 계산에 쓰이는 무위험 이자율(r)과 배당수익률을 사용자가 직접 입력하게 할지, 기본값(예: 0)을 둘지
- 다리(leg)를 저장해 재사용하는 "전략 프리셋" 기능을 1차 버전에 포함할지, 이후 `Community` 로드맵 항목과 묶을지

---

이 문서는 논의를 위한 초안이며, 합의된 범위로 GitHub Issue를 열어 트래킹하는 것을 제안합니다.
