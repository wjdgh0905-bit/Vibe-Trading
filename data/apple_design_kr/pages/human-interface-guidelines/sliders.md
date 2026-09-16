# 슬라이더

Source: https://developer.apple.com/kr/design/human-interface-guidelines/sliders

> 슬라이더는 조절기라고 하는 제어기가 포함된 수평 형태의 트랙이며, 이를 통해 최소값 및 최대값 사이에서 값을 조절할 수 있습니다.

![밝기 슬라이더의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-slider-intro@2x.png)

슬라이더의 값이 변함에 따라 최소값과 조절기 사이에 있는 트랙 영역이 색상으로 채워집니다. 슬라이더는 최소값과 최대값의 의미를 나타내는 왼쪽 및 오른쪽 아이콘을 선택적으로 표시할 수 있습니다.

## 모범 사례

**도움이 된다면 슬라이더의 모양을 사용자화하십시오.** 앱 디자인과 조화를 이루고 의도를 전달할 수 있도록 트랙 색상, 조절기 이미지 및 색조 색상, 왼쪽 및 오른쪽 아이콘을 비롯한 슬라이더의 모양을 조절할 수 있습니다. 예를 들어 이미지 크기를 조절하는 슬라이더는 왼쪽에 작은 이미지 아이콘을, 오른쪽에 큰 이미지 아이콘을 표시할 수 있습니다.

**친숙한 슬라이더 방향을 사용하십시오.** 사람들은 슬라이더의 최소 및 최대 위치가 모든 앱에서 일관적일 것으로 예상합니다. 수평 슬라이더의 경우 앞쪽에 최소값, 뒤쪽에 최대값이 표시되고 수직 슬라이더의 경우 하단에 최소값, 상단에 최대값이 표시될 것이라고 생각합니다. 예를 들어, 백분율을 나타내는 수평 슬라이더의 경우 앞쪽의 0퍼센트에서 뒤쪽의 100퍼센트로 이동된다고 예상합니다.

**슬라이더를 보조하는 텍스트 필드와 스텝퍼를 추가하는 것을 고려하십시오.** 특히 슬라이더가 넓은 범위의 값을 나타내는 경우, 사람들은 정확한 슬라이더 값을 확인하고 텍스트 필드에 특정 값을 입력하고 싶을 수 있습니다. 스텝퍼를 추가하면 일정한 값으로 쉽게 증감할 수 있습니다. 관련된 지침을 보려면 [텍스트 필드](https://developer.apple.com/kr/design/human-interface-guidelines/text-fields) 및 [스텝퍼](https://developer.apple.com/kr/design/human-interface-guidelines/steppers)의 내용을 참조하십시오.

![눈금 마크가 없고 뒤쪽에 텍스트 필드 및 스텝퍼가 있는 수평 방향 선형 슬라이더의 일러스트. 슬라이더 중앙에 조절기가 있고 텍스트 필드에 50%가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/sliders-text-field@2x.png)

## 플랫폼 고려 사항

*tvOS에서는 지원되지 않습니다.*

### iOS, iPadOS

**슬라이더를 사용하여 오디오 음량을 조절하지 마십시오.** 앱에서 음량 제어기를 제공해야 하는 경우, 음량 보기를 사용하십시오. 음량 보기는 사용자화가 가능하며 음량 레벨 슬라이더 및 활성 오디오 출력 기기를 변경하는 제어기를 포함하고 있습니다. 지침을 보려면 [오디오 재생하기](https://developer.apple.com/kr/design/human-interface-guidelines/playing-audio)의 내용을 참조하십시오.

### macOS

macOS의 슬라이더 역시 눈금 마크를 포함할 수 있으므로 사람들이 범위 안의 특정 값을 쉽게 선택 가능합니다.

눈금 마크가 있거나 없는 선형 슬라이더에서 조절기는 좁은 마름모꼴 형태이며 최소값과 조절기 사이의 트랙 영역이 색상으로 채워집니다. 선형 슬라이더는 흔히 최소값 및 최대값의 의미를 나타내는 추가 아이콘을 포함합니다.

원형 슬라이더에서 조절기는 작은 원으로 나타납니다. 눈금 마크를 표시하는 경우, 슬라이더 둘레 주변에 균등한 간격으로 점이 나타납니다.

![가운데에 조절기가 있는 수평 슬라이더의 일러스트. 슬라이더 앞쪽부터 조절기까지 파란색 하이라이트 색상으로 채워짐.](https://developer.apple.com/images/com.apple.HIG/kr/sliders-no-tick-marks@2x.png)

![슬라이더 가운데 두 개의 눈금 마크 사이에 조절기가 있는 수평 슬라이더의 일러스트. 슬라이더 앞쪽부터 조절기까지 파란색 하이라이트 색상으로 채워짐.](https://developer.apple.com/images/com.apple.HIG/kr/sliders-tick-marks@2x.png)

![조절기가 12시 방향에 있는 원형 슬라이더의 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/sliders-circular@2x.png)

**슬라이더의 값이 변경될 때 실시간으로 피드백을 전달하는 것을 고려하십시오.** 실시간 피드백은 실시간으로 결과를 표시합니다. 예를 들어, Dock 설정에서 크기 슬라이더를 조절할 때 Dock 아이콘의 크기가 동적으로 변경됩니다.

**사람들의 예상과 일치하는 슬라이더 스타일을 선택하십시오.** 수평 슬라이더는 고정된 시작점과 끝점 사이에서 이동할 때 적합합니다. 예를 들어, 그래픽 앱은 0~100퍼센트 사이에서 대상체의 불투명도 수준을 설정하는 수평 슬라이더를 제공할 수 있습니다. 끝없이 값이 반복되거나 이어지는 경우 원형 슬라이더를 사용하십시오. 예를 들어, 그래픽 앱은 0~360도 사이에서 대상체의 회전을 조절하는 원형 슬라이더를 사용할 수 있습니다. 애니메이션 앱은 원형 슬라이더를 사용하여 애니메이션될 때 대상체가 얼마나 많이 회전되는지 조절할 수 있습니다. 네 번 완전히 돌리면 네 번 회전, 즉 1440도 회전이 됩니다.

**슬라이더를 소개하는 레이블을 사용하는 것을 고려하십시오.** 일반적으로 레이블은 [sentence-style capitalization](https://help.apple.com/applestyleguide/#/apsgb744e4a3?sub=apdca93e113f1d64)(문장식 대문자 표기법)을 사용하고 콜론으로 끝납니다. 지침을 보려면 [레이블](https://developer.apple.com/kr/design/human-interface-guidelines/labels)의 내용을 참조하십시오.

**눈금 마크를 사용하여 명확성과 정확성을 향상하십시오.** 눈금 마크는 측정 단위를 파악하고 특정 값을 쉽게 찾는 데 도움이 됩니다.

![비활성 상태 후 얼마나 오래 디스플레이를 유지할지 제어하는 슬라이더가 표시되도록 잘려져 있는 macOS 에너지 절약 설정 패널의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/sliders-labels@2x.png)

**레이블에 눈금 마크를 추가하여 명확성을 높이는 것을 고려하십시오.** 슬라이더의 값에 따라 레이블은 숫자 또는 단어일 수 있습니다. 혼란을 줄이기 위해 꼭 필요한 경우가 아니라면, 모든 눈금 마크에 레이블을 추가할 필요는 없습니다. 많은 경우 최소값 및 최대값에만 레이블을 추가해도 충분합니다. 에너지 절약 설정 패널과 같이 슬라이더의 값이 비선형적이라면 주기적 레이블로 맥락을 제공할 수 있습니다. 포인터가 위에 있을 때 조절기의 값을 표시하는 [macOS, visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/offering-help#macOS-visionOS)을 제공하는 것도 좋은 아이디어입니다.

### visionOS

**가급적 수평 슬라이더를 사용하십시오.** 일반적으로 위아래로 제스처를 수행하는 것보다 옆으로 제스처를 수행하는 것이 더 쉽습니다.

### watchOS

슬라이더는 불연속적 단계 또는 연속적 막대의 세트로 나타나며, 한정된 값 범위를 표시하는 수평 트랙입니다. 사람들은 슬라이더 옆의 버튼을 탭하여 미리 정의된 양만큼 값을 증가시키거나 감소시킬 수 있습니다.

![불연속적 단계로 된 watchOS 음량 슬라이더 일러스트. 3단계 중 1단계와 2단계가 녹색 하이라이트 색상으로 채워져 음량 수준을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/sliders-watchos-discrete@2x.png)

![연속적 막대로 된 watchOS 음량 슬라이더 일러스트. 막대의 2/3가 녹색 하이라이트 색상으로 채워져 음량 수준을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/sliders-watchos-continuous@2x.png)

**필요한 경우, 사용자 설정 글리프를 생성하여 슬라이더의 기능을 나타내십시오.** 기본적으로 시스템은 더하기 및 빼기 기호를 표시합니다.

## 리소스

#### 관련 콘텐츠

[스텝퍼](https://developer.apple.com/kr/design/human-interface-guidelines/steppers)

[선택기](https://developer.apple.com/kr/design/human-interface-guidelines/pickers)

#### Developer 문서

[Slider](https://developer.apple.com/documentation/swiftui/slider) — SwiftUI

[UISlider](https://developer.apple.com/documentation/uikit/uislider) — UIKit

[NSSlider](https://developer.apple.com/documentation/appkit/nsslider) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
