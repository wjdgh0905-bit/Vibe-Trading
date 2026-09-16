# tvOS용으로 디자인하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-tvos

> 사람들은 tvOS가 미디어 및 게임, 피트니스, 교육 및 홈 유틸리티 앱에서 제공하는 생동감 있는 콘텐츠, 몰입감 넘치는 경험, 간결한 상호작용에 만족해 합니다.

![그리드 위에 스타일화된 TV 모양이 표시되어 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 초록색을 은은하게 반영하는 초록색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/platforms-tvOS-intro@2x.png)

tvOS용 앱 또는 게임을 디자인할 때에는 tvOS 경험을 차별화하는 다음과 같은 기본적인 기기 특성 및 패턴을 먼저 이해해야 합니다. 이러한 특성과 패턴을 사용하여 디자인 결정을 내리는 것은 tvOS 사용자가 만족하는 앱이나 게임을 개발하는 데 도움이 될 수 있습니다.

**디스플레이.** 일반적으로 TV에는 대형 크기의 고해상도 디스플레이가 포함되어 있습니다.

**인체공학.** 대개의 경우 사람들은 고정된 자리에 위치한 TV에서 멀리 떨어져 있지만(주로 약 243cm 이상) 때때로 방 안을 돌아다니며 콘텐츠와 계속 상호작용하기도 합니다.

**입력.** 사람들은 [리모컨](https://developer.apple.com/kr/design/human-interface-guidelines/remotes), [게임 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls), [Siri](https://developer.apple.com/kr/design/human-interface-guidelines/siri) 및 다른 기기에서 실행되는 앱을 사용하여 Apple TV와 상호작용합니다.

**앱 상호작용.** 사람들은 주로 여러 시간 동안 지속되는 한 가지 경험에 깊게 몰입하지만, 화면 속 화면 보기를 사용하여 동시에 다른 앱 또는 비디오를 확인하기도 합니다.

**시스템 기능.** Apple TV 사용자는 앱과 게임이 다음과 같은 시스템 경험과 잘 통합되기를 기대합니다.

- [TV 앱과의 통합](https://developer.apple.com/kr/design/human-interface-guidelines/playing-video#Integrating-with-the-TV-app)
- [SharePlay](https://developer.apple.com/kr/design/human-interface-guidelines/shareplay)
- [상단](https://developer.apple.com/kr/design/human-interface-guidelines/top-shelf)
- [TV 제공업체 계정](https://developer.apple.com/kr/design/human-interface-guidelines/managing-accounts#TV-provider-accounts)

## 모범 사례

탁월한 tvOS 경험을 제공하려면 사람들이 가장 중요하게 생각하는 플랫폼 및 기기의 기능이 통합되어야 합니다. tvOS와 잘 어울리는 경험을 제공하려면 다음과 같은 방법을 우선시하여 이러한 기능을 포함하십시오.

- 사람들이 Siri Remote로 수행하는 부드럽고 친숙한 제스처를 통해 강력하고 기분 좋은 상호작용을 지원하십시오.
- tvOS 초점 시스템을 활용하여 사람들이 항목을 탐색할 때 화면의 항목이 부드럽게 하이라이트 및 확장되어 사람들이 무엇을 수행해야 하고 현재 어느 위치에 있는지 항상 알 수 있도록 하십시오.
- 화면을 가득 채우는 아름다운 아트워크, 은은하고 부드러운 애니메이션, 매력적인 사운드를 제공하여 사람들이 방 전체에서 명료하고 또렷하게 그리고 흥미롭게 즐길 수 있는 풍부한 시네마틱 경험을 선사하십시오.
- 로그인을 자주 요청하지 않고 쉽게 로그인할 수 있게 만들고, 공유 로그인을 처리하고, 사람들이 현재 보는 사람을 변경할 때 자동으로 프로필이 전환되도록 하여 다중 사용자 지원을 향상하십시오.

## 리소스

#### 관련 콘텐츠

[Apple Design Resources](https://developer.apple.com/design/resources/#tvos-apps)

#### Developer 문서

[tvOS Pathway](https://developer.apple.com/tvos/get-started/)

#### 비디오

- [Build SwiftUI apps for tvOS](https://developer.apple.com/kr/videos/play/wwdc2020/10042) — Add a new dimension to your tvOS app with SwiftUI. We’ll show you how to build layouts powered by SwiftUI and customize your interface with custom buttons, provide more functionality in your app with a context menu, check if views are focused, and manage default focus.

To get the most out of this session, you should be comfortable with SwiftUI. For a primer, watch “Introducing SwiftUI: Building Your First App” and “SwiftUI On All Devices.”

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2022년 9월 14일 | 다중 사용자 지원에 대한 모범 사례 수정. |
