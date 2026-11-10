# 패널

Source: https://developer.apple.com/kr/design/human-interface-guidelines/panels

> macOS 앱에서 패널은 일반적으로 열려 있는 다른 윈도우에 떠 있는 것처럼 표시되어 활성 윈도우나 현재 선택 항목과 관련된 추가 제어기, 옵션 또는 정보를 제공합니다.

![윈도우 위에 스타일화되어 표시된 패널. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-panel-intro@2x.png)

일반적으로 패널은 앱의 [macOS 윈도우 상태](https://developer.apple.com/kr/design/human-interface-guidelines/windows#macOS-window-states)보다 눈에 덜 띄는 모양을 하고 있습니다. 필요한 상황인 경우, 패널에서 어두운 반투명 스타일을 사용하여 *HUD*(헤즈업 디스플레이) 경험을 지원할 수도 있습니다.

앱을 다른 플랫폼에서 실행할 때 모달 뷰를 사용하여 현재 작업 또는 선택 항목과 관련 있는 추가 콘텐츠를 제공할 수 있습니다. 지침을 보려면 [모달 형식](https://developer.apple.com/kr/design/human-interface-guidelines/modality)의 내용을 참조하십시오.

## 모범 사례

**패널을 사용하여 작업 중인 콘텐츠와 관련된 중요한 제어기 또는 정보에 빠르게 접근할 수 있게 하십시오.** 예를 들어, 패널을 사용하여 활성 문서 또는 윈도우에서 선택한 항목에 영향을 주는 제어기 또는 설정을 제공할 수 있습니다.

**패널을 사용하여 인스펙터 기능을 제시하십시오.** *인스펙터*는 현재 선택된 항목의 세부사항을 표시하고 사람들이 항목을 변경하거나 새로운 항목을 선택하면 해당 항목의 콘텐츠를 자동으로 업데이트합니다. 반대로 선택 항목을 변경해도 항상 동일한 콘텐츠를 유지하는 *정보* 윈도우를 제시해야 하는 경우, 패널이 아니라 일반 윈도우를 사용하십시오. 앱의 레이아웃에 따라 [Split View](https://developer.apple.com/kr/design/human-interface-guidelines/split-views) 패널을 사용하여 인스펙터를 제시할 수도 있습니다.

**패널에서 간단한 조절 제어기를 사용하십시오.** 동작에 여러 단계가 필요할 수 있기 때문에 텍스트를 입력하거나 작업할 항목을 선택해야 하는 제어기는 최대한 포함하지 마십시오. 대신 사람들이 더 직접적으로 제어할 수 있도록 슬라이더나 스텝퍼와 같은 제어기를 사용하는 것이 좋습니다.

**패널의 목적을 설명하는 제목을 간결하게 작성하십시오.** 주로 패널은 앱에 열려 있는 다른 윈도우에 떠 있는 것처럼 표시되기 때문에 원하는 위치로 옮기려면 제목 막대가 필요합니다. 화면상에서 패널을 식별할 수 있도록 명사 또는 [title-style capitalization](https://support.apple.com/guide/applestyleguide/c-apsgb744e4a3/web#apdca93e113f1d64)(제목식 대문자 표기법)으로 작성한 명사 구를 사용하여 짧은 제목을 작성하십시오. 예를 들어, macOS는 ‘서체’ 및 ‘색상’이라는 제목의 익숙한 패널을 제공하며 대부분의 앱은 ‘인스펙터’라는 제목을 사용합니다.

**패널을 적절하게 표시하고 가리십시오.** 앱이 활성화되면 패널이 열렸을 때 윈도우의 활성화 여부와 관계없이 열려 있는 모든 패널을 전면으로 가져옵니다. 앱이 비활성화되면 모든 패널을 가립니다.

**윈도우 메뉴의 문서 목록에 패널을 포함하지 마십시오.** [윈도우 메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/the-menu-bar#Window-menu)에 패널 표시 및 가리기 명령을 포함해도 되지만, 패널은 문서 또는 표준 앱 윈도우가 아니기 때문에 윈도우 메뉴의 목록에 포함하면 안됩니다.

**일반적으로 패널의 최소화 버튼을 제공하지 마십시오.** 패널은 필요할 때만 표시되고 앱이 비활성 상태일 때는 사라지기 때문에 일반적으로 패널을 최소화할 필요가 없습니다.

**인터페이스와 도움말 문서에서 제목으로 패널을 지칭하십시오.** 메뉴에서 *패널*이라는 용어를 포함하지 않고 패널의 제목을 사용하십시오(예: ‘서체 표시’, ‘색상 표시’ 및 ‘인스펙터 표시’). 도움말 문서에서 ‘패널’을 다른 윈도우 유형으로 소개하면 혼동을 줄 수 있기 때문에 패널을 제목으로 지칭하거나 명확하게 하려면 제목에 *윈도우*를 추가하십시오. 예를 들어, ‘인스펙터’라는 제목은 그 자체만으로도 충분한 맥락을 제공하는 편이지만 ‘서체’ 및 ‘색상’ 대신에 ‘서체 윈도우’ 및 ‘색상 윈도우’를 사용하는 게 더 명확할 수 있습니다.

## HUD 스타일 패널

HUD 스타일은 표준 패널과 동일한 기능을 제공하지만 모양이 더 어둡고 반투명합니다. HUD는 시각적 효과가 큰 콘텐츠나 미디어 편집 또는 전체 화면 슬라이드쇼와 같은 몰입형 경험을 제공하는 앱에서 유용합니다. 예를 들어, QuickTime Player는 콘텐츠를 너무 많이 가리지 않고 인스펙터 정보를 표시하기 위해 HUD를 사용합니다.

![파일 이름, 형식, 초당 프레임 수, 데이터율, 동영상 콘텐츠의 프레임 크기 등 동영상 파일에 대한 인스펙터 정보를 표시하는 데 사용되는 반투명한 HUD 패널의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/hud-style-panel@2x.png)

**가급적 표준 패널을 사용하십시오.** 논리적인 이유 없이 HUD 패널을 사용하면 혼란스럽거나 사용자의 주의가 산만해질 수 있습니다. 또한 HUD가 현재 모양 설정과 일치하지 않을 수도 있습니다. 일반적으로 다음 경우에만 HUD를 사용하십시오.

- 동영상, 사진 또는 슬라이드를 제시하는 미디어 중심 앱
- 표준 패널이 필수 콘텐츠를 가리는 경우
- 제어기를 포함할 필요가 없는 경우(디스클로저 트라이앵글을 제외하고 대부분의 시스템 제공 제어기는 HUD의 모양과 일치하지 않음)

**앱이 모드 간에 전환할 때 하나의 패널 스타일을 유지하십시오.** 예를 들어, 앱이 전체 화면 모드에 있을 때 HUD를 사용한다면 전체 화면 모드를 종료해도 HUD 스타일을 유지하는 게 좋습니다.

**HUD에서는 색상을 절제해서 사용하십시오.** HUD의 어두운 모양에서 색상을 너무 많이 사용하면 주의를 산만하게 만들 수 있습니다. 주로 고대비 색상을 소량으로 사용해 HUD에서 중요한 정보를 하이라이트하기만 해도 됩니다.

**HUD를 작게 유지하십시오.** HUD는 방해가 되지 않으면서 유용하게 사용하기 위해 디자인되었기 때문에 너무 크기를 키우면 원래 목적에 어긋나게 됩니다. HUD로 조절하는 콘텐츠를 가리지 말고 콘텐츠와 경쟁하지 않도록 주의하십시오.

개발자 지침을 보려면 [hudWindow](https://developer.apple.com/documentation/appkit/nswindow/stylemask-swift.struct/hudwindow)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[윈도우](https://developer.apple.com/kr/design/human-interface-guidelines/windows)

[모달 형식](https://developer.apple.com/kr/design/human-interface-guidelines/modality)

#### Developer 문서

[NSPanel](https://developer.apple.com/documentation/appkit/nspanel) — AppKit

[hudWindow](https://developer.apple.com/documentation/appkit/nswindow/stylemask-swift.struct/hudwindow) — AppKit
