# 텍스트 필드

Source: https://developer.apple.com/kr/design/human-interface-guidelines/text-fields

> 텍스트 필드는 소량의 특정 텍스트를 입력하거나 편집하는 데 사용하는 직사각형 영역입니다.

![값을 포함하고 있는 텍스트 필드의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-text-field-intro@2x.png)

## 모범 사례

**이름 또는 이메일 주소와 같은 소량의 정보를 요청하는 데 텍스트 필드를 사용하십시오.** 대량의 텍스트를 입력하는 경우 [텍스트 보기](https://developer.apple.com/kr/design/human-interface-guidelines/text-views)를 대신 사용하십시오.

**목적을 설명하도록 텍스트 필드에 힌트를 표시하십시오.** 텍스트 필드는 필드에 다른 텍스트가 없을 경우 ‘이메일’ 또는 ‘암호’와 같은 위치 지정자 텍스트를 포함할 수 있습니다. 위치 지정자 텍스트는 입력을 시작하면 사라지므로 목적을 확인할 수 있도록 필드를 설명하는 별도의 레이블을 포함하는 것이 도움이 될 수 있습니다.

**보안 텍스트 필드를 사용하여 개인정보 데이터를 가리십시오.** 앱에서 암호와 같은 민감한 데이터를 요청하는 경우 항상 보안 텍스트 필드를 사용하십시오. 개발자 지침을 보려면 [SecureField](https://developer.apple.com/documentation/swiftui/securefield)의 내용을 참조하십시오.

**텍스트 필드의 크기가 예상되는 텍스트 양과 최대한 일치되도록 하십시오.** 사람들은 텍스트 필드의 크기를 통해 제공할 정보의 양을 시각적으로 가늠할 수 있습니다.

**여러 텍스트 필드 사이의 공간을 균등하게 하십시오.** 레이아웃에 여러 텍스트 필드가 포함된 경우, 각각의 소개 레이블이 어떤 입력 필드에 해당하는지 쉽게 알아볼 수 있도록 텍스트 필드 간에 충분한 공간을 두십시오. 가능할 경우 여러 텍스트 필드를 수직으로 쌓고, 더욱 정돈된 레이아웃이 되도록 일관된 너비를 사용하십시오. 예를 들어, 주소 양식의 이름 및 성 필드는 동일한 너비이고 주소 및 시 필드는 다른 너비일 수 있습니다.

**사람들이 예상하는 흐름대로 여러 필드 간에 전환되도록 하십시오.** 필드 간에 전환하는 경우, 논리적 순서에 따라 초점을 이동하십시오. 이러한 결과를 달성하기 위해 시스템이 자동으로 처리를 하므로 너무 자주 사용자화할 필요는 없습니다.

**적합한 경우, 필드의 유효성을 확인하십시오.** 예를 들어, 필드에 적절한 값이 숫자라면 숫자가 아닌 문자를 입력한 경우 앱에서 경고해야 합니다. 데이터를 확인할 적당한 시기는 상황에 따라 다릅니다. 이메일 주소를 입력하는 경우에는 다른 필드로 전환할 때 유효성을 확인하는 것이 가장 좋고, 사용자 이름 또는 암호를 생성하는 경우에는 다른 필드로 전환하기 전에 유효성을 확인해야 합니다.

**숫자 데이터 처리를 위해 숫자 형식자를 사용하십시오.** 숫자 형식자는 숫자 값만 허용하도록 텍스트 필드를 자동으로 구성합니다. 또한 소수점 자리, 백분율 또는 통화와 같이 특정 방식으로 값을 표시할 수 있습니다. 하지만 지역에 따라 포맷이 크게 달라질 수 있으므로 실제 표시되는 데이터를 추측하지 마십시오.

![쌓여 있는 두 개의 텍스트 필드의 부분적 스크린샷. 상단 필드는 소수점 네 자리까지 있는 숫자를 포함하고 있음. 하단 필드는 통화 값을 포함하고 있음.](https://developer.apple.com/images/com.apple.HIG/kr/text-fields-formatted-text@2x.png)

**필드의 필요에 따라 줄바꿈을 조절하십시오.** 기본적으로 시스템은 텍스트 필드 경계를 넘어가는 텍스트를 클리핑합니다. 또는 텍스트 필드를 설정하여 문자 또는 단어 수준에서 텍스트가 새로 줄바꿈되도록 하거나 처음, 중간 또는 끝 부분에서 잘리도록(생략 부호 표시) 할 수 있습니다.

![전체가 표시되지 않고 잘린 문장이 포함되어 있는 텍스트 필드의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/text-fields-clipped-text@2x.png)

![두 줄로 줄바꿈된 문장이 포함되어 있는 텍스트 필드의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/text-fields-wrapped-text@2x.png)

![마지막 몇 단어 대신 생략 부호가 표시된 문장이 포함되어 있는 텍스트 필드의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/text-fields-truncated-text@2x.png)

**클리핑되거나 잘린 텍스트의 전체 내용을 표시하도록 확장 툴팁을 사용하는 것을 고려하십시오.** 확장 툴팁은 일반적인 [macOS, visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/offering-help#macOS-visionOS)처럼 동작하며 포인터가 필드 위에 있을 때 나타납니다.

**iOS, iPadOS, tvOS 및 visionOS 앱에서 적절한 키보드 유형을 표시하십시오.** 숫자 또는 URL 등 다양한 입력 유형에 맞게 각각 디자인된 여러 가지 키보드 유형을 사용할 수 있습니다. 간결한 데이터 입력을 위해 사람들이 입력하는 콘텐츠 유형에 적합한 키보드를 표시하십시오. 지침을 보려면 [가상 키보드](https://developer.apple.com/kr/design/human-interface-guidelines/virtual-keyboards)의 내용을 참조하십시오.

**tvOS 및 watchOS 앱에서 텍스트 입력을 최소화하십시오.** Apple TV 및 Apple Watch에서 장문의 텍스트를 입력하거나 수많은 텍스트 필드를 채우는 일은 시간을 많이 소모합니다. 텍스트 입력을 최소화하고, 버튼 등을 사용하여 정보를 더욱 효율적으로 수집하는 방법을 찾으십시오.

## 플랫폼 고려 사항

*tvOS 또는 visionOS에 대한 추가 고려 사항은 없습니다.*

### iOS, iPadOS

**입력한 내용을 지울 수 있도록 텍스트 필드 뒤쪽에 지우기 버튼을 표시하십시오.** 이 요소가 있을 경우, Delete 키를 계속 탭하는 대신 해당 요소를 탭하여 텍스트 필드의 콘텐츠를 지울 수 있습니다.

**텍스트 필드에서 이미지 및 버튼을 사용하여 명확성을 높이고 기능을 제공하십시오.** 텍스트 필드의 양쪽 끝에 사용자 설정 이미지를 표시하거나, 북마크 버튼과 같은 시스템 제공 버튼을 추가할 수 있습니다. 일반적으로 텍스트 필드의 앞쪽은 필드의 목적을 나타내는 데 사용하고, 뒤쪽은 북마크와 같은 추가 기능을 제공하는 데 사용합니다.

### macOS

**텍스트 입력과 선택 항목 목록을 함께 사용하려는 경우 콤보 상자를 사용하는 것을 고려하십시오.** 관련된 지침을 보려면 [콤보 상자](https://developer.apple.com/kr/design/human-interface-guidelines/combo-boxes)의 내용을 참조하십시오.

### watchOS

**필요한 경우에만 텍스트 필드를 표시하십시오.** 가능하다면 텍스트 입력을 요구하는 대신 옵션 목록을 표시하십시오.

## 리소스

#### 관련 콘텐츠

[텍스트 보기](https://developer.apple.com/kr/design/human-interface-guidelines/text-views)

[콤보 상자](https://developer.apple.com/kr/design/human-interface-guidelines/combo-boxes)

[데이터 입력하기](https://developer.apple.com/kr/design/human-interface-guidelines/entering-data)

#### Developer 문서

[TextField](https://developer.apple.com/documentation/swiftui/textfield) — SwiftUI

[SecureField](https://developer.apple.com/documentation/swiftui/securefield) — SwiftUI

[UITextField](https://developer.apple.com/documentation/uikit/uitextfield) — UIKit

[NSTextField](https://developer.apple.com/documentation/appkit/nstextfield) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 5일 | watchOS 10의 변경 사항을 반영하기 위해 지침이 업데이트됨. |
