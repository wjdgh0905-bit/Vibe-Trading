# 게이지

Source: https://developer.apple.com/kr/design/human-interface-guidelines/gauges

> 게이지는 값의 범위 내에서 특정 숫자 값을 표시합니다.

![선형 퍼센트 게이지 위에 스타일화된 원형 숫자 게이지 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-gauges-intro@2x.png)

게이지는 범위에서 현재 값을 나타내는 것 외에도 범위 자체에 대한 더 많은 맥락을 제공할 수 있습니다. 예를 들어, 온도 게이지는 텍스트를 사용하여 범위 내 최고 온도 및 최저 온도를 식별하고, 변경되는 값을 시각적으로 강조하는 색상 스펙트럼을 표시할 수 있습니다.

## 구조

게이지는 원형 또는 선형 경로를 사용하여 값의 범위를 나타내며 현재 값을 경로의 특정 지점에 매핑합니다. 표준 게이지는 현재 값의 위치를 보여주는 표시기를 표시하고, 용량 스타일을 사용하는 게이지는 경로에서 값의 위치까지 채우기를 표시합니다.

또한 원형 및 선형 게이지는 표준 및 용량 스타일 모두에서 watchOS 컴플리케이션과 시각적으로 유사한 버전으로 사용할 수 있습니다. 액세서리라고 하는 이 버전은 iOS 잠금 화면 위젯과 컴플리케이션의 모양을 재현하려는 모든 곳에서 잘 작동합니다.

> **참고:** macOS는 게이지 외에도 단계 표시기도 지원하며, 그 중 일부는 게이지와 시각적 스타일이 유사합니다. 지침을 보려면 [macOS](https://developer.apple.com/kr/design/human-interface-guidelines/gauges#macOS)의 내용을 참조하십시오.

## 모범 사례

**현재 값과 범위의 양 끝점을 설명하는 간결한 레이블을 작성하십시오.** 모든 게이지 스타일이 모든 레이블을 표시하는 것은 아니지만 VoiceOver는 사람들이 화면을 보지 않고 게이지를 이해할 수 있도록 표시된 레이블을 읽어줍니다.

**게이지의 목적을 전달할 수 있도록 경로를 그라디언트로 채우는 것을 고려하십시오.** 예를 들어, 온도 게이지는 빨간색부터 파란색까지의 색상 범위를 사용하여 고온에서 저온까지의 온도 범위를 나타낼 수 있습니다.

## 플랫폼 고려 사항

*iOS, iPadOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다. tvOS에서는 지원되지 않습니다.*

### macOS

macOS는 게이지를 지원하는 것 외에도 범위 내 특정 숫자 값을 표시하는 단계 표시기도 정의합니다. 단계 표시기를 구성하여 용량, 평가 또는 드물지만 관련성을 전달할 수 있습니다.

용량 스타일은 분리형 또는 연속형 값을 표시할 수 있습니다.

![총 용량의 약 2/3의 양을 나타내기 위해 기본 초록색 채우기를 사용하는 연속형 용량 표시기 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/indicators-continuous@2x.png)

**연속형.** 현재 값을 나타내기 위해 단일 막대로 채운 가로 방향 반투명 트랙입니다.

![총 용량의 3/4의 양을 나타내기 위해 기본 초록색 채우기를 사용하는 분리형 용량 표시기 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/indicators-discrete@2x.png)

**분리형.** 동일한 크기의 분리된 직사각형 세그먼트로 구성된 가로 행입니다. 세그먼트 수가 총 용량과 일치하며, 세그먼트는 현재 값을 나타내기 위해 부분이 아닌 전체가 색상으로 채워집니다.

**큰 범위의 경우 연속형 스타일을 사용하는 것을 고려하십시오.** 값의 범위가 크면 분리형 용량 표시기의 세그먼트가 너무 작아져서 유용하게 사용할 수 없습니다.

**사람들에게 범위의 중요한 부분에 대해 알리기 위해 채우기 색상을 변경하는 것을 고려하십시오.** 기본적으로 두 용량 표시기 스타일의 채우기 색상은 초록색입니다. 앱에 적합한 경우, 현재 값이 매우 낮음, 매우 높음 또는 중간을 약간 넘는 정도와 같이 특정 단계에 도달할 때 채우기 색상을 변경할 수 있습니다. 전체 표시기의 채우기 색상을 변경할 수 있거나, 계층 상태를 사용하여 아래와 같이 한 표시기에 여러 색상의 시퀀스를 표시할 수 있습니다.

![가장 왼쪽의 1/8이 빨간색, 그 다음 3/8이 노란색, 그 다음 1/4가 초록색, 마지막 1/4가 채워지지 않은 연속형 용량 표시기 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/indicators-continuous-tiered@2x.png)

사람들이 항목을 평가할 수 있도록 하는 평가 스타일 사용에 대한 지침을 보려면 [평가 표시기](https://developer.apple.com/kr/design/human-interface-guidelines/rating-indicators)의 내용을 참조하십시오.

드물게 사용되지만 관련성 스타일은 음영이 있는 가로 막대를 사용하여 관련성을 전달할 수 있습니다. 예를 들어, 관련성 표시기는 사람들이 여러 항목을 정렬하거나 비교할 때 결과의 관련성을 시각화할 수 있도록 검색 결과 목록에 나타날 수 있습니다.

## 리소스

#### 관련 콘텐츠

[평가 및 리뷰](https://developer.apple.com/kr/design/human-interface-guidelines/ratings-and-reviews)

#### Developer 문서

[Gauge](https://developer.apple.com/documentation/swiftui/gauge) — SwiftUI

[NSLevelIndicator](https://developer.apple.com/documentation/appkit/nslevelindicator) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2022년 9월 23일 | 새로운 페이지. |
