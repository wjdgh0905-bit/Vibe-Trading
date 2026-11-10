# iMessage 앱 및 스티커

Source: https://developer.apple.com/kr/design/human-interface-guidelines/imessage-apps-and-stickers

> iMessage 앱을 통해 대화하면서 다른 사람들과 콘텐츠를 공유하고, 공동 작업하고, 게임까지 할 수 있습니다. 스티커는 대화를 더 풍성하게 꾸밀 수 있는 이미지입니다.

![iMessage App Store 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-iMessage-Apps-intro@2x.png)

iMessage 앱 또는 스티커 팩은 메시지 앱의 대화에서 사용할 수 있으며 메시지 앱과 FaceTime에도 함께 적용할 수 있습니다. iMessage 앱이나 스티커 팩을 단독 앱으로 만들 수 있고 iOS 또는 iPadOS 앱의 앱 확장 프로그램으로 만들 수도 있습니다. 개발자 지침을 보려면 [Messages](https://developer.apple.com/documentation/messages) 및 [Adding Sticker packs and iMessage apps to the system Stickers app, Messages camera, and FaceTime](https://developer.apple.com/documentation/messages/adding-sticker-packs-and-imessage-apps-to-the-system-stickers-app-messages-camera-and-facetime)의 내용을 참조하십시오.

## 모범 사례

**iMessage 앱에서는 가급적 하나의 기본 경험을 제공하십시오.** 사람들은 대화를 한창 나누는 중에 이 앱을 선택하게 되므로 이해하기 쉽고 바로 사용할 수 있는 기능이나 콘텐츠를 제공해야 합니다. 여러 기능 유형이나 다양한 콘텐츠 모음을 제공하려고 했다면 기능과 콘텐츠마다 각각의 iMessage 앱으로 만드는 방법을 고려해 보십시오.

**iOS 또는 iPadOS 앱에서 제공하는 콘텐츠를 표시해 보십시오.** 예를 들어, iMessage 앱은 쇼핑 목록이나 여행 일정과 같이 사람들이 공유하고 싶은 앱에 특화된 정보를 제공할 수도 있고, 식사할 장소나 볼만한 영화를 결정하는 등의 간단한 공동 작업을 지원할 수도 있습니다.

**필수 기능을 콤팩트 보기로 제공하십시오.** iMessage 앱을 메시지 내용 아래에 콤팩트 보기로 표시하여 사용할 수도 있고 윈도우의 대부분을 차지하도록 보기를 확장할 수도 있습니다. 가장 자주 사용하는 항목을 콤팩트 보기로 사용할 수 있는지 확인하고 확장된 보기에서 사용할 수 있는 추가 콘텐츠와 기능을 제공하십시오.

**일반적으로 확장된 보기에서만 텍스트를 편집할 수 있도록 하십시오.** 콤팩트 보기는 키보드와 거의 동일한 공간을 차지합니다. 편집하는 동안 iMessage 앱의 콘텐츠가 계속 표시되도록 하려면 확장된 보기에 키보드를 표시합니다.

**표현력이 풍부하고 포괄적이며 다양한 스티커를 만드십시오.** 화려한 이미지, 정적인 이미지 또는 짧은 애니메이션 등의 모든 스티커는 다양한 배경에서 회전시키거나 크기를 조정하더라도 잘 알아볼 수 있어야 합니다. 또한 투명도를 사용하여 스티커를 텍스트, 사진, 다른 스티커와 시각적으로 통합하도록 할 수도 있습니다.

**각 스티커에 현지화된 대체 설명을 제공하십시오.** VoiceOver를 통해 스티커에 대한 대체 설명을 읽도록 하여 스티커 팩을 사용하는 데 도움을 줄 수 있습니다.

## 명세

### 아이콘 크기

iMessage 앱 또는 스티커 팩의 아이콘은 메시지 앱, App Store, 알림, 설정에 표시할 수 있습니다. iMessage 앱 또는 스티커 팩을 설치하면 해당 아이콘이 메시지 앱의 앱 보관함에도 추가됩니다.

해당하는 각 확장 프로그램에 모서리가 각진 아이콘을 제공하면 시스템에서 모서리를 둥글게 만드는 마스크를 자동으로 적용합니다.

모든 상황과 다양한 기기에서도 아이콘을 보기 좋게 표시하려면 다음 크기로 모서리가 각진 아이콘을 만드십시오.

| 용도 | @2x(픽셀) | @3x(픽셀) |
| --- | --- | --- |
| 메시지 앱, 알림 | 148x110 |  |
|  | 143x100 |  |
|  | 120x90 | 180x135 |
|  | 64x48 | 96x72 |
|  | 54x40 | 81x60 |
| 설정 | 58x58 | 87x87 |
| App Store | 1024x1024 | 1024x1024 |

### 스티커 크기

메시지 앱은 작은 스티커, 일반 스티커, 큰 스티커를 지원합니다. 콘텐츠에 가장 적합한 크기를 선택하고 모든 스티커를 선택한 크기로 준비합니다. 한 스티커 팩 내에서 여러 크기를 함께 사용하지 마십시오. 메시지 앱은 크기에 따라 다르게 구성된 그리드에 스티커를 표시합니다.

![iPhone 화면 하단에 작은 스티커 그리드가 표시된 일러스트. 스티커가 3줄로 배열된 그리드 영역에 스티커 8개가 보이고 아래에 4개는 일부만 보임.](https://developer.apple.com/images/com.apple.HIG/kr/sticker-sizes-small@2x.png)

![iPhone 화면 하단에 일반 스티커 그리드가 표시된 일러스트. 그리드 영역에서 스티커 6개가 3개씩 2줄로 배열됨.](https://developer.apple.com/images/com.apple.HIG/kr/sticker-sizes-regular@2x.png)

![iPhone 화면 하단에 큰 스티커 그리드가 표시된 일러스트. 그리드 영역에 스티커 2개는 전체가 보이고 아래에 2개는 일부만 보임.](https://developer.apple.com/images/com.apple.HIG/kr/sticker-sizes-large@2x.png)

선택한 스티커 크기에 대해 다음 @3x 크기를 사용하여 스티커 이미지를 만듭니다. 필요에 따라 시스템은 런타임 시 이미지 크기를 축소하여 @2x, @1x 버전을 생성합니다. 개발자 지침을 보려면 [MSStickerSize](https://developer.apple.com/documentation/messages/msstickersize)의 내용을 참조하십시오.

| 스티커 크기 | @3x 크기(픽셀) |
| --- | --- |
| 작은 스티커 | 300x300 |
| 일반 스티커 | 408x408 |
| 큰 스티커 | 618x618 |

스티커 파일 크기는 500KB 이하여야 합니다. 다음 표는 지원되는 각 포맷에 대해 사용해야 하는 투명도 및 애니메이션을 설명합니다.

| 포맷 | 투명도 | 애니메이션 |
| --- | --- | --- |
| PNG | 8비트 | 아니요 |
| APNG | 8비트 | 예 |
| GIF | 단색 | 예 |
| JPEG | 아니요 | 아니요 |

## 플랫폼 고려 사항

*iOS 또는 iPadOS에 대한 추가 고려 사항은 없습니다. macOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[iMessage Apps and Stickers](https://developer.apple.com/imessage/)

#### Developer 문서

[Messages](https://developer.apple.com/documentation/messages)

[Adding Sticker packs and iMessage apps to the system Stickers app, Messages camera, and FaceTime](https://developer.apple.com/documentation/messages/adding-sticker-packs-and-imessage-apps-to-the-system-stickers-app-messages-camera-and-facetime) — Messages

#### 비디오

- [개성 표현하기](https://developer.apple.com/kr/videos/play/wwdc2017/820) — iMessage 앱에서는 사용자가 대화에서 나오지 않고도 쉽게 콘텐츠를 만들고 공유하고, 게임을 즐기고, 친구와 공동 작업을 할 수 있습니다. 깊이 있는 소셜 문맥에 완벽하게 어울리는 iMessage 앱과 스티커 팩을 디자인하는 방법을 살펴보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 5월 2일 | 지침을 한 페이지에 통합함. |
