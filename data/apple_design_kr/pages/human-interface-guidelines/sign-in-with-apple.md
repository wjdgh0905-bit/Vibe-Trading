# Apple로 로그인

Source: https://developer.apple.com/kr/design/human-interface-guidelines/sign-in-with-apple

> ‘Apple로 로그인’은 앱 및 웹사이트에 로그인할 수 있는 빠르고 개인적인 방법을 제공하여 사람들이 신뢰할 수 있는 일관적인 경험과 여러 계정 및 암호를 기억하지 않아도 되는 편리함을 누릴 수 있습니다.

![Apple 로고의 스케치가 ‘Apple로 로그인’을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-SIWA-intro@2x.png)

‘Apple로 로그인’을 지원하면 사람들이 기존 Apple 계정을 사용하여 로그인하거나 등록할 수 있으며, 양식 작성, 이메일 주소 확인 및 암호 선택을 건너뛸 수 있습니다. 이름 및 이메일 주소를 요청하도록 선택하는 경우, 사람들은 개인 이메일 주소로 메시지를 자동으로 전달하는 고유한 임의의 이메일 주소를 공유할 수 있는 옵션이 있습니다. 개발자 지침을 보려면 [Authentication Services](https://developer.apple.com/documentation/authenticationservices)의 내용을 참조하십시오.

Apple이 아닌 플랫폼을 포함하여 모든 플랫폼에서 모든 버전의 앱이나 웹사이트에 ‘Apple로 로그인’을 제공할 수 있습니다.

‘Apple로 로그인’을 사용하면 사람들이 Face ID, Touch ID 또는 Optic ID로 쉽게 인증할 수 있으며 추가적인 보안을 제공하기 위해 이중 인증이 내장되어 있습니다. Apple은 앱에서 사람이나 그들의 활동을 프로파일링하는 데 ‘Apple로 로그인’을 사용하지 않습니다.

## ‘Apple로 로그인’ 제공하기

사람들이 가장 편리하게 사용하도록 ‘Apple로 로그인’을 제공하려면 다음 지침을 따르십시오.

**중요한 경우에만 사람들에게 로그인하도록 요청하십시오.** 사람들은 로그인을 요청받는 이유를 이해해야 하므로 로그인 이점에 대한 짧고 이해하기 쉬운 설명을 표시하는 것이 좋습니다. 예를 들어, 로그인하면 앱 경험을 개인 맞춤화하거나, 추가 기능에 접근하거나, 데이터를 동기화할 수 있음을 사람들에게 알리는 것이 좋습니다.

**가능한 한 나중에 로그인하도록 하십시오.** 사람들은 유용한 무언가를 수행하기 전에 로그인하도록 강요받으면 대개는 앱을 더 이상 사용하지 않습니다. 로그인을 요청하기 전에 사람들이 앱에 대해 익숙해질 수 있는 기회를 제공하십시오. 예를 들어, 라이브 스트리밍 앱을 사용하면 사람들이 무언가를 스트리밍하기 위해 로그인하기 전에 사용 가능한 콘텐츠를 탐색할 수 있습니다.

**계정이 필요한 경우, 로그인 옵션을 제공하기 전에 사람들에게 계정을 설정하도록 요청하십시오.** 계정을 요청하는 이유를 설명하는 것부터 시작하십시오. 그런 다음 사람들이 계정 설정을 완료한 후, ‘Apple로 로그인’ 및 지원되는 다른 로그인 방법을 제공하여 새로운 계정에 로그인하는 편리한 방법을 선택하도록 하십시오.

**사람들이 기존 계정을 ‘Apple로 로그인’에 연결하도록 허용하는 것을 고려하십시오.** 이러한 유형의 연결을 지원하면 사람들은 이미 설정한 계정의 정보에 대한 접근을 유지하면서 ‘Apple로 로그인’을 사용하는 편리함을 누릴 수 있습니다. 사람들이 기존 계정에 로그인하기 전이나 후에 계정 연결을 제공할 수 있습니다. 예를 들어 다음과 같습니다.

- 사람들이 ‘Apple로 로그인’을 통해 이메일 주소를 공유하고 기존 계정의 주소와 일치하는 경우, ‘Apple로 로그인’을 해당 계정에 연결하도록 제안할 수 있습니다.
- 사람들이 기존 사용자 이름 및 암호를 사용하여 로그인한 경우, 계정의 설정 보기나 다른 논리적 장소에 계정 연결 제안을 표시할 수 있습니다.

**상업 앱에서는 사람들이 구입을 할 때까지 기다린 다음 계정을 생성하도록 요청하십시오.** 방문자 결제 시스템을 지원하는 경우, 거래가 완료된 후 사람들이 계정을 빠르게 생성할 수 있는 방법을 제공하십시오. 예를 들어, Apple Pay를 지원하는 경우 사람들이 주문 확인 페이지에서 계정을 생성할 수 있도록 하십시오. 사람들이 Apple Pay 거래 중에 이미 이름 및 이메일 주소를 제공한 경우, 이 정보를 요청할 필요가 없습니다.

![iPhone의 주문 확인 페이지를 나타내는 일러스트. 화면에는 ‘계정 생성’ 및 ‘Apple로 등록’이라는 제목이 지정된 버튼이 포함됨.](https://developer.apple.com/images/com.apple.HIG/kr/create-account-after-purchase@2x.png)

**‘Apple로 로그인’이 완료되면 즉시 새로운 계정을 사용할 수 있도록 하십시오.** 사람들이 새로운 계정을 바로 사용할 수 있도록 도움을 주며, 필요하지 않은 정보를 요청하여 경험을 지연시키지 마십시오.

**사람들의 현재 로그인 상태를 나타내십시오.** 설정 또는 계정 인터페이스와 같은 위치에 ‘‘Apple로 로그인’ 사용하기’와 같은 문구를 표시하여 사람들이 로그인 방법을 확인하도록 도와줄 수 있습니다.

## 데이터 수집하기

사람들은 개인정보 보호 및 편의를 위해 ‘Apple로 로그인’을 사용하고 싶어 합니다. 일부 앱 또는 웹사이트에는 생년월일이나 거주 지역과 같은 추가 정보가 필요할 수 있지만, 사람들이 계정을 설정할 때 데이터 요청을 최소화하는 것이 중요합니다. 추가 데이터가 필요한 이유를 설명하고 수신된 데이터를 명확하게 표시하여 ‘Apple로 로그인’에 대한 신뢰를 구축하십시오.

**요청된 추가 데이터가 필요한 것인지 아니면 단순히 권장되는 것인지 명확히 하십시오.** 데이터가 법적 또는 계약상 필요한 경우(예: 서비스 약관 동의, 거주 국가 또는 지역, 생년월일 또는 지역의 실제 신원법에서 요구하는 정보 등), 계정 설정을 완료하기 위해 추가 정보를 제공해야 한다는 것을 사람들이 이해할 수 있도록 하십시오. 추가 데이터가 필요하지 않지만 사용자 경험을 향상할 수 있는 경우, 사람들에게 요청이 선택 사항이라는 것을 알리고 정보 제공의 이점을 이해할 수 있도록 도와주십시오.

**사람들에게 암호를 제공하도록 요청하지 마십시오.** ‘Apple로 로그인’의 주요 이점은 사람들이 추가 암호를 생성하고 암기할 필요가 없다는 것입니다. 사람들이 앱 또는 웹사이트에서 ‘Apple로 로그인’ 사용을 중단하는 것이 아니라면 암호를 요청하지 마십시오.

**사람들이 비공개 릴레이 주소를 제공할 때 개인 이메일 주소를 요청하지 마십시오.** ‘Apple로 로그인’을 사용하면 사람들은 확인된 개인 이메일 계정으로 메시지를 자동으로 전달하는 비공개 릴레이 주소를 공유하도록 선택할 수 있습니다. 이 선택을 따르며 개인 이메일 주소를 요청하여 이를 무시하지 않는 것이 중요합니다. 이메일 주소를 통해 신원 확인이 필요한 고객 서비스, 소매업 또는 기타 경험을 제공하는 경우, 다음을 수행할 수 있습니다.

- 사람들이 앱 또는 웹사이트에서 자신의 비공개 릴레이 주소를 볼 수 있는지 확인
- 사람들을 설정 > Apple 계정 > 암호 및 보안 > Apple 계정을 사용하는 앱으로 안내하여 자신의 비공개 릴레이 주소 검색
- 구입의 일부로 수집된 주문 번호나 전화번호와 같은 다른 식별 값 사용

**선택적 데이터를 요청하기 전에 사람들이 앱에 참여할 수 있는 기회를 부여하십시오.** 사람들이 앱을 사용할 때 더 많은 정보를 공유하면 혜택을 누릴 수 있는 부분을 발견하도록 도울 수 있습니다. 예를 들어, 실시간 문자 업데이트를 원하는 경우 연락처 전화번호를 제공하거나, 친구들과 게임을 플레이하려는 경우 소셜 네트워크 정보를 제공하는 것을 제안할 수 있습니다. 사람들이 선택적 정보를 제공하지 않도록 선택하는 경우, 그들이 자신의 계정에 접근하거나 앱의 모든 기능을 사용하는 것을 방해하지 마십시오.

**수집하는 데이터에 관해 투명하게 처리하십시오.** 사람들은 공유한 데이터를 어떻게 사용하는지 아는 것을 중요하게 생각합니다. 투명하게 처리할 수 있는 한 가지 방법은 공유한 이름 또는 이메일 주소를 사용하여 사람들을 환영하는 것입니다. 이렇게 하면 이 정보를 어떻게 사용하는지 확실히 하는 데 도움이 되며, 릴레이 주소의 경우 사람들에게 나중에 해당 정보를 찾을 수 있는 위치가 표시됩니다. 사람들이 제공하는 모든 데이터가 표시되지 경우, 그들은 왜 해당 데이터를 제공하도록 요청받았는지 궁금해할 수 있습니다.

## 버튼 표시하기

Apple은 사람들이 계정을 설정하고 로그인하는 데 사용할 수 있는 몇 가지 ‘Apple로 로그인’ 버튼을 제공합니다. 필요한 경우, 사용자 설정 버튼을 생성하여 ‘Apple로 로그인’을 제공할 수 있습니다. 지침을 보려면 [사용자 설정 ‘Apple로 로그인’ 버튼 생성하기](https://developer.apple.com/kr/design/human-interface-guidelines/sign-in-with-apple#Creating-a-custom-Sign-in-with-Apple-button)의 내용을 참조하십시오.

**‘Apple로 로그인’ 버튼을 눈에 띄게 표시하십시오.** ‘Apple로 로그인’ 버튼을 다른 로그인 버튼보다 작지 않게 만들고, 사람들이 버튼을 보기 위해 스크롤하지 않도록 하십시오.

### 시스템 제공 버튼 사용하기

시스템 제공 API를 사용하여 ‘Apple로 로그인’ 버튼을 생성하면 다음과 같은 이점을 누릴 수 있습니다.

- Apple이 승인한 모양을 사용할 수 있는 버튼
- 스타일을 변경해도 버튼의 콘텐츠가 이상적인 비율 유지
- 버튼의 제목을 기기에서 지정된 언어로 자동 번역
- UI 스타일(iOS, macOS 및 웹)에 맞게 버튼의 모서리 반경을 구성하도록 지원
- VoiceOver가 버튼을 설명할 수 있는 시스템 제공 대체 텍스트 레이블

개발자 지침을 보려면 [ASAuthorizationAppleIDButton](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidbutton)(iOS, macOS 및 tvOS), [WKInterfaceAuthorizationAppleIDButton](https://developer.apple.com/documentation/watchkit/wkinterfaceauthorizationappleidbutton)(watchOS) 및 [Displaying Sign in with Apple buttons on the web](https://developer.apple.com/documentation/signinwithapple/displaying-sign-in-with-apple-buttons-on-the-web)의 내용을 참조하십시오. [Sign in with Apple button](https://appleid.apple.com/signinwithapple/button)을 방문하여 웹 기반 버튼의 실시간 미리보기를 보고 조절하며 코드를 가져올 수 있습니다.

시스템은 버튼 제목의 몇 가지 버전을 제공합니다. 콘텐츠가 실행되는 플랫폼에 따라 로그인 경험의 용어에 맞는 버전을 선택하고 해당 버전을 인터페이스 전체에서 일관적으로 사용하십시오.

다음 버튼 제목은 iOS, macOS, tvOS 및 웹에서 사용할 수 있습니다.

![Apple 로고 및 ‘Apple로 로그인’이라는 텍스트가 포함된 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/apple-account-sign-in-with@2x.png)

![Apple 로고 및 ‘Apple로 등록’이라는 텍스트가 포함된 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/apple-account-sign-up-with@2x.png)

![Apple 로고 및 ‘Apple로 계속하기’라는 텍스트가 포함된 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/apple-account-continue-with@2x.png)

watchOS의 경우 시스템은 ‘ 로그인’이라는 하나의 제목을 제공합니다.

![Apple 로고 및 ‘로그인’이라는 텍스트가 포함된 watchOS용 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/apple-account-watch-44mm-no-background@2x.png)

플랫폼에 따라 시스템은 ‘Apple로 로그인’ 버튼의 모양에 대해 최대 세 가지 옵션을 제공하며, 흰색, 윤곽이 있는 흰색, 검은색이 있습니다. 버튼이 표시되는 배경에 가장 적합한 모양을 선택하십시오.

#### 흰색

흰색 스타일은 모든 플랫폼 및 웹에서 사용할 수 있습니다. 충분한 대비를 제공하는 어두운 배경에 이 스타일을 사용하십시오.

![어두운 음영이 있는 배경에 올바르게 위치한 흰색 버튼 일러스트. 버튼에는 Apple 로고 및 ‘Apple로 로그인’이라는 텍스트가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/apple-account-white-yes@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![밝은 음영이 있는 배경에 잘못 위치한 흰색 버튼 일러스트. 버튼에는 Apple 로고 및 ‘Apple로 로그인’이라는 텍스트가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/apple-account-white-no@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

#### 윤곽이 있는 흰색

윤곽으로 표시된 흰색 스타일은 iOS, macOS 및 웹에서 사용할 수 있습니다. 흰색 버튼 채우기와 충분한 대비를 제공하지 않는 흰색 또는 밝은 색상 배경에 이 스타일을 사용하십시오. 검은색 윤곽은 시각적 혼란을 더할 수 있기 때문에 어둡거나 채도가 높은 배경에는 이 스타일을 사용하지 마십시오. 그 대신, 어두운 배경과 대비되려면 [흰색](https://developer.apple.com/kr/design/human-interface-guidelines/sign-in-with-apple#White) 스타일을 사용하십시오.

![밝은 음영이 있는 배경에 올바르게 위치한 윤곽이 있는 흰색 버튼 일러스트. 버튼에는 Apple 로고 및 ‘Apple로 로그인’이라는 텍스트가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/apple-account-outline-yes@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![어두운 음영이 있는 배경에 잘못 위치한 윤곽이 있는 흰색 버튼 일러스트. 버튼에는 Apple 로고 및 ‘Apple로 로그인’이라는 텍스트가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/apple-account-outline-no@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

#### 검은색

검은색 스타일은 모든 플랫폼 및 웹에서 사용할 수 있습니다. 충분한 대비를 제공하는 흰색이나 밝은 색상 배경에 이 스타일을 사용하며, 검은색이나 어두운 배경에는 사용하지 마십시오.

![밝은 음영이 있는 배경에 올바르게 위치한 검은색 버튼 일러스트. 버튼에는 Apple 로고 및 ‘Apple로 로그인’이라는 텍스트가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/apple-account-black-yes@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![어두운 음영이 있는 배경에 잘못 위치한 검은색 버튼 일러스트. 버튼에는 Apple 로고 및 ‘Apple로 로그인’이라는 텍스트가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/apple-account-black-no@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

다른 플랫폼의 검은색 ‘Apple로 로그인’ 버튼과 달리 watchOS 버튼은 완전히 검은색이 아닌 채우기 색상을 사용합니다. Apple Watch의 검은색 배경과 대비되도록 watchOS 버튼은 시스템 정의된 어두운 회색 모양을 사용합니다.

![검은색 배경에 어두운 음영이 있는 watchOS용 버튼 일러스트로, Apple 로고 및 ‘로그인’이라는 텍스트가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/apple-account-watch-44mm@2x.png)

#### 버튼 크기 및 모서리 반경

**앱의 다른 버튼의 모양에 맞게 모서리 반경을 조절하십시오.** 기본적으로 ‘Apple로 로그인’ 버튼은 모서리가 둥급니다. iOS, macOS 및 웹에서는 모서리 반경을 변경하여 모서리가 직각인 버튼이나 캡슐 모양의 버튼을 생성할 수 있습니다. 개발자 지침을 보려면 [cornerRadius](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidbutton/cornerradius)(iOS 및 macOS) 및 [Displaying Sign in with Apple buttons on the web](https://developer.apple.com/documentation/signinwithapple/displaying-sign-in-with-apple-buttons-on-the-web)의 내용을 참조하십시오.

![90도 모서리의 ‘Apple로 로그인’ 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/apple-account-minimum-corner-radii@2x.png)

![기본 모서리 반경의 ‘Apple로 로그인’ 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/apple-account-default-corner-radii@2x.png)

![최대 모서리 반경의 ‘Apple로 로그인’ 버튼 일러스트로, 캡슐 같은 모양이 나타남.](https://developer.apple.com/images/com.apple.HIG/apple-account-maximum-corner-radii@2x.png)

**iOS, macOS 및 웹에서 버튼 주위에 최소 버튼 크기 및 여백을 유지하십시오.** 버튼 제목은 지역에 따라 길이가 다를 수 있다는 점에 주의하십시오. 다음 값을 지침으로 따르십시오.

| 최소 너비 | 최소 높이 | 최소 여백 |
| --- | --- | --- |
| 140pt(140px @1x, 280px @2x) | 30pt(30px @1x, 60px @2x) | 버튼 높이의 1/10 |

### 사용자 설정 ‘Apple로 로그인’ 버튼 생성하기

인터페이스에 필요한 경우, iOS, macOS 또는 웹용 사용자 설정 ‘Apple로 로그인’ 버튼을 생성할 수 있습니다. 예를 들어, 여러 로그인 버튼에서 로고를 정렬하거나, 로고만 표시하는 버튼을 사용하거나, UI에 맞게 버튼의 서체, 베젤 또는 배경 모양을 조절할 수 있습니다.

![나란히 표시된 두 개의 iPhone 일부가 포함되어 있고 로그인 화면을 보여주는 일러스트. 왼쪽 화면에는 Apple로 로그인, X로 로그인, Y로 로그인, Z로 로그인이라는 네 개의 쌓여있는 버튼이 포함되어 있음. ‘Apple로 로그인’ 버튼에는 제목 앞에 Apple 로고가 포함되어 있음. ‘X로 로그인’ 버튼에는 제목 앞에 색상으로 채워진 원이 포함되어 있음. ‘Y로 로그인’ 버튼에는 제목 앞에 색상으로 채워진 정사각형이 포함되어 있음. ‘Z로 로그인’ 버튼에는 제목 앞에 색상으로 채워진 삼각형이 포함되어 있음. 오른쪽 화면에는 ‘다음으로 로그인’이라는 머리말이 포함되어 있고, 글리프를 포함한 네 개의 정사각형 버튼이 나열된 행 위에 나타남. 첫 번째 정사각형 버튼에는 Apple 로고가 포함되어 있음. 두 번째 정사각형 버튼에는 색상으로 채워진 원이 포함되어 있음. 세 번째 정사각형 버튼에는 색상으로 채워진 정사각형이 포함되어 있음. 네 번째 정사각형 버튼에는 색상으로 채워진 삼각형이 포함되어 있음. 원, 정사각형 및 삼각형 모양은 다양한 로고를 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/custom-sign-in-screens@2x.png)

항상 사람들이 사용자 설정 버튼을 ‘Apple로 로그인’ 버튼으로 즉시 식별할 수 있도록 하십시오. 사용자 설정 버튼이 표준 버튼과 너무 많이 다른 경우, 사람들은 해당 버튼을 사용하여 계정을 설정하거나 로그인하는 데 불편함을 느낄 수 있습니다. 앱 심사에서는 모든 사용자 설정 ‘Apple로 로그인’ 버튼을 평가합니다.

[Apple Design Resources](https://developer.apple.com/design/resources/)는 로고만 표시하거나 로고 및 텍스트를 표시하는 사용자 설정 ‘Apple로 로그인’ 버튼을 생성하는 데 사용할 수 있는 다운로드 가능한 Apple 로고 아트워크를 제공합니다. 로고 파일은 PNG, SVG 및 PDF 포맷으로 제공되며, 두 가지 유형의 버튼에 대한 아트워크에는 흑백 버전이 모두 포함되어 있습니다. 다음은 흑백 로고 전용 아트워크 파일의 예시이며, 각 파일에는 가시성을 높이기 위해 배경이 추가되어 있습니다.

![흰색 정사각형 내의 검은색 Apple 로고 일러스트로, 음영이 있는 두꺼운 테두리로 둘러싸여 있음. 흰색 정사각형은 Apple 로고 및 다른 인터페이스 요소 간의 최소 여유 공간을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/siwa-black-logo-only@2x.png)

![검은색 정사각형 내의 흰색 Apple 로고 일러스트로, 밝고 두꺼운 테두리로 둘러싸여 있음. 검은색 정사각형은 Apple 로고 및 다른 인터페이스 요소 간의 최소 여유 공간을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/siwa-white-logo-only@2x.png)

다운로드 가능한 모든 로고 파일에는 버튼에 로고를 배치하는 것을 간소화하는 패딩이 포함되어 있습니다. 로고 전용 로고 파일에는 버튼을 기준으로 로고의 정확한 비율을 유지하도록 가로 및 세로 패딩이 포함되어 있습니다. 로고 및 버튼의 정확한 비율을 유지하는 패딩 외에도 텍스트가 있는 버튼의 로고 파일에는 로고와 버튼의 앞쪽 가장자리 및 제목 사이에 최소 여백을 제공하는 가로 패딩도 포함되어 있습니다.

[Apple Design Resources](https://developer.apple.com/design/resources/)에서 다운로드한 로고 아트워크만 사용하며, 사용자 설정 Apple 로고를 생성하지 마십시오. 사용자 설정 ‘Apple로 로그인’ 버튼을 생성할 때 다운로드 가능한 로고 파일 사용에 대해 다음 지침을 따르십시오.

- 로고 파일을 사용하여 Apple 로고를 버튼에 배치하며, Apple 로고를 버튼으로 사용하지 마십시오.
- 로고 파일의 높이를 버튼의 높이와 일치시키십시오.
- 로고 파일을 자르지 마십시오.
- 세로 패딩을 추가하지 마십시오.

사용자 설정 버튼이 시스템 제공 ‘Apple로 로그인’ 버튼과 시각적으로 일관적인지 확인하려면 다음 속성을 변경하지 마십시오.

- 제목. *Apple로 로그인*, *Apple로 등록* 또는 *Apple로 계속하기*만 사용하십시오.
- 일반적인 모양. 로고와 텍스트가 결합된 버튼은 항상 직사각형이며, 로고 전용 버튼은 원형 또는 직사각형일 수 있습니다.
- 로고 및 제목 색상. 버튼 내에서 두 항목 모두 검은색 또는 흰색이어야 하며, 사용자 설정 색상을 사용하지 마십시오.

앱 디자인에 맞게 다음을 변경할 수 있습니다.

- 제목 서체. 서체 굵기 및 크기를 조절할 수도 있습니다.
- 제목식 대문자 표기법. 제목의 모든 문자를 대문자로 만들 수 있습니다.
- 배경 모양. 전체 색상은 검은색 또는 흰색으로 유지해야 합니다. 필요한 경우, 버튼이 인터페이스와 조화를 이룰 수 있도록 미세한 텍스처 또는 그라디언트를 포함할 수 있습니다.
- 버튼 모서리 반경. UI의 다른 버튼과 일치하도록 모서리 반경 값을 사용할 수 있습니다.
- 버튼 베젤 및 그림자. 예를 들어, 선을 사용하여 버튼 베젤을 강조하거나 드롭 그림자를 추가할 수 있습니다.

#### 로고 및 텍스트가 있는 사용자 설정 버튼

**버튼의 높이에 따라 로고 파일의 포맷을 선택하십시오.** SVG 및 PDF는 벡터 기반 포맷이기 때문에 모든 높이의 버튼에서 이 파일을 사용할 수 있습니다. iOS의 기본(및 권장) 버튼 높이인 44포인트 높이의 버튼에서만 PNG 파일을 사용하십시오. 로고는 소형, 중형 및 대형 크기로 제공되므로, 표시되는 모든 등록 버튼의 로고 크기를 일치시킬 수 있습니다.

**가급적 제목(Apple로 로그인, Apple로 등록, Apple로 계속하기)에 시스템 서체를 사용하십시오.** 선택한 서체에 관계없이 사용자 설정 버튼의 제목 및 버튼 높이는 시스템이 사용하는 것과 동일한 비율을 사용해야 합니다. 예를 들어, 시스템 서체를 사용하면 제목의 서체 크기는 버튼 높이의 43%가 됩니다. 즉, 버튼 높이는 제목의 서체 크기의 233%가 되며, 가장 가까운 정수로 반올림됩니다. 다음은 시스템 서체의 다양한 크기를 사용하여 이러한 비율을 보여주는 두 가지 예시입니다.

![44포인트의 버튼 높이 및 19포인트의 서체 크기를 표시하는 설명이 포함된 ‘Apple로 로그인’ 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/left-aligned-correct-proportions-2@2x.png)

![56포인트의 버튼 높이 및 24포인트의 서체 크기를 표시하는 설명이 포함된 ‘Apple로 로그인’ 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/left-aligned-correct-proportions-1@2x.png)

**일반적으로 제목의 대문자 표기법 스타일을 유지하십시오.** 기본적으로 버튼 제목의 모든 버전은 첫 번째 단어(즉, *Sign* 또는 *Continue*) 및 *Apple*을 대문자로 시작하며, 다른 모든 문자는 소문자입니다. 인터페이스가 대문자만 사용하는 경우가 아니라면 이 스타일을 변경하지 마십시오.

**버튼 내에 제목 및 로고를 수직으로 정렬하십시오.** 이렇게 하려면 제목을 버튼 중앙에 수직으로 정렬한 다음 로고 이미지를 추가하여 해당 높이가 버튼의 높이와 일치하는지 확인하십시오. 로고 이미지에는 상단과 하단 패딩이 포함되어 있기 때문에 버튼의 제목을 수직으로 정렬하면 제목, 로고 및 버튼이 올바르게 정렬된 상태로 유지됩니다.

**필요한 경우 로고를 삽입하십시오.** Apple 로고를 다른 인증 로고와 가로로 정렬해야 하는 경우, 로고와 버튼의 앞쪽 가장자리 사이의 공간을 조절할 수 있습니다.

**제목과 버튼의 오른쪽 가장자리 사이의 최소 여백을 유지하십시오.** 여백의 크기가 버튼 너비의 8% 이상이어야 합니다.

**최소 버튼 크기와 버튼 주위의 여백을 유지하십시오.** 버튼 제목은 지역에 따라 길이가 다를 수 있다는 점에 주의하십시오. 다음 값을 지침으로 따르십시오.

| 최소 너비 | 최소 높이 | 최소 여백 |
| --- | --- | --- |
| 140pt(140px @1x, 280px @2x) | 30pt(30px @1x, 60px @2x) | 버튼 높이의 1/10 |

#### 사용자 설정 로고 전용 버튼

**버튼의 크기에 따라 로고 파일의 포맷을 선택하십시오.** 로고 전용 버튼의 다운로드 가능한 아트워크는 SVG, PDF 및 PNG 포맷으로 제공됩니다. 모든 크기의 버튼에는 벡터 기반 SVG 및 PDF 포맷을 사용하며, PNG 포맷은 44x44pt 크기의 버튼에서만 사용하십시오.

**로고 전용 이미지에 가로 패딩을 추가하지 마십시오.** 로고 전용 ‘Apple로 로그인’ 버튼의 영상비는 항상 1:1이며, 아트워크에는 이미 정확한 패딩이 모든 측면에 포함되어 있습니다.

**마스크를 사용하여 로고 전용 이미지의 기본 정사각형 모양을 변경하십시오.** 예를 들어, 원형 또는 모서리가 둥근 직사각형 모양을 사용하여 모든 로고 전용 로그인 버튼을 표시할 수 있습니다. 내장 패딩을 줄이거나 자체 로고를 사용하기 위해 Apple 제공 아트워크를 자르지 말고, 추가 패딩을 포함하지 마십시오.

![로고 전용 ‘Apple로 로그인’ 버튼 일러스트. 버튼에는 Apple 로고만 포함되어 있으며 버튼이 둥근 모서리를 지님.](https://developer.apple.com/images/com.apple.HIG/kr/siwa-logo-masked-rounded-rect@2x.png)

![로고 전용 ‘Apple로 로그인’ 버튼 일러스트. 버튼에는 Apple 로고만 포함되어 있으며 버튼이 직각 모서리를 지님.](https://developer.apple.com/images/com.apple.HIG/kr/siwa-logo-default@2x.png)

![로고 전용 ‘Apple로 로그인’ 버튼 일러스트. 버튼에는 Apple 로고만 포함되어 있으며 버튼이 원형임.](https://developer.apple.com/images/com.apple.HIG/kr/siwa-logo-masked-circle@2x.png)

**버튼 주위에 최소 여백을 유지하십시오.** 여백의 크기가 버튼 높이의 1/10 이상이어야 합니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

## 리소스

#### 관련 콘텐츠

[Sign in with Apple button](https://appleid.apple.com/signinwithapple/button)

#### Developer 문서

[Authentication Services](https://developer.apple.com/documentation/authenticationservices)

[Displaying Sign in with Apple buttons on the web](https://developer.apple.com/documentation/signinwithapple/displaying-sign-in-with-apple-buttons-on-the-web) — Sign in with Apple

#### 비디오

- [암호보다 더 안전한 방법으로 보호하기](https://developer.apple.com/kr/videos/play/wwdc2021/10106) — 암호는 널리 사용되고 있지만, 암호가 가지는 취약점으로 인해 사용자의 온라인 계정을 보호하는 데는 근본적으로 한계가 있습니다. 암호로 인해 발생하는 최신 보안 관련 문제와 이를 극복하는 방법에 대해 자세히 알아보세요. 웹 인증 표준을 사용하여 안전하게 설계된 공개 키 기반 자격 증명으로 계정을 안전하게 보호하는 새로운 기술을 확인하세요. 이 기술 미리보기에서는 Apple이 iOS 15와 macOS Monterey에서 이 표준을 어떻게 적용하고 있는지도 다룹니다.
- [tvOS 앱의 로그인 간소화하기](https://developer.apple.com/kr/videos/play/wwdc2021/10279) — iOS 또는 iPadOS 기기에서 Face ID 또는 Touch ID를 사용하여 구매를 승인하고 tvOS 앱에 로그인하는 방법을 알아보세요. 앱 사용자가 원하는 콘텐츠를 더 빨리 즐길 수 있도록 로그인 프로세스를 간소화하는 방법을 알아보세요. 간소화된 로그인 프로세스를 설정하는 방법을 안내하고 Apple TV에서 근사한 로그인 환경을 만들기 위한 몇 가지 모범 사례를 소개합니다. 이 세션을 최대한 활용하려면 관련 도메인과 Authentication Services 프레임워크에 대한 기본적인 지식을 숙지하는 것이 좋습니다.
- [Apple로 로그인 소개](https://developer.apple.com/kr/videos/play/wwdc2019/706) — Apple로 로그인 기능으로 사용자는 이미 보유한 Apple ID를 사용하여 앱에 빠르고 쉽게 로그인할 수 있습니다. 앱이나 웹사이트에 Apple로 로그인 버튼을 간편하게 추가하는 방법을 숙지하여 새로운 고객을 확보하고 Apple로 로그인이 제공하는 내장된 보안, 사기 방지 및 개인정보 보호 기능을 누리세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2022년 9월 14일 | 기존 계정을 지원하고, 사람들이 새로운 계정을 설정하도록 하고, 현재 로그인 상태를 나타내는 방법에 대한 지침이 개선됨. 지침이 한 페이지로 통합됨. |
