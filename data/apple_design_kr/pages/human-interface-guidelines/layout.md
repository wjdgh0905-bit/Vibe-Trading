# 레이아웃

Source: https://developer.apple.com/kr/design/human-interface-guidelines/layout

> 다양한 상황에 맞게 조절되는 일관된 레이아웃은 경험을 더욱 친숙하게 만들고 사람들이 모든 기기에서 좋아하는 앱과 게임을 즐기도록 도와줍니다.

![더 큰 직사각형의 왼쪽 상단 사분면에 있는 작은 직사각형 스케치가 윈도우 내 사용자 인터페이스 요소의 위치를 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 노란색을 은은하게 반영하는 노란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/foundations-layout-intro@2x.png)

앱의 레이아웃은 사람들이 콘텐츠를 여는 순간부터 콘텐츠에 집중할 수 있도록 도와줍니다. 사람들은 앱의 기능을 사용하고 발견하는 데 도움이 되는 제어기와 콘텐츠 간의 익숙한 연관성을 기대하며, 이를 활용할 수 있도록 레이아웃을 디자인하면 앱이 플랫폼에 잘 어울리게 됩니다.

Apple은 Apple 기술을 통합하고 모든 Apple 플랫폼에서 실행되도록 앱과 게임을 디자인하는 데 유용한 템플릿, 가이드, 기타 리소스를 제공합니다. [Apple Design Resources](https://developer.apple.com/design/resources/)를 참조하십시오.

## 모범 사례

**사람들이 원하는 정보를 찾을 수 있도록 관련된 항목을 그룹화하십시오.** 예를 들어, 네거티브 공간, 배경 모양, 색상, 머티리얼 또는 구분선을 사용하여 관련된 요소들을 시각적으로 그룹화하고, 정보를 구별된 영역으로 분리할 수 있습니다. 그렇게 하는 경우, 콘텐츠 및 제어기가 명확하게 구별되도록 하십시오.

**중요한 정보에는 충분한 공간을 확보하여 쉽게 찾을 수 있도록 하십시오.** 사람들은 가장 중요한 정보를 먼저 보고 싶어 하기 때문에, 중요하지 않은 세부사항으로 가득 채워서 중요한 정보를 가리지 마십시오. 윈도우의 다른 부분에 보조 정보를 제공하거나 추가 보기에 포함할 수 있습니다.

**화면 또는 윈도우를 채우려면 콘텐츠를 확장하십시오.** 배경과 전체 화면 아트워크가 디스플레이 가장자리까지 표시되는지 확인하십시오. 또한 스크롤 가능한 레이아웃이 기기 화면의 하단 및 측면까지 이어지는지 확인하십시오. 사이드바 및 탭 막대와 같은 제어기 및 탐색 구성요소는 동일한 공간이 아닌 콘텐츠 상단에 나타나기 때문에 레이아웃에서 이 점을 고려하는 것이 중요합니다.

콘텐츠가 전체 윈도우를 차지하지 않을 때는 배경 확장 보기를 사용하여 콘텐츠가 사이드바나 인스펙터 아래와 같이 화면 양쪽의 제어기 레이어 뒤에 있는 것처럼 보이도록 만드십시오. 개발자 지침을 보려면 [backgroundExtensionEffect()](https://developer.apple.com/documentation/swiftui/view/backgroundextensioneffect()) 및 [UIBackgroundExtensionView](https://developer.apple.com/documentation/uikit/uibackgroundextensionview)의 내용을 참조하십시오.

![앞쪽 가장자리에 사이드바가 있는 전체 화면 iPad 앱의 스크린샷. 후지산 사진이 콘텐츠 영역의 상반부를 채움. 사진이 화면 상단에 이르면 살짝 흐리게 처리되어 있고, 도구 막대 항목이 뒤쪽 가장자리에 그룹화된 상태로 그 위에 떠 있음. 사진이 사이드바와 만나는 지점에서는 이미지가 뒤집히고, 흐리게 처리되고, 사이드바 아래에서 화면 가장자리까지 완전히 확장됨.](https://developer.apple.com/images/com.apple.HIG/kr/layout-background-extention-view@2x.png)

## 시각적 계층

**제어기를 콘텐츠와 구분하십시오.** Liquid Glass 머티리얼을 활용하여 iOS, iPadOS 및 macOS에서 일관되면서도 구별된 모양의 제어기를 제공하십시오. 배경 대신 스크롤 가장자리 효과를 사용하여 콘텐츠와 제어기 영역 간에 전환할 수 있게 하십시오. 지침을 보려면 [스크롤 보기](https://developer.apple.com/kr/design/human-interface-guidelines/scroll-views)의 내용을 참조하십시오.

**상대적 중요성을 전달하기 위해 항목을 배치하십시오.** 사람들은 읽기 순서대로, 즉 상단에서 하단으로 그리고 선행에서 후행으로 항목을 보고 시작하는 경우가 많습니다. 따라서 일반적으로 윈도우, 디스플레이 또는 [시야](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout#Field-of-view)의 상단 및 선행 근처에 가장 중요한 항목을 배치하는 것이 좋습니다. 언어마다 읽는 순서가 다르다는 점을 유의하고, 디자인할 때 [오른쪽에서 왼쪽](https://developer.apple.com/kr/design/human-interface-guidelines/right-to-left)으로 읽는 언어를 고려하십시오.

**더욱 쉽게 스캔하고 조직 및 계층이 명확히 전달되도록 구성요소를 서로 정렬하십시오.** 정렬하면 앱이 깔끔하고 정돈되게 보이며, 사람들이 스크롤하거나 눈을 움직이는 동안 콘텐츠를 추적하여 정보를 쉽게 찾을 수 있습니다. 또한 정렬은 들여쓰기와 함께 사용하여 사람들이 정보 계층을 이해할 수 있도록 도와줍니다.

**사람들이 현재 가려진 콘텐츠를 찾을 수 있도록 점진적 표시 방법을 활용하십시오.** 예를 들어, 큰 모음에 있는 모든 항목을 한 번에 표시할 수 없는 경우, 현재 표시할 수 없는 추가 항목이 있음을 나타내야 합니다. 플랫폼에 따라 [펼침 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/disclosure-controls)를 사용하거나, 보기와 상호작용(예: 스크롤)하여 사람들이 추가 콘텐츠를 표시할 수 있음을 알리기 위해 항목의 일부를 표시할 수 있습니다.

**제어기 주변에 충분한 공간을 확보하고 논리적인 섹션으로 그룹화하여 제어기를 더 쉽게 사용하도록 하십시오.** 관련이 없는 제어기가 서로 너무 가까이 있는 경우나 다른 콘텐츠가 해당 제어기의 자리를 차지하는 경우 사람들이 제어기의 기능을 구별하거나 이해하는 것이 어려울 수 있으며, 이로 인해 앱 또는 게임 이용이 어려워질 수 있습니다. 지침을 보려면 [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars)의 내용을 참조하십시오.

## 적응성

모든 앱과 게임은 기기 또는 시스템 컨텍스트가 변경될 경우 이에 맞게 조정되어야 합니다. iOS, iPadOS, tvOS 및 visionOS에서 시스템은 앱 또는 게임이 표시되는 방식에 영향을 줄 수 있는 기기 환경의 변화를 특징으로 하는 *특성*의 모음을 정의합니다. SwiftUI 또는 자동 레이아웃을 사용하면 인터페이스가 다양한 범위의 특성과 상황에 맞게 동적으로 조정되는지 확인할 수 있습니다. 이러한 도구를 사용하지 않으면 대체 방법을 사용하여 작업을 수행해야 합니다.

다뤄야 하는 가장 일반적인 기기 및 시스템 변형은 다음과 같습니다.

- 다양한 기기 화면 크기, 해상도 및 색상 공간
- 다양한 기기 방향(세로/가로)
- Dynamic Island 및 카메라 제어기와 같은 시스템 기능
- iPad의 외장 디스플레이 지원, 디스플레이 확대/축소 및 크기 조절이 가능한 윈도우
- 다이나믹 타입 텍스트 크기 변경
- 왼쪽에서 오른쪽으로/오른쪽에서 왼쪽으로 레이아웃 방향, 날짜/시간/숫자 형식, 서체 변경 및 텍스트 길이와 같은 지역 기반 다국어 기능

**바로 알아볼 수 있도록 일관성을 유지하면서 변하는 상황에 따라 적절하게 조절되는 레이아웃을 디자인하십시오.** 사람들은 기기를 회전하거나, 윈도우의 크기를 조절하거나, 다른 디스플레이를 추가하거나, 다른 기기로 전환할 때 사용 경험이 원활하게 작동하거나 친숙한 상태일 것이라고 예상합니다. 인터페이스에서 보기의 배치를 미세 조정하기 위해 시스템 정의 안전 영역, 여백 및 안내선(사용 가능한 경우)을 반영하고 레이아웃 편집자를 지정하여 조절 가능한 인터페이스를 보장할 수 있습니다.

**텍스트 크기 변경에 대비하십시오.** 사람들은 다른 텍스트 크기를 선택할 때 반응하는 앱과 게임을 좋아합니다. iOS, iPadOS, tvOS, visionOS 및 watchOS에서 표시되는 텍스트의 크기를 선택할 수 있는 기능인 [다이나믹 타입 지원하기](https://developer.apple.com/kr/design/human-interface-guidelines/typography#Supporting-Dynamic-Type)을 지원하면 텍스트 크기를 조절할 때 앱 또는 게임이 적절하게 반응할 수 있습니다. 유니티 기반 게임에서 다이나믹 타입을 지원하려면 Apple의 손쉬운 사용 플러그인을 사용하십시오. 개발자 지침을 보려면 [Apple – Accessibility](https://github.com/apple/unityplugins/blob/main/plug-ins/Apple.Accessibility/Apple.Accessibility_Unity/Assets/Apple.Accessibility/Documentation~/Apple.Accessibility.md)의 내용을 참조하십시오. 앱에서 텍스트 표시에 관한 지침을 보려면 [타이포그래피](https://developer.apple.com/kr/design/human-interface-guidelines/typography)의 내용을 참조하십시오.

**다양한 방향, 현지화 및 텍스트 크기를 사용하여 여러 기기에서 앱을 미리 보십시오.** 먼저 가장 큰 레이아웃과 가장 작은 레이아웃을 사용하는 환경 버전을 테스트하여 테스트 프로세스를 간소화할 수 있습니다. 일반적으로 실제 기기에서 넓은 색영역 색상과 같은 기능을 미리 보는 것이 가장 좋지만 Device Hub의 시뮬레이션 기기에서 테스트하여 클리핑 및 기타 레이아웃 문제를 확인할 수 있습니다. 예를 들어 iOS 앱 또는 게임이 가로 모드를 지원하는 경우, 시뮬레이터를 사용하여 기기가 왼쪽으로 회전하든 오른쪽으로 회전하든 레이아웃이 잘 표시되는지 확인할 수 있습니다.

**필요한 경우 디스플레이 변경에 따라 아트워크의 크기를 조절하십시오.** 예를 들어, 다른 화면 영상비가 적용된 환경에서 앱 또는 게임을 보면 아트워크가 잘리거나 아트워크에 레터박스 또는 필러박스가 표시될 수 있습니다. 이런 경우에는 아트워크의 영상비를 변경하지 말고, 그 대신 아트워크의 크기를 조절하여 중요한 시각적 콘텐츠가 계속 표시되도록 하십시오. visionOS에서는 윈도우가 z축을 따라 이동하면 시스템이 자동으로 윈도우의 [크기 조절](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout#Scale)합니다.

## 안내선 및 안전 영역

*레이아웃 안내선*은 화면에서 콘텐츠를 배치, 정렬 및 간격 조정하도록 하는 직사각형 영역을 정의합니다. 시스템에는 미리 정의된 레이아웃 안내선이 포함되어 있어 콘텐츠 주변의 표준 여백을 쉽게 적용하고 최적의 가독성을 위해 텍스트 너비를 제한할 수 있습니다. 사용자 설정 레이아웃 안내선을 정의할 수도 있습니다. 개발자 지침을 보려면 [UILayoutGuide](https://developer.apple.com/documentation/uikit/uilayoutguide) 및 [NSLayoutGuide](https://developer.apple.com/documentation/appkit/nslayoutguide)의 내용을 참조하십시오.

*안전 영역*은 도구 막대, 탭 막대 또는 윈도우에 의해 나타나는 기타 보기로 가려지지 않는 보기 안의 영역을 정의합니다. 안전 영역은 iPhone의 Dynamic Island 또는 일부 Mac 모델의 카메라 하우징과 같이 기기의 상호작용 및 디스플레이 기능을 피하기 위해 반드시 필요합니다. 개발자 지침을 보려면 [SafeAreaRegions](https://developer.apple.com/documentation/swiftui/safearearegions) 및 [Positioning content relative to the safe area](https://developer.apple.com/documentation/uikit/positioning-content-relative-to-the-safe-area)의 내용을 참조하십시오.

**각 플랫폼에서 주요 디스플레이 및 시스템 기능을 고려하십시오.** 앱 또는 게임이 이러한 기능에 부합하지 않는 경우, 플랫폼에 잘 어우러지지 않고 사람들이 사용하기 어려울 수 있습니다. 안전 영역은 디스플레이 및 시스템 기능을 방지하는 것 외에도 막대와 같은 상호작용 구성요소도 고려하여, 크기가 변경되면 콘텐츠를 동적으로 재배치합니다.

각 플랫폼의 안내선 및 안전 영역이 포함된 템플릿을 사용하려면 [Apple Design Resources](https://developer.apple.com/design/resources/)의 내용을 참조하십시오.

## 플랫폼 고려 사항

### iOS

**세로 및 가로 방향 모두 지원하십시오.** 사람들은 여러 기기 방향에서 모두 잘 작동하는 앱과 게임을 높이 평가하지만 때로는 세로 모드나 가로 모드에서만 실행해야 하는 환경이 있을 수도 있습니다. 이 경우 지원하는 방향을 결정하기 전에 두 가지 방향을 시도하는 사람들의 경험을 활용할 수 있으므로 사람들에게 기기를 회전하라고 말하지 않아도 됩니다. 앱 또는 게임이 가로 전용인 경우 사람들이 기기를 좌우로 회전하는지에 관계없이 동일하게 잘 실행되는지 확인하십시오.

**가급적 게임에 풀 블리드 인터페이스를 사용하십시오.** 모서리 반경, 센서 하우징 및 Dynamic Island와 같은 기능을 포함하면서 화면을 채우는 멋진 인터페이스를 플레이어에게 선사하십시오. 필요한 경우 플레이어에게 레터박스 또는 필러박스 모양을 사용하여 게임을 볼 수 있는 옵션을 제공해 보십시오.

**전각 버튼을 피하십시오.** 버튼은 시스템에서 정의한 여백을 준수하고 화면 가장자리에서 안쪽으로 삽입될 때 iOS에 잘 어울립니다. 전각 버튼을 포함해야 하는 경우 하드웨어의 곡률과 조화를 이루고 인접한 안전 영역에 맞춰 정렬되어야 합니다.

**값을 추가하거나 경험을 향상시킬 때에만 상태 막대를 가리십시오.** 상태 막대는 사람들이 유용하다고 여기는 정보를 표시하고 대부분의 앱이 완전히 사용하지 않는 화면의 한 영역을 차지하므로 일반적으로 계속 표시하는 것이 좋습니다. 다만 예외적으로 게임 플레이 또는 미디어 시청과 같은 심층적 환경을 제공하는 경우에는 상태 표시줄을 가리는 것이 합리적일 수 있습니다.

### iPadOS

사람들은 macOS의 윈도우 동작과 유사하게 윈도우 크기를 최소 너비와 높이까지 자유롭게 조절할 수 있습니다. 레이아웃을 디자인할 때 이러한 크기 조절 동작과 가능한 윈도우 크기의 전체 범위를 고려하는 것이 중요합니다. 지침을 보려면 [iPadOS](https://developer.apple.com/kr/design/human-interface-guidelines/multitasking#iPadOS) 및 [iPadOS](https://developer.apple.com/kr/design/human-interface-guidelines/windows#iPadOS)의 내용을 참조하십시오.

**누군가가 윈도우의 크기를 조절하면 가능한 한 오랫동안 콤팩트 보기로 전환하지 않도록 하십시오.** 먼저 전체 화면 보기에 맞춰 디자인하고, 전체 레이아웃 버전이 더 이상 화면에 맞지 않을 때만 콤팩트 보기로 전환하십시오. 이렇게 하면 다양한 상황에서 UI가 보다 안정적이고 친숙하게 느껴질 수 있습니다. [Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views)와 같이 더 복잡한 레이아웃의 경우 보기가 좁아지면 인스펙터와 같은 3차 열을 우선적으로 가리십시오.

**시스템에서 제공하는 일반적인 크기의 레이아웃을 테스트하고, 부드럽게 전환할 수 있게 하십시오.** 윈도우 제어기를 사용하면 윈도우를 화면의 절반, 1/3, 1/4에 맞게 정렬할 수 있으므로 다양한 기기에서 이러한 각 크기에 대한 레이아웃을 확인하는 것이 중요합니다. 사람들이 윈도우 크기를 최소에서 최대까지 조절할 때 예상치 못한 UI 변경 사항이 발생하는 것을 최소화해야 합니다.

**적응형 탐색을 위해 변환 가능한 탭 막대를 고려하십시오.** 많은 앱에서는 탐색을 위해 탭 막대와 사이드바 중 하나를 선택할 필요 없이, 두 가지 기능을 모두 제공하는 탭 막대 스타일을 사용할 수 있습니다. 앱은 처음에 사이드바나 탭 막대 중 선택한 방식으로 실행되며, 이후 사람들이 탭하여 두 방식 간에 전환할 수 있습니다. 보기의 크기가 조절되면 표시 스타일이 보기의 너비에 맞춰 변경됩니다. 지침을 보려면 [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)의 내용을 참조하십시오. 개발자 지침을 보려면 [sidebarAdaptable](https://developer.apple.com/documentation/swiftui/tabviewstyle/sidebaradaptable)의 내용을 참조하십시오.

### macOS

**윈도우 하단에 제어기나 중요한 정보를 배치하지 마십시오.** 사람들은 종종 윈도우를 움직여서 하단 가장자리가 화면 하단 아래에 위치하도록 합니다.

**윈도우 상단 가장자리에 있는 카메라 하우징 내에 콘텐츠를 표시하지 마십시오.** 개발자 지침을 보려면 [NSPrefersDisplaySafeAreaCompatibilityMode](https://developer.apple.com/documentation/bundleresources/information-property-list/nsprefersdisplaysafeareacompatibilitymode)의 내용을 참조하십시오.

### tvOS

**다양한 TV 크기에 맞춰 준비하십시오.** Apple TV에서는 레이아웃이 iPhone이나 iPad에서 동작하는 것처럼 화면의 크기에 맞게 자동으로 조절되지 않습니다. 그 대신 앱과 게임은 모든 디스플레이에서 동일한 인터페이스를 표시합니다. 다양한 화면 크기에서 잘 보일 수 있도록 레이아웃 디자인에 특별히 유의하십시오.

**화면의 안전 영역을 준수하십시오.** 기본 콘텐츠를 화면의 상단과 하단에서 60포인트, 측면에서 80포인트 떨어진 위치에 삽입하십시오. 사람들은 가장자리에 인접한 콘텐츠를 보는 데 어려움을 겪을 수 있으며, 오래된 TV에서 오버스캔으로 인해 의도치 않은 잘림이 발생할 수 있습니다. 의도적으로 화면 밖으로 이동하는, 화면 밖에 부분적으로 표시된 콘텐츠 및 요소만 이 범위 외부에 나타나도록 허용하십시오.

![사방에 안전 영역 테두리가 있는 TV 일러스트. 상단 및 하단 테두리의 너비는 60포인트이고, 양측 테두리의 너비는 모두 80포인트임.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-safe-zone@2x.png)

**초점을 맞출 수 있는 요소 간에 적절한 패딩을 포함하십시오.** UIKit 및 초점 API를 사용하면 초점이 맞춰질 때 요소가 커집니다. 초점이 맞춰질 때 요소가 어떻게 보이는지 고려하고, 중요한 정보가 서로 겹치지 않도록 하십시오. 개발자 지침을 보려면 [About focus interactions for Apple TV](https://developer.apple.com/documentation/uikit/about-focus-interactions-for-apple-tv)의 내용을 참조하십시오.

![초점을 맞출 수 있는 항목 간에 패딩을 표시하기 위해 음영이 있는 세로 직사각형을 사용하는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-padding@2x.png)

#### 그리드

다음 그리드 레이아웃은 최적의 보기 경험을 제공합니다. 초점을 맞추지 않은 행과 열 간에 적절한 간격을 사용하여 항목에 초점을 맞출 때 서로 겹쳐지는 것을 방지하십시오.

UIKit 모음 보기 흐름 요소를 사용하는 경우 그리드의 행 수는 콘텐츠의 너비와 간격에 따라 자동으로 결정됩니다. 개발자 지침을 보려면 [UICollectionViewFlowLayout](https://developer.apple.com/documentation/uikit/uicollectionviewflowlayout)의 내용을 참조하십시오.

**2열**

![미디어 항목의 2열 그리드를 표시하는 Apple TV 일러스트. 추가 미디어 항목이 화면 오른쪽 및 하단 가장자리에 부분적으로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-grid-2-column@2x.png)

#### 2열 그리드

| 속성 | 값 |
| --- | --- |
| 초점을 맞추지 않은 콘텐츠 너비 | 860pt |
| 가로 간격 | 40pt |
| 최소 세로 간격 | 100pt |

**3열**

![미디어 항목의 3열 그리드를 표시하는 Apple TV 일러스트. 추가 미디어 항목이 화면 오른쪽 및 하단 가장자리에 부분적으로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-grid-3-column@2x.png)

#### 3열 그리드

| 속성 | 값 |
| --- | --- |
| 초점을 맞추지 않은 콘텐츠 너비 | 560pt |
| 가로 간격 | 40pt |
| 최소 세로 간격 | 100pt |

**4열**

![미디어 항목의 4열 그리드를 표시하는 Apple TV 일러스트. 추가 미디어 항목이 화면 오른쪽에 부분적으로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-grid-4-column@2x.png)

#### 4열 그리드

| 속성 | 값 |
| --- | --- |
| 초점을 맞추지 않은 콘텐츠 너비 | 410pt |
| 가로 간격 | 40pt |
| 최소 세로 간격 | 100pt |

**5열**

![미디어 항목의 5열 그리드를 표시하는 Apple TV 일러스트. 추가 미디어 항목이 화면 오른쪽 및 하단 가장자리에 부분적으로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-grid-5-column@2x.png)

#### 5열 그리드

| 속성 | 값 |
| --- | --- |
| 초점을 맞추지 않은 콘텐츠 너비 | 320pt |
| 가로 간격 | 40pt |
| 최소 세로 간격 | 100pt |

**6열**

![미디어 항목의 6열 그리드를 표시하는 Apple TV 일러스트. 추가 미디어 항목이 화면 오른쪽 및 하단 가장자리에 부분적으로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-grid-6-column@2x.png)

#### 6열 그리드

| 속성 | 값 |
| --- | --- |
| 초점을 맞추지 않은 콘텐츠 너비 | 260pt |
| 가로 간격 | 40pt |
| 최소 세로 간격 | 100pt |

**7열**

![미디어 항목의 7열 그리드를 표시하는 Apple TV 일러스트. 추가 미디어 항목이 화면 오른쪽에 부분적으로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-grid-7-column@2x.png)

#### 7열 그리드

| 속성 | 값 |
| --- | --- |
| 초점을 맞추지 않은 콘텐츠 너비 | 217pt |
| 가로 간격 | 40pt |
| 최소 세로 간격 | 100pt |

**8열**

![미디어 항목의 8열 그리드를 표시하는 Apple TV 일러스트. 추가 미디어 항목이 화면 오른쪽 및 하단 가장자리에 부분적으로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-grid-8-column@2x.png)

#### 8열 그리드

| 속성 | 값 |
| --- | --- |
| 초점을 맞추지 않은 콘텐츠 너비 | 184pt |
| 가로 간격 | 40pt |
| 최소 세로 간격 | 100pt |

**9열**

![미디어 항목의 9열 그리드를 표시하는 Apple TV 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/visual-design-grid-9-column@2x.png)

#### 9열 그리드

| 속성 | 값 |
| --- | --- |
| 초점을 맞추지 않은 콘텐츠 너비 | 160pt |
| 가로 간격 | 40pt |
| 최소 세로 간격 | 100pt |

**제목이 있는 행에 대해 세로 간격을 더 포함하십시오.** 제목이 있는 행의 경우, 이전 행의 하단과 제목의 중앙 사이에 충분한 간격을 제공하여 혼잡을 방지하십시오. 해당 행에서 제목 하단과 초점을 맞추지 않은 항목 상단 사이에도 간격을 제공하십시오.

**일관된 간격을 사용하십시오.** 콘텐츠의 간격이 일관되지 않으면 더 이상 그리드처럼 보이지 않으며 사람들이 콘텐츠를 파악하기가 더 어려워집니다.

**부분적으로 가려진 콘텐츠를 대칭적으로 보이게 하십시오.** 완전히 표시된 콘텐츠에 주의를 기울이도록 하려면 화면 밖에 부분적으로 가려진 콘텐츠 너비를 화면 각 측면에서 동일하게 유지하십시오.

### visionOS

아래 지침은 visionOS 앱 또는 게임 윈도우 내에 콘텐츠를 배치하여 친숙하고 편안한 사용을 할 수 있도록 돕습니다. 공간에서 윈도우 표시에 대한 지침과 visionOS 앱에서 깊이, 크기 및 시야각 사용에 대한 모범 사례를 보려면 [공간 레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout)의 내용을 참조하십시오. visionOS 윈도우 구성요소에 관해 더 알아보려면 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/windows#visionOS)의 내용을 참조하십시오.

> **참고:** 표준 윈도우에서 콘텐츠에 깊이를 추가하면 콘텐츠가 z축을 따라 윈도우의 테두리 너머로 확장됩니다. 콘텐츠가 z축을 따라 너무 멀리 확장되는 경우 시스템이 이를 자릅니다.

**가장 중요한 콘텐츠 및 제어기를 앱 또는 게임 중앙에 배치하십시오.** 특히 윈도우가 큰 경우, 윈도우 중앙 근처에 콘텐츠가 표시되면 대체로 사람들이 더 쉽게 찾고 상호작용할 수 있습니다.

**윈도우의 콘텐츠를 테두리 내에 유지하십시오.** visionOS에서 시스템은 XY 평면에서 윈도우의 테두리 외부에 윈도우 제어기를 표시합니다. 예를 들어, 공유 메뉴는 윈도우 위에 나타나고 윈도우 크기 조절, 이동 및 닫기에 사용하는 제어기는 그 아래에 나타납니다. 2D 또는 3D 콘텐츠가 이 영역을 차지하면 사람들이 시스템 제공 제어기, 특히 윈도우 아래의 해당 제어기를 사용하기가 어려워질 수 있습니다.

**윈도우 내에 포함되지 않는 추가 제어기를 표시해야 하는 경우 오너먼트를 사용하십시오.** 오너먼트는 시스템 제공 제어기를 방해하지 않고 윈도우와 시각적으로 연결된 상태로 유지되는 앱 제어기를 제공합니다. 예를 들어, 윈도우의 도구 막대 및 탭 막대는 오너먼트로 나타납니다. 지침을 보려면 [오너먼트](https://developer.apple.com/kr/design/human-interface-guidelines/ornaments)의 내용을 참조하십시오.

**윈도우의 상호작용 구성요소를 사람들이 보기 쉽게 만드십시오.** 시각적으로 식별하기 쉽고 편안하도록 상호작용 구성요소 주변에 충분한 공간을 포함하고, 시스템 제공 호버 효과가 다른 콘텐츠를 가리지 않도록 방지해야 합니다. 예를 들어 버튼을 중앙이 60포인트 이상 떨어져 있도록 배치하십시오. 지침을 보려면 [눈](https://developer.apple.com/kr/design/human-interface-guidelines/eyes), [공간 레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout) 및 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/buttons#visionOS)의 내용을 참조하십시오.

### watchOS

**화면의 한 가장자리에서 다른 가장자리로 확장하도록 콘텐츠를 디자인하십시오.** Apple Watch 베젤은 콘텐츠 주변에 자연스러운 시각적 패딩을 제공합니다. 가치 있는 공간을 낭비하지 않으려면 요소 간의 패딩을 최소화하는 것을 고려하십시오.

![Apple Watch 운동 앱의 메인 운동 목록 일러스트. 콜아웃은 현재 초점을 맞춘 운동 항목이 사용 가능한 화면 영역의 전체 너비에 걸쳐 있음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/layout-full-width@2x.png)

**인터페이스에 두 개 또는 세 개 이상의 제어기를 나란히 배치하지 마십시오.** 일반적인 규칙은 글리프가 포함된 네 개 이상의 버튼 또는 텍스트가 포함된 세 개 이상의 버튼을 한 행에 표시하지 않는 것입니다. 일반적으로 텍스트 버튼이 화면의 전체 너비에 걸쳐 있도록 하는 것이 더 효과적이지만, 화면이 스크롤되지 않는 한 짧은 텍스트 레이블이 있는 두 개의 버튼을 나란히 배치하는 것도 좋습니다.

![텍스트 세 줄 아래에 두 개의 버튼이 나란히 표시된 Apple Watch 화면의 다이어그램.](https://developer.apple.com/images/com.apple.HIG/kr/layout-controls@2x.png)

**사람들이 다른 사람에게 보여주고 싶어 할 수 있는 보기에서 자동 회전을 지원하십시오.** 사람들이 손목을 휙 뒤집으면 앱은 일반적으로 디스플레이를 잠자기 모드로 전환하여 해당 동작에 반응하지만, 일부의 경우 콘텐츠를 자동 회전하는 것이 적합합니다. 예를 들어, 착용자가 친구에게 이미지를 보여주거나 읽는 사람에게 QR 코드를 표시하고 싶어 할 수 있습니다. 개발자 지침을 보려면 [isAutorotating](https://developer.apple.com/documentation/watchkit/wkextension/isautorotating)의 내용을 참조하십시오.

## 명세

### iOS, iPadOS 기기 화면 크기

| 모델 | 크기(세로) |
| --- | --- |
| iPad Pro 13 | 1032x1376pt(2064x2752px @2x) |
| iPad Pro 12.9 | 1024x1366pt(2048x2732px @2x) |
| iPad Pro 11(5세대 및 6세대) | 834x1210pt(1668x2420px @2x) |
| iPad Pro 11(1~4세대) | 834x1194pt(1668x2388px @2x) |
| iPad Pro 10.5 | 834x1112pt(1668x2224px @2x) |
| iPad Pro 9.7 | 768x1024pt(1536x2048px @2x) |
| iPad Air 13 | 1024x1366pt(2048x2732px @2x) |
| iPad Air 11 | 820x1180pt(1640x2360px @2x) |
| iPad Air 10.9 | 820x1180pt(1640x2360px @2x) |
| iPad Air 10.5 | 834x1112pt(1668x2224px @2x) |
| iPad Air 9.7 | 768x1024pt(1536x2048px @2x) |
| iPad 11 | 820x1180pt(1640x2360px @2x) |
| iPad 10.2 | 810x1080pt(1620x2160px @2x) |
| iPad 9.7 | 768x1024pt(1536x2048px @2x) |
| iPad mini 8.3 | 744x1133pt(1488x2266px @2x) |
| iPad mini 7.9 | 768x1024pt(1536x2048px @2x) |
| iPhone 17 Pro Max | 440x956pt(1320x2868px @3x) |
| iPhone 17 Pro | 402x874pt(1206x2622px @3x) |
| iPhone Air | 420x912pt(1260x2736px @3x) |
| iPhone 17 | 402x874pt(1206x2622px @3x) |
| iPhone 16 Pro Max | 440x956pt(1320x2868px @3x) |
| iPhone 16 Pro | 402x874pt(1206x2622px @3x) |
| iPhone 16 Plus | 430x932pt(1290x2796px @3x) |
| iPhone 16 | 393x852pt(1179x2556px @3x) |
| iPhone 16e | 390x844pt(1170x2532px @3x) |
| iPhone 15 Pro Max | 430x932pt(1290x2796px @3x) |
| iPhone 15 Pro | 393x852pt(1179x2556px @3x) |
| iPhone 15 Plus | 430x932pt(1290x2796px @3x) |
| iPhone 15 | 393x852pt(1179x2556px @3x) |
| iPhone 14 Pro Max | 430x932pt(1290x2796px @3x) |
| iPhone 14 Pro | 393x852pt(1179x2556px @3x) |
| iPhone 14 Plus | 428x926pt(1284x2778px @3x) |
| iPhone 14 | 390x844pt(1170x2532px @3x) |
| iPhone 13 Pro Max | 428x926pt(1284x2778px @3x) |
| iPhone 13 Pro | 390x844pt(1170x2532px @3x) |
| iPhone 13 | 390x844pt(1170x2532px @3x) |
| iPhone 13 mini | 360x780pt(1080x2340px @3x) |
| iPhone 12 Pro Max | 428x926pt(1284x2778px @3x) |
| iPhone 12 Pro | 390x844pt(1170x2532px @3x) |
| iPhone 12 | 390x844pt(1170x2532px @3x) |
| iPhone 12 mini | 360x780pt(1080x2340px @3x) |
| iPhone 11 Pro Max | 414x896pt(1242x2688px @3x) |
| iPhone 11 Pro | 375x812pt(1125x2436px @3x) |
| iPhone 11 | 414x896pt(828x1792px @2x) |
| iPhone XS Max | 414x896pt(1242x2688px @3x) |
| iPhone XS | 375x812pt(1125x2436px @3x) |
| iPhone XR | 414x896pt(828x1792px @2x) |
| iPhone X | 375x812pt(1125x2436px @3x) |
| iPhone 8 Plus | 414x736pt(1080x1920px @3x) |
| iPhone 8 | 375x667pt(750x1334px @2x) |
| iPhone 7 Plus | 414x736pt(1080x1920px @3x) |
| iPhone 7 | 375x667pt(750x1334px @2x) |
| iPhone 6s Plus | 414x736pt(1080x1920px @3x) |
| iPhone 6s | 375x667pt(750x1334px @2x) |
| iPhone 6 Plus | 414x736pt(1080x1920px @3x) |
| iPhone 6 | 375x667pt(750x1334px @2x) |
| iPhone SE 4.7 | 375x667pt(750x1334px @2x) |
| iPhone SE 4 | 320x568pt(640x1136px @2x) |
| iPod touch 5세대 이상 | 320x568pt(640x1136px @2x) |

> **참고:** 위의 표에 있는 모든 크기 조절 비율은 UIKit 크기 조절 비율이며, 이는 원래 크기 조절 비율과 다를 수 있습니다. 개발자 지침을 보려면 [scale](https://developer.apple.com/documentation/uikit/uiscreen/scale) 및 [nativeScale](https://developer.apple.com/documentation/uikit/uiscreen/nativescale)의 내용을 참조하십시오.

### iOS, iPadOS 기기 크기 유형

크기 유형의 값은 기본 또는 콤팩트입니다. 여기서 *기본*은 더 큰 화면 또는 가로 방향 화면을 나타내고 *콤팩트*는 더 작은 화면 또는 세로 방향 화면을 나타냅니다. 개발자 지침을 보려면 [UserInterfaceSizeClass](https://developer.apple.com/documentation/swiftui/userinterfacesizeclass)의 내용을 참조하십시오.

다양한 크기 유형 조합은 화면 크기에 따라 다양한 기기에서 전체 화면 경험에 적용됩니다.

| 모델 | 세로 방향 | 가로 방향 |
| --- | --- | --- |
| iPad Pro 12.9 | 기본 너비, 기본 높이 | 기본 너비, 기본 높이 |
| iPad Pro 11 | 기본 너비, 기본 높이 | 기본 너비, 기본 높이 |
| iPad Pro 10.5 | 기본 너비, 기본 높이 | 기본 너비, 기본 높이 |
| iPad Air 13 | 기본 너비, 기본 높이 | 기본 너비, 기본 높이 |
| iPad Air 11 | 기본 너비, 기본 높이 | 기본 너비, 기본 높이 |
| iPad 11 | 기본 너비, 기본 높이 | 기본 너비, 기본 높이 |
| iPad 9.7 | 기본 너비, 기본 높이 | 기본 너비, 기본 높이 |
| iPad mini 7.9 | 기본 너비, 기본 높이 | 기본 너비, 기본 높이 |
| iPhone 17 Pro Max | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 17 Pro | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone Air | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 17 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 16 Pro Max | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 16 Pro | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 16 Plus | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 16 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 16e | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 15 Pro Max | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 15 Pro | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 15 Plus | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 15 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 14 Pro Max | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 14 Pro | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 14 Plus | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 14 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 13 Pro Max | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 13 Pro | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 13 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 13 mini | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 12 Pro Max | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 12 Pro | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 12 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 12 mini | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 11 Pro Max | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 11 Pro | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 11 | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone XS Max | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone XS | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone XR | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone X | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 8 Plus | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 8 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 7 Plus | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 7 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone 6s Plus | 콤팩트 너비, 기본 높이 | 기본 너비, 콤팩트 높이 |
| iPhone 6s | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPhone SE | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |
| iPod touch 5세대 이상 | 콤팩트 너비, 기본 높이 | 콤팩트 너비, 콤팩트 높이 |

### watchOS 기기 화면 크기

| 시리즈 | 크기 | 너비(픽셀) | 높이(픽셀) |
| --- | --- | --- | --- |
| Apple Watch Ultra(3세대) | 49mm | 422 | 514 |
| 10, 11 | 42mm | 374 | 446 |
| 10, 11 | 46mm | 416 | 496 |
| Apple Watch Ultra(1세대 및 2세대) | 49mm | 410 | 502 |
| 7, 8 및 9 | 41mm | 352 | 430 |
| 7, 8 및 9 | 45mm | 396 | 484 |
| 4, 5, 6 및 SE(모든 세대) | 40mm | 324 | 394 |
| 4, 5, 6 및 SE(모든 세대) | 44mm | 368 | 448 |
| 1, 2 및 3 | 38mm | 272 | 340 |
| 1, 2 및 3 | 42mm | 312 | 390 |

## 리소스

#### 관련 콘텐츠

[오른쪽에서 왼쪽](https://developer.apple.com/kr/design/human-interface-guidelines/right-to-left)

[공간 레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout)

[레이아웃 및 구성](https://developer.apple.com/kr/design/human-interface-guidelines/layout-and-organization)

#### Developer 문서

[Composing custom layouts with SwiftUI](https://developer.apple.com/documentation/swiftui/composing-custom-layouts-with-swiftui) — SwiftUI

#### 비디오

- [새로운 디자인 시스템과 더 친숙해지는 법](https://developer.apple.com/kr/videos/play/wwdc2025/356) — 새로운 디자인 시스템을 자세히 확인하여 시각 디자인, 정보 아키텍처 및 핵심 시스템 구성 요소에 대한 주요 변경 사항을 확인하세요. 이 시스템이 인터페이스와 콘텐츠 간의 관계를 재편하여 기기, 화면 크기 및 입력 모드에 걸쳐 동적이고, 조화로우며, 일관성 있는 디자인을 만들도록 지원하는 방법을 알아보세요.
- [SwiftUI로 맞춤형 레이아웃 작성](https://developer.apple.com/kr/videos/play/wwdc2022/10056) — SwiftUI는 이제 앱의 인터페이스 레이아웃 수준을 한 단계 높이고 보기를 정렬할 수 있는 강력한 도구를 제공합니다. 고도로 맞춤화가 가능한 2차원 레이아웃을 만들 수 있는 그리드 컨테이너를 소개하고, 레이아웃 프로토콜을 사용하여 완전한 맞춤형 동작으로 나만의 컨테이너를 빌드하는 방법을 보여드립니다. 또한 레이아웃 유형 사이에 원활한 애니메이션 전환을 만드는 방법을 살펴보고, 우수한 인터페이스를 만들기 위한 팁과 모범 사례를 공유합니다.
- [필수적인 디자인 원칙](https://developer.apple.com/kr/videos/play/wwdc2017/802) — 디자인 원칙은 디자인이 안전, 유의미함, 성취감, 아름다움에 대한 인간의 욕구를 충족시키는 방법을 이해하는 데 있어 핵심적인 요소입니다. 디자인 원칙이 무엇인지와 이 원칙을 통해 사용자를 환영하고, 이해하기 쉽고, 유용하고, 만족스러운 사용자 경험을 디자인하는 방법을 다룹니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 9월 9일 | iPhone 17, iPhone Air, iPhone 17 Pro, iPhone 17 Pro Max, Apple Watch SE 3, Apple Watch Series 11 및 Apple Watch Ultra 3의 명세가 추가됨. |
| 2025년 6월 9일 | Liquid Glass의 지침이 추가됨. |
| 2025년 3월 7일 | iPhone 16e, iPad 11, iPad Air 11 및 iPad Air 13의 명세가 추가됨. |
| 2024년 9월 9일 | iPhone 16, iPhone 16 Plus, iPhone 16 Pro, iPhone 16 Pro Max 및 Apple Watch Series 10의 명세가 추가됨. |
| 2024년 6월 10일 | 일부 수정 사항 및 조직 업데이트가 적용됨. |
| 2024년 2월 2일 | iPadOS 앱 레이아웃의 시스템 제어기를 지양하는 방법에 대한 지침이 향상되고 iPad Air 10.9 및 iPad mini 8.3의 명세가 추가됨. |
| 2023년 12월 5일 | visionOS 윈도우의 중앙에 콘텐츠를 배치하는 방법에 대한 지침이 명시됨. |
| 2023년 9월 15일 | iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15 Plus, iPhone 15, Apple Watch Ultra 2 및 Apple Watch SE의 명세가 추가됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2022년 9월 14일 | iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14 Plus, iPhone 14 및 Apple Watch Ultra의 명세가 추가됨. |
