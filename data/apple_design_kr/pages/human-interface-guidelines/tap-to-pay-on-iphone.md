# Tap to Pay on iPhone

Source: https://developer.apple.com/kr/design/human-interface-guidelines/tap-to-pay-on-iphone

> Tap to Pay on iPhone을 사용하면 가맹점에서 외부 하드웨어를 연결하지 않고도 iPhone의 앱을 사용하여 비접촉식 결제를 승인할 수 있습니다.

![원 안에 오른쪽으로 확장되어 점점 더 커지는 곡선의 스케치가 Tap to Pay on iPhone을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-TapToPay-intro@2x.png)

iOS 결제 앱에서 Tap to Pay on iPhone을 지원하는 경우 가맹점에서 고객에게 일관되고 신뢰할 수 있는 결제 경험을 제공하도록 도울 수 있습니다.

> **참고:** Tap to Pay on iPhone은 기존 결제 승인 하드웨어 및 액세서리와 함께 작동합니다.

Tap to Pay on iPhone을 iOS 앱에 통합하기 전에, 지원되는 결제 서비스 제공업체(PSP)와 협업하고, Tap to Pay on iPhone 권한을 요청하고, PSP의 SDK를 사용하거나 프레임워크를 도입하여 [ProximityReader](https://developer.apple.com/documentation/proximityreader) API를 사용해야 합니다. 앱의 새로운 기능을 소개하는 마케팅 권장 사항이 포함된 개괄적인 지침은 [Tap to Pay on iPhone](https://developer.apple.com/tap-to-pay/)의 내용을 참조하십시오. 개발자 지침을 보려면 [Setting up Tap to Pay on iPhone](https://developer.apple.com/documentation/proximityreader/setting-up-the-entitlement-for-tap-to-pay-on-iphone)의 내용을 참조하십시오.

> **참고:** 탭 결과를 보여주는 등 상황에 맞는 사용자 인터페이스를 구현하는 SDK를 PSP에서 제공하는 경우, PSP에서 제공하는 문서를 참조하십시오.

## Tap to Pay on iPhone 활성화

앱에서 Tap to Pay on iPhone을 활성화하고 가맹점의 기기를 구성하기 전에, 가맹점이 관련 이용 약관에 동의해야 합니다. ProximityReader API를 사용하면 현재 상태를 확인하고 필요한 경우에만 동의 흐름을 표시할 수 있습니다. 개발자 지침을 보려면 [Adding support for Tap to Pay on iPhone to your app](https://developer.apple.com/documentation/proximityreader/adding-support-for-tap-to-pay-on-iphone-to-your-app)의 내용을 참조하십시오.

**가맹점이 고객 상호작용을 시작하기 전에 Tap to Pay on iPhone 이용 약관에 동의할 수 있도록 하십시오.** 가맹점은 초기 기기 구성을 수행하기 전에 이용 약관에 동의해야 하므로 결제나 기타 고객 응대 흐름을 시작하기 전에 이에 동의할 수 있으면 가장 효과적입니다. 예를 들어, [in-app messaging](https://developer.apple.com/tap-to-pay/marketing-guidelines/#in-your-app) 또는 온보딩 흐름에서 Tap to Pay on iPhone 이용 약관에 동의할 수 있는 버튼을 제공할 수 있습니다.

![기능을 설명하는 앱 화면 일러스트에 ‘Tap to Pay on iPhone 활성화’ 레이블의 버튼이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-introduction-screen@2x.png)

![‘테스트 거래 시도하기’라는 레이블이 있는 버튼이 포함된 앱 화면 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-confirmation-screen@2x.png)

**Tap to Pay on iPhone 이용 약관은 관리자에게만 표시하십시오.** 비관리자가 기능을 활성화하려는 경우, 관리자 접근 권한이 필요하다고 설명하는 메시지를 표시하십시오. 앱의 주요 사용자가 기업이나 비관리자인 경우, iPhone이 아닌 다른 기기에서 실행할 수 있는 웹 인터페이스나 다른 앱을 통해 관리자가 Tap to Pay on iPhone 이용 약관에 동의하도록 할 수 있습니다. 구현 세부 정보는 담당 PSP에 문의하십시오.

**필요한 경우 가맹점의 기기를 최신 상태로 업데이트하십시오.** PSP에서 특정 iOS 버전을 요구하는 경우 가맹점이 기기를 업데이트한 후에만 이용 약관을 표시해야 합니다.

## 가맹점 교육하기

일부 가맹점은 Tap to Pay on iPhone에 익숙하지 않을 수 있습니다. 따라서 빠르고 쉽게 시작할 수 있는 방법을 제공해야 합니다.

**지원되는 결제 유형을 설명하고 Tap to Pay on iPhone을 사용하여 각 유형을 승인하는 방법을 보여주는 튜토리얼을 제공하십시오.** 다음을 통해 이 튜토리얼을 제공할 수 있습니다.

- 앱 내 메시지에 자세히 알아보기 옵션 포함
- 가맹점이 Tap to Pay on iPhone 이용 약관에 동의한 후 자동으로 표시
- 신규 앱 사용자에게 자동으로 표시
- 앱의 도움말 콘텐츠 또는 설정 영역과 같은 일관된 위치에 쉽게 찾을 수 있도록 표시

[Tap to Pay on iPhone marketing guidelines](https://developer.apple.com/tap-to-pay/marketing-guidelines/)에서 Apple이 승인한 애셋을 사용하여 앱의 튜토리얼을 구축하거나 [ProximityReaderDiscovery](https://developer.apple.com/documentation/proximityreader/proximityreaderdiscovery) API를 사용하여 사전 구축된 가맹점 교육 경험을 제공할 수 있습니다. Apple은 API가 최신 상태이며 가맹점의 지역에 맞게 현지화되어 있는지 확인합니다.

![설정에 표시된 앱의 튜토리얼 화면에서 가맹점 교육 튜토리얼 경험을 열 수 있는 링크가 보이는 일러스트.](https://developer.apple.com/images/com.apple.HIG/tap-to-pay-merchant-settings-tutorials@2x.png)

![Tap to Pay on iPhone 가맹점 교육 튜토리얼 시트에 Tap to Pay 동작 및 첫 번째 결제 수락 방법에 관한 지침을 설명하는 이미지가 포함된 일러스트.](https://developer.apple.com/images/com.apple.HIG/tap-to-pay-merchant-education-contactless-cards@2x.png)

나만의 튜토리얼을 디자인하는 경우, 다음 방법을 반드시 표시하십시오.

- 각 결제 유형별로 결제 흐름 실행
- 고객이 비접촉식 카드나 디지털 지갑으로 결제하려면 가맹점 기기의 어디에 대야 하는지 안내
- 손쉬운 사용 모드 등 카드의 PIN 입력 처리

마지막으로 튜토리얼 마지막에 Tap to Pay on iPhone 이용 약관에 아직 동의하지 않은 가맹점이 동의할 수 있는 기회를 제공하십시오.

## 결제하기

결제는 빨리 처리해야 하는 작업입니다. 가맹점은 결제 프로세스를 매끄럽게 진행해야 합니다. 결제 흐름을 설계할 때 다음을 준비하십시오.

- 필요한 경우 Tap to Pay on iPhone 외의 추가 결제 옵션 제공
- 가맹점이 Tap to Pay on iPhone을 활성화하기 전에 결제를 시작한 경우 빠르게 대응
- 기기 구성이 진행 중이더라도 가맹점이 결제를 진행하도록 지원
- 결제가 완료되기 전에 최종 합계에 영향을 미치는 선결제 동작 표시

**기능 활성화 여부에 상관없이 Tap to Pay on iPhone을 결제 옵션으로 제공하십시오.** Tap to Pay on iPhone 버튼을 포함하면 가맹점이 결제 흐름에서 벗어나지 않고도 유연하게 기능을 사용할 수 있습니다. 가맹점이 버튼을 탭하면 필요한 경우 이용 약관을 표시하고 구성이 완료되면 Tap to Pay on iPhone 화면이 자동으로 나타납니다.

**가맹점이 Tap to Pay on iPhone을 사용하기 위해 기다리지 않도록 하십시오.** 기기별 초기 구성을 수행하는 것 외에도 앱이 가장 앞에 열려 있을 때마다 후속 구성을 수행해야 합니다. 앱이 시작할 때와 전면으로 전환된 후에 즉시 기능을 준비하여 잠재적인 대기 시간을 최소화할 수 있습니다. 개발자 지침을 보려면 [prepare(using:)](https://developer.apple.com/documentation/proximityreader/paymentcardreader/prepare(using:))의 내용을 참조하십시오.

**백그라운드에서 구성이 계속되는 경우에도 Tap to Pay on iPhone 결제 옵션을 사용할 수 있도록 하십시오.** 가맹점은 결제 시 항상 Tap to Pay on iPhone 결제 옵션을 선택할 수 있어야 합니다. 구성이 진행 중인 동안, 가맹점이 결제 옵션을 선택한 다음 진행 과정 표시기를 표시하도록 하며, 구성이 완료될 때까지 기다린 후에 옵션을 사용할 수 있도록 만들지 마십시오. 대부분의 상황에서 미확정 진행 과정 표시기를 표시할 수 있습니다. 다만, ProximityReader API에서 구성이 진행 중인 것으로 나타나면 확정 진행 과정 표시기를 표시합니다. 지침을 보려면 [진행 과정 표시기](https://developer.apple.com/kr/design/human-interface-guidelines/progress-indicators)의 내용을 참조하십시오. 개발자 지침을 보려면 [PaymentCardReader.Event.updateProgress(_:)](https://developer.apple.com/documentation/proximityreader/paymentcardreader/event/updateprogress(_:))의 내용을 참조하십시오.

![확정 진행 과정 표시기를 보여주는 앱 화면 일러스트. 총 구매 금액 위에 ‘Tap to Pay on iPhone 준비 중’ 텍스트가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-processing-screen-determinate-progress@2x.png)

![미확정 진행 과정 표시기를 보여주는 앱 화면 일러스트. 총 구매 금액 위에 ‘Tap to Pay on iPhone 준비 중’ 텍스트가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-processing-screen-indeterminate-progress@2x.png)

**앱이 여러 결제 승인 방법을 지원하는 경우, Tap to Pay on iPhone 버튼을 쉽게 찾을 수 있도록 하십시오.** 가맹점이 해당 기능에 접근하기 위해 스크롤하지 않도록 하십시오. 앱이 다른 결제 승인 옵션을 지원하지 않는 경우, 결제가 시작될 때 Tap to Pay on iPhone이 자동으로 열립니다.

**가맹점이 Tap to Pay on iPhone과 지원되는 하드웨어 액세서리 사이를 쉽게 전환할 수 있도록 하십시오.** Tap to Pay on iPhone 지원이 Bluetooth 칩 및 PIN 카드 리더기와 같은 하드웨어 액세서리에 대한 지원과 분리되어 있더라도, 가맹점이 동시에 두 방법을 설정하도록 하여 사용자 경험을 간소화할 수 있습니다. 설정 후에는 가맹점이 앱 설정을 방문하지 않고도 결제 흐름 중에 적절한 결제 승인 방법을 선택할 수 있도록 하십시오.

**기능을 활성화하는 버튼 레이블의 경우 ‘Tap to Pay on iPhone’을 사용하거나 공간이 제한된 경우 ‘Tap to Pay’를 사용하십시오.** Tap to Pay on iPhone이 지원되는 유일한 결제 승인 방법인 경우에만 예외가 적용됩니다. 이 경우, 기존의 ‘충전’ 또는 ‘결제하기’ 버튼을 재사용하여 Tap to Pay on iPhone을 활성화할 수 있습니다. 여러 결제 승인 방법을 지원하고 활성화 버튼에 아이콘을 사용하는 경우 Tap to Pay on iPhone 버튼에 `wave.3.right.circle` 또는 `wave.3.right.circle.fill` [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 사용하십시오. Tap to Pay on iPhone 버튼에 Apple 로고를 포함하지 마십시오.

![아이콘이 포함된 ‘Tap to Pay’ 버튼 일러스트. 버튼에는 파형 기호가 올바르게 포함되어 있고 그 뒤에 ‘Tap to Pay on iPhone’ 단어가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-on-iphone-symbol-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![아이콘이 포함된 ‘Tap to Pay’ 버튼 일러스트. 버튼에는 Apple 로고가 잘못 포함되어 있고 그 뒤에 ‘Tap to Pay on iPhone’ 단어가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-on-iphone-logo-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

> **중요:** 결제 동작에만 ‘Tap to Pay on iPhone’ 레이블을 사용하십시오. 비결제 동작에 사용할 수 있는 표현은 [추가 상호작용](https://developer.apple.com/kr/design/human-interface-guidelines/tap-to-pay-on-iphone#Additional-interactions)의 내용을 참조하십시오.

**앱의 다른 버튼과 어울리도록 Tap to Pay on iPhone 버튼을 디자인하십시오.** 앞서 설명한 ‘Tap to Pay on iPhone’ 또는 ‘Tap to Pay’ 레이블을 사용하는 경우에도 인터페이스에 가장 잘 어우러지는 버튼 색과 모양을 사용할 수 있습니다.

**가맹점이 Tap to Pay on iPhone을 시작하기 전에 고객이 지불해야 하는 최종 금액을 파악하십시오.** 예를 들어, 앱이 총액에 영향을 줄 수 있는 팁 또는 기타 고객 상호작용을 지원하는 경우, 가맹점이 Tap to Pay on iPhone 화면을 표시하기 전에 이러한 상호작용을 제공하는지 확인해야 합니다. Tap to Pay on iPhone 화면에 고객이 지불해야 하는 최종 금액을 표시하십시오.

**결제 흐름에서 선결제 옵션을 지원하는 경우 Tap to Pay on iPhone 화면 전에 이를 표시하십시오.** 예를 들어, 다른 결제 유형 선택을 지원하는 경우 가맹점이 Tap to Pay on iPhone 버튼을 탭한 후 Tap to Pay on iPhone 화면이 열리기 전에 결제 화면에 옵션을 표시할 수 있습니다.

## 결과 표시하기

고객은 *탭하여* 결제합니다. 즉, 앱의 Tap to Pay on iPhone 화면 근처에 비접촉식 카드나 디지털 지갑을 갖다 대면 결제가 이루어집니다. 탭이 성공적으로 이루어진 후 필요한 경우 PIN까지 입력하고 나면, Tap to Pay on iPhone는 체크 표시를 보여주고, 처리를 위해 PSP로 보내는 암호화된 결제 정보를 포함한 대상체를 앱에 제공합니다. 탭이 실패하면 Tap to Pay on iPhone에서 오류 화면이 표시됩니다. 탭이 성공한 후 또는 탭 실패로 인해 대체 결제 옵션을 제공한 후 앱은 거래 결과를 표시해야 합니다.

**가능한 한 빨리 거래를 처리하십시오.** 시스템에서는 API를 제공합니다. 이 API를 사용하여 Tap to Pay on iPhone 화면에 탭 완료를 나타내는 체크 표시 애니메이션이 사라지기 전에 성공적인 탭 결과를 요청할 수 있습니다. 개발자 지침을 보려면 [returnReadResultImmediately](https://developer.apple.com/documentation/proximityreader/paymentcardreader/options-swift.struct/returnreadresultimmediately)의 내용을 참조하십시오.

**거래 결과 화면을 나타내기 전에 결제가 승인되는 동안 진행 과정 표시기를 표시하십시오.** 거래가 승인 완료되려면 몇 초가 걸립니다. 소요 시간은 PSP와 가맹점 기기의 연결 상태 등 여러 요인에 따라 달라집니다. 부드러운 시각적 전환을 위해 Tap to Pay on iPhone 화면 애니메이션이 완료된 후 승인 [진행 과정 표시기](https://developer.apple.com/kr/design/human-interface-guidelines/progress-indicators)를 보여주십시오. 개발자 지침을 보려면 [PaymentCardReader.Event.readyForTap](https://developer.apple.com/documentation/proximityreader/paymentcardreader/event/readyfortap)의 내용을 참조하십시오.

![미확정 진행 과정 표시기를 보여주는 앱의 결제 화면 일러스트. 총 구매 금액 위에 ‘승인 중’ 텍스트가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-authorizing-payment@2x.png)

**거래가 거부되었든, 성공했든 상관없이 모든 결과를 명확하게 표시하십시오.** 거래는 잔액 부족, 사기 혐의, 고객의 잘못된 PIN 번호 입력 등 다양한 이유로 거절될 수 있습니다. 가능하다면 가맹점이 QR 코드나 문자 메시지를 통해 고객에게 디지털 영수증을 제공할 수 있는 방법도 안내하십시오.

![구매 금액 위로 녹색 체크 표시가 녹색 원 안에 표시된 앱 결제 화면 일러스트. 합계 아래에는 ‘영수증 옵션 선택’ 텍스트가 있고 뒤따라 버튼 3개가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-confirmed-payment@2x.png)

![구매 금액 위로 빨간색 원 안에 빨간색 X 표시가 있는 앱 결제 화면 일러스트. 합계 아래에는 ‘영수증 옵션 선택’ 텍스트가 있고 뒤따라 버튼 3개가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-unconfirmed-payment@2x.png)

**가맹점에서 Tap to Pay on iPhone으로 결제를 완료할 수 없는 경우 결제 흐름을 마칠 수 있도록 지원하십시오.** 예를 들어, 카드가 읽히지 않거나, 지원되는 결제 네트워크의 카드가 아니거나, 명시된 금액으로 거래가 허용되지 않거나, 온라인 PIN 입력이 지원되지 않아 탭이 실패할 수 있습니다. 이와 같은 경우 다음을 수행하십시오.

- 가맹점이 현금 등 대체 결제 수단을 승인할 수 있는 새로운 화면 표시 또는 결제 화면 재사용
- 외부 하드웨어 또는 결제 링크 등 다른 방법으로 결제 지원
- 고객이 다른 카드가 있고 해당 카드로 결제를 시도하려 하는 경우 Tap to Pay on iPhone 재실행

![‘결제가 완료되지 않음’ 텍스트 위에 빨간색 원 안에 빨간색 X 표시가 있고, 뒤따라 총 구매 금액이 표시되는 앱의 결제 화면 일러스트. 합계 아래에는 ‘결제 옵션 선택’ 텍스트가 있고, 뒤따라 Tap to Pay on iPhone을 비롯한 버튼 4개가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-unsuccessful-transaction@2x.png)

결제 카드 데이터를 받은 후 아래에 나열된 것과 같은 상황을 마주할 수 있습니다. 이러한 상황이 발생하면 PSP에 문의하여 해결 지침을 받으십시오.

- 일부 지역에서는 SCA(Strong Customer Authentication) 지원을 요구합니다. 탭 중에는 결제 카드 PIN이 필요하지 않을 수 있지만, 카드 발급 은행에서 거래 처리 요청을 받은 후 PIN을 요구할 수 있습니다. 이 경우 앱에서 거래 결과 대신 PIN 입력 화면을 표시해야 합니다.
- 일부 지역에서는 오프라인 PIN 시장에서처럼 앱이 일부 카드 제한을 해결하기 위해 추가 요구 사항을 충족해야 할 수도 있습니다. 일부 PSP는 가맹점이 결제 링크 등의 다른 방법으로 결제를 이어갈 수 있도록 추가 PIN 폴백 기능을 지원하여 탭 데이터를 부분적으로 수집합니다.

**시스템이 가맹점에서 처리해야 하는 오류를 반환하는 경우 문제에 대한 설명을 명확히 표시하고 적절한 해결책을 추천하십시오.** 예를 들어, 기기의 iOS 버전이 Tap to Pay on iPhone을 지원하지 않는 경우 최신 버전으로의 업데이트를 권장하는 [경고](https://developer.apple.com/kr/design/human-interface-guidelines/alerts)를 표시할 수 있습니다. 개발자 지침을 보려면 [PaymentCardReaderSession.ReadError](https://developer.apple.com/documentation/proximityreader/paymentcardreadersession/readerror)의 내용을 참조하십시오.

**가맹점이 문제를 해결할 수 없는 경우 쉽게 도움을 구할 수 있도록 하십시오.** 예를 들어, 가맹점을 앱이나 웹사이트의 도움말 콘텐츠로 안내하고 지원팀에 연락할 수 있는 조치를 알려줍니다.

## 추가 상호작용

Tap to Pay on iPhone을 사용하면 가맹점은 과거 거래를 조회하거나 향후 결제, 환불, 고객 정보 확인용으로 카드 정보를 보유하는 등의 사용 사례를 지원하기 위해 거래 금액이 없을 때도 결제 카드를 읽을 수 있습니다.

**거래 금액이 없을 때 결제 카드를 읽으려면 Tap to Pay on iPhone 화면을 여는 버튼에 일반 레이블을 사용하십시오.** ‘Tap to Pay on iPhone’ 또는 ‘Tap to Pay’를 이러한 레이블에 포함하지 마십시오. 대신, ‘조회’, ‘카드 저장’, ‘확인’, ‘환불’ 등의 일반 레이블을 사용하십시오.

고객이 고객 카드, 할인 카드 및 포인트 카드 등 다른 유형의 NFC 호환 카드나 패스를 Apple 지갑에 가지고 있는 경우, Tap to Pay on iPhone을 사용하면 가맹점이 결제 카드를 읽는 동시에 또는 독립적으로 이러한 항목을 읽을 수 있습니다.

**앱에서 독립적인 고객 카드 거래를 지원하는 경우, 이 흐름을 Tap to Pay on iPhone을 사용하는 결제 승인 흐름과 구별하십시오.** 가맹점에 고객 카드 거래를 시작할 수 있는 별도의 명확한 레이블의 버튼을 제공하는 것이 좋습니다. 가맹점이 실수로 잘못된 버튼을 선택하지 않도록 고객 카드 거래 버튼 레이블에는 ‘Tap to Pay on iPhone’, ‘Tap to Pay’ 또는 기타 결제 관련 용어를 사용하지 마십시오.

![‘고객 카드’라는 레이블의 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/loyalty-card@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![‘Tap to Pay on iPhone - 고객’이라고 레이블의 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/tap-to-pay-on-iphone-loyalty@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

## 플랫폼 고려 사항

*iOS에 대한 추가 고려 사항은 없습니다. iPadOS, macOS, tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[Tap to Pay on iPhone marketing guidelines](https://developer.apple.com/tap-to-pay/marketing-guidelines/)

#### Developer 문서

[Adding support for Tap to Pay on iPhone to your app](https://developer.apple.com/documentation/proximityreader/adding-support-for-tap-to-pay-on-iphone-to-your-app) — ProximityReader

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 1월 17일 | 가맹점 교육 지침이 업데이트됨. |
| 2024년 5월 7일 | 기능 활성화 및 가맹점 교육 지침을 포함하도록 업데이트됨. |
| 2023년 3월 3일 | 가맹점을 교육하고 경험을 향상하는 방법에 대한 지침이 향상됨. |
| 2022년 9월 14일 | Tap to Pay on iPhone을 준비하고 가맹점이 기능을 사용하는 방법을 배우도록 지원하는 것에 대한 지침이 개선됨. |
