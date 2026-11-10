# HealthKit

Source: https://developer.apple.com/kr/design/human-interface-guidelines/healthkit

> HealthKit은 iOS, iPadOS, watchOS의 건강 및 피트니스 데이터를 저장하는 중앙 저장소입니다.

![HealthKit 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-HealthKit-intro@2x.png)

HealthKit을 지원하는 앱의 경우, 건강 정보에 접근하고 업데이트할 수 있는 권한을 요청할 수 있습니다.

> **중요:** 앱에서 건강 및 피트니스 기능을 제공하지 않는 경우 개인 건강 데이터에 대한 접근 권한을 요청하면 안 됩니다.

예를 들어 영양 앱에서는 칼로리 소비 목표를 정의하고 식단을 추천하기 위해 체중 및 활동 데이터를 검색할 수 있는 권한을 요청할 수 있습니다. 이러한 경우 영양 앱은 기록된 칼로리와 같은 데이터를 HealthKit에 보낼 수도 있으며 HealthKit은 이 데이터를 글로벌 진행 지표에 포함시킬 수 있습니다.

![iPhone용 건강 앱의 요약 화면 스크린샷. 활동, 활동 에너지, 계단 이동 속도, 심박수, 휴식 에너지, 일어서기 시간의 현재 데이터가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/health-summary@2x.png)

개발자 지침을 보려면 [HealthKit](https://developer.apple.com/documentation/healthkit)의 내용을 참조하십시오.

## 개인정보 보호

사람들의 데이터에 접근하려면 권한을 요청해야 하며 필요한 모든 조치를 취해 해당 데이터를 보호해야 합니다. 권한이 허용되면 데이터를 활용하는 방식을 명확하게 보여주어 사람들의 신뢰를 유지하는 것이 중요합니다. 개발자 지침을 보려면 [Protecting user privacy](https://developer.apple.com/documentation/healthkit/protecting-user-privacy)의 내용을 참조하십시오.

**일관된 개인정보 처리방침을 제공하십시오.** 앱을 제출하는 과정에서 URL을 제공하여 App Store의 앱 페이지에서 링크를 클릭했을 때 명확하게 명시된 개인정보 처리방침을 볼 수 있도록 하십시오. 개발자 지침을 보려면 [App Information > App Store Connect Help](https://help.apple.com/app-store-connect/#/dev219b53a88)의 내용을 참조하십시오.

**필요한 경우에만 건강 데이터에 대한 접근 권한을 요청하십시오.** 예를 들어, 사람들이 체중을 기록할 때 체중 정보에 대한 접근을 요청해야지 앱이 실행되자마자 접근을 요청하는 것은 적합하지 않습니다. 접근 요청이 현재 상황과 명확한 관련이 있으면 사람들이 앱의 의도를 더 잘 이해할 수 있습니다. 또한 부여된 권한은 변경될 수 있으므로 앱에 접근해야 할 때마다 권한을 요청해야 합니다. 개발자 지침을 보려면 [requestAuthorization(toShare:read:completion:)](https://developer.apple.com/documentation/healthkit/hkhealthstore/requestauthorization(toshare:read:completion:))의 내용을 참조하십시오.

**표준 권한 화면에 설명 메시지를 추가하여 앱의 의도를 명확히 밝히십시오.** 사람들은 건강 데이터에 대한 접근을 승인하라는 요청을 받을 때 시스템에서 제공하는 권한 화면이 보일 것이라고 예상합니다. 해당 정보가 필요한 이유와 해당 정보를 앱에 공유했을 때 얻을 수 있는 이점을 설명하는 몇 가지 간결한 문장을 작성하십시오. 표준 권한 화면의 동작이나 내용이 반복되는 사용자 설정 화면을 추가하지 않도록 합니다.

![iPhone용 건강 접근 화면의 스크린샷. 앱에 마음 챙기기 시간 데이터를 쓰고 읽을 수 있는 권한을 부여하도록 요청하고 있음.](https://developer.apple.com/images/com.apple.HIG/kr/health-access-requests@2x.png)

**시스템의 개인정보 보호 설정을 통해서만 건강 데이터 공유를 관리하십시오.** 사람들은 설정 > 개인정보 보호에서 본인의 건강 정보에 대한 접근 권한을 전역으로 관리할 수 있다고 예상합니다. 건강 데이터 흐름에 영향을 미치는 추가 화면을 앱에 구축하지 마십시오. 이는 혼란을 야기합니다.

## 활동 링

활동 링 요소를 표시하여 움직이기, 운동하기, 일어서기 목표에 대한 진행 상황을 보여줌으로써 앱의 건강 관련 서비스를 강화할 수 있습니다. 활동 앱은 각 링의 위치와 색상을 정의하여 사람들이 해당 요소를 알아보고 그 의미를 이해하도록 합니다.

![iPhone용 활동 앱의 기록 화면 스크린샷. 6월 전체와 7월 일부의 일일 활동 링 진행 상황이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/activity-months@2x.png)

**활동 링은 움직이기, 운동하기 및 일어서기 정보용으로만 사용하십시오.** 활동 링은 해당 특정 영역의 진행 상황을 일관적으로 나타냅니다. 활동 링을 다른 목적으로 복제 또는 수정하거나 다른 데이터 유형을 표시하려고 하지 마십시오. 움직이기, 운동하기 및 일어서기 진행 상황을 다른 링 모양의 요소에 표시하지 마십시오.

**활동 링을 사용하여 한 명의 진행 상황을 표시하십시오.** 활동 링으로 두 명 이상의 데이터를 표시하지 말고, 레이블, 사진 또는 아바타를 사용하는 등의 방법을 통해 누구의 진행 상황을 표시하는지 명확히 나타내십시오.

**활동 링을 장식에 사용하지 마십시오.** 활동 링은 단순히 앱의 디자인을 장식하는 것이 아니라 사람들에게 정보를 제공하는 기능입니다. 레이블 또는 배경 그래픽에 활동 링을 표시하지 마십시오.

**활동 링을 브랜딩에 사용하지 마십시오.** 활동 링을 엄격하게 사용하여 앱에서 활동 진행 상황을 표시하십시오. 앱의 아이콘 또는 마케팅 자료에 활동 링을 사용하지 마십시오.

**활동 링과 배경 색상을 유지하십시오.** 일관적인 사용자 경험을 위해 활동 링이 나타나는 상황과 관계없이 활동 링의 시각적 모양은 항상 동일해야 합니다. 필터를 사용하거나, 색상을 변경하거나, 불투명도를 수정하여 링 또는 배경 모양을 변경하지 마십시오. 대신, 링과 매끄럽게 어우러지도록 주변 인터페이스를 설계하십시오. 예를 들어, 링을 원 안에 넣으십시오. 링 연결이 끊어지거나 동떨어져 보이지 않도록 항상 활동 링의 크기를 적절하게 조절하십시오.

**활동 링 여백을 유지하십시오.** 활동 링 요소에는 링 사이의 거리만큼의 최소 외부 여백이 포함되어야 합니다. 다른 요소가 이 여백 또는 링 자체를 자르거나 방해하거나 침범하도록 허용하지 마십시오. 활동 링 요소를 원 안에 표시하려면 원형 마스크를 적용하는 대신 둘러싸는 보기의 모서리 반경을 조절하십시오.

**다른 링 모양의 요소를 활동 링과 구분하십시오.** 다른 링 스타일이 섞이면 시각적으로 혼란을 주는 인터페이스로 이어질 수 있습니다. 다른 링을 포함해야 하는 경우, 패딩, 선 또는 레이블을 사용하여 활동 링과 분리하십시오. 색상 및 크기 조절도 시각적 분리를 제공하는 데 도움이 될 수 있습니다.

**활동 알림에만 앱별 정보를 제공하십시오.** 시스템에서 이미 움직이기, 운동하기, 일어서기 진행 상황을 업데이트하여 제공합니다. 동일한 정보를 반복하여 제공하지 말고 앱 알림에 활동 링 요소를 표시하지 마십시오. 알림에서 활동 진행 상황을 참조하는 것은 괜찮지만 시스템에서 제공하는 정보를 그대로 반복하는 방식이 아닌 앱에 특정한 방식으로 참조하십시오.

개발자 지침을 보려면 [HKActivityRingView](https://developer.apple.com/documentation/healthkitui/hkactivityringview)의 내용을 참조하십시오.

## Apple 건강 아이콘

Apple 건강 아이콘이 표시되면 앱이 HealthKit 및 건강 앱과 연동되는 것입니다. 다음 지침을 참조하면 아이콘을 올바르게 사용할 수 있습니다. 문구와 UI 텍스트에서 HealthKit과 건강 앱을 참조하는 방법을 알아보려면 [편집 지침](https://developer.apple.com/kr/design/human-interface-guidelines/healthkit#Editorial-guidelines)의 내용을 참조하십시오. 마케팅 커뮤니케이션에서 ‘Works with Apple Health’ 배지를 사용하는 방법을 알아보려면 [Works with Apple Health](https://developer.apple.com/health-fitness/works-with-apple-health/)의 내용을 참조하십시오.

![Eating Habits라는 앱의 온보딩 화면 스크린샷. Apple 건강 아이콘과 Eating Habits의 건강 데이터 동기화가 건강 관리에 어떤 도움을 주는지 설명하는 텍스트가 표시됨. 화면 하단에는 건강 데이터 동기화 버튼과 지금은 건너뛰기 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/health-icon-onboard-screen@2x.png)

**Apple에서 제공하는 아이콘만 사용하십시오.** 자체 Apple 건강 아이콘 디자인을 만들거나 Apple에서 제공하는 디자인을 모방해서는 안 됩니다. [Apple Design Resources](https://developer.apple.com/design/resources/#technologies)에서 Apple 건강 앱 아이콘을 다운로드하십시오.

***Apple 건강*이라는 이름을 Apple 건강 아이콘 가까이에 표시하십시오.** 두 요소를 서로 가까이 표시하면 해당 아이콘이 건강 앱을 의미한다는 것을 안내할 수 있습니다.

**Apple 건강 아이콘을 다른 건강 관련 앱 아이콘과 일관되게 표시하십시오.** 다른 앱 아이콘이 표시되는 보기에서 Apple 건강 아이콘을 다른 아이콘보다 작게 보이지 않도록 하십시오.

**Apple 건강 아이콘을 버튼으로 사용하지 마십시오.** 아이콘은 건강 앱과의 호환성을 안내하는 용도로만 사용합니다.

**Apple 건강 아이콘 모양을 변경하지 마십시오.** 아이콘 본래 모양을 가리고 모서리 반경을 변경하거나 원형 모양으로 표시하지 마십시오. 테두리, 색상 오버레이, 그라디언트, 그림자 또는 기타 시각적 효과를 더해 아이콘을 꾸미지 마십시오.

**Apple 건강 아이콘 주변에 1/10 높이 정도의 최소 여백을 유지하십시오.** 아이콘을 다른 그래픽 요소와 합성하지 마십시오.

**Apple 건강 아이콘을 텍스트 중간에 사용하거나 *건강*, *Apple 건강* 또는 *HealthKit* 단어를 대신하여 사용하지 마십시오.** 텍스트에서 건강 앱과 HealthKit을 적절하게 참조하는 방법을 알아보려면 [편집 지침](https://developer.apple.com/kr/design/human-interface-guidelines/healthkit#Editorial-guidelines)의 내용을 참조하십시오.

**건강 앱의 이미지 또는 스크린샷을 표시하지 마십시오.** 모든 Apple 이미지와 마찬가지로 이러한 디자인도 저작권으로 보호되므로 앱이나 마케팅 자료에 표시하면 안 됩니다. 앱에는 움직이기, 운동하기, 일어서기 진행 상황을 표시하는 활동 링을 추가할 수 있습니다. 지침을 보려면 [활동 링](https://developer.apple.com/kr/design/human-interface-guidelines/healthkit#Activity-rings)의 내용을 참조하십시오.

## 편집 지침

**건강 앱을 *Apple 건강* 또는 *Apple 건강 앱*으로 참조하십시오.** 앱과 마케팅 텍스트에서 *Apple 건강*을 사용하면 내용이 더 명확해집니다.

***HealthKit*이라는 단어를 사용하지 마십시오.** *HealthKit*은 앱에서 건강 데이터에 접근할 때 사용하는 프레임워크의 이름을 지정하는 개발자 전용 단어입니다. 앱과 데이터가 어떻게 연동되는지 설명해야 하는 경우 *Apple 건강 앱*이라는 용어를 사용하십시오. 예를 들어 ‘Apple 건강 앱과 연동’ 또는 ‘Apple 건강 앱의 데이터 사용’이라고 하면 됩니다.

***Apple Health*라는 용어를 사용할 때는 올바른 대문자 표기법을 사용하십시오.** *Apple Health*는 대문자 *A*, 대문자 *H*와 나머지는 소문자로 이루어진 한 단어입니다. 모든 텍스트를 대문자로 표시하는 앱과 같이 지정된 타이포그래픽 인터페이스 스타일을 준수해야 하는 경우에만 *Apple Health* 전체를 대문자로 표시할 수 있습니다.

**혼동되지 않도록 시스템에서 제공하는 *Health* 번역 버전을 사용하십시오.** 현재 사용하는 기기에서 보는 번역 버전으로 Apple 건강 앱을 참조하는 것이 가장 좋습니다.

## 플랫폼 고려 사항

*iOS, iPadOS 또는 watchOS에 대한 추가 고려 사항은 없습니다. macOS, tvOS 또는 visionOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[Works with Apple Health](https://developer.apple.com/health-fitness/works-with-apple-health/)

[활동 링](https://developer.apple.com/kr/design/human-interface-guidelines/activity-rings)

[Apple Design Resources](https://developer.apple.com/design/resources/#technologies)

#### Developer 문서

[HealthKit](https://developer.apple.com/documentation/healthkit)

[Protecting user privacy](https://developer.apple.com/documentation/healthkit/protecting-user-privacy) — HealthKit

#### 비디오

- [HealthKit 운동 영역을 사용해 운동 인사이트 제공하기](https://developer.apple.com/kr/videos/play/wwdc2026/207) — HealthKit을 사용하면 앱에서 심박수 및 사이클링 파워 영역과 같은 운동 인사이트를 더 쉽게 제공할 수 있습니다. 내장된 맞춤형 영역을 활용하거나 맞춤형 영역을 생성하는 방법을 알아보세요. 현재 운동 영역과 각 영역에서의 소요 시간을 사용하여 운동 중 및 운동 후에 의미 있는 지침을 제공하는 방법을 살펴보세요.
- [HealthKit Medications API 만나보기](https://developer.apple.com/kr/videos/play/wwdc2025/321) — HealthKit에서 새로운 Medications API를 확인하세요. 새로운 API를 사용하는 예제 앱을 살펴보고, 의약품 및 투여 정보에 액세스하는 방법을 학습하며, 앱이 이와 같은 새로운 유형의 데이터 승인을 관리하는 방법을 알아보세요.
- [iOS 및 iPadOS에서 HealthKit을 사용하여 운동 기록 추적하기](https://developer.apple.com/kr/videos/play/wwdc2025/322) — iOS에서 훌륭한 운동 경험을 구축하는 모범 사례를 알아보세요. 운동 세션의 수명 주기를 검토하고, Apple Watch와 iPhone으로 운동했을 때의 차이점을 알아보며, 실시간 현황 및 Siri를 사용하여 앱의 잠금 화면 경험을 향상시키는 방법을 살펴보세요.
