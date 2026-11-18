# 이미지 보기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/image-views

> 이미지 보기는 투명하거나 불투명한 배경에 단일 이미지 또는 경우에 따라 애니메이션이 적용된 이미지 시퀀스를 표시합니다.

![스타일화된 사진 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-image-view-intro@2x.png)

이미지 보기 내에서 이미지를 늘이거나, 크기를 조절하거나, 특정 위치에 고정할 수 있습니다. 이미지 보기는 일반적으로 상호작용 기능이 없습니다.

## 모범 사례

**보기의 기본 목적이 단순히 이미지를 표시하기 위한 경우 이미지 보기를 사용하십시오.** 드물지만 이미지가 상호작용이 가능하도록 하려는 경우, 이미지 보기에 버튼 동작을 추가하는 대신 시스템 제공 [버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons)을 구성하여 이미지를 표시하십시오.

**인터페이스에 아이콘을 표시하려는 경우 이미지 보기 대신 기호나 인터페이스 아이콘을 사용하는 것을 고려하십시오.** [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)는 다양한 색상과 불투명도로 렌더링할 수 있는 간결한 벡터 기반의 이미지가 있는 대용량 보관함을 제공합니다. 글리프 또는 템플릿 이미지라고도 [아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/icons)은 일반적으로 불투명한 픽셀에 색상이 적용될 수 있는 비트맵 이미지입니다. 기호와 인터페이스 아이콘 모두 사람들이 선택하는 강조 색상을 사용할 수 있습니다.

## 콘텐츠

이미지 보기에는 PNG, JPEG 및 PDF와 같이 다양한 포맷의 풍부한 이미지 데이터가 포함될 수 있습니다. 자세한 지침을 보려면 [이미지](https://developer.apple.com/kr/design/human-interface-guidelines/images)의 내용을 참조하십시오.

**이미지 위에 텍스트를 오버레이할 때 주의하십시오.** 이미지 상단에 텍스트를 작성하면 이미지의 선명함과 텍스트의 가독성이 모두 저하될 수 있습니다. 향상된 결과를 위해 텍스트가 이미지와 잘 대비되는지 확인하고, 텍스트 그림자 또는 배경 레이어를 추가하는 것처럼 텍스트 대상체를 눈에 띄게 만드는 방법을 고려하십시오.

**애니메이션이 적용된 시퀀스의 모든 이미지에 대해 일관적인 크기를 사용하십시오.** 보기에 맞게 사전에 이미지 크기를 조절하면 시스템에서 크기 조절을 할 필요가 없습니다. 시스템에서 크기 조절을 해야 하는 경우, 모든 이미지의 크기와 모양이 동일하면 일반적으로 결과물이 더 좋습니다.

## 플랫폼 고려 사항

*iOS 또는 iPadOS에 대한 추가 고려 사항은 없습니다.*

### macOS

**앱에서 편집 가능한 이미지 보기가 필요한 경우, 이미지 저장소를 사용하십시오.** [이미지 저장소](https://developer.apple.com/kr/design/human-interface-guidelines/image-wells)는 이미지 보기로 복사, 붙여넣기 및 드래그를 지원하며 Delete 키를 사용하여 콘텐츠를 지울 수 있습니다.

**클릭할 수 있는 이미지를 만들려면 이미지 보기 대신 이미지 버튼을 사용하십시오.** [이미지 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons#Image-buttons)은 이미지 또는 아이콘을 포함하고, 보기에 나타나며, 즉각적인 앱 특화 동작을 시작합니다.

### tvOS

많은 tvOS 이미지는 투명도가 있는 여러 레이어를 합쳐서 깊이감을 더합니다. 지침을 보려면 [레이어드 이미지](https://developer.apple.com/kr/design/human-interface-guidelines/images#Layered-images)의 내용을 참조하십시오.

### visionOS

visionOS 앱 및 게임의 윈도우는 이미지 보기를 사용하여 2D 및 스테레오스코프 이미지뿐만 아니라 공간 사진을 표시할 수 있습니다. 앱이 RealityKit를 사용하는 경우, 이미지 보기 외부에서 3D 콘텐츠 옆에 모든 유형의 이미지를 표시하거나, 기존 2D 이미지에서 공간 장면을 생성할 수도 있습니다. 디자인 지침을 보려면 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/images#visionOS)의 내용을 참조하십시오. 개발자 지침을 보려면 [ImagePresentationComponent](https://developer.apple.com/documentation/realitykit/imagepresentationcomponent)의 내용을 참조하십시오.

윈도우 또는 볼륨에서 기타 3D 콘텐츠를 표시하는 것에 대한 지침을 보려면 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/windows#visionOS)의 내용을 참조하십시오.

### watchOS

**가능할 경우, SwiftUI를 사용하여 애니메이션을 생성하십시오.** 또는 필요할 경우, WatchKit를 사용하여 이미지 요소 내에서 이미지 시퀀스에 애니메이션을 적용할 수 있습니다. 개발자 지침을 보려면 [WKImageAnimatable](https://developer.apple.com/documentation/watchkit/wkimageanimatable)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[이미지](https://developer.apple.com/kr/design/human-interface-guidelines/images)

[이미지 저장소](https://developer.apple.com/kr/design/human-interface-guidelines/image-wells)

[이미지 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons#Image-buttons)

[SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)

#### Developer 문서

[Image](https://developer.apple.com/documentation/swiftui/image) — SwiftUI

[UIImageView](https://developer.apple.com/documentation/uikit/uiimageview) — UIKit

[NSImageView](https://developer.apple.com/documentation/appkit/nsimageview) — AppKit

#### 비디오

- [앱에서 HDR 이미지 지원하기](https://developer.apple.com/kr/videos/play/wwdc2023/10181) — 앱에서 HDR 스틸 이미지를 식별 및 로드, 표시, 생성하는 방법을 알아보세요. HDR의 일반적인 개념과 최신 업데이트 사항인 ISO 사양을 살펴봅니다. SwiftUI와 UIKit에서 HDR 이미지를 식별하고 표시하는 법, ProRAW 및 RAW 캡처에서 HDR 이미지를 생성하는 법, 이를 CALayer에서 표시하는 방법을 알려 드립니다. 또한 CoreGraphics의 ISO HDR 지원을 소개하고, HDR 도입의 모범 사례를 살펴보겠습니다.
- [SwiftUI 앱에 풍부한 그래픽 추가하기](https://developer.apple.com/kr/videos/play/wwdc2021/10021) — SwiftUI로 생동감이 넘치는 그래픽을 제작하는 방법을 알아보세요. 키보드 안전 영역을 포함한 안전 영역 작업부터 시작하여 화면 키보드와 겹치지 않는 근사한 전면 화면 그래픽을 디자인하는 방법을 배워 보세요. 또한 SwiftUI에서 쉽게 맞춤화할 수 있는 배경과 제어 기능을 만들기 위해 사용할 수 있는 머티리얼과 생동감을 살펴보고 drawingGroup 등의 그래픽 API와 새 캔버스를 살펴봅니다. 이러한 도구를 사용하면 그 어느 때보다 간단하게 SwiftUI에서 완전한 대화형 및 중단 가능한 애니메이션과 그래픽을 디자인할 수 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
