# 레이블

Source: https://developer.apple.com/kr/design/human-interface-guidelines/labels

> 레이블은 사람들이 읽고 복사할 수 있지만 편집할 수는 없는 정적 텍스트입니다.

![텍스트 레이블의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-label-intro@2x.png)

레이블은 인터페이스 전체에서 버튼, 메뉴 항목 및 보기에 텍스트를 표시하여 사람들이 현재 맥락과 다음에 할 수 있는 작업을 이해하도록 도와줍니다.

*레이블*이라는 용어는 다양한 위치에서 나타날 수 있는 편집 불가능한 텍스트를 의미합니다. 예를 들어 다음과 같습니다.

- 버튼 내에서 레이블은 일반적으로 편집, 취소 또는 보내기와 같은 버튼의 기능을 전달합니다.
- 많은 목록 내에서 레이블은 각 항목을 설명할 수 있으며, 종종 기호 또는 이미지와 함께 표시됩니다.
- 보기 내에서 레이블은 제어기를 소개하거나 사람들이 보기에서 수행할 수 있는 일반적인 동작이나 작업을 설명하여 추가적인 맥락을 제공할 수 있습니다.

> **개발자 참고 사항:** 편집 불가능한 텍스트를 표시하기 위해 SwiftUI는 두 개의 구성요소인 [Label](https://developer.apple.com/documentation/swiftui/label) 및 [Text](https://developer.apple.com/documentation/swiftui/text)를 정의합니다.

아래 지침은 레이블을 사용하여 텍스트를 표시하는 데 도움이 될 수 있습니다. 일부의 경우, [버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons), [메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus)와 [목록 및 표](https://developer.apple.com/kr/design/human-interface-guidelines/lists-and-tables)와 같은 특정 구성요소의 지침에는 텍스트 사용을 위한 추가적인 권장 사항이 포함되어 있습니다.

## 모범 사례

**사람들이 편집할 필요가 없는 적은 양의 텍스트를 표시하려면 레이블을 사용하십시오.** 사람들이 적은 양의 텍스트를 편집하도록 허용해야 하는 경우, [텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields)를 사용하십시오. 많은 양의 텍스트를 표시하고 사람들이 이를 선택적으로 편집하도록 허용해야 하는 경우, [텍스트 보기](https://developer.apple.com/kr/design/human-interface-guidelines/text-views)를 사용하십시오.

**시스템 서체를 우선시하십시오.** 레이블은 일반 또는 스타일이 지정된 텍스트를 표시할 수 있으며, 기본적으로 다이나믹 타입(사용 가능한 경우)을 지원합니다. 레이블의 스타일을 조절하거나 사용자 설정 서체를 사용하는 경우, 텍스트가 읽기 쉬운 상태로 유지되는지 확인하십시오.

**시스템 제공 레이블 색상을 사용하여 상대적 중요성을 전달하십시오.** 시스템은 다양한 모양으로 구성된 네 개의 레이블 색상을 정의하여 텍스트에 다양한 수준의 시각적 중요성을 부여합니다. 추가 지침을 보려면 [색상](https://developer.apple.com/kr/design/human-interface-guidelines/color)의 내용을 참조하십시오.

| 시스템 색상 | 사용 예시 | iOS, iPadOS, tvOS, visionOS | macOS |
| --- | --- | --- | --- |
| 레이블 | 기본 정보 | [label](https://developer.apple.com/documentation/uikit/uicolor/label) | [labelColor](https://developer.apple.com/documentation/appkit/nscolor/labelcolor) |
| 2차 레이블 | 부머리말 또는 추가 텍스트 | [secondaryLabel](https://developer.apple.com/documentation/uikit/uicolor/secondarylabel) | [secondaryLabelColor](https://developer.apple.com/documentation/appkit/nscolor/secondarylabelcolor) |
| 3차 레이블 | 사용할 수 없는 항목 또는 동작을 설명하는 텍스트 | [tertiaryLabel](https://developer.apple.com/documentation/uikit/uicolor/tertiarylabel) | [tertiaryLabelColor](https://developer.apple.com/documentation/appkit/nscolor/tertiarylabelcolor) |
| 4차 레이블 | 워터마크 텍스트 | [quaternaryLabel](https://developer.apple.com/documentation/uikit/uicolor/quaternarylabel) | [quaternaryLabelColor](https://developer.apple.com/documentation/appkit/nscolor/quaternarylabelcolor) |

**유용한 레이블 텍스트는 선택할 수 있도록 합니다.** 레이블에 오류 메시지, 위치 또는 IP 주소와 같은 유용한 정보가 포함되어 있는 경우, 사람들이 해당 정보를 선택하고 복사하여 다른 곳에 붙여넣을 수 있도록 하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS 또는 visionOS에 대한 추가 고려 사항은 없습니다.*

### macOS

> **개발자 참고 사항:** 레이블에 편집 불가능한 텍스트를 표시하려면 [NSTextField](https://developer.apple.com/documentation/appkit/nstextfield)의 [isEditable](https://developer.apple.com/documentation/appkit/nstextfield/iseditable) 속성을 사용하십시오.

### watchOS

날짜 및 시간 텍스트 구성요소는(아래 왼쪽 그림처럼) 현재 날짜, 현재 시간 또는 둘의 조합을 표시합니다. 날짜 텍스트 구성요소를 구성하여 다양한 포맷, 캘린더 및 시간대를 사용할 수 있습니다. 카운트다운 타이머 텍스트 구성요소는(아래 오른쪽 그림처럼) 정확한 카운트다운 또는 카운트업 타이머를 표시합니다. 타이머 텍스트 구성요소를 구성하여 카운트 값을 다양한 포맷으로 표시할 수 있습니다.

![Apple Watch의 날짜 및 시간 텍스트 구성요소를 나타내는 일러스트. 앞쪽 가장자리에는 날짜가 정렬되어 있고 뒤쪽 가장자리에는 시간이 정렬됨.](https://developer.apple.com/images/com.apple.HIG/kr/labels-date-time-text-component@2x.png)

![Apple Watch의 카운트다운 타이머 텍스트 구성요소를 나타내는 일러스트. 중앙에 시간 값이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/labels-countdown-timer-text-component@2x.png)

시스템 제공 날짜 및 타이머 텍스트 구성요소를 사용하는 경우, watchOS는 사용 가능한 공간에 맞게 레이블의 표시를 자동으로 조절합니다. 또한 시스템은 앱에서 추가 입력 없이 콘텐츠를 업데이트합니다.

컴플리케이션에 날짜 및 타이머 구성요소를 사용하는 것을 고려하십시오. 디자인 지침을 보려면 [Complications](https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/complications)의 내용을 참조하십시오. 개발자 지침을 보려면 [Text](https://developer.apple.com/documentation/swiftui/text)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields)

[텍스트 보기](https://developer.apple.com/kr/design/human-interface-guidelines/text-views)

#### Developer 문서

[Label](https://developer.apple.com/documentation/swiftui/label) — SwiftUI

[Text](https://developer.apple.com/documentation/swiftui/text) — SwiftUI

[UILabel](https://developer.apple.com/documentation/uikit/uilabel) — UIKit

[NSTextField](https://developer.apple.com/documentation/appkit/nstextfield) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 5일 | watchOS 10의 변경 사항을 반영하기 위해 지침이 업데이트됨. |
