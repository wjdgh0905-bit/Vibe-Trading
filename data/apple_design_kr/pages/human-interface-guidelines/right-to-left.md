# 오른쪽에서 왼쪽

Source: https://developer.apple.com/kr/design/human-interface-guidelines/right-to-left

> 필요한 경우 해당하는 문자의 읽기 방향과 일치하도록 인터페이스를 반전시켜 아랍어 및 히브리어 등 오른쪽에서 왼쪽으로 읽는 언어를 지원할 수 있습니다.

![윈도우 안에 오른쪽으로 정렬된 목록의 스케치가 있어 오른쪽에서 왼쪽으로 읽는 언어로 표시된 인터페이스임을 짐작할 수 있음. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 노란색을 은은하게 반영하는 노란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/foundations-rtl-intro@2x.png)

사람들은 기기나 앱 또는 게임의 언어를 선택할 때 인터페이스가 다양한 방식으로 적용될 것이라고 기대합니다(자세한 내용은 [Localization](https://developer.apple.com/localization/) 참조).

시스템에서 제공한 UI 프레임워크는 기본적으로 오른쪽에서 왼쪽(RTL)을 지원하여 RTL 맥락의 시스템 제공 UI 구성 요소를 자동으로 뒤집을 수 있습니다. 시스템 제공 요소 및 표준 레이아웃을 사용하는 경우, 자동으로 반전된 앱 인터페이스를 변경할 필요가 없습니다.

RTL 언어를 사용하는 국가의 다양한 언어에서 나타날 수 있는 다양한 통화, 숫자 또는 수학 기호에 맞게 레이아웃을 미세 조정하거나 특정 현지화를 개선하려면 다음 지침을 따르십시오.

## 텍스트 정렬

**시스템이 자동으로 정렬하지 않는 경우, 텍스트 정렬이 인터페이스 방향과 일치하도록 조절하십시오.** 예를 들어, 왼쪽에서 오른쪽(LTR) 맥락의 콘텐츠에 맞춰 텍스트를 왼쪽 정렬한 경우, RTL 맥락의 뒤집힌 콘텐츠 위치와 일치하려면 텍스트를 오른쪽 정렬하십시오.

![인터페이스의 텍스트 및 이미지 레이아웃을 표시한 일러스트 그림. 막대 3개는 모서리가 둥근 직사각형의 상단에 왼쪽으로 정렬됨. 임시 이미지는 하단 가장자리의 다른 막대 위에서 해당 영역의 중앙에 정렬됨. 영역 내 막대는 왼쪽 정렬됨.](https://developer.apple.com/images/com.apple.HIG/kr/text-alignment-ltr-screen@2x.png)

![인터페이스의 텍스트 및 이미지 레이아웃을 표시한 일러스트 그림. 막대 3개는 모서리가 둥근 직사각형의 상단에 오른쪽으로 정렬됨. 임시 이미지는 하단 가장자리의 다른 막대 위에서 해당 영역의 중앙에 정렬됨. 영역 내 막대는 오른쪽 정렬됨. 임시 이미지는 뒤집히지 않음.](https://developer.apple.com/images/com.apple.HIG/kr/text-alignment-rtl-screen@2x.png)

**현재 맥락이 아닌 언어를 기준으로 단락을 정렬하십시오.** 단락(3줄 이상으로 나열된 텍스트로 정의)의 정렬이 해당 언어와 일치하지 않으면 읽기 어려울 수 있습니다. 예를 들어, LTR 텍스트로 이루어진 단락을 오른쪽 정렬하면 각 줄의 시작 부분을 보기 힘들 수 있습니다. 가독성을 높이려면 한 줄 및 두 줄 텍스트 블록은 현재 맥락의 읽기 방향과 일치시키고 단락은 해당 언어와 일치하도록 정렬하십시오.

![임시 문서의 두 단락을 표시한 이미지. 첫 번째 단락은 아랍어로 되어 있으며 오른쪽 정렬됨. 두 번째 단락은 영어로 되어 있으며 왼쪽 정렬됨.](https://developer.apple.com/images/com.apple.HIG/kr/paragraph-alignment-correct@2x.png)

![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![임시 문서의 두 단락을 표시한 이미지. 첫 번째 단락은 아랍어로 되어 있고 두 번째 단락은 영어로 되어 있음. 두 단락 모두 오른쪽으로 정렬됨.](https://developer.apple.com/images/com.apple.HIG/kr/paragraph-alignment-wrong@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**목록의 모든 텍스트 항목에 일관적 정렬을 사용하십시오.** 편안한 읽기 및 훑어 보기 경험을 제공하려면 목록에서 다른 문자로 표시되는 항목을 포함해 모든 항목의 정렬을 반전하십시오.

![오른쪽 정렬된 회색 막대 목록의 일러스트가 오른쪽에서 왼쪽으로 읽는 텍스트를 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/mixed-script-list-alignment-correct@2x.png)

![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![회색 막대 목록의 일러스트. 첫 번째, 세 번째, 네 번째, 다섯 번째 막대는 오른쪽에서 왼쪽으로 읽는 텍스트를 나타냄. 두 번째 막대는 왼쪽으로 잘못 정렬됨.](https://developer.apple.com/images/com.apple.HIG/kr/mixed-script-list-alignment-wrong@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

## 숫자 및 문자

다양한 RTL 언어는 서로 다른 숫자 체계를 사용할 수 있습니다. 예를 들어, 히브리어 텍스트는 서아라비아 숫자를 사용하지만 아랍어 텍스트는 서아라비아 숫자 또는 동아라비아 숫자를 사용합니다. 서아라비아 숫자 및 동아라비아 숫자의 사용 여부는 나라 및 지역별로 다르며, 심지어 동일한 나라 또는 지역 내에서도 일대별로 다릅니다.

앱이 수학적 개념이나 기타 숫자 관련 주제를 다루는 경우, 지원하는 각 언어별로 해당 정보를 표시하는 적절한 방법을 식별하는 것이 좋습니다. 반대로 숫자 관련 주제를 다루지 않는 앱은 일반적으로 시스템에서 제공하는 숫자 표현을 사용할 수 있습니다.

![왼쪽부터 숫자 일, 이, 삼이 서아라비아 숫자로 적혀 있음.](https://developer.apple.com/images/com.apple.HIG/kr/textformat-123-ltr@2x.png)

![오른쪽부터 숫자 일, 이, 삼이 동아라비아 숫자로 적혀 있음.](https://developer.apple.com/images/com.apple.HIG/kr/textformat-123-ar@2x.png)

**특정 숫자의 숫자 순서를 반대로 바꾸지 마십시오.** 현재 언어나 주변 콘텐츠와 관계없이 ‘541’, 전화번호 또는 신용 카드 번호와 같은 특정 숫자의 자릿수는 항상 같은 순서로 표시됩니다.

![왼쪽부터 두 단어와 이를 뒤따르는 라틴어 12345 숫자가 순서대로 적혀 있음.](https://developer.apple.com/images/com.apple.HIG/kr/latin-numerals@2x.png)

![오른쪽부터 두 단어와 이를 뒤따르는 히브리어로 적힌 12345 숫자가 순서대로 적혀 있음.](https://developer.apple.com/images/com.apple.HIG/kr/hebrew-numerals@2x.png)

![오른쪽부터 아랍어로 적힌 두 단어와 이를 뒤따르는 12345 서아라비아 숫자가 순서대로 적혀 있음.](https://developer.apple.com/images/com.apple.HIG/kr/western-arabic-numerals@2x.png)

![오른쪽부터 아랍어로 적힌 두 단어와 이를 뒤따르는 12345 숫자가 동아라비아 숫자 순서대로 적혀 있음.](https://developer.apple.com/images/com.apple.HIG/kr/eastern-arabic-numerals@2x.png)

**진행률이나 숫자를 세는 방향을 나타내는 순서를 반대로 바꾸고 절대로 숫자 자체를 뒤집지 마십시오.** 진행률 표시줄, 슬라이더 및 평점 제어기 등 제어기에는 의미를 명확히 하기 위해 숫자가 포함되는 경우가 많습니다. 이런 방법으로 숫자를 사용하는 경우, 숫자의 순서를 반대로 바꾸어 뒤집힌 제어기의 방향과 일치하게 만드십시오. 또한 연속된 숫자를 사용하여 특정 순서를 나타내는 경우, 해당 숫자를 반전하십시오.

![별 다섯 개가 있는 가로행. 왼쪽부터 순서대로 별 3개 반이 채워짐. 별 아래에는 라틴어 숫자 행이 상단의 별에 맞춰 가로로 정렬됨. 왼쪽부터 일, 이, 삼, 사, 오 숫자가 나열됨.](https://developer.apple.com/images/com.apple.HIG/kr/match-numeral-order-to-directional-controls-latin@2x.png)

![별 다섯 개가 있는 가로행. 오른쪽부터 순서대로 별 3개 반이 채워짐. 별 아래에는 동아라비아 숫자 행이 상단의 별에 맞춰 가로로 정렬됨. 오른쪽부터 일, 이, 삼, 사, 오 숫자가 나열됨.](https://developer.apple.com/images/com.apple.HIG/kr/match-numeral-order-to-directional-controls-eastern-arabic@2x.png)

![별 다섯 개가 있는 가로행. 오른쪽부터 순서대로 별 3개 반이 채워짐. 별 아래에는 서아라비아 숫자 행이 상단의 별에 맞춰 가로로 정렬됨. 오른쪽부터 일, 이, 삼, 사, 오 숫자가 나열됨.](https://developer.apple.com/images/com.apple.HIG/kr/match-numeral-order-to-directional-controls-western-arabic-hebrew@2x.png)

![별 다섯 개가 있는 가로행. 오른쪽부터 순서대로 별 3개 반이 채워짐. 별 아래에는 서아라비아 숫자 행이 상단의 별에 맞춰 가로로 정렬됨. 오른쪽부터 일, 이, 삼, 사, 오 숫자가 나열됨.](https://developer.apple.com/images/com.apple.HIG/kr/match-numeral-order-to-directional-controls-western-arabic-hebrew@2x.png)

## 제어기

**한 값에서 다른 값까지의 진행 과정을 표시하는 제어기를 뒤집으십시오.** 사람들은 진행 과정이 읽는 언어와 동일한 방향으로 나아간다고 보는 경향이 있기 때문에 RTL 맥락에서는 슬라이더 및 진행 과정 표시기와 같은 제어기를 뒤집는 것이 좋습니다. 뒤집을 때 동반하는 글리프 또는 제어기의 시작과 끝 값을 표시하는 이미지의 위치도 반대로 바꾸십시오.

![음량 조절 슬라이더의 일러스트. 왼쪽에는 오른쪽을 향하는 스피커 글리프에 음소거 표시가 있고 오른쪽에는 오른쪽을 향하는 스피커 글리프에 파형이 퍼져 나가는 표시가 있어서 조절기를 왼쪽에서 오른쪽으로 움직이면 음량이 커짐을 보여줌.](https://developer.apple.com/images/com.apple.HIG/kr/flipped-directional-control-ltr@2x.png)

![음량 조절 슬라이더의 일러스트. 오른쪽에는 왼쪽을 향하는 스피커 글리프에 음소거 표시가 있고 왼쪽에는 왼쪽을 향하는 스피커 글리프에 파형이 퍼져 나가는 표시가 있어서 조절기를 오른쪽에서 왼쪽으로 움직이면 음량이 커짐을 보여줌.](https://developer.apple.com/images/com.apple.HIG/kr/flipped-directional-control-rtl@2x.png)

**고정된 순서로 항목을 탐색하거나 항목에 접근할 수 있는 제어기를 뒤집으십시오.** 예를 들어, RTL 맥락에서 뒤로 버튼은 오른쪽을 가리켜야 화면의 흐름이 RTL 언어의 읽는 순서와 일치합니다. 마찬가지로 나열된 목록에서 항목에 접근하는 데 사용하는 다음 또는 이전 버튼을 RTL 맥락에서 읽는 순서와 일치하려면 뒤집어야 합니다.

**실제 방향을 의미하거나 화면상 영역을 가리키는 제어기의 방향은 유지하십시오.** 예를 들어, ‘오른쪽으로’라는 의미의 제어기를 제공하는 경우, 해당 제어기는 현재 맥락과 무관하게 항상 오른쪽을 향해야 합니다.

**필요한 경우, 라틴어와 RTL 문자의 시각적인 균형을 맞추십시오.** 버튼, 레이블 및 제목에서 아랍어 또는 히브리어 텍스트는 대문자를 사용하지 않기 때문에 대문자 라틴어 텍스트 옆에 너무 작게 표시될 수 있습니다. 아랍어 또는 히브리어 텍스트와 모두 대문자인 라틴어 텍스트의 시각적 균형을 맞추려면 RTL 서체 크기를 약 2포인트 늘리면 됩니다.

![3개의 파란색 타원 버튼이 있는 가로행. 각 버튼에는 다운로드 단어가 레이블로 지정됨. 왼쪽부터 레이블은 라틴어, 아랍어, 히브리어로 되어 있고 영어 레이블은 모두 대문자를 사용함. 2개의 빨간색 수평선이 3개의 버튼 위를 가로지르며 상단 선은 어센더, 하단 선은 베이스라인임. 영어 레이블의 모든 문자는 두 선에 닿음. 아랍어 레이블의 마지막 두 문자만 베이스라인에 닿거나 아래로 뻗어 나오며 마지막 문자만 어센더 선에 닿음. 히브리어 레이블의 모든 문자는 두 선에 닿지 않음. 라틴어 레이블에 비해 아랍어 및 히브리어 레이블은 작게 보임.](https://developer.apple.com/images/com.apple.HIG/kr/download-uneven-vertical-height@2x.png)

![3개의 파란색 타원 버튼이 있는 가로행. 각 버튼에는 다운로드 단어가 레이블로 지정됨. 왼쪽부터 레이블은 라틴어, 아랍어, 히브리어로 되어 있고 영어 레이블은 모두 대문자를 사용함. 2개의 빨간색 수평선이 3개의 버튼 위를 가로지르며 상단 선은 어센더, 하단 선은 베이스라인임. 영어 레이블의 모든 문자는 두 선에 닿음. 아랍어 레이블의 마지막 두 문자는 베이스라인에 닿거나 아래로 뻗어 나오며 첫 번째와 마지막 문자는 어센더 줄 위로 뻗어 나옴. 히브리어 레이블의 모든 문자가 베이스라인 및 어센더 줄에 닿음. 크기를 늘린 아랍어 및 히브리어 레이블은 라틴어 레이블과 크기가 비슷해 보임.](https://developer.apple.com/images/com.apple.HIG/kr/download-even-vertical-height@2x.png)

## 이미지

**사진, 일러스트 및 일반 아트워크와 같은 이미지는 뒤집지 마십시오.** 이미지를 뒤집으면 이미지의 의미가 바뀔 수 있고 저작권 있는 이미지를 뒤집으면 저작권에 위반될 수 있습니다. 이미지의 콘텐츠가 읽는 방향과 밀접한 관계가 있는 경우, 원본을 뒤집는 대신 이미지의 새로운 버전을 생성하는 것이 좋습니다.

![검은색 도형을 사용하여 아프리카, 유럽, 아시아, 오스트레일리아, 남극을 대부분 표시하는 지구본의 단순화된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/image-displayed-right@2x.png)

![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![아프리카가 오른쪽 끝에 있고 오스트레일리아가 왼쪽 끝에 있는 가로로 뒤집힌 동반구를 보여주는 지구본의 단순화된 일러스트.](https://developer.apple.com/images/com.apple.HIG/kr/image-displayed-wrong@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

**이미지의 순서에 의미가 있는 경우에만 위치를 반전하십시오.** 예를 들어, 다양한 이미지를 시간순, 알파벳순 또는 즐겨찾기 순서와 같은 특정 순서로 표시하는 경우, 위치를 반전하여 RTL 맥락에서 순서가 갖는 의미를 유지하십시오.

![모서리가 둥근 직사각형 내에 텍스트 및 이미지 레이아웃을 표시한 일러스트. 텍스트를 표시한 짧은 막대가 왼쪽 상단 모서리에 왼쪽으로 정렬됨. 막대 아래에는 정사각형 4개가 있는 영역이 있고 왼쪽에 임시 이미지가 있는 파란색 정사각형을 포함함. 왼쪽부터 직사각형 아래에 있는 5개의 정사각형 영역에 하트, 원, 별, 정사각형 및 삼각형 모양이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/image-positions-ltr@2x.png)

![모서리가 둥근 직사각형 내에 텍스트 및 이미지 레이아웃을 표시한 일러스트. 텍스트를 표시한 짧은 막대가 오른쪽 상단 모서리에 오른쪽으로 정렬됨. 막대 아래에는 정사각형 4개가 있는 영역이 있고 오른쪽에 임시 이미지가 있는 파란색 정사각형을 포함함. 오른쪽부터 직사각형 아래에 있는 5개의 정사각형 영역에 하트, 원, 별, 정사각형 및 삼각형 모양이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/image-positions-rtl@2x.png)

## 인터페이스 아이콘

[SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 사용하여 앱이 인터페이스 아이콘을 제공하면 RTL 맥락에 맞는 버전 및 아랍어와 히브리어 등 언어의 현지화된 기호를 사용할 수 있습니다. 사용자 설정 기호를 생성하는 경우, 해당 기호의 방향을 지정할 수 있습니다. 개발자 지침을 보려면 [Creating custom symbol images for your app](https://developer.apple.com/documentation/uikit/creating-custom-symbol-images-for-your-app)의 내용을 참조하십시오.

![3개의 수평선이 균등하게 쌓여 있음. 각 선 왼쪽 앞에는 글머리 부호가 있음. 책등이 왼쪽에 있는 닫힌 책 모양. 모서리가 둥근 직사각형에 왼쪽 정렬된 점 3개가 나열됨. 연필은 약 45도 기울어져 있으며, 촉은 가장 오른쪽에 있는 점을 가리키며 지우개는 직사각형의 오른쪽 상단 모서리 바깥으로 뻗어 나옴. 직사각형 높이의 약 4분의 1을 차지하는 검은색 막대가 상단을 가로지르는 모서리가 둥근 직사각형. 왼쪽 정렬된 하얀색 점이 막대 왼쪽에 나열됨. 더 작고 검은색인 모서리가 둥근 직사각형이 왼쪽 근처에 있는 모서리가 둥근 직사각형. 직사각형 밖 오른쪽에는 직사각형의 오른쪽 세로선에 수직선 모서리가 가까이 있는 검은색 반원이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/directional-symbols-ltr@2x.png)

![3개의 수평선이 균등하게 쌓여 있음. 각 선 오른쪽 앞에는 글머리 부호가 있음. 책등이 오른쪽에 있는 닫힌 책 모양. 모서리가 둥근 직사각형에 오른쪽 정렬된 점 3개가 나열됨. 연필은 약 45도 기울어져 있으며, 촉은 가장 왼쪽에 있는 점을 가리키며 지우개는 직사각형의 중앙 상단 바깥으로 뻗어 나옴. 직사각형 높이의 약 4분의 1을 차지하는 검은색 막대가 상단을 가로지르는 모서리가 둥근 직사각형. 오른쪽 정렬된 하얀색 점이 막대 오른쪽에 나열됨. 더 작고 검은색인 모서리가 둥근 직사각형이 오른쪽 근처에 있는 모서리가 둥근 직사각형. 직사각형 밖 왼쪽에는 직사각형의 왼쪽 세로선에 수직선 모서리가 가까이 있는 검은색 반원이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/directional-symbols-rtl@2x.png)

**텍스트 또는 읽는 방향을 나타내는 인터페이스 아이콘을 뒤집으십시오.** 예를 들어, 인터페이스 아이콘이 왼쪽 정렬 막대를 사용하여 LTR 맥락의 텍스트를 나타내면 RTL 맥락에서는 막대를 오른쪽으로 정렬하십시오.

![모서리가 둥근 직사각형에 왼쪽 정렬된 3개의 수평선이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/doc-plaintext-ltr@2x.png)

![모서리가 둥근 직사각형에 오른쪽 정렬된 3개의 수평선이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/doc-plaintext-rtl@2x.png)

**텍스트를 표시하는 인터페이스 아이콘의 현지화 버전을 생성하십시오.** 일부 인터페이스 아이콘에는 서체 크기 선택하기나 서명 등 문자 관련 개념을 소통하는 데 도움되는 문자나 단어를 포함합니다. 실제 텍스트를 표시해야 하는 사용자 설정 인터페이스 아이콘이 있는 경우, 현지화된 버전을 생성하십시오. 예를 들어, SF Symbols는 라틴어, 히브리어, 아랍어 텍스트 등에서 사용할 수 있는 서명, 리치 텍스트, I-beam 포인터 기호의 다양한 버전을 제공합니다.

![수평선 위에 작은 X가 왼쪽 정렬되어 있음. 스타일 있는 서명이 X에서 시작해서 수평선의 오른쪽 끝에서 끝남. 모서리가 둥근 직사각형의 왼쪽 상단 모서리에 대문자 A가 있고 오른쪽 상단 모서리에 2개의 수평선이 쌓여 있음. 직사각형의 하반부에 임시 이미지가 표시됨. 큰 I-beam 커서 왼쪽에 큰 대문자 A가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/text-icon-localized-latin@2x.png)

![수평선 위에 작은 X가 오른쪽 정렬되어 있음. 스타일 있는 서명이 X에서 시작해서 수평선의 왼쪽 끝에서 끝남. 모서리가 둥근 직사각형의 오른쪽 상단 모서리에 Alef 문자가 있고 왼쪽 상단 모서리에 2개의 수평선이 쌓여 있음. 직사각형의 하반부에 임시 이미지가 표시됨. 큰 I-beam 커서 오른쪽에 큰 Alef 문자가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/text-icon-localized-hebrew@2x.png)

![수평선 위에 작은 X가 오른쪽 정렬되어 있음. 스타일 있는 서명이 X에서 시작해서 수평선의 왼쪽 끝에서 끝남. 모서리가 둥근 직사각형의 오른쪽 상단 모서리에 Ain 문자가 있고 왼쪽 상단 모서리에 2개의 수평선이 쌓여 있음. 직사각형의 하반부에 임시 이미지가 표시됨. 큰 I-beam 커서 오른쪽에 큰 Dad 문자가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/text-icon-localized-arabic@2x.png)

문자 또는 단어를 사용하여 읽기 또는 쓰기와 관계없는 개념을 전달하는 사용자 설정 인터페이스 아이콘이 있는 경우, 텍스트를 사용하지 않는 대체 이미지를 디자인하십시오.

**앞 또는 뒤로 움직임을 표시하는 인터페이스 아이콘을 뒤집으십시오.** 사람들은 대상체가 읽는 방향과 같은 방향으로 이동하면 해당 방향을 앞으로 해석하고, 반대 방향으로 이동하면 해당 방향을 뒤로 해석하는 경향이 있습니다. RTL 맥락에서 대상체가 앞 또는 뒤로 이동하는 움직임을 나타내는 인터페이스 아이콘을 뒤집어야 움직임의 의미를 유지할 수 있습니다. 예를 들어, 스피커를 나타내는 아이콘은 일반적으로 스피커에서부터 앞으로 나오는 음파를 표시합니다. LTR 맥락에서 음파는 왼쪽에서 시작되기 때문에 RTL 맥락에서는 아이콘을 뒤집어서 오른쪽에서 시작되는 음파를 표시해야 합니다.

![오른쪽으로 뻗는 3개의 동심원 곡선이 있는 스피커의 윤곽.](https://developer.apple.com/images/com.apple.HIG/kr/speaker-wave-3-ltr@2x.png)

![왼쪽으로 뻗는 3개의 동심원 곡선이 있는 스피커의 윤곽.](https://developer.apple.com/images/com.apple.HIG/kr/speaker-wave-3-rtl@2x.png)

**로고 또는 범용 기호 및 마크를 뒤집지 마십시오.** 뒤집힌 로고를 표시하면 사람들에게 혼란을 주고 법적 문제가 발생할 수 있습니다. 로고에 텍스트가 포함되어 있어도 항상 원본 형식으로 표시하십시오. 사람들은 체크 표시와 같은 범용 기호 및 마크가 일관된 모양을 갖는다고 생각하기 때문에 뒤집지 않는 것이 좋습니다.

![검은색 Apple TV 로고를 포함한 모서리가 둥근 정사각형. 소문자 T 및 V 옆에 흰색 사과가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/appletv-ltr@2x.png)

![체크 표시.](https://developer.apple.com/images/com.apple.HIG/kr/checkmark-ltr@2x.png)

**일반적으로 실제 대상체를 나타내는 인터페이스 아이콘은 뒤집지 마십시오.** 방향을 나타내기 위해 해당 대상체를 사용하지 않는 이상 익숙한 항목을 나타내는 아이콘은 뒤집지 않는 것이 좋습니다. 예를 들어, 시계는 모든 곳에서 동일하게 작동하기 때문에 전통적인 시계 인터페이스 아이콘은 언어 방향과 무관하게 똑같아야 합니다. 일부 인터페이스 아이콘은 오른손잡이를 위해 기울어진 사물을 표시하기 때문에 언어 또는 읽기 방향을 나타내는 것처럼 보일 수 있습니다. 그러나 대부분 사람이 오른손잡이이기 때문에 오른손잡이 도구를 표시한 아이콘을 뒤집을 필요는 없으며 오히려 혼란을 줄 수 있습니다.

![9시를 나타내는 위치에 흰색 선 2개가 있는 검은색 원반.](https://developer.apple.com/images/com.apple.HIG/kr/clock-fill-ltr@2x.png)

![지우개가 달린 연필이 촉을 왼쪽 하단에 둔 채 약 45도 기울어져 있음.](https://developer.apple.com/images/com.apple.HIG/kr/pencil-ltr@2x.png)

![왼쪽에 흰색 더하기 기호가 있고 오른쪽에 흰색 버튼이 두 개 있는 게임 컨트롤러의 실루엣.](https://developer.apple.com/images/com.apple.HIG/kr/gamecontroller-fill-ltr@2x.png)

**복잡한 사용자 설정 인터페이스 아이콘을 단순히 뒤집기 전에 해당 아이콘의 개별 구성 요소와 전체적인 시각적 균형을 고려하십시오.** 일부 경우에서 배지, 슬래시, 돋보기와 같은 구성 요소는 현지화와 무관하게 시각 디자인 언어를 따라야 합니다. 예를 들어, SF Symbols는 LTR 버전과 RTL 버전 모두에서 동일한 백슬래시를 사용하여 기호의 의미에 대한 제한 또는 부정을 표현함으로써 시각적 일관성을 유지합니다.

![오른쪽을 향하는 스피커의 실루엣 위에 백슬래시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/speaker-slash-fill-ltr@2x.png)

![왼쪽을 향하는 스피커의 실루엣 위에 백슬래시가 있음.](https://developer.apple.com/images/com.apple.HIG/kr/speaker-slash-fill-rtl@2x.png)

다른 경우에는 아이콘의 현지화 버전이 여전히 의미를 전달할 수 있도록 구성 요소 또는 구성 요소의 위치를 뒤집어야 할 수 있습니다. 예를 들어, 배지가 앱에 표시되는 실제 UI를 나타내는 경우, UI를 뒤집을 때 배지도 뒤집어야 합니다. 반대로 배지가 인터페이스 아이콘의 의미를 변경한다면 배지를 뒤집으면 변경된 의미가 유지되는지 여부와 해당 아이콘의 전체적인 시각적 균형을 고려하십시오. 아래에 표시된 이미지에서 배지는 UI의 대상체를 나타내지 않지만 오른쪽 상단 모서리에 표시하면 카트의 시각적 균형이 무너집니다.

![오른쪽을 향하는 바퀴 달린 쇼핑 카트의 실루엣. 오른쪽 상단 모서리에 흰색 더하기 기호가 들어 있는 검은색 원반이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/cart-fill-badge-plus-ltr@2x.png)

![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

![왼쪽을 향하는 바퀴 달린 쇼핑 카트의 실루엣. 오른쪽 상단 모서리에 흰색 더하기 기호가 들어 있는 검은색 원반이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/cart-fill-badge-rtl-unbalanced@2x.png)

![원 안의 X 표시는 올바르지 않은 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/crossout@2x.png)

![왼쪽을 향하는 바퀴 달린 쇼핑 카트의 실루엣. 왼쪽 상단 모서리에 흰색 더하기 기호가 들어 있는 검은색 원반이 있음.](https://developer.apple.com/images/com.apple.HIG/kr/cart-fill-badge-plus-rtl@2x.png)

![원 안의 체크 표시는 올바른 예시임을 의미함.](https://developer.apple.com/images/com.apple.HIG/checkmark@2x.png)

사용자 설정 인터페이스 아이콘에 도구와 같이 손 쓰임을 나타낼 수 있는 구성 요소가 포함되어 있는 경우, 기본 이미지를 필요한 경우 뒤집어도 해당 도구의 방향은 유지하십시오.

![오른쪽 상단 모서리에 검은색 점을 포함한 모서리가 둥근 직사각형. 왼쪽 정렬되고 쌓여 있는 2개의 선을 포함한 돋보기의 윤곽은 직사각형 위와 점의 왼쪽에 있으며 약 135도 기울어져 있음.](https://developer.apple.com/images/com.apple.HIG/kr/mail-and-text-magnifyingglass-ltr@2x.png)

![왼쪽 상단 모서리에 검은색 점을 포함한 모서리가 둥근 직사각형. 오른쪽 정렬되고 쌓여 있는 2개의 선을 포함한 돋보기의 윤곽은 직사각형 위와 점의 오른쪽에 있으며 약 135도 기울어져 있음.](https://developer.apple.com/images/com.apple.HIG/kr/mail-and-text-magnifyingglass-rtl@2x.png)

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

## 리소스

#### 관련 콘텐츠

[레이아웃](https://developer.apple.com/kr/design/human-interface-guidelines/layout)

[포용성](https://developer.apple.com/kr/design/human-interface-guidelines/inclusion)

[SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)

#### Developer 문서

[Localization](https://developer.apple.com/localization/)

[Preparing views for localization](https://developer.apple.com/documentation/swiftui/preparing-views-for-localization) — SwiftUI

#### 비디오

- [앱의 다국어 경험 개선하기](https://developer.apple.com/kr/videos/play/wwdc2025/222) — 여러 언어를 사용하는 사람들에게 원활한 경험을 제공하세요. Language Discovery를 통해 사용자가 선호하는 언어로 앱을 최적화할 수 있는 방법을 확인할 수 있습니다. 양방향 텍스트에서 다중 범위를 선택하는 Natural Selection을 비롯하여 RTL 언어 지원의 최신 기술을 살펴보세요. 또한 앱에서 다국어 시나리오를 지원하는 모범 사례도 소개합니다.
- [아랍어를 위한 디자인](https://developer.apple.com/kr/videos/play/wwdc2022/10034) — 앱 또는 게임을 아랍어용으로 디자인하거나 최적화하는 방법을 알아보세요. 최초 출시를 계획 중이거나 기존 앱 또는 게임을 개선하려는 분들을 위해 아랍어 사용자를 위한 UI 디자인의 모범 사례와 팁을 알려드립니다. UI 구성 요소 및 아이콘을 통해 오른쪽에서 왼쪽으로 쓰는 레이아웃을 아름답게 만드는 방법을 배우고, 제품 디자인에서 아랍어 스크립트와 타이포그라피의 뉘앙스를 살펴보며, 아랍어 숫자를 알아볼 수 있습니다.
