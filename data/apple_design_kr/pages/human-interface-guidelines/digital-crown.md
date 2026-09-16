# Digital Crown

Source: https://developer.apple.com/kr/design/human-interface-guidelines/digital-crown

> Digital Crown은 Apple Vision Pro 및 Apple Watch의 중요한 하드웨어 입력입니다.

![Digital Crown 옆에 있는 곡선 화살표의 스케치가 Digital Crown을 돌리고 있음을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 보라색을 은은하게 반영하는 보라색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/inputs-digital-crown-intro@2x.png)

사람들은 Apple Vision Pro와 Apple Watch에서 Digital Crown을 사용하여 시스템과 상호작용할 수 있고, Apple Watch에서 Digital Crown을 사용하여 앱과 상호작용할 수도 있습니다.

![검지 손가락으로 Digital Crown을 가리키며 Apple Vision Pro를 착용하고 있는 사람의 머리를 클로즈업한 사진.](https://developer.apple.com/images/com.apple.HIG/kr/digital-crown-apple-vision-pro@2x.png)

![이미지 중앙에 Digital Crown이 눈에 띄게 옆에서 찍은 Apple Watch의 클로즈업 사진.](https://developer.apple.com/images/com.apple.HIG/kr/digital-crown-apple-watch@2x.png)

## Apple Vision Pro

사람들은 Apple Vision Pro에서 Digital Crown으로 다음을 수행할 수 있습니다.

- 음량 조절하기
- 포털, 환경 또는 전체 공간에서 실행되는 앱이나 게임의 몰입감 조절하기(지침을 보려면 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)의 내용 참조)
- 콘텐츠가 앞에서 열리도록 중앙 다시 맞추기
- 손쉬운 사용 설정 열기
- 앱을 종료하고 홈 보기로 돌아가기

## Apple Watch

사람들이 Digital Crown을 돌리면 스크롤이나 표준 또는 사용자 설정 제어 작동 등 앱과의 상호작용을 향상하거나 용이하게 하는 데 사용할 수 있는 정보가 생성됩니다.

watchOS 10부터 Digital Crown은 탐색을 위한 주 입력으로서 한층 중요한 역할을 맡게 됩니다. 사람들은 시계 페이스에서 Digital Crown을 돌려 스마트 스택에서 위젯을 보고, 홈 화면에서 Digital Crown을 사용하여 앱 모음을 수직으로 움직입니다. 사람들은 앱 내에서 Digital Crown을 돌려 페이지가 매겨진 탭 사이를 수직으로 전환하고 목록 보기와 다양한 높이의 페이지를 스크롤합니다.

탐색 용도 외에도 Digital Crown을 돌리면 데이터 검사, 표준 또는 사용자 설정 제어기 작동 등 앱과의 상호작용을 향상하거나 용이하게 하는 데 사용할 수 있는 정보가 생성됩니다.

> **참고:** watchOS가 홈 화면 표시 등의 시스템 제공 기능에 대해 이러한 상호작용을 유지하기 때문에, 앱은 Digital Crown을 눌러도 반응하지 않습니다.

대부분의 Apple Watch 모델은 사람들이 콘텐츠를 스크롤할 때 더욱 촉각적인 경험을 제공하는 Digital Crown 햅틱 피드백을 제공합니다. 기본적으로, 시스템은 사람들이 Digital Crown을 특정 길이만큼 돌리면 선형적인 햅틱 *디텐트* 또는 탭을 제공합니다. 테이블 보기 등의 일부 시스템 제어기는 화면에 새로운 항목이 스크롤되면 디텐트를 제공합니다.

**앱 탐색을 Digital Crown에 고정하십시오.** watchOS 10부터 Digital Crown을 돌리는 것이 사람들이 앱 내 및 앱 간을 탐색하는 주요 방식이 됩니다. 목록, 탭 및 스크롤 보기는 수직 방향이며, 사람들이 Digital Crown을 사용하여 앱의 인터페이스에 있는 중요한 요소 간에 쉽게 이동할 수 있게 해줍니다. Digital Crown에 상호작용을 고정할 경우, 해당하는 화면 터치 상호작용으로 백업하십시오.

**탐색할 필요가 없는 상황에서는 Digital Crown을 사용하여 데이터를 검사하는 것을 고려하십시오.** 목록 또는 페이지 간을 탐색할 필요가 없는 상황에서, Digital Crown은 앱 내의 데이터를 검사하는 데 훌륭한 도구입니다. 예를 들어, 세계 시계에서 Digital Crown을 돌리면 선택한 위치의 시간을 앞당겨 사람들이 현재 시간과 여러 다른 시간을 비교할 수 있게 해줍니다.

**Digital Crown 상호작용에 반응하여 시각적인 피드백을 제공하십시오.** 예를 들어, 선택기는 사람들이 Digital Crown을 사용하면 현재 표시된 값을 변경합니다. 회전을 직접 추적할 경우, 이 데이터를 사용하여 인터페이스의 프로그램을 업데이트하십시오. 시각적 피드백을 제공하지 않으면 사람들은 Digital Crown을 돌려도 앱에 아무런 영향이 없다고 여길 수 있습니다.

**인터페이스를 업데이트하여 사람들이 Digital Crown을 돌리는 속도와 맞추십시오.** 사람들은 Digital Crown을 돌리면 인터페이스를 정밀하게 제어할 수 있다고 생각하므로, 변경 사항이 적용되는 속도를 결정하는 데 이 속도를 사용하는 것이 좋습니다. 사람들이 값을 선택하기 어려운 속도로 콘텐츠를 업데이트하지 마십시오.

**앱에 적합한 경우, 기본 햅틱 피드백을 사용하십시오.** 기본 디텐트가 앱의 애니메이션과 맞지 않을 때와 같이 햅틱 피드백이 앱의 맥락에 적합하게 느껴지지 않을 경우, 디텐트를 끄십시오. 표에 대한 햅틱 피드백 동작을 조절하여 행 기반 디텐트 대신 선형적인 디텐트를 사용하게 할 수 있습니다. 예를 들어, 표에 높이가 눈에 띄게 차이 나는 행이 있을 경우, 선형적인 디텐트는 사람들에게 더욱 일관적인 경험을 제공할 수 있습니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS 또는 tvOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[피드백](https://developer.apple.com/kr/design/human-interface-guidelines/feedback)

[동작 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/action-button)

[몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)

#### Developer 문서

[WKCrownDelegate](https://developer.apple.com/documentation/watchkit/wkcrowndelegate) — WatchKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 12월 5일 | Apple Vision Pro 및 Apple Watch용 아트워크가 추가되고 visionOS 앱이 Digital Crown으로부터 직접 정보를 받지 않음을 명시함. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2023년 6월 5일 | 탐색을 위한 Digital Crown의 주요 역할을 강조하는 지침이 추가됨. |
