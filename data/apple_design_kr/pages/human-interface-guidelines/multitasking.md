# 멀티태스킹

Source: https://developer.apple.com/kr/design/human-interface-guidelines/multitasking

> 멀티태스킹을 통해 사람들은 한 앱에서 다른 앱으로 빠르게 전환하여 각각의 앱에서 작업을 수행할 수 있습니다.

![Split View 정렬로 나란히 표시된 두 개의 윈도우 스케치가 멀티태스킹을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-multitasking-intro@2x.png)

사람들은 자신의 기기가 멀티태스킹을 지원할 것이라고 예상하기 때문에 앱에서 멀티태스킹을 허용하지 않으면 문제가 발생했다고 생각하게 됩니다. 일부 게임 및 전체 공간에서 실행되는 Apple Vision Pro 앱과 같은 특별한 경우를 제외하고는 모든 앱에서 멀티태스킹이 원활하게 작동해야 합니다.

앱 전환과 더불어 멀티태스킹은 여러 기기에서 다양한 경험을 선사할 수 있습니다. [플랫폼 고려 사항](https://developer.apple.com/kr/design/human-interface-guidelines/multitasking#Platform-considerations)의 내용을 참조하십시오.

## 모범 사례

탁월한 멀티태스킹 경험을 제공하려면 다양한 동시 맥락에서 콘텐츠를 관리하여 사람들이 여러 앱에서 작업을 완료할 수 있도록 지원해야 합니다. 사람들이 언제 멀티태스킹을 시작할지 모르기 때문에 앱 또는 게임은 언제든 사용자의 진행 상태를 저장하고 복구할 수 있도록 준비되어 있어야 합니다.

**사람들이 다른 작업으로 전환할 경우 관심이나 적극적인 참여가 필요한 활동을 일시 정지시키십시오.** 예를 들어, 게임 또는 미디어 재생 앱이라면 다른 앱으로 전환할 때 사람들이 놓치는 사항이 없어야 합니다. 원래 위치로 다시 전환할 때에는 이전 작업을 이어서 계속 진행할 수 있도록 지원하십시오.

**오디오 중단에 자연스럽게 대응하십시오.** 가끔 다른 앱 또는 시스템 자체 오디오가 앱 오디오를 중단할 수도 있습니다. 예를 들어, 걸려 오는 전화 또는 Siri에 의해 실행된 음악 플레이리스트가 앱 오디오를 중단할 수도 있습니다. 이러한 상황이 발생하면, 사람들은 앱이 다음과 같이 반응하기를 기대합니다.

- 음악, 팟캐스트 또는 오디오북 재생 등으로 인해 주요 오디오 중단이 발생하는 동안 오디오를 무한정 일시 정지함.
- GPS 방향 알림 등의 짧은 중단에 대해서는 일시적으로 음량을 낮추거나 오디오를 일시 정지하고, 중단이 끝나면 원래 음량으로 돌아가거나 재생을 재개함.

지침을 보려면 [오디오 재생하기](https://developer.apple.com/kr/design/human-interface-guidelines/playing-audio)의 내용을 참조하십시오.

**사용자가 시작한 작업을 백그라운드에서 완료하십시오.** 사람들은 애셋 다운로드 또는 비디오 파일 처리 등의 작업을 시작할 경우 다른 앱으로 전환하더라도 해당 작업이 완료될 것이라고 기대합니다. 앱에서 추가적인 입력을 필요로 하지 않는 작업을 수행하고 있던 중이라면 작업을 일시 정지하기 전에 백그라운드에서 완료하십시오.

**알림을 절제해서 사용하십시오.** 앱은 일시 정지되거나 백그라운드에서 실행될 때 알림을 보낼 수 있습니다. 앱에서 중요한 작업이나 빨리 처리해야 하는 작업을 시작한 다음 다른 앱으로 전환하는 경우, 사람들은 작업이 완료되었을 때 앱으로 돌아가 다음 단계를 진행할 수 있도록 작업 완료 알림을 받고 싶어할 것입니다. 반대로, 사람들은 일반적으로 부수적인 작업이나 과정의 완료 여부를 알고 싶어하지는 않습니다. 이런 경우에는 불필요한 알림을 보내는 대신, 사람들이 앱으로 돌아올 때 작업을 확인할 수 있도록 하십시오. 지침을 보려면 [알림 관리하기](https://developer.apple.com/kr/design/human-interface-guidelines/managing-notifications)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*watchOS에서는 지원되지 않습니다.*

### iOS

iPhone에서 멀티태스킹을 사용하면 사람들은 다른 앱을 사용하는 동안 FaceTime을 사용하거나 화면 속 화면 모드로 비디오를 시청할 수 있습니다.

![네 개의 열려 있는 앱을 표시하는 iPhone의 앱 전환기 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/multitasking-app-switcher-iphone@2x.png)

![개별 이메일을 표시하는 iPhone의 Mail 앱 스크린샷. 이메일 본문 콘텐츠의 왼쪽 하단 모서리에 사용자가 FaceTime 통화 중임을 나타내는 작은 이미지가 있음.](https://developer.apple.com/images/com.apple.HIG/multitasking-pip-iphone@2x.png)

### iPadOS

iPad에서 사람들은 다양한 앱의 [윈도우](https://developer.apple.com/kr/design/human-interface-guidelines/windows)를 동시에 보고 상호작용할 수 있습니다. 또한 개별 앱이 여러 개의 열려 있는 윈도우를 지원할 수 있으므로 동일한 앱에서 두 개 이상의 윈도우를 보고 상호작용할 수도 있습니다.

전체 화면 또는 윈도우형 앱이 있는 iPad를 사용할 수 있습니다. 전체 화면 시 앱이 전체 화면 크기로 확대되며 앱 전환기를 사용하여 개별 앱 윈도우 간에 전환할 수 있습니다.

![다섯 개의 열려 있는 앱을 표시하는 가로 화면 방향의 iPad 앱 전환기 스크린샷. 앱의 썸네일 표시가 격자식으로 정렬됨.](https://developer.apple.com/images/com.apple.HIG/kr/multitasking-ipad-app-switcher@2x.png)

윈도우에 배치된 앱을 사용할 때 앱 윈도우의 크기를 조절할 수 있으며 macOS와 유사한 동작을 사용하여 필요에 맞게 윈도우를 정렬할 수 있습니다. 시스템에서 제공하는 윈도우 제어기를 사용하여 일반적인 타일식 구성, 전체 화면 시작, 윈도우 최소화 및 닫기를 수행할 수 있습니다. 시스템은 해당 윈도우 제어기에 색상을 입히고 그 뒤에 있는 윈도우에 드롭 그림자를 드리워서 가장 맨 앞의 윈도우를 식별합니다. 지침을 보려면 [iPadOS](https://developer.apple.com/kr/design/human-interface-guidelines/windows#iPadOS)의 내용을 참조하십시오.

![iPad에서 가로 화면 방향으로 열린 두 개의 윈도우형 앱 스크린샷. 가장 앞에 있는 앱 윈도우는 뒤에 있는 앱 윈도우와 겹쳐져 그림자가 드리워졌고, 색상이 지정된 윈도우 제어기를 통해 윈도우가 활성 상태임을 나타냄. 두 윈도우 모두 홈 화면 배경 맨 위에 배치되었으며 하단에는 Dock이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/multitasking-ipad-windows-maps-landmarks@2x.png)

또한 앱이 전체 화면인지 윈도우에 배치되었는지에 관계없이 비디오와 FaceTime 통화를 다른 콘텐츠 위에 화면 속 화면 오버레이로 재생할 수도 있습니다.

> **참고:** 앱은 멀티태스킹 구성을 제어하지 않으며, 사람들이 선택하는 구성과 관련된 그 어떤 정보도 받지 않습니다.

윈도우에 배치된 앱을 열 때 해당 앱이 올바르게 반응하도록 하려면 앱이 다양한 화면 크기에 맞춰 적절하게 조절되도록 해야 합니다. 지침을 보려면 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout) 및 [윈도우](https://developer.apple.com/kr/design/human-interface-guidelines/windows)의 내용을 참조하십시오. 개발자 지침을 보려면[Multitasking on iPad, Mac, and Apple Vision Pro](https://developer.apple.com/documentation/uikit/multitasking-on-ipad-mac-and-apple-vision-pro)의 내용을 참조하십시오. 사람들이 iPad 멀티태스킹 기능을 사용하는 방법을 알아보려면 [Use multitasking on your iPad](https://support.apple.com/en-us/HT207582)의 내용을 참조하십시오.

### macOS

Mac에서는 일반적으로 사람들이 두 개 이상의 앱을 동시에 실행하고, 일할 때 윈도우와 작업 간에 전환하기 때문에 멀티태스킹은 기본적인 경험입니다. 여러 개의 앱 윈도우가 열려 있을 경우, macOS는 데스크탑 위에 윈도우가 겹쳐 나타나는 드롭 그림자를 적용하고, 사람들이 다양한 윈도우 상태를 구별할 수 있도록 기타 시각 효과를 적용합니다. 지침을 보려면 [macOS 윈도우 상태](https://developer.apple.com/kr/design/human-interface-guidelines/windows#macOS-window-states)의 내용을 참조하십시오.

### tvOS

Apple TV에서는 사람들이 영화 또는 TV 프로그램을 화면 속 화면 모드로 재생하는 동안 콘텐츠를 재생하거나 탐색할 수 있습니다(지원되는 경우).

### visionOS

Apple Vision Pro에서는 사람들이 공유 공간에서 여러 개의 앱을 동시에 실행하고, 해당 공간에서 윈도우 및 볼륨을 보면서 서로 간에 전환할 수 있습니다.

공유 공간에서는 한 번에 하나의 윈도우만 활성화될 수 있습니다. 사람들이 한 윈도우에서 다른 윈도우로 시선을 돌리면 현재 보고 있는 윈도우가 활성화되며, 이전에 보던 윈도우는 반투명해지고 z축을 따라 멀어진 것처럼 보입니다. 공유 공간에서 앱 윈도우를 닫으면 앱이 종료되지 않고 백그라운드로 전환됩니다.

> **참고:** 앱이 ‘지금 재생 중’ 앱일 경우, 윈도우를 닫으면 자동으로 오디오 재생이 일시 정지됩니다. 재생을 재개하고 싶을 경우, 윈도우를 열지 않고 제어 센터에서 재개할 수 있습니다.

**시스템이 제공하는 멀티태스킹 동작을 방해하지 마십시오.** 사람들이 한 윈도우에서 다른 윈도우로 시선을 돌리면 visionOS는 시선이 떠난 윈도우에 페더 마스크를 적용하여 변경된 상태를 명확히 표시합니다. 이 시각적 피드백을 방해하지 않도록 윈도우 가장자리의 모양을 변경하지 마십시오.

[video: visionOS의 공유 공간에 있는 메모 앱 및 설정 앱이 표시된 녹화 영상. 보는 사람은 먼저 메모 앱 윈도우가 설정 윈도우 위에 조금 겹치도록 위치를 변경한 후에 설정을 활성화하고 메모 앱으로 다시 전환함. 앱이 활성화될 때마다 시스템이 비활성화된 앱의 윈도우에 페더를 적용함.]

**사람들이 윈도우에서 시선을 돌릴 때 비디오 재생을 일시 정지하지 마십시오.** macOS와 마찬가지로, 사람들은 visionOS의 윈도우에서 재생을 시작하면 다른 윈도우를 보거나 다른 윈도우에서 작업을 수행하는 동안에도 재생이 계속될 것이라고 기대합니다.

**오디오 음량이 줄어드는 상황에 대비하십시오.** 현재 앱이 ‘지금 재생 중’ 앱이 아닐 경우, 사람들이 해당 앱에서 다른 앱으로 시선을 돌리면 오디오의 음량이 줄어들 수 있습니다.

## 리소스

#### 관련 콘텐츠

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

[윈도우](https://developer.apple.com/kr/design/human-interface-guidelines/windows)

[비디오 재생하기](https://developer.apple.com/kr/design/human-interface-guidelines/playing-video)

#### Developer 문서

[Responding to the launch of your app](https://developer.apple.com/documentation/uikit/responding-to-the-launch-of-your-app) — UIKit

[Multitasking on iPad, Mac, and Apple Vision Pro](https://developer.apple.com/documentation/uikit/multitasking-on-ipad-mac-and-apple-vision-pro) — UIKit

#### 비디오

- [iPad 앱 디자인 향상하기](https://developer.apple.com/kr/videos/play/wwdc2025/208) — iPadOS에서 앱의 디자인과 분위기를 멋지게 만드세요. 크기 조절이 가능한 앱 윈도우를 위한 반응성 레이아웃을 설계하는 모범 사례를 확인할 수 있습니다. 윈도우 제어에 익숙해지고 이를 조정하는 최선의 방법을 알아보세요. 훌륭한 메뉴 바의 구성 요소를 살펴보고 새로운 포인터와 업데이트된 포인터 효과도 만나볼 수 있습니다.
- [UIKit 앱을 더욱 유연하게 만들기](https://developer.apple.com/kr/videos/play/wwdc2025/282) — iPhone, iPad, Mac 및 Apple Vision Pro에서 장면 및 컨테이너 뷰 컨트롤러를 사용하여 UIKit 앱을 더욱 유연하게 만드는 방법을 알아보세요. 앱 중심의 수명 주기에서 장면 기반의 수명 주기로 전환하여 향상된 윈도우 크기 조절 및 개선된 멀티태스킹 등 앱의 잠재력을 최대한 발휘할 수 있습니다. 상호작용 방식의 열 크기 조정 및 Inspetcor 열의 온전한 지원 등 UISplitViewController의 향상된 기능을 살펴보세요. 새로운 레이아웃 API를 채택하여 뷰와 제어의 적응력을 더욱 높일 수도 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 플랫폼 고려 사항에서 지침이 다시 정리되고, iPadOS에서 다중 윈도우를 사용하는 멀티태스킹에 대한 지침이 추가됨. |
| 2023년 12월 5일 | iPadOS의 기본 윈도우 및 보조 윈도우용 아트워크가 추가됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
