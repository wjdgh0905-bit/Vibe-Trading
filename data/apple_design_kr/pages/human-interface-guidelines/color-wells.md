# 색상 저장소

Source: https://developer.apple.com/kr/design/human-interface-guidelines/color-wells

> 색상 저장소를 통해 텍스트, 모양, 설명서 및 기타 화면상 요소의 색상을 조절할 수 있습니다.

![확장된 버튼에서 아래로 펼쳐지는 스타일화된 색상 선택 팝오버 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-color-well-intro@2x.png)

색상 저장소는 사람들이 탭하거나 클릭하면 색상 선택기를 표시합니다. 이 색상 선택기는 시스템에서 제공된 것이거나 직접 디자인한 사용자 설정 인터페이스일 수 있습니다.

## 모범 사례

**친숙한 환경을 위해 시스템 제공 색상 선택기를 고려하십시오.** 내장 색상 선택기를 사용하면 일관적인 경험을 제공할 수 있으며, 사람들이 어떤 앱에서든 접근할 수 있는 색상 세트를 저장할 수 있습니다. 시스템 제공 색상 선택기는 iOS, iPadOS 및 macOS에서 앱을 개발할 때 친숙한 환경을 제공하는 데 도움이 될 수도 있습니다.

## 플랫폼 고려 사항

*iOS, iPadOS 또는 visionOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 watchOS에서는 지원되지 않습니다.*

### macOS

사람들이 색상 저장소를 클릭하면 활성화되었음을 시각적으로 확인할 수 있도록 하이라이트 효과를 받게 됩니다. 그런 다음 색상을 선택할 수 있는 색상 선택기가 열립니다. 사람들이 선택한 후, 색상 저장소가 업데이트되어 새로운 색상이 표시됩니다.

색상 저장소는 드래그 앤 드롭도 지원하기 때문에 사람들이 한 색상 저장소에서 다른 색상 저장소로 색상을 드래그하거나, 색상 선택기에서 색상 저장소로 색상을 드래그할 수 있습니다.

## 리소스

#### 관련 콘텐츠

[색상](https://developer.apple.com/kr/design/human-interface-guidelines/color)

#### Developer 문서

[UIColorWell](https://developer.apple.com/documentation/uikit/uicolorwell) — UIKit

[UIColorPickerViewController](https://developer.apple.com/documentation/uikit/uicolorpickerviewcontroller) — UIKit

[NSColorWell](https://developer.apple.com/documentation/appkit/nscolorwell) — AppKit

[Color Programming Topics](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/DrawColor/DrawColor.html)
