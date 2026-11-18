# 편집 메뉴

Source: https://developer.apple.com/kr/design/human-interface-guidelines/edit-menus

> 편집 메뉴를 사용하면 복사하기, 선택, 번역 및 찾아보기와 같은 관련 명령을 제공하는 것 외에도 사람들이 현재 보기에서 선택한 콘텐츠를 변경할 수 있습니다.

![선택한 텍스트에서 펼쳐지는 스타일화된 편집 메뉴 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-edit-menu-intro@2x.png)

편집 메뉴의 명령은 텍스트 외에도 이미지, 파일, 연락처 카드, 차트 또는 지도 위치와 같은 대상체 등 많은 유형의 선택 가능한 콘텐츠에 적용할 수 있습니다. iOS, iPadOS 및 visionOS에서 시스템은 선택한 항목의 데이터 유형을 자동으로 감지하여 편집 메뉴에 관련 동작을 추가할 수 있습니다. 예를 들어, 주소를 선택하면 편집 메뉴에 *경로 보기*와 같은 항목을 추가할 수 있습니다.

편집 메뉴는 다양한 플랫폼에서 모양과 동작이 약간 다를 수 있습니다.

- iOS에서 편집 메뉴는 사람들이 보기에서 콘텐츠를 선택하기 위해 길게 터치하거나 두 번 탭할 때 나타나는 콤팩트한 가로 목록으로 명령을 표시합니다. 사람들은 뒤쪽 가장자리에 있는 V형 무늬를 탭하여 [빠른 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/context-menus)로 확장할 수 있습니다.
- iPadOS에서 편집 메뉴는 사람들이 해당 메뉴를 표시하는 방식에 따라 다르게 보입니다. 사람들이 터치 상호작용을 사용하여 메뉴를 표시하는 경우 콤팩트한 가로 모양을 사용합니다. 이와 반대로, 사람들이 키보드나 포인팅 장치를 사용하여 편집 메뉴를 표시하면 편집 메뉴가 빠른 메뉴에서 바로 열립니다.
- macOS에서 사람들은 편집 작업을 하는 동안 표시할 수 있는 빠른 메뉴와, 메뉴 막대에서 앱의 [편집 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar#Edit-menu)를 통해 편집 명령에 접근할 수 있습니다.
- visionOS에서 사람들은 표준 [표준 제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#Standard-gestures) 제스처를 사용하여 편집 메뉴를 가로 막대로 열거나, 빠른 메뉴에서 편집 메뉴를 열 수 있습니다.

tvOS 및 watchOS 환경에서는 콘텐츠를 편집하는 것이 드물기 때문에 시스템은 해당 플랫폼에서 편집 메뉴를 제공하지 않습니다.

## 모범 사례

**가급적 시스템 제공 편집 메뉴를 사용하십시오.** 사람들은 시스템 제공 구성요소의 콘텐츠와 동작에 익숙하기 때문에 동일한 명령을 표시하는 사용자 설정 메뉴를 생성하면 중복되어 혼란을 줄 수 있습니다. 표준 편집 메뉴 명령의 목록을 보려면 [UIResponderStandardEditActions](https://developer.apple.com/documentation/uikit/uiresponderstandardeditactions)의 내용을 참조하십시오.

**사람들이 익숙한 시스템 정의 상호작용을 사용하여 편집 메뉴를 표시하도록 하십시오.** 예를 들어, 사람들은 터치 스크린에서 길게 터치하거나, visionOS에서 길게 핀치하거나, 연결된 트랙패드나 키보드로 보조 클릭을 사용하기를 기대합니다. 편집 메뉴를 표시하는 상호작용은 플랫폼에 따라 다를 수 있지만 사람들은 표준 작업을 수행하기 위해 사용자 설정 상호작용을 배워야 하는 것을 선호하지 않습니다.

**현재 상황과 관련된 명령을 제공하고, 적용되지 않는 명령은 제거하거나 흐리게 처리하십시오.** 예를 들어, 선택한 항목이 없는 경우 복사하기 또는 오려두기와 같이 선택이 필요한 옵션을 표시하지 마십시오. 이와 비슷하게, 붙여넣을 항목이 없는 경우 붙여넣기 옵션을 표시하지 마십시오.

**사용자 설정 명령은 시스템에서 제공한 관련 명령 근처에 나열하십시오.** 예를 들어, 사용자 설정 포맷 명령을 제공하는 경우, 포맷 섹션에서 시스템 제공 명령 뒤에 사용자 설정 포맷 명령을 나열하여 사람들이 예상하는 순서를 유지할 수 있습니다. 너무 많은 사용자 설정 명령으로 인해 사람들이 부담을 느끼지 않도록 하십시오.

**적합한 경우, 사람들이 편집할 수 없는 텍스트를 선택하고 복사하도록 하십시오.** 사람들은 이미지 캡션이나 소셜 미디어 상태와 같은 정적 콘텐츠를 메시지, 메모 또는 웹 검색에 붙여넣고 싶어 합니다. 일반적으로 사람들이 콘텐츠 레이블이 아닌 콘텐츠 텍스트를 복사할 수 있도록 하십시오.

**가능할 경우, 실행 취소 및 실행 복귀를 지원하십시오.** 모든 메뉴와 마찬가지로 편집 메뉴는 동작을 수행하기 전에 확인이 필요하지 않기 때문에, 사람들은 실행 취소 및 실행 복귀를 사용하여 이전 상태를 쉽게 복구할 수 있습니다. 지침을 보려면 [실행 취소 및 실행 복귀](https://developer.apple.com/kr/design/human-interface-guidelines/undo-and-redo)의 내용을 참조하십시오.

**일반적으로 편집 메뉴 항목과 동일한 기능을 수행하는 다른 제어기를 구현하지 마십시오.** 사람들은 일반적으로 편집 메뉴에서 익숙한 편집 명령을 선택하거나 표준 키보드 단축키를 사용하기를 기대합니다. 중복된 제어기는 인터페이스 자리를 차지하여 사람들이 아직 보지 못한 동작을 표시할 공간이 줄어들 수 있습니다.

**필요할 경우 다양한 유형의 삭제 명령을 구분하십시오.** 예를 들어, 삭제 메뉴 항목은 Delete 키를 누르는 것과 동일하게 작동하지만, 오려두기 메뉴 항목은 선택한 콘텐츠를 삭제하기 전에 시스템 클립보드에 복사합니다.

## 콘텐츠

**사용자 설정 명령에 대한 짧은 레이블을 생성하십시오.** 명령이 수행하는 동작을 간결하게 설명하는 동사 또는 짧은 동사구를 사용하십시오. 지침을 보려면 [레이블](https://developer.apple.com/kr/design/human-interface-guidelines/labels)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*visionOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS

**편집 메뉴가 두 스타일에서 잘 작동하는지 확인하십시오.** 사람들이 Multi-Touch 제스처를 사용하여 편집 메뉴를 표시하는 경우 시스템은 콤팩트한 가로 스타일을 표시하고, 키보드 또는 포인팅 장치를 사용하여 편집 메뉴를 표시하는 경우 세로 스타일을 표시합니다. 세로 메뉴 레이아웃 사용에 대한 지침을 보려면 [iOS, iPadOS](https://developer.apple.com/kr/design/human-interface-guidelines/menus#iOS-iPadOS)의 내용을 참조하십시오.

**필요할 경우 편집 메뉴의 배치를 조정하십시오.** 사용 가능한 공간에 따라 기본 메뉴 위치는 삽입점이나 선택 항목의 위 또는 아래에 있습니다. 또한 시스템은 대상 콘텐츠를 가리키는 시각적 지표를 표시합니다. 메뉴 또는 포인터의 모양은 변경할 수 없지만 메뉴의 위치는 변경할 수 있습니다. 예를 들어, 메뉴가 중요한 콘텐츠나 인터페이스의 일부를 가리지 않도록 메뉴를 이동해야 할 수 있습니다.

### macOS

macOS 앱의 편집 메뉴에서 항목의 순서에 관해 알아보려면 [편집 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar#Edit-menu)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus)

[빠른 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/context-menus)

[메뉴 막대](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar)

[실행 취소 및 실행 복귀](https://developer.apple.com/kr/design/human-interface-guidelines/undo-and-redo)

#### Developer 문서

[UIEditMenuInteraction](https://developer.apple.com/documentation/uikit/uieditmenuinteraction) — UIKit

[NSMenu](https://developer.apple.com/documentation/appkit/nsmenu) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2022년 9월 14일 | iPadOS에서 두 가지 편집 메뉴 스타일 지원에 대해 추가된 지침. |
