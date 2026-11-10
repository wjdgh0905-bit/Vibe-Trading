# 전체 화면 사용하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/going-full-screen

> iPhone, iPad 및 Mac에서 윈도우를 확장하여 화면을 채우는 전체 화면 모드를 통해 시스템 제어기를 가리고 방해받지 않는 환경을 제공할 수 있습니다.

![왼쪽 상단에서 오른쪽 하단으로 펼쳐지는 수직선 위에 배열된 바깥으로 향하는 두 개의 화살표 모양 스케치가 있고, 확장을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-going-full-screen-intro@2x.png)

기본적으로 Apple TV와 Apple Watch에서는 앱과 게임으로 이미 화면이 채워져 있으므로 전체 화면 모드를 제공하지 않습니다. Apple Vision Pro에서는 사람들이 윈도우를 확장하여 시야를 더 많이 확보하거나 Digital Crown을 사용하여 패스스루를 가리고 더욱 몰입되는 경험으로 전환할 수 있기 때문에 전체 화면 모드를 제공하지 않습니다(지침을 보려면 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)의 내용 참조).

## 모범 사례

**경험을 제공하는 데 적합하다면 전체 화면 모드를 지원하십시오.** 사람들은 작업에 집중하고 싶을 때 또는 콘텐츠에 몰입하고 싶을 때 전체 화면 모드를 자주 사용합니다. 게임을 플레이하거나, 비디오 또는 사진 슬라이드쇼와 같은 미디어를 보거나, 방해받지 않는 환경에서 더 좋은 성과를 낼 수 있는 심층적 작업을 수행할 수 있는 경험을 선사할 수 있다면 전체 화면 모드를 제공하는 것을 고려하십시오.

**필요한 경우 전체 화면 모드에서 레이아웃을 조정하되, 윈도우 크기를 프로그램적으로 조정하지는 마십시오.** 전체 화면 모드가 아니었을 때보다 전체 화면 모드에서 윈도우가 더 큰 경우, 추가 공간을 잘 활용하면서 필수 콘텐츠를 계속 부각하는 것이 좋습니다. 예를 들어 표시되는 항목은 그대로 두고 인터페이스 비율을 조정하는 것이 합리적일 수 있습니다. 인터페이스 비율을 조정하는 경우, 일관된 인터페이스를 유지하면서 모드 간에 전환할 때 시각적으로 거슬리지 않도록 섬세하게 조정해야 합니다.

**사람들이 전체 화면 모드를 종료하지 않고도 작업을 완료할 수 있도록 필수 기능과 제어기에 대한 접근 권한을 계속 제공하십시오.** 예를 들어, 전체 화면 미디어 경험의 경우 재생 제어기가 지속적으로 표시되거나, 필요시 쉽게 표시되어야 합니다.

**게임을 제외하고 iPadOS 또는 macOS 앱이 전체 화면 모드일 때 사람들이 Dock을 표시할 수 있도록 하십시오.** iPadOS 및 macOS에서는 사람들이 Dock에 언제든지 접근하여 앱과 기타 Dock 항목을 빠르게 열 수 있도록 해야 합니다. 전체 화면으로 게임을 플레이하는 동안 실수로 Dock이 표시되지 않도록 하려면 iPadOS에서는 화면 하단 가장자리에서 처음 쓸어올릴 경우 무시하도록 요청하고, macOS에서는 Dock을 완전히 가리도록 요청하면 됩니다. 개발자 지침을 보려면 [preferredScreenEdgesDeferringSystemGestures](https://developer.apple.com/documentation/swiftui/uihostingcontroller/preferredscreenedgesdeferringsystemgestures)(SwiftUI), [preferredScreenEdgesDeferringSystemGestures](https://developer.apple.com/documentation/uikit/uiviewcontroller/preferredscreenedgesdeferringsystemgestures)(UIKit) 및 [hideDock](https://developer.apple.com/documentation/appkit/nsapplication/presentationoptions-swift.struct/hidedock)(AppKit)의 내용을 참조하십시오.

**사람들이 전체 화면 환경에서 다른 화면으로 전환한 후 돌아올 때, 진행하던 위치에서 다시 시작할 수 있도록 합니다.** 예를 들어, 게임 또는 슬라이드쇼는 사람들이 환경을 떠날 때 아무것도 놓치지 않도록 자동으로 일시 정지되어야 합니다.

**사람들이 언제 전체 화면 모드를 종료할지 선택할 수 있게 하십시오.** 일반적으로 사람들은 다른 환경으로 전환하거나, 게임 플레이 또는 영화 재생과 같이 몰입하고 있는 활동을 완료할 때 전체 화면 모드가 자동으로 종료될 것이라고 예상하지 않습니다.

**도구 막대와 탐색 제어기를 일시적으로 가려서 콘텐츠를 우선시하십시오.** 전체 화면 사진을 보거나 문서를 읽는 등 콘텐츠에 집중해야 할 상황에서는 일부 요소를 가려서 방해받지 않는 환경을 제공할 수 있습니다. 이러한 동작을 구현하는 경우, 사람들이 탭하기, 아래로 쓸어내리기, 커서를 화면 상단으로 이동하기 같은 익숙한 제스처나 동작으로 가려진 요소를 복원할 수 있도록 하십시오. 탐색이나 작업 수행에 필수적인 제어기는 항상 표시되도록 유지해야 합니다. visionOS 윈도우에서 도구 막대 또는 탐색 제어기를 가릴 수 있어도 사람들은 일반적으로 Apple Vision Pro를 착용한 상태에서 다른 유형의 몰입형 경험을 기대합니다. 지침을 보려면 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS

**전체 화면 앱 또는 게임에서 실수로 종료되는 일을 방지하려면 시스템 제스처를 지연시키는 것을 고려하십시오.** 기본적으로 홈 화면 표시기는 누군가 앱이나 게임으로 전환한 직후 자동으로 가려집니다. 화면 하단 부분과 상호작용하면 홈 화면 표시기가 다시 나타나며, 한 번 쓸어넘겨서 종료할 수 있습니다. 이는 익숙하고 사람들이 예상하는 방식이기 때문에 가능한 한 이 동작을 유지하십시오. 이 동작을 지원하는 과정에서 예기치 않게 종료되는 문제가 발생하는 경우, 한 번이 아닌 두 번의 쓸어넘기기로 종료되도록 설정할 수 있습니다. 개발자 지침을 보려면 [preferredScreenEdgesDeferringSystemGestures](https://developer.apple.com/documentation/swiftui/uihostingcontroller/preferredscreenedgesdeferringsystemgestures)의 내용을 참조하십시오.

### macOS

**시스템 제공 전체 화면 경험을 사용하십시오.** 시스템의 전체 화면 지원을 사용하면 모든 상황에서 전체 화면 윈도우가 잘 작동할 수 있습니다. 예를 들어, 일부 Mac 모델은 화면의 가운데 상단 영역을 차지하는 카메라 하우징을 포함합니다. 시스템의 전체 화면 지원을 사용하면 이 영역이 자동으로 조정됩니다. 개발자 지침을 보려면 [toggleFullScreen(_:)](https://developer.apple.com/documentation/appkit/nswindow/togglefullscreen(_:))의 내용을 참조하십시오.

**게임에서 플레이어가 전체 화면으로 전환할 때 디스플레이 모드를 변경하지 마십시오.** 사람들은 디스플레이 모드를 직접 제어하고 싶어하며 자동으로 변경해도 성능이 향상되는 것은 아닙니다.

추가 개발자 지침을 보려면 [Managing your game window for Metal in macOS](https://developer.apple.com/documentation/metal/managing-your-game-window-for-metal-in-macos)의 내용을 참조하십시오.

**전체 화면 모드로 전환할 시기를 반드시 사람들이 선택하도록 하십시오.** 사람들이 윈도우의 전체 화면 시작 버튼, 보기 메뉴 항목 또는 Control-Command-F 키보드 단축키를 사용할 수 있도록 허용하십시오. 윈도우 모드의 사용자 설정 메뉴는 제공하지 마십시오. 게임에서는 전체 화면 모드를 켜고 끄는 사용자 설정 [토글](https://developer.apple.com/kr/design/human-interface-guidelines/toggles)을 제공할 수도 있습니다.

## 리소스

#### 관련 콘텐츠

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

[멀티태스킹](https://developer.apple.com/kr/design/human-interface-guidelines/multitasking)

[윈도우](https://developer.apple.com/kr/design/human-interface-guidelines/windows)

[메뉴 막대](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar)

#### Developer 문서

[fullScreenCover(item:onDismiss:content:)](https://developer.apple.com/documentation/swiftui/view/fullscreencover(item:ondismiss:content:)) — SwiftUI

[NSScreen](https://developer.apple.com/documentation/appkit/nsscreen) — AppKit

[NSWindow.CollectionBehavior](https://developer.apple.com/documentation/appkit/nswindow/collectionbehavior-swift.struct) — AppKit

[Managing your game window for Metal in macOS](https://developer.apple.com/documentation/metal/managing-your-game-window-for-metal-in-macos) — Swift, Objective-C

#### 비디오

- [iPad 앱 디자인 향상하기](https://developer.apple.com/kr/videos/play/wwdc2025/208) — iPadOS에서 앱의 디자인과 분위기를 멋지게 만드세요. 크기 조절이 가능한 앱 윈도우를 위한 반응성 레이아웃을 설계하는 모범 사례를 확인할 수 있습니다. 윈도우 제어에 익숙해지고 이를 조정하는 최선의 방법을 알아보세요. 훌륭한 메뉴 바의 구성 요소를 살펴보고 새로운 포인터와 업데이트된 포인터 효과도 만나볼 수 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 전체 화면 iOS 및 iPadOS 앱과 게임에서 도구 막대 및 탐색 제어기 가리기, 홈 화면 표시기 제스처 지연에 대한 지침이 업데이트됨. |
| 2024년 6월 10일 | 전체 화면 모드에서 게임을 플레이하는 방법에 대한 지침이 향상됨. |
