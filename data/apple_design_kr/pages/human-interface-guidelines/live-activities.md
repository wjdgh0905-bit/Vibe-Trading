# 실시간 현황

Source: https://developer.apple.com/kr/design/human-interface-guidelines/live-activities

> 실시간 현황으로 활동, 이벤트 또는 작업의 진행 상태를 한눈에 볼 수 있습니다.

![축소 및 확장된 형태로 실시간 스포츠 경기의 점수를 표시하는 Dynamic Island의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-live-activities-intro@2x.png)

실시간 현황을 사용하면 모든 기기에서 쉽게 파악할 수 있는 위치를 통해 작업과 이벤트를 추적할 수 있습니다.  실시간 현황은 푸시 알림 기능을 넘어 몇 시간 동안 빈번하게 콘텐츠 및 상태 업데이트를 제공하고 사람들이 표시된 정보와 상호 작용할 수 있도록 합니다.

예를 들어 실시간 현황은 음식 배달 주문이 도착하기까지 남은 시간, 축구의 실시간 경기 정보 또는 실시간 피트니스 수치를 표시하고, 운동을 일시 정지하거나 취소할 수 있는 대화식 제어기를 표시할 수 있습니다.

실시간 현황은 iPhone 또는 iPad에서 시작하고 사용자의 기기 전반에서 시스템 위치에 자동으로 나타납니다.

| 플랫폼 또는 시스템 경험 | 위치 |
| --- | --- |
| iPhone 및 iPad | 잠금 화면, 홈 화면, iPhone의 Dynamic Island 및 스탠바이 |
| Mac | 메뉴 막대 |
| Apple Watch | 스마트 스택 |
| CarPlay | CarPlay 대시보드 |

## 구조

실시간 현황은 시스템 전반에서 *Dynamic Island* 및 잠금 화면과 같은 다양한 위치에 나타납니다. 이는 진행 중인 활동의 알림 및 표시를 제공하는 통합적인 홈 역할을 합니다. 실시간 현황이 나타나는 기기 및 시스템 위치에 따라 시스템은 실시간 현황의 모습을 구성할 *표시* 스타일 또는 스타일의 조합을 선택합니다. 그 결과 실시간 현황은 다음을 지원해야 합니다.

- [콤팩트](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Compact)
- [최소](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Minimal)
- [확장](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Expanded)
- [잠금 화면](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Lock-Screen)

iOS 및 iPadOS에서 실시간 현황은 이러한 표시를 사용하여 시스템에 나타납니다. 또한 시스템은 이 표시를 사용하여 다른 상황의 기본 모습을 생성합니다. 예를 들어, 콤팩트 표시는 iPhone에서 Dynamic Island에 나타나고 두 개의 요소로 구성되는데, Apple Watch 및 CarPlay에서는 시스템이 해당 구성 요소를 단일 보기로 결합합니다.

### 콤팩트

Dynamic Island에서 시스템은 실시간 현황이 하나만 활성화되어 있을 때 콤팩트 표시를 사용합니다. 이 표시는 TrueDepth 카메라의 앞쪽에 표시되는 요소와 뒤쪽에 표시되는 요소, 이렇게 두 가지의 구분된 요소로 구성됩니다. 공간이 제한되어 있지만 콤팩트 표시는 앱의 실시간 현황에 대한 최신 정보를 표시합니다.

![Dynamic Island의 콤팩트 앞쪽 및 콤팩트 뒤쪽 보기가 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/type-compact@2x.png)

디자인 지침을 보려면 [콤팩트 표시](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Compact-presentation)의 내용을 참조하십시오.

### 최소

여러 개의 실시간 현황이 활성화된 경우, 시스템은 최소 표시를 사용하여 Dynamic Island에 두 개의 실시간 현황을 표시합니다. 하나는 Dynamic Island에 연결되어 나타나고 다른 하나는 분리되어 나타납니다. 콘텐츠의 크기에 따라, 분리된 최소 표시는 원형 또는 타원형으로 나타납니다. 콤팩트 표시와 마찬가지로 최소 표시를 탭하여 앱을 열거나, 길게 터치하여 확장 표시를 볼 수 있습니다.

![Dynamic Island의 최소 표시가 그려진 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/type-minimal@2x.png)

디자인 지침을 보려면 [최소 표시](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Minimal-presentation)의 내용을 참조하십시오.

### 확장

콤팩트 또는 최소 표시의 실시간 현황을 길게 터치하면 시스템에 확장 표시가 나타납니다.

![Dynamic Island의 확장 보기가 그려진 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/type-expanded@2x.png)

디자인 지침을 보려면 [확장 표시](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Expanded-presentation)의 내용을 참조하십시오.

### 잠금 화면

시스템은 잠금 화면 표시를 사용하여 잠금 화면 하단에 배너를 표시합니다. 이 표시에서는 확장 표시와 유사한 레이아웃을 사용하십시오.

![Dynamic Island를 지원하는 iPhone의 잠금 화면에 표시된 실시간 현황의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/live-activity-lock-screen@2x.png)

Dynamic Island를 지원하지 않는 기기에서 실시간 현황에 대한 알림을 보낼 경우, 잠금 화면 표시가 홈 스크린 또는 다른 앱을 오버레이하는 배너로 잠깐 나타납니다.

![Dynamic Island를 지원하지 않는 iPhone의 홈 화면에 배너로 표시된 실시간 현황의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/live-activity-notch@2x.png)

디자인 지침을 보려면 [잠금 화면 표시](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Lock-Screen-presentation)의 내용을 참조하십시오.

### 스탠바이

iPhone의 스탠바이에서 실시간 현황은 최소 표시로 나타납니다. 이를 탭하면 잠금 화면 표시로 전환되고 2배로 크기 조절되어 화면을 채웁니다. 잠금 화면 표시에서 사용자 설정 배경 색상을 사용하는 경우, 시스템이 자동으로 해당 색상을 전체 화면으로 확장하여 매끄러운 전체 화면 디자인을 생성합니다.

![2배로 크기 조절되고 점선으로 된 테두리가 있는 스탠바이의 실시간 현황 잠금 화면 표시가 2배로 크기 조절된 실시간 현황을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/live-activity-standby-default-outline@2x.png)

디자인 지침을 보려면 [스탠바이 표시](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#StandBy-presentation)의 내용을 참조하십시오.

## 모범 사례

**시작과 끝이 정해져 있는 작업 및 이벤트에 실시간 현황을 제공하십시오.** 실시간 현황은 8시간을 넘지 않는 짧거나 중간 길이의 활동을 추적하는 데 적합합니다.

**한눈에 파악해야 하는 중요한 정보에 집중하십시오.** 실시간 현황에 모든 정보를 표시할 필요는 없습니다. 사람들에게 가장 유용한 정보가 무엇인지 생각하고 이를 간결한 방식으로 공유하는 데 중점을 두십시오. 더 알아보고 싶을 경우 사람들은 실시간 현황을 탭하여 앱을 열 수 있으므로 앱에 추가 세부사항을 제공하면 됩니다.

**실시간 현황을 사용하여 광고 또는 프로모션을 표시하지 마십시오.** 실시간 현황은 진행 중인 이벤트 및 작업에 대한 정보를 지속적으로 확인하는 기능이므로 해당 이벤트 및 작업과 관련된 정보만 표시하는 것이 중요합니다.

**민감한 정보를 표시하지 마십시오.** 실시간 현황은 눈에 띄게 표시되며 다른 사람이 볼 수 있습니다. 예를 들어, 잠금 화면 또는 화면 상시표시 상태에서 나타날 수 있습니다. 민감하거나 개인적일 수 있는 콘텐츠의 경우, 문제의 소지가 없는 요약을 표시하고 사람들이 실시간 현황을 탭하여 앱에서 민감한 정보를 확인할 수 있도록 하십시오. 또는 민감한 정보를 포함할 수 있는 보기를 삭제하고, 민감한 데이터를 표시할지 여부를 사람들이 구성할 수 있도록 하십시오. 개발자 지침을 보려면 [Creating a widget extension](https://developer.apple.com/documentation/widgetkit/creating-a-widget-extension)의 내용을 참조하십시오.

**다크 모드와 라이트 모드 모두에서 앱의 시각적 감성 및 특성과 일치되는 실시간 현황을 생성하십시오.** 이를 통해 사람들이 실시간 현황을 쉽게 인식할 수 있도록 하고, 앱에 대한 시각적 연관성을 만들 수 있습니다.

**로고 마크를 포함하는 경우 컨테이너 없이 표시하십시오.** 이렇게 하면 로고 마크가 실시간 현황 레이아웃과 더 잘 통합됩니다. 전체 앱 아이콘을 사용하지 마십시오.

**Dynamic Island에 주목하게 만드는 요소를 앱에 추가하지 마십시오.** 실시간 현황은 앱을 사용하지 않는 동안 Dynamic Island에 나타나며, 앱이 열려 있을 경우 Dynamic Island에 다른 항목이 나타날 수 있습니다.

**텍스트를 읽기 쉬워야 합니다.** 크고 굵은(중간 굵기 이상) 텍스트를 사용하십시오. 작은 텍스트는 조금만 사용하고, 주요 정보를 한눈에 알아볼 수 있도록 하십시오.

![작고 읽기 어려운 Dynamic Island의 텍스트가 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-text-incorrect-size@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![굵고 읽기 좋은 크기로 된 Dynamic Island의 텍스트가 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-text-correct-size@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

### 실시간 현황 레이아웃 생성하기

**다양한 화면 크기와 표시에 맞도록 조정하십시오.** 실시간 현황은 다양한 기기 화면에 맞게 크기 조절됩니다. 화면의 실제 크기가 다르거나 변경될 수 있다는 점에 유의하면서, 다양한 기기 및 크기 조절 비율에 대한 레이아웃과 애셋을 생성하십시오. [명세](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#Specifications)에 있는 값을 지침으로 사용하고 적절한 크기의 콘텐츠를 제공하여 레이아웃과 애셋이 모든 곳에서 잘 표시되도록 하십시오.

**효율적인 공간 사용을 위해 요소 크기와 배치를 조절하십시오.** 콘텐츠를 명확하게 표시하는 데 필요한 공간만 사용하는 레이아웃을 생성하십시오. 실시간 현황의 요소가 서로 딱 맞게 요소의 크기와 배치를 조정하십시오.

**사용자 설정 보기와 레이아웃에 친숙한 레이아웃을 사용하십시오.** 기본 시스템 여백 및 권장 텍스트 크기가 포함된 템플릿은 [Apple Design Resources](https://developer.apple.com/design/resources/)에서 사용할 수 있습니다. 이를 사용하면 실시간 현황을 한눈에 볼 수 있고 주변의 시각적 스타일에도 어울립니다. 예를 들어 Apple Watch의 스마트 스택이 있습니다.

![균등한 여백으로 Dynamic Island의 콘텐츠가 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-margins@2x.png)

**일관된 여백과 동심원 형태의 배치를 사용하십시오.** 모서리가 둥근 도형과 실시간 현황의 가장자리(모서리 포함) 사이에 균등하게 일치되는 여백을 사용하여 조화를 이루도록 하십시오. 이렇게 하면 요소가 실시간 현황의 모서리가 둥근 도형에 침범하지 않고 시각적 긴장을 만들지 않습니다. 예를 들어 모서리가 둥근 직사각형을 실시간 현황의 모서리 근처에 배치하는 경우, 여백을 빼고 SwiftUI 컨테이너를 사용하여 올바른 모서리 반경을 적용함으로써 모서리 반경이 실시간 현황의 외부 모서리 반경과 일치하도록 하십시오. 개발자 지침을 보려면 [ContainerRelativeShape](https://developer.apple.com/documentation/swiftui/containerrelativeshape)의 내용을 참조하십시오.

![Dynamic Island의 가장자리에 콘텐츠를 그리는 실시간 현황의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-rounded-shapes@2x.png)

실시간 현황의 외부 가장자리와 동심원을 이루는 여백 안에 콘텐츠가 촘촘하고 꼭 맞게 표시되도록 하십시오.

![Dynamic Island의 가장자리에서 너무 멀게 아이콘을 배치한 실시간 현황의 모습이 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-content-incorrect-position@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![Dynamic Island의 모서리가 둥근 도형을 넘어서지 않고 Dynamic Island의 가장자리에 가깝게 아이콘을 배치한 실시간 현황의 모습이 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-content-correct-position@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**콘텐츠 블록을 구분할 때는 삽입 컨테이너 도형 안에 배치하거나 굵은 선을 사용하십시오.** 콘텐츠를 Dynamic Island의 가장자리까지 그리지 마십시오.

![실시간 현황에서 콘텐츠를 구분하기 위해 Dynamic Island의 가장자리까지 콘텐츠를 그린 모습이 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-separating-content-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![모서리가 둥근 삽입 도형 안에 콘텐츠가 있고 함께 그룹화되어 있는 실시간 현황의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-separating-content-pill@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![선을 사용하여 콘텐츠 블록을 구분하는 실시간 현황의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-separating-content-separator@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

> **팁:** 실시간 현황 보기의 둥근 모서리에서 모서리가 둥글지 않은 콘텐츠를 맞추려는 경우, 그리기 도구에서 모서리가 둥글지 않은 콘텐츠를 흐리게 만드는 것이 유용할 수 있습니다. 콘텐츠가 흐려지면 보기의 외부 둘레와 가장 잘 맞는 위치를 더 쉽게 찾을 수도 있습니다.

![Dynamic Island의 가장자리에서 너무 먼 위치에 흐린 텍스트가 있는 실시간 현황이 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-blur-content-incorrect-position@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![Dynamic Island의 모서리가 둥근 도형을 넘어서지 않고 Dynamic Island의 가장자리와 가까운 위치에 흐린 텍스트가 있는 실시간 현황이 표시된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-blur-content-correct-position@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**잠금 화면 또는 확장 표시에서 실시간 현황의 높이를 동적으로 변경하십시오.** 표시할 정보가 적은 경우, 실시간 현황의 높이를 줄여 콘텐츠에 필요한 공간만 사용하십시오. 더 많은 정보를 사용할 수 있게 되면 높이를 늘여 추가 콘텐츠를 표시하십시오. 예를 들어, 차량 공유 앱은 운전자를 찾는 동안 추가 세부사항을 포함하지 않는 더 작은 실시간 현황을 표시할 수 있습니다. 예상 픽업 시간, 운전자 세부사항 등 더 많은 정보를 사용할 수 있게 되면 이를 표시하도록 앱의 높이가 확장됩니다.

### 색상 선택하기

**사용자 설정 배경 색상 및 불투명도를 사용하는 것을 신중히 고려하십시오.** 콤팩트, 최소, 확장 표시의 배경 색상은 사용자화할 수 없습니다. 하지만 잠금 화면 표시에는 사용자 설정 배경 색상을 사용할 수 있습니다. 잠금 화면 표시에 사용자 설정 배경 색상 또는 이미지를 설정하는 경우, 대비가 충분한지 확인하십시오. 특히 낮은 휘도에서 상시표시 화면 기능을 제공하는 기기의 색조 색상의 경우 유의해야 합니다.

**앱의 특성 및 아이덴티티를 표현하는 색상을 사용하십시오.** Dynamic Island의 실시간 현황은 불투명한 검은색 배경을 사용합니다. 앱의 특성 및 브랜드를 나타내도록 텍스트 및 대상체에 선명한 색상을 사용하는 것을 고려하십시오. 선명한 색상을 사용하면 실시간 현황을 한눈에 알아볼 수 있으며, 다른 실시간 현황과 구별될 수 있고, 한눈에 확인 가능한 앱의 작은 일부분 같은 느낌을 줄 수 있습니다 그리고 선명한 색상은 실시간 현황 자체의 요소 간의 관계를 강화할 수 있습니다.

**콘텐츠와 어울리도록 실시간 현황의 주요 선 색상에 색조를 적용하십시오.** 다크 모드 상태와 같이 배경이 어두울 경우, 다른 콘텐츠와 구별되도록 Dynamic Island 주위에 주요 선이 나타납니다. 실시간 현황에 있는 다른 요소의 색상과 일관성을 갖는 색상으로 이 주요 선 색상을 선택하십시오. 개발자 지침을 보려면 [Creating custom views for Live Activities](https://developer.apple.com/documentation/activitykit/creating-custom-views-for-live-activities)의 내용을 참조하십시오.

### 전환 추가 및 콘텐츠 업데이트 움직이기

실시간 현황은 확장 및 축소 전환 외에도 최대 2초 동안 시스템 및 사용자 설정 애니메이션을 사용합니다. 휘도가 낮아진 화면 상시표시 상태에서는 시스템이 애니메이션을 수행하지 않는다는 점에 유의하십시오.

**애니메이션을 사용하여 전달하려는 정보를 보충하고 업데이트에 주목하게 만드십시오.** 요소의 위치를 이동하는 것 말고도 기본 콘텐츠 대치 전환으로 요소를 넣고 빼거나 크기 조절, 불투명도 및 이동을 사용하여 사용자 설정 전환을 생성할 수 있습니다. 예를 들어, 스포츠 앱은 숫자 콘텐츠 전환을 사용하여 경기의 점수를 변경하거나, 타이머가 0에 도달할 때 타이머가 페이드 인 및 페이드 아웃되게 할 수 있습니다.

**레이아웃 변경을 움직임으로 나타내십시오.** 콘텐츠 업데이트로 실시간 현황 레이아웃의 변경이 필요할 수 있습니다. 예를 들어, 스탠바이에서 전체 화면으로 확장하거나, 더 많은 정보를 사용 가능하게 되는 경우가 이에 해당합니다. 새로운 레이아웃으로 전환하는 동안에는 기존 요소를 제거하고 이전 위치로 움직이기보다는 기존 요소를 해당 요소의 새로운 위치로 움직여서 가능한 한 많이 기존 레이아웃을 유지하십시오.

**요소가 겹치지 않도록 하십시오.** 때로는 전환 중에 다른 부분과 충돌하지 않도록 특정 요소의 움직임을 제외한 다음 새로운 위치에서 다시 움직이는 것이 가장 적합할 수 있습니다. 예를 들어, 목록의 항목을 움직이는 경우 새로운 위치로 이동하는 요소만 움직이고 다른 목록 항목에는 페이드 인 및 페이드 아웃 전환을 사용하십시오.

개발자 지침을 보려면 [Animating data updates in widgets and Live Activities](https://developer.apple.com/documentation/widgetkit/animating-data-updates-in-widgets-and-live-activities)의 내용을 참조하십시오.

### 상호작용 제공하기

**실시간 현황을 탭하면 앱이 올바른 위치에서 열리도록 하십시오.** 관련 세부사항 및 동작으로 바로 이동되게 하십시오. 관련 정보를 찾기 위해 탐색하도록 만들어서는 안 됩니다. 특정 화면에 대한 딥링크를 지원하는 SwiftUI 보기에 대한 개발자 지침을 보려면 [Linking to specific app scenes from your widget or Live Activity](https://developer.apple.com/documentation/widgetkit/linking-to-specific-app-scenes-from-your-widget-or-live-activity)의 내용을 참조하십시오.

**간단하고 직접적인 동작에 집중하십시오.** 버튼이나 토글은 다른 유용한 정보를 표시할 수 있는 공간을 차지할 수 있습니다. 실시간 현황과 직접적으로 관련이 있고, 한 번 활성화하거나 잠시 일시 정지하고 재개하는 필수적인 기능(예: 음악 재생, 운동 또는 실시간 오디오 녹음을 위해 마이크에 접근하는 앱)에 대한 상호작용 요소만 포함하십시오. 상호작용을 제공하는 경우, 다른 제어기를 잘못 탭하는 것을 방지하도록 상호작용을 단일 요소로 제한하는 것이 좋습니다.

**사람들이 이벤트 또는 진행 상태 업데이트에 응답할 수 있게 하는 것을 고려하십시오.** 실시간 현황에 대한 업데이트가 사람들이 반응할 수 있는 것이라면 동작을 취할 수 있는 버튼 또는 토글을 제공해 보십시오. 예를 들어, 차량 공유 앱의 실시간 현황은 차량을 기다리는 동안 운전자에게 연락하는 버튼을 포함할 수 있습니다.

### 실시간 현황 시작, 업데이트 및 종료하기

**적절한 시간에 실시간 현황을 시작하고 앱에서 쉽게 끌 수 있도록 하십시오.** 사람들은 당면한 작업 또는 특정 시간에 대해 실시간 현황이 시작되고 중요한 업데이트를 제공할 것이라고 예상합니다. 또한 이 과정이 자동으로 처리될 것이라 생각합니다. 예를 들어, 음식을 주문하거나 차량 공유를 요청한 후 또는 좋아하는 스포츠 팀의 경기가 시작될 때 실시간 현황이 시작될 것으로 기대합니다. 하지만 예기치 않게 나타나는 실시간 현황은 사람들을 놀라게 하거나 불필요할 수 있습니다. 활동에 해당하는 앱 보기에서 실시간 현황을 끌 수 있는 제어기를 제공하는 것을 고려하십시오. 예를 들어, 스포츠 앱은 경기 또는 팀을 팔로우 취소하는 버튼을 제공할 수 있습니다. 앱에서 실시간 현황의 모습을 쉽게 제어할 수 없을 때 사람들은 설정에서 실시간 현황을 아예 끌 수도 있습니다.

**실시간 현황을 시작하는 앱 단축어를 제공하십시오.** 앱 단축어는 기능을 시스템에 노출하여 다양한 상황에서 접근할 수 있도록 해줍니다. 예를 들어, iPhone의 동작 버튼을 사용하여 실시간 현황을 시작할 수 있는 앱 단축어를 생성하십시오. 자세한 정보를 보려면 [앱 단축어](https://developer.apple.com/kr/design/human-interface-guidelines/app-shortcuts)의 내용을 참조하십시오.

**새로운 콘텐츠가 있을 때에만 실시간 현황을 업데이트하십시오.** 기반이 되는 콘텐츠 또는 상태가 변경되지 않는 경우, 기반이 되는 콘텐츠 또는 상태가 변경될 때까지 동일하게 표시하십시오.

**주의가 필요한 필수 업데이트에 대한 알림만 보내십시오.** 실시간 현황의 알림은 화면을 밝게 표시하며, 기본적으로 사용자가 놓쳐서는 안 되는 명백한 업데이트에 대해 알림 사운드를 재생합니다. 또한 알림은 Dynamic Island에 확장 표시를 나타내거나, Dynamic Island를 지원하지 않는 기기의 경우 배너를 나타냅니다. 실시간 현황이 최고의 가치를 발휘하도록 하려면 너무 자주 알림을 보내거나 중요하지 않은 업데이트에 대한 알림을 보내지 말고, 동일한 업데이트에 대해 실시간 현황과 푸시 알림을 함께 사용하지 마십시오.

**하나의 실시간 현황으로 여러 이벤트를 효율적으로 추적할 수 있도록 하십시오.** 서로 다른 이벤트를 추적하기 위해 이동해야 하는 별도의 실시간 현황을 생성하는 대신 동적인 레이아웃을 사용하고 이벤트가 전환되는 하나의 실시간 현황을 사용하십시오. 예를 들어, 스포츠 앱은 여러 경기의 점수, 교체, 파울 정보를 순환하며 표시하는 하나의 실시간 현황을 제공할 수 있습니다.

**항상 작업 또는 이벤트가 종료될 때 곧바로 실시간 현황을 종료하고 사용자 설정 종료 시간을 설정하는 것을 고려하십시오.** 실시간 현황이 종료되면 시스템은 곧바로 Dynamic Island 및 CarPlay에서 이를 제거합니다. 잠금 화면, Mac 메뉴 막대 및 watchOS 스마트 스택에서는 실시간 현황이 최대 4시간 유지됩니다. 실시간 현황에 따라, 요약 표시는 실시간 현황이 종료된 후 짧은 시간 동안만 관련성을 가질 수 있습니다. 실시간 현황의 진행 길이에 비례하는 사용자 설정 종료 시간을 선택하도록 고려하십시오. 대부분의 경우, 15~30분이 적합합니다. 예를 들어, 차량 공유 앱은 차량 이용이 완료되면 실시간 현황을 종료하고, 차량 이용에 대한 요약을 보고 팁을 줄 수 있도록 30분 동안 표시될 수 있습니다. 개발자 지침을 보려면 [Displaying live data with Live Activities](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)의 내용을 참조하십시오.

## 표시 방식

실시간 현황은 모든 위치, 기기 및 해당되는 모양을 지원해야 합니다. 실시간 현황은 여러 시스템에서 다양한 크기로 나타나므로 표시되는 각 장소를 가장 잘 지원하는 실시간 현황 레이아웃을 생성하십시오.

**iPhone 디자인으로 시작한 후에 다른 상황에 맞춰 조정하십시오.** 먼저 각 표시에 맞는 표준 디자인을 생성하십시오. 그리고 실시간 현황이 제공하는 기능에 따라 스탠바이 상태의 iPhone, CarPlay 또는 Apple Watch와 같은 추가적인 사용자 설정 레이아웃을 디자인하십시오. 사용자 설정 레이아웃에 관한 자세한 정보는 [스탠바이](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#StandBy), [CarPlay](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#CarPlay) 및 [watchOS](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#watchOS)의 내용을 참조하십시오.

### 콤팩트 표시

**가장 중요한 정보에 집중하십시오.** 콤팩트 표시를 사용하여 실시간 현황에 필수적이고 이해하기 쉬운 동적인 최신 정보를 표시하십시오. 예를 들어, 스포츠 앱은 두 개의 팀 로고와 점수를 표시할 수 있습니다.

**Dynamic Island에서 콤팩트 표시의 정보 및 디자인이 통합되도록 하십시오.** TrueDepth 카메라가 앞쪽과 뒤쪽 요소를 나누지만 해당 요소들이 하나의 정보로 읽히도록 디자인하고 일관된 색상과 타이포그래피를 사용하여 두 요소 간의 연관성을 만드십시오.

**콘텐츠를 가능한 한 좁은 폭으로 유지하고 TrueDepth 카메라와 어울리게 표시되도록 하십시오.** 상태 막대의 주요 정보를 가리지 않도록 하고 콘텐츠와 TrueDepth 카메라 사이에 패딩을 추가하지 마십시오. 앞쪽 및 뒤쪽 요소에 비슷한 크기의 보기를 사용하여 균형 잡힌 레이아웃을 유지하십시오. 예를 들어, 축약 단위 또는 덜 정밀한 데이터를 사용하여 적절한 너비와 균형을 유지하십시오.

![TrueDepth 카메라 주위에 패딩을 사용하여 균형 잡히지 않고 너무 넓게 보이는 콤팩트 표시가 그려진 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-unbalanced-content@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![TrueDepth 카메라 주위에 어울리게 배치된 콤팩트 표시가 그려진 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-balanced-content@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**관련 앱 콘텐츠로 연결하십시오.** 콤팩트 실시간 현황을 탭할 때 앱의 관련 세부사항을 곧바로 여십시오. 앞쪽 및 뒤쪽 요소 모두 동일한 화면에 연결되도록 하십시오.

### 최소 표시

**최소 표시에서 실시간 현황을 알아볼 수 있도록 하십시오.** 가능하다면 로고만 표시하는 대신 업데이트된 정보를 표시하십시오. 하지만 사람들이 앱을 빨리 알아볼 수 있도록 해야 합니다. 예를 들어, 타이머 앱의 최소 실시간 현황 표시는 정적 아이콘 대신 남은 시간을 표시합니다.

### 확장 표시

**표시 간에 레이아웃이 일관성을 갖도록 요소의 상대적 배치를 유지하십시오.** 확장 표시는 콤팩트 또는 최소 표시의 확장된 버전입니다. 실시간 현황이 확장될 때 정보 및 레이아웃이 예측 가능하게 확장되도록 하십시오.

**콘텐츠를 TrueDepth 카메라 주위에 밀착하여 배치하십시오.** 콘텐츠를 TrueDepth 카메라 가까이 정렬하고, 공간을 효율적으로 사용하고 카메라의 존재감을 줄이도록 주변에 공간이 너무 많이 남지 않도록 하십시오.

![TrueDepth 카메라 옆에 빈 공간을 둔 실시간 현황의 확장 표시가 그려진 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-layout-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![TrueDepth 카메라 옆에 있는 빈 공간을 사용하는 실시간 현황의 확장 표시가 그려진 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-layout-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

### 잠금 화면 표시

**알림 레이아웃을 복제하지 마십시오.** 실시간 현황에 나타나는 정보에 특화된 고유한 레이아웃을 생성하십시오.

**개인 맞춤형 잠금 화면과 잘 어울리는 색상을 선택하십시오.** 사람들은 배경화면, 사용자 설정 색조 색상 및 위젯으로 잠금 화면을 사용자화합니다. 실시간 현황의 가독성을 유지하면서 사용자 설정 잠금 화면의 감성에 어울리도록 만들려면, 사용자 설정 배경 또는 색조 색상과 불투명도를 절제해서 사용하십시오.

**다크 모드 및 화면 상시표시 상태에서 디자인, 애셋 및 색상이 잘 표시되고 충분히 대비되도록 하십시오.** 기본적으로 잠금 화면의 실시간 현황은 라이트 화면 모드에서 밝은 배경 색상을, 다크 화면 모드에서 어두운 배경 색상을 사용합니다. 사용자 설정 배경 색상을 사용하는 경우, 두 가지 모드 모두와 어울리는 색상을 선택하거나 각 화면 모드별로 다른 색상을 선택하십시오. 화면 상시표시 화면 모드에서는 시스템이 필요에 따라 색상을 조절하므로, 휘도가 낮아진 화면 상시표시 상태의 기기에서 선택한 사항이 잘 표시되는지 확인하십시오. 지침을 보려면 [다크 모드](https://developer.apple.com/kr/design/human-interface-guidelines/dark-mode) 및 [화면 상시표시](https://developer.apple.com/kr/design/human-interface-guidelines/always-on)의 내용을 참조하십시오. 개발자 지침을 보려면 [About asset catalogs](https://help.apple.com/xcode/mac/current/#/dev10510b1f7)의 내용을 참조하십시오.

**시스템이 생성한 닫기 버튼의 색상을 확인하십시오.** 시스템은 실시간 현황의 배경 및 전경 색상을 기반으로 어울리는 닫기 버튼을 자동으로 생성합니다.  생성된 색상이 디자인과 어울리는지 확인하고 필요할 경우 [activitySystemActionForegroundColor(_:)](https://developer.apple.com/documentation/swiftui/view/activitysystemactionforegroundcolor(_:))를 사용하여 색상을 조절하십시오.

**디자인이 알림과 정렬되도록 표준 여백을 사용하십시오.** 잠금 화면에서 실시간 현황의 표준 레이아웃 여백은 14포인트입니다. 그래픽 또는 버튼과 같은 요소에는 더 좁은 여백이 적절할 수 있지만 가장자리를 가득 메우는 복잡한 모습이 되어서는 안 됩니다. 개발자 지침을 보려면 [padding(_:_:)](https://developer.apple.com/documentation/swiftui/view/padding(_:_:))의 내용을 참조하십시오.

### 스탠바이 표시

**스탠바이용 레이아웃을 업데이트하십시오.** 애셋이 큰 화면에서 잘 표시되도록 하고, 추가 공간을 활용하는 사용자 설정 레이아웃을 생성하는 것을 고려하십시오. 개발자 지침을 보려면 [Creating custom views for Live Activities](https://developer.apple.com/documentation/activitykit/creating-custom-views-for-live-activities)의 내용을 참조하십시오.

**스탠바이에서 기본 배경 색상을 사용하는 것을 고려하십시오.** 기본 배경 색상은 실시간 현황과 기기 베젤을 매끄럽게 이어주고, 사람들의 주변 환경과 잘 어울리는 부드러운 모양을 제공하며, TrueDepth 카메라 주변의 여백을 고려하지 않아도 되기 때문에 시스템이 실시간 현황을 조금 크게 확장할 수 있도록 합니다.

**표준 여백을 사용하고 화면의 가장자리까지 그래픽 요소를 확장하지 마십시오.** 표준 여백을 사용하지 않으면 실시간 현황이 확장될 때 콘텐츠가 잘려 끊어진 듯한 느낌을 줍니다.

**야간 모드에서 디자인을 확인하십시오.** 야간 모드에서 시스템은 실시간 현황에 빨간색 색조를 적용합니다. 실시간 현황 디자인에서 사용하는 색상이 야간 모드에서 충분한 대비를 제공하는지 확인하십시오.

![스탠바이 상태의 iPhone 화면을 채우도록 크기 조절된 실시간 현황.](https://developer.apple.com/images/com.apple.HIG/kr/live-activity-standby-night-mode@2x.png)

## CarPlay

CarPlay에서 시스템은 콤팩트 표시의 앞쪽 및 뒤쪽 요소를 CarPlay 대시보드에 나타나는 단일 레이아웃으로 자동으로 결합합니다.

실시간 현황 디자인은 CarPlay와 Apple Watch 모두에 적용되므로 두 상황 모두에 맞게 디자인하십시오. Apple Watch의 실시간 현황은 상호작용이 가능하지만 CarPlay에서는 시스템이 상호작용 요소를 비활성화합니다. 자세한 정보를 보려면 아래에 있는 [watchOS](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities#watchOS)의 내용을 참조하십시오. 개발자 지침을 보려면 [Creating custom views for Live Activities](https://developer.apple.com/documentation/activitykit/creating-custom-views-for-live-activities)의 내용을 참조하십시오.

**실시간 현황에서 큰 텍스트를 사용하거나 추가 정보를 제공하는 것이 도움이 될 경우 사용자 설정 레이아웃을 생성하는 것을 고려하십시오.** CarPlay의 기본 모습을 사용하는 대신 [ActivityFamily.small](https://developer.apple.com/documentation/widgetkit/activityfamily/small) 보조 활동 패밀리에 대한 지원을 선언하십시오.

**사용자 설정 레이아웃에 버튼 또는 토글을 포함하는 것을 신중히 고려하십시오.** CarPlay에서는 시스템이 실시간 현황의 상호작용 요소를 비활성화합니다. 사람들이 운전 중에 실시간 현황을 시작하거나 보게 될 가능성이 높은 경우, 버튼과 토글이 아니라 시기적절한 콘텐츠를 표시하는 것이 좋습니다.

## 플랫폼 고려 사항

*iOS 또는 iPadOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 visionOS에서는 지원되지 않습니다.*

### macOS

활성화된 실시간 현황은 페어링된 Mac의 메뉴 막대에 콤팩트, 최소, 확장 표시를 사용하여 자동으로 나타납니다. 실시간 현황을 클릭하면 iPhone 미러링이 실행되어 앱을 표시합니다.

### watchOS

iPhone에서 실시간 현황이 시작되면 페어링된 Apple Watch의 스마트 스택 상단에 실시간 현황이 나타납니다. 기본적으로 스마트 스택에 표시된 보기는 iPhone에서 실시간 현황의 콤팩트 표시에 있는 앞쪽 및 뒤쪽 요소를 결합합니다.

watchOS 앱이 제공되는 경우, 스마트 스택에서 실시간 현황을 탭하면 watchOS 앱이 열립니다. watchOS 앱이 없는 경우, 탭하면 전체 화면 보기가 열리고 페어링된 iPhone에서 앱을 여는 버튼이 함께 표시됩니다.

**사용자 설정 watchOS 레이아웃을 생성하는 것을 고려하십시오.** 시스템은 기본 보기를 자동으로 제공하는 반면, Apple Watch용으로 디자인된 사용자 설정 레이아웃은 더 많은 정보를 표시하며 버튼 또는 토글과 같은 상호작용 기능을 추가할 수 있습니다.

**사용자 설정 레이아웃에 버튼 또는 토글을 포함하는 것을 신중히 고려하십시오.** 사용자 설정 watchOS 레이아웃은 CarPlay의 실시간 현황에도 적용되며, CarPlay에서는 시스템이 상호작용 요소를 비활성화합니다. 사람들이 운정 중에 실시간 현황을 시작하거나 보게 될 가능성이 높은 경우, 사용자 설정 watchOS 레이아웃에 버튼 또는 토글을 포함하지 마십시오. 개발자 지침을 보려면 [Creating custom views for Live Activities](https://developer.apple.com/documentation/activitykit/creating-custom-views-for-live-activities)의 내용을 참조하십시오.

![iPhone의 Dynamic Island에서 실시간 현황의 콤팩트 표시가 그려진 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/live-activities-ios-dynamic-island-default@2x.png)

![스마트 스택 보기에서 자동으로 생성된 실시간 현황의 기본 표시가 그려진 일러스트, iPhone 콤팩트 보기의 앞쪽 및 뒤쪽 요소가 하단 모서리에서 간격을 두고 떨어져 있음.](https://developer.apple.com/images/com.apple.HIG/kr/live-activity-watch-default-implementation@2x.png)

![스마트 스택 보기에서 실시간 현황의 사용자 설정 표시가 그려진 일러스트, 설명 텍스트와 균형을 이루는 그래픽 카운트다운 타이머를 보여주도록 균형 있게 디자인됨.](https://developer.apple.com/images/com.apple.HIG/kr/live-activity-watch-custom-implementation@2x.png)

**필수 정보 및 중요 업데이트에 집중하십시오.** 스마트 스택의 공간을 가능한 한 효율적으로 사용하고, 실시간 현황이 전달할 수 있는 가장 유용한 정보를 생각해 보십시오.

- 진행 상황(예: 예상 배송 시간)
- 상호작용 요소(예: 스톱워치 또는 타이머 제어기)
- 중요 업데이트(예: 스포츠 점수 변경)

## 명세

실시간 현황을 디자인할 때 다음 값을 지침으로 따르십시오.

### CarPlay 크기

차량의 화면 크기 및 해상도에 가장 적합하도록 시스템이 실시간 현황의 크기를 조절할 수 있습니다. 디자인이 확인되도록 아래 나열된 값을 사용하십시오.

| 실시간 현황 크기(pt) |
| --- |
| 240x78 |
| 240x100 |
| 170x78 |

디자인을 CarPlay 시뮬레이터 및 스마트 디스플레이 확대/축소(CarPlay의 설정 > 디스플레이에서 사용 가능)에 대한 다음 구성으로 테스트하십시오.

| 구성 | 해상도(pt) |
| --- | --- |
| 와이드스크린 | 1920x720 |
| 세로 | 900x1200 |
| 표준 | 800x480 |

### iOS 크기

아래 표에 나열된 모든 값은 포인트 단위입니다.

| 화면 크기(세로) | 콤팩트 앞쪽 | 콤팩트 뒤쪽 | 최소(너비는 범위로 표시) | 확장(높이는 범위로 표시) | 잠금 화면(높이는 범위로 표시) |
| --- | --- | --- | --- | --- | --- |
| 430x932 | 62.33x36.67 | 62.33x36.67 | 36.67~45x36.67 | 408x84~160 | 408x84~160 |
| 393x852 | 52.33x36.67 | 52.33x36.67 | 36.67~45x36.67 | 371x84~160 | 371x84~160 |

Dynamic Island는 44포인트의 모서리 반경을 사용하며, Dynamic Island의 모서리가 둥근 형태는 TrueDepth 카메라와 일치합니다.

| 표시 유형 | 기기 | Dynamic Island 너비(pt) |
| --- | --- | --- |
| 콤팩트 또는 최소 | iPhone 17 Pro Max | 250 |
|  | iPhone 17 Pro | 230 |
|  | iPhone Air | 250 |
|  | iPhone 17 | 230 |
|  | iPhone 16 Pro Max | 250 |
|  | iPhone 16 Pro | 230 |
|  | iPhone 16 Plus | 250 |
|  | iPhone 16 | 230 |
|  | iPhone 15 Pro Max | 250 |
|  | iPhone 15 Pro | 230 |
|  | iPhone 15 Plus | 250 |
|  | iPhone 15 | 230 |
|  | iPhone 14 Pro Max | 250 |
|  | iPhone 14 Pro | 230 |
| 확장 | iPhone 17 Pro Max | 408 |
|  | iPhone 17 Pro | 371 |
|  | iPhone Air | 408 |
|  | iPhone 17 | 371 |
|  | iPhone 16 Pro Max | 408 |
|  | iPhone 16 Pro | 371 |
|  | iPhone 16 Plus | 408 |
|  | iPhone 16 | 371 |
|  | iPhone 15 Pro Max | 408 |
|  | iPhone 15 Pro | 371 |
|  | iPhone 15 Plus | 408 |
|  | iPhone 15 | 371 |
|  | iPhone 14 Pro Max | 408 |
|  | iPhone 14 Pro | 371 |

### iPadOS 크기

아래 표에 나열된 모든 값은 포인트 단위입니다.

| 화면 크기(세로) | 잠금 화면(높이는 범위로 표시) |
| --- | --- |
| 1366x1024 | 500x84~160 |
| 1194x834 | 425x84~160 |
| 1012x834 | 425x84~160 |
| 1080x810 | 425x84~160 |
| 1024x768 | 425x84~160 |

### macOS 크기

제공된 iOS 크기를 사용하십시오.

### watchOS 크기

스마트 스택의 실시간 현황은 watchOS 위젯과 동일한 크기를 사용합니다.

| Apple Watch 크기 | 스마트 스택 실시간 현황의 크기(pt) |
| --- | --- |
| 40mm | 152x69.5 |
| 41mm | 165x72.5 |
| 44mm | 173x76.5 |
| 45mm | 184x80.5 |
| 49mm | 191x81.5 |

## 리소스

#### Developer 문서

[ActivityKit](https://developer.apple.com/documentation/activitykit)

[SwiftUI](https://developer.apple.com/documentation/swiftui)

[WidgetKit](https://developer.apple.com/documentation/widgetkit)

[Developing a WidgetKit strategy](https://developer.apple.com/documentation/widgetkit/developing-a-widgetkit-strategy) — WidgetKit

#### 비디오

- [실시간 현황 기초](https://developer.apple.com/kr/videos/play/wwdc2026/223) — 실시간 현황으로 앱 경험을 향상하세요. iPhone을 가로 방향으로 사용할 때 더 많은 정보를 제공하는 Dynamic Island의 새로운 스타일 등 실시간 현황이 표시되는 다양한 위치를 살펴보세요. 각 공간에 맞게 실시간 현황을 맞춤화하고, 콘텐츠와 데이터를 구성하며, ActivityKit과 푸시 알림을 사용하여 시작부터 끝까지 실시간 업데이트를 진행하는 방법을 알아보세요.
- [CarPlay용 앱 성능 강화하기](https://developer.apple.com/kr/videos/play/wwdc2025/216) — 사람들이 자신의 활동 진행 상황과 관련 정보를 한눈에 확인할 수 있도록 실시간 현황 및 위젯을 CarPlay 및 CarPlay Ultra에 가져오는 방법을 알아보세요. 모든 CarPlay 앱에서 사용할 수 있는 새로운 템플릿 옵션을 살펴보고 내비게이션 앱이 자동차 계기판 또는 HUD에 표시되는 단계별 메타데이터를 제공하는 방법을 확인하세요.
- [위젯의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2025/278) — WidgetKit은 위젯, 실시간 현황 및 제어 기능 업데이트로 앱의 수준을 높입니다. 위젯을 visionOS로 가져오고, 운전하는 동안 CarPlay로 사용하며, 강조 표시 렌더링 모드로 가장 돋보이게 하는 방법을 알아보세요. 또한 watchOS의 스마트 스택에서 관련 위젯이 표시되는 방법과 푸시 알림을 사용하여 위젯을 최신 상태로 유지하는 방법을 확인하세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 12월 16일 | 모든 플랫폼에 대한 지침이 업데이트되고 macOS 및 CarPlay에 대한 지침이 추가됨. |
| 2024년 6월 10일 | watchOS의 실시간 현황에 대한 지침이 추가됨. |
| 2023년 10월 24일 | 지침이 확장 및 업데이트되고 새로운 아트워크가 추가됨. |
| 2023년 6월 5일 | iOS 17 및 iPadOS 17의 기능을 포함하도록 지침이 업데이트됨. |
| 2022년 11월 3일 | 아트워크 및 명세가 업데이트됨. |
| 2022년 9월 23일 | 새로운 페이지. |
