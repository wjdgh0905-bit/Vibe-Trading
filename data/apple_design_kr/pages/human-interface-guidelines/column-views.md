# 계층 보기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/column-views

> *브라우저*라고도 하는 계층 보기는 사람들이 일련의 수직 열을 사용하여 데이터 계층을 보고 탐색할 수 있습니다.

![폴더, 이미지 및 파일 정보 목록이 포함된 세 개의 스타일화된 계층 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-column-view-intro@2x.png)

각 열은 하나의 계층 단계를 보여주며 데이터 항목의 가로 행을 포함합니다. 열 내에서 중첩된 하위 항목이 포함된 모든 상위 항목에는 삼각형 아이콘이 표시됩니다. 사람들이 상위 항목을 선택하면 다음 열은 해당 하위 항목을 표시합니다. 사람들이 하위 항목이 없는 항목에 도달할 때까지 이 방식으로 계속 탐색할 수 있으며, 상위 계층으로 다시 이동하여 다른 데이터 부분을 탐색할 수도 있습니다.

> **참고:** iPadOS 또는 visionOS 앱의 계층적 콘텐츠가 표시되는 방식을 관리해야 하는 경우, [Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views)를 사용하는 것을 고려하십시오.

## 모범 사례

사람들이 단계 사이를 앞뒤로 자주 이동하는 경향이 있고, [목록 및 표](https://developer.apple.com/kr/design/human-interface-guidelines/lists-and-tables)가 제공하는 분류 기능이 필요하지 않은 심층 데이터 계층이 있는 경우 계층 보기를 사용하는 것을 고려하십시오. 예를 들어, Finder는 아이콘, 목록 및 갤러리 보기 외에도 디렉토리 구조를 탐색하기 위해 계층 보기를 제공합니다.

**첫 번째 열에서 데이터 계층의 루트 레벨을 표시하십시오.** 사람들은 첫 번째 열로 빠르게 스크롤하여 위에서부터 다시 계층을 탐색할 수 있다는 것을 알고 있습니다.

**표시할 중첩된 항목이 없는 경우 선택한 항목에 대한 정보를 표시하는 것을 고려하십시오.** 예를 들어, Finder의 경우 선택한 항목의 미리보기와 생성일, 수정일, 파일 유형 및 크기와 같은 정보를 표시합니다.

**사람들이 열의 크기를 조절할 수 있도록 하십시오.** 이는 일부 데이터 항목의 이름이 너무 길어서 기본 열 너비 내에 맞지 않는 경우에 특히 중요합니다.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[목록 및 표](https://developer.apple.com/kr/design/human-interface-guidelines/lists-and-tables)

[개요 보기](https://developer.apple.com/kr/design/human-interface-guidelines/outline-views)

[Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views)

#### Developer 문서

[NSBrowser](https://developer.apple.com/documentation/appkit/nsbrowser) — AppKit
