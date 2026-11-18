# Game Center

Source: https://developer.apple.com/kr/design/human-interface-guidelines/game-center

> Game Center는 Apple의 소셜 게임 네트워크로, 플레이어가 자신의 진행 상황을 추적하고 Apple 플랫폼 전반에서 친구들과 연결할 수 있도록 해주며, 다양한 기기에서 플레이어가 게임을 더 쉽게 발견할 수 있도록 도와줍니다.

![Game Center 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-Game-Center-intro@2x.png)

게임에서 Game Center를 지원하면 플레이어가 다음과 같은 기능을 활용할 수 있습니다.

- 친구가 플레이 중인 새로운 게임을 확인할 수 있습니다.
- 친구를 손쉽게 게임에 초대할 수 있습니다.
- Apple Games 앱, App Store, 알림 등 시스템 전반에서 게임 활동의 최신 상태를 확인할 수 있습니다.

위와 같은 플레이어 활동이 가능하도록 하면 Game Center를 지원할 경우 Apple 플랫폼 전반에서 더 많은 플레이어에게 게임을 노출하는 데에도 도움이 됩니다.

Game Center는 GameKit 프레임워크를 사용하여 게임에 추가할 수 있으며, 이는 플레이어가 게임 내에서 Game Center 데이터에 손쉽게 접근하고 확인할 수 있게 해주는 다양한 UI를 제공합니다. 또는 GameKit를 사용하여 이러한 데이터를 사용자 설정 UI에 표시할 수도 있습니다. 개발자 지침을 보려면 [GameKit](https://developer.apple.com/documentation/gamekit)의 내용을 참조하십시오.

## Game Center 접근하기

플레이어에게 최상의 Game Center 경험을 제공하려면 게임이 실행될 때 플레이어가 시스템에서 Game Center 계정에 로그인했는지 먼저 확인하십시오. 로그인하지 않은 경우, 이 시점에 플레이어가 Game Center를 시작하도록 안내하십시오. 이렇게 하면 사용자 경험을 보다 원활하게 제공할 수 있으며, ‘가장 많이 플레이한 게임’ 차트나 플레이어의 친구를 통한 소셜 추천 등에서 게임이 더 많이 노출될 수 있는 기회를 극대화할 수 있습니다.

### 액세스 포인트 통합하기

Game Center *액세스 포인트*는 Apple이 디자인한 UI 요소이며 플레이어가 게임에서 나가지 않아도 Game Center 프로필과 정보를 볼 수 있습니다. 개발자 지침을 보려면 [Adding an access point to your game](https://developer.apple.com/documentation/gamekit/adding-an-access-point-to-your-game)의 내용을 참조하십시오.

![The Coast라는 게임의 타이틀 화면이 표시된 iPhone 스크린샷. 대각선 방향의 로켓 기호가 있는 원형 버튼으로 표시된 액세스 포인트 제어기가 앞쪽 가장자리의 상단 모서리에 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-access-point-collapsed@2x.png)

iOS, iPadOS 및 macOS에서 플레이어는 액세스 포인트를 통해 게임 오버레이로 이동합니다. 게임 오버레이는 플레이어가 진행 상황을 확인하고 게임 활동을 시작할 수 있는 시스템 오버레이입니다.

![iPhone 스크린샷과 iPad 스크린샷으로 구성된 일러스트. 두 이미지 모두 The Coast 게임 위에 게임 오버레이가 표시되어 있음. iPhone 스크린샷에서는 오버레이가 전체 화면을 덮고 있으며, iPad 스크린샷에서는 오버레이가 뒤쪽 가장자리에 세로로 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/games-game-overlay@2x.png)

visionOS 및 tvOS에서 플레이어는 액세스 포인트를 통해 게임 내 대시보드로 이동합니다. 이 대시보드는 플레이어의 Game Center 활동을 게임 위에 전체 화면으로 표시합니다.

**액세스 포인트를 메뉴 화면에 표시하십시오.** 게임의 메인 메뉴 또는 설정 영역에 액세스 포인트를 추가하는 것을 고려하십시오. 게임의 메인 메뉴 화면 전에 나타나는 일시적인 시작 화면, 시네마틱 장면, 튜토리얼이나 실제 게임 플레이 중에는 액세스 포인트를 표시하지 마십시오.

**액세스 포인트 근처에 제어기를 배치하지 마십시오.** 액세스 포인트는 화면 네 개 모서리 중 원하는 위치에 고정하여 표시할 수 있습니다. 액세스 포인트는 축소된 버전과 확장된 버전이 모두 있으므로 중요한 UI 및 제어기와 겹치지 않는지 확인하고 레이아웃을 적절하게 조절하십시오.

> **참고:** visionOS에서 액세스 포인트의 위치는 몰입형 또는 볼륨 기반 등과 같은 게임 유형에 따라 다릅니다. 개발자 지침을 보려면 [Adding an access point to your game](https://developer.apple.com/documentation/gamekit/adding-an-access-point-to-your-game)의 내용을 참조하십시오.

**게임 오버레이나 대시보드가 표시되는 동안에는 게임을 일시 정지하는 것을 고려하십시오.** 게임을 일시 정지하면 플레이어가 자신 없이 게임이 계속 진행된다는 느낌을 받지 않으면서 Game Center 정보를 확인할 수 있습니다.

### 사용자 설정 UI 사용하기

게임에서 게임 오버레이(iOS, iPadOS, macOS) 또는 대시보드(visionOS 및 tvOS)로 연결되는 사용자 설정 링크를 포함할 수 있습니다. 사용자 설정 UI를 통해 순위표나 플레이어의 Game Center 프로필 등과 같은 특정 영역으로 연결되는 딥링크를 사용할 수 있습니다.

**Game Center에서 제공하는 아트워크를 사용자 설정 링크에 사용하십시오.** 사용자 설정 UI에서 Game Center 기능을 표시할 때는 [Apple Design Resources](https://developer.apple.com/design/resources/#technologies)의 공식 아트워크를 사용하십시오. 이 아트워크의 모양을 유지하고 크기나 시각적 효과는 조절하지 마십시오.

**사용자 설정 링크에서 올바른 용어를 사용하십시오.** 다음 표는 사용자 설정 UI에서 플레이어가 혼란스럽지 않도록 Game Center 용어를 올바르게 사용하는 방법을 설명합니다.

| 용어 | 올바르지 않은 용어 | 현지화 |
| --- | --- | --- |
| Game Center | GameKit, GameCenter, game center | 시스템에서 제공하는 *Game Center* 번역 사용 |
| Game Center 프로필 | 프로필, 계정, 플레이어 정보 | 시스템에서 제공하는 *Game Center* 번역 사용 및 *Profile* 현지화 |
| 목표 달성 | 상, 트로피, 메달 |  |
| 순위표 | 순위, 점수, 선두 |  |
| 도전 과제 | 경쟁 |  |
| 친구 추가 | 추가, 프로필 추가, 친구 포함 |  |

## 목표 달성

플레이어는 목표 달성을 통해 게임에 계속 몰입할 수 있는 추가적인 동기를 갖게 됩니다. Game Center 목표 달성은 플레이어의 진행 상황을 간략히 알려주고 아트워크를 보여주는 수집 가능한 카드 포맷으로 표시됩니다. 개발자 지침을 보려면 [Rewarding players with achievements](https://developer.apple.com/documentation/gamekit/rewarding-players-with-achievements)의 내용을 참조하십시오.

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 목표 달성 개요 화면이 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-achievement-overlay@2x.png)

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 단일 목표 달성의 세부사항 보기가 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-achievement-overlay-detail@2x.png)

### 게임에 목표 달성 통합하기

**Game Center의 목표 달성 상태에 맞추십시오.** Game Center는 목표 달성을 잠김, 진행 중, 가려짐, 완료됨의 4가지 상태로 정의합니다. 시스템은 완료 상태별로 목표 달성을 그룹화하여, 완료된 목표 달성은 ‘완료됨’ 그룹에 표시하고 기타 모든 목표 달성은 ‘잠김’ 그룹에 표시합니다. 목표 달성을 Game Center의 4가지 목표 달성 상태에 매핑하면 플레이어에게 일관된 경험을 선사하고 게임에서 제공하는 목표 달성 유형을 한눈에 파악하도록 도울 수 있습니다.

**표시 순서를 정하십시오.** 업적은 업로드한 순서대로 표시되므로 파일을 업로드하기 전에 원하는 순서를 미리 고려하십시오. 예를 들어, 게임에서 가장 일반적인 진행 경로에 맞춰 목표 달성이 표시되도록 순서를 구성할 수 있습니다.

**목표 달성에 대한 설명은 간결하게 하십시오.** 목표 달성 카드는 제목과 설명을 각각 두 줄로 제한합니다. 제목이나 설명을 두 줄 넘게 작성하면 카드에서 텍스트가 잘립니다. 목표 달성의 제목에는 제목식 대문자 표기법을 사용하고, 설명에는 문장식 대문자 표기법을 사용하십시오.

![목표 달성 카드의 다이어그램. 목표 달성 이미지, 제목, 설명을 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-achievement-anatomy@2x.png)

**플레이어가 진행 상황을 체감할 수 있도록 하십시오.** 점진적인 목표 달성을 사용할 경우, 시스템에서 플레이어의 진행 상황을 표시하고 ‘The Coast에서 Great Lakes Freighter 목표를 절반 이상 달성했습니다. 계속 도전하세요!’와 같은 격려 메시지를 제공하여 플레이어가 목표를 완료하도록 동기를 부여합니다.

### 목표 달성 이미지 생성하기

**플레이어가 보상 받는 기분을 느낄 수 있는 풍부한 고품질 이미지를 디자인하십시오.** 목표 달성은 Game Center UI의 주요 기능이므로 플레이어의 시선을 끌고 게임으로 돌아오고 싶도록 유도하는 고품질 애셋을 디자인하는 것이 중요합니다. 동일한 애셋을 재사용하여 두 가지 이상의 목표 달성을 나타내지 않도록 하십시오. 목표 달성에 대한 애셋을 제공하지 않으면 카드에 위치 지정자 이미지가 대신 표시됩니다.

**적절한 크기와 포맷으로 아트워크를 생성하십시오.** 시스템은 목표 달성 이미지에 원형 마스크를 적용하므로 콘텐츠가 중앙에 오도록 배치해야 합니다. 다음 명세를 따라 이미지를 생성하십시오.

**iOS, iPadOS, macOS, visionOS**

![iOS, iPadOS, macOS, visionOS의 목표 달성 이미지에 대한 레이아웃이 표시된 다이어그램. 이미지 크기, 마스크 지름을 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/ios-achievement-image-layout@2x.png)

| 속성 | 값 |
| --- | --- |
| 포맷 | PNG, TIF 또는 JPG |
| 색상 공간 | sRGB 또는 P3 |
| 해상도 | 최소 72DPI |
| 이미지 크기 | 512x512pt(1024x1024px @2x) |
| 마스크 지름 | 512pt(1024px @2x) |

**tvOS**

![tvOS의 목표 달성 이미지에 대한 레이아웃이 표시된 다이어그램. 이미지 크기, 마스크 지름을 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tvos-achievement-image-layout@2x.png)

| 속성 | 값 |
| --- | --- |
| 포맷 | PNG, TIF 또는 JPG |
| 색상 공간 | sRGB 또는 P3 |
| 해상도 | 최소 72DPI |
| 이미지 크기 | 320x320pt(640x640px @2x) |
| 마스크 지름 | 200pt(400px @2x) |

## 순위표

순위표는 게임 내에서 즐거운 경쟁을 유도하는 좋은 방법입니다. Game Center를 사용하면 플레이어는 친구 및 전 세계 플레이어와 자신의 순위를 쉽게 확인할 수 있으며, 친구가 도전하거나 순위표에서 자신의 점수를 넘었을 때 알림을 받을 수 있습니다. 시스템에서 디자인한 UI를 활용하거나 사용자 설정 UI 내에 순위표 정보를 표시할 수 있습니다. 개발자 지침을 보려면 [Encourage progress and competition with leaderboards](https://developer.apple.com/documentation/gamekit/encourage-progress-and-competition-with-leaderboards)의 내용을 참조하십시오.

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 순위표 개요 화면이 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-leaderboards-overlay@2x.png)

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 단일 순위표의 세부사항 보기가 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-leaderboards-detail@2x.png)

**순위표 유형을 선택하십시오.** Game Center는 *기본* 및 *반복*이라는 두 가지 유형의 순위표를 지원합니다.

- *기본 순위표*는 플레이어의 역대 최고 점수를 추적합니다. 기본 순위표는 종료되지 않고 항상 활성화 상태입니다. 기본 순위표에 포함할 수 있는 목표의 예시는 다음과 같습니다.

    - 리듬 게임에서 가장 완벽한 점수 달성하기
    - 한 번의 던전 플레이에서 가장 많은 코인 수집하기
    - 끝없이 달리는 게임에서 가장 긴 연속 시간 달성하기
- *반복 순위표*는 매주 또는 매일 등 설정한 시간 간격에 따라 재설정됩니다. 반복 순위표를 사용하면 플레이어가 선두에 설 수 있는 기회가 더 많이 생겨 참여도를 높일 수 있습니다. 반복 순위표에 적합한 예시는 다음과 같습니다.

    - 매일 바뀌는 퍼즐
    - 시즌별 또는 기념일 테마 이벤트
    - 서로 다른 배틀 모드를 위한 주간 순위표

**여러 개의 순위표를 사용할 경우, 순위표 세트를 활용하십시오.** 순위표 세트로 순위표를 구성하면 플레이어가 원하는 순위표를 더 쉽게 찾을 수 있습니다. 다음과 같은 테마 또는 게임 플레이 경험을 기준으로 순위표 세트를 그룹화하는 것을 고려하십시오.

- 난이도 모드(쉬움, 일반, 어려움)
- 활동 유형(전투, 제작, 농작)
- 장르 및 테마(디스코, 팝, 록)

**순위표 이미지를 추가하십시오.** 순위표 아트워크는 게임의 시각적 감성을 강화할 수 있는 또 다른 기회를 제공합니다. 게임의 각 순위표마다 해당 순위와 관련된 게임 플레이를 반영하고 보여주는 고유한 이미지를 생성하도록 하십시오. 순위표는 시스템 전반에 표시되며 플레이어가 친구들과 경쟁하고 게임에 참여할 수 있는 방법을 알려줍니다. 매력적인 이미지는 플레이어의 관심을 끌고, 게임 플레이의 느낌을 전달해 줍니다.

iOS, iPadOS 및 macOS에서 실행되는 게임의 경우, 순위표 이미지에 하나의 이미지를 사용하십시오. tvOS에서 실행되는 게임의 경우, 아트워크에 초점이 맞춰질 때 움직이는 이미지 세트를 제공하십시오. 초점 효과에 대해 자세히 알아보려면 [초점 및 선택](https://developer.apple.com/kr/design/human-interface-guidelines/focus-and-selection)의 내용을 참조하십시오. 초점 대상 이미지를 생성할 때 도움을 받으려면 [Apple Design Resources](https://developer.apple.com/design/resources/#tvos-apps)에서 tvOS 템플릿을 다운로드하십시오. 다음 명세를 따라 순위표 아트워크를 생성하십시오.

**iOS, iPadOS, macOS**

![iOS, iPadOS, macOS의 순위표 이미지에 대한 레이아웃이 표시된 다이어그램. 이미지 크기, 마스크 지름을 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/leaderboard-image-layout-general@2x.png)

| 속성 | 값 |
| --- | --- |
| 포맷 | JPEG, JPG 또는 PNG |
| 색상 공간 | sRGB 또는 P3 |
| 해상도 | 최소 72DPI |
| 이미지 크기 | 512x512pt(1024x1024px @2x) |
| 자른 영역 | 512x312pt(1024x624px @2x) |

**tvOS**

![tvOS의 순위표 이미지에 대한 레이아웃이 표시된 다이어그램. 이미지 크기, 초점을 맞춘 크기, 초점을 맞추지 않은 크기를 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tvos-multi-layered-leaderboard-image@2x.png)

| 속성 | 값 |
| --- | --- |
| 포맷 | PNG, TIF 또는 JPG |
| 색상 공간 | sRGB 또는 P3 |
| 해상도 | 최소 72DPI |
| 이미지 크기 | 659x371pt(1318x742px @2x) |
| 초점을 맞춘 크기 | 618x348pt(1236x696px @2x) |
| 초점을 맞추지 않은 크기 | 548x309pt(1096x618px @2x) |

> **참고:** 순위표 아트워크가 잘릴 수 있다는 점에 유의하십시오. iOS, iPadOS 및 macOS에서 시스템은 순위표 세트에 포함된 순위표의 아트워크를 자를 수 있습니다. tvOS에서는 순위표 아트워크의 초점 효과가 이미지에서 일부 레이어의 가장자리를 자를 수 있습니다. 두 경우 모두 주요 콘텐츠가 잘 보이도록 여유 있게 배치하십시오.

## 도전 과제

도전 과제는 싱글 플레이어 활동을 친구들과 함께하는 멀티플레이어 경험으로 확장합니다. 도전 과제는 순위표를 기반으로 하며, 플레이어가 친구들과 연결되어 제한 시간 안에 경쟁에 참여할 수 있도록 해줍니다. 개발자 문서를 보려면 [Creating engaging challenges from leaderboards](https://developer.apple.com/documentation/gamekit/creating-engaging-challenges-from-leaderboards)의 내용을 참조하십시오.

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 도전 과제 개요 화면이 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-challenges-overlay@2x.png)

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 단일 도전 과제의 세부사항 보기가 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-challenges-overlay-detail@2x.png)

**흥미로운 도전 과제를 생성하십시오.** 도전 과제는 플레이어의 성과를 명확히 평가할 수 있는 짧고 기술 중심적인 게임 플레이 활동에 적합합니다. 1~5분 이내에 플레이할 수 있고, 플레이어가 혼자서 완료할 수 있는 도전 과제를 생성하십시오. 흥미로운 도전 과제의 예시는 다음과 같습니다.

- 레이싱 구간에서 가장 빠른 랩 달성하기
- 단일 라운드에서 가장 많은 적 물리치기
- 최소한의 실수로 일일 퍼즐 풀기

**전체 진행 상황이나 개인 최고 점수를 추적하는 방식의 도전 과제는 생성하지 마십시오.** 이런 방식은 자주 게임을 하는 플레이어에게 부당한 이점을 줄 수 있습니다. 대신, 각 도전 과제를 시도한 후 플레이어의 가장 최근 점수를 추적하십시오. 이렇게 하면 모든 플레이어가 동등한 조건에서 경쟁할 수 있어 도전 과제의 동기 부여를 유지하는 데 도움이 됩니다.

**도전 과제에 쉽게 참여할 수 있도록 하십시오.** 플레이어는 초대 링크, 게임 오버레이 또는 iOS, iPadOS, macOS의 Games 앱을 통해 도전 과제에 접근할 수 있습니다. 도전 과제가 시작되는 정확한 모드 또는 레벨로 항상 딥링크를 연결하고, 처음 도전하는 플레이어가 도전 과제를 시작하기 전에 초기 온보딩을 완료할 수 있도록 하십시오. 예를 들어, 게임의 기본 조작법을 익히기 위한 튜토리얼 레벨이 필요하다면 먼저 플레이어를 튜토리얼로 안내하고, 게임이 자동으로 도전 과제로 넘어간다는 사실을 알리는 UI를 함께 제공하십시오.

![도전 과제 카드의 다이어그램. 도전 과제 제목, 아트워크, 플레이어 수, 카드 하단의 시스템 제공 그라디언트를 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-challenge-anatomy@2x.png)

**플레이어가 도전 과제에 참여하고 싶게 만드는 고품질의 아트워크를 생성하십시오.** 시스템은 도전 과제의 아트워크를 게임 오버레이, Games 앱, 초대 링크 미리보기에서 표시합니다. 도전 과제의 제목 및 설명과 겹칠 수 있는 영역에는 아트워크의 주요 콘텐츠를 배치하지 마십시오. 도전 과제 이미지에 텍스트를 사용할 경우, App Store Connect 또는 Xcode를 통해 현지화된 버전을 적절하게 제공해야 합니다. 다음 명세를 따라 도전 과제 아트워크를 생성하십시오.

![도전 과제 이미지에 대한 레이아웃이 표시된 다이어그램. 이미지 크기, 자른 영역을 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-challenge-image-specs@2x.png)

| 속성 | 값 |
| --- | --- |
| 포맷 | JPEG, JPG 또는 PNG |
| 색상 공간 | sRGB 또는 P3 |
| 해상도 | 최소 72DPI |
| 이미지 크기 | 1920x1080pt(3840x2160px @2x) |
| 자른 영역 | 1465x767pt(2930x1534px @2x) |

## 멀티플레이어 활동

Game Center는 실시간 및 턴제 멀티플레이어 활동을 모두 지원하여 플레이어가 친구나 다른 플레이어와 쉽게 연결될 수 있도록 도와줍니다. 플레이어는 파티 코드, 게임 오버레이, 대시보드 또는 Games 앱을 통해 멀티플레이어 게임 플레이에 접근할 수 있습니다. 개발자 문서를 보려면 [Creating activities for your game](https://developer.apple.com/documentation/gamekit/creating-activities-for-your-game)의 내용을 참조하십시오.

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 멀티플레이어 레벨 개요 화면이 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-multiplayer-overlay@2x.png)

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 단일 멀티플레이어 레벨의 세부사항 보기가 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-multiplayer-overlay-detail@2x.png)

**파티 코드를 사용하여 플레이어를 멀티플레이 활동에 초대하십시오.** Game Center 파티 코드는 실시간 멀티플레이어 세션을 구성할 수 있는 효과적인 수단이며, Game Center 매치메이킹 및 네트워킹 기능을 사용하는지, 자체 시스템을 사용하는지에 관계없이 활용이 가능합니다. Game Center는 일반적으로 8자리의 영숫자(예: 2MP4-9CMF)로 구성된 파티 코드를 생성합니다.  멀티플레이어 게임에 파티 코드를 통합하는 경우, 최적의 플레이어 경험을 제공할 수 있도록 다음 지침을 고려하십시오.

- 플레이어가 게임 플레이에 늦게 참여하거나, 먼저 나가거나, 나중에 다시 참여할 수 있도록 하십시오.
- 플레이어가 현재 파티 코드를 게임 내에서 확인할 수 있는 방법을 제공하십시오.
- 플레이어가 파티 코드를 수동으로 입력할 수 있도록 하십시오.

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 사용자 설정 코드를 사용하여 멀티플레이어 활동을 설정하거나 참여하는 게임 내 UI가 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-multiplayer-custom-code@2x.png)

**게임 내 UI를 통해 멀티플레이어 활동을 지원하십시오.** 게임 오버레이와 Game Center 대시보드는 플레이어가 게임을 떠나지 않고도 멀티플레이어 매칭을 위해 다른 플레이어를 찾을 수 있도록 도와줍니다. Game Center의 기본 멀티플레이어 인터페이스는 플레이어가 근처에 있거나 최근에 함께 플레이한 플레이어, Game Center 친구, 연락처를 초대할 수 있도록 해줍니다. 또한 멀티플레이어 기능을 사용자 설정 UI에 구현할 수도 있습니다. 개발자 지침을 보려면 [Finding multiple players for a game](https://developer.apple.com/documentation/gamekit/finding-multiple-players-for-a-game)의 내용을 참조하십시오.

![iPhone에서 The Coast 게임을 실행한 스크린샷. 게임 오버레이가 열려 있으며 멀티플레이어 활동을 시작하는 게임 내 UI가 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-multiplayer-in-game-ui@2x.png)

**흥미로운 활동 아트워크를 제공하십시오.** 플레이어는 파티 코드, Games 앱 또는 게임 내 UI 등 시스템 전반에서 멀티플레이어 활동의 미리보기 이미지를 보게 됩니다. 다음 명세를 따라 아트워크를 생성하십시오.

![멀티플레이어 활동 카드의 다이어그램. 활동 제목, 아트워크, 플레이어 수, 카드 하단의 시스템 제공 그라디언트를 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-multiplayer-anatomy@2x.png)

![멀티플레이어 활동 이미지에 대한 레이아웃이 표시된 다이어그램. 이미지 크기, 자른 영역을 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/games-multiplayer-image-specs@2x.png)

| 속성 | 값 |
| --- | --- |
| 포맷 | JPEG, JPG 또는 PNG |
| 색상 공간 | sRGB 또는 P3 |
| 해상도 | 최소 72DPI |
| 이미지 크기 | 1920x1080pt(3840x2160px @2x) |
| 자른 영역 | 1465x767pt(2930x1534px @2x) |

## 플랫폼 고려 사항

*iOS, iPadOS, macOS 또는 visionOS에 대한 추가 고려 사항은 없습니다.*

### tvOS

**대시보드 상단에 선택적으로 추가 이미지를 표시하십시오.** tvOS에서는 대시보드에 게임의 감성을 강조하는 추가 아트워크를 넣을 수 있습니다. 멀리서도 잘 알아볼 수 있는 단순하고 인지하기 쉬운 이미지를 사용하십시오. 게임의 로고나 워드 마크를 사용하는 것을 고려하되, 앱 아이콘은 이 이미지에 사용하지 마십시오. 다음 명세를 따라 대시보드 이미지를 생성하십시오.

![tvOS 대시보드 이미지에 대한 레이아웃이 표시된 다이어그램. 이미지 크기를 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/tvos-dashboard-image@2x.png)

| 속성 | 값 |
| --- | --- |
| 이미지 크기 | 600x180pt(1200x360px @2x) |
| 포맷 | PNG, TIF 또는 JPG |
| 색상 공간 | sRGB 또는 P3 |
| 해상도 | 최소 72DPI |

### watchOS

**watchOS의 Game Center 지원 사항을 숙지하십시오.** GameKit 기능과 API는 watchOS 게임에서 사용할 수 있지만 watchOS에는 호출 가능한 시스템 지원 Game Center UI가 없습니다. 대신, watchOS 게임의 Game Center 콘텐츠는 연결된 iPhone에 표시됩니다.

## 리소스

#### 관련 콘텐츠

[게임 설계하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-games)

[게임 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls)

[Apple Design Resources](https://developer.apple.com/design/resources/#technologies)

#### Developer 문서

[GameKit](https://developer.apple.com/documentation/gamekit)

[Creating activities for your game](https://developer.apple.com/documentation/gamekit/creating-activities-for-your-game)

[Creating engaging challenges from leaderboards](https://developer.apple.com/documentation/gamekit/creating-engaging-challenges-from-leaderboards)

[Create games for Apple platforms](https://developer.apple.com/games/)

[Game Porting Toolkit](https://developer.apple.com/games/game-porting-toolkit/)

#### 비디오

- [Game Center 시작하기](https://developer.apple.com/kr/videos/play/wwdc2025/214) — Game Center의 기능을 살펴보고 시작하는 방법을 알아보세요. 게임의 노출도를 극대화하고, 새로운 플레이어를 확보하며, 참여도를 높이기 위해 성과, 챌린지, 리더보드 및 활동을 구현하는 모범 사례를 보여드립니다. 또한 이 세션을 최대한 활용하려면 ‘Apple Games 앱으로 플레이어와 소통하기’를 시청하는 것도 좋습니다.
- [Apple Games 앱으로 플레이어와 소통하기](https://developer.apple.com/kr/videos/play/wwdc2025/215) — 플레이어들이 한 곳에서 최신 게임 소식을 확인하고, 새로운 게임을 발견하며, 친구들과 함께 게임을 즐기는 새로운 공간인 Games 앱을 만나보세요. Games 앱에서 최적의 가시성을 확보할 수 있도록 게임을 설정하고, Game Center를 통합하여 소셜 플레이를 활성화하며, 앱 내 이벤트로 플레이어들을 다시 유입시키는 방법을 알아보세요. 이 세션을 최대한 활용하려면 ‘Game Center 시작하기’를 시청하는 것도 좋습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 새로운 도전 과제 및 멀티플레이어 활동에 대한 지침과 Apple Games 앱 및 게임 오버레이에 대한 고려 사항이 추가됨. 활동 미리보기 이미지에 대한 지침 및 명세가 업데이트됨. |
| 2024년 2월 2일 | visionOS 게임에서 액세스 포인트 및 대시보드 사용에 대한 개발자 지침으로 연결하는 링크가 추가됨. |
| 2023년 9월 12일 | iOS 목표 달성 레이아웃에 아트워크가 추가됨. |
| 2023년 5월 2일 | 지침을 한 페이지에 통합함. |
