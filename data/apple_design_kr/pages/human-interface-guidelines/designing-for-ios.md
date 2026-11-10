# iOS용으로 디자인하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-ios

> 사람들은 어디에서나 이동 중에도 iPhone을 통해 소통하고, 게임을 플레이하고, 미디어를 보고, 작업을 수행하고, 개인 데이터를 추적합니다.

![그리드 위에 스타일화된 iPhone 프레임 모양이 표시되어 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 초록색을 은은하게 반영하는 초록색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/platforms-iOS-intro@2x.png)

iOS용 앱 또는 게임을 디자인할 때에는 iOS 경험을 차별화하는 다음과 같은 기본적인 기기 특성 및 패턴을 먼저 이해해야 합니다. 이러한 특성과 패턴을 사용하여 디자인 결정을 내리는 것은 iPhone 사용자가 만족하는 앱이나 게임을 개발하는 데 도움이 될 수 있습니다.

**디스플레이.** iPhone에는 중형 크기의 고해상도 디스플레이가 탑재되어 있습니다.

**인체공학.** 사람들은 일반적으로 iPhone을 한 손 또는 두 손으로 잡고 필요에 따라 가로와 세로로 화면 방향을 전환하며 iPhone과 상호작용합니다. 사람들이 기기와 상호작용할 때 주시 거리는 대체로 약 30cm 또는 60cm를 넘지 않습니다.

**입력.** 사람들은 Multi-Touch [제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures), [가상 키보드](https://developer.apple.com/kr/design/human-interface-guidelines/virtual-keyboards) 및 [Siri](https://developer.apple.com/kr/design/human-interface-guidelines/siri) 명령을 사용하여 이동 중에 동작을 수행하고 의미 있는 작업을 완료할 수 있습니다. 또한 사람들은 대체적으로 앱이 자신의 [개인정보 보호](https://developer.apple.com/kr/design/human-interface-guidelines/privacy)를 사용하고 기기의 [자이로스코프 및 가속도계](https://developer.apple.com/kr/design/human-interface-guidelines/gyro-and-accelerometer) 입력을 사용하기를 원하며, [spatial interactions](https://developer.apple.com/design/human-interface-guidelines/spatial-interactions)에 참여하는 것을 원하기도 합니다.

**앱 상호작용.** 때때로 사람들은 1~2분만 사용하여 이벤트 또는 소셜 미디어 업데이트를 확인하거나, 데이터를 추적하거나, 메시지를 보냅니다. 하지만 어떤 때는 1시간 이상 웹을 브라우징하거나, 게임을 플레이하거나, 미디어를 감상하기도 합니다. 일반적으로 사람들은 동시에 여러 앱을 열어 놓으며, 여러 앱 간에 자주 전환합니다.

**시스템 기능.** iOS는 사람들이 친숙하고 일관적인 방식으로 시스템 및 앱과 상호작용할 수 있는 여러 기능을 제공합니다.

- [위젯](https://developer.apple.com/kr/design/human-interface-guidelines/widgets)
- [홈 화면 빠른 동작](https://developer.apple.com/kr/design/human-interface-guidelines/home-screen-quick-actions)
- [검색하기](https://developer.apple.com/kr/design/human-interface-guidelines/searching)
- [Siri](https://developer.apple.com/kr/design/human-interface-guidelines/siri#Shortcuts-and-suggestions)
- [동작 보기](https://developer.apple.com/kr/design/human-interface-guidelines/activity-views)

## 모범 사례

탁월한 iPhone 경험을 제공하려면 사람들이 가장 중요하게 생각하는 플랫폼 및 기기의 기능이 통합되어야 합니다. iOS와 잘 어울리도록 디자인하려면 다음과 같은 방법을 우선시하여 이러한 기능을 포함하십시오.

- 화면상의 제어기 수를 제한하고, 최소한의 상호작용으로 추가 세부사항 및 동작을 찾을 수 있도록 하여 사람들이 주요 작업과 콘텐츠에 집중할 수 있도록 하십시오.
- 기기 방향, 다크 모드, 다이나믹 타입과 같은 화면 모양 변경 사항을 매끄럽게 적용하여 사람들이 자신에게 가장 적합한 구성을 선택할 수 있도록 하십시오.
- 사람들이 일반적으로 기기를 잡는 방식과 부합하는 상호작용을 지원하십시오. 예를 들어, 대부분의 사람들은 디스플레이의 중간 또는 하단 영역에 위치한 제어기가 사용하기 더 쉽고 편하다고 느낍니다. 따라서 사람들이 쓸어넘기기 동작으로 뒤로 이동하거나, 목록 행에서 동작을 실행할 수 있도록 하는 것은 매우 중요합니다.
- 사람들로부터 권한을 받아, 데이터 입력을 요청하지 않으면서 경험을 향상하는 방식으로 플랫폼 기능을 통해 사용할 수 있는 정보를 통합하십시오. 예를 들어, 결제를 수락하거나, 생체 인증을 통해 보안을 제공하거나, 기기의 위치를 사용하는 기능을 제공할 수 있습니다.

## 리소스

#### 관련 콘텐츠

[Apple Design Resources](https://developer.apple.com/design/resources/#ios-apps)

#### Developer 문서

[iOS Pathway](https://developer.apple.com/ios/get-started/)

#### 비디오

- [Liquid Glass 만나보기](https://developer.apple.com/kr/videos/play/wwdc2025/219) — Liquid Glass는 더욱 역동적이고 표현력 있는 사용자 경험을 제공하면서 Apple 플랫폼 디자인 언어를 통합합니다. Liquid Glass의 설계 원칙을 알아보고, 핵심적인 광학 및 물리적 속성을 탐구하며, 이를 사용하는 위치와 이유를 알아보세요.
- [새로운 디자인 시스템과 더 친숙해지는 법](https://developer.apple.com/kr/videos/play/wwdc2025/356) — 새로운 디자인 시스템을 자세히 확인하여 시각 디자인, 정보 아키텍처 및 핵심 시스템 구성 요소에 대한 주요 변경 사항을 확인하세요. 이 시스템이 인터페이스와 콘텐츠 간의 관계를 재편하여 기기, 화면 크기 및 입력 모드에 걸쳐 동적이고, 조화로우며, 일관성 있는 디자인을 만들도록 지원하는 방법을 알아보세요.
