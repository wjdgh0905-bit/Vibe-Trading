# 컴플리케이션

Source: https://developer.apple.com/kr/design/human-interface-guidelines/complications

> 컴플리케이션은 시계 페이스에 시기적절하고 관련성 있는 정보를 표시해 사람들이 손목을 들 때마다 해당 정보를 볼 수 있습니다.

![시간과 레이블이 있는 다양한 크기의 컴플리케이션 세트를 포함한 스타일화된 Apple Watch 페이스 모양. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-complications-intro@2x.png)

사람들은 앱을 열지 않아도 관심 있는 데이터를 빠르게 볼 수 있도록 여러 개의 강력한 컴플리케이션을 제공하는 앱을 선호합니다.

대부분 시계 페이스는 1개 이상의 컴플리케이션을 표시할 수 있으며 일부는 4개 이상을 표시합니다.

watchOS 9부터 시스템은 컴플리케이션(*액세서리*로도 불림)을 [원형](https://developer.apple.com/kr/design/human-interface-guidelines/complications#Circular) 및 [인라인](https://developer.apple.com/kr/design/human-interface-guidelines/complications#Inline) 등 다양한 패밀리로 구성하고 컴플리케이션 데이터를 표시하는 데 사용할 수 있는 추천 레이아웃을 정의합니다. 시계 페이스는 각 컴플리케이션 슬롯별로 지원하는 패밀리를 지정할 수 있습니다. watchOS 이전 버전에서 작동하는 컴플리케이션은 [레거시 템플릿](https://developer.apple.com/kr/design/human-interface-guidelines/complications#Legacy-templates)을 사용해 착용자가 선택한 색상을 적용하지 않는 논그래픽 컴플리케이션 스타일을 정의할 수 있습니다.

> **개발자 참고 사항:** [WidgetKit](https://developer.apple.com/documentation/widgetkit)를 사용하여 watchOS 9 이상의 컴플리케이션을 개발하십시오. 지침을 보려면 [Migrating ClockKit complications to WidgetKit](https://developer.apple.com/documentation/widgetkit/converting-a-clockkit-app)의 내용을 참조하십시오. watchOS의 이전 버전을 지원하려면 ClockKit 컴플리케이션 데이터 소스 프로토콜([CLKComplicationDataSource](https://developer.apple.com/documentation/clockkit/clkcomplicationdatasource) 참조)을 계속 구현하십시오.

## 모범 사례

**사람들이 한눈에 보고 싶어하는 중요하고 동적인 콘텐츠를 파악하십시오.** 사람들은 컴플리케이션을 사용해 앱을 빠르게 실행하는 기능보다 최신 관련 정보를 표시하는 컴플리케이션 동작을 더 중요하게 생각합니다. 중요한 데이터를 표시하지 않는 정적인 컴플리케이션은 시계 페이스의 눈에 잘 띄는 위치에 유지될 가능성이 낮습니다.

**가능하다면 모든 컴플리케이션 패밀리를 지원하십시오.** 패밀리를 더 많이 지원하면 컴플리케이션을 더 많은 시계 페이스에서 사용할 수 있습니다. 특정 컴플리케이션 패밀리에 유용한 정보를 표시할 수 없다면 시계 페이스에서 앱을 실행하는 데 사용할 수 있는 앱 대표 이미지(예: 앱 아이콘)를 제공하십시오.

**각 패밀리별로 다양한 컴플리케이션을 만드십시오.** 다양한 컴플리케이션을 지원하면 공유 가능한 시계 페이스를 사용할 수 있고 사람들은 자신이 좋아하는 앱을 중심으로 시계 페이스를 구성할 수 있습니다. 예를 들어, 철인 3종 경기 훈련을 돕는 앱은 경기의 각 구간별로 3개의 원형 컴플리케이션을 제공하며 각 컴플리케이션에는 앱의 구간별 영역으로 연결되는 딥링크가 있습니다. 또한 이 앱은 수영, 자전거, 달리기 컴플리케이션을 포함하고 사용자 설정 이미지 및 색상을 사용하기 위해 미리 구성된 공유 가능한 시계 페이스를 제공할 수 있습니다. 이 시계 페이스를 선택하는 경우, 사용하기 전에 어떤 구성도 할 필요가 없습니다. 지침을 보려면 [시계 페이스](https://developer.apple.com/kr/design/human-interface-guidelines/watch-faces)의 내용을 참조하십시오.

**지원하는 각 컴플리케이션별로 다른 딥링크를 정의하십시오.** 각 컴플리케이션으로 가장 관련성 있는 앱의 영역을 열 때 유용하게 사용할 수 있습니다. 지원하는 모든 컴플리케이션이 앱의 동일한 영역을 연다면 유용성이 떨어질 수 있습니다.

**개인정보 보호에 유념하십시오.** 화면 상시표시 Retina 디스플레이가 탑재된 경우, 시계 페이스의 정보는 착용자 외 사람들에게도 표시될 수 있습니다. 민감할 수 있는 정보가 다른 사람에게 노출되지 않도록 방지하십시오. 지침을 보려면 [화면 상시표시](https://developer.apple.com/kr/design/human-interface-guidelines/always-on)의 내용을 참조하십시오.

**데이터 업데이트 시기를 신중하게 고려하십시오.** 컴플리케이션의 데이터를 타임라인 형식으로 제공하며 해당 타임라인에는 각 입력 항목별로 시계 페이스에 데이터를 표시할 시간을 지정하는 값이 있습니다. 데이터 세트마다 다른 시간 값이 필요할 수 있습니다. 예를 들어, 회의 앱은 회의가 시작되기 1시간 전에 예정된 회의에 대한 정보를 표시할 수 있지만 날씨 앱은 특정 날씨 현상이 발생할 것으로 예상될 때 일기예보 정보를 표시합니다. 타임라인은 하루에 제한된 횟수만큼 업데이트할 수 있으며 시스템은 각 앱별로 제한된 수의 타임라인 입력 항목을 저장하기 때문에 데이터의 유용성을 높일 수 있는 시간을 선택해야 합니다. 개발자 지침을 보려면 [Migrating ClockKit complications to WidgetKit](https://developer.apple.com/documentation/widgetkit/converting-a-clockkit-app)의 내용을 참조하십시오.

## 시각 디자인

**표시하려는 데이터에 따라 링 또는 게이지 스타일을 선택하십시오.** 여러 패밀리는 시간에 따라 변하는 숫자 값을 일관적으로 표시할 수 있는 링 또는 게이지 레이아웃을 지원합니다. 예를 들어 다음과 같습니다.

- 닫힌 스타일은 배터리 게이지와 같이 전체의 백분율 값을 나타낼 수 있습니다.
- 열린 스타일은 속도 표시기처럼 최소값 또는 최대값이 임의로 정해지거나 전체의 백분율 값을 나타내지 않는 경우에 유용합니다.
- 열린 스타일처럼 구분 스타일도 앱에서 정의한 범위 내에서 값을 표시하고 소음 컴플리케이션처럼 빠른 값 변화를 나타낼 수 있습니다.

**색조 모드에서 이미지가 잘 보이는지 확인하십시오.** 색조 모드에서 시스템은 컴플리케이션 텍스트, 게이지 및 이미지에 단색을 적용하고, 전체 색상 이미지의 색조 버전을 제공하지 않으면 해당 이미지의 채도를 낮춥니다. 개발자 지침을 보려면 [WidgetRenderingMode](https://developer.apple.com/documentation/widgetkit/widgetrenderingmode)의 내용을 참조하십시오. (레거시 템플릿을 사용하는 경우, 색조 모드는 그래픽 컴플리케이션에만 적용됩니다.) 색조 모드에서 컴플리케이션이 잘 작동하는지 확인하려면 다음과 같이 하십시오.

- 색상만 사용하여 중요한 정보를 전달하지 마십시오. 색조 모드와 비색조 모드에서 모두 동일한 정보를 전달해야 합니다.
- 필요한 경우, 전체 색상 이미지의 색조 모드 대체 버전을 제공하십시오. 채도를 낮췄을 때 전체 색상 이미지가 잘 보이지 않는 경우, 색조 모드에서 사용할 이미지의 다른 버전을 시스템에 제공할 수 있습니다.

**전체 색상으로 컴플리케이션을 보는 대신 색조 모드를 선호하는 사람들이 있다는 점을 인지하십시오.** 색조 모드를 선택하면 시스템은 자동으로 컴플리케이션의 채도를 낮춰 그레이스케일로 변환하고 착용자가 선택한 색상에 따라 이미지, 게이지 및 텍스트에 단색 색조를 씌웁니다.

**컴플리케이션 콘텐츠를 만들 때 일반적으로 2포인트 이상의 선 굵기를 사용하십시오.** 얇은 선은 한눈에 들어오지 않을 수 있으며 이 문제는 특히 착용자가 움직이고 있을 때 두드러집니다. 이미지의 크기와 복잡성에 적합한 선 굵기를 사용하십시오.

**지원하는 각 컴플리케이션별로 정적인 위치 지정자 이미지 세트를 제공하십시오.** 시스템은 표시할 컴플리케이션의 데이터 콘텐츠가 없으면 위치 지정자 이미지를 사용합니다. 예를 들어, 사람들이 앱을 처음 설치할 때 시스템은 대신 사용할 현지화된 위치 지정자를 앱이 생성할 수 있는지 확인하는 동안 정적인 위치 지정자를 표시할 수 있습니다. 위치 지정자 이미지는 컴플리케이션을 선택할 수 있는 캐러셀에서 표시할 수도 있습니다. 컴플리케이션 이미지 크기는 레이아웃(및 레거시 템플릿)별로 다르고 위치 지정자 이미지의 크기는 해당 컴플리케이션에 제공하는 실제 이미지의 크기와 일치하지 않을 수 있습니다. 개발자 지침을 보려면 [placeholder(in:)](https://developer.apple.com/documentation/widgetkit/timelineprovider/placeholder(in:))의 내용을 참조하십시오.

## 원형

원형 레이아웃은 인포그래프 및 인포그래프 모듈 시계 페이스의 원형 영역에 텍스트, 게이지 및 전색상 이미지를 포함할 수 있습니다. 원형 패밀리는 큰글자 시계 페이스에 콘텐츠를 표시할 때 사용 가능한 초대형 레이아웃도 정의합니다.

![빨간색 원 안에 하얀색 음표 아이콘이 표시됨. 원의 윤곽선은 둘레의 약 90%가 밝은 빨간색으로, 약 10%가 흐린 빨간색으로 표시되어 현재 진행률을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/circular-closed-gauge-image@2x.png)

![초록색 원 안에 숫자 100이 하얀색 텍스트로 표시됨. 원의 윤곽선이 둘레의 시작점과 약 5% 겹치며 현재 진행률을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/circular-closed-gauge-text@2x.png)

![약 8시 방향에서 시작되어 약 4시 방향에서 끝나는 부분 원으로 둘러싸인 숫자 1.0이 하얀색 텍스트로 표시됨. 부분 원의 윤곽선은 8시 방향의 초록색에서 4시 방향의 보라색으로 변경됨. 약 6시 방향에 작은 초록색 태양 아이콘이 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/circular-open-gauge-image@2x.png)

![약 8시 방향에서 시작되어 약 4시 방향에서 끝나는 부분 원으로 둘러싸인 숫자 42가 하얀색 텍스트로 표시됨. 부분 원의 윤곽선은 8시 방향의 파란색에서 4시 방향의 보라색으로 변경됨. 약 6시 방향에서 문자 A, Q, I가 초록색 텍스트로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/circular-open-gauge-simple-text@2x.png)

![약 8시 방향에서 시작되어 약 4시 방향에서 끝나는 부분 원으로 둘러싸인 숫자 72가 하얀색 텍스트로 표시됨. 부분 원의 윤곽선은 8시 방향의 초록색에서 4시 방향의 노란색으로 변경됨. 약 6시 방향에 두 숫자가 나란히 표시됨. 왼쪽에 초록색 텍스트로 55, 오른쪽에 주황색 텍스트로 76이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/circular-open-gauge-range-text@2x.png)

![심호흡 앱 아이콘의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/graphic-circular-image@2x.png)

![시간 오후 7시 24분 위에 일몰 아이콘이 원형 영역의 중앙에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-circular-stack@2x.png)

![원형 영역 중앙에 위치한 텍스트 두 줄. 첫 번째 줄에는 하얀색으로 표시된 Apple 주식 기호 A A P L, 두 번째 줄에는 초록색으로 표시된 숫자 121.96이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-circular-stack-text@2x.png)

인포그래프와 같이 일부 시계 페이스의 베젤에 따라 텍스트를 구부리는 디자인을 사용하여 텍스트를 일반 크기 원형 이미지와 함께 추가할 수도 있습니다. 텍스트는 잘리기 전까지 베젤의 약 180도까지 채울 수 있습니다.

![원의 상단 3분의 1 곡선을 따라 하얀색 텍스트 한 줄이 표시됨. 텍스트는 오전 8시 요가, 플로우 스튜디오라고 적힘. 텍스트 아래 중앙에는 달력 날짜인 금요일 23일이 원형 영역에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/bezel-circular-text@2x.png)

일반 크기 원형 컴플리케이션의 이미지를 디자인할 때 다음 값을 지침으로 따르십시오.

| 이미지 | 40mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- |
| 이미지 | 42x42pt(84x84px @2x) | 44.5x44.5pt(89x89px @2x) | 47x47pt(94x94px @2x) | 50x50pt(100x100px @2x) |
| 닫힌 게이지 | 27x27pt(54x54px @2x) | 28.5x28.5pt(57x57px @2x) | 31x31pt(62x62px @2x) | 32x32pt(64x64px @2x) |
| 열린 게이지 | 11x11pt(22x22px @2x) | 11.5x11.5pt(23x23px @2x) | 12x12pt(24x24px @2x) | 13x13pt(26x26px @2x) |
| 스택(텍스트 아님) | 28x14pt(56x28px @2x) | 29.5x15pt(59X30px @2x) | 31x16pt(62x32px @ 2x) | 33.5x16.5pt(67x33px @2x) |

> **참고:** 시스템은 각 이미지에 원형 마스크를 적용합니다.

일반 크기 원형 컴플리케이션을 적용하는 SwiftUI 보기는 다음과 같은 기본 텍스트 값을 사용합니다.

- 스타일: 둥근 모양
- 굵기: 중간체
- 텍스트 크기: 12pt(40mm), 12.5pt(41mm), 13pt(44mm), 14.5pt(45mm/49mm)

큰글자 시계 페이스에 표시할 수 있는 중요한 정보를 크게 나타내려면(예: 연락처 사진을 표시하는 연락처 컴플리케이션) 원형 패밀리의 매우 큰 레이아웃 버전을 사용하십시오. 다음 레이아웃을 사용하면 큰글자 시계 페이스의 대부분을 채우는 큰 원형 영역에 전색상 이미지, 텍스트 및 게이지를 표시할 수 있습니다. 일부 텍스트 필드는 멀티컬러 텍스트를 지원할 수 있습니다.

![빨간색 원 안에 하얀색 음표 아이콘이 표시됨. 원의 윤곽선은 둘레의 약 66%가 밝은 빨간색으로, 약 10%가 흐린 빨간색으로 표시되어 현재 진행률을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-xl-circular-closed-gauge-image@2x.png)

![파란색 원 안에 숫자 85가 파란색 텍스트로 표시됨. 원의 윤곽선은 둘레의 약 85%가 밝은 파란색으로, 약 15%가 흐린 파란색으로 표시되어 현재 진행률을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-xl-circular-closed-gauge-text@2x.png)

![하단에 물방울 모양을 포함한 옅은 파란색 부분 원으로 둘러싸인 숫자 50이 옅은 파란색 텍스트로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-xl-circular-open-gauge-image@2x.png)

![하단에 초록색으로 표시된 문자 A,Q, I를 포함한 하얀색 부분 원으로 둘러싸인 숫자 29가 초록색 텍스트로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-xl-circular-open-gauge-simple-text@2x.png)

![8시 방향의 초록색에서 4시 방향의 빨간색으로 변경되는 원으로 둘러싸인 숫자 56이 하얀색 텍스트로 표시됨. 부분 원의 하단에 두 숫자가 나란히 표시됨. 왼쪽에 초록색 텍스트로 52, 오른쪽에 빨간색 텍스트로 89가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-xl-circular-open-gauge-range-text@2x.png)

![심호흡 앱 아이콘의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-xl-circular-image@2x.png)

![시간 오후 7시 24분 위에 빨간색 일몰 아이콘이 원형 영역의 중앙에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-xl-circular-stack-image@2x.png)

![원형 영역 중앙에 위치한 텍스트 두 줄. 첫 번째 줄에는 하얀색으로 표시된 Apple 주식 기호 A A P L, 두 번째 줄에는 초록색으로 표시된 숫자 121.96이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-graphic-xl-circular-stack-text@2x.png)

특대형 원형 컴플리케이션의 이미지를 생성할 때 다음 값을 지침으로 따르십시오.

| 이미지 | 40mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- |
| 이미지 | 120x120pt(240x240px @2x) | 127x127pt(254x254px @2x) | 132x132pt(264x264px @2x) | 143x143pt(286x286px @2x) |
| 열린 게이지 | 31x31pt(62x62px @2x) | 33x33pt(66x66px @2x) | 33x33pt(66x66px @2x) | 37x37pt(74x74px @2x) |
| 닫힌 게이지 | 77x77pt(154x154px @2x) | 81.5x81.5(163x163px @2x) | 87x87pt(174x174px @2x) | 91.5x91.5(183x183px @2x) |
| 스택 | 80x40pt(160x80px @2x) | 85x42(170x84px @2x) | 87x44pt(174x88px @2x) | 95x48pt(190x96px @2x) |

> **참고:** 시스템은 원형, 열린 게이지 및 닫힌 게이지 이미지에 원형 마스크를 적용합니다.

다음 값을 사용하여 원형 패밀리 컴플리케이션용 콘텐츠 없음 위치 지정자 이미지를 생성하십시오.

| 레이아웃 | 38mm | 40mm/42mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- | --- |
| 원형 | – | 42x42pt(84x84px @2x) | 44.5x44.5pt(89x89px @2x) | 47x47pt(94x94px @2x) | 50x50pt(100x100px @2x) |
| 베젤 | – | 42x42pt(84x84px @2x) | 44.5x44.5pt(89x89px @2x) | 47x47pt(94x94px @2x) | 50x50pt(100x100px @2x) |
| 특대형 | – | 120x120pt(240x240px @2x) | 127x127pt(254x254px @2x) | 132x132pt(264x264px @2x) | 143x143pt(286x286px @2x) |

특대형 원형 레이아웃을 적용하는 SwiftUI 보기는 다음과 같은 기본 텍스트 값을 사용합니다.

- 스타일: 둥근 모양
- 굵기: 중간체
- 텍스트 크기: 34.5pt(40mm), 36.5pt(41mm), 36.5pt(44mm), 41pt(45mm/49mm)

## 모서리

모서리 레이아웃을 사용하면 인포그래프와 같이 시계 페이스 모서리에 전색상 이미지, 텍스트 및 게이지를 표시할 수 있습니다. 일부 템플릿은 멀티컬러 텍스트를 지원할 수 있습니다.

![원형 영역 안에 하얀색 구름으로 일부분 가려진 노란색 태양 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/corner-circular-image@2x.png)

![얇은 단색 막대 옆에 14분 59초라는 값이 표시됨. 텍스트와 막대는 원의 오른쪽 하단 사분면의 곡선을 따라 표시되는 것처럼 보임. 타이머 앱 아이콘이 시간 값 아래에 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/corner-gauge-image@2x.png)

![음영이 있는 색상 막대를 사이에 두고 날씨 값 55는 초록색, 76은 주황색으로 표시됨. 막대는 값에 따라 초록색에서 주황색으로 변경됨. 텍스트와 막대는 원의 오른쪽 상단 사분면의 곡선을 따라 표시되는 것처럼 보임. 72도 값은 온도 범위 위에 큰 하얀색 텍스트로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/corner-gauge-text@2x.png)

![텍스트 두 줄 모두 원의 왼쪽 상단 사분면의 곡선을 따라 표시되는 것처럼 보임. 상단 줄에 단어 CUP이 크고 하얀색인 텍스트로 표시됨. 하단 줄에는 오전 10시 9분, 더하기 기호와 0시간이 모두 주황색 텍스트로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/corner-stack-text@2x.png)

![0시간 0분 0초가 주황색 텍스트로 표시되는 줄. 줄은 원의 왼쪽 하단 사분면의 곡선을 따라 표시되는 것처럼 보임. 텍스트 줄 아래에 스톱워치 앱 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/corner-text-image@2x.png)

모서리 컴플리케이션의 이미지를 디자인할 때 다음 값을 지침으로 따르십시오.

| 이미지 | 40mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- |
| 원형 | 32x32pt(64x64px @2x) | 34x34pt(68x68px @2x) | 36x36pt(72x72px @2x) | 38x38pt(76x76px @2x) |
| 게이지 | 20x20pt(40x40px @2x) | 21x21pt(42x42px @2x) | 22x22pt(44x44px @2x) | 24x24pt(48x48px @2x) |
| 텍스트 | 20x20pt(40x40px @2x) | 21x21pt(42x42px @2x) | 22x22pt(44x44px @2x) | 24x24pt(48x48px @2x) |

> **참고:** 시스템은 각 이미지에 원형 마스크를 적용합니다.

다음 값을 사용하여 모서리 패밀리 컴플리케이션용으로 콘텐츠가 없을 때 사용할 위치 지정자 이미지를 생성하십시오.

| 38mm | 40mm/42mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- |
| – | 20x20pt(40x40px @2x) | 21x21pt(42x42px @2x) | 22x22pt(44x44px @2x) | 24x24pt(48x48px @2x) |

모서리 레이아웃을 적용하는 SwiftUI 보기는 다음과 같은 기본 텍스트 값을 사용합니다.

- 스타일: 둥근 모양
- 굵기: 세미볼드체
- 텍스트 크기: 10pt(40mm), 10.5pt(41mm), 11pt(44mm), 12pt(45mm/49mm)

## 인라인

인라인 레이아웃은 실용적인 대형 및 소형 레이아웃을 포함합니다.

실용적인 소형 레이아웃은 크로노그래프 및 심플 시계 페이스 등 시계 페이스 모서리의 직사각형 영역을 차지하는 용도로 디자인됐습니다. 콘텐츠는 이미지, 인터페이스 아이콘 또는 원형 그래프를 포함할 수 있습니다.

![6시 9분 위에 문자 L, O, N이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-utility-small-flat@2x.png)

![각 부분 링 중앙에 물방울 아이콘 2개가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-utility-small-ring-image@2x.png)

![각 부분 링 2개 중앙에 숫자 63이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-utility-small-ring-text@2x.png)

![달 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/complication-utility-small-square@2x.png)

실용적인 소형 레이아웃을 디자인할 때 다음 값을 지침으로 따르십시오.

| 콘텐츠 | 38mm | 40mm/42mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- | --- |
| 평면 | 9-21x9pt(18-42x18px @2x) | 10-22x10pt(20-44x20px @2x) | 10.5-23.5x21pt(21-47x21 @2x) | 없음 | 12-26x12pt(24-52x24px @2x) |
| 링 | 14x14pt(28x28px @2x) | 14x14pt(28x28px @2x) | 15x15pt(30x30px @2x) | 16x16pt(32x32px @2x) | 16.5x16.5pt(33x33px @2x) |
| 사각형 | 20x20pt(40x40px @2x) | 22x22pt(44x44px @2x) | 23.5x23.5pt(47x47px @2x) | 25x25pt(50x50px @2x) | 26x26pt(52x52px @2x) |

실용적인 대형 레이아웃은 주로 텍스트를 기반으로 하지만 텍스트의 선행 근처에 배치된 인터페이스 아이콘도 지원합니다. 이 레이아웃은 유틸리티 또는 모션 시계 페이스처럼 시계 페이스의 하단에 걸쳐 있습니다.

![오전 11시 사진 촬영이라는 텍스트가 큰 텍스트 크기로 한 줄에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-utility-large-flat@2x.png)

실용적인 큰 레이아웃을 디자인할 때 다음 값을 지침으로 따르십시오.

| 콘텐츠 | 38mm | 40mm/42mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- | --- |
| 평면 | 9-21x9pt(18-42x18px @2x) | 10-22x10pt(20-44x20px @2x) | 10.5-23.5x10.5pt (21-47x21px @2x) | 없음 | 12-26x12pt(24-52x24px @2x) |

## 직사각형

직사각형 레이아웃은 전색상 이미지, 텍스트, 게이지 및 제목(선택 사항)을 큰 직사각형 영역에 표시할 수 있습니다. 일부 텍스트 필드는 멀티컬러 텍스트를 지원할 수 있습니다.

큰 직사각형 영역은 정보가 풍부한 차트, 그래프 및 다이어그램을 표시할 공간을 제공하기 때문에 시간에 따라 변하는 값 또는 과정의 세부사항을 표시하는 데 유용합니다. 예를 들어, 심박수 컴플리케이션은 24시간 동안 수집된 심박수 값을 그래프로 표시합니다. 그래프는 기본 콘텐츠에 고대비 하얀색 및 빨간색, 그래프 선과 레이블에 저대비 회색을 사용하여 데이터를 한눈에 쉽게 이해할 수 있도록 합니다.

watchOS 10부터 watchOS 앱용 직사각형 레이아웃을 생성한 경우, 시스템이 해당 레이아웃을 스마트 스택에서 표시할 수 있습니다. 이 표시 방식은 다음과 같이 다양한 방법으로 최적화할 수 있습니다.

- 정보는 전달하거나 인식을 돕는 배경 색상 또는 콘텐츠 제공
- [intents](https://developer.apple.com/documentation/appintents/app-intents)(인텐트)를 사용한 관련성 지정 및 사람들에게 가장 적절하고 유용한 시간에 위젯 표시
- 스마트 스택에 최적화된 사용자 설정 정보 레이아웃 생성

개발자 지침을 보려면 [WidgetFamily.accessoryRectangular](https://developer.apple.com/documentation/widgetkit/widgetfamily/accessoryrectangular)의 내용을 참조하십시오. 스마트 스택용 위젯 디자인하기에 대한 추가 지침을 보려면 [위젯](https://developer.apple.com/kr/design/human-interface-guidelines/widgets)의 내용을 참조하십시오.

![왼쪽 정렬된 텍스트 3줄. 첫 번째 줄은 물 미리 알림이라는 단어를 파란색 텍스트로 표시함. 두 번째 줄은 32온스 섭취라는 단어를 하얀색 텍스트로 표시함. 세 번째 줄은 ‘4일 연속 달성! 잘했어요!’라는 단어를 회색 텍스트로 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/rectangular-standard-body@2x.png)

![진행률을 표시하기 위해 색상으로 채울 수 있는 막대 위에 텍스트 2줄이 표시됨. 첫 번째 줄에는 물방울 아이콘과 물 미리 알림이라는 단어를 파란색 텍스트로 표시됨. 두 번째 줄은 32온스 섭취라는 단어를 하얀색 텍스트로 표시함. 막대는 첫 번째 텍스트 줄과 동일한 파란색을 사용하여 왼쪽에서 전체 길이의 약 70%까지 막대를 채움.](https://developer.apple.com/images/com.apple.HIG/kr/rectangular-text-gauge@2x.png)

![그래프 위에 표시된 텍스트. 텍스트에는 68 B, P, M이라는 단어가 하얀색으로 표시되고, 그 뒤에 2분 전이라는 단어가 빨간색 텍스트로 표시됨. 그래프는 시간 경과에 따른 여러 심박수 값을 보여줌.](https://developer.apple.com/images/com.apple.HIG/kr/rectangular-large-image@2x.png)

직사각형 레이아웃의 이미지를 생성할 때 다음 값을 지침으로 따르십시오.

| 콘텐츠 | 40mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- |
| 제목이 있는 큰 이미지 * | 150x47pt(300x94px @2x) | 159x50pt(318x100px @2x) | 171x54pt(342x108px @2x) | 178.5x56pt(357x112px @2x) |
| 제목이 없는 큰 이미지 * | 162x69pt(324x138px @2x) | 171.5x73pt(343x146px @2x) | 184x78pt(368x156px @2x) | 193x82pt(386x164px @2x) |
| 표준 본문 | 12x12pt(24x24px @2x) | 12.5x12.5pt(25x25px @2x) | 13.5x13.5pt(27x27px @2x) | 14.5x14.5pt(29x29px @2x) |
| 텍스트 게이지 | 12x12pt(24x24px @2x) | 12.5x12.5pt(25x25px @2x) | 13.5x13.5pt(27x27px @2x) | 14.5x14.5pt(29x29px @2x) |

> **참고:** 2가지 큰 이미지 레이아웃은 모두 자동으로 4점 모서리 반경을 포함합니다.

직사각형 레이아웃을 적용하는 SwiftUI 보기는 다음과 같은 기본 텍스트 값을 사용합니다.

- 스타일: 둥근 모양
- 굵기: 중간체
- 텍스트 크기: 16.5pt(40mm), 17.5pt(41mm), 18pt(44mm), 19.5pt(45mm/49mm)

## 레거시 템플릿

### 원형 소형

원형 소형 템플릿은 작은 이미지 또는 텍스트 일부를 시계 페이스 모서리에 표시합니다(예: 색상 시계 페이스).

![부분 링 중앙에 물방울 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-circular-small-ring-image@2x.png)

![부분 링 중앙에 숫자 63이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-circular-small-ring-text@2x.png)

![원형 영역 중앙에 스톱워치 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-circular-small-simple-image@2x.png)

![원형 영역 중앙에 숫자 68과 온도 기호가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-circular-small-simple-text@2x.png)

![시간 오후 7시 24분 위에 일몰 아이콘이 원형 영역의 중앙에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-circular-small-stack-image@2x.png)

![6시 9분 위에 문자 L, O, N이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-circular-small-stack-text@2x.png)

원형 소형 컴플리케이션을 디자인할 때 다음 값을 지침으로 따르십시오.

| 이미지 | 38mm | 40mm/42mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- | --- |
| 링 | 20x20pt(40x40px @2x) | 22x22pt(44x44px @2x) | 23.5x23.5pt(47x47px @2x) | 24x24pt(48x48px @2x) | 26x26pt(52x52px @2x) |
| 심플 | 16x16pt(32x32px @2x) | 18x18pt(36x36px @2x) | 19x19pt(38x38px @2x) | 20x20pt(40x40px @2x) | 21.5x21.5pt(43x43px @2x) |
| 스택 | 16x7pt(32x14px @2x) | 17x8pt(34x16px @2x) | 18x8.5pt(36x17px @2x) | 19x9pt(38x18px @2x) | 19x9.5pt(38x19px @2x) |
| 위치 지정자 | 16x16pt(32x32px @2x) | 18x18xpt(36x36px @2x) | 19x19pt(38x38px @2x) | 20x20pt(40x40px @2x) | 21.5x21.5pt(43x43px @2x) |

> **참고:** 각 스택 측정값에서 굵기 값은 최대 크기를 나타냅니다.

### 모듈 소형

모듈 소형 템플릿은 아이콘과 콘텐츠, 원형 그래프 또는 단일 큰 항목(예: 모듈 시계 페이스의 컴플리케이션 하단 행)으로 구성된 스택 행 2개를 표시합니다.

![텍스트와 숫자가 2줄 열로 표시됨. 상단 행에는 문자 C와 P, 숫자 14가 표시됨. 하단 행에는 문자 M과 H, 숫자 28이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-small-columns-text@2x.png)

![부분 링 중앙에 물방울 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-small-ring-image@2x.png)

![부분 링 중앙에 숫자 63이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-small-ring-text@2x.png)

![달 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-small-simple-image@2x.png)

![숫자 68과 온도 기호.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-small-simple-text@2x.png)

![시간 오후 7시 24분 위에 일몰 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-small-stack-image@2x.png)

![6시 9분 위에 문자 L, O, N이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-small-stack-text@2x.png)

모듈 소형 컴플리케이션용 아이콘 및 이미지를 디자인할 때 다음 값을 지침으로 따르십시오.

| 이미지 | 38mm | 40mm/42mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- | --- |
| 링 | 18x18pt(36x36px @2x) | 19x19pt(38x38px @2x) | 20x20pt(40x40px @2x) | 21x21pt(42x42px @2x) | 22.5x22.5pt(45x45px @2x) |
| 심플 | 26x26pt(52x52px @2x) | 29x29pt(58x58px @2x) | 30.5x30.5pt(61x61px @2x) | 32x32pt(64x64px @2x) | 34.5x34.5pt(69x69px @2x) |
| 스택 | 26x14pt(52x28px @2x) | 29x15pt(58x30px @2x) | 30.5x16pt(61x32px @2x) | 32x17pt(64x34px @2x) | 34.5x18pt(69x36px @2x) |
| 위치 지정자 | 26x26pt(52x52px @2x) | 29x29pt(58x58px @2x) | 30.5x30.5pt(61x61px @2x) | 32x32pt(64x64px @2x) | 34.5x34.5pt(69x69px @2x) |

> **참고:** 각 스택 측정값에서 굵기 값은 최대 크기를 나타냅니다.

### 모듈 대형

모듈 대형 템플릿은 최대 3줄로 콘텐츠를 표시할 수 있는 큰 캔버스(예: 모듈 시계 페이스 중앙)를 제공합니다.

![활동 관련 정보가 열마다 3줄로 표시됨. 상단 줄에는 660칼로리 중 396칼로리가 표시됨. 중간 줄에는 30분 중 13분이 표시됨. 하단 줄에는 12시간 중 3시간이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-large-columns@2x.png)

![날씨 관련 정보가 왼쪽 정렬된 텍스트 3줄로 표시됨. 상단 줄에는 캘리포니아 주 쿠퍼티노라는 위치가 표시됨. 중간 줄에는 68도와 흐림이 표시됨. 하단 줄에는 예상 최고기온 72도, 최저기온 62도가 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-large-standard-body@2x.png)

![스포츠 관련 정보가 제목이 있는 2열 2행 표로 표시됨. 표 제목은 최종 점수임. 첫 번째 표 행에는 숫자 14와 Central Prep이라는 텍스트가 포함됨. 두 번째 표 행에는 숫자 28과 Mission High라는 텍스트가 포함됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-large-table@2x.png)

![캘린더 관련 정보가 양쪽 정렬된 텍스트 2줄로 표시됨. 첫 번째 줄에는 수요일이라는 단어가 표시됨. 두 번째 줄에는 3월과 숫자 9가 첫 번째 줄의 텍스트보다 2배 더 큰 높이로 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-modular-large-tall-body@2x.png)

모듈 대형 컴플리케이션용 아이콘 및 이미지를 디자인할 때 다음 값을 지침으로 따르십시오.

| 콘텐츠 | 38mm | 40mm/42mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- | --- |
| 열 | 11-32x11pt(22-64x22px @2x) | 12-37x12pt(24-74x24px @2x) | 12.5-39x12.5pt(25-78x25px @2x) | 14-42x14pt(28-84x28px @2x) | 14.5-44x14.5pt(29-88x29px @2x) |
| 표준 본문 | 11-32x11pt(22-64x22px @2x) | 12-37x12pt(24-74x24px @2x) | 12.5-39x12.5pt(25-78x25px @2x) | 14-42x14pt(28-84x28px @2x) | 14.5-44x14.5pt(29-88x29px @2x) |
| 표 | 11-32x11pt(22-64x22px @2x) | 12-37x12pt(24-74x24px @2x) | 12.5-39x12.5pt(25-78x25px @2x) | 14-42x14pt(28-84x28px @2x) | 14.5-44x14.5pt(29-88x29px @2x) |

### 특대형

특대형 템플릿은 더 큰 텍스트 및 이미지를 표시합니다(예: 큰글자 시계 페이스).

![부분 링 중앙에 물방울 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-extralarge-ring-image@2x.png)

![부분 링 중앙에 숫자 63이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-extralarge-ring-text@2x.png)

![달 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/complication-extralarge-simple-image@2x.png)

![숫자 68과 온도 기호.](https://developer.apple.com/images/com.apple.HIG/kr/complication-extralarge-simple-text@2x.png)

![시간 오후 7시 24분 위에 일몰 아이콘이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-extralarge-stack-image@2x.png)

![6시 9분 위에 문자 L, O, N이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/complication-extralarge-stack-text@2x.png)

특대형 컴플리케이션용 아이콘 및 이미지를 디자인할 때 다음 값을 지침으로 따르십시오.

| 이미지 | 38mm | 40mm/42mm | 41mm | 44mm | 45mm/49mm |
| --- | --- | --- | --- | --- | --- |
| 링 | 63x63pt(126x126px @2x) | 66.5x66.5pt(133x133px @2x) | 70.5x70.5pt(141x141px @2x) | 73x73pt(146x146px @2x) | 79x79pt(158x158px @2x) |
| 심플 | 91x91pt(182x182px @2x) | 101.5x101.5pt(203x203px @2x) | 107.5x107.5pt(215x215px @2x) | 112x112pt(224x224px @2x) | 121x121pt(242x242px @2x) |
| 스택 | 78x42pt(156x84px @2x) | 87x45pt(174x90px @2x) | 92x47.5pt(184x95px @2x) | 96x51pt(192x102px @2x) | 103.5x53.5pt(207x107px @2x) |
| 위치 지정자 | 91x91pt(182x182px @2x) | 101.5x101.5pt(203x203px @2x) | 107.5x107.5pt(215x215px @2x) | 112x112pt(224x224px @2x) | 121x121pt(242x242px @2x) |

> **참고:** 각 스택 측정값에서 굵기 값은 최대 크기를 나타냅니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS 또는 visionOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[시계 페이스](https://developer.apple.com/kr/design/human-interface-guidelines/watch-faces)

#### Developer 문서

[WidgetKit](https://developer.apple.com/documentation/widgetkit)

#### 비디오

- [Apple Watch의 Smart Stack을 위한 위젯 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2023/10309) — 새로운 Smart Stack으로 위젯을 watchOS로 가져오세요. 앱의 위젯이 한눈에 뚜렷하게 더 잘 보이고, 스마트해질 수 있도록 표준 디자인 레이아웃, 컬러, 아이콘, 신호 기반 관련성을 사용하는 법을 알아봅니다. 준비되셨다면, 'watchOS에서 Smart Stack을 위한 위젯 구축하기' 코딩 세션도 시청해 보세요.
- [WidgetKit로 멋진 컴플리케이션 만들기](https://developer.apple.com/kr/videos/play/wwdc2022/10051) — WidgetKit을 사용하여 시계 페이스에서 아름다운 컴플리케이션을 만드는 방법을 살펴보겠습니다. WidgetKit에서 확인할 수 있는 watchOS별 기능을 소개하고, 기존 ClockKit 컴플리케이션에서 마이그레이션하는 방법을 알려드립니다.  WidgetKit에 대해 자세히 알아보려면 WWDC22의 ‘Complications and Widgets: Reloaded(컴플리케이션 및 위젯: 리로리드)’를 시청하시기 바랍니다.
- [컴플리케이션 및 위젯: 리로리드](https://developer.apple.com/kr/videos/play/wwdc2022/10050) — watchOS 및 iOS 잠금 화면으로의 모험과 함께 위젯 코드 실습을 해보겠습니다. watchOS에서의 복잡한 컴플리케이션에 강력한 기능을 더하고 iPhone의 잠금 화면 위젯을 만들 수 있도록 해 주는 WidgetKit의 향상된 최신 기능에 대해 알아보세요. 최신 SwiftUI 보기를 통합하여 한 눈에 볼 수 있는 우수한 데이터를 제공하는 방법을 안내하고, 각 플랫폼이 콘텐츠를 렌더링하는 방식을 알아보고, 위젯이나 컴플리케이션 내 콘텐츠의 디자인과 느낌을 맞춤화하는 방법을 배워보겠습니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2023년 10월 24일 | 지원 중단된 ClockKit 문서 링크를 WidgetKit 문서 링크로 대체함. |
| 2023년 6월 5일 | 스마트 스택에서 위젯으로 지원하도록 직사각형 컴플리케이션에 대한 지침이 업데이트됨. |
| 2022년 9월 14일 | Apple Watch Ultra 명세가 추가됨. |
