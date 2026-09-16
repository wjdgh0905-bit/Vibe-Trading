# 도구 막대

Source: https://developer.apple.com/kr/design/human-interface-guidelines/toolbars

> 도구 막대는 자주 사용하는 명령, 제어기, 탐색 및 검색 기능에 편리하게 접근할 수 있도록 합니다.

![앞쪽 가장자리에 뒤로 제어기가 있고 뒤쪽 가장자리에 작성, 공유, 더 보기 메뉴가 있는 도구 막대의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-toolbar-intro@2x.png)

도구 막대는 보기의 상단 또는 하단 가장자리를 따라 가로로 배열된 하나 이상의 제어기 세트로 구성되며, 논리적 섹션으로 그룹화됩니다.

도구 막대는 보기의 콘텐츠에 대해 작동하고, 탐색을 용이하게 하며, 사람들이 자신의 위치를 파악하는 데 도움이 됩니다. 도구 막대에는 다음과 같은 세 가지 유형의 콘텐츠가 포함됩니다.

- 현재 보기의 제목
- 탐색 제어기(예: 뒤로 및 앞으로) 및 [검색 필드](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields)
- 동작 또는 막대 항목(예: [버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons) 및 [메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus))

도구 막대와 달리 [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)는 앱의 여러 영역 간을 탐색하는 데 특화되어 있습니다.

## 모범 사례

**복잡해지지 않도록 항목을 신중하게 선택하십시오.** 사람들이 각 항목을 구별하고 활성화할 수 있어야 하기 때문에 도구 막대에 너무 많은 항목을 배치해서는 안 됩니다. 다양한 보기 너비에 부합하도록 도구 막대가 더 좁아지면 초과 메뉴로 이동할 항목을 정의하십시오.

> **참고:** 항목이 더 이상 화면에 맞지 않으면 시스템은 macOS 또는 iPadOS에서 초과 메뉴를 자동으로 추가합니다. 초과 메뉴를 수동으로 추가하지 말고, 도구 막대 항목이 기본적으로 초과되도록 만드는 레이아웃은 피하십시오.

**추가 동작을 포함할 수 있도록 더 보기 메뉴를 추가하십시오.** 중요도가 낮은 동작을 우선적으로 더 보기 메뉴에 포함하십시오. 가능하다면 모든 동작을 도구 막대에 포함하도록 하고, 정말 필요한 경우에만 이 메뉴를 추가하십시오.

**표준**

![Mac의 메모 앱 스크린샷으로, 사용 가능한 도구 막대 항목을 모두 도구 막대에 포함할 만큼 윈도우가 넓음. 더 보기 메뉴 버튼이 도구 막대의 뒤쪽에 표시되고, 그 아래에 메뉴가 열려 있음.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-notes-app-expanded-icons@2x.png)

**콤팩트**

![Mac의 메모 앱 스크린샷으로, 더 보기 메뉴 버튼을 포함하여 도구 막대의 여러 항목이 초과 메뉴로 이동할 만큼 윈도우가 좁음. 포함된 항목을 표시하도록 초과 메뉴가 열려 있음.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-notes-app-collapsed-icons@2x.png)

**iPadOS 및 macOS 앱에서 사람들이 도구 막대를 사용자화하여 가장 많이 사용되는 항목을 포함하도록 하는 것을 고려하십시오.** 도구 막대 사용자 설정은 많은 항목을 제공하는 앱(또는 모든 사람이 필요로 하지 않는 고급 기능을 포함하는 앱) 및 사람들이 오랜 시간 사용하는 경향이 있는 앱에서 특히 유용합니다. 예를 들어, 도구 막대 사용자 설정에 다양한 편집 동작을 포함시키는 것이 효과적인데, 이는 사람들이 작업 스타일이나 현재 프로젝트에 따라 다양한 유형의 편집 명령을 자주 사용하기 때문입니다.

**도구 막대 배경 및 색조가 적용된 제어기의 사용을 줄이십시오.** 사용자 설정 배경 및 모양을 사용하면 시스템에서 제공하는 배경 효과를 오버레이하거나 방해할 수 있습니다. 그 대신, 도구 막대의 색상 및 모양을 반영하려면 콘텐츠 레이어를 사용하고, 도구 막대 영역과 콘텐츠 영역을 구분할 필요가 있을 때는 [ScrollEdgeEffectStyle](https://developer.apple.com/documentation/swiftui/scrolledgeeffectstyle)을 사용하십시오. 이 접근 방식은 콘텐츠에 방해되지 않으면서도 앱의 고유한 개성을 표현하는 데 도움이 됩니다.

**도구 막대 항목 레이블 및 콘텐츠 레이어 배경에 비슷한 색상을 가급적 적용하지 마십시오.** 앱의 콘텐츠 레이어에 이미 밝고 화려한 콘텐츠가 있다면, 도구 막대는 기본 모노크롬 디자인을 사용하는 것이 좋습니다. 자세한 지침을 보려면 [Liquid Glass 색상](https://developer.apple.com/kr/design/human-interface-guidelines/color#Liquid-Glass-color)의 내용을 참조하십시오.

**가급적 도구 막대에서 표준 구성요소를 사용하십시오.** 기본적으로 표준 버튼, 텍스트 필드, 머리말 및 꼬리말은 모서리 반경의 중심이 막대 모서리와 동일합니다. 사용자 설정 구성요소를 생성해야 하는 경우, 모서리 반경의 중심이 막대 모서리와 동일한지도 확인하십시오.

**방해받지 않는 환경을 위해 도구 막대를 일시적으로 가리는 것을 고려하십시오.** 때때로 사람들은 방해 요소를 줄이거나 더 많은 콘텐츠를 표시하기 위해 최소한의 인터페이스를 선호합니다. 이를 지원하는 경우 가장 적합한 상황에 맞게 적용하고, 가려진 인터페이스 요소를 확실하게 복원할 수 있는 방법을 제공하십시오. 지침을 보려면 [전체 화면 사용하기](https://developer.apple.com/kr/design/human-interface-guidelines/going-full-screen)의 내용을 참조하십시오. visionOS 관련 지침을 보려면 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)의 내용을 참조하십시오.

## 제목

**각 윈도우에 유용한 제목을 제공하십시오.** 제목을 사용하면 앱을 탐색하는 동안 현재 위치를 확인하는 데 도움이 되며, 열려 있는 여러 윈도우의 콘텐츠 간에 구분하는 역할을 합니다. 도구 막대에 제목이 필요 없다고 생각한다면 제목 영역을 비워 둘 수 있습니다. 예를 들어, 메모 앱은 단일 윈도우가 열려 있을 때는 현재 메모에 제목을 지정하지 않으며, 이는 콘텐츠의 첫 번째 줄이 충분한 맥락을 제공하기 때문입니다. 하지만 메모를 별도의 윈도우에서 열 경우, 시스템은 콘텐츠의 첫 번째 줄을 제목으로 지정하여 사람들이 각 메모를 구별할 수 있도록 합니다.

**윈도우 제목을 앱 이름으로 지정하지 마십시오.** 앱 이름은 콘텐츠 계층 또는 앱의 윈도우나 영역에 대한 유용한 정보를 제공하지 않기 때문에 제목으로써 적합하지 않습니다.

**간결한 제목을 작성하십시오.** 윈도우 또는 보기의 목적을 요약하는 단어 또는 짧은 문구로 작성하며, 제목은 15자 이내로 유지하여 다른 제어기를 위한 충분한 공간을 확보하십시오.

## 탐색

탐색 제어기가 포함된 도구 막대는 윈도우 상단에 표시되어 사람들이 콘텐츠의 계층을 따라 이동하는 데 도움을 줍니다. 또한 도구 막대에는 콘텐츠 영역 또는 부분 간의 빠른 탐색을 위한 [검색 필드](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields)가 포함되는 경우가 많습니다. iOS에서는 탐색 전용 도구 막대를 탐색 막대라고 부르기도 합니다.

**표준 뒤로 및 닫기 버튼을 사용하십시오.** 사람들은 표준 뒤로 버튼을 사용하면 정보 계층을 따라 이전 단계로 돌아갈 수 있고, 표준 닫기 버튼이 모달 뷰를 닫는다는 점을 알고 있습니다. 각각에 대해 가급적 표준 기호를 사용하며, *뒤로* 또는 *닫기*라는 텍스트 레이블을 사용하지 마십시오. 둘 중 하나를 사용자 설정 버전으로 만드는 경우 해당 버튼이 여전히 동일하게 보이고, 예상대로 작동하고, 나머지 인터페이스와 일치하는지 확인하며, 앱 또는 게임 모두에서 일관적으로 적용되도록 하십시오. 지침을 보려면 [아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/icons)의 내용을 참조하십시오.

![앞쪽에 뒤로 기호가 포함된 캡슐 모양의 뒤로 버튼 일러스트로, 뒤쪽에 있는 ‘뒤로’ 텍스트와 함께 그룹화됨.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-navigation-action-back-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![표준 뒤로 기호가 포함된 표준 원형 뒤로 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-navigation-action-back-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

## 동작

**사람들이 수행하는 주요 작업을 지원하는 동작을 제공하십시오.** 일반적으로 사람들이 가장 많이 사용할 만한 명령을 우선시하십시오. 이러한 명령은 사람들이 가장 자주 사용하는 명령인 경우가 많지만, 일부 앱에서는 사람들이 작업하는 가장 높은 수준 또는 가장 중요한 대상체로 매핑되는 명령을 우선시하는 것이 적합할 수 있습니다.

**각 제어기의 의미가 명확한지 확인하십시오.** 사람들이 도구 막대 항목의 기능을 이해하기 위해 추측하거나 실험하지 않도록 하십시오. *편집*과 같이 기호로 잘 표현되지 않는 동작을 제외하고는, 텍스트 대신 간단하고 알아볼 수 있는 기호를 항목에 우선적으로 사용하십시오. 자주 쓰는 동작을 나타내는 기호에 대한 지침을 보려면 [표준 아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/icons#Standard-icons)의 내용을 참조하십시오.

![필터, 삭제 및 신규의 텍스트 버튼 레이블이 있는 항목 그룹 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-prefer-symbols-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![필터, 삭제 및 신규의 기호 버튼 레이블이 있는 항목 그룹 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-prefer-symbols-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**가급적 테두리 없는 시스템 제공 기호를 사용하십시오.** 시스템 제공 기호는 익숙하고, 자동으로 적절한 색상 및 생동감이 적용되며, 사용자 상호작용에 일관되게 반응합니다. 섹션이 시각적인 컨테이너 역할을 하므로 테두리(예: 윤곽선이 있는 원 기호 등)는 필요하지 않으며, 시스템이 호버 및 선택 상태의 모양을 자동으로 정의합니다. 지침을 보려면 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)의 내용을 참조하십시오.

![필터 및 더 보기의 버튼이 있는 항목 그룹 일러스트. 버튼에는 원형 테두리가 있는 기호로 레이블이 지정됨.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-icons-circle-outline-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![필터 및 더 보기의 버튼이 있는 항목 그룹 일러스트. 버튼에는 테두리가 없는 기호로 레이블이 지정됨.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-icons-no-outline-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**완료 또는 제출과 같은 주요 동작에는 `.prominent` 스타일을 사용하십시오.** 이렇게 하면 동작이 구분되고 색조가 적용되어 초점이 명확하게 보입니다. 기본 동작은 하나만 지정하고, 도구 막대의 뒤쪽에 배치하십시오.

![앞쪽에는 필터 버튼이 있고 뒤쪽에는 완료 버튼이 있는 두 개의 도구 막대 항목 일러스트. 해당 버튼은 그룹화되지 않고, 완료 버튼에는 기본 동작임을 나타내기 위해 부각 스타일이 적용됨.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-prominent-action-tinted@2x.png)

## 항목 그룹

도구 막대 항목은 도구 막대의 세 개의 위치인 앞쪽 가장자리, 중앙 영역, 뒤쪽 가장자리 중 하나에 배치할 수 있습니다. 이러한 영역에는 탐색 제어기, 윈도우 또는 문서 제목, 자주 쓰는 동작, 검색을 위한 익숙한 공간이 제공됩니다.

- **앞쪽 가장자리.** 사람들이 이전 문서로 돌아가거나 사이드바를 표시하거나 가릴 수 있도록 하는 요소는 맨 앞쪽 가장자리에 표시되며, 그 뒤에 보기 제목이 표시됩니다. 제목 옆에 있는 도구 막대는 복제, 이름 변경, 이동 및 내보내기 등 문서 전체에 영향을 미치는 표준 및 앱 특화 명령이 포함된 문서 메뉴를 제공할 수 있습니다. 이러한 항목을 항상 사용할 수 있도록 하기 위해 도구 막대의 앞쪽 가장자리에 있는 항목은 사용자화할 수 없습니다.
- **중앙 영역.** 일반적이고 유용한 제어기가 중앙 영역에 표시되며, 보기 제목이 앞쪽 가장자리에 없는 경우 여기에 표시될 수 있습니다. macOS 및 iPadOS에서는 사람들이 도구 막대를 사용자화할 수 있도록 허용하면 여기에서 항목을 추가, 제거 및 재배열할 수 있으며, 이 섹션의 항목은 윈도우 크기가 충분히 줄어들면 자동으로 시스템이 관리하는 초과 메뉴로 축소됩니다.
- **뒤쪽 가장자리.** 뒤쪽 가장자리에는 계속 사용할 수 있어야 하는 중요한 항목, 근처 인스펙터를 여는 버튼, 선택적 검색 필드, 추가 항목을 포함하고 도구 막대 사용자화를 지원하는 더 보기 메뉴가 포함됩니다. 또한 완료와 같은 기본 동작이 있는 경우 여기에 포함됩니다. 뒤쪽 가장자리에 있는 항목은 모든 윈도우 크기에서 계속 표시됩니다.

![iPad의 Freeform 앱에 있는 상단 도구 막대의 다이어그램. 콜아웃은 도구 막대의 앞쪽 가장자리, 중앙 영역 및 뒤쪽 가장자리에 있는 항목 그룹의 위치를 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-ipad-anatomy@2x.png)

원하는 그룹에 항목을 배치하려면 항목을 앞쪽 가장자리, 중앙 또는 뒤쪽 가장자리에 고정하고, 적절한 경우 버튼 또는 다른 항목 간에 공백을 삽입하십시오.

**기능 및 사용 빈도로 도구 막대 항목을 논리적으로 그룹화하십시오.**  예를 들어, Keynote에는 프레젠테이션 수준 명령, 재생 명령 및 대상체 삽입을 위한 섹션을 포함하여 기능을 기반으로 하는 여러 섹션이 포함됩니다.

**친숙하고 시각적으로 구별되는 전용 영역에서 탐색 제어기 및 중요한 동작(예: 완료, 닫기 또는 저장)을 그룹화하십시오.** 이는 동작의 중요성을 반영하며 사람들이 해당 동작을 알아보고 이해하는 데 도움이 됩니다.

![iPhone의 상단 도구 막대 일러스트로, 뒤로, 앞으로, 도구 선택의 제어기 및 더 보기 메뉴가 뒤쪽 가장자리에 하나의 섹션으로 그룹화됨.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-layout-grouping-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![iPhone의 상단 도구 막대 일러스트로, 뒤로 및 앞으로의 제어기가 앞쪽 가장자리에 그룹화되고, 도구 선택의 제어기 및 더 보기 메뉴가 뒤쪽 가장자리에 그룹화됨.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-layout-grouping-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**플랫폼 전체에서 일관적인 그룹화 및 배치를 유지하십시오.** 이렇게 하면 사람들이 앱에 대한 친숙함을 높이고 어디에서 사용하든 유사하게 동작한다고 신뢰할 수 있습니다.

**그룹의 수를 최소화하십시오.** 제어기 그룹이 너무 많으면 iPad 및 Mac에서 공간이 충분하더라도 도구 막대가 복잡하거나 혼란스럽게 느껴질 수 있습니다. 일반적으로 최대 세 개까지만 제공하십시오.

**텍스트 레이블이 있는 동작은 분리된 상태로 유지하십시오.** 기호가 있는 동작 옆에 텍스트 레이블이 있는 동작을 배치하면 텍스트와 기호가 결합된 하나의 동작인 것 같은 착시를 만들어 혼란을 일으키고 잘못 해석될 수 있습니다. 도구 막대에 텍스트로 레이블된 버튼이 여러 개인 경우, 해당 버튼의 텍스트가 함께 노출되어 버튼을 구분하기 어려울 수 있습니다. 버튼 사이에 고정 공백을 넣어 구분되도록 합니다. 개발자 지침을 보려면 [UIBarButtonItem.SystemItem.fixedSpace](https://developer.apple.com/documentation/uikit/uibarbuttonitem/systemitem/fixedspace)의 내용을 참조하십시오.

![iPhone의 상단 도구 막대 일러스트로, 텍스트 레이블이 있는 편집 제어기와 기호가 있는 공유 제어기가 뒤쪽 가장자리에 함께 그룹화됨.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-layout-text-action-grouping-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![iPhone의 상단 도구 막대 일러스트로, 텍스트 레이블이 있는 편집 제어기와 기호가 있는 공유 제어기가 뒤쪽 가장자리에 별도의 섹션으로 그룹화됨.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-layout-text-action-grouping-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

## 플랫폼 고려 사항

*tvOS에 대한 추가 고려 사항은 없습니다.*

### iOS

**도구 막대의 주요 영역에는 가장 중요한 항목만 우선적으로 포함하십시오.** 공간이 매우 제한적이기 때문에 앱에 필수적인 동작이 무엇인지 신중하게 고려한 후 가장 중요한 항목부터 포함하십시오. 추가 항목을 포함하려면 더 보기 메뉴를 생성하십시오.

**탐색 및 스크롤할 때 위치를 파악할 수 있도록 큰 제목을 사용하십시오.** 기본적으로 사람들이 콘텐츠를 스크롤하기 시작하면 큰 제목은 표준 제목으로 전환하고 상단으로 스크롤하면 다시 큰 제목으로 전환해 현재 위치를 상기시켜 줍니다. 개발자 지침을 보려면 [prefersLargeTitles](https://developer.apple.com/documentation/uikit/uinavigationbar/preferslargetitles)의 내용을 참조하십시오.

### iPadOS

**도구 막대와 탭 막대를 조합하는 것을 고려하십시오.** iPadOS에서 도구 막대 및 [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)는 보기 상단의 동일한 가로 공간에 공존할 수 있습니다. 이는 윈도우의 전체 너비를 콘텐츠에 사용할 수 있도록 유지하면서 몇 개의 주요 앱 영역 간에 탐색하려는 레이아웃에 특히 유용합니다. 지침을 보려면 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout) 및 [윈도우](https://developer.apple.com/kr/design/human-interface-guidelines/windows)의 내용을 참조하십시오.

### macOS

macOS 앱에서 도구 막대는 윈도우 상단의 프레임에 있으며, 제목 막대 아래에 있거나 제목 막대와 통합되어 있습니다. 윈도우 제목은 제어기와 함께 인라인으로 표시될 수 있으며, 도구 막대 항목에는 베젤이 포함되지 않습니다.

![도구 막대 및 윈도우 프레임의 위치를 표시하는 콜아웃이 있는 macOS의 Finder 윈도우 다이어그램.](https://developer.apple.com/images/com.apple.HIG/kr/toolbars-mac-window-anatomy@2x.png)

**모든 도구 막대 항목을 메뉴 막대에서 명령으로 사용할 수 있도록 하십시오.** 사람들이 도구 막대를 사용자화하거나 가릴 수 있기 때문에 여기에만 명령을 표시할 수는 없습니다. 이와 반대로, 모든 메뉴 명령이 도구 막대의 공간을 확보할 만큼 충분히 중요하거나 자주 사용되는 것은 아니기 때문에 모든 메뉴 항목에 대해 도구 막대 항목을 제공하는 것은 적합하지 않습니다.

### visionOS

visionOS에서 시스템 제공 도구 막대는 윈도우 하단 가장자리를 따라 윈도우 관리 제어기 위에 표시되고, z축을 따라 윈도우보다 약간 앞에 있는 평행한 평면에 나타납니다.

![visionOS에서 메모 앱 윈도우 하단을 따라 표시된 도구 막대 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-toolbar-notes-app@2x.png)

visionOS는 막대 배경에 변형 흐림 효과를 사용하여 도구 막대 항목의 뒤로 콘텐츠를 스크롤할 때 해당 항목의 가독성을 유지합니다. 변형 흐림 효과는 보기의 유리 머티리얼을 균일하고 분할되지 않게 유지하면서 스크롤되는 콘텐츠 위에 막대를 고정합니다.

visionOS에서는 각 도구 막대 항목에 기호 또는 텍스트 레이블 중 하나를 제공할 수 있습니다. 사람들이 기호가 포함된 도구 막대 항목을 바라보면 visionOS는 텍스트 레이블을 표시하여 추가 정보를 제공합니다.

**시스템 제공 도구 막대를 사용하는 것이 좋습니다.** 표준 도구 막대는 일관적이고 익숙한 모양을 지니며 눈 및 손 입력으로 원활하게 작동하도록 최적화되어 있습니다. 또한 시스템은 표준 도구 막대를 윈도우의 올바른 위치에 자동으로 배치합니다.

![visionOS의 도구 막대 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-toolbar-standard-layout@2x.png)

**세로 도구 막대를 생성하지 마십시오.** visionOS에서는 [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)가 세로형이기 때문에 세로 도구 막대를 표시하면 사람들에게 혼란을 줄 수 있습니다.

**윈도우 크기가 도구 막대의 너비보다 더 작아지지 않도록 하십시오.** visionOS에는 각 앱이 모든 동작을 나열하는 메뉴 막대가 포함되지 않기 때문에 윈도우 크기에 관계없이 도구 막대에서 중요한 제어기에 대해 안정적으로 접근할 수 있는 것이 중요합니다.

**앱이 모달 상태에 진입할 수 있는 경우, 맥락과 관련 있는 도구 막대 제어기를 제공하는 것을 고려하십시오.** 예를 들어, 사진 편집 앱은 사람들이 다중 단계 편집 작업을 수행하는 데 도움이 될 수 있는 모달 상태에 진입할 수 있습니다. 이 경우, 모달 편집 보기의 제어기는 메인 윈도우의 제어기와 다릅니다. 앱이 모달 상태를 종료하면 윈도우의 표준 도구 막대 제어기를 복구해야 합니다.

**도구 막대에서 풀 다운 메뉴를 사용하지 마십시오.** 풀 다운 메뉴를 사용하면 도구 막대 항목과 관련된 추가 동작을 제공할 수 있지만, 사람들이 발견하는 것이 어려울 수 있고 인터페이스를 복잡하게 만들 수 있습니다. 도구 막대는 visionOS에서 윈도우 하단 가장자리에 있기 때문에 풀 다운 메뉴가 하단 가장자리 아래에 나타나는 표준 윈도우 제어기를 가릴 수 있습니다. 지침을 보려면 [풀 다운 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pull-down-buttons)의 내용을 확인하십시오.

### watchOS

도구 막대 버튼을 사용하면 관련 콘텐츠를 표시하는 보기에서 중요한 앱 기능을 제공할 수 있습니다. 상단 모서리 또는 하단을 따라 도구 막대 버튼을 배치할 수 있습니다. 스크롤되는 콘텐츠 위에 이러한 버튼을 배치하는 경우, 콘텐츠가 버튼 아래에서 스크롤될 때 해당 버튼이 항상 표시됩니다.

![상단의 앞쪽 및 뒤쪽 모서리에 도구 막대 버튼을 표시하는 스크린샷.](https://developer.apple.com/images/com.apple.HIG/toolbars-watch-top-buttons@2x.png)

![하단의 앞쪽 및 뒤쪽 모서리에 두 개의 도구 막대 버튼을 표시하는 스크린샷.](https://developer.apple.com/images/com.apple.HIG/toolbars-watch-bottom-buttons@2x.png)

개발자 지침을 보려면 [topBarLeading](https://developer.apple.com/documentation/swiftui/toolbaritemplacement/topbarleading), [topBarTrailing](https://developer.apple.com/documentation/swiftui/toolbaritemplacement/topbartrailing) 또는 [bottomBar](https://developer.apple.com/documentation/swiftui/toolbaritemplacement/bottombar)의 내용을 참조하십시오.

스크롤되는 보기에 버튼을 배치할 수도 있습니다. 기본적으로 스크롤되는 도구 막대 버튼은 사람들이 위쪽으로 스크롤하여 표시할 때까지 가려진 상태로 유지됩니다. 사람들은 자주 스크롤되는 보기 상단으로 스크롤하기 때문에 도구 막대 버튼을 자연스럽게 찾을 수 있습니다.

![상단의 앞쪽 및 뒤쪽 모서리에 두 개의 도구 막대 버튼을 표시하는 스크린샷. 도구 막대에도 스크롤 보기에 기본 동작 버튼이 있지만 가려짐.](https://developer.apple.com/images/com.apple.HIG/toolbars-watch-primary-button-hidden@2x.png)

![상단의 앞쪽 및 뒤쪽 모서리에 두 개의 도구 막대 버튼을 표시하는 스크린샷. 도구 막대에도 스크롤 보기에 기본 동작 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/toolbars-watch-primary-button-visible@2x.png)

개발자 지침을 보려면 [primaryAction](https://developer.apple.com/documentation/swiftui/toolbaritemplacement/primaryaction)의 내용을 참조하십시오.

**기본 앱 기능이 아닌 중요한 동작에는 스크롤되는 도구 막대 버튼을 사용하십시오.** 도구 막대 버튼을 사용하면 기본 목적이 해당 기능과 관련이 있지만 동일하지 않을 수 있는 중요한 기능을 보기에서 유연하게 제공할 수 있습니다. 예를 들어, Mail은 받은 편지함 보기 상단의 도구 막대 버튼에 필수적인 ‘새로운 메시지’ 동작을 제공합니다. 받은 편지함의 기본 목적은 스크롤할 수 있는 이메일 메시지 목록을 표시하는 것이기 때문에 보기 상단의 도구 막대 버튼에 밀접하게 관련된 작성 동작을 제공하는 것이 적합합니다.

## 리소스

#### 관련 콘텐츠

[사이드바](https://developer.apple.com/kr/design/human-interface-guidelines/sidebars)

[탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

[버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons)

[검색 필드](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields)

[Apple Design Resources](https://developer.apple.com/design/resources/)

#### Developer 문서

[Toolbars](https://developer.apple.com/documentation/swiftui/toolbars) — SwiftUI

[UIToolbar](https://developer.apple.com/documentation/uikit/uitoolbar) — UIKit

[NSToolbar](https://developer.apple.com/documentation/appkit/nstoolbar) — AppKit

#### 비디오

- [새로운 디자인 시스템과 더 친숙해지는 법](https://developer.apple.com/kr/videos/play/wwdc2025/356) — 새로운 디자인 시스템을 자세히 확인하여 시각 디자인, 정보 아키텍처 및 핵심 시스템 구성 요소에 대한 주요 변경 사항을 확인하세요. 이 시스템이 인터페이스와 콘텐츠 간의 관계를 재편하여 기기, 화면 크기 및 입력 모드에 걸쳐 동적이고, 조화로우며, 일관성 있는 디자인을 만들도록 지원하는 방법을 알아보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 12월 16일 | Liquid Glass의 지침이 업데이트됨. |
| 2025년 6월 9일 | 막대 항목 그룹화에 대한 지침이 추가되고, 기호 사용에 대한 지침이 업데이트되었으며, 탐색 막대 지침이 포함됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2023년 6월 5일 | watchOS의 도구 막대 사용에 대한 지침이 업데이트됨. |
