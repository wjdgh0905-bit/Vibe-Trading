# 공동 작업 및 공유

Source: https://developer.apple.com/kr/design/human-interface-guidelines/collaboration-and-sharing

> 탁월한 공동 작업 및 공유 경험은 간단하고 반응성이 뛰어나므로 사람들이 콘텐츠에 참여하면서 다른 사람들과 효과적으로 소통할 수 있습니다.

![체크 표시가 겹쳐진 사람 모양의 스케치가 효과적인 공동 작업을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-collaboration-and-sharing-intro@2x.png)

시스템 인터페이스와 메시지 앱을 통해 공동 작업 및 공유를 수행할 수 있는 일관적이고 편리한 방법을 사람들에게 제공할 수 있습니다. 예를 들어, 사람들은 메시지 대화에 문서를 가져다 놓거나 이미 익숙한 공유 시트에서 대상을 선택하여 콘텐츠를 공유하거나 공동 작업을 시작할 수 있습니다.

공동 작업이 시작된 후 사람들은 앱의 공동 작업 버튼을 사용하여 다른 사람과 소통하고, 사용자 설정 동작을 수행하고, 세부사항을 관리할 수 있습니다. 또한 사람들은 공동 작업자가 자신을 멘션하거나, 내용을 수정하거나, 참여 또는 나갈 때 메시지 앱 알림을 받을 수 있습니다.

CloudKit, iCloud Drive 또는 사용자 설정 솔루션 중 어느 것으로 공동 작업 및 공유를 구현하는지에 상관없이, 메시지 앱 통합 및 시스템 제공 공유 인터페이스의 이점을 활용할 수 있습니다. 사용자 설정 공동 작업 인프라를 사용하는 경우에 이러한 기능을 제공하려면 앱에서 유니버설 링크도 지원해야 합니다(개발자 지침을 보려면 [Supporting universal links in your app](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)의 내용 참조).

visionOS는 사람들이 문서를 공유하고 공동 작업하도록 도울 뿐만 아니라, SharePlay를 통한 몰입형 공유 경험을 지원합니다. 지침을 보려면 [SharePlay](https://developer.apple.com/kr/design/human-interface-guidelines/shareplay)의 내용을 참조하십시오.

## 모범 사례

**도구 막대와 같은 편리한 위치에 공유 버튼을 배치하여 사람들이 쉽게 공유 또는 공동 작업을 시작할 수 있도록 하십시오.** iOS 16에서 시스템 제공 공유 시트에는 파일 공유 방식을 선택하고 새로운 공동 작업의 권한을 설정할 수 있는 방법이 포함되어 있습니다. iPadOS 16 및 macOS 13은 공유 팝오버에서 비슷한 모양과 기능을 도입하고 있습니다. SwiftUI 앱의 경우, 선택하면 시스템 제공 공유 시트가 열리는 공유 링크를 표시하여 공유를 활성화할 수도 있습니다. 개발자 지침을 보려면 [ShareLink](https://developer.apple.com/documentation/swiftui/sharelink)의 내용을 참조하십시오.

![iPhone에 있는 메모 앱의 문서 일러스트. 문서 도구 막대의 더 보기 버튼 옆에 공유 버튼이 눈에 띄게 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/collaboration-share-button@2x.png)

**필요한 경우, 앱에서 지원하는 파일 공유 유형을 제공하도록 공유 시트 또는 공유 팝오버를 사용자화하십시오.** CloudKit를 사용하는 경우, 파일과 공동 작업 대상체 모두를 공유 시트에 전달하여 파일의 복사본을 보내기 위한 지원을 추가할 수 있습니다. 공유 시트는 여러 항목을 처리하는 기능을 내장하고 있기 때문에 자동으로 파일을 감지하고 ‘복사본 보내기’ 기능을 사용 가능하도록 만듭니다. iCloud Drive를 사용하는 경우에는 공동 작업 대상체가 기본적으로 ‘복사본 보내기’ 기능을 지원합니다. 사용자 설정 공동 작업의 경우, 파일(또는 해당 파일의 일반 텍스트 표시)을 공동 작업 대상체에 포함하여 ‘복사본 보내기’ 기능을 지원할 수 있습니다.

**지원되는 공유 권한을 요약하는 간결한 문구를 작성하십시오.** 예를 들어, ‘초대받은 사람만 편집 가능’ 또는 ‘모두가 변경할 수 있음’과 같은 문구를 적을 수 있습니다. 시스템은 공동 작업을 정의하기 위한 공유 옵션 세트를 표시하는 버튼에 이 권한 요약을 사용합니다.

![공유 시트가 열려 있는 iPhone의 메모 앱 문서 일러스트. 초대받은 사람만 선택한 문서를 편집할 수 있도록 공동 작업 옵션이 설정됨.](https://developer.apple.com/images/com.apple.HIG/kr/collaboration-sharing-permission-invited@2x.png)

![공유 시트가 열려 있는 iPhone의 메모 앱 문서 일러스트. 모두가 선택한 문서를 변경할 수 있도록 공동 작업 옵션이 설정됨.](https://developer.apple.com/images/com.apple.HIG/kr/collaboration-sharing-permission-everyone@2x.png)

**공동 작업 설정을 간소화하는 간단한 공유 옵션 세트를 제공하십시오.** 사람들이 권한 요약 버튼을 선택할 때 나타나는 보기를 사용자화하여 공동 작업 기능을 반영하는 선택 항목을 제공할 수 있습니다. 예를 들어, 사람들이 누가 콘텐츠에 접근할 수 있는지 지정하고, 편집할 수 있는지 또는 읽기만 할 수 있는지 지정하고, 공동 작업자가 새로운 참여자를 추가할 수 있는지 지정하는 옵션을 제공할 수 있습니다. 사용자 설정 선택 항목의 수를 최소한으로 유지하고 사람들이 한눈에 파악할 수 있도록 그룹화하십시오.

**공동 작업이 시작되면 곧바로 공동 작업 버튼을 눈에 띄게 표시하십시오.** 시스템 제공 공동 작업 버튼은 콘텐츠가 공유되고 있다는 사실을 사람들에게 상기시켜 주고 누구와 공유하고 있는지 알려 줍니다. 공동 작업 버튼은 주로 사람들이 공유 시트 또는 공유 팝오버와 상호작용한 후에 나타나므로 공유 버튼 다음에 배치하는 것이 좋습니다.

![iPhone에 열려 있는 메모 앱의 문서 일러스트. 문서 도구 막대의 공유 버튼 옆에 공동 작업 버튼이 눈에 띄게 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/collaboration-status-active-collaboration-button@2x.png)

**필요한 경우에만 공동 작업 팝오버에 사용자 설정 동작을 제공하십시오.** 앱에서 공동 작업 버튼을 선택하면 세 개의 섹션으로 구성된 팝오버가 나타납니다. 상단 섹션에는 공동 작업자가 나열되고 메시지 앱 또는 FaceTime 앱을 열 수 있는 커뮤니케이션 버튼이 제공됩니다. 가운데 섹션에는 사용자 설정 항목이 포함됩니다. 하단 섹션에는 사람들이 공유 파일을 관리하는 데 사용하는 버튼이 표시됩니다. 너무 많은 정보로 인해 사람들이 부담을 느껴서는 안 되므로, 앱으로 공동 작업을 할 때 꼭 필요한 항목만 제공하는 것이 중요합니다. 예를 들어, 메모 앱은 가장 최근의 업데이트를 요약하고 사람들이 업데이트에 관한 더 많은 정보를 확인하거나 더 많은 활동을 볼 수 있는 버튼을 제공합니다.

![iPhone에 있는 메모 앱의 문서 일러스트. 문서 도구 막대의 공동 작업 버튼으로 열린 메뉴에서 가장 최근 업데이트 및 활동을 표시할 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/collaboration-custom-popover-notes@2x.png)

**앱 경험을 향상하는 데 도움이 된다면 모달 뷰에 표시되는 공동 작업 관리 버튼의 제목을 사용자화하십시오.** 사람들은 ‘공유 파일 관리’라고 기본적으로 제목이 지정된 이 버튼을 사용하여 설정을 변경하고 공동 작업자를 추가하거나 제거할 수 있는 공동 작업 관리 보기를 표시합니다. CloudKit 공유를 사용하는 경우에는 시스템에서 관리 보기를 제공하며, 그 외의 경우에는 스스로 보기를 생성해야 합니다.

**메시지 앱에서 공동 작업 이벤트 알림을 게시하는 것을 고려하십시오.** 발생한 이벤트의 유형(콘텐츠 또는 공동 작업 회원 권한의 변경, 참여자에 대한 멘션 등)을 선택하고 사람들이 앱에서 관련 보기를 여는 데 사용할 수 있는 유니버설 링크를 포함하십시오. 개발자 지침을 보려면 [SWHighlightEvent](https://developer.apple.com/documentation/sharedwithyou/swhighlightevent)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS 또는 macOS에 대한 추가 고려 사항은 없습니다. tvOS에서는 지원되지 않습니다.*

### visionOS

기본적으로 시스템은 현재 윈도우를 다른 공동 작업자에게 스트리밍하여 공유 공간에서 실행되는 앱의 화면 공유를 지원합니다. 만약 공유가 진행되는 동안에 앱을 전체 공간으로 전환한다면 시스템은 앱이 공유 공간으로 돌아올 때까지 다른 사람에 대한 스트리밍을 일시 정지합니다. 지침을 보려면 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)의 내용을 참조하십시오.

### watchOS

watchOS에서 실행되는 SwiftUI 앱에서는 [ShareLink](https://developer.apple.com/documentation/swiftui/sharelink)를 사용하여 시스템 제공 공유 시트를 표시하십시오.

## 리소스

#### 관련 콘텐츠

[동작 보기](https://developer.apple.com/kr/design/human-interface-guidelines/activity-views)

#### Developer 문서

[Shared with You](https://developer.apple.com/documentation/sharedwithyou)

[ShareLink](https://developer.apple.com/documentation/swiftui/sharelink) — SwiftUI

#### 비디오

- [메시지와의 협업을 위한 디자인](https://developer.apple.com/kr/videos/play/wwdc2022/10015) — Apple 플랫폼을 사용하여 우수한 협업 경험을 디자인하는 방법을 확인하세요. 공유 시트, 라이브 편집 알림, 메시지, FaceTime, 그리고 앱의 기존 협업 기능을 결합하여 사용자가 손쉽게 교류하고 협업하도록 돕는 방법을 보여드리겠습니다.
- [메시지를 통합 협업 경험 향상](https://developer.apple.com/kr/videos/play/wwdc2022/10095) — 메시지에서의 협업을 통해 앱의 통신 및 협업을 강화할 수 있는 방법을 확인하세요. 간단한 공유와 토론을 위해 메시지 대화로 문서를 연결하는 방법을 배울 수 있습니다. 대화에 참여하는 모든 사람이 문서의 최신 활동 소식을 확인할 수 있도록 하는 방법을 알아보세요. 또한 앱에 맞춤형 UI를 추가하여 협업 세부 사항을 관리하고 문서를 메시지 대화 및 FaceTime 통화에 연결하는 방법을 확인할 수 있습니다.   SharedWithYou 프레임워크에 대해 자세히 알아보려면 ‘앱에 나와 공유된 항목 추가’를 시청하시기 바랍니다. 맞춤형 협업 인프라가 있는 앱에 협업 API 추가하기에 대한 자세한 내용을 보려면 ‘메시지와 맞춤형 협업 앱 통합’을 확인하세요.
- [메시지와 맞춤형 협업 앱 통합](https://developer.apple.com/kr/videos/play/wwdc2022/10093) — SharedWithYou 프레임워크를 통해 앱의 협업 인프라를 강화하는 방법을 확인하세요. 협업 콘텐츠에 안전한 초대를 보내고 참가자 변경 사항을 동기화하는 방법을 보여드립니다. 관련 대화 내에 콘텐츠 업데이트를 표시하는 방법도 다루겠습니다.  SharedWithYou(나와 공유된 항목)에 대한 소개는 WWDC22의 ‘앱에 나와 공유된 항목 추가’를 시청하시기 바랍니다. 협업 UI API에 대한 개요를 보려면 WWDC22의 ‘Enhance collaboration experiences with Messages(메시지로 협업 경험 향상)’을 시청하시기 바랍니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 12월 5일 | 버튼 배치 및 다양한 유형의 공동 작업 권한의 일러스트 아트워크가 추가됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2022년 9월 14일 | 새로운 페이지. |
