# 윈도우

Source: https://developer.apple.com/kr/design/human-interface-guidelines/windows

> 윈도우는 앱이나 게임의 UI 보기와 구성요소를 표시합니다.

![닫기, 최소화, 전체 화면 버튼이 있는 윈도우의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-window-intro@2x.png)

iPadOS, macOS 및 visionOS에서 윈도우는 앱 콘텐츠의 시각적 경계를 정의하고 시스템의 다른 영역과 구분해 주며, 앱 내 및 앱 간에 멀티태스킹 작업흐름을 가능하게 합니다. 윈도우에는 프레임 및 윈도우 제어기와 같은 시스템 제공 인터페이스 요소가 포함되어 있어 사람들이 윈도우를 열고, 닫고, 크기를 조절하며, 재배치할 수 있습니다.

개념적으로 앱은 다음과 같은 두 가지 유형의 윈도우를 사용하여 콘텐츠를 표시합니다.

- *기본* 윈도우는 앱의 주요 탐색과 콘텐츠, 그리고 그와 관련된 동작을 표시합니다.
- *보조* 윈도우는 앱의 특정 작업 또는 영역을 표시합니다. 보조 윈도우는 하나의 경험에 특화되어 있어 다른 앱 영역으로 이동할 수 없고, 일반적으로 사람들이 작업을 마치고 나면 닫을 수 있는 버튼을 포함합니다.

모든 플랫폼에서 윈도우 내에 콘텐츠를 배치하는 것에 대한 지침을 보려면 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)의 내용을 참조하십시오. Apple Vision Pro 공간에 콘텐츠를 배치하는 것에 대한 지침을 보려면 [공간 레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout)의 내용을 참조하십시오. 개발자 지침을 보려면 [Windows](https://developer.apple.com/documentation/swiftui/windows)의 내용을 참조하십시오.

## 모범 사례

**멀티태스킹 및 다중 윈도우 작업흐름을 지원하려면 윈도우가 다양한 크기에 따라 유동적으로 조정되도록 하십시오.** 지침을 보려면 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout) 및 [멀티태스킹](https://developer.apple.com/kr/design/human-interface-guidelines/multitasking)의 내용을 참조하십시오.

**새로운 윈도우를 열기에 적절한 시점을 선택하십시오.** 별도의 윈도우에서 콘텐츠를 열면 사람들이 멀티태스킹을 하거나 맥락을 유지하는 데 유용합니다. 예를 들어, Mail 앱에서는 사람들이 작성 동작을 선택할 때마다 새로운 윈도우가 열리기 때문에 새로운 메시지와 기존 이메일을 동시에 볼 수 있습니다. 하지만 새로운 윈도우를 과도하게 열면 화면이 어수선해지고 앱 탐색이 혼란스러워질 수 있습니다. 앱에 적합한 경우가 아니면 새로운 윈도우를 기본 동작으로 열지 마십시오.

**콘텐츠를 새로운 윈도우에서 볼 수 있는 옵션을 제공하는 것을 고려하십시오.** 새로운 윈도우를 기본 동작으로 여는 것은 사용자 경험에 도움이 되는 경우가 아니면 피하는 것이 좋지만, 사람들이 다양한 방식으로 콘텐츠를 볼 수 있는 유연성을 제공하는 것도 매우 유용합니다. [빠른 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/context-menus) 또는 [파일 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar#File-menu)에서 명령을 통해 사람들이 새로운 윈도우에서 콘텐츠를 볼 수 있도록 하는 것을 고려하십시오. 개발자 지침을 보려면 [OpenWindowAction](https://developer.apple.com/documentation/swiftui/openwindowaction)의 내용을 참조하십시오.

**사용자 설정 윈도우 UI를 생성하지 마십시오.** 시스템 제공 윈도우는 사람들이 이해하고 인식할 수 있는 방식으로 디자인되고 동작합니다. 사용자 설정 윈도우 프레임 또는 제어기를 생성하지 말고, 시스템 제공 모양을 복제하려고 하지 마십시오. 시스템의 디자인과 동작을 완벽하게 일치시키지 않으면 앱이 제대로 작동하지 않는 것처럼 느껴질 수 있습니다.

**사용자 대면 콘텐츠에 *윈도우*라는 용어를 사용하십시오.** 시스템은 유형에 관계없이 앱 윈도우를 *윈도우*라고 지칭합니다. 다른 용어(윈도우 구현을 의미하는 *장면* 등을 포함)를 사용하면 사람들에게 혼란을 줄 수 있습니다.

## 플랫폼 고려 사항

*iOS, tvOS 또는 watchOS에서는 지원되지 않습니다.*

### iPadOS

윈도우는 사람들이 ‘멀티태스킹 및 제스처’ 설정에서 선택한 옵션에 따라 두 가지 방식 중 하나로 표시됩니다.

- **전체 화면.** 앱 윈도우가 전체 화면을 채우며, 사람들은 앱 전환기를 사용하여 서로 다른 앱 윈도우 간이나 동일한 앱의 여러 윈도우 간에 전환할 수 있습니다.
- **윈도우로 표시.** 사람들은 앱 윈도우의 크기를 자유롭게 조절할 수 있습니다. 여러 윈도우를 동시에 화면에 띄울 수 있으며, 사람들은 윈도우의 위치로 변경하고 전면으로 가져올 수 있습니다. 앱을 종료하더라도 시스템은 윈도우 크기 및 위치를 기억합니다.

**전체 화면**

![iPad에서 전체 화면으로 표시된 메모 앱 스크린샷. 자연 산책이란 제목의 문서가 열려 있음. 앱 인터페이스가 전체 화면을 채우고 있으며 윈도우에 테두리가 전혀 보이지 않음.](https://developer.apple.com/images/com.apple.HIG/kr/windows-ipad-notes-fullscreen@2x.png)

**윈도우로 표시**

![iPad에서 윈도우로 표시된 메모 앱 스크린샷. 자연 산책이란 제목의 문서가 열려 있음. 문서 윈도우가 화면 중앙을 차지하고 나머지 화면은 홈 화면 배경으로 채워져 있고 하단에는 Dock이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/windows-ipad-notes-windowed@2x.png)

**윈도우 제어기가 도구 막대 항목과 겹치지 않도록 하십시오.** 윈도우로 표시할 경우 앱 윈도우에는 도구 막대의 앞쪽 가장자리에 윈도우 제어기가 포함됩니다. 앱의 도구 막대 버튼이 앞쪽 가장자리에 있는 경우, 윈도우 제어기가 표시될 때 해당 버튼이 가려질 수 있습니다. 이를 방지하려면 버튼을 앞쪽 가장자리에 바로 배치하는 대신, 윈도우 제어기가 표시될 때 버튼을 안쪽으로 이동시키세요.

**제스처를 사용하여 새로운 윈도우에서 콘텐츠를 열도록 지원하는 것을 고려하십시오.** 예를 들어, 사람들은 펼치기/오므리기 제스처를 사용하여 메모 항목을 새로운 윈도우로 확장할 수 있습니다. 개발자 지침을 보려면 [collectionView(_:sceneActivationConfigurationForItemAt:point:)](https://developer.apple.com/documentation/uikit/uicollectionviewdelegate/collectionview(_:sceneactivationconfigurationforitemat:point:))(모음 보기의 항목에서 전환) 또는 [UIWindowScene.ActivationInteraction](https://developer.apple.com/documentation/uikit/uiwindowscene/activationinteraction)(기타 보기의 항목에서 전환)의 내용을 참조하십시오.

> **팁:** 사람들이 하나의 파일만 볼 수 있도록 하려는 경우 자체 윈도우를 생성하지 않고 파일을 표시할 수 있지만 앱에서는 다중 윈도우를 지원해야 합니다. 개발자 지침을 보려면 [QLPreviewSceneActivationConfiguration](https://developer.apple.com/documentation/quicklook/qlpreviewsceneactivationconfiguration)의 내용을 참조하십시오.

### macOS

macOS에서 사람들은 일반적으로 여러 앱을 동시에 실행합니다. 주로 하나의 데스크탑에 있는 여러 앱의 윈도우를 보고 여러 윈도우 간에 자주 전환하며, 자신의 작업 스타일에 맞게 윈도우를 이동, 크기 조절, 최소화 및 표시합니다.

윈도우를 설정하여 macOS에서 게임을 표시하는 방법을 알아보려면 [Managing your game window for Metal in macOS](https://developer.apple.com/documentation/metal/managing-your-game-window-for-metal-in-macos)의 내용을 참조하십시오.

#### macOS 윈도우 구조

macOS 윈도우는 프레임과 본문 영역으로 구성됩니다. 사람들은 프레임을 드래그하여 윈도우를 이동할 수 있으며, 주로 가장자리를 드래그하여 윈도우의 크기를 조절할 수 있습니다.

윈도우의 *프레임*은 본문 영역 위에 표시되며 윈도우 제어기 및 [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars)를 포함할 수 있습니다. 드문 경우, 윈도우에 본문 콘텐츠 아래에 보이는 프레임의 일부인 하단 막대가 표시될 수도 있습니다.

#### macOS 윈도우 상태

macOS 윈도우는 다음 세 가지 상태 중 하나가 될 수 있습니다.

- **메인.** 사람들이 보는 가장 맨 앞의 윈도우가 앱의 메인 윈도우입니다. 앱별로 하나의 메인 윈도우만 있을 수 있습니다.
- **키.** 키 윈도우는 활성 윈도우라고도 하며 사람들의 입력을 받습니다. 화면상에는 한 번에 하나의 키 윈도우만 있을 수 있습니다. 보통은 전면 앱의 메인 윈도우가 키 윈도우지만, 메인 윈도우 위에 떠 있는 패널과 같은 다른 윈도우도 키 윈도우가 될 수 있습니다. 일반적으로 사람들은 윈도우를 클릭하여 키 윈도우로 만듭니다. 앱의 Dock 아이콘을 클릭하여 앱의 모든 윈도우를 전면에 표시하는 경우에는 가장 최근에 접근한 윈도우만 키 윈도우가 됩니다.
- **비활성.** 전면에 없는 윈도우는 비활성 윈도우입니다.

시스템은 메인, 키 및 비활성 윈도우에 서로 다른 모양을 지정하여 시각적으로 식별할 수 있도록 돕습니다. 예를 들어, 키 윈도우는 닫기, 최소화, 확대 및 축소를 위한 제목 막대 옵션에 색상을 사용하지만 키 상태가 아닌 비활성 윈도우와 메인 윈도우는 이러한 옵션이 회색으로 표시됩니다. 또한 비활성 윈도우는 [머티리얼](https://developer.apple.com/kr/design/human-interface-guidelines/materials)(아래에 있는 콘텐츠의 색상을 윈도우로 가져올 수 있는 효과)을 사용하지 않아 덜 드러나고 메인 및 키 윈도우보다 시각적으로 더 멀리 떨어져 보입니다.

![세 개의 윈도우가 쌓여 있는 모습의 일러스트. 배경에 비활성 윈도우가 있고, 가운데에는 앱의 메인 윈도우가 있으며, 나머지 두 윈도우 위에 주요 윈도우가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/window-states@2x.png)

> **참고:** 일부 윈도우(주로 색상 또는 서체와 같은 패널)는 사람들이 윈도우의 제목 막대 또는 키보드 입력을 요구하는 구성요소(예: 텍스트 필드)를 클릭할 때에만 키 윈도우가 됩니다.

**사용자 설정 윈도우에 시스템 정의 모양을 사용하십시오.** 사람들은 화면상에 있는 윈도우 간의 시각적 차이를 바탕으로 전면 윈도우를 식별하고 어떤 윈도우에 입력할지 알 수 있습니다. 시스템 제공 구성요소를 사용하면 윈도우 상태가 변경될 때 윈도우의 배경 및 버튼 모양이 자동으로 업데이트되지만 사용자 설정 항목을 사용하는 경우에는 이 작업을 스스로 해야 합니다.

**사람들은 주로 윈도우의 하단 가장자리는 가리는 방식으로 윈도우를 재배치하기 때문에 하단 막대에 중요한 정보 또는 동작을 넣지 마십시오.** 이를 반드시 포함해야 하는 경우, 윈도우의 콘텐츠 또는 윈도우에서 선택된 항목과 직접적으로 관련된 소량의 정보만 표시하십시오. 예를 들어, Finder는 하단 막대(상태 막대라고 함)를 사용하여 윈도우에 있는 항목의 총수, 선택된 항목의 수, 디스크의 사용 가능 공간을 표시합니다. 하단 막대는 작으므로 표시할 정보가 많다면 인스펙터를 사용하는 것을 고려하십시오. 일반적으로 인스펙터는 Split View의 뒤쪽에 정보를 표시합니다.

### visionOS

visionOS는 기본 및 볼류메트릭이라는 두 가지 메인 윈도우 스타일을 정의합니다. 기본 윈도우(*윈도우*라고 함)와 볼류메트릭 윈도우(*볼륨*이라고 함) 모두 2D와 3D 콘텐츠를 표시할 수 있으며, 사람들은 공유 공간과 전체 공간에서 동시에 여러 윈도우와 볼륨을 볼 수 있습니다.

![visionOS의 윈도우가 표시된 일러스트. 일러스트에는 모서리가 둥근 직사각형 두 개가 평행하게 놓여 있고 살짝 떨어져 있으며 일정 각도로 기울어져 표시되고 윈도우 막대 위에 위치함.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-window-style-2d-window@2x.png)

![visionOS의 볼륨이 표시된 일러스트. 일러스트에는 반투명한 정육면체가 있음. 정육면체의 바닥은 다른 면보다 어두움. 정육면체의 앞면은 윈도우 막대 위에 위치함.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-window-style-3d-volume@2x.png)

> **참고:** visionOS 또한 수직면이 유리 배경을 사용하지 않는다는 점을 제외하면 기본 스타일과 유사한 *일반* 윈도우 스타일을 정의합니다. 개발자 지침을 보려면 [PlainWindowStyle](https://developer.apple.com/documentation/swiftui/plainwindowstyle)의 내용을 참조하십시오.

시스템은 사람들이 앱이나 게임에서 여는 첫 번째 윈도우 또는 볼륨의 초기 위치를 정의합니다. 공유 공간 및 전체 공간 모두에서 사람들은 윈도우 및 볼륨을 새로운 위치로 이동할 수 있습니다.

#### visionOS 윈도우

기본 윈도우 스타일은 *유리*라는 수정이 불가능한 배경 [머티리얼](https://developer.apple.com/kr/design/human-interface-guidelines/materials)을 사용하는 수직면으로 구성되며, 윈도우를 닫고 이동하고 크기를 조절할 수 있는 닫기 버튼, 윈도우 막대 및 크기 조절 제어기가 있습니다. 또한 윈도우에는 공유 버튼, [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars), [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars) 및 하나 이상의 [오너먼트](https://developer.apple.com/kr/design/human-interface-guidelines/ornaments)가 포함될 수도 있습니다. 기본적으로, visionOS는 동적 [크기 조절](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout#Scale)을 사용하여 보는 사람에 대한 근접 정도에 관계없이 윈도우 크기가 일관적인 것처럼 나타나도록 합니다. 개발자 지침을 보려면 [DefaultWindowStyle](https://developer.apple.com/documentation/swiftui/defaultwindowstyle)의 내용을 참조하십시오.

![이름이 ‘Hello World’인 visionOS 앱 윈도우의 스크린샷. 여러 경험을 시작할 수 있는 텍스트 및 버튼이 윈도우에 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-window-2d@2x.png)

**가급적 윈도우를 사용하여 친숙한 인터페이스를 표시하고 익숙하게 작업을 처리하도록 지원하십시오.** 이미 친숙한 인터페이스를 표시하여 사람들이 앱을 편안하게 사용하고 의미 있는 콘텐츠와 활동에 대해 더욱 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)을 할 수 있도록 지원하십시오. 게임 보드와 같이 경계가 있는 3D 콘텐츠를 표시하려는 경우 [visionOS 볼륨](https://developer.apple.com/kr/design/human-interface-guidelines/windows#visionOS-volumes)을 사용하는 것이 좋습니다.

**윈도우의 유리 배경을 유지하십시오.** 기본 유리 배경은 콘텐츠가 사람들의 주변 환경에 녹아들게 해주고 조명에 따라 동적으로 조정되며 반사된 모습과 그림자를 통해 윈도우의 크기와 위치를 나타냅니다. 유리 머티리얼을 제거하면 UI 요소와 텍스트를 알아보기 어려워지고 더 이상 서로 관련되어 보이지 않는 경향이 있습니다. 불투명한 배경을 사용하면 주변의 사람들이 잘 보이지 않게 되고 윈도우가 답답하고 무겁게 느껴질 수 있습니다.

**윈도우의 비어 있는 영역을 최소화하는 초기 윈도우 크기를 선택하십시오.** 기본적으로 윈도우의 크기는 1280x720pt입니다. 윈도우가 처음 열릴 때 시스템은 착용자의 약 2미터 앞에 윈도우를 배치하여 윈도우의 가시적인 너비는 약 3미터가 됩니다. 윈도우 내부에 비어 있는 공간이 너무 많으면 불필요하게 커보이며 사람들의 공간에 있는 다른 콘텐츠 또한 가리게 됩니다.

**윈도우의 콘텐츠에 적합한 처음 모양을 선택하십시오.** 예를 들어, Keynote는 슬라이드의 폭이 넓기 때문에 기본 윈도우의 폭이 넓은 반면 Safari는 대부분의 웹 페이지가 가로보다는 세로로 길기 때문에 기본 윈도우가 깁니다. 게임의 경우, 탑 쌓기 게임은 운전 게임보다 더 긴 윈도우에서 열릴 수 있습니다.

**콘텐츠가 잘 보일 수 있도록 각 윈도우의 최소 및 최대 크기를 선택하십시오.** 사람들은 공간을 사용자화할 때 윈도우의 크기를 조절하고 싶어 하지만, 레이아웃이 모든 크기에서 잘 조절되도록 해야 합니다. 윈도우의 최소 및 최대 크기를 설정하지 않은 경우, 윈도우가 너무 작아서 UI 요소가 겹치거나 너무 커서 앱 또는 게임을 사용할 수 없도록 만들 수 있습니다. 개발자 지침을 보려면 [Positioning and sizing windows](https://developer.apple.com/documentation/visionos/positioning-and-sizing-windows)의 내용을 참조하십시오.

![visionOS 앱 윈도우의 스크린샷. 윈도우에 궤도를 그리는 대상체에 대한 설명이 있고 위성, 달, 망원경을 보는 버튼이 포함됨. 위성 버튼이 선택되어 있고 3D 위성이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-window-2d-with-volume@2x.png)

**윈도우에 표시되는 3D 콘텐츠의 깊이를 최소화하십시오.** 시스템은 윈도우 내의 보기 및 제어기에 하이라이트 및 그림자를 추가하여 특히 사람들이 윈도우를 옆에서 볼 때 [심도](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout#Depth)을 나타내고 더 실감나게 느끼도록 도와줍니다. 윈도우에서 3D 콘텐츠를 표시할 수 있지만, 해당 콘텐츠가 윈도우의 표면에서 너무 멀리 확장되면 시스템이 이를 자릅니다. 더 깊은 3D 콘텐츠를 표시하려면 볼륨을 사용하십시오.

#### visionOS 볼륨

볼륨을 사용하여 어떤 각도에서도 볼 수 있는 2D 또는 3D 콘텐츠를 표시할 수 있습니다. 윈도우와 마찬가지로 볼륨에는 윈도우 관리 제어기가 포함되어 있지만, 윈도우와 다르게 볼륨의 닫기 버튼 및 윈도우 막대는 볼륨 주위를 이동할 때마다 보는 사람을 마주하는 방향으로 위치를 이동합니다. 개발자 지침을 보려면 [VolumetricWindowStyle](https://developer.apple.com/documentation/swiftui/volumetricwindowstyle)의 내용을 참조하십시오.

![윈도우 옆에 3D 지구본이 포함된 visionOS 볼륨이 있는 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-window-3d@2x.png)

**풍부한 3D 콘텐츠를 표시하는 경우 가급적 볼륨을 사용하십시오.** 이와 반대로, 친숙한 UI 중심 인터페이스를 표시하려면 일반적으로 [visionOS 윈도우](https://developer.apple.com/kr/design/human-interface-guidelines/windows#visionOS-windows)를 사용하는 것이 가장 좋습니다.

**여러 각도에서 잘 보이도록 2D 콘텐츠를 배치하십시오.** 볼륨 주위를 이동할 때마다 사람의 시야가 달라지므로 볼륨 2D 콘텐츠의 위치가 이해되지 않는 방식으로 바뀌는 것처럼 보일 수 있습니다. 2D 콘텐츠를 볼륨 내부 3D 콘텐츠의 특정 영역에 고정하려면 연결을 사용하면 됩니다.

**일반적으로 동적 크기 조절을 사용하십시오.** 동적 크기 조절은 보는 사람으로부터 멀리 있는 경우에도 볼륨의 콘텐츠를 편안하게 읽을 수 있고 쉽게 상호작용하도록 도와줍니다. 이와 반대로 볼륨의 콘텐츠가 소매 앱의 제품과 같이 실제 대상체를 나타내도록 하려는 경우, 고정 크기 조절(기본값)을 사용할 수 있습니다.

**기본 밑면 모양을 활용하여 사람들이 볼륨의 가장자리를 식별하도록 하십시오.** visionOS 2 이상에서 시스템은 사람들이 볼 때 테두리 주위에 부드러운 광택을 표시하여 볼륨의 수평 ‘바닥’, 즉 *밑면*이 자동으로 보이도록 합니다. 콘텐츠가 볼륨을 채우지 않는 경우 시스템 제공 광택을 통해 사람들이 볼륨의 가장자리를 인식할 수 있으며, 이는 크기 조절 제어기를 쉽게 찾을 수 있도록 하는 데 특히 유용할 수 있습니다. 이와 반대로, 콘텐츠가 풀 블리드 상태이거나 볼륨의 경계를 채우는 경우(또는 사용자 설정 밑면 모양을 표시하는 경우) 기본 광택이 필요하지 않을 수 있습니다.

**오너먼트에 유용한 콘텐츠를 제공하는 것을 고려하십시오.** visionOS 2 이상에서 볼륨에는 도구 막대 및 탭 막대 외에 오너먼트가 포함됩니다. 오너먼트를 사용하여 볼륨에서 복잡함을 줄이고 중요한 보기 또는 제어기의 주목도를 높일 수 있습니다. 연결 앵커를 사용하여 오너먼트의 위치(예: `topBack` 또는 `bottomFront`)를 지정하면 볼륨 주위를 이동할 때마다 보는 사람의 시야를 기준으로 오너먼트가 동일한 위치에 유지됩니다. 도구 막대 또는 탭 막대와 동일한 가장자리에 오너먼트를 배치하지 마십시오. 그리고 볼륨에서 중요한 콘텐츠에 지나치게 그림자를 드리우지 않도록 가급적 하나의 추가 오너먼트만 생성하십시오. 개발자 지침을 보려면 [ornament(visibility:attachmentAnchor:contentAlignment:ornament:)](https://developer.apple.com/documentation/swiftui/view/ornament(visibility:attachmentanchor:contentalignment:ornament:))의 내용을 참조하십시오.

**사람들이 볼륨과 상호작용하는 방식을 지원하는 정렬을 선택하십시오.** 사람들이 볼륨을 이동할 때 밑면을 사용자 주변 환경의 바닥과 평행하게 유지할 수 있거나, 한 사람이 보고 있는 각도와 일치하도록 기울일 수 있습니다. 일반적으로, 바닥과 평행하게 유지하는 볼륨은 사람들이 많이 상호작용하지 않는 콘텐츠에 적합한 반면, 사람이 보는 방향에 맞춰 기울어지는 볼륨은 보는 사람이 기대고 있는 경우에도 콘텐츠를 계속 편안하게 사용할 수 있습니다.

## 리소스

#### 관련 콘텐츠

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

[Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views)

[멀티태스킹](https://developer.apple.com/kr/design/human-interface-guidelines/multitasking)

#### Developer 문서

[Windows](https://developer.apple.com/documentation/swiftui/windows) — SwiftUI

[WindowGroup](https://developer.apple.com/documentation/swiftui/windowgroup) — SwiftUI

[UIWindow](https://developer.apple.com/documentation/uikit/uiwindow) — UIKit

[NSWindow](https://developer.apple.com/documentation/appkit/nswindow) — AppKit

#### 비디오

- [iPad 앱 디자인 향상하기](https://developer.apple.com/kr/videos/play/wwdc2025/208) — iPadOS에서 앱의 디자인과 분위기를 멋지게 만드세요. 크기 조절이 가능한 앱 윈도우를 위한 반응성 레이아웃을 설계하는 모범 사례를 확인할 수 있습니다. 윈도우 제어에 익숙해지고 이를 조정하는 최선의 방법을 알아보세요. 훌륭한 메뉴 바의 구성 요소를 살펴보고 새로운 포인터와 업데이트된 포인터 효과도 만나볼 수 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 모범 사례가 추가되고, iPadOS에서 크기 조절이 가능한 윈도우에 대한 지침이 업데이트됨. |
| 2024년 6월 10일 | visionOS 2에서 볼륨 사용에 대한 지침을 포함하기 위해 업데이트되고 게임별 예시가 추가됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
