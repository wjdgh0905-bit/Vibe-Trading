# 탭 보기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/tab-views

> 탭 보기는 동일한 영역에서 여러 개의 상호 배타적인 콘텐츠 패널을 표시하며, 사람들은 탭이 있는 제어기를 사용하여 탭 간에 전환할 수 있습니다.

![레이블이 지정된 세 개의 탭이 있고 그 중 첫 번째 탭이 선택된 보기의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-tab-view-intro@2x.png)

## 모범 사례

**탭 보기를 사용하여 밀접하게 관련된 콘텐츠 영역을 표시하십시오.** 탭 보기의 모양은 둘러싸기에 대한 강력한 시각적 표시를 제공합니다. 사람들은 각 탭이 어떤 방법으로든 다른 탭의 콘텐츠와 유사하거나 관련된 콘텐츠를 표시할 것을 기대합니다.

**패널 내의 제어기는 동일한 패널에 있는 콘텐츠에만 영향을 줄 수 있어야 합니다.** 패널은 상호 배타적이므로 완전히 독립적이도록 하십시오.

**패널의 콘텐츠를 설명하는 레이블을 각 탭에 제공하십시오.** 좋은 레이블은 사람들이 탭을 클릭하거나 탭하기 전에 패널의 콘텐츠를 예측하는 데 도움이 됩니다. 일반적으로 탭 레이블에는 명사 또는 짧은 명사 구를 사용하십시오. 동사 또는 짧은 동사 구는 일부 맥락에서 적합할 수 있습니다. 탭 레이블에는 제목식 대문자 표기법을 사용하십시오.

**팝업 버튼을 사용하여 탭 간에 전환하지 마십시오.** 탭이 있는 제어기는 한 번의 클릭 또는 탭으로 선택할 수 있기 때문에 효율적인 반면, 팝업 버튼은 두 번의 클릭 또는 탭이 필요합니다. 또한 탭이 있는 제어기는 화면상에 모든 선택 사항을 동시에 표시하는 반면, 팝업 버튼은 사람들이 이를 클릭해야 선택 사항을 볼 수 있습니다. 팝업 버튼은 콘텐츠 패널이 너무 많아서 탭으로 적절하게 표시할 수 없는 경우에 적합한 대안이 될 수 있습니다.

**하나의 탭 보기에서 여섯 개를 초과하는 탭을 제공하지 마십시오.** 여섯 개를 초과하는 탭이 있으면 과도한 느낌을 주고 레이아웃 문제가 생길 수 있습니다. 탭을 여섯 개 이상 표시해야 하는 경우 인터페이스를 구성하는 다른 방법을 고려하십시오. 예를 들어, 각 탭을 팝업 버튼 메뉴의 보기 옵션으로 표시할 수 있습니다.

개발자 지침을 보려면 [NSTabView](https://developer.apple.com/documentation/appkit/nstabview)의 내용을 참조하십시오.

## 구조

탭이 있는 제어기는 콘텐츠 영역의 상단 가장자리에 나타납니다. 패널을 프로그램적으로 전환할 때 적합하도록 제어기를 가릴 수도 있습니다.

![세 개의 탭이 있는 제어기가 콘텐츠 보기의 상단 가장자리 중앙에 있는 윈도우 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/tab-views-top@2x.png)

탭이 있는 제어기를 가리면 콘텐츠 영역은 테두리가 없거나, 베젤이 있거나, 선으로 된 테두리가 있을 수 있습니다. 테두리가 없는 보기는 불투명하거나 투명할 수 있습니다.

**일반적으로 탭 보기의 모든 측면에 윈도우 본문 영역의 여백을 남겨 탭 보기를 삽입하십시오.** 이 레이아웃은 깔끔하게 보이고 탭 보기의 콘텐츠와 직접적으로 관련되지 않은 추가 제어기를 위한 공간을 제공합니다. 윈도우 가장자리에 맞게 탭 보기를 확장할 수 있지만 이 레이아웃은 일반적이지 않습니다.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS 또는 visionOS에서는 지원되지 않습니다.*

### iOS, iPadOS

유사한 기능의 경우 [구분 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/segmented-controls)를 대신 사용하는 것을 고려하십시오.

### watchOS

watchOS는 [page controls](https://developer.apple.com/design/human-interface-guidelines/components/presentation/page-controls)를 사용하여 탭 보기를 표시합니다. 개발자 지침을 보려면 [TabView](https://developer.apple.com/documentation/swiftui/tabview)의 내용을 참조하십시오.

![Apple Watch의 Digital Crown 옆에 페이지 제어기를 보여주는 일러스트. 현재 점이 확대되며, 사람들이 현재 콘텐츠를 스크롤할 뿐만 아니라 페이지 간에 스크롤할 수 있음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/tab-view-watch-vertical@2x.png)

## 리소스

#### 관련 콘텐츠

[탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)

[구분 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/segmented-controls)

#### Developer 문서

[TabView](https://developer.apple.com/documentation/swiftui/tabview) — SwiftUI

[NSTabView](https://developer.apple.com/documentation/appkit/nstabview) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 5일 | watchOS의 탭 보기 사용에 대한 지침이 추가됨. |
