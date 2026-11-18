# ID 검증자

Source: https://developer.apple.com/kr/design/human-interface-guidelines/id-verifier

> ID 검증자를 사용하면 외장 하드웨어가 없어도 iPhone 앱에서 직접 모바일 ID를 읽을 수 있습니다.

![ID 카드 하단 모서리에서 시작되어 점점 더 커지는 곡선으로 ID 검증자를 나타내는 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-ID-Verifier-Apps-intro@2x.png)

iOS 17부터는 ID 검증자를 앱에 통합하여 iPhone에서 ISO18013-5 호환 모바일 ID를 읽을 수 있으며 직접 ID를 확인하도록 지원할 수 있습니다. 예를 들어, 콘서트장에 있는 직원이 iPhone에서 앱을 사용하여 고객 나이를 확인할 수 있습니다.

ID 검증자를 사용하면 고객과 조직 모두 이점을 누릴 수 있습니다.

- 고객은 신분증을 제시하거나 기기를 보여주지 않아도 나이나 신원을 증명하는 데 필요한 최소한의 데이터만 제공하면 됩니다.
- Apple은 인증서 발급, 관리, 유효성 확인 프로세스의 핵심 구성요소를 제공하여 앱 개발을 단순화하고 신뢰할 수 있는 일관된 ID 확인 환경을 지원합니다.

앱의 요구에 따라 ID 검증자를 사용하여 다음 유형의 요청을 할 수 있습니다.

- **표시용 요청.** 요청자 iPhone의 시스템에서 제공하는 UI 내에 인물 사진과 함께 개인의 이름이나 나이 등의 데이터를 표시하려면 표시용 요청을 사용합니다. 이 요청을 사용하면 요청자가 개인의 신원을 시각적으로 확인할 수 있습니다. 표시용 요청을 하면 고객 데이터는 시스템이 제공하는 UI 내에만 남아 있으며 앱으로 전송되지 않습니다. 개발자 지침을 보려면 [MobileDriversLicenseDisplayRequest](https://developer.apple.com/documentation/proximityreader/mobiledriverslicensedisplayrequest)의 내용을 참조하십시오.
- **데이터 전송 요청.** 법적 확인 요구 사항이 있고 개인의 주소 또는 생년월일과 같은 정보를 저장하거나 처리해야 하는 경우에만 데이터 전송 요청을 사용합니다. 데이터 전송을 요청하려면 추가 권한을 요청해야 합니다. 자세히 알아보려면 [Get started with ID Verifier](https://developer.apple.com/wallet/id-verifier/)의 내용을 참조하십시오. 개발자 지침을 보려면 [MobileDriversLicenseDataRequest](https://developer.apple.com/documentation/proximityreader/mobiledriverslicensedatarequest) 및 [MobileDriversLicenseRawDataRequest](https://developer.apple.com/documentation/proximityreader/mobiledriverslicenserawdatarequest)의 내용을 참조하십시오.

## 모범 사례

**필요한 데이터만 요청하십시오.** 현재 확인을 완료하기 위해 필요한 데이터 외에 다른 데이터를 요청하면 이런 경험에 대한 신뢰를 잃을 수 있습니다. 예를 들어, 고객이 허용되는 최소 연령 이상인지 확인해야 하는 경우 고객의 현재 나이 또는 생년월일을 요청하는 대신 나이 임계값을 지정하는 요청을 사용하십시오. 개발자 지침을 보려면 [ageAtLeast(_:)](https://developer.apple.com/documentation/proximityreader/mobiledriverslicensedatarequest/element/ageatleast(_:))의 내용을 참조하십시오.

**Apple Business Register를 이용할 수 있는 앱인 경우, ID 검증자에 등록하여 요청할 때 현재 소속된 조직의 필수 정보가 공개되도록 하십시오.** Apple Business Register에 ID 검증자를 등록하면 시스템에 공식적인 조직명과 로고를 제공하여 ID 확인 UI 중 하나로 고객의 기기에 표시할 수 있습니다. 앱의 적격성과 등록 방법을 알아보려면 [Apple Business Register](https://register.apple.com/services/login?returnTo=/signin/tap-to-present-id-on-iphone)의 내용을 참조하십시오.

**확인 프로세스를 시작하는 버튼을 제공하십시오.** 간단히 나이를 확인하는 버튼에는 나이 확인과 같은 레이블을 사용하거나 보다 세부적인 신원 데이터를 요청할 수 있는 신원 확인을 사용합니다. NFC 또는 QR 코드와 같은 특정 통신 유형을 지정하는 기호는 사용하지 마십시오. 버튼 레이블에 절대로 Apple 로고를 사용해서는 안 됩니다.

| 버튼 유형 | 사용 예시 |
| --- | --- |
| ![나이 확인 버튼의 일러스트.](https://developer.apple.com/images/com.apple.HIG/id-verifier-button-age@2x.png) | 이벤트에 참석하거나 콘서트 홀과 같은 장소에 접근할 수 있는 나이인지 확인하는 앱입니다. |
| ![신원 확인 버튼의 일러스트.](https://developer.apple.com/images/com.apple.HIG/id-verifier-button-identity@2x.png) | 렌터카를 픽업할 때 특정 신원 정보가 이름, 생년월일 등의 기대값과 일치하는지 확인하는 앱입니다. |

**표시용 요청의 경우 앱 사용자가 수행하는 시각적 확인에 대한 피드백을 제공하도록 안내하십시오.** 예를 들어, 리더기가 고객의 인물 사진을 표시할 때 ‘일치함’ 및 ‘일치하지 않음’ 버튼을 제공하여 앱이 응답의 일부로 승인 또는 거부 값을 받도록 할 수 있습니다.

## 플랫폼 고려 사항

*iOS에 대한 추가 고려 사항은 없습니다. iPadOS, macOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[Apple Business Register](https://register.apple.com/services/login?returnTo=/signin/tap-to-present-id-on-iphone)

[IDs in Wallet](https://learn.wallet.apple/id)

[신원 확인](https://developer.apple.com/kr/design/human-interface-guidelines/wallet#Identity-verification)

#### Developer 문서

[Adopting the Verifier API in your iPhone app](https://developer.apple.com/documentation/proximityreader/adopting-the-verifier-api-in-your-iphone-app) — ProximityReader

#### 비디오

- [지갑과 Apple Pay의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2023/10114) — 지갑과 Apple Pay의 최신 업데이트를 소개합니다. 사전 승인된 결제, 자금 이체 및 Apple Pay Later 가맹점을 활용하여 앱 또는 웹에서 훌륭한 Apple Pay 경험을 구축하는 방법을 알아보세요. 이메일, 메시지, Safari 및 서드파티 앱을 활용해서 지갑에 주문 추적을 추가할 수 있고, 주문의 트랜잭션과 영수증의 세부 정보에 더 많은 정보를 추가할 수 있게 되었습니다. 그리고 iPhone에 새로 도입된 Tap to Present ID도 만나보세요. 다른 하드웨어 없이 iPhone의 지갑에서 ID를 확인할 수 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 9월 12일 | 새로운 페이지. |
