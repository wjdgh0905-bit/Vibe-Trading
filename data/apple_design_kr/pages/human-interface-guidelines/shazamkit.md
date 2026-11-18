# ShazamKit

Source: https://developer.apple.com/kr/design/human-interface-guidelines/shazamkit

> ShazamKit는 오디오 샘플을 ShazamKit 카탈로그 또는 사용자 설정 오디오 카탈로그와 일치시켜 오디오 인식을 지원합니다.

![ShazamKit 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-ShazamKit-intro@2x.png)

ShazamKit를 사용하여 다음과 같은 기능을 제공할 수 있습니다.

- 현재 재생 중인 음악 장르에 맞는 그래픽으로 경험 향상하기
- 오디오와 동기화되는 자막 또는 수어를 제공하여 청각 장애를 지닌 사람들이 미디어 콘텐츠에 접근할 수 있도록 하기
- 온라인 학습 및 소매업과 같은 맥락에서 가상 콘텐츠와 앱내 경험 동기화하기

앱이 인식할 오디오 샘플을 얻기 위해 기기 마이크가 필요한 경우, 마이크 접근을 요청해야 합니다. 모든 유형의 권한 요청과 마찬가지로 왜 접근을 요청하는지 사람들이 이해하도록 돕는 것이 중요합니다. 지침을 보려면 [개인정보 보호](https://developer.apple.com/kr/design/human-interface-guidelines/privacy)의 내용을 참조하십시오.

![iPhone에서 Math School 앱의 권한 경고 스크린샷. ‘Math School이(가) 마이크에 접근하려고 합니다. 읽기 및 수학 문제를 선생님이 재생하는 비디오와 동기화합니다.’라는 경고. 사용할 수 있는 두 개의 버튼이 있으며, ‘지금 안 함’ 및 ‘허용’임.](https://developer.apple.com/images/com.apple.HIG/kr/shazamkit-mic-permission@2x.png)

## 모범 사례

ShazamKit를 사용하는 기능에 대해 마이크 접근 권한을 받은 후에는 이 지침을 따르십시오.

**가능한 한 빨리 녹음을 중단하십시오.** 사람들이 앱에서 오디오를 인식할 수 있도록 녹음을 허용하는 경우 마이크가 계속 켜져 있다고 예상하지 않습니다. 개인정보를 보호하기 위해 필요한 샘플을 얻는 데 걸리는 시간 동안만 녹음하십시오.

**사람들이 앱에서 인식된 노래를 iCloud 보관함에 저장할지 여부를 선택할 수 있도록 하십시오.** 앱이 인식된 노래를 iCloud에 저장할 수 있는 경우 먼저 사람들에게 이 동작을 승인할 수 있는 방법을 제공하십시오. 음악 인식 제어기 및 Shazam 앱 모두 앱을 인식된 노래의 소스로 표시하지만, 사람들은 보관함에 콘텐츠를 저장할 수 있는 앱을 제어하고 싶어 합니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

## 리소스

#### Developer 문서

[ShazamKit](https://developer.apple.com/documentation/shazamkit)

#### 비디오

- [ShazamKit 살펴보기](https://developer.apple.com/kr/videos/play/wwdc2021/10044) — ShazamKit을 사용하면 앱 내에서 Shazam의 정확한 오디오 인식 기능을 활용할 수 있습니다. 앱에서 캡처한 비디오의 배경에서 재생 중인 노래를 빠르고 정확하게 인식하고, 방에서 재생 중인 음악을 기반으로 동적 시각 효과를 제공하거나 외부 오디오와 동기화하여 연동 앱 경험을 제공하는 등 방대한 Shazam 카탈로그를 활용하여 다양한 경험을 만드는 방법을 알아보세요. 또한 ShazamKit 내에서 모든 오디오 소스를 인식하도록 맞춤화 카탈로그를 기기에 구축하는 방법을 보여드립니다. 더 자세히 알아보려면 ‘ShazamKit으로 맞춤형 오디오 경험 만들기’를 확인하여 함께 코딩하면서 스트리밍된 비디오 콘텐츠와 완벽하게 동기화되는 교육 앱을 구축하는 방법을 배워보세요.
