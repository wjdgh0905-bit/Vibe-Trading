# macOS용으로 디자인하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-macos

> 사람들은 Mac의 성능, 넓은 공간, 유연성을 기반으로 심층적인 생산성 작업을 수행하고, 미디어 또는 콘텐츠를 보고, 게임을 플레이하며, 대개의 경우 동시에 여러 앱을 사용합니다.

![그리드 위에 스타일화된 Mac 모양이 표시되어 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 초록색을 은은하게 반영하는 초록색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/platforms-macOS-intro@2x.png)

macOS용 앱 또는 게임을 디자인할 때에는 macOS 경험을 차별화하는 다음과 같은 기본적인 기기 특성 및 패턴을 먼저 이해해야 합니다. 이러한 특성과 패턴을 사용하여 디자인 결정을 내리는 것은 Mac 사용자가 만족하는 앱이나 게임을 개발하는 데 도움이 될 수 있습니다.

**디스플레이.** Mac에는 주로 대형 크기의 고해상도 디스플레이가 포함되어 있으며 사람들은 iPad를 포함한 추가 디스플레이를 연결하여 업무 공간을 확장할 수 있습니다.

**인체공학.** 사람들은 보통 이동하지 않고 한자리에 머물면서 Mac을 사용하며 주로 책상 또는 테이블에 기기를 올려놓습니다. 일반적인 사용 상황에서 주시 거리는 약 30~91cm 사이입니다.

**입력.** 사람들은 실제 [키보드](https://developer.apple.com/kr/design/human-interface-guidelines/keyboards), [포인팅 장치](https://developer.apple.com/kr/design/human-interface-guidelines/pointing-devices), [게임 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls) 및 [Siri](https://developer.apple.com/kr/design/human-interface-guidelines/siri)와 같은 입력 모드를 조합하여 데이터를 입력하고 인터페이스를 제어하기를 기대합니다.

**앱 상호작용.** 몇 분 동안 간단히 작업을 수행하거나 몇 시간 동안 깊이 집중하는 등 다양한 시간으로 상호작용이 지속될 수 있습니다. 사람들은 자주 여러 앱을 동시에 열어 놓으며, 한 앱에서 다른 앱으로 전환할 때 활성 및 비활성 상태 간에 부드럽게 전환이 이루어지기를 기대합니다.

**시스템 기능.** macOS는 사람들이 친숙하고 일관적인 방식으로 시스템 및 앱과 상호작용할 수 있는 여러 기능을 제공합니다.

- [메뉴 막대](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar)
- [파일 관리](https://developer.apple.com/kr/design/human-interface-guidelines/file-management)
- [전체 화면 사용하기](https://developer.apple.com/kr/design/human-interface-guidelines/going-full-screen)
- [Dock 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/dock-menus)

## 모범 사례

탁월한 Mac 경험을 제공하려면 사람들이 가장 중요하게 생각하는 플랫폼 및 기기의 기능이 통합되어야 합니다. macOS와 잘 어울리도록 디자인하려면 다음과 같은 방법을 우선시하여 이러한 기능을 포함하십시오.

- 대형 디스플레이의 이점을 활용하여 더 적은 중첩 수준과 모달 형식으로 더 많은 콘텐츠를 표시하고, 사람들이 쉽게 자신이 원하는 콘텐츠를 확인할 수 있도록 정보의 밀도를 부담 없는 수준으로 유지하십시오.
- 사람들이 자신의 작업 스타일 및 기기 구성에 맞게 윈도우의 크기를 조절하고, 가리고, 이동할 수 있게 허용하고, 전체 화면 모드를 지원하여 집중할 수 있는 환경을 제공하십시오.
- 사람들이 앱에서 작업을 수행하는 데 필요한 모든 명령에 쉽게 접근할 수 있도록 메뉴 막대를 사용하십시오.
- 사람들이 고정밀 입력 모드의 이점을 활용하여 픽셀 단위의 선택 및 편집을 수행할 수 있도록 지원하십시오.
- 키보드 단축키를 지원하여 사람들이 동작을 빠르게 실행하고 키보드 전용 방식의 작업 스타일을 사용할 수 있도록 하십시오.
- 개인 맞춤화를 지원하여 사람들이 도구 막대를 사용자화하고, 자주 사용하는 보기를 표시하도록 윈도우를 구성하고, 인터페이스에 적용할 색상 및 서체를 선택할 수 있도록 허용하십시오.

## 리소스

#### 관련 콘텐츠

[Apple Design Resources](https://developer.apple.com/design/resources/#macos-apps)

#### Developer 문서

[macOS Pathway](https://developer.apple.com/macos/get-started/)

#### 비디오

- [Liquid Glass 만나보기](https://developer.apple.com/kr/videos/play/wwdc2025/219) — Liquid Glass는 더욱 역동적이고 표현력 있는 사용자 경험을 제공하면서 Apple 플랫폼 디자인 언어를 통합합니다. Liquid Glass의 설계 원칙을 알아보고, 핵심적인 광학 및 물리적 속성을 탐구하며, 이를 사용하는 위치와 이유를 알아보세요.
- [새로운 디자인 시스템과 더 친숙해지는 법](https://developer.apple.com/kr/videos/play/wwdc2025/356) — 새로운 디자인 시스템을 자세히 확인하여 시각 디자인, 정보 아키텍처 및 핵심 시스템 구성 요소에 대한 주요 변경 사항을 확인하세요. 이 시스템이 인터페이스와 콘텐츠 간의 관계를 재편하여 기기, 화면 크기 및 입력 모드에 걸쳐 동적이고, 조화로우며, 일관성 있는 디자인을 만들도록 지원하는 방법을 알아보세요.
- [새로운 디자인으로 AppKit 앱 빌드하기](https://developer.apple.com/kr/videos/play/wwdc2025/310) — AppKit 앱을 업데이트하여 새로운 디자인 시스템을 최대한 활용하세요. Tab View, Split View, 바, 프레젠테이션, 검색 및 제어에 대한 주요 변경 사항을 자세히 살펴보고 맞춤형 UI에서 Liquid Glass를 사용하는 방법을 알려드립니다. 이 비디오를 최대한 활용하려면 먼저 일반 디자인 지침을 제공하는 ‘새로운 디자인 시스템과 더 친숙해지는 법’을 시청하는 것이 좋습니다.
