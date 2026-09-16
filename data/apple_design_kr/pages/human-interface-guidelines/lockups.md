# 락업

Source: https://developer.apple.com/kr/design/human-interface-guidelines/lockups

> 락업은 별도의 여러 보기를 하나의 상호작용 가능한 단위로 결합합니다.

![헤드라인 텍스트 줄 및 각주 텍스트 줄 위에 표시된 사람 아이콘의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-lockups-intro@2x.png)

각각의 락업은 콘텐츠 보기, 머리말, 꼬리말로 구성됩니다. 머리말은 락업의 메인 콘텐츠 위에 나타나고, 꼬리말은 메인 콘텐츠 아래에 나타납니다. 락업에 초점이 맞춰지면 3개의 보기가 함께 확장되고 축소됩니다.

앱의 필요에 따라 카드, 캡션 버튼, 모노그램, 포스터 등의 네 가지 락업 유형을 결합할 수 있습니다.

## 모범 사례

**락업과 락업 사이에 적절한 공간을 마련하십시오.** 락업에 초점이 맞춰지면 크기가 확장되므로 다른 락업과 겹치거나 다른 락업의 자리를 차지하지 않도록 락업 간에 충분한 공간을 남겨 놓으십시오. 지침을 보려면 [레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)의 내용을 참조하십시오.

![동일한 간격으로 배치된 다섯 개의 락업이 세 행으로 표시되어 있는 일러스트. 각 행의 가운데 락업에 초점이 맞춰져 있으며 해당 락업이 다른 락업보다 살짝 더 크게 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/lockups-generic@2x.png)

**행 또는 그룹에서 일관된 락업 크기를 사용하십시오.** 버튼 그룹 또는 콘텐츠 이미지 행은 모든 요소의 너비 및 높이가 일치할 때 시각적으로 더 매력적으로 보입니다.

개발자 지침을 보려면 [TVLockupView](https://developer.apple.com/documentation/tvuikit/tvlockupview) 및 [TVLockupHeaderFooterView](https://developer.apple.com/documentation/tvuikit/tvlockupheaderfooterview)의 내용을 참조하십시오.

## 카드

카드는 머리말, 꼬리말, 콘텐츠 보기를 결합하여 미디어 항목에 대한 평가 및 리뷰를 표시합니다.

![여러 카드가 포함되어 있으며 그중 하나가 하이라이트되어 있는 Apple TV 화면의 일러스트. 상단의 하이라이트된 카드 안에 위치 지정자 콘텐츠가 평가 및 여러 텍스트 줄의 위치를 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/lockups-background@2x.png)

개발자 지침을 보려면 [TVCardView](https://developer.apple.com/documentation/tvuikit/tvcardview)의 내용을 참조하십시오.

## 캡션 버튼

캡션 버튼은 버튼 아래에 제목 및 부제목을 포함할 수 있습니다. 캡션 버튼은 이미지 또는 텍스트를 포함할 수 있습니다.

사람들이 캡션 버튼에 초점을 맞출 때 쓸어넘기는 움직임에 따라 캡션 버튼이 기울어지도록 하십시오. 세로로 정렬된 경우 캡션 버튼은 위아래로 기울어집니다. 가로로 정렬된 경우 캡션 버튼은 왼쪽 및 오른쪽으로 기울어집니다. 그리드에 표시된 경우 캡션 버튼은 세로 및 가로 방향 모두로 기울어집니다.

![한 행으로 된 네 개의 캡션 버튼을 표시하도록 하이라이트된 Apple TV 화면의 일러스트. 가장 왼쪽 버튼에 초점이 맞춰져 있어서 살짝 확장되고 배경 위에 떠 있는 것처럼 보임.](https://developer.apple.com/images/com.apple.HIG/kr/lockups-caption-button@2x.png)

개발자 지침을 보려면 [TVCaptionButtonView](https://developer.apple.com/documentation/tvuikit/tvcaptionbuttonview)의 내용을 참조하십시오.

## 모노그램

모노그램은 주로 미디어 항목의 출연진 및 제작진과 같은 사람을 표시합니다. 각각의 모노그램은 원형으로 된 사람의 사진과 그 사람의 이름으로 구성됩니다. 이미지를 사용할 수 없는 경우 이미지 대신 그 사람의 이니셜이 나타납니다.

**가급적 이니셜 대신 이미지를 사용하십시오.** 사람의 이미지는 텍스트를 사용할 때보다 더 친밀하게 느껴집니다.

![여러 모노그램으로 구성된 하나의 행이 포함되어 있으며 그중 가장 왼쪽 항목이 하이라이트되어 있는 Apple TV 화면의 일러스트. 각각의 모노그램에 사람 기호가 포함됨. 각 모노그램의 아래에는 두 줄의 텍스트를 나타내는 위치 지정자 콘텐츠가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/lockups-monogram@2x.png)

개발자 지침을 보려면 [TVMonogramContentView](https://developer.apple.com/documentation/tvuikit/tvmonogramcontentview)의 내용을 참조하십시오.

## 포스터

포스터는 이미지와 선택 사항인 제목 및 부제목으로 구성되며, 포스터에 초점을 맞추기 전에는 제목과 부제목이 가려집니다. 포스터는 어떤 크기든 될 수 있지만 콘텐츠에 적합한 크기를 사용해야 합니다. 관련된 지침을 보려면 [이미지 보기](https://developer.apple.com/kr/design/human-interface-guidelines/image-views)의 내용을 참조하십시오.

![하단 가장자리 근처의 한 행으로 된 여러 포스터를 표시하는 Apple TV 화면의 일러스트. 한 포스터에 초점이 맞춰져 있고 그 아래에 텍스트 줄을 나타내는 위치 지정자 콘텐츠가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/lockups-poster@2x.png)

개발자 지침을 보려면 [TVPosterView](https://developer.apple.com/documentation/tvuikit/tvposterview)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[tvOS용으로 디자인하기](https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-tvos)

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

#### Developer 문서

[TVLockupView](https://developer.apple.com/documentation/tvuikit/tvlockupview) — TVUIKit

[TVLockupHeaderFooterView](https://developer.apple.com/documentation/tvuikit/tvlockupheaderfooterview) — TVUIKit
