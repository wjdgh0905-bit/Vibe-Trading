# 팝업 버튼

Source: https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons

> 팝업 버튼은 상호 배타적인 옵션의 메뉴를 표시합니다.

![일련의 옵션을 표시한 스타일화된 팝업 버튼. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-pop-up-button-intro@2x.png)

팝업 버튼의 메뉴에서 항목을 선택하면 메뉴가 닫히고 버튼은 현재 선택 항목을 나타내는 콘텐츠를 업데이트할 수 있습니다.

![iPhone의 캘린더 앱 스크린샷. 편집해야 할 새로운 캘린더 이벤트가 열려 있음. 편집 화면에는 이벤트의 세부 정보(시작 및 종료 날짜, 이동 시간, 반복 간격, 캘린더, 초대받은 사람, 알림 옵션, 첨부 파일 등)를 설정하는 제어기가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/pop-up-button-closed@2x.png)

![iPhone의 캘린더 앱 스크린샷. 편집해야 할 새로운 캘린더 이벤트가 열려 있음. 반복 버튼을 누르면 나타나는 팝업 버튼 메뉴가 있음. 이 메뉴에는 사전 설정된 옵션 목록에서 반복 간격을 선택하거나 사용자 설정 간격을 만드는 옵션이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/pop-up-button-open@2x.png)

## 모범 사례

**팝업 버튼을 사용하여 상호 배타적인 옵션 또는 상태의 평면 목록을 제시하십시오.** 팝업 버튼을 사용하면 사람들이 콘텐츠 또는 주변 보기에 영향을 주는 선택을 내릴 수 있습니다. 다음과 같은 경우, [풀 다운 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pull-down-buttons)을 대신 사용하십시오.

- 동작 목록 제시하기
- 여러 항목을 선택할 수 있게 만들기
- 하위 메뉴 포함하기

**유용한 기본 선택 항목을 제시하십시오.** 팝업 버튼은 현재 선택 항목을 확인할 수 있도록 콘텐츠를 업데이트할 수 있지만 사람들이 항목을 선택하기 전에는 지정된 기본 항목을 표시합니다. 가능하다면 대부분의 사람이 선택할 확률이 높은 항목을 기본 선택 항목으로 설정하십시오.

**팝업 버튼을 열지 않고도 해당 버튼의 옵션을 예측할 수 있는 방법을 제공하십시오.** 예를 들어, 버튼의 효과를 설명하는 소개 레이블 또는 버튼 레이블을 사용해 옵션에 맥락을 제공할 수 있습니다.

**공간이 제한되어 모든 옵션을 항상 표시할 필요가 없으면 팝업 버튼을 사용하십시오.** 팝업 버튼을 사용하면 공간 효율적인 방법으로 다양한 선택 사항을 표시할 수 있습니다.

**필요한 경우 팝업 버튼의 메뉴에 사용자 설정 옵션을 포함하여 상황에 따라 유용한 추가 항목을 제공하십시오.** 사용자 설정 옵션을 제공하면 가끔 필요한 항목 또는 제어기로 인터페이스를 복잡하게 채우지 않을 수 있습니다. 옵션의 작동 방식을 이해할 수 있도록 목록 아래에 설명 텍스트를 표시할 수도 있습니다.

## 플랫폼 고려 사항

*iOS, macOS 또는 visionOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 watchOS에서는 지원되지 않습니다.*

### iPadOS

**팝오버 또는 모달 뷰 내에서 펼침 표시기 대신에 팝업 버튼을 사용하여 목록 항목에서 다양한 옵션을 제시하십시오.** 예를 들어, 사람들은 세부사항 보기로 이동하지 않고도 팝업 버튼의 메뉴에서 옵션을 빠르게 선택할 수 있습니다. 이 경우, 메뉴에서 잘 작동하는 비교적 작고 명확하게 정의된 일련의 옵션이 있다면 팝업 버튼을 사용하는 것이 좋습니다.

## 리소스

#### 관련 콘텐츠

[풀 다운 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pull-down-buttons)

[버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons)

[메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus)

#### Developer 문서

[MenuPickerStyle](https://developer.apple.com/documentation/swiftui/menupickerstyle)  — SwiftUI

[changesSelectionAsPrimaryAction](https://developer.apple.com/documentation/uikit/uibutton/changesselectionasprimaryaction) — UIKit

[NSPopUpButton](https://developer.apple.com/documentation/appkit/nspopupbutton) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 10월 24일 | 아트워크가 추가됨. |
| 2022년 9월 14일 | iPadOS의 팝오버 또는 모달 뷰에서 팝업 버튼 사용에 대한 지침 추가됨. |
