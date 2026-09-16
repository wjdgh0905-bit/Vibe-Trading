# 계정 관리하기

Source: https://developer.apple.com/kr/design/human-interface-guidelines/managing-accounts

> 제공하려는 경험에 불필요한 방해가 되지 않는다면, 계정을 사용하여 편리하게 사람들이 자신의 콘텐츠에 접근하고 개인의 세부사항을 추적하도록 할 수 있습니다.

![사람 모양의 스케치가 있으며, 개인정보를 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-managing-accounts-intro@2x.png)

핵심 기능을 사용하는 데 꼭 필요한 경우에만 계정을 생성하도록 사람들에게 요청하십시오. 그렇지 않다면, 계정 없이 앱 또는 게임을 즐길 수 있도록 하십시오. 계정이 필요하다면 [Apple로 로그인](https://developer.apple.com/kr/design/human-interface-guidelines/sign-in-with-apple)을 사용하는 것을 고려하십시오. 신뢰할 수 있는 일관된 로그인 경험을 제공하면서 여러 계정 및 인증 방법을 외울 필요 없는 간편한 로그인 방식을 지원할 수 있습니다.

## 모범 사례

**계정을 생성할 때의 이점과 등록 방법을 설명하십시오.** 앱 또는 게임에서 계정을 요구하는 경우, 계정이 필요한 이유와 이점에 대해 간략하고 친절하게 설명하십시오. 로그인 보기에 이 메시지를 표시하십시오.

**가능한 한 나중에 로그인하도록 하십시오.** 사람들은 유용한 무언가를 수행할 수 있기 전에 로그인하도록 강요받으면 대개는 앱을 더 이상 사용하지 않습니다. 이러한 상황을 피하려면, 본격적인 사용을 위해 로그인해야 한다고 요청하기 전에 사람들이 앱 또는 게임에 대해 알아볼 수 있는 기회를 제공하십시오. 예를 들어, 쇼핑 앱은 사람들이 원하는 만큼 둘러볼 수 있도록 한 다음, 구입할 준비가 되었을 때에만 로그인을 요청할 수 있습니다.

**iOS, iPadOS, macOS 또는 visionOS 앱에서 ‘Apple로 로그인’을 사용하지 않는다면 패스키를 우선적으로 사용하십시오.** 패스키는 암호를 생성하거나 입력할 필요를 없애 계정 생성 및 인증을 간소화합니다. 앱에서 패스키를 지원하는 경우, 사람들은 새로운 계정을 생성하거나 기존 계정에 로그인할 때 사용자 이름만 제공하면 됩니다. 개발자 지침을 보려면 [Supporting passkeys](https://developer.apple.com/documentation/authenticationservices/supporting-passkeys)의 내용을 참조하십시오. 인증에 계속 암호를 사용해야 하는 경우, 이중 인증을 요구하여 보안을 강화하십시오(개발자 지침을 보려면 [Securing Logins with iCloud Keychain Verification Codes](https://developer.apple.com/documentation/authenticationservices/securing-logins-with-icloud-keychain-verification-codes)의 내용 참조).

**제공하는 인증 방법을 항상 명시하십시오.** 예를 들어, Face ID를 사용하여 앱에 로그인하는 버튼을 표시한다면 ‘로그인’과 같은 일반적인 문구 대신 ‘Face ID로 로그인’과 같은 문구로 제목을 지정하십시오.

**현재 상황에서 사용할 수 있는 인증 방법만 언급하십시오.** 예를 들어, Face ID를 제공하지 않는 기기에서는 Face ID를 언급하지 마십시오. 기기의 기능을 확인하고 적합한 용어를 사용하십시오. 개발자 지침을 보려면 [LABiometryType](https://developer.apple.com/documentation/localauthentication/labiometrytype)의 내용을 참조하십시오.

**일반적으로, 생체 인증을 선택하기 위한 앱 설정을 제공하지 마십시오.** 사람들은 시스템 수준에서 생체 인증을 켜므로 앱 내 설정을 제공하면 중복이 되고 혼란을 줄 수 있습니다.

**계정 인증을 언급할 때 *암호*라는 용어를 사용하지 마십시오.** 사람들은 암호를 생성하여 기기를 잠금 해제하거나 Apple 서비스를 인증합니다. 해당 용어를 인터페이스에서 사용하면 사람들은 앱 또는 게임에서 자신의 암호를 다시 사용하라고 요청하는 것으로 이해할 수 있습니다.

## 계정 삭제하기

앱 또는 게임에서 사람들이 계정을 생성하도록 지원했다면 계정을 비활성화하는 것만 아니라 계정을 삭제하는 것도 지원해야 합니다. 아래에 표시된 다음 지침 외에도 계정 삭제 및 잊힐 권리와 관련된 현재 지역의 법적 요구 사항을 이해하고 준수해야 합니다.

> **중요:** 법적 요구 사항으로 인해 앱에서 계정 또는 정보를 유지(예: 디지털 건강 기록)하거나 특정 계정 삭제 프로세스를 따라야 하는 경우, 유지가 필요한 정보 또는 계정과 준수가 필요한 프로세스에 대해 사람들이 이해할 수 있도록 해당 상황을 명료하게 설명해야 합니다.

**앱 또는 게임에서 계정 삭제를 실행할 수 있는 명확한 방법을 제공하십시오.** 앱에서 계정 삭제를 수행할 수 없다면 계정을 삭제할 수 있는 웹 페이지로 이동하는 직접적인 링크를 제공해야 합니다. 링크를 쉽게 발견할 수 있도록 하십시오. 예를 들어, 개인정보 처리방침 또는 서비스 약관 페이지에 링크를 숨겨 놓지 마십시오.

> **개발자 참고 사항:** 사람들이 [Apple로 로그인](https://developer.apple.com/kr/design/human-interface-guidelines/sign-in-with-apple)을 사용하여 앱에서 계정을 생성한 경우, 계정 삭제 시 연결된 토큰을 취소하십시오. [Token revocation](https://developer.apple.com/documentation/signinwithapplerestapi/revoke-tokens)의 내용을 참조하십시오.

**사람들이 앱이나 게임 내에서 또는 웹사이트에서 계정 삭제를 수행하는지에 상관없이 일관된 경험을 제공하십시오.** 예를 들어, 한 곳의 삭제 과정을 다른 곳보다 더 길거나 복잡하게 만들지 마십시오.

**계정이 나중에 삭제되도록 사람들이 예약할 수 있게 하는 것을 고려하십시오.** 사람들은 계정을 삭제하기 전에, 아직 남아 있는 서비스를 사용하거나 구독 자동 갱신 시점까지 기다리고 싶어 할 수 있습니다. 계정 삭제를 예약하는 방법을 제공하는 경우에는 즉시 삭제하는 옵션 또한 제공하십시오.

**계정 삭제가 언제 완료될지 설명하고, 삭제가 완료되면 이를 알리십시오.** 때때로 계정을 완전히 삭제하는 데 오랜 시간이 걸릴 수 있으므로, 사람들이 완료 시점을 알 수 있도록 삭제 프로세스에 대한 상태를 계속 알려 주는 것이 중요합니다.

**앱 내 구입을 지원하는 경우, 계정 삭제 시 청구 및 취소가 어떤 식으로 이루어지는지 설명하십시오.** 예를 들어, 다음과 같은 경우를 설명해야 할 수 있습니다.

- 계정 삭제 여부와 상관없이, 자동 갱신 구독에 대한 청구는 사람들이 구독을 취소하기 전까지 Apple을 통해 계속됩니다.
- 계정을 삭제한 후 사람들은 구독을 취소하거나 환불을 요청해야 합니다.

사람들이 이러한 경우에 대해 이해하도록 돕는 것 외에도, 구독을 취소하고 구입 항목을 관리하는 방법을 설명하는 정보를 제공하십시오. 지침을 보려면 [구독 관리 지원하기](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase#Helping-people-manage-their-subscriptions) 및 [앱 내 구입 관련 지원 제공하기](https://developer.apple.com/kr/design/human-interface-guidelines/in-app-purchase#Providing-help-with-in-app-purchases)의 내용을 참조하십시오.

> **참고:** 사람들이 앱을 사용하여 구독을 구입하지 않았더라도 계정 삭제를 지원해야 합니다.

## TV 제공업체 계정

인기 있는 다수의 TV 제공업체는 사람들이 시스템 수준에서 로그인할 수 있도록 지원하므로 앱별로 인증할 필요가 없습니다. TV 제공업체 앱에 사람들이 로그인하도록 해야 하는 경우, TV 제공업체 인증을 사용하여 가장 효율적인 온보딩 경험을 제공하십시오.

**사람들이 시스템 수준에서 로그인한 경우 로그아웃 옵션을 표시하지 마십시오.** 앱에 로그아웃 옵션을 포함해야 한다면 옵션이 호출될 때 사람들이 설정 > TV 제공업체로 이동하여 계정을 로그아웃하도록 메시지를 표시해야 합니다.

**사람들이 개인정보 보호 제어기를 조절하여 로그아웃하도록 안내하지 마십시오.** 설정 > 개인정보 보호에 있는 TV 제공업체 제어기는 로그아웃 방법이 아닙니다. 이러한 설정은 사람들이 TV 제공업체 계정에 접근할 수 있는 앱을 관리하기 위한 것입니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS 또는 visionOS에 대한 추가 고려 사항은 없습니다.*

### tvOS

대부분의 사람들은 키보드가 아닌 리모컨으로 Apple TV와 상호작용하므로 필요한 최소한의 정보를 요청하십시오.

**사람들이 다른 기기를 사용하여 등록 또는 인증할 수 있도록 하십시오.** 앱의 연결된 도메인을 구성하면 Apple TV가 다른 기기와 작동하여 [Apple로 로그인](https://developer.apple.com/kr/design/human-interface-guidelines/sign-in-with-apple)을 포함한 로그인 자격 증명을 안전하게 제안할 수 있습니다. 개발자 지침을 보려면 [Configuring an associated domain](https://developer.apple.com/documentation/xcode/configuring-an-associated-domain)의 내용을 참조하십시오.

**사람들이 공유 계정에 로그인한 경우, 이들이 현재 사용자가 될 때마다 프로필을 선택하도록 요청하지 마십시오.** tvOS 16 이상부터 앱은 개인의 프로필과 사용자 데이터를 별도로 저장하면서 자격 증명을 모든 사용자와 공유할 수 있습니다. 이러한 유형의 공유를 지원하는 경우, 앱에서 개인별로 공유 계정에 로그인하도록 요청하지 않고도 현재 사용자의 프로필을 자동으로 사용할 수 있습니다. 개발자 지침을 보려면 [kSecUseUserIndependentKeychain](https://developer.apple.com/documentation/security/ksecuseuserindependentkeychain) 및 [User Management Entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.user-management)의 내용을 참조하십시오.

**데이터 입력을 최소화하십시오.** 수집해야 하는 정보가 소량이 아닐 경우, 다른 기기에서 웹사이트를 방문하도록 사람들에게 요청하십시오. 이메일 주소가 필요한 경우, 최근 입력한 주소의 목록이 포함되도록 이메일 키보드 화면을 표시하십시오.

### watchOS

iCloud 동기화로 키체인에 대한 접근을 제공하여 사람들이 사용자 이름 및 암호를 자동 완성하고 앱 설정을 유지할 수 있도록 하십시오.

## 리소스

#### 관련 콘텐츠

[온보딩](https://developer.apple.com/kr/design/human-interface-guidelines/onboarding)

[Apple로 로그인](https://developer.apple.com/kr/design/human-interface-guidelines/sign-in-with-apple)

#### Developer 문서

[Supporting passkeys](https://developer.apple.com/documentation/authenticationservices/supporting-passkeys) — Authentication Services

#### 비디오

- [패스키의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2025/279) — iOS, iPadOS, macOS 및 visionOS 26로 패스키를 강화하는 방법을 알아보세요. 간소화된 가입을 위한 새로운 계정 생성 API, 비밀번호를 최신 상태로 유지하는 방법, 자동 패스키 업그레이드 및 패스키 관리 엔드포인트를 통한 패스키 업그레이드를 유도하는 새로운 방법, 안전하게 패스키 내보내기/가져오기 등 주요 업데이트를 살펴보겠습니다. 이번 개선 사항을 통해 사용자 경험과 보안을 향상하고 앱에서 이러한 업데이트를 구현하여 보다 원활하고 안전한 인증 경험을 제공하는 방법을 확인하세요. 이 비디오를 최대한 활용하려면 WWDC22의 ‘패스키 소개’를 먼저 시청하는 것이 좋습니다.
- [기기 관리의 새로운 기능](https://developer.apple.com/kr/videos/play/wwdc2024/10143) — iOS, iPadOS, macOS, visionOS를 위한 최신 관리 기능을 알아보고, Apple Business Manager 및 Apple School Manager의 최신 변경 내용을 확인해 보세요. 활성화 잠금, 소프트웨어 업데이트, Safari 관리와 관련된 업데이트도 살펴봅니다.
