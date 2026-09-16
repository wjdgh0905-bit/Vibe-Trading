# 페이지 제어기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/page-controls

> 페이지 제어기는 표시기 이미지를 한 줄로 표시하고 각 이미지는 페이지를 평면 목록으로 나타냅니다.

![활성 페이지를 나타내는 표시기가 있고 스타일화된 페이지 제어기. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-page-dots-intro@2x.png)

표시기의 스크롤 행을 사용하면 목록을 탐색하여 원하는 페이지를 찾을 수 있습니다. 페이지 제어기는 임의의 페이지 수를 처리할 수 있기 때문에 사용자 설정 목록을 생성할 수 있는 상황에서 특히 유용합니다.

기본적으로 페이지 제어기는 일련의 작은 표시기 점으로 표시되어 사용 가능한 페이지를 나타냅니다. 단색 점이 현재 페이지를 나타냅니다. 시각적으로 이 점들 사이의 거리는 항상 같으며 점이 너무 많아서 윈도우에 맞지 않는 경우에는 잘립니다.

## 모범 사례

**페이지 제어기를 사용하여 나열된 페이지 목록 간의 움직임을 나타내십시오.** 페이지 제어기는 계층적이거나 비순차적인 페이지 관계를 나타내지 않습니다. 더 복잡한 관계를 탐색하려면 사이드바 또는 Split View를 대신 사용하십시오.

**보기 또는 윈도우 하단 중앙에 페이지 제어기를 배치하십시오.** 사람들이 항상 페이지 제어기를 찾을 수 있도록 가로 중앙 정렬하고 보기 하단 근처에 배치하십시오.

**페이지 제어기가 처리할 수 있는 페이지 수에는 제한이 없지만 너무 많이 표시하지 마십시오.** 약 10개 이상의 점은 한눈에 확인하기 어렵습니다. 앱에서 10페이지 이상을 한 줄에 표시해야 하는 경우, 그리드와 같이 콘텐츠를 원하는 순서대로 탐색할 수 있는 다른 배열을 사용하십시오.

## 표시기 사용자화하기

기본적으로 페이지 제어기는 모든 표시기에서 시스템 제공 점 이미지를 사용하지만 특정 페이지를 식별할 수 있도록 고유한 이미지를 표시할 수도 있습니다. 예를 들어, 날씨 앱은 `location.fill` 기호를 사용하여 현재 위치의 페이지를 구분합니다.

앱 또는 게임을 향상한다면 모든 표시기에서 기본 이미지로 사용할 수 있는 사용자 설정 이미지를 제공하고 특정 페이지에 다른 이미지를 제공할 수도 있습니다. 개발자 지침을 보려면 [preferredIndicatorImage](https://developer.apple.com/documentation/uikit/uipagecontrol/preferredindicatorimage) 및 [setIndicatorImage(_:forPage:)](https://developer.apple.com/documentation/uikit/uipagecontrol/setindicatorimage(_:forpage:))의 내용을 참조하십시오.

**사용자 설정 표시기 이미지가 간단하고 명확한지 확인하십시오.** 복잡한 모양을 사용하지 말고 아이콘을 아주 작은 크기에서 알아보기 어렵고 지저분하게 만들 수 있는 네거티브 공간, 텍스트 또는 내부 선과 같은 세부사항도 포함하지 마십시오. 간단한 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 표시기로 사용하거나 자신만의 아이콘을 디자인하십시오. 지침을 보려면 [아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/icons)의 내용을 참조하십시오.

**페이지 제어기의 전반적인 의미가 향상되는 경우에만 기본 표시기 이미지를 사용자화하십시오.** 예를 들어, 나열된 모든 페이지에 북마크가 포함된 경우, `bookmark.fill` 기호를 기본 표시기 이미지로 사용할 수 있습니다.

**페이지 제어기에서 서로 다른 표시기 이미지를 3개 이상 사용하지 마십시오.** 날씨 앱의 현재 위치 페이지처럼 특별한 의미가 있는 페이지가 목록에 포함된 경우, 해당 페이지에 고유한 표시기 이미지를 적용해 찾기 쉽게 만들 수 있습니다. 반대로 다양한 고유한 이미지로 여러 중요한 페이지를 표시하는 페이지 제어기는 각 이미지의 의미를 암기해야 하기 때문에 사용이 어렵습니다. 각 이미지가 명확해도 3가지 이상의 표시기 이미지 유형을 표시하는 페이지 제어기는 지저분하고 무분별하게 보일 수 있습니다.

![화면 하단 모서리에서 페이지 제어기를 하이라이트한 날씨 앱이 표시된 일러스트. 페이지 제어기에 옅은 태양, 구름, 태양과 구름, 비구름 등 다양한 종류의 아이콘을 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/page-indicator-customization-incorrect@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![화면 하단 모서리에서 페이지 제어기를 하이라이트한 날씨 앱이 표시된 일러스트. 페이지 제어기 앞쪽에 위치 기호가 표시되고 그 뒤에 일련의 점이 보임.](https://developer.apple.com/images/com.apple.HIG/kr/page-indicator-customization-correct@2x.png)

![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**표시기 이미지에 색상을 지정하지 마십시오.** 사용자 설정 색상을 사용하면 현재 페이지 표시기를 구분하고 페이지 제어기를 화면 위에 표시하는 대비가 감소합니다. 다양한 맥락에서 페이지 제어기를 쉽게 사용하고 잘 표시하려면 시스템이 표시기의 색상을 자동으로 지정하게 하십시오.

## 플랫폼 고려 사항

*macOS에서는 지원되지 않습니다.*

### iOS, iPadOS

페이지 제어기는 표시기의 모양을 조절하여 목록에 대한 정보를 더 제공할 수 있습니다. 예를 들어, 제어기는 목록에서 페이지의 상대적 위치를 예측할 수 있도록 현재 페이지의 표시기를 하이라이트합니다. 공간에 들어가지 않을 정도로 많은 표시기가 있는 경우 제어기는 양쪽의 표시기를 축소하여 더 많은 페이지를 사용할 수 있음을 표시할 수 있습니다.

![페이지 제어기의 일러스트. 페이지 제어기는 총 9개의 점을 표시함. 가운데 5개의 점은 기본 크기를 사용하며 2번째와 8번째 점은 기본 크기의 약 절반, 1번째와 9번째 점은 기본 크기의 약 4분의 1임. 가운데 점이 채워져서 목록에서 현재 페이지의 위치를 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/page-controls-many-indicators@2x.png)

사람들은 탭하거나 누른 채로 움직이기(제어기를 터치하고 왼쪽이나 오른쪽으로 드래그하는 동작을 ‘누른 채로 움직이기’라고 함)를 하여 페이지 제어기와 상호 작용합니다. 현재 페이지 표시기의 앞이나 뒤를 탭하면 다음 또는 이전 페이지가 표시됩니다. iPadOS에서 사람들은 포인터를 사용하여 특정 표시기를 대상으로 지정할 수도 있습니다. 누른 채로 움직이면 페이지가 순서대로 열리며, 누른 채로 제어기 앞 또는 뒤 가장자리를 넘어 움직이면 첫 페이지나 마지막 페이지로 빠르게 이동할 수 있습니다.

> **개발자 참고 사항:** API에서 *탭*은 *개별 상호 작용*이지만 *누른 채로 움직이기*는 *연속 상호 작용*입니다. 개발자 지침을 보려면 [UIPageControl.InteractionState](https://developer.apple.com/documentation/uikit/uipagecontrol/interactionstate-swift.enum)의 내용을 참조하십시오.

**누른 채로 움직이기 동작 중에 페이지 전환 애니메이션을 사용하지 마십시오.** 사람들은 누른 채로 움직이기 동작을 몹시 빠르게 수행할 수 있으며 모든 전환에 스크롤 애니메이션을 사용하면 앱에 지연이 발생하고 시각적으로 산만해질 수 있습니다. 탭할 때만 애니메이션이 적용된 스크롤 전환을 사용하십시오.

페이지 제어기는 표시기에 시각적 대비를 제공하는 반투명하고 모서리가 둥근 직사각형 배경 모양을 포함할 수 있습니다. 다음 중 하나의 배경 스타일을 선택할 수 있습니다.

- 자동 — 사람들이 제어기와 상호 작용할 때만 배경을 표시합니다. 페이지 제어기가 UI의 기본 탐색 요소가 아니면 이 스타일을 사용하십시오.
- 뚜렷한 — 항상 배경을 표시합니다. 제어기가 화면의 기본 탐색 제어기일 때만 이 스타일을 사용하십시오.
- 최소화 — 배경을 절대 표시하지 않습니다. 목록에 현재 페이지의 위치만 표시하고 싶으며, 누른 채로 움직일 때 시각적 피드백을 제공하지 않아도 되는 경우 이 스타일을 사용하십시오.

개발자 지침을 보려면 [backgroundStyle](https://developer.apple.com/documentation/uikit/uipagecontrol/backgroundstyle-swift.property)의 내용을 참조하십시오.

**최소화 배경 스타일을 사용하면 이동 막대를 지원하지 마십시오.** 최소화 스타일은 누른 채로 움직일 때 시각적 피드백을 제공하지 않습니다. 사람들이 앱의 페이지 목록에서 누른 채로 움직일 수 있게 하려면 자동 또는 뚜렷한 배경 스타일을 사용하십시오.

### tvOS

**전체 화면 페이지의 모음에서 페이지 제어기를 사용하십시오.** 페이지 제어기는 콘텐츠가 풍부한 여러 페이지가 동등한 페이지 계층에 있는 전체 화면 환경에서 작동하도록 디자인되었습니다. 추가 제어기를 포함하면 페이지 간에 이동할 때 집중을 유지하기 힘들어집니다.

### visionOS

visionOS에서 페이지 제어기는 사용 가능한 페이지를 나타내고 현재 페이지를 표시하지만 직접 상호 작용할 수 없습니다.

### watchOS

watchOS에서 페이지 제어기는 수평으로 페이지가 매겨진 화면 하단에서 표시되거나 수직 [tab view](https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/tab-views)를 사용할 때 Digital Crown 옆에 표시됩니다. 수직 탭 보기를 사용할 때 페이지 표시기는 현재 페이지 및 페이지 세트 내에서 모두 탐색 위치를 나타냅니다. 페이지 제어기는 페이지의 콘텐츠를 통해 스크롤하는 동작과 다른 페이지로 스크롤하는 동작 간에 전환합니다.

![Apple Watch에서 수직 탭 보기가 포함된 화면을 나타내는 일러스트. Digital Crown 옆의 페이지 제어기에서 4번째 탭이 현재 선택되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/page-controls-watch-vertical@2x.png)

![Apple Watch에서 수평 탭 보기가 포함된 화면을 나타내는 일러스트. 하단의 페이지 제어기에서 2번째 탭이 현재 선택되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/page-controls-watch-horizontal@2x.png)

**수직 페이지 매김을 사용하여 여러 보기를 용도가 명확한 별개의 페이지로 분리하십시오.** 각 페이지의 용도를 명확하게 하고 Digital Crown을 사용해 페이지를 스크롤할 수 있도록 하십시오. watchOS에서 이 디자인은 수평 페이지 매김이나 여러 단계의 계층적 탐색보다 더 효과적입니다.

**개별 페이지의 콘텐츠를 단일 화면 높이로 제한하십시오.** 이 제한을 적용하면 각 페이지가 명확하고 뚜렷한 용도를 따르도록 권장하고 한눈에 보기 쉬운 디자인을 만들 수 있습니다. 변형 높이 페이지를 신중하게 사용하고 가능하면 앱을 디자인할 때 고정 높이 페이지 뒤에만 배치하십시오.

## 리소스

#### 관련 콘텐츠

[스크롤 보기](https://developer.apple.com/kr/design/human-interface-guidelines/scroll-views)

#### Developer 문서

[PageTabViewStyle](https://developer.apple.com/documentation/swiftui/pagetabviewstyle) — SwiftUI

[UIPageControl](https://developer.apple.com/documentation/uikit/uipagecontrol) — UIKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2023년 6월 5일 | watchOS의 페이지 제어기에 대한 지침이 업데이트됨. |
