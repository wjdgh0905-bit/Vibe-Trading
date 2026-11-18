# 머티리얼

Source: https://developer.apple.com/kr/design/human-interface-guidelines/materials

> 머티리얼은 전면과 배경 요소 사이에 깊이감, 레이어링 및 계층을 만들어내는 시각적 효과입니다.

![정사각형을 덮는 캡슐 모양의 스케치. 배경 콘텐츠 위에 Liquid Glass 머티리얼을 겹쳐 놓은 것을 나타내기 위해 캡슐 아래에 있는 정사각형의 가장자리가 살짝 구부러져 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 노란색을 은은하게 반영하는 노란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/foundations-materials-intro@2x.png)

머티리얼은 텍스트 및 제어기 등의 전면 요소를 콘텐츠 및 단색 등의 배경 요소와 시각적으로 분리하는 데 도움을 줍니다. 머티리얼은 배경에서 전면으로 색상이 투과되도록 함으로써 시각적 계층을 설정하여 사람들이 자신의 위치를 더 쉽게 인지할 수 있도록 돕습니다.

Apple 플랫폼에는 두 가지 유형의 머티리얼이 있는데 Liquid Glass와 표준 머티리얼입니다. [Liquid Glass](https://developer.apple.com/kr/design/human-interface-guidelines/materials#Liquid-Glass)는 Apple 플랫폼 전반에서 디자인 언어를 통합하는 동적인 머티리얼로, 기본 콘텐츠를 가리지 않고도 제어기 및 탐색을 표시할 수 있습니다. Liquid Glass에 비해 [표준 머티리얼](https://developer.apple.com/kr/design/human-interface-guidelines/materials#Standard-materials)은 콘텐츠 레이어 내에서 시각적 구분을 돕는 역할을 합니다.

## Liquid Glass

Liquid Glass는 탭 막대 및 사이드바 같은 제어기 및 탐색 요소를 위한 독특한 기능 레이어를 형성하며, 콘텐츠 레이어 위에 떠 있는 형태로 기능적 요소와 콘텐츠 간에 명확한 시각적 계층을 설정합니다. Liquid Glass는 이러한 요소 아래에서 콘텐츠가 스크롤되고 살짝 비쳐 보이도록 하여 인터페이스에 역동성과 깊이감을 부여하는 동시에 제어기 및 탐색의 가독성을 유지합니다.

**콘텐츠 레이어에서 Liquid Glass를 사용하지 마십시오.** Liquid Glass는 상호작용 요소와 콘텐츠 간의 명확한 구분을 제공할 때 가장 효과적으로 작동하며, 콘텐츠 레이어에 이를 포함하면 불필요한 복잡성과 혼란스러운 시각적 계층을 초래할 수 있습니다. 대신 앱 배경과 같은 콘텐츠 레이어의 요소에는 [표준 머티리얼](https://developer.apple.com/kr/design/human-interface-guidelines/materials#Standard-materials)을 사용하십시오. 콘텐츠 레이어에서 [슬라이더](https://developer.apple.com/kr/design/human-interface-guidelines/sliders) 및 [토글](https://developer.apple.com/kr/design/human-interface-guidelines/toggles)과 같이 일시적인 상호작용 요소가 있는 제어기인 경우는 예외입니다. 이러한 경우, 사람들이 해당 요소를 활성화하면 상호작용을 강조하기 위해 해당 요소에 Liquid Glass 스타일이 적용됩니다.

**Liquid Glass 효과를 절제해서 사용하십시오.** 시스템 프레임워크의 표준 구성요소는 이 머티리얼의 모양과 동작을 자동으로 반영합니다. 사용자 설정 제어기에 Liquid Glass 효과를 적용하는 경우 절제해서 사용하십시오. Liquid Glass는 기본 콘텐츠에 주의를 집중시키는 것이 목적이므로, 여러 사용자 설정 제어기에 이 머티리얼을 과도하게 사용하면 콘텐츠로부터 시선을 분산시켜 사용자 경험을 저하시킬 수 있습니다. 이러한 효과는 앱 내에서 가장 중요한 기능적 요소에만 제한적으로 사용하십시오. 개발자 지침을 보려면 [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)의 내용을 참조하십시오.

**시각적으로 풍부한 배경 위에 나타나는 구성요소에는 투명한 Liquid Glass만 사용하십시오.** Liquid Glass는 사용자 설정 구성요소를 구축하거나 일부 시스템 구성요소의 스타일을 지정할 때 선택할 수 있는 두 가지 변형([regular](https://developer.apple.com/documentation/swiftui/glass/regular) 및 [clear](https://developer.apple.com/documentation/swiftui/glass/clear))을 제공합니다. 이 변형의 모양은 특정 시스템 설정에 반응하여 달라질 수 있습니다(예: 사람들이 기기의 설정에서 Liquid Glass를 선호하는 스타일로 선택하는 경우, 인터페이스에서 투명도를 줄이거나 대비를 증가시키는 손쉬운 사용 설정을 켜는 경우).

*일반* 변형은 배경 콘텐츠를 흐리게 하고 발광도를 조절하여 텍스트와 기타 전경 요소의 가독성을 유지합니다. 스크롤 가장자리 효과는 배경 콘텐츠의 불투명도를 흐리게 하고 줄여 가독성을 더욱 향상합니다. 대부분의 시스템 구성요소는 이 변형을 사용합니다. 배경 콘텐츠로 인해 가독성 문제가 발생할 수 있는 경우 또는 알림, 사이드바나 팝오버와 같은 구성요소에 텍스트가 상당히 많은 경우에는 일반 변형을 사용하십시오.

![어두운 배경 아래 있을 때 더 어둡게 보이는 Liquid Glass 일반 변형의 시각적 예시.](https://developer.apple.com/images/com.apple.HIG/kr/materials-ios-liquid-glass-over-dark@2x.png)

![밝은 배경 아래 있을 때 더 밝게 보이는 Liquid Glass 일반 변형의 시각적 예시.](https://developer.apple.com/images/com.apple.HIG/kr/materials-ios-liquid-glass-over-light@2x.png)

*투명* 변형은 매우 반투명하므로 기본 콘텐츠의 가시성을 우선시하고 시각적으로 풍부한 배경 요소를 눈에 잘 띄는 상태로 유지하기에 이상적입니다. 사진 및 비디오와 같은 미디어 배경 위에 떠 있는 구성요소에 이 변형을 사용하면 더욱 몰입감 있는 콘텐츠 경험을 선사할 수 있습니다.

![Liquid Glass 투명 변형을 사용한 시각적 예시. 이 변형을 통해 아래에 있는 배경의 시각적 세부사항을 볼 수 있음.](https://developer.apple.com/images/com.apple.HIG/kr/materials-ios-liquid-glass-clear@2x.png)

최적의 대비와 가독성을 위해서는 투명한 Liquid Glass가 있는 구성요소 뒤에 디밍 레이어를 추가할지 여부를 결정해야 합니다.

- 기본 콘텐츠가 밝으면 불투명도가 35%인 어두운 디밍 레이어를 추가해 보십시오. 개발자 지침을 보려면 [clear](https://developer.apple.com/documentation/swiftui/glass/clear)의 내용을 참조하십시오.
- 기본 콘텐츠가 충분히 어두운 경우 또는 자체 디밍 레이어를 제공하는 AVKit의 표준 미디어 재생 제어기를 사용하는 경우, 디밍 레이어를 적용할 필요가 없습니다.

색상 사용에 관한 지침은 [Liquid Glass 색상](https://developer.apple.com/kr/design/human-interface-guidelines/color#Liquid-Glass-color)의 내용을 참조하십시오.

## 표준 머티리얼

Liquid Glass 아래의 콘텐츠에 조직적인 느낌을 전달하기 위해 [UIBlurEffect](https://developer.apple.com/documentation/uikit/uiblureffect), [UIVibrancyEffect](https://developer.apple.com/documentation/uikit/uivibrancyeffect) 및 [NSVisualEffectView.BlendingMode](https://developer.apple.com/documentation/appkit/nsvisualeffectview/blendingmode-swift.enum)와 같은 효과 및 표준 머티리얼을 사용하십시오.

**의미론적 의미와 권장 용법에 따라 머티리얼 및 효과를 선택하십시오.** 시스템 설정이 화면 모드와 동작을 변경할 수 있기 때문에 인터페이스에 부여되는 외견상 색상을 기반으로 머티리얼이나 효과를 선택하지 마십시오. 대신 머티리얼 또는 생동감 스타일을 특정 사용 예제와 일치시키십시오.

**머티리얼 상단에 생동감 있는 색상을 사용하여 가독성을 보장하십시오.** 시스템 정의된 생동감 있는 색상을 사용하면 여러 상황에서 너무 어둡거나, 밝거나, 채도가 높거나, 저대비로 보이는 색상에 관해 걱정할 필요가 없습니다. 어떤 머티리얼을 선택해도 상단에 생동감 있는 색상을 사용하는 것이 좋습니다. 지침을 보려면 [시스템 색상](https://developer.apple.com/kr/design/human-interface-guidelines/color#System-colors)의 내용을 참조하십시오.

![반투명 배경 머티리얼 및 기호가 있는 공유 버튼의 일러스트. 기호는 systemGray3 색상으로 되어 있으며 배경 머티리얼과 구별되지 않아 잘 보이지 않음.](https://developer.apple.com/images/com.apple.HIG/kr/materials-legibility-non-vibrant-label@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![반투명 배경 머티리얼 및 기호가 있는 공유 버튼의 일러스트. 기호는 생동감 있는 색상으로 되어 있으며 배경 머티리얼과 구별되어 명확하게 보임.](https://developer.apple.com/images/com.apple.HIG/kr/materials-legibility-primary-label@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**흐림 효과 및 생동감 효과와 결합할 머티리얼을 선택할 때 대비 및 시각적 분리를 고려하십시오.** 예를 들어 다음 내용을 고려하십시오.

- 더 불투명한 두꺼운 머티리얼은 텍스트 및 미세한 특성을 지닌 기타 요소에 대해 더 나은 대비를 제공할 수 있습니다.
- 더 반투명한 얇은 머티리얼은 배경에 있는 콘텐츠의 시각적 미리 알림을 제공하여 사람들이 맥락을 유지하도록 도와줄 수 있습니다.

개발자 지침을 보려면 [Material](https://developer.apple.com/documentation/swiftui/material)의 내용을 참조하십시오.

## 플랫폼 고려 사항

### iOS, iPadOS

iOS 및 iPadOS는 Liquid Glass 외에도 ultraThin, thin, regular(기본), thick의 4가지 표준 머티리얼을 제공하며, 콘텐츠 레이어에서 사용하여 시각적 구별 요소를 생성할 수 있습니다.

![iOS 및 iPadOS의 다채로운 배경 위 ultraThin 머티리얼 일러스트. 머티리얼과 배경이 겹치면 배경 색상의 그라디언트가 확산됩니다.](https://developer.apple.com/images/com.apple.HIG/kr/materials-ios-material-background-ultrathin@2x.png)

![iOS 및 iPadOS의 다채로운 배경 위 thin 머티리얼 일러스트. 머티리얼과 배경이 겹치면 배경 색상의 그라디언트가 확산되며 약간 어두워집니다.](https://developer.apple.com/images/com.apple.HIG/kr/materials-ios-material-background-thin@2x.png)

![iOS 및 iPadOS의 다채로운 배경 위 regular 머티리얼 일러스트. 머티리얼과 배경이 겹치면 배경 색상의 그라디언트가 확산되며 어두워집니다.](https://developer.apple.com/images/com.apple.HIG/kr/materials-ios-material-background-regular@2x.png)

![iOS 및 iPadOS의 다채로운 배경 위 thick 머티리얼 일러스트. 머티리얼과 배경이 겹치면 배경 색상의 그라디언트가 어둡고 차분해집니다.](https://developer.apple.com/images/com.apple.HIG/kr/materials-ios-material-background-thick@2x.png)

또한 iOS 및 iPadOS는 각 머티리얼에 맞게 특별히 디자인된 각 레이블, 채우기 및 분리자의 생동감 있는 색상을 정의합니다. 레이블 및 채우기 모두에는 여러 레벨의 생동감이 있으며, 분리자에는 하나의 레벨이 있습니다. 레벨의 이름은 요소와 배경 간 대비의 상대적인 양을 나타냅니다. 기본 레벨은 가장 높은 대비가 있고 4차색(존재하는 경우)은 가장 낮은 대비가 있습니다.

4차색을 제외하면 모든 머티리얼의 레이블에 다음 생동감 값을 사용할 수 있습니다. 일반적으로, [thin](https://developer.apple.com/documentation/swiftui/material/thin)과 [ultraThin](https://developer.apple.com/documentation/swiftui/material/ultrathin) 머티리얼에서는 대비가 너무 낮기 때문에 4차색을 사용하지 마십시오.

- [UIVibrancyEffectStyle.label](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/label)(기본)
- [UIVibrancyEffectStyle.secondaryLabel](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/secondarylabel)
- [UIVibrancyEffectStyle.tertiaryLabel](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/tertiarylabel)
- [UIVibrancyEffectStyle.quaternaryLabel](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/quaternarylabel)

모든 머티리얼에서 채우기에 대해 다음 생동감 값을 사용할 수 있습니다.

- [UIVibrancyEffectStyle.fill](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/fill)(기본)
- [UIVibrancyEffectStyle.secondaryFill](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/secondaryfill)
- [UIVibrancyEffectStyle.tertiaryFill](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/tertiaryfill)

시스템은 [UIVibrancyEffectStyle.separator](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/separator)(분리자)에 대해 단일한 기본 생동감 값을 제공하며, 모든 머티리얼에서 잘 작동합니다.

### macOS

macOS는 지정 용도가 있는 여러 표준 머티리얼과 모든 [명세](https://developer.apple.com/kr/design/human-interface-guidelines/color#Specifications)의 생동감 있는 버전을 제공합니다. 개발자 지침을 보려면 [NSVisualEffectView.Material](https://developer.apple.com/documentation/appkit/nsvisualeffectview/material-swift.enum)의 내용을 참조하십시오.

**사용자 설정 보기 및 제어기에서 생동감을 언제 허용할지 선택하십시오.** 구성 및 시스템 설정에 따라 시스템 보기 및 제어기는 생동감을 사용하여 전면 콘텐츠를 모든 배경에서 부각합니다. 다양한 상황에서 인터페이스를 테스트하여 언제 생동감이 화면 모드를 향상시키고 커뮤니케이션을 개선하는지 확인하십시오.

**인터페이스 디자인을 보완하는 배경 혼합 모드를 선택하십시오.** macOS는 배경 콘텐츠를 혼합하는 두 개의 모드를 ‘윈도우 뒤’와 ‘윈도우 내’로 정의합니다. 개발자 지침을 보려면 [NSVisualEffectView.BlendingMode](https://developer.apple.com/documentation/appkit/nsvisualeffectview/blendingmode-swift.enum)의 내용을 참조하십시오.

### tvOS

tvOS에서는 Liquid Glass가 상단 및 제어 센터와 같은 탐색 요소와 시스템 환경 전반에 나타납니다. 이미지 보기 및 버튼과 같은 특정 인터페이스 요소는 초점이 잡힐 경우 Liquid Glass가 적용됩니다.

![tvOS에서 실행 중인 Destination Video 앱의 스크린샷. 앱에는 ‘로봇 식물학자의 모험’이라는 제목의 비디오에 대한 세부정보가 표시됨. 배경은 비디오의 한 장면에 나오는 주인공의 다채로운 이미지로 설정됨. 배경 위에 떠 있는 인터페이스 요소에는 Liquid Glass 모양이 채택되어 배경 색상이 비쳐 보이고 더욱 몰입감 있는 미디어 경험을 선사함.](https://developer.apple.com/images/com.apple.HIG/materials-tvos-media-player@2x.png)

Liquid Glass 외에도 tvOS는 콘텐츠 레이어의 구조를 정의할 수 있는 표준 머티리얼을 지속적으로 제공합니다. 표준 머티리얼의 두께에 따라 아래의 콘텐츠가 비쳐 보이는 정도가 달라집니다. 예를 들어, 다음과 같은 방법으로 표준 머티리얼을 사용할 수 있습니다.

| 머티리얼 | 다음 경우에 권장됨 |
| --- | --- |
| [ultraThin](https://developer.apple.com/documentation/swiftui/material/ultrathin) | 밝은 색상 체계가 필요한 전체 화면 보기 |
| [thin](https://developer.apple.com/documentation/swiftui/material/thin) | 부분적으로 화면상의 콘텐츠를 가리고 밝은 색상 체계가 필요한 오버레이 보기 |
| [regular](https://developer.apple.com/documentation/swiftui/material/regular) | 부분적으로 화면상의 콘텐츠를 가리는 오버레이 보기 |
| [thick](https://developer.apple.com/documentation/swiftui/material/thick) | 부분적으로 화면상의 콘텐츠를 가리고 어두운 색상 체계가 필요한 오버레이 보기 |

### visionOS

visionOS에서 윈도우는 일반적으로 *유리*라는 수정할 수 없는 시스템 정의 머티리얼을 사용하며, 이를 통해 주변 환경의 조명, 현재 환경, 가상 콘텐츠 및 대상체가 비치도록 하여 사람들이 현실감을 유지할 수 있습니다. 유리는 배경 색상 정보의 범위를 제한하는 적응형 머티리얼로, 사람들의 물리적 주변 환경 및 기타 가상 콘텐츠에 따라 더 밝아지거나 어두워지는 동안 윈도우가 앱 콘텐츠를 위한 대비를 계속 제공할 수 있습니다.

[video: visionOS에서 음악 앱 윈도우의 녹화 영상. 윈도우가 유리 머티리얼을 사용하며 보는 각도 및 조명이 변경되면서 조정됨.]

> **참고:** visionOS는 별도의 다크 모드 설정이 없습니다. 대신, 유리는 대상체의 휘도 및 그 뒤의 색상에 맞게 자동으로 조정됩니다.

**윈도우에서 불투명 색상보다 가급적 반투명 색상을 사용하십시오.** 불투명한 영역은 사람들의 시야를 차단하여 답답한 느낌이 들게 하고 주변의 가상 및 물리적 대상체에 대한 인식을 감소시킵니다.

![중앙에 윈도우가 있는 visionOS 시야의 일러스트. 윈도우에는 주변을 막는 불투명 배경이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/materials-visionos-opaque-window-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![중앙에 윈도우가 있는 visionOS 시야의 일러스트. 윈도우에는 주변을 통과하게 만드는 반투명 머티리얼 배경이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/materials-visionos-glass-window@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**필요한 경우, 앱에서 시각적 분리를 생성하거나 상호작용을 나타내도록 하는 머티리얼을 선택하십시오.** 사용자 설정 구성요소를 생성할 필요가 있는 경우 이를 위한 시스템 머티리얼을 지정해야 할 수 있습니다. 다음 예시를 지침으로 따르십시오.

- [thin](https://developer.apple.com/documentation/swiftui/material/thin) 머티리얼은 버튼 및 선택한 항목과 같은 상호작용 요소에 관심을 불러일으킵니다.
- [regular](https://developer.apple.com/documentation/swiftui/material/regular) 머티리얼은 사이드바 또는 그룹으로 지정된 표 보기와 같은 앱의 섹션을 시각적으로 분리하도록 할 수 있습니다.
- [thick](https://developer.apple.com/documentation/swiftui/material/thick) 머티리얼을 사용하면 `regular` 배경을 사용하는 영역 위에 있을 때 시각적으로 구별되는 짙은 색의 요소를 만들 수 있습니다.

![중앙에 윈도우가 있는 visionOS 시야의 일러스트. 윈도우 왼쪽에는 사이드바가 있고, 오른쪽에는 상단에 텍스트 필드가 있고 오른쪽 하단 모서리에 버튼이 있는 콘텐츠 영역이 있음. 사이드바는 regular 머티리얼을 사용하고, 텍스트 필드는 thick 머티리얼을, 버튼은 thin 머티리얼을 사용함.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-materials-window-example@2x.png)

전면 콘텐츠가 머티리얼 상단에 표시될 때 읽기 적합한 상태로 유지하기 위해 visionOS는 텍스트, 기호 및 채우기에 생동감을 적용합니다. 생동감은 가상 및 물리적 주변 환경 모두에서 조명 및 색상을 앞으로 끌어당겨서 깊이감을 향상합니다.

visionOS는 텍스트, 기호 및 채우기의 계층을 전달할 수 있도록 세 개의 생동감 값을 정의합니다.

- 표준 텍스트의 경우 [UIVibrancyEffectStyle.label](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/label)을 사용하십시오.
- 각주 및 부제목과 같은 설명 텍스트의 경우 [UIVibrancyEffectStyle.secondaryLabel](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/secondarylabel)을 사용하십시오.
- 비활성화된 요소의 경우, 그리고 텍스트에 높은 가독성이 필요하지 않은 경우에만 [UIVibrancyEffectStyle.tertiaryLabel](https://developer.apple.com/documentation/uikit/uivibrancyeffectstyle/tertiarylabel)을 사용하십시오.

![반투명 배경 머티리얼 및 기호가 있는 공유 버튼의 일러스트. 기호는 생동감 있는 기본 레이블 색상으로 되어 있으며 배경 머티리얼에 대해 매우 높은 대비를 가짐.](https://developer.apple.com/images/com.apple.HIG/kr/materials-visionos-label-vibrant-primary@2x.png)

![반투명 배경 머티리얼 및 기호가 있는 공유 버튼의 일러스트. 기호는 생동감 있는 2차 레이블 색상으로 되어 있으며 배경 머티리얼에 대해 높은 대비를 가짐.](https://developer.apple.com/images/com.apple.HIG/kr/materials-visionos-label-vibrant-secondary@2x.png)

![반투명 배경 머티리얼 및 기호가 있는 공유 버튼의 일러스트. 기호는 생동감 있는 3차 레이블 색상으로 되어 있으며 배경 머티리얼에 대해 부드러운 대비를 가짐.](https://developer.apple.com/images/com.apple.HIG/kr/materials-visionos-label-vibrant-tertiary@2x.png)

### watchOS

**전체 화면 모달 뷰에서 상황을 제공할 머티리얼을 사용하십시오.** 전체 화면 모달 뷰는 watchOS에서 자주 사용되기 때문에 머티리얼 레이어로 제공된 대비를 통해 앱에서 사람들의 위치를 파악하고 다른 콘텐츠로부터 제어기 및 시스템 요소를 구별할 수 있습니다. 기본적으로 제공된 모달 시트의 머티리얼 배경을 제거하거나 대치하지 마십시오.

![watchOS의 모달 뷰 일러스트. 예시 제목, 설명 텍스트, 단일 동작 버튼이 있음. 모달이 반투명 머티리얼로 화면을 완전히 가리며, 버튼에는 생동감 있는 레이블 텍스트와 함께 얇은 머티리얼을 사용함.](https://developer.apple.com/images/com.apple.HIG/kr/watchos-modal-view-material-background@2x.png)

## 리소스

#### 관련 콘텐츠

[색상](https://developer.apple.com/kr/design/human-interface-guidelines/color)

[손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility)

[다크 모드](https://developer.apple.com/kr/design/human-interface-guidelines/dark-mode)

#### Developer 문서

[Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)

[glassEffect(_:in:)](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:)) — SwiftUI

[Material](https://developer.apple.com/documentation/swiftui/material) — SwiftUI

[UIVisualEffectView](https://developer.apple.com/documentation/uikit/uivisualeffectview) — UIKit

[NSVisualEffectView](https://developer.apple.com/documentation/appkit/nsvisualeffectview) — AppKit

#### 비디오

- [Liquid Glass 만나보기](https://developer.apple.com/kr/videos/play/wwdc2025/219) — Liquid Glass는 더욱 역동적이고 표현력 있는 사용자 경험을 제공하면서 Apple 플랫폼 디자인 언어를 통합합니다. Liquid Glass의 설계 원칙을 알아보고, 핵심적인 광학 및 물리적 속성을 탐구하며, 이를 사용하는 위치와 이유를 알아보세요.
- [새로운 디자인 시스템과 더 친숙해지는 법](https://developer.apple.com/kr/videos/play/wwdc2025/356) — 새로운 디자인 시스템을 자세히 확인하여 시각 디자인, 정보 아키텍처 및 핵심 시스템 구성 요소에 대한 주요 변경 사항을 확인하세요. 이 시스템이 인터페이스와 콘텐츠 간의 관계를 재편하여 기기, 화면 크기 및 입력 모드에 걸쳐 동적이고, 조화로우며, 일관성 있는 디자인을 만들도록 지원하는 방법을 알아보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 9월 9일 | Liquid Glass의 지침이 업데이트됨. |
| 2025년 6월 9일 | Liquid Glass의 지침이 추가됨. |
| 2024년 8월 6일 | 플랫폼별 아트워크가 추가됨. |
| 2023년 12월 5일 | 여러 머티리얼 유형에 대한 설명이 업데이트되고 생동감 및 머티리얼 두께와 연관된 용어가 명시됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2023년 6월 5일 | watchOS 앱에서 상황 및 방향을 제공하는 머티리얼 사용에 대해 추가된 지침. |
