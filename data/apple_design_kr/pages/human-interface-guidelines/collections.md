# 모음

Source: https://developer.apple.com/kr/design/human-interface-guidelines/collections

> 모음은 정렬된 콘텐츠 집합을 관리하며, 사용자화할 수 있는 고도의 시각적인 레이아웃으로 표시할 수 있습니다.

![4개씩 2행으로 분리되어 있는 스타일화된 8개의 이미지 아이콘 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-collection-view-intro@2x.png)

일반적으로 모음은 이미지 기반 콘텐츠를 표시하는 데 적합합니다.

## 모범 사례

**가능하면 표준 행 또는 그리드 레이아웃을 사용하십시오.** 모음은 기본적으로 사람들이 예상하는 단순하고 효과적인 모양인 가로 행 또는 그리드로 콘텐츠를 표시합니다. 사람들을 혼란스럽게 하거나 레이아웃 자체에 과도한 관심을 끌 수 있는 사용자 설정 레이아웃을 생성하지 마십시오.

**텍스트의 경우 모음 대신 표를 사용하는 것을 고려하십시오.** 일반적으로 텍스트 정보는 스크롤 가능한 목록으로 표시될 때 보고 이해하기 쉽고 효과적입니다.

**항목을 쉽게 선택할 수 있도록 하십시오.** 모음의 항목을 가져오는 것이 너무 어려운 경우, 사람들은 원하는 콘텐츠에 도달하기 전에 실망하고 흥미를 잃게 됩니다. 초점 또는 호버 효과를 쉽게 볼 수 있도록 하고 콘텐츠가 겹치는 것을 방지하려면 이미지 주위에 적절한 패딩을 사용하십시오.

**필요할 경우 사용자 설정 상호작용을 추가하십시오.** 기본적으로 사람들은 탭하여 선택하고, 길게 터치하여 편집하며, 쓸어넘겨 스크롤할 수 있습니다. 앱에서 요구하는 경우, 사용자 설정 동작을 수행하기 위해 더 많은 제스처를 추가할 수 있습니다.

**사람들이 항목을 삽입, 삭제 또는 재정렬할 때 애니메이션을 사용하여 피드백을 제공하는 것을 고려하십시오.** 모음은 해당 동작에 대한 표준 애니메이션을 지원하며, 사용자 설정 애니메이션을 사용할 수도 있습니다.

## 플랫폼 고려 사항

*macOS, tvOS 또는 visionOS에 대한 추가 고려 사항은 없습니다. watchOS에서는 지원되지 않습니다.*

### iOS, iPadOS

**동적 레이아웃 변경 사항을 적용할 때 주의하십시오.** 모음 레이아웃은 동적으로 변경할 수 있습니다. 모든 변경 사항이 적합하고 추적하기 쉬워야 합니다. 가능한 경우, 명시적인 동작에 대해 반응하는 것이 아니라면 사람들이 레이아웃을 보고 상호작용하는 동안에는 레이아웃을 변경하지 않도록 하십시오.

## 리소스

#### 관련 콘텐츠

[목록 및 표](https://developer.apple.com/kr/design/human-interface-guidelines/lists-and-tables)

[이미지 보기](https://developer.apple.com/kr/design/human-interface-guidelines/image-views)

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

#### Developer 문서

[UICollectionView](https://developer.apple.com/documentation/uikit/uicollectionview) — UIKit

[NSCollectionView](https://developer.apple.com/documentation/appkit/nscollectionview) — AppKit
