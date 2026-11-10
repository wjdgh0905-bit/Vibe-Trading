# Siri

Source: https://developer.apple.com/kr/design/human-interface-guidelines/siri

> 사람들은 Siri를 사용해 매일 검색하거나, 알아야 하거나, 해야 하는 일에 도움을 받습니다.

![Siri 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-Siri-intro@2x.png)

Siri는 사용하는 시스템과 앱 전반에 걸쳐 정보를 제공하고 빠른 작업을 수행하는 데 도움을 주는 개인 비서입니다. 사람들은 음성을 사용하거나, Dynamic Island에서 아래로 쓸어내리거나, Siri 앱을 활용하는 등 다양한 방법으로 Siri와 상호작용합니다.

지원되는 기기에서 Siri AI는 Apple Intelligence로 구동되는 Siri 버전을 소개합니다. 앱이 콘텐츠 및 기능을 Apple Intelligence와 통합하면 Siri의 자연어 인식 및 문맥별 이해를 통해 시스템 어디에서나 앱의 동작을 시작하고, 화면에 표시된 콘텐츠와 상호작용하며, 앱을 깊이 있게 탐색하지 않고도 원하는 기능에 빠르게 접근할 수 있습니다.

예를 들어, 시스템 어디에서든 “*AppName*에서 유미에게 메시지 보내”라고 말할 수 있으며, Siri는 해당 맥락에서 적절한 방법으로 작업을 완료할 수 있도록 돕습니다. 화면에 사진이 표시된 상태에서 “이 사진을 내 풍경 앨범에 추가해”라고 말한 다음, 이어서 “그리고 주현에게 이메일로 보내”라고 말하면 이메일 작성 보기가 열리고 주현이 수신자로 추가됩니다. “흑백으로 만들어줘”라고 말해서 이미지를 그레이스케일로 변경하는 것이 메뉴를 일일이 탐색하며 동일한 명령을 찾는 것보다 훨씬 빠를 수 있습니다.

## 앱이 Siri와 함께 작동하도록 설정하기

기본적으로 시스템은 앱이 수행할 수 있는 작업이나 앱에 포함된 정보에 대해 구체적으로 인식하지 못합니다. 앱이 Siri와 함께 작동하려면 [App Intents](https://developer.apple.com/documentation/appintents) 프레임워크를 사용하여 앱의 기능 및 콘텐츠를 Apple Intelligence에서 활용할 수 있도록 만들어야 합니다.

앱이 인텐트를 구현하면, 시스템은 앱이 수행할 수 있는 기능(앱의 동작 또는 *인텐트*) 및 콘텐츠(앱의 *엔티티*)를 적절한 시스템 경험에 노출할 수 있습니다. 이를 통해 Siri, Spotlight, 단축어 앱 등 Apple Intelligence를 기반으로 하는 기능에서 앱의 동작 및 콘텐츠에 접근할 수 있습니다. 개발자 지침을 보려면 [Getting started with the App Intents framework](https://developer.apple.com/documentation/appintents/getting-started-with-the-app-intents-framework)의 내용을 참조하십시오.

Siri를 최대한 활용하기 위해 앱의 기능과 콘텐츠를 앱 *[App schema domains](https://developer.apple.com/documentation/appintents/app-schema-domains)*(시스템이 이미 이해하고 있는 기능의 사전 설정 템플릿)와 연동할 수 있습니다. 이메일, 음악, 사진 등 공통 도메인 영역에 속한 앱은 시스템의 기존 지식을 활용하여 한층 폭넓은 자연어 대화 옵션과 심층적인 문맥 이해를 바탕으로 요청을 처리하는 내장 로직에 접근할 수 있습니다. 개발자 지침을 보려면 [Apple Intelligence and Siri AI](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai) 및 [Making actions and content discoverable by Apple Intelligence](https://developer.apple.com/documentation/appintents/making-actions-and-content-discoverable-by-apple-intelligence)의 내용을 참조하십시오.

### 맥락 정보 공유하기

앱은 스키마를 사용하여 동작 및 콘텐츠를 노출하는 것 외에도, 시스템에 콘텐츠 및 기능에 관한 맥락 정보를 제공하여 더욱 개인화된 경험을 제공할 수 있습니다.

앱은 뷰 및 기타 콘텐츠에 앱 엔티티를 주석으로 추가하여 화면에 표시된 내용을 시스템에 알릴 수 있습니다. 이를 통해 시스템은 사람들이 상호작용하는 대상에 기반하여 문맥별 상호작용을 개선하는 데 필요한 정보를 Siri에 제공합니다. 예를 들어, Siri와 대화하는 중 앱 콘텐츠의 일부(버튼 또는 화면 그래픽 등)를 언급하는 경우, Siri는 앱에서 제공한 주석을 활용하여 의도를 파악할 수 있습니다. 개발자 지침을 보려면 [Providing contextual cues to Apple Intelligence and Siri](https://developer.apple.com/documentation/appintents/providing-contextual-cues-to-apple-intelligence-and-siri)의 내용을 참조하십시오.

앱은 시스템에 콘텐츠 정보를 제공하기 위해 기기 내 Spotlight 인덱스에 엔티티를 제공할 수 있으며, 이를 통해 Spotlight 또는 Siri에서 검색하는 사람들에게 앱 정보를 제공할 수 있습니다. 개발자 지침을 보려면 [Defining app entities for your custom data types](https://developer.apple.com/documentation/appintents/defining-app-entities-for-your-custom-data-types) 및 [Making app entities available in Spotlight](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight)의 내용을 참조하십시오.

앱은 사람들이 앱을 사용하는 동안 수행하는 동작을 인텐트로 제공하여 시스템에 알릴 수 있습니다. 이를 통해 Siri는 사람들이 향후 수행하려는 동작을 예측하고, 적절한 시점에 다양한 시스템 환경을 통해 제안합니다. 앱이 제공할 수 있는 동작의 예로는 최근 활동이나 관심을 보인 항목 등이 있습니다. 개발자 지침을 보려면 [Donating your app’s data and actions to the system](https://developer.apple.com/documentation/appintents/donating-your-apps-data-and-actions-to-the-system)의 내용을 참조하십시오.

## 모범 사례

**앱의 가장 인기 있는 동작과 해당 동작이 발생하는 시기와 위치를 파악하십시오.** 손을 쓸 수 없는 환경 또는 특정 기기를 사용하는 것처럼 특정 동작이 필요한 상황을 이해하면 어떤 동작과 콘텐츠를 앱 인텐트 및 엔티티로 노출할지 우선순위를 정할 수 있으며, 이는 훌륭한 Siri 경험을 디자인하는 데 도움이 됩니다.

**친숙한 용어를 콘텐츠 및 동작에 사용하십시오.** 앱 인텐트 또는 엔티티를 생성할 때 이를 나타낼 용어를 선택합니다. 예를 들어, 오디오 파일을 트랙, 노래 또는 팟캐스트로 지칭할 수 있습니다. 기능 및 콘텐츠에 사람들이 가장 쉽게 인식할 만한 용어를 사용하면 Siri를 통해 앱과 상호작용할 때 더 자연스럽고 직관적인 경험을 제공할 수 있습니다.

**관련성 있는 콘텐츠를 제공하십시오.** 앱의 모든 콘텐츠에 대해 Spotlight에 알리는 대신, 최근에 검색한 항목, 즐겨찾는 항목 또는 북마크, 위시리스트의 내용과 같이 개인적 맥락과 특히 관련성이 높은 사항을 고려하십시오. 이메일 또는 메시지 전송과 같은 일부 앱 카테고리에는 전체 카탈로그를 관련 정보로 취급할 만한 타당한 이유가 있을 수 있습니다. 이러한 경우에는 확장된 접근을 제공하는 것이 적절할 수 있습니다.

**광고하지 마십시오.** Siri가 제공하는 콘텐츠에 광고, 마케팅 또는 앱 내 구입 홍보 문구를 포함하지 마십시오.

**기본 응답이 앱의 요구 사항을 충족하지 않는 경우에만 사용자 설정 응답을 제공하십시오.** Siri는 추가 구성 없이도 광범위한 자연어 요청을 스스로 예측하고 유연하며 유용한 응답을 기본 제공하도록 설계되었습니다.

## Siri로 앱 경험 사용자화하기

공통된 기능 세트가 많은 앱의 경우, 기존 [App schema domains](https://developer.apple.com/documentation/appintents/app-schema-domains)은 추가로 작업하지 않아도 Apple Intelligence 및 Siri에 동작 및 콘텐츠를 노출하는 데 필요한 기본 내장 기능을 제공합니다. 앱의 기능이 이러한 영역에 해당하지 않는 경우, Siri가 접근할 수 있도록 *앱 단축어*를 통해 시스템에 사용자 정의 동작을 노출할 수 있습니다. 디자인 지침을 보려면 [앱 단축어](https://developer.apple.com/kr/design/human-interface-guidelines/app-shortcuts)의 내용을 참조하십시오. 개발자 지침을 보려면 [App Shortcuts](https://developer.apple.com/documentation/appintents/app-shortcuts)의 내용을 참조하십시오.

앱은 기존 스키마와 연동된 동작 또는 콘텐츠의 경험을 사용자 설정하기 위해 Siri가 제공하는 응답을 맥락에 맞게 향상할 수 있는 추가적인 선택적 속성을 인텐트 또는 엔티티의 일부로 정의할 수 있습니다. 예를 들어 앱은 오디오 파일이 재생되는 동안 Siri가 표시할 수 있는 재생 제어기 [스니펫](https://developer.apple.com/kr/design/human-interface-guidelines/snippets)을 제공할 수 있습니다. 개발자 지침을 보려면 [Displaying static and interactive snippets](https://developer.apple.com/documentation/appintents/displaying-static-and-interactive-snippets)의 내용을 참조하십시오.

> **참고:** Siri는 Apple Intelligence로 구동되어 문맥상 적절한 응답을 제공합니다. 응답은 시각적이지 않은 것을 포함해 매우 다양한 문맥에서 나타날 수 있으므로, 앱에서 정의한 선택적 인텐트/엔티티 속성이 응답의 일부로 항상 화면에 표시되지 않을 수 있습니다.

스키마 응답의 일부로 추가 사용자 설정 속성을 제공할 때 다음과 같은 지침을 고려하십시오.

**명확하고 서술적인 응답 대화를 작성하십시오.** 효과적인 응답은 Siri가 동작을 수행할 때 어떤 일이 발생하는지 명확하게 전달합니다. 후속 질문을 하는 경우, 명확하게 하기 위해 기본 대화를 사용자화해야 합니다. 예를 들어, “어떤 걸로 할까요?” 보다 “어떤 수프로 할까요?”가 더 명확합니다.

**응답을 최대한 간결하게 유지하십시오.** 사람들이 Siri와 자주 상호작용하면서 후속 질문에 답변하거나 오류를 처리할 때 동일한 응답을 여러 번 들을 수 있습니다. 현재 대화의 맥락을 활용하여 프롬프트에서 가능한 한 많은 세부사항을 제거하십시오. 불필요한 단어나 유머를 포함하지 않도록 하십시오. 둘 다 시간이 지남에 따라 사람들의 심기를 불편하게 할 수 있습니다.

**Siri가 청각적 및 시각적 형태로 전달할 수 있는 응답을 제공하십시오.** 이렇게 하면 Siri가 현재 상황에 가장 적합한 커뮤니케이션 방법을 결정할 수 있습니다. 예를 들어, iPhone을 사용하는 사람이 날씨에 대해 물어보면 일기 예보 정보가 화면에 표시되지만, AirPods를 사용하는 경우에는 Siri가 음성으로 일기 예보를 전달합니다. 음성 응답이 시각적 요소에 의존하지 않고도 독립적으로 필수 정보를 전달할 수 있는지 확인하십시오.

**포괄적인 상호작용을 디자인하십시오.** 불필요한 성별 대명사를 피해 모든 사람을 포용하는 상호작용을 만드십시오. 예를 들어, “가장 친한 친구에게 메시지 보내.”에 대한 응답으로 “그 또는 그녀의 이름이 뭔가요?” 대신 “누구에게 보낼까요?” 또는 “누가 받나요?”라고 말하는 것이 좋습니다. 지침을 보려면 [글쓰기](https://developer.apple.com/kr/design/human-interface-guidelines/writing) 및 [포용성](https://developer.apple.com/kr/design/human-interface-guidelines/inclusion)의 내용을 참조하십시오.

**선택지 목록이 너무 길면 열린 질문을 던지십시오.** 전체 옵션 목록이 너무 길어 Siri가 이를 한 번에 읽기 어려운 경우, 범위를 좁히거나 추가 세부사항을 파악할 수 있는 열린 질문으로 대화를 이어가십시오. 예를 들어, 쇼핑 앱에서 구매 가능한 신발 목록을 요청받았을 때 옵션이 너무 많다면 “어떤 스타일의 신발을 찾으시나요?”라고 되물을 수 있습니다.

**가능한 한 응답을 기기와 독립적으로 유지하십시오.** 사람들은 한 기기에서 Siri 요청을 시작하고 다른 기기에서 실행할 수 있으므로, 특정 기기를 지칭하는 표현은 혼란을 주거나 잘못 안내할 수 있습니다. 응답에서 특정 기기를 꼭 언급해야 한다면, 해당 맥락에 부합하고 정확한 정보인지 확인하십시오.

**응답에서 앱 이름을 생략하십시오.** 시스템은 응답할 때 이미 앱에 대한 음성 및 시각적 출처를 제공합니다.

**적절한 언어를 사용하고 유해 콘텐츠 차단을 따르십시오.** 시스템에 제공하는 대화 텍스트에 불쾌감을 주는 언어를 절대 포함하지 마십시오. 많은 가정에서 유해 콘텐츠 차단 기능을 사용하여 청소년 이용불가 콘텐츠 및 특정 등급에 따른 기타 자료를 제한합니다. Siri가 소리를 내어 응답할 수도 있으며, 주변 사람이 응답을 들을 수도 있다는 점을 유의하십시오.

**사람들이 오류 및 실패를 이해하도록 하십시오.** 시스템은 일부 기본 오류 설명을 제공하지만, 현재 상황에 맞게 오류 응답을 향상하는 것이 가장 좋습니다. 예를 들어, 치킨 누들 수프가 매진된 경우, “죄송합니다, 주문을 완료할 수 없습니다.” 대신 “죄송합니다, 치킨 누들 수프가 다 떨어졌습니다.”와 같은 오류 메시지가 의미를 더 잘 전달합니다.

## 편집 지침

**Siri를 이름으로 부르십시오.** ‘그’ 또는 ‘그녀’와 같은 대명사를 사용하여 Siri를 언급하지 마십시오. *Siri*라는 단어만 사용하는 것이 가장 좋습니다. 예를 들어, ‘*Siri에 단축어를 추가한 후, Siri에게 요청하여 언제든지 단축어를 실행할 수 있습니다*’라고 안내하십시오. 추가 지침은 [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)의 내용을 참조하십시오.

**시스템이 중요한 동작 및 문구를 Siri 전용으로 설정한다는 점을 명심하십시오.** Siri를 가장하거나, Siri가 제공하는 기능을 재현하거나, Apple에서 온 것처럼 보이는 응답을 제공하지 마십시오. “119에 전화” 또는 “Siri야”와 같이 지정된 문구를 사용하지 마십시오.

**현지화된 맥락에서는 “Hey Siri”라는 문구에서 *Hey*라는 단어만 번역하십시오.** *Siri*는 Apple의 상표이며 번역되지 않습니다. “Hey Siri”라는 문구의 허용 가능한 번역 목록은 다음과 같습니다.

| 언어 코드 | “Hey Siri” 번역 | 언어 코드 | “Hey Siri” 번역 |
| --- | --- | --- | --- |
| ar_AE | يا Siri | fr_CA | Dis Siri |
| ar_SA | يا Siri | fr_CH | Dis Siri |
| da_DK | Hej Siri | fr_FR | Dis Siri |
| de_AT | Hey Siri | it_CH | Ehi Siri |
| de_CH | Hey Siri | it_IT | Ehi Siri |
| de_DE | Hey Siri | ja_JP | Hey Siri |
| en_AU | Hey Siri | ko_KR | Siri야 |
| en_CA | Hey Siri | ms_MY | Hai Siri |
| en_GB | Hey Siri | nb_NO | Hei Siri |
| en_IE | Hey Siri | nl_BE | Hé, Siri |
| en_IN | Hey Siri | nl_NL | Hé Siri |
| en_NZ | Hey Siri | no_NO | Hei Siri |
| en_SG | Hey Siri | pt_BR | E aí Siri |
| en_US | Hey Siri | ru_RU | привет Siri |
| en_ZA | Hey Siri | sv_SE | Hej Siri |
| es_CL | Oye Siri | th_TH | หวัดดี Siri |
| es_ES | Oye Siri | tr_TR | Hey Siri |
| es_MX | Oye Siri | zh_CN | 嘿Siri |
| es_US | Oye Siri | zh_HK | 喂 Siri |
| fi_FI | Hei Siri | zh_TW | 嘿 Siri |
| fr_BE | Dis Siri |  |  |

## 리소스

#### 관련 콘텐츠

[앱 단축어](https://developer.apple.com/kr/design/human-interface-guidelines/app-shortcuts)

[스니펫](https://developer.apple.com/kr/design/human-interface-guidelines/snippets)

#### Developer 문서

[App Intents](https://developer.apple.com/documentation/appintents)

[App schema domains](https://developer.apple.com/documentation/appintents/app-schema-domains)

[Apple Intelligence and Siri AI](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai)

#### 비디오

- [앱 스키마로 지능형 Siri 경험 빌드하기](https://developer.apple.com/kr/videos/play/wwdc2026/240) — 앱 인텐트를 사용하여 앱 콘텐츠와 동작을 Siri에 연동하세요. 앱 엔티티를 사용하여 데이터를 모델링하고, 앱 스키마를 도입해 강력한 시스템 동작을 구현하며, Apple Intelligence로 구동되는 자연어 상호작용을 지원하세요. 시맨틱 검색을 활성화하고, 다양한 앱에 걸쳐 작업을 수행하며, 화면 내용 인지와 콘텐츠 전송을 사용하여 상황에 맞는 경험을 선사하는 방법을 살펴보세요. 빠르고 신뢰할 수 있는 Siri 경험을 빌드하기 위한 모범 사례와 테스트 도구를 확인하세요.
- [App Intents 프레임워크의 새로운 기능 살펴보기](https://developer.apple.com/kr/videos/play/wwdc2026/345) — 고급 기능으로 앱 인텐트 도입을 레벨업하여 속도, 유연성, 관련성을 향상해 보세요. ValueRepresentation과 RelevantEntities가 콘텐츠의 검색 가능성을 높이고 앱 간 이동을 가능하게 하며, EntityCollection이 성능을 향상하고, SyncableEntity를 통해 여러 기기 간에 확장할 수 있는 방법을 알아보세요. union 값과 취소를 원활하게 처리하는 장기 실행 인텐트를 포함한 더 풍부한 매개변수 유형을 살펴보세요. 
- [Siri 및 Apple Intelligence를 위한 고급 앱 인텐트 기능 살펴보기](https://developer.apple.com/kr/videos/play/wwdc2026/343) — 고급 App Intents API를 사용하여 앱이 Siri와 연동하는 방식을 향상하세요. 사용자가 음성만으로 더 많은 작업을 수행할 수 있도록 하고, Apple Intelligence가 콘텐츠를 찾도록 지원하며, Siri가 앱에서 무슨 일이 일어나고 있는지 이해하도록 화면 내용 인지를 위한 컨텍스트를 제공하는 기법을 알아보세요. 

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2026년 6월 8일 | Siri AI를 위해 수정됨. |
| 2023년 6월 5일 | ‘Siri에 추가’ 지침이 제거됨. 새로운 [앱 단축어](https://developer.apple.com/kr/design/human-interface-guidelines/app-shortcuts) 페이지에 대한 참조가 추가됨. |
| 2023년 5월 2일 | 지침이 한 페이지로 통합됨. |
