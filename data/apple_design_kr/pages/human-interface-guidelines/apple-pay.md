# Apple Pay

Source: https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay

> Apple Pay는 앱 및 모든 브라우저에서 실제 상품과 서비스, 기부 및 구독 비용까지 안전하고 간편하게 결제하는 수단입니다.

![Apple Pay를 나타내는 달러 기호의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-Apple-Pay-intro@2x.png)

앱에서 Apple Pay로는 식료품, 의류, 가전제품과 같은 실제 상품을 비롯한 클럽 회원 권한, 호텔 예약, 이벤트 티켓과 같은 서비스 및 기부 품목을 판매할 수 있습니다. Apple Pay를 지원하는 앱 및 웹사이트는 Apple Pay가 사용할 수 있는 결제 옵션임을 표시하고, 탭하여 결제 시트를 불러올 수 있는 구입 절차에 Apple Pay 버튼을 포함합니다.

![결제 방법 및 총 금액을 포함한 푸드 트럭 구입에 관한 세부사항이 표시된 Apple Pay 결제 시트의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/apple-pay-sheet@2x.png)

결제하는 동안 결제 시트에는 Apple Pay에 연결된 신용 카드 또는 직불 카드, 구입액(세금 및 수수료 포함), 배송 옵션, 연락처 정보 및 기타 필수 세부사항을 표시할 수 있습니다. 필요한 내용을 조정한 다음, 기기에 안전하게 저장된 인증 정보를 사용하여 결제를 승인하고 구입을 완료합니다.

사람들은 지원되는 기기에서 Face ID, Touch ID 또는 Optic ID를 사용하여 결제하거나 Apple Watch를 두 번 탭하여 결제합니다. 브라우저에서는 근처의 iPhone 또는 Apple Watch를 사용하여 결제하거나 iPhone 또는 iPad로 코드를 스캔하여 결제할 수도 있습니다.

개발자 지침을 보려면 [Apple Pay](https://developer.apple.com/documentation/passkit/apple-pay) 및 [Apple Pay on the Web](https://developer.apple.com/documentation/applepayontheweb)의 내용을 참조하십시오. 웹에서 Apple Pay를 사용하는 방법에 대한 실습 데모는 [Apple Pay on the web interactive demo](https://applepaydemo.apple.com)의 내용을 참조하십시오.

> **참고:** [앱 내 구입](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase)을 사용하여 앱에서 프리미엄 콘텐츠 및 디지털 콘텐츠에 대한 구독과 같은 가상 상품을 판매하십시오.

## Apple Pay 제공하기

**Apple Pay를 지원하는 모든 기기 및 브라우저에서 제공하십시오.** Apple Pay를 지원하지 않는 기기에는 결제 옵션으로 Apple Pay를 표시하지 마십시오. 개발자 지침을 보려면 [PKPaymentAuthorizationController](https://developer.apple.com/documentation/passkit/pkpaymentauthorizationcontroller)(iOS, watchOS) 및 [applePayCapabilities](https://developer.apple.com/documentation/applepayontheweb/applepaysession/applepaycapabilities)(웹)의 내용을 참조하십시오.

**자격 증명이 사용 가능하면 Apple Pay를 기본 결제 옵션으로 설정하십시오.** Apple Pay API를 사용하여 지갑에 활성화된 카드가 있는지 여부를 확인하는 경우 API를 사용하는 모든 곳에서 반드시 Apple Pay를 기본 결제 옵션으로 설정하십시오(단독 옵션일 필요는 없음). Apple Pay를 다른 단계 또는 흐름으로 분리하지 마십시오. 예를 들어 Apple Pay를 다른 옵션과 함께 표시할 때 결제 옵션으로 Apple Pay가 미리 선택되어 있도록 할 수 있습니다. 개발자 지침을 보려면 [Offering Apple Pay in Your App](https://developer.apple.com/documentation/passkit/offering-apple-pay-in-your-app)(iOS, watchOS) 및 [Checking for Apple Pay availability](https://developer.apple.com/documentation/applepayontheweb/checking-for-apple-pay-availability)(웹)를 참조하십시오.

**Apple Pay 버튼은 Apple Pay 결제 프로세스를 시작하거나, 해당하는 경우 Apple Pay 설정 프로세스를 시작하는 용도로만 사용하십시오.** 구입을 위해 Apple Pay 버튼을 선택했지만 기기에 Apple Pay가 설정되어 있지 않은 경우 Apple Pay를 설정할 수 있는 기회가 제공됩니다. 다른 용도로 Apple Pay 버튼을 사용하지 마십시오.

**사용자 설정 버튼을 사용하여 Apple Pay 결제 프로세스를 시작하는 경우 사용자 설정 버튼에 ‘Apple Pay’ 또는 Apple Pay 로고가 표시되지 않도록 하십시오.** 이 경우 결제 버튼이 표시되는 동일한 페이지에 [Apple Pay 마크](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay#Apple-Pay-mark) 그래픽을 표시하거나 텍스트로 Apple Pay를 언급하여 Apple Pay를 허용한다는 점을 안내해야 합니다.

![‘지금 주문’이라는 제목의 사용자 설정 버튼 위에 Apple Pay 로고가 올바르게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/custom-button-yes@2x.png)

![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![‘Apple Pay’라는 제목의 사용자 설정 버튼 위에 Apple Pay 로고가 올바르지 않게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/custom-button-no@2x.png)

![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**Apple Pay 마크 그래픽은 Apple Pay를 허용된다는 점을 안내하는 용도로만 사용하십시오.** Apple Pay 마크로는 결제를 진행할 수 없습니다. 절대로 결제 버튼으로 사용하거나 버튼으로 배치하지 마십시오. 선택한 결제 수단이 Apple Pay임을 나타내기 위해 Apple Pay 마크를 사용하는 경우 앱 또는 웹사이트 디자인과 일치하는 별도의 사용자 설정 버튼을 만들어 Apple Pay 결제를 시작할 수 있습니다.

**Apple Pay 버튼을 가리거나 사용할 수 없는 버튼처럼 보이게 하지 마십시오.** 제품 크기나 색상이 선택되지 않은 경우처럼 아직 Apple Pay 버튼을 사용할 수 없는 상태에서 버튼을 탭하거나 클릭했다면 문제를 정중하게 지적하십시오.

**웹사이트에서 Apple Pay를 허용한다는 점을 검색 엔진에 알리십시오.** 웹사이트에서 시맨틱 마크업을 사용하여 검색 엔진에 제품 세부사항을 제공하는 경우 Apple Pay를 결제 옵션 목록에 추가하십시오.

> **중요:** Apple Pay를 제공하는 모든 웹사이트는 개인정보 보호 약관을 게시해야 하며 [Acceptable use guidelines for Apple Pay on the web](https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/)을 준수해야 합니다.

## 결제 간소화하기

**일관성 있는 결제 환경을 제공하십시오.** 전체 결제 흐름이 앱 또는 웹사이트와 긴밀하게 통합되어 있다고 느껴지는 것이 가장 좋습니다. 결제 환경 전반에 걸쳐 브랜딩을 사용하고 다른 페이지나 윈도우를 열지 마십시오. 특히 웹사이트 결제 흐름의 경우 프로세스 중에 새로운 윈도우를 열면 혼란이 생길 수 있으며 다른 웹사이트로 전환되었다고 생각할 수도 있습니다.

**Apple Pay를 지원하는 경우 사람들이 Apple Pay를 사용하고 싶어한다고 가정하십시오.** Apple Pay 버튼을 첫 번째 결제 옵션으로 제공하거나, 다른 옵션보다 크게 표시하거나, 선을 이용하여 다른 선택 옵션과 시각적으로 구분해 보십시오.

**제품 세부사항 페이지의 Apple Pay 버튼을 사용하여 단일 품목을 더 빠르게 구입할 수 있도록 하십시오.** 장바구니 외에도 제품 세부사항 페이지에 Apple Pay 버튼을 제공하여 개별 품목을 신속하게 구입할 수 있도록 해보십시오. 이러한 방법으로 시작된 구입 프로세스는 장바구니에 이미 있는 품목을 제외한 개별 품목에 대해서만 진행할 수 있습니다. 구입한 품목이 장바구니에 있는 경우 구입을 완료했을 때 장바구니에서 해당 상품을 제거하십시오.

**바로 결제를 통해 여러 품목을 더 빠르게 구입할 수 있도록 하십시오.** 바로 결제 기능은 즉시 결제 시트를 표시하고, 단일 배송 방법 및 목적지를 사용하여 장바구니에 있는 모든 항목을 빠르게 구매할 수 있도록 합니다.

**결제 시트 내부에서 쿠폰 및 프로모션 코드 입력을 지원하십시오.** 할인 쿠폰 또는 프로모션 코드를 제공하는 경우, 사람들이 별도의 단계를 진행할 필요 없이 결제 시트에 코드를 직접 입력할 수 있게 하십시오. 이는 일반적인 결제 단계를 완전히 건너뛰는 바로 결제 흐름에서 결제 이탈을 막는 매우 결정적인 UX 요소입니다.

**사람들이 Apple Pay 버튼을 누르기 전에 색상, 크기 옵션과 같은 필수 정보를 수집하십시오.** 옵션 선택을 잊어버린 이유 등으로 결제 시 정보가 누락된 경우 문제를 정중하게 지적하고 해결할 수 있도록 지원하십시오. 하이라이트 또는 경고 텍스트를 사용하여 누락된 정보를 구별하고 문제가 있는 필드로 자동으로 이동하여 신속하게 정보를 수정하고 구입을 완료하도록 지원합니다.

**결제를 시작하기 전에 선택적 정보를 수집하십시오.** 결제 시트에는 선물 메시지 또는 배송 메모와 같은 선택적 데이터를 입력할 수 있는 방법이 없으므로 이 정보를 미리 수집해야 하며 구입을 완료한 후에도 수집할 수 있어야 합니다.

**결제 시트를 표시하기 전에 여러 배송 방법과 목적지를 수집하십시오.** 결제 시트를 사용하여 전체 주문에 대해 단일 배송 방법과 목적지를 선택할 수 있습니다. 주문에서 개별 품목에 대해 각기 다른 배송 방법과 목적지를 선택할 수 있는 경우 결제 시트를 표시하지 말고 Apple Pay 결제를 시작하기 전에 해당 세부사항을 수집하십시오.

**매장 내 픽업의 경우 결제 시트를 표시하기 전에 픽업 위치를 먼저 선택하도록 안내하십시오.** 사람들이 픽업 위치를 선택하면 결제 시트에 해당 위치의 주소를 표시하십시오. 개발자 지침을 보려면 [Displaying a Read-Only Pickup Address](https://developer.apple.com/documentation/passkit/displaying-a-read-only-pickup-address)의 내용을 참조하십시오.

**Apple Pay의 결제 정보를 우선시하십시오.** Apple Pay 정보가 충실하고 최신 상태라고 가정하십시오. 앱 또는 웹사이트에 기존 연락처, 배송, 결제 정보가 있더라도 나중에 수정할 일이 없도록 결제 시 Apple Pay에서 최신 정보를 가져오는 것이 좋습니다.

**구입하기 전에 계정을 생성하도록 요구하지 마십시오.** 계정 등록을 요청하려면 주문 확인 페이지에서 제안하십시오. 결제 시 결제 시트에 제공된 정보를 사용하여 최대한 많은 필드를 미리 채워놓으십시오.

![iPhone의 Apple Pay 주문 확인 화면을 나타내는 일러스트. 화면에는 계정 생성 버튼, Apple Pay로 등록 버튼, 기존 계정 로그인 필드가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/payment-sheet-before-account@2x.png)

**결제 시트에서 거래 결과를 리포트하십시오.** 잘못된 주소와 같은 이유로 결제에 실패할 경우, 사람들이 문제를 해결하기 위한 조치를 취할 수 있도록 오류 메시지를 제공하십시오.

**주문 확인 또는 감사 페이지를 표시하십시오.** 결제 시트에 거래 결과가 표시된 후 주문 확인 페이지를 표시하여 구입에 대한 감사를 표시하고, 주문 배송 시기에 대한 세부사항을 제공하며, 상태를 확인하는 방법을 안내합니다. 확인 페이지에 Apple Pay를 기재할 필요는 없지만 기재하는 경우 거래 처리에 사용된 계좌의 마지막 4자리 다음에 표시하거나 별도 메모로 기재하십시오. 예를 들어 ‘1234(Apple Pay)’ 또는 ‘Apple Pay로 결제’와 같이 표시합니다.

### 결제 시트 사용자화하기

**반드시 필요한 정보만 표시하고 요청하십시오.** 결제 시트에 관련 없는 정보가 있으면 사람들은 혼란스러워하거나 개인정보에 대해 걱정할 수 있습니다. 예를 들어 전자식으로 배송되는 기프트 카드를 구입한 경우, 연락처 이메일 주소만 표시하고 배송 주소는 표시하지 않는 것이 좋습니다. 이 시나리오에서 배송 주소를 표시하거나 요청하면 실제로 품목이 배송된다는 오해를 불러일으킬 수 있습니다.

**혜택 쿠폰 또는 프로모션 코드를 표시하거나 해당 정보를 입력할 수 있도록 하십시오.** 사람들이 결제 시트가 표시되기 전에 코드를 입력할 수 있는 경우, 입력 필드를 시트에 표시해 코드가 적용된다는 확신을 주십시오. 특히 익스프레스 결제 과정에서 결제 시트에 코드 입력을 허용하는 것을 고려하십시오.

**결제 시트에서 배송 방법을 선택하도록 하십시오.** 공간이 확보된다면 사용 가능한 각 옵션에 대해 명확한 설명과 비용을 표시하고 선택적으로 예상 배송/픽업 날짜 또는 날짜 범위를 표시합니다. 배송 방법의 달력 및 시간대 지원을 활용하여 사람들의 현재 위치에 관계없이 정확한 배송 또는 픽업 정보를 제공할 수 있습니다. 개발자 지침을 보려면 [PKDateComponentsRange](https://developer.apple.com/documentation/passkit/pkdatecomponentsrange)의 내용을 참조하십시오.

**매장 내 픽업의 경우 각자에게 맞는 픽업 기간을 선택하도록 하십시오.** 배송 방법을 사용하여 선택할 수 있는 날짜와 시간 범위를 제공할 수 있습니다.

**라인 품목을 사용하여 추가 요금, 할인, 보류 비용, 추가 기부금, 정기 결제, 후결제를 설명하십시오.** 라인 품목에는 레이블과 비용이 포함되며 정기 결제에는 주기도 포함될 수 있습니다. 라인 품목을 사용하여 구입을 진행하는 제품의 품목별 목록을 표시하지 마십시오. 개발자 지침을 보려면 [paymentSummaryItems](https://developer.apple.com/documentation/passkit/pkpaymentrequest/paymentsummaryitems)의 내용을 참조하십시오. 기부에 관한 지침을 보려면 [기부 지원하기](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay#Supporting-donations)의 내용을 참조하십시오.

**iOS**

![선물 포장에 대한 추가 비용과 쿠폰에 적용되는 크레딧이 기재된 앱 내 구입 결제 시트의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/payment-sheet-ios@2x.png)

**웹**

![선물 포장에 대한 추가 비용과 쿠폰에 적용되는 크레딧이 기재된 웹페이지 구입 결제 시트의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/payment-sheet-web@2x.png)

**라인 품목은 짧게 유지하십시오.** 라인 품목을 구체적이면서도 한눈에 이해하기 쉽도록 만드십시오. 라인 품목은 가급적 한 줄에 맞추십시오.

**합계와 동일한 줄에서 상호명 다음에 *결제* 단어를 씁니다.** 은행이나 신용 카드 명세서에서 청구 내역을 찾을 때 보게 되는 상호명과 동일한 상호명을 사용하십시오. 이렇게 해야 올바른 업체로 결제된다는 확신을 줄 수 있습니다. 예를 들어 [*상호_명*] 결제와 같이 제공합니다.

**최종 가맹점이 아닌 경우, 결제 시트에 두 사업체를 모두 명시하십시오.** 앱, App Clip 또는 웹사이트가 타사 판매자로부터 구매하는 마켓플레이스와 같이 중개자 역할을 하는 경우, 사람들은 두 사업체가 관련되어 있다는 것을 모를 수 있습니다. *[최종*가맹점*사업체명(귀사*상호*명 경유)]에 결제*와 같이 ‘결제’ 행에 관계를 명확하게 설명하십시오.

**결제 승인 후 추가 비용이 발생할 수 있는 경우를 명확히 밝히십시오.** 경우에 따라 결제 시 총 비용을 알지 못할 수도 있습니다. 예를 들어 거리나 시간을 기준으로 책정되는 요금은 결제 후에 변경될 수 있습니다. 또는 제품을 배송받은 후에 팁을 추가해야 할 수도 있습니다. 이러한 경우 현지 규정에 따라 허용된다면 결제 시트에 명확한 설명을 제공하고 ‘보류 중인 금액’으로 표시된 소계를 안내할 수 있습니다. 특정 금액을 사전 승인하는 경우 결제 시트에 이 정보가 정확하게 반영되어 있는지 확인하십시오.

**데이터 입력 및 결제 오류는 정중하게 처리하십시오.** 결제 중에 오류가 발생하면 사람들이 신속하게 문제를 해결하고 거래를 완료할 수 있도록 지원하십시오. 관련된 지침을 보려면 [데이터 유효성 확인 오류](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay#Data-validation-errors)의 내용을 참조하십시오.

**결제 시 진행 상태 정보는 결제 시트에 맡기십시오.** 결제 시트에는 이미 로드 상태 및 진행 상태가 명확하게 표시됩니다. 추가 스피너 또는 진행 상태 표시기를 나타내면 사람들이 거래 상태에 혼란을 느낄 수 있습니다.

## 웹사이트 아이콘 표시하기

다수의 웹사이트에서는 북마크, URL 필드, 기기의 홈 화면에 표시되는 아이콘을 제공합니다. Apple Pay를 지원하는 웹사이트는 이 아이콘을 결제 승인(특히 연결된 기기에서 결제를 승인하는 Handoff) 중에 사용하여 올바른 업체로 결제가 진행되고 있다는 시각적 확신을 제공할 수 있습니다. 구독 결제 흐름에서 이 아이콘은 지갑 앱에도 나타날 수 있습니다.

웹사이트에서 Apple Pay를 지원하는 경우 다음 크기의 아이콘을 제공하십시오.

| @2x | @3x |
| --- | --- |
| 60x60pt(120x120px @2x) | 60x60pt(180x180px @3x) |

![iPhone용 Apple Pay 결제 시트의 스크린샷. 결제 세부사항 위에 웹사이트 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/web-icon-payment@2x.png)

## 문제 처리하기

결제 또는 결제 처리 중에 문제가 발생한 경우 명확하고 실행 가능한 지침을 제공하여 사람들이 신속하게 문제를 해결하고 거래를 완료할 수 있도록 하십시오.

### 데이터 유효성 확인 오류

앱이나 웹사이트는 결제 시트가 나타날 때, 결제 시트의 특정 값을 변경할 때, 거래를 인증한 후에 사용자 입력에 응답할 수 있습니다. 이러한 기회를 활용하여 데이터 입력 문제를 확인하고 명확하고 일관된 메시지를 제공하십시오.

**iOS**

![배송 주소에 오류가 표시된 iPhone용 앱 내 Apple Pay 결제 시트의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/pay-sheet-error-ios@2x.png)

**웹**

![배송 주소에 오류가 표시된 웹페이지 Apple Pay 결제 시트의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/pay-sheet-error-web@2x.png)

![배송 주소에 오류가 표시된 웹페이지 Apple Pay 결제 시트의 스크린샷. 결제 시트 위에 나타난 오버레이에는 우편번호가 선택된 주소의 국가와 일치하지 않음이 표시됨. 다른 배송 주소를 선택하거나 배송 주소를 편집할 수 있는 옵션이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/detail-view-error-web@2x.png)

데이터가 유효하지 않은 경우 시스템에서 제공하는 오류 메시지가 결제 시트의 관련 필드를 강조 표시합니다. 그러면 사람들은 필드를 선택하여 추가 세부사항을 보고 문제를 해결할 수 있습니다. 사람들이 문제가 있는 필드를 선택할 때 나타나는 세부사항 보기에 대해 사용자화된 오류 메시지를 제공하십시오.

개발자 지침을 보려면 [PKPaymentAuthorizationViewControllerDelegate](https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontrollerdelegate)(iOS, watchOS) 및 [Apple Pay on the Web](https://developer.apple.com/documentation/applepayontheweb)(웹)의 내용을 참조하십시오.

> **참고:** 개인정보 보호를 위해 사람들이 거래 승인을 시도할 때까지 앱이나 웹사이트는 데이터에 대한 접근이 제한됩니다. 승인 전에는 카드 유형과 수정된 배송 주소에만 접근할 수 있습니다. 승인에 실패할 경우 오류를 표시하는 것도 중요하지만 최대한 승인 전에 제공된 정보를 확인하고 문제를 보고해야 합니다.

**비즈니스 논리를 준수하도록 강요하지 마십시오.** 가능한 경우 관련 없는 데이터를 무시하고 누락된 데이터를 추론할 수 있을 만큼 지능적인 데이터 유효성 확인 프로세스를 디자인하십시오. 예를 들어 앱에서 5자리 우편번호를 요구했지만 4자리 상세 우편번호까지 추가로 입력했다면 수정을 요청하지 말고 추가된 4자리를 무시하십시오. 대시, 국가 코드 등을 포함하든 포함하지 않든 아무런 오류 없이 다양한 포맷으로 전화번호를 입력할 수 있어야 합니다.

**시스템에 문제를 정확하게 리포트하십시오.** 문제가 발생하면 시스템에서 결제 시트에 가장 관련이 높은 오류 메시지를 표시할 수 있도록 사용자 설정 오류 메시지와 정확한 상태 코드를 제공하십시오. 개발자 지침을 보려면 [PKPaymentError](https://developer.apple.com/documentation/passkit/pkpaymenterror)(iOS, watchOS) 및 [Apple Pay Status Codes](https://developer.apple.com/documentation/applepayontheweb/apple-pay-status-codes)(웹)의 내용을 참조하십시오.

**데이터가 유효하지 않거나 포맷이 잘못된 경우 문제를 명확하면서도 간결하게 설명하십시오.** 관련 필드를 언급하고 예상되는 문제를 정확하게 안내하십시오. 예를 들어 올바르지 않은 우편번호를 입력한 경우 ‘주소가 유효하지 않음’으로만 표시하지 말고 ‘우편번호가 도시와 일치하지 않음’과 같이 구체적으로 메시지를 표시합니다. 배송 주소가 서비스를 제공할 수 없는 지역인 경우, ‘배송이 불가능한 지역임’과 같이 메시지에 이유를 기재합니다. 문장식 대문자 표기법을 사용하고 마침표가 없는 명사구를 사용하십시오. 메시지가 잘리지 않도록 128자 이하로만 작성하십시오.

### 결제 처리 문제

**중단을 올바르게 관리하십시오.** 취소와 같은 또는 시간 초과와 같은 이벤트로 인해 결제 흐름이 중단되어 결제 시트가 사라질 수 있습니다. 이러한 상황이 발생하면 진행 중인 결제를 모두 취소해야 합니다. 결제 시트가 사라져도 Apple Pay 버튼을 다시 선택하여 프로세스를 다시 시작할 수 있습니다. 개발자 지침을 보려면 [PKPaymentAuthorizationViewControllerDelegate](https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontrollerdelegate)(iOS, watchOS) 및 [oncancel](https://developer.apple.com/documentation/applepayontheweb/applepaysession/oncancel)(웹)의 내용을 참조하십시오.

## 구독 지원하기

앱 또는 웹사이트에서 Apple Pay를 사용하여 정기 결제 승인을 요청할 수 있습니다. 정기 결제는 월간 영화 티켓 구독료와 같은 고정 금액일 수도 있고 현지 규정이 허용할 경우 주간 식료품 주문액과 같은 가변 금액일 수도 있습니다. 최초 승인에는 할인 및 추가 수수료가 적용될 수도 있습니다.

**iOS**

![월간 요금이 표시된 고정 금액 구독에 대한 앱 내 Apple Pay 결제 시트의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/fixed-subscription-ios@2x.png)

![‘보류 중인 금액’이라는 텍스트가 표시된 가변 금액 구독에 대한 앱 내 Apple Pay 결제 시트의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/variable-subscription-ios@2x.png)

**웹**

![월간 요금이 표시된 고정 금액 구독에 대한 웹페이지 Apple Pay 결제 시트의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/fixed-subscription-web@2x.png)

**결제 시트를 표시하기 전에 구독 세부사항을 명확히 안내하십시오.** 정기 결제 승인을 요청하기 전에 청구 주기와 기타 서비스 약관을 완전히 숙지했는지 확인하십시오. 청구 주기는 결제 시트에서 표시할 수 있습니다.

**청구 주기, 할인 및 추가 선불 수수료를 다시 안내하는 라인 품목을 포함하십시오.** 이러한 라인 품목을 활용하여 사람들에게 승인 내용을 상기시키십시오. 승인 시 결제가 필요하지 않은 경우 청구 시기를 명확하게 안내하십시오.

**iOS**

![3개월간의 무료 체험 이후부터 결제가 시작되는 고정 금액 구독에 대한 앱 내 Apple Pay 결제 시트의 스크린샷. 합계 금액에 0달러가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/no-payment-required-ios@2x.png)

**웹**

![3개월간의 무료 체험 이후부터 결제가 시작되는 고정 금액 구독에 대한 웹페이지 Apple Pay 결제 시트의 스크린샷. 합계 금액에 0달러가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/no-payment-required-web@2x.png)

**체험 기간 이용 약관을 명확하게 전달하십시오.** 체험 기간이 있는 구독의 경우, 체험 금액(무료인 경우 $0 포함), 체험 기간 이후의 정기 금액, 정기 청구 시작 날짜를 표시하기 위해 항목 목록을 사용하십시오.

**합계 줄에는 현재 결제 금액을 명시하십시오.** 승인 시 청구되는 금액을 사람들에게 안내하십시오.

**구독 변경으로 추가 비용이 발생하는 경우에만 결제 시트를 표시하십시오.** 구독을 변경할 때 비용이 줄어들거나 동일하게 유지되면 승인이 필요하지 않습니다.

> **중요:** 청구 계약 필드를 공식 용어의 대체제가 아니라 일반 언어 요약으로 취급하십시오. 이 필드를 사용하는 경우 간결하게 작성하고 앱, 웹사이트 또는 행 항목 등 다른 곳에 표시된 정보를 중복 기재하지 마십시오. 확실하지 않은 경우 깔끔하고 단순한 결제 시트를 유지하기 위해 이 필드를 비워 둡니다.

## 기부 지원하기

[Approved nonprofits](https://developer.apple.com/support/apple-pay-nonprofits/)는 Apple Pay를 사용하여 기부를 받을 수 있습니다.

**라인 항목을 사용하여 기부금을 식별하십시오.** 결제 시트에 기부를 승인했음을 안내하는 라인 항목을 표시하십시오. 예를 들어 *기부금 $50.00*를 표시합니다.

**미리 정의된 기부 금액을 제공하여 결제를 간소화하십시오.** $25, $50, $100와 같이 권장 기부 금액을 제공하여 기부 프로세스 단계를 단축할 수 있습니다. ‘기타 금액’ 옵션도 포함하여 원하는 사람들은 기부금을 직접 입력할 수 있도록 하십시오.

## Apple Pay 버튼 사용하기

Apple Pay 버튼은 다양한 맥락 및 구입 절차에 맞게 여러 유형과 스타일로 제공됩니다. Apple에서 제공하는 API를 사용하여 생성하십시오. 이렇게 하면 다음을 사용할 수 있습니다.

- Apple에서 승인한 캡션, 서체, 색상 및 스타일을 사용하는 버튼
- 모든 크기에서 비율을 유지하며 크기 조절되는 콘텐츠
- 기기의 언어로 자동 현지화
- 인터페이스에 맞는 모서리 반경 사용자화
- 자동 대체 텍스트가 포함된 내장 VoiceOver 지원

**Apple Pay 버튼을 표시하려면 항상 Apple에서 제공하는 API를 사용하십시오.** 버튼 그래픽과 달리 API에서 생성한 버튼은 항상 올바른 모양을 가지며 자동으로 현지화됩니다. 사용자 설정 Apple Pay 버튼 디자인을 생성하거나 Apple에서 제공하는 디자인을 복제하지 마십시오. 개발자 지침을 보려면 [PKPaymentButtonType](https://developer.apple.com/documentation/passkit/pkpaymentbuttontype) 및 [PKPaymentButtonStyle](https://developer.apple.com/documentation/passkit/pkpaymentbuttonstyle)(iOS 및 macOS), [WKInterfacePaymentButton](https://developer.apple.com/documentation/watchkit/wkinterfacepaymentbutton)(watchOS) 및 [Apple Pay on the Web](https://developer.apple.com/documentation/applepayontheweb)(웹)의 내용을 참조하십시오.

> **팁:** 결제 옵션을 강조하는 곳이면 어디든 Apple Pay 사용 가능 여부를 전달하기 위해 [Apple Pay 마크](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay#Apple-Pay-mark) 그래픽을 사용하십시오.

### 버튼 유형

구입 또는 결제 환경의 용어와 흐름에 가장 적합한 버튼 유형을 선택하십시오.

#### Apple Pay 버튼

아래의 버튼을 사용하여 결제를 시작하십시오. 일부 상황에서는 시스템이 결제 버튼에 기본 카드의 이미지를 자동으로 표시하여 Apple Pay가 설정되었고 사용할 수 있음을 알립니다.

![기본 결제 카드의 이미지가 표시된 Apple Pay 버튼.](https://developer.apple.com/images/com.apple.HIG/kr/apple-pay-card-on-button@2x.png)

| 결제 버튼 유형 | 사용 예시 |
| --- | --- |
| ![Apple Pay로 구입 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-buy-with@2x.png) | 제품 세부사항 페이지 또는 장바구니 페이지와 같이 구입을 진행할 수 있는 앱 또는 웹사이트 영역 |
| ![Apple Pay로 결제 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-pay-with@2x.png) | 케이블이나 전기료와 같은 공과금 또는 배관 청소나 자동차 수리와 같은 서비스에 대한 청구서 또는 송장 금액을 결제할 수 있는 앱 또는 웹사이트 |
| ![Apple Pay로 결제 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-check-out-with@2x.png) | *결제*라는 텍스트가 있는 기타 결제 버튼이 포함된 장바구니 또는 구매 경험을 제공하는 앱 또는 웹사이트. |
| ![Apple Pay로 진행 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-continue-with@2x.png) | *진행*이라는 텍스트가 있는 기타 결제 버튼이 포함된 장바구니 또는 구매 경험을 제공하는 앱 또는 웹사이트. |
| ![Apple Pay로 예약 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-book-with@2x.png) | 항공편, 여행 또는 기타 경험을 예약할 수 있는 앱 또는 웹사이트 |
| ![Apple Pay로 기부 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-donate-with@2x.png) | 기부할 수 있도록 [Approved nonprofits](https://developer.apple.com/support/apple-pay-nonprofits/)의 앱 또는 웹사이트 |
| ![Apple Pay로 구독 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-subscribe-with@2x.png) | 헬스 클럽 멤버십 또는 밀키트 배송 서비스와 같은 구독을 구입할 수 있는 앱 또는 웹사이트 |
| ![Apple Pay로 충전 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-reload-with@2x.png) | 대중교통이나 선불 전화 요금제와 같은 서비스에 연결된 카드, 계좌 또는 결제 시스템에 돈을 충전할 수 있는 *충전*이라는 용어를 사용하는 앱 또는 웹사이트. |
| ![Apple Pay로 충전 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-add-money-with@2x.png) | 대중교통이나 선불 전화 요금제와 같은 서비스에 연결된 카드, 계좌 또는 결제 시스템에 돈을 추가할 수 있는 *충전*이라는 용어를 사용하는 앱 또는 웹사이트. |
| ![Apple Pay로 충전 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-top-up-with@2x.png) | 대중교통이나 선불 전화 요금제와 같은 서비스에 연결된 카드, 계좌 또는 결제 시스템에 돈을 충전할 수 있는 *충전*이라는 용어를 사용하는 앱 또는 웹사이트. |
| ![Apple Pay로 주문 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-order-with@2x.png) | 식사나 꽃과 같은 품목을 주문할 수 있는 앱 또는 웹사이트 |
| ![Apple Pay로 대여 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-rent-with@2x.png) | 자동차나 스쿠터와 같은 품목을 대여할 수 있는 앱 또는 웹사이트 |
| ![Apple Pay로 지원 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-support-with@2x.png) | 프로젝트, 단체, 조직 및 기타 기관에 돈을 기부할 수 있는 *지원*이라는 용어를 사용하는 앱 또는 웹사이트. |
| ![Apple Pay로 참여 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-contribute-with@2x.png) | 프로젝트, 단체, 조직 및 기타 기관에 돈을 기부할 수 있는 *참여*라는 용어를 사용하는 앱 또는 웹사이트. |
| ![Apple Pay로 팁 지불 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-tip-with@2x.png) | 상품이나 서비스에 대한 팁을 지불할 수 있는 앱 또는 웹사이트 |
| ![Apple Pay 버튼](https://developer.apple.com/images/com.apple.HIG/kr/ap-button@2x.png) | 스타일 상의 이유로 최소 너비가 더 작아야 하거나 CTA(Call to Action)를 쓰지 않는 버튼을 사용하려는 앱 또는 웹사이트. 선택한 결제 버튼 유형을 앱이나 웹사이트가 실행되는 운영 체제 버전에서 지원하지 않는 경우, 시스템에서 해당 버튼을 이 버튼으로 대체할 수 있음. |

#### Apple Pay 설정 버튼

기기에서 Apple Pay를 지원하지만 아직 설정되지 않은 경우, ‘Apple Pay 설정’ 버튼을 사용하여 Apple Pay를 허용한다는 것을 표시하고 Apple Pay를 설정할 수 있는 명시적인 기회를 제공할 수 있습니다. 설정, 사용자 프로필 또는 중간 페이지에 ‘Apple Pay 설정’ 버튼을 표시하십시오.

![Apple Pay 설정 버튼](https://developer.apple.com/images/com.apple.HIG/kr/button-set-up@2x.png)

### 버튼 스타일

*자동* 스타일을 사용하여 현재 시스템 모양에 맞춰 Apple Pay 버튼의 모양을 결정하십시오. 개발자 지침을 보려면 [PKPaymentButtonStyle.automatic](https://developer.apple.com/documentation/passkit/pkpaymentbuttonstyle/automatic)(앱) 및 [ApplePayButtonStyle](https://developer.apple.com/documentation/applepayontheweb/applepaybuttonstyle)(웹)의 내용을 참조하십시오. 버튼 모양을 직접 제어하려면 다음 옵션 중 하나를 선택하십시오.

#### 검은색

대비가 충분한 흰색 또는 밝은색 배경에 사용합니다. 검은색 또는 어두운 배경에는 사용하지 마십시오.

![밝은 배경 위에 검은색 Apple Pay 버튼이 올바르게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/apple-pay-black-yes@2x.png)

![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![어두운 배경 위에 검은색 Apple Pay 버튼이 올바르지 않게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/apple-pay-black-no@2x.png)

![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

#### 윤곽선이 있는 흰색

대비가 충분하지 않은 흰색 또는 밝은색 배경에 사용합니다. 어둡거나 채도가 높은 배경에 배치하지 마십시오.

![밝은 배경 위에 윤곽선이 있는 흰색 Apple Pay 버튼이 올바르게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/apple-pay-outline-yes@2x.png)

![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![어두운 배경 위에 윤곽선이 있는 흰색 Apple Pay 버튼이 올바르지 않게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/apple-pay-outline-no@2x.png)

![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

#### 흰색

대비가 충분한 어두운색 배경에 사용합니다.

![어두운 배경 위에 흰색 Apple Pay 버튼이 올바르게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/apple-pay-white-yes@2x.png)

![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![밝은 배경 위에 흰색 Apple Pay 버튼이 올바르지 않게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/apple-pay-white-no@2x.png)

![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

### 버튼 크기 및 위치

**Apple Pay 버튼을 눈에 띄게 표시하십시오.** Apple Pay 버튼이 다른 결제 버튼보다 작아서는 안 되며, 스크롤하지 않아도 바로 보이도록 배치하십시오.

![사용자 설정 ‘카트에 담기’ 버튼 위에 올바르게 배치된 Apple Pay 버튼을 보여주는 일러스트. 두 버튼의 크기가 같음.](https://developer.apple.com/images/com.apple.HIG/kr/ap-same-size-correct@2x.png)

![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![Apple Pay 버튼보다 큰 사용자 설정 ’카트에 담기’ 버튼 위에 작은 크기로 올바르지 않게 배치된 모습을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/ap-smaller-incorrect@2x.png)

![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**카트에 담기 버튼에 맞춰 Apple Pay 버튼을 올바르게 배치하십시오.** 나란히 배열하는 레이아웃의 경우 Apple Pay 버튼을 카트에 담기 버튼 오른쪽에 배치합니다.

![사용자 설정 ‘카트에 담기’ 버튼 오른쪽에 올바르게 배치된 Apple Pay로 결제 버튼을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/ap-right-side-correct@2x.png)

![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![사용자 설정 ‘카트에 담기’ 버튼 왼쪽에 올바르지 않게 배치된 Apple Pay로 결제 버튼을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/ap-left-side-incorrect@2x.png)

![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

스택으로 쌓는 레이아웃의 경우 Apple Pay 버튼을 카트에 담기 버튼 위에 배치합니다.

![사용자 설정 ‘카트에 담기’ 버튼 위에 올바르게 배치된 Apple Pay로 결제 버튼을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/ap-top-correct@2x.png)

![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![사용자 설정 ‘카트에 담기’ 버튼 아래에 올바르지 않게 배치된 Apple Pay로 결제 버튼을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/ap-below-incorrect@2x.png)

![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**다른 버튼 모양에 맞춰 모서리 반경을 조정하십시오.** 기본적으로 Apple Pay 버튼은 모서리가 둥근 모양입니다. 모서리 반경을 변경하여 모서리가 각진 버튼 또는 캡슐 모양 버튼으로 만들 수 있습니다. 개발자 지침을 보려면 [cornerRadius](https://developer.apple.com/documentation/passkit/pkpaymentbutton/cornerradius)의 내용을 참조하십시오.

![사용자 설정 ‘카트에 담기’ 버튼 위에 Apple Pay로 결제 버튼이 있는 일러스트. 두 버튼 모두 모서리가 직각임.](https://developer.apple.com/images/com.apple.HIG/kr/minimum-corner-radii@2x.png)

![사용자 설정 ‘카트에 담기’ 버튼 위에 Apple Pay로 결제 버튼이 있는 일러스트. 두 버튼 모두 기본 모서리 반경을 사용함.](https://developer.apple.com/images/com.apple.HIG/kr/default-corner-radii@2x.png)

![사용자 설정 ‘카트에 담기’ 버튼 위에 Apple Pay로 결제 버튼이 있는 일러스트. 두 버튼 모두 최대 모서리 반경을 사용하여 알약 모양이 됨.](https://developer.apple.com/images/com.apple.HIG/kr/maximum-corner-radii@2x.png)

**최소 버튼 크기와 버튼 주변의 여백을 유지하십시오.** 지역에 따라 버튼 제목의 길이가 달라질 수 있습니다.

> **참고:** 사용 중인 결제 버튼 유형의 번역된 제목을 지정한 크기의 버튼에 다 입력할 수 없는 경우 시스템은 자동으로 왼쪽 아래에 표시된 일반 Apple Pay 버튼으로 대체합니다. ‘Apple Pay 설정’ 버튼은 자동으로 대체되지 않습니다.

![최소 여백이 버튼 높이의 1/10, 최소 너비가 100포인트, 최소 높이가 30포인트임을 표시하는 레이블이 있는 Apple Pay 버튼의 일러스트.](https://developer.apple.com/images/com.apple.HIG/minimum-apple-pay@2x.png)

![최소 여백이 버튼 높이의 1/10, 최소 너비가 140포인트, 최소 높이가 30포인트임을 표시하는 레이블이 있는 Apple Pay로 기부 버튼의 일러스트.](https://developer.apple.com/images/com.apple.HIG/minimum-apple-pay-donate@2x.png)

다음 값을 지침으로 따르십시오.

| 버튼 | 최소 너비 | 최소 높이 | 최소 여백 |
| --- | --- | --- | --- |
| Apple Pay | 100pt(100px @1x, 200px @2x) | 30pt(30px @1x, 60px @2x) | 버튼 높이의 1/10 |
| Apple Pay로 예약 | 140pt(140px @1x, 280px @2x) | 30pt(30px @1x, 60px @2x) | 버튼 높이의 1/10 |
| Apple Pay로 구입 |  |  |  |
| Apple Pay로 결제 |  |  |  |
| Apple Pay로 기부 |  |  |  |
| Apple Pay 설정 |  |  |  |
| Apple Pay로 구독 |  |  |  |

### Apple Pay 마크

사용 가능한 다른 결제 옵션을 표시할 때 Apple Pay 마크 그래픽을 사용하여 Apple Pay가 사용할 수 있는 결제 옵션임을 표시합니다. Apple Pay 마크는 버튼이 아닙니다. Apple Pay 버튼이 필요한 경우 [버튼 유형](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay#Button-types)에 설명된 버튼 중 하나를 선택하십시오. Apple Pay를 결제 옵션으로 표시하는 것과 관련된 디자인 지침은 [Apple Pay 제공하기](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay#Offering-Apple-Pay)의 내용을 참조하십시오.

![신용 카드 로고 네 개가 한 줄에 나란히 있으며 크기와 모양이 모두 같음. 가장 왼쪽의 로고가 Apple Pay 마크임.](https://developer.apple.com/images/com.apple.HIG/apple-pay-mark-with-payment-options@2x.png)

**Apple에서 제공한 아트워크만 사용하고 높이 이외에는 변경하지 마십시오.** Apple Pay 마크의 높이를 지정할 수 있지만 지정한 높이는 결제 흐름에 있는 다른 결제 브랜드 마크와 같거나 더 커야 합니다. 아트워크의 너비, 모서리 반경 또는 영상비를 조정하지 마십시오. 상표 기호나 어떠한 다른 콘텐츠도 추가하지 마십시오. 테두리를 제거하지 마십시오. 마크에 그림자, 광택, 반사와 같은 시각적 효과를 추가하지 마십시오. Apple Pay 마크를 뒤집거나, 회전하거나, 움직이게 하지 마십시오.

**마크 주변에 1/10 높이 정도의 최소 여백을 유지하십시오.** Apple Pay 마크의 주변 테두리가 다른 그래픽이나 버튼과 겹치지 않도록 하십시오.

[Apple Pay Marketing Guidelines page](https://developer.apple.com/apple-pay/marketing/)에서 Apple Pay 마크 그래픽 및 전체 사용 지침을 다운로드하십시오.

## Apple Pay 언급하기

일반 텍스트를 사용하여 Apple Pay를 홍보하고 Apple Pay가 결제 옵션임을 나타낼 수 있습니다. 모든 Apple 제품 이름과 마찬가지로 복수형이나 소유격 등이 아닌 [Apple Trademark List](https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html)에 표시된 그대로 정확하게 Apple Pay를 사용하십시오. 또한 [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)의 내용을 준수하십시오.

**Apple 상표 목록에 표시된 대로 Apple Pay의 대소문자를 구별하여 표기하십시오.** 대문자 *A*, 대문자 *P*와 다른 모든 문자는 소문자로 이루어진 두 단어로 표기하십시오. 모든 글자를 대문자로 표시하는 지정된 타이포그래픽 인터페이스 스타일을 준수하기 위해 필요한 경우에만 Apple Pay 전체를 대문자로 표시합니다.

**텍스트 중간에 *Apple* 이름을 Apple 로고로 대체하여 표시하지 마십시오.** 미국에서는 Apple Pay를 본문에 처음 표시할 때 등록 상표 기호(®)를 사용합니다. 결제 시 Apple Pay를 선택 옵션으로 표시할 때는 등록 상표 기호를 사용해서는 안 됩니다.

|  | 텍스트 예시 |
| --- | --- |
| ![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | Apple Pay로 구입 |
| ![올바른 사용 방법](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | Apple Pay®로 구입 |
| ![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png) | ApplePay로 구입 |
| ![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png) |  Pay로 구입 |
| ![올바르지 않은 사용 방법](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png) | APPLE PAY로 구입(대문자만 사용하는 인터페이스 스타일을 준수하지 않을 때) |

**앱 또는 웹사이트에 맞게 서체와 크기를 조정하십시오.** Apple 타이포그래피를 모방하지 마십시오. 대신 앱이나 웹사이트의 다른 부분과 일관된 텍스트 속성을 사용하십시오.

***Apple Pay* 또는 기타 모든 Apple 상표는 번역하지 마십시오.** Apple 상표는 비영어권 텍스트에 표시되는 경우에도 항상 영어로 사용해야 합니다.

**결제 옵션 선택 메뉴에서 모든 결제 옵션에 텍스트 전용 설명이 있는 경우에만 Apple Pay에 대한 텍스트 전용 설명을 표시하십시오.** 다른 결제 옵션 설명에 아이콘이나 로고가 포함되어 있는 경우에는 [Apple Pay 제공하기](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay#Offering-Apple-Pay)에 설명된 대로 Apple Pay 마크 그래픽을 사용해야 합니다.

**앱에서 Apple Pay를 홍보할 때는 App Store 가이드라인을 따르십시오.** 구체적인 지침을 보려면 [App Store marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다. tvOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[Apple Pay Marketing Guidelines page](https://developer.apple.com/apple-pay/marketing/)

#### Developer 문서

[Apple Pay](https://developer.apple.com/documentation/passkit/apple-pay) — PassKit

[Apple Pay on the Web](https://developer.apple.com/documentation/applepayontheweb)

[WKInterfacePaymentButton](https://developer.apple.com/documentation/watchkit/wkinterfacepaymentbutton) — WatchKit

#### 비디오

- [Apple Pay의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2025/201) — Apple Pay의 최신 개선 사항과 새로운 API를 확인하세요. 새로운 동적 결제 버튼과 같은 Apple Pay 전자상거래 경험의 개선 사항을 알아보고 사전 승인된 결제의 향상된 지원을 활용하는 방법을 학습합니다. 지갑의 주문 추적에 도입되는 새로운 기능과 주문을 가장 돋보이게 하는 권장 사항을 알아보세요. 또한 금융 관리 앱이 활성화되지 않았을 때에도 최신 데이터를 가져오도록 지원하는 FinanceKit의 새로운 백그라운드 전달 API를 자세히 살펴봅니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2026년 6월 8일 | 최신 Apple Pay 모양 및 기능을 반영하도록 지침이 개선됨. |
| 2025년 12월 16일 | 웹 브라우저 및 Apple Vision Pro를 포함한 지원되는 플랫폼이 명시됨. |
| 2024년 6월 10일 | 웹에서 Apple Pay를 제공하는 방법에 대한 개발자 지침 링크가 업데이트됨. |
| 2023년 9월 12일 | 아트워크가 업데이트됨. |
| 2023년 5월 2일 | 지침을 한 페이지에 통합함. |
