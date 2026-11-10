# 버튼

Source: https://developer.apple.com/kr/design/human-interface-guidelines/buttons

> 버튼은 즉각적인 동작을 시작합니다.

![가로로 정렬된 두 개의 스타일화된 버튼 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-buttons-intro@2x.png)

다양하고 많은 부분을 사용자화할 수 있는 버튼은 사람들에게 앱에서 작업을 수행할 수 있는 간단하고 친숙한 방법을 제공합니다. 일반적으로 버튼은 해당 기능을 명확하게 전달하기 위해 다음과 같은 세 개의 속성이 결합됩니다.

- **스타일.** 크기, 색상 및 모양에 따른 시각적 스타일.
- **콘텐츠.** 버튼이 해당 목적을 전달하기 위해 표시하는 기호(또는 아이콘), 텍스트 레이블 또는 둘 다.
- **역할.** 버튼의 의미를 식별하고 해당 모양에 영향을 미칠 수 있는 시스템 정의 역할.

[토글](https://developer.apple.com/kr/design/human-interface-guidelines/toggles), [팝업 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons) 및 [구분 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/segmented-controls)과 같이 특정 사용 사례에 대해 구별된 모양 및 동작을 갖는 버튼 모양의 구성요소도 많이 있습니다.

## 모범 사례

버튼이 즉시 인식할 수 있고 이해하기 쉬울 때 앱이 직관적이고 잘 설계되었다고 느껴집니다.

**버튼을 사람들이 사용하기 쉽게 만드십시오.** 사람들이 주변 구성요소 및 콘텐츠와 버튼을 시각적으로 구별할 수 있도록 버튼 주위에 충분한 공간을 두는 것이 중요합니다. 사람들이 사용하는 입력 방법에 관계없이 버튼에 충분한 공간을 확보하는 것은 사람들이 버튼을 선택하거나 활성화하는 데에도 도움이 되는 중요한 요소입니다. 사람들이 손가락 끝, 포인터, 눈 또는 리모컨 중 무엇을 사용하든 일반적인 규칙은 사람들이 버튼을 쉽게 선택하는 것을 보장하기 위해 버튼에 최소 44x44pt(visionOS의 경우 60x60pt)의 히트 영역이 필요하다는 것입니다.

**사용자 설정 버튼에 누르기 상태를 항상 포함하십시오.** 누르기 상태가 없으면 버튼이 반응하지 않는 것처럼 보여, 입력이 정상적으로 처리되고 있는지 확인하기 어려울 수 있습니다.

## 스타일

스타일 버튼은 내장된 상호작용 상태, 손쉬운 사용 지원 및 모양 조정 기능을 제공하면서 사용자화를 지원하는 다양한 스타일을 제공합니다. 다양한 플랫폼은 앱에서 동작의 계층을 전달하는 데 도움이 되는 다양한 스타일을 정의합니다.

**일반적으로 화면에서 실행 가능성이 가장 높은 동작에는 시각적으로 돋보이는 스타일의 버튼을 사용하십시오.** 특정 버튼에 사람들의 시선을 끌고 싶다면 시스템이 강조 색상을 버튼 배경에 적용할 수 있도록 눈에 띄는 버튼 스타일을 사용하십시오. 색상을 사용하는 버튼은 시각적으로 가장 뚜렷하게 보여 사용 가능성이 가장 높은 동작을 사람들이 빠르게 식별하도록 도와줍니다. 눈에 띄는 버튼은 화면당 한두 개로 제한하십시오. 눈에 띄는 버튼을 너무 많이 제공하면 인지적 부하가 증가하여 옵션을 선택할 때 더 많은 시간이 걸립니다.

**여러 옵션 중에 선호하는 선택을 시각적으로 구별하려면 크기가 아닌 스타일을 사용하십시오.** 동일한 크기의 버튼을 사용하여 두 개 이상의 옵션을 제공하면 옵션이 일관적인 선택 항목 세트를 형성함을 나타냅니다. 반대로 크기가 다른 버튼을 나란히 배치하면 인터페이스가 혼란스럽고 일관성이 없어 보일 수 있습니다. 선택 항목 세트에서 선호하거나 실행 가능성이 가장 높은 옵션을 하이라이트하려는 경우 해당 옵션은 더 눈에 띄는 버튼 스타일을 사용하고 나머지 버튼은 덜 눈에 띄는 스타일을 사용하십시오.

**버튼 레이블 및 콘텐츠 레이어 배경에 비슷한 색상을 가급적 적용하지 마십시오.** 앱의 콘텐츠 레이어에 이미 밝고 화려한 콘텐츠가 있다면, 버튼 레이블은 기본 모노크롬 디자인을 사용하는 것이 좋습니다. 자세한 지침을 보려면 [Liquid Glass 색상](https://developer.apple.com/kr/design/human-interface-guidelines/color#Liquid-Glass-color)의 내용을 참조하십시오.

## 콘텐츠

**각 버튼이 해당 목적을 명확하게 전달하는지 확인하십시오.** 플랫폼에 따라 버튼에는 해당 버튼의 기능을 사람들이 이해하는 데 도움이 되는 기호(또는 아이콘), 텍스트 레이블 또는 둘 다 포함될 수 있습니다.

> **참고:** macOS 및 visionOS에서 시스템은 사람들이 버튼 위로 잠시 포인터를 가져가면 툴팁을 표시합니다. 툴팁은 버튼의 기능을 설명하는 짧은 문구를 표시합니다. 지침을 보려면 [도움말 제공하기](https://developer.apple.com/kr/design/human-interface-guidelines/offering-help)의 내용을 참조하십시오.

**익숙한 동작에는 익숙한 아이콘을 연관 지어 사용하도록 하십시오.** 예를 들어, 사람들은 `square.and.arrow.up` 기호가 포함된 버튼이 공유 관련 활동을 수행하는 데 도움이 될 것이라고 예측할 수 있습니다. 버튼에 아이콘을 사용하는 것이 적합한 경우, 기존 또는 사용자화된 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 사용하는 것을 고려하십시오. 일반적인 동작을 나타내는 기호 목록은 [표준 아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/icons#Standard-icons)의 내용을 참조하십시오.

**짧은 레이블이 아이콘보다 더 명확하게 내용을 전달할 때 텍스트를 사용하는 것을 고려하십시오.** 텍스트를 사용하려면 버튼의 기능을 간결하게 설명하는 몇 개의 단어로 작성하십시오. [title-style capitalization](https://help.apple.com/applestyleguide/#/apsgb744e4a3?sub=apdca93e113f1d64)(제목식 대문자 표기법)을 사용하고 버튼의 동작을 전달하는 데 도움이 되는 동사로 레이블을 시작하는 것을 고려하십시오. 예를 들어, 사람들이 쇼핑 카트에 물품을 담을 수 있는 버튼은 ‘카트에 담기’ 레이블을 사용할 수 있습니다.

## 역할

시스템 버튼은 다음 역할 중 하나를 가질 수 있습니다.

- **일반.** 특정 의미가 없습니다.
- **기본.** 해당 버튼은 사람들이 가장 많이 선택할 만한 기본 버튼입니다.
- **취소.** 해당 버튼은 현재 동작을 취소합니다.
- **삭제.** 해당 버튼은 데이터 삭제로 이어질 수 있는 동작을 수행합니다.

버튼의 역할은 해당 모양에 추가적인 영향을 미칠 수 있습니다. 예를 들어, 기본 버튼은 앱의 강조 색상을 사용하는 반면, 삭제 버튼은 빨간색 시스템 색상을 사용합니다.

![기본 버튼, 삭제 버튼 및 보조 버튼으로 레이블이 지정된 세 가지 시스템 버튼이 있는 경고 예제. 기본 버튼은 파란색 강조 색상을 사용하고, 삭제 버튼은 빨간색 시스템 색상의 텍스트를 사용하고, 보조 버튼은 표준 버튼으로 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/buttons-roles-alert@2x.png)

**사람들이 가장 많이 선택할 만한 버튼에 기본 역할을 지정하십시오.** 기본 버튼이 Return 키에 반응하면 사람들이 선택을 쉽고 빠르게 확인할 수 있습니다. 또한 버튼이 임시 보기(예: [시트](https://developer.apple.com/kr/design/human-interface-guidelines/sheets), 편집 가능한 보기 또는 [경고](https://developer.apple.com/kr/design/human-interface-guidelines/alerts))에 있는 경우 해당 버튼에 기본 역할을 할당하면 사람들이 Return을 누를 때 해당 보기가 자동으로 닫힐 수 있습니다.

**삭제 동작을 수행하는 버튼에는 해당 동작이 가장 선택 가능성이 높더라도 기본 역할을 지정하지 마십시오.** 시각적으로 눈에 잘 띄는 특징 때문에 사람들은 때때로 기본 버튼을 읽지 않고 이를 선택합니다. 비삭제 버튼에 기본 역할을 지정하여 사람들이 콘텐츠를 유실하지 않도록 하십시오.

## 플랫폼 고려 사항

*tvOS에 대한 추가 고려 사항은 없습니다.*

### iOS, iPadOS

**즉시 완료되지 않는 동작에 대해 피드백을 제공해야 할 때 활동 표시기를 표시하도록 버튼을 구성하십시오.** 버튼 내에 활동 표시기를 표시하면 지연에 대한 이유를 명확하게 전달하면서 사용자 인터페이스의 공간을 절약할 수 있습니다. 무엇이 진행 중인지 명확히 하기 위해 활동 표시기 옆에 다른 레이블을 표시하도록 버튼을 구성할 수도 있습니다. 예를 들어, 활동 표시기가 표시되는 동안 ‘결제하기’ 레이블이 ‘결제 중…’으로 변경될 수 있습니다. 사람들이 구성된 버튼을 클릭 또는 탭한 후에 지연이 발생하면 시스템은 원본 또는 대체 레이블 옆에 활동 표시기를 표시하며 버튼 이미지가 있는 경우 이를 가립니다.

![‘결제하기’라는 레이블의 버튼 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/button-activity-indicator-hidden@2x.png)

![‘결제 중’이라는 레이블의 버튼 일러스트로, 레이블 앞쪽에 활동 표시기가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/button-activity-indicator-visible@2x.png)

### macOS

몇 가지 특정 버튼 유형은 macOS에 대해 고유한 유형입니다.

#### 누르기 버튼

macOS의 표준 버튼 유형은 *누르기 버튼*이라고 합니다. 누르기 버튼을 구성하여 텍스트, 기호, 아이콘, 이미지 또는 텍스트와 이미지 콘텐츠의 조합을 표시할 수 있습니다. 누르기 버튼은 보기에서 기본 버튼으로 동작할 수 있으며 해당 버튼에 색조를 적용할 수 있습니다.

**크거나 높이가 가변적인 콘텐츠를 표시해야 할 경우에만 높이가 유연한 누르기 버튼을 사용하십시오.** 높이가 유연한 버튼은 일반적인 누르기 버튼과 동일한 구성을 지원하고 동일한 모서리 반경 및 콘텐츠 패딩을 사용하기 때문에 인터페이스의 다른 버튼과 일관되게 보입니다. 텍스트 두 줄 또는 큰 아이콘이 포함된 버튼을 표시해야 하는 경우, 높이가 유연한 버튼을 사용하십시오. 그렇지 않은 경우에는 표준 누르기 버튼을 사용하십시오. 개발자 지침을 보려면 [NSButton.BezelStyle.flexiblePush](https://developer.apple.com/documentation/appkit/nsbutton/bezelstyle-swift.enum/flexiblepush)의 내용을 참조하십시오.

**누르기 버튼이 다른 윈도우, 보기 또는 앱을 열면 제목 뒤쪽에 생략 부호를 추가하십시오.** 시스템 전체에서 제어기 제목에 생략 부호가 있으면 사람들에게 추가 입력을 제공할 수 있음을 나타냅니다. 예를 들어, Safari 설정의 자동 완성 패널에 있는 편집 버튼에 생략 부호가 포함되는 이유는 해당 버튼을 통해 사람들이 자동 완성 값을 수정할 수 있는 다른 보기가 열리기 때문입니다.

**스프링 로딩에 대한 지원을 고려하십시오.** Magic Trackpad가 탑재된 시스템에서는 *스프링 로딩*을 통해 선택한 항목을 버튼 위로 드래그하고 세게 클릭(즉, 세게 누르기)하여 선택한 항목을 놓지 않고 사람들이 해당 버튼을 활성화할 수 있습니다. 세게 클릭한 후에 사람들은 항목을 계속 드래그하여 추가 동작을 수행할 수도 있습니다.

#### 정사각형 버튼

*정사각형 버튼*(*그라디언트 버튼*이라고도 함)은 표에 행 추가 또는 제거와 같이 보기와 관련된 동작을 시작합니다.

정사각형 버튼에는 텍스트가 아닌 기호 또는 아이콘이 포함되어 있으며 누르기 버튼, 토글 또는 팝업 버튼처럼 동작하도록 구성할 수 있습니다. 해당 버튼은 관련 보기(일반적으로 내부 또는 아래)에 근접하게 나타나기 때문에 사람들은 해당 버튼이 어떤 보기에 영향을 미치는지 알 수 있습니다.

**윈도우 프레임이 아닌 보기에서 정사각형 버튼을 사용하십시오.** 정사각형 버튼은 도구 막대 또는 상태 막대에서 사용하기 위해 설계되지 않았습니다. [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars)에 버튼이 필요한 경우 도구 막대 항목을 사용하십시오.

**정사각형 버튼에 기호를 사용하는 것이 좋습니다.** [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)는 기본 상태에서, 그리고 사용자 상호작용에 반응하여 적합한 색상을 자동으로 가져오는 다양한 기호를 제공합니다.

**정사각형 버튼을 소개하기 위해 레이블을 사용하지 마십시오.** 정사각형 버튼은 특정 보기와 밀접하게 연결되어 있기 때문에 설명 텍스트가 없어도 해당 목적이 일반적으로 명확합니다.

개발자 지침을 보려면 [NSButton.BezelStyle.smallSquare](https://developer.apple.com/documentation/appkit/nsbutton/bezelstyle-swift.enum/smallsquare)의 내용을 참조하십시오.

#### 도움말 버튼

*도움말 버튼*은 보기 내에 나타나며 앱별 도움말 문서를 엽니다.

도움말 버튼은 물음표가 포함된 원형의 일관된 크기의 버튼입니다. 도움말 문서 생성에 대한 지침을 보려면 [도움말 제공하기](https://developer.apple.com/kr/design/human-interface-guidelines/offering-help)의 내용을 참조하십시오.

**시스템 제공 도움말 버튼을 사용하여 도움말 문서를 표시하십시오.** 사람들은 표준 도움말 버튼의 모양에 익숙하며, 이를 선택하면 도움말 콘텐츠가 열린다는 것을 알고 있습니다.

**가능할 경우, 현재 맥락과 관련된 도움말 주제를 여십시오.** 예를 들어, Mail 설정의 규칙 패널에 있는 도움말 버튼은 Mail 사용 설명서에서 해당 설정을 변경하는 방법을 설명하는 도움말 주제를 엽니다. 특정 도움말 주제가 현재 맥락에 직접 적용되지 않는 경우, 사람들이 도움말 버튼을 선택하면 앱의 도움말 문서의 상위 레벨이 열립니다.

**윈도우당 두 개 이상의 도움말 버튼은 포함하지 마십시오.** 같은 맥락에서 여러 개의 도움말 버튼이 있으면 사람들이 버튼 하나를 클릭할 때의 결과를 예측하기 어렵게 만듭니다.

**사람들이 예상하는 위치에 도움말 버튼을 배치하십시오.** 다음 위치를 지침으로 따르십시오.

| 보기 스타일 | 도움말 버튼 위치 |
| --- | --- |
| 닫기 버튼(예: 확인 및 취소)이 있는 대화상자 | 닫기 버튼의 반대편 하단 모서리 및 해당 버튼과 세로로 정렬됨 |
| 닫기 버튼이 없는 대화상자 | 왼쪽 하단 또는 오른쪽 하단 모서리 |
| 설정 윈도우 또는 패널 | 왼쪽 하단 또는 오른쪽 하단 모서리 |

**윈도우 프레임이 아닌 보기 내에 도움말 버튼을 사용하십시오.** 예를 들어, 도구 막대 또는 상태 막대에 도움말 버튼을 배치하지 마십시오.

**도움말 버튼을 소개하는 텍스트를 표시하지 마십시오.** 사람들은 도움말 버튼의 기능을 알고 있기 때문에 추가적인 설명 텍스트가 필요하지 않습니다.

#### 이미지 버튼

*이미지 버튼*은 보기에 나타나며 이미지, 기호 또는 아이콘을 표시합니다. 누르기 버튼, 토글 또는 팝업 버튼과 같이 동작하도록 이미지 버튼을 구성할 수 있습니다.

**윈도우 프레임이 아닌 보기에서 이미지 버튼을 사용하십시오.** 예를 들어, 도구 막대 또는 상태 막대에 이미지 버튼을 배치하지 마십시오. 도구 막대에서 이미지를 버튼으로 사용해야 하는 경우 도구 막대 항목을 사용하십시오. [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars)의 내용을 참조하십시오.

**이미지 가장자리와 버튼 가장자리 사이에 약 10픽셀의 패딩을 포함하십시오.** 이미지 버튼의 가장자리는 보이지 않는 경우에도 클릭 가능한 영역을 정의합니다. 패딩을 포함하면 이미지를 정확하게 클릭하지 않더라도 클릭이 올바르게 인식됩니다. 일반적으로 이미지 버튼에서 시스템 제공 테두리를 포함하지 마십시오. 개발자 지침을 보려면 [isBordered](https://developer.apple.com/documentation/appkit/nsbutton/isbordered)의 내용을 참조하십시오.

**레이블을 포함해야 하는 경우, 이미지 버튼 아래에 배치하십시오.** 관련된 지침을 보려면 [레이블](https://developer.apple.com/kr/design/human-interface-guidelines/labels)의 내용을 참조하십시오.

### visionOS

visionOS 버튼은 일반적으로 사람들이 버튼을 볼 수 있도록 눈에 보이는 배경을 포함하며, 사람들이 버튼과 상호작용하면 피드백을 제공할 수 있도록 사운드를 재생합니다.

[video: visionOS의 윈도우 상단 부분을 보여주는 녹화 영상. 윈도우에는 호버 효과를 받는 ‘더 보기’ 버튼을 포함하여 여러 버튼이 있음. 버튼이 선택되어 있으며 추가 옵션이 포함된 메뉴가 나타남.]

visionOS에는 세 가지의 표준 버튼 모양이 있습니다. 일반적으로 아이콘 전용 버튼은 [circle](https://developer.apple.com/documentation/swiftui/buttonbordershape/circle) 모양을 사용하고, 텍스트 전용 버튼은 [roundedRectangle](https://developer.apple.com/documentation/swiftui/buttonbordershape/roundedrectangle) 또는 [capsule](https://developer.apple.com/documentation/swiftui/buttonbordershape/capsule) 모양을 사용하며, 아이콘 및 텍스트가 모두 포함된 버튼은 캡슐 모양을 사용합니다.

visionOS 버튼은 다양한 시각적 스타일을 사용하여 네 개의 다양한 상호작용 상태를 전달합니다.

![둥근 모서리가 있고 윤곽으로 표시된 정사각형 아이콘이 포함된 원형 버튼의 이미지. 버튼 배경이 어둡고 점선으로 된 윤곽이 흰색임.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-button-state-idle@2x.png)

![둥근 모서리가 있고 윤곽으로 표시된 정사각형 아이콘이 포함된 원형 버튼의 이미지. 버튼 배경이 약간 어둡고 윤곽이 흰색임.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-button-state-hover@2x.png)

![둥근 모서리가 있고 윤곽으로 표시된 정사각형 아이콘이 포함된 원형 버튼의 이미지. 버튼 배경이 흰색이고 윤곽이 검은색임.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-button-state-selected@2x.png)

![둥근 모서리가 있고 윤곽으로 표시된 정사각형 아이콘이 포함된 원형 버튼의 이미지. 버튼 배경이 매우 어둡고 윤곽이 밝음.](https://developer.apple.com/images/com.apple.HIG/kr/visionos-button-state-unavailable@2x.png)

> **참고:** visionOS에서 버튼은 사용자 설정 호버 효과를 지원하지 않습니다.

위에 표시된 네 개의 상태 외에도, 사람들이 짧은 시간 동안 버튼을 바라보면 해당 버튼이 툴팁을 표시할 수도 있습니다. 일반적으로, 버튼의 설명 레이블이 버튼의 기능을 전달하기 때문에 텍스트가 포함된 버튼은 툴팁을 표시할 필요가 없습니다.

[video: visionOS 버튼 아래에 툴팁이 나타나는 것을 보여주는 애니메이션.]

visionOS에서 버튼은 다음과 같은 크기가 있습니다.

| 모양 | 미니(28pt) | 작게(32pt) | 기본(44pt) | 크게(52pt) | 매우 크게(64pt) |
| --- | --- | --- | --- | --- | --- |
| 원형 | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) |
| 캡슐형(텍스트만) |  | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) |  |
| 캡슐형(텍스트 및 아이콘) |  |  | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) |  |
| 모서리가 둥근 직사각형 |  | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) | ![사용 가능 여부를 나타내는 체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/table-availability-checkmark@2x.png) |  |

**인지할 수 있는 배경 모양 및 채우기가 있는 버튼을 사용하는 것이 좋습니다.** 대비되는 배경 채우기를 사용하는 모양 안에 있을 때 사람들이 버튼을 쉽게 볼 수 있습니다. 도구 막대, 빠른 메뉴, 경고 또는 [오너먼트](https://developer.apple.com/kr/design/human-interface-guidelines/ornaments)의 버튼은 예외입니다. 여기에서는 더 큰 구성요소의 모양과 머티리얼을 통해 버튼을 편하게 볼 수 있도록 만듭니다. 다음 지침은 다양한 맥락에서 버튼이 잘 보일 수 있도록 하는 데 도움이 될 수 있습니다.

- 버튼이 유리 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/windows#visionOS) 상단에 나타나는 경우 버튼의 배경으로 [thin](https://developer.apple.com/documentation/swiftui/material/thin) 머티리얼을 사용하십시오.
- 버튼이 공간에서 떠 있는 채로 나타나는 경우 해당 배경에 [visionOS](https://developer.apple.com/kr/design/human-interface-guidelines/materials#visionOS)을 사용하십시오.

**흰색 배경 채우기와 검은색 텍스트 또는 아이콘을 사용하는 사용자 설정 버튼을 생성하지 마십시오.** 시스템은 토글된 상태를 전달하기 위해 이 시각적 스타일을 유지합니다.

**일반적으로 원형 또는 캡슐 모양의 버튼을 사용하는 것이 좋습니다.** 사람들의 눈은 모양의 모서리 쪽으로 끌리는 경향이 있어, 모양의 중앙을 계속 보는 것을 어렵게 합니다. 버튼의 모양을 더 둥글게 할수록 사람들이 해당 버튼을 더 쉽게 응시할 수 있습니다. 버튼 자체를 표시해야 하는 경우 캡슐 모양의 버튼을 사용하는 것이 좋습니다.

**버튼 주변에 충분한 공간을 제공하여 사람들이 바라보기 쉽도록 만드십시오.** 항상 버튼의 중앙이 60pt 이상 떨어져 있도록 버튼을 배치하십시오. 버튼의 크기가 60pt 이상인 경우, 버튼 주위에 4pt의 패딩을 추가하여 호버 효과가 겹치지 않도록 하십시오. 또한, 일반적으로 세로 스택 또는 가로 행에서 작은 버튼 또는 미니 버튼을 표시하지 않는 것이 가장 좋습니다.

**스택 또는 행에서 텍스트 레이블이 있는 버튼을 표시해야 하는 경우 올바른 모양을 선택하십시오.** 특히, 세로 스택의 버튼에서는 모서리가 둥근 직사각형을 사용하고 가로 행의 버튼에서는 캡슐 모양을 사용하는 것이 좋습니다.

**표준 제어기를 사용하여 사람들이 이미 알고 있는 청각적인 피드백 사운드를 활용하십시오.** 시스템은 햅틱을 재생하지 않기 때문에 청각적인 피드백은 visionOS에서 특히 중요합니다.

### watchOS

watchOS는 [capsule](https://developer.apple.com/documentation/swiftui/buttonbordershape/capsule) 버튼 모양을 사용하여 모든 인라인 버튼을 표시합니다. 버튼을 콘텐츠와 함께 인라인으로 배치하면, 배경과 대비되는 머티리얼 효과가 적용되어 가독성을 보장합니다.

![Apple Watch의 화면을 나타내는 일러스트로, 캡슐 모양의 기본 및 보조 버튼이 포함됨.](https://developer.apple.com/images/com.apple.HIG/kr/buttons-watch-full-width@2x.png)

**도구 막대를 사용하여 모서리에 버튼을 배치하십시오.** 시스템은 도구 막대 버튼과 부합하도록 시간 및 제목을 자동으로 이동합니다. 또한 도구 막대 버튼에도 [Liquid Glass](https://developer.apple.com/kr/design/human-interface-guidelines/materials#Liquid-Glass) 스타일을 적용하여, 그 아래의 콘텐츠와 명확한 시각적 구분을 제공합니다.

![상단의 앞쪽 및 뒤쪽 모서리에 도구 막대 버튼뿐만 아니라 화면 하단에서 세 개의 도구 막대 버튼을 보여주는 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/buttons-watch-toolbar-corners@2x.png)

**앱의 기본 버튼의 경우 화면의 너비에 걸쳐 있는 버튼을 사용하는 것이 좋습니다.** 전각 버튼은 눈에 잘 보이며 사람들이 쉽게 탭할 수 있습니다. 두 개의 버튼이 동일한 가로 간격을 공유해야 하는 경우, 두 버튼은 동일한 높이를 사용하고 각 버튼의 콘텐츠는 이미지 또는 짧은 텍스트 제목을 사용하십시오.

**도구 막대 버튼을 사용하여 보기의 콘텐츠의 관련된 영역 또는 상황별 동작에 대한 탐색을 제공하십시오.** 해당 버튼을 통해 보기의 콘텐츠의 추가 정보 또는 보조 동작에 접근할 수 있습니다.

**한 줄이나 두 줄 텍스트 버튼의 세로 스택의 경우 같은 높이를 사용하십시오.** 가능한 한, 시각적 일관성을 위해 동일한 버튼 높이를 사용하십시오.

## 리소스

#### 관련 콘텐츠

[팝업 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pop-up-buttons)

[풀 다운 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/pull-down-buttons)

[토글](https://developer.apple.com/kr/design/human-interface-guidelines/toggles)

[구분 제어기](https://developer.apple.com/kr/design/human-interface-guidelines/segmented-controls)

[위치 버튼](https://developer.apple.com/kr/design/human-interface-guidelines/privacy#Location-button)

#### Developer 문서

[Button](https://developer.apple.com/documentation/swiftui/button) — SwiftUI

[UIButton](https://developer.apple.com/documentation/uikit/uibutton) — UIKit

[NSButton](https://developer.apple.com/documentation/appkit/nsbutton) — AppKit

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 12월 16일 | Liquid Glass의 지침이 업데이트됨. |
| 2025년 6월 9일 | 버튼 스타일 및 콘텐츠에 대한 지침이 업데이트됨. |
| 2024년 2월 2일 | visionOS 버튼이 사용자 설정 호버 효과를 지원하지 않음을 명시함. |
| 2023년 12월 5일 | visionOS에서 버튼에 대한 일부 용어 및 지침을 명시함. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
| 2023년 6월 5일 | watchOS의 버튼 사용에 대한 지침이 업데이트됨. |
