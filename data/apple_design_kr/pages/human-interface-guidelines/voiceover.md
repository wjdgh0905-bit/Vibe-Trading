# VoiceOver

Source: https://developer.apple.com/kr/design/human-interface-guidelines/voiceover

> VoiceOver는 화면을 보지 않아도 앱의 인터페이스를 경험할 수 있도록 돕는 화면 읽기 프로그램입니다.

![VoiceOver 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-VoiceOver-intro@2x.png)

VoiceOver를 지원하면 시각 장애가 있거나 시력이 좋지 않은 사람들이 디스플레이를 볼 수 없을 때 앱의 정보에 접근하고 앱 인터페이스 및 콘텐츠를 탐색하도록 도울 수 있습니다.

VoiceOver는 Apple 플랫폼을 위해 구축된 앱 및 게임에서 지원됩니다. [Apple’s Unity plug-ins](https://github.com/apple/unityplugins)을 사용하여 개발된 앱 및 게임에서도 지원됩니다. 관련된 지침을 보려면 [손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility)의 내용을 참조하십시오.

## 설명

앱의 인터페이스 및 표시되는 콘텐츠를 설명하는 대체 텍스트를 제공하여 VoiceOver에 앱의 콘텐츠에 대한 내용을 알릴 수 있습니다.

**중요한 모든 인터페이스 요소에 대체 레이블을 제공하십시오.** VoiceOver는 대체 레이블(화면상에 표시되지 않음)을 사용하여 앱의 인터페이스를 청각적으로 설명합니다. 시스템에서 제공한 제어기에는 기본적으로 일반 레이블이 있지만 앱의 기능을 설명할 수 있는 더 자세한 레이블을 제공하는 것이 좋습니다. 앱이 정의하는 사용자 설정 요소에 레이블을 추가하십시오. 앱의 인터페이스 및 콘텐츠가 변경되면 설명을 최신 상태로 유지하십시오. 개발자 지침을 보려면 [Accessibility modifiers](https://developer.apple.com/documentation/swiftui/view-accessibility)의 내용을 참조하십시오.

**의미 있는 이미지를 설명하십시오.** 앱 콘텐츠의 주요 이미지를 설명하지 않으면 사용자가 VoiceOver를 사용하여 해당 콘텐츠를 앱 내에서 완전하게 경험할 수 없습니다. VoiceOver는 이미지 주변의 인터페이스(예: 근처 캡션)도 이해할 수 있도록 돕기 때문에 이미지 자체가 전달하는 정보만 설명하십시오.

**차트 및 기타 인포그래픽에 모든 사람이 접근하기 쉽게 만드십시오.** 각 인포그래픽이 전달하는 내용을 설명하는 간결한 설명을 제공하십시오. 인포그래픽과 상호작용하여 더 많은 정보 또는 다른 정보를 확인할 수 있는 경우, VoiceOver 사용자도 해당 상호작용을 사용할 수 있도록 지원하십시오. 손쉬운 사용 API는 보조 기술이 상호작용 요소를 사용하는 사람들을 도울 수 있도록 사용자 설정 상호작용 요소를 표시하는 방법을 제공합니다. 지침을 보려면 [차트](https://developer.apple.com/kr/design/human-interface-guidelines/charts)의 내용을 참조하십시오.

**VoiceOver에서 장식용인 이미지는 제외하십시오.** 장식용이고 유용하거나 실행 가능한 정보를 전달하지 않는 이미지는 설명할 필요가 없습니다. 해당 이미지를 제외하면 사람들의 시간을 존중하고 VoiceOver 사용자의 인지 부하를 줄일 수 있습니다. 개발자 지침을 보려면 [accessibilityHidden(_:)](https://developer.apple.com/documentation/swiftui/view/accessibilityhidden(_:)), [accessibilityElement](https://developer.apple.com/documentation/appkit/nsaccessibility-c.protocol/accessibilityelement) 및 [isAccessibilityElement](https://developer.apple.com/documentation/uikit/uiaccessibilityelement/isaccessibilityelement)의 내용을 참조하십시오.

## 탐색

**정보 계층 구조를 탐색할 수 있도록 제목 및 머리말을 사용하십시오.** 제목은 앱의 페이지 또는 화면에 도착한 사람이 보조 기술을 통해 받게 되는 첫 번째 정보입니다. 각 페이지의 콘텐츠의 및 목적을 간결하게 설명하는 고유한 페이지를 제공하십시오. 마찬가지로 각 페이지의 정보 계층 구조를 머리 속으로 떠올릴 수 있도록 정확한 섹션 말머리를 사용하십시오.

**요소가 어떻게 그룹화, 정렬 또는 연결되는지 지정하십시오.** 근접성, 정렬 및 기타 문맥적 신호는 시력에 문제가 없는 사람들이 요소 간의 관계를 인지하도록 도움을 줍니다. 앱에서 요소 간의 관계가 시각적으로만 표시된 부분을 찾으십시오. 그런 다음, 해당 관계를 VoiceOver에 설명하십시오.

VoiceOver는 사람들이 활성 언어 및 지역에서 콘텐츠를 읽는 것과 동일한 순서로 요소를 읽습니다. 예를 들어, 미국 영어의 경우 위에서 아래, 왼쪽에서 오른쪽으로 읽습니다. 아래의 그룹화되지 않은 예제에서 VoiceOver는 각 이미지를 설명한 다음에 캡션으로 넘어갑니다. 그룹화된 예제에서 VoiceOver는 각 이미지를 각각의 캡션과 함께 설명합니다.

![iPhone의 상단 부분 일러스트. 화면상의 UI에 두 이미지가 표시됨. 왼쪽은 망고 바구니고 오른쪽은 아티초크 바구니임. 이미지 아래에 캡션에는 ‘망고는 망고속에 속하는 나무에서 자랍니다.’와 ‘아티초크는 엉겅퀴과에 속하는 품종에서 자랍니다.’라고 적혀 있음. 이미지 및 캡션은 모두 단일 VoiceOver 프레임 내에 들어 있습니다.](https://developer.apple.com/images/com.apple.HIG/kr/voiceover-incorrect-grouping@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![iPhone의 상단 부분 일러스트. 화면상의 UI에 두 이미지가 표시됨. 왼쪽은 망고 바구니고 오른쪽은 아티초크 바구니임. 이미지 아래에 캡션에는 ‘망고는 망고속에 속하는 나무에서 자랍니다.’와 ‘아티초크는 엉겅퀴과에 속하는 품종에서 자랍니다.’라고 적혀 있음. 망고 이미지와 해당 캡션만 단일 VoiceOver 프레임 내에 들어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/voiceover-correct-grouping@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

개발자 지침을 보려면 [shouldGroupAccessibilityChildren](https://developer.apple.com/documentation/objectivec/nsobject-swift.class/shouldgroupaccessibilitychildren)의 내용을 참조하십시오.

**시각적 콘텐츠 또는 레이아웃이 변경되면 VoiceOver에 전달하십시오.** 콘텐츠 또는 레이아웃에 예기치 않은 변경 사항이 발생하면 콘텐츠에 대한 머리 이해가 더 이상 정확하지 않기 때문에 사람들에게 혼란을 줄 수 있습니다. 시각적 변경 사항이 있을 경우 반드시 리포트하여 VoiceOver 및 기타 보조 기술을 통해 사람들이 콘텐츠에 대해 다시 파악할 수 있게 만들어야 합니다. 개발자 지침을 보려면 [AccessibilityNotification](https://developer.apple.com/documentation/accessibility/accessibilitynotification)의 내용을 참조하십시오.

**가능할 경우 VoiceOver 로터를 지원하십시오.** VoiceOver 로터라는 인터페이스 요소를 사용하여 머리말, 링크 및 기타 콘텐츠 유형으로 문서 또는 웹 페이지를 탐색할 수 있습니다. 해당 요소를 로터로 식별하여 앱에서 이러한 항목을 탐색하도록 도울 수 있습니다. 또한 로터는 점자 키보드를 불러올 수 있습니다. 개발자 지침을 보려면 [AccessibilityRotorEntry](https://developer.apple.com/documentation/swiftui/accessibilityrotorentry)(SwiftUI), [UIAccessibilityCustomRotor](https://developer.apple.com/documentation/uikit/uiaccessibilitycustomrotor)(UIKit) 및 [NSAccessibilityCustomRotor](https://developer.apple.com/documentation/appkit/nsaccessibilitycustomrotor)(AppKit)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### visionOS

**사용자 설정 제스처를 항상 사용할 수 없다는 사실을 유념하십시오.** visionOS에서 VoiceOver가 켜져 있는 경우, 사용자 설정 제스처를 정의하는 앱 및 게임은 기본적으로 손 입력을 받지 않습니다. 이렇게 하면 음성을 사용하여 인터페이스를 탐색할 수 있고 앱은 손 입력에 동시에 응답하지 않습니다. 표준 VoiceOver 제스처를 비활성화하고 앱에서 직접 손 입력을 처리하는 직접 제스처 모드를 활성화하여 이 동작을 끌 수 있습니다. 개발자 지침을 보려면 [Improving accessibility support in your visionOS app](https://developer.apple.com/documentation/visionos/improving-accessibility-support-in-your-app)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility)

[포용성](https://developer.apple.com/kr/design/human-interface-guidelines/inclusion)

#### Developer 문서

[Accessibility](https://developer.apple.com/documentation/accessibility)

[VoiceOver](https://developer.apple.com/documentation/accessibility/voiceover)

[Supporting VoiceOver in your app](https://developer.apple.com/documentation/uikit/supporting-voiceover-in-your-app)

#### 비디오

- [Writing Great Accessibility Labels](https://developer.apple.com/kr/videos/play/wwdc2019/254) — Great accessibility labels are the difference between someone using and loving your app or someone deleting your app. Experience VoiceOver as demonstrated by an Apple Accessibility engineer as she navigates complex UI and demonstrates how descriptive labels are an easy way to ensure your app is for everyone.
- [Tailor the VoiceOver experience in your data-rich apps](https://developer.apple.com/kr/videos/play/wwdc2021/10121) — Learn how to present complex data through VoiceOver with the Accessibility Custom Content API. Discover how you can deliver accessibility information in a concise form, and only when someone wants it. We’ll show you how you can integrate AXCustomContent and help people who want VoiceOver enabled to navigate your data-rich apps in an efficient manner.

To get the most out of this session, you should be familiar with general accessibility principles and VoiceOver accessibility APIs available in Swift and SwiftUI.
- [VoiceOver efficiency with custom rotors](https://developer.apple.com/kr/videos/play/wwdc2020/10116) — Discover how you can integrate custom rotors and help people who use VoiceOver navigate complex situations within your app. Learn how custom rotors can help people explore even the most intricate interfaces, explore how to implement a custom rotor, and find out how rotors can improve navigation for someone who relies on VoiceOver.

To get the most out of this session, you should be familiar with general accessibility principles and VoiceOver accessibility APIs on iOS and iPadOS. For an overview, watch “Making Apps More Accessible with Custom Actions.”

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 3월 7일 | 새로운 페이지. |
