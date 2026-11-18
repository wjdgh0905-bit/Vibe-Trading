# 토글

Source: https://developer.apple.com/kr/design/human-interface-guidelines/toggles

> 토글을 사용하면 켬/끔과 같이 상태가 반대인 한 쌍의 항목 중에서 선택할 수 있으며, 각 상태는 서로 다른 모양으로 나타납니다.

![레이블이 있는 두 개의 스위치 제어기의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-toggles-intro@2x.png)

토글은 스위치, 체크상자와 같은 다양한 스타일을 가질 수 있으며, 여러 플랫폼에서 다양한 방식으로 이러한 스타일을 사용할 수 있습니다. 지침을 보려면 [플랫폼 고려 사항](https://developer.apple.com/kr/design/human-interface-guidelines/toggles#Platform-considerations)의 내용을 참조하십시오.

토글 외에도, 모든 플랫폼에서는 각 상태에 서로 다른 모양을 사용하여 토글과 유사하게 동작하는 버튼 또한 지원합니다. 개발자 지침을 보려면 [ToggleStyle](https://developer.apple.com/documentation/swiftui/togglestyle)의 내용을 참조하십시오.

## 모범 사례

**콘텐츠 또는 보기의 상태에 영향을 주는 반대되는 두 개의 값 중에서 선택할 때 토글을 사용하십시오.** 토글은 항상 무언가의 상태를 관리하는 데 사용됩니다. 따라서 기타 유형의 동작(예: 항목 목록 중에서 선택)을 지원하려는 경우, 다른 구성요소(예: [팝업 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons))를 사용하십시오.

**토글이 영향을 미치는 설정, 보기 또는 콘텐츠를 명확하게 나타내십시오.** 일반적으로 사람들은 주변 맥락을 통해 자신이 켜거나 끄는 항목에 대한 충분한 정보를 파악할 수 있습니다. 주로 macOS 앱과 같은 일부 경우에는 토글이 제어하는 상태를 레이블로 설명할 수도 있습니다. 토글처럼 동작하는 버튼을 사용하는 경우에는 일반적으로 목적을 나타내는 인터페이스 아이콘을 사용한 다음, 현재 상태에 따라 주로 배경을 변경하는 방식을 통해 해당 아이콘의 모양을 업데이트하면 됩니다.

**토글 상태의 시각적 차이점이 뚜렷해야 합니다.** 예를 들어, 색상 채우기를 추가 또는 제거하거나, 배경 모양을 표시 또는 가리거나, 체크 표시 또는 점과 같은 내부 세부사항의 표시를 변경하여 토글의 켬 또는 끔 상태를 나타낼 수 있습니다. 다른 색상으로만 상태를 나타내서는 안 됩니다. 색상의 차이를 인지하지 못하는 사람들도 있기 때문입니다.

## 플랫폼 고려 사항

*tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### iOS, iPadOS

**목록 행에서 스위치 토글 스타일만 사용하십시오.** 이 경우, 행의 콘텐츠가 스위치가 제어하는 상태에 대한 맥락을 제공하므로 레이블이 없어도 됩니다.

**필요한 경우에만 스위치의 기본 색상을 변경하십시오.** 기본 색상인 초록색은 대체로 잘 어울리지만 앱의 강조 색상을 대신 사용하려는 경우도 있을 것입니다. 색상이 없는 모양과 충분한 대비를 이루어 잘 인식이 되는 색상을 사용해야 합니다.

![두 개의 목록 행의 일러스트로, 하나는 스위치 토글이 활성화되어 있고 다른 하나는 스위치 토글이 비활성화되어 있음. 활성화된 토글에는 표준 스위치 색상인 초록색 색조가 적용되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/toggles-ios-default-color@2x.png)

![두 개의 목록 행의 일러스트로, 하나는 스위치 토글이 활성화되어 있고 다른 하나는 스위치 토글이 비활성화되어 있음. 활성화된 토글에는 사용자 설정 스위치 색상인 보라색 색조가 적용되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/toggles-ios-custom-color@2x.png)

**목록 바깥에서는 스위치 대신 토글처럼 작동하는 버튼을 사용하십시오.** 예를 들어, 전화 앱은 필터 버튼에 토글을 사용하여 사용자가 최근 통화를 필터링할 수 있도록 합니다.  앱은 토글이 활성화되면 파란색 하이라이트를 추가하고, 토글이 비활성화되면 하이라이트를 제거합니다.

![iPhone의 전화 앱 상단 스크린샷으로, 최근 부재중 전화의 필터링된 목록이 표시됨. 상단 뒤쪽 모서리에 있는 필터 버튼에 파란색 하이라이트가 있으며, 토글이 활성화됨을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/toggles-ios-phone-filter-on@2x.png)

![iPhone의 전화 앱 상단 스크린샷으로, 모든 최근 통화가 표시됨. 상단 뒤쪽 모서리에 있는 필터 버튼에 하이라이트가 없으며, 토글이 비활성화됨을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/toggles-ios-phone-filter-off@2x.png)

**버튼의 목적을 설명하는 레이블은 제공하지 마십시오.** 사람들은 인터페이스 아이콘과 대체 배경 모양을 통해 버튼의 역할을 파악할 수 있습니다. 개발자 지침을 보려면 [changesSelectionAsPrimaryAction](https://developer.apple.com/documentation/uikit/uibutton/changesselectionasprimaryaction)의 내용을 참조하십시오.

### macOS

스위치 토글 스타일 외에도 macOS는 체크상자 스타일을 지원하며, 유사한 동작을 제공하는 선택 버튼 또한 정의합니다.

**윈도우 프레임이 아닌 윈도우 본문에 스위치, 체크상자 및 선택 버튼을 사용하십시오.** 특히 이러한 구성요소를 도구 막대 또는 상태 막대에 사용하지 마십시오.

#### 스위치

**강조하고 싶은 설정의 스위치를 우선적으로 사용하십시오.** 스위치는 체크상자보다 시각적 무게감이 높으므로 체크상자가 일반적으로 제어하는 기능보다 더 많은 기능을 제어하는 것이 더 잘 어울립니다. 예를 들어, 하나의 설정이 아니라 설정 그룹을 켜거나 끄는 데 스위치를 사용할 수 있습니다. 개발자 지침을 보려면 [switch](https://developer.apple.com/documentation/swiftui/togglestyle/switch)의 내용을 참조하십시오.

**그룹화된 양식에서는 작은 스위치를 사용하여 단일 행에서 설정을 제어하는 것을 고려하십시오.** 작은 스위치의 높이는 버튼이나 기타 제어 기능의 높이와 비슷하여 높이가 일정한 행이 생성됩니다. 그룹화된 양식 내에 설정 계층을 나타내고 싶다면 기본 설정에는 일반 스위치를, 하위 설정에는 작은 스위치를 사용하면 됩니다. 개발자 지침을 보려면 [GroupedFormStyle](https://developer.apple.com/documentation/swiftui/groupedformstyle) 및 [ControlSize](https://developer.apple.com/documentation/swiftui/controlsize)의 내용을 참조하십시오.

**일반적으로 체크상자를 스위치로 대치하지 마십시오.** 이미 인터페이스에서 체크상자를 사용하고 있는 경우, 그대로 계속 사용하는 것이 가장 좋을 수 있습니다.

#### 체크상자

체크상자는 버튼이 꺼지면 비어 있고, 버튼이 켜지면 체크 표시가 나타나고, 버튼이 혼재된 상태이면 대시가 나타나는 작은 정사각형 버튼입니다. 보통 체크상자는 뒤쪽에 제목이 나와 있습니다. 편집 가능한 체크리스트에서 체크상자는 제목이나 추가적인 다른 내용 없이 표시됩니다.

**설정의 계층을 표시해야 하는 경우 스위치 대신 체크상자를 사용하십시오.** 체크상자의 시각적 스타일은 잘 정렬되며 그룹을 표시합니다. 정렬(일반적으로 체크상자의 앞쪽 가장자리를 따라 정렬)과 들여쓰기를 사용하여 체크상자의 상태가 하위 체크상자의 상태를 제어하는 것과 같은 종속성을 표시할 수 있습니다.

![두 단계의 체크상자를 포함하는 레이아웃이 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/checkbox-alignment@2x.png)

**세 개 이상의 상호 배타적인 옵션 세트를 표시해야 하는 경우 선택 버튼을 사용하는 것을 고려하십시오.** 그저 ‘켬’ 또는 ‘끔’이 아니라 더 많은 옵션 중에서 선택해야 하는 경우, 여러 개의 선택 버튼을 사용하여 고유한 레이블로 각 옵션을 명확하게 나타낼 수 있습니다.

**관계가 명확하게 나타나지 않는 경우 체크상자 그룹을 설명하는 레이블을 사용하는 것을 고려하십시오.** 옵션 세트를 설명하고, 레이블의 기준선을 그룹의 첫 번째 체크상자에 맞춰 정렬하십시오.

**체크상자의 상태를 모양에 정확하게 반영하십시오.** 체크박스의 상태는 켬, 끔 또는 혼재된 상태일 수 있습니다. 체크상자를 사용하여 전체적으로 여러 하위 체크상자를 켜고 끄려는 경우, 하위 체크상자의 상태가 서로 다를 때 혼재 상태로 표시하십시오. 예를 들어, 모든 스타일을 켜거나 끄는 텍스트 스타일 설정을 표시하면서 볼드체, 이탤릭체 또는 밑줄체와 같은 일부 개별 스타일 설정을 선택할 수 있도록 해야 할 수 있습니다. 개발자 지침을 보려면 [allowsMixedState](https://developer.apple.com/documentation/appkit/nsbutton/allowsmixedstate)의 내용을 참조하십시오.

![켬 상태의 체크상자가 표시된 일러스트로, 체크상자는 파란색 색상이 채워져 있고 흰색 체크 표시가 있는 모서리가 둥근 작은 정사각형 모양임.](https://developer.apple.com/images/com.apple.HIG/kr/checkbox-selected@2x.png)

![끔 상태의 체크상자가 표시된 일러스트로, 체크상자는 채우기 색상이 없는 모서리가 둥근 작은 정사각형 모양임.](https://developer.apple.com/images/com.apple.HIG/kr/checkbox-deselected@2x.png)

![혼재 상태의 체크상자가 표시된 일러스트로, 체크상자는 파란색 색상이 채워져 있고 흰색 하이픈이 있는 모서리가 둥근 작은 정사각형 모양임.](https://developer.apple.com/images/com.apple.HIG/kr/checkbox-mixed@2x.png)

#### 선택 버튼

선택 버튼은 뒤에 레이블이 있는 작은 원형 버튼입니다. 일반적으로 선택 버튼은 두 개 내지 다섯 개의 그룹으로 표시되며 상호 배타적인 선택 항목 세트를 나타냅니다.

![한 열로 다섯 개의 항목이 표시된 일러스트로, 각 항목에는 선택 버튼 레이블이라는 텍스트 앞에 선택 버튼이 있음. 세 번째 항목의 선택 버튼이 채워져 항목이 선택되었음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/radio-button-example@2x.png)

선택 버튼의 상태는 선택됨(채워진 원) 또는 선택 해제됨(비어 있는 원) 중 하나입니다. 선택 버튼도 혼재 상태(대시로 표시)를 표시할 수 있지만 이 상태는 거의 유용하지 않습니다. 추가 선택 버튼을 사용하여 여러 상태를 나타낼 수 있기 때문입니다. 설정 또는 항목이 혼재 상태임을 표시해야 하는 경우, 체크상자를 대신 사용하는 것을 고려하십시오.

![선택됨 선택 버튼이 표시된 일러스트로, 어두운 색상으로 채워진 작은 원 중앙에 흰색 점이 있는 모양임.](https://developer.apple.com/images/com.apple.HIG/kr/radio-button-selected@2x.png)

![선택 해제됨 선택 버튼이 표시된 일러스트로, 비어 있는 작은 원 모양임.](https://developer.apple.com/images/com.apple.HIG/kr/radio-button-deselected@2x.png)

**가급적이면 선택 버튼 세트는 상호 배타적인 옵션을 표시하는 데 사용하십시오.** 사람들이 세트 안의 여러 옵션을 선택하도록 해야 하는 경우, 체크상자를 대신 사용하십시오.

**한 세트에 너무 많은 선택 버튼을 나열하지 마십시오.** 긴 목록으로 된 선택 버튼은 인터페이스에서 많은 공간을 차지하고 부담이 될 수 있습니다. 대략 여섯 개 이상의 옵션을 표시해야 하는 경우, [팝업 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons)과 같은 구성요소를 대신 사용하는 것을 고려하십시오.

**켜거나 끌 수 있는 단일 설정을 표시하려면 가급적 체크상자를 사용하십시오.** 단일 선택 버튼으로도 항목을 켜거나 끌 수 있지만 체크상자는 체크 표시의 유무를 통해 현재 상태를 더 쉽게 한눈에 파악할 수 있습니다. 단일 체크상자가 반대의 상태를 명확하게 나타내지 못하는 흔하지 않은 경우가 생긴다면 한 쌍의 선택 버튼과 해당 버튼이 제어하는 상태가 설명된 레이블을 함께 사용할 수 있습니다.

**선택 버튼을 수평으로 표시할 때 일관적인 간격을 사용하십시오.** 가장 긴 버튼 레이블을 수용하는 데 필요한 공간을 측정하고 해당 길이를 일관적으로 사용하십시오.

![일렬로 3개 항목이 표시된 일러스트로, 각 항목 앞에 선택 버튼이 있음. 첫 번째 및 세 번째 항목에는 긴 텍스트 레이블이 있고 두번째 항목에는 짧은 레이블이 있음. 각 항목이 차지하는 가로 간격이 동일함. 두 번째 항목 앞의 선택 버튼이 채워져 항목이 선택되었음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/radio-button-equal-spacing@2x.png)

## 리소스

#### 관련 콘텐츠

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

#### Developer 문서

[Toggle](https://developer.apple.com/documentation/swiftui/toggle) — SwiftUI

[UISwitch](https://developer.apple.com/documentation/uikit/uiswitch) — UIKit

[NSButton.ButtonType.toggle](https://developer.apple.com/documentation/appkit/nsbutton/buttontype/toggle) — AppKit

[NSSwitch](https://developer.apple.com/documentation/appkit/nsswitch) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 3월 29일 | macOS 앱에서 스위치를 사용하기 위한 지침이 개선되었으며, 체크상자에 제목이 있는 경우 명확성을 높이고, 선택 버튼의 아트워크를 추가함. |
| 2023년 9월 12일 | 아트워크 업데이트. |
