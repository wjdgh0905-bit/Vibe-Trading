# 텍스트 보기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/text-views

> 텍스트 보기는 선택적으로 편집할 수 있는 여러 줄의 스타일이 지정된 텍스트 콘텐츠를 표시합니다.

![텍스트가 포함된 필드의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-text-view-intro@2x.png)

텍스트 보기는 어떤 높이든 가능하며, 콘텐츠가 보기 외부로 확장되면 스크롤할 수 있습니다. 기본적으로 텍스트 보기 내의 콘텐츠는 앞쪽 가장자리에 정렬되고 시스템 레이블 색상을 사용합니다. iOS, iPadOS 및 visionOS에서 텍스트 보기를 편집할 수 있는 경우, 사람들이 보기를 선택하면 키보드가 나타납니다.

## 모범 사례

**길거나, 편집할 수 있거나, 특수한 포맷으로 된 텍스트를 표시해야 하는 경우 텍스트 보기를 사용하십시오.** 텍스트 보기는 특수 텍스트를 표시하고 텍스트 입력을 받기 위해 가장 많은 옵션을 제공한다는 점에서 [텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields) 및 [레이블](https://developer.apple.com/kr/design/human-interface-guidelines/labels)과 다릅니다. 적은 양의 텍스트를 표시해야 하는 경우 레이블을 사용하거나, 텍스트를 편집할 수 있는 경우 텍스트 필드를 사용하는 것이 더 간단합니다.

**텍스트의 가독성을 유지하십시오.** 여러 서체, 색상 및 정렬을 다양한 방법으로 사용할 수 있지만 콘텐츠의 가독성을 유지하는 것이 중요합니다. 사람들이 기기에서 텍스트 크기를 변경하는 경우에도 텍스트가 잘 보이도록 다이나믹 타입을 사용하는 것이 좋습니다. 볼드체 텍스트와 같은 손쉬운 사용 옵션을 켠 상태로 콘텐츠를 테스트하십시오. 지침을 보려면 [손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility) 및 [타이포그래피](https://developer.apple.com/kr/design/human-interface-guidelines/typography)의 내용을 참조하십시오.

**유용한 텍스트를 선택할 수 있도록 만드십시오.** 텍스트 보기에 오류 메시지, 일련 번호 또는 IP 주소와 같은 유용한 정보가 포함되어 있는 경우, 사람들이 해당 정보를 선택하고 복사하여 다른 곳에 붙여넣을 수 있도록 하는 것을 고려하십시오.

## 플랫폼 고려 사항

*macOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### iOS, iPadOS

**적절한 키보드 유형을 표시하십시오.** 여러 키보드 유형을 사용할 수 있으며, 각각 다양한 입력 유형을 용이하게 하도록 설계되었습니다. 데이터 입력을 간소화하려면 텍스트 보기를 편집할 때 표시되는 키보드는 콘텐츠 유형에 적합해야 합니다. 지침을 보려면 [가상 키보드](https://developer.apple.com/kr/design/human-interface-guidelines/virtual-keyboards)의 내용을 참조하십시오.

### tvOS

텍스트 보기를 사용하여 tvOS에서 텍스트를 표시할 수 있습니다. tvOS의 텍스트 입력은 설계상 최소화되었기 때문에 tvOS는 편집할 수 있는 텍스트에 [텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields)를 사용합니다.

## 리소스

#### 관련 콘텐츠

[레이블](https://developer.apple.com/kr/design/human-interface-guidelines/labels)

[텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields)

[콤보 상자](https://developer.apple.com/kr/design/human-interface-guidelines/combo-boxes)

#### Developer 문서

[Text](https://developer.apple.com/documentation/swiftui/text) — SwiftUI

[UITextView](https://developer.apple.com/documentation/uikit/uitextview) — UIKit

[NSTextView](https://developer.apple.com/documentation/appkit/nstextview) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 5일 | watchOS 10의 변경 사항을 반영하기 위해 지침이 업데이트됨. |
