#!/usr/bin/env bash
# 이 저장소에 설정된 에이전트 스킬을 내 컴퓨터에 설치한다.
# git pull 이후 한 번만 실행하면 된다. 여러 번 실행해도 안전하다.
# 자세한 내용: .claude/SKILLS.md
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

fail=0

echo "==> 1/3 마켓플레이스 등록"
while read -r repo; do
  printf '  %-40s ' "$repo"
  if out=$(claude plugin marketplace add "$repo" --scope project 2>&1); then
    echo "ok"
  else
    echo "실패"; echo "$out" | tail -2 | sed 's/^/      /'; fail=1
  fi
done <<'REPOS'
obra/superpowers-marketplace
coreyhaines31/marketingskills
nextlevelbuilder/ui-ux-pro-max-skill
thedotmack/claude-mem
Leonxlnx/taste-skill
pbakaus/impeccable
REPOS

echo "==> 2/3 플러그인 설치"
for p in superpowers@superpowers-marketplace \
         marketing-skills@marketingskills \
         ui-ux-pro-max@ui-ux-pro-max-skill \
         claude-mem@thedotmack \
         taste-skill@taste-skill \
         impeccable@impeccable; do
  printf '  %-40s ' "$p"
  if out=$(claude plugin install "$p" --scope project -y 2>&1); then
    echo "ok"
  else
    echo "실패"; echo "$out" | tail -2 | sed 's/^/      /'; fail=1
  fi
done

echo "==> 3/3 직접 설치 스킬 확인 (.claude/skills/)"
missing=0
for s in ffmpeg video-editing remotion-best-practices agent-reach; do
  [ -f ".claude/skills/$s/SKILL.md" ] || { echo "  없음: $s"; missing=1; }
done
if [ "$missing" -eq 1 ]; then
  echo "  -> npx skills experimental_install 로 복원하세요"
  fail=1
else
  echo "  ok ($(find .claude/skills -maxdepth 1 -mindepth 1 -type d | wc -l)종)"
fi

echo "==> 4/4 MCP 서버 확인 (.mcp.json)"
if [ -f ".mcp.json" ]; then
  echo "  ok (.mcp.json 은 git 에 커밋돼 있어 별도 설치 불필요 — 첫 실행 시 신뢰 승인만 하면 됨)"
else
  echo "  없음: .mcp.json"; fail=1
fi

echo
if [ "$fail" -eq 0 ]; then
  echo "완료. Claude Code 를 재시작하면 스킬이 로드됩니다."
else
  echo "일부 실패. 위 메시지를 확인하세요."
fi
echo "홈페이지 작업 시작 전에 /impeccable init 을 한 번 실행하세요."
exit "$fail"
