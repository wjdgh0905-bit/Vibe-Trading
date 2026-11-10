# 홈 화면 빠른 동작

Source: https://developer.apple.com/kr/design/human-interface-guidelines/home-screen-quick-actions

> 홈 화면 빠른 동작은 사람들이 홈 화면에서 앱 관련 동작을 수행할 수 있는 방법을 제공합니다.

![앱 아이콘에서 위로 확장되는 일련의 메뉴 항목의 스타일화된 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-home-screen-quick-actions-intro@2x.png)

사람들은 앱 아이콘을 길게 터치하면 사용 가능한 빠른 동작 메뉴를 볼 수 있습니다(3D Touch 기기에서는 사람들이 아이콘을 더 세게 누르면 메뉴를 볼 수 있음). 예를 들어, Mail 앱에는 받은 편지함이나 VIP 메일상자를 열고, 검색을 시작하고, 새로운 메시지를 생성하는 빠른 동작이 포함되어 있습니다. 앱 관련 동작 외에도 홈 화면 빠른 동작 메뉴에는 앱 제거 및 홈 화면 편집을 위한 항목도 나열됩니다.

각 홈 화면 빠른 동작에는 제목, 왼쪽 또는 오른쪽에 있는 인터페이스 아이콘(홈 화면에서의 앱 위치에 따라 다름) 및 선택 사항인 부제목이 포함되어 있습니다. 제목과 부제목은 왼쪽에서 오른쪽으로 읽는 언어에서 항상 왼쪽 정렬됩니다. 새로운 정보가 제공되면 앱이 빠른 동작을 동적으로 업데이트할 수도 있습니다. 예를 들어, 메시지 앱은 가장 최근 대화를 열 수 있는 빠른 동작을 제공합니다.

## 모범 사례

**매력적이고 유용한 작업을 하기 위해 빠른 동작을 생성하십시오.** 예를 들어, 지도를 사용하면 사람들이 먼저 지도 앱을 열지 않고도 현재 위치 주변을 검색하거나 집으로 가는 경로를 찾을 수 있습니다. 사람들은 모든 앱에서 하나 이상의 유용한 빠른 동작이 제공될 것으로 예상하며, 총 4개를 제공할 수 있습니다.

**빠른 동작을 예측할 수 없게 변경하지 마십시오.** 동적 빠른 동작은 작업 관련성을 유지할 수 있는 좋은 방법입니다. 예를 들어, 현재 위치나 앱의 최근 활동, 시간 또는 설정 변경 사항을 기반으로 빠른 동작을 업데이트하는 것이 적합할 수 있습니다. 사람들이 예측할 수 있는 방식으로 동작이 변경되는지 확인하십시오.

**각각의 빠른 동작에 동작 결과를 즉시 전달하는 간결한 제목을 제공하십시오.** 예를 들어, ‘집으로 가는 경로’, ‘새로운 연락처 등록’, ‘새로운 메시지’와 같은 제목을 사용하면 사람들이 동작을 선택할 때 어떤 일이 발생하는지 이해하는 데 도움이 될 수 있습니다. 더 많은 맥락을 제공해야 하는 경우 부제목도 제공하십시오. Mail 앱은 부제목을 사용하여 받은 편지함 및 VIP 폴더에 읽지 않은 메시지가 있는지를 나타냅니다. 제목 또는 부제목에 앱 이름 또는 관련 없는 정보를 포함하지 말고, 텍스트가 잘리지 않도록 길이를 짧게 유지하고, 현지화를 고려하여 텍스트를 작성하십시오.

**각각의 빠른 동작에 익숙한 인터페이스 아이콘을 제공하십시오.** 동작을 나타내기 위해 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 사용하는 것이 좋습니다. 자주 쓰는 동작을 나타내는 아이콘 목록을 보려면 [표준 아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/icons#Standard-icons)의 내용을 참조하십시오. 추가 지침을 보려면 [메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus)의 내용을 참조하십시오.

나만의 인터페이스 아이콘을 디자인하는 경우, [Apple Design Resources for iOS and iPadOS](https://developer.apple.com/design/resources/#ios-apps)에 포함된 빠른 동작 아이콘 템플릿을 사용하십시오.

**기호 또는 인터페이스 아이콘 대신 이모지를 사용하지 마십시오.** 이모지는 풀컬러인 반면, 빠른 동작 기호는 단색이며 대비를 유지하기 위해 다크 모드에서 모양이 변경됩니다.

## 플랫폼 고려 사항

*iOS 또는 iPadOS에 대한 추가 고려 사항은 없습니다. macOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus)

#### Developer 문서

[Add Home Screen quick actions](https://developer.apple.com/documentation/uikit/add-home-screen-quick-actions) — UIKit
