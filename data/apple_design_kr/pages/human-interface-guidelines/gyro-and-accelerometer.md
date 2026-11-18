# 자이로스코프 및 가속도계

Source: https://developer.apple.com/kr/design/human-interface-guidelines/gyro-and-accelerometer

> 기기상의 자이로스코프 및 가속도계는 실제 세계의 기기 움직임에 대한 데이터를 제공할 수 있습니다.

![자이로스코프 모양의 스케치가 있으며, 움직임을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 보라색을 은은하게 반영하는 보라색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/inputs-gyroscope-intro@2x.png)

가속도계 및 자이로스코프 데이터를 사용하여 iOS, iPadOS 및 watchOS에서 실행되는 앱 및 게임에서 실시간 움직임 기반 정보를 바탕으로 경험을 제공할 수 있습니다. tvOS 앱은 Siri Remote의 자이로스코프 데이터를 사용할 수 있습니다. 개발자 지침을 보려면 [Core Motion](https://developer.apple.com/documentation/coremotion)의 내용을 참조하십시오.

## 모범 사례

**사람들에게 실질적 이점을 제공하는 경우에만 움직임 데이터를 사용하십시오.** 예를 들어, 사람들의 활동 및 전반적인 건강에 대한 피드백을 제공하기 위해 피트니스 앱에서 해당 데이터를 사용하거나, 게임 플레이를 향상하기 위해 게임에서 해당 데이터를 사용할 수 있습니다. 그저 데이터를 모으려는 목적으로 데이터를 수집하지 마십시오.

> **중요:** 경험을 제공하기 위해 기기의 움직임 데이터에 접근해야 하는 경우, 그 이유를 설명하는 문구를 제공해야 합니다. 앱 또는 게임에서 이러한 유형의 데이터에 처음 접근할 때 시스템은 해당 문구를 함께 표시하여 권한을 요청하며 사람들은 이를 승인하거나 거절할 수 있습니다.

**활동적인 게임 플레이가 아니라면 인터페이스를 직접 조종하는 수단으로 가속도계 또는 자이로스코프를 사용하지 마십시오.** 움직임에 기반한 일부 제스처는 정확히 따라하기 어렵거나, 어떤 사람에게는 매우 힘겨울 수 있으며, 배터리 사용량에 영향을 줄 수 있습니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

## 리소스

#### 관련 콘텐츠

[피드백](https://developer.apple.com/kr/design/human-interface-guidelines/feedback)

#### Developer 문서

[Getting processed device-motion data](https://developer.apple.com/documentation/coremotion/getting-processed-device-motion-data) — Core Motion

#### 비디오

- [모션으로 건강 측정하기](https://developer.apple.com/kr/videos/play/wwdc2021/10287) — 모션 데이터로 앱의 건강 모니터링을 한 단계 더 발전시키는 방법을 알아보세요. iPhone용 보행 안정성과 Apple Watch용 6분 걷기 수치를 만나 보세요. 보행 안정성은 앱에서 사용자의 보행 상태와 넘어질 위험을 해석하는 데 도움이 되며, 6분 걷기 수치는 HealthKit 추정 재보정 API와 함께 수술과 같은 급성 이벤트 후 보행 지구력의 변화를 추적할 수 있습니다. 특히 더 많은 서비스를 원격으로 제공해야 하는 상황에서 이러한 수치를 지원하고 앱 사용자에게 실행 가능한 건강 데이터를 제공하여 환자 치료 및 임상시험을 개선하는 데 도움을 주는 방법을 보여드립니다.
