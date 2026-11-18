# 경로 제어기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/path-controls

> 경로 제어기는 선택한 파일 또는 폴더의 파일 시스템 경로를 표시합니다.

![루트 디스크, 상위 폴더, 선택한 항목이 표시된 HIG 디자인 문서에 대한 경로 제어기의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-path-control-intro@2x.png)

예를 들어, Finder에서 보기 > 경로 막대 보기를 선택하면 윈도우 하단에 경로 막대가 표시됩니다. 경로 막대에는 선택한 항목의 경로가 표시되거나, 아무것도 선택하지 않은 경우에는 해당 윈도우의 폴더 경로가 표시됩니다.

경로 제어기에는 두 가지 스타일이 있습니다.

![네 개 위치의 계층을 표시하는 Finder 경로 막대의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/path-controls-standard@2x.png)

**표준.** 루트 디스크, 상위 폴더, 선택한 항목이 포함된 선형 목록입니다. 각 항목은 아이콘 및 이름과 함께 나타납니다. 제어기에 비해 목록이 너무 긴 경우 첫 번째 항목과 마지막 항목 사이의 이름이 가려집니다. 제어기를 편집 가능하게 만들면 사람들이 항목을 제어기로 드래그하여 항목을 선택하고 해당 경로를 제어기에 표시할 수 있습니다.

![폴더 아이콘 및 팝업 제어기를 표시하는 경로 제어기의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/path-controls-popup@2x.png)

**팝업.** 선택한 항목의 아이콘 및 이름을 표시하는 [팝업 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons)과 유사한 제어기입니다. 항목을 클릭하면 루트 디스크, 상위 폴더, 선택한 항목이 포함된 메뉴를 열 수 있습니다. 제어기를 편집 가능하게 만들면 사람들이 항목을 선택하고 제어기에 표시하는 데 사용할 수 있는 ‘선택’ 명령이 메뉴에 추가됩니다. 항목을 제어기로 드래그하여 항목을 선택하고 해당 경로를 표시하는 것도 가능합니다.

## 모범 사례

**윈도우 프레임이 아닌 윈도우 본문에 경로 제어기를 사용하십시오.** 경로 제어기는 도구 막대 또는 상태 막대에 사용하기 위한 것이 아닙니다. Finder의 경로 제어기는 상태 막대가 아닌 윈도우 본문 하단에 나타난다는 점에 주목하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[파일 관리](https://developer.apple.com/kr/design/human-interface-guidelines/file-management)

#### Developer 문서

[NSPathControl](https://developer.apple.com/documentation/appkit/nspathcontrol) — AppKit
