# 색상

Source: https://developer.apple.com/kr/design/human-interface-guidelines/color

> 색상을 적절하게 사용하면 커뮤니케이션을 향상하고, 브랜드를 드러내고, 시각적 일관성을 제공하고, 상태 및 피드백을 전달하고, 정보를 이해하도록 도울 수 있습니다.

![페인트 팔레트 스케치가 있으며, 색상 사용을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 노란색을 은은하게 반영하는 노란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/foundations-color-intro@2x.png)

시스템은 여러 배경 및 화면 모드에 적합한 색상을 정의하고, 이를 생동감 및 손쉬운 사용 설정에 맞게 자동으로 조정할 수 있습니다. 시스템 색상을 사용하면 기기와 어울리는 경험을 간편하게 제공할 수 있습니다.

또한 사용자 설정 색상을 사용하여 앱 또는 게임의 시각적 경험을 향상하고 고유한 특성을 표현할 수 있습니다. 다음 지침은 시스템 정의 색상 또는 사용자 설정 색상을 사용하는지와 관계없이 사람들이 만족할 수 있게 색상을 사용하는 방법을 설명합니다.

## 모범 사례

**동일한 색상으로 서로 다른 항목을 나타내지 마십시오.** 인터페이스에서 색상을 일관적으로 사용하십시오. 특히 색상으로 상태 또는 상호작용과 같은 정보를 전달하는 경우에는 더욱 유의해야 합니다. 예를 들어, 테두리 없는 버튼이 상호작용 가능한 요소임을 나타내기 위해 브랜드 색상을 사용했는데, 같은 색상 또는 유사한 색상으로 상호작용이 불가능한 텍스트를 꾸민다면 혼란을 줄 수 있습니다.

**모든 앱의 색상이 라이트 모드, 다크 모드 및 대비 증가 환경에서 잘 표시되도록 하십시오.** iOS, iPadOS, macOS 및 tvOS는 라이트 및 [다크 모드](https://developer.apple.com/kr/design/human-interface-guidelines/dark-mode) 화면 모드로 설정을 제공합니다. [시스템 색상](https://developer.apple.com/kr/design/human-interface-guidelines/color#System-colors)은 시스템 화면 모드에 따라 미묘하게 달라지며, 텍스트, 기호 및 기타 요소 간의 적절한 색상 구분과 대비를 보장하도록 조절됩니다. ‘대비 증가’ 설정을 켜면 색상의 차이가 훨씬 더 두드러지게 나타납니다. 가능하다면 이 모든 환경에 대한 변형을 이미 정의한 시스템 색상을 사용하십시오. 사용자 설정 색상을 정의하는 경우에는 라이트 및 다크 모드의 색상 버전과 각 버전에 대한 대비 증가 옵션을 제공해야 하며, 이는 시각적 구분이 훨씬 더 많이 이루어집니다. 앱이 단일 화면 모드로 제공되더라도 라이트 및 다크 색상을 모두 제공하여 이러한 환경에서의 Liquid Glass 조정을 지원하십시오.

![iOS에서 라이트 시스템 화면 모드 및 기본 대비가 적용된 메모 앱 스크린샷. 메모 앱에 \u0027메모\u0027라는 텍스트가 있는 메모가 열려 있음. 텍스트가 선택되어 있고, 노란색 선택 하이라이트 및 텍스트 편집 메뉴가 표시됨. 완료 버튼이 오른쪽 상단 모서리에 나타남. 버튼의 Liquid Glass 배경은 노란색이며, 체크 표시가 있는 해당 레이블은 흰색임. 노란색 색조가 생동감 있음.](https://developer.apple.com/images/com.apple.HIG/kr/color-context-light-mode@2x.png)

![iOS에서 라이트 시스템 화면 모드 및 대비 증가가 적용된 메모 앱 스크린샷. 메모 앱에 \u0027메모\u0027라는 텍스트가 있는 메모가 열려 있음. 텍스트가 선택되어 있고, 노란색 선택 하이라이트 및 텍스트 편집 메뉴가 표시됨. 완료 버튼이 오른쪽 상단 모서리에 나타남. 버튼의 Liquid Glass 배경은 노란색이며, 체크 표시가 있는 해당 레이블은 검은색임. 메모의 흰색 배경에 더 많은 대비와 구분을 제공하도록 노란색 색조가 더 어두움.](https://developer.apple.com/images/com.apple.HIG/kr/color-context-light-mode-high-contrast@2x.png)

![iOS에서 다크 시스템 화면 모드 및 기본 대비가 적용된 메모 앱 스크린샷. 메모 앱에 \u0027메모\u0027라는 텍스트가 있는 메모가 열려 있음. 텍스트가 선택되어 있고, 노란색 선택 하이라이트 및 텍스트 편집 메뉴가 표시됨. 완료 버튼이 오른쪽 상단 모서리에 나타남. 버튼의 Liquid Glass 배경은 노란색이며, 체크 표시가 있는 해당 레이블은 흰색임.](https://developer.apple.com/images/com.apple.HIG/kr/color-context-dark-mode@2x.png)

![iOS에서 다크 시스템 화면 모드 및 대비 증가가 적용된 메모 앱 스크린샷. 메모 앱에 \u0027메모\u0027라는 텍스트가 있는 메모가 열려 있음. 텍스트가 선택되어 있고, 노란색 선택 하이라이트 및 텍스트 편집 메뉴가 표시됨. 완료 버튼이 오른쪽 상단 모서리에 나타남. 버튼의 Liquid Glass 배경은 노란색이며, 체크 표시가 있는 해당 레이블은 검은색임.](https://developer.apple.com/images/com.apple.HIG/kr/color-context-dark-mode-high-contrast@2x.png)

**다양한 조명 상태에서 앱의 색상 체계를 테스트하십시오.** 화창한 날 실외에서 앱을 볼 때와 어두운 조명에서 앱을 볼 때 색상은 다르게 표시될 수 있습니다. 밝은 환경에서는 색상이 더 어둡고 탁하게 보입니다. 어두운 환경에서는 색상이 밝고 선명하게 보입니다. visionOS에서 색상은 실제 주변 환경에 있는 벽 또는 대상체의 색상과 여기에 빛이 어떻게 반사되는지에 따라 색상이 달라 보일 수 있습니다. 대부분의 활용 사례에서 최상의 보기 경험을 제공하도록 앱 색상을 조절하십시오.

**다양한 기기에서 앱을 테스트하십시오.** 예를 들어, 특정 iPhone, iPad 및 Mac 모델에서 사용할 수 있는 True Tone 디스플레이는 주변광 센서를 사용하여 디스플레이의 화이트 포인트를 자동으로 조절해 현재 환경의 조명 상태에 맞춥니다. 읽기, 사진, 비디오 및 게임을 주로 지원하는 앱의 경우 화이트 포인트 적응 스타일을 지정하여 이 효과를 강화하거나 약화할 수 있습니다(개발자 지침을 보려면 [UIWhitePointAdaptivityStyle](https://developer.apple.com/documentation/bundleresources/information-property-list/uiwhitepointadaptivitystyle)의 내용 참조). 다양한 브랜드의 HD 및 4K TV에서 여러 디스플레이 설정으로 tvOS 앱을 테스트하십시오. 또한 시스템 설정 > 디스플레이에서 프로필을 선택하여 P3 및 표준 RGB(sRGB)와 같은 여러 색상 프로필을 Mac에서 사용해 앱의 모양을 테스트할 수 있습니다. 지침을 보려면 [색상 관리](https://developer.apple.com/kr/design/human-interface-guidelines/color#Color-management)의 내용을 참조하십시오.

**아트워크와 반투명이 근처 색상에 어떤 영향을 주는지 고려하십시오.** 시각적 연속성을 유지하고, 인터페이스 요소가 너무 눈에 띄거나 드러나지 않는 것을 막기 위해 아트워크의 변형은 때때로 근처 색상의 변화를 가져옵니다. 예를 들어, 지도 앱은 지도 모드일 때 라이트 색상 체계를 표시하지만 위성 모드에서는 다크 색상 체계로 전환됩니다. 또한 색상은 도구 막대와 같은 반투명 요소 뒤에 있거나 반투명 요소에 적용되었을 때 다르게 나타날 수 있습니다.

**사람들이 앱에서 색상을 선택할 수 있는 경우, 가능하다면 시스템 제공 색상 제어기를 사용하십시오.** 내장 색상 선택기를 사용하면 일관된 사용자 경험을 제공할 수 있으며, 사람들이 어떤 앱에서든 접근할 수 있는 색상 세트를 저장할 수 있습니다. 개발자 지침을 보려면 [ColorPicker](https://developer.apple.com/documentation/swiftui/colorpicker)의 내용을 참조하십시오.

## 포용적 색상

**색상에만 의존하여 대상체를 구분하거나, 상호작용을 나타내거나, 필수 정보를 전달하지 마십시오.** 색상을 사용하여 정보를 전달하는 경우, 색맹이거나 기타 시각 장애가 있는 사람들이 이해할 수 있도록 동일한 정보를 다른 방식으로도 제공하십시오. 예를 들어, 텍스트 레이블 또는 글리프 모양을 사용하여 대상체 또는 상태를 식별할 수 있습니다.

**앱에서 콘텐츠를 인지하기 어렵게 만드는 색상을 사용하지 마십시오.** 예를 들어, 대비가 충분하지 않으면 아이콘과 텍스트가 배경과 섞여 콘텐츠를 읽기 어려울 수 있으며, 색맹인 사람들은 일부 색상 조합을 구별하지 못할 수 있습니다. 지침을 보려면 [손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility)의 내용을 참조하십시오.

**사용하는 색상이 다른 국가 및 문화에서 어떻게 인지되는지 고려하십시오.** 예를 들어, 빨간색은 일부 문화에서 위험을 나타내지만 어떤 문화에서는 긍정적인 의미를 갖습니다. 앱에서 사용하는 색상이 의도한 대로 메시지를 전달하는지 확인하십시오.

![상승세를 보이는 주식 차트가 표시된 주식 앱의 영어 버전 일러스트. 그래프의 선이 녹색으로 표시되어 선택한 기간 동안 주식 가치가 상승했음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/color-inclusive-color-charts-english@2x.png)

![상승세를 보이는 주식 차트가 표시된 주식 앱의 중국어 버전 일러스트. 그래프의 선이 빨간색으로 표시되어 선택한 기간 동안 주식 가치가 상승했음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/color-inclusive-color-charts-chinese@2x.png)

## 시스템 색상

**앱에 시스템 색상 값을 하드코딩하지 마십시오.** 문서에 기록된 색상 값은 앱 디자인 프로세스 중에 참조하기 위한 것입니다. 실제 색상 값은 여러 환경 변수로 인해 릴리즈마다 크게 변경될 수 있습니다. [Color](https://developer.apple.com/documentation/swiftui/color)와 같은 API를 사용하여 시스템 색상을 적용하십시오.

또한 iOS, iPadOS, macOS 및 visionOS는 표준 UI 구성요소의 색상 체계와 일치하고 라이트 모드 및 다크 모드에 따라 자동으로 조정되는 *동적 시스템 색상* 세트를 정의합니다. 각각의 동적 색상은 모양 또는 색상 값보다는 목적에 따라 의미대로 정의됩니다. 예를 들어, 일부 색상은 여러 계층 수준으로 보기 배경을 나타내고, 어떤 색상은 레이블, 링크, 분리자와 같은 전경 콘텐츠를 나타냅니다.

**동적 시스템 색상의 의미를 다시 정의하지 마십시오.** 플랫폼의 화면 모드가 변경되었을 때 일관된 경험을 제공하고 인터페이스를 잘 표시하려면 동적 시스템 색상을 의도된 대로 사용해야 합니다. 예를 들어, [separator](https://developer.apple.com/documentation/uikit/uicolor/separator) 색상을 텍스트 색상으로 사용하거나 [secondary text label](https://developer.apple.com/documentation/uikit/uicolor/secondarylabel) 색상을 배경 색상으로 사용하지 말아야 합니다.

## Liquid Glass 색상

기본적으로, [Liquid Glass](https://developer.apple.com/kr/design/human-interface-guidelines/materials#Liquid-Glass)는 고유한 색상이 없으며, 대신 바로 뒤에 있는 콘텐츠의 색상을 띠게 됩니다. 일부 Liquid Glass 요소에 색상을 적용하여 색유리나 스테인드글라스의 스타일을 제공할 수 있습니다. 이는 기본 CTA(Call to Action)와 같은 특정 제어기에 강조를 나타낼 때 유용하며, 시스템이 눈에 띄는 버튼 스타일을 위해 사용하는 접근 방식입니다. Liquid Glass 제어기의 기호 또는 텍스트 레이블에도 색상이 있을 수 있습니다.

![iOS의 완료 버튼 스크린샷으로, 파란색 Liquid Glass 배경에 체크 표시로 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/color-liquid-glass-overview-tinted@2x.png)

![iOS에서 첫 번째 탭이 선택되어 있는 탭 막대 스크린샷. 선택된 탭 막대 항목의 기호 및 텍스트 레이블은 파란색임.](https://developer.apple.com/images/com.apple.HIG/kr/color-liquid-glass-overview-color-over-tab-bar@2x.png)

![iOS에서 다채로운 이미지 위에 있는 공유 버튼 스크린샷. 배경 이미지의 색상이 버튼의 Liquid Glass에 스며들어 해당 색상에 영향을 미침.](https://developer.apple.com/images/com.apple.HIG/kr/color-liquid-glass-overview-clear@2x.png)

도구 막대, 탭 막대와 같은 작은 요소의 경우, 시스템은 그 아래의 콘텐츠에 반응하여 Liquid Glass를 라이트 및 다크 화면 모드로 조정할 수 있습니다. 기본적으로, 이러한 요소 위의 기호 및 텍스트는 모노크롬 색상 체계를 따르며, 아래의 콘텐츠가 밝으면 더 어두운 색을, 아래의 콘텐츠가 어두우면 더 밝은 색을 사용합니다. 사이드바처럼 더 큰 요소에서는 복잡한 배경에서도 가독성을 유지하고 해당 머티리얼의 표면에 더 풍부한 콘텐츠를 담을 수 있도록 Liquid Glass가 더 불투명하게 나타납니다.

**Liquid Glass 머티리얼과 해당 머티리얼 위의 기호 또는 텍스트에는 색상을 절제해서 적용하십시오.** 색상을 적용할 경우에는 상태 표시기나 기본 동작처럼 강조할 필요가 있는 요소에 한해 사용하십시오. 기본 동작을 강조하려면 기호 또는 텍스트 대신 배경에 색상을 적용하십시오. 예를 들어, 시스템은 완료 버튼 같은 눈에 띄는 버튼의 배경에 앱 강조 색상을 적용하여 시선을 끌고 시각적 중요도를 높입니다. 되도록이면 여러 제어기의 배경에 색상을 추가하지 마십시오.

![여러 버튼이 있는 도구 막대가 표시된 iPhone 앱 상단의 스크린샷. 도구 막대의 모든 버튼이 Liquid Glass 배경에 파란색 강조 색상을 사용함.](https://developer.apple.com/images/com.apple.HIG/kr/colors-liquid-glass-usage-incorrect@2x.png)

![원 안의 X 표시는 올바르게 사용되지 않았음을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![여러 버튼이 있는 도구 막대가 표시된 iPhone 앱 상단의 스크린샷. 도구 막대에서 완료 버튼만 Liquid Glass 배경에 파란색 강조 색상을 사용함.](https://developer.apple.com/images/com.apple.HIG/kr/colors-liquid-glass-usage-correct@2x.png)

![원 안의 체크 표시는 올바르게 사용되었음을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

**앱에 다채로운 배경이 있는 경우 제어기 레이블에 유사한 색상을 사용하지 마십시오.** 색상이 있으면 앱을 시각적으로 더 매력적이거나, 활기차거나, 브랜드를 반영하도록 만들지만 색상이 너무 많으면 과도한 느낌을 주고 제어기 레이블을 읽는 것이 더 어려워질 수 있습니다. 앱에 다채로운 배경 또는 시각적으로 풍부한 콘텐츠가 있는 경우, 도구 막대 및 탭 막대에는 가급적 모노크롬 모양을 사용하거나, 시각적 구분이 충분한 강조 색상을 선택하십시오. 이와 반대로, 주로 모노크롬의 콘텐츠 및 배경이 적용된 앱에서 브랜드 색상을 앱 강조 색상으로 선택하면 앱 경험을 맞춤화하고 회사의 정체성을 반영하는 효과적인 방법이 될 수 있습니다.

**콘텐츠 레이어에서 색상 배치에 주의하십시오.** 가능하다면 콘텐츠 레이어 및 제어기에서 유사한 색상이 겹치지 않게 하여 인터페이스가 충분한 대비를 유지하도록 하십시오. 다채로운 콘텐츠가 제어기 아래에서 간헐적으로 스크롤되더라도 스크롤 가능한 콘텐츠의 화면 상단과 같이 기본 상태 또는 멈춰 있는 상태에서 명확한 가독성을 유지하도록 하십시오.

## 색상 관리

*색상 공간*은 RGB 또는 CMYK와 같은 색상 모델의 색상을 나타냅니다. 일반적인 색상 공간(*전체 색영역*이라고도 함)은 sRGB와 Display P3입니다.

![sRGB 공간에 포함된 색상과 P3 색상 공간에 포함된 더 많은 색상을 비교하여 표시한 다이어그램.](https://developer.apple.com/images/com.apple.HIG/kr/color-graphic-wide-color@2x.png)

*색상 프로필*은 색상을 숫자 형식으로 매핑하는 수학식 또는 데이터 표 등을 사용하여 색상 공간의 색상을 설명합니다. 기기가 이미지의 색상을 올바르게 해석하고 디스플레이에 재현할 수 있도록 이미지에는 색상 프로필이 포함되어 있습니다.

**이미지에 색상 프로필을 적용하십시오.** 색상 프로필은 앱의 색상이 다양한 디스플레이에서 의도된 대로 표시되도록 돕습니다. sRGB 색상 공간은 대부분의 디스플레이에서 정확한 색상을 표시합니다.

**호환되는 디스플레이에서 시각적 경험을 향상하도록 와이드 컬러를 사용하십시오.** 와이드 컬러 디스플레이는 sRGB보다 더 풍부하고 진한 색상을 표시할 수 있는 P3 색상 공간을 지원합니다. 따라서 와이드 컬러를 사용하는 사진 및 비디오는 더 현실감 있으며, 와이드 컬러를 사용하는 시각적 데이터와 상태 표시기는 더 많은 의미를 가질 수 있습니다. 적합할 경우, 픽셀당(채널당) 16비트로 Display P3 색상 프로필을 사용하고 이미지를 PNG 포맷으로 내보내십시오. 와이드 컬러 이미지를 디자인하고 P3 색상을 선택하려면 와이드 컬러 디스플레이를 사용해야 한다는 점에 유의하십시오.

**필요할 경우 색상 공간별 이미지와 색상 변형을 제공하십시오.** 일반적으로 P3 색상과 이미지는 sRGB 디스플레이에서 문제없이 표시됩니다. 때때로 아주 비슷한 두 개의 P3 색상을 sRGB 디스플레이에서 볼 때 두 색상을 구별하기 어려울 수 있습니다. 또한 P3 색상을 사용하는 그라디언트는 sRGB 디스플레이에서 가끔 잘려 보일 수 있습니다. 이러한 문제를 방지하고 와이드 컬러 및 sRGB 디스플레이 모두에서 시각적 정확성을 향상하도록 Xcode 프로젝트의 애셋 카탈로그를 사용하여 각 색상 공간에 대한 여러 버전의 이미지와 색상을 제공할 수 있습니다.

## 플랫폼 고려 사항

### iOS, iPadOS

iOS는 *시스템* 및 *그룹*이라는 두 세트의 동적 배경 색상을 정의하며, 각 항목은 정보 계층을 전달하도록 돕는 1차, 2차, 3차 변형을 포함합니다. 일반적으로, 그룹화된 표 보기가 있을 경우 그룹 배경 색상([systemGroupedBackground](https://developer.apple.com/documentation/uikit/uicolor/systemgroupedbackground), [secondarySystemGroupedBackground](https://developer.apple.com/documentation/uikit/uicolor/secondarysystemgroupedbackground) 및 [tertiarySystemGroupedBackground](https://developer.apple.com/documentation/uikit/uicolor/tertiarysystemgroupedbackground))을 사용하고, 그 외의 경우에는 시스템 세트 배경 색상([systemBackground](https://developer.apple.com/documentation/uikit/uicolor/systembackground), [secondarySystemBackground](https://developer.apple.com/documentation/uikit/uicolor/secondarysystembackground) 및 [tertiarySystemBackground](https://developer.apple.com/documentation/uikit/uicolor/tertiarysystembackground))을 사용하십시오.

두 세트의 배경 색상에서 일반적으로 다음과 같은 방식으로 변형을 사용하여 계층을 나타냅니다.

- 전체 보기의 경우, 1차
- 전체 보기의 그룹 콘텐츠 또는 요소의 경우, 2차
- 2차 요소의 그룹 콘텐츠 또는 요소의 경우, 3차

배경 콘텐츠의 경우, iOS는 다음과 같은 동적 색상을 정의합니다.

| 색상 | 용도 | UIKit API |
| --- | --- | --- |
| 레이블 | 1차 콘텐츠가 포함된 텍스트 레이블. | [label](https://developer.apple.com/documentation/uikit/uicolor/label) |
| 2차 레이블 | 2차 콘텐츠가 포함된 텍스트 레이블. | [secondaryLabel](https://developer.apple.com/documentation/uikit/uicolor/secondarylabel) |
| 3차 레이블 | 3차 콘텐츠가 포함된 텍스트 레이블. | [tertiaryLabel](https://developer.apple.com/documentation/uikit/uicolor/tertiarylabel) |
| 4차 레이블 | 4차 콘텐츠가 포함된 텍스트 레이블. | [quaternaryLabel](https://developer.apple.com/documentation/uikit/uicolor/quaternarylabel) |
| 위치 지정자 텍스트 | 제어기 또는 텍스트 보기의 위치 지정자 텍스트. | [placeholderText](https://developer.apple.com/documentation/uikit/uicolor/placeholdertext) |
| 분리자 | 아래의 일부 콘텐츠가 표시되도록 허용하는 분리자. | [separator](https://developer.apple.com/documentation/uikit/uicolor/separator) |
| 불투명 분리자 | 아래의 콘텐츠가 표시되도록 허용하지 않는 분리자. | [opaqueSeparator](https://developer.apple.com/documentation/uikit/uicolor/opaqueseparator) |
| 링크 | 링크로 동작하는 텍스트. | [link](https://developer.apple.com/documentation/uikit/uicolor/link) |

### macOS

macOS는 다음과 같은 동적 시스템 색상을 정의합니다(표준 색상 패널의 개발자 팔레트에서도 확인 가능).

| 색상 | 용도 | AppKit API |
| --- | --- | --- |
| 선택된 제어기 텍스트 대체 색상 | 목록 또는 표에서 선택된 표면의 텍스트. | [alternateSelectedControlTextColor](https://developer.apple.com/documentation/appkit/nscolor/alternateselectedcontroltextcolor) |
| 교차 콘텐츠 배경 색상 | 목록, 표 또는 모음 보기의 교차 행 또는 열의 배경. | [alternatingContentBackgroundColors](https://developer.apple.com/documentation/appkit/nscolor/alternatingcontentbackgroundcolors) |
| 제어기 강조 | 시스템 설정에서 선택한 강조 색상. | [controlAccentColor](https://developer.apple.com/documentation/appkit/nscolor/controlaccentcolor) |
| 제어기 배경 색상 | 브라우저 또는 표와 같은 대형 인터페이스 요소의 배경. | [controlBackgroundColor](https://developer.apple.com/documentation/appkit/nscolor/controlbackgroundcolor) |
| 제어기 색상 | 제어기의 표면. | [controlColor](https://developer.apple.com/documentation/appkit/nscolor/controlcolor) |
| 제어기 텍스트 색상 | 사용 가능한 제어기의 텍스트. | [controlTextColor](https://developer.apple.com/documentation/appkit/nscolor/controltextcolor) |
| 현재 제어기 틴트 | 시스템 정의 제어기 틴트. | [currentControlTint](https://developer.apple.com/documentation/appkit/nscolor/currentcontroltint) |
| 사용 불가능한 제어기 텍스트 색상 | 사용 불가능한 제어기의 텍스트. | [disabledControlTextColor](https://developer.apple.com/documentation/appkit/nscolor/disabledcontroltextcolor) |
| 찾기 하이라이트 색상 | 찾기 표시기의 색상. | [findHighlightColor](https://developer.apple.com/documentation/appkit/nscolor/findhighlightcolor) |
| 그리드 색상 | 표와 같은 인터페이스 요소의 그리드 선. | [gridColor](https://developer.apple.com/documentation/appkit/nscolor/gridcolor) |
| 머리말 텍스트 색상 | 표의 머리말 셀 텍스트. | [headerTextColor](https://developer.apple.com/documentation/appkit/nscolor/headertextcolor) |
| 하이라이트 색상 | 화면상의 가상 광원. | [highlightColor](https://developer.apple.com/documentation/appkit/nscolor/highlightcolor) |
| 키보드 초점 표시기 색상 | 인터페이스 탐색을 위해 키보드를 사용할 때 현재 초점이 맞춰진 제어기 주위로 나타나는 링. | [keyboardFocusIndicatorColor](https://developer.apple.com/documentation/appkit/nscolor/keyboardfocusindicatorcolor) |
| 레이블 색상 | 1차 콘텐츠가 포함된 레이블의 텍스트. | [labelColor](https://developer.apple.com/documentation/appkit/nscolor/labelcolor) |
| 링크 색상 | 다른 콘텐츠에 대한 링크. | [linkColor](https://developer.apple.com/documentation/appkit/nscolor/linkcolor) |
| 위치 지정자 텍스트 색상 | 제어기 또는 텍스트 보기의 위치 지정자 문자열. | [placeholderTextColor](https://developer.apple.com/documentation/appkit/nscolor/placeholdertextcolor) |
| 4차 레이블 색상 | 워터마크 텍스트와 같이 3차 레이블보다 중요성이 낮은 레이블의 텍스트. | [quaternaryLabelColor](https://developer.apple.com/documentation/appkit/nscolor/quaternarylabelcolor) |
| 2차 레이블 색상 | 부머리말 또는 추가 정보를 표시하는 데 사용되는 레이블과 같이 1차 레이블보다 중요성이 낮은 레이블의 텍스트. | [secondaryLabelColor](https://developer.apple.com/documentation/appkit/nscolor/secondarylabelcolor) |
| 선택된 콘텐츠 배경 색상 | 중요성이 높은 윈도우 또는 보기에서 선택된 콘텐츠의 배경. | [selectedContentBackgroundColor](https://developer.apple.com/documentation/appkit/nscolor/selectedcontentbackgroundcolor) |
| 선택된 제어기 색상 | 선택된 제어기의 표면. | [selectedControlColor](https://developer.apple.com/documentation/appkit/nscolor/selectedcontrolcolor) |
| 선택된 제어기 텍스트 색상 | 선택된 제어기의 텍스트. | [selectedControlTextColor](https://developer.apple.com/documentation/appkit/nscolor/selectedcontroltextcolor) |
| 선택된 메뉴 항목 텍스트 색상 | 선택된 메뉴의 텍스트. | [selectedMenuItemTextColor](https://developer.apple.com/documentation/appkit/nscolor/selectedmenuitemtextcolor) |
| 선택된 텍스트 배경 색상 | 선택된 텍스트의 배경. | [selectedTextBackgroundColor](https://developer.apple.com/documentation/appkit/nscolor/selectedtextbackgroundcolor) |
| 선택된 텍스트 색상 | 선택된 텍스트의 색상. | [selectedTextColor](https://developer.apple.com/documentation/appkit/nscolor/selectedtextcolor) |
| 분리자 색상 | 콘텐츠의 여러 섹션 사이의 분리자. | [separatorColor](https://developer.apple.com/documentation/appkit/nscolor/separatorcolor) |
| 그림자 색상 | 화면상의 높이 올린 대상체에 의해 드리워진 가상 그림자. | [shadowColor](https://developer.apple.com/documentation/appkit/nscolor/shadowcolor) |
| 3차 레이블 색상 | 2차 레이블보다 중요성이 낮은 레이블의 텍스트. | [tertiaryLabelColor](https://developer.apple.com/documentation/appkit/nscolor/tertiarylabelcolor) |
| 텍스트 배경 색상 | 텍스트 뒤의 배경 색상. | [textBackgroundColor](https://developer.apple.com/documentation/appkit/nscolor/textbackgroundcolor) |
| 텍스트 색상 | 문서의 텍스트. | [textColor](https://developer.apple.com/documentation/appkit/nscolor/textcolor) |
| 페이지 아래 배경 색상 | 문서 콘텐츠 뒤의 배경. | [underPageBackgroundColor](https://developer.apple.com/documentation/appkit/nscolor/underpagebackgroundcolor) |
| 강조되지 않은 선택된 콘텐츠 배경 색상 | 중요성이 낮은 윈도우 또는 보기에서 선택된 콘텐츠. | [unemphasizedSelectedContentBackgroundColor](https://developer.apple.com/documentation/appkit/nscolor/unemphasizedselectedcontentbackgroundcolor) |
| 강조되지 않은 선택된 텍스트 배경 색상 | 중요성이 낮은 윈도우 또는 보기에서 선택된 텍스트의 배경. | [unemphasizedSelectedTextBackgroundColor](https://developer.apple.com/documentation/appkit/nscolor/unemphasizedselectedtextbackgroundcolor) |
| 강조되지 않은 선택된 텍스트 색상 | 중요성이 낮은 윈도우 또는 보기에서 선택된 텍스트. | [unemphasizedSelectedTextColor](https://developer.apple.com/documentation/appkit/nscolor/unemphasizedselectedtextcolor) |
| 윈도우 배경 색상 | 윈도우의 배경. | [windowBackgroundColor](https://developer.apple.com/documentation/appkit/nscolor/windowbackgroundcolor) |
| 윈도우 프레임 텍스트 색상 | 윈도우 제목 막대 영역의 텍스트. | [windowFrameTextColor](https://developer.apple.com/documentation/appkit/nscolor/windowframetextcolor) |

#### 앱 강조 색상

macOS 11부터 *강조 색상*을 지정하여 앱의 버튼, 선택 하이라이트, 사이드바 아이콘을 사용자화할 수 있습니다. 시스템은 일반 > 강조 색상 설정의 현재 값이 *여러 가지 색상*일 때 강조 색상을 적용합니다.

![시스템 설정 앱에 있는 강조 색상 선택기의 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/colors-accent-colors-picker-multicolor@2x.png)

사람들이 강조 색상 설정을 여러 가지 색상이 아닌 다른 값으로 설정할 경우, 시스템은 앱 전반에서 강조 색상 대신 선택된 색상을 관련 항목에 적용합니다. 사이드바 아이콘은 예외로, 이는 지정한 고정 색상을 사용합니다. 고정 색상의 사이드바 아이콘은 의미를 전달하기 위해 특정 색상을 사용하므로 강조 색상 설정을 변경하더라도 시스템이 해당 색상을 덮어쓰지 않습니다. 지침을 보려면 [사이드바](https://developer.apple.com/kr/design/human-interface-guidelines/sidebars)의 내용을 참조하십시오.

### tvOS

**앱 로고와 어울리는 제한된 색상 팔레트를 선택하는 것을 고려하십시오.** 색상을 절묘하게 사용하면 콘텐츠를 우선시하면서도 브랜드를 나타낼 수 있습니다.

**색상만으로 초점을 표시하지 마십시오.** 요소에 초점이 맞춰질 때 상호작용을 나타내는 기본적인 방식은 미세한 크기 조절 및 반응 애니메이션을 사용하는 것입니다.

### visionOS

**색상을 절제해서 사용하십시오. 특히 유리 머티리얼의 경우 더욱 유의하십시오.** 일반적으로 표준 visionOS 윈도우는 시스템 정의 유리 [머티리얼](https://developer.apple.com/kr/design/human-interface-guidelines/materials)을 사용하며, 이는 실제 주변 환경의 빛과 대상체 그리고 공간을 투과하여 표시합니다. 이러한 실제 및 가상 대상체의 색상은 유리를 통해 표시되므로 윈도우에서 다양한 색상을 사용하는 앱 콘텐츠의 시인성에 영향을 줄 수 있습니다. 중요한 정보에 집중하도록 만들거나 인터페이스 항목 간의 관계를 표시하는 데 도움이 되는 부분에서 색상을 사용하는 것이 좋습니다.

**가급적 볼드체 텍스트 및 넓은 영역에 색상을 사용하십시오.** 가는체 텍스트 또는 좁은 영역에 색상을 사용하면 이를 보거나 이해하기 어려워질 수 있습니다.

**완전한 몰입형 경험에서 밝기 레벨의 밸런스를 유지하여 시각을 편안하게 만드십시오.** 고대비를 사용해 중요한 콘텐츠에 집중하기 쉽게 만들 수 있지만 눈이 어두운 조명 또는 어둠에 익숙해진 사람에게는 시각적으로 불편할 수 있습니다. 나머지 시각적 환경이 밝은 경우에만 콘텐츠를 완전히 밝게 표시하십시오. 예를 들어, 아주 어둡거나 검은 배경에 밝은 대상체를 표시하지 마십시오. 특히 깜빡이거나 이동하는 대상체는 표시하지 않는 것이 좋습니다.

### watchOS

**배경 색상을 사용하여 기존 콘텐츠를 지원하거나 추가 정보를 제공하십시오.** 배경 색상은 위치감을 주고 주요 콘텐츠를 인식하도록 돕습니다. 예를 들어 활동 앱에서 움직이기, 운동하기, 일어서기 활동 링에 대한 각각의 인포그래픽 보기는 링의 색상과 일치하는 배경을 갖습니다. 배경 색상은 그저 시각적으로 꾸미는 것이 아니라 무언가 전달하려는 사항이 있을 때 사용하십시오. 운동 또는 오디오 재생 앱과 같이 긴 시간 동안 화면에 표시될 가능성이 있는 보기에서는 전체 화면 배경 색상을 사용하지 마십시오.

**전체 색상이 아니라 틴트 모드를 사용하는 그래픽 컴플리케이션을 선호하는 사람들이 있다는 점을 인지하십시오.** 시스템은 착용자가 선택한 색상을 기반으로 그래픽 컴플리케이션의 이미지, 게이지, 텍스트에 단일 색상을 사용할 수 있습니다. 지침을 보려면 [컴플리케이션](https://developer.apple.com/kr/design/human-interface-guidelines/complications)의 내용을 참조하십시오.

## 명세

### 시스템 색상

| 이름 | SwiftUI API | 기본(라이트) | 기본(다크) | 대비 증가(라이트) | 대비 증가(다크) |
| --- | --- | --- | --- | --- | --- |
| 빨간색 | [red](https://developer.apple.com/documentation/swiftui/color/red) | ![R-255,G-56,B-60](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-red-light@2x.png) | ![R-255,G-66,B-69](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-red-dark@2x.png) | ![R-233,G-21,B-45](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-red-light@2x.png) | ![R-255,G-97,B-101](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-red-dark@2x.png) |
| 주황색 | [orange](https://developer.apple.com/documentation/swiftui/color/orange) | ![R-255,G-141,B-40](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-orange-light@2x.png) | ![R-255,G-146,B-48](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-orange-dark@2x.png) | ![R-197,G-83,B-0](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-orange-light@2x.png) | ![R-255,G-160,B-86](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-orange-dark@2x.png) |
| 노란색 | [yellow](https://developer.apple.com/documentation/swiftui/color/yellow) | ![R-255,G-204,B-0](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-yellow-light@2x.png) | ![R-255,G-214,B-0](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-yellow-dark@2x.png) | ![R-161,G-106,B-0](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-yellow-light@2x.png) | ![R-254,G-223,B-67](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-yellow-dark@2x.png) |
| 초록색 | [green](https://developer.apple.com/documentation/swiftui/color/green) | ![R-52,G-199,B-89](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-green-light@2x.png) | ![R-48,G-209,B-88](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-green-dark@2x.png) | ![R-0,G-137,B-50](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-green-light@2x.png) | ![R-74,G-217,B-104](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-green-dark@2x.png) |
| 민트색 | [mint](https://developer.apple.com/documentation/swiftui/color/mint) | ![R-0,G-200,B-179](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-mint-light@2x.png) | ![R-0,G-218,B-195](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-mint-dark@2x.png) | ![R-0,G-133,B-117](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-mint-light@2x.png) | ![R-84,G-223,B-203](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-mint-dark@2x.png) |
| 청록색 | [teal](https://developer.apple.com/documentation/swiftui/color/teal) | ![R-0,G-195,B-208](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-teal-light@2x.png) | ![R-0,G-210,B-224](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-teal-dark@2x.png) | ![R-0,G-129,B-152](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-teal-light@2x.png) | ![R-59,G-221,B-236](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-teal-dark@2x.png) |
| 사이안색 | [cyan](https://developer.apple.com/documentation/swiftui/color/cyan) | ![R-0,G-192,B-232](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-cyan-light@2x.png) | ![R-60,G-211,B-254](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-cyan-dark@2x.png) | ![R-0,G-126,B-174](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-cyan-light@2x.png) | ![R-109,G-217,B-255](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-cyan-dark@2x.png) |
| 파란색 | [blue](https://developer.apple.com/documentation/swiftui/color/blue) | ![R-0,G-136,B-255](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-blue-light@2x.png) | ![R-0,G-145,B-255](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-blue-dark@2x.png) | ![R-30,G-110,B-244](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-blue-light@2x.png) | ![R-92,G-184,B-255](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-blue-dark@2x.png) |
| 남색 | [indigo](https://developer.apple.com/documentation/swiftui/color/indigo) | ![R-97,G-85,B-245](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-indigo-light@2x.png) | ![R-109,G-124,B-255](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-indigo-dark@2x.png) | ![R-86,G-74,B-222](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-indigo-light@2x.png) | ![R-167,G-170,B-255](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-indigo-dark@2x.png) |
| 보라색 | [purple](https://developer.apple.com/documentation/swiftui/color/purple) | ![R-203,G-48,B-224](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-purple-light@2x.png) | ![R-219,G-52,B-242](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-purple-dark@2x.png) | ![R-176,G-47,B-194](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-purple-light@2x.png) | ![R-234,G-141,B-255](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-purple-dark@2x.png) |
| 분홍색 | [pink](https://developer.apple.com/documentation/swiftui/color/pink) | ![R-255,G-45,B-85](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-pink-light@2x.png) | ![R-255,G-55,B-95](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-pink-dark@2x.png) | ![R-231,G-18,B-77](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-pink-light@2x.png) | ![R-255,G-138,B-196](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-pink-dark@2x.png) |
| 갈색 | [brown](https://developer.apple.com/documentation/swiftui/color/brown) | ![R-172,G-127,B-94](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-brown-light@2x.png) | ![R-183,G-138,B-102](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-brown-dark@2x.png) | ![R-149,G-109,B-81](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-brown-light@2x.png) | ![R-219,G-166,B-121](https://developer.apple.com/images/com.apple.HIG/kr/colors-unified-accessible-brown-dark@2x.png) |

visionOS 시스템 색상은 기본 다크 색상 값을 사용합니다.

### iOS, iPadOS 시스템 회색 색상

| 이름 | UIKit API | 기본(라이트) | 기본(다크) | 대비 증가(라이트) | 대비 증가(다크) |
| --- | --- | --- | --- | --- | --- |
| 회색 | [systemGray](https://developer.apple.com/documentation/uikit/uicolor/systemgray) | ![R-142,G-142,B-147](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray@2x.png) | ![R-142,G-142,B-147](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgraydark@2x.png) | ![R-108,G-108,B-112](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray@2x.png) | ![R-174,G-174,B-178](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgraydark@2x.png) |
| 회색(2) | [systemGray2](https://developer.apple.com/documentation/uikit/uicolor/systemgray2) | ![R-174,G-174,B-178](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray2@2x.png) | ![R-99,G-99,B-102](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray2dark@2x.png) | ![R-142,G-142,B-147](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray2@2x.png) | ![R-124,G-124,B-128](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray2dark@2x.png) |
| 회색(3) | [systemGray3](https://developer.apple.com/documentation/uikit/uicolor/systemgray3) | ![R-199,G-199,B-204](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray3@2x.png) | ![R-72,G-72,B-74](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray3dark@2x.png) | ![R-174,G-174,B-178](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray3@2x.png) | ![R-84,G-84,B-86](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray3dark@2x.png) |
| 회색(4) | [systemGray4](https://developer.apple.com/documentation/uikit/uicolor/systemgray4) | ![R-209,G-209,B-214](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray4@2x.png) | ![R-58,G-58,B-60](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray4dark@2x.png) | ![R-188,G-188,B-192](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray4@2x.png) | ![R-68,G-68,B-70](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray4dark@2x.png) |
| 회색(5) | [systemGray5](https://developer.apple.com/documentation/uikit/uicolor/systemgray5) | ![R-229,G-229,B-234](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray5@2x.png) | ![R-44,G-44,B-46](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray5dark@2x.png) | ![R-216,G-216,B-220](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray5@2x.png) | ![R-54,G-54,B-56](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray5dark@2x.png) |
| 회색(6) | [systemGray6](https://developer.apple.com/documentation/uikit/uicolor/systemgray6) | ![R-242,G-242,B-247](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray6@2x.png) | ![R-28,G-28,B-30](https://developer.apple.com/images/com.apple.HIG/ios-default-systemgray6dark@2x.png) | ![R-235,G-235,B-240](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray6@2x.png) | ![R-36,G-36,B-38](https://developer.apple.com/images/com.apple.HIG/ios-accessible-systemgray6dark@2x.png) |

SwiftUI에서 [gray](https://developer.apple.com/documentation/swiftui/color/gray)은 `systemGray`와 동일함.

## 리소스

#### 관련 콘텐츠

[다크 모드](https://developer.apple.com/kr/design/human-interface-guidelines/dark-mode)

[손쉬운 사용](https://developer.apple.com/kr/design/human-interface-guidelines/accessibility)

[머티리얼](https://developer.apple.com/kr/design/human-interface-guidelines/materials)

[Apple Design Resources](https://developer.apple.com/design/resources/)

#### Developer 문서

[Color](https://developer.apple.com/documentation/swiftui/color) — SwiftUI

[UIColor](https://developer.apple.com/documentation/uikit/uicolor) — UIKit

[Color](https://developer.apple.com/documentation/appkit/color) — AppKit

#### 비디오

- [Liquid Glass 만나보기](https://developer.apple.com/kr/videos/play/wwdc2025/219) — Liquid Glass는 더욱 역동적이고 표현력 있는 사용자 경험을 제공하면서 Apple 플랫폼 디자인 언어를 통합합니다. Liquid Glass의 설계 원칙을 알아보고, 핵심적인 광학 및 물리적 속성을 탐구하며, 이를 사용하는 위치와 이유를 알아보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 12월 16일 | Liquid Glass의 지침이 업데이트됨. |
| 2025년 6월 9일 | 시스템 색상 값이 업데이트되고 Liquid Glass에 대한 지침이 추가됨. |
| 2024년 2월 2일 | iOS 및 iPadOS의 UIKit 및 SwiftUI 회색 색상을 구분하고 visionOS 앱의 밝기 레벨의 밸런스를 유지하는 방법에 대한 지침이 추가됨. |
| 2023년 9월 12일 | watchOS 보기의 배경 색상 사용에 대한 지침이 개선되고, tvOS용 색상 견본이 추가됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2023년 6월 5일 | watchOS의 배경 색상 사용에 대한 지침이 업데이트됨. |
| 2022년 12월 19일 | iOS 및 iPadOS의 시스템 민트 색상(다크 모드)에 대한 RGB 값이 수정됨. |
