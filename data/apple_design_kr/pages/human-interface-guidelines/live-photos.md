# Live Photo

Source: https://developer.apple.com/kr/design/human-interface-guidelines/live-photos

> Live Photo를 사용하면 사람들이 일반적인 스틸 사진에 활력을 더하는 사운드와 움직임이 풍부한 상호작용 경험으로 좋아하는 추억을 캡처할 수 있습니다.

![Live Photo 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-Live-Photos-intro@2x.png)

Live Photo를 사용할 수 있을 경우 카메라 앱은 사람들이 사진을 찍기 전과 후에 오디오와 추가 프레임을 포함하여 추가 콘텐츠를 캡처합니다. 사람들이 Live Photo를 누르면 사진이 활기를 띠는 모습을 볼 수 있습니다.

## 모범 사례

**모든 프레임에 조절 사항을 적용하십시오.** 앱에서 사람들이 Live Photo에 효과나 조절 사항을 적용할 수 있도록 허용하는 경우, 이러한 변경 사항이 전체 사진에 적용되었는지 확인하십시오. 이를 지원하지 않는 경우 사람들에게 Live Photo를 스틸 사진으로 변환하는 옵션을 제공하십시오.

**Live Photo 콘텐츠를 온전히 유지하십시오.** 사람들이 모든 앱에서 동일한 시각적 처리 및 상호작용 모델을 사용하는 일관적인 방식으로 Live Photo를 경험하는 것이 중요합니다. Live Photo를 분해하여 해당 프레임이나 오디오를 별도로 표시하지 마십시오.

**탁월한 사진 공유 경험을 구현하십시오.** 앱에서 사진 공유를 지원하는 경우 사람들이 공유를 결정하기 전에 Live Photo의 전체 콘텐츠를 미리 볼 수 있도록 하십시오. 항상 Live Photo를 일반적인 사진으로 공유할 수 있는 옵션을 제공하십시오.

**Live Photo가 다운로드되는 때와 사진을 재생할 수 있는 때를 명확하게 나타내십시오.** 다운로드 과정 중에 진행 과정 표시기를 표시하고 다운로드가 완료되면 몇 가지 표시를 제공하십시오.

**Live Photo를 지원하지 않는 환경에서는 Live Photo를 일반적인 사진으로 표시하십시오.** 지원되는 환경에서 제공된 Live Photo 경험을 복제하려고 시도하지 마십시오. 그 대신, 일반적인 스틸 사진을 표시하십시오.

**Live Photo를 스틸 사진과 쉽게 구별할 수 있도록 하십시오.** Live Photo를 식별하는 가장 좋은 방법은 움직임을 힌트로 제공하는 것입니다. 사진 앱의 전체 화면 브라우저에서 사진을 쓸어넘길 때 발생하는 것과 같은 Live Photo 모션 효과는 내장되어 있지 않으므로 사용자 설정 동작 효과를 디자인 및 구현해야 합니다.

움직임이 불가능한 경우, 텍스트 유무에 관계없이 사진 위에 시스템 제공 배지를 표시하십시오. 보는 사람이 비디오 재생 버튼으로 해석할 수 있는 재생 버튼을 절대 포함하지 마십시오.

![고산 호수의 야경 사진. 왼쪽 상단 모서리에 ‘LIVE’ 텍스트가 표시된 시스템 제공 Live Photo 배지가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/live-photo-badge-with-text@2x.png)

![고산 호수의 야경 사진. 왼쪽 상단 모서리에 텍스트가 표시되지 않은 시스템 제공 Live Photo 배지가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/live-photo-badge@2x.png)

**배지의 배치를 일관적으로 유지하십시오.** 배지를 표시하는 경우 모든 사진의 같은 위치에 배치하십시오. 일반적으로, 배지는 사진의 모서리에서 가장 잘 보입니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS 또는 tvOS에 대한 추가 고려 사항은 없습니다. watchOS에서는 지원되지 않습니다.*

### visionOS

visionOS에서 사람들은 Live Photo를 볼 수 있지만 캡처할 수는 없습니다.

## 리소스

#### Developer 문서

[PHLivePhoto](https://developer.apple.com/documentation/photos/phlivephoto) — PhotoKit

[LivePhotosKit JS](https://developer.apple.com/documentation/livephotoskitjs) — LivePhotosKit JS

#### 비디오

- [카메라 캡처의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2021/10047) — 제어 센터에서 센터 스테이지, 인물 사진 모드, 마이크 모드 등의 비디오 효과를 사용하는 방법을 알아보세요. 앱에서 비디오 효과 기능이 활성화되었을 때 이를 확인하는 방법과 앱에서 이러한 기능을 제어할 수 있도록 사용자 설정 인터페이스를 구현하는 방법을 살펴봅니다. 또한 10비트 HDR 비디오 캡처를 활성화하고 카메라 캡처 경험 향상을 위해 최소 초점 거리(Minimum-focus-distance) 보고 기능을 활용하는 방법을 알아보며, IOSurface 압축 지원과 카메라 캡처에서 최적의 성능을 제공하는 방법도 살펴봅니다. 카메라 캡처에 대해 자세히 알아보려면 WWDC21의 ‘비디오 형식으로 고화질 사진 캡처하기’ 영상을 시청해 보세요.
