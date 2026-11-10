# 가상 키보드

Source: https://developer.apple.com/kr/design/human-interface-guidelines/virtual-keyboards

> 실제 키보드가 없는 기기에서 시스템은 데이터 입력에 사용할 수 있는 다양한 유형의 가상 키보드를 제공합니다.

![디자인 도구의 캔버스처럼 생긴 그리드 위에 숫자 키패드가 스타일화된 모양으로 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-virtual-keyboard-intro@2x.png)

가상 키보드는 현재 작업에 최적화된 특정 키 세트를 제공할 수 있습니다. 예를 들어, 이메일 주소 입력을 지원하는 키보드는 ‘@’ 문자와 마침표 또는 ‘.com’까지 포함할 수 있습니다.  가상 키보드는 키보드 단축키를 지원하지 않습니다.

앱에 적합한 경우, 시스템 제공 키보드를 앱 특정 데이터 입력을 지원하는 사용자 설정 보기로 대치할 수 있습니다.  iOS, iPadOS 및 tvOS에서 설치하고 표준 키보드 대신에 사용할 수 있는 사용자 설정 키보드를 제공하는 앱 확장 프로그램을 생성할 수도 있습니다.

## 모범 사례

**편집 중인 콘텐츠 유형과 일치하는 키보드를 선택하십시오.** 예를 들어, 숫자 및 구두점 키보드를 제공하여 숫자 데이터를 입력하는 사람들을 도울 수 있습니다. 텍스트 입력 영역의 의미를 지정하면 시스템은 예상하는 입력의 유형과 일치하는 키보드를 자동으로 제공하며 이 정보를 사용하여 제공하는 키보드 수정 기능을 개선할 수도 있습니다. 개발자 지침을 보려면 [keyboardType(_:)](https://developer.apple.com/documentation/swiftui/view/keyboardtype(_:))(SwiftUI), [textContentType(_:)](https://developer.apple.com/documentation/swiftui/view/textcontenttype(_:))(SwiftUI), [UIKeyboardType](https://developer.apple.com/documentation/uikit/uikeyboardtype)(UIKit) 및 [UITextContentType](https://developer.apple.com/documentation/uikit/uitextcontenttype)(UIKit)의 내용을 참조하십시오.

**ASCII 사용 가능**

![Shift, Delete, 숫자, Space 및 Return 키 외에 26개의 문자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 키보드 위에는 입력 제안, 아래에는 받아쓰기 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-ascii-capable@2x.png)

**ASCII 사용 가능 숫자 패드**

![Delete 키 외에 10개의 숫자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 2부터 9까지의 숫자 키는 모두 전화의 숫자와 연관된 문자 3~4개를 포함함.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-ascii-capable-number-pad@2x.png)

**소수점 패드**

![Delete 및 마침표 키 외에 10개의 숫자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 2부터 9까지의 숫자 키는 모두 전화의 숫자와 연관된 문자 3~4개를 포함함.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-decimal-pad@2x.png)

**기본**

![Shift, Delete, 숫자, Space 및 Return 키 외에 26개의 문자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 키보드 위에는 입력 제안, 아래에는 이모지 및 받아쓰기 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-default@2x.png)

**이메일 주소**

![Shift, Delete, 숫자, Space, 마침표, 골뱅이 기호 및 Return 키 외에 26개의 문자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 키보드 위에는 입력 제안, 아래에는 이모지 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-email-address@2x.png)

**이름 전화 패드**

![Shift, Delete, 숫자, Space 및 Return 키 외에 26개의 문자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 키보드 위에는 입력 제안, 아래에는 이모지 및 받아쓰기 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-name-phone-pad@2x.png)

**숫자 패드**

![Delete 키 외에 10개의 숫자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 2부터 9까지의 숫자 키는 모두 전화의 숫자와 연관된 문자 3~4개를 포함함.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-number-pad@2x.png)

**숫자 및 구두점**

![보호 구두점 키와 Delete, 문자, Space, Return 키 외에 10개의 숫자 및 15개의 구두점 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 키보드 위에는 입력 제안, 아래에는 받아쓰기 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-numbers-and-punctuation@2x.png)

**전화 패드**

![Delete 키 및 더하기, 별표, 샵 키 외에 10개의 숫자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 2부터 9까지의 숫자 키는 모두 전화의 숫자와 연관된 문자 3~4개를 포함함.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-phone-pad@2x.png)

**Twitter**

![Shift, Delete, 숫자, Space, 골뱅이 기호 및 샵 키 외에 26개의 문자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 키보드 위에는 입력 제안, 아래에는 이모지 및 받아쓰기 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-twitter@2x.png)

**URL**

![Shift, Delete, 숫자, 마침표, 슬래시, .com 및 Return 키 외에 26개의 문자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 키보드 위에는 입력 제안, 아래에는 이모지 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-url@2x.png)

**웹 검색**

![Shift, Delete, 숫자, Space, 마침표 및 이동 키 외에 26개의 문자 키가 모두 표시된 iPhone 키보드의 부분 스크린샷. 키보드 위에는 입력 제안, 아래에는 이모지 및 받아쓰기 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/virtual-keyboard-web-search@2x.png)

**텍스트 입력 경험을 명시한다면 Return 키 유형을 사용자화하십시오.** Return 키 유형은 선택된 키보드 유형을 기반으로 하지만, 앱에 적합한 경우 이 설정을 변경할 수 있습니다. 예를 들어, 앱이 검색을 시작하는 경우, 사람들이 검색을 시작하는 기타 위치와 검색 경험이 일관되도록 표준 유형 대신 검색 Return 키 유형을 사용할 수 있습니다. 개발자 지침을 보려면 [submitLabel(_:)](https://developer.apple.com/documentation/swiftui/view/submitlabel(_:))(SwiftUI) 및 [UIReturnKeyType](https://developer.apple.com/documentation/uikit/uireturnkeytype)(UIKit)의 내용을 참조하십시오.

## 사용자 설정 입력 보기

일부의 경우, 앱에서 데이터 입력 작업을 향상하는 사용자 설정 기능을 제공하도록 *입력 보기*를 생성할 수 있습니다. 예를 들어, Numbers는 스프레드시트를 편집할 때 숫자 값을 입력하면서 사용할 수 있는 사용자 설정 입력 보기를 제공합니다. 사람들이 앱을 사용하는 동안 사용자 설정 입력 보기가 시스템 제공 키보드를 대체합니다. 개발자 지침을 보려면 [ToolbarItemPlacement](https://developer.apple.com/documentation/swiftui/toolbaritemplacement)(SwiftUI) 및 [inputViewController](https://developer.apple.com/documentation/uikit/uiresponder/inputviewcontroller)(UIKit)의 내용을 참조하십시오.

**사용자 설정 입력 보기가 앱의 맥락에 맞는지 확인하십시오.** 데이터 입력을 간단하고 직관적으로 만드는 것 외에도 사용자 설정 입력 보기에 어떤 이점이 있는지 사람들에게 알려야 합니다. 그러지 않으면 앱을 사용하는 동안 왜 시스템 키보드를 다시 사용할 수 없는지 궁금해할 수 있습니다.

**키보드로 입력하는 동안 표준 키보드 사운드를 재생하십시오.** 키보드 사운드는 시스템 키보드의 키를 탭할 때 익숙한 피드백을 제공하기 때문에 사람들은 사용자 설정 입력 보기의 키를 탭할 때도 동일한 사운드를 기대할 가능성이 높습니다. 설정 > 사운드에서 모든 키보드 상호작용의 키보드 사운드를 끌 수 있습니다. 개발자 지침을 보려면 [playInputClick()](https://developer.apple.com/documentation/uikit/uidevice/playinputclick())(UIKit)의 내용을 참조하십시오.

## 사용자 설정 키보드

iOS, iPadOS 및 tvOS에서 앱 확장 프로그램을 생성하여 시스템 키보드를 대체하는 사용자 설정 키보드를 제공할 수 있습니다. *앱 확장 프로그램*은 사람들이 시스템 특정 영역의 기능을 확장하기 위해 설치 및 사용할 수 있도록 제공하는 코드입니다. 자세한 정보는 [App extensions](https://developer.apple.com/app-extensions/)의 내용을 참조하십시오.

설정에서 사용자 설정 키보드를 선택하면 보안 텍스트 필드 및 전화 번호 필드를 편집할 때를 제외하고는 모든 앱 내에서 텍스트를 입력할 때 사용할 수 있습니다. 여러 사용자 설정 키보드를 선택하고 언제든지 키보드 간에 전환할 수 있습니다. 개발자 지침을 보려면 [Creating a custom keyboard](https://developer.apple.com/documentation/uikit/creating-a-custom-keyboard)의 내용을 참조하십시오.

사용자 설정 키보드는 새로운 텍스트 입력 방법이나 시스템에서 지원하지 않는 언어로 입력하는 기능 등 고유한 키보드 기능을 시스템 전체에 적용할 때 사용하기 적합합니다. 해당 앱에서만 사용할 사용자 설정 키보드를 제공하려면 사용자 설정 입력 보기를 대신 생성하십시오.

**키보드 간에 전환할 수 있는 명확하고 간편한 방법을 제공하십시오.** 사람들은 표준 키보드의 지구본 키(여러 개의 키보드를 사용할 수 있을 때 전용 이모지 키를 대체함)를 사용해 다른 키보드로 빠르게 전환할 수 있다는 것을 알고 있으며, 사용자 설정 키보드에서도 이와 비슷한 직관적인 경험을 기대합니다.

**시스템 제공 키보드 기능을 반복하지 마십시오.** 사용자 설정 키보드를 사용하는 경우에도 일부 기기에서 이모지/지구본 키 및 받아쓰기 키는 키보드 아래에 자동으로 나타납니다. 앱은 이러한 키에 영향을 줄 수 없으며 키보드에서 키를 반복하면 혼란을 야기할 수 있습니다.

**앱에서 키보드 튜토리얼을 제공하십시오.** 사람들은 표준 키보드에 익숙하기 때문에 새로운 키보드 사용법을 배우는 데 시간이 걸릴 수 있습니다. 앱에서 사용 지침을 제공하면 이 과정이 더 쉬워집니다. 예를 들어, 키보드를 선택하고, 텍스트 입력 시 활성화하고, 사용하고, 표준 키보드로 다시 전환하는 방법을 알려 줄 수 있습니다. 키보드 자체에 도움말 콘텐츠를 표시하지 마십시오.

## 플랫폼 고려 사항

*macOS에서는 지원되지 않습니다.*

### iOS, iPadOS

**키보드 레이아웃 안내선을 사용하여 키보드가 인터페이스의 일부처럼 느껴지도록 만드십시오.** 레이아웃 안내선을 사용하면 가상 키보드가 화면상에 보이는 동안 인터페이스의 중요한 영역을 표시할 수도 있습니다. 개발자 지침을 보려면 [Adjusting your layout with keyboard layout guide](https://developer.apple.com/documentation/uikit/adjusting-your-layout-with-keyboard-layout-guide)의 내용을 참조하십시오.

![쌓여 있는 2개의 텍스트 필드와 키보드 위의 버튼을 표시한 iPhone의 앱 레이아웃 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/ui-fully-visible@2x.png)

![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![쌓여 있는 2개의 텍스트 필드를 표시한 iPhone의 앱 레이아웃 일러스트. 키보드는 하단 텍스트 필드의 일부를 가림.](https://developer.apple.com/images/com.apple.HIG/kr/text-field-hidden@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![쌓여 있는 2개의 텍스트 필드와 키보드 위의 버튼을 표시한 iPhone의 앱 레이아웃 일러스트. 키보드는 버튼의 일부를 가림.](https://developer.apple.com/images/com.apple.HIG/kr/button-hidden@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**사용자 설정 제어기를 키보드 위에 세심하게 배치하십시오.** 일부 앱은 키보드 위에 사용자 설정 제어기가 포함된 입력 액세서리 보기를 배치하여 작업 중인 데이터와 연관된 앱 특정 기능을 제공합니다. 예를 들어, Numbers는 스프레드시트 데이터에 표준 또는 사용자 설정 계산을 적용할 수 있는 제어기를 표시합니다. 앱이 키보드를 보강하는 사용자 설정 제어기를 제공하는 경우, 현재 작업과 관련되어 있는지 확인하십시오. 앱의 다른 보기가 Liquid Glass를 사용하거나, 보기가 키보드 위에서 동떨어져 보이는 경우, 제어기가 포함된 보기에 Liquid Glass를 적용하여 일관성을 유지하십시오. 표준 도구 막대를 사용하여 제어기를 포함하는 경우, 자동으로 Liquid Glass를 사용합니다. 키보드 레이아웃 안내선 및 표준 패딩을 사용하여 시스템이 예상대로 제어기를 보기 내에 배치하도록 하십시오. 개발자 지침을 보려면 [ToolbarItemPlacement](https://developer.apple.com/documentation/swiftui/toolbaritemplacement)(SwiftUI), [inputAccessoryView](https://developer.apple.com/documentation/uikit/uiresponder/inputaccessoryview)(UIKit) 및 [UIKeyboardLayoutGuide](https://developer.apple.com/documentation/uikit/uikeyboardlayoutguide)(UIKit)의 내용을 참조하십시오.

### tvOS

tvOS는 Siri Remote를 사용하여 텍스트 필드를 선택하면 선형적인 가상 키보드를 표시합니다.

> **참고:** 그리드 키보드 화면은 Siri Remote 외 다른 기기를 사용할 때 표시되며 콘텐츠의 레이아웃은 키보드에 맞게 자동으로 조정됩니다.

숫자 입력 화면을 활성화하면 tvOS는 숫자 전용 키보드를 표시합니다. 지침을 보려면 [숫자 입력 화면](https://developer.apple.com/kr/design/human-interface-guidelines/digit-entry-views)의 내용을 참조하십시오.

### visionOS

visionOS에서 시스템 제공 가상 키보드는 직접 및 간접 제스처를 지원하며 원하는 위치로 옮길 수 있는 개별 윈도우에 표시됩니다. 레이아웃에서 키보드 위치를 고려해야 할 필요가 없습니다.

[video: visionOS에서 가상 키보드로 입력하고 있는 사람을 보여주는 녹화 기록.]

### watchOS

Apple Watch에서 기기 화면이 충분이 큰 경우 텍스트 필드는 키보드를 표시할 수 있습니다. 그렇지 않을 경우, 시스템은 사람들이 받아쓰기 또는 손글씨 입력을 사용하여 정보를 입력하도록 할 수 있습니다. watchOS에서 키보드 유형을 변경할 수는 없지만 텍스트 필드의 콘텐츠 유형을 설정할 수는 있습니다. 시스템은 이 정보를 사용하여 제안을 제공하는 것과 같이 텍스트 입력을 더 쉽게 만듭니다. 개발자 지침을 보려면 [textContentType(_:)](https://developer.apple.com/documentation/swiftui/view/textcontenttype(_:))(SwiftUI)의 내용을 참조하십시오.

사람들은 근처에 있는 페어링된 iPhone을 사용하여 Apple Watch에 텍스트를 입력할 수도 있습니다.

## 리소스

#### 관련 콘텐츠

[데이터 입력하기](https://developer.apple.com/kr/design/human-interface-guidelines/entering-data)

[키보드](https://developer.apple.com/kr/design/human-interface-guidelines/keyboards)

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

#### Developer 문서

[keyboardType(_:)](https://developer.apple.com/documentation/swiftui/view/keyboardtype(_:)) — SwiftUI

[textContentType(_:)](https://developer.apple.com/documentation/swiftui/view/textcontenttype(_:)) — SwiftUI

[UIKeyboardType](https://developer.apple.com/documentation/uikit/uikeyboardtype) — UIKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 키보드 위에 있는 사용자 설정 제어기 표시에 대한 지침이 추가되고, watchOS에서 가상 키보드의 이용 가능 여부를 반영하도록 업데이트됨. |
| 2024년 2월 2일 | visionOS의 직접 및 간섭 제스처에 대한 가상 키보드 지원이 명시됨. |
| 2023년 12월 5일 | visionOS용 아트워크가 추가됨. |
| 2023년 6월 21일 | 페이지 제목을 화면 키보드에서 변경하고 visionOS 지침을 포함하기 위해 업데이트됨. |
