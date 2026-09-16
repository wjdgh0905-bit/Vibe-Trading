# 다크 모드

Source: https://developer.apple.com/kr/design/human-interface-guidelines/dark-mode

> 다크 모드는 조명이 어두운 환경에서 편안한 시각 경험을 제공하도록 어두운 색상 팔레트를 사용하는 시스템 전반적인 화면 모드 설정입니다.

![절반이 채워져 있는 동심원 스케치가 있으며, 밝음과 어두움을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 노란색을 은은하게 반영하는 노란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/foundations-dark-mode-intro@2x.png)

iOS, iPadOS, macOS 및 tvOS에서 사람들은 다크 모드를 기본 인터페이스 스타일로 자주 설정하며 일반적으로 모든 앱과 게임이 이 환경설정을 따를 것으로 기대합니다. 다크 모드에서 시스템은 모든 화면, 보기, 메뉴 및 제어기에 어두운 색상의 팔레트를 사용하며, 더 높은 지각적 대비를 통해 어두운 배경에서 전면 콘텐츠가 잘 드러나도록 만들 수도 있습니다.

## 모범 사례

**앱에서만 사용하는 화면 모드 설정을 제공하지 마십시오.** 앱에서만 사용하는 화면 모드 옵션이 있을 경우 두 번 이상 설정을 조절해야 원하는 화면 모드를 사용할 수 있으므로 부담이 늘어납니다. 심지어 앱에서 시스템의 화면 모드 설정을 따르지 않기 때문에 앱이 고장 났다고 생각할 수도 있습니다.

**두 화면 모드 모두에서 앱이 잘 표시되도록 하십시오.** 두 화면 모드 중 하나를 사용하는 것 외에도 사람들은 화면 모드 설정을 ‘자동’으로 선택할 수 있습니다. ‘자동’을 선택하면 하루 중 상태 변화에 따라 라이트 모드와 다크 모드 간에 전환되며 앱이 실행되고 있을 때 이런 전환이 발생할 수도 있습니다.

**두 화면 모드 모두에서 콘텐츠를 편안하게 읽을 수 있는지 테스트하십시오.** 예를 들어, 대비 증가와 투명도 줄이기가 별개로 또는 함께 켜져 있는 다크 모드의 경우 어두운 배경에 있는 어두운 텍스트의 가독성이 떨어지는 것을 발견할 수 있습니다. 또한 다크 모드에서 대비 증가를 켜면 어두운 텍스트와 어두운 배경 사이의 시각적 대비가 감소하는 것을 확인할 수 있습니다. 시력이 좋은 사람들은 대비가 낮은 텍스트를 읽을 수 있지만 다수의 사람들에게는 이러한 텍스트가 읽기 어려울 수 있습니다. 지침을 보려면 [손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility)의 내용을 참조하십시오.

**드물지만 어떤 경우에는 인터페이스에서 다크 모드만 사용하는 것을 고려하십시오.** 예를 들어, 몰입감 있는 미디어 시청을 지원하는 앱에서는 UI를 가리고 미디어에 집중할 수 있도록 다크 모드를 계속 사용하는 것이 적합할 수 있습니다.

![표준 다크 모드 상태의 iPhone 주식 앱 스크린샷에 Apple Inc. 주식 세부사항이 표시됨. 보기에는 현재 주가 요약 및 직전 1년의 추세 그래프가 포함됨.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-stocks-app-dark-only-mode@2x.png)

## 다크 모드 색상

다크 모드의 색상 팔레트는 더 어두운 배경 색상과 더 밝은 전경 색상을 포함하고 있습니다. 이러한 색상이 대응되는 라이트 모드 색상과 꼭 반대되는 색상은 아니라는 점에 유의해야 합니다. 다수의 색상이 반대색이기는 하지만 그렇지 않을 때도 있습니다. 자세한 정보를 보려면 [명세](https://developer.apple.com/kr/design/human-interface-guidelines/color#Specifications)의 내용을 참조하십시오.

**현재 화면 모드에 맞춰 조정되는 색상을 사용하십시오.** 의미 색상(macOS의 [labelColor](https://developer.apple.com/documentation/appkit/nscolor/labelcolor)와 [controlColor](https://developer.apple.com/documentation/appkit/nscolor/controlcolor) 또는 iOS 및 iPadOS의 [separator](https://developer.apple.com/documentation/uikit/uicolor/separator) 등)은 현재 화면 모드에 맞춰 자동으로 조정됩니다. 사용자 설정 색상이 필요할 경우, Xcode에서 앱의 애셋 카탈로그에 Color Set 애셋을 추가하고 해당 색상의 밝은 버전과 어두운 버전을 지정하십시오. 조정되지 않는 하드코딩된 색상 값 또는 색상을 사용하지 마십시오.

![밝은 배경과 라이트 모드의 시스템 색상을 나타내는 네 가지 색상 견본이 있는 정사각형 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-system-colors-light@2x.png)

![어두운 배경과 다크 모드의 시스템 색상을 나타내는 네 가지 색상 견본이 있는 정사각형 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-system-colors-dark@2x.png)

**모든 화면 모드에서 충분한 색상 대비를 사용하십시오.** 시스템 정의 색상을 사용하면 전경과 배경 콘텐츠 간에 적합한 대비율을 적용할 수 있습니다. 최소한 색상 간의 대비율이 4.5:1보다 낮지 않도록 하십시오. 사용자 설정 전경 및 배경 색상의 경우, 특히 작은 텍스트라면 대비율이 7:1이 되도록 하십시오. 이 비율을 사용하면 배경에서 전경 콘텐츠가 드러나며 콘텐츠가 손쉬운 사용의 권장 지침을 준수할 수 있습니다.

**흰색 배경 색상의 명도를 낮추십시오.** 흰색 배경이 포함된 콘텐츠 이미지를 표시하는 경우, 이 배경이 주변의 다크 모드 항목 사이에서 환하게 표시되는 일이 없도록 이미지를 살짝 어둡게 만들어 볼 수 있습니다.

### 아이콘 및 이미지

시스템은 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)(자동으로 다크 모드에 맞게 조정됨)와 라이트 모드 및 다크 모드 모두에 최적화된 풀컬러 이미지를 사용합니다.

**가능하면 SF Symbols를 사용하십시오.** Symbols는 동적 색상을 사용하여 색조를 변경하거나 생동감을 더할 때 두 화면 모드 모두에서 잘 표시됩니다. 지침을 보려면 [색상](https://developer.apple.com/kr/design/human-interface-guidelines/color)의 내용을 참조하십시오.

**필요할 경우, 라이트 모드와 다크 모드의 인터페이스 아이콘을 별도로 디자인하십시오.** 예를 들어 보름달 아이콘의 경우, 밝은 배경과 잘 대비되려면 얇고 어두운 윤곽선이 필요하지만 어두운 배경에서는 윤곽선이 필요하지 않습니다. 이와 마찬가지로 한 방울의 기름이 표시된 아이콘의 경우, 어두운 배경에서 가장자리가 표시되도록 얇은 경계선이 필요할 수 있습니다.

![밝은 배경 위의 검은색 물방울 아이콘 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-icon-in-light-mode@2x.png)

![어두운 배경 위의 검은색 물방울 아이콘 일러스트. 비슷한 주변 색상과 구별하기 위해 아이콘에 흰색 테두리가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-icon-in-dark-mode@2x.png)

**풀컬러 이미지와 아이콘이 두 화면 모드 모두에서 잘 표시되는지 확인하십시오.** 애셋이 라이트 모드와 다크 모드 모두에서 잘 표시될 경우 동일한 애셋을 사용하십시오. 애셋이 한 모드에서만 잘 표시되는 경우에는 애셋을 수정하거나 라이트 모드용 애셋과 다크 모드용 애셋을 따로 생성하십시오. 애셋 카탈로그를 사용하여 애셋을 하나의 이름을 갖는 이미지로 통합하십시오.

![음식점 테이블 앞에 앉아 있는 두 사람이 간단한 추상적 스타일로 그려진 일러스트. 일러스트에 밝은 배경이 있고 세부사항이 명백하게 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-illustration-in-light-mode@2x.png)

![음식점 테이블 앞에 앉아 있는 두 사람이 간단한 추상적 스타일로 그려진 일러스트. 일러스트에 어두운 배경이 있고 이미지의 어두운 부분을 배경과 구별하기 어려움.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-illustration-in-dark-mode-incorrect@2x.png)

![음식점 테이블 앞에 앉아 있는 두 사람이 간단한 추상적 스타일로 그려진 일러스트. 일러스트에 어두운 배경이 있고 배경과 대조되어 명확하게 표시되도록 색상 값이 조절됨.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-illustration-in-dark-mode-correct@2x.png)

### 텍스트

시스템은 생동감과 대비 증가를 통해 어두운 배경에서 텍스트의 가독성을 유지합니다.

**레이블에 시스템 제공 레이블 색상을 사용하십시오.** 1차, 2차, 3차 및 4차 레이블 색상은 자동으로 라이트 모드 및 다크 모드에 따라 조정됩니다.

![어두운 1차 레이블 텍스트가 있는 라이트 모드의 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-label-in-light-mode@2x.png)

![밝은 2차 레이블 텍스트가 있는 다크 모드의 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/dark-mode-label-in-dark-mode@2x.png)

**시스템 보기를 사용하여 텍스트 필드와 텍스트 보기를 그리십시오.** 시스템 보기와 제어기를 사용하면 생동감의 존재 여부에 따라 자동으로 조정하여 앱의 텍스트가 모든 배경에서 잘 표시됩니다. 가능할 경우, 텍스트를 직접 그리는 대신 시스템 제공 보기를 사용하여 텍스트를 표시하십시오.

## 플랫폼 고려 사항

*tvOS에 대한 추가 고려 사항은 없습니다. 다크 모드는 visionOS 또는 watchOS에서 지원되지 않습니다.*

### iOS, iPadOS

다크 모드에서 시스템은 *기본*과 *저심도*라는 두 가지 배경 색상 세트를 사용하여 하나의 어두운 인터페이스가 다른 인터페이스 위에 놓여 있을 때 심도를 더 잘 인지할 수 있도록 해줍니다. 기본 색상은 더 어두우며 배경 인터페이스가 뒤로 물러나도록 표시합니다. 저심도 색상은 더 밝으며 전경 인터페이스가 앞으로 나오도록 표시합니다.

![검은색 배경 위에 4개의 용어가 쌓여져 있는 모습이 표시된 다이어그램. 상단의 용어는 배경과 가장 대비되고 하단의 용어는 가장 적게 대비됨.](https://developer.apple.com/images/com.apple.HIG/kr/base-with-four-semantic-colors@2x.png)

![거의 검은색인 배경 위에 4개의 용어가 쌓여져 있는 모습이 표시된 다이어그램. 상단의 용어는 배경과 가장 대비되고 하단의 용어는 가장 적게 대비됨.](https://developer.apple.com/images/com.apple.HIG/kr/elevated-with-four-semantic-colors@2x.png)

![흰색 배경 위에 4개의 용어가 쌓여져 있는 모습이 표시된 다이어그램. 상단의 용어는 배경과 가장 대비되고 하단의 용어는 가장 적게 대비됨.](https://developer.apple.com/images/com.apple.HIG/kr/light-with-four-semantic-colors@2x.png)

**가급적 시스템 배경 색상을 사용하십시오.** 다크 모드는 동적이기 때문에 팝오버 또는 모달 시트와 같은 인터페이스가 전경에 있을 경우 배경 색상이 기본에서 저심도로 자동으로 변합니다. 또한 시스템은 저심도 배경 색상을 사용하여 멀티태스킹 환경에서 앱 간의 시각적 분리, 여러 윈도우가 있는 상태에서 윈도우 간의 시각적 분리를 제공합니다. 사용자 설정 배경 색상을 사용하면 시스템이 제공하는 이러한 시각적 구별을 인지하기 어려울 수 있습니다.

### macOS

사람들이 일반 설정에서 강조 색상을 흑색으로 선택하는 경우, macOS는 윈도우 배경이 현재 데스크탑 사진에서 색상을 가져오도록 만듭니다. 그 결과로 윈도우를 주변 콘텐츠와 더 조화롭게 혼합해주는 *데스크탑 색조 조정*이라는 미세한 효과가 발생합니다.

**적합할 경우, 사용자 설정 구성요소 배경에 약간의 투명도를 포함하십시오.** 투명도가 있을 경우, 데스크탑 색조 조정이 활성화되어 있을 때 구성요소가 윈도우 배경에서 색상을 가져올 수 있으므로 데스크탑 사진이 변경되더라도 시각적 조화를 계속 이룰 수 있습니다. 이러한 조화를 만들어 내려면 표시되는 배경 또는 베젤이 있는 사용자 설정 구성요소에만, 그리고 구성요소가 색상을 사용하지 않는 것과 같은 중립 상태일 때에만 투명도를 추가하십시오. 구성요소가 색상을 사용하는 상태인 경우에는 투명도를 추가하지 않는 것이 좋습니다. 데스크탑의 다른 위치에 맞도록 윈도우 배경이 조절되거나 데스크탑 그림이 변경될 때 구성요소의 색상이 크게 바뀔 수 있기 때문입니다.

## 리소스

#### 관련 콘텐츠

[색상](https://developer.apple.com/kr/design/human-interface-guidelines/color)

[머티리얼](https://developer.apple.com/kr/design/human-interface-guidelines/materials)

[타이포그래피](https://developer.apple.com/kr/design/human-interface-guidelines/typography)

#### 비디오

- [Liquid Glass 만나보기](https://developer.apple.com/kr/videos/play/wwdc2025/219) — Liquid Glass는 더욱 역동적이고 표현력 있는 사용자 경험을 제공하면서 Apple 플랫폼 디자인 언어를 통합합니다. Liquid Glass의 설계 원칙을 알아보고, 핵심적인 광학 및 물리적 속성을 탐구하며, 이를 사용하는 위치와 이유를 알아보세요.
- [iOS에서 다크 모드 구현하기](https://developer.apple.com/kr/videos/play/wwdc2019/214) — UIKit 엔지니어링 팀이 iOS에서 다크 모드가 작동하는 원리와 개념을 설명해 드립니다. 역동적인 색상 및 이미지를 사용하여 다크 모드를 사용하는 앱을 개선하는 방법을 익히고 모든 사용자가 좋아할 만한 경험을 추가하세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 8월 6일 | 라이트 모드 및 다크 모드를 비교하는 아트워크가 추가됨. |
