# 오너먼트

Source: https://developer.apple.com/kr/design/human-interface-guidelines/ornaments

> visionOS에서 오너먼트는 윈도우의 콘텐츠를 복잡하게 만들거나 가리지 않으면서 윈도우와 관련된 제어기와 정보를 표시합니다.

![윈도우 하단의 오너먼트가 스타일화된 모양으로 그리드 위에 표시되어 있으며 디자인 도구의 캔버스를 나타냄. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-ornaments-intro@2x.png)

오너먼트는 관련 윈도우와 평행을 이루는 평면에 떠 있으며 z축을 따라 평면보다 살짝 앞에 위치합니다. 관련 윈도우가 이동하면 오너먼트도 함께 이동하며 상대적 위치를 유지합니다. 윈도우의 콘텐츠가 스크롤되는 경우, 오너먼트의 제어기 또는 정보는 변경되지 않습니다.

오너먼트는 윈도우의 어느 가장자리에든 나타날 수 있으며 버튼, 구분 제어기, 기타 보기와 같은 UI 구성요소를 포함할 수 있습니다. 시스템은 오너먼트를 사용하여 [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars), [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars), 비디오 재생 제어기와 같은 구성요소를 생성하고 관리합니다. 오너먼트를 사용하여 사용자 설정 구성요소를 생성할 수 있습니다.

## 모범 사례

**윈도우를 복잡하게 만들지 않는 일관된 위치에 자주 사용하는 제어기 또는 정보를 표시하도록 오너먼트를 사용하는 것을 고려하십시오.** 오너먼트는 윈도우 근처에 있으므로 사람들이 항상 위치를 찾을 수 있습니다. 예를 들어, 음악 앱은 오너먼트를 사용해 ‘지금 재생 중’ 제어기를 제공하여 해당 제어기가 찾기 쉬운 예측 가능한 위치에 계속 나타나도록 합니다.

**일반적으로 오너먼트를 계속 표시하십시오.** 비디오를 시청하거나 사진을 보는 것과 같이 콘텐츠에 집중할 때에는 오너먼트를 가리는 것이 적합하지만 일반적인 경우 사람들은 오너먼트의 제어기에 계속 접근하고 싶어 합니다.

**오너먼트를 여러 개 표시해야 하는 경우, 윈도우의 전체적인 시각적 균형을 우선시하십시오.** 오너먼트는 중요한 동작을 수행하도록 돕지만 때로는 콘텐츠에 집중하는 데 방해가 됩니다. 필요할 경우, 윈도우의 시각적 무게감을 높이거나 앱이 더 복잡하게 느껴지지 않도록 오너먼트의 총수를 제한하는 것을 고려하십시오. 오너먼트를 제거하려고 결정한 경우, 오너먼트의 요소를 메인 윈도우로 재배치할 수 있습니다.

**오너먼트의 너비를 관련 윈도우의 너비와 같거나 더 좁게 유지하도록 하십시오.** 오너먼트가 관련 윈도우보다 더 넓으면 윈도우 측의 탭 막대 또는 기타 세로 콘텐츠를 방해할 수 있습니다.

**오너먼트에 테두리가 없는 버튼을 사용하는 것을 고려하십시오.** 기본적으로 오너먼트의 배경은 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/materials#visionOS)이므로 배경에 직접 버튼을 배치하는 경우 테두리를 표시할 필요가 없습니다. 사람들이 오너먼트의 테두리가 없는 버튼을 바라볼 때 시스템은 자동으로 해당 버튼에 호버 효과를 적용합니다(지침을 보려면 [눈](https://developer.apple.com/kr/design/human-interface-guidelines/eyes)의 내용 참조).

**사용자 설정 구성요소를 생성해야 하는 경우가 아니라면 시스템 제공 도구 막대 및 탭 막대를 사용하십시오.** visionOS에서 도구 막대와 탭 막대는 자동으로 오너먼트로 나타나므로 이러한 구성요소를 생성하기 위해 오너먼트를 사용할 필요가 없습니다. 개발자 지침을 보려면 [Toolbars](https://developer.apple.com/documentation/swiftui/toolbars) 및 [TabView](https://developer.apple.com/documentation/swiftui/tabview)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

[도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars)

#### Developer 문서

[ornament(visibility:attachmentAnchor:contentAlignment:ornament:)](https://developer.apple.com/documentation/swiftui/view/ornament(visibility:attachmentanchor:contentalignment:ornament:)) — SwiftUI

#### 비디오

- [공간 UI 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2023/10076) — 공간 컴퓨팅 앱을 위한 훌륭한 인터페이스를 디자인하는 방법을 배워 보세요. 기존의 화면 기반 지식을 토대로 visionOS를 위한 멋진 경험을 만드는 방법을 공유합니다. UI 요소, 머티리얼, 타이포그래피 관련 지침을 바탕으로 익숙하고 가독성이 높으며 쉽게 사용할 수 있는 경험을 디자인하는 방법을 알아보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 2월 2일 | 여러 개의 오너먼트 사용에 대한 지침이 추가됨. |
| 2023년 12월 5일 | 오너먼트를 사용한 추가 항목 표시와 관련된 설명이 제거됨. |
| 2023년 6월 21일 | 새로운 페이지. |
