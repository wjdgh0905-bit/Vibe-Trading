# 풀 다운 버튼

Source: https://developer.apple.com/kr/design/human-interface-guidelines/pull-down-buttons

> 풀 다운 버튼을 사용하면 버튼의 목적과 직접 연관된 항목 또는 동작의 메뉴를 표시합니다.

![일련의 항목을 표시한 스타일화된 풀 다운 메뉴. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-pull-down-button-intro@2x.png)

사람들이 풀 다운 버튼의 메뉴에서 항목을 선택하면 메뉴는 닫히고 앱은 선택한 동작을 수행합니다.

## 모범 사례

**풀 다운 버튼을 사용하여 해당 버튼의 동작과 직접 연관된 명령 또는 항목을 제시하십시오.** 이 메뉴를 사용하면 인터페이스에 추가 버튼이 없어도 버튼의 대상을 명시하거나 동작을 사용자화할 수 있습니다. 예를 들어 다음과 같습니다.

- 추가 버튼은 사람들이 추가하려는 항목을 지정하는 메뉴를 제시할 수 있습니다.
- 분류 버튼은 분류할 속성을 선택하는 메뉴를 제시할 수 있습니다.
- 뒤로 버튼은 이전 위치를 여는 대신에 다시 방문할 특정 위치를 선택할 수 있습니다.

명령이 아닌 상호 배타적인 선택 항목의 목록을 제시하려면 대신 [팝업 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons)을 사용하십시오.

**보기의 모든 동작을 하나의 풀 다운 버튼에 배치하지 마십시오.** 보기의 기본 동작은 쉽게 볼 수 있도록 사람들이 작업을 수행하기 위해 열어야 하는 풀 다운 버튼에 숨기면 안됩니다.

**메뉴 길이는 사용 편의성에 맞추십시오.** 풀 다운 버튼과 상호작용해야 풀 다운 메뉴를 볼 수 있기 때문에 최소 3개의 항목을 나열해야 유용한 상호작용처럼 느껴집니다. 1~2개의 항목만 나열해야 하는 경우, 동작을 수행하는 버튼이나 선택 항목을 제시하는 토글 또는 스위치 등 다른 구성요소를 사용해 제시하십시오. 반면 풀 다운 버튼의 메뉴에 너무 많은 항목을 나열하면 특정 항목을 찾는 데 더 오래 걸려서 작업이 느려질 수 있습니다.

**유용한 경우에만 간결한 메뉴 제목을 표시하십시오.** 일반적으로 풀 다운 버튼의 콘텐츠는 수행하는 동작을 설명하는 메뉴 항목과 함께 필요한 모든 정보를 제공하기 때문에 메뉴 제목은 필요하지 않습니다.

**풀 다운 버튼의 메뉴 항목이 제거 동작을 수행한다면 해당 사실을 알리고 의도를 확인해 달라고 요청하십시오.** 메뉴는 빨간색 텍스트를 사용해 제거와 관련될 수 있다고 식별된 동작을 하이라이트합니다. 제거 동작을 선택하면 시스템은 선택을 확인하거나 동작을 취소할 수 있는 [동작 시트](https://developer.apple.com/kr/design/human-interface-guidelines/action-sheets)(iOS) 또는 [팝오버](https://developer.apple.com/kr/design/human-interface-guidelines/popovers)(iPadOS)를 표시합니다. 동작 시트는 메뉴와 다른 위치에 나타나고 신중하게 해제해야 하기 때문에 실수로 데이터를 잃는 것을 방지할 수 있습니다.

**유용한 경우 인터페이스 아이콘을 메뉴 항목에 포함하십시오.** 항목의 의미를 명시해야 한다면 레이블 뒤에 [아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/icons) 또는 이미지를 표시할 수 있습니다. 해당 목적으로 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 사용하면 기호를 모든 크기의 텍스트와 일치하게 정렬하면서 익숙한 경험을 제공할 수 있습니다.

## 플랫폼 고려 사항

*macOS 또는 visionOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS

> **참고:** 버튼에서 특정 제스처를 수행하여 풀 다운 메뉴를 공개하게 만들 수도 있습니다. 예를 들어, iOS 14 이상에서 Safari의 탭 버튼에서 길게 터치 제스처를 사용하면 새로운 탭 및 모든 탭 닫기와 같은 탭 관련 동작의 메뉴를 표시합니다.

**메인 인터페이스에서 눈에 띄는 위치에 둘 필요가 없는 항목은 더 보기 풀 다운 버튼에서 보여주십시오.** 더 보기 버튼을 사용하면 공간이 제한된 곳에서 다양한 항목을 제공할 수 있지만 해당 항목을 쉽게 찾을 수 없습니다. 일반적으로 사람들은 더 보기 버튼이 현재 맥락과 관련된 추가 기능을 제공한다는 사실을 알고 있지만 줄임표 아이콘을 보고 해당 버튼의 콘텐츠를 예상하기는 어렵습니다. 더 효과적인 더 보기 버튼을 디자인하려면 버튼 크기의 편의성과 쉽게 찾을 수 있는지 여부를 비교하여 균형있게 앱을 구성하십시오.

![iPhone의 메모 앱 스크린샷. 자연 산책이란 제목의 메모 앱 문서가 열려 있음. 상단 도구 막대의 뒤쪽 가장자리에는 더 보기 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/menu-secondary-actions-collapsed@2x.png)

![iPhone의 메모 앱 스크린샷. 자연 산책이란 제목의 메모 앱 문서가 열려 있음. 상단 도구 막대의 더 보기 버튼을 펼치면 추가 기능을 표시한 더 보기 메뉴가 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/menu-secondary-actions-expanded@2x.png)

## 리소스

#### 관련 콘텐츠

[팝업 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons)

[버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons)

[메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus)

#### Developer 문서

[MenuPickerStyle](https://developer.apple.com/documentation/swiftui/menupickerstyle) — SwiftUI

[showsMenuAsPrimaryAction](https://developer.apple.com/documentation/uikit/uicontrol/showsmenuasprimaryaction) — UIKit

[pullsDown](https://developer.apple.com/documentation/appkit/nspopupbutton/pullsdown) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2022년 9월 14일 | 유용한 메뉴 길이를 디자인하는 방법에 대한 지침이 개선됨. |
