# 제스처

Source: https://developer.apple.com/kr/design/human-interface-guidelines/gestures

> 제스처는 사람들이 자신의 기기에서 앱 또는 게임의 대상체에 직접 영향을 주기 위해 사용하는 물리적인 움직임입니다.

![오른쪽 시계 방향으로 원을 그리는 가리키는 손의 그림이 기기와의 터치 상호작용을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 보라색을 은은하게 반영하는 보라색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/inputs-gestures-intro@2x.png)

사용 중인 기기에 따라 터치 스크린, 허공 또는 트랙패드, 마우스, 리모컨, 터치 표면이 포함된 게임 컨트롤러 등과 같은 다양한 입력 기기에서 제스처를 사용할 수 있습니다.

각 플랫폼은 탭, 쓸어넘기기, 드래그와 같은 기본 제스처를 지원합니다. 기본 제스처를 구성하는 정확한 동작은 플랫폼 및 입력 기기별로 다를 수 있지만 사람들은 이러한 제스처의 기본 기능에 익숙하며 어디에서나 사용할 수 있으리라 생각합니다. 이러한 제스처 목록을 보려면 [표준 제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#Standard-gestures)의 내용을 참조하십시오.

## 모범 사례

**앱과 상호작용하는 방법을 두 개 이상 제공하십시오.** 일반적으로 사람들은 음성, 키보드 또는 스위치 제어와 같은 다른 입력 방식을 사용하여 기기와 상호작용하는 것을 선호하거나, 이러한 방식을 필요로 합니다. 사람들이 특정 제스처를 사용하여 주어진 작업을 수행할 수 있다고 당연하게 생각하지 마십시오. 지침을 보려면 [손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility)의 내용을 참조하십시오.

**일반적으로 사람들의 예상과 일치하는 방식으로 제스처에 반응하십시오.** 사람들은 현재 맥락과 무관하게 대부분의 제스처가 동일하게 작동할 것이라 생각합니다. 예를 들어, 탭하여 대상체를 활성화하거나 선택하려고 합니다. 탭이나 쓸어넘기기 같은 익숙한 제스처로 앱 고유의 동작을 수행하는 것을 피하고, 마찬가지로 버튼 활성화나 긴 보기 스크롤과 같은 표준 동작을 수행하기 위해 고유한 제스처를 생성하지 마십시오.

**앱을 최대한 반응성 있게 처리하십시오.** 유용한 제스처는 직접적인 조작 경험을 향상하고 피드백을 즉각 제공합니다. 사람들이 앱에서 제스처를 수행할 때 제스처의 결과를 예상할 수 있는 피드백을 제공하고, 필요한 경우 동작을 완료하는 데 필요한 움직임의 범위와 유형을 전달하십시오.

**제스처를 사용할 수 없는 경우 이에 대해 안내하십시오.** 제스처가 작동하지 않는 이유를 명확하게 설명하지 않으면 사람들은 앱이 멈췄거나 제스처가 정확하지 않았다고 생각하게 되며 결국 불만을 느낄 수 있습니다. 예를 들어, 어떤 사람이 잠겨 있는 대상체를 드래그하려고 하는데 UI에서는 해당 대상체의 위치가 잠겨 있다는 것을 나타내지 않을 수 있습니다. 또는 누군가가 사용 불가능한 버튼을 활성화하려고 하는데 해당 버튼의 사용 불가능 상태가 사용 가능 상태와 명확하게 구별되지 않을 수 있습니다.

## 사용자 설정 제스처

**필요한 경우에만 사용자 설정 제스처를 추가하십시오.** 사용자 설정 제스처는 게임 또는 그리기 앱과 같이 사람들이 자주 수행하고 기존 제스처로 처리되지 않는 전문적인 작업을 위해 디자인할 때 가장 적합합니다. 사용자 설정 제스처를 구현하는 경우 다음과 같은 특성을 갖추고 있는지 확인하십시오.

- 쉽게 찾을 수 있음
- 직관적으로 수행 가능
- 다른 제스처와 구별됨
- 앱 또는 게임에서 중요한 동작을 수행하는 유일한 방법이 아님

**사용자 설정 제스처를 쉽게 배울 수 있도록 하십시오.** 사람들이 사용자 설정 제스처를 빠르게 배우고 수행할 수 있도록 앱에서 설명하는 시간을 갖고, 실제 사용 사례를 기반으로 상호작용을 테스트하십시오. 간단한 표현과 그래픽으로 제스처를 설명하기 어렵다면 사람들이 배우고 수행하기 어려운 제스처일 가능성이 있습니다.

**단축 제스처는 표준 제스처를 대체하기 위해서가 아니라 보완하기 위해 사용하십시오.** 앱의 일부분에 빠르게 접근할 수 있는 사용자 설정 제스처를 제공하는 경우에도 사람들에게는 탭을 한두 번 더 하더라도 간단하고 친숙하게 동작을 탐색하고 수행할 수 있는 방식이 또한 필요합니다. 예를 들어, 다양한 보기 계층의 탐색을 지원하는 앱에서는 상단 도구 막대에 한 번의 탭으로 이전 보기로 돌아갈 수 있는 뒤로 버튼이 있을 것이라고 생각합니다. 이 동작을 빠르게 실행하기 위해 많은 앱은 뒤로 버튼을 계속 제공하는 동시에 단축 제스처(예: 터치 스크린 또는 윈도우 측면에서 쓸어넘기기)도 제공합니다.

**시스템 UI에 접근하는 제스처와의 충돌을 피하십시오.** watchOS에서 가장자리를 쓸어넘기거나 visionOS에서 손을 돌려 시스템 오버레이에 접근하는 것과 같이 여러 플랫폼에서 시스템 동작에 접근하는 제스처를 제공합니다. 사람들은 이러한 제어가 일관되게 작동할 것으로 예상하기 때문에 이러한 상호작용과 충돌을 일으킬 수 있는 사용자 설정 제스처를 정의하지 않는 것이 중요합니다. 게임 또는 몰입형 경험의 특정 상황의 경우 개발자는 시스템 제스처를 유예하여 이러한 영역을 우회해 작업할 수 있습니다. 자세한 정보는 iOS, iPadOS, watchOS 및 visionOS의 플랫폼 고려 사항을 참조하십시오.

## 플랫폼 고려 사항

### iOS, iPadOS

iOS 및 iPadOS는 모든 플랫폼에서 지원되는 [표준 제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#Standard-gestures)뿐만 아니라 사람들이 사용하는 몇 가지 다른 제스처도 지원합니다.

| 제스처 | 자주 쓰는 동작 |
| --- | --- |
| 세 손가락으로 쓸어넘기기 | 실행 취소(왼쪽으로 쓸어넘기기), 실행 복귀(오른쪽으로 쓸어넘기기) |
| 세 손가락으로 펼치기/오므리기 | 선택한 텍스트 복사(오므리기), 복사한 텍스트 붙여넣기(펼치기) |
| 네 손가락으로 쓸어넘기기(iPadOS만 해당) | 앱 간 전환 |
| 흔들기 | 실행 취소 시작, 실행 복귀 시작 |

**사용 경험을 향상한다면 여러 제스처의 동시 인식을 허용하십시오.** 동시 제스처가 게임 외 앱에서 유용할 가능성은 낮지만 게임에는 동시에 조작할 수 있는 여러 화면상 제어기(예: 조이스틱 및 발사 버튼)를 포함할 수 있습니다. iPadOS 앱에서 Apple Pencil 입력을 터치 스크린 입력과 함께 사용하는 방법에 대한 지침을 보려면 [Apple Pencil 및 손글씨 입력](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pencil-and-scribble)의 내용을 참조하십시오.

### macOS

사람들은 주로 [키보드](https://developer.apple.com/kr/design/human-interface-guidelines/keyboards) 및 마우스를 사용하여 macOS와 상호작용합니다. 또한 Magic Trackpad, Magic Mouse 또는 터치 표면이 있는 [게임 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls)에서 [표준 제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#Standard-gestures)를 사용할 수 있습니다.

### tvOS

사람들은 호환되는 리모컨, Siri Remote 또는 터치 표면이 있는 [게임 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls)에서 [표준 제스처](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#Standard-gestures)를 사용하여 tvOS 앱 및 게임을 탐색할 수 있다고 생각합니다. 지침을 보려면 [리모컨](https://developer.apple.com/kr/design/human-interface-guidelines/remotes)의 내용을 참조하십시오.

### visionOS

visionOS는 간접 및 직접 방식의 두 제스처 카테고리를 지원합니다.

사람들은 대상체를 바라봐 이를 가리킨 다음, 멀리 떨어진 해당 대상체를 손으로 간접적으로 조작하여 *간접* 제스처를 사용합니다. 예를 들어, 버튼을 바라봐 초점을 맞추고 손가락과 엄지를 함께 빠르게 탭하여 이를 선택할 수 있습니다. 간접 제스처는 어떤 거리에서도 간편하게 수행할 수 있기 때문에 최소한의 움직임으로 여러 대상체 간에 빠르게 초점을 변경하고 항목을 선택할 수 있습니다.

[video: visionOS의 윈도우 상단 부분을 보여주는 클로즈업 녹화 영상. 윈도우의 버튼이 하이라이트됨. 화면 속 화면 윈도우가 녹화 영상의 오른쪽 하단 모서리에 보임. 사람의 손이 간접 탭 제스처를 수행하고 있음. 제스처에 대한 반응으로 윈도우의 하이라이트된 버튼이 활성화됨.]

사람들은 *직접* 제스처를 사용하여 대화식 대상체를 물리적으로 터치합니다. 예를 들어, 가상 키를 탭하여 visionOS 키보드를 직접 입력할 수 있습니다. 직접 제스처는 가까운 거리일 때 사용하기 적합합니다. 긴 시간 동안 팔을 들고 있는 것은 힘들게 느껴질 수 있으므로 직접 제스처는 빈번하지 않은 작업에 사용하는 것이 적합합니다. visionOS는 모든 표준 제스처의 직접 버전 또한 지원하므로 직접 또는 간접 중 어느 방식으로 표준 구성요소와 상호작용할지 선택할 수 있습니다.

[video: visionOS에서 가상의 정육면체 블록 3개가 수직으로 쌓여 있는 테이블을 보여주는 녹화 영상. 사용자가 블록을 향해 오른쪽에서 왼쪽으로 손을 이동하고 펼친 손가락으로 가운데 블록을 터치하여 밀어냄. 가운데 블록이 옆으로 쓰러지고 다른 블록도 테이블 위에 떨어짐.]

다음은 visionOS에서 사용할 수 있는 표준 직접 제스처입니다. 표준 간접 제스처 목록은 [명세](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#Specifications)를 참조하십시오.

| 직접 제스처 | 일반적인 사용법 |
| --- | --- |
| 터치 | 직접 대상체를 선택하거나 활성화 |
| 길게 터치 | 빠른 메뉴 열기 |
| 터치 및 드래그 | 대상체를 새로운 위치로 이동 |
| 두 번 터치 | 대상체 또는 파일 미리보기, 편집 시 단어 선택 |
| 쓸어넘기기 | 동작 및 제어기 표시, 보기 해제, 스크롤 |
| 두 손으로 서로 가까워지거나 멀어지게 핀치하고 드래그 | 확대/축소 |
| 두 손으로 원 모양으로 핀치하고 드래그 | 대상체 회전 |

**적용 가능한 모든 곳에서 표준 제스처를 지원하십시오.** 예를 들어, 사람들은 앱 또는 게임에서 대상체를 보면 이를 선택하거나 활성화하기 위해 탭 제스처를 가장 먼저 수행할 것입니다. 사용자 설정 제스처를 지원하더라도 탭과 같은 표준 제스처를 지원하면 사람들이 앱 또는 게임을 빠르고 편안하게 사용할 수 있습니다.

**가능하다면 직접 및 간접 상호작용을 모두 제공하십시오.** UI 및 버튼과 같은 일반적인 구성요소의 경우 가급적 간접 제스처를 사용하십시오. 직접 제스처 및 사용자 설정 제스처는 게임 또는 대화식 경험에서 근접 상호작용 또는 특정 움직임이 필요한 대상체에 사용하십시오.

**입력에 특정 신체 움직임 또는 자세를 요구하지 마십시오.** 장애, 공간적 제약 또는 기타 환경적 요인 등의 이유로 사람들은 특정 신체 움직임을 수행하거나 특정한 자세를 취하지 못할 수도 있습니다. 제공하는 경험에 움직임이 필요한 경우, 사람들이 자신에게 가장 적합한 상호작용 방식을 선택할 수 있도록 대체 입력 방식을 지원하는 것을 고려하십시오.

#### visionOS에서 사용자 설정 제스처 디자인하기

기존 시스템 제스처를 사용하여 수행할 수 없는 특정 상호작용을 경험에 제공하려는 경우, 사용자 설정 제스처를 디자인하는 것을 고려하십시오. 이러한 유형의 상호작용을 제공하려면 앱을 전체 공간에서 실행하고, 손 정보에 접근할 수 있는 권한을 요청해야 합니다. 개발자 지침을 보려면 [Setting up access to ARKit data](https://developer.apple.com/documentation/visionos/setting-up-access-to-arkit-data)의 내용을 참조하십시오.

![visionOS 게임을 플레이하는 동안 두 손을 모아서 하트 모양을 만드는 사용자 설정 제스처를 수행하는 사람의 손이 담긴 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-custom-spatial-gesture-happy-beam@2x.png)

**편안함을 우선시하십시오.** 사용자 설정 제스처가 필요한 모든 상호작용이 인체공학적인지 계속 테스트하십시오. 잠시라도 팔을 들어야 하는 사용자 설정 상호작용을 하면 육체적으로 지칠 수 있으며 매우 유사한 동작을 여러 번 연속으로 반복하면 근육과 관절에 무리가 갈 수 있습니다.

**여러 손가락이나 양손을 사용하는 복잡한 사용자 설정 제스처는 신중히 고려하여 사용하십시오.** 앱 또는 게임을 사용하는 동안 사람들이 항상 양손을 사용할 수 있는 것은 아닙니다. 제공하는 경험에서 좀 더 복잡한 제스처를 요구하는 경우, 더 적은 움직임이 필요한 대체 제스처를 함께 제공하는 것을 고려하십시오.

**특정 손을 사용해야 하는 사용자 설정 제스처를 생성하지 마십시오.** 어떤 손으로 사용자 설정 제스처를 수행해야 하는지 기억하려면 인지적 부하가 높아질 수 있습니다. 또한 주로 사용하는 손이 있거나 팔다리 장애가 있는 사람에게 불편한 경험을 제공할 수 있습니다.

#### visionOS에서 시스템 오버레이 관련 작업하기

visionOS 2 이상에서는 한 손바닥을 바라보고 제스처를 수행하여 홈 및 제어 센터의 시스템 오버레이에 빠르게 접근할 수 있습니다. 이러한 상호작용은 시스템 전체에서 사용 가능하며, 시스템 오버레이에 접근하는 데에만 사용됩니다.

> **참고:** 시스템 오버레이는 visionOS 2 이상에서 제어 센터에 접근하는 기본 방식입니다. visionOS 1의 동작(위를 바라보기)은 손쉬운 사용 설정으로 계속 사용할 수 있습니다.

사용자 설정 제스처를 사용하거나 손에 콘텐츠를 고정하는 앱과 게임을 디자인하는 경우, 시스템 오버레이와의 상호작용을 고려하는 것이 중요합니다.

**손 근처 영역은 시스템 오버레이 및 관련 제스처를 위해 남겨 두십시오.** 가능하면 손 또는 손목에 콘텐츠를 고정하지 마십시오. 손에 고정되는 콘텐츠가 포함된 게임을 디자인하는 경우, 홈 표시기와의 충돌을 피하도록 손 근처 영역 바깥에 콘텐츠를 배치하십시오.

![손바닥이 위를 향하고 있는, 한 사람의 펼친 손이 표시된 일러스트. 손 위의 원형으로 된 점선이 해당 영역이 시스템 오버레이에 사용됨을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-hand-area-of-focus@2x.png)

![손바닥이 위를 향하고 있는, 한 사람의 펼친 손이 표시된 일러스트. 원 아이콘이 있는 버튼이 손바닥 위에 홈 표시기가 나타남을 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-spatial-gesture-home-indicator@2x.png)

![손바닥이 아래를 향하고 있는, 한 사람의 펼친 손이 표시된 일러스트. 손 위에 상태 막대가 표시된 오버레이가 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-spatial-gesture-control-center@2x.png)

**몰입형 앱 또는 게임을 디자인할 때 시스템 오버레이 동작을 유예하는 것을 고려하십시오.** 특정 상황의 경우 손바닥을 바라볼 때 홈 표시기가 나타나지 않아야 할 수 있습니다. 예를 들어, 가상의 손 또는 장갑을 사용하는 게임에서는 사람들이 여러 각도에서 자신의 손을 바라보더라도 게임 세계에 머물러 있어야 합니다. 이러한 경우, 앱을 전체 공간에서 실행 중일 때, 대신 탭을 해야 홈 표시기가 나타나도록 선택할 수 있습니다. 개발자 지침을 보려면 [persistentSystemOverlays(_:)](https://developer.apple.com/documentation/swiftui/view/persistentsystemoverlays(_:))의 내용을 참조하십시오.

![손바닥이 위를 향하고 있는 펼친 손이 이 사람의 시점에서 표시된 이미지. 원 아이콘이 있는 버튼이 손바닥 위에 홈 표시기가 나타남을 표시함. 이미지 배경에 이 사람의 주변인 방이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/gestures-default-home-indicator@2x.png)

![손바닥이 위를 향하고 있는 펼친 손이 이 사람의 시점에서 표시된 이미지. 원 아이콘이 있는 버튼이 손바닥 위에 홈 표시기가 나타남을 표시함. 이미지 배경에 완전 몰입형 공간의 숲이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/gestures-home-indicator-in-immersive-space@2x.png)

![두꺼운 우주복 장갑을 착용하고 펼친 손이 이 사람의 시점에서 표시된 이미지. 손바닥이 위를 향하고 있고 그 위에 아무 버튼도 없음. 이미지 배경에 완전 몰입형 공간의 별이 가득한 하늘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/gestures-fully-immersive-game-with-glove@2x.png)

> **참고:** visionOS 1용으로 개발한 앱 및 게임은 기본적으로 시스템 오버레이 동작을 유예합니다. 앱이 전체 공간에서 실행될 때 사람들이 손바닥을 바라보는 경우, 탭을 먼저 해야 홈 표시기가 나타납니다.

**손, 손목 및 팔뚝을 돌리는 움직임을 사용하는 사용자 설정 제스처를 디자인할 때 주의하십시오.** 이 특정 움직임은 시스템 오버레이를 표시하는 데 사용됩니다. 시스템 오버레이는 항상 앱 콘텐츠의 상단에 표시되고 앱에서는 표시되는 시점을 인식하지 못하기 때문에 충돌 가능성이 있는 사용자 설정 제스처 또는 콘텐츠를 테스트하는 것이 중요합니다.

### watchOS

#### 더블 탭

watchOS 11 이상에서는 더블 탭 제스처를 사용하여 목록과 스크롤 보기를 스크롤하고 수직 탭 보기 간에 이동할 수 있습니다. 그리고 앱에서, 또는 시스템이 스마트 스택에 표시하는 위젯이나 실시간 현황에서 토글 또는 버튼을 기본 동작으로 지정할 수 있습니다. 기본 동작이 있는 보기에서 더블 탭하면 해당 제어기가 하이라이트되고 동작이 수행됩니다. 또한 시스템은 [알림](https://developer.apple.com/kr/design/human-interface-guidelines/notifications)에서 제공하는 사용자 설정 동작에 대해 더블 탭을 지원하며, 알림에서 제거를 수행하지 않는 첫 번째 동작에 대해 수행됩니다.

**목록, 스크롤 보기 또는 수직 탭이 있는 보기에서 기본 동작을 설정하지 마십시오.** 이렇게 하면 사람들이 더블 탭할 때 예상하는 기본 탐색 동작과 충돌됩니다.

**보기에서 사람들이 가장 일반적으로 사용하는 버튼을 기본 동작으로 선택하십시오.** 더블 탭은 스크롤되지 않는 보기에서 사람들이 가장 많이 사용하는 동작을 수행할 때 유용하게 사용됩니다. 예를 들어, 미디어 제어기 보기에서 기본 동작을 재생/일시 정지 버튼으로 지정할 수 있습니다. 개발자 지침을 보려면 [handGestureShortcut(_:isEnabled:)](https://developer.apple.com/documentation/swiftui/view/handgestureshortcut(_:isenabled:)) 및 [primaryAction](https://developer.apple.com/documentation/swiftui/handgestureshortcut/primaryaction)의 내용을 참조하십시오.

## 명세

### 표준 제스처

시스템은 사람들이 기기(예: 터치 스크린, visionOS의 간접 제스처 또는 트랙패드, 마우스, 리모컨, 게임 컨트롤러와 같은 입력 기기)에서 익숙하게 사용하는 제스처를 지원하는 API를 제공합니다. 개발자 지침을 보려면 [Gestures](https://developer.apple.com/documentation/swiftui/gestures)의 내용을 참조하십시오.

| 제스처 | 지원 버전 | 자주 쓰는 동작 |
| --- | --- | --- |
| 탭 | iOS, iPadOS, macOS, tvOS, visionOS, watchOS | 제어기 활성화, 항목 선택 |
| 쓸어넘기기 | iOS, iPadOS, macOS, tvOS, visionOS, watchOS | 동작 및 제어기 표시, 보기 해제, 스크롤 |
| 드래그 | iOS, iPadOS, macOS, tvOS, visionOS, watchOS | UI 요소 이동 |
| 길게 터치(또는 핀치) | iOS, iPadOS, tvOS, visionOS, watchOS | 추가 제어기 또는 기능 표시 |
| 더블 탭 | iOS, iPadOS, macOS, tvOS, visionOS, watchOS | 확대, 이미 확대한 상태에서는 축소, Apple Watch Series 9 및 Apple Watch Ultra 2에서 기본 동작 수행 |
| 확대/축소 | iOS, iPadOS, macOS, tvOS, visionOS | 보기 확대/축소, 콘텐츠 확대 |
| 회전 | iOS, iPadOS, macOS, tvOS, visionOS | 선택한 항목 회전 |

특정 입력 기기에서 추가 제스처 및 버튼 누르기 지원에 대한 지침을 보려면 [포인팅 장치](https://developer.apple.com/kr/design/human-interface-guidelines/pointing-devices), [리모컨](https://developer.apple.com/kr/design/human-interface-guidelines/remotes) 및 [게임 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/game-controls)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[피드백](https://developer.apple.com/kr/design/human-interface-guidelines/feedback)

[눈](https://developer.apple.com/kr/design/human-interface-guidelines/eyes)

[햅틱 재생하기](https://developer.apple.com/kr/design/human-interface-guidelines/playing-haptics)

#### Developer 문서

[Gestures](https://developer.apple.com/documentation/swiftui/gestures) — SwiftUI

[UITouch](https://developer.apple.com/documentation/uikit/uitouch) — UIKit

#### 비디오

- [UI 애니메이션 및 전환 효과 향상하기](https://developer.apple.com/kr/videos/play/wwdc2024/10145) — 탐색 및 표시에 확대/축소 전환을 적용하여 앱에서 연속성을 향상시키는 방법과 SwiftUI 애니메이션으로 UIKit 뷰의 애니메이션을 구현하여 자연스럽게 이어지는 애니메이션을 손쉽게 빌드하는 방법을 알아봅니다.
- [공간 입력을 위한 디자인](https://developer.apple.com/kr/videos/play/wwdc2023/10073) — 눈과 손을 사용하는 훌륭한 상호작용을 디자인하는 방법을 배워보세요. 공간 입력의 디자인 원리와 최상의 입력 방식을 실현하는 방법을 살펴봅니다. 편안하고 직관적이며 만족스러운 공간 경험을 만들 수 있게 도와드립니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 9월 9일 | visionOS에서 시스템 오버레이 관련 작업을 하기 위한 지침이 추가되고 구성 업데이트가 적용됨. |
| 2023년 9월 15일 | watchOS에서 더블 탭을 포함하기 위해 명세가 업데이트됨. |
| 2023년 6월 21일 | 페이지 제목을 터치 스크린 제스처에서 변경하고 visionOS 지침을 포함하기 위해 업데이트됨. |
