# 손쉬운 사용

Source: https://developer.apple.com/kr/design/human-interface-guidelines/accessibility

> 손쉽게 사용이 가능한 사용자 인터페이스를 적용하면 앱 또는 게임을 사용하는 모든 사람에게 탁월한 경험을 제공할 수 있습니다.

![손쉬운 사용 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 노란색을 은은하게 반영하는 노란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/foundations-accessibility-intro@2x.png)

접근성을 염두에 두고 디자인한다면 더 넓은 사용자를 대상으로 하고 더 포용적인 경험을 제공할 수 있습니다. 접근성이 높은 인터페이스가 있다면 사람들은 자신의 능력이나 기기를 사용하는 방법과 무관하게 앱 또는 게임을 경험할 수 있습니다. 손쉬운 사용을 통해 모든 사람에게 정보 및 상호작용을 제공할 수 있습니다. 접근성 높은 인터페이스란 다음 특성을 갖습니다.

- **직관적.** 인터페이스가 작업을 간단하고 직접적으로 수행할 수 있게 해주는 친숙하고 일관적인 상호작용을 지원합니다.
- **인식 용이성.** 인터페이스가 정보를 전달할 때 단일 방법에 의존하지 않습니다. 사람들은 시각, 청각, 음성 또는 촉각 중 어느 것을 사용하든지 콘텐츠에 접근하고 상호작용할 수 있습니다.
- **적응성.** 인터페이스가 시스템 손쉬운 사용 기능 또는 설정 사용자화를 지원하는 등 사람들이 기기를 사용하려는 방법에 적응합니다.

앱을 디자인할 때 인터페이스의 접근성을 검사하십시오. [Accessibility Inspector](https://developer.apple.com/documentation/accessibility/accessibility-inspector)를 사용하여 인터페이스와 관련된 접근성 문제를 발견하고, 시스템의 손쉬운 사용 기능을 사용하는 사람들에게 앱이 어떻게 표시되는지 파악할 수 있습니다. 또한 App Store에서 ‘손쉬운 사용 지원 여부 표시 레이블’을 사용하여 앱의 접근성이 어느 정도 수준인지 관련 정보를 전달할 수 있습니다. 손쉬운 사용 기능에 대한 지원을 평가하고 표시하는 방법을 자세히 알아보려면 App Store Connect 도움말에서 [Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)의 내용을 참조하십시오.

## 시각 지원

![텍스트 크기, 확대, VoiceOver 및 음성 대화를 나타내는 기호를 포함하여 시각 지원 주제와 관련된 다섯 가지 기호가 포함된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-vision-section-hero@2x.png)

인터페이스를 사용하는 사람들은 시각 장애가 있거나, 색맹이거나, 시력이 좋지 않거나 또는 빛에 민감할 수 있습니다. 조명 환경 및 화면 밝기가 인터페이스와 상호작용하는 데 영향을 미치는 상황에 처할 수도 있습니다.

**더 큰 텍스트를 지원하십시오.** 더 쉽고 편하게 읽거나 볼 수 있도록 텍스트 또는 아이콘의 크기를 조절할 수 있게 하십시오. 텍스트를 최소 200퍼센트(또는 watchOS 앱의 경우 140퍼센트) 확대하는 옵션을 제공하는 것이 좋습니다. 사용자 설정 UI 또는 다이나믹 타입을 사용하여 인터페이스에서 서체 크기 확대를 지원할 수 있습니다. 다이나믹 타입은 시스템 전반적인 설정으로, 이를 통해 텍스트 크기를 편안하고 가독성 있게 조절할 수 있습니다. 자세한 지침을 보려면 [다이나믹 타입 지원하기](https://developer.apple.com/kr/design/human-interface-guidelines/typography#Supporting-Dynamic-Type)의 내용을 참조하십시오.

**사용자 설정 타입 크기에는 권장 기본값을 사용하십시오.** 플랫폼마다 가독성을 높이기 위해 시스템에서 정의하는 타입 스타일의 기본 및 최소 크기가 다릅니다. 사용자 설정 타입 스타일을 사용하는 경우, 권장 기본값을 따르십시오.

| 플랫폼 | 기본 크기 | 최소 크기 |
| --- | --- | --- |
| iOS, iPadOS | 17pt | 11pt |
| macOS | 13pt | 10pt |
| tvOS | 29pt | 23pt |
| visionOS | 17pt | 12pt |
| watchOS | 16pt | 12pt |

**서체 굵기는 텍스트의 가독성에 영향을 미칠 수도 있다는 점을 염두에 두십시오.** 굵기가 얇은 사용자 설정 서체를 사용하는 경우, 가독성을 높이려면 권장 크기보다 큰 서체를 사용하십시오. 자세한 지침을 보려면 [타이포그래피](https://developer.apple.com/kr/design/human-interface-guidelines/typography)의 내용을 참조하십시오.

![작은 서체 크기로 굵게 표시한 ‘안녕하세요’ 단어가 포함된 직사각형 보기의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-font-weight-small-bold@2x.png)

![큰 서체 크기로 얇게 표시한 ‘안녕하세요’ 단어가 포함된 직사각형 보기의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-font-weight-large-thin@2x.png)

**색상 대비 최소 기준을 충족하도록 노력하십시오.** 앱의 모든 정보를 가독성 있게 표시하려면 전경 텍스트 및 아이콘과 배경 색상 간에 대비가 충분해야 합니다. 색상 대비를 측정하는 데 널리 사용되는 두 가지 표준은 [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG/) 및 APCA(Accessible Perceptual Contrast Algorithm)입니다. 표준 대비 계산기를 사용하여 UI가 허용 가능한 수준을 충족하는지 확인하십시오. [Accessibility Inspector](https://developer.apple.com/documentation/accessibility/accessibility-inspector)는 앱의 색상이 허용 가능한 대비를 가지고 있는지 판단할 때 WCAG Level AA의 다음 값을 지침으로 사용합니다.

| 텍스트 크기 | 텍스트 굵기 | 최소 대비율 |
| --- | --- | --- |
| 최대 17pt | 모두 | 4.5:1 |
| 18pt | 모두 | 3:1 |
| 모두 | 볼드체 | 3:1 |

앱에서 이러한 최소 대비를 기본적으로 제공하지 않는다면 적어도 시스템 설정의 ‘대비 증가’가 켜졌을 때 더 높은 대비의 색상 체계를 제공하도록 하십시오. 앱이 [다크 모드](https://developer.apple.com/kr/design/human-interface-guidelines/dark-mode)를 지원하는 경우에는 라이트 및 다크 화면 모드 모두에서 최소 대비를 확인해야 합니다.

![제목 및 배경 간에 대비가 부족한 버튼의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibilty-button-poor-color-contrast@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![버튼의 제목 및 배경 간에 대비가 충분한 버튼의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibilty-button-good-color-contrast@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**가급적 시스템 정의된 색상을 사용하십시오.** 해당 색상에는 사람들이 ‘대비 증가’를 활성화하거나 라이트 모드 및 다크 모드 간에 전환하는 등 색상 선호도를 조절할 때 자동으로 적응하는 손쉬운 사용 변형이 각자 있습니다. 지침을 보려면 [색상](https://developer.apple.com/kr/design/human-interface-guidelines/color)의 내용을 참조하십시오.

![시스템 정의된 빨간색이 라이트 모드 및 다크 모드 배경에서 어떻게 나타나는지 보여주는 일러스트. 일러스트에서 모서리가 둥근 직사각형 위에 원이 위치함. 모서리가 둥근 직사각형의 왼쪽은 색상이 밝고 오른쪽은 어두움. 원의 왼쪽은 오른쪽에 비해 약간 어두움.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-system-red-ios-default@2x.png)

![시스템 정의된 손쉬운 사용 전용 빨간색이 라이트 모드 및 다크 모드 배경에서 어떻게 나타나는지 보여주는 일러스트. 일러스트에서 모서리가 둥근 직사각형 위에 원이 위치함. 모서리가 둥근 직사각형의 왼쪽은 색상이 밝고 오른쪽은 어두움. 원의 왼쪽은 오른쪽에 비해 훨씬 어두움.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-system-red-ios-accessible@2x.png)

**색상 외로도 정보를 전달하십시오.** 일부 사람들은 특정 색상 및 색조 간에 구분하는 데 어려움을 겪습니다. 예를 들어, 색맹인 사람들은 빨간색-녹색 및 파란색-주황색 등의 색 조합에서 특히 어려움을 겪을 수 있습니다. 색상 외에도 뚜렷한 모양 또는 아이콘 등 시각적 표시를 제공하여 기능의 차이 및 상태 변화를 인지할 수 있도록 하십시오. 사람들이 자신에게 편안한 방식으로 인터페이스를 개인 맞춤화할 수 있게 차트 색상 또는 게임 캐릭터와 같은 색상 체계를 사용자화할 수 있도록 지원하는 것도 좋습니다.

![빨간색 원 왼쪽에 초록색 원이 있는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-differentiate-with-shapes-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![X를 포함한 빨간색 팔각형 왼쪽에 체크 표시를 포함한 초록색 원이 있는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-differentiate-with-shapes-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**VoiceOver를 위해 앱의 인터페이스 및 콘텐츠를 설명하십시오.** VoiceOver는 화면을 보지 않아도 앱의 인터페이스를 경험할 수 있도록 돕는 화면 읽기 프로그램입니다. 자세한 지침을 보려면 [VoiceOver](https://developer.apple.com/kr/design/human-interface-guidelines/voiceover)의 내용을 참조하십시오.

## 듣기 지원

![소리, 파형 및 청각 장애인용 자막을 나타내는 기호를 포함하여 듣기 지원 주제와 관련된 다섯 가지 기호가 포함된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-hearing-section-hero@2x.png)

인터페이스를 사용하는 사람들은 청각에 장애가 있거나 난청이 있을 수 있습니다. 시끄러운 환경 또는 공공장소에 있을 수도 있습니다.

**오디오 및 비디오를 감상할 수 있는 텍스트 기반 방법을 지원하십시오.** 앱 또는 게임의 대사 및 중요한 정보를 오디오만으로 전달하지 않아야 합니다. 상황에 맞게 미디어를 경험할 수 있는 텍스트 기반의 다양한 방법을 제공하고, 시각적 표시를 사용자화할 수 있도록 하십시오.

- **캡션**은 비디오 또는 오디오 전용 콘텐츠에서 오디오 정보와 동일한 텍스트를 제공합니다. 캡션은 텍스트가 미디어와 실시간으로 동기화되는 게임의 중간 영상, 비디오 클립 등에 적합합니다.
- **자막**은 화면상의 실시간 대화를 자신이 선호하는 언어로 읽을 수 있도록 해줍니다. 자막은 TV 프로그램과 영화에 적합합니다.
- **오디오 설명**은 비디오의 메인 오디오에 존재하는 자연스러운 묵음 부분 사이에 배치되어 화면에만 표시되는 중요 정보에 대한 내래이션을 소리로 들려줍니다.
- **전사문**은 시각적 및 청각적 정보 모두를 포함하여 비디오에 대한 완전한 텍스트 설명을 제공합니다. 전사문은 팟캐스트와 오디오북 같은 긴 형식의 미디어에 적합합니다. 사람들이 전체 내용을 보거나 미디어가 재생될 때 전사문을 하이라이트하고 싶어 할 수 있기 때문입니다.

개발자 지침을 보려면 [Selecting subtitles and alternative audio tracks](https://developer.apple.com/documentation/avfoundation/selecting-subtitles-and-alternative-audio-tracks)의 내용을 참조하십시오.

**오디오 신호뿐만 아니라 햅틱도 사용하십시오.** 인터페이스가 오디오 신호(성공을 알리는 차임, 오류 사운드 또는 게임 피드백)를 통해 정보를 전달하는 경우, 오디오를 인식할 수 없거나 오디오를 꺼둔 사람들을 위해 해당 사운드를 햅틱과 페어링하는 것을 고려하십시오. iOS 및 iPadOS에서 [Music Haptics](https://developer.apple.com/documentation/mediaaccessibility/music-haptics) 및 [Audio graphs](https://developer.apple.com/documentation/accessibility/audio-graphs)를 사용하여 진동 및 텍스처로 음악 및 인포그래픽을 경험할 수 있도록 만들 수도 있습니다. 지침을 보려면 [햅틱 재생하기](https://developer.apple.com/kr/design/human-interface-guidelines/playing-haptics)의 내용을 참조하십시오.

![기기에서 음악이 재생되는 동안 iPhone 기기가 진동하는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-haptic-audio-combo@2x.png)

**시각적 신호로 오디오 신호를 강화하십시오.** 이는 중요한 콘텐츠가 화면 밖에서 발생할 수 있는 게임 및 공간 앱에서 특히 중요합니다. 오디오를 사용하여 특정 동작을 유도하는 경우, 상호작용이 필요한 위치로 안내하는 시각적 지표도 추가하십시오.

## 운동성 지원

![키보드, 움직임 및 터치를 나타내는 기호를 포함하여 운동성 지원 주제와 관련된 다섯 가지 기호가 포함된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-mobility-section-hero@2x.png)

인터페이스가 움직임 또는 운동성이 제한된 사람들에게 편안한 경험을 제공하는지 확인하십시오.

**충분한 크기의 제어기를 제공하십시오.** 너무 작은 제어기는 대다수 사람들이 상호작용하고 선택하기 어렵습니다. 제어기 및 메뉴를 편하게 탭하고 클릭할 수 있도록 각 플랫폼에서 권장하는 최소 제어기 크기를 최대한 충족하십시오.

| 플랫폼 | 기본 제어기 크기 | 최소 제어기 크기 |
| --- | --- | --- |
| iOS, iPadOS | 44x44pt | 28x28pt |
| macOS | 28x28pt | 20x20pt |
| tvOS | 66x66pt | 56x56pt |
| visionOS | 60x60pt | 28x28pt |
| watchOS | 44x44pt | 28x28pt |

**제어기 간 공간을 크기만큼 중요하게 고려하십시오.** 요소 사이에 패딩을 충분히 포함하여 제어기를 잘못 탭할 가능성을 줄이십시오. 일반적으로 베젤이 포함된 요소 주위에는 약 12포인트의 패딩을 추가하는 것이 좋습니다. 베젤이 없는 요소의 경우, 요소의 보이는 가장자리 주위에는 약 24포인트의 패딩을 추가하는 것이 좋습니다.

![되감기, 재생 및 빨리감기 버튼 3개를 보여주는 일러스트. 버튼 사이의 패딩이 충분하지 않음.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-controls-spacing-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![되감기, 재생 및 빨리감기 버튼 3개를 보여주는 일러스트. 버튼 사이에 패딩이 충분하고 간격이 떨어져 있음.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-controls-spacing-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**일반적인 상호작용에 간단한 제스처를 지원하십시오.** 장애 유무와 관계 없이 복잡한 제스처는 다수의 사람들에게 어렵게 느껴질 수 있습니다. 사람들이 앱 또는 게임에서 자주 수행하는 상호작용의 경우, 여러 손가락과 두 손을 사용하는 사용자 설정 제스처는 피하고 가장 간단한 제스처를 사용하여 반복해야 하는 동작이 편하고 기억하기 쉽도록 만드십시오.

**제스처에 대안을 제공하십시오.** 두 가지 이상의 물리적 상호작용 유형을 통해 UI의 핵심 기능에 접근할 수 있게 하십시오. 움직임이 제한된 사람들이 제스처를 수행하기 불편할 수 있기 때문에 동일한 결과를 얻을 수 있는 화면상을 방법을 제공하십시오. 예를 들어, 쓸어넘기기 제스처로 보기를 닫는 경우, 사람들이 탭하거나 보조 기기로 사용할 수 있는 버튼도 만드십시오.

![편집 모드 상태인 표 보기의 일러스트. 표 행에는 삭제 버튼이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-tap-to-delete@2x.png)

![표 보기의 일러스트. 표의 행 중 하나를 왼쪽으로 쓸어넘기자 삭제 버튼이 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-swipe-to-delete@2x.png)

**음성 명령을 사용하여 지침을 제시하고 음성으로 정보를 입력할 수 있게 허용하십시오.** 음성 명령을 사용하면 명령어를 말하는 것만으로 기기와 상호작용할 수 있습니다. 제스처를 수행하고 화면 요소와 상호작용하고, 텍스트를 받아쓰거나 편집하는 등 작업이 가능합니다. 매끄러운 경험을 위해 인터페이스 요소에 적절한 레이블을 지정하십시오. 개발자 지침을 보려면 [Voice Control](https://developer.apple.com/documentation/accessibility/voice-control)의 내용을 참조하십시오.

**Siri 및 단축어와 통합하여 음성만으로 작업을 수행할 수 있도록 만드십시오.** 앱이 Siri 및 단축어를 지원한다면 정기적으로 수행하는 중요한 반복 작업을 자동화할 수 있습니다. Siri, iPhone 또는 Apple Watch의 동작 버튼, 홈 화면 또는 제어 센터의 단축어로 해당 작업을 시작할 수 있습니다. 지침을 보려면 [Siri](https://developer.apple.com/kr/design/human-interface-guidelines/siri)의 내용을 참조하십시오.

**운동성 관련 손쉬운 사용 기능을 지원하십시오.** [VoiceOver](https://developer.apple.com/kr/design/human-interface-guidelines/voiceover), AssistiveTouch, 전체 키보드 접근, 포인터 제어 및 [Switch Control](https://developer.apple.com/documentation/accessibility/switch-control) 등 기능은 거동이 불편한 사람들이 기기와 상호작용할 수 있는 다른 방법을 제공합니다. 테스트를 수행하여 앱 또는 게임이 해당 기술을 지원하는지와 인터페이스 요소에 적절한 레이블이 지정되어 있는지 확인하여 탁월한 경험을 제공하십시오. 자세한 정보는 [Performing accessibility testing for your app](https://developer.apple.com/documentation/accessibility/performing-accessibility-testing-for-your-app)의 내용을 참조하십시오.

## 말하기 지원

![파형 및 말하기를 나타내는 기호를 포함하여 말하기 지원 주제와 관련된 다섯 가지 기호가 포함된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-speech-section-hero@2x.png)

Apple의 손쉬운 사용 기능을 사용하면 언어 장애가 있는 사람들과 텍스트 기반 상호작용을 선호하는 사람들이 기기를 사용하여 효과적으로 소통할 수 있습니다.

**키보드만 사용하여 앱을 탐색하고 상호작용할 수 있도록 하십시오.** 전체 키보드 접근을 켠 사람들은 물리적 키보드를 사용해 앱을 탐색할 수 있습니다. 시스템은 손쉬운 사용 키보드 단축키 외에도 많은 사람들이 자주 사용하는 다양한 범위의 다른 [keyboard shortcuts](https://support.apple.com/en-us/102650)도 정의합니다. 시스템에서 정의한 키보드 단축키를 재정의하지 말고 전체 키보드 접근을 사용했을 때 앱이 잘 작동하는지 확인하십시오. 추가 지침을 보려면 [키보드](https://developer.apple.com/kr/design/human-interface-guidelines/keyboards)의 내용을 참조하십시오. 개발자 지침을 보려면 [Support Full Keyboard Access in your iOS app](https://developer.apple.com/kr/videos/play/wwdc2021/10120)의 내용을 참조하십시오.

**스위치 제어를 지원하십시오.** 스위치 제어는 보조 기술로, 별도의 하드웨어, 게임 컨트롤러 또는 ‘쯧’, ‘펍’과 같은 소리로 기기를 제어할 수 있게 해줍니다. 앱 또는 게임에서 스위치 제어를 사용하여 탐색하는 기능을 지원하면 선택, 탭, 입력, 그리기와 같은 동작이 가능합니다. 개발자 지침을 보려면 [Switch Control](https://developer.apple.com/documentation/accessibility/switch-control)의 내용을 참조하십시오.

## 인식 지원

![음악, 보안 및 정보 계층 구조를 나타내는 기호를 포함하여 인식 지원 주제와 관련된 다섯 가지 기호가 포함된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-cognitive-section-hero@2x.png)

앱 또는 게임에서 복잡성을 최소화하면 모든 사람에게 장점이 제공됩니다.

**동작을 단순하고 직관적으로 설정하십시오.** 기억하기 쉽고 일관된 상호작용을 사용하여 인터페이스를 탐색할 수 있도록 하십시오. 학습하고 기억해야 하는 사용자 설정 제스처를 만드는 대신 사람들이 이미 익숙한 시스템 제스처 및 동작을 선호하십시오.

**시간이 제한된 인터페이스 요소를 최소화하십시오.** 시간 제한이 있어서 자동으로 닫히는 보기 및 제어기는 정보를 처리하는 데 오래 걸리는 사람이나 인터페이스를 탐색하는 데 시간이 더 필요한 보조 기술을 사용하는 사람에게 문제가 될 수 있습니다. 명시적인 동작으로 보기를 닫는 방식을 선호하십시오.

**게임에서 난이도 조절을 지원하는 것을 고려하십시오.** 게임을 플레이하고 즐기는 방식은 개인마다 다릅니다. 다양한 수준의 인지 능력을 지원할 수 있도록 게임의 난이도를 사용자화하는 기능을 추가하는 것을 고려하십시오. 레벨을 완료하는 데 필요한 기준을 줄이거나, 반응 시간을 조절하거나, 제어 보조 도구를 활성화하는 방법 등이 있습니다.

**오디오 및 비디오 재생을 제어할 수 있도록 하십시오.** 오디오 및 비디오 콘텐츠를 시작하고 중단할 수 있는 제어기를 제공하지 않으면서 자동 재생하지 마십시오. 해당 제어기가 눈에 띄고 쉽게 조작 가능하게 만들고, 모든 오디오 및 비디오의 자동 재생을 선택 해제할 수 있는 글로벌 설정을 추가할지 고려하십시오. 개발자 지침을 보려면 [Animated images](https://developer.apple.com/documentation/accessibility/animated-images) 및 [isVideoAutoplayEnabled](https://developer.apple.com/documentation/uikit/uiaccessibility/isvideoautoplayenabled)의 내용을 참조하십시오.

**비디오 재생에서 플래시 효과를 선택 해제할 수 있도록 허용하십시오.** 시청하는 미디어에서 밝고 빠른 플래시 효과를 피하고 싶은 사람들이 있을 수 있습니다. ‘플래시 효과 흐리게 처리’ 설정을 사용하면 시스템이 미디어 매체에서 플래시 효과를 계산하고, 줄이고, 플래시 효과가 있다는 사실을 알립니다. 앱에서 비디오 재생을 지원하는 경우, ‘플래시 효과 흐리게 처리’ 설정에 적절하게 반응하는지 확인하십시오. 개발자 지침을 보려면 [Flashing lights](https://developer.apple.com/documentation/mediaaccessibility/flashing-lights)의 내용을 참조하십시오.

**빠르게 움직이고 깜빡이는 애니메이션에 주의를 기울이십시오.** 해당 효과를 과도하게 사용하면 주의가 산만해지고 어지러움을 유발하며 일부 경우에는 간질 발작을 일으킬 수 있습니다. 해당 효과에 민감한 사람들은 ‘동작 줄이기’ 손쉬운 사용 설정을 켤 수 있습니다. 이 설정이 활성화되었을 때 앱 또는 게임에서 확대/축소, 크기 조정 및 주변 동작 등 반복적인 자동 애니메이션을 줄어드는지 확인하십시오. 동작을 줄이는 다른 모범 사례는 다음과 같습니다.

- 애니메이션 스프링을 제한하여 바운스 효과 줄이기
- 사람의 제스처에 직접 애니메이션 맞추기
- z축 레이어의 깊이 변화를 애니메이션으로 표현하지 않기
- X, Y, Z축의 전환을 페이드 효과로 대체하여 모션 표현하지 않기
- 흐림 효과의 시작 및 종료를 애니메이션으로 표현하지 않기

**앱의 UI를 보조 접근에 맞게 최적화하십시오.** 보조 접근은 iOS 및 iPadOS의 손쉬운 사용 기능으로, 인지능력 장애가 있는 사람들이 간소화된 버전의 앱을 사용할 수 있게 해줍니다. 보조 접근은 인지적 부하를 줄이는 기본 레이아웃과 앱의 제어기 표시를 설정합니다. 아래에 있는 카메라 앱의 레이아웃이 바로 그 예입니다.

![보조 접근 상태인 카메라 앱의 스크린샷. 인터페이스에는 세 개의 큰 버튼인 ‘사진’, ‘비디오’, ‘뒤로’가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-assistive-access-camera@2x.png)

![보조 접근 상태인 카메라 앱에 사진 화면이 열려 있는 스크린샷. 인터페이스에는 두 개의 큰 버튼인 ‘사진 찍기’, ‘뒤로’가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/accessibility-assistive-access-camera-photo-mode@2x.png)

이 모드에 맞춰 앱을 최적화하려면 보조 접근이 켜져 있을 때 다음 지침을 따르십시오.

- 앱의 핵심 기능을 파악하고, 중요하지 않은 작업흐름 및 UI 요소를 제거하는 것을 고려하십시오.
- 여러 단계의 작업흐름을 나눠서 화면별로 하나의 상호작용에 집중할 수 있도록 하십시오.
- 파일 삭제와 같이 복구가 어려운 동작을 수행하는 경우 항상 두 번씩 확인을 요청하십시오.

개발자 지침을 보려면 [Assistive Access](https://developer.apple.com/documentation/accessibility/assistive-access)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### visionOS

visionOS는 머리와 손 포인터 제어 및 확대/축소 기능 등 사람들이 편안하고 자신에게 가장 적합한 방식으로 주변 환경과 상호작용하는 데 사용할 수 있는 다양한 손쉬운 사용 기능을 제공합니다.

**포인터 제어(손)**

[video: 앱의 visionOS 윈도우에서 포인터 제어를 사용하여 콘텐츠와 상호작용하는 사람의 손 모양이 기록된 화면. 끝에 포인터가 있는 선이 사람의 손에서부터 확장되어 있음. 사람이 손을 이동할 때 시야각 내에서 선의 위치가 변경됨.]

**포인터 제어(머리)**

[video: 앱의 visionOS 윈도우에서 포인터 제어를 사용하여 콘텐츠와 상호작용하는 모습이 기록된 화면. 화면에 사람은 보이지 않음. 포인터만 표시됨. 포인터가 시야각의 중앙에 있으며, 사람이 머리를 움직여 포인터 아래로 콘텐츠를 위치시킴.]

**확대/축소**

![visionOS의 앱 윈도우 스크린샷. 확대/축소 렌즈가 윈도우 일부분의 위에 표시되어 있으며, 렌즈 아래에 콘텐츠가 확대되어 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-accessibility-zoom-lens@2x.png)

**편안함을 우선시하십시오.** visionOS는 몰입형 특성으로 인해 인터페이스, 애니메이션 및 상호작용으로 멀미, 시각적 및 인체공학적 불편함을 유발할 가능성이 더 높습니다. 가장 편안한 경험을 제공하려면 다음 팁을 고려하십시오.

- 사람의 시야 내에 인터페이스 요소를 유지하십시오. 목에 무리를 줄 수 있는 수직 레이아웃 대신에 수평 레이아웃을 선호하고 여러 위치에서 연속으로 주의를 요구하지 마십시오.
- 특히 사람의 주변 시야에서 대상체가 움직이는 속도 및 강도를 줄이십시오.
- 카메라 및 비디오 움직임을 부드럽게 하고 주변 세계가 제어하지 않았는데도 움직이는 것처럼 느껴질 수 있는 상황을 피하십시오.
- 착용자에게 움직일 수 없고 갇혔다는 느낌을 줄 수 있으니 콘텐츠를 착용자의 머리에 고정하지 말고, 포인터 제어와 같은 보조 기술을 사용하지 못하게 방지하십시오.
- 크고 반복적인 제스처는 사람들을 지치게 하고 주변 환경에 따라 수행하기 어려울 수 있기 때문에 최소화하십시오.

추가 지침을 보려면 [접근성 높은 공간 경험 생성하기](https://developer.apple.com/kr/videos/play/wwdc2023/10034) 및 [시각과 움직임을 고려한 디자인](https://developer.apple.com/kr/videos/play/wwdc2023/10078)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[포용성](https://developer.apple.com/kr/design/human-interface-guidelines/inclusion)

[타이포그래피](https://developer.apple.com/kr/design/human-interface-guidelines/typography)

[VoiceOver](https://developer.apple.com/kr/design/human-interface-guidelines/voiceover)

#### Developer 문서

[Building accessible apps](https://developer.apple.com/accessibility/)

[Accessibility](https://developer.apple.com/documentation/accessibility)

[Overview of Accessibility Nutrition Labels](https://devcms.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)

#### 비디오

- [맞춤형 제어 항목의 접근성 향상하기](https://developer.apple.com/kr/videos/play/wwdc2026/220) — 누구나 앱을 이용할 수 있도록 하여 앱에 포함된 인터랙티브 요소의 잠재력을 최대한 실현하세요. VoiceOver 및 기타 보조 기술로 사용자들이 제어 항목을 어떻게 이해하고 사용하는지 자세히 살펴봅니다. 동작, 패스스루 제스처, 직접 터치와 같은 다양한 입력 방법을 알아봅니다. 각각의 접근성 경험을 개선하고 향상해 나가는 과정을 통해 다양한 예시 제어 항목을 자세히 살펴보세요.
- [포용적인 앱 디자인 원칙 알아보기](https://developer.apple.com/kr/videos/play/wwdc2025/316) — 장애에 대해 이해하는 것이 모든 사람을 위한 더 나은 앱을 만들 때 어떻게 도움이 되는지 알아보세요. 다양한 유형의 상호작용을 지원하고, 사용자 정의를 제공하며, 손쉬운 사용 API를 채택함으로써 앱를 더욱 포용적으로 만드는 방법을 살펴봅니다.
- [손쉬운 사용 취급 개요표로 앱 평가하기](https://developer.apple.com/kr/videos/play/wwdc2025/224) — App Store 제품 페이지에서 손쉬운 사용 취급 개요표를 사용하여 앱이 지원하는 손쉬운 사용 기능을 강조할 수 있습니다. VoiceOver, 더 큰 텍스트, 자막 등 앱의 손쉬운 사용 기능을 평가하고 정확하게 정보를 전달하는 손쉬운 사용 취급 개요표를 선택하는 방법을 알아보세요. 또한 디자인 단계 전반에서 손쉬운 사용에 접근할 수 있는 방법을 확인할 수도 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 보조 접근, 스위치 제어, 손쉬운 사용 지원 여부 표시 레이블에 대한 지침 및 링크가 추가됨. |
| 2025년 3월 7일 | 모든 지침이 확장 및 수정됨. 다이나믹 타입 지침을 타이포그래피 페이지로 이동하고 VoiceOver 지침을 새로운 VoiceOver 페이지로 이동함. |
| 2024년 6월 10일 | 다이나믹 타입을 지원하기 위해 Apple의 Unity 플러그인으로 연결하는 링크가 추가됨. |
| 2023년 12월 5일 | visionOS 확대/축소 렌즈 아트워크가 업데이트됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
