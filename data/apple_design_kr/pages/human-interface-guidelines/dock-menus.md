# Dock 메뉴

Source: https://developer.apple.com/kr/design/human-interface-guidelines/dock-menus

> Mac에서 Dock의 앱이나 게임 아이콘을 보조 클릭하여 시스템 제공 항목과 사용자 설정 항목 모두 볼 수 있는 Dock 메뉴를 표시할 수 있습니다.

![Dock의 아이콘에서 펼쳐지는 스타일화된 메뉴 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-dock-menu-intro@2x.png)

시스템 제공 Dock 메뉴 항목은 앱이 열려 있는지에 따라 변경될 수 있습니다. 예를 들어, Safari의 Dock 메뉴에는 현재 윈도우 보기 또는 새로운 윈도우 생성하기와 같은 동작을 위한 메뉴 항목이 포함되어 있습니다.

> **참고:** iOS 및 iPadOS는 Dock 메뉴를 지원하지 않지만 사람들이 홈 화면 또는 Dock에서 앱 아이콘을 길게 누르면 시스템 제공 항목과 사용자 설정 항목으로 구성된 유사한 메뉴를 표시할 수 있으며, 이를 홈 화면 빠른 동작이라고 합니다. 지침을 보려면 [홈 화면 빠른 동작](https://developer.apple.com/kr/design/human-interface-guidelines/home-screen-quick-actions)의 내용을 참조하십시오.

## 모범 사례

모든 메뉴와 마찬가지로 Dock 메뉴 항목에 간결하게 레이블을 지정하고 논리적으로 구성해야 합니다. 지침을 보려면 [메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus)의 내용을 참조하십시오.

**다른 위치에서도 사용자 설정 Dock 메뉴 항목을 사용할 수 있도록 하십시오.** 모든 사람이 Dock 메뉴를 사용하지는 않기 때문에, 메뉴 막대의 메뉴나 인터페이스 내부와 같이 다른 곳에서 동일한 명령을 제공하는 것이 중요합니다.

**Dock 메뉴에서 유용한 사용자 설정 항목을 우선시하십시오.** 예를 들어, Dock 메뉴는 현재 또는 최근에 열린 윈도우를 모두 나열하여 사람들이 원하는 윈도우로 편리하게 이동할 수 있습니다. 또한 앱이 가장 앞에 열려 있지 않거나 열려 있는 윈도우가 없는 경우, 가장 유용할 만한 몇 가지 동작을 나열하는 것을 고려하십시오. 예를 들어, Mail 앱에는 열려 있는 모든 윈도우를 나열하는 것 외에도 새로운 메일을 받고 새로운 메시지를 작성하는 항목이 포함되어 있습니다.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus)

[홈 화면 빠른 동작](https://developer.apple.com/kr/design/human-interface-guidelines/home-screen-quick-actions)

#### Developer 문서

[applicationDockMenu(_:)](https://developer.apple.com/documentation/appkit/nsapplicationdelegate/applicationdockmenu(_:)) — AppKit
