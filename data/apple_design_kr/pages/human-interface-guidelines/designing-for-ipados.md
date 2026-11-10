# iPadOS용으로 디자인하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-ipados

> 사람들은 미디어를 감상하고, 게임을 플레이하고, 세밀한 생산성 작업을 수행하고, 창작 작업을 하도록 지원하는 iPad의 성능, 이동성, 유연성을 중요하게 생각합니다.

![그리드 위에 스타일화된 iPad 프레임 모양이 표시되어 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 초록색을 은은하게 반영하는 초록색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/platforms-iPadOS-intro@2x.png)

iPad용 앱 또는 게임을 디자인할 때에는 iPadOS 경험을 차별화하는 다음과 같은 기본적인 기기 특성 및 패턴을 먼저 이해해야 합니다. 이러한 특성과 패턴을 사용하여 디자인 결정을 내리는 것은 iPad 사용자가 만족하는 앱이나 게임을 개발하는 데 도움이 될 수 있습니다.

**디스플레이.** iPad에는 대형 크기의 고해상도 디스플레이가 탑재되어 있습니다.

**인체공학.** 사람들은 주로 iPad를 손에 들고 사용하지만 어딘가에 올려놓거나 스탠드를 사용하기도 합니다. 기기를 놓는 방식에 따라 주시 거리가 변하지만 대체적으로 사람들을 약 91cm 이내에서 기기와 상호작용합니다.

**입력.** 사람들은 Multi-Touch [제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures) 및 [가상 키보드](https://developer.apple.com/kr/design/human-interface-guidelines/virtual-keyboards), 연결된 [키보드](https://developer.apple.com/kr/design/human-interface-guidelines/keyboards) 또는 [포인팅 장치](https://developer.apple.com/kr/design/human-interface-guidelines/pointing-devices), [Apple Pencil 및 손글씨 입력](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pencil-and-scribble) 또는 [Siri](https://developer.apple.com/kr/design/human-interface-guidelines/siri)을 사용하여 iPad와 상호작용할 수 있으며, 주로 여러 입력 모드를 조합하여 사용합니다.

**앱 상호작용.** 때때로 사람들은 iPad에서 몇 가지 간단한 동작을 수행합니다. 하지만 어떤 때는 게임, 미디어, 콘텐츠 창작 또는 생산성 작업에 몇 시간 동안 몰두하기도 합니다. 사람들은 자주 여러 앱을 동시에 열어 놓으며, 화면에서 한 번에 두 개 이상의 앱을 보고 드래그 앤 드롭과 같은 앱 상호 기능을 사용합니다.

**시스템 기능.** iPadOS는 사람들이 친숙하고 일관적인 방식으로 시스템 및 앱과 상호작용할 수 있는 여러 기능을 제공합니다.

- [멀티태스킹](https://developer.apple.com/kr/design/human-interface-guidelines/multitasking)
- [위젯](https://developer.apple.com/kr/design/human-interface-guidelines/widgets)
- [드래그 앤 드롭](https://developer.apple.com/kr/design/human-interface-guidelines/drag-and-drop)

## 모범 사례

탁월한 iPad 경험을 제공하려면 사람들이 가장 중요하게 생각하는 플랫폼 및 기기의 기능이 통합되어야 합니다. iPadOS와 잘 어울리는 경험을 제공하려면 다음과 같은 방법을 우선시하여 이러한 기능을 포함하십시오.

- 대형 디스플레이의 이점을 활용하여 모달 인터페이스와 전체 화면 전환을 최소화하고, 방해가 되는 곳이 아닌 쉽게 사용할 수 있는 곳에 화면상의 제어기를 배치하여 사람들이 관심을 갖는 콘텐츠를 부각시키십시오.
- 주시 거리 및 입력 모드를 사용하여 화면에 표시하려는 콘텐츠의 크기 및 밀도를 결정하십시오.
- 사람들이 Multi-Touch 제스처, 실제 키보드나 트랙패드, Apple Pencil을 사용할 수 있도록 허용하고, 여러 입력 모드를 조합하는 고유한 상호작용 지원을 고려하십시오.
- 기기 방향, 멀티태스킹 모드, 다크 모드, 다이나믹 타입과 같은 화면 모양 변경 사항을 매끄럽게 적용하고, macOS로 쉽게 전환되도록 하여 사람들이 자신에게 가장 적합한 구성을 선택할 수 있도록 하십시오.

## 리소스

#### 관련 콘텐츠

[Apple Design Resources](https://developer.apple.com/design/resources/#ios-apps)

#### Developer 문서

[iPadOS Pathway](https://developer.apple.com/ipados/get-started/)

#### 비디오

- [iPad 앱 디자인 향상하기](https://developer.apple.com/kr/videos/play/wwdc2025/208) — iPadOS에서 앱의 디자인과 분위기를 멋지게 만드세요. 크기 조절이 가능한 앱 윈도우를 위한 반응성 레이아웃을 설계하는 모범 사례를 확인할 수 있습니다. 윈도우 제어에 익숙해지고 이를 조정하는 최선의 방법을 알아보세요. 훌륭한 메뉴 바의 구성 요소를 살펴보고 새로운 포인터와 업데이트된 포인터 효과도 만나볼 수 있습니다.
- [Liquid Glass 만나보기](https://developer.apple.com/kr/videos/play/wwdc2025/219) — Liquid Glass는 더욱 역동적이고 표현력 있는 사용자 경험을 제공하면서 Apple 플랫폼 디자인 언어를 통합합니다. Liquid Glass의 설계 원칙을 알아보고, 핵심적인 광학 및 물리적 속성을 탐구하며, 이를 사용하는 위치와 이유를 알아보세요.
- [새로운 디자인 시스템과 더 친숙해지는 법](https://developer.apple.com/kr/videos/play/wwdc2025/356) — 새로운 디자인 시스템을 자세히 확인하여 시각 디자인, 정보 아키텍처 및 핵심 시스템 구성 요소에 대한 주요 변경 사항을 확인하세요. 이 시스템이 인터페이스와 콘텐츠 간의 관계를 재편하여 기기, 화면 크기 및 입력 모드에 걸쳐 동적이고, 조화로우며, 일관성 있는 디자인을 만들도록 지원하는 방법을 알아보세요.
