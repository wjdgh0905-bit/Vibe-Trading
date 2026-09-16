# 시트

Source: https://developer.apple.com/kr/design/human-interface-guidelines/sheets

> 시트는 현재 맥락과 밀접하게 관련되고 범위가 지정된 작업을 수행할 수 있도록 합니다.

![윈도우 상단에서 아래로 펼쳐지는 시트의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-sheet-intro@2x.png)

시트는 사람들에게 특정 정보를 요청하거나, 상위 보기로 돌아가기 전에 사람들이 완료할 수 있는 간단한 작업을 표시하는 데 유용합니다. 예를 들어, 시트는 사람들이 파일을 첨부하거나 저장할 위치를 선택하는 등의 동작을 완료하는 데 필요한 정보를 제공하도록 할 수 있습니다.

## 구조

macOS, tvOS, visionOS 및 watchOS에서 시트는 항상 *모달*입니다. 모달 시트는 시트를 해제하기 전까지는 상위 보기와 상호작용할 수 없게 만드는 대상 환경을 제공합니다(모달 표현에 대한 자세한 내용은 [모달 형식](https://developer.apple.com/kr/design/human-interface-guidelines/modality)의 내용을 참조하십시오).

iOS 및 iPadOS에서 시트는 모달이거나 *비모달*일 수 있습니다. 비모달 시트가 화면상에 있으면 사람들은 시트를 해제하지 않고도 해당 시트의 기능을 사용하여 상위 보기에 영향을 줄 수 있습니다. 예를 들어, iPhone 및 iPad용 메모 앱은 비모달 시트를 사용하여 사람들이 메모를 편집할 때 다양한 텍스트 선택 항목에 포맷을 지정할 수 있도록 합니다.

![iPhone의 진행 중인 메모 스크린샷. 여러 단어가 선택되고 하이라이트됨. 화면 하반부의 포맷 시트는 선택한 단어가 일반 본문 서체를 사용함을 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-nonmodal-notes-text-regular@2x.png)

![iPhone의 진행 중인 동일한 메모 스크린샷. 다른 단어가 선택되고 하이라이트됨. 포맷 시트는 선택한 단어가 본문 서체를 이탤릭체로 사용함을 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-nonmodal-notes-text-italic@2x.png)

사람들이 시트를 탐색하고 닫을 때 도움이 되는 여러 가지 일반적인 버튼이 있습니다.

- **취소**(또는 닫기) 버튼은 변경사항을 저장하지 않고 시트를 닫습니다. 이 유형의 버튼은 대부분의 시트에서 일반적으로 사용됩니다.
- **완료** 버튼을 클릭하면 작업을 완료하거나 변경사항을 명시적으로 저장한 후 시트를 닫습니다.
- **뒤로** 버튼을 사용하면 다단계 흐름의 이전 단계나 계층 구조의 상위 보기로 이동할 수 있습니다. 이 버튼은 시트를 닫기 위한 용도가 아닙니다.

이러한 버튼의 배치는 플랫폼마다 다릅니다. [플랫폼 고려 사항](https://developer.apple.com/kr/design/human-interface-guidelines/sheets#Platform-considerations)의 내용을 참조하십시오.

## 모범 사례

**복잡하거나 연장된 사용자 흐름의 경우, 시트에 대한 대안을 고려하십시오.** 예를 들어, iOS 및 iPadOS는 비디오, 사진 또는 카메라 보기와 같은 콘텐츠를 표시하거나 사람들이 문서 또는 사진 편집과 같은 다중 단계 작업을 수행하는 데 적합한 전체 화면 스타일의 모달 뷰를 제공합니다. (개발자 지침을 보려면 [UIModalPresentationStyle.fullScreen](https://developer.apple.com/documentation/uikit/uimodalpresentationstyle/fullscreen)의 내용을 참조하십시오.) macOS 경험에서는 시트를 사용하는 대신 새로운 윈도우를 열거나 사람들이 전체 화면 모드를 시작하도록 하는 것이 좋습니다. 예를 들어, 문서 편집과 같은 개별 독립 작업은 별도의 윈도우에서 잘 작동할 수 있는 반면, [전체 화면 사용하기](https://developer.apple.com/kr/design/human-interface-guidelines/going-full-screen)하면 사람들이 미디어를 볼 수 있습니다. visionOS에서는 사람들이 콘텐츠 또는 작업에 집중할 수 있는 전체 공간으로 앱을 전환할 방법을 제공할 수 있습니다. 지침을 보려면 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)의 내용을 참조하십시오.

**주요 인터페이스에서는 한 번에 하나의 시트만 표시하십시오.** 사람들은 시트를 닫으면 상위 보기 또는 윈도우로 돌아가기를 기대합니다. 시트를 닫아도 사람들이 다른 시트로 다시 이동하는 경우 앱에서 자신이 있는 위치를 파악하지 못할 수 있습니다. 사람들이 시트 내에서 수행한 동작으로 인해 다른 시트가 나타나는 경우, 새로운 시트를 표시하기 전에 첫 번째 시트를 닫으십시오. 필요한 경우, 사람들이 두 번째 시트를 해제한 후에 첫 번째 시트를 다시 표시할 수 있습니다.

**주요 작업에 영향을 미치는 추가 항목을 상위 보기에 표시하려면 비모달 보기를 사용하십시오.** 사람들이 메인 윈도우와 계속 상호작용하는 동안 필요한 정보와 동작에 접근할 수 있게 하려면 visionOS에서 [Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views)를 사용하거나 macOS에서 [패널](https://developer.apple.com/kr/design/human-interface-guidelines/panels)을 사용하는 것을 고려하십시오. iOS 및 iPadOS에서는 이 작업흐름에 대해 비모달 시트를 사용할 수 있습니다. 지침을 보려면 [iOS, iPadOS](https://developer.apple.com/kr/design/human-interface-guidelines/sheets#iOS-iPadOS)의 내용을 참조하십시오.

**완료 버튼의 대안을 제공하십시오.** 완료 버튼을 제공하는 경우, 변경사항을 확인하거나 저장하지 않고 시트를 닫을 수 있는 명확한 방법인 취소 버튼이나 시트의 이전 단계로 이동할 수 있는 뒤로 버튼과 항상 함께 제공하십시오. 완료 버튼에만 의존하면 작업을 완료해야만 시트에서 나갈 수 있음을 암시하므로 제약을 주거나 오해의 소지가 있을 수 있습니다.

![iPhone의 시트 상반부 일러스트. 완료 버튼이 보기의 오른쪽 상단 모서리에 단독으로 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-buttons-placement-done-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![iPhone의 시트 상반부 일러스트. 취소 버튼이 보기의 왼쪽 상단 모서리에 나타나고, 완료 버튼이 오른쪽 상단 모서리에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-buttons-placement-cancel-done@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

취소, 완료, 뒤로 버튼 세 개를 모두 함께 표시하는 것을 지양함.

![iPhone의 시트 상반부 일러스트. 뒤로 버튼이 보기의 왼쪽 상단 모서리에 표시되고, 취소 및 완료 버튼이 오른쪽 상단 모서리에 함께 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-buttons-placement-back-cancel-done-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

## 플랫폼 고려 사항

*tvOS에 대한 추가 고려 사항은 없습니다.*

### iOS, iPadOS

iOS 및 iPadOS에서 단일 보기로 구성된 시트의 경우, 취소 버튼은 상단 도구 막대의 앞쪽 가장자리에 있어야 합니다. 완료 버튼이 있다면 뒤쪽 가장자리에 있어야 합니다.

![iPhone의 시트 상반부 일러스트. 취소 버튼이 보기의 왼쪽 상단 모서리에 나타나고, 완료 버튼이 오른쪽 상단 모서리에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-buttons-placement-cancel-done@2x.png)

다단계 흐름이 있는 시트의 경우, 버튼의 배치는 단계마다 달라질 수 있습니다.

**첫 번째 단계**

![iPhone의 시트 상반부 일러스트. 취소 버튼이 보기의 왼쪽 상단 모서리에 나타나고, 비활성화된 완료 버튼이 오른쪽 상단 모서리에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-buttons-placement-navigation-first-page@2x.png)

**다음 단계**

![iPhone의 시트 상반부 일러스트. 뒤로 버튼이 보기의 왼쪽 상단 모서리에 나타나고, 비활성화된 완료 버튼이 오른쪽 상단 모서리에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-buttons-placement-navigation-subsequent-page@2x.png)

**마지막 단계**

![iPhone의 시트 상반부 일러스트. 뒤로 버튼이 보기의 왼쪽 상단 모서리에 나타나고, 완료 버튼이 오른쪽 상단 모서리에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-buttons-placement-navigation-final-page@2x.png)

크기를 조절할 수 있는 시트는 사람들이 해당 콘텐츠를 스크롤하거나 *그래버*를 드래그할 때 확장되며, 그래버는 시트의 상단 가장자리에 나타날 수 있는 작은 가로 표시기입니다. 시트의 크기는 *디텐트*에 따라 조절되며, 디텐트는 시트가 자연스럽게 표시될 때의 특정 높이입니다. iPhone용으로 디자인된 디텐트는 시트가 자연스럽게 표시될 때의 특정 높이를 지정합니다. 시스템은 다음과 같이 두 개의 디텐트를 정의합니다. *대형*은 완전히 확장된 시트의 높이이고 *중형*은 완전히 확장된 높이의 절반 정도입니다. 시트에는 사용자 설정된 디텐트 값이 하나 이상 할당될 수 있습니다.

![거의 모든 화면을 차지하는 단색의 모서리가 둥근 직사각형이 포함된 세로 방향의 iPhone 화면을 보여주는 일러스트로, 전체 화면 시트를 나타냄. 원형 닫기 버튼이 시트의 왼쪽 상단 모서리에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-large-detent@2x.png)

![절반의 화면을 차지하는 단색의 모서리가 둥근 직사각형이 포함된 세로 방향의 iPhone 화면을 보여주는 일러스트로, 절반의 화면 시트를 나타냄. 원형 닫기 버튼이 시트의 왼쪽 상단 모서리에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-medium-detent@2x.png)

시트는 자동으로 대형 디텐트를 지원합니다. 중형 디텐트를 추가하면 시트를 두 높이 모두에 맞게 표시할 수 있는 반면, 중형으로만 지정하면 시트가 전체 높이로 확장되지 않습니다. 개발자 지침을 보려면 [detents](https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller/detents)의 내용을 참조하십시오.

**iPhone 앱에서 시트의 콘텐츠를 점진적으로 표시할 수 있도록 중형 디텐트를 지원하는 것을 고려하십시오.** 예를 들어, 공유 시트는 중형 디텐트 내에 가장 관련성이 높은 항목을 표시하며, 여기에서는 크기 조절 없이 표시됩니다. 더 많은 항목을 보기 위해 사람들은 시트를 스크롤하거나 확장할 수 있습니다. 이와 반대로, 시트의 콘텐츠가 전체 높이로 표시될 때 더 유용한 경우에는 중형 디텐트를 지원하지 않는 것이 좋습니다. 예를 들어, 메시지 및 Mail 앱의 작성 시트는 사람들에게 콘텐츠를 작성할 충분한 공간을 제공하기 위해 전체 높이로만 표시됩니다.

**크기를 조절할 수 있는 시트에 그래버를 포함하십시오.** 그래버는 사람들이 시트를 드래그하여 크기를 조절할 수 있음을 보여주며, 이를 탭하여 디텐트 간에 전환할 수도 있습니다. 그래버는 크기 조절 가능에 대한 시각적 지표를 제공하는 것 외에도, 사람들이 화면을 보지 않고 시트의 크기를 조절할 수 있도록 VoiceOver와도 잘 작동합니다. 개발자 지침을 보려면 [prefersGrabberVisible](https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller/prefersgrabbervisible)의 내용을 참조하십시오.

**쓸어넘기기를 통해 시트를 해제하도록 지원하십시오.** 사람들은 닫기 버튼을 탭하는 대신 세로로 쓸어넘겨 시트를 해제하기를 기대합니다. 사람들이 쓸어넘기기를 통해 시트를 해제할 때 해당 시트에 저장되지 않은 변경 사항이 있는 경우, 동작 시트를 사용하여 사람들이 수행하는 동작을 확인할 수 있도록 하십시오.

**iPadOS 앱에서 페이지 또는 양식 시트 프레젠테이션 스타일을 사용하는 것이 좋습니다.** 각 스타일은 시트에 대해 기본 크기를 사용하며, 흐린 배경 보기의 상단에 콘텐츠를 집중시키고 일관된 경험을 제공합니다. 개발자 지침을 보려면 [UIModalPresentationStyle](https://developer.apple.com/documentation/uikit/uimodalpresentationstyle)의 내용을 참조하십시오.

### macOS

macOS에서 시트는 상위 윈도우 위에 떠 있는 둥근 모서리의 카드형 보기입니다. 상위 윈도우는 시트가 화면상에 있는 동안 흐리게 처리되어 사람들이 시트를 해제할 때까지 해당 윈도우와 상호작용할 수 없음을 나타냅니다. 하지만 사람들은 시트를 해제하기 전에 다른 앱 윈도우와 상호작용할 수 있기를 기대합니다.

![메모 앱의 스크린샷. 배경으로 흐리게 표시된 메모 앱 문서가 있고 그 위 중앙에는 ‘메모 앱의 새로운 기능’ 시트가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-macos-notes@2x.png)

**시트를 적절한 기본 크기로 표시하십시오.** 사람들은 일반적으로 시트의 크기를 조절할 수 있을 것이라고 기대하지 않기 때문에 표시되는 콘텐츠에 맞게 적합한 크기를 사용하는 것이 중요합니다. 하지만 어떤 경우에는 사람들이 크기를 조절할 수 있는 시트를 선호하기 때문에(예: 더 명확하게 볼 수 있도록 콘텐츠를 확장해야 하는 경우) 크기 조절을 지원하는 것이 좋습니다.

**사람들이 먼저 시트를 해제하지 않아도 다른 앱 윈도우와 상호작용할 수 있도록 하십시오.** 시트가 열리면 상위 윈도우가 전면에 표시됩니다. 상위 윈도우가 문서 윈도우인 경우, 문서와 관련된 모달리스 패널도 전면에 표시됩니다. 사람들이 앱에서 다른 윈도우와 상호작용하려면 아직 시트를 해제하지 않은 경우에도 해당 윈도우를 전면으로 가져올 수 있도록 하십시오.

**사람들이 반복적으로 입력을 제공하고 결과를 확인해야 하는 경우, 시트 대신 패널을 사용하십시오.** 예를 들어, 찾기 및 대치 패널을 사용하면 사람들이 개별적으로 대치를 시작할 수 있어 각 검색 결과가 올바른지 확인할 수 있습니다. 지침을 보려면 [패널](https://developer.apple.com/kr/design/human-interface-guidelines/panels)의 내용을 참조하십시오.

### visionOS

시트가 visionOS 앱에 표시되는 동안에는 상위 윈도우 앞에 떠 있어 이를 흐리게 처리하며 사람들이 앱과 상호작용하는 대상이 됩니다.

[video: visionOS의 비어 있는 윈도우 위에 시트가 열리는 것을 보여주는 녹화 영상.]

**시트가 윈도우의 하단 가장자리에서 나타나도록 표시하지 마십시오.** 사람들이 시트를 볼 수 있게 하려면 [시야](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout#Field-of-view) 중앙에 배치하는 것이 좋습니다.

**사람들이 맥락을 유지할 수 있도록 시트를 기본 크기로 표시하십시오.** 대부분 또는 모든 윈도우를 가리는 시트를 표시하지 말고, 사람들이 원하면 시트 크기를 조절할 수 있도록 허용하십시오.

### watchOS

watchOS에서 시트는 앱의 현재 콘텐츠 위로 미끄러지듯 이동하는 전체 화면 보기입니다. 시트는 현재 맥락을 유지할 수 있도록 반투명한 상태이지만, 시스템에서는 가려진 콘텐츠를 흐리게 만들고 채도를 낮추는 머티리얼을 배경에 적용합니다.

![Apple Watch에 기본 동작 버튼과 기본 취소 버튼이 있는 시트 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/sheets-watch-overlay@2x.png)

**모달 작업에 사용자 설정 제목 또는 콘텐츠 표시 방식이 필요한 경우에만 시트를 사용하십시오.** 사람들에게 중요한 정보를 제공하거나 일련의 선택 사항을 표시해야 하는 경우, [경고](https://developer.apple.com/kr/design/human-interface-guidelines/alerts) 또는 [동작 시트](https://developer.apple.com/kr/design/human-interface-guidelines/action-sheets)를 사용하는 것을 고려하십시오.

**시트의 상호작용을 간결하고 일시적으로 유지하십시오.** 현재 작업흐름에 대해 일시적으로 중단하고 중요한 작업을 용이하게 하는 목적으로만 시트를 사용하십시오. 시트를 통해 사람들이 앱 콘텐츠를 탐색할 수 없도록 하십시오.

**기본 레이블을 변경하는 경우, 동작을 나타낼 때 SF Symbols를 우선적으로 사용하십시오.** 시트가 계층적 탐색 인터페이스의 일부라고 사람들이 오해하게 할 수 있는 레이블을 사용하지 마십시오. 또한 상단의 앞쪽 모서리의 텍스트가 페이지 또는 앱 제목처럼 보이면 사람들이 시트를 해제하는 방법을 알 수 없습니다. 지침을 보려면 [표준 아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/icons#Standard-icons)의 내용을 참조하십시오.

![Apple Watch의 화면 상단에 사용자 설정 뒤로 버튼이 있는 상단 도구 막대가 표시된 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/modal-sheet-watchos-do-not-1@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![Apple Watch의 화면 상단에 페이지 제목이라는 버튼이 있는 상단 도구 막대가 표시된 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/modal-sheet-watchos-do-not-2@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![Apple Watch의 화면 상단에 기본 취소 버튼이 있는 상단 도구 막대가 표시된 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/modal-sheet-watchos-do@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

## 리소스

#### 관련 콘텐츠

[모달 형식](https://developer.apple.com/kr/design/human-interface-guidelines/modality)

[동작 시트](https://developer.apple.com/kr/design/human-interface-guidelines/action-sheets)

[팝오버](https://developer.apple.com/kr/design/human-interface-guidelines/popovers)

[패널](https://developer.apple.com/kr/design/human-interface-guidelines/panels)

#### Developer 문서

[sheet(item:onDismiss:content:)](https://developer.apple.com/documentation/swiftui/view/sheet(item:ondismiss:content:)) — SwiftUI

[UISheetPresentationController](https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller) — UIKit

[presentAsSheet(_:)](https://developer.apple.com/documentation/appkit/nsviewcontroller/presentassheet(_:)) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2026년 3월 24일 | 버튼 배치에 대한 지침이 업데이트됨. |
| 2024년 3월 29일 | iPadOS 앱에서 양식 및 페이지 시트 스타일을 사용하기 위한 지침이 추가됨. |
| 2023년 12월 5일 | visionOS 앱에서 추가 항목을 제공할 수 있도록 Split View 사용이 권장됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2023년 6월 5일 | watchOS의 시트 사용에 대한 지침이 업데이트됨. |
