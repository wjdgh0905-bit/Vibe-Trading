# 개인정보 보호

Source: https://developer.apple.com/kr/design/human-interface-guidelines/privacy

> 개인정보 보호는 가장 중요한 일입니다. 요청한 개인정보 보호 관련 데이터 및 리소스에 관해 투명하게 처리하는 것이 중요하며, 사람들이 접근을 허용한 데이터를 보호하는 것이 필수적입니다.

![똑바로 세운 손 스케치가 보호를 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 노란색을 은은하게 반영하는 노란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/foundations-privacy-intro@2x.png)

사람들은 지극히 개인적인 방식으로 기기를 사용하며 앱이 개인정보 보호를 유지하는 데 도움이 되는 것을 기대합니다.

새로운 앱 또는 업데이트된 앱을 제출할 때 App Store가 제품 페이지에 정보를 표시할 수 있도록 개인정보 처리방침에 관한 세부사항 및 수집한 개인정보 보호 관련 데이터를 제공해야 합니다. ([App Store Connect](https://help.apple.com/app-store-connect/#/dev1b4647c5b)에서 언제든지 이 정보를 관리할 수 있습니다.) 사람들은 제품 페이지에 있는 개인정보 보호 세부사항을 통해 앱을 다운로드하기 전에 사전에 파악한 다음 결정할 수 있습니다. 더 알아보려면 [App privacy details on the App Store](https://developer.apple.com/app-store/app-privacy-details/)의 내용을 참조하십시오.

![앱의 App Store 제품 페이지에 있는 ‘앱이 수집하는 개인정보’ 화면 스크린샷. 화면에서 상단에 있는 카드의 제목이 ‘사용자를 추적하는 데 사용되는 데이터’이며 연락처 정보, 기타 데이터 및 식별자가 나열됨. 하단에 있는 카드의 제목이 ‘사용자에게 연결된 데이터’이며 건강 및 피트니스, 금융 정보, 연락처 정보, 구입 항목, 위치, 및 연락처가 나열됨.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-social-media-app-store-nutrition-labels@2x.png)

## 모범 사례

**실제로 필요한 데이터에만 접근을 요청하십시오.** 기능에서 필요한 것보다 더 많은 데이터를 요청하거나 기능에 대한 관심을 보이기 전에 데이터를 요청하면 사람들이 앱을 신뢰하기 어려워질 수 있습니다. 가능한 한 구체적으로 권한을 요청하여 사람들이 자신의 데이터를 정밀하게 제어하도록 하십시오.

**앱이 사람들의 데이터를 수집하고 사용하는 방식에 관해 투명하게 처리하십시오.** 사람들이 데이터 사용 계획을 정확히 이해하지 못할 경우 데이터를 앱과 공유하는 것을 불편하게 느낄 수 있습니다. ‘나의 이메일 가리기’ 및 ‘Mail 개인정보 보호’와 같은 시스템 기능을 사용하려는 사람들의 선택을 항상 존중하고 앱 추적에 관련된 의무를 이해하고 있는지 확인하십시오. Apple 개인정보 보호 기능에 관해 더 알아보려면 [Privacy](https://www.apple.com/privacy/)의 내용을 참조하고, 개발자 지침을 보려면 [User privacy and data use](https://developer.apple.com/app-store/user-privacy-and-data-use/)의 내용을 참조하십시오.

**가능한 경우 기기에서 데이터를 처리하십시오.** 예를 들어, iOS에서 Apple 뉴럴 엔진 및 사용자 설정 CreateML 모델을 활용하여 기기에서 바로 데이터를 처리할 수 있으며, 이는 원격 서버까지 길고 위험할 수 있는 왕복 이동을 방지하는 데 도움이 됩니다.

**시스템 정의 개인정보 보호를 채택하고 보안 모범 사례를 따르십시오.** 예를 들어, iOS 15 이상에서는 CloudKit를 활용하여 문자열, 숫자 및 날짜와 같이 추가 데이터 유형에 대한 암호화 및 주요 관리 기능을 제공할 수 있습니다.

## 권한 요청하기

다음은 접근 권한을 요청해야 하는 작업의 여러 가지 예시입니다.

- 위치, 건강, 금융, 연락처 및 기타 개인 식별 정보 등의 개인 데이터
- 이메일, 메시지, 캘린더 데이터, 연락처, 게임 플레이 정보, Apple Music 활동, HomeKit 데이터 및 오디오, 비디오, 사진 콘텐츠와 같은 사용자 생성 콘텐츠
- Bluetooth 주변 기기, 홈 자동화 기능, Wi-Fi 연결 및 로컬 네트워크와 같은 보호된 리소스
- 카메라 및 마이크와 같은 기기 기능
- 전체 공간에서 실행 중인 visionOS 앱에서 손 추적, 평면 추정, 이미지 고정 및 세계 추적과 같은 ARKit 데이터
- 앱 추적을 지원하는 기기의 광고 식별자

시스템은 사람들이 각 권한 요청을 볼 수 있는 표준 경고를 제공합니다. 앱에 접근 권한이 필요한 이유를 설명하는 내용을 제공하면 시스템이 경고에 해당 설명을 표시합니다. 사람들은 설정 > 개인정보 보호에서 설명을 보고 선택을 업데이트할 수도 있습니다.

**앱이 명확하게 데이터 또는 리소스에 접근해야 하는 경우에만 권한을 요청하십시오.** 사람들이 개인정보 또는 기기 기능에 대한 접근 요청을 의심하는 것은 자연스러운 일이며, 특히 명백한 필요성이 없는 경우에는 더욱 그렇습니다. 사람들이 접근이 필요한 앱 기능을 실제로 사용할 때까지 권한 요청을 기다리는 것이 가장 좋습니다. 예를 들어, 사람들이 위치 정보가 필요한 기능에 관심을 나타낸 후 [위치 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/privacy#Location-button)을 사용하여 사람들이 자신의 위치를 공유할 수 있는 방법을 제공할 수 있습니다.

**앱이 작동하는 데 데이터 또는 리소스가 필요하지 않다면 실행 시 권한을 요청하지 마십시오.** 사람들은 권한 요청을 받는 이유가 명백한 경우에는 실행 시 요청을 덜 귀찮게 느낄 수 있습니다. 예를 들어, 사람들은 내비게이션 앱을 이용하기 전에 해당 앱에서 자신의 위치에 대한 접근이 필요하다는 점을 이해합니다. 이와 비슷하게, 사람들이 주변 벽면에 가상 대상체가 부딪칠 수 있도록 하는 visionOS 게임을 플레이하기 전에 게임이 주변 환경에 관한 정보에 접근하도록 허용해야 합니다.

**앱이 요청된 기능, 데이터 또는 리소스를 사용하는 방법을 명확하게 설명하는 내용을 작성하십시오.** 표준 경고는 앱 이름 뒤에, 그리고 권한을 부여하거나 거부하기 위해 사람들이 사용하는 버튼 앞에 설명하는 내용(*목적 문자열* 또는 *사용법 설명 문자열*이라고 함)을 표시합니다. 간단하고 구체적이며 이해하기 쉬운 짧고 완전한 문장을 사용하십시오. 문장의 단어 첫 글자를 대문자로 시작하고, 수동태를 피하며, 끝에 마침표를 넣으십시오. 개발자 지침을 보려면 [Requesting access to protected resources](https://developer.apple.com/documentation/uikit/requesting-access-to-protected-resources) 및 [App Tracking Transparency](https://developer.apple.com/documentation/apptrackingtransparency)의 내용을 참조하십시오.

|  | 예시 목적 문자열 | 메모 |
| --- | --- | --- |
| ![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png) | 앱은 밤 시간 동안 코 고는 소리를 감지하기 위해 녹음합니다. | 앱이 데이터를 수집하는 방법과 이유를 명확하게 설명하는 능동형 문장입니다. |
| ![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png) | 더 나은 경험을 제공하려면 마이크 접근이 요구됩니다. | 이유가 모호하고 확실하지 않은 수동형 문장입니다. |
| ![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png) | 마이크 접근을 켜십시오. | 이유가 없는 명령형 문장입니다. |

표준 시스템 경고의 몇 가지 예시는 다음과 같습니다.

**예시 1**

![‘소셜 미디어 앱이 사용자의 위치에 접근하도록 허용하겠습니까?’라는 목적 문자열을 표시하는 소셜 미디어 앱의 권한 경고 스크린샷. 위치를 켜면 근처 게시 위치를 표시하도록 허용하는 것임. 문자열 아래에는 ‘정확한 위치 켬’ 알림이 포함된 작은 지도 이미지가 있으며 지도 아래에는 세 개의 버튼이 한 스택에 있음. 위에서부터, ‘한 번 허용’, ‘앱을 사용하는 동안 허용’ 및 ‘허용 안 함’이라는 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-social-media-post-location-alert@2x.png)

**예시 2**

![‘소셜 미디어 앱이 사용자의 사진에 접근하려고 합니다.’라는 목적 문자열을 표시하는 소셜 미디어 앱의 권한 경고 스크린샷. 보관함에서 사진을 업로드하려면 사진에 대한 접근을 허용하십시오. 문자열 뒤에는 세 개의 버튼이 한 스택에 있음. 위에서부터, ‘사진 선택’, ‘모든 사진에 대한 접근 허용’ 및 ‘허용 안 함’이라는 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-social-media-post-photo-alert@2x.png)

**예시 3**

![‘소셜 미디어 앱이 사용자의 위치에 접근하려고 합니다.’라는 목적 문자열을 표시하는 소셜 미디어 앱의 권한 경고 스크린샷. 소셜 미디어 앱을 사용하여 친구를 찾고 친구 네트워크에 추가할 수 있음. 문자열 뒤에는 두 개의 버튼인 ‘허용 안 함’ 및 ‘허용’이 나란히 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-social-media-friends-contacts-alert@2x.png)

### 사전 경고 화면, 윈도우 또는 보기

현재 상황에서 권한이 요청된 이유를 사람들이 이해하도록 하는 것이 가장 좋습니다. 추가 세부사항을 반드시 제공해야 하는 경우 시스템 경고가 나타나기 전에 사용자 설정 화면 또는 윈도우를 표시할 수 있습니다. 다음 지침은 카메라, 마이크, 위치, 연락처, 캘린더 및 추적 등 보호된 데이터 및 리소스에 접근하도록 권한을 요청하는 시스템 경고 전에 표시되는 사용자 설정 보기에 적용됩니다.

**하나의 버튼만 포함하고 해당 버튼을 누르면 시스템 경고가 열린다는 점을 명확히 하십시오.** 사용자 설정 화면 또는 윈도우에 경고를 열지 않는 버튼이 포함되면 이러한 경험은 선택을 방해하기 때문에 사람들이 조종되는 것처럼 느낄 수 있습니다. 다른 유형의 조종은 사용자 설정 화면의 버튼 제목에 ‘허용’과 같은 용어를 사용하는 것입니다. 사용자 설정 버튼의 의미와 시각적 무게감이 경고의 허용 버튼과 유사하게 보이는 경우 사람들은 의도치 않게 경고의 허용 버튼을 선택할 가능성이 높습니다. 사용자 설정 화면 또는 윈도우에서 단일 버튼의 제목에 ‘계속’ 또는 ‘다음’과 같은 용어를 사용하여 해당 동작이 시스템 경고를 여는 것임을 명확히 하십시오.

![‘위치 서비스를 켜면 다음과 같은 기능을 제공할 수 있음, 친구가 근처에 있을 때 알림, 사용자 근처에서 일어나는 이벤트 소식, 사용자의 위치 태그 지정 및 공유’라는 앱의 사전 경고 화면 스크린샷. 나중에 설정 앱에서 이 옵션을 변경할 수 있음. 텍스트 아래에는 ‘다음’이라는 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-custom-messaging-correct@2x.png)

![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**사용자 설정 화면 또는 윈도우에서 추가 동작을 포함하지 마십시오.** 예를 들어, 사람들이 시스템 경고를 보지 않고 화면 또는 윈도우에서 나갈 수 있는 방법(예: 닫거나 취소할 수 있는 옵션 제공)을 제공하지 마십시오.

![‘다음’ 버튼 아래에 나타나는 ‘취소’라는 버튼을 포함한 앱의 사전 경고 화면 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-custom-messaging-incorrect-cancel-button@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![앱의 사전 경고 화면 스크린샷. 왼쪽 상단 모서리에 닫기 버튼이 있음. 화면 하단 근처에 ‘다음’ 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-custom-messaging-incorrect-close-button@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

### 추적 요청

앱 추적은 민감한 문제입니다. 일부의 경우, 추적하는 이점을 설명하는 사용자 설정 화면 또는 윈도우를 표시하는 것이 적합할 수 있습니다. 사람들이 앱을 실행하면 바로 앱 추적을 수행하려는 경우 추적 데이터를 수집하기 전에 시스템 제공 경고를 표시해야 합니다.

**시스템 제공 경고 전에 사람들을 혼란스럽게 하거나 오해하게 할 수 있는 사용자 설정 화면 또는 윈도우를 제공하지 마십시오.** 사람들은 때때로 경고를 읽지 않고 빠르게 탭하여 닫습니다. 이러한 동작을 활용하여 선택에 영향을 미치는 사용자 설정 메시지 화면, 윈도우 또는 보기는 App Store 심사 중에 거부될 수 있습니다.

거부를 유발하는 금지된 사용자 설정 화면 디자인이 몇 가지 있습니다. 일부 예시로는 아래와 같이 인센티브를 제공하고, 요청처럼 보이는 화면 또는 윈도우를 표시하고, 경고 이미지를 표시하며, 경고 뒤의 화면에 주석을 다는 것입니다. 더 알아보려면 [App Review Guidelines: 5.1.1 (iv)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage)의 내용을 참조하십시오.

**인센티브**

![‘추적을 허용하고 다음 구입에 사용할 $100 크레딧을 받으십시오.’라는 앱의 사전 추적 메시지 스크린샷. 텍스트 아래에는 원 안에 달러 기호 이미지가 있음. 이미지 아래에는 ‘$100 크레딧 받기’라는 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-custom-messaging-prohibited-incentive@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**모방 요청**

![‘더 나은 경험을 위해 추적을 허용하십시오.’라는 앱의 사전 추적 메시지 스크린샷. 텍스트 아래에는 왼쪽에서 오른쪽으로 높이가 증가하는 네 개의 막대가 표시된 막대 그래프 이미지가 있음. 그래프 아래에는 ‘추적 허용’이라는 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-custom-messaging-prohibited-imitation@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**경고 이미지**

![‘요청을 받으면 허용을 선택하십시오.’라는 앱의 사전 추적 메시지 스크린샷. 텍스트 아래에는 시스템 제공 경고 이미지가 있음. 이미지 아래에는 ‘계속’이라는 버튼이 있음. 시스템 제공 경고 이미지에서 ‘앱을 사용하는 동안 허용’ 버튼이 원 안에 있음.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-custom-messaging-prohibited-alert@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**경고 주석**

![‘더 나은 경험을 위해 추적을 허용하십시오.’라는 앱의 사전 추적 메시지 스크린샷. 앱의 사용자 설정 화면에는 위를 가리키는 화살표와 화면의 로어 서드에 ‘허용 선택’이라는 단어가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-custom-messaging-prohibited-alert-annotation@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

## 위치 버튼

iOS, iPadOS 및 watchOS에서 핵심 위치 정보는 사람들이 작업에서 필요한 순간에 사용자의 위치에 접근하도록 앱이 일시적인 인증을 승인할 수 있는 버튼을 제공합니다. 위치 버튼의 모양은 앱의 UI에 맞게 달라질 수 있으며, 즉시 인식할 수 있는 방식으로 위치 공유 동작을 항상 전달합니다.

![오른쪽 상단을 가리키는 좁은 화살촉 모양의 흰색 위치 표시기가 표시되고 그 뒤에 ‘현재 위치’라는 텍스트가 있는 마름모 모양 파란색 버튼 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/location-button@2x.png)

사람들이 처음으로 앱을 열고 위치 버튼을 탭하면 시스템은 표준 경고를 표시합니다. 해당 경고는 사람들이 버튼을 사용하여 앱의 위치 접근을 제한하는 방법을 이해하도록 하며, 공유를 시작하면 나타나는 위치 표시기를 사람들에게 상기시켜줍니다.

![일부 지도를 보여주는 배경 이미지 상단에 나타나는 위치 버튼으로 표시된 경고 스크린샷. 경고에는 ‘소셜 미디어가 사용자의 위치에 접근하도록 허용하겠습니까?’와 같이 표시됨. 위치를 켜면 근처 게시 위치를 표시하도록 허용하는 것임. 이 텍스트 아래에 있는 경고는 지도의 작은 이미지를 표시하며, 쿠퍼티노의 일부를 표시하기 위해 확대됨. 지도 아래에는 위에서부터 ‘한 번 허용’, ‘앱을 사용하는 동안 허용’ 및 ‘허용 안 함’이라는 세 개의 버튼이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/privacy-social-media-map-location-alert@2x.png)

사람들이 버튼 동작에 대한 이해를 확인한 후에, 위치 버튼을 탭하기만 하면 사용자 위치에 접근할 수 있는 일회성 권한을 앱에 제공합니다. 각각의 일회성 인증은 사람들이 앱 사용을 중단하면 만료되지만 버튼 동작에 대한 이해를 재확인하지 않아도 됩니다.

> **참고:** 앱에 인증 상태가 없는 경우 위치 버튼을 탭하면 사람들이 표준 경고에서 *한 번 허용*을 선택할 때와 동일한 효과가 있습니다. 사람들이 이전에 *앱을 사용하는 동안*을 선택한 경우 위치 버튼을 탭해도 앱의 상태가 변경되지 않습니다. 개발자 지침을 보려면 [LocationButton](https://developer.apple.com/documentation/corelocationui/locationbutton)(SwiftUI) 및 [CLLocationButton](https://developer.apple.com/documentation/corelocationui/cllocationbutton)(Swift)의 내용을 참조하십시오.

**특정 앱 기능을 위해 사람들이 위치를 공유할 수 있는 간단한 방법을 제공하려면 위치 버튼을 사용하는 것을 고려하십시오.** 예를 들어, 사람들이 위치 정보를 메시지 또는 게시물에 첨부하거나, 상점을 찾거나, 자신의 위치에서 마주친 건물, 식물 또는 동물을 식별하도록 앱이 도와줄 수 있습니다. 대부분의 경우 사람들이 앱에 *한 번 허용* 권한을 승인하는 것을 알고 있다면 경고와 반복적으로 상호작용할 필요 없이 위치를 공유하는 혜택을 누릴 수 있도록 위치 버튼을 사용하는 것을 고려하십시오.

**UI와 조화를 이루려면 위치 버튼을 사용자화하는 것을 고려하십시오.** 구체적으로 다음 작업을 수행할 수 있습니다.

- ‘현재 위치’ 또는 ‘나의 현재 위치 공유’와 같이 기능에 가장 적합한 시스템 제공 제목을 선택합니다.
- 색상으로 채워지거나 윤곽으로 표시된 위치 글리프를 선택합니다.
- 배경 색상과 제목 및 글리프의 색상을 선택합니다.
- 버튼의 모서리 반경을 조절합니다.

사람들이 위치 버튼을 인식하고 신뢰하도록 하기 위해 버튼의 기타 시각적 속성을 사용자화할 수 없습니다. 또한 시스템은 저대비 색상 조합이나 과도한 반투명 상태와 같은 문제에 대해 경고하여 위치 버튼이 읽기 적합한 상태로 유지되도록 보장합니다. 이러한 문제를 수정하는 것 외에도 텍스트가 버튼에 딱 맞는지 확인할 책임이 있습니다. 예를 들어, 버튼 텍스트는 손쉬운 사용의 모든 텍스트 크기에서, 그리고 다른 언어로 번역 시 잘리지 않고 딱 맞아야 합니다.

> **중요:** 시스템이 사용자화된 위치 버튼에서 일관된 문제를 식별하는 경우 사람들이 해당 버튼을 탭해도 앱이 기기 위치에 접근할 수 없게 됩니다. 이러한 버튼이 기타 앱 특화 동작을 수행할 수 있더라도 위치 버튼이 예상대로 작동하지 않는 경우 사람들은 앱에 대한 신뢰를 잃을 수 있습니다.

## 데이터 보호하기

사람들의 정보를 보호하는 것은 가장 중요합니다. 정보를 로컬에 저장하고, 특정 작업에 대해 사람들을 인증하고, 네트워크에서 정보를 전송해야 할 때 시스템 제공 보안 기술을 활용하여 사람들에게 앱의 보안에 대한 신뢰를 주고 사람들의 개인정보 보호를 유지할 수 있도록 하십시오.

다음은 상위 수준의 일부 지침입니다.

**인증을 위해 암호에만 의존하지 마십시오.** 가능한 경우, [passkeys](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_passkeys/)(패스키)를 사용하여 암호를 대치하십시오. 인증에 계속 암호를 사용해야 하는 경우, 이중 인증을 요구하여 보안을 강화하십시오(개발자 지침을 보려면 [Securing Logins with iCloud Keychain Verification Codes](https://developer.apple.com/documentation/authenticationservices/securing-logins-with-icloud-keychain-verification-codes)의 내용 참조). 사람들이 자신의 기기에서 로그인 상태로 유지하는 앱에 대한 접근을 더욱 보호하려면 Face ID, Optic ID 또는 Touch ID와 같은 생체 인증을 사용하십시오. 개발자 지침을 보려면 [Local Authentication](https://developer.apple.com/documentation/localauthentication)의 내용을 참조하십시오.

**키체인에 중요한 정보를 저장하십시오.** 키체인은 사람들의 개인정보를 처리할 때 안전하고 예측 가능한 사용자 경험을 제공합니다. 개발자 지침을 보려면 [Keychain services](https://developer.apple.com/documentation/security/keychain-services)의 내용을 참조하십시오.

**일반 텍스트 파일에 암호 또는 기타 보안 콘텐츠를 저장하지 마십시오.** 파일 권한을 사용하여 접근을 제한하는 경우에도 중요한 정보는 암호화된 키체인에서 훨씬 더 안전합니다.

**사용자 설정 인증 체계를 사용하지 마십시오.** 앱에 인증이 필요한 경우 [passkeys](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_passkeys/)(패스키), [Apple로 로그인](https://developer.apple.com/kr/design/human-interface-guidelines/sign-in-with-apple) 또는 [Password AutoFill](https://developer.apple.com/documentation/security/password-autofill)과 같은 시스템 제공 기능을 가급적 사용하십시오. 관련된 지침을 보려면 [계정 관리하기](https://developer.apple.com/kr/design/human-interface-guidelines/managing-accounts)의 내용을 참조하십시오.

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### macOS

**유효한 개발자용 ID로 앱에 로그인하십시오.** 스토어 외부에 앱을 배포하도록 선택하는 경우, 개발자용 ID로 앱에 로그인하면 Apple 개발자로 식별하고 앱을 사용하는 것이 안전함을 확인합니다. 개발자 지침을 보려면 [Xcode Help](https://developer.apple.com/go/?id=ios-app-distribution-guide)의 내용을 참조하십시오.

**앱 샌드 박스를 통해 사람들의 데이터를 보호하십시오.** 샌드 박스는 앱을 악성코드로부터 보호하면서 앱이 시스템 리소스 및 사용자 데이터에 대해 접근할 수 있도록 합니다. Mac App Store에 제출한 모든 앱은 샌드 박스가 필요합니다. 개발자 지침을 보려면 [Configuring the macOS App Sandbox](https://developer.apple.com/documentation/xcode/configuring-the-macos-app-sandbox)의 내용을 참조하십시오.

**로그인한 사람에 관하여 추측하지 마십시오.** 빠른 사용자 전환으로 인해 여러 명의 사람이 동일한 시스템에서 활성 상태일 수 있습니다.

### visionOS

기본적으로 visionOS는 ARKit 알고리즘을 사용하여 지속성, 월드 매핑, 분할, 매팅 및 주변광과 같은 기능을 처리합니다. 이러한 알고리즘이 항상 실행되며, 공유 공간에 있는 동안 앱 및 게임이 ARKit의 혜택을 자동으로 누릴 수 있습니다.

ARKit는 공유 공간의 앱에 데이터를 보내지 않습니다. ARKit API에 접근하려면 앱이 전체 공간을 열어야 합니다. 또한 평면 추정, 장면 재구성, 이미지 고정 및 손 추적과 같은 기능은 모든 정보에 접근하도록 권한을 요청합니다. 개발자 지침을 보려면 [Setting up access to ARKit data](https://developer.apple.com/documentation/visionos/setting-up-access-to-arkit-data)의 내용을 참조하십시오.

visionOS에서 사용자 입력은 비공개로 디자인되었습니다. 사람들이 SwiftUI 또는 RealityKit를 사용하여 생성한 상호작용 구성요소를 볼 때 시스템은 자동으로 호버 효과를 자동으로 표시합니다. 이로 인해 탭하기 전에 현재 바라보는 곳을 노출하지 않고 사람들이 필요로 하는 시각적 피드백을 제공할 수 있습니다. 지침을 보려면 [눈](https://developer.apple.com/kr/design/human-interface-guidelines/eyes) 및 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/gestures#visionOS)의 내용을 참조하십시오.

기기 카메라에 대한 개발자 접근은 visionOS에서 다른 플랫폼과 다르게 작동합니다. 특히 후면 카메라는 빈 입력을 제공하고 호환성 편의를 위해서만 사용할 수 있습니다. 전면 카메라는 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/shareplay#visionOS)에 대한 입력을 제공하지만 사람들이 권한을 승인한 경우에만 해당됩니다. visionOS로 가져오는 iOS 또는 iPadOS 앱에 카메라 접근이 필요한 기능이 포함된 경우, 이를 제거하거나 사람들이 콘텐츠를 가져올 수 있는 옵션으로 대치하십시오. 개발자 지침을 보려면 [Making your existing app compatible with visionOS](https://developer.apple.com/documentation/visionos/making-your-app-compatible-with-visionos)의 내용을 참조하십시오.

## 리소스

#### 관련 콘텐츠

[데이터 입력하기](https://developer.apple.com/kr/design/human-interface-guidelines/entering-data)

[온보딩](https://developer.apple.com/kr/design/human-interface-guidelines/onboarding)

#### Developer 문서

[Requesting access to protected resources](https://developer.apple.com/documentation/uikit/requesting-access-to-protected-resources) — UIKit

[Security](https://developer.apple.com/documentation/security)

[Requesting authorization to use location services](https://developer.apple.com/documentation/corelocation/requesting-authorization-to-use-location-services) — CoreLocation

[App Tracking Transparency](https://developer.apple.com/documentation/apptrackingtransparency)

#### 비디오

- [Trust Insights 만나 보기](https://developer.apple.com/kr/videos/play/wwdc2026/379) — Trust Insights가 사회적 사기와 강제로부터 사용자를 보호하는 데 어떻게 도움이 될 수 있는지 알아보세요. 이 새로운 프레임워크가 어떻게 개인정보를 보호하는 머신 러닝을 사용하여 누군가가 위험한 행동을 하도록 유도되는 상황을 감지하는지 살펴보세요. Trust Insights를 앱에 통합하고, 신호를 해석하며, 개인정보를 존중하면서 사용자를 보호하는 사려 깊은 개입 방안을 설계하는 방법을 알아보세요.
- [개발 과정에 개인정보 보호 통합하기](https://developer.apple.com/kr/videos/play/wwdc2025/246) — 계획 단계부터 배포에 이르기까지 앱에 개인정보 보호를 구축하는 방법을 알아보세요. 데이터 최소화, 온디바이스 처리, 투명성 및 제어에 중점을 두고 각 개발 수명 주기 단계에서 개인정보 보호를 통합하는 실용적인 방법을 소개합니다. Apple의 도구 및 프레임워크를 사용하여 사용자 데이터를 보호하고 개인정보를 존중하는 앱 경험을 만드는 방법을 알아볼 수 있습니다.
- [패스키의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2025/279) — iOS, iPadOS, macOS 및 visionOS 26로 패스키를 강화하는 방법을 알아보세요. 간소화된 가입을 위한 새로운 계정 생성 API, 비밀번호를 최신 상태로 유지하는 방법, 자동 패스키 업그레이드 및 패스키 관리 엔드포인트를 통한 패스키 업그레이드를 유도하는 새로운 방법, 안전하게 패스키 내보내기/가져오기 등 주요 업데이트를 살펴보겠습니다. 이번 개선 사항을 통해 사용자 경험과 보안을 향상하고 앱에서 이러한 업데이트를 구현하여 보다 원활하고 안전한 인증 경험을 제공하는 방법을 확인하세요. 이 비디오를 최대한 활용하려면 WWDC22의 ‘패스키 소개’를 먼저 시청하는 것이 좋습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 6월 21일 | 새로운 페이지로 지침이 통합되고 visionOS용으로 업데이트됨. |
