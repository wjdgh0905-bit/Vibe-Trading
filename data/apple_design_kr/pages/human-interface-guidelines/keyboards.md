# 키보드

Source: https://developer.apple.com/kr/design/human-interface-guidelines/keyboards

> 실제 키보드는 텍스트 입력, 게임 플레이, 앱 제어 등을 위한 중요한 입력 기기가 될 수 있습니다.

![키보드의 스케치가 키보드 입력을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 보라색을 은은하게 반영하는 보라색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/inputs-keyboard-intro@2x.png)

사람들은 Apple Watch를 제외한 모든 기기에 실제 키보드를 연결할 수 있습니다. Mac 사용자는 항상 실제 키보드를 사용하는 편이고, iPad 사용자는 자주 사용합니다. 대다수의 게임은 실제 키보드와 원활하게 작동하며 입력해야 할 텍스트가 많은 경우 사람들은 [가상 키보드](https://developer.apple.com/kr/design/human-interface-guidelines/virtual-keyboards)보다 실제 키보드를 사용하는 것을 선호할 수 있습니다.

키보드 사용자는 앱 및 게임에서 빠르게 상호작용하기 위해 키보드 단축키를 더 자주 사용하려고 합니다. *키보드 단축키*는 특정 명령에 매핑되는 기본 키와 하나 이상의 보조 키(Control, Option, Shift, Command)를 조합하여 누르는 것입니다. *키 바인딩*이라고 하는 게임의 키보드 단축키는 단일 키로 구성된 경우가 많습니다.

Apple은 시스템과 대부분의 앱에서 일관되게 작동하도록 표준 키보드 단축키를 정의하여 사람들이 본인의 지식을 새로운 환경에 전달할 수 있도록 지원합니다. 일부 앱에서는 사람들이 가장 자주 사용하는 앱별 명령에 대해 사용자 설정 키보드 단축키를 정의하며, 대부분의 게임에서는 빠르고 효율적으로 키보드를 사용할 수 있는 사용자 설정 키 바인딩을 정의하여 게임을 제어합니다. 지침을 보려면 [키보드](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls#Keyboards)의 내용을 참조하십시오.

## 모범 사례

**가능한 경우 전체 키보드 접근을 지원하십시오.** iOS, iPadOS, macOS 및 visionOS에서 지원하는 전체 키보드 접근을 사용하면 키보드 하나로 윈도우, 메뉴, 제어기, 시스템 기능을 탐색하고 활성화할 수 있습니다. 앱 또는 게임에서 전체 키보드 접근을 테스트하려면 시스템에서 제공하는 설정 앱의 손쉬운 사용 영역에서 해당 기능을 켜십시오. 개발자 지침을 보려면 [Support Full Keyboard Access in your iOS app](https://developer.apple.com/videos/play/wwdc2021/10120/) 및 [isFullKeyboardAccessEnabled](https://developer.apple.com/documentation/appkit/nsapplication/isfullkeyboardaccessenabled)의 내용을 참조하십시오.

> **중요:** iPadOS는 텍스트 필드, 텍스트 보기, 사이드바에서 키보드 탐색을 지원하고, 제공되는 API를 활용하여 모음 보기 및 기타 사용자 지정 보기에서 이 기능을 지원할 수 있지만 버튼, 구분 제어기, 스위치 등의 제어기에 대해 키보드 탐색을 지원하지 마십시오. 대신 전체 키보드 접근을 사용하여 제어기를 활성화하고, 모든 화면상 요소로 이동하고, 드래그 앤 드롭 등의 제스처 기반 상호 작용을 수행하도록 지원하십시오. 지침을 보려면 [iPadOS](https://developer.apple.com/kr/design/human-interface-guidelines/focus-and-selection#iPadOS)의 내용을 참조하십시오. 개발자 지침을 보려면 [Focus-based navigation](https://developer.apple.com/documentation/uikit/focus-based_navigation)의 내용을 참조하십시오.

**표준 키보드 단축키를 반영하십시오.** 대부분의 앱을 사용하는 동안 사람들은 일반적으로 다른 앱과 시스템 전체에서 작동하는 표준 키보드 단축키를 사용하고 싶어합니다. 앱에서 사람들이 자주 사용하는 고유한 동작을 제공하는 경우, 다른 동작과 연관 지어 생각하는 표준 단축키를 임의로 할당하는 대신 [사용자 설정 키보드 단축키](https://developer.apple.com/kr/design/human-interface-guidelines/keyboards#Custom-keyboard-shortcuts) 단축키를 만드는 것이 좋습니다. 게임을 플레이하는 동안 사람들은 특정한 표준 키보드 단축키(예: 게임 종료 시 Command–Q)를 사용할 것이라고 예상하면서도 개인 플레이 스타일에 맞게 각 게임의 키 바인딩을 수정할 수 있을 것이라고도 예상할 수 있습니다. 지침을 보려면 [키보드](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls#Keyboards)의 내용을 참조하십시오.

## 표준 키보드 단축키

**일반적으로, 표준 키보드 단축키를 사용자 설정 동작에 임의로 할당하지 마십시오.** 익숙한 단축키가 앱이나 게임에서 다르게 작동할 경우 혼란이 생길 수 있습니다. 표준 단축키 동작이 환경에 적합하지 않은 경우에만 해당 단축키의 재정의를 고려하십시오. 예를 들어 앱에서 텍스트 편집을 지원하지 않고 이탤릭체 등 텍스트 스타일 명령이 필요하지 않을 경우, 정보 가져오기와 같이 더욱 관련이 많은 동작에 Command–I를 사용할 수 있습니다.

사람들은 다음 표준 키보드 단축키가 각각 아래 표에 나열된 동작을 수행할 것을 예상합니다.

| 기본 키 | 키보드 단축키 | 동작 |
| --- | --- | --- |
| 스페이스 | Command-스페이스 | Spotlight 검색 필드를 표시하거나 가림 |
|  | Shift-Command-스페이스 | 달라질 수 있음 |
|  | Option-Command-스페이스 | Spotlight 검색 결과 윈도우를 표시함 |
|  | Control-Command-스페이스 | 특수 문자 윈도우를 표시함 |
| Tab | Shift-Tab | 반대 방향으로 제어기를 탐색함 |
|  | Command-Tab | 열린 앱 목록에서 다음 최근 사용 앱으로 이동함 |
|  | Shift-Command-Tab | 열린 앱 목록(최근 사용 순서로 정렬)에서 이전으로 이동함 |
|  | Control-Tab | 초점을 대화상자의 다음 제어기 그룹으로 이동하거나 다음 표로 이동함(Tab이 다음 셀로 이동할 경우) |
|  | Control-Shift-Tab | 초점을 이전 제어기 그룹으로 이동함 |
| Esc | Esc | 현재 동작 또는 프로세스를 취소함 |
| Esc | Option-Command-Esc | 강제 종료 대화상자 열기 |
| 추출 | Control-Command-추출 | 모든 앱을 종료(열린 문서의 변경 사항이 저장된 다음)하고 컴퓨터를 재시작함 |
|  | Control-Option-Command-추출 | 모든 앱을 종료(열린 문서의 변경 사항이 저장된 다음)하고 컴퓨터를 종료함 |
| F1 | Control-F1 | 전체 키보드 접근을 켜거나 끔 |
| F2 | Control-F2 | 초점을 메뉴 막대로 이동함 |
| F3 | Control-F3 | 초점을 Dock으로 이동함 |
| F4 | Control-F4 | 초점을 활성 윈도우(또는 다음 윈도우)로 이동함 |
|  | Control-Shift-F4 | 초점을 이전 활성 윈도우로 이동함 |
| F5 | Control-F5 | 초점을 도구 막대로 이동함 |
|  | Command-F5 | VoiceOver를 켜거나 끔 |
| F6 | Control-F6 | 초점을 첫 번째 패널(또는 다음 패널)로 이동함 |
|  | Control-Shift-F6 | 초점을 이전 패널로 이동함 |
| F7 | Control-F7 | 일시적으로 윈도우 및 대화상자에서 현재 키보드 접근 모드보다 우선시함 |
| F8 |  | 달라질 수 있음 |
| F9 |  | 달라질 수 있음 |
| F10 |  | 달라질 수 있음 |
| F11 |  | 데스크탑을 표시함 |
| F12 |  | 대시보드를 가리거나 표시함 |
| 억음 악센트(`) | Command-억음 악센트 | 가장 앞에 있는 앱에서, 열려 있는 다음 윈도우를 활성화함 |
|  | Shift-Command-억음 악센트 | 가장 앞에 있는 앱에서, 열려 있는 이전 윈도우를 활성화함 |
|  | Option-Command-억음 악센트 | 초점을 윈도우 보관함으로 이동함 |
| 하이픈(-) | Command-하이픈 | 선택의 크기를 감소시킴 |
|  | Option-Command-하이픈 | 화면 확대/축소가 켜져 있을 때 화면을 축소함 |
| 왼쪽 중괄호({) | Command-왼쪽 중괄호 | 선택 항목을 왼쪽 정렬함 |
| 오른쪽 중괄호(}) | Command-오른쪽 중괄호 | 선택 항목을 오른쪽 정렬함 |
| 파이프(|) | Command-파이프 | 선택 항목을 중앙 정렬함 |
| 콜론(:) | Command-콜론 | 맞춤법 윈도우를 표시함 |
| 세미콜론(;) | Command-세미콜론 | 문서에서 맞춤법 오류 단어를 찾음 |
| 쉼표(,) | Command-쉼표 | 앱의 설정 윈도우 열기 |
|  | Control-Option-Command-쉼표 | 화면 대비를 감소시킴 |
| 마침표(.) | Command-마침표 | 작업을 취소함 |
|  | Control-Option-Command-마침표 | 화면 대비를 증가시킴 |
| 물음표(?) | Command-물음표 | 앱의 도움말 메뉴 열기 |
| 포워드 슬래시(/) | Option-Command-포워드 슬래시 | 부드러운 서체 처리를 켜거나 끔 |
| 등호 | Shift-Command-등호 | 선택의 크기를 증가시킴 |
|  | Option-Command-등호 | 화면 확대/축소가 켜져 있을 때 화면을 확대함 |
| 3 | Shift-Command-3 | 화면을 파일로 캡처함 |
|  | Control-Shift-Command-3 | 화면을 클립보드로 캡처함 |
| 4 | Shift-Command-4 | 선택 항목을 파일로 캡처함 |
|  | Control-Shift-Command-4 | 선택 항목을 클립보드로 캡처함 |
| 8 | Option-Command-8 | 화면 확대/축소를 켜거나 끔 |
|  | Control-Option-Command-8 | 화면 색상을 반전시킴 |
| A | Command-A | 문서 또는 윈도우의 모든 항목 또는 텍스트 필드의 모든 문자를 선택함 |
|  | Shift-Command-A | 모든 선택 항목 또는 문자를 선택 해제함 |
| B | Command-B | 선택한 텍스트에 굵은 글꼴을 적용하거나, 굵은 글꼴 텍스트를 켜거나 끔 |
| C | Command-C | 선택 항목을 클립보드로 복사함 |
|  | Shift-Command-C | 색상 윈도우를 표시함 |
|  | Option-Command-C | 선택한 텍스트의 스타일을 복사함 |
|  | Control-Command-C | 선택 항목의 포맷 설정을 복사하고 클립보드에 저장함 |
| D | Option-Command-D | Dock을 표시하거나 가림 |
|  | Control-Command-D | 사전 앱에서 선택한 단어의 정의를 표시함 |
| E | Command-E | 찾기 작업에 선택 항목을 사용함 |
| F | Command-F | 찾기 윈도우 열기 |
|  | Option-Command-F | 검색 필드 제어기로 이동함 |
|  | Control-Command-F | 전체 화면을 시작함 |
| G | Command-G | 선택 조건과 일치하는 다음 항목을 찾음 |
|  | Shift-Command-G | 선택 조건과 일치하는 이전 항목을 찾음 |
| H | Command-H | 현재 실행 중인 앱의 윈도우를 가림 |
|  | Option-Command-H | 실행 중인 다른 모든 앱의 윈도우를 가림 |
| I | Command-I | 선택한 텍스트에 이탤릭체를 적용하거나, 이탤릭체 텍스트를 켜거나 끔 |
|  | Command-I | 정보 윈도우를 표시함 |
|  | Option-Command-I | 인스펙터 윈도우를 표시함 |
| J | Command-J | 선택 항목으로 스크롤함 |
| M | Command-M | 활성 윈도우를 Dock에 최소화함 |
|  | Option-Command-M | 활성 앱의 모든 윈도우를 Dock에 최소화함 |
| N | Command-N | 새로운 문서 열기 |
| O | Command-O | 열려는 문서를 선택하는 대화상자를 표시함 |
| P | Command-P | 프린트 대화상자를 표시함 |
|  | Shift-Command-P | 페이지 설정 대화상자를 표시함 |
| Q | Command-Q | 앱을 종료함 |
|  | Shift-Command-Q | 현재 로그인된 사람을 로그아웃시킴 |
|  | Option-Shift-Command-Q | 현재 확인 없이 로그인된 사람을 로그아웃시킴 |
| S | Command-S | 새로운 문서를 저장하거나 문서의 버전을 저장함 |
|  | Shift-Command-S | 활성 문서를 복제하거나 별도 저장을 수행함 |
| T | Command-T | 서체 윈도우를 표시함 |
|  | Option-Command-T | 도구 막대를 표시하거나 가림 |
| U | Command-U | 선택한 텍스트에 밑줄을 적용하거나, 밑줄을 켜거나 끔 |
| V | Command-V | 클립보드 콘텐츠를 삽입점에 붙여넣음 |
|  | Shift-Command-V | 별도 붙여넣기(예: 인용문으로 붙여넣기) |
|  | Option-Command-V | 한 대상체의 스타일을 선택 항목에 적용함 |
|  | Option-Shift-Command-V | 클립보드 콘텐츠를 삽입점에 붙여넣고, 주변 텍스트의 스타일을 삽입된 대상체에 적용함 |
|  | Control-Command-V | 선택 항목에 포맷 설정을 적용함 |
| W | Command-W | 활성 윈도우를 닫음 |
|  | Shift-Command-W | 파일 및 관련 윈도우를 닫음 |
|  | Option-Command-W | 앱의 모든 윈도우를 닫음 |
| X | Command-X | 선택 항목을 제거하고 클립보드에 저장함 |
| Z | Command-Z | 이전 작업을 실행 취소함 |
|  | Shift-Command-Z | 실행 복귀(실행 취소 및 실행 복귀가 Command-Z를 사용하여 전환되지 않는 별도의 명령인 경우) |
| 오른쪽 화살표 | Command-오른쪽 화살표 | 키보드 레이아웃을 로마자의 현재 레이아웃으로 변경함 |
|  | Shift-Command-오른쪽 화살표 | 일반적으로 현재 줄의 끝 부분인 다음 의미 단위로 선택 항목을 확장함 |
|  | Shift-오른쪽 화살표 | 선택 항목을 오른쪽으로 한 문자 확장함 |
|  | Option-Shift-오른쪽 화살표 | 선택 항목을 현재 단어의 끝 부분으로 확장한 후, 다음 단어의 끝 부분으로 확장함 |
|  | Control-오른쪽 화살표 | 표와 같은 보기의 다른 값 또는 셀로 초점을 이동함 |
| 왼쪽 화살표 | Command-왼쪽 화살표 | 키보드 레이아웃을 시스템 스크립트의 현재 레이아웃으로 변경함 |
|  | Shift-Command-왼쪽 화살표 | 일반적으로 현재 줄의 시작 부분인 이전 의미 단위로 선택 항목을 확장함 |
|  | Shift-왼쪽 화살표 | 선택 항목을 왼쪽으로 한 문자 확장함 |
|  | Option-Shift-왼쪽 화살표 | 선택 항목을 현재 단어의 시작 부분으로 확장한 다음, 이전 단어의 시작 부분으로 확장함 |
|  | Control-왼쪽 화살표 | 표와 같은 보기의 다른 값 또는 셀로 초점을 이동함 |
| 위쪽 화살표 | Shift-Command-위쪽 화살표 | 일반적으로 문서의 시작 부분인 다음 의미 단위 상단으로 선택 항목을 확장함 |
|  | Shift-위쪽 화살표 | 선택 항목을 동일한 수평 위치의 가장 가까운 문자의 경계인 상단 줄로 확장함 |
|  | Option-Shift-위쪽 화살표 | 선택 항목을 현재 단락의 시작 부분으로 확장한 후, 다음 단락의 시작 부분으로 확장함 |
|  | Control-위쪽 화살표 | 표와 같은 보기의 다른 값 또는 셀로 초점을 이동함 |
| 아래쪽 화살표 | Shift-Command-아래쪽 화살표 | 일반적으로 문서의 끝 부분인 다음 의미 단위 하단으로 선택 항목을 확장함 |
|  | Shift-아래쪽 화살표 | 선택 항목을 동일한 수평 위치의 가장 가까운 문자의 경계인 하단 줄로 확장함 |
|  | Option-Shift-아래쪽 화살표 | 선택 항목을 현재 단락의 끝 부분으로 확장한 후, 다음 단락의 끝 부분으로 확장함(잘라내기, 복사 및 붙여넣기 작업에서의 Return과 같은 단락을 종료하는 기능 포함) |
|  | Control-아래쪽 화살표 | 표와 같은 보기의 다른 값 또는 셀로 초점을 이동함 |

또한 시스템은 현지화된 버전의 시스템, 현지화된 키보드, 키보드 레이아웃 및 입력 방식과 함께 사용하도록 다양한 키보드 단축키를 정의합니다. 이 단축키는 메뉴 명령에 직접 대응되지 않습니다.

| 키보드 단축키 | 동작 |
| --- | --- |
| Control-스페이스 | 현재 및 마지막 입력 소스 간을 전환함 |
| Control-Option-스페이스 | 목록의 다음 입력 소스로 전환함 |
| [보조 키]-Command-스페이스 | 달라질 수 있음 |
| Command-오른쪽 화살표 | 키보드 레이아웃을 로마자의 현재 레이아웃으로 변경함 |
| Command-왼쪽 화살표 | 키보드 레이아웃을 시스템 스크립트의 현재 레이아웃으로 변경함 |

## 사용자 설정 키보드 단축키

**가장 자주 사용하는 앱별 명령에 대해서만 사용자 설정 키보드 단축키를 정의하십시오.** 사람들은 자주 수행하는 동작을 키보드 단축키로 수행하는 것을 좋아하지만 새로운 단축키를 너무 많이 정의하면 앱이 배우기 어려운 것처럼 보일 수 있습니다.

**사람들이 예상하는 방식으로 보조 키를 사용하십시오.** 예를 들어, 드래그 중에 Command를 누르면 항목을 그룹으로 옮기고, 드래그하여 크기를 조절할 때 Shift를 누르면 크기 조절을 해당 항목의 너비 및 높이 비율에 맞게 제한합니다. 또한, 화살표를 누르고 있으면 사람들이 키에서 손을 뗄 때까지 선택한 항목을 최소 앱 정의 거리 단위로 움직입니다.

보조 키 및 보조 키를 나타내는 기호는 다음과 같습니다.

| 보조 키 | 기호 | 권장 용법 |
| --- | --- | --- |
| Command | ![스타일화된 클로버 모양의 윤곽선.](https://developer.apple.com/images/com.apple.HIG/Keyboard_Command.svg) | 가급적 사용자 설정 키보드 단축키에서 Command 키를 메인 보조 키로 사용하십시오. |
| Shift | ![위를 가리키는 화살표의 윤곽선.](https://developer.apple.com/images/com.apple.HIG/Keyboard_Shift.svg) | 가급적 Shift 키를 관련된 단축키를 보완하는 두 번째 보조 키로 사용하십시오. |
| Option | ![가로로 늘린 Z 모양 및 Z 모양 상단부에 맞춰 정렬된 짧은 가로선의 조합을 나타내는 선 세그먼트.](https://developer.apple.com/images/com.apple.HIG/Keyboard_Option.svg) | 드물게 사용하는 명령 또는 전원 기능에 대해 Option 보조 키를 제한적으로 사용하십시오. |
| Control | ![납작하고 거꾸로 뒤집어진 V 모양.](https://developer.apple.com/images/com.apple.HIG/Keyboard_Control.svg) | Control 키는 보조 키로 사용하지 마십시오. 시스템은 초점 이동 또는 스크린샷 캡처 등 시스템 전반의 많은 기능 및 단축키에 대해 Control을 사용합니다. |

> **팁:** 일부 언어는 특정 문자를 생성하는 데 보조 키가 필요합니다. 예를 들어, 프랑스어 키보드에서는 Option-5가 ‘{’ 문자를 생성합니다. 일반적으로 Command 키를 보조 키로 사용하는 것이 안전하지만, 일부 키보드에서만 사용할 수 있는 문자에서는 추가 보조 키를 사용하지 마십시오. Command 이외의 보조 키를 사용해야 할 경우, 가급적 알파벳 문자와만 함께 사용하십시오.

**보조 키를 정확한 순서로 나열하십시오.** 사용자 설정 단축키에 두 개 이상의 보조 키를 사용할 경우, 다음과 같이 Control, Option, Shift, Command의 순서로 나열하십시오.

**두 문자 키 중 상위 행 문자를 사용하는 단축키에 Shift를 추가하지 마십시오.** 사람들은 두 문자 키 중 상위 행 문자를 입력하려면 Shift 키를 눌러야 한다는 것을 이미 알고 있으므로, 단축어에 단순히 상위 행 문자를 나열하는 것이 더 명확합니다. 예를 들어, 상태 막대 가리기의 키보드 단축키는 Command-슬래시인 반면, 도움말의 키보드 단축키는 Shift-Command-슬래시가 아닌 Command-물음표입니다.

**시스템이 필요한 만큼 키보드 단축키를 현지화하고 미러링하게 하십시오.** 시스템은 자동으로 단축키의 기본 키 및 보조 키를 현지화하여 현재 연결된 키보드를 지원합니다. 앱 또는 게임이 오른쪽에서 왼쪽 레이아웃으로 전환될 경우, 시스템이 자동으로 단축키를 미러링합니다. 지침을 보려면 [오른쪽에서 왼쪽](https://developer.apple.com/kr/design/human-interface-guidelines/right-to-left)의 내용을 참조하십시오.

**관련 없는 명령의 기존 단축키에 보조 키를 추가하여 새로운 단축키를 만들지 마십시오.** 예를 들어, 사람들은 동작 실행 취소에 Command-Z를 사용하는 데 익숙하기 때문에, 실행 취소 및 실행 복귀와 무관한 명령에 대해 Shift-Command-Z를 사용하면 혼란스러울 수 있습니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS 또는 tvOS에 대한 추가 고려 사항은 없습니다. watchOS에서는 지원되지 않습니다.*

### visionOS

visionOS에서 앱의 키보드 단축키는 연결된 키보드의 Command 키를 누르고 있을 때 표시되는 단축키 인터페이스에 나타날 수 있습니다. iPad 또는 Mac의 앱 [메뉴 막대](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar) 구성과 유사하게 Apple Vision Pro의 단축키 인터페이스는 파일, 편집, 보기와 같이 친숙한 시스템 정의 메뉴 카테고리에 앱 명령을 표시합니다. 메뉴 막대의 메뉴 구성과 다르게 단축키 인터페이스는 모든 관련 카테고리를 하나의 보기에 표시하며 각 카테고리에는 단축키까지 있는 사용 가능한 명령만 나열됩니다.

**단축키 제목을 설명과 함께 기재하십시오.** 단축키 인터페이스는 각 카테고리에 모든 항목의 평면 목록을 표시하기 때문에, 하위 메뉴 제목은 하위 항목의 맥락을 제공할 수 없습니다. 각 단축키 제목은 하위 메뉴 제목이 제공할 수도 있는 추가 컨텍스트 없이도 해당 동작을 전달할 수 있을 만큼 설명이 잘 되어 있어야 합니다. 개발자 지침을 보려면 [discoverabilityTitle](https://developer.apple.com/documentation/uikit/uikeycommand/discoverabilitytitle)의 내용을 참조하십시오.

**visionOS 앱 또는 게임에서 실제 키보드를 사용할 때 사람들이 오버레이를 본다는 사실을 인식하십시오.** 사람들이 visionOS 앱 또는 게임을 사용하는 동안 실제 키보드를 연결하면 시스템은 입력 완료 및 기타 제어 기능을 제공하는 가상 키보드 오버레이를 표시합니다.

[video: visionOS에서 앱을 실행하는 동안 실제 키보드를 입력하고 있는 두 손을 보여주는 녹화 기록. 실제 키보드 위에 가상 윈도우가 보이고, 입력된 텍스트 및 제안이 표시됨.]

## 리소스

#### 관련 콘텐츠

[가상 키보드](https://developer.apple.com/kr/design/human-interface-guidelines/virtual-keyboards)

[데이터 입력하기](https://developer.apple.com/kr/design/human-interface-guidelines/entering-data)

[포인팅 장치](https://developer.apple.com/kr/design/human-interface-guidelines/pointing-devices)

#### Developer 문서

[KeyboardShortcut](https://developer.apple.com/documentation/swiftui/keyboardshortcut) — SwiftUI

[Input events](https://developer.apple.com/documentation/swiftui/input-events) — SwiftUI

[Handling key presses made on a physical keyboard](https://developer.apple.com/documentation/uikit/handling-key-presses-made-on-a-physical-keyboard) — UIKit

[Mouse, Keyboard, and Trackpad](https://developer.apple.com/documentation/appkit/mouse-keyboard-and-trackpad) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 게임별 키 바인딩 지침이 게임 제어기 페이지로 이동함. |
| 2024년 6월 10일 | 게임별 지침이 추가되고 구성 업데이트가 적용됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
