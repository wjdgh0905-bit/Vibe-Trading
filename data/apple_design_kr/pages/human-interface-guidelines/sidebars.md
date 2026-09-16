# 사이드바

Source: https://developer.apple.com/kr/design/human-interface-guidelines/sidebars

> 사이드바는 보기의 앞쪽에 나타나며, 이를 사용하면 앱의 영역 또는 폴더 및 플레이리스트와 같은 콘텐츠의 최상위 모음 간에 탐색할 수 있습니다.

![섹션 및 일부 폴더를 표시하는 윈도우 사이드바 상단 부분의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-sidebar-intro@2x.png)

사이드바에는 세로 및 가로 공간이 많이 필요합니다. 공간이 제한되어 있거나, 화면의 더 많은 부분을 다른 정보나 기능에 할애하려는 경우에는 탭 막대와 같이 좀 더 콤팩트한 제어기가 더 나은 탐색 경험을 제공할 수 있습니다. 많은 앱의 경우, 탐색을 위해 탭 막대 또는 사이드바 중 하나를 선택할 필요가 없습니다. 대신 두 가지 기능을 모두 제공하는 탭 막대 스타일을 적용할 수 있습니다. 지침을 보려면 [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars) 및 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)의 내용을 참조하십시오.

## 모범 사례

**사이드바 아래로 시각적으로 풍부한 콘텐츠를 확장하십시오.** iOS, iPadOS 및 macOS에서는 도구 막대와 탭 막대 등의 다른 제어기와 마찬가지로, 사이드바가 [Liquid Glass](https://developer.apple.com/kr/design/human-interface-guidelines/materials#Liquid-Glass) 레이어에서 콘텐츠 위에 떠 있는 형태로 표시할 수 있습니다. 사이드바가 분리된 느낌을 강화하기 위해 콘텐츠를 가로로 스크롤되도록 하거나 *배경 확장 효과*를 적용하여 사이드바 아래로 콘텐츠를 확장할 수 있습니다. 이때 배경 확장 효과는 인접한 콘텐츠를 반영하여 콘텐츠가 사이드바 아래까지 이어지는 듯한 인상을 줍니다. 개발자 지침을 보려면 [backgroundExtensionEffect()](https://developer.apple.com/documentation/swiftui/view/backgroundextensioneffect())의 내용을 참조하십시오.

![iPad에서 앱의 앞쪽이 표시된 스크린샷. 이미지가 윈도우의 상단 부분에 걸쳐 있고, 사이드바의 가장자리에서 멈춤.](https://developer.apple.com/images/com.apple.HIG/kr/sidebars-extend-content-beneath-sidebar-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![iPad에서 앱의 앞쪽이 표시된 스크린샷. 이미지가 윈도우의 상단 부분에 걸쳐 있고, 배경 확장 효과를 사용하여 이미지가 뒤집히고, 흐리게 처리되고, 사이드바 아래에서 윈도우 가장자리까지 확장됨.](https://developer.apple.com/images/com.apple.HIG/kr/sidebars-extend-content-beneath-sidebar-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**가능할 경우, 사람들이 사이드바의 콘텐츠를 사용자화하도록 하십시오.** 사이드바를 통해 사람들이 앱에서 중요한 영역으로 이동할 수 있기 때문에 사람들이 가장 중요한 영역과 나타나는 순서를 결정할 수 있을 때 유용하게 사용할 수 있습니다.

**앱에 콘텐츠가 많은 경우 펼침 제어기로 계층을 그룹화하십시오.** [펼침 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/disclosure-controls)를 사용하면 사이드바의 세로 공간을 적절한 수준으로 유지하는 데 도움이 됩니다.

**익숙한 기호를 사용하여 사이드바의 항목을 나타내는 것을 고려하십시오.** [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)는 앱에서 항목을 나타내는 데 사용할 수 있는 다양한 범위의 사용자화할 수 있는 기호를 제공합니다. 사용자 설정 아이콘을 사용해야 하는 경우에는 비트맵 이미지를 사용하는 대신 [사용자 설정 기호](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols#Custom-symbols)를 만드는 것을 고려하십시오. [Apple Design Resources](https://developer.apple.com/design/resources/#sf-symbols)에서 SF Symbols 앱을 다운로드하십시오.

**사람들이 사이드바를 가리도록 허용하는 것을 고려하십시오.** 사람들은 때때로 콘텐츠 세부사항을 위한 더 넓은 공간을 확보하거나 방해 요인을 줄이기 위해 사이드바를 가리려고 합니다. 가능할 경우, 사람들이 이미 알고 있는 플랫폼별 상호작용 기능을 사용하여 사이드바를 가리거나 표시하도록 하십시오. 예를 들어, iPadOS에서 사람들은 내장 가장자리 쓸어넘기기 제스처를 사용할 것으로 기대합니다. macOS에서는 보기/가리기 버튼을 포함하거나 앱의 보기 메뉴에 사이드바 보기 및 사이드바 가리기 명령을 추가할 수 있습니다. visionOS에서 윈도우는 일반적으로 사이드바에 부합하도록 확장되기 때문에 사람들이 사이드바를 가릴 필요가 거의 없습니다. 쉽게 찾을 수 있도록 유지하려면 기본적으로 사이드바를 가리지 마십시오.

**일반적으로 사이드바에서 두 단계 이하의 계층을 표시하십시오.** 데이터 계층이 두 단계를 초과하면 사이드바 항목과 세부사항 보기 사이에 콘텐츠 목록을 포함하는 Split View 인터페이스를 사용하는 것을 고려하십시오.

**사이드바에 두 단계의 계층을 포함해야 하는 경우, 간결한 설명 레이블을 사용하여 각 그룹의 제목을 지정하십시오.** 레이블을 짧게 유지하려면 불필요한 단어를 생략하십시오.

**선택한 사이드바 아이콘 색상이 명확한 목적을 수행하도록 만드십시오.** 기본적으로 사이드바 아이콘은 앱의 [앱 강조 색상](https://developer.apple.com/kr/design/human-interface-guidelines/color#App-accent-colors)을 사용합니다. macOS에서 사람들은 모든 앱에 적용되는 시스템 강조 색상을 변경할 수 있습니다. 이렇게 변경하면 모든 사이드바 아이콘이 해당 색상으로 표시될 것을 기대하므로 사이드바 아이콘이 선택된 색상을 표시하는지 확인하십시오. 단, 고정 색상을 제한적으로 사용하면 아이콘의 의미를 명확히 하거나 주의를 끌 수 있습니다. 예를 들어, Mail 앱의 VIP 아이콘은 다른 사이드바 아이콘과 구별되도록 노란색을 사용하여 그 중요성에 대한 시각적 단서를 제공합니다.

## 플랫폼 고려 사항

*tvOS에 대한 추가 고려 사항은 없습니다. watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS

탭 보기의 [sidebarAdaptable](https://developer.apple.com/documentation/swiftui/tabviewstyle/sidebaradaptable) 스타일을 사용하여 사이드바를 제공하면 앱이 열릴 때 사이드바 또는 탭 막대를 표시할지 선택하게 됩니다. 두 유형 모두에는 서로 전환할 수 있는 버튼이 포함되어 있습니다. 이 스타일은 플랫폼에 따라 모양을 변경하며, 회전 및 윈도우 크기 조절에도 자동으로 반응하여 보기의 너비에 적합한 제어기 버전을 제공합니다.

> **개발자 참고 사항:** 사이드바만 표시하려면 [NavigationSplitView](https://developer.apple.com/documentation/swiftui/navigationsplitview)를 사용하여 Split View의 기본 패널에 사이드바를 표시하거나 [UISplitViewController](https://developer.apple.com/documentation/uikit/uisplitviewcontroller)를 사용하십시오.

**먼저 탭 막대를 사용하는 것을 고려하십시오.** 탭 막대는 콘텐츠를 더 넓게 보여줄 수 있으며, 여러 앱의 주요 영역 간에 탐색할 수 있는 충분한 유연성을 제공합니다. 탭 막대 크기보다 더 많은 영역을 표시해야 하는 경우, 탭 막대의 변환 가능한 사이드바 스타일 모양을 사용하여 자주 쓰지 않는 콘텐츠에 접근할 수 있도록 할 수 있습니다. 지침을 보려면 [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)의 내용을 참조하십시오.

**필요한 경우, 사이드바에 올바른 모양을 적용하십시오.** SwiftUI를 사용하여 사이드바를 생성하지 않는 경우, 모음 보기 목록 레이아웃의 [UICollectionLayoutListConfiguration.Appearance.sidebar](https://developer.apple.com/documentation/uikit/uicollectionlayoutlistconfiguration-swift.struct/appearance-swift.enum/sidebar) 모양을 사용할 수 있습니다. 개발자 지침을 보려면 [UICollectionLayoutListConfiguration.Appearance](https://developer.apple.com/documentation/uikit/uicollectionlayoutlistconfiguration-swift.struct/appearance-swift.enum)의 내용을 참조하십시오.

### macOS

사이드바의 행 높이, 텍스트 및 글리프 크기는 전체 크기에 따라 달라지며, 소형, 중형 또는 대형일 수 있습니다. 크기를 프로그램적으로 설정할 수 있지만, 사람들은 일반 설정에서 다양한 사이드바 아이콘 크기를 선택하여 변경할 수도 있습니다.

**컨테이너 윈도우의 크기를 조절할 때 사이드바를 자동으로 가리거나 표시하는 것을 고려하십시오.** 예를 들어, Mail 뷰어 윈도우의 크기를 줄이면 사이드바가 자동으로 축소되어 메시지 콘텐츠를 위한 더 넓은 공간을 확보할 수 있습니다.

**사이드바 하단에 중요한 정보 또는 동작을 넣지 마십시오.** 사람들은 주로 윈도우의 하단 가장자리는 가리는 방식으로 윈도우를 재배치합니다.

### visionOS

**앱의 계층이 많은 경우, 탭 막대에서 탭 내에 사이드바를 사용하는 것을 고려하십시오.** 이 경우, 사이드바가 탭 내에서 보조 탐색을 지원할 수 있습니다. 이렇게 할 경우, 사이드바의 선택 항목이 현재 열려 있는 탭을 변경하지 못하도록 하십시오.

![visionOS에서 음악 앱의 부분적인 스크린샷. 앱의 윈도우에는 음악 보관함을 탐색하기 위한 사이드바가 포함되어 있고, 보조 패널에는 플레이리스트 그리드가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-sidebar-music@2x.png)

## 리소스

#### 관련 콘텐츠

[Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views)

[탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

#### Developer 문서

[sidebarAdaptable](https://developer.apple.com/documentation/swiftui/tabviewstyle/sidebaradaptable) — SwiftUI

[NavigationSplitView](https://developer.apple.com/documentation/swiftui/navigationsplitview) — SwiftUI

[sidebar](https://developer.apple.com/documentation/swiftui/liststyle/sidebar) — SwiftUI

[UICollectionLayoutListConfiguration](https://developer.apple.com/documentation/uikit/uicollectionlayoutlistconfiguration-swift.struct) — UIKit

[NSSplitViewController](https://developer.apple.com/documentation/appkit/nssplitviewcontroller) — AppKit

#### 비디오

- [iPad 앱 디자인 향상하기](https://developer.apple.com/kr/videos/play/wwdc2025/208) — iPadOS에서 앱의 디자인과 분위기를 멋지게 만드세요. 크기 조절이 가능한 앱 윈도우를 위한 반응성 레이아웃을 설계하는 모범 사례를 확인할 수 있습니다. 윈도우 제어에 익숙해지고 이를 조정하는 최선의 방법을 알아보세요. 훌륭한 메뉴 바의 구성 요소를 살펴보고 새로운 포인터와 업데이트된 포인터 효과도 만나볼 수 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2026년 6월 8일 | 사이드바 아이콘 색상에 대한 지침이 업데이트되고 적응형 사이드바 스타일에 대한 지침이 명시됨. |
| 2025년 6월 9일 | 사이드바 아래로 콘텐츠를 확장하는 지침이 추가됨. |
| 2024년 8월 6일 | SwiftUI 적응형 사이드바 스타일을 포함하도록 지침이 업데이트됨. |
| 2023년 12월 5일 | iPadOS용 아트워크가 추가됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
