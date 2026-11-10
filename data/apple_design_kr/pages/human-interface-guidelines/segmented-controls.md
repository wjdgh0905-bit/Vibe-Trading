# 구분 제어기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/segmented-controls

> 구분 제어기는 선형적으로 이루어진 두 개 이상의 세그먼트 세트이며, 각 세그먼트는 버튼의 기능을 합니다.

![구분 제어기에서 선택된 세그먼트의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-segmented-control-intro@2x.png)

일반적으로 구분 제어기의 모든 세그먼트는 너비가 동일합니다. [버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons)과 마찬가지로 세그먼트는 텍스트 또는 이미지를 포함할 수 있습니다. 또한 세그먼트는 그 아래(또는 전체 제어기 아래)에 텍스트 레이블을 가질 수 있습니다.

구분 제어기는 옵션 세트에 대한 단일 선택을 제공하거나, macOS의 경우 단일 선택 또는 다중 선택을 제공합니다. 예를 들어, macOS Keynote에서는 정렬 옵션 제어기에서 하나의 세그먼트만 선택하여 선택된 텍스트를 정렬할 수 있습니다. 이와 반대로 서체 속성 제어기에서는 여러 세그먼트를 선택하여 볼드체, 이탤릭체, 밑줄체와 같은 스타일을 조합할 수 있습니다. 또한 Keynote 윈도우의 도구 막대는 구분 제어기를 사용하여 사람들이 메인 윈도우 영역에서 여러 편집 패널을 보고 가리도록 합니다.

![네 개의 텍스트 정렬 옵션으로 구성된 구분 제어기의 부분적 스크린샷. 중앙 정렬 옵션이 선택되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/segmented-control-one-choice@2x.png)

![네 개의 서체 유형으로 구성된 구분 제어기의 부분적 스크린샷. 네 개 중 세 개의 옵션이 선택되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/segmented-control-multiple-choices@2x.png)

구분 제어기는 단일 또는 다중 선택 상태를 표시하는 것뿐만 아니라, 선택 상태를 표시하지 않고 동작을 수행하는 버튼 세트의 기능을 수행할 수 있습니다. 예를 들어, macOS Mail의 답장, 모두 답장, 전달 버튼이 있습니다. 개발자 지침을 보려면 [isMomentary](https://developer.apple.com/documentation/uikit/uisegmentedcontrol/ismomentary) 및 [NSSegmentedControl.SwitchTracking.momentary](https://developer.apple.com/documentation/appkit/nssegmentedcontrol/switchtracking/momentary)의 내용을 참조하십시오.

## 모범 사례

**대상체, 상태 또는 보기에 영향을 주는 밀접하게 관련된 선택 항목에 구분 제어기를 사용하십시오.** 예를 들어, 인스펙터의 구분 제어기는 선택 항목에 적용할 하나 이상의 속성을 선택할 수 있게 하며, 도구 막대의 구분 제어기는 현재 보기에 수행할 동작 세트를 제공할 수 있습니다.

![움직이기 및 운동하기 활동 그래프가 표시된 iOS 건강 앱의 활동 화면의 상단 스크린샷. 그래프 위의 구분 제어기에 1일이 선택되어 있으며 그래프가 1일 활동을 표시하는 것을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/segmented-controls-activity-charts@2x.png)

**기능을 함께 그룹화하거나 선택 상태를 명확하게 표시하는 것이 중요한 경우 구분 제어기를 사용하는 것을 고려하십시오.** 다른 버튼 스타일과 달리 구분 제어기는 보기 크기 또는 표시 위치와 상관없이 그룹화를 유지합니다. 이러한 그룹화는 현재 어떤 제어기가 선택되어 있는지 한눈에 파악하는 데 도움을 줄 수도 있습니다.

**단일 구분 제어기 안에서 제어기 유형을 일관되게 유지하십시오.** 선택 상태를 표시하는 제어기의 세그먼트에 동작을 할당하거나, 동작을 수행하는 제어기의 세그먼트에 선택 상태를 표시하지 마십시오.

**제어기의 세그먼트 수를 제한하십시오.** 세그먼트가 너무 많으면 파악하기 어렵고 이동하는 데 시간이 걸립니다. 넓은 인터페이스에서는 세그먼트가 5~7개 정도를 넘지 않고 iPhone에서는 세그먼트가 5개를 넘지 않도록 하십시오.

**일반적으로 세그먼트 크기를 일관되게 유지하십시오.** 모든 세그먼트가 동일한 너비이면 구분 제어기가 균형 잡혀 보입니다. 가능한 한, 아이콘과 제목 너비도 일관되게 유지하는 것이 가장 좋습니다.

## 콘텐츠

**가급적이면 단일 구분 제어기에서 텍스트 또는 이미지를 혼합하지 말고 둘 중 하나를 사용하십시오.** 개별 세그먼트에 텍스트 레이블 또는 이미지를 포함할 수 있지만 단일 제어기에서 이 둘을 혼합하여 사용하면 일관되지 않고 혼란스러운 인터페이스가 될 수 있습니다.

**가능한 한 각 세그먼트에 비슷한 크기의 콘텐츠를 사용하십시오.** 일반적으로 모든 세그먼트는 동일한 너비이므로 세그먼트에 콘텐츠가 채워져 있는 정도가 균일하지 않다면 보기에 좋지 않습니다.

**세그먼트 레이블에 명사 또는 명사구를 사용하십시오.** 각 세그먼트를 설명하고 [title-style capitalization](https://support.apple.com/guide/applestyleguide/c-apsgb744e4a3/web#apdca93e113f1d64)(제목식 대문자 표기법)을 사용하는 텍스트를 작성하십시오. 텍스트 레이블을 표시하는 구분 제어기는 소개 텍스트가 필요하지 않습니다.

## 플랫폼 고려 사항

*watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS

**밀접하게 관련된 하위 보기 간에 전환하기 위해 구분 제어기를 사용하는 것을 고려하십시오.** 구분 제어기는 관련된 하위 보기 간에 빠르게 전환하는 유용한 방법이 될 수 있습니다. 예를 들어, 캘린더의 새로운 이벤트 시트는 새로운 이벤트 및 새로운 미리 알림을 생성하는 하위 보기 간에 전환합니다. 앱의 완전히 구별된 섹션 간에 전환하는 경우에는 [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)를 대신 사용하십시오.

![새로운 이벤트 시트가 표시된 iOS 캘린더 앱의 화면 상단 스크린샷. 구분 제어기가 새로운 이벤트 및 새로운 미리 알림 추가 간에 전환하는 기능을 제공함.](https://developer.apple.com/images/com.apple.HIG/kr/segmented-controls-calendar-new-event@2x.png)

### macOS

**구분 제어기의 목적을 명확하게 나타내도록 소개 텍스트를 사용하는 것을 고려하십시오.** 제어기에 기호 또는 인터페이스 아이콘을 사용하는 경우, 각 세그먼트 아래에 레이블을 또한 추가하여 의미를 명확하게 나타낼 수 있습니다. 앱에 툴팁이 포함된 경우, 구분 제어기의 각 세그먼트에 툴팁을 제공하십시오.

**메인 윈도우 영역에서 보기를 전환하는 경우 구분 제어기 대신 탭 보기를 사용하십시오.** [탭 보기](https://developer.apple.com/kr/design/human-interface-guidelines/tab-views)는 효율적인 보기 전환을 지원하며 구분 제어기와 결합된 [상자](https://developer.apple.com/kr/design/human-interface-guidelines/boxes) 모양과 비슷합니다. 도구 막대 또는 인스펙터 패널에서 보기를 전환하는 경우에는 구분 제어기를 사용하는 것을 고려하십시오.

![macOS 캘린더 앱의 스크린샷. 메인 윈도우 영역에 일, 주, 월, 년 등 네 개의 탭이 포함된 탭 보기가 표시됨. 사이드바에는 신규, 답장 등의 두 개의 세그먼트가 포함된 구분 제어기가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/macos-calendar-tab-view-segmented-control-comparison@2x.png)

**스프링 로딩에 대한 지원을 고려하십시오.** Magic Trackpad가 탑재된 Mac에서는 스프링 로딩을 통해 선택한 항목을 세그먼트 위로 드래그하고 세게 클릭하여 선택한 항목을 놓지 않고 사람들이 해당 세그먼트를 활성화할 수 있습니다. 세그먼트가 활성화된 후 계속 항목을 드래그할 수도 있습니다.

### tvOS

**콘텐츠 필터링을 수행하는 화면에서 구분 제어기 대신 Split View를 사용하는 것을 고려하십시오.** 일반적으로 사람들은 Split View를 사용하여 콘텐츠와 필터링 옵션 간에 앞뒤로 쉽게 이동할 수 있습니다. 구분 제어기는 배치에 따라 접근의 용이성이 그에 못 미칠 수 있습니다.

**초점이 맞춰지는 다른 요소를 구분 제어기와 가깝게 두지 마십시오.** 세그먼트는 클릭할 때가 아니라 초점을 이동할 때 선택됩니다. 다른 인터페이스 요소를 계산하여 구분 제어기를 어디에 놓을지 신중히 고려하십시오. 초점이 맞춰지는 다른 요소가 너무 가까이 있으면 사람들이 세그먼트를 전환할 때 의도치 않게 다른 요소로 초점을 맞출 수 있습니다.

### visionOS

아이콘을 사용하는 구분 제어기를 사람들이 볼 때 시스템은 제공된 설명 텍스트를 포함하는 툴팁을 표시합니다.

## 리소스

#### 관련 콘텐츠

[Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views)

#### Developer 문서

[segmented](https://developer.apple.com/documentation/swiftui/pickerstyle/segmented) — SwiftUI

[UISegmentedControl](https://developer.apple.com/documentation/uikit/uisegmentedcontrol) — UIKit

[NSSegmentedControl](https://developer.apple.com/documentation/appkit/nssegmentedcontrol) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
