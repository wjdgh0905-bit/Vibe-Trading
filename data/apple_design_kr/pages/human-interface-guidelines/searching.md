# 검색하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/searching

> 사람들은 다양한 검색 기술을 사용하여 기기, 앱, 문서 또는 파일 내에서 콘텐츠를 찾습니다.

![돋보기의 스케치가 정보 검색을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-searching-intro@2x.png)

사람들은 일반적으로 앱 내 콘텐츠를 검색하고 싶을 때 [검색 필드](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields)를 사용하려 합니다. 사람들이 앱과 상호작용하는 방법을 사용하여 검색 경험을 사용자화할 수 있습니다. 예를 들어, 최근 검색, 검색 제안, 자동 완성 또는 사람들이 앱에서 이전에 검색한 용어에 기반한 수정을 제공할 수 있습니다.

일부의 경우, 사람들은 검색 범위를 지정하거나 결과를 필터링하는 기능을 사용하고 싶어 합니다. 예를 들어, 사람들은 생성한 날짜, 파일 크기 또는 파일 유형 등의 속성을 지정하여 항목을 검색하고 싶어합니다. 지침을 보려면 [범위 막대 및 토큰](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields#Scope-bars-and-tokens)의 내용을 참조하십시오. iOS, iPadOS 또는 macOS 앱의 윈도우 또는 페이지에서 콘텐츠를 찾는 방법을 구현하여 열린 문서 또는 파일에서 콘텐츠를 찾도록 도울 수도 있습니다.

iOS, iPadOS 및 macOS에서, Spotlight는 사람들이 시스템의 모든 앱 및 웹에서 콘텐츠를 찾도록 도와줍니다. 앱의 콘텐츠를 인덱스하고 정보를 제공하면 사람들은 Spotlight를 사용하여 앱을 먼저 열 필요 없이 포함된 콘텐츠를 찾을 수 있습니다. 지침을 보려면 [시스템 전반의 검색](https://developer.apple.com/kr/design/human-interface-guidelines/searching#Systemwide-search)의 내용을 참조하십시오.

## 모범 사례

**검색이 중요한 기능이라면 앱 또는 보기에서 검색의 기본 위치를 지정하십시오.** 예를 들어, 메모 앱에서 검색 필드는 다른 중요한 동작과 함께 하단 [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars)에 있습니다. 사진 앱 및 Apple TV와 같이 [탭 막대](https://developer.apple.com/kr/design/human-interface-guidelines/tab-bars)를 사용하는 앱에서 검색은 전용 탭으로 제공됩니다.

**앱의 콘텐츠를 하나의 위치에서 검색할 수 있도록 만드십시오.** 사람들이 원하는 정보를 앱 내 어디에서든 찾을 수 있도록 명확하게 지정된 하나의 검색 위치가 있으면 편리함을 느낍니다. 명확히 구분되는 섹션이 있는 앱의 경우에는 로컬 검색을 제공하는 것도 유용할 수 있습니다. 예를 들어, iOS 음악 앱에서 노래 또는 앨범을 검색할 때 검색은 현재 보기에 대한 필터 역할을 합니다.

**검색의 현재 범위를 명확하게 표시하십시오.** 설명적인 위치 지정자 텍스트, [범위 막대 및 토큰](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields#Scope-bars-and-tokens) 또는 제목을 사용하여 사람들이 지금 무엇을 검색하고 있는지 확실히 인식할 수 있도록 하십시오. 예를 들어, Mail 앱에서는 사람들이 검색 중인 메일상자가 항상 명확하게 표시됩니다.

**더 쉽게 검색할 수 있도록 제안사항을 보여주십시오.** 사람들이 입력을 시작하기 전에 최근 검색을 표시하거나 입력하는 도중에 선제적 검색 제안을 표시하면 더 빠르게 검색하고 더 적게 입력하는 데 도움이 될 수 있습니다. 개발자 지침을 보려면 [searchSuggestions(_:)](https://developer.apple.com/documentation/swiftui/view/searchsuggestions(_:))의 내용을 참조하십시오.

**검색 기록을 표시하기 전에 개인정보 보호에 유념하십시오.** 사람들은 다른 사람들이 볼 수 있는 곳에 검색 기록이 표시되는 것을 달가워하지 않을 수 있습니다. 검색 기록을 표시하는 경우, 사람들이 원하면 이를 지울 수 있는 방법을 제공하십시오.

## 시스템 전반의 검색

**앱의 콘텐츠를 Spotlight에서 검색할 수 있도록 만드십시오.** 콘텐츠를 인덱스 가능하게 만들고 *메타데이터*라고 알려진 설명 속성을 지정하면 Spotlight로 공유할 수 있습니다. Spotlight는 이 정보를 추출, 저장 및 구성하여 빠르고 포괄적인 검색을 가능하게 합니다.

**관리하는 사용자 설정 파일 유형의 메타데이터를 정의하십시오.** 파일 포맷이 포함하는 메타데이터 유형을 설명하는 Spotlight 파일 임포터 플러그인을 제공하십시오. 개발자 지침을 보려면 [CSImportExtension](https://developer.apple.com/documentation/corespotlight/csimportextension)의 내용을 참조하십시오.

**Spotlight를 사용하여 앱의 진행 상태 내에서 고급 파일 검색 기능을 제공하십시오.** 예를 들어, 현재 선택에 따라 즉시 Spotlight 검색을 시작하는 버튼을 포함할 수 있습니다. 그런 다음, 검색 결과 또는 필터링된 부분을 제공하는 사용자 설정 보기를 표시할 수 있습니다.

**가급적 시스템이 제공하는 열기 및 저장 보기를 사용하십시오.** 일반적으로 시스템이 제공하는 열기 및 저장 보기는 사람들이 전체 시스템을 검색 및 필터링하는 데 사용할 수 있는 내장 검색 필드를 포함합니다. 관련된 지침을 보려면 [파일 관리](https://developer.apple.com/kr/design/human-interface-guidelines/file-management)의 내용을 참조하십시오.

**앱에서 사용자 설정 파일 유형을 만드는 경우, 훑어보기 생성기를 구현하십시오.** 훑어보기 생성기는 Spotlight 및 기타 앱이 문서의 미리보기를 표시하도록 도와줍니다. 개발자 지침을 보려면 [Quick Look](https://developer.apple.com/documentation/quicklook)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

## 리소스

#### 관련 콘텐츠

[검색 필드](https://developer.apple.com/kr/design/human-interface-guidelines/search-fields)

#### Developer 문서

[Adding your app’s content to Spotlight indexes](https://developer.apple.com/documentation/corespotlight/adding-your-app-s-content-to-spotlight-indexes) — Core Spotlight

#### 비디오

- [직관적인 검색 경험 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2026/292) — 앱에서 검색 기능을 구현할 때 새로운 패턴과 모범 사례를 살펴보세요. 사용자들이 콘텐츠를 찾고 탐색하는 데 검색이 어떻게 중요한 역할을 하는지 알아보고, 다양한 탐색 모델과 Apple 플랫폼에 걸쳐 검색 기능을 통합하는 방법을 알아보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2026년 6월 8일 | 용어를 업데이트하고 모범 사례를 개선함. |
| 2025년 6월 9일 | 검색 필드에 대한 일반적인 지침을 포함하여 모범 사례를 업데이트하고, 시스템 전반의 검색에 대한 지침이 다시 정리됨. |
