# Vibe-Trading 저장소의 스킬 구성을 이 컴퓨터 전역(~/.claude)에 완전 동기화한다.
# 언제든 다시 실행하면 최신 상태로 정확히 맞춰진다 (robocopy /MIR: 추가·수정·삭제 전부 반영).
# 사용법: 이 파일을 받아서 PowerShell에서 실행
#   irm https://raw.githubusercontent.com/wjdgh0905-bit/Vibe-Trading/claude/skill-application-bot46l/.claude/setup-skills-global.ps1 | iex

$ErrorActionPreference = "Stop"
$branch = "claude/skill-application-bot46l"
$repoUrl = "https://github.com/wjdgh0905-bit/Vibe-Trading.git"
$tmp = Join-Path $env:TEMP "vibe-trading-skills-sync"
$globalSkills = Join-Path $env:USERPROFILE ".claude\skills"

Write-Host "==> 1/3 저장소에서 최신 스킬 받는 중"
if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
git clone --branch $branch --single-branch --depth 1 $repoUrl $tmp
if ($LASTEXITCODE -ne 0) { Write-Host "실패: git clone"; exit 1 }

Write-Host "==> 2/3 전역 스킬 폴더 미러링 ($globalSkills)"
New-Item -ItemType Directory -Force -Path $globalSkills | Out-Null
robocopy "$tmp\.claude\skills" $globalSkills /MIR /NFL /NDL /NJH /NJS | Out-Null
$robocopyExit = $LASTEXITCODE
Remove-Item -Recurse -Force $tmp
if ($robocopyExit -ge 8) {
    Write-Host "실패: robocopy (코드 $robocopyExit)"
    exit 1
}
Write-Host "  ok"

Write-Host "==> 3/3 플러그인 8개 전역 동기화"
$marketplaces = @(
    "obra/superpowers-marketplace",
    "coreyhaines31/marketingskills",
    "nextlevelbuilder/ui-ux-pro-max-skill",
    "thedotmack/claude-mem",
    "Leonxlnx/taste-skill",
    "pbakaus/impeccable",
    "anthropics/claude-plugins-official",
    "chopratejas/headroom"
)
foreach ($m in $marketplaces) {
    Write-Host "  marketplace: $m"
    claude plugin marketplace add $m --scope user | Out-Null
}

$plugins = @(
    "superpowers@superpowers-marketplace",
    "marketing-skills@marketingskills",
    "ui-ux-pro-max@ui-ux-pro-max-skill",
    "claude-mem@thedotmack",
    "taste-skill@taste-skill",
    "impeccable@impeccable",
    "claude-code-setup@claude-plugins-official",
    "headroom@headroom-marketplace"
)
foreach ($p in $plugins) {
    Write-Host "  plugin: $p"
    claude plugin install $p --scope user -y | Out-Null
}

Write-Host "==> 4/4 고급 기능 전역 적용 (모든 프로젝트 공통)"
$globalSettingsPath = Join-Path $env:USERPROFILE ".claude\settings.json"
$advanced = @{
    enableWorkflows            = $true
    enableArtifact              = $true
    alwaysThinkingEnabled       = $true
    autoCompactEnabled          = $true
    precomputeCompactionEnabled = $true
    fastMode                    = $true
    promptCacheTtl              = "1h"
    ultracode                   = $true
    workflowSizeGuideline       = "large"
}

function Set-JsonProperty($obj, [string]$name, $value) {
    if ($obj.PSObject.Properties.Name -contains $name) {
        $obj.$name = $value
    } else {
        $obj | Add-Member -MemberType NoteProperty -Name $name -Value $value
    }
}

$settings = if (Test-Path $globalSettingsPath) {
    Get-Content $globalSettingsPath -Raw | ConvertFrom-Json
} else {
    New-Object PSObject
}
foreach ($key in $advanced.Keys) {
    Set-JsonProperty $settings $key $advanced[$key]
}
if (-not ($settings.PSObject.Properties.Name -contains "permissions")) {
    Set-JsonProperty $settings "permissions" (New-Object PSObject)
}
Set-JsonProperty $settings.permissions "defaultMode" "auto"

New-Item -ItemType Directory -Force -Path (Split-Path $globalSettingsPath) | Out-Null
$settings | ConvertTo-Json -Depth 20 | Set-Content -Path $globalSettingsPath -Encoding utf8
Write-Host "  ok ($globalSettingsPath)"

Write-Host ""
Write-Host "완료. 열려 있는 Claude Code 세션은 재시작해야 반영됩니다."
Write-Host "다시 동기화하고 싶으면 이 스크립트를 그냥 다시 실행하면 됩니다."
Write-Host "이제 이 컴퓨터의 모든 프로젝트에서 스킬·플러그인·고급기능이 동일하게 적용됩니다."
