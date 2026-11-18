# 실행하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/launching

> 실행 경험이 간소화되면 앱 또는 게임을 곧바로 사용할 수 있습니다.

![오른쪽 상단 모서리를 가르키는 화살표가 포함되어 있는 정사각형 스케치가 표시되어 있으며, 새로운 상태로의 전환을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-launching-intro@2x.png)

실행은 누군가 앱 또는 게임을 열 때 시작되고, 초기 다운로드가 포함되며, 첫 번째 화면이 준비됐을 때 종료됩니다. 실행이 완료되면 사람들에게 앱이나 게임을 대략적으로 살펴볼 수 있는 [온보딩](https://developer.apple.com/kr/design/human-interface-guidelines/onboarding) 경험을 제공할 수 있습니다.

## 모범 사례

**즉시 실행하십시오.** 사람들은 앱 또는 게임과 바로 상호작용하기를 원하며 몇 초 이상조차도 기다리지 못하는 경우도 있습니다.

**플랫폼에서 요구하는 경우, 실행 화면을 제공하십시오.** iOS, iPadOS 및 tvOS에서 시스템은 앱 또는 게임이 시작되는 순간 실행 화면을 표시하고 이를 첫 번째 화면으로 신속하게 대치하여 빠르고 반응적인 느낌을 주는 경험을 사람들에게 제공합니다. 지침을 보려면 [실행 화면](https://developer.apple.com/kr/design/human-interface-guidelines/launching#Launch-screens)의 내용을 참조하십시오. macOS, visionOS, watchOS는 실행 화면이 필요하지 않습니다.

**시작 화면이 필요한 경우 온보딩 흐름 시작 부분에 표시하십시오.** 시작 화면은 제공해야 하는 브랜드와 기타 정보를 간결하게 전달하는 훌륭한 그래픽입니다. 온보딩 환경을 제공하지 않으면 실행이 완료되자마자 시작 화면이 표시될 수 있습니다.

**사람들이 이전에 나갔던 위치에서 계속 진행할 수 있도록 앱이 재시작될 때 이전 상태를 복원하십시오.** 사람들이 앱 또는 게임에서 이전에 진행한 위치를 찾기 위해 되돌아가게 만들지 마십시오. 가능한 한 이전 상태를 세부적으로 복원하십시오. 예를 들어, 사람들이 가장 최근에 사용한 위치로 보기를 스크롤하고, 이전에 나갔을 때와 동일한 상태 및 위치로 윈도우를 표시하십시오.

## 실행 화면

*macOS, visionOS 또는 watchOS는 해당되지 않습니다.*

**실행 경험을 중요시하지 마십시오.** 실행 화면은 온보딩 경험이나 시작 화면의 부분이 아니며, 예술적 표현을 위한 것도 아닙니다. 실행 화면의 유일한 기능은 빠르게 실행되고 즉시 사용 가능하다는 느낌을 주도록 경험을 향상하는 것입니다.

**실행 화면은 앱 또는 게임의 첫 화면과 거의 동일하게 디자인하십시오.** 실행이 완료된 후 다르게 보이는 요소가 있을 경우 사람들은 실행 화면과 첫 화면 사이에 불쾌한 깜박임을 경험할 수 있습니다. 앱 또는 게임이 첫 화면으로 전환되기 전에 단일 색상을 표시한다면, 해당 단일 색상만 표시하는 실행 화면을 만드십시오. 또한 실행 화면이 기기의 현재 화면 방향, 화면 모드와 일치되도록 하십시오.

**첫 화면에 텍스트가 표시되더라도 시작 화면에 텍스트를 포함하지 마십시오.** 실행 화면의 콘텐츠는 변경되지 않기 때문에 표시된 모든 텍스트가 현지화되지 않습니다.

**광고하지 마십시오.** 실행 화면은 브랜드 홍보를 위한 것이 아닙니다. 시작 화면 또는 ‘정보’ 윈도우처럼 생긴 화면을 생성하지 말고, 앱의 첫 화면에 고정된 부분이 아니라면 로고 또는 기타 브랜드 요소를 포함하지 마십시오.

## 플랫폼 고려 사항

*macOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### iOS, iPadOS

**적절한 방향으로 실행하십시오.** 앱 또는 게임이 세로 및 가로 방향 모드를 모두 지원한다면 기기의 현재 방향을 사용하여 실행하십시오. 인터페이스가 한 방향으로만 실행된다면 해당 방향으로 실행하고 필요에 따라 사람들이 기기를 회전하도록 하십시오. 사람들이 기기를 왼쪽 또는 오른쪽 중 어느 쪽으로 회전하여 가로 방향을 시작했는지에 상관없이, 가로 방향 전용 인터페이스가 올바르게 반응하도록 하십시오. 지침을 보려면 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)의 내용을 참조하십시오.

### tvOS

> **참고:** 다수 tvOS 앱의 [레이어드 이미지](https://developer.apple.com/kr/design/human-interface-guidelines/images#Layered-images)와 다르게 실행 화면은 정적입니다.

**라이브 시청 앱의 경우, 사람들이 앱을 시작한 후 곧바로 재생을 자동으로 시작하는 것을 고려하십시오.** 사람들은 TV를 보기 위해 앱을 사용하므로, 몇 초간의 비활성화 후 신규 또는 최근 시청한 라이브 콘텐츠의 재생을 시작하는 것이 좋습니다. 지침을 보려면 [라이브 시청 앱](https://developer.apple.com/kr/design/human-interface-guidelines/live-viewing-apps)의 내용을 참조하십시오.

### visionOS

**완전한 몰입형 앱이더라도 공유 공간에서 실행하는 것을 고려하십시오.** 공유 공간에서 윈도우를 열면 앱 또는 게임을 로드할 시간을 확보하면서 앱에 대한 더 많은 맥락을 제공할 수 있습니다. 또한 사람들이 완전한 몰입형 경험을 여는 데 사용할 수 있는 제어기를 표시할 수 있습니다. 일반적으로, 사람들은 전체 공간으로 언제 전환할지 선택하고 싶어 합니다. 특히 현재 공유 공간에서 다른 앱을 실행 중인 경우라면 더욱 그렇습니다. 지침을 보려면 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[온보딩](https://developer.apple.com/kr/design/human-interface-guidelines/onboarding)

[로드하기](https://developer.apple.com/kr/design/human-interface-guidelines/loading)

#### Developer 문서

[Specifying your app’s launch screen](https://developer.apple.com/documentation/xcode/specifying-your-apps-launch-screen) — Xcode

[Responding to the launch of your app](https://developer.apple.com/documentation/uikit/responding-to-the-launch-of-your-app) — UIKit

#### 비디오

- [앱 실행 최적화하기](https://developer.apple.com/kr/videos/play/wwdc2019/423) — 느린 앱 출시는 개발자의 업무에 지장이 됩니다. 새로운 앱 출시 도구를 알아보고 앱을 빠르게 출시하는 방법을 살펴보세요. 앱 출시가 어떻게 진행되는지, 이 중요한 시기에 작업을 최소화하고, 우선순위를 정하고 최적화하는 방법에 대한 정보를 익히세요. 빠른 iOS 앱 출시를 가능하게 한 엔지니어로부터 팁과 요령도 들어 보세요.
- [앱 사용자에게 강한 첫인상 남기기](https://developer.apple.com/kr/videos/play/wwdc2017/816) — 앱을 처음 여는 순간부터 사용자가 참여하도록 유도하고, 더 많은 콘텐츠를 누리기 위해 계속 사용하도록 격려하세요. 매력적인 첫인상을 남기기 위한 팁, 신규 사용자에게 앱을 소개하는 방법, 사용자에게 추가 정보를 요청할 때의 모범 사례를 살펴봅니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 6월 10일 | 시작 화면 표시에 대한 지침이 추가됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
