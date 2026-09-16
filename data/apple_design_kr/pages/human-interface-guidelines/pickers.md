# 선택기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/pickers

> 선택기는 사람들이 선택할 수 있는 구별된 값으로 이루어진 하나 이상의 스크롤 가능한 목록을 표시합니다.

![스크롤 가능한 목록에서 선택된 항목의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-pickers-intro@2x.png)

시스템은 여러 스타일의 선택기를 제공하며, 각각의 선택기는 다양한 유형의 선택 가능한 값을 제공하고 서로 다른 모양을 갖습니다. 선택기에 표시되는 정확한 값과 그 순서는 기기 언어에 따라 달라집니다.

선택기는 하나 또는 여러 값을 선택하여 정보를 입력하도록 돕습니다. 날짜 선택기는 캘린더 보기에서 날짜를 선택하거나 숫자 키패드를 사용하여 날짜 및 시간을 입력하는 것과 같이 값을 선택하는 추가적인 방법을 명확하게 제공합니다.

## 모범 사례

**중간 길이에서 긴 길이의 항목 목록을 제공할 때 선택기를 사용하는 것을 고려하십시오.** 상당히 짧은 길이의 선택 목록을 표시하려는 경우에는 선택기 대신 [풀 다운 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pull-down-buttons)을 사용하는 것을 고려하십시오. 선택기를 사용하면 다수의 항목을 쉽고 빠르게 스크롤할 수 있지만 짧은 길이의 항목 목록의 경우에는 너무 많은 시각적 무게감이 더해질 수 있습니다. 이와 반대로, 매우 큰 항목 세트를 표시해야 하는 경우에는 [목록 및 표](https://developer.apple.com/kr/design/human-interface-guidelines/lists-and-tables)를 사용하는 것을 고려하십시오. 목록과 표는 높이를 조절할 수 있고, 표는 인덱스를 포함할 수 있으므로 목록의 섹션을 더 빠르게 찾을 수 있습니다.

**예측 가능하고 논리적 순서에 맞는 값을 사용하십시오.** 사람들이 선택기와 상호작용하기 전에 다수의 값은 가려진 상태일 수 있습니다. 알파벳 순서로 된 국가 목록과 같이 가려진 값을 예측할 수 있고 이를 통해 항목을 빠르게 이동할 수 있게 되는 것이 가장 좋습니다.

**선택기를 표시하기 위해 보기를 전환하지 마십시오.** 선택기는 편집 중인 필드 맥락에 맞게 아래 또는 근처에 표시될 때 효과적입니다. 일반적으로 선택기는 윈도우 하단 또는 팝오버에 나타납니다.

**날짜 선택기에 분을 지정할 때 너무 세분화된 값을 제공하지 마십시오.** 기본적으로 분 목록은 60개의 값(0~59)을 포함합니다. 60으로 균등하게 나눌 수만 있다면 분 간격을 선택적으로 늘릴 수 있습니다. 예를 들어, 15분 기준 간격(0, 15, 30 및 45)을 사용할 수 있습니다.

## 플랫폼 고려 사항

*visionOS에 대한 추가 고려 사항은 없습니다.*

### iOS, iPadOS

날짜 선택기는 터치, 키보드 또는 포인팅 장치를 사용하여 특정 날짜, 시간 또는 둘 모두를 선택할 수 있는 효율적인 인터페이스입니다. 다음과 같은 스타일 중 하나로 날짜 선택기를 표시할 수 있습니다.

- 콤팩트 — 모달 뷰에 편집 가능한 날짜 및 시간 콘텐츠를 표시하는 버튼입니다.
- 인라인 — 시간만 있을 경우에는 값으로 구성된 휠을 표시하고, 날짜 및 시간의 경우에는 인라인 캘린더 보기를 표시하는 버튼입니다.
- 휠 — 내장 또는 외장 키보드를 통해 데이터를 입력할 수도 있는 스크롤 휠 세트입니다.
- 자동 — 현재 플랫폼 및 날짜 선택기 모드에 기반하여 시스템에서 결정하는 스타일입니다.

날짜 선택기에는 네 가지 모드가 있으며 각 모드는 선택 가능한 값의 다양한 세트를 제공합니다.

- 날짜 — 월, 일, 연도를 표시합니다.
- 시간 — 시, 분 및 선택적으로 오전/오후 지정을 표시합니다.
- 날짜 및 시간 — 날짜, 시, 분 및 선택적으로 오전/오후 지정을 표시합니다.
- 카운트다운 타이머 — 최대 23시 59분까지 시, 분을 표시합니다. 해당 모드는 인라인 또는 콤팩트 스타일에서 사용할 수 없습니다.

날짜 선택기에 표시되는 정확한 값과 그 순서는 기기 위치에 따라 달라집니다.

날짜 선택기의 스타일 및 모드를 다양하게 조합한 예는 다음과 같습니다.

**콤팩트**

![현재 선택된 날짜를 표시하는 하나의 인라인 행이 있는 콤팩트 날짜 선택기의 일러스트. 선택기는 행 아래로 확장되며 팝오버로 열리고, 날짜를 선택할 수 있도록 전체 캘린더 월이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/pickers-date-picker-compact-expanded@2x.png)

**인라인**

![제목이 ‘날짜’인 인라인 날짜 선택기의 일러스트. 상단의 토글이 켜져 있고, 제목 및 토글 아래에 날짜 선택을 위한 캘린더 월이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/pickers-date-picker-inline-expanded@2x.png)

**휠**

![제목이 ‘시간’인 인라인 시간 선택기의 일러스트. 현재 선택된 시간이 제목 행에 표시되고, 제목 행 아래에 시간, 분, 오전 또는 오후 값을 선택하기 위한 세 개의 수직 휠이 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/pickers-time-picker-inline-wheel@2x.png)

**공간에 제약이 있을 경우 콤팩트 날짜 선택기를 사용하십시오.** 콤팩트 스타일은 현재 값을 앱의 강조 색상으로 보여주는 버튼을 표시합니다. 버튼을 탭하면 날짜 선택기에 의해 모달 뷰가 열리고, 익숙한 캘린더 스타일의 편집기 및 시간 선택기에 접근할 수 있게 됩니다. 모달 뷰에서 날짜 및 시간을 여러 번 편집한 다음 뷰 바깥을 탭하여 선택을 확인할 수 있습니다.

### macOS

**앱에 어울리는 날짜 선택기 스타일을 선택하십시오.** macOS에는 두 가지 스타일(텍스트 및 그래픽)의 날짜 선택기가 있습니다. 텍스트 스타일은 공간이 제한되어 있을 경우 그리고 사람들이 특정 날짜 및 시간을 선택할 것으로 예상되는 경우에 유용합니다. 그래픽 스타일은 캘린더에서 날짜를 탐색하거나 날짜 범위를 선택하거나 앱에 시계 페이스 모양을 표시하려는 경우에 유용합니다.

개발자 지침을 보려면 [NSDatePicker](https://developer.apple.com/documentation/appkit/nsdatepicker)의 내용을 참조하십시오.

### tvOS

tvOS에서 선택기는 SwiftUI로 사용할 수 있습니다. 개발자 지침을 보려면 [Picker](https://developer.apple.com/documentation/swiftui/picker)의 내용을 참조하십시오.

### watchOS

선택기는 사람들이 Digital Crown을 사용하여 탐색하는 항목의 목록을 표시하며, 사람들이 정확하고 참여적인 방식으로 선택을 할 수 있도록 돕습니다.

선택기는 휠 스타일을 사용하여 항목의 목록을 표시할 수 있습니다. watchOS 또한 휠 스타일을 사용하여 날짜 및 시간을 표시할 수 있습니다. 개발자 지침을 보려면 [Picker](https://developer.apple.com/documentation/swiftui/picker) 및 [DatePicker](https://developer.apple.com/documentation/swiftui/datepicker)의 내용을 참조하십시오.

![Apple Watch의 선택기 보기가 포함된 화면을 나타내는 일러스트가 있으며, 목록에 세 개 항목이 표시됨. 중앙의 항목이 하이라이트되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/pickers-wheel-watch@2x.png)

![Apple Watch의 날짜 선택기가 포함된 화면을 나타내는 일러스트가 있으며, 일이 하이라이트됨.](https://developer.apple.com/images/com.apple.HIG/kr/pickers-date-watch@2x.png)

![Apple Watch의 시간 선택기가 포함된 화면을 나타내는 일러스트가 있으며, 분이 하이라이트됨.](https://developer.apple.com/images/com.apple.HIG/kr/pickers-time-watch@2x.png)

선택기를 구성하여 윤곽, 캡션 및 스크롤 표시기를 구성할 수 있습니다.

목록이 긴 경우 탐색 링크는 선택기를 버튼으로 표시합니다. 버튼을 탭하면 시스템에서 옵션 목록을 표시합니다. 또한 Digital Crown을 사용하여 버튼을 탭하지 않고도 옵션 간에 이동할 수 있습니다. 개발자 지침을 보려면 [navigationLink](https://developer.apple.com/documentation/swiftui/pickerstyle/navigationlink)의 내용을 참조하십시오.

![Apple Watch의 선택기 버튼이 포함된 화면을 나타내는 일러스트. 버튼의 텍스트가 두 번째 항목이 선택되었음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/pickers-navigation-button-watch@2x.png)

![Apple Watch의 항목 목록이 표시된 화면을 나타내는 일러스트. 목록의 두 번째 항목이 선택되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/pickers-navigation-list-watch@2x.png)

## 리소스

#### 관련 콘텐츠

[풀 다운 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pull-down-buttons)

[목록 및 표](https://developer.apple.com/kr/design/human-interface-guidelines/lists-and-tables)

#### Developer 문서

[Picker](https://developer.apple.com/documentation/swiftui/picker) — SwiftUI

[UIDatePicker](https://developer.apple.com/documentation/uikit/uidatepicker) — UIKit

[UIPickerView](https://developer.apple.com/documentation/uikit/uipickerview) — UIKit

[NSDatePicker](https://developer.apple.com/documentation/appkit/nsdatepicker) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 5일 | watchOS의 선택기 사용에 대한 지침이 업데이트됨. |
