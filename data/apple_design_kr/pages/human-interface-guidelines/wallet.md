# 지갑

Source: https://developer.apple.com/kr/design/human-interface-guidelines/wallet

> 지갑 앱을 사용하면 사람들이 신용 카드와 체크 카드, 운전면허증 또는 주 발급 신분증, 교통카드, 이벤트 티켓, 열쇠 등을 iPhone과 Apple Watch에 안전하게 보관할 수 있습니다.

![지갑 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-Wallet-intro@2x.png)

사람들은 지갑 앱에서 카드와 패스를 사용하여 Apple Pay로 결제하고, 주문을 추적하고, 신원을 확인하며, 비행기 탑승, 콘서트 관람 또는 할인 적용 등의 활동을 간소화합니다.

Apple 지갑을 앱에 통합하면, 사용자 설정 패스를 생성하여 사람들이 필요할 때 이를 표시하고, 개인 콘텐츠에 접근할 수 있도록 개인의 신원을 안전하게 확인하고, 가장 편리한 위치에 자세한 영수증과 추적 정보를 제공할 수 있습니다. 개발자 지침을 보려면 [Wallet](https://developer.apple.com/documentation/passkit/wallet)의 내용을 참조하십시오.

## 패스

패스는 이벤트 티켓, 탑승권, 멤버십 리워드 카드 및 쿠폰과 같이 지갑 앱에 추가할 수 있는 정보를 디지털로 표현한 것입니다.

![공룡 두개골 배경이 있는 박물관 멤버십 패스, 푸드트럭 일러스트가 있는 도넛 할인 쿠폰 패스, 헬스 기구 배경이 있는 헬스장 패스 등 세 개의 지갑 앱 패스가 나란히 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-hero@2x.png)

**지갑 앱에 새로운 패스를 추가하도록 제안하십시오.** 사람들이 새로운 패스를 생성하는 동작(예: 이벤트 티켓 구입, 매장 포인트 프로그램 등록)을 수행하면 탭 한 번으로 패스를 지갑 앱에 추가할 수 있는 시스템 제공 UI를 표시할 수 있습니다. 항공편 체크인과 같이 빈번하고 예측 가능한 동작의 경우, 사람들이 일회성 권한을 부여한 후 백그라운드에서 패스를 추가하여 매번 ‘Apple 지갑에 추가’ 버튼을 탭할 필요가 없도록 할 수 있습니다. 지갑 앱은 패스가 추가될 때마다 알립니다. 패스를 먼저 검토하려는 경우, ‘Apple 지갑에 추가’ 버튼이 있는 사용자 설정 보기를 표시할 수 있습니다. 개발자 지침을 보려면 [addPasses(_:withCompletionHandler:)](https://developer.apple.com/documentation/passkit/pkpasslibrary/addpasses(_:withcompletionhandler:)), [PKPassLibrary.Capability.backgroundAddPasses](https://developer.apple.com/documentation/passkit/pkpasslibrary/capability/backgroundaddpasses) 및 [PKAddPassesViewController](https://developer.apple.com/documentation/passkit/pkaddpassesviewcontroller)의 내용을 참조하십시오.

**사람들이 앱 외부에서 생성한 패스를 추가할 수 있도록 하십시오.** 누군가가 웹사이트나 다른 기기를 사용하여 패스를 생성하는 경우, 다음에 앱을 열 때 지갑 앱에 패스를 추가하도록 제안하십시오. 제안을 거절하는 경우 다시 묻지 마십시오.

**관련된 패스를 그룹으로 추가하십시오.** 앱이 여러 패스(예: 다중 경유 항공편의 탑승권)를 생성하는 경우, 사람들이 각 패스를 개별적으로 추가할 필요가 없도록 모든 패스를 한 번에 추가하십시오. 웹사이트에서 패스 그룹(예: 일련의 이벤트 티켓)을 배포하는 경우 한 번에 모두 다운로드할 수 있도록 번들로 함께 묶으십시오. 개발자 지침을 보려면 [Distributing and updating a pass](https://developer.apple.com/documentation/walletpasses/distributing-and-updating-a-pass)의 내용을 참조하십시오.

**사람들이 아직 지갑 앱에 없는 기존 패스를 추가할 수 있도록 ‘Apple 지갑에 추가’ 버튼을 표시하십시오.** 누군가가 이전에 지갑 앱에 패스를 추가하라는 제안을 거절했거나 패스를 제거한 경우, 마음을 바꿨을 때 버튼을 사용하여 쉽게 추가할 수 있습니다. 앱에 해당 패스 정보가 나타나는 곳이면 어디든지 ‘Apple 지갑에 추가’ 버튼을 표시할 수 있습니다. 개발자 지침을 보려면 [PKAddPassButton](https://developer.apple.com/documentation/passkit/pkaddpassbutton)의 내용을 참조하십시오. 이메일이나 웹 페이지에서 ‘Apple 지갑에 추가’ 배지를 사용할 수도 있습니다. 지침을 보려면 [Add to Apple Wallet guidelines](https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/)의 내용을 참조하십시오.

![12개 도넛에 대해 20% 할인 쿠폰을 제공하는 패스와 패스 아래에 ‘Apple 지갑에 추가’ 버튼을 표시한 iPhone의 푸드트럭 앱.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-add-to-apple-wallet@2x.png)

**사람들이 앱에서 지갑 앱의 패스로 이동하도록 하십시오.** 앱이 지갑 앱의 패스에 대한 정보를 표시하는 곳이면 어디든지 직접 여는 링크를 제공할 수 있습니다. 링크에 ‘지갑에서 보기’와 같은 레이블을 지정하십시오.

**패스가 언제 만료되는지 시스템에 알리십시오.** 지갑 앱은 만료된 패스를 자동으로 가려서 혼잡을 줄이고 사람들이 해당 패스를 다시 찾아볼 수 있는 버튼을 제공합니다. 시스템이 패스를 적절하게 가리도록 하려면 각 패스의 만료 날짜, 해당 날짜 및 무효 처리된 속성을 올바르게 설정하십시오. 개발자 지침을 보려면 [Pass](https://developer.apple.com/documentation/walletpasses/pass)의 내용을 참조하십시오.

**지갑 앱에서 패스를 삭제하기 전에 항상 사람들로부터 권한을 받으십시오.** 예를 들어, 사람들이 패스를 수동으로 삭제할지 아니면 자동 제거를 허용할지 지정할 수 있는 앱 내 설정을 포함할 수 있습니다. 필요한 경우, 패스를 삭제하기 전에 경고를 표시할 수 있습니다.

**해당되는 상황인 경우 시스템이 패스를 제안할 수 있도록 하십시오.** 사람들이 수동으로 패스를 찾을 필요가 없도록 자동으로 필요할 때 나타나게 하는 것이 가장 좋습니다. 패스와 관련된 시간 및 위치 정보를 제공하면 시스템은 사람들이 패스를 사용할 가능성이 가장 높을 때 잠금 화면에 패스 링크를 표시할 수 있습니다. 예를 들어, 사람들이 헬스클럽에 들어갈 때 헬스클럽 멤버십 카드가 잠금 화면에 나타날 수 있습니다. 이벤트 티켓과 같은 특정 유형의 패스의 경우, 시스템이 실시간 현황을 실행할 수도 있습니다. 개발자 지침을 보려면 [Showing a Pass on the Lock Screen](https://developer.apple.com/documentation/walletpasses/showing-a-pass-on-the-lock-screen)의 내용을 참조하십시오.

![’오늘의 운동을 준비해 보세요! 멤버십 패스를 열어서 출입하세요.’라는 문구가 표시된 헬스장 앱의 배너가 표시된 iPhone 잠금 화면 하단 부분의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-pass-notification@2x.png)

![축구 이벤트 티켓의 실시간 현황이 표시된 iPhone 잠금 화면 하단 부분의 스크린샷. 좌석 위치는 3층 12열 5번임.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-pass-live-activity@2x.png)

**패스를 최신 상태로 유지하십시오.** 실제 패스는 일반적으로 변경되지 않지만 디지털 패스는 실시간 변경 사항을 반영할 수 있습니다. 예를 들어, 항공사 탑승권은 항공편 지연과 게이트 변경을 표시하기 위해 자동으로 업데이트될 수 있습니다.

**시간이 중요한 정보를 업데이트하는 경우에만 변경 메시지를 사용하십시오.** 변경 메시지가 방해하므로, 사람들이 알아야 할 내용을 업데이트하는 경우에만 변경 메시지를 보내는 것이 중요합니다. 예를 들어, 사람들이 항공편 게이트 변경 사항은 알아야 하지만, 고객 서비스 센터 전화번호의 변경 사항은 알 필요가 없습니다. 마케팅이나 기타 중요하지 않은 커뮤니케이션에 변경 메시지를 사용하지 마십시오. 변경 메시지는 필드별로 사용할 수 있으며, 개발자 지침을 보려면 [Adding a Web Service to Update Passes](https://developer.apple.com/documentation/walletpasses/adding-a-web-service-to-update-passes)의 내용을 참조하십시오.

## 패스 구조

패스 필드와 시맨틱 태그를 조합하여 패스의 내용과 구조를 정의할 수 있습니다. 패스 필드는 패스에 표시되는 정보와 정보를 배열하는 방법을 정의합니다. 시맨틱 태그는 시스템에 패스 내용을 설명하여 필요할 때 패스를 표시하거나 장소 방향 또는 이벤트 가이드와 같은 관련 콘텐츠 바로가기인 강조된 동작을 활성화합니다. 포스터 이벤트 및 시맨틱 탑승권 패스의 경우, 시맨틱 태그가 필요하며 자동 레이아웃을 활성화합니다. 이러한 패스 유형의 경우 시맨틱 태그와 함께 패스 필드를 포함하여 iOS의 이전 버전이 실행되는 기기에 패스를 올바르게 표시하십시오.

일부 경우에는 패스 앞면에 연결된 시트를 통해 사용자가 접근할 수 있는 추가 정보를 제공할 수 있습니다. 패스 뒷면에는 법률 텍스트와 같이 사용자가 거의 접근할 필요가 없는 설정 및 정보가 저장됩니다.

개발자 지침을 보려면 [Wallet Passes](https://developer.apple.com/documentation/walletpasses)의 내용을 참조하십시오.

### 패스 필드 유형

패스 필드는 다음과 같은 영역으로 구성됩니다.

- 로고 및 로고 텍스트 필드: 브랜드 아이콘과 이름을 표시합니다. 지갑 앱에서 패스가 축소되어도 계속 표시합니다.
- 헤더 필드: 패스가 축소된 경우에도 계속 표시해야 하는 중요한 정보를 나타냅니다.
- 주요 필드: 가장 필요한 중요 정보를 표시합니다.
- 보조 및 부가 필드: 유용하지만 덜 중요한 정보를 제공합니다.
- 꼬리말 필드: 패스 카테고리(예: ‘가족’ 또는 ‘연간’)와 같은 추가 정보를 표시합니다.
- 후면 필드 - 지갑 앱의 패스 세부사항에 표시되는 추가 세부사항을 표시합니다.

레이아웃은 패스 스타일에 따라 다릅니다. 개발자 지침을 보려면 [Defining the metadata of your Wallet Pass](https://developer.apple.com/documentation/walletpasses/defining-the-metadata-of-your-wallet-pass).의 내용을 참조하십시오.

## 패스 디자인하기

지갑은 일관된 시각적 스타일을 사용하여 친숙함과 신뢰감을 구축합니다. 실제 카드와 동일한 모양을 단순히 복제하는 대신, 지갑 앱에서 잘 어우러지도록 깔끔하고 간단한 패스를 디자인하십시오.

![공룡 두개골 일러스트가 포함된 전체 아트워크 배경, QR 코드 및 회원 정보가 표시된 박물관 멤버십 패스가 지갑 앱에서 열려 있는 스크린샷. 패스 아래에는 멤버십 혜택 보기 및 위치로 이동의 두 가지 동작이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-wallet-app@2x.png)

Pass Designer를 사용하여 Apple 지갑용 패스를 디자인하고 미리 볼 수 있습니다. Apple에서 제공하는 템플릿 또는 빈 패스에서 시작하여 탑승권, 쿠폰, 이벤트 티켓, 매장 카드, 일반 패스 및 일반 포스터 패스를 생성할 수 있습니다. 자세한 내용을 보려면 [Creating a pass with Pass Designer](https://developer.apple.com/documentation/walletpasses/creating-a-pass-with-pass-designer)의 내용을 참조하십시오.

![공룡 두개골, 나비, 해양 생물 일러스트가 보이는 박물관 포스터 일반 패스의 미리보기 화면과 함께 회원 정보 및 QR 코드가 표시된 Mac용 Pass Designer의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/wallet-pass-pass-designer-overview@2x.png)

**모든 기기에서 잘 보이고 잘 작동하는 패스를 디자인하십시오.** 패스는 기기에 따라 다르게 보일 수 있습니다. 예를 들어, Apple Watch의 패스는 iPhone보다 정보가 적고 이미지도 적게 표시됩니다. 특정 기기에서는 사용할 수 없는 요소에 필수 정보를 넣지 말고, 이미지에 여백을 추가하지 마십시오. 예를 들어, watchOS는 일부 이미지의 빈 여백을 자릅니다. 지침을 보려면 [watchOS](https://developer.apple.com/kr/design/human-interface-guidelines/wallet#watchOS)의 내용을 참조하십시오.

**패스의 앞면을 깔끔하게 유지하십시오.** 지갑 앱에서 패스를 축소한 경우에도 사람들이 계속 볼 수 있도록 헤더에 필수 정보(예: 이벤트 날짜 또는 계정 잔액)를 표시하십시오. 패스 앞면의 나머지 부분을 사용하여 빠르게 접근해야 하는 중요한 정보를 제공하십시오. 자주 확인하지 않는 세부사항은 추가 패스 정보 시트에 넣으십시오.

**패스를 즉시 식별할 수 있도록 하십시오.** 브랜드 색상과 시각적 요소(예: 이미지, 아이콘 및 전체 아트워크 배경)을 사용하면 사람들이 패스를 한눈에 인식하는 데 도움이 될 수 있습니다.

**배경 및 텍스트 색상 사이에 충분한 대비를 확보하십시오.** 단색 배경과 배경 이미지 모두에서 텍스트 가독성을 유지할 수 있는 레이블 색상을 선택하십시오.

![보라색 단색 배경 위에 선명하게 읽을 수 있는 하얀색 레이블 텍스트가 표시된 헬스장 멤버십 패스.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-text-sufficient-contrast@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![단색 보라색 배경과 배경과 구별하기 어려운 라벨 텍스트가 있는 헬스장 멤버십 패스.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-text-insufficient-contrast@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![이미지를 배경으로 하고 선명하게 읽을 수 있는 하얀색 레이블 텍스트가 있는 콘서트 티켓 패스.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-background-sufficient-contrast@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![배경과 구별하기 어려운 이미지 배경 및 레이블 텍스트가 있는 콘서트 티켓 패스.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-background-insufficient-contrast@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**모든 기기에서 작동하는 언어를 사용하십시오.** 패스는 여러 기기에 나타날 수 있으므로 모든 곳에서 적합한 텍스트를 사용하십시오. 예를 들어, ‘밀어서 보기’는 iPhone에서는 의미가 있지만 Apple Watch에서는 적용되지 않습니다.

## 패스 스타일

다양한 패스 스타일 중에서 선택할 수 있습니다. 각 패스 스타일은 패스의 모양 및 레이아웃을 정의합니다.

### 탑승권

탑승권 스타일은 항공권, 기차표, 버스표, 배표, 일반 교통 패스 등 교통 패스용입니다. 일반적으로 각 패스는 특정 출발지와 목적지가 있는 편도 여행에 해당합니다. 항공권에 시맨틱 태그를 사용하고, 다른 교통 수단에는 패스 필드를 사용하십시오. 개발자 지침을 보려면 [Creating an airline boarding pass using semantic tags](https://developer.apple.com/documentation/walletpasses/creating-an-airline-boarding-pass-using-semantic-tags)의 내용을 참조하십시오.

![샌프란시스코(SFO)에서 도쿄(NRT)로 가는 항공편용 항공권의 파란색 배경에 승객 세부사항, 탑승 정보 및 QR 코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-airline-boarding@2x.png)

### 쿠폰

쿠폰 스타일은 쿠폰, 특별 혜택 및 기타 할인용입니다. 개발자 지침을 보려면 [Creating a coupon pass](https://developer.apple.com/documentation/walletpasses/creating-a-coupon-pass)의 내용을 참조하십시오.

![상단에는 푸드트럭 스트립 이미지가 있고 하단에는 파란색 단색 배경이 적용된 푸드트럭 쿠폰 패스. 도넛 12개 20% 할인 혜택과 함께 회원 정보와 하단 바코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-coupon@2x.png)

### 이벤트 티켓

이벤트 티켓 패스 스타일은 스포츠 이벤트, 콘서트, 영화, 연극과 같은 이벤트에 입장할 때 사용합니다. 일반적으로 각 패스는 특정 이벤트에 해당하지만, 시즌 티켓과 같이 여러 이벤트에 단일 패스를 사용할 수도 있습니다. 이벤트 티켓은 이벤트의 분위기와 감성을 전달하기 위해 전체 아트워크 배경을 지원합니다. 개발자 지침을 보려면 [Creating a poster event pass using semantic tags](https://developer.apple.com/documentation/walletpasses/creating-an-event-pass-using-semantic-tags)의 내용을 참조하십시오.

![경기장에서 공을 차는 축구 선수 일러스트가 들어간 축구 경기 포스터 티켓에 경기 세부사항, 좌석 정보 및 바코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-poster-event-ticket@2x.png)

포스터 스타일이 아닌 이벤트 티켓은 표준 패스 필드를 사용하며, 배경 이미지 및 썸네일을 사용할 수 있습니다.

![움직이는 선수 모습을 흐리게 표시한 전체 이미지 배경이 있는 축구 경기 티켓에 이벤트 세부사항, 좌석 정보 및 하단 바코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-event-ticket-background@2x.png)

![단색 어두운 파란색 배경에 축구 경기 티켓에 경기 세부사항, 좌석 정보, 썸네일 및 하단 바코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-event-ticket@2x.png)

### 매장 카드

매장 카드 스타일은 매장 고객 카드, 할인 카드, 포인트 카드 및 기프트 카드에 사용됩니다. 계정에 잔액이 있는 경우, 패스에 일반적으로 표시됩니다. 개발자 지침을 보려면 [Creating a store card pass](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass)의 내용을 참조하십시오.

![카페 풍경의 스트립 일러스트와 어두운 붉은색 배경이 있는 카페 매장 카드에 회원 이름, 포인트 잔액, 리워드 값 및 QR 코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-store-card@2x.png)

### 포스터 일반 패스

포스터 일반 패스 스타일은 전체 배경 이미지와 더불어 다른 패스 스타일과 구분되는 패스 필드 레이아웃을 특징으로 하며, 광범위한 사용 사례를 지원하는 유연한 옵션을 제공합니다. 특정 카테고리에 속하지 않으므로 다른 패스 스타일이 적합하지 않을 때 언제든지 사용할 수 있습니다.

![공룡 두개골, 나비 및 해양 생물이 보이는 전체 아트 일러스트가 있는 박물관 포스터 일반 패스에 회원 정보와 QR 코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-generic-poster-pass@2x.png)

### 일반 패스

일반 스타일은 헬스장 회원증 또는 외투 보관증과 같이 다른 카테고리에 속하지 않는 패스에 사용됩니다. 개발자 지침을 보려면 [Creating a generic pass](https://developer.apple.com/documentation/walletpasses/creating-a-generic-pass)의 내용을 참조하십시오.

![보라색 단색 배경의 헬스장 회원권 일반 패스에 덤벨 썸네일, 멤버십 세부사항 및 하단 바코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-generic-pass@2x.png)

## 패스 이미지

패스는 다양한 이미지 유형을 지원합니다. @2x 및 @3x 형식으로 PNG 형식의 패스 이미지를 생성하십시오.

**패스 이미지는 시각적 콘텐츠용으로만 제한하십시오.** 이미지에 텍스트를 삽입하면 접근하기 어려우며, 모든 기기에서 이미지가 올바르게 표시되지 않을 경우 표시되지 않을 수 있습니다. 텍스트 정보는 이미지 대신 텍스트 필드와 시맨틱 태그를 사용하십시오. 바코드를 패스 이미지에 삽입하는 대신, Pass Designer 또는 해당 API를 사용하여 추가하십시오.

**이미지 파일 크기를 작게 유지하십시오.** 사람들은 이메일이나 웹 페이지를 통해 패스를 받을 수 있습니다. 가능한 한 빨리 다운로드하려면 잘 보이는 상태에서 가장 작은 이미지 파일을 사용하십시오.

**패스 아이콘을 제공하십시오.** 시스템은 이를 사용하여 잠금 화면, Mail 및 지갑 앱의 패스에서 패스를 나타냅니다. 앱 아이콘을 사용하거나 별도의 아이콘을 디자인할 수 있습니다.

### 로고

로고는 패스 필드가 있는 패스의 상단 앞쪽 모서리에 표시됩니다. 일반적으로 브랜드를 나타내는 가로 텍스트 로고이며 선택적으로 그래픽 요소와 결합할 수 있습니다.

![패스의 왼쪽 상단 모서리에 있는 로고 위치를 식별하는 콜아웃이 있는 푸드 트럭 쿠폰 패스의 상단 부분.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-logo@2x.png)

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 시맨틱 태그를 사용하지 않는 항공사 탑승권, 항공사 탑승권이 아닌 스타일, 쿠폰, 포스터가 아닌 이벤트 티켓, 일반 탑승권, 매장 카드 |
| **파일 이름** | logo.png |
| **최소 너비** | 50pt |
| **최대 너비** | 160pt |
| **높이** | 50pt |

**로고 아트워크에서 내부 드롭 그림자를 지양하십시오.** 로고가 패스에 렌더링될 때 가독성이 저하될 수 있습니다.

![내부 그림자 없이 평면적으로 표현된 갈색 종이봉투 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-logo-no-shadow@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![내부 드롭 그림자가 적용되어 아이콘 모양 안쪽이 오목하게 들어간 효과가 생긴 갈색 종이봉투 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-logo-with-shadow-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

### 기본 로고

로고와 마찬가지로 기본 로고는 패스의 상단 좌측 모서리에 표시되지만 시맨틱 패스키에만 사용됩니다.

![상단 왼쪽에 있는 정사각형 기본 로고와 그 옆의 로고 텍스트를 가리키는 콜아웃이 있는 항공사 탑승권의 상단 부분.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-primary-logo-square@2x.png)

![상단 왼쪽 모서리에 있는 직사각형 모양의 텍스트 기반 기본 로고를 식별하는 콜아웃이 있는 항공사 탑승권의 상단 부분.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-primary-logo-wide@2x.png)

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 항공사 탑승권, 포스터 이벤트 티켓 및 포스터 일반 패스 |
| **파일 이름** | primaryLogo.png |
| **최소 너비** | 30pt |
| **최대 너비** | 126pt |
| **높이** | 30pt |

### 보조 로고

보조 로고는 티켓 발행자 또는 이벤트 주최자의 추가 로고를 표시합니다. 포스터 이벤트 티켓의 하단 뒤쪽 모서리에 나타납니다.

![하단 뒤쪽 모서리에 있는 보조 로고를 식별하는 콜아웃이 있는 축구 이벤트 포스터 티켓의 하단 부분.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-secondary-logo@2x.png)

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 포스터 이벤트 티켓 |
| **파일 이름** | secondaryLogo.png |
| **최소 너비** | 12pt |
| **최대 너비** | 135pt |
| **높이** | 12pt |

### 아이콘

아이콘은 정사각형이며, 잠금 화면, Mail 및 지갑의 패스에서 패스가 표시될 때 회사 또는 브랜드를 나타냅니다. 시스템이 모서리를 자동으로 둥글게 적용하므로 따로 둥글게 만들 필요가 없습니다.

![‘도쿄행 AP 1042편 탑승을 준비하세요!’라는 항공사 탑승권 배너가 표시된 iPhone의 잠금 화면 하단 부분 스크린샷. 배너의 앞쪽에 탑승권 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-icon-notification@2x.png)

![iPhone의 지갑 앱에서 열려 있는 항공사 탑승권 하단 부분. 패스 아이콘이 패스의 하단 왼쪽 모서리에 보이고 하단에 두 개의 동작인 ‘터미널 I로 이동’ 및 ‘수하물 추적’이 보임.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-icon-wallet@2x.png)

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 모두 |
| **파일 이름** | icon.png |
| **너비** | 38pt |
| **높이** | 38pt |

### 스트립 이미지

쿠폰 및 매장 카드에 스트립 이미지가 표시되어 브랜드 또는 혜택을 강화합니다. 스트립 이미지 위에 텍스트가 표시될 수 있으므로 텍스트와 이미지의 대비가 충분한지 확인하십시오. 텍스트 뒤에 있는 영역을 깔끔하게 유지하고 중요한 시각적 요소를 하단 또는 뒤쪽 가장자리로 배치하십시오. 스트립 이미지에 텍스트를 포함하는 것을 피하십시오.

![점선 테두리로 윤곽이 표시된 주요 필드와 스트립 이미지를 식별하는 콜아웃이 있는 푸드 트럭 쿠폰 패스의 상단 부분.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-strip-image@2x.png)

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 쿠폰, 매장 카드 |
| **파일 이름** | strip.png |
| **너비** | 375pt |
| **높이** | 144pt |

### 썸네일

썸네일은 이벤트 티켓 및 일반 패스에 표시되는 영화 포스터와 같은 작은 이미지입니다. 썸네일은 정사각형입니다. 아트워크에 둥근 모서리를 사용하고 투명한 PNG로 내보내십시오.

![단색 보라색 배경과 상단 뒤쪽 영역에 패스의 썸네일을 식별하는 콜아웃이 있는 체육관 멤버십 패스의 상단 부분.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-thumbnail@2x.png)

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 이벤트 티켓, 일반 패스 |
| **파일 이름** | thumbnail.png |
| **최소 너비** | 60pt |
| **최대 너비** | 90pt |
| **높이** | 90pt |

### 배경

배경 이미지는 패스의 시각적 중심 요소입니다.

![움직이는 선수 모습을 흐리게 표시한 전체 이미지 배경이 있는 축구 경기 티켓에 이벤트 세부사항, 좌석 정보 및 하단 바코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-types-event-ticket-background@2x.png)

![야외에 세워진 푸드트럭 일러스트가 있는 푸드트럭 쿠폰 패스. 일러스트 위에 바코드가 겹쳐져 있고, 상단 및 하단에 쿠폰 세부사항이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-background-unblurred@2x.png)

**포스터 패스가 아닌 패스의 배경**

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 이벤트 티켓 |
| **파일 이름** | background.png |
| **너비** | 343pt |
| **높이** | 503pt |

**포스터 패스의 배경**

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 포스터 이벤트 티켓, 포스터 일반 패스 |
| **파일 이름** | artwork.png |
| **너비** | 358pt |
| **높이** | 448pt |

콘텐츠를 안전 영역에 배치하십시오. 포스터 일반 패스 및 포스터 이벤트 티켓에서는 머티리얼 스트립이 이미지의 하단 가장자리를 덮습니다. 패스에 바코드가 포함되어 있는 경우, 배경 디자인 시 고려해야 합니다. Pass Designer에서 패스 레이아웃을 미리 보며 배치 상태를 확인할 수 있습니다. 개발자 지침을 보려면 [Pass](https://developer.apple.com/documentation/walletpasses/pass)의 `footerBackgroundColor`을 참조하십시오.

![공룡 두개골, 나비 및 해양 생물이 보이는 배경 일러스트가 있는 박물관 포스터 일반 패스 하단에 회원 정보와 하단 QR 코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-background-layout-qr-code@2x.png)

![공룡 두개골, 나비 및 해양 생물이 보이는 배경 일러스트가 있는 박물관 포스터 일반 패스. 파란색 오버레이는 상단의 헤더 영역과 하단의 QR 코드 및 꼬리말 영역을 포함한 패스 콘텐츠의 안전한 영역을 보여줌.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-background-layout-qr-code-safe-areas@2x.png)

![폭포가 있는 풍경이 그려진 전체 아트 일러스트 배경의 미술관 포스터 일반 패스 하단에 회원 정보와 QR 코드가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-background-layout-barcode@2x.png)

![폭포가 있는 풍경이 그려진 배경 아트워크 이미지. 파란색 오버레이는 상단의 헤더 영역과 하단의 바코드 및 꼬리말 영역을 포함한 패스 콘텐츠의 안전 영역을 보여줌.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-passes-images-background-layout-barcode-safe-areas@2x.png)

### 꼬리말

꼬리말은 항공사 탑승권에서만 사용할 수 있습니다.

|  |  |
| --- | --- |
| **지원되는 패스 스타일** | 항공사 탑승권 |
| **파일 이름** | footer.png |
| **너비** | 268pt |
| **높이** | 15pt |

## 주문 추적

주문 추적을 지원하면 지갑 앱은 앱이나 웹사이트를 통해 접수된 고객 주문 정보를 표시하며, 주문 상태가 변경될 때마다 정보를 업데이트할 수 있습니다. iOS 17 이상에서는 사람들이 앱이나 웹사이트에서 바로 주문을 추적할 수 있으며 지갑 앱에 주문을 추가하는 방법이 더 제공됩니다.

![iPhone의 푸드트럭 앱의 주문 이행 화면 스크린샷. 화면에는 접수된 주문 정보가 표시되며, 상태 막대, 배송 주소, 주문한 항목 목록 및 추가 주문 세부사항이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-ot-status-order-placed@2x.png)

![iPhone의 푸드트럭 앱의 주문 이행 화면 스크린샷. 화면에는 접수된 주문 정보가 표시되며, 주문이 오늘 배송됨을 나타냄. 화면에는 배송 주소, 발송 추적 링크, 주문한 항목 목록 및 추가 주문 세부사항이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-ot-status-delivered@2x.png)

지갑 앱은 고객의 활성 주문 및 완료된 주문을 표시하는 대시보드를 제공합니다. 사람들은 주문을 선택하여 주문한 항목과 배송 및 픽업에 대한 이행 정보 등의 세부사항을 볼 수 있습니다.

![iPhone에서 푸드트럭 앱의 주문 내역 화면이 표시된 대시보드 스크린샷. 화면에는 검색 필드, 활성 주문 목록 및 이번 달에 접수된 주문 목록이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-ot-dashboard@2x.png)

[Wallet Orders](https://developer.apple.com/documentation/walletorders) 스키마는 예상 도착 날짜, 주소, 추적 번호 및 픽업 지침을 포함하여 제품 설명, 주문 상태, 연락처 정보, 배송 및 픽업 세부사항 등의 주문 데이터를 제공하는 데 사용하는 속성을 정의합니다. 지갑 앱은 일관적인 시스템 정의 인터페이스 내에서 제공되는 정보를 표시합니다. 사람들이 필요한 정보를 빠르고 편리하게 확인할 수 있도록 주문 프로세스와 일치하는 속성을 사용하여 가능한 한 많은 정보를 제공하십시오.

![iPhone의 푸드트럭 앱의 주문 이행 화면 스크린샷. 화면에는 접수된 주문 정보가 표시되며, 상태 막대, 배송 주소, 주문한 항목 목록 및 추가 주문 세부사항이 포함되어 있음. 콜아웃은 가맹점 로고 및 표시 이름, 주문 상태 및 설명, 추적 링크 및 다양한 라인 항목을 포함하여 화면의 다른 필드를 식별함.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-ot-status-on-the-way-fields@2x.png)

**사람들이 지갑 앱에 주문을 쉽게 추가 수정할 수 있도록 하십시오.** 예를 들어, 고객이 앱이나 웹사이트에서 Apple Pay 거래를 완료하면 [PKPaymentOrderDetails](https://developer.apple.com/documentation/passkit/pkpaymentorderdetails)(앱) 또는 [ApplePayPaymentOrderDetails](https://developer.apple.com/documentation/applepayontheweb/applepaypaymentorderdetails)(웹) 사용으로 지갑 앱에 주문을 자동으로 추가하십시오. iOS 17 이상에서는 [AddOrderToWalletButton](https://developer.apple.com/documentation/financekitui/addordertowalletbutton)을 사용하여 앱 또는 웹사이트에서 관련 있는 영역(예: 주문 확인, 상태 또는 추적 페이지)이나 고객에게 보내는 이메일에 시스템 제공 ‘Apple 지갑으로 추적’ 버튼을 표시할 수 있습니다. 이미 지갑 앱에 주문을 추가한 경우, 다시 추가하려고 하면 지갑 앱이 열리고 주문이 표시됩니다.

**사람들이 주문한 직후에 주문 정보를 확인할 수 있도록 하십시오.** 사람들은 결제, 처리 및 이행이 아직 보류 중인 경우에도 주문이 접수되었는지 확인해야 합니다. 나중에도 세부사항이 없는 경우, 주문 시 받은 데이터를 제공하고 ‘전체 주문 세부사항에 대해 나중에 다시 확인하십시오.’와 같은 상태 [description](https://developer.apple.com/documentation/walletorders/order)(설명)을 제공하십시오.

**가능한 한 빨리 이행 정보를 제공하며, 최신 상태로 유지하십시오.** 이행 데이터를 제공하거나 주문 상태를 변경하면 시스템은 주문 정보를 업데이트하고 고객에게 자동으로 알림을 보낼 수 있습니다. 시스템은 보고된 이행 상태를 사용하여 주문의 현재 상태를 ‘주문 접수됨’, ‘처리 중’, ‘픽업 준비 완료’, ‘픽업 완료’, ‘배달 출발’, ‘배달됨’, 문제가 있는 경우 ‘문제’ 또는 ‘취소됨’과 같은 값으로 업데이트합니다. 상태 설명에 대한 지침을 보려면 [주문 및 이행 세부사항 표시하기](https://developer.apple.com/kr/design/human-interface-guidelines/wallet#Displaying-order-and-fulfillment-details)의 내용을 참조하십시오.

**불투명한 배경을 사용하는 고해상도 로고 이미지를 제공하십시오.** 시스템은 대시보드 및 세부사항 보기에 로고 이미지를 표시하므로 사람들이 다양한 크기의 로고 이미지를 즉시 인식할 수 있도록 해야 합니다. PNG 또는 JPEG 포맷을 사용하여 300x300픽셀 크기의 로고 이미지를 생성하십시오. 로고 이미지가 올바르게 렌더링되도록 하려면 불투명한 배경을 사용해야 합니다. 개발자 지침을 보려면 [logo](https://developer.apple.com/documentation/walletorders/merchant)의 내용을 참조하십시오.

**불투명한 배경에 뚜렷한 고해상도 제품 이미지를 제공하십시오.** 시스템은 세부사항 보기, 주문 대시보드 및 주문 또는 이행 알림에 제공된 설명 정보와 함께 제품 이미지를 표시합니다. 제품 이미지를 생성할 때 직관적인 묘사와 불투명한 단색 배경을 사용하십시오. ‘라이프 스타일’ 맥락이나 복잡한 배경에서 제품을 표시하면 작은 크기에서는 항목을 구별하기 어려울 수 있습니다. 각 제품의 경우 PNG 또는 JPEG 포맷을 사용하여 300x300픽셀 크기의 이미지를 생성하십시오.

![제품 이미지를 나타내는 도넛 일러스트. 가로 및 세로선이 이미지의 하단 및 오른쪽을 따라 확장되며, 일러스트의 너비가 300픽셀이고 높이가 300픽셀이라고 나타낸 레이블이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-ot-product-images@2x.png)

**일반적으로 텍스트를 짧게 유지하십시오.** 사람들은 텍스트를 한눈에 읽고 싶어 하며, 시스템에서 너무 긴 텍스트는 잘릴 수 있습니다.

**명확하고 이해하기 쉬운 언어를 사용하며, 제공되는 텍스트를 현지화하십시오.** 모든 고객이 주문 정보를 읽을 수 있어야 합니다. 또한 표시된 가격이 고객이 확인한 최종 가격과 일치하도록 하십시오.

### 주문 및 이행 세부사항 표시하기

주문은 사람들에게 가맹점에 연락할 수 있는 방법을 제공하고 이행 상태 및 항목별 정보를 포함하여 Apple Pay 구입에 대한 세부사항을 표시합니다.

**사람들이 주문을 관리하는 영역에 대한 링크를 제공하십시오.** 유니버설 링크를 제공하면 앱이 설치되어 있지 않더라도 사람들은 주문 관리 영역을 열 수 있습니다. 유니버설 링크에 대해 더 알아보려면 [Allowing apps and websites to link to your content](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content)의 내용을 참조하십시오. 개발자 지침을 보려면 [Order](https://developer.apple.com/documentation/walletorders/order)의 내용을 참조하십시오.

**사람들이 모든 항목이 주문에 포함되어 있는지 확인할 수 있도록 각 항목을 명확하게 설명하십시오.** [LineItem](https://developer.apple.com/documentation/walletorders/lineitem) 속성을 사용하여 제품 가격, 이름 및 이미지 등의 정보를 제공할 수 있습니다. 주문에는 고객이 주문한 모든 항목에 대한 라인 항목이 나열되며, 이행에는 이행에 포함된 라인 항목만 나열됩니다. 적합할 경우, 주문과 관련된 개별 거래에 PDF 영수증을 첨부할 수도 있습니다.

**기기에 설치할 수 있는 앱의 우선순위 목록을 제공하십시오.** 시스템은 주문 세부사항 보기에서 앱에 대한 링크를 표시해야 할 때 이 목록을 사용합니다. 예를 들어, 여러 앱을 제공하고 그 중 둘 이상이 기기에 설치된 경우, 설치된 앱 중 목록에서 우선순위가 가장 높은 앱에 대한 링크가 표시됩니다. 기기에 설치된 앱이 없는 경우, 목록의 첫 번째 앱에 대한 링크가 표시됩니다. 개발자 지침을 보려면 [Order](https://developer.apple.com/documentation/walletorders/order)의 내용을 참조하십시오.

**중복된 알림을 보내지 마십시오.** 예를 들어, 고객이 연관된 앱 중 하나를 설치했을 때 지갑 앱을 통해 주문 관련 알림을 보내지 않도록 시스템에 전달할 수 있습니다.

**고객이 가맹점에 쉽게 연락할 수 있도록 하십시오.** 사람들이 자신에게 가장 적합한 방법을 선택할 수 있도록 여러 연락 방법을 제공하십시오. 최소한 가맹점의 웹사이트 또는 방문 페이지 링크를 제공해야 하지만, Messages for Business 링크, 전화번호, 이메일 주소 및 지원 페이지 링크를 제공할 수도 있습니다. 사람들이 주문에서 연락처 버튼을 선택하면 시스템은 제공되는 연락 방법 메뉴를 표시합니다. 개발자 지침을 보려면 [Merchant](https://developer.apple.com/documentation/walletorders/merchant)의 내용을 참조하십시오.

![iPhone의 푸드트럭 앱의 주문 세부사항 화면 스크린샷. 화면에는 주문한 도넛 목록이 표시됨. 목록 위에는 가맹점에 메시지 또는 이메일을 보내거나, 온라인 지원을 받거나, 고객 서비스 센터에 문의할 수 있는 버튼이 포함된 오버레이가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-ot-contacts@2x.png)

**사람들이 배송 조회를 할 수 있도록 하십시오.** 다중 항목 주문에는 여러 이행(배송 또는 픽업)이 있을 수 있습니다. 예를 들어, 고객이 신발 한 켤레와 티셔츠 한 장을 주문하는 경우, 고객은 한 제품은 배송받고 다른 제품은 직접 픽업하기를 원할 수 있습니다. 이행 유형에 관계없이 사람들이 제품의 현재 위치와 지정된 목적지에 도착할 예상 시기를 알 수 있도록 충분한 정보를 제공해야 합니다. 예상 도착 시간 외에도 사람들이 특히 선호하는 일부 정보는 다음과 같습니다.

- 배송업체 웹사이트의 배송 이행 정보 페이지가 열리는 링크. 가능하다면 사람들이 최신 배송 정보를 쉽게 볼 수 있도록 추적 번호 외에도 바로가기 링크를 제공하십시오. 필요한 경우, 주문 추적을 위해 열리는 중간 페이지에 이 링크를 표시하십시오.
- 픽업 이행 시 주문을 픽업할 때 필요한 스캔 가능한 바코드. 사람들이 이메일이나 웹 페이지에서 바코드를 찾는 대신 지갑 앱에서 바코드를 제공할 수 있으면 편리합니다.
- 사람들이 주문한 상품을 수령하거나 픽업하는 데 도움이 되는 명확하고 상세한 지침.

![iPhone의 푸드트럭 앱의 주문 이행 화면 스크린샷. 화면 상단에는 접수된 주문 정보가 표시되며, 주문이 내일 도착함을 나타냄. 화면에는 배송 주소, 발송 추적 링크, 주문한 항목 목록 및 추가 주문 세부사항이 포함되어 있음. 화면 하단에는 접수된 또 다른 주문이 표시되며, 이는 픽업 준비가 완료됨. 배송 주소 대신 바코드 버튼 및 픽업 주소가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-ot-status-pickup-details@2x.png)

**이행 화면이 주문 추적에 중점을 두도록 하십시오.** 예를 들어, 고객에게 앱이나 다른 서비스를 추천하는 경우 화면의 다른 콘텐츠보다 주문 추적 정보를 우선시해야 합니다.

**확인된 배송 프로세스의 세부사항과 일치하는 배송 이행 값을 선택하십시오.** 배송업체를 알고 있는 경우, `carrier` 속성에 해당 이름을 입력하십시오. 그렇지 않은 경우 기본 ‘발송 추적’ 값을 그대로 두십시오. 배송업체의 중간 배송 단계(예: 주문 이행이 진행 중이거나 배달이 출발한 경우)에 대한 세부사항에 접근할 수 있는 경우, `onTheWay`, `outForDelivery` 또는 `delivered` 등의 특정 상태 값을 사용하여 각 단계를 나타내십시오. 이와 반대로, 배송업체의 배송 세부사항에 접근할 수 없는 경우 `shipped` 상태를 사용하십시오. 두 경우 모두 사람들이 직접 주문을 추적할 수 있도록 추적 링크(사용 가능한 경우)를 제공하십시오. 개발자 지침을 보려면 [ShippingFulfillment](https://developer.apple.com/documentation/walletorders/shippingfulfillment)의 내용을 참조하십시오.

**관련된 이행 상태 설명을 통해 고객에게 계속 정보를 제공하십시오.** 좋은 상태 메시지는 이해하기 쉽고 정확하며 설명된 상태와 명확하게 관련되어 있습니다. 사람들이 주문 상태를 이해할 수 있도록 정보를 제공하는 것 외에도 상태 메시지는 브랜드의 커뮤니케이션 스타일을 활용할 수 있는 기회도 제공합니다.

**‘문제’ 또는 ‘취소됨’ 상태의 경우 직접적이고 철저하게 설명하십시오.** 사람들은 일반적으로 문제가 발생한 이유와 해결 방법을 알아야 합니다.

## 신원 확인

iOS 16 이상을 실행하는 iPhone에서 사람들은 지갑 앱에 신분증을 저장할 수 있으며, 나중에 앱이나 앱 클립이 신분증 정보에 접근하여 현재 맥락에서 벗어나지 않고 신원을 확인할 수 있습니다. 예를 들어, 은행 앱에서 신용 카드를 신청할 때 신원을 확인해야 할 수 있습니다. 직접 모바일 신분증 확인을 지원하는 방법을 알아보려면 [ID 검증자](https://developer.apple.com/kr/design/human-interface-guidelines/id-verifier)의 내용을 참조하십시오.

> **개발자 참고 사항:** Apple은 사람들이 지갑 앱에 추가하는 ID 문서를 생성하거나 보지 않으며, 사람들이 신원 정보를 앱과 공유하는 데 동의하면 기기에서 읽을 수 없는 암호화된 데이터만 받게 됩니다. 개발자 지침을 보려면 [Requesting identity data from a Wallet pass](https://developer.apple.com/documentation/passkit/requesting-identity-data-from-a-wallet-pass)의 내용을 참조하십시오.

사람들이 신뢰할 수 있는 일관적인 경험을 제공할 수 있도록 Apple은 신원 확인을 요청해야 할 때 앱에서 사용할 수 있는 ‘지갑으로 확인’ 버튼을 제공합니다. 이 버튼을 통해 해당 요청을 설명하는 시트가 표시되고 사람들이 정보를 공유하는 데 동의하거나 취소할 수 있습니다.

**기기가 지원하는 경우에만 지갑 확인 옵션을 표시하십시오.** 현재 기기가 요청된 신원 정보를 반환할 수 없는 경우, ‘Apple 지갑으로 확인’ 버튼을 표시하지 마십시오. ‘Apple 지갑으로 확인’을 사용할 수 없는 경우 다른 확인 방법을 제공하는 대체 보기를 표시할 준비를 하십시오. 개발자 지침을 보려면 [VerifyIdentityWithWalletButton](https://developer.apple.com/documentation/passkit/verifyidentitywithwalletbutton)의 내용을 참조하십시오.

**정확하게 필요한 순간에만 신원 정보를 요청하십시오.** 사람들은 개인정보 요청이 현재 동작과 관련이 없는 것처럼 보이는 경우 이를 의심할 수 있습니다. 예를 들어, 앱에 신원 확인이 필요한 경우, 이 정보가 필요한 프로세스 또는 거래를 사람들이 완료할 때까지 기다린 다음 요청하십시오. 사람들이 프로세스를 시작할 준비가 되기 전이나 계정만 생성한 경우에는 확인을 요청하지 마십시오.

**요청하는 정보가 필요한 이유를 명확하고 간결하게 설명하십시오.** 사람들이 신원 정보를 앱과 공유해야 하는 이유가 설명된 텍스트를 작성해야 합니다(이 텍스트를 *목적 문자열* 또는 *사용법 설명 문자열*이라고 함). 시스템은 사람들이 정보를 사전에 파악한 다음 결정할 수 있도록 확인 시트에 목적 문자열을 표시합니다. 다음은 몇 가지 예시입니다.

| 확인 사항 | 지원 사항 | 예시 목적 문자열 |
| --- | --- | --- |
| 신원 | 사기를 방지하기 위해 신원 증명이 법적으로 필요한 계좌 개설하기 | 연방법은 신원을 확인하고 또한 [앱 이름]이 사기를 방지할 수 있도록 이 정보를 요청함. |
| 운전 면허 | 합법적인 운전 면허가 필요한 차량 대여하기 | 해당 주법은 운전 면허를 확인하기 위해 [앱 이름]을 요청함. |

각 목적 문자열의 경우, 직접적이고 구체적이며 이해하기 쉬운 짧고 완전한 문장을 사용하십시오. 문장의 단어 첫 글자를 대문자로 시작하고, 수동태를 피하며, 끝에 마침표를 넣으십시오.

**실제로 필요한 데이터만 요청하십시오.** 현재 작업이나 동작을 완료하는 데 필요한 것보다 더 많은 데이터를 요청하는 경우 사람들이 앱에 대한 신뢰를 잃을 수 있습니다. 예를 들어, 고객이 특정 연령 이상인지 확인해야 하는 경우 연령 임계값을 지정하는 요청을 사용하며, 고객의 현재 연령이나 생년월일을 요청하지 마십시오. 개발자 지침을 보려면 [age(atLeast:)](https://developer.apple.com/documentation/passkit/pkidentityelement/age(atleast:))의 내용을 참조하십시오.

**데이터 보관 여부를 명확하게 나타내고, 보관해야 하는 경우 기간을 명시하십시오.** 사람들이 앱을 신뢰하도록 하려면 그들이 공유하는 데 동의한 개인정보를 얼마나 오래 보관해야 하는지 설명하는 것이 중요합니다. PassKit API를 사용하여 기간(예: 특정 기간, 무기한, 현재 확인을 완료하는 데 걸리는 시간 동안만)을 지정하면 시스템은 확인 시트에 설명 콘텐츠를 자동으로 표시합니다. 개발자 지침을 보려면 [PKIdentityIntentToStore](https://developer.apple.com/documentation/passkit/pkidentityintenttostore)의 내용을 참조하십시오.

**사용 사례 및 앱의 시각 디자인과 일치하는 시스템 제공 확인 버튼을 선택하십시오.** 시스템은 다양한 사용 사례를 지원하기 위해 다음과 같은 버튼 레이블을 제공합니다.

| 버튼 유형 | 다음의 경우 사용 고려 |
| --- | --- |
| ![‘Apple 지갑으로 나이 확인’ 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-button-verify-age@2x.png) | 사람의 나이를 확인한 후 앱에서 현재 거래를 완료할 수 있습니다. 예시는 자동차를 임대할 수 있는 거래입니다. |
| ![‘Apple 지갑으로 신원 확인’ 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-button-verify-identity@2x.png) | 사람의 신원을 확인한 후 앱에서 현재 거래를 완료할 수 있습니다. 예시는 렌터카 거래입니다. |
| ![‘Apple 지갑으로 계속하기’ 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-button-continue-with@2x.png) | ‘지갑으로 확인’은 확인 프로세스의 일부이며, 사람들이 사회 보장 번호나 전화번호와 같이 ‘지갑으로 확인’에서 제공되지 않는 추가 정보를 제공하도록 요청합니다. 예시에는 금융 계좌를 개설하거나 신원 조사를 수행하는 것이 포함됩니다. |
| ![‘Apple 지갑으로 확인’ 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/wallet-button-verify-with@2x.png) | 앱은 추가 단계 없이 현재 확인 흐름을 완료할 수 있지만, ‘나이 확인’, ‘신원 확인’ 및 ‘계속하기’ 버튼 레이블은 사용 사례에 적합하지 않습니다. 한 예시로는 사람들이 정부 서비스에 등록할 수 있는 앱이 있습니다. |

모든 버튼 레이블은 여러 줄의 버전으로도 제공되며, 가로 공간이 제한되면 시스템이 이를 자동으로 사용합니다. 개발자 지침을 보려면 [PKIdentityButton.Label](https://developer.apple.com/documentation/passkit/pkidentitybutton/label)의 내용을 참조하십시오.

확인 버튼은 항상 검은색 배경에 흰색 글자를 사용합니다. 버튼이 앱의 어두운 배경과 잘 대비되어야 하는 경우 밝은 윤곽선이 포함된 스타일을 선택할 수 있습니다. 또한 [cornerRadius](https://developer.apple.com/documentation/passkit/pkidentitybutton/cornerradius) 속성을 사용하여 인터페이스의 다른 관련 버튼과 일치하도록 확인 버튼의 모서리를 조절할 수 있습니다. 개발자 지침을 보려면 [PKIdentityButton.Style.blackOutline](https://developer.apple.com/documentation/passkit/pkidentitybutton/style/blackoutline)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS 또는 visionOS에 대한 추가 고려 사항은 없습니다. tvOS에서는 지원되지 않습니다.*

### watchOS

Apple Watch에서 지갑 앱은 카드의 스크롤 캐러셀에 패스를 표시합니다. 시계에 특화된 앱을 생성하지 않더라도 사람들이 패스를 Apple Watch에 추가할 수 있으므로 패스가 기기에서 어떻게 보일 수 있는지 이해하는 것이 중요합니다.

![Apple Watch의 패스 목록에서 선택된 항공편 패스 스크린샷. 패스에는 SFO발 LGA행 항공편에 대한 정보가 포함되어 있음. 목록에 있는 다음 패스는 바코드가 포함된 헬스클럽 멤버십 카드임.](https://developer.apple.com/images/com.apple.HIG/kr/watch-card-and-details@2x.png)

사람들은 Apple Watch에서 패스를 탭하여 스크롤 보기에 추가 정보를 표시하는 세부사항 화면을 나타낼 수 있습니다. 어떤 경우에는 사람들이 특정 거래를 탭하여 더 많은 정보를 확인할 수도 있습니다.

![Apple Watch의 항공편 패스 스크린샷. 패스에는 SFO발 LGA행 항공편에 대한 정보가 포함되어 있으며, QR 코드 위에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/watch-pass-design-intro@2x.png)

각 패스 스타일은 아래 표시된 기본 레이아웃 영역에 나타날 수 있는 필드 및 이미지를 지정합니다.

![Apple Watch용 패스의 기본 레이아웃이 표시된 다이어그램. 상단 행에는 로고 이미지 및 필수 항목 필드 영역이 포함되어 있음. 두 번째 행에는 기본 필드 영역이 포함되어 있음. 세 번째 행에는 보조 및 부가 필드 영역이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/watch-layout-diagram@2x.png)

일부 정보가 레이아웃 영역에 맞지 않는 경우 시스템은 스크롤 세부사항 화면에 표시합니다.

> **중요:** 모든 스타일에서 watchOS는 카드 인터페이스의 영상비에 맞게 스트립 이미지를 자르며, 다른 이미지에서 여백을 자를 수 있습니다.

**탑승**

![Apple Watch용 탑승권의 레이아웃이 표시된 다이어그램. 첫 번째 행에는 로고 이미지 및 출발 시간 또는 탑승 시간 정보가 포함되어 있음. 두 번째 행에는 출발지 및 목적지 정보가 포함되어 있음. 세 번째 행에는 승객 이름 및 좌석이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/watch-layout-boarding-pass@2x.png)

**쿠폰**

![Apple Watch용 쿠폰 패스의 레이아웃이 표시된 다이어그램. 첫 번째 행에는 로고 이미지 및 만료 날짜가 포함되어 있음. 두 번째 행에는 스트립 이미지가 포함되어 있음. 세 번째 행은 사용하지 않음.](https://developer.apple.com/images/com.apple.HIG/kr/watch-layout-coupon@2x.png)

**매장**

![Apple Watch용 매장 카드의 레이아웃이 표시된 다이어그램. 상단 첫 번째 행에는 로고 이미지 및 사용하지 않는 영역이 포함되어 있음. 두 번째 행에는 스트립 이미지가 포함되어 있음. 세 번째 행에는 회원 이름 및 번호가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/watch-layout-store-card@2x.png)

**이벤트**

![Apple Watch용 이벤트 티켓의 레이아웃이 표시된 다이어그램. 첫 번째 행에는 로고 이미지 및 이벤트 시작 날짜가 포함되어 있음. 두 번째 행에는 이벤트에 대한 정보가 포함되어 있음. 세 번째 행에는 참석자 이름 및 좌석 위치가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/watch-layout-event-ticket@2x.png)

**일반**

![Apple Watch용 일반 패스의 레이아웃이 표시된 다이어그램. 첫 번째 행에는 로고 이미지 및 만료 날짜가 포함되어 있음. 두 번째 행에는 스트립 이미지가 포함되어 있음. 세 번째 행에는 이름 및 번호가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/watch-layout-generic-pass@2x.png)

## 리소스

#### 관련 콘텐츠

[Apple Pay](https://developer.apple.com/kr/design/human-interface-guidelines/apple-pay)

[ID 검증자](https://developer.apple.com/kr/design/human-interface-guidelines/id-verifier)

#### Developer 문서

[FinanceKitUI](https://developer.apple.com/documentation/financekitui)

[FinanceKit](https://developer.apple.com/documentation/financekit)

[PassKit (Apple Pay and Wallet)](https://developer.apple.com/documentation/passkit)

[Wallet Passes](https://developer.apple.com/documentation/walletpasses)

[Wallet Orders](https://developer.apple.com/documentation/walletorders)

#### 비디오

- [지갑의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2026/209) — Apple 지갑 패스용 최신 디자인 업데이트와 개발자 도구를 살펴보세요. 풍부하고 생동감 넘치는 디자인을 위한 멋진 새 스타일로 패스를 새롭게 디자인해 보세요. 새로운 바코드 형식과 유연한 패스 동작 API를 알아보세요. 대규모로 패스를 디자인, 맞춤화, 배포하는 과정을 간소화하는 강력한 도구인 Pass Designer와 Pass Builder를 만나 보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2026년 6월 8일 | iOS 27 및 Pass Designer 앱의 지침을 반영하도록 업데이트됨. |
| 2025년 1월 17일 | 패스 이미지 크기에 대한 명세가 추가됨. |
| 2024년 12월 18일 | 포스터 이벤트 티켓 스타일에 대한 지침이 추가됨. |
| 2023년 9월 12일 | 사람들이 지갑 앱에 주문을 추가할 수 있는 방법에 대한 지침이 추가됨. |
| 2023년 2월 20일 | 주문 추적 정보를 표시하는 방법에 대한 지침이 향상되고 아트워크가 추가됨. |
| 2022년 11월 30일 | 배송 이행에 대한 상태 정보에 배송업체의 이름을 포함하도록 지침이 추가됨. |
| 2022년 9월 14일 | ‘지갑으로 확인’ 사용에 대한 지침이 추가되고, 배송 상태 값 및 설명 제공에 대한 지침이 업데이트되고, 지침이 한 페이지로 통합됨. |
