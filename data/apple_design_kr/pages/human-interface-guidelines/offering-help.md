# 도움말 제공하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/offering-help

> 직관적이고 접근이 용이한 효율적인 경험을 제공하는 것이 가장 바람직하지만 필요에 따라 상황별 도움말을 제공할 수도 있습니다.

![도움말을 사용할 수 있음을 나타내는 물음표 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-offering-help-intro@2x.png)

## 모범 사례

**사람들에게 필요한 도움말 유형을 앱 작업에서 제공하도록 하십시오.** 예를 들어, 작업을 간결하게 설명하는 인라인 보기를 표시하여 사람들이 간단한 한두 단계의 작업을 수행하도록 도울 수 있습니다. 반대로 앱 또는 게임이 복잡한 작업이나 다중 단계 작업을 지원할 경우, 사람들이 더 큰 목표를 달성하는 방법을 알려주는 튜토리얼을 제공하는 편이 좋습니다. 일반적으로, 사람들이 현재 수행하는 동작 또는 작업과 직접적으로 연관된 도움말을 제공하고, 도움말이 필요하지 않을 경우 쉽게 닫거나 거부할 수 있도록 지원하십시오.

**도움말 콘텐츠에는 연관성 있고 일관적인 언어 및 이미지를 사용하십시오.** 지침은 항상 현재 맥락에 적합해야 합니다. 예를 들어, Siri Remote를 사용하여 tvOS 경험을 즐기는 사람에게 게임 컨트롤러용 팁이나 이미지를 표시하지 마십시오. 또한 플랫폼과 일치하는 용어와 설명을 사용하십시오. 예를 들어, iPhone에서 버튼을 클릭하거나 Mac에서 메뉴를 탭하게 하는 내용을 작성하지 마십시오.

**모든 도움말 콘텐츠를 포용적으로 만드십시오.** 지침을 보려면 [포용성](https://developer.apple.com/kr/design/human-interface-guidelines/inclusion)의 내용을 참조하십시오.

**표준 구성요소 또는 패턴 동작에 대한 설명으로 도움말 콘텐츠를 부풀리지 마십시오.** 대신, 표준 요소가 앱 또는 게임에서 수행하는 특정한 동작이나 작업에 대해 설명하십시오. 고유한 제어 방법을 제시하거나 비표준적인 방식으로 입력 기기를 사용(예: Siri Remote를 90도 회전시켜 잡기)하는 경험을 제공하는 경우, 긴 설명 대신 애니메이션이나 그래픽을 사용하여 사람들이 빠르게 배울 수 있도록 안내하십시오.

## 팁 만들기

팁은 앱의 기능을 사용하는 방법을 간결하게 설명하는 작고 순간적인 보기입니다. 팁은 앱에서 사람들에게 새롭거나 분명하지 않은 기능에 관해 가르쳐 주거나, 작업을 더 빠르게 완수하는 방법을 찾을 수 있게 도와주는 좋은 방법입니다. 개발자 지침을 보려면 [TipKit](https://developer.apple.com/documentation/TipKit)의 내용을 참조하십시오.

**앱의 사용자 인터페이스에 가장 적절한 팁 유형을 사용하십시오.** 콘텐츠 흐름을 유지하고 싶다면 팝오버 팁을 표시하고, 주변 정보가 보이도록 하려면 인라인 팁을 표시하십시오. 특정 UI 요소를 가리키려면 주석 스타일의 인라인 팁을 사용하고, 특정 UI와 관련이 없는 경우에는 힌트 스타일의 팁을 사용하면 됩니다.

![iPhone의 팝오버 스타일 팁 일러스트. 팁이 콘텐츠 근처 맨 위에 표시되며 파란색 별 아이콘으로 표현된 기능을 가리킴. 팁 아래의 콘텐츠는 가려져 있음.](https://developer.apple.com/images/com.apple.HIG/kr/offering-help-tip-popover@2x.png)

![iPhone의 주석 스타일 팁 일러스트. 팁이 콘텐츠 주변에 삽입되며 파란색 별 아이콘으로 표현된 기능을 가리킴. 팁 위와 아래에 대체 텍스트가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/offering-help-tip-annotation@2x.png)

![iPhone의 힌트 스타일 팁 일러스트. 팁이 콘텐츠 주변에 삽입됨. 팁 위와 아래에 대체 텍스트가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/offering-help-tip-hint@2x.png)

**간단한 기능에 대해 팁을 사용하십시오.** 팁은 설명하기 쉽고 사람들이 몇 가지 간단한 단계만으로 완료할 수 있는 기능에 가장 적합합니다. 세 번 이상의 동작이 필요한 기능은 팁을 사용하기에는 너무 복잡할 수 있습니다.

**팁을 짧고, 수행 가능하고, 매력 있게 만드십시오.** 팁의 목표는 사람들이 새로운 기능을 사용해 보도록 하는 것입니다. 동작 중심의 직접적인 표현을 사용하여 기능이 무슨 역할을 하고 어떻게 사용할 수 있는지 설명하십시오. 팁을 하나 또는 두 개의 문장으로 마무리하고, 다른 기능이나 사용자 흐름을 홍보하거나 그와 연관된 콘텐츠를 포함하지 않도록 하십시오. 홍보 목적의 콘텐츠란 무언가를 광고 또는 판매하거나 현재 진행 중인 작업과 무관한 콘텐츠를 의미합니다.

**의도한 대상에게 팁이 표시되도록 규칙을 정의하십시오.** 모든 사람이 모든 팁을 볼 필요는 없습니다. 예를 들어, 어떤 기능을 이미 사용해 본 사람은 그에 관해 설명하는 팁을 보고 싶어 하지 않을 것입니다. 매개변수 또는 이벤트에 기반한 적합성 규칙을 사용하여 팁이 언제 나타날지 제어하고, 적합한 사람에게만 팁을 표시하십시오. 앱에 두 개 이상의 팁이 있을 경우, 표시 빈도를 설정하여 팁이 적절한 주기(예: 24시간마다 한 번)로 표시되게 하십시오.

**사람들이 기능과 연관 지어 생각하는 이미지 또는 기호가 있을 경우, 이를 팁에 포함하고 채워진 변형을 우선적으로 사용해 보십시오.** 예를 들어, 팁에 별표가 있으면 팁이 즐겨찾기와 연관되어 있음을 알 수 있습니다.

![앞쪽에 채워지지 않은 파란색 별 기호가 있는 힌트 스타일 팁의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/offering-help-tip-symbol-usage-unfilled-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![앞쪽에 채워진 파란색 별 기호가 있는 힌트 스타일 팁의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/offering-help-tip-symbol-usage-filled-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

팁에 바로 연결되는 이미지로 기능을 표시하는 경우, 팁과 UI에 동일한 이미지를 반복하여 사용하지 마십시오.

![파란색 별 아이콘으로 표현된 기능을 가리키는 주석 스타일 팁의 일러스트. 팁의 앞쪽에 유사한 파란색 별 기호가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/offering-help-tip-symbol-usage-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![파란색 별 아이콘으로 표현된 기능을 가리키는 주석 스타일 팁의 일러스트. 팁에는 텍스트만 있고 함께 표시되는 기호가 생략됨.](https://developer.apple.com/images/com.apple.HIG/kr/offering-help-tip-symbol-usage-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**버튼을 사용하여 사람들을 정보 또는 옵션으로 안내하십시오.** 기능에 사용자화할 수 있는 설정이 포함되어 있거나, 기능을 더 알아볼 수 있는 영역으로 사람들을 안내하고 싶은 경우 버튼을 추가하는 것을 고려하십시오. 버튼을 통해 사람들은 해당 설정으로 바로 이동할 수 있습니다. 또는 유용한 다른 정보가 있을 경우, 설정 흐름과 같은 추가 리소스로 이동하는 버튼을 추가하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### macOS, visionOS

*툴팁*(사용자 문서에서는 *도움말 태그*라고 함)은 인터페이스에서 구성요소를 사용하는 방법을 간결하게 설명하는 작고 반투명한 보기를 표시합니다. iPhone 및 iPad 앱을 포함해 Mac에서 실행되는 앱의 경우, 요소 위에 포인터를 올려 놓으면 툴팁이 표시될 수 있습니다. visionOS 앱에서는 요소를 보거나 그 위에 포인터를 올려 놓을 때 툴팁이 표시될 수 있습니다. 개발자 지침을 보려면 [help(_:)](https://developer.apple.com/documentation/swiftui/view/help(_:)-6oiyb)의 내용을 참조하십시오.

![뒤로 버튼 위에 포인터가 있는 macOS Finder의 도구 막대 일러스트. 포인터 아래에 ‘이전에 본 폴더를 봅니다’라는 제목의 툴팁이 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/offering-help-macos-tooltip-help-tag@2x.png)

**사람들이 관심을 보이는 제어기만 설명하십시오.** 사람들이 특정 제어기에 관해 알아보려 하는 경우, 이들은 근처에 있는 제어기나 더 높은 수준의 작업을 어떻게 수행하는지에 관해서는 알고 싶어 하지 않습니다.

**제어기가 수행하는 동작 또는 작업에 관해 설명하십시오.** 많은 경우 ‘기본 설정 복구하기’ 또는 ‘목록에서 언어 추가 또는 제거하기’와 같이, 동사를 사용하여 설명해주는 것이 좋습니다.

**일반적으로 툴팁에서 제어기의 이름을 반복하지 마십시오.** 이름을 반복하면 툴팁의 자리만 차지하고 설명에 크게 도움이 되지 않습니다.

**간결하게 설명하십시오.** 가능한 한, 툴팁 콘텐츠를 최대 60에서 75자 정도로 제한하십시오(현지화를 거치면 텍스트의 길이가 달라질 수 있음). 간결하고 직접적으로 설명할 수 있도록 문장의 단편을 사용하고 관사를 생략하는 것을 고려하십시오. 긴 텍스트로 제어기를 설명해야 할 경우, 인터페이스 디자인을 간소화하는 것을 고려하십시오.

**문장식 대문자 표기법을 사용하십시오.** 문장식 대문자 표기법을 사용하면 더 일상적이고 친숙해 보입니다. 완전한 문장을 작성하는 경우, 앱의 스타일과 일관성을 맞추기 위해 필요한 것이 아니라면 문장 끝의 구두점을 생략하십시오.

**상황별 맞춤형 툴팁을 제공하십시오.** 예를 들어, 제어기의 다양한 상태에 따라 다른 텍스트를 제공할 수 있습니다.

## 리소스

#### 관련 콘텐츠

[온보딩](https://developer.apple.com/kr/design/human-interface-guidelines/onboarding)

[피드백](https://developer.apple.com/kr/design/human-interface-guidelines/feedback)

[글쓰기](https://developer.apple.com/kr/design/human-interface-guidelines/writing)

[도움말 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar#Help-menu)

#### Developer 문서

[TipKit](https://developer.apple.com/documentation/tipkit)

[NSHelpManager](https://developer.apple.com/documentation/appkit/nshelpmanager) — AppKit

#### 비디오

- [TipKit으로 기능 노출하기](https://developer.apple.com/kr/videos/play/wwdc2023/10229) — TipKit으로 사용자에게 앱 사용법을 알려주세요! 팁을 통해 효과적으로 유용한 정보를 전달하는 방법을 알아봅니다. 또한 자격 규칙을 설정해 적합한 대상에게 팁을 전달하는 법, 팁 표시 빈도를 제어하는 법과 성공적인 상호 작용을 위한 테스트 전략을 공유합니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 12월 5일 | 툴팁 만들기 지침에 visionOS가 추가됨. |
| 2023년 9월 12일 | 팁을 제공하기 위해 추가된 지침. |
