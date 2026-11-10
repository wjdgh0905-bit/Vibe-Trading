# 게임 제어기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/game-controls

> 정밀하고 직관적인 게임 제어기는 게임 플레이를 향상하고 게임에서 플레이어의 몰입감을 높일 수 있습니다.

![게임 플레이를 나타내는 게임 컨트롤러의 방향 패드 제어기 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 보라색을 은은하게 반영하는 보라색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/inputs-game-controls-intro@2x.png)

Apple 플랫폼에서 게임은 실제 게임 컨트롤러의 입력뿐만 아니라 터치, 리모컨, 마우스, 키보드와 같은 기본 시스템 상호작용을 지원할 수 있습니다. 플레이어가 실제 게임 컨트롤러 사용을 선호할 수 있지만 플랫폼의 기본 상호작용 방식도 지원해야 하는 두 가지 중요한 이유가 있습니다.

- watchOS를 제외한 모든 플랫폼에서 실제 게임 컨트롤러를 지원하지만 모든 플레이어가 이를 갖고 있지는 않습니다.
- 플레이어는 가장 익숙한 플랫폼 상호작용 방식을 지원하는 게임을 선호합니다.

폭넓게 사용자에게 다가가고 각 플랫폼에 최적화된 최상의 경험을 제공하려면 지원할 입력 방식을 선택할 때 이러한 사항을 고려해야 합니다.

## 터치 제어기

iOS 및 iPadOS 게임의 경우, 터치 상호작용을 지원하여 게임 콘텐츠 위에 가상 제어기를 제공하는 동시에, 플레이어가 게임 요소를 직접 터치하여 상호작용하도록 할 수 있습니다. [Touch Controller](https://developer.apple.com/documentation/touchcontroller) 프레임워크를 사용하여 이러한 가상 제어기를 게임에 추가할 수 있습니다. 원활한 터치 제어기 경험을 제공하려면 다음 지침을 따르십시오.

**게임 콘텐츠 위에 가상 제어기를 표시하는 게 적절한지 판단하십시오.** 일반적으로 많은 동작을 제공하거나 플레이어가 움직임을 제어해야 하는 게임에서는 가상 게임 제어기가 유용합니다. 그러나 경우에 따라서는 플레이어가 게임 내 대상체와 직접 상호작용할 수 있을 때 게임 플레이가 더욱 몰입감 있고 효과적일 수 있습니다. 가상 제어기를 사용하는 대신 게임 내 제스처와 동작을 연관시켜 게임 콘텐츠를 가리는 제어기의 양을 줄여 보십시오. 예를 들어, 대상체를 선택하는 가상 버튼을 추가하는 대신 대상체를 탭하여 선택하는 방식을 고려해 보십시오.

**가상 버튼은 접근하기 쉬운 위치에 배치하십시오.* 기기의 경계와 [안내선 및 안전 영역](https://developer.apple.com/kr/design/human-interface-guidelines/layout#Guides-and-safe-areas), 그리고 조작하기 편한 위치가 어디인지 고려해야 합니다. 버튼이 iPhone의 홈 표시기 또는 Dynamic Island 같은 시스템 기능과 겹치지 않도록 주의해야 합니다. 자주 사용하는 버튼을 플레이어의 엄지손가락 근처에 배치하되, 플레이어가 이동 및 카메라 시점 입력 위치라고 생각하는 원형 영역은 피해야 합니다. 메뉴와 같은 보조 제어기는 화면 상단에 배치하십시오.

![가로 방향 iPhone에 적합한 터치 제어기의 배치가 표시된 그래픽.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-touch-input-heat-map@2x.png)

**제어기의 크기를 충분히 크게 설정하십시오.** 자주 사용하는 제어기는 최소 44x44pt, 메뉴와 같이 중요도가 낮은 제어기는 최소 28x28pt로 설정하여 손가락 크기에 맞춰야 합니다.

**항상 시각적이고 촉각적인 누르기 상태를 포함하십시오.** 시각적이고 물리적인 누르기 상태가 없다면 가상 제어기는 반응하지 않는 것처럼 느껴질 수 있습니다. 플레이어가 버튼을 누른 것을 인식할 수 있도록, 손가락이 제어기를 가리고 있어도 확인할 수 있는 광택과 같은 시각적 누르기 상태 효과를 추가하십시오. 이 누르기 상태에 사운드와 햅틱을 결합하여 피드백의 효과를 높일 수 있습니다. 지침을 보려면 [햅틱 재생하기](https://developer.apple.com/kr/design/human-interface-guidelines/playing-haptics)의 내용을 참조하십시오.

![가로 방향 iPhone을 잡고 있는 오른손. 엄지손가락이 가상 버튼을 누르고 있으며, 버튼은 불투명도가 증가하고 주위에 광택 효과가 나타나면서 누르기 상태를 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-press-state@2x.png)

**동작을 나타내는 기호를 사용하십시오.** 각 버튼이 수행하는 동작을 시각적으로 표현하는 아트워크를 선택하십시오. 예를 들어, 무기 그래픽을 사용하여 공격을 나타내십시오. 추상적인 모양이나 A, X 또는 R1과 같은 컨트롤러 기반 이름을 아트워크로 사용하는 것은 플레이어가 특정 제어기의 기능을 이해하고 기억하기 어렵게 만드므로 피해야 합니다.

![정사각형 그래픽이 있는 게임 컨트롤러 버튼이 물체를 집는 제스처를 하는 손 그래픽이 있는 가상 버튼에 매핑됨.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-button-to-action@2x.png)

**게임 플레이에 맞춰 가상 제어기를 표시하고 가리십시오.** 터치 제어기의 동적인 특성을 활용하여, 플레이어에게 표시되는 화면상의 제어기를 상황에 따라 조정할 수 있습니다. 특정 동작이 불가능하거나 관련성이 없을 때는 제어기를 가려서 화면의 복잡함을 줄이고 플레이어가 중요한 부분에 집중하도록 만들 수 있습니다. 예를 들어, 플레이어가 화면을 터치하기 전까지 이동 제어기를 가려서 게임 콘텐츠 위에 겹치는 UI의 양을 줄일 수 있습니다.

**표시된 제어기**

![캐릭터가 움직이면 더 잘 보이는 캐릭터 이동용 가상 제어기가 포함된 게임의 플레이 화면.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-thumbstick-in-motion@2x.png)

**가려진 제어기**

![캐릭터가 가만히 있으면 희미해지는 캐릭터 이동용 가상 제어기가 포함된 게임의 플레이 화면.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-thumbstick-at-rest@2x.png)

**기능을 하나의 제어기로 결합하십시오.** 플레이어가 여러 버튼을 동시에 누르거나 순서대로 눌러야 하는 게임 역학은 재설계하는 것을 고려하십시오. 동일한 동작의 다양한 변형을 제공하기 위해 두 번 탭, 길게 터치 등의 제스처를 활용할 수 있습니다. 예를 들어, 길게 터치 제스처로 강화된 특수 공격을 사용할 수 있습니다. 걷기 또는 달리기처럼 여러 동작이 있을 경우, 동작을 하나의 제어기로 결합하는 것을 고려하십시오.

![한 번 탭 및 길게 터치 제스처를 모두 지원하는 가상 버튼의 그래픽.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-power-up-action@2x.png)

**이동 및 카메라 시점 제어기를 예측 가능한 동작에 매핑하십시오.** 일반적으로 플레이어는 화면의 왼쪽을 사용하여 이동을 제어하고, 오른쪽을 사용하여 카메라 시점을 제어한다고 생각합니다. 가능한 한 넓은 입력 영역을 사용하여 플레이어가 이동 및 카메라 시점을 제어할 수 있는 공간을 최대한 확보하십시오. 이동 제어기의 경우, 고정된 위치에 엄지스틱을 표시하기보다는 플레이어가 엄지를 댄 위치에 가상 엄지스틱을 표시하는 것이 좋습니다. 카메라 시점 제어기의 경우, 가상 엄지스틱 대신 직접적인 터치를 사용하여 카메라를 패닝하는 방식을 선택하십시오.

![화면 왼쪽에는 이동 제어기, 오른쪽에는 카메라 시점 제어기가 배치된 모습이 표시된 그래픽.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-camera-thumbstick-zones@2x.png)

## 실제 컨트롤러

**플랫폼의 기본 상호작용 방식을 지원하십시오.** 게임 컨트롤러는 선택적인 구입 항목이지만, 모든 iPhone 및 iPad에는 터치 스크린이 있고, 모든 Mac에는 키보드와 트랙패드 또는 마우스가 있으며, 모든 Apple TV에는 리모컨이 있고, 모든 Apple Vision Pro는 눈과 손으로 하는 제스처에 반응합니다. 게임 컨트롤러를 제공하는 경우, 대안으로 플랫폼의 기본 상호작용 방식도 사용할 수 있도록 하는 것이 좋습니다. 개발자 지침을 보려면 [Adding virtual controls to games that support game controllers in iOS](https://developer.apple.com/documentation/gamecontroller/adding-virtual-controls-to-games-that-support-game-controllers-in-ios)의 내용을 참조하십시오.

**게임 컨트롤러 요구 사항에 관해 안내하십시오.** tvOS 및 visionOS의 경우, 실제 게임 컨트롤러를 사용하도록 요구할 수 있습니다. App Store에서는 이러한 앱을 식별할 수 있도록 ‘게임 컨트롤러가 필요함’ 배지를 표시합니다. 사람들은 언제든지 컨트롤러가 연결되지 않은 상태에서도 게임을 실행할 수 있다는 점을 염두에 두어야 합니다. 게임 컨트롤러 연결이 필요한 앱이라면 연결 여부를 확인하고, 사람들에게 정중하게 연결을 요청하십시오. 개발자 지침을 보려면 [GCRequiresControllerUserInteraction](https://developer.apple.com/documentation/bundleresources/information-property-list/gcrequirescontrolleruserinteraction)의 내용을 참조하십시오.

**컨트롤러가 페어링되었는지 자동으로 감지하십시오.** 플레이어가 실제 게임 컨트롤러를 수동으로 설정하지 않아도 되도록, 컨트롤러가 페어링되어 있는지 자동으로 감지하고 해당 프로필을 가져올 수 있습니다. 개발자 문서를 보려면 [Game Controller](https://developer.apple.com/documentation/gamecontroller)의 내용을 참조하십시오.

![컨트롤러의 트리거, 숄더 버튼, 방향 패드 및 엄지스틱의 위치를 표시하는 설명이 포함된 게임 컨트롤러 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-controller-anatomy@2x.png)

**연결되는 게임 컨트롤러에 맞춰 화면상의 콘텐츠를 사용자화하십시오.** 게임 코드를 단순화하기 위해 게임 컨트롤러 프레임워크는 컨트롤러 요소의 위치에 따라 표준 이름을 지정하지만, 실제 게임 컨트롤러의 색상과 기호는 다를 수 있습니다. 인터페이스에서 제어기를 언급하거나 관련 콘텐츠를 표시할 때는 연결된 컨트롤러의 레이블 지정 체계를 사용해야 합니다. 개발자 지침을 보려면 [GCControllerElement](https://developer.apple.com/documentation/gamecontroller/gccontrollerelement)의 내용을 참조하십시오.

**컨트롤러 버튼을 예상 가능한 UI 동작에 매핑하십시오.** 게임 플레이 외의 상황에서 플레이어는 현재 플랫폼의 익숙한 동작으로 게임의 UI를 탐색할 수 있을 것으로 생각합니다. 게임 플레이 중이 아닐 때는 모든 Apple 플랫폼에서 다음과 같은 규칙을 따르십시오.

| 버튼 | UI의 예상 동작 |
| --- | --- |
| A | 제어기 활성화 |
| B | 동작 취소 또는 이전 화면으로 돌아가기 |
| X | – |
| Y | – |
| 왼쪽 숄더 | 왼쪽으로 이동하여 다른 화면 또는 섹션 탐색 |
| 오른쪽 숄더 | 오른쪽으로 이동하여 다른 화면 또는 섹션 탐색 |
| 왼쪽 트리거 | – |
| 오른쪽 트리거 | – |
| 왼쪽/오른쪽 엄지스틱 | 선택 항목 이동 |
| 방향 패드 | 선택 항목 이동 |
| 홈/로고 | 시스템 제어기로 예약됨 |
| 메뉴 | 게임 설정 열기 또는 게임 플레이 일시 정지 |

**여러 컨트롤러를 연결할 수 있도록 지원하십시오.** 여러 컨트롤러가 연결되어 있는 경우, 플레이어가 현재 사용 중인 컨트롤러에 해당하는 레이블과 글리프를 사용하십시오. 멀티플레이어를 지원하는 게임인 경우, 특정 플레이어의 컨트롤러를 언급할 때 적절한 레이블과 기호를 사용하십시오. 여러 컨트롤러의 버튼을 언급해야 하는 경우, 함께 나열하는 것이 좋습니다.

**게임 컨트롤러 요소를 언급할 때 가급적 텍스트보다는 기호를 사용하십시오.** 게임 컨트롤러 프레임워크를 통해 다양한 브랜드의 게임 컨트롤러의 버튼을 비롯한 대부분의 요소에 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 사용할 수 있습니다. 텍스트 설명 대신에 기호를 사용하면, 특히 컨트롤러에 익숙하지 않은 플레이어가 게임을 플레이하면서 일일이 특정 버튼 레이블을 찾지 않아도 되므로 매우 편리합니다.

![게임 카테고리의 기호가 표시된 SF Symbols 앱의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/game-controls-sf-symbols-gaming-category@2x.png)

## 키보드

키보드를 사용하는 플레이어는 앱 및 게임에서 키보드 바인딩을 통해 더욱 빠르게 상호작용할 수 있다는 점에 만족해 합니다.

**단일 키 명령을 우선적으로 사용하십시오.** 단일 키 명령은 일반적으로 플레이어가 더 쉽고 빠르게 누를 수 있습니다. 특히 마우스나 트랙패드를 동시에 사용하는 경우는 더 그렇습니다. 예를 들어 Inventory(재고)는 I, Map(지도)은 M과 같이 메뉴 항목의 첫 글자를 단축키로 사용할 수 있습니다. 상대적으로 크기가 큰 키를 활용하도록 게임의 주요 동작을 스페이스 바에 매핑할 수도 있습니다.

**Apple 키보드를 사용하여 키 바인딩이 게임에서 편안하게 동작하는지 테스트하십시오.** 예를 들어, 키 바인딩이 비 Apple 키보드에서 Control 키(^)를 사용하는 경우, Apple 키보드의 Command 키(⌘)에 다시 매핑하는 것을 고려하십시오. Apple 키보드에서 Command 키는 스페이스 바 옆에 가까이 위치해 있으며, 특히 플레이어가 W, A, S, D 키를 사용 중일 때 쉽게 사용할 수 있습니다.

**키의 근접성을 고려하십시오.** 예를 들어, 플레이어가 W, A, S, D 키를 사용하여 이동하는 경우 근처에 있는 키를 사용하여 다른 중요한 명령을 정의하는 것이 좋습니다. 마찬가지로 밀접하게 연관된 동작 그룹이 있는 경우 재고 카테고리에 숫자 키를 사용하는 것과 같이 물리적으로 서로 가까운 키에 바인딩을 매핑하는 것이 효과적입니다.

**플레이어가 키 바인딩을 사용자화하도록 하십시오.** 플레이어는 합리적인 일련의 기본값을 기대하는 경향이 있지만 많은 사람들은 개인적인 플레이 스타일에 맞게 사용하기 편하도록 게임의 키 바인딩을 사용자화해야 합니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS 또는 tvOS에 대한 추가 고려 사항은 없습니다. watchOS에서는 지원되지 않습니다.*

### visionOS

**공간 게임 컨트롤러의 동작을 손 입력과 일치시키십시오.** visionOS 게임은 다양한 무선 게임 컨트롤러를 지원할 뿐만 아니라 PlayStation VR2 Sense 컨트롤러와 같은 공간 게임 컨트롤러도 지원합니다. 플레이어가 손을 사용하는 것과 비슷한 방식으로 게임과 상호작용할 수 있도록 하십시오. 특히, 플레이어가 대상체를 바라보면서 컨트롤러의 왼쪽 또는 오른쪽 트리거 버튼을 눌러 간접적으로 상호작용하거나, 손을 뻗고 왼쪽 또는 오른쪽 트리거 버튼을 눌러 직접적으로 상호작용할 수 있도록 지원하십시오. 자세한 정보를 보려면 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#visionOS)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[게임 설계하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-games)

[제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures)

[키보드](https://developer.apple.com/kr/design/human-interface-guidelines/keyboards)

[햅틱 재생하기](https://developer.apple.com/kr/design/human-interface-guidelines/playing-haptics)

#### Developer 문서

[Create games for Apple platforms](https://developer.apple.com/games/)

[Touch Controller](https://developer.apple.com/documentation/touchcontroller)

[Game Controller](https://developer.apple.com/documentation/gamecontroller)

#### 비디오

- [터치 기능으로 멋진 게임 만들기](https://developer.apple.com/kr/videos/play/wwdc2026/358) — 게임에서 매력적인 터치 경험을 선사하기 위해 사용할 수 있는 기법을 자세히 살펴보세요. 인디 개발부터 AAA 게임 개발까지 전문가의 인사이트를 공유하고, 직관적인 터치 제어 항목을 위한 모범 사례를 살펴보며, Touch Controller 프레임워크와 Metal 같은 Apple 기술을 활용하여 멋진 성능을 구현하는 방법을 안내합니다. 
- [Apple 플랫폼을 위한 고사양 게임 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2024/10085) — 고사양 게임을 Mac, iPad, iPhone으로 가져와 매끄럽게 구동하는 방법을 알아보세요. 게임이 다양한 디스플레이에서 멋지게 표현되도록 하는 법, 기기마다 직관적인 입력 및 제어 기능을 섬세하게 구현하는 법, Apple 기술을 활용하여 탁월한 사용자 경험을 제공하는 법을 설명합니다.
- [visionOS의 게임 입력 방식 살펴보기](https://developer.apple.com/kr/videos/play/wwdc2024/10094) — visionOS에서 게임에 사용할 멋진 입력 방식을 디자인하고 구현하는 방법을 살펴보세요. 시스템 제스처를 활용하여 플레이어가 게임과 원활히 상호작용할 수 있게 지원하는 방법을 알아봅니다. 맞춤형 제스처 및 게임 컨트롤러를 지원하는 모범 사례도 확인해 보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 터치 제어기 모범 사례 및 UI에 대한 게임 컨트롤러 매핑이 업데이트되고, visionOS의 공간 게임 컨트롤러 지원에 관한 지침이 추가됨. |
| 2024년 6월 10일 | 터치 제어기 지원에 대한 지침이 추가되고 게임 컨트롤러의 제목이 변경됨. |
