# 진행 과정 표시기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/progress-indicators

> 진행 과정 표시기를 사용하면 앱이 콘텐츠를 로드하거나 긴 작업을 수행하는 동안 앱이 중단되지 않았음을 알려줄 수 있습니다.

![진행 과정 막대 위에 돌고 있는 미확정 활동 표시기가 스타일화되어 표시됨. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-progress-indicators-intro@2x.png)

일부 진행 과정 표시기를 사용하면 작업이 완료될 때까지 기다려야 하는 시간을 추정할 수 있는 방법도 제공합니다. 모든 진행 과정 표시기는 일시적으로 표시되며 작업이 진행 중일 때만 표시되고 완료된 후에는 사라집니다.

작업 시간이 알려지거나 알려지지 않았을 수 있기 때문에 진행 과정 표시기에는 2가지 유형이 있습니다.

- *확정*은 파일 변환 등 기간이 잘 정의된 작업의 경우 표시됩니다.
- *미확정*은 로드 또는 복잡한 데이터 동기화 등 수량을 측정할 수 없는 작업의 경우 표시됩니다.

확정 및 미확정 진행 과정 표시기는 모두 플랫폼에 따라 모양이 다를 수 있습니다. 확정 진행 과정 표시기는 작업이 완료될 때 선형 또는 원형 트랙을 채워 작업의 진행률을 보여줍니다. *진행 과정 막대*에는 앞에서 뒤까지 채워지는 트랙이 포함됩니다. *원형 진행 과정 표시기*에는 시계 방향으로 채워지는 트랙이 있습니다.

![macOS의 수평 진행 과정 막대가 거의 중간 지점까지 단색으로 채워진 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/progress-indicator-determinate-bar@2x.png)

![macOS의 원형 진행 과정 표시기가 거의 8시 방향까지 단색으로 채워진 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/progress-indicator-determinate-circle@2x.png)

미확정 진행 과정 표시기(*활동 표시기*라고도 불림)는 애니메이션이 적용된 이미지를 사용하여 진행 과정을 나타냅니다. 모든 플랫폼은 제자리에 회전하는 원형 이미지를 지원하지만 macOS는 미확정 진행 과정 막대도 지원합니다.

![macOS에서 회전하는 원형 활동 표시기의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/progress-indicator-intermediate-spinner@2x.png)

![watchOS에서 회전하는 활동 표시기를 나타내는 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/activity-indicators-watch@2x.png)

개발자 지침을 보려면 [ProgressView](https://developer.apple.com/documentation/swiftui/progressview)의 내용을 참조하십시오.

## 모범 사례

**가능하다면 확정 진행 과정 표시기를 사용하십시오.** 미확정 진행 과정 표시기는 과정이 진행 중임을 나타내지만 작업에 얼마나 걸리는지 예상하는 데에는 도움이 되지 않습니다. 확정 진행 과정 표시기를 사용하면 작업이 완료되기를 기다리는 동안 다른 일을 할 것인지, 다른 시간에 작업을 시작할 것인지 아니면 작업을 포기할 것인지 결정할 수 있습니다.

**확정 진행 과정 표시기에서 진척도는 최대한 정확하게 표시하십시오.** 작업을 완료하는 데 걸리는 시간을 신뢰할 수 있도록 진행 속도의 페이스를 고르게 조절하십시오. 5초 만에 90% 완료를 표시하고 5분 후에 남은 10%를 완료 표시하면 앱이 여전히 작동하고 있는지 의문을 느끼고 심지어 기만당했다고 느낄 수 있습니다.

**진행 과정 표시기를 계속 움직여서 계속 작업이 진행되고 있음을 나타내십시오.** 이동하지 않는 표시기를 본 사람들은 진행 과정이 중단되거나 앱이 멈췄다고 생각합니다. 어떤 이유로 진행 과정이 중단된다면 문제와 해결 방법을 이해할 수 있도록 설명하는 피드백을 제공하십시오.

**가능하다면 진행 과정 막대를 미확정에서 확정으로 전환하십시오.** 미확정 진행 과정 막대가 지속 시간을 판단할 수 있는 일정 수준에 도달한 경우, 확정 진행 과정 막대로 전환하십시오. 일반적으로 사람들은 무슨 일이 일어나고 있고 얼마나 걸리는지 가늠할 수 있는 확정 진행 과정 표시기를 선호합니다.

**원형 스타일에서 막대 스타일로 전환하지 마십시오.** 활동 표시기(*스피너*라고도 함) 및 진행 과정 막대는 모양과 크기가 서로 다르기 때문에 둘 사이를 전환하면 인터페이스를 방해하고 혼란을 야기할 수 있습니다.

**도움이 된다면 작업에 추가 맥락을 제공하는 설명을 표시하십시오.** 정확하고 짧게 설명하십시오. 도움이 되지 않는 *로드* 또는 *인증*과 같은 모호한 용어는 사용하지 않는 게 좋습니다.

**일관적인 위치에 진행 과정 표시기를 표시하십시오.** 진행 과정 표시기를 표시할 일관적인 위치를 선택하면 모든 플랫폼, 앱 내부 또는 앱 간에서 작업의 상태를 항상 확인할 수 있습니다.

**가능하다면 작업을 중단할 수 있게 하십시오.** 부정적인 부작용 없이 작업을 중단할 수 있다면 취소 버튼을 포함하십시오. 작업을 중단할 때 파일의 다운로드된 부분이 손실되는 등 부작용이 발생하는 경우, 취소 버튼 대신 일시 정지 버튼을 제공하는 것이 유용합니다.

**작업을 중단하면 부정적인 결과가 발생할 수 있음을 알리십시오.** 작업을 중단하면 작업 과정이 손실되는 경우, 취소를 확인하거나 작업을 다시 시작할 수 있는 옵션을 포함한 [경고](https://developer.apple.com/kr/design/human-interface-guidelines/alerts)를 제공하는 것이 좋습니다.

## 플랫폼 고려 사항

*tvOS 또는 visionOS에 대한 추가 고려 사항은 없습니다.*

### iOS, iPadOS

#### 콘텐츠 새로 고침 제어기

테이블 보기 등에서 새로 고침 제어기를 사용하면 콘텐츠가 다음 번에 자동으로 업데이트될 때까지 기다리지 않아도 즉시 콘텐츠를 다시 로드할 수 있습니다. 새로 고침 제어기는 기본적으로 가려져 있는 특별한 유형의 활동 표시기로 새로 고치려는 보기를 아래로 드래그하는 경우에만 표시됩니다. 예를 들어, Mail 앱에서는 받은 편지함의 메시지 목록을 아래로 드래그하여 새로운 메시지를 확인할 수 있습니다.

![Mail 앱에서 새로운 메시지를 확인하는 동안 회전하는 콘텐츠 새로 고침 제어기의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/refresh-controls@2x.png)

**자동 콘텐츠 업데이트를 수행하십시오.** 콘텐츠를 즉시 새로 고침할 수 있는 기능은 유용하지만 사람들은 자동 새로 고침이 주기적으로 수행되기를 기대하기도 합니다. 모든 업데이트를 직접 시작하게 만들지 마십시오. 정기적으로 업데이트하여 데이터를 최신 상태로 유지하십시오.

**유용한 경우에만 짧은 제목을 제공하십시오.** 원한다면 새로 고침 제어기에 제목을 포함할 수 있습니다. 대부분의 경우, 제어기의 애니메이션이 콘텐츠를 로드 중이라는 정보를 표시하기 때문에 제목을 포함할 필요는 없습니다. 만약 제목을 포함한다면 해당 제목에서 새로 고침을 수행하는 방법을 설명하지 마십시오. 대신 새로 고치는 콘텐츠에 대한 유용한 정보를 제공하십시오. 예를 들어, 팟캐스트 앱의 새로 고침 제어기는 제목을 사용하여 팟캐스트가 마지막으로 언제 업데이트됐는지 알려줍니다.

개발자 지침을 보려면 [UIRefreshControl](https://developer.apple.com/documentation/uikit/uirefreshcontrol)의 내용을 참조하십시오.

### macOS

macOS의 미확정 진행 과정 표시기는 막대 또는 원형 모양을 할 수 있습니다. 두 버전 모두 애니메이션을 적용한 이미지로 앱이 작업을 수행 중임을 나타냅니다.

![macOS에서 완전히 채워진 수평 진행 과정 막대의 이미지. 진행되는 동안 채워지는 동작에 다양한 음영 간에 전환하는 애니메이션이 적용됩니다.](https://developer.apple.com/images/com.apple.HIG/kr/progress-indicator-intermediate-bar@2x.png)

![macOS에서 회전하는 원형 활동 표시기의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/progress-indicator-intermediate-spinner@2x.png)

**배경 작업의 상태를 알리거나 공간이 제한적일 때 활동 표시기(스피너)를 사용하십시오.** 스피너는 작고 눈에 거슬리지 않기 때문에 서버에서 메시지 받기와 같은 비동기 배경 작업에 유용합니다. 또한 텍스트 필드 내 또는 특정 제어기(예: 버튼) 옆과 같은 작은 영역에서 진행 과정을 알릴 때 유용하게 사용할 수도 있습니다.

**회전하는 진행 과정 표시기에 레이블을 지정하지 마십시오.** 스피너는 진행 과정을 시작할 때 표시되기 때문에 일반적으로 레이블은 필요하지 않습니다.

### watchOS

기본적으로 시스템은 장면의 배경 색상 위에 진행 과정 표시기를 하얀색으로 표시합니다. 색조를 설정하여 진행 과정 표시기의 색상을 변경할 수 있습니다.

![watchOS에서 왼쪽부터 오른쪽으로 채워지는 진행 과정 막대를 나타내는 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/progress-bar-watch@2x.png)

![watchOS에서 시계 방향으로 채워지는 원형 진행 과정 표시기를 나타내는 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/progress-ring-watch@2x.png)

![watchOS에서 회전하는 활동 표시기를 나타내는 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/activity-indicators-watch@2x.png)

## 리소스

#### Developer 문서

[ProgressView](https://developer.apple.com/documentation/swiftui/progressview) — SwiftUI

[UIProgressView](https://developer.apple.com/documentation/uikit/uiprogressview) — UIKit

[UIActivityIndicatorView](https://developer.apple.com/documentation/uikit/uiactivityindicatorview) — UIKit

[UIRefreshControl](https://developer.apple.com/documentation/uikit/uirefreshcontrol) — UIKit

[NSProgressIndicator](https://developer.apple.com/documentation/appkit/nsprogressindicator) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 9월 12일 | 모든 플랫폼에 해당하는 지침이 통합됨. |
| 2023년 6월 5일 | watchOS 10의 변경 사항을 반영하기 위해 지침이 업데이트됨. |
