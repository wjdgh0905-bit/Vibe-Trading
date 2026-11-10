# 펼침 제어기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/disclosure-controls

> 펼침 제어기는 특정 제어기 또는 보기와 관련된 정보 및 기능을 표시하거나 가립니다.

![축소 및 확장된 펼침 버튼의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-disclosure-control-intro@2x.png)

## 모범 사례

**펼침 제어기를 사용하여 관련성이 있기 전에는 세부사항을 가리십시오.** 사람들이 사용할 가능성이 가장 높은 제어기를 펼침 계층의 상단에 배치하여 항상 표시되도록 하며, 기본적으로 고급 기능은 가려집니다. 이 구성을 사용하면 사람들이 너무 많은 세부 옵션으로 인해 부담을 느끼지 않고 가장 중요한 정보를 빠르게 찾을 수 있도록 도와줍니다.

## 펼침 삼각형

펼침 삼각형은 보기 또는 항목 목록과 관련된 정보 및 기능을 표시하거나 가립니다. 예를 들어, Keynote는 프레젠테이션을 내보낼 때 펼침 삼각형을 사용하여 고급 옵션을 표시하고, Finder는 목록 보기에서 폴더 구조를 탐색할 때 펼침 삼각형을 사용하여 계층을 점진적으로 표시합니다.

**축소됨**

![Finder 목록 보기에 있는 세 개의 폴더 일러스트. 폴더가 축소되어 있으며 앞쪽 가장자리에는 안쪽을 가리키는 펼침 삼각형이 있어 폴더를 확장하면 콘텐츠를 볼 수 있음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/disclosure-triangle-before@2x.png)

**확장됨**

![Finder 목록 보기에 있는 세 개의 폴더 일러스트. 첫 번째 폴더와 세 번째 폴더가 축소되어 있으며 앞쪽 가장자리에는 안쪽을 가리키는 펼침 삼각형이 있어 폴더를 확장하면 콘텐츠를 볼 수 있음을 나타냄. 두 번째 폴더는 확장되어 있으며 아래쪽을 가리키는 펼침 삼각형이 있고 내부에 있는 세 개의 하위 폴더가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/disclosure-triangle-after@2x.png)

펼침 삼각형은 콘텐츠가 가려져 있을 때 앞쪽 가장자리에서 안쪽을 가리키고, 콘텐츠가 표시될 때 아래쪽을 가리킵니다. 펼침 삼각형을 클릭하거나 탭하면 이 두 상태 간에 전환되며, 보기가 콘텐츠에 맞게 확장되거나 축소됩니다.

**펼침 삼각형을 사용할 때 설명 레이블을 제공하십시오.** 레이블에 표시되거나 가려진 내용(예: ‘고급 옵션’)이 나타나는지 확인하십시오.

개발자 지침을 보려면 [NSButton.BezelStyle.disclosure](https://developer.apple.com/documentation/appkit/nsbutton/bezelstyle-swift.enum/disclosure)의 내용을 참조하십시오.

## 펼침 버튼

펼침 버튼은 특정 제어기와 관련된 기능을 표시하거나 가립니다. 예를 들어, macOS 저장 시트에는 ‘별도 저장’ 텍스트 필드 옆에 펼침 버튼이 표시됩니다. 사람들이 이 버튼을 클릭하거나 탭하면 저장 대화상자가 확장되어 문서의 출력 위치를 선택할 수 있는 고급 탐색 옵션이 제공됩니다.

펼침 버튼은 콘텐츠가 가려져 있을 때 아래쪽을 가리키고, 콘텐츠가 표시될 때 위쪽을 가리킵니다. 펼침 버튼을 클릭하거나 탭하면 이 두 상태 간에 전환되며, 보기가 콘텐츠에 맞게 확장되거나 축소됩니다.

**축소됨**

![macOS의 축소된 저장 대화상자 스크린샷. 대화상자에는 추가 옵션을 표시하기 위해 대화상자를 확장할 수 있는 축소된 펼침 버튼이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/disclosure-button-before@2x.png)

**확장됨**

![macOS의 확장된 저장 대화상자 스크린샷. 대화상자에는 일부 옵션을 가리기 위해 대화상자를 축소할 수 있는 확장된 펼침 버튼이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/disclosure-button-after@2x.png)

**표시하거나 가리는 콘텐츠 근처에 펼침 버튼을 배치하십시오.** 사람이 버튼을 클릭하거나 탭할 때 나타나는 확장된 선택 항목과 제어기 간의 명확한 관계를 설정하십시오.

**단일 보기에서는 펼침 버튼을 한 개만 사용하십시오.** 펼침 버튼이 여러 개 있으면 더 복잡해지고 혼란스러울 수 있습니다.

개발자 지침을 보려면 [NSButton.BezelStyle.pushDisclosure](https://developer.apple.com/documentation/appkit/nsbutton/bezelstyle-swift.enum/pushdisclosure)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*macOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS, visionOS

펼침 제어기는 SwiftUI [DisclosureGroup](https://developer.apple.com/documentation/swiftui/disclosuregroup) 보기를 통해 iOS, iPadOS 및 visionOS에서 사용할 수 있습니다.

## 리소스

#### 관련 콘텐츠

[개요 보기](https://developer.apple.com/kr/design/human-interface-guidelines/outline-views)

[목록 및 표](https://developer.apple.com/kr/design/human-interface-guidelines/lists-and-tables)

[버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons)

#### Developer 문서

[DisclosureGroup](https://developer.apple.com/documentation/swiftui/disclosuregroup) — SwiftUI

[NSButton.BezelStyle.disclosure](https://developer.apple.com/documentation/appkit/nsbutton/bezelstyle-swift.enum/disclosure) — AppKit

[NSButton.BezelStyle.pushDisclosure](https://developer.apple.com/documentation/appkit/nsbutton/bezelstyle-swift.enum/pushdisclosure) — AppKit

#### 비디오

- [SwiftUI의 스택, 그리드 및 윤곽선](https://developer.apple.com/kr/videos/play/wwdc2020/10031) — 개선된 스택과 새로운 목록 및 윤곽선 보기로 SwiftUI 앱에서 더 빠르고 효율적으로 세부 데이터를 표시할 수 있습니다. 이제 iOS와 iPadOS에 처음 도입되는 윤곽선은 스택 및 목록과 함께 작동하는 계층적 데이터를 표현하는 새로운 멀티 플랫폼 도구입니다. SwiftUI의 새롭고 향상된 도구를 사용하여 표 보기를 사용할 때 화면에 더 많은 내용을 표시하고, 부드럽게 스크롤되는 반응형 스택을 만들고, vStack에 어울리지 않는 내용을 위한 목록 보기를 구축하는 방법을 알아보세요. 새로운 그리드 보기와 공개 그룹으로 더 다양한 레이아웃 옵션을 제공할 수 있습니다. 이 비디오를 최대한 활용하려면 먼저 2020년에 새로워진 SwiftUI의 모든 기능을 소개하는 ‘SwiftUI 앱 기초’를 확인하시는 것이 좋습니다. SwiftUI로 처음 코딩하시는 경우 2019년의 ‘SwiftUI 기초’ 강연을 시청하시는 것도 좋습니다.
