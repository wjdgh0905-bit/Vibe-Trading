# AirPlay

Source: https://developer.apple.com/kr/design/human-interface-guidelines/airplay

> AirPlay를 사용하면 iOS, iPadOS, macOS, tvOS 기기에서 AirPlay를 지원하는 Apple TV, HomePod, TV, 스피커로 미디어 콘텐츠를 무선으로 스트리밍할 수 있습니다.

![AirPlay 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-AirPlay-intro@2x.png)

## 모범 사례

**가급적 시스템에서 제공하는 미디어 플레이어를 사용하십시오.** 내장 미디어 플레이어는 표준 제어기 세트를 제공하고 챕터 이동, 자막, 청각 장애인용 자막, AirPlay 스트리밍과 같은 기능을 지원합니다. 또한 구현하기 쉬울 뿐만 아니라 시스템 전반에 걸쳐 일관되고 친숙한 재생 경험을 제공하며 대부분의 미디어 앱 요구 사항을 수용합니다. 시스템에서 제공하는 플레이어가 앱의 요구 사항을 충족하지 않는 경우에만 사용자 설정 비디오 플레이어를 디자인하는 것이 좋습니다. 개발자 지침을 보려면 [AVPlayerViewController](https://developer.apple.com/documentation/avkit/avplayerviewcontroller)의 내용을 참조하십시오.

![비디오를 재생하다가 일시 정지 중인 시스템에서 제공하는 미디어 플레이어의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/airplay-video-screen@2x.png)

**가능한 최고 해상도로 콘텐츠를 제공하십시오.** 각자 사용 중인 기기에 적합한 해상도로 콘텐츠를 경험할 수 있도록 [HTTP Live Streaming](https://developer.apple.com/documentation/http-live-streaming)(HLS) 플레이리스트에서 다양한 해상도를 제공해야 합니다(AVFoundation은 기기에 따라 자동으로 해상도를 선택함). 제공되는 해상도가 다양하지 않으면, 더 높은 해상도를 지원하는 기기에서 스트리밍할 때 콘텐츠 화질이 저하되어 보입니다. 예를 들어, iPhone에서 720p로 선명하게 보이는 콘텐츠를 AirPlay를 통해 4K TV로 스트리밍하면 품질이 낮아 보입니다.

**사람들이 기대하는 콘텐츠만 스트리밍하십시오.** 앱 자체의 맥락 내에서만 이해되는 백그라운드 루프 및 짧은 비디오 경험과 같은 콘텐츠는 가급적 스트리밍하지 마십시오. 개발자 지침을 보려면 [usesExternalPlaybackWhileExternalScreenIsActive](https://developer.apple.com/documentation/avfoundation/avplayer/usesexternalplaybackwhileexternalscreenisactive)의 내용을 참조하십시오.

**AirPlay 스트리밍과 미러링을 모두 지원하십시오.** 두 기능을 모두 지원하면 최대한의 유연성을 제공할 수 있습니다.

**원격 제어기 이벤트를 지원하십시오.** 이를 지원할 경우 잠금 화면에서 Siri 또는 HomePod과의 상호 작용을 통해 재생, 일시 정지, 앞으로 빨리감기 등의 동작을 선택할 수 있습니다. 개발자 지침을 보려면 [Remote command center events](https://developer.apple.com/documentation/mediaplayer/remote-command-center-events)의 내용을 참조하십시오.

**앱이 백그라운드로 전환되거나 기기가 잠겨도 재생을 중지하지 마십시오.** 예를 들어 사람들은 메일을 확인하거나 기기를 잠자기 모드로 전환하는 동안에도 앱에서 스트리밍한 TV 프로그램을 계속 보고 싶어합니다. 이러한 경우 사람들은 분명하게 선택한 경우가 아니라면 기기에서 다른 콘텐츠를 스트리밍하는 것을 원하지 않으므로 자동 미러링을 실행하지 않는 것도 중요합니다.

**앱에서 몰입형 콘텐츠를 재생하기 시작한 경우를 제외하고 다른 앱에서 재생을 중단하지 마십시오.** 예를 들어 앱을 실행할 때 비디오를 재생하거나 앱에서 인라인 비디오를 자동 재생하는 경우 현재 재생을 계속 이어가도록 허용하면서 로컬 기기에서만 이 콘텐츠를 재생하십시오. 개발자 지침을 보려면 [ambient](https://developer.apple.com/documentation/avfaudio/avaudiosession/category-swift.struct/ambient)의 내용을 참조하십시오.

**재생 중에도 앱을 자유롭게 사용할 수 있도록 하십시오.** AirPlay가 활성화되어도 앱을 작동할 수 있어야 합니다. 재생 화면에서 벗어나 탐색할 때 앱 내 다른 비디오가 재생되거나 스트리밍 중인 콘텐츠가 중단되지 않도록 하십시오.

**필요한 경우 미디어 재생을 제어할 수 있는 사용자 설정 인터페이스를 제공하십시오.** 시스템에서 제공하는 미디어 플레이어를 사용할 수 없는 경우 사람들이 AirPlay를 시작할 수 있는 직관적인 방법을 제공하는 사용자 설정 미디어 플레이어를 만들 수 있습니다. 이 작업을 수행하려면 재생을 시작한 경우, 재생 중인 경우, 재생할 수 없는 경우를 알리는 고유한 시각적 상태를 포함하여 시스템 제공 버튼의 모양과 동작에 맞춘 사용자 설정 버튼을 제공해야 합니다. AirPlay를 시작하는 사용자 설정 제어기에는 Apple에서 제공하는 기호만 사용해야 하며 AirPlay 아이콘은 사용자 설정 플레이어가 있는 오른쪽 하단 모서리에 정확하게 배치하십시오(iOS 16 및 iPadOS 16 이상).

## AirPlay 아이콘 사용하기

AirPlay 아이콘은 [Resources](https://developer.apple.com/design/resources/)에서 다운로드할 수 있습니다. 앱에 AirPlay 아이콘을 표시하는 옵션은 다음과 같습니다.

### 검은색 AirPlay 아이콘

다른 기술 아이콘이 검은색으로 표시되는 경우 흰색 또는 밝은 배경에 검은색 AirPlay 아이콘을 사용합니다.

![두 개의 검은색 AirPlay 아이콘. 왼쪽은 세 개의 동심원 아래에 삼각형이 있는 오디오 AirPlay 아이콘임. 오른쪽은 모서리가 둥근 한 개의 직사각형 아래에 삼각형이 있는 비디오 AirPlay 아이콘임.](https://developer.apple.com/images/com.apple.HIG/kr/airplay-black-icon-set@2x.png)

### 흰색 AirPlay 아이콘

다른 기술 아이콘이 흰색으로 표시되는 경우 검은색 또는 어두운 배경에 흰색 AirPlay 아이콘을 사용합니다.

![두 개의 흰색 AirPlay 아이콘. 왼쪽은 세 개의 동심원 아래에 삼각형이 있는 오디오 AirPlay 아이콘임. 오른쪽은 모서리가 둥근 한 개의 직사각형 아래에 삼각형이 있는 비디오 AirPlay 아이콘임.](https://developer.apple.com/images/com.apple.HIG/kr/airplay-white-icon-set@2x.png)

### 사용자 설정 색상 AirPlay 아이콘

다른 기술 아이콘이 표시되는 색상과 동일한 색상으로 사용자 설정 색상을 사용합니다.

![두 개의 파란색 AirPlay 아이콘. 왼쪽은 세 개의 동심원 아래에 삼각형이 있는 오디오 AirPlay 아이콘임. 오른쪽은 모서리가 둥근 한 개의 직사각형 아래에 삼각형이 있는 비디오 AirPlay 아이콘임.](https://developer.apple.com/images/com.apple.HIG/kr/airplay-custom-color-icon-set@2x.png)

**AirPlay 아이콘을 다른 기술 아이콘과 일관된 형식으로 배치하십시오.** 다른 기술 아이콘을 도형 안에 표시할 경우 AirPlay 아이콘도 동일한 방식으로 표시합니다.

**사용자 설정 버튼 또는 대화식 요소에 AirPlay 아이콘이나 이름을 사용하지 마십시오.** 비대화식 요소에만 *AirPlay* 아이콘과 이름을 사용합니다.

**아이콘을 *AirPlay* 이름과 올바르게 페어링하십시오.** 다른 기술도 이러한 방식으로 언급하는 경우 아이콘 아래 또는 옆에 이름을 표시할 수 있습니다. 레이아웃의 다른 부분에 사용된 서체와 동일한 서체를 사용합니다. AirPlay 아이콘을 텍스트 중간에 사용하거나 *AirPlay* 이름을 대신하여 사용하지 마십시오.

**AirPlay보다 앱을 강조하십시오.** 앱 이름이나 기본 특성에 대한 언급보다 AirPlay에 대한 언급이 더 강조되지 않도록 합니다.

## AirPlay 언급하기

***AirPlay*라는 용어를 사용할 때는 올바른 대문자 표기법을 사용하십시오.** *AirPlay*는 대문자 *A*, 대문자 *P*와 나머지는 소문자로 이루어진 한 단어입니다. 레이아웃에 모두 대문자로만 표시되어 있는 경우, *AirPlay*를 다른 레이아웃 스타일에 맞게 모두 대문자로 표시할 수 있습니다.

***AirPlay*를 항상 명사로 사용하십시오.**

|  | 텍스트 예시 |
| --- | --- |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | AirPlay를 사용하여 스피커로 듣기 |
| ![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png) | 스피커로 AirPlay하기 |
| ![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png) | [앱 이름]과 함께 AirPlay할 수 있음 |

***연동*, *사용*, *지원* 또는 *호환*과 같은 용어를 사용합니다.**

|  | 텍스트 예시 |
| --- | --- |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | [앱 이름]이 AirPlay와 호환됨 |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | AirPlay 지원 스피커 |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | [앱 이름]과 함께 AirPlay를 사용할 수 있음 |
| ![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png) | [앱 이름]을 AirPlay함 |

**원하는 경우 *AirPlay* 이름에 *Apple* 이름을 함께 사용하십시오.**

|  | 텍스트 예시 |
| --- | --- |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | Apple AirPlay와 호환 |

**해당하는 경우 AirPlay를 언급하여 더욱 명확하게 설명하십시오.** 콘텐츠가 AirPlay와 관련된 경우 Airplay를 언급하여 의미를 명확히 할 수 있습니다. 기술 사양에도 AirPlay를 언급할 수 있습니다.

|  | 텍스트 예시 |
| --- | --- |
| ![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | 이제 [앱 이름]에서 AirPlay를 지원함 |

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS 또는 visionOS에 대한 추가 고려 사항은 없습니다. watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[Resources](https://developer.apple.com/design/resources/)

[Apple Trademark List](https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html)

[Guidelines for Using Apple Trademarks and Copyrights](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)

#### Developer 문서

[AVFoundation](https://developer.apple.com/documentation/avfoundation)

[AVKit](https://developer.apple.com/documentation/avkit)

#### 비디오

- [AirPlay 2로 큰 화면에 연결하기](https://developer.apple.com/kr/videos/play/wwdc2019/501) — AirPlay 기능은 Apple 기기의 동영상, 사진, 음악, 그 밖에 다양한 콘텐츠를 Apple TV, 즐겨 쓰는 스피커, 인기 스마트 TV로 감상할 수 있게 해줍니다. 긴 형식의 콘텐츠를 위한 자동 경로 선택, 원격 제어, 지금 재생 중 메타데이터, 비디오 화질 고려 사항 등 AirPlay 비디오에서 최상의 경험을 제공하는 방법을 알아보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 5월 2일 | 지침을 한 페이지에 통합함. |
