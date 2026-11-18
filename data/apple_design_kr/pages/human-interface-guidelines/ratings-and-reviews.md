# 평가 및 리뷰

Source: https://developer.apple.com/kr/design/human-interface-guidelines/ratings-and-reviews

> 사람들은 종종 앱 또는 게임을 다운로드하기 전에 평가 및 리뷰를 봅니다.

![절반이 채워진 별의 스케치가 선호도 평가를 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 주황색을 은은하게 반영하는 주황색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/patterns-ratings-and-reviews-intro@2x.png)

긍정적인 평가 및 리뷰를 이끌어내는 데 가장 좋은 방법은 전반적으로 훌륭한 경험을 전달하는 것이지만, 사람들에게 피드백을 요청하는 알맞은 시간을 선택하는 것도 중요합니다. 모든 앱은 서로 다르지만, 이를 이끌어내는 방법에는 사람들이 앱을 실행하는 횟수나 빈도, 누군가가 둘러본 기능의 수, 사람들이 완료한 작업의 수 등에 대해 확인하는 작업이 포함됩니다.

사람들은 언제든 App Store에서 앱을 평가할 수 있습니다.

## 모범 사례

**사람들이 앱 또는 게임을 직접 체험하고 난 다음에만 평가를 요청하십시오.** 예를 들어, 사람들이 게임 레벨 또는 중요한 작업을 완료하면 요청하십시오. 첫 출시 또는 온보딩 기간에는 사람들이 앱의 가치를 분명히 이해하거나 의견을 형성할 만한 충분한 시간을 가지지 못하기 때문에 평가를 요청하지 마십시오. 사람들은 앱을 사용할 기회를 갖기 전에 앱이 평가를 요청한다고 느끼면 더욱 부정적인 평가를 남길 가능성이 큽니다.

![macOS에서 앱 또는 게임을 평가하도록 요청받았을 때 표시되는 UI 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/ratings-and-reviews-ios-alert@2x.png)

**사람들이 작업을 수행 중이거나 게임을 플레이하는 도중에 방해하는 것을 피하십시오.** 피드백 요청은 사용자 경험을 방해하고 부담을 줄 수 있습니다. 평가 요청이 덜 귀찮게 느껴지도록 앱 또는 게임에서 자연스럽게 쉬는 시간 또는 중단되는 지점을 찾으십시오.

**반복적인 요청을 피하십시오.** 반복되는 평가 요청은 귀찮게 느껴질 수 있고, 앱에 대한 사람들의 의견에 부정적인 영향을 미칠 수 있습니다. 최소 1~2주의 간격을 두고, 사람들이 추가적으로 앱을 경험한 다음에 요청을 해야 합니다.

**가급적 시스템 제공 요청을 사용하십시오.** iOS, iPadOS 및 macOS는 앱 및 게임이 일관적이고 방해가 되지 않게 평가 및 리뷰를 요청하는 방법을 제공합니다. 제공하려는 경험에서 피드백을 요청하기에 적절한 위치를 식별하면, 시스템이 이전 피드백을 확인하고 만약 없다면 평가 및 추가적으로 작성된 리뷰를 요청하는 앱 내 요청을 표시합니다. 사람들은 피드백을 제공하거나 탭 또는 클릭 한 번으로 요청을 해제할 수 있고, 설치한 모든 앱의 요청을 받지 않도록 할 수도 있습니다. 시스템은 자동으로 앱당 365일 동안 세 번까지 요청을 표시하도록 제한할 수 있습니다. 개발자 지침을 보려면 [RequestReviewAction](https://developer.apple.com/documentation/storekit/requestreviewaction)의 내용을 참조하십시오.

**요약 평점을 재설정할 때의 이점과 평점을 적게 표시할 때의 잠재적 단점을 비교하십시오.** 새로운 버전의 앱 또는 게임을 출시하면, 마지막 재설정 이후로 받은 개별 평가의 요약을 재설정할 수 있습니다. 재설정하면 평가가 현재 버전을 반영하게 되지만 전반적으로 더 적은 평가를 남기게 되고, 앱을 다운로드할 때 일부 사람들에게 부정적인 영향을 미칠 수 있습니다. 개발자 지침을 보려면 [Reset app summary rating](https://help.apple.com/app-store-connect/#/devfb7e87af8)의 내용을 참조하십시오

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

## 리소스

#### 관련 콘텐츠

[Ratings, reviews, and responses](https://developer.apple.com/app-store/ratings-and-reviews/)

#### Developer 문서

[RequestReviewAction](https://developer.apple.com/documentation/storekit/requestreviewaction) — StoreKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 9월 12일 | 아트워크가 추가됨. |
