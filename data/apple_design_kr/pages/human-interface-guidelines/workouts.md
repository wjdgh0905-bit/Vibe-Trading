# 운동

Source: https://developer.apple.com/kr/design/human-interface-guidelines/workouts

> 훌륭한 운동이나 피트니스 경험은 사람들이 현재 활동에 착수하고, 기기에서 진행 상황을 추적할 수 있도록 도와줍니다.

![달리는 사람의 스케치가 운동을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-workouts-intro@2x.png)

사람들은 많은 유형의 운동을 하는 동안 Apple Watch를 착용할 수 있고, 걷기, 휠체어 밀기 및 달리기 등의 피트니스 활동 중에 iPhone 또는 iPad를 지참할 수 있습니다. 반면에, 사람들은 iPad Pro, Mac 및 Apple TV처럼 더 크거나 고정된 기기를 사용하여 실시간 운동 세션이나 녹화된 운동 세션에 혼자 또는 다른 사람들과 함께 참여하려 합니다.

기기에서 활동 데이터를 활용하고 친숙한 구성요소로 피트니스 수치를 표시하는 Apple Watch, iPhone 또는 iPad용 운동 경험을 생성하여 사람들이 목표를 달성하는 데 도움을 줄 수 있습니다.

## 모범 사례

**watchOS 피트니스 앱에서 운동 세션을 사용하여 유용한 데이터 및 관련된 제어기를 제공하십시오.** watchOS는 피트니스 앱의 활성화된 운동 세션 중에 손목을 들어올리는 사이에 앱을 계속해서 표시하므로, 사람들이 가장 관심을 가질 만한 운동 데이터를 제공하는 것이 중요합니다. 예를 들어, 경과 시간 또는 남은 시간, 소모된 칼로리나 이동 거리를 표시하고, 랩 또는 간격 마커 등의 관련 제어기를 제공할 수 있습니다.

**무관한 정보로 인해 사람들이 운동에서 집중력을 빼앗기지 않도록 하십시오.** 예를 들어, 운동하는 동안에 사람들은 제공받은 운동 목록을 검토하거나 앱의 다른 부분에 접근할 필요가 없습니다. 많은 watchOS 운동 앱이 사용하는 정렬 방식은 다음과 같습니다(운동 앱 포함).

![실외 걷기 운동에 대한 맨 왼쪽 운동 화면의 스크린샷. 왼쪽 상단 모서리부터 시계 방향으로 종료, 재개, 신규 및 구간 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/workouts-large-buttons@2x.png)

![실외 걷기 운동에 대한 중앙 운동 화면의 스크린샷. 데이터가 다섯 줄로 표시됨. 화면이 상단에서부터 경과 시간, 활동 칼로리, 현재 심박수, 평균 속도 및 고도를 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/workouts-metrics@2x.png)

![현재 재생 중인 음악에 관한 정보를 표시하는 맨 오른쪽 운동 화면의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/workouts-media-playback@2x.png)

**구별되는 시각적 모양을 사용하여 활성화된 운동을 표시하십시오.** 사람들은 운동하는 동안 한눈에 활성화된 세션을 알아보고 싶어 합니다. 수치 페이지는 실시간으로 값이 업데이트되기 때문에 세션이 활성화되었음을 보여주는 좋은 방법이 될 수 있습니다. 수치 화면에서 업데이트되는 값을 표시할 뿐만 아니라, 고유한 레이아웃을 사용하여 더욱 효과적으로 구별할 수 있습니다.

**찾거나 탭하기 쉬운 운동 제어기를 제공하십시오.** 사람들이 운동을 일시 정지, 재개 및 중단하기 쉽게 만들 뿐만 아니라, 세션이 시작되거나 중단되었음을 나타내는 분명한 피드백을 제공하십시오.

**운동 중에 센서 데이터를 사용할 수 없을 경우, 앱이 기록하는 건강 정보를 사람들이 이해하도록 도와주십시오.** 예를 들어, 물속에서 심박수 측정이 제한적일 수 있지만, 앱은 여전히 사람들이 헤엄친 거리 및 소모한 칼로리 수치 등의 데이터를 기록할 수 있습니다. 앱이 *수영* 또는 *기타* 운동 유형을 지원할 경우, 아래와 같이 시스템 제공 운동 앱에서 사용되는 언어와 비슷한 언어를 사용하여 상황을 설명하십시오.

|  | 운동 앱의 텍스트 예시 |  |  |
| --- | --- | --- | --- |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | 수영(수영장)하는 동안에는 GPS가 사용되지 않으며 물속에서 심박수 측정이 제한적일 수 있지만 Apple Watch는 내장 가속도계를 이용하여 칼로리, 랩 및 거리를 계속 추적합니다. |  |  |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | 이와 같은 종류의 운동을 하는 경우 센서로 읽을 수 없을 때에는 빨리 걷기를 할 때와 같은 칼로리로 계산됩니다. |  |  |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | 자유형으로 수영하는 경우 GPS가 거리 정보만 제공합니다. 물속에서 심박수 측정이 제한적일 수 있지만 내장 가속도계를 이용하여 칼로리는 계속 추적됩니다. |  |  |

**세션이 종료되면 요약을 제공하십시오.** 요약 화면은 운동이 완료되었음을 확인하고 기록된 정보를 표시합니다. 요약을 향상하기 위해 사람들이 현재 진행 과정을 쉽게 확인할 수 있도록 활동 링을 포함할지 고려하십시오.

**너무 짧은 운동 세션은 폐기하십시오.** 세션이 시작되고 나서 수 초 안에 종료될 경우, 데이터를 자동으로 폐기하거나 사람들에게 데이터를 운동으로 기록할지 물어보십시오.

**사람들이 움직이고 있을 때 텍스트를 읽을 수 있도록 하십시오.** 세션이 움직임을 요구할 경우, 큰 서체 크기, 고대비 색상을 사용하고, 텍스트를 정렬하여 가장 중요한 정보를 읽기 쉽게 하십시오.

**활동 링을 올바르게 사용하십시오.** 활동 링 보기는 Apple이 디자인한 요소로서 하나 또는 두 개의 링을 포함하며, 색상 및 의미가 활동 앱과 일치합니다. 기록된 목적에 대해서만 사용하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS 또는 watchOS에 대한 추가 고려 사항은 없습니다. macOS, tvOS 또는 visionOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[활동 링](https://developer.apple.com/kr/design/human-interface-guidelines/activity-rings)

#### Developer 문서

[WorkoutKit](https://developer.apple.com/documentation/workoutkit)

[Workouts and activity rings](https://developer.apple.com/documentation/healthkit/workouts-and-activity-rings) — HealthKit

#### 비디오

- [iOS 및 iPadOS에서 HealthKit을 사용하여 운동 기록 추적하기](https://developer.apple.com/kr/videos/play/wwdc2025/322) — iOS에서 훌륭한 운동 경험을 구축하는 모범 사례를 알아보세요. 운동 세션의 수명 주기를 검토하고, Apple Watch와 iPhone으로 운동했을 때의 차이점을 알아보며, 실시간 현황 및 Siri를 사용하여 앱의 잠금 화면 경험을 향상시키는 방법을 살펴보세요.
- [WorkoutKit으로 맞춤형 운동 구축하기](https://developer.apple.com/kr/videos/play/wwdc2023/10016) — WorkoutKit을 사용하면 Apple Watch의 운동 앱에서 운동 일정을 생성하고 미리 보며 계획할 수 있습니다. 맞춤형 구간을 구축하고 알림을 생성하고 내장된 미리보기 UI를 사용해 Apple Watch로 여러분만의 운동 루틴을 전송하는 방법을 알아보세요.
- [Apple Watch용 운동 앱 개발하기](https://developer.apple.com/kr/videos/play/wwdc2021/10009) — 이 코딩 실습에서는 SwiftUI와 HealthKit을 사용하여 새 운동 앱을 제작합니다. 타임라인으로 운동 수치를 업데이트하여 화면 상시표시 상태를 지원하는 방법을 알아보세요. 운동 앱의 디자인 모범 사례도 살펴봅니다.
