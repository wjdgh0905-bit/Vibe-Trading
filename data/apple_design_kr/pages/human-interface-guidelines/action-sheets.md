# 동작 시트

Source: https://developer.apple.com/kr/design/human-interface-guidelines/action-sheets

> 동작 시트는 사람들이 시작하는 동작과 관련된 선택을 제공하는 모달 뷰입니다.

![iPhone 하단에 스타일화된 동작 시트 버튼의 세트 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-action-sheet-intro@2x.png)

> **개발자 참고 사항:** SwiftUI를 사용하면 확인 대화상자에 대해 [presentation modifier](https://developer.apple.com/documentation/swiftui/view-presentation)(표시 보조 키)를 지정하여 모든 플랫폼에서 동작 시트 기능을 제공할 수 있습니다. UIKit를 사용하는 경우 [UIAlertController.Style.actionSheet](https://developer.apple.com/documentation/uikit/uialertcontroller/style/actionsheet)를 사용하여 iOS, iPadOS 및 tvOS에서 동작 시트를 표시할 수 있습니다.

## 모범 사례

**의도적인 동작과 관련된 선택을 제공하려면 경고가 아닌 동작 시트를 사용하십시오.** 예를 들어, 사람들이 iPhone의 Mail 앱에서 메시지를 편집하다가 취소하면 동작 시트는 임시 저장 메시지를 삭제하거나 저장하는 두 가지 옵션을 제공합니다. 또한 경고는 내용이 제거되는 결과를 초래하는 동작을 사람들이 확인하거나 취소하도록 도울 수는 있지만, 해당 동작과 관련된 추가 선택은 제공하지 않습니다. 더 중요한 것은, 경고는 보통 예상치 못한 일이며, 일반적으로 사람들에게 조치를 취해야 할 수 있는 현재 상황에서 문제나 변경 사항에 관해 알려줍니다. 지침을 보려면 [경고](https://developer.apple.com/kr/design/human-interface-guidelines/alerts)의 내용을 참조하십시오.

![iPhone의 Mail 앱에서 작성 중인 새 메시지가 일부 표시된 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/action-sheet-iphone-mail@2x.png)

![iPhone의 Mail 앱에서 작성 중인 새 메시지가 일부 표시된 스크린샷. 메시지 취소를 선택한 후 동작 시트가 열려 있음. 동작 시트에는 임시 저장 메시지를 삭제하거나 저장하는 선택 항목이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/action-sheet-iphone-mail-delete-action@2x.png)

**동작 시트를 절제해서 사용하십시오.** 동작 시트는 사람들에게 중요한 정보와 선택 사항을 제공하지만, 해당 작업을 하기 위해 현재 작업을 중단합니다. 사람들이 동작 시트에 집중하도록 하려면 필요 이상으로 동작 시트를 사용하지 마십시오.

**한 줄에 표시될 수 있도록 제목을 충분히 짧게 유지하십시오.** 긴 제목은 빠르게 읽기 어려우며 내용이 잘리거나 사람들이 스크롤해야 할 수 있습니다.

**필요한 경우에만 메시지를 제공하십시오.** 일반적으로, 현재 동작의 상황과 결합된 제목은 사람들이 선택 사항을 이해하는 데 도움이 되도록 충분한 정보를 제공합니다.

**필요한 경우, 데이터가 삭제될 수 있는 동작을 사람들이 거부할 수 있는 취소 버튼을 제공하십시오.** 동작 시트 하단 또는 watchOS에서 동작 시트의 왼쪽 상단 모서리에 취소 버튼을 배치하십시오. SwiftUI 확인 대화상자에는 기본적으로 취소 버튼이 포함되어 있습니다.

**제거 선택은 시각적으로 눈에 띄도록 하십시오.** 제거 동작을 수행하는 버튼에 대해 제거 스타일을 사용하고, 가장 잘 보이는 동작 시트 상단에 해당 버튼을 배치하십시오. 개발자 지침을 보려면 [destructive](https://developer.apple.com/documentation/swiftui/buttonrole/destructive)(SwiftUI) 또는 [UIAlertAction.Style.destructive](https://developer.apple.com/documentation/uikit/uialertaction/style-swift.enum/destructive)(UIKit)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*macOS 또는 tvOS에 대한 추가 고려 사항은 없습니다. visionOS에서는 지원되지 않습니다.*

### iOS, iPadOS

**동작과 관련된 선택을 제공하려면 메뉴가 아닌 동작 시트를 사용하십시오.** 사람들은 명확한 선택을 요구할 수 있는 동작을 수행할 때 동작 시트가 나타나는 데 익숙합니다. 이와 반대로, 사람들은 메뉴를 표시하기로 선택할 때 메뉴가 나타나기를 기대합니다.

**동작 시트가 스크롤되지 않도록 하십시오.** 동작 시트에 더 많은 버튼이 있을수록, 사람들이 선택하는 데 더 많은 시간과 노력이 소요됩니다. 또한 동작 시트가 스크롤되면 의도치 않게 버튼을 탭하지 않고 작업을 수행하는 것이 어려워질 수 있습니다.

### watchOS

동작 시트의 시스템 정의 스타일에는 제목, 선택적 메시지, 취소 버튼 및 하나 이상의 추가 버튼이 있습니다. 이 인터페이스의 모양은 기기에 따라 다릅니다.

![Apple Watch의 동작 시트 일러스트로, 시계 화면의 상반부에는 텍스트, 하반부에는 두 개의 스택 버튼을 나타내는 콘텐츠가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/action-sheet-watch-system-defined@2x.png)

각 버튼에는 버튼의 효과에 대한 정보를 전달하는 연관된 스타일이 있습니다. 세 개의 시스템 정의 버튼 스타일은 다음과 같습니다.

| 스타일 | 의미 |
| --- | --- |
| 기본 | 버튼에 특별한 의미가 없습니다. |
| 삭제 | 버튼이 앱에서 사용자 데이터를 삭제하거나 삭제 동작을 수행합니다. |
| 취소 | 버튼이 다른 동작을 수행하지 않고 보기를 닫습니다. |

**동작 시트에 취소 버튼을 포함하여 다섯 개 이상의 버튼을 표시하지 마십시오.** 화면상의 버튼이 더 적으면 사람들이 한 번에 모든 옵션을 쉽게 볼 수 있습니다. 취소 버튼은 필수 사항이기 때문에 네 개 이상의 추가 선택을 제공하지 마십시오.

## 리소스

#### 관련 콘텐츠

[모달 형식](https://developer.apple.com/kr/design/human-interface-guidelines/modality)

[시트](https://developer.apple.com/kr/design/human-interface-guidelines/sheets)

[경고](https://developer.apple.com/kr/design/human-interface-guidelines/alerts)

#### Developer 문서

[confirmationDialog(_:isPresented:titleVisibility:actions:)](https://developer.apple.com/documentation/swiftui/view/confirmationdialog(_:ispresented:titlevisibility:actions:)-46zbb) — SwiftUI

[UIAlertController.Style.actionSheet](https://developer.apple.com/documentation/uikit/uialertcontroller/style/actionsheet) — UIKit
