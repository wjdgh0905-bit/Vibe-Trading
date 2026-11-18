# 상자

Source: https://developer.apple.com/kr/design/human-interface-guidelines/boxes

> 상자는 논리적으로 관련된 정보 및 구성요소가 시각적으로 구별된 그룹을 생성합니다.

![모서리가 둥근 직사각형 내에 스타일화된 인터페이스 요소 그룹 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-box-intro@2x.png)

기본적으로 상자는 눈에 보이는 테두리 또는 배경 색상을 사용하여 콘텐츠를 인터페이스의 나머지 부분과 분리합니다. 상자에는 제목도 포함될 수 있습니다.

## 모범 사례

**포함하는 보기와 비교하여 가급적 상자를 상대적으로 작게 유지하십시오.** 상자의 크기가 포함하는 윈도우 또는 화면의 크기와 가까워지면 그룹화된 콘텐츠를 분리하여 전달하는 효과가 감소하고 다른 콘텐츠의 자리를 차지할 수 있습니다.

**상자 내에 추가 그룹화를 전달하기 위해 패딩 및 정렬을 사용하는 것을 고려하십시오.** 상자의 테두리는 구별된 시각적 요소이며, 하위 그룹을 정의하기 위해 중첩된 상자를 추가하면 인터페이스가 너무 복잡하고 답답하게 느껴질 수 있습니다.

## 콘텐츠

**상자의 콘텐츠를 명확히 하는 데 도움이 되는 경우 간결한 소개 제목을 제공하십시오.** 상자 보기로 사람들은 포함된 콘텐츠의 연관성을 이해할 수는 있지만 연관성에 대한 더 자세한 정보를 제공하는 것이 적합할 수 있습니다. 또한 제목은 VoiceOver 사용자가 상자 안에 있는 콘텐츠를 예측하는 데 도움이 될 수 있습니다.

**제목이 필요한 경우 콘텐츠를 설명하는 짧은 문구를 작성하십시오.** 문장식 대문자 표기법을 사용하십시오. 설정 패널에서 상자를 사용하지 않는 한 마침표를 사용하지 마십시오. 이 경우 제목 뒤에 콜론을 추가합니다.

## 플랫폼 고려 사항

*visionOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS

기본적으로 iOS 및 iPadOS는 상자에서 2차 및 3차 배경 [색상](https://developer.apple.com/kr/design/human-interface-guidelines/color)을 사용합니다.

### macOS

기본적으로 macOS는 위에 상자의 제목을 표시합니다.

## 리소스

#### 관련 콘텐츠

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

#### Developer 문서

[GroupBox](https://developer.apple.com/documentation/swiftui/groupbox) — SwiftUI

[NSBox](https://developer.apple.com/documentation/appkit/nsbox) — AppKit
