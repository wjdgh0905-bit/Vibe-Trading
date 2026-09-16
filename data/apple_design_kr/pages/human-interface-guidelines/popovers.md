# 팝오버

Source: https://developer.apple.com/kr/design/human-interface-guidelines/popovers

> 팝오버는 사용자가 제어기 또는 상호작용 영역을 클릭하거나 탭할 때 다른 콘텐츠 위에 표시되는 일시적인 보기입니다.

![스타일화된 팝오버 보기. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-popover-intro@2x.png)

## 모범 사례

**팝오버를 사용하여 소량의 정보 또는 기능을 공개하십시오.** 팝오버는 사람들이 상호작용하면 사라지기 때문에 팝오버의 기능은 일부 관련 작업으로 한정됩니다. 예를 들어, 캘린더 이벤트 팝오버를 사용하면 이벤트의 날짜 또는 시간을 쉽게 바꾸거나 다른 캘린더로 이동할 수 있습니다. 항목을 변경하면 팝오버가 사라져서 사람들은 계속 캘린더에서 이벤트를 검토할 수 있습니다.

**콘텐츠를 위한 공간이 더 필요하다면 팝오버를 사용하십시오.** 사이드바 및 패널과 같은 보기는 많은 공간을 차지합니다. 일시적인 콘텐츠가 필요하면 팝오버에 표시해서 인터페이스를 간소화할 수 있습니다.

**팝오버를 적절하게 배치하십시오.** 팝오버의 화살표가 공개한 요소를 최대한 직접 가리키게 만들어야 합니다. 팝오버로 공개한 요소나 사람들이 사용하는 동안 봐야 하는 필수 콘텐츠를 가리지 않는 것이 가장 좋습니다.

**확인과 지침 제시용으로만 닫기 버튼을 사용하십시오.** 취소 또는 완료 등 닫기 버튼은 변경 사항을 저장하기 또는 저장하지 않고 나가기처럼 명확한 정보를 제공하는 경우에만 포함하는 것이 좋습니다. 그렇지 않을 경우, 팝오버는 테두리 밖을 클릭 또는 탭하거나 팝오버에서 항목을 선택할 때 닫히는 게 일반적입니다. 여러 항목을 선택할 수 있다면 사람들이 명시적으로 해제하거나 테두리 밖을 클릭 또는 탭하기 전까지 팝오버가 계속 열려 있어야 합니다.

**비모달 팝오버를 자동으로 닫을 때 항상 작업을 저장하십시오.** 사람들은 실수로 테두리 밖을 클릭하거나 탭하여 비모달 팝오버를 해제할 수 있습니다. 명시적인 취소 버튼을 클릭 또는 탭하는 경우에만 작업을 삭제하십시오.

**팝오버를 한 번에 한 개씩 표시하십시오.** 여러 개의 팝오버를 표시하면 인터페이스가 난잡해 보이고 혼란을 야기합니다. 하나의 팝오버가 다른 팝오버에서 나타나는 팝오버의 캐스케이드 또는 계층을 표시하지 마십시오. 새로운 팝오버를 표시하려면 열려 있는 팝오버를 먼저 닫으십시오.

**팝오버 위에 다른 보기를 표시하지 마십시오.** 팝오버 위에 경고를 제외하고는 아무것도 표시되지 않도록 하십시오.

**가능하다면 한 번의 클릭 또는 탭으로 하나의 팝오버를 닫고 다른 팝오버를 열 수 있게 하십시오.** 다양한 막대 버튼으로 팝오버를 각각 열 수 있는 경우, 추가 제스처를 사용하지 않는 것이 특히 좋습니다.

**팝오버를 너무 크게 만들지 마십시오.** 팝오버의 콘텐츠와 팝오버가 나타난 위치를 표시할 수 있을 정도로만 팝오버의 크기를 조정하십시오. 필요한 경우, 팝오버가 인터페이스에 잘 맞도록 시스템이 팝오버의 크기를 조절할 수 있습니다.

**팝오버의 크기를 변경할 때 부드럽게 전환할 수 있게 하십시오.** 일부 팝오버는 동일한 정보의 축소된 보기 및 확장된 보기를 제공합니다. 팝오버의 크기를 조절하는 경우, 새로운 팝오버가 기존 팝오버를 대치했다는 인상을 주지 않으려면 변경 사항에 애니메이션을 적용하십시오.

**도움말 문서에서 *팝오버*라는 단어를 사용하지 마십시오.** 대신 특정 작업 또는 선택 항목을 지칭하십시오. 예를 들어, ‘팝오버 하단에서 보기 버튼을 선택하십시오.’ 대신에 ‘보기 버튼을 선택하십시오.’라고 작성할 수 있습니다.

**팝오버로 경고를 표시하지 마십시오.** 사람들은 팝오버를 놓치거나 실수로 닫을 수 있습니다. 경고를 하려면 [경고](https://developer.apple.com/kr/design/human-interface-guidelines/alerts) 표시 방식을 대신 사용하십시오.

## 플랫폼 고려 사항

*visionOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS

**콤팩트 보기에서 팝오버를 표시하지 마십시오.** 앱 또는 게임이 콘텐츠 영역의 크기 유형에 따라 레이아웃을 동적으로 조절할 수 있게 만드십시오. 팝오버는 넓은 보기에 사용하십시오. 콤팩트 보기의 경우, 시트와 같은 전체 스크린 모달 뷰로 정보를 제공하여 모든 화면 공간을 사용하십시오. 관련된 지침을 보려면 [모달 형식](https://developer.apple.com/kr/design/human-interface-guidelines/modality)의 내용을 참조하십시오.

### macOS

macOS에서 드래그하면 개별 패널이 되는 분리 가능한 팝오버를 만들 수 있습니다. 패널은 사람들이 다른 콘텐츠와 상호작용하는 동안에도 화면상에 표시됩니다.

**연결된 팝오버**

![캘린더의 이벤트 일러스트. 옆에는 이벤트의 연결된 팝오버 버전이 있고 이를 가리키고 있음.](https://developer.apple.com/images/com.apple.HIG/kr/attached-popover@2x.png)

**분리된 팝오버**

![캘린더의 이벤트 일러스트. 옆에는 이벤트의 분리된 팝오버 버전이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/detached-popover@2x.png)

**팝오버의 분리를 허용하십시오.** 팝오버가 표시되는 동안 다른 정보를 보려는 경우, 팝오버를 패널로 변환할 수 있는 기능은 편리할 수 있습니다.

**분리된 팝오버의 모양은 최소한으로 변경하십시오.** 원본 팝오버와 비슷하게 생긴 패널을 사용하면 맥락을 유지하는 데 도움이 됩니다.

## 리소스

#### 관련 콘텐츠

[시트](https://developer.apple.com/kr/design/human-interface-guidelines/sheets)

[동작 시트](https://developer.apple.com/kr/design/human-interface-guidelines/action-sheets)

[경고](https://developer.apple.com/kr/design/human-interface-guidelines/alerts)

[모달 형식](https://developer.apple.com/kr/design/human-interface-guidelines/modality)

#### Developer 문서

[popover(isPresented:attachmentAnchor:arrowEdge:content:)](https://developer.apple.com/documentation/swiftui/view/popover(ispresented:attachmentanchor:arrowedge:content:)) — SwiftUI

[UIPopoverPresentationController](https://developer.apple.com/documentation/uikit/uipopoverpresentationcontroller) — UIKit

[NSPopover](https://developer.apple.com/documentation/appkit/nspopover) — AppKit
