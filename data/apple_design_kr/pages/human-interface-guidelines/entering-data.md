# 데이터 입력하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/entering-data

> 사람들로부터 정보를 받아야 할 경우, 사람들이 실수하지 않고 쉽게 정보를 제공할 수 있도록 디자인하십시오.

![필드에서 작성 중인 모습의 연필 스케치가 데이터 입력을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-entering-data-intro@2x.png)

정보 입력은 사람들이 사용하는 상호작용 방식과는 상관없이 지루한 과정이 될 수 있습니다. 다음과 같은 방법으로 경험을 향상하십시오.

- 사람들이 제공해야 하는 데이터의 양이 최소화되도록 가능한 한 많은 정보를 사전에 수집하기
- 사람들이 자신이 원하는 입력 방식을 선택할 수 있도록 사용 가능한 모든 입력 방식 지원하기

## 모범 사례

**가능하면 시스템에서 정보를 가져오십시오.** 설정의 항목처럼 자동으로 가져올 수 있는 정보 또는 위치나 캘린더 정보처럼 사람들의 허락을 받아 가져올 수 있는 정보를 입력하도록 요청하지 마십시오.

**필요한 데이터를 명확하게 표현하십시오.** 예를 들어, 텍스트 필드에 ‘username@company.com’과 같이 프롬프트를 표시하거나 ‘이메일’과 같이 정보를 설명하는 안내 레이블을 제공할 수 있습니다. 또한 적절한 기본 값으로 필드를 미리 완성하여 의사 결정 과정을 최소화하고 데이터 입력 속도를 높일 수 있습니다.

**필요할 경우 보안 텍스트 입력 필드를 사용하십시오.** 앱 또는 게임에서 민감한 데이터가 필요하다면 사람들이 입력할 때 입력한 내용을 가리는 필드(주로 각 문자를 작은 단색 원으로 대신 표시)를 사용하십시오. 개발자 지침을 보려면 [SecureField](https://developer.apple.com/documentation/swiftui/securefield)의 내용을 참조하십시오. 또한 tvOS에서 [숫자 입력 화면](https://developer.apple.com/kr/design/human-interface-guidelines/digit-entry-views)을 구성하여 사람들이 입력하는 숫자를 가릴 수 있습니다. 개발자 지침을 보려면 [isSecureDigitEntry](https://developer.apple.com/documentation/tvuikit/tvdigitentryviewcontroller/issecuredigitentry)의 내용을 참조하십시오. visionOS에서 시스템 제공 텍스트 필드를 사용하는 경우에는 시스템이 입력된 데이터를 착용자에게 표시하지만 다른 사람에게는 표시하지 않습니다. 예를 들어, 사람들이 AirPlay를 사용하여 콘텐츠를 스트리밍할 때 보안 텍스트 필드는 자동으로 흐리게 표시됩니다.

**절대로 암호 필드를 미리 채우지 마십시오.** 항상 사람들에게 암호를 입력하도록 요청하거나 생체 인증 또는 키체인 인증을 사용하십시오. 지침을 보려면 [계정 관리하기](https://developer.apple.com/kr/design/human-interface-guidelines/managing-accounts)의 내용을 참조하십시오.

**가능할 경우, 텍스트 입력을 요구하는 대신 선택 항목을 제공하십시오.** 키보드를 손쉽게 사용할 수 있더라도, 대개의 경우 정보를 입력하는 것보다는 옵션 목록에서 항목을 선택하는 것이 더 쉽고 효율적입니다. 적합한 경우, 선택기, 메뉴 또는 기타 선택 구성요소를 사용하여 사람들이 정보를 전달할 수 있는 쉬운 방법을 제공하는 것을 고려하십시오.

**가능한 한, 사람들이 드래그 앤 드롭 또는 붙여넣기를 통해 데이터를 제공할 수 있도록 하십시오.** 이러한 상호작용을 지원하면 데이터 입력에 대한 부담을 줄이고, 시스템의 다른 부분과 더욱 통합된 경험을 제공할 수 있습니다.

**필드 값을 동적으로 확인하십시오.** 긴 양식을 모두 채워 넣었는데 실수가 있어 다시 돌아가야 한다면 사람들은 불만을 느낄 수 있습니다. 값이 입력될 때 곧바로 값을 확인하고 문제가 감지되자마자 피드백을 제공하면 사람들이 오류를 바로 수정할 수 있습니다. 특히 숫자 데이터를 입력하는 경우, 숫자 형식자를 사용하는 것을 고려하십시오. 숫자 형식자는 숫자 값만 허용하도록 텍스트 필드를 자동으로 구성합니다. 또한 형식자를 구성하여 소수점 자리, 백분율 또는 통화와 같이 특정 방식으로 값을 표시할 수 있습니다.

**데이터 입력이 필요할 경우, 계속 진행하려면 필요한 데이터를 제공해야 한다는 사실을 사람들이 이해할 수 있도록 하십시오.** 예를 들어, 텍스트 필드 세트 다음에 ‘다음’ 또는 ‘계속’ 버튼을 포함하는 경우 사람들이 필요한 데이터를 입력한 후에만 버튼을 사용할 수 있도록 하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### macOS

**필드에서 잘린 텍스트의 전체 내용을 표시하도록 확장 툴팁을 사용하는 것을 고려하십시오.** *확장 툴팁*은 일반적인 툴팁처럼 동작하며 포인터가 필드 위에 있을 때 나타납니다. macOS에서 실행되는 앱(Mac에서 실행되는 iOS 및 iPadOS 앱 포함)은 텍스트 필드가 너무 작을 경우 확장 툴팁을 통해 전체 입력 데이터를 표시할 수 있습니다. 지침을 보려면 [macOS, visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/offering-help#macOS-visionOS)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields)

[가상 키보드](https://developer.apple.com/kr/design/human-interface-guidelines/virtual-keyboards)

[키보드](https://developer.apple.com/kr/design/human-interface-guidelines/keyboards)

#### Developer 문서

[Input events](https://developer.apple.com/documentation/swiftui/input-events) — SwiftUI

#### 비디오

- [UIKit의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2021/10059) — UIKit의 최신 업데이트 및 개선 사항을 살펴보고 더 나은 iPadOS, iOS 및 Mac Catalyst 앱을 구축하는 방법을 알아보세요. UI 개선 사항, 생산성 업데이트 및 API 개선 사항을 안내하고 성능 향상과 보안 및 개인정보 보호 기능도 다룹니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
