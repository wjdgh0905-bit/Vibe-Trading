# 게임 설계하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-games

> Apple 기기에서 게임을 플레이하는 사람들은 즐겨 쓰는 플랫폼 기능을 마음껏 사용하면서 개발자가 디자인한 세계에 빠져듭니다.

![그리드 위에 스타일화된 게임 컨트롤러가 표시되어 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 초록색을 은은하게 반영하는 초록색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/platforms-games-intro@2x.png)

Apple 플랫폼용 게임을 만들거나 Apple 플랫폼에 맞게 게임을 적용할 때는 모든 Apple 기기에서 게임이 원활하게 실행될 수 있도록 기본 플랫폼 특성과 패턴을 통합하는 방법을 익혀야 합니다. 각 플랫폼을 특별하게 만드는 요소가 무엇인지 알아보려면 [iOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-ios), [iPadOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-ipados), [macOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-macos), [tvOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-tvos), [visionOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-visionos) 및 [watchOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-watchos)의 내용을 참조하십시오. 개발자 지침을 보려면 [Games Pathway](https://developer.apple.com/games/pathway/)의 내용을 참조하십시오.

## 지체 없이 게임 플레이하기

**설치가 완료되는 대로 게임을 시작할 수 있도록 하십시오.**  게임을 즐기려는 플레이어의 첫 번째 경험이 오래 걸리는 다운로드를 기다리는 것이어서는 안 됩니다. 다운로드 시간을 30분 이하로 유지하면서 게임의 최초 설치 시 플레이 가능한 콘텐츠를 가능한 한 많이 포함하십시오. 백그라운드에 추가 콘텐츠를 다운로드하십시오. 지침을 보려면 [로드하기](https://developer.apple.com/kr/design/human-interface-guidelines/loading)의 내용을 참조하십시오.

**근사한 기본 설정을 제공하십시오.**  여러 설정을 변경할 필요 없이 게임을 플레이할 수 있다면 좋은 평가를 받을 수 있습니다. 플레이어의 기기 정보를 바탕으로 그래픽이 멋지게 보일 수 있는 기기 해상도, 페어링된 액세서리 및 게임 컨트롤러의 자동 인식, 플레이어의 손쉬운 사용 설정 등 게임에 대한 최적의 기본값을 선택하십시오. 또한, 게임이 플랫폼에서 가장 흔하게 이루어지는 상호작용 방법을 지원하도록 하십시오. 지침을 보려면 [설정](https://developer.apple.com/kr/design/human-interface-guidelines/settings)의 내용을 참조하십시오.

**플레이하면서 방법을 익힐 수 있도록 하십시오.**  플레이어는 게임 세계에서 새로운 정보와 방식을 발견할 때 더 효과적으로 배우는 경우가 많으므로, 사람들을 빠르게 참여시켜 성공을 경험할 수 있도록 돕는 플레이 가능한 튜토리얼에 구성과 온보딩 흐름을 통합하는 것이 좋습니다. 또한 글로 작성된 튜토리얼이 있는 경우, 게임을 플레이하려면 꼭 확인해야 하는 것이 아니라 궁금한 점이 있을 때 참조할 수 있는 리소스로 튜토리얼을 제공하는 것을 고려하십시오. 지침을 보려면 [온보딩](https://developer.apple.com/kr/design/human-interface-guidelines/onboarding)의 내용을 참조하십시오.

**적절한 때가 될 때까지 요청을 미루십시오.**  사람들이 게임을 시작하기 전에 너무 많은 요청을 쏟아내지 마십시오. 게임이 Apple 기기의 특정 센서를 사용하거나 손 추적 같은 데이터를 활용하여 게임 플레이를 맞춤화하는 경우, 먼저 플레이어의 권한을 얻어야 합니다. 지침을 보려면 [개인정보 보호](https://developer.apple.com/kr/design/human-interface-guidelines/privacy)의 내용을 참조하십시오. 사람들이 요청받는 이유를 알 수 있도록 데이터가 필요한 시나리오에 통합하십시오. 예를 들어, 초기 게임 중간 영상과 동작을 제어하기 위해 처음으로 손을 사용할 수 있는 시점 사이에 플레이어의 손을 추적하는 권한을 요청할 수 있습니다. 평가나 리뷰를 요청하기 전에 사람들이 게임을 통해 즐거운 시간을 보내도록 하십시오. 지침을 보려면 [평가 및 리뷰](https://developer.apple.com/kr/design/human-interface-guidelines/ratings-and-reviews)의 내용을 참조하십시오.

- [실행하기](https://developer.apple.com/kr/design/human-interface-guidelines/launching) — 실행 경험이 간소화되면 앱 또는 게임을 곧바로 사용할 수 있습니다.
- [온보딩](https://developer.apple.com/kr/design/human-interface-guidelines/onboarding) — 온보딩을 통해 사람들이 앱이나 게임을 빠르게 사용하도록 지원할 수 있습니다.
- [로드하기](https://developer.apple.com/kr/design/human-interface-guidelines/loading) — 최고의 콘텐츠 로딩 경험은 사람들이 인식하기 전에 완료됩니다.

## 모든 디스플레이를 보기 좋게 표시하기

**텍스트를 또렷하게 표시하십시오.**  게임 텍스트가 읽기 어려우면 사람들은 이야기를 따라가고, 중요한 지침 및 정보를 이해하고, 경험에 계속 참여하는 것이 힘들 수 있습니다. 각 기기에서 텍스트를 읽기 좋게 분명히 표시하려면, 텍스트가 배경과 잘 대비되고 각 플랫폼에서 권장되는 최소 텍스트 크기를 사용해야 합니다. 지침을 보려면 [타이포그래피](https://developer.apple.com/kr/design/human-interface-guidelines/typography)의 내용을 참조하십시오. 개발자 지침을 보려면 [Adapting your game interface for smaller screens](https://developer.apple.com/documentation/metal/adapting-your-game-interface-for-smaller-screens)의 내용을 참조하십시오.

| 플랫폼 | 기본 텍스트 크기 | 최소 텍스트 크기 |
| --- | --- | --- |
| iOS, iPadOS | 17pt | 11pt |
| macOS | 13pt | 10pt |
| tvOS | 29pt | 23pt |
| visionOS | 17pt | 12pt |
| watchOS | 16pt | 12pt |

**항상 버튼을 사용하기 쉽도록 하십시오.**  버튼이 너무 작거나 서로 너무 가까우면 플레이어가 불만을 느낄 수 있으며 게임 플레이의 재미가 줄어들 수 있습니다. 각 플랫폼은 기본 상호작용 방식을 기반으로 권장되는 최소 버튼 크기를 정의합니다. 예를 들어, iOS의 버튼은 터치 상호작용을 지원하려면 44x44pt 이상이어야 합니다. 지침을 보려면 [버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons)의 내용을 참조하십시오.

| 플랫폼 | 기본 버튼 크기 | 최소 버튼 크기 |
| --- | --- | --- |
| iOS, iPadOS | 44x44pt | 28x28pt |
| macOS | 28x28pt | 20x20pt |
| tvOS | 66x66pt | 56x56pt |
| visionOS | 60x60pt | 28x28pt |
| watchOS | 44x44pt | 28x28pt |

**해상도에 구애받지 않는 질감과 그래픽을 사용하십시오.**  해상도에 구애받지 않는 애셋을 만들지 못하는 경우 게임의 해상도를 기기의 해상도에 맞춰야 합니다. visionOS에서는 가급적 벡터 기반 아트워크를 사용하십시오. 사람들이 다양한 거리를 두고 여러 각도로 보면서 시스템이 동적으로 확장하는 경우 계속해서 근사하게 보입니다. 지침을 보려면 [이미지](https://developer.apple.com/kr/design/human-interface-guidelines/images)의 내용을 참조하십시오.

**기기 기능을 레이아웃에 통합하십시오.**  예를 들어, 기기에는 인터페이스의 일부에 영향을 미칠 수 있는 둥근 모서리나 카메라 하우징이 있을 수 있습니다. 게임이 각 기기에서 잘 어우러지도록 하려면 레이아웃 중에 이러한 기능을 제공하여 가능한 경우 플랫폼 제공 안전 영역을 활용하십시오(개발자 지침을 보려면 [Positioning content relative to the safe area](https://developer.apple.com/documentation/uikit/positioning-content-relative-to-the-safe-area)의 내용 참조). 지침을 보려면 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)의 내용을 참조하십시오. 안전 영역 안내선이 포함된 템플릿을 사용하려면 [Apple Design Resources](https://developer.apple.com/design/resources/)의 내용을 참조하십시오.

**게임 내 메뉴를 다양한 영상비에 맞도록 조정하십시오.**  게임은 16:10, 19.5:9 및 4:3 등 다양한 영상비에서 잘 보이고 매끄럽게 동작해야 합니다. 특히, 게임 내 메뉴는 다른 콘텐츠를 가리지 않으면서 모든 기기(지원하는 경우, iPhone 및 iPad의 두 가지 방향에서)에서 가독성을 유지하고 사용하기 쉬워야 합니다. 게임 내 메뉴가 올바르게 렌더링되도록 하려면 다양한 맥락에 맞춰 조절하기 위해 상대적 제약을 활용하는 동적 레이아웃을 사용하는 것을 고려하십시오. 가능한 한 고정 레이아웃을 사용하지 않고, 필요한 경우에만 사용자 설정 기기별 레이아웃을 생성하십시오. 지침을 보려면 [게임 내 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus#In-game-menus)의 내용을 참조하십시오.

**전체 화면 경험을 설계하십시오.**  사람들은 방해받지 않는 전체 화면으로 게임을 즐기는 경우가 많습니다. macOS, iOS, iPadOS에서 전체 화면 모드를 사용하면 다른 앱과 시스템 UI의 일부를 가릴 수 있으며, visionOS의 전체 공간에서 실행되는 게임은 사용자를 완전히 감싸 새로운 장소로 이동합니다. 지침을 보려면 [전체 화면 사용하기](https://developer.apple.com/kr/design/human-interface-guidelines/going-full-screen)의 내용을 참조하십시오.

- [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout) — 다양한 상황에 맞게 조절되는 일관된 레이아웃은 경험을 더욱 친숙하게 만들고 사람들이 모든 기기에서 좋아하는 앱과 게임을 즐기도록 도와줍니다.
- [타이포그래피](https://developer.apple.com/kr/design/human-interface-guidelines/typography) — 타이포그래피 선택지는 가독성 있는 텍스트를 표시하고, 정보 계층을 명시하고, 중요한 콘텐츠를 전달하며, 브랜드 또는 스타일을 선보일 수 있습니다.
- [전체 화면 사용하기](https://developer.apple.com/kr/design/human-interface-guidelines/going-full-screen) — iPhone, iPad 및 Mac에서 윈도우를 확장하여 화면을 채우는 전체 화면 모드를 통해 시스템 제어기를 가리고 방해받지 않는 환경을 제공할 수 있습니다.

## 직관적인 상호작용 활성화하기

**각 플랫폼의 기본 상호작용 방식을 지원하십시오.**  예를 들어, 사람들은 보통 터치 방식으로 iPhone에서 게임을 플레이합니다. Mac에서 플레이어는 키보드와 마우스 또는 트랙패드를 사용할 수 있기를 기대하며, visionOS 게임에서는 눈과 손으로 직간접적인 제스처를 통해 게임을 즐길 수 있기를 바랍니다. 게임이 각 플랫폼의 기본 상호작용 방식을 지원할 수 있도록 노력하는 동안, 특히 포인터 기반 맥락에서 터치 기반 맥락으로 게임을 불러올 때 제어기 크기 조절 및 메뉴 동작에 각별히 주의하십시오.

| 플랫폼 | 기본 상호작용 방법 | 추가 상호작용 방법 |
| --- | --- | --- |
| iOS | 터치 | 게임 컨트롤러 |
| iPadOS | 터치 | 게임 컨트롤러, 키보드, 마우스, 트랙패드, Apple Pencil |
| macOS | 키보드, 마우스, 트랙패드 | 게임 컨트롤러 |
| tvOS | 리모컨 | 게임 컨트롤러, 키보드, 마우스, 트랙패드 |
| visionOS | 터치 | 게임 컨트롤러, 키보드, 마우스, 트랙패드, 공간 게임 컨트롤러 |
| watchOS | 터치 | – |

**실제 게임 컨트롤러를 지원하며 대안도 제공하십시오.**  watchOS를 제외한 모든 플랫폼에서는 실제 게임 컨트롤러를 지원합니다. 게임 컨트롤러가 있으면 기존 게임의 포트를 쉽게 제어하고 복잡한 제어 매핑을 처리할 수 있지만, 모든 플레이어가 실제 게임 컨트롤러를 사용할 수 있는 것은 아니라는 점을 인식해야 합니다. 더 많은 플레이어가 게임을 즐길 수 있도록 하려면 게임과 상호작용할 수 있는 다른 방법도 제공해야 합니다. 지침을 보려면 [실제 컨트롤러](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls#Physical-controllers)의 내용을 참조하십시오.

**iPhone 및 iPad의 터치 스크린 경험을 지원하는 터치 기반 게임 제어기를 제공하십시오.**  iOS 및 iPadOS의 게임에서는 플레이어가 게임 요소와 직접 상호작용하거나, 게임 콘텐츠 위에 표시되는 가상 제어기를 사용하여 게임을 제어하도록 할 수 있습니다. 디자인 지침을 보려면 [터치 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls#Touch-controls)의 내용을 참조하십시오.

- [게임 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls) — 정밀하고 직관적인 게임 제어기는 게임 플레이를 향상하고 게임에서 플레이어의 몰입감을 높일 수 있습니다.
- [제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures) — 제스처는 사람들이 자신의 기기에서 앱 또는 게임의 대상체에 직접 영향을 주기 위해 사용하는 물리적인 움직임입니다.
- [포인팅 장치](https://developer.apple.com/kr/design/human-interface-guidelines/pointing-devices) — 사람들은 트랙패드 또는 마우스와 같은 포인팅 장치를 사용하여 인터페이스를 탐색하고 동작을 시작할 수 있습니다.

## 누구든 반갑게 맞이하기

**인식 용이성을 우선시하십시오.**  사람들이 시각, 청각, 촉각 중 무엇을 사용하든 게임의 콘텐츠를 인식할 수 있어야 합니다. 예를 들어, 색상만 사용해서 중요한 세부 사항을 전달하거나, 설명 자막이나 콘텐츠를 읽을 수 있는 다른 방법 없이 게임 중간 영상을 제공하지 마십시오. 특별 지침을 보려면 다음의 내용을 참조하십시오.

- 텍스트 크기
- 색상 및 효과
- 동작
- 상호작용
- 버튼

**플레이어가 경험을 맞춤화할 수 있도록 하십시오.**  플레이어는 게임과의 상호작용에 영향을 미치는 선호도와 역량이 저마다 다릅니다. 모든 사람에게 적합한 범용 구성은 없기 때문에 플레이어가 유형 크기, 게임 제어 매핑, 모션 강도, 사운드 밸런스 등의 매개변수를 사용자화할 수 있도록 지원하십시오. 시스템 프레임워크 또는 [Unity plug-ins](https://github.com/Apple/UnityPlugins) 사용 여부에 관계없이 내장된 [Apple accessibility technologies](https://developer.apple.com/accessibility/)을 활용하여 손쉬운 사용 기능의 개인 맞춤화를 지원할 수 있습니다.

**플레이어에게 본인을 나타낼 수 있는 도구를 제공하십시오.**  게임에서 플레이어가 아바타를 만들거나 이름 또는 설명을 붙이도록 하려면, 자기 정체성을 표현할 수 있는 여러 방법을 지원하고 다양한 사람의 특성을 나타낼 수 있는 옵션을 제공하십시오.

**스토리와 캐릭터에 고정 관념을 반영하지 않도록 하십시오.**  현실 세계의 고정 관념을 반영하는 방식으로 게임 캐릭터와 시나리오를 묘사하지 않았는지 스스로에게 물어보십시오. 예를 들어, 게임에서 특정 인종, 성별, 문화적 유산을 지닌 적을 묘사하지는 않았습니까? 게임을 검토하여 편견과 고정 관념이 반영되었는지 확인하고 제거하십시오. 현실 세계의 문화와 언어를 언급해야만 한다면, 존중하는 태도를 보이십시오.

- [손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility) — 손쉽게 사용이 가능한 사용자 인터페이스를 적용하면 앱 또는 게임을 사용하는 모든 사람에게 탁월한 경험을 제공할 수 있습니다.
- [포용성](https://developer.apple.com/kr/design/human-interface-guidelines/inclusion) — 포용성 있는 앱 및 게임은 공손한 표현을 우선적으로 사용하고, 모든 사람이 접근하고 이해할 수 있는 방식으로 콘텐츠와 기능을 제공하여 사람들을 가장 중요하게 여깁니다.

## Apple 기술 도입하기

**Game Center를 통합하여 플레이어가 자신의 기기에서 게임을 발견하고 친구와 연결할 수 있도록 하십시오.**  [Game Center](https://developer.apple.com/game-center/)는 Apple의 소셜 게임 네트워크로 모든 플랫폼에서 이용 가능합니다. Game Center를 사용하면 플레이어가 진행 상황 및 달성한 목표를 추적하도록 할 수 있으며, 게임에 순위표, 도전 과제, 멀티플레이어 활동을 설정할 수 있습니다. 디자인 지침을 보려면 [Game Center](https://developer.apple.com/kr/design/human-interface-guidelines/game-center)의 내용을 참조하십시오. 개발자 지침을 보려면 [GameKit](https://developer.apple.com/documentation/gamekit)의 내용을 참조하십시오.

**플레이어가 자신의 모든 기기에서 게임을 선택할 수 있도록 하십시오.**  사람들은 종종 여러 Apple 기기에서 사용하는 단일 iCloud 계정을 가지고 있습니다. [GameSave](https://developer.apple.com/documentation/gamesave)를 지원하는 경우 사람들이 자신의 게임 상태를 저장하여 다른 기기에서 중단한 지점부터 다시 시작할 수 있습니다.

**햅틱을 지원하여 플레이어가 동작을 느낄 수 있도록 하십시오.**  코어 햅틱을 채택하면 사용자 설정 햅틱 패턴을 작성하고 재생할 수 있으며, 필요한 경우 사용자 설정 오디오 콘텐츠와 결합됩니다. 코어 햅틱은 iOS, iPadOS, tvOS 및 visionOS에서 사용할 수 있으며 많은 게임 컨트롤러에서 지원됩니다. 지침을 보려면 [햅틱 재생하기](https://developer.apple.com/kr/design/human-interface-guidelines/playing-haptics)의 내용을 참조하십시오. 개발자 지침을 보려면 [Core Haptics](https://developer.apple.com/documentation/corehaptics) 및 [Playing Haptics on Game Controllers](https://developer.apple.com/documentation/corehaptics/playing-haptics-on-game-controllers)의 내용을 참조하십시오.

**공간 음향을 사용하여 게임의 음향 공간에 플레이어를 몰입시키십시오.**  멀티채널 오디오를 제공하면 게임의 오디오가 현재 기기에 맞춰 자동으로 조정되며, 지원되는 경우 몰입형 공간 음향 경험을 활성화합니다. 지침을 보려면 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/playing-audio#visionOS)의 내용을 참조하십시오. 개발자 지침을 보려면 [Explore Spatial Audio](https://developer.apple.com/news/?id=fakg1z5b)의 내용을 참조하십시오.

**Apple 기술을 활용하여 고유한 게임 플레이 방식을 활성화하십시오.**  예를 들어, 증강 현실, 머신 러닝 및 [HealthKit](https://developer.apple.com/documentation/healthkit) 등의 기술을 통합하고, 카메라 및 마이크 등의 기능 및 위치 데이터에 대한 접근 권한을 요청할 수 있습니다. Apple 기술, 기능 및 서비스의 전체 목록을 보려면 [기술](https://developer.apple.com/kr/design/human-interface-guidelines/technologies)의 내용을 참조하십시오.

- [Game Center](https://developer.apple.com/kr/design/human-interface-guidelines/game-center) — Game Center는 Apple의 소셜 게임 네트워크로, 플레이어가 자신의 진행 상황을 추적하고 Apple 플랫폼 전반에서 친구들과 연결할 수 있도록 해주며, 다양한 기기에서 플레이어가 게임을 더 쉽게 발견할 수 있도록 도와줍니다.
- [iCloud](https://developer.apple.com/kr/design/human-interface-guidelines/icloud) — iCloud는 명시적인 동기화를 수행하지 않아도 모든 기기에서 사진, 비디오, 문서 등 관심 있는 콘텐츠에 원활하게 접근할 수 있는 서비스입니다.
- [앱 내 구입](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase) — 앱 내 구입을 사용하여 앱 내에서 안전하게 프리미엄 콘텐츠, 디지털 상품, 구독과 같은 가상 상품에 대한 비용을 결제할 수 있습니다.

## 리소스

#### 관련 콘텐츠

[Game Center](https://developer.apple.com/kr/design/human-interface-guidelines/game-center)

[게임 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls)

#### Developer 문서

[Games Pathway](https://developer.apple.com/games/get-started/)

[Create games for Apple platforms](https://developer.apple.com/games/)

#### 비디오

- [Mac에서 Cyberpunk 2077 제공하기](https://developer.apple.com/kr/videos/play/wwdc2026/356) — 어떻게 Mac에서 Cyberpunk 2077을 제공하여 macOS에서 AAA 게임의 새로운 기준을 정립했는지 CD PROJEKT RED의 비하인드 스토리를 통해 알아보세요. 해당 팀이 어떻게 Apple의 강력한 하드웨어, 소프트웨어, 개발 도구를 활용하여 고품질 경험을 구현했는지 살펴보세요. 유사한 기법을 게임에 어떻게 적용할 수 있는지 알아보세요. 혁신적인 ‘For this Mac’ 프리셋이 어떻게 그래픽 설정을 자동으로 최적화하여 Mac 라인업 전반에서 시각적 충실도와 프레임률의 균형을 맞추는지 살펴보세요.
- [Reality Composer Pro 3로 코드 없는 게임을 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2026/252) — Reality Composer Pro 3의 ScriptGraph를 사용하여 앱과 게임을 위한 코드 없는 3D 콘텐츠를 만드는 방법을 살펴보세요. 시각적 노드를 활용하여 애니메이션을 빌드하고, 인터랙티브 순간을 구성하며, SwiftUI 요소를 통합해 말풍선과 기타 UI를 경험에 추가하는 방법을 알아보세요.
- [게임 수준 높이기](https://developer.apple.com/kr/videos/play/wwdc2025/209) — 통합 게임 플랫폼에서 여러분의 게임이 빛나게 하는 방법을 알아보세요. 게임의 수준을 높이고 플레이어 경험을 더욱 개선할 수 있는 기술 맵을 소개합니다. 게임을 빌딩, 디버깅 및 프로파일링하는 데 필수적인 기본 도구의 개요를 확인하세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 터치 기반 제어기 및 Game Center에 대한 지침이 업데이트됨. |
| 2024년 6월 10일 | 새로운 페이지. |
