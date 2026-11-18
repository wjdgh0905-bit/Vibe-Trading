# 상태 막대

Source: https://developer.apple.com/kr/design/human-interface-guidelines/status-bars

> 상태 막대는 화면 상단 가장자리를 따라 나타나며 시간, 통신사, 배터리 잔량과 같은 기기의 현재 상태에 관한 정보를 표시합니다.

![iPhone 상태 막대의 스타일화된 모양에 시간 및 셀룰러, Wi-Fi, 배터리 잔량 등을 표시하는 레이블이 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-status-bar-intro@2x.png)

## 모범 사례

**상태 막대 아래의 콘텐츠를 가리십시오.** 기본적으로 상태 막대의 배경은 투명하며 그 아래의 콘텐츠를 그대로 표시합니다. 이 투명도로 인해 상태 막대에 표시된 정보를 확인하기 어려운 경우가 생길 수 있습니다. 상태 막대 뒤로 제어기가 표시되면 사람들은 제어기와 상호작용하려고 시도하려다 실패하게 될 것입니다. 상태 막대를 읽기 편한 상태로 유지하고, 그 뒤에 표시되는 콘텐츠가 대화식인 것처럼 보이지 않도록 하십시오. 스크롤 가장자리 효과를 사용하여 흐리게 처리된 보기를 상태 막대 뒤에 배치하는 것이 좋습니다. 개발자 지침을 보려면 [ScrollEdgeEffectStyle](https://developer.apple.com/documentation/swiftui/scrolledgeeffectstyle) 및 [UIScrollEdgeEffect](https://developer.apple.com/documentation/uikit/uiscrolledgeeffect)의 내용을 참조하십시오.

**전체 화면 미디어를 표시할 때 일시적으로 상태 막대를 가리는 것을 고려하십시오.** 상태 막대는 사람들이 미디어에 집중할 때 방해가 될 수 있습니다. 이러한 요소를 일시적으로 가려 더욱 몰입되는 경험을 제공하십시오. 예를 들어, 사진 앱은 사람들이 전체 화면 사진을 둘러볼 때 상태 막대와 기타 인터페이스 요소를 가립니다.

![iPhone의 사진 앱 상단 스크린샷. 화면이 사진으로 가득 채워져 있음. 화면 상단에 상태 막대가 보임.](https://developer.apple.com/images/com.apple.HIG/kr/status-bar-visible@2x.png)

![iPhone의 사진 앱 상단 스크린샷. 화면이 사진으로 가득 채워져 있음. 상태 막대가 가려져 있고 사진만 보임.](https://developer.apple.com/images/com.apple.HIG/kr/status-bar-hidden@2x.png)

**상태 막대를 영구적으로 가리지 마십시오.** 상태 막대가 없으면 사람들은 시간을 확인하거나 Wi-Fi 연결이 되었는지 확인하기 위해 앱을 나가야 합니다. 가려진 상태 막대를 간단하고 쉽게 알 수 있는 제스처로 다시 표시할 수 있게 하십시오. 예를 들어, 사진 앱에서 전체 화면 사진을 둘러볼 때 한 번 탭하면 상태 막대가 다시 표시됩니다.

## 플랫폼 고려 사항

*iOS 또는 iPadOS에 대한 추가 고려 사항은 없습니다. macOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### Developer 문서

[UIStatusBarStyle](https://developer.apple.com/documentation/uikit/uistatusbarstyle) — UIKit

[preferredStatusBarStyle](https://developer.apple.com/documentation/uikit/uiviewcontroller/preferredstatusbarstyle) — UIKit
