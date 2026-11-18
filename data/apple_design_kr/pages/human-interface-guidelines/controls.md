# 제어기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/controls

> 제어 센터, 잠금 화면 또는 동작 버튼의 제어기를 통해 앱의 기능에 빠르게 접근할 수 있습니다.

![에어플레인 모드 토글, Wi-Fi 토글, AirPlay 버튼과 같은 제어 센터 제어기의 부분적 스크린샷. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-controls-intro@2x.png)

제어기는 시스템의 다른 영역에서 앱 기능에 빠르게 접근하게 해주는 버튼 또는 토글을 의미합니다. 제어기 버튼은 동작을 수행하거나, 앱의 특정 영역으로 링크하거나, [잠긴 기기의 카메라 경험](https://developer.apple.com/kr/design/human-interface-guidelines/controls#Camera-experiences-on-a-locked-device)합니다. 제어기 토글은 켬, 끔과 같은 두 가지 상태 간에 전환합니다.

사람들은 제어 센터의 빈 영역을 길게 눌러 제어기를 추가하거나, 잠금 화면을 사용자화하여 잠금 화면에 제어기를 추가하거나, 설정 앱에서 동작 버튼을 구성하여 동작 버튼에 제어기를 추가할 수 있습니다.

## 구조

제어기는 기호 이미지, 제목, 그리고 선택적으로 값을 포함합니다. 기호는 제어기가 무엇을 하는지 시각적으로 나타내며, [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)의 기호이거나 사용자 설정 기호일 수 있습니다. 제목은 제어기가 무엇과 관련되어 있는지 설명하며, 값은 제어기의 상태를 나타냅니다. 예를 들어 제목은 방에 있는 전등의 이름을 표시하고, 값은 이 전등이 켜져 있는지 또는 꺼져 있는지 표시할 수 있습니다.

![제어기 토글의 기호 이미지, 제목, 값에 대한 배치가 표시된 다이어그램.](https://developer.apple.com/images/com.apple.HIG/kr/control-medium-anatomy@2x.png)

제어기는 제어기가 어디에 나타나는지에 따라 정보를 다르게 표시합니다.

- 제어 센터에서 제어기는 기호, 그리고 더 큰 크기로 제목 및 값을 표시합니다.
- 잠금 화면에서 제어기는 기호를 표시합니다.
- 동작 버튼에 제어기가 할당된 iPhone 기기에서 동작 버튼을 길게 누르면 Dynamic Island에 제어기의 기호와 값(있을 경우)이 표시됩니다.

![선이 그어진 빨간 색조의 종 기호를 통해 무음 모드 제어기의 활성화 상태가 하이라이트되어 표시된 iPhone 제어 센터의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/control-control-center@2x.png)

![선이 그어진 빨간 색조의 종 기호를 통해 오른쪽에 있는 무음 모드 제어기의 활성화 상태가 하이라이트되어 표시된 iPhone 잠금 화면 하단의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/control-lock-screen@2x.png)

![앞쪽 영역에는 선이 그어진 빨간 색조의 종 기호를 통해 무음 모드의 활성화 상태가 표시되고, 뒤쪽 영역에는 무음이라는 빨간 색조의 텍스트가 표시되어 있는 iPhone 홈 화면 상단의 Dynamic Island의 부분적 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/control-dynamic-island@2x.png)

## 모범 사례

**앱을 실행하지 않고도 최대한의 이점을 제공할 수 있는 동작의 제어기를 제공하십시오.** 예를 들어, 제어기로 실시간 현황을 실행하면 앱으로 이동하여 최신 정보를 찾을 필요 없이 쉽고 매끄럽게 진행 상태를 확인할 수 있습니다. 지침을 보려면 [실시간 현황](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities)의 내용을 참조하십시오.

**제어기와 상호작용하거나 동작이 완료될 때 제어기를 업데이트하십시오. 또는 푸시 알림을 통해 원격으로 제어기를 업데이트하십시오.** 상태를 정확하게 반영하고 동작이 아직 진행 중인지 표시하도록 제어기의 콘텐츠를 업데이트하십시오.

**제어기의 동작을 잘 설명하는 기호를 선택하십시오.** 제어기를 어디에 추가하는지에 따라 제목과 값이 표시되지 않을 수도 있으므로, 기호는 제어기의 동작에 관한 충분한 정보를 전달해야 합니다. 제어기 토글의 경우, 켬 및 끔 상태 모두에 대한 기호를 제공하십시오. 예를 들어, SF Symbols의 `door.garage.open` 및 `door.garage.closed`를 사용하여 차고 문을 열고 닫는 제어기를 나타내십시오. 지침을 보려면 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)의 내용을 참조하십시오.

**기호 애니메이션을 사용하여 상태 변화를 하이라이트하십시오.** 제어기 토글의 경우, 켬 및 끔 두 상태 간의 전환에 애니메이션을 적용하십시오. 실행 시간이 있는 동작이 지정된 제어기 버튼의 경우, 동작이 수행되는 동안에는 계속 애니메이션을 적용하고 동작이 완료되면 애니메이션을 중단하십시오. 개발자 지침을 보려면 [Symbols](https://developer.apple.com/documentation/symbols) 및 [SymbolEffect](https://developer.apple.com/documentation/symbols/symboleffect)의 내용을 참조하십시오.

**앱의 브랜드와 어울리는 색조 색상을 선택하십시오.** 시스템에서 이 색조 색상을 제어기 토글의 켬 상태 기호에 적용합니다. 동작 버튼으로 제어기의 동작을 수행하는 경우에도 시스템에서 이 색조 색상을 사용하여 Dynamic Island에 값과 기호를 표시합니다. 지침을 보려면 [브랜딩](https://developer.apple.com/kr/design/human-interface-guidelines/branding)의 내용을 참조하십시오.

![색조가 적용되지 않은 비활성 상태의 전구 기호 제어기 토글.](https://developer.apple.com/images/com.apple.HIG/kr/control-lightbulb-not-tinted@2x.png)

![노란색 색조가 적용된 활성 상태의 전구 기호 제어기 토글.](https://developer.apple.com/images/com.apple.HIG/kr/control-lightbulb-tinted@2x.png)

**동작을 수행하기 위해 시스템에 필요한 추가 정보를 사람들이 제공할 수 있도록 지원하십시오.** 어떤 동작을 수행하려면 제어기에 대한 구성이 필요할 수 있습니다. 예를 들어, 집에서 켜고 끌 특정 전등을 선택해야 할 수 있습니다. 제어기에 대한 구성이 필요할 경우, 제어기를 처음 추가할 때 이 단계를 완료하도록 안내하십시오. 사람들은 언제든지 제어기를 다시 구성할 수 있습니다. 개발자 지침을 보려면 [promptsForUserConfiguration()](https://developer.apple.com/documentation/swiftui/controlwidgetconfiguration/promptsforuserconfiguration())의 내용을 참조하십시오.

![사람들이 선택하는 값으로 옵션을 설정할 수 있는 기능이 표시된 제어기의 화면.](https://developer.apple.com/images/com.apple.HIG/kr/control-configuration-options@2x.png)

**동작 버튼에 대한 힌트 텍스트를 제공하십시오.** 동작 버튼을 누르면 동작 버튼을 길게 누를 때 어떻게 되는지 알려주는 힌트 텍스트를 시스템에서 표시합니다. 동작 버튼을 길게 누르면 시스템에서 해당 버튼에 구성된 동작을 수행합니다. 동사를 사용하여 힌트 텍스트를 작성하십시오. 개발자 지침을 보려면 [controlWidgetActionHint(_:)](https://developer.apple.com/documentation/swiftui/view/controlwidgetactionhint(_:)-5yoyh)의 내용을 참조하십시오.

![동작 버튼의 힌트 텍스트가 표시된 iPhone 홈 화면의 부분적 스크린샷. 힌트 텍스트는 ‘길게 눌러서 벨소리 끄기’임.](https://developer.apple.com/images/com.apple.HIG/kr/controls-action-button-coaching-text-on@2x.png)

![동작 버튼의 힌트 텍스트가 표시된 iPhone 홈 화면의 부분적 스크린샷. 힌트 텍스트는 ‘길게 눌러서 벨소리 켜기’임.](https://developer.apple.com/images/com.apple.HIG/kr/controls-action-button-coaching-text-off@2x.png)

**제어기 제목 또는 값이 달라질 수 있다면 위치 지정자를 포함하십시오.** 제목과 값이 상황에 따라 달라질 경우, 위치 지정자 정보로 제어기가 어떤 동작을 하는지 사람들에게 알려줄 수 있습니다. 제어기 센터 또는 잠금 화면에서 제어기 갤러리를 불러온 다음 제어기를 선택할 때, 또는 동작 버튼에 제어기를 할당하기 전에 시스템에서 이 정보를 표시합니다.

**기기가 잠긴 경우 민감한 정보를 가리십시오.** 기기가 잠긴 경우 시스템이 제목과 값을 삭제하여 개인 또는 보안 관련 정보를 가리도록 만드는 것을 고려하십시오. 시스템이 기호 상태도 삭제해야 하는지 지정하십시오. 지정할 경우 시스템은 제목과 값을 삭제하고, 기호를 끔 상태로 표시합니다.

![전구 기호, 제목, 값 텍스트를 표시하는 중간 크기의 제어기 토글.](https://developer.apple.com/images/com.apple.HIG/kr/control-regular-text@2x.png)

![삭제된 텍스트가 있는 중간 크기의 제어기 토글.](https://developer.apple.com/images/com.apple.HIG/kr/control-redacted-text@2x.png)

**보안에 영향을 주는 동작에는 인증을 요구하십시오.** 예를 들어, 집 문의 잠금장치를 잠그거나 여는 제어기 또는 차의 시동을 거는 제어기에 접근할 때 기기의 잠금을 해제하도록 요구하십시오. 개발자 지침을 보려면 [IntentAuthenticationPolicy](https://developer.apple.com/documentation/appintents/intentauthenticationpolicy)의 내용을 참조하십시오.

## 잠긴 기기의 카메라 경험

iOS 18부터는 앱에서 카메라 캡처를 지원하는 경우, 기기가 잠긴 상태에서 앱의 카메라 경험을 바로 실행하는 제어기를 생성할 수 있습니다. 캡처 이외의 작업의 경우, 인증하고 기기의 잠금을 해제해야 앱에서 작업을 완료할 수 있습니다. 개발자 지침을 보려면 [LockedCameraCapture](https://developer.apple.com/documentation/lockedcameracapture)의 내용을 참조하십시오.

**앱 및 카메라 경험에서 동일한 카메라 UI를 사용하십시오.** UI를 공유하여 앱에 대한 친숙함을 활용할 수 있습니다. 동일한 UI를 사용하면 사람들이 콘텐츠를 캡처하고, 소셜 네트워크에 게시하거나 사진을 편집하는 등 추가 작업을 수행하기 위해 버튼을 탭할 때 매끄럽게 앱으로 전환할 수 있습니다.

**제어기를 추가하는 방법에 대한 지침을 제공하십시오.** 사람들이 해당 카메라 경험을 실행하는 제어기를 추가하는 방법을 알 수 있도록 설명하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS 또는 macOS에 대한 추가 고려 사항은 없습니다. watchOS, tvOS 또는 visionOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[위젯](https://developer.apple.com/kr/design/human-interface-guidelines/widgets)

[동작 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/action-button)

#### Developer 문서

[LockedCameraCapture](https://developer.apple.com/documentation/lockedcameracapture)

[WidgetKit](https://developer.apple.com/documentation/widgetkit)

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 6월 10일 | 새로운 페이지. |
