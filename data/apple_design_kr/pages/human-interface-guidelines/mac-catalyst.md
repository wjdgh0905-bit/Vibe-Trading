# Mac Catalyst

Source: https://developer.apple.com/kr/design/human-interface-guidelines/mac-catalyst

> Mac Catalyst를 사용하여 iPad 앱의 Mac 버전을 생성하면 사람들에게 새로운 환경에서 경험을 즐길 수 있는 기회를 제공합니다.

![Mac이 겹쳐진 iPad의 스케치가 iPad 앱이 Mac에서 실행됨을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-Mac-Catalyst-intro@2x.png)

## 시작하기 전에

많은 iPad 앱은 Mac Catalyst로 빌드된 Mac 앱을 생성할 수 있는 좋은 후보입니다. 이는 iPad에서 이미 잘 작동하고 다음과 같은 주요 iPad 기능을 지원하는 앱의 경우에 특히 그렇습니다.

**드래그 앤 드롭.** iPad 앱에서 드래그 앤 드롭을 지원하면 Mac 버전에서 드래그 앤 드롭에 대한 지원을 받을 수도 있습니다.

**키보드 탐색 및 단축키.** iPad에서 실제 키보드를 항상 사용할 수 있는 것은 아니지만 iPad 사용자는 키보드를 사용하여 탐색하고 키보드 단축키를 사용하여 상호작용을 간소화하고 싶어 합니다. Mac에서 사람들은 앱이 키보드 탐색 및 단축키를 모두 제공할 것으로 예상합니다.

**멀티태스킹.** Split View, Slide Over 및 화면 속 화면을 지원하기 위해 인터페이스의 크기를 잘 조절하는 앱은 Mac 사용자가 기대하는 광범위한 윈도우 크기 조절을 지원하는 데 필요한 토대를 마련합니다.

**다중 윈도우**. iPad에서 다중 장면을 지원하여 macOS 버전의 앱에서 다중 윈도우에 대한 지원을 받을 수도 있습니다.

좋은 iPad 앱은 Mac Catalyst로 빌드된 Mac 앱을 생성하기 위한 견고한 기반을 제공할 수 있지만 일부 앱은 Mac에 없는 프레임워크나 기능을 활용합니다. 예를 들어, 경험을 위한 필수적인 기능에 자이로스코프, 가속도계 또는 후면 카메라 등의 기능, HealthKit 또는 ARKit 등의 프레임워크가 필요한 경우나, 제공되는 기본 기능이 마킹, 손글씨 또는 탐색 등의 기능인 경우, 앱이 Mac에 적합하지 않을 수 있습니다.

Mac Catalyst로 iPad 앱의 Mac 버전을 생성하면 다음과 같은 기본적인 macOS 기능에 대한 앱 자동 지원을 제공합니다.

- 포인터 상호작용 및 키보드 기반 초점 및 탐색
- 윈도우 관리
- 도구 막대
- 편집에 필요한 빠른 메뉴뿐만 아니라 복사 및 붙여넣기를 포함한 리치 텍스트 상호작용
- 파일 관리
- 메뉴 막대 메뉴 구성
- 시스템 제공 설정 앱의 앱 특화 설정

시스템 제공 UI 요소도 더욱 Mac과 같은 모양으로 표시됩니다. 예를 들어 다음과 같습니다.

- Split View
- 파일 브라우저
- 동작 보기
- 양식 시트
- 상황별 동작
- 색상 선택기

Mac 경험을 차별화하는 특성에 대해 더 알아보려면 [macOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-macos)의 내용을 참조하십시오. 개발자 지침을 보려면 [Mac Catalyst](https://developer.apple.com/documentation/uikit/mac-catalyst)의 내용을 참조하십시오.

> **개발자 참고 사항:** Mac Catalyst를 사용하여 Mac 앱을 생성할 때 보기 및 제어기가 어떻게 변경될 수 있는지 확인하려면 [UIKit Catalog: Creating and customizing views and controls](https://developer.apple.com/documentation/uikit/uikit-catalog-creating-and-customizing-views-and-controls)를 다운로드하고 macOS 대상을 빌드하십시오.

## 관용어 선택하기

Mac Catalyst를 사용하여 Mac 앱을 처음 생성할 때 Xcode는 ‘Scale Interface to Match iPad’ 설정 또는 *iPad 관용어*로 기본 설정됩니다. 이 설정을 통해 시스템은 Mac 앱이 앱의 레이아웃을 크게 변경하지 않고도 macOS 디스플레이 환경과 일관성 있게 나타나도록 합니다. 하지만 iPad 관용어를 사용하면 iPadOS 보기 및 텍스트의 크기가 macOS에서 77%로 축소되기 때문에 텍스트와 그래픽이 약간 덜 자세하게 나타날 수 있습니다. 예를 들어, 시스템은 iPadOS 기준 서체 크기인 17pt를 사용하는 텍스트를 macOS에서 13pt로 축소합니다.

iPad 관용어를 사용하여 앱이 Mac에서 잘 작동하면 *Mac 관용어*로 전환하는 것을 고려하십시오. 이 설정을 통해 텍스트 및 아트워크가 더 자세하게 렌더링되고, 일부 인터페이스 요소 및 보기가 훨씬 더 Mac과 같은 모양으로 표시되며, 그래픽이 많이 필요한 앱에서는 향상된 성능과 낮은 전력 소비를 확인할 수 있습니다.

앱에 많은 텍스트, 자세한 아트워크 또는 애니메이션이 표시되면 Mac 관용어의 혜택을 누릴 가능성이 가장 높지만, 이 관용어를 선택하면 Mac 앱의 레이아웃, 텍스트 및 이미지를 업데이트하는 데 추가 시간을 들여야 함을 의미할 수도 있습니다.

**Mac 관용어를 사용할 때 앱의 레이아웃을 철저히 감사하고, 이에 대한 변경 계획을 세우십시오.** 이 작업에 도움이 되려면 iPad 앱의 애셋이 포함된 애셋 카탈로그를 재사용하는 대신 Mac 앱의 애셋이 포함된 별도의 애셋 카탈로그를 사용하는 것을 고려하십시오.

**필요에 따라 서체 크기를 조절하십시오.** Mac 관용어를 사용하면 텍스트가 구성된 크기의 100%로 렌더링되며, 조절하지 않으면 너무 크게 나타날 수 있습니다. 가능하다면 텍스트 스타일을 사용하고 고정된 서체 크기를 사용하지 마십시오.

**Mac 버전의 앱에서 보기 및 이미지가 잘 보이도록 하십시오.** Mac 관용어를 사용하면 iPadOS 보기가 100% 크기로 렌더링되어 더 자세하게 나타나게 됩니다. 차이점을 시각화할 수 있도록 아래에 표시된 이미지 애셋의 두 가지 묘사를 고려하십시오. 한 버전은 iPad 관용어를 사용할 때 애셋이 어떻게 나타나는지 보여주고, 다른 버전은 Mac 관용어를 사용할 때 애셋이 어떻게 나타나는지 보여줍니다. 두 묘사 모두 Mac 관용어를 사용할 때 이미지가 어떻게 더 자세하게 렌더링되는지 보여주기 위해 확대되어 있습니다.

**iPad 관용어**

![iPad 관용어를 선택하는 경우 시스템이 어떻게 덜 자세하게 렌더링하는지 보여주기 위해 지도 앱에서 캘리포니아 과학 아카데미 관심 지점의 아이콘이 확대됨.](https://developer.apple.com/images/com.apple.HIG/kr/ipad-idiom@2x.png)

**Mac 관용어**

![Mac 관용어를 선택하는 경우 시스템이 어떻게 더 자세하게 렌더링하는지 보여주기 위해 지도 앱에서 캘리포니아 과학 아카데미 관심 지점의 아이콘이 확대됨.](https://developer.apple.com/images/com.apple.HIG/kr/mac-idiom@2x.png)

> **개발자 참고 사항:** Mac 관용어를 사용하면 크기를 조절하지 않은 보기 및 인터페이스 요소는 다른 수치를 보고하며, 종종 상당한 양의 추가 작업을 초래합니다. 작업량을 줄이려면 고정된 서체, 보기 또는 레이아웃 크기를 사용하지 마십시오. 개발자 지침을 보려면 [Choosing a user interface idiom for your Mac app](https://developer.apple.com/documentation/uikit/choosing-a-user-interface-idiom-for-your-mac-app)의 내용을 참조하십시오.

**모양의 사용자 설정을 iPadOS에서 사용할 수 있는 것과 동일하거나 유사한 표준 macOS의 모양 사용자 설정으로 제한하십시오.** iPadOS 제어기에서 사용할 수 있는 모양 사용자 설정을 macOS 제어기에서 모두 사용할 수 있는 것은 아닙니다.

## Mac 경험 통합하기

Mac Catalyst를 사용하여 iPad 앱의 Mac 버전을 생성하면 Mac 앱이 사람들에게 풍부한 Mac 환경을 제공하도록 해야 합니다. 선택한 관용어와 상관없이 단순히 macOS 윈도우에 iPadOS 레이아웃을 표시하는 것 이상을 제공하는 것이 중요합니다.

iPadOS 및 macOS는 각각 사람들이 기기를 사용하는 다양한 방식에 뿌리를 둔 패턴과 규칙을 정의합니다. 특정 보기 및 제어기를 살펴보고 업데이트하기 전에 플랫폼 간의 주요 차이점에 익숙해지면 좋은 Mac 앱을 생성할 수 있습니다.

### 탐색

많은 iPad 및 Mac 앱은 유사한 방식으로 데이터를 구성하지만, 사람들이 데이터를 이해하고 탐색할 수 있도록 다양한 제어기와 시각적 지표를 사용합니다.

일반적으로 iPad 앱은 다음과 같은 구성요소를 사용하여 콘텐츠 및 기능을 구성합니다.

- [Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views). Split View는 기본 열, 추가 열(선택 사항) 및 보조 콘텐츠 패널을 보여주는 2열 또는 3열 인터페이스로 구성된 계층적 탐색을 지원합니다. 종종 앱은 기본 열을 사용하여 사이드바 기반 인터페이스를 생성하며, 사이드바 드라이브의 변경 사항이 추가 열(선택 사항)에서 변경되면 콘텐츠 패널의 콘텐츠에 영향을 미칩니다.
- [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars). 탭 막대는 화면 하단의 지속적인 막대에 상위 레벨 카테고리를 표시하여 병렬적 탐색을 지원합니다.
- [페이지 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/page-controls). 페이지 제어기는 화면 하단에 페이지 평면 목록에서 현재 페이지의 위치를 나타내는 점을 표시합니다.

iPad 앱에서 탭 막대를 사용하는 경우, 사이드바가 있는 Split View 또는 구분 제어기를 사용하는 것을 고려하십시오. 두 항목 모두 macOS 탐색 규칙과 유사합니다. Split View 또는 구분 제어기 중에서 선택하려면 다음을 고려하십시오.

- 사이드바가 있는 Split View는 상위 레벨 항목의 목록을 표시하며, 각각에서 하위 항목의 목록을 볼 수 있습니다. 사이드바를 사용하면 각 탭의 콘텐츠를 사이드바에서 사용할 수 있기 때문에 탐색을 간소화합니다. iPad 및 Mac 모두에서 사이드바를 사용하면 iPad 사용자가 Mac 버전의 앱을 쉽게 사용할 수 있는 일관적인 레이아웃을 생성할 수 있습니다.
- 구분 제어기 및 탭 막대는 모두 상호 배타적인 선택 등의 유사한 상호작용을 지원합니다. 일반적으로 탭 막대 대신 Split View를 사용하는 것이 구분 제어기를 사용하는 것보다 더 잘 작동합니다. 하지만 앱이 병렬적 탐색 계층을 사용하는 경우 구분 제어기가 Mac에서 잘 작동할 수 있습니다.

**사람들이 Mac 버전의 앱에서 중요한 탭 막대 항목에 대한 접근 권한을 유지하도록 하십시오.** iPad 앱에서 탭 막대 대신 Split View 또는 구분 제어기를 사용하는 것과 관계없이 macOS 보기 메뉴에 나열하여 상위 레벨 항목에 빠르게 접근할 수 있도록 하십시오.

**페이지 간에 이동할 수 있는 여러 가지 방법을 제공하십시오.** Mac 사용자, 특히 포인팅 장치 또는 키보드만 사용하여 상호작용하는 사용자는 페이지 간에 쓸어넘길 수 있는 iPad 또는 트랙패드 제스처 외에도 다음 및 이전 버튼을 선호합니다.

### 입력

iPad 및 Mac 모두 키보드, 마우스, 트랙패드와 같은 다양한 기기의 사용자 입력을 허용하지만 터치 상호작용은 iPadOS 규칙의 기본입니다. 이와 반대로, 키보드 및 마우스 상호작용은 대부분의 macOS 규칙에 영향을 미칩니다.

대부분의 iPadOS 제스처는 Mac Catalyst를 사용하여 Mac 앱을 생성할 때 자동으로 변환됩니다. 예를 들어 다음과 같습니다.

| iPadOS 제스처… | 마우스 상호작용으로 변환됨 |
| --- | --- |
| 탭 | 왼쪽 또는 오른쪽 클릭 |
| 길게 터치 | 길게 클릭 |
| 패닝 | 왼쪽 클릭 및 드래그 |

| iPadOS 제스처… | 트랙패드 제스처로 변환됨 |
| --- | --- |
| 탭 | 클릭 |
| 길게 터치 | 길게 클릭 |
| 패닝 | 클릭 및 드래그 |
| 핀치 | 핀치 |
| 회전 | 회전 |

> **개발자 참고 사항:** 시스템은 핀치 및 회전 제스처에서 두 번의 터치를 각 터치 아래의 보기가 아닌 포인터 아래의 보기로 전송합니다.

### 앱 아이콘

**앱 아이콘의 macOS 버전을 생성하십시오.** 좋은 macOS 앱 아이콘은 모든 플랫폼에서 조화로운 경험을 유지하면서 사람들이 macOS에서 기대하는 생생한 렌더링 스타일을 선보입니다.

### 레이아웃

Mac 사용자에게 훌륭한 경험을 제공하는 방식으로 더 넓은 Mac 화면을 활용하려면, 다음과 같은 방법으로 레이아웃을 업데이트하는 것을 고려하십시오.

- 콘텐츠 및 동작의 단일 열을 여러 열로 나누십시오.
- 일반 너비 및 일반 높이 크기 클래스를 사용하고, 사람들이 윈도우의 크기를 조절할 때 콘텐츠 영역의 요소가 나란히 정렬되도록 재배치하는 것을 고려하십시오.
- 팝오버를 사용하는 대신 메인 콘텐츠 옆에 인스펙터 UI를 표시하십시오.

**iPad 앱의 기본 UI에서 Mac 앱의 도구 막대로 제어기를 이동하는 것을 고려하십시오.** Mac 앱의 메뉴 막대의 메뉴에 해당 제어기와 관련된 명령을 나열해야 합니다.

**가능한 한, 하향식 흐름을 사용하십시오.** Mac 앱은 가장 중요한 동작 및 콘텐츠를 윈도우 상단 근처에 배치합니다. iPad 앱이 도구 막대에 제어기를 제공하는 경우, 해당 제어기를 macOS 버전의 앱의 윈도우 도구 막대에 두십시오.

**화면의 측면 및 하단 가장자리의 버튼을 재배치하십시오.** iPad에서 해당 화면 가장자리에 버튼을 배치하면 사람들이 접근하는 데 도움이 될 수 있지만, Mac에서는 이 인체공학적 고려 사항이 적용되지 않습니다. 해당 제어기를 다른 영역으로 재배치하거나 macOS 윈도우의 도구 막대에 둘 수 있습니다.

### 메뉴

Mac 사용자는 지속적인 메뉴 막대에 익숙하며 여기에서 앱의 모든 명령을 찾을 것으로 예상합니다. 이와 반대로, iPadOS에는 지속적인 메뉴 막대가 없으며, iPad 사용자는 연결된 키보드에서 Command 키를 누른 상태로 표시되는 단축키 인터페이스 또는 앱의 UI에서 앱 명령을 찾을 것으로 예상합니다.

> **개발자 참고 사항:** 메뉴 명령에 대한 키보드 단축키를 지원하려면 [UIKeyCommand](https://developer.apple.com/documentation/uikit/uikeycommand)를 사용하십시오. 개발자 지침을 보려면 [Adding menus and shortcuts to the menu bar and user interface](https://developer.apple.com/documentation/uikit/adding-menus-and-shortcuts-to-the-menu-bar-and-user-interface)의 내용을 참조하십시오.

iPad 앱의 메뉴를 표시하는 [팝업 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons) 또는 [풀 다운 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pull-down-buttons)을 제공하는 경우 메뉴는 Mac Catalyst로 생성한 Mac 앱에서 macOS 모양으로 자동으로 표시됩니다.

> **개발자 참고 사항:** 사용자 설정 앱 메뉴를 추가 및 제거하려면 [UIMenuBuilder](https://developer.apple.com/documentation/uikit/uimenubuilder)를 사용하고 [UICommand](https://developer.apple.com/documentation/uikit/uicommand)를 통해 iPad 앱 명령을 메뉴 항목으로 나타내는 메뉴 항목을 추가하십시오.

시스템은 iPad 앱의 빠른 메뉴를 macOS 버전의 앱의 빠른 메뉴로 자동으로 변환합니다. Mac 버전의 앱을 생성할 때 빠른 메뉴를 지원할 수 있는 추가 공간을 찾는 것을 고려하십시오. Mac 사용자는 앱의 모든 대상체가 관련 동작의 빠른 메뉴를 제공할 것으로 예상합니다. Mac에서는 context menu(빠른 메뉴)를 *contextual* menu(빠른 메뉴)라고도 합니다.

## 플랫폼 고려 사항

*iPadOS 또는 macOS에 대한 추가 고려 사항은 없습니다. iOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[macOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-macos)

#### Developer 문서

[Mac Catalyst](https://developer.apple.com/documentation/uikit/mac-catalyst) — UIKit

#### 비디오

- [Mac용 iPad 앱 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2019/809) — Discover how you can create a great Mac experience with your iPad app. Learn about essential techniques for adapting your iPad app's layout and architecture for Mac, considerations for type and color, and how you can take advantage of macOS interfaces such as the menu bar, sidebar and window toolbar.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 5월 2일 | 지침이 한 페이지로 통합됨. |
