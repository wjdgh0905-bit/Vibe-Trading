# Agent Skills — 설치 구성

블로그·릴스에서 소개된 스킬 팩을 이 저장소에 적용했습니다.
`.claude/settings.json`(플러그인 6종) + `.claude/skills/`(직접 설치 15종) 두 갈래로 구성됩니다.

## 0. 내 컴퓨터에 적용하기 (git pull 이후 1회)

이 저장소가 들고 있는 건 **설정과 스킬 파일**이지, 플러그인 본체가 아닙니다.
플러그인 실체는 각자 머신의 `~/.claude/plugins/` 에 받아야 하므로 아래를 한 번 실행하세요.

```bash
git pull
./.claude/setup-skills.sh     # 여러 번 실행해도 안전
```

그리고 **Claude Code 를 재시작**하세요. 스킬·훅·플러그인은 세션이 시작될 때
한 번만 읽히기 때문에, 이미 열려 있는 세션에는 반영되지 않습니다.

| 상황 | 반영 여부 |
|---|---|
| 이 저장소에서 새로 연 세션 | 반영됨 |
| 이 저장소에서 이미 열려 있던 세션 | 재시작 필요 |
| 다른 프로젝트 폴더 | 반영 안 됨 (project scope) |

다른 프로젝트에서도 쓰려면 `--scope user` 로 다시 설치하면 됩니다.

```bash
claude plugin install superpowers@superpowers-marketplace --scope user
```

---

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

## 2. 직접 설치 스킬 (`.claude/skills/`, 14종)

### Remotion (12종)

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

### 영상 기본 세팅 — FFmpeg · Whisper (2종)

Remotion(모션·렌더)과 합쳐 FFmpeg(컷·변환·인코딩) + Whisper(음성 전사·자막)
3종 세트를 이룹니다. 마켓플레이스가 없어 파일을 직접 넣었습니다.

| 스킬 | 출처 | 하는 일 |
|---|---|---|
| `ffmpeg` | `digitalsamba/claude-code-video-toolkit` (MIT) | 포맷 변환, 리사이즈, 압축, 오디오 추출, GIF→MP4, 플랫폼별 인코딩 프리셋 |
| `video-editing` | `6missedcalls/video-editing-skill` (MIT) | 트림, 점프컷(무음 제거), Whisper 자막 생성·번인, 텍스트 오버레이, 속도 조절 |

`video-editing`은 순수 Bash 스크립트 6개(`scripts/`)로 되어 있고, 네트워크 호출이나
외부 런타임 없이 `ffmpeg`만 호출합니다. 원본 SKILL.md에 프론트매터가 없어
`name`/`description`을 추가했습니다.

**실행 전 로컬에 바이너리가 필요합니다.**

```bash
# macOS
brew install ffmpeg
pipx install openai-whisper     # 또는 brew install whisper-cpp

# Ubuntu/Debian
sudo apt install ffmpeg
pipx install openai-whisper
```

```bash
# 사용 예시 — 자연어로 시키면 알아서 스크립트를 조합합니다
"~/clip.mp4 무음 구간 빼고 hormozi 스타일 자막 넣어서 1.25배속으로 만들어줘"
```

### Agent Reach — 인터넷 여러 플랫폼 읽기 (1종)

`Panniantong/Agent-Reach` (MIT, GitHub 트렌딩 1위). 트위터/X, Reddit, 유튜브,
깃허브, RSS 등 15개 플랫폼의 글을 가져오는 스킬입니다. "이 트윗 스레드 요약해줘",
"레딧에 이 종목 관련 반응 찾아줘" 처럼 시키면 자동으로 발동됩니다.

```bash
"이 코인 관련해서 레딧 반응 좀 찾아줘"
"이 유튜브 영상 자막 요약해줘"
```

**동작 방식 참고:**
- 웹페이지·유튜브·깃허브·RSS는 설정 없이 바로 됩니다 (공개 API/도구 사용).
- 트위터·Reddit·LinkedIn·샤오홍슈는 **본인 브라우저 쿠키**로 로그인 세션을 재사용합니다.
  본인 계정으로 보는 것과 동일하지만, 자동화된 접근이라 해당 플랫폼 이용약관과
  마찰이 있을 수 있다는 점은 알아두세요. 쿠키는 로컬에만 저장되고 업로드되지 않습니다.

**실행 전 필요:**

```bash
pip install https://github.com/Panniantong/agent-reach/archive/main.zip
agent-reach doctor --json     # 어떤 플랫폼이 바로 되는지 확인
```

---

### Playwright CLI — AI가 직접 브라우저로 확인 (로컬 설치, 스킬 아님)

마이크로소프트 공식 CLI입니다. `.claude/skills/`에 넣을 수 있는 게 아니라
전역 npm 도구라서, 로컬 PC에서 한 번 설치해두면 Claude Code가 직접 스크린샷을 찍어
자기가 만든 화면을 검증합니다. 홈페이지 작업 시 특히 유용합니다.

```bash
npm install -g @playwright/cli@latest
playwright-cli install --skills
```

---

## 3. MCP 서버 (`.mcp.json`, project scope)

| 서버 | 출처 | 하는 일 |
|---|---|---|
| `context7` | `@upstash/context7-mcp` | 라이브러리·프레임워크의 최신 공식 문서를 실시간으로 가져와 컨텍스트에 주입. 학습 데이터가 오래돼서 생기는 API 환각(존재하지 않는 함수 지어내기)을 줄여줌 |

세션 시작 시 자동 연결되고, 최초 1회 "Pending approval" 승인만 하면 됩니다
(`claude` 실행 후 뜨는 프롬프트에서 신뢰 확인). API 키 없이도 동작하며,
요청량이 많아지면 [context7.com/dashboard](https://context7.com/dashboard)에서
무료 키를 받아 `.mcp.json`의 `args`에 `--api-key`를 추가하면 됩니다.

## 4. 검토 후 보류한 것 — 필요할 때 직접 설치

아래 둘은 이 저장소(트레이딩 앱) 성격과 안 맞거나, 실행 자체가 위험 부담이 있어
지금은 설치하지 않고 방법만 적어둡니다.

### Strix — AI 자동 침투테스트 (보류)

"AI 해커"가 자율적으로 앱을 공격해 취약점을 찾고 **고치기까지** 하는 도구입니다.
설치 자체는 가볍지만, 실행하려면:

- **Docker 데몬 필요** — 이 원격 실행 환경 컨테이너엔 Docker 데몬이 없어 지금은 돌릴 수 없습니다.
- **AI API 키 필요** — Anthropic/OpenAI 키를 소비하며 스캔을 돌립니다.
- **실제 트레이딩 API·거래소 연동에 부하**를 줄 수 있습니다. 자율 에이전트가
  코드를 직접 고치기도 하므로, 사람 확인 없이 돌리면 리스크가 있습니다.

로컬 PC(Docker 있는 곳)에서 직접 판단해 설치하세요.

```bash
pip install strix-agent      # 또는 pipx install strix-agent
# 사용 전 Docker Desktop 실행 + ANTHROPIC_API_KEY/OPENAI_API_KEY 설정 필요
# https://github.com/usestrix/strix
```

### Supabase Plugin (보류)

이 저장소는 Supabase를 쓰지 않아(코드 전체 검색 결과 없음) 설치하지 않았습니다.
나중에 Supabase로 DB를 옮기게 되면:

```bash
npx plugins add supabase-community/supabase-plugin
```

### Skill UI — 마음에 드는 사이트 디자인을 스킬로 추출 (설치 불필요, 그때그때 실행)

상시 설치하는 스킬이 아니라 **분석하고 싶은 사이트가 생겼을 때** 그 자리에서
`npx`로 실행하는 CLI입니다. 홈페이지 리뉴얼 시안이 정해지면 이렇게 쓰세요.

```bash
npx skillui https://참고하고싶은사이트.com
# → DESIGN.md, <이름>.skill 생성
# → cd 해당폴더 && claude 실행하면 자동으로 그 디자인 시스템을 따라감
```

`taste-skill`·`impeccable`·`ui-ux-pro-max`(이미 설치됨)와 같이 쓰면
"이 사이트처럼 만들어줘" 한 줄로 참고 사이트의 색·폰트·컴포넌트를 그대로 가져올 수 있습니다.

---

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
