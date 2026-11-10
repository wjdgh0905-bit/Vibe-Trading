# watchOS용으로 디자인하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-watchos

> 사람들은 Apple Watch를 사용할 때 한자리에 머물러 있거나 이동 중인지 여부에 상관없이 시기적절하게 필수 정보에 접근하고 간단한 작업을 수행할 수 있다는 것을 알 수 있습니다.

![그리드 위에 스타일화된 Apple Watch 프레임 모양이 표시되어 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 초록색을 은은하게 반영하는 초록색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/platforms-watchOS-intro@2x.png)

Apple Watch용 앱을 디자인할 때에는 watchOS 경험을 차별화하는 다음과 같은 기본적인 기기 특성 및 패턴을 먼저 이해해야 합니다. 이러한 특성과 패턴을 사용하여 디자인 결정을 내리는 것은 Apple Watch 사용자가 만족하는 앱을 개발하는 데 도움이 될 수 있습니다.

**디스플레이.** 소형 크기의 Apple Watch 디스플레이는 손목에 딱 맞으며, 읽기 쉬운 고해상도 사용 경험을 제공합니다.

**인체공학.** 사람들은 Apple Watch를 착용하여 사용하기 때문에 손목을 들어 시계를 보고 반대 손을 사용하여 기기와 상호작용하는 동안 대체로 약 30cm 이내에서 디스플레이를 바라봅니다. 또한 사람들은 화면 상시표시를 통해 손목을 들지 않고도 시계 페이스의 정보를 확인할 수 있습니다.

**입력.** 사람들은 [Digital Crown](https://developer.apple.com/kr/design/human-interface-guidelines/digital-crown)을 돌려 수직으로 탐색하거나 데이터를 검사할 수 있으며, 이는 시계 페이스, 홈 화면 및 앱 내에서 일관적인 제어를 제공합니다. 이동하고 있는 중에도 탭, 쓸어넘기기, 드래그와 같은 기본 [gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)를 사용하여 입력을 제공할 수 있습니다. [동작 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/action-button)을 누르면 화면을 보지 않고도 필수 동작을 실행할 수 있으며, [shortcuts](https://developer.apple.com/design/human-interface-guidelines/siri#Shortcuts-and-suggestions)를 사용하여 반복적인 작업을 쉽고 빠르게 수행할 수 있습니다. 또한 사람들은 GPS, 혈중 산소 및 심장 기능 센서, 고도계, 가속도계, 자이로스코프와 같은 기기의 기능이 제공하는 데이터의 이점을 활용할 수 있습니다.

**앱 상호작용.** 사람들은 일상 중에 화면 상시표시가 적용된 디스플레이를 여러 번 보면서 1분 이내로 완료되는 간단한 앱 상호작용을 수행합니다. 사람들은 앱보다는 컴플리케이션, 알림, Siri 상호작용과 같은 watchOS 앱의 관련 경험을 주로 더 많이 사용합니다.

**시스템 기능.** watchOS는 사람들이 친숙하고 일관적인 방식으로 시스템 및 앱과 상호작용할 수 있는 여러 기능을 제공합니다.

- [컴플리케이션](https://developer.apple.com/kr/design/human-interface-guidelines/complications)
- [알림](https://developer.apple.com/kr/design/human-interface-guidelines/notifications)
- [화면 상시표시](https://developer.apple.com/kr/design/human-interface-guidelines/always-on)
- [시계 페이스](https://developer.apple.com/kr/design/human-interface-guidelines/watch-faces)

## 모범 사례

탁월한 Apple Watch 경험을 제공하려면 간결하고 특화된 경험을 선사해야 하며, 사람들이 가장 중요하게 생각하는 플랫폼 및 기기의 기능이 통합되어야 합니다. watchOS와 잘 어울리는 경험을 제공하려면 다음과 같은 방법을 우선시하여 이러한 기능을 포함하십시오.

- 중요한 정보를 간단명료하게 제공하고 사람들이 한두 번의 제스처로 의도한 동작을 수행할 수 있는 빠르고, 한눈에 들어오는, 단일 화면 상호작용을 지원하십시오.
- 앱 탐색에서 계층의 깊이를 최소화하고, [Digital Crown](https://developer.apple.com/kr/design/human-interface-guidelines/digital-crown)을 사용하여 스크롤 또는 화면 간 전환을 할 수 있도록 수직 탐색 기능을 제공하십시오.
- 사람들에게 필요한 부분을 적극적으로 예상하고, 기기상의 데이터를 사용하여 현재 또는 앞으로 관련성이 있는 실행 가능한 콘텐츠를 제공하여 경험을 개인 맞춤화하십시오.
- [complications](https://developer.apple.com/design/human-interface-guidelines/complications)을 사용하여 관련성이 있고 동적으로 변화될 가능성이 있는 데이터와 그래픽을 시계 페이스에 제공하여 사람들이 손목을 들어 올릴 때마다 정보를 확인하고 탭하여 바로 앱으로 이동할 수 있도록 하십시오.
- [notifications](https://developer.apple.com/design/human-interface-guidelines/notifications)을 사용하여 가치 있는 정보를 적시에 제공하고, 사람들이 앱을 열지 않고도 중요한 동작을 수행할 수 있도록 하십시오.
- [color](https://developer.apple.com/design/human-interface-guidelines/color)과 같은 배경 콘텐츠를 사용하여 유용한 보조 정보를 포함하고, [materials](https://developer.apple.com/design/human-interface-guidelines/materials)을 사용하여 계층과 위치감을 나타내십시오.
- 앱이 개별적으로 작동하도록 디자인하고, 추가 세부사항과 기능을 제공하여 알림과 컴플리케이션을 보완하십시오.

## 리소스

#### 관련 콘텐츠

[Apple Design Resources](https://developer.apple.com/design/resources/#watchos-apps)

#### Developer 문서

[watchOS Pathway](https://developer.apple.com/watchos/get-started/)

#### 비디오

- [watchOS 26의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2025/334) — watchOS 26의 새로운 기능을 확인하고 이러한 기능을 watchOS 및 iOS 앱에 통합하는 방법을 알아보세요. ARM64 아키텍처를 살펴보고 새로운 디자인 시스템에 대해 자세히 알아보세요. 또한 위젯 업데이트 내용과 Apple Watch 제어 방법에 대한　인사이트도 공유합니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 5일 | 한눈에 확인할 수 있는 집중된 앱 경험을 제공하기 위한 지침 향상 및 탐색과 관련된 Digital Crown의 중요성 강조. |
