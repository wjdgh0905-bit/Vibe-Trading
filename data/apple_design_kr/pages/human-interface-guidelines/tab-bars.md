# 탭 막대

Source: https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars

> 탭 막대를 사용하면 앱의 상위 레벨 섹션을 탐색할 수 있습니다.

![이름이 있는 네 개의 위치 지정자 아이콘이 포함된 탭 막대의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-tab-bar-intro@2x.png)

탭 막대는 앱이 제공하는 다양한 유형의 정보 또는 기능을 사람들이 이해하도록 돕습니다. 또한 탭 막대를 사용하면 각 섹션 내에서 현재 탐색 상태를 유지하면서 사람들이 보기의 섹션 간에 빠르게 전환할 수 있습니다.

## 모범 사례

**동작을 제공하는 것이 아니라 탐색을 지원하는 데 탭 막대를 사용하십시오.** 탭 막대를 사용하면 시계 앱의 알람, 스톱워치, 타이머 탭과 같이 앱의 다양한 섹션 간에 이동할 수 있습니다. 현재 보기에 있는 요소에 작동하는 제어기를 제공해야 하는 경우, 대신 [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars)를 사용하십시오.

**사람들이 앱의 다른 섹션으로 이동할 때 탭 막대가 표시되는지 확인하십시오.** 탭 막대를 가리면 사람들은 현재 앱의 어떤 영역에 있는지 잊어버릴 수 있습니다. 모달은 일시적이며 독립적이므로 모달 뷰가 탭 막대를 가리는 경우에는 예외입니다.

**사람들이 앱을 탐색하는 데 필요한 적절한 수의 탭을 사용하십시오.** 앱의 계층이 표현되므로, 추가적인 탭으로 인한 복잡성과 각 섹션에 자주 접근하기 위한 필요성을 서로 비교하여 검토하는 것이 중요합니다. 일반적으로 적은 수의 탭을 탐색하는 것이 더 쉽다는 것을 기억하십시오. 복잡한 정보 구조를 갖는 앱의 경우 가능하면 사이드바 또는 사이드바로 조정되는 탭 막대를 대신 사용하는 것을 고려하십시오.

**초과되는 탭이 없도록 하십시오.** 기기 크기 및 화면 방향에 따라 표시되는 탭의 수는 총 탭의 수보다 적을 수 있습니다. 가로 공간으로 인해 표시되는 탭의 수가 제한될 경우 iOS 및 iPadOS에서 후속 탭은 더 보기 탭이 되며 남은 항목이 별도의 목록에 표시됩니다. 더 보기 탭에 있는 가려진 탭의 콘텐츠에 접근하거나 내용을 보는 것은 쉽지 않으므로 앱에서 이러한 경우가 발생하는 상황을 최소화하십시오.

**해당 콘텐츠를 사용할 수 없더라도 탭 막대 버튼을 비활성화하거나 가리지 마십시오.** 어떤 경우에는 탭 막대 버튼을 사용할 수 있다가 또 어떤 경우에는 사용할 수 없으면 앱의 인터페이스가 불안정하고 예측 불가능하게 보입니다. 섹션이 비어 있을 경우 콘텐츠를 왜 사용할 수 없는지 설명을 제공하십시오.

**탐색에 도움이 되는 탭 레이블을 포함하십시오.** 탭 레이블은 탭 막대 아이콘 아래나 옆에 표시되며, 해당 탭에 포함된 콘텐츠나 기능의 유형을 명확하게 설명하여 탐색을 도울 수 있습니다. 가능할 경우 한 단어를 사용하십시오.

**익숙하고 확장 가능한 탭 막대 아이콘을 제공하기 위해 SF Symbols를 사용하는 것을 고려하십시오.** [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 사용하면 탭 막대 아이콘이 다양한 맥락에 맞게 자동으로 조정됩니다. 예를 들어, 탭 막대는 기기 및 방향에 따라 기본 또는 콤팩트 형태일 수 있습니다. 콤팩트 보기에서는 탭 막대 아이콘이 탭 레이블 위에 표시되고, 일반 보기에서는 아이콘 및 레이블이 나란히 표시됩니다. 플랫폼과 일관성을 유지하기 위해 색으로 채워진 기호 또는 아이콘을 사용하는 것이 좋습니다.

![나란히 있는 두 개의 iPhone 기기가 표시된 일러스트. 첫 번째 iPhone은 가로 방향이고 화면 하단에 탭 막대가 있으며, 각 탭의 앞쪽 가장자리에 탭 막대 아이콘이 있고 뒤쪽 가장자리에 탭 레이블이 있음. 두 번째 iPhone은 세로 방향이고 화면 하단에 탭 막대가 있으며, 해당 탭 레이블 위에 탭 막대 아이콘이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tab-bar-landscape@2x.png)

사용자 설정 탭 막대 아이콘을 만드는 경우, 탭 막대 아이콘 크기는 [Apple Design Resources](https://developer.apple.com/design/resources/)의 내용을 참조하십시오.

![탭 막대의 다이어그램. 탭 막대 아이콘 및 탭 레이블의 위치를 나타내는 설명 표시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tab-bar-anatomy-callouts@2x.png)

**배지를 사용하여 중요한 정보가 있음을 나타내십시오.** 흰색 텍스트와 숫자 또는 느낌표가 포함된 빨간색 타원형의 배지를 탭에 표시하여 사람들의 관심이 필요한 새로운 정보 또는 업데이트된 정보가 있음을 나타낼 수 있습니다. 배지는 중요한 정보에만 사용하여 그 효과와 의미가 희석되지 않도록 하십시오. 지침을 보려면 [알림](https://developer.apple.com/kr/design/human-interface-guidelines/notifications)의 내용을 참조하십시오.

![화면 하단에 탭 막대가 있는 세로 방향의 iPhone 하단부 일러스트. 두 개의 탭에 빨간색 원형 배지가 붙어 있어 중요한 정보가 있음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/tab-bar-badges-iphone@2x.png)

**탭 레이블 및 콘텐츠 레이어 배경에 비슷한 색상을 가급적 적용하지 마십시오.** 앱의 콘텐츠 레이어에 이미 밝고 화려한 콘텐츠가 있다면, 탭 막대는 되도록이면 모노크롬 디자인으로 표현하거나 시각적으로 뚜렷하게 구분되는 강조 색상을 선택하십시오. 자세한 지침을 보려면 [Liquid Glass 색상](https://developer.apple.com/kr/design/human-interface-guidelines/color#Liquid-Glass-color)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*macOS에 대한 추가 고려 사항은 없습니다. watchOS에서는 지원되지 않습니다.*

### iOS

탭 막대는 화면 하단에서 콘텐츠 위에 떠 있습니다. 탭 항목은 [Liquid Glass](https://developer.apple.com/kr/design/human-interface-guidelines/materials#Liquid-Glass) 배경 위에 놓여 있으며, 이를 통해 아래의 콘텐츠가 살짝 비쳐 보입니다.

음악 앱의 미니 플레이어처럼 액세서리가 연결된 탭 막대의 경우, 사람들이 아래로 스크롤할 때 탭 막대를 최소화하고 액세서리를 탭 막대에 맞춰 이동하도록 선택할 수 있습니다. 사람들은 탭을 탭하거나 보기 상단으로 스크롤하여 최소화 상태를 종료할 수 있습니다. 개발자 지침을 보려면 [TabBarMinimizeBehavior](https://developer.apple.com/documentation/swiftui/tabbarminimizebehavior) 및 [UITabBarController.MinimizeBehavior](https://developer.apple.com/documentation/uikit/uitabbarcontroller/minimizebehavior)의 내용을 참조하십시오.

![음악 앱이 열려 있는 세로 방향의 iPhone 하단부 일러스트. 미니 플레이어가 화면 하단의 탭 막대 위에 열려 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tab-bar-with-accessory-expanded@2x.png)

![음악 앱이 열려 있는 세로 방향의 iPhone 하단부 일러스트. 탭 막대가 화면의 앞쪽 하단 모서리에서 현재 열려 있는 탭으로 최소화되어 있으며, 하단 중앙에는 미니 플레이어가 있고 뒤쪽 모서리에는 검색 탭이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tab-bar-with-accessory-collapsed@2x.png)

탭 막대의 뒤쪽 끝에는 전용 검색 탭을 포함할 수 있습니다. 지침을 보려면 [검색 필드](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields)의 내용을 참조하십시오.

### iPadOS

시스템은 화면 상단 근처에 탭 막대를 표시합니다. 탭 막대를 고정된 요소로 표시하거나, 탭 막대를 사이드바로 변환하는 버튼과 함께 표시할 수 있습니다. 개발자 지침을 보려면 [tabBarOnly](https://developer.apple.com/documentation/swiftui/tabviewstyle/tabbaronly) 및 [sidebarAdaptable](https://developer.apple.com/documentation/swiftui/tabviewstyle/sidebaradaptable)의 내용을 참조하십시오.

**탭 막대**

![화면 상단 근처에 탭 막대가 있는 iPad의 음악 앱이 표시된 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/ipad-tab-bar-music-app@2x.png)

**사이드바**

![탭 막대가 화면 앞쪽 가장자리의 사이드바로 변환된 iPad의 음악 앱이 표시된 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/ipad-sidebar-music-app@2x.png)

> **참고:** 탭 막대로 변환하는 옵션 없이 사이드바를 표시하려면 탭 보기 대신 [navigation split view](https://developer.apple.com/documentation/swiftui/navigationsplitview)를 사용하십시오. 지침을 보려면 [사이드바](https://developer.apple.com/kr/design/human-interface-guidelines/sidebars)의 내용을 참조하십시오.

**탐색을 지원할 때 가급적 탭 막대를 사용하십시오.** 탭 막대는 자주 사용하는 앱 섹션에 대한 접근을 제공합니다. 앱이 복잡할 경우, 더 폭넓게 탐색할 수 있도록 탭 막대를 사이드바로 변환하는 옵션을 제공할 수 있습니다.

**탭 막대를 사용자화할 수 있도록 지원하십시오.** 사람들이 접근하는 섹션이 많은 앱의 경우 자주 사용하는 항목을 선택하여 탭 막대에 추가하거나 덜 사용하는 항목을 제거할 수 있도록 지원하면 유용하게 활용이 가능합니다. 예를 들어, 음악 앱에서 즐겨찾는 플레이리스트를 선택하여 탭 막대에 표시할 수 있습니다. 사람들이 직접 탭을 선택할 수 있도록 하는 경우, 콤팩트 보기와 일반 보기 크기 간의 연속성을 유지하기 위해 기본 목록은 5개 이하로 구성하는 것이 좋습니다. 개발자 지침을 보려면 [TabViewCustomization](https://developer.apple.com/documentation/swiftui/tabviewcustomization) 및 [UITab.Placement](https://developer.apple.com/documentation/uikit/uitab/placement)의 내용을 참조하십시오.

### tvOS

탭 막대는 많은 부분을 사용자화할 수 있습니다. 예를 들어 다음을 수행할 수 있습니다.

- 탭 막대 배경의 색조, 색상 또는 이미지 지정
- 선택한 항목의 다양한 서체를 포함하여 탭 항목의 서체 선택
- 선택한 항목과 선택하지 않은 항목의 색조 지정
- 설정 및 검색과 같은 버튼 아이콘 추가

기본적으로 탭 막대는 반투명하며, 선택한 탭만 불투명합니다. 사람들이 리모컨을 사용하여 탭 막대에 초점을 맞추면 선택한 탭에는 선택한 상태를 강조하는 드롭 그림자가 포함됩니다. 탭 막대의 높이는 68포인트, 상단 가장자리는 화면 상단으로부터 46포인트이며, 이 값 중 하나라도 변경할 수 없습니다.

탭 막대에 들어갈 수 있는 항목보다 더 많은 항목이 있는 경우, 시스템은 탭 막대의 오른쪽에서 시작되는 페이드 효과를 적용하여 맨 오른쪽 항목을 자릅니다. 스크롤될 만큼 항목이 많은 경우, 시스템은 왼쪽에서 시작하는 잘림 페이드 효과도 적용합니다.

**탭 막대의 스크롤되는 동작에 주의하십시오.** 기본적으로 현재 탭에 단일 메인 보기가 포함되어 있으면 사람들이 탭 막대를 화면 밖으로 스크롤할 수 있습니다. TV 앱의 지금 보기, 영화, TV 프로그램, 스포츠 및 키즈 탭에서 이 동작의 예를 확인할 수 있습니다. TV 앱의 보관함 탭 또는 앱의 설정 화면과 같이 화면에 Split View가 포함된 경우는 예외입니다. 이 경우, 사람들이 Split View의 1차 및 2차 패널 내에서 콘텐츠를 스크롤하는 동안 탭 막대는 보기 상단에 고정된 상태로 유지됩니다. 탭의 콘텐츠에 관계없이 사람들이 리모컨에서 메뉴를 누르면 초점이 항상 페이지 상단의 탭 막대로 돌아갑니다.

**라이브 시청 앱에서는 탭을 일관적인 방식으로 구성하십시오.** 최상의 환경을 위해 라이브 스트리밍 앱의 콘텐츠를 탭에 다음 순서로 구성하십시오.

- 라이브 콘텐츠
- 클라우드 DVR 또는 기타 녹화된 콘텐츠
- 기타 콘텐츠

추가 지침을 보려면 [라이브 시청 앱](https://developer.apple.com/kr/design/human-interface-guidelines/live-viewing-apps)의 내용을 참조하십시오.

### visionOS

visionOS에서 탭 막대는 항상 세로형이며, 윈도우의 앞쪽을 기준으로 고정된 위치에 떠 있습니다. 사람들이 탭 막대를 바라보면 자동으로 확장되며, 특정 탭을 열려면 사람들은 해당 탭을 바라보고 탭하면 됩니다. 탭 막대가 확장되는 동안에는 그 뒤의 콘텐츠를 일시적으로 가릴 수 있습니다.

[video: visionOS에서 앱의 윈도우 측면을 따라 탭 막대를 보여주는 클로즈업 녹화 영상. 탭 막대에는 기호만 포함됨. 현재 선택한 탭이 호버 효과를 받아서 누군가 해당 탭을 바라보고 있고 막대가 확장되어 기호와 레이블 모두 표시되는 것을 보여줌.]

**각 탭에 기호 및 텍스트 레이블을 제공하십시오.** 탭의 기호는 항상 탭 막대에 표시됩니다. 사람들이 탭 막대를 바라보면 시스템은 탭 레이블도 표시합니다. 탭 막대가 확장되더라도 사람들이 한눈에 읽을 수 있도록 탭 레이블을 짧게 유지해야 합니다.

![기호만 있는 축소된 탭 막대를 표시하는 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-tab-bar-collapsed@2x.png)

![기호와 레이블 모두 있는 확장된 탭 막대를 표시하는 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-tab-bar-expanded@2x.png)

**앱에 적합한 경우, 탭 내에 사이드바를 사용하는 것을 고려하십시오.** 앱의 계층이 많은 경우, 탭 내에서 보조 탐색을 지원하기 위해 [사이드바](https://developer.apple.com/kr/design/human-interface-guidelines/sidebars)를 사용하는 것이 좋습니다. 이렇게 할 경우, 사이드바의 선택 항목이 현재 열려 있는 탭을 변경하지 못하도록 하십시오.

## 리소스

#### 관련 콘텐츠

[탭 보기](https://developer.apple.com/kr/design/human-interface-guidelines/tab-views)

[도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars)

[사이드바](https://developer.apple.com/kr/design/human-interface-guidelines/sidebars)

[머티리얼](https://developer.apple.com/kr/design/human-interface-guidelines/materials)

#### Developer 문서

[TabView](https://developer.apple.com/documentation/swiftui/tabview) — SwiftUI

[TabViewBottomAccessoryPlacement](https://developer.apple.com/documentation/swiftui/tabviewbottomaccessoryplacement) — SwiftUI

[Enhancing your app’s content with tab navigation](https://developer.apple.com/documentation/swiftui/enhancing-your-app-content-with-tab-navigation) — SwiftUI

[UITabBar](https://developer.apple.com/documentation/uikit/uitabbar) — UIKit

[Elevating your iPad app with a tab bar and sidebar](https://developer.apple.com/documentation/uikit/elevating-your-ipad-app-with-a-tab-bar-and-sidebar) — UIKit

#### 비디오

- [새로운 디자인 시스템과 더 친숙해지는 법](https://developer.apple.com/kr/videos/play/wwdc2025/356) — 새로운 디자인 시스템을 자세히 확인하여 시각 디자인, 정보 아키텍처 및 핵심 시스템 구성 요소에 대한 주요 변경 사항을 확인하세요. 이 시스템이 인터페이스와 콘텐츠 간의 관계를 재편하여 기기, 화면 크기 및 입력 모드에 걸쳐 동적이고, 조화로우며, 일관성 있는 디자인을 만들도록 지원하는 방법을 알아보세요.
- [iPad 앱 디자인 향상하기](https://developer.apple.com/kr/videos/play/wwdc2025/208) — iPadOS에서 앱의 디자인과 분위기를 멋지게 만드세요. 크기 조절이 가능한 앱 윈도우를 위한 반응성 레이아웃을 설계하는 모범 사례를 확인할 수 있습니다. 윈도우 제어에 익숙해지고 이를 조정하는 최선의 방법을 알아보세요. 훌륭한 메뉴 바의 구성 요소를 살펴보고 새로운 포인터와 업데이트된 포인터 효과도 만나볼 수 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2026년 6월 8일 | 용어 및 아트워크가 업데이트됨. |
| 2025년 12월 16일 | Liquid Glass의 지침이 업데이트됨. |
| 2025년 7월 28일 | Liquid Glass의 지침이 추가됨. |
| 2024년 9월 9일 | iPadOS 18의 탭 막대를 표시하는 그림이 추가됨. |
| 2024년 8월 6일 | iPadOS 18의 탭 막대 지침이 업데이트됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
