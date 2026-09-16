# 카메라 컨트롤

Source: https://developer.apple.com/kr/design/human-interface-guidelines/camera-control

> 카메라 컨트롤을 사용하면 앱의 카메라 경험에 직접 접근할 수 있습니다.

![카메라 컨트롤의 스타일화된 모양.](https://developer.apple.com/images/com.apple.HIG/inputs-camera-control-intro@2x.png)

iPhone 16 및 iPhone 16 Pro 모델에서 카메라 컨트롤을 사용하면 앱의 카메라 경험을 빠르게 열어 순간을 바로 캡처할 수 있습니다. 카메라 컨트롤을 살짝 누르면 시스템은 기기 베젤에서부터 확장되는 오버레이를 표시합니다.

![카메라 컨트롤에 대한 설명과 가로 방향의 iPhone의 오버레이가 표시된 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-button-callout@2x.png)

오버레이를 통해 제어기를 빠르게 조절할 수 있습니다. 카메라 컨트롤을 살짝 두 번 누르면 사용 가능한 제어기를 볼 수 있습니다. 제어 항목을 선택한 후, 카메라 컨트롤에서 손가락을 밀어서 원하는 대로 콘텐츠를 캡처하기 위해 값을 조절할 수 있습니다.

![제어기가 표시된 카메라 컨트롤 오버레이의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-picker@2x.png)

## 구조

카메라 컨트롤은 값 조절 또는 옵션 변경을 위한 두 가지 유형의 제어기를 제공합니다.

- *슬라이더*는 콘텐츠에 적용할 대비의 정도 등 선택할 값의 범위를 제공합니다.
- *선택기*는 뷰파인더에서 격자를 켜고 끄는 등의 별개의 옵션을 제공합니다.

![슬라이더 제어기가 표시된 카메라 컨트롤 오버레이의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-slider-control@2x.png)

![선택기 제어기가 표시된 카메라 컨트롤 오버레이의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-picker-control@2x.png)

생성한 사용자 설정 제어기 외에도, 시스템은 카메라 확대/축소 및 노출을 조절할 수 있도록 오버레이에 선택적으로 포함할 수 있는 표준 제어기 세트를 제공합니다.

![시스템 확대/축소 요소 제어기가 표시된 카메라 컨트롤 오버레이의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/system-control-type-zoom-factor@2x.png)

![시스템 노출 바이어스 제어기가 표시된 카메라 컨트롤 오버레이의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/system-control-type-exposure-bias@2x.png)

## 모범 사례

**SF Symbols를 사용하여 제어기 기능을 나타내십시오.** 시스템은 사용자 설정 기호를 지원하지 않습니다. 그 대신, 제어기의 동작을 명확하게 나타내는 기호를 SF Symbols에서 선택하십시오. iOS는 오버레이에 앱의 제어기를 표시하는 데 사용할 수 있는 수천 개의 기호를 제공합니다. 제어기의 기호는 해당 제어기의 현재 상태를 나타내지 않습니다. 사용할 수 있는 모든 기호를 보려면 [SF Symbols app](https://developer.apple.com/sf-symbols/)에서 카메라 및 사진 섹션을 보십시오.

![bolt.fill 기호를 사용하는 카메라 플래시 제어기가 표시된 카메라 컨트롤 오버레이의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-picker-sf-symbols-flash@2x.png)

![camera.filters 기호를 사용하는 카메라 필터 제어기가 표시된 카메라 컨트롤 오버레이의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-picker-sf-symbols-filters@2x.png)

**제어기의 이름을 짧게 지정하십시오.** 제어기 레이블은 다이나믹 타입 크기를 따르며, 긴 이름은 카메라의 뷰파인더를 혼란스럽게 만들 수 있습니다.

**슬라이더 제어기 값이 있는 단위 또는 기호를 포함하여 맥락을 제공하십시오.** 오버레이에 EV, % 또는 사용자 설정 문자열 등의 설명 정보를 제공하면 슬라이더 제어기를 파악하는 데 도움이 됩니다. 개발자 지침을 보려면 [localizedValueFormat](https://developer.apple.com/documentation/avfoundation/avcaptureslider/localizedvalueformat)의 내용을 참조하십시오.

![값 유형에 대한 값과 맥락을 표시하는 슬라이더 제어기가 있는 카메라 컨트롤 오버레이의 예제가 표시된 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/system-control-with-label@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![값이 무엇을 나타내는지에 대한 정보 없이 값을 표시하는 슬라이더 제어기가 있는 카메라 컨트롤 오버레이의 예제가 표시된 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/system-control-no-label@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**슬라이더 제어기에 주요 값을 정의하십시오.** 주요 값은 사람들이 가장 자주 선택하는 값이나, 확대/축소 요소의 증가 값처럼 균일하게 간격이 나눠진 값이 될 수 있습니다. 사람들이 카메라 컨트롤을 밀어 슬라이더 제어기를 조절할 때 시스템은 정의된 주요 값을 더 쉽게 선택할 수 있습니다. 개발자 지침을 보려면 [prominentValues](https://developer.apple.com/documentation/avfoundation/avcaptureslider/prominentvalues-199dz)의 내용을 참조하십시오.

**뷰파인더에 오버레이를 위한 공간을 마련하십시오.** 오버레이 및 제어기 레이블은 세로와 가로 화면 방향에서 카메라 컨트롤에 인접한 화면 영역을 차지합니다. 카메라 캡처 경험의 인터페이스 요소가 겹치지 않게 하려면 UI를 오버레이 영역 밖에 배치하십시오. 뷰파인더 높이 및 너비의 최대 크기를 지정하고 오버레이가 그 위에 나타나고 사라질 수 있게 하십시오.

![제어기의 레이블이 iPhone의 세로와 가로 화면 방향의 뷰포트에 있는 카메라 컨트롤 오버레이가 표시된 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-portrait-landscape-orientation@2x.png)

**뷰파인더에서 방해 요소를 최소화하십시오.** 사진 또는 비디오를 캡처할 때 사람들은 가능한 한 시각적 방해 요소가 적고, 미리보기 이미지가 크기를 바랍니다. 시스템이 오버레이를 표시할 때 UI와 오버레이에서 슬라이더, 토글과 같은 제어기가 중복되지 않게 하십시오.

![캡처 뷰포트에서 UI 요소가 제거된 카메라 컨트롤 오버레이의 예시가 표시된 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-screen-ui-good-example@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![캡처 뷰포트에서 UI 요소가 중복된 카메라 컨트롤 오버레이의 예시가 표시된 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/camera-control-screen-ui-bad-example@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**카메라 모드에 따라 제어기를 활성화 또는 비활성화하십시오.** 예를 들어, 사진을 찍을 때는 비디오 제어기를 비활성화하십시오. 오버레이가 여러 제어기를 지원하지만, 런타임 시에는 제어기를 제거 또는 추가할 수 없습니다.

**제어기를 어떻게 정렬할지 고려하십시오.** 자주 사용하는 제어기는 빠르게 접근할 수 있도록 가운데 쪽에 배치하고, 덜 사용하는 제어기는 양옆에 배치하십시오. 카메라 컨트롤을 살짝 눌러 오버레이를 다시 여는 경우, 시스템이 앱에서 마지막으로 사용된 제어기를 기억합니다.

**카메라 컨트롤을 사용하여 어디서든 경험을 실행할 수 있게 하십시오.** 잠긴 카메라 캡처 확장 프로그램을 생성하여 사람들이 앱의 카메라 경험을 잠긴 기기, 홈 화면 또는 다른 앱에서 실행하도록 카메라 컨트롤을 구성할 수 있게 하십시오. 지침을 보려면 [잠긴 기기의 카메라 경험](https://developer.apple.com/kr/design/human-interface-guidelines/controls#Camera-experiences-on-a-locked-device)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iPadOS, macOS, watchOS, tvOS 또는 visionOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)

[제어기](https://developer.apple.com/kr/design/human-interface-guidelines/controls)

#### Developer 문서

[Enhancing your app experience with the Camera Control](https://developer.apple.com/documentation/avfoundation/enhancing-your-app-experience-with-the-camera-control) — AVFoundation

[AVCaptureControl](https://developer.apple.com/documentation/avfoundation/avcapturecontrol) — AVFoundation

[LockedCameraCapture](https://developer.apple.com/documentation/lockedcameracapture)

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 9월 9일 | 새로운 페이지. |
