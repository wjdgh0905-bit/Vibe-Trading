# 앱 내 구입

Source: https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase

> 앱 내 구입을 사용하여 앱 내에서 안전하게 프리미엄 콘텐츠, 디지털 상품, 구독과 같은 가상 상품에 대한 비용을 결제할 수 있습니다.

![앱 내 추가 디지털 애셋 구입을 나타내는 추가 버튼의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-IAP-intro@2x.png)

App Store를 통해 앱 내 구입을 직접 홍보하고 제공할 수도 있습니다. 개발자 지침을 보려면 [In-App Purchase](https://developer.apple.com/documentation/storekit/in-app-purchase)의 내용을 참조하십시오.

> **팁:** 앱 내 구입과 [Apple Pay](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay)는 서로 다른 기술이며 다른 활용 사례를 지원합니다. 앱 내 구입을 사용하여 앱의 프리미엄 콘텐츠, 디지털 콘텐츠 구독과 같은 가상 상품을 앱에서 판매할 수 있습니다. 앱에서 Apple Pay를 사용하여 식료품, 의류, 가전제품과 같은 실제 상품을 비롯한 클럽 회원권, 호텔 예약, 이벤트 티켓과 같은 서비스 및 기부 품목을 판매할 수 있습니다.

앱 내 구입을 사용하여 다음과 같은 네 가지 콘텐츠 유형을 제공할 수 있습니다.

- *소모성* 콘텐츠: 게임에서 사용하는 생명이나 보석과 같은 콘텐츠입니다. 소모성 콘텐츠는 구입 후 사용하는 만큼 줄어들며 다시 구입할 수 있습니다.
- *비소모성* 콘텐츠: 앱 내 프리미엄 기능과 같은 콘텐츠입니다. 구입한 비소모성 콘텐츠는 만료되지 않습니다.
- *자동 갱신 구독*: 앱의 가상 콘텐츠, 서비스, 프리미엄 기능을 지속적으로 구독합니다. 자동 갱신 구독은 취소를 선택하기 전까지 각 구독 기간이 끝날 때마다 자동으로 계속 갱신됩니다.
- *비갱신 구독*: 게임 내 배틀 패스에 대한 접근 권한과 같은 서비스 또는 콘텐츠를 제한된 시간 동안 구독합니다. 서비스 또는 콘텐츠에 대한 접근 권한을 연장하려면 비갱신 구독을 구매하면 됩니다.

![iPad용 The Coast 게임의 앱 내 구입 스토어 스크린샷. 위에는 등대 수리, Power Surge 등과 같은 부스트 5개가 있고 아래에는 World Canals, The Great Lakes, Famous Bays 등과 같은 이름이 지정된 게임 내 지도가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/iap-intro@2x.png)

마케팅과 비즈니스 지침을 보려면 [In-app purchase](https://developer.apple.com/in-app-purchase/) 및 [Auto-renewable subscriptions](https://developer.apple.com/app-store/subscriptions/)의 내용을 참조하십시오. 앱 내 구입 사용의 요구 사항 및 제한 사항을 비롯하여 판매할 수 있는 콘텐츠와 판매할 수 없는 콘텐츠에 관한 정보를 보려면 [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)의 내용을 참조하십시오.

> **참고:** 여러 크리에이터의 일회성 구매 또는 구독 콘텐츠 카탈로그가 매우 크고 자주 업데이트되는 앱, 또는 앱 내에서 구독을 일회성 구매하여 추가 콘텐츠를 선택적으로 이용할 수 있는 앱의 경우, Advanced Commerce API를 사용하면 앱 내 구입 카탈로그를 직접 관리할 수 있습니다. Advanced Commerce API [App Store support page](https://developer.apple.com/in-app-purchase/advanced-commerce-api/)에서 개요를 참조하고 개발자 지침은 [Advanced Commerce API](https://developer.apple.com/documentation/advancedcommerceapi)의 내용을 참조하십시오.

## 모범 사례

**앱을 구입하기 전에 먼저 체험할 기회를 제공하십시오.** 사람들이 앱을 사용해 보고 그 가치를 발견하고 나면 유료 항목이나 기능을 구입하고 싶다는 마음이 더 커질 수 있습니다. 자동 갱신 구독을 제공하는 경우, 콘텐츠에 대한 제한된 무료 접근을 지원해 보십시오. [자동 갱신 구독](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase#Auto-renewable-subscriptions)의 내용을 참조하십시오.

**통합된 쇼핑 환경을 디자인하십시오.** 사람들이 디지털 제품을 찾아보고 구입할 때 다른 앱에 접속했다고 느낀다면 잘못된 것입니다. 앱 스타일을 그대로 반영하여 제품을 표시하고 거래를 처리하십시오.

**제품 이름과 설명은 간단하고 간결하게 하십시오.** 제목은 잘리지 않게 한 줄에 표시하고, 간단하고 직접적인 표현을 사용하면 사람들이 제품을 빠르게 찾을 수 있습니다.

**유형에 관계없이 제공하는 각 앱 내 구입의 총 청구 가격을 표시하십시오.** 사람들은 구매하려는 모든 항목의 총 청구 금액을 알아야 합니다.

**결제할 수 있는 사람에게만 스토어를 공개하십시오.** 예를 들어, 부모의 제한으로 결제할 수 없는 사람들에게는 스토어를 숨기거나 스토어를 사용할 수 없는 이유를 설명한 UI를 표시하는 것이 좋습니다. 개발자 지침을 보려면 [canMakePayments](https://developer.apple.com/documentation/storekit/appstore/canmakepayments)의 내용을 참조하십시오.

**기본 확인 시트를 사용하십시오.** 앱 내 구입을 시작하면 실수로 구입하는 일이 발생하지 않도록 시스템에 확인 시트가 표시됩니다. 이 시트를 수정하거나 복제하지 마십시오.

### 가족 공유 지원하기

가족 공유를 사용하면 모든 Apple 기기에서 자동 갱신 구독, 비소모성 앱 내 구입과 같이 구입한 콘텐츠에 대한 접근 권한을 최대 5명의 추가 가족 구성원과 공유할 수 있습니다. 제공하는 가족 공유 지원을 사용하도록 유도하려면 다음 지침을 따르십시오.

**제공하는 콘텐츠에 대해 설명하는 영역에 가족 공유를 더욱 강조하여 언급하십시오.** 예를 들어 구독이나 항목 이름에 ‘가족’ 또는 ‘공유 가능’을 포함하고 가입 화면에서도 가족 공유를 언급하면 기능이 강조되어 사람들이 해당 정보를 바탕으로 선택할 수 있습니다.

**가족 공유의 이점과 참여 방법을 잘 이해할 수 있도록 지원하십시오.** 가족 공유를 켜면 현재 설정에 따라 변경 사항에 관한 알림을 받을 수 있습니다. 예를 들어, 기본값으로 공유 설정이 꺼져 있는 기존 구독자는 현재 구독을 가족 구성원과 공유하도록 초대하는 Apple의 알림을 받습니다. 마찬가지로 가족 구성원은 공유받는 콘텐츠에 대한 알림을 받을 수 있습니다. (받을 수 있는 알림 유형에 대해 자세히 알아보려면 [Auto-renewable subscriptions](https://developer.apple.com/app-store/subscriptions/)의 내용을 참조하십시오.)

**구매자와 가족 구성원이 모두 이해하기 쉽게 앱 내 메시지를 사용자화하십시오.** 예를 들어, 가족 구성원이 처음으로 공유 콘텐츠를 볼 때 “사용자 가족의 구독에는…”과 같은 문구로 환영 인사를 할 수 있습니다.

### 앱 내 구입 관련 지원 제공하기

때로는 사람들이 구입할 때 도움이 필요하거나 환불을 요청하고 싶을 때가 있습니다. 앱 내에 사용자 설정 UI를 표시하여 지원을 제공하고, 대체 솔루션을 제안하며, 시스템 환불 절차를 시작할 수 있도록 하면 이 상황을 편리하게 해결할 수 있습니다. 개발자 지침을 보려면 [beginRefundRequest(for:in:)](https://developer.apple.com/documentation/storekit/transaction/beginrefundrequest(for:in:)-65tph)의 내용을 참조하십시오. 자동 갱신 구독과 관련된 지침을 보려면 [구독 관리 지원하기](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase#Helping-people-manage-their-subscriptions)의 내용을 참조하십시오.

**환불을 요청하기 전에 볼 수 있는 도움말을 제공하십시오.** 시스템에서 제공하는 환불 절차의 링크를 추가할 수도 있고 구입 도움말 화면을 사용자화하여 앱에 맞게 지원할 수 있습니다. 예를 들어, 사용자 설정 화면을 통해 구입 항목이 유실된 문제를 해결할 수 있도록 지원하고, 앱 내 구입에 대해 자주 묻는 질문에 답변하고, 피드백을 제출하거나 지원을 직접 문의할 수 있는 방법을 안내할 수 있습니다.

![iPhone의 앱 도움말 화면이 일부 표시된 스크린샷. 화면 왼쪽 상단에 뒤로 버튼이 있음. ’어떻게 도와드릴까요?’라는 제목의 목록에는 5가지 도움말 항목이 있으며 각 항목을 선택하면 새 화면이 열림. 표시된 항목은 구입 항목 누락, 자주 묻는 질문, 환불 요청, 피드백 제출, 문의임.](https://developer.apple.com/images/com.apple.HIG/kr/custom-purchase-help@2x.png)

**환불 작업에는 ‘환불’ 또는 ‘환불 요청’과 같은 간단한 제목을 사용하십시오.** 시스템에서 제공하는 환불 절차를 통해 Apple에 환불을 요청한다는 사실을 명확히 할 수 있으므로 이 정보를 반복할 필요는 없습니다.

**문제가 있는 구입 항목을 찾을 수 있도록 지원하십시오.** 표시하는 각각의 최근 구입 항목에 대해 구매자가 원하는 제품을 식별하는 데 도움이 되는 관련 정보를 추가하십시오. 예를 들어, 제품 이름, 설명과 함께 제품 이미지를 표시하고 처음 구입 날짜를 표시할 수 있습니다.

![iPhone의 앱 환불 화면인 ‘환불 요청’이 일부 표시된 스크린샷. 화면 왼쪽 상단의 뒤로 버튼이 ‘도움말’이라고 레이블이 지정되어서 도움말 화면으로 이동함을 나타냄. ‘구입 항목’이라는 제목의 목록에는 3가지 최근 구입 항목이 있음. Power Surge, Les Cheneaux Islands, Cape Cod 항목이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/custom-refund-request@2x.png)

**대체 솔루션을 제안해 보십시오.** 예를 들어, 고객이 구입한 항목을 받지 못한 경우 즉시 주문 이행 또는 회유 항목을 제안해볼 수 있습니다. 어떠한 대체 솔루션을 제안하더라도 원하는 경우 환불을 요청할 수 있다는 점을 명확히 안내하십시오.

**손쉽게 환불을 요청할 수 있도록 만드십시오.** 구입 도움말 화면에서 유용한 정보와 대체 솔루션을 제공할 수 있지만 이 콘텐츠가 환불을 요청하는 데 방해 요소가 되지 않도록 하십시오. 예를 들어, 스크롤하거나 다른 화면을 열어야 환불 요청 버튼이 보여서는 안 됩니다. 아래 보이는 것처럼 환불을 요청할 항목을 선택했을 때 시스템에서 제공하는 환불 절차가 자동으로 시작되도록 하십시오.

![iPhone의 시스템에서 제공하는 환불 요청 시트 스크린샷. 상단 중앙에 ‘환불 요청’이라는 제목이 있고 오른쪽 상단에 닫기 버튼이 있음. 제목 아래 시트에는 등대 이미지를 비롯하여 이름 Power Surge for The Coast, 가격 3570원, 구입일 2023년 6월 5일, Apple 계정 chavez four at icloud.com이 표시됨. 항목 정보 아래에는 5가지 문제 중에서 선택할 수 있는 목록이 표시된 시트가 있음. 구입하려던 항목이 아님, 자녀/미성년자가 허락 없이 구입함, 구입 항목이 기대에 못 미침, 구입 항목을 받지 못함, 기타 항목이 표시됨. ‘구입 항목이 기대에 못 미침’ 옆에 체크 표시가 있음. 목록 하단에 ’환불한 항목에 접근하지 못할 수 있습니다.’ 문구가 있고, 시트 하단에 ‘환불 요청’ 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/system-refund-flow-1@2x.png)

![iPhone의 시스템에서 제공하는 확인 시트 스크린샷. 체크 표시 아이콘과 ’요청이 제출되었습니다.’라는 제목이 표시됨. 시트에서 제목 아래에 다음과 같은 텍스트가 있음. ‘48시간 이내에 chavez four at iCloud dot com 이메일로 상태 업데이트가 전송됩니다. 청구 사항에 대한 상태를 확인하려면 https report a problem dot Apple dot com으로 이동하십시오.’ 하면 하단에 ‘완료’ 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/system-refund-flow-2@2x.png)

**Apple 환불 정책에 대해 특징을 지정하거나 지침을 제공하지 마십시오.** 예를 들어, 고객이 요청한 환불의 승인 여부를 추측하지 마십시오. 대신 [Request a refund for apps or content that you bought from Apple](https://support.apple.com/en-us/HT204084)의 링크를 제공하여 환불 요청 프로세스를 파악하도록 도울 수 있습니다.

## 자동 갱신 구독

**온보딩 중에 구독의 이점에 대해 관심을 유도하십시오.** 앱을 처음 시작할 때 구독이 주는 가치를 볼 수 있도록 하여 앱 작동 방식을 알려주고 구독할 경우 얻는 이점을 안내할 수 있습니다. 강력한 CTA(Call to Action)와 구독 조건에 대한 명확한 요점을 추가하십시오. [손쉽게 가입하기](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase#Making-signup-effortless)의 내용을 참조하십시오. 관련된 지침을 보려면 [온보딩](https://developer.apple.com/kr/design/human-interface-guidelines/onboarding)의 내용을 참조하십시오.

![iPhone에서 실행 중인 Wave Journal 앱의 스크린샷. 화면 절반에 해당하는 하단에는 구독 혜택을 설명하는 다섯 페이지 중 첫 번째 페이지가 하이라이트되어 있고, 무료 체험 버튼과 로그인 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/iphone-onboarding@2x.png)

**다양한 콘텐츠 선택 항목, 서비스 수준과 기간을 제공하십시오.** 사람들은 요구 사항에 가장 적합한 구독을 선택할 수 있는 유연성이 있을 때 크게 만족합니다.

**가입 전에 콘텐츠를 무료로 사용할 수 있도록 해보십시오.** 제한된 무료 액세스를 통해 콘텐츠를 체험해볼 수 있는 기회를 제공할 수 있으며 이미 체험한 사람들에게는 콘텐츠에 가입하도록 유도할 수 있습니다. 예를 들어 부분 유료화 앱, 종량제 페이월 또는 무료 체험을 제공하십시오.

**부분 유료화 앱**

![iPhone에서 실행 중인 부분 유료화 앱의 페이지가 표시되어 있으며 제목은 ‘Pro로 업그레이드’임. 화면 상단에는 프로 기능이 설명되어 있으며 오른쪽 상단에 닫기 버튼이 있음. 화면 하단에는 두 개의 구독 옵션이 표시되어 있음. 해당 옵션은 일 년에 35,807원이 청구되고 일주일 무료 체험이 제공되며 월간 요금제에 비해 50% 할인이 되는 연간 요금제와 한 달에 5,957원이 청구되는 월간 요금제임. 연간 요금제 옆에 체크 표시가 있음. 화면 하단에는 ‘무료 체험’ 버튼이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/freemium-app@2x.png)

**종량제 페이월**

![iPhone에서 실행 중인 종량제 페이월 앱의 스크린 샷. 매월 제한된 수의 기사를 무료로 볼 수 있음. 화면에는 옵션 보기라는 제목의 버튼 위에 독자가 이 달에 제공되는 무료 기사를 모두 읽었음을 알리는 메시지가 표시됨. 화면 하단에는 기존 구독자로 로그인할 수 있는 옵션이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/paywall-meter@2x.png)

**무료 체험**

![iPhone에서 실행 중인 Wave Journal 앱의 스크린샷. 화면 하단에는 하이라이트된 ‘무료 체험’ 버튼이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/iphone-free-trial@2x.png)

**월간 무료 콘텐츠 한도에 근접한 경우 등과 같이 적절한 시기에 구독을 유도하는 메시지를 표시하십시오.** 또한 언제든지 쉽게 구독할 수 있도록 앱 어디에나 관련 영역에 메시지를 표시하는 것이 좋습니다.

**아직 구독자가 아닌 사람에게만 신규 구독을 권장하십시오.** 그렇지 않으면 실제로는 구독 기간이 남아 있는 기존 구독자가 구독이 만료되었다고 혼동할 수 있습니다. 여러 앱이나 웹사이트에서 동일한 구독 옵션을 제공할 경우, 동일한 서비스에 비용을 중복 결제해야 한다고 생각하지 않도록 로그인 옵션을 추가하십시오.

### 손쉽게 가입하기

간단하면서도 정보가 풍부한 가입 환경을 제공하면 사람들은 앱을 사용 중이거나 App Store 제품 페이지를 보고 있는 중에도 콘텐츠에 관심이 생기는 즉시 가입할 수 있습니다.

**명확하게 구별할 수 있는 구독 옵션을 제공하십시오.** 구독 옵션을 서로 구별할 수 있도록 짧으면서 바로 이해할 수 있는 이름을 사용하고 각 옵션의 가격과 기간을 지정합니다. 가입 할인 혜택을 제공하는 경우 할인 가격, 제공 기간, 혜택 종료 후 고객이 지불하는 표준 가격을 안내해야 합니다.

**필요한 정보만 요청하여 초기 가입 절차를 단순화하십시오.** 가입 절차가 너무 길면 구독 전환율이 낮아질 수 있습니다. 추가 정보는 가입을 완료한 후에 요청하십시오.

**tvOS 앱에서 다른 기기를 통해 가입하거나 인증할 수 있도록 지원하십시오.** tvOS 앱에 정보를 입력하도록 요청하는 대신 필요한 정보를 입력할 수 있는 다른 기기로 코드를 보내십시오.

**앱의 가입 화면에서 자세한 정보를 제공하십시오.** 앱과 App Store 메타데이터에 서비스 약관 및 개인정보 처리방침의 링크를 추가하는 것 외에도 앱 내 가입 화면에 다음 정보를 포함해야 합니다.

- 구독 이름, 기간, 각 구독 기간에 제공되는 콘텐츠나 서비스
- 구독을 구입할 수 있는 지역과 통화에 따라 정확하게 현지화된 청구 금액
- 기존 가입자가 로그인하거나 구입 항목을 복원할 수 있는 방법

예를 들어 Forest Explorer 가입 화면에는 가장 잘 보이는 위치에 월간 구독, 6개월 구독, 연간 구독의 총 청구 금액이 표시됩니다. 하단에는 값을 비교하고 정보를 바탕으로 선택할 수 있도록 6개월과 연간 구독 가격의 내역이 표시됩니다. 또한 구입 항목을 복원하려는 기존 구독자가 사용할 수 있는 버튼도 있습니다.

![iPhone에서 실행 중인 Forest Explorer 앱의 스크린샷. 화면 상단에는 산림 지역의 이미지가 세 이미지 중 첫 번째 이미지로 표시되어 있음. 이미지 아래에는 세 개의 버튼이 구독 옵션과 함께 표시됨. 해당 항목은 한 달에 17,897원 청구되는 Intrepid Pro, 한 달에 11,927원 청구되는 광고형 Intrepid Pro 및 코드 교환임.](https://developer.apple.com/images/com.apple.HIG/iphone-upgrade~dark@2x.png)

**무료 체험 이용 방식을 명확하게 설명하십시오.** 특히 무료 체험 기간이 끝나면 다음 구독 기간에 대한 결제가 자동으로 시작된다는 사실을 안내해야 합니다. 예를 들어, Ocean Journal 가입 화면에는 무료 체험 기간과 종료 후 청구되는 금액이 분명하게 명시되어 있습니다.

![Apple Watch에서 실행 중인 Ocean Journal 앱의 스크린샷. 구독의 이점을 설명하는 모달 뷰가 표시됨. 설명 영역 아래에는 ‘지금 구독’ 버튼이 있으며, 그 아래에는 구독 조건이 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/watch-onboarding@2x.png)

**앱 설정에 가입 기회를 추가하십시오.** 앱 설정과 계정 설정은 사람들이 구독 방법을 가장 많이 찾는 영역입니다.

### 특가 코드 지원하기

iOS 및 iPadOS에서 구독 특가 코드를 사용하면 온라인과 오프라인 채널 모두에서 신규, 기존, 이탈한 구독자에게 구독 콘텐츠에 대한 무료 또는 할인된 접근 권한을 제공할 수 있습니다. 예를 들어 이메일을 통해 특가 코드를 제공할 수도 있고, 매장이나 이벤트를 통해 제공할 수도 있으며, 실제 제품에 코드를 프린트할 수도 있습니다.

다음 두 가지 유형의 특가 코드를 지원할 수 있습니다.

- *일회성 코드*는 App Store Connect에서 생성하는 고유한 코드입니다. 일회성 코드는 [redemption URL](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-offer-codes/#distribute-offer-codes)(공유 가능한 링크)을 통해 또는 교환을 지원하는 앱 내에서 사용할 수 있으며 앱을 설치하지 않은 경우 앱을 설치하라는 메시지가 표시되면 App Store에 코드를 입력하여 사용할 수 있습니다. 배포 규모가 작거나 코드에 대한 액세스를 제한해야 하는 경우에 일회성 코드를 사용하는 것이 좋습니다.
- *사용자 설정 코드*는 NEWYEAR 또는 SPRINGSALE과 같이 직접 만드는 코드입니다. 사용자 설정 코드는 교환 URL을 통해 또는 교환을 지원하는 앱 내에서 교환할 수 있습니다. 코드를 대량으로 배포해야 하는 대규모 캠페인을 지원하려는 경우에 사용자 설정 코드를 사용하는 것이 좋습니다.

특가 코드 구현에 대한 개발자 지침을 보려면 [Offer codes](https://developer.apple.com/documentation/storekit/implementing-offer-codes-in-your-app) 및 [Set up offer codes](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-offer-codes)의 내용을 참조하십시오. 다른 유형의 특가에 대한 지침을 보려면 [Providing subscription offers](https://developer.apple.com/app-store/subscriptions/#providing-subscription-offers)의 내용을 참조하십시오.

**특가의 세부사항을 명확하게 설명하십시오.** 정보를 바탕으로 결정할 수 있도록 마케팅 자료에 특가에 대해 간단하고 간결한 설명을 제공합니다.

**사용자 설정 코드를 만드는 지침을 따르십시오.** 사용자 설정 코드에는 영숫자 ASCII 문자만 사용할 수 있습니다. 한자, 아랍 문자 등의 특수 문자는 사용하지 마십시오.

**사용자 설정 코드를 교환하는 방법을 안내하십시오.** 사람들은 App Store 계정 설정에 사용자 설정 코드를 입력하여 사용할 수 없으므로 교환 URL을 통해 또는 앱 내에서 교환할 수 있다는 사실을 안내해야 합니다.

**앱 내에서 특가 코드 교환을 지원해 보십시오.** 사람들이 특가 코드를 앱에서 교환하는지 또는 App Store에서 교환하는지 여부에 관계 없이 시스템은 특가 코드 교환을 안내하는 화면을 자동으로 표시합니다. StoreKit API를 사용하여 앱 내에서 특가 코드를 교환할 수 있도록 하는 경우, 사용자 설정 UI만 만들면 시스템에서 제공하는 절차를 시작할 수 있습니다. 개발자 지침을 보려면 [presentOfferCodeRedeemSheet(in:)](https://developer.apple.com/documentation/storekit/appstore/presentoffercoderedeemsheet(in:)) 및 [offerCodeRedemption(isPresented:onCompletion:)](https://developer.apple.com/documentation/swiftui/view/offercoderedemption(ispresented:oncompletion:))의 내용을 참조하십시오. 이 사용자 설정 UI를 자연스럽게 제공할 수 있는 영역이 몇 군데 있습니다. 예를 들어 페이월, 온보딩 화면 또는 앱 설정 화면에 ‘코드 교환’ 버튼을 추가할 수 있습니다.

![iPhone에서 실행 중인 Forest Explorer 앱의 구독 가입 페이지 스크린샷. 세 개의 구독 버튼 중 ‘코드 교환’ 버튼이 하이라이트되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/iphone-custom-redeem@2x.png)

![iPhone용 앱의 구독 설정 화면 스크린샷. 구독 관리, 구입 항목 복원, 코드 교환 버튼 위에 앱 이름, 구독 수준, 가격, 다음 청구일이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/subscription-management@2x.png)

사용자화된 코드 교환 버튼을 탭하면 시스템은 자동으로 아래와 같은 여러 가지 코드 교환 화면을 제공합니다.

![iPhone의 코드 교환 화면을 나타내는 일러스트. 화면 상단에는 코드 교환이라고 지정된 레이블 위에 큰 아이콘 영역이 있고 코드 입력이라는 위치 지정자 텍스트가 포함된 텍스트 필드가 있음. 화면 하단에는 탭하여 이용 약관을 볼 수 있는 링크가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/system-provided-redemption-1@2x.png)

![iPhone의 코드 교환 화면을 나타내는 일러스트. 화면 상단에는 사진을 추가할 수 있는 영역이 있음. 사진 영역의 왼쪽 하단 모서리에 작은 아이콘의 일부가 겹쳐져 있음. 사진 영역 아래에는 큰 텍스트로 ‘특가 이름’이라고 지정된 레이블이 있고 그 아래에는 작은 텍스트로 ‘1개월 동안 무료, 이후에는 월 $4.99’라고 표시됨. 화면 하단에는 특가 교환 버튼과 탭하여 이용 약관을 볼 수 있는 링크가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/system-provided-redemption-3@2x.png)

**매력적이고 정보가 풍부한 홍보 이미지를 제공하십시오.** 필요에 따라 이미지를 만들면 사람들이 콘텐츠의 가치를 더 잘 이해할 수 있습니다. 홍보 이미지를 추가하지 않으면 코드 교환 화면에는 기본적으로 앱 아이콘이 사용됩니다. 자세히 알아보려면 [Promoting your in-app purchases](https://developer.apple.com/app-store/promoting-in-app-purchases/)의 내용을 참조하십시오.

**교환 절차를 완료하면 바로 잠금 해제한 콘텐츠의 혜택을 누릴 수 있도록 하십시오.** 앱에서 코드 교환 후의 경험을 구독자의 새로운 상태에 맞추는 방법을 고민해 보십시오. 예를 들어 신규 구독자에게는 환영받는 경험을 선사할 수 있고, 추가 기능을 잠금 해제한 기존 구독자에게는 새로운 기능을 간단히 둘러볼 수 있는 기회를 제공할 수 있습니다. 특히 구독자가 앱을 처음 열기 전에 환영할 준비가 되어 있어야 합니다. 예를 들어, 사용하기 전에 계정을 만들거나 로그인해야 하는 앱이라면 한 번도 해보지 않은 신규 구독자를 위해 이 프로세스가 최대한 순조롭게 진행되도록 만듭니다.

### 구독 관리 지원하기

구독 관리를 지원한다는 것은 사람들이 앱을 종료하지 않고도 구독을 업그레이드, 다운그레이드 또는 취소할 수 있음을 의미합니다. 앱 내에서 구독 관리를 제공하면 일반적인 구독자 문제를 지원하고 사람들이 고려할 대체 제안을 제시하기에 적합한 영역이 될 수 있습니다.

![iPhone용 앱의 구독 설정 화면 스크린샷. 구독 관리, 구입 항목 복원, 코드 교환 버튼 위에 앱 이름, 구독 수준, 가격, 다음 청구일이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/subscription-management@2x.png)

**고객에게 구독 요약 내용을 제공하십시오.** 이렇게 하면 사람들은 예정된 갱신일을 검색하지 않아도 바로 확인할 수 있다는 점에 특히 만족합니다. 이 정보는 설정 또는 계정 화면의 구독 관리 옵션 근처에 표시하는 것이 좋습니다. 개발자 지침을 보려면 [Product.SubscriptionInfo](https://developer.apple.com/documentation/storekit/product/subscriptioninfo)의 내용을 참조하십시오.

**시스템에서 제공하는 구독 관리 UI를 사용해 보십시오.** StoreKit API를 사용하면 앱을 나가지 않고도 구독을 관리하거나 취소하도록 지원하는 일관된 환경을 제공할 수 있습니다. 개발자 지침을 보려면 [showManageSubscriptions(in:)](https://developer.apple.com/documentation/storekit/appstore/showmanagesubscriptions(in:))의 내용을 참조하십시오.

![iPhone용 앱의 구독 관리 화면 스크린샷. 구독 옵션 목록, 구독 취소 버튼 위에 앱 이름, 구독 수준, 가격, 다음 청구일이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/system-cancel-flow-1@2x.png)

![iPhone용 앱의 구독 관리 화면 스크린샷. 화면 중앙에 구독 취소를 확인하는 알림이 표시됨. 알림 텍스트는 다음과 같음. 취소 확인. 지금 구독을 확인 및 취소할 경우, 2023년 7월까지 구독 항목을 계속 이용할 수 있습니다. 알림에는 지금 안 함 버튼과 확인 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/system-cancel-flow-2@2x.png)

**구독자가 구독을 유지하거나 나중에 다시 구독하도록 유도하는 방법을 고민하십시오.** StoreKit API를 사용하면 누군가 구독 취소를 선택할 때 앱에 알림이 전송됩니다. 이러한 경우 취소하지 않도록 맞춤형 혜택을 제공할 수도 있고 구독 종료 설문조사에 참여하여 취소하는 이유를 설명하도록 요청할 수도 있습니다. 설문조사 피드백을 활용하면 다양한 고객 문제에 대한 인사이트를 얻을 뿐 아니라 유지 및 윈백 전략에 도움이 되는 메시지를 발견할 수도 있습니다.

![iPhone에서 실행 중인 Math School 앱의 다시 구독 화면 스크린샷. 화면 하단에는 ‘Math School 다시 구독’이라는 레이블이 큰 글씨로 표시되어 있고, 다시 구독할 때의 혜택을 설명하는 내용이 다섯 페이지 중 첫 번째 페이지로 표시됨. 페이지 보기 영역 아래에는 ‘지금 다시 구독’ 버튼이 다시 구독 시 제공되는 6개월 50% 할인 혜택과 함께 표시되어 있고, 로그인 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/promotional-offer@2x.png)

**언제든지 고객이 자동 갱신 구독을 손쉽게 취소할 수 있도록 하십시오.** 앱 내에서 구독 관리 작업을 할 수 있는 경로가 복잡하거나 알아보기 어려운 경우, 구독자는 취소를 포기하게 하거나 취소하지 못하도록 방해한다고 생각할 수 있습니다.

**브랜드화된 상황별 환경을 조성하여 시스템에서 제공하는 관리 UI를 보완해 보십시오.** 사용자 설정 UI 내에서 인기 있는 프리미엄 계층을 제공하거나 고객의 취향 또는 앱 활용 방식에 대해 알고 있는 정보를 바탕으로 다른 요금제를 맞춤형으로 추천할 수도 있습니다. 예를 들어 특정 기간 동안 할인된 가격으로 제공하는 프로모션 특가를 만들 수 있습니다. 또한 이탈한 구독자를 다시 확보하고 기존 구독자의 업그레이드를 유도하기 위한 구독 [특가 코드 지원하기](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase#Supporting-offer-codes)도 고려해 볼 수 있습니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS 또는 visionOS에 대한 추가 고려 사항은 없습니다.*

### watchOS

watchOS 앱의 가입 화면에는 앱의 다른 버전에 표시되는 구독 옵션에 대한 일련의 정보가 동일하게 표시되어야 합니다. 필수 항목의 전체 목록을 보려면 [손쉽게 가입하기](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase#Making-signup-effortless)의 내용을 참조하십시오. 다음 지침을 참조하면 Apple Watch와 잘 어울리는 가입 화면을 디자인할 수 있습니다.

**다양한 기기에서 실행하는 앱 버전별로 어떤 차이가 있는지 명확하게 설명하십시오.** watchOS 앱에서 다른 기능을 지원하거나 다른 기기에서 사용할 수 있는 콘텐츠의 일부를 제공하는 경우 이러한 차이점을 명확하게 설명해야 합니다. 다른 버전의 앱과 동일한 환경을 제공한다고 느끼지 않도록 watchOS 앱을 통해 구독 콘텐츠를 이용할 때의 이점을 간단히 설명합니다.

![Apple Watch에서 실행 중인 앱의 스크린샷. 화면에 표시된 텍스트는 다음과 같음. Intrepid Pro. 90,000개의 지형 지도, 고급 GPS 기능, 어디서나 가능한 오프라인 길 안내를 사용할 수 있습니다. 화면 왼쪽 상단 모서리에 닫기 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/clarify-description-before@2x.png)

![Apple Watch에서 실행 중인 앱의 스크린샷. 화면에 표시된 텍스트는 다음과 같음. Intrepid Pro. Apple Watch에서 길 안내가 가능한 고급 GPS 기능을 사용할 수 있습니다. iPhone 및 기타 기기에서 90,000개의 지형 지도가 제공됩니다. 화면 왼쪽 상단 모서리에 닫기 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/clarify-description-after@2x.png)

**모달 시트를 사용하여 필수 정보를 표시해 보십시오.** 사람들이 구독 혜택에 대해 자세히 알아볼 수 있는 CTA(Call to Action) 문구에 반응하면 모달 시트를 사용하여 모든 필수 항목이 한눈에 보이도록 표시할 수 있습니다. 모든 정보에 접근하려면 보기를 스크롤해야 하지만 모달 시트에 표시하면 앱 UI를 간소화하고 간결하게 유지할 수 있습니다. 또한 모달 시트의 닫기 버튼을 한 번 탭하면 무료 콘텐츠로 손쉽게 돌아갈 수 있습니다. 모달 시트를 사용하지 않고 사용자 설정 가입 보기를 만드는 경우 효율적인 전체 흐름을 디자인해야 하며 무료 콘텐츠로 돌아갈 수 있는 닫기 또는 취소 버튼을 추가해야 합니다.

**작은 화면에서도 구독 옵션을 쉽게 비교할 수 있도록 만드십시오.** 사람들은 구독 옵션을 선택하기 전에 각 구독 옵션의 조건을 파악해야 합니다. 각 옵션의 기간과 할인 정보를 간편하게 비교하는 콤팩트한 방식으로 표시하도록 만드십시오. 다음 두 가지 방법으로 watchOS 앱에 구독 옵션을 표시할 수 있습니다.

- 각 옵션을 개별 버튼으로 표시합니다. 결제 옵션당 하나의 버튼을 사용하면 탭 한 번으로 가입 절차를 시작할 수 있습니다. 이 디자인에서는 특히 스크롤하면서 해당 요소가 어떤 관련이 있는지 확인할 수 있도록 각 버튼에 설명을 넣어야 합니다.
- 옵션 목록과 함께 탭하여 가입 프로세스를 시작할 수 있는 버튼을 표시합니다. 목록 형식으로 행당 하나의 옵션을 표시하면 스크롤을 최소화하는 동시에 구독 선택 항목을 쉽게 검색하고 파악할 수 있는 콤팩트한 디자인이 완성됩니다. 이 디자인에서는 선택한 옵션을 반영하여 버튼 제목이 업데이트될 수 있습니다.

![Apple Watch에서 실행 중인 앱의 스크린샷. 화면에 두 개의 구독 버튼이 있음. 해당 버튼은 월 5,957원과 연 35,807원임. 화면 왼쪽 상단 모서리에 닫기 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/lock-up-option-information@2x.png)

![Apple Watch에서 실행 중인 앱의 스크린샷. 화면에 구독 옵션 목록이 있음. 해당 옵션은 5,957원 월별 청구와 35,807원 연간 청구임. 연 35,807원 옵션이 선택되어 있음. 화면 하단에 연 35,807원 버튼이 있고 화면 왼쪽 상단 모서리에 닫기 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/list-option-information@2x.png)

## 리소스

#### 관련 콘텐츠

[In-app purchase](https://developer.apple.com/in-app-purchase/)

[Auto-renewable subscriptions](https://developer.apple.com/app-store/subscriptions/)

[App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

#### Developer 문서

[In-App Purchase](https://developer.apple.com/documentation/storekit/in-app-purchase) — StoreKit

#### 비디오

- [Apple 앱 내 구입의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2026/210) — 12개월 약정 월간 구독으로 더 경제적인 구독 결제 옵션을 제공하고 장기적인 약정을 확보하는 방법을 알아보세요. App Store Connect, 다양한 StoreKit API, Xcode 테스트 등을 사용하여 이 새로운 결제 옵션을 구성하고 테스트하는 방법을 살펴보세요. 또한 특가 코드 사용 API 관련 개선 사항과 앱 심사 제출 경험 관련 기능 향상에 대해 알아보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 9월 12일 | 특가 코드 교환에 대한 아트워크와 지침이 업데이트됨. |
| 2022년 11월 3일 | 모든 앱 내 구입 항목의 총 청구 가격을 표시하는 지침을 추가하고 지침을 한 페이지에 통합함. |
