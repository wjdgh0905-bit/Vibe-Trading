# visionOS용으로 디자인하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/designing-for-visionos

> 사람들이 Apple Vision Pro를 착용하면 주변 환경과의 연결성을 유지하면서도 무한한 3D 공간 속에서 앱 또는 게임에 몰두할 수 있습니다.

![그리드 위에 스타일화된 Apple Vision Pro 모양이 표시되어 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 초록색을 은은하게 반영하는 초록색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/platforms-visionOS-intro@2x.png)

visionOS용 앱 또는 게임을 디자인할 때에는 해당 플랫폼의 경험을 차별화하는 다음과 같은 기본적인 기기 특성 및 패턴을 먼저 이해해야 합니다. 이러한 특성과 패턴을 사용하여 디자인 결정을 내리는 것은 몰입감 넘치고 흥미로운 경험을 제공하는 데 도움이 될 수 있습니다.

**공간.** Apple Vision Pro가 제공하는 무한한 캔버스에서 사람들은 [윈도우](https://developer.apple.com/kr/design/human-interface-guidelines/windows), [visionOS 볼륨](https://developer.apple.com/kr/design/human-interface-guidelines/windows#visionOS-volumes) 및 3D 대상체와 같은 가상 콘텐츠를 보고, 완전한 몰입을 경험할 수 있는 공간으로 들어갈 수 있습니다.

**몰입감.** visionOS 앱에서 사람들은 여러 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences) 수준 간에 부드럽게 전환할 수 있습니다. 기본적으로 앱은 *공유 공간*에서 실행됩니다. 이곳에서 여러 앱이 나란히 실행될 수 있으며, 사람들은 윈도우를 열고 닫고 윈도우의 위치를 변경할 수 있습니다. 또한 사람들은 해당 앱만 실행되도록 앱을 *전체 공간*으로 전환할 수 있습니다.  전체 공간 앱을 사용하는 동안 사람들은 주변 환경과 매끄럽게 어우러진 3D 콘텐츠를 보거나, 다른 장소를 보도록 포털을 열거나, 다른 세계로 들어갈 수 있습니다.

**패스스루.** [몰입감 및 패스스루](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences#Immersion-and-passthrough)는 기기의 외부 카메라로부터 전송되는 실시간 비디오를 제공하며, 사람들이 실제 주변 환경을 보면서 가상 콘텐츠와 상호작용하도록 돕습니다. 사람들이 주변 환경을 더 많이 또는 더 적게 보고 싶은 경우에는 [Digital Crown](https://developer.apple.com/kr/design/human-interface-guidelines/digital-crown)을 사용하여 패스스루 정도를 제어할 수 있습니다.

**공간 음향.** Apple Vision Pro는 음향 및 시각 감지 기술을 조합하여 사용자 주변 환경의 소리 특성을 모델링하고, 자동으로 해당 공간에 자연스러운 오디오가 들리게 만듭니다. 앱이 사용자 주변 환경의 정보에 접근할 수 있는 권한을 받으면 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/playing-audio#visionOS)을 미세 조정하여 사용자화된 경험을 제공할 수 있습니다.

**눈 및 손.** 일반적으로 사람들은 [눈](https://developer.apple.com/kr/design/human-interface-guidelines/eyes)으로 가상 대상체를 바라보고, 탭과 같은 *간접적인* [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#visionOS)로 해당 항목을 활성화하여 대부분의 동작을 수행합니다. 또한 사람들은 손가락으로 항목을 터치하는 것과 같은 *직접적인* 제스처를 사용하여 가상 대상체와 상호작용할 수도 있습니다.

**인체공학.** Apple Vision Pro를 착용하는 동안 사람들은 기기의 카메라에 전적으로 의존하여 현실 및 가상 세계의 모든 것을 바라보기 때문에 시각적으로 편안함을 유지하는 것이 가장 중요합니다. 시스템에서는 사용자의 신장 또는 앉아 있는지, 일어서 있는지 또는 누워 있는지 여부와 상관없이 착용자의 머리 위치에 맞춰 콘텐츠를 자동으로 배치하여 편안함을 유지하도록 돕습니다. visionOS는 사람들이 콘텐츠를 사용하기 위해 이동하도록 만드는 것이 아니라 콘텐츠를 사람들 앞으로 가져오므로 사람들은 자리에 머물면서 앱과 게임에 몰두할 수 있습니다.

**손쉬운 사용.** Apple Vision Pro는 사람들이 자신에게 적합한 상호작용을 사용할 수 있도록 VoiceOver, 스위치 제어, 잠시 멈춤 제어, 사용법 유도, 헤드 포인터를 비롯한 수많은 [손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility) 기술을 지원합니다. 모든 플랫폼과 마찬가지로 visionOS에서는 손쉬운 사용 기능의 시스템 제공 UI 구성요소 빌드가 기본적으로 지원되며, 시스템 프레임워크를 통해 앱 또는 게임의 손쉬운 사용 기능을 향상할 수 있습니다.

> **중요:** Apple Vision Pro의 앱을 구축할 때 기기의 고유한 특성 및 공간 컴퓨팅 환경을 고려하고 사용자의 안전에 특별한 주의를 기울이십시오. 해당 특성에 대한 자세한 내용은 [Apple Vision Pro User Guide](https://support.apple.com/guide/apple-vision-pro)의 내용을 참조하십시오. 예를 들어, Apple Vision Pro는 차량 또는 중장비를 운전하는 동안 사용해서는 안 됩니다. 또한 이 기기는 발코니, 도로, 계단 또는 기타 잠재적 위험이 있는 곳 근처 등 안전하지 않은 환경에서 이동하면서 사용하도록 디자인되지 않았습니다. Apple Vision Pro는 13살 이상인 사용자만 착용하고 사용할 수 있도록 디자인되었습니다.

## 모범 사례

탁월한 visionOS 앱 및 게임은 사용하기 쉽고 친숙하며, 아름다운 콘텐츠, 확장된 기능, 흥미로운 모험으로 가득 찬 특별한 경험을 선사합니다.

**Apple Vision Pro의 특별한 기능을 활용하십시오.** 공간, 공간 음향 및 몰입감의 이점을 활용하고, 패스스루 및 눈과 손을 사용한 공간 입력을 기기와 어울리는 방식으로 통합하여 의도한 경험을 구현하십시오.

**앱의 가장 특징적인 순간을 제공하기 위한 방식을 디자인할 때 다양한 몰입감 유형을 고려하십시오.** 윈도우로 된 UI 중심적 환경 또는 완전히 몰입할 수 있는 환경으로 경험을 제공하거나 이 두 가지를 적절히 조합할 수 있습니다. 앱의 주요 순간마다 가장 적합한 최소 수준의 몰입감을 찾으십시오. 모든 순간에 완전한 몰입이 필요하지는 않습니다.

**제한되고 UI 중심적인 경험에는 윈도우를 사용하십시오.** 사람들의 일반적인 작업 수행을 돕도록 공간에 평면으로 나타나는 일반 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/windows#visionOS)를 우선적으로 사용하고 친숙한 제어기를 포함하십시오. visionOS에서 사람들은 원하는 모든 곳으로 윈도우의 위치를 변경할 수 있으며, 시스템의 [크기 조절](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout#Scale) 기능은 윈도우 콘텐츠가 가깝거나 혹은 멀어지더라도 항상 또렷하게 표시되도록 유지합니다.

**편안함을 우선시하십시오.** 사람들이 앱 또는 게임과 상호작용하는 동안 안락하고 편안한 상태를 유지할 수 있게 하려면 다음과 같은 기본 사항을 기억하십시오.

- 콘텐츠를 사용자의 [시야](https://developer.apple.com/kr/design/human-interface-guidelines/spatial-layout#Field-of-view) 내에 표시하고, 사용자의 머리 위치에 맞춰 배치하십시오. 콘텐츠와 상호작용하기 위해 머리를 돌리거나 자세를 바꿔야 하는 곳에 콘텐츠를 배치하지 마십시오.
- 지나치거나, 거슬리거나, 너무 빠르거나, 참조용 고정 프레임이 누락된 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/motion#visionOS)을 표시하지 마십시오.
- 사람들의 손이 무릎 위 또는 옆구리에 놓여 있는 동안에 앱과 상호작용할 수 있도록 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#visionOS)를 지원하십시오.
- 직접적인 제스처를 지원하는 경우에는 상호작용하는 콘텐츠가 너무 멀리 있지 않고 사람들이 긴 시간 동안 상호작용할 필요가 없도록 해야 합니다.
- 사람들이 완전한 [몰입형 경험](https://developer.apple.com/kr/design/human-interface-guidelines/immersive-experiences)을 진행하는 동안 너무 많이 움직이도록 유도하지 마십시오.

**사람들이 다른 사람과 활동을 공유하도록 지원하십시오.** [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/shareplay#visionOS)를 사용하여 공유 활동을 지원하면 사람들은 다른 참여자의 *공간 Persona*를 보고 모두가 같은 공간에 함께 있는 것처럼 느낄 수 있습니다.

## 리소스

#### 관련 콘텐츠

[Apple Design Resources](https://developer.apple.com/design/resources/#visionos-apps)

#### Developer 문서

[visionOS Pathway](https://developer.apple.com/visionos/get-started/)

[Creating your first visionOS app](https://developer.apple.com/documentation/visionos/creating-your-first-visionos-app)

#### 비디오

- [visionOS를 위한 대화식 경험 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2024/10096) — Encounter Dinosaurs의 디자이너들이 Apple Vision Pro에서 제공할 매력적인 대화형 내러티브 경험을 디자인하는 방법을 공유합니다. 이러한 유형의 경험이 기존 앱, 미디어, 게임 경험과 어떻게 다른지 알아보고, 사용자를 새로운 세계로 초대할 수 있는 멋진 내러티브를 디자인하는 방법을 알아보세요. 모든 공간 및 사이즈에 맞춰 조정되는 스토리를 제작하는 방법, 모두가 손쉽게 사용할 수 있도록 여러 수준의 상호작용을 제공하는 방법, 사용자가 경험에 완전히 몰입할 수 있도록 애니메이션, 공간 음향, 맞춤형 제스처를 활용하는 방법을 확인해 보세요.
- [멋진 visionOS 앱 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2024/10086) — 몰입감 적용, 눈 및 손 사용을 위한 디자인, 심도·크기·공간 활용을 통해 매력적인 공간 컴퓨팅 앱을 만드는 방법을 알아보세요. 멋진 visionOS 앱의 여러 예시는 물론 이러한 앱의 디자이너가 visionOS를 위한 새로운 경험을 제작하기 위해 어떤 접근 방식을 채택했는지 살펴봅니다.
- [공간 디자인의 원리](https://developer.apple.com/kr/videos/play/wwdc2023/10072) — 공간 디자인의 원리를 알아봅니다. 깊이감, 규모감, 윈도우, 몰입감을 이용해 디자인하는 방법을 배우고, 현실을 바꾸는 편안하고 인간 중심적인 경험을 만들기 위한 모범 사례를 적용하세요. 공간 디자인 원리를 이용하여 현재의 앱을 확장하거나 새로운 아이디어를 앱으로 개발해 보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 2월 2일 | Apple Vision Pro 사용 설명서 링크가 포함됨. |
| 2023년 9월 12일 | 소개 아트워크 업데이트. |
| 2023년 6월 21일 | 새로운 페이지. |
