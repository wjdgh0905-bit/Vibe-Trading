# 화면 상시표시

Source: https://developer.apple.com/kr/design/human-interface-guidelines/always-on

> 화면 상시표시 디스플레이가 포함된 기기에서는 기기와의 상호작용을 잠시 멈추는 경우에도 시스템에서 앱의 인터페이스를 계속 표시하도록 할 수 있습니다.

![달리는 사람이 있고 화면 상시표시 디스플레이를 나타내는 Apple Watch의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-always-on-intro@2x.png)

화면 상시표시 상태로 전환되면 기기는 디스플레이를 어둡게 하고 화면 상의 동작을 최소화하여 개인정보를 보호하는 저전력 방식을 통해 유용하면서도 한눈에 볼 수 있는 정보를 계속 제공합니다. 시스템에서 표시할 수 있는 항목은 기기에 따라 달라집니다.

- iPhone 14 Pro 및 iPhone 14 Pro Max의 경우, 기기를 위로 향하도록 놓고 상호작용을 중단하면 시스템에 [위젯](https://developer.apple.com/kr/design/human-interface-guidelines/widgets), [실시간 현황](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities)과 같은 잠금 화면 항목이 표시됩니다.
- Apple Watch를 착용한 상태에서 손목을 내리면 시스템은 시계 페이스를 어둡게 하고 앱이 가장 앞에 열려 있거나 백그라운드 세션을 실행하는 동안 앱의 인터페이스를 계속 표시합니다.

화면 상시표시 상태에서는 두 기기 모두 시스템에 알림이 표시되며 디스플레이를 탭하여 화면 상시표시를 종료하고 상호작용을 재개할 수 있습니다.

## 모범 사례

**민감한 정보는 가리십시오.** 은행 잔고나 건강 데이터와 같이 다른 사람들이 보는 것을 원하지 않는 개인 정보는 반드시 삭제해야 합니다. 알림에 표시될 수 있는 개인 정보도 가려야 합니다. 지침을 보려면 [알림](https://developer.apple.com/kr/design/human-interface-guidelines/notifications)의 내용을 참조하십시오.

**타당한 이유가 있는 경우 일부 유형의 개인 정보는 바로 확인할 수 있도록 하십시오.** 예를 들어, 일반적으로 사람들은 운동하는 동안 Apple Watch에서 속도와 심박수를 업데이트받고자 하며 iPhone에서는 비행기 도착 시간에 대한 정보를 빠르게 파악하거나 차량 공유 서비스가 도착했을 때 알림을 받고 싶어합니다. 모든 정보를 공개하고 싶지 않은 경우 화면 상시표시를 끄면 됩니다.

**중요한 콘텐츠는 또렷하게 표시하고 중요하지 않은 콘텐츠는 흐릿하게 표시하십시오.** 보조 텍스트, 이미지, 색상 채우기를 밝게 하여 중요한 정보가 더욱 눈에 잘 띄도록 할 수 있습니다. 예를 들어, 해야 할 일 목록 앱에서는 제목이 강조되도록 행 배경을 제거하고 각 항목의 추가 세부사항을 어둡게 합니다. 또한 다양한 이미지와 넓은 색상 영역이 표시된 경우에는 이미지를 제거하고 흐릿한 색상을 사용하는 것이 좋습니다.

**일관된 레이아웃을 유지하십시오.** 화면 상시표시를 시작하거나 종료할 때, 또는 전반적인 화면 상시표시 환경에서 산만한 인터페이스 변경은 권장하지 않습니다. 예를 들어, 화면 상시표시가 시작되면 대화식 구성 요소를 단순히 제거하는 것보다는 사용할 수 없는 모양으로 전환하는 것이 좋습니다. 화면 상시표시 컨텍스트 내에서는 인터페이스를 반드시 변경해야 하는 경우에만 너무 튀지 않게 업데이트하도록 하십시오. 예를 들어 스포츠 앱의 경우 화면 상시표시 상태에서는 세부적인 플레이별 업데이트를 잠시 멈추고 점수가 변경될 때만 업데이트할 수 있습니다. 화면 상시표시 상태에서 필요 이상의 변경이 있을 경우, 특히 iPhone은 주의를 산만하게 할 수 있습니다. 사람들은 주로 기기를 디스플레이가 위로 향하도록 두기 때문에 직접 보고 있지 않아도 화면 상의 동작이 보이기 때문입니다.

**동작을 멈출 때는 갑자기 중단하지 말고 부드럽게 전환하십시오.** 현재 동작을 부드럽게 마무리하면 자연스럽게 전환된다고 인식되고 문제가 생긴 것 같은 느낌을 주지 않습니다.

## 플랫폼 고려 사항

*iOS 또는 watchOS에 대한 추가 고려 사항은 없습니다. iPadOS, macOS, tvOS 또는 visionOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[watchOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-watchos)

#### Developer 문서

[Designing your app for the Always On state](https://developer.apple.com/documentation/watchos-apps/designing-your-app-for-the-always-on-state) — watchOS 앱

#### 비디오

- [watchOS 8의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2021/10002) — watchOS 8에는 시계 페이스를 항상 최신 상태로 유지하는 데 도움이 되는 여러 기능이 있습니다. 상시표시형 Retina 디스플레이를 위한 새 API, Bluetooth 기기를 통한 컴플리케이션 업데이트, HealthKit 데이터의 백그라운드 전송을 통해 앱을 최신 상태로 유지하는 것이 그 어느 때보다 쉬워졌습니다. 앱에서 위치를 활용하는 지역 기반 사용자 알림에 대해 알아보고, Apple Watch 앱을 구축하는 데 도움이 되는 SwiftUI 및 watchOS 신규 개선 사항을 모두 살펴보세요.
- [Apple Watch용 운동 앱 개발하기](https://developer.apple.com/kr/videos/play/wwdc2021/10009) — 이 코딩 실습에서는 SwiftUI와 HealthKit을 사용하여 새 운동 앱을 제작합니다. 타임라인으로 운동 수치를 업데이트하여 화면 상시표시 상태를 지원하는 방법을 알아보세요. 운동 앱의 디자인 모범 사례도 살펴봅니다.
- [SwiftUI의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2021/10018) — 그 어느 때보다 SwiftUI로 앱을 개발하기 가장 좋아졌습니다. 목록, 버튼, 텍스트 필드를 포함한 UI 프레임워크의 최신 업데이트를 살펴보고 이러한 기능을 통해 앱에 SwiftUI를 더 완벽하게 도입하는 방법을 알아보세요. 캔버스 보기, 머티리얼 및 향상된 기호를 사용하여 시각적으로 풍부한 그래픽을 만드는 방법을 알아보세요. macOS의 다중 열 표, 집중 모드 및 키보드 상호작용의 개선 사항, 멀티 플랫폼 검색 API를 살펴본 다음 Swift 동시성, 새로운 AttributedString, 서식 스타일, 현지화 등 기능을 활용하는 방법을 다룹니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 9월 12일 | 소개 이미지 아트워크가 업데이트됨. |
| 2022년 9월 23일 | 지침에 iPhone 14 Pro 및 iPhone 14 Pro Max의 화면 상시표시 디스플레이에 대한 설명이 추가됨. |
