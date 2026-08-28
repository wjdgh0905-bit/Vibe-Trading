# Agent Skills — 설치 구성

블로그·릴스에서 소개된 스킬 팩을 이 저장소에 적용했습니다.
`.claude/settings.json`(플러그인 6종) + `.claude/skills/`(Remotion 12종) 두 갈래로 구성됩니다.

## 1. 플러그인 (`.claude/settings.json`, project scope)

`extraKnownMarketplaces` + `enabledPlugins`에 선언되어 있어, 이 저장소에서 Claude Code를
실행하면 마켓플레이스를 자동으로 가져와 활성화합니다. (첫 실행 시 신뢰 확인 프롬프트가 뜹니다.)

| 플러그인 | 마켓플레이스 | 출처 | 스킬 수 |
|---|---|---|---|
| `superpowers` | `superpowers-marketplace` | `obra/superpowers-marketplace` | 14 |
| `marketing-skills` | `marketingskills` | `coreyhaines31/marketingskills` | 50 |
| `ui-ux-pro-max` | `ui-ux-pro-max-skill` | `nextlevelbuilder/ui-ux-pro-max-skill` | 7 |
| `claude-mem` | `thedotmack` | `thedotmack/claude-mem` | 19 |
| `taste-skill` | `taste-skill` | `Leonxlnx/taste-skill` | 13 |
| `impeccable` | `impeccable` | `pbakaus/impeccable` | 1 (+커맨드 23, 에이전트 4) |

- **superpowers** — 기획 → 계획 → 실행 → 검증 워크플로우. `/brainstorm`, `/write-plan`,
  `/execute-plan`, TDD·체계적 디버깅 등. SessionStart 훅 1개를 등록합니다.
- **marketing-skills** — 카피라이팅, SEO, CRO, 이메일 시퀀스, 광고, 분석 등 50종.
  스킬을 직접 부르지 않아도 요청 내용에 맞춰 자동 발동됩니다.
- **ui-ux-pro-max** — UI 스타일·컬러 팔레트·폰트 조합·UX 규칙 데이터베이스.
- **claude-mem** — 세션 간 컨텍스트 영속화. 훅 6개와 `mcp-search` MCP 서버를 등록하며,
  최초 실행 시 Setup 훅이 런타임을 자동 부트스트랩합니다.
  (블로그의 `npx claude-mem install` 대신 플러그인 경로로 설치했습니다 — 둘 중 하나만 하면 됩니다.)
- **taste-skill** — "AI 티" 나는 밋밋한 프론트엔드를 막는 안티슬롭 스킬 묶음.
  `brutalist-skill`·`minimalist-skill`·`soft-skill`로 톤을 고르고, `redesign-skill`로 기존 화면을
  다시 잡고, `image-to-code-skill`·`stitch-skill`로 시안을 코드로 옮깁니다. (https://tasteskill.dev)
- **impeccable** — Anthropic `frontend-design`에서 출발한 디자인 언어 스킬.
  `/impeccable polish`, `/impeccable audit`, `/impeccable critique` 등 커맨드 23개와
  안티패턴 탐지 규칙을 제공하며 PostToolUse·Stop 훅으로 자동 검사합니다. (https://impeccable.style)

  > 홈페이지 작업을 시작할 때 프로젝트 루트에서 `/impeccable init`을 한 번 실행하세요.
  > `PRODUCT.md`와 `DESIGN.md`를 만들어 브랜드·타깃·색·타이포를 고정해두면
  > 이후 커맨드들이 그 기준으로 동작합니다.

### 수동 재설치 / 갱신

```bash
claude plugin marketplace update            # 마켓플레이스 최신화
claude plugin update superpowers            # 개별 플러그인 갱신
claude plugin list                          # 설치 상태 확인
claude plugin details marketing-skills      # 스킬 목록과 토큰 비용 확인
```

## 2. Remotion 스킬 (`.claude/skills/`, 12종)

Remotion은 플러그인 마켓플레이스가 없어 스킬 파일을 저장소에 직접 넣었습니다.
`skills-lock.json`(저장소 루트)이 출처와 해시를 기록합니다.

`remotion-best-practices`(전체 라우터), `remotion-create`, `remotion-markup`,
`remotion-studio`, `remotion-render`, `remotion-maps`, `remotion-captions`,
`remotion-multimedia`, `remotion-interactivity`, `remotion-saas`,
`remotion-docs`, `remotion-upgrade`

```bash
npx skills experimental_install   # skills-lock.json 으로부터 복원
npx skills update                 # 최신 버전으로 갱신
npx skills remove remotion-maps   # 개별 제거
```

> Remotion 스킬은 실제 영상을 만들려면 Remotion 프로젝트(`npx create-video`)가 필요합니다.
> 이 저장소 안에서는 스킬 지식만 로드됩니다.

## 토큰 비용 참고

플러그인 6종의 상시 로드 비용은 세션당 약 19,300 토큰이며, 그중 `marketing-skills`가
약 13,500 토큰으로 대부분을 차지합니다. 트레이딩 작업에만 집중할 때는 아래로 끌 수 있습니다.

```bash
claude plugin disable marketing-skills      # 일시 비활성화
claude plugin enable  marketing-skills      # 다시 활성화
```

## 전체 제거

```bash
for p in superpowers marketing-skills ui-ux-pro-max claude-mem taste-skill impeccable; do
  claude plugin uninstall "$p" --scope project
done
rm -rf .claude/skills skills-lock.json
```
