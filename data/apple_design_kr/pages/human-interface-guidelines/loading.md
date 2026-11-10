# 로드하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/loading

> 최고의 콘텐츠 로딩 경험은 사람들이 인식하기 전에 완료됩니다.

![미확정 활동 표시기가 돌고 있는 모양의 스케치가 있고, 데이터 로드를 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-loading-intro@2x.png)

앱 또는 게임이 에셋, 레벨 또는 기타 콘텐츠를 로드하는 경우, 사용자 경험을 방해하거나 부정적인 영향을 주지 않도록 동작을 디자인하십시오.

## 모범 사례

**무엇이든 최대한 빨리 표시하십시오.** 아무것도 표시하지 않은 상태로 로드가 완료될 때까지 기다리게 만들면, 사람들은 콘텐츠 부족을 앱 또는 게임의 문제로 생각할 수 있습니다. 콘텐츠가 로드될 때 위치 지정자 텍스트, 그래픽 또는 애니메이션을 표시하고 콘텐츠가 모두 표시되면 이러한 요소를 대치하는 것을 고려하십시오.

**콘텐츠가 로드될 때까지 기다리는 동안 앱 또는 게임에서 다른 작업을 할 수 있도록 하십시오.** 백그라운드에서 콘텐츠를 로드하면 사람들에게 다른 동작에 대한 접근 권한을 부여하는 데 도움이 됩니다. 예를 들어 플레이어가 다음 레벨에 대해 알아보거나 게임 내 메뉴를 보는 동안 게임은 백그라운드에서 콘텐츠를 로드할 수 있습니다. 개발자 지침을 보려면 [Improving the player experience for games with large downloads](https://developer.apple.com/documentation/gamekit/improving-the-player-experience-for-games-with-large-downloads)의 내용을 참조하십시오.

**어쩔 수 없이 로드 시간이 길어진다면 사람들이 기다리는 동안 볼 수 있는 흥미로운 콘텐츠를 제공하십시오.** 예를 들어 플레이하는 게임의 힌트를 제공하거나, 팁을 표시하거나, 사람들에게 새로운 기능을 소개할 수도 있습니다. 남아 있는 로드 시간을 가능한 한 정확하게 측정하여 남은 시간이 너무 짧아 위치 지정자 콘텐츠를 즐기기에 부족하거나, 남은 시간이 너무 길어 콘텐츠를 반복하는 일이 생기지 않도록 하십시오.

**백그라운드에서 대용량 에셋을 다운로드하여 설치 및 실행 시간을 개선하십시오.** 게임 레벨 팩, 3D 캐릭터 모델, 텍스처와 같은 에셋 다운로드가 설치 직후, 업데이트 도중 또는 사람들의 작업을 방해하지 않는 다른 시간에 이루어지도록 [Background Assets](https://developer.apple.com/documentation/backgroundassets) 프레임워크를 사용하여 예약하는 것을 고려하십시오.

## 진행 과정 표시하기

**콘텐츠가 로드 중이고 완료까지 얼마나 걸리는지 명확하게 알려 주십시오.** 콘텐츠가 바로 표시되는 것이 가장 좋지만, 로드하는 데 어느 정도 시간이 걸리는 경우에는 *진행 과정 표시기*라고 하는 시스템 제공 구성요소를 사용하여 로딩이 진행 중임을 표시할 수 있습니다. 일반적으로 로드가 얼마나 걸릴지 아는 경우에는 *확정* 진행 과정 표시기를 사용하고, 로드 시간을 측정할 수 없을 경우에는 *미확정* 진행 과정 표시기를 사용합니다. 지침을 보려면 [진행 과정 표시기](https://developer.apple.com/kr/design/human-interface-guidelines/progress-indicators)의 내용을 참조하십시오.

**게임의 경우, 사용자 설정 로드 보기를 고려해 보십시오.** 표준 진행 과정 표시기는 대부분의 앱에서 잘 작동하지만, 게임에서는 어울리지 않게 느껴질 수 있습니다. 게임에 어울리는 사용자 설정 애니메이션과 요소를 사용하여 더욱 매력적인 경험을 제공하는 디자인을 적용해 보십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS 또는 visionOS에 대한 추가 고려 사항은 없습니다.*

### watchOS

**가능한 한, watchOS 경험에서 로딩 표시기를 표시하지 마십시오.** 사람들은 Apple Watch와 빠르게 상호작용하기를 기대하므로 콘텐츠를 즉시 표시하는 것을 목표로 삼으십시오. 컨텐츠를 로드하는 데 1~2초 정도 걸리는 경우에는 빈 화면을 표시하는 것보다 로딩 표시기를 표시하는 것이 더 좋습니다.

## 리소스

#### 관련 콘텐츠

[실행하기](https://developer.apple.com/kr/design/human-interface-guidelines/launching)

[진행 과정 표시기](https://developer.apple.com/kr/design/human-interface-guidelines/progress-indicators)

#### Developer 문서

[Background Assets](https://developer.apple.com/documentation/backgroundassets)

#### 비디오

- [Apple-Hosted Background Assets 알아보기](https://developer.apple.com/kr/videos/play/wwdc2025/325) — Background Assets를 기반으로 한 이 세션에서는 게임 및 기타 애플리케이션에 대한 콘텐츠 애셋 팩을 다운로드할 수 있는 새로운 기능을 소개합니다. Apple이 개발자를 위해 이러한 애셋 팩을 호스팅하거나 자체 호스팅 옵션을 관리하는 방법을 알아보세요. 네이티브 API 통합 및 해당 App Store 구현에 대해 자세히 살펴봄으로써 앱의 콘텐츠 전달 및 사용자 경험을 향상하는 도구를 제공합니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 백그라운드에서 대용량 에셋을 다운로드하는 것을 반영하여 다운로드 저장에 대한 지침을 수정함. |
| 2024년 6월 10일 | 진행 과정 표시 및 다운로드 저장에 대한 지침이 추가되고 게임에 대한 지침이 보강됨. |
