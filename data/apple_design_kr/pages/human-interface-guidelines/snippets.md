# 스니펫

Source: https://developer.apple.com/kr/design/human-interface-guidelines/snippets

> Siri 또는 앱 단축어로 작업을 수행하면 스니펫에 결과가 표시되거나 확인을 요청합니다.

![캘린더 이벤트의 제안 날짜 및 시간 및 완료 버튼을 보여주는 스니펫의 스타일화된 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-snippets-intro@2x.png)

스니펫은 [Siri](https://developer.apple.com/kr/design/human-interface-guidelines/siri), Spotlight 또는 단축어 앱에서 수행한 작업에 응답하여 나타나는 콤팩트 보기입니다.

특정 작업의 요구사항을 충족하도록 설계한 [App Intents](https://developer.apple.com/documentation/appintents)에 포함해 앱의 동작과 관련된 스니펫을 표시할 수 있습니다. 예를 들어, 일기 예보를 확인하거나 일일 목표 진행 상황을 업데이트하는 용도로 스니펫을 설계할 수 있습니다.

스니펫에는 확인 및 결과의 두 가지 유형이 있습니다. *확인* 스니펫을 사용하면 동작을 확인하거나 취소할 수 있으며, 결과에 영향을 미치는 옵션을 포함할 수 있습니다. 반면에 *결과* 스니펫은 확인 결과처럼 추가 동작이 필요하지 않는 정보를 제공합니다. 스니펫을 사용하는 앱 인텐트는 항상 결과를 표시하지만, 확인 단계는 선택 사항입니다.

![확인 스니펫을 보여주는 iPhone의 부분 스크린샷. 주문 요약이 상단에 표시되고, 하단에 주문을 취소하거나 확인할 수 있는 취소 버튼과 주문 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/snippets-confirmation-type@2x.png)

![결과 스니펫을 보여주는 iPhone의 부분 스크린샷. 주문 상태 및 배송 날짜가 상단에 표시되고, 하단에 스니펫을 닫을 수 있는 완료 버튼이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/snippets-result-type@2x.png)

개발자 지침을 보려면 [Displaying static and interactive snippets](https://developer.apple.com/documentation/appintents/displaying-static-and-interactive-snippets)의 내용을 참조하십시오.

## 구조

스니펫은 다음 요소로 구성됩니다.

- **대화.** Siri가 스니펫의 정보를 전달하기 위해 말하는 앱 인텐트 대화입니다. 시스템은 기본적으로 대화 텍스트를 포함하고 사용자 설정 보기 위에 배치합니다.
- **사용자 설정 보기.** 스니펫의 정보를 시각적으로 전달하는 보기입니다. 사용자 설정 보기에는 스니펫의 내용을 수정하거나, 추가 정보를 얻거나, 다른 작업을 수행하기 위한 버튼이 하나 이상 포함될 수 있습니다.
- **시스템 제공 버튼.** 확인 스니펫에는 사용자 설정 보기 아래에 시스템에서 제공하는 버튼 두 개(보조 취소 버튼 및 사용자 설정 레이블이 있는 기본 버튼)가 포함됩니다. 결과 스니펫에는 보기를 닫는 단일 완료 버튼이 포함됩니다.

![스니펫의 구조를 보여주는 일러스트. 대화상자가 스니펫 상단에 표시됨. 사용자 설정 보기는 최대 높이 400pt로 중앙에 표시됨. 하단에는 시스템 제공 버튼 2개가 있으며 보조 버튼이 왼쪽에, 기본 버튼이 오른쪽에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/snippets-custom-view-layout@2x.png)

## 모범 사례

**가독성을 보장하십시오.** 라이트 및 다크 화면 모드 모두에서 스니펫의 사용자 설정 콘텐츠와 시스템 제공 배경 사이에 대비가 충분한지 확인하십시오. 또한 보기 내에 있는 콘텐츠의 여백을 일관되게 유지하십시오. 이렇게 하면 레이아웃이 명확해지며 스니펫을 빠르고 정확하게 해석할 수 있습니다.

**콘텐츠를 간결하게 유지하십시오.** 스니펫은 가볍고 빠른 상호작용을 용이하게 하기 위해 존재하므로, 스니펫의 콘텐츠를 짧고 읽기 쉽도록 만드는 것이 중요합니다. 모든 콘텐츠가 표시되도록 최대 400포인트보다 높지 않은 사용자 설정 보기를 생성하십시오. 포함할 텍스트의 양을 고려할 때, 선호 텍스트 크기 설정에 따라 서체 크기가 달라질 수 있음을 염두에 두십시오. 결과 스니펫의 경우, 더 많은 세부사항을 제공하려면 사용자 설정 보기에 포함하는 대신 앱 내 콘텐츠로 연결되는 딥링크를 사용하십시오.

**확인 스니펫의 기본 버튼에 설명하는 레이블을 선택하십시오.** [ConfirmationActionName](https://developer.apple.com/documentation/appintents/confirmationactionname) 레이블 중에서 적절한 레이블을 선택하거나 사용자 설정 레이블을 제공할 수 있습니다. 예를 들어, 커피 주문 스니펫을 디자인할 때 기본 버튼에 ‘주문’이라고 레이블을 지정하는 것이 ‘확인’ 또는 ‘진행’이라는 레이블보다 더 명확합니다. 레이블을 지정하지 않으면 시스템 기본값인 ‘계속’을 사용합니다.

**스니펫의 목적을 시각적으로 전달하십시오.** 대화 텍스트만으로 스니펫의 목적을 전달하러 하지 마십시오. 화면을 보지 않는 상황에서 상호작용을 하기 위해서는 말하는 앱 인텐트 대화가 반드시 필요하지만, 스니펫의 시각적 표현에서 생략하고 사용자 설정 보기를 대신 사용하여 정보를 전달하는 것이 좋습니다.

![다가오는 이벤트의 세부사항을 보여주는 캘린더에 표시된 결과 스니펫의 일러스트. 상단의 대화는 사용자 설정 보기의 정보를 반복하여 이벤트 제목, 날짜, 시간 및 참여자를 중복으로 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/snippet-response-heavy-dialogue-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![다가오는 이벤트의 세부사항을 보여주는 캘린더에 표시된 결과 스니펫의 일러스트. 스니펫의 상단에서 대화가 생략되고 사용자 설정 보기에서만 이벤트 제목, 날짜, 시간 및 참여자를 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/snippet-response-light-dialogue-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

## 플랫폼 고려 사항

*iOS, iPadOS 또는 macOS에 대한 추가 고려 사항은 없습니다. tvOS, visionOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[Siri](https://developer.apple.com/kr/design/human-interface-guidelines/siri)

[앱 단축어](https://developer.apple.com/kr/design/human-interface-guidelines/app-shortcuts)

[실시간 현황](https://developer.apple.com/kr/design/human-interface-guidelines/live-activities)

#### Developer 문서

[App Intents](https://developer.apple.com/documentation/appintents)

#### 비디오

- [대화형 스니펫 설계하기](https://developer.apple.com/kr/videos/play/wwdc2025/281) — 스니펫은 앱 인텐트에서 호출된 콤팩트한 뷰로, 앱에서 정보를 표시합니다. 이제 스니펫을 사용하면 인텐트의 일환으로 추가적인 상호작용을 제공하는 버튼과 마음 챙기기 정보를 포함하여 앱이 Siri, Spotlight, 단축어 앱에 훨씬 더 많은 기능을 제공할 수 있습니다. 이 세션에서는 레이아웃, 타이포그래피, 상호작용, 인텐트 유형에 대한 지침을 포함한 스니펫 설계에 대한 모범 사례를 확인할 수 있습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2026년 6월 8일 | 새로운 페이지. |
