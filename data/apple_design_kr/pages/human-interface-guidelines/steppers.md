# 스텝퍼

Source: https://developer.apple.com/kr/design/human-interface-guidelines/steppers

> 스텝퍼는 증분 값의 증가 및 감소에 사용하는 두 개로 구분된 제어기입니다.

![스텝퍼 제어기의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-stepper-intro@2x.png)

스텝퍼는 그 자체가 값을 표시하지 않기 때문에 현재 값을 표시하는 필드 옆에 위치합니다.

## 모범 사례

**스텝퍼가 영향을 주는 값을 명확하게 표시하십시오.** 스텝퍼 그 자체는 값을 표시하지 않으므로 사람들이 스텝퍼를 사용할 때 어떤 값을 변경하고 있는지 알 수 있게 하십시오.

**값의 변경 폭이 클 것으로 예상되는 경우 스텝퍼와 텍스트 필드를 한 쌍으로 사용하는 것을 고려하십시오.** 몇 번의 탭 또는 클릭으로 지정 가능한 작은 변경은 스텝퍼만으로 적합합니다. 이와 반대로, 특히 사용하려는 값의 편차가 심할 경우 사람들은 특정 값을 입력할 수 있는 필드를 사용하고 싶어 합니다. 예를 들어, 프린트 화면에 매 수를 설정하는 스텝퍼와 텍스트 필드를 모두 사용할 수 있습니다.

## 플랫폼 고려 사항

*iOS, iPadOS 또는 visionOS에 대한 추가 고려 사항은 없습니다. watchOS 또는 tvOS에서는 지원되지 않습니다.*

### macOS

**값의 범위가 큰 경우, 값을 빠르게 변경할 수 있도록 Shift-클릭을 지원하는 것을 고려하십시오.** 앱에서 스텝퍼의 값을 큰 단위로 변경하는 것이 도움이 된다면 스텝퍼를 Shift-클릭하여 기본 증가보다 크게 값을 변경(예를 들어, 기본의 10배)하도록 지원할 수 있습니다.

## 리소스

#### 관련 콘텐츠

[선택기](https://developer.apple.com/kr/design/human-interface-guidelines/pickers)

[텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields)

#### Developer 문서

[UIStepper](https://developer.apple.com/documentation/uikit/uistepper) — UIKit

[NSStepper](https://developer.apple.com/documentation/appkit/nsstepper) — AppKit
