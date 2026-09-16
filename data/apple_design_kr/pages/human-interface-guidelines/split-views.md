# Split View

Source: https://developer.apple.com/kr/design/human-interface-guidelines/split-views

> Split View는 여러 개의 인접한 콘텐츠 패널의 표시 방식을 관리하며, 각 패널에는 표, 모음, 이미지 및 사용자 설정 보기 등 다양한 구성요소가 포함될 수 있습니다.

![세 개의 영역인 사이드바, 캔버스 및 인스펙터로 구성된 윈도우의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-split-view-intro@2x.png)

일반적으로 Split View는 여러 단계의 앱 계층을 한 번에 표시하고 계층 간의 탐색을 지원하는 데 사용됩니다. 이 경우, 보기의 1차 패널에서 항목을 선택하면 2차 패널에 항목의 콘텐츠가 표시됩니다. 이와 비슷하게, 2차 패널에 있는 항목에 추가 콘텐츠가 포함된 경우 Split View는 3차 패널을 표시할 수 있습니다.

Split View를 사용하여 탐색을 위한 [사이드바](https://developer.apple.com/kr/design/human-interface-guidelines/sidebars)를 표시하는 것이 일반적이며, 1차 패널은 앱에서 상위 레벨 항목 또는 모음을 나열하고, 2차 및 선택 사항인 3차 패널은 하위 모음 및 항목 세부사항을 표시할 수 있습니다. 드물지만 Split View를 사용하여 기본 보기를 보완하는 기능 그룹을 제공할 수도 있습니다. 예를 들어, macOS의 Keynote는 Split View 패널을 사용하여 메인 슬라이드 캔버스를 둘러싸는 영역에 슬라이드 내비게이터, 발표자 메모 및 인스펙터 패널을 표시합니다.

## 모범 사례

**탐색을 지원하려면 세부사항 보기로 이어지는 각 패널에서 현재 선택 항목을 지속적으로 하이라이트하십시오.** 선택한 모양은 다양한 패널에 있는 콘텐츠 간의 관계를 명확하게 하고 사람들이 위치를 파악할 수 있도록 도와줍니다.

**사람들이 패널 간에 콘텐츠를 드래그 앤 드롭하도록 허용하는 것을 고려하십시오.** Split View는 여러 단계의 계층에 대한 접근을 제공하기 때문에 사람들은 항목을 다른 패널로 드래그하여 콘텐츠를 앱의 한 부분에서 다른 부분으로 편리하게 이동할 수 있습니다. 지침을 보려면 [드래그 앤 드롭](https://developer.apple.com/kr/design/human-interface-guidelines/drag-and-drop)의 내용을 참조하십시오.

## 플랫폼 고려 사항

### iOS

**콤팩트 환경이 아닌 일반적인 환경에서 Split View를 사용하는 것이 좋습니다.** Split View는 여러 패널을 표시할 가로 공간이 필요합니다. 세로 방향의 iPhone과 같은 콤팩트 환경에서는 콘텐츠를 둘러싸거나 자르지 않고 여러 패널을 표시하는 것이 어려우며, 이로 인해 가독성이 떨어지고 상호작용하는 것이 더 어렵습니다.

### iPadOS

iPadOS에서는 Split View에 두 개의 세로 방향 패널(예: Mail)이나 세 개의 세로 방향 패널(예: Keynote)이 포함될 수 있습니다.

**폭이 좁고 콤팩트하며 중간 크기의 윈도우 너비를 고려하십시오.** iPad 윈도우는 유연하게 크기를 조절할 수 있기 때문에 다양한 너비의 Split View 레이아웃 디자인을 고려하는 것이 중요합니다. 특히 논리적인 방식으로 다양한 패널 간에 탐색할 수 있어야 합니다. 지침을 보려면 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)의 내용을 참조하십시오. 개발자 지침을 보려면 [NavigationSplitView](https://developer.apple.com/documentation/swiftui/navigationsplitview) 및 [UISplitViewController](https://developer.apple.com/documentation/uikit/uisplitviewcontroller)의 내용을 참조하십시오.

### macOS

macOS에서는 Split View의 패널을 세로, 가로 또는 두 방향으로 정렬할 수 있습니다. Split View에는 패널 간에 드래그를 지원하여 크기를 조절할 수 있는 구분선이 포함됩니다. 개발자 지침을 보려면 [VSplitView](https://developer.apple.com/documentation/swiftui/vsplitview) 및 [HSplitView](https://developer.apple.com/documentation/swiftui/hsplitview)의 내용을 참조하십시오.

**세로**

![두 개의 패널이 세로로 쌓여 있는 모습이 표시된 노트북 화면 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/vertical-split-view@2x.png)

**가로**

![두 개의 패널이 옆으로 나란히 배열되어 있는 모습이 표시된 노트북 화면 일러스트로, 왼쪽에는 좁은 패널이 있고 오른쪽에는 넓은 패널이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/horizontal-split-view@2x.png)

**다중**

![세 개의 패널로 나뉘어 세로 및 가로로 분할된 노트북 화면 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/multiple-split-view@2x.png)

**최소 및 최대 패널 크기에 대한 적절한 기본 값을 설정하십시오.** 사람들이 앱의 Split View에서 패널의 크기를 조절할 수 있는 경우 구분선이 계속 표시되는 크기를 사용하십시오. 패널이 너무 작아지는 경우, 구분선이 사라진 것처럼 보이기 때문에 사용하기 어려워집니다.

**적합한 경우 사람들이 패널을 가리도록 허용하는 것을 고려하십시오.** 예를 들어, 앱에 편집 영역이 포함된 경우 사람들이 다른 패널을 가려서 방해 요인을 줄이거나 편집을 위한 더 넓은 공간을 확보하도록 허용하는 것을 고려하십시오. Keynote에서 사람들은 슬라이드 콘텐츠를 편집하려고 할 때 내비게이터 및 발표자 메모 패널을 가릴 수 있습니다.

**가려진 패널을 표시하는 여러 방법을 제공하십시오.** 예를 들어, 사람들이 가려진 패널을 복원하기 위해 사용할 수 있는 도구 막대 버튼 또는 키보드 단축키 등의 메뉴 명령을 제공할 수 있습니다.

**얇은 구분선 스타일을 우선시하십시오.** 얇은 구분선의 너비가 1포인트인 경우, 사람들이 사용하기 쉬운 동시에 콘텐츠에 최대한의 공간을 제공할 수 있습니다. 특별한 요구가 없으면 두꺼운 구분선 스타일을 사용하지 마십시오. 예를 들어, 구분선의 양쪽 측면에 강력한 선형적 요소를 사용하는 표 행이 표시되어 얇은 구분선을 구별하기 어렵게 만들 수 있는 경우, 두꺼운 구분선을 사용하는 것이 적합할 수 있습니다. 개발자 지침을 보려면 [NSSplitView.DividerStyle](https://developer.apple.com/documentation/appkit/nssplitview/dividerstyle-swift.enum)의 내용을 참조하십시오.

### tvOS

tvOS에서 Split View는 사람들이 콘텐츠를 필터링하는 데 도움이 될 수 있습니다. 사람들이 1차 패널에서 필터 카테고리를 선택하면 앱은 2차 패널에 결과를 표시할 수 있습니다.

**패널이 균형 있게 보이도록 유지하는 Split View 레이아웃을 선택하십시오.** 기본적으로 Split View는 화면 너비의 1/3을 1차 패널로, 2/3을 2차 패널로 사용하지만, 레이아웃을 반반씩 지정할 수도 있습니다.

**Split View 위에 단일 제목을 표시하여 사람들이 콘텐츠를 전체적으로 파악할 수 있도록 하십시오.** 사람들은 Split View를 사용하여 콘텐츠를 탐색하고 필터링하는 방법을 이미 알고 있기 때문에 각 패널에 포함된 내용을 설명하는 제목은 필요하지 않습니다.

**2차 패널에 포함된 콘텐츠 유형에 따라 제목의 정렬을 선택하십시오.** 특히 2차 패널에 콘텐츠 모음이 포함되면 제목을 윈도우 중앙에 정렬하는 것을 고려하십시오. 이와 반대로, 2차 패널에 중요한 콘텐츠의 단일 메인 보기가 포함된 경우, 콘텐츠를 위한 더 넓은 공간을 제공하기 위해 기본 보기 위에 제목을 배치하는 것을 고려하십시오.

### visionOS

**추가 정보를 표시하려면 가급적 새로운 윈도우 대신 Split View를 사용하십시오.** Split View를 통해 사람들이 현재 상황을 벗어나지 않고 추가 정보에 편리하게 접근할 수 있는 반면, 새로운 윈도우는 콘텐츠를 탐색하거나 재배치하려는 사람들을 혼란스럽게 할 수 있습니다. 또한 더 많은 윈도우를 열면 앱 또는 게임에서 보기 간의 연관성을 주의 깊게 관리해야 합니다. 적은 양의 정보를 요청하거나, 주요 작업으로 돌아가기 전에 사람들이 완료해야 하는 간단한 작업을 표시해야 하는 경우, [시트](https://developer.apple.com/kr/design/human-interface-guidelines/sheets)를 사용하십시오.

### watchOS

watchOS에서 Split View는 목록 보기 또는 세부사항 보기를 전체 화면 보기로 표시합니다.

**가장 관련성 있는 세부사항 보기를 자동으로 표시하십시오.** 앱이 실행되면 사람들에게 가장 관련성 있는 정보를 표시하십시오. 예를 들어, 사람들의 위치, 시간 또는 최근 동작과 관련된 정보를 표시하십시오.

**앱이 여러 세부사항 페이지를 표시하는 경우, 세부사항 보기를 수직 [탭 보기](https://developer.apple.com/kr/design/human-interface-guidelines/tab-views)로 배치하십시오.** 그런 다음 사람들은 Digital Crown을 사용하여 세부사항 보기의 탭 간에 스크롤할 수 있습니다. 또한 watchOS는 Digital Crown 옆에 페이지 표시기를 표시하여 탭 수와 현재 선택한 탭을 나타냅니다.

![Apple Watch에 수직 탭이 있는 세부사항 보기를 표시하는 스크린샷. Digital Crown 옆의 페이지 표시기에서 다섯 번째 탭이 현재 선택되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/split-view-watch-vertical-tab@2x.png)

## 리소스

#### 관련 콘텐츠

[사이드바](https://developer.apple.com/kr/design/human-interface-guidelines/sidebars)

[탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

#### Developer 문서

[NavigationSplitView](https://developer.apple.com/documentation/swiftui/navigationsplitview) — SwiftUI

[UISplitViewController](https://developer.apple.com/documentation/uikit/uisplitviewcontroller) — UIKit

[NSSplitViewController](https://developer.apple.com/documentation/appkit/nssplitviewcontroller) — AppKit

#### 비디오

- [UIKit 앱을 더욱 유연하게 만들기](https://developer.apple.com/kr/videos/play/wwdc2025/282) — iPhone, iPad, Mac 및 Apple Vision Pro에서 장면 및 컨테이너 뷰 컨트롤러를 사용하여 UIKit 앱을 더욱 유연하게 만드는 방법을 알아보세요. 앱 중심의 수명 주기에서 장면 기반의 수명 주기로 전환하여 향상된 윈도우 크기 조절 및 개선된 멀티태스킹 등 앱의 잠재력을 최대한 발휘할 수 있습니다. 상호작용 방식의 열 크기 조정 및 Inspetcor 열의 온전한 지원 등 UISplitViewController의 향상된 기능을 살펴보세요. 새로운 레이아웃 API를 채택하여 뷰와 제어의 적응력을 더욱 높일 수도 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | iOS 및 iPadOS 플랫폼 고려 사항이 추가됨. |
| 2023년 12월 5일 | visionOS의 Split View에 대한 지침이 추가됨. |
| 2023년 6월 5일 | watchOS의 Split View에 대한 지침이 추가됨. |
