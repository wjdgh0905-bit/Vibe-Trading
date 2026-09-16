# 토큰 필드

Source: https://developer.apple.com/kr/design/human-interface-guidelines/token-fields

> 토큰 필드는 텍스트를 선택과 조작이 용이한 *토큰*으로 변환할 수 있는 텍스트 필드 유형입니다.

![토큰으로 포맷된 한 사람의 이름이 포함된 텍스트 필드의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-token-field-intro@2x.png)

예를 들어, Mail 작성 윈도우에서는 주소 필드에 토큰 필드를 사용합니다. 사람들이 받는 사람을 입력하면 Mail은 각각의 받는 사람 이름을 나타내는 텍스트를 토큰으로 변환합니다. 사람들은 받는 사람 토큰을 선택하고 이를 드래그하여 재정렬하거나 다른 필드로 이동할 수 있습니다.

사람들이 필드에 텍스트를 입력할 때 제안 목록을 표시하도록 토큰 필드를 구성할 수 있습니다. 예를 들어, Mail은 사람들이 주소 필드에 입력할 때 받는 사람을 제안합니다. 사람들이 제안된 받는 사람을 선택하면 Mail은 받는 사람을 토큰으로 필드에 삽입합니다.

![토큰이 일부 받는 사람을 나타내는 Mail 작성 윈도우의 부분적인 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/token-fields-suggestion@2x.png)

또한 개별 토큰에는 토큰 또는 편집 옵션에 대한 정보를 제공하는 빠른 메뉴가 포함될 수도 있습니다. 예를 들어, Mail의 받는 사람 토큰에는 받는 사람 이름 편집, 받는 사람을 VIP로 표시, 받는 사람의 연락처 카드 보기 등의 명령이 있는 빠른 메뉴가 포함됩니다.

![하나의 받는 사람 토큰이 명령 메뉴를 표시하는 Mail 작성 윈도우의 부분적인 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/token-fields-contextual@2x.png)

토큰은 상황에 따라 검색 용어를 나타낼 수도 있습니다. 지침을 보려면 [검색 필드](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields)의 내용을 참조하십시오.

## 모범 사례

**빠른 메뉴로 값을 추가하십시오.** 사람들은 토큰에 대한 추가 옵션이나 정보가 있는 [빠른 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/context-menus)를 이용하는 경우가 많습니다.

**텍스트를 토큰으로 변환하는 추가 방법을 제공하는 것을 고려하십시오.** 기본적으로 사람들이 입력하는 텍스트는 쉼표가 입력될 때마다 토큰으로 바뀝니다. 또한 이 동작을 호출하는 추가 단축키(예: Return 누르기)를 지정할 수 있습니다.

**제안된 토큰을 표시하기 전에 시스템의 지연을 사용자화하는 것을 고려하십시오.** 기본적으로 제안은 즉시 나타납니다. 하지만 제안이 너무 빠르게 나타나면 사람들이 입력하는 동안 방해가 될 수 있습니다. 앱이 토큰을 제안하는 경우, 편안하게 느낄 수 있도록 지연을 조절하는 것을 고려하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS, visionOS 및 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields)

[검색 필드](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields)

[빠른 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/context-menus)

#### Developer 문서

[NSTokenField](https://developer.apple.com/documentation/appkit/nstokenfield) — AppKit
