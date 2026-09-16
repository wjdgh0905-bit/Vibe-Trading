# 아이콘

Source: https://developer.apple.com/kr/design/human-interface-guidelines/icons

> 효과적인 아이콘이란 사람들이 바로 이해할 수 있는 방식으로 하나의 개념을 표현하는 그래픽 애셋을 뜻합니다.

![Command 키 아이콘의 스케치. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 노란색을 은은하게 반영하는 노란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/foundations-icons-intro@2x.png)

앱과 게임은 여러 가지의 간단한 아이콘을 사용하여 사람들이 선택 가능한 항목, 동작 및 모드를 이해할 수 있도록 돕습니다. 앱의 특성을 나타내기 위해 음영, 텍스처, 하이라이트와 같은 풍부한 시각적 세부사항을 사용할 수 있는 [앱 아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/app-icons)과는 달리 *인터페이스 아이콘*은 보통 간소화된 모양과 색상으로 간단한 아이디어를 전달합니다.

인터페이스 아이콘(*글리프*라고도 함)을 디자인하거나, SF Symbols 앱에서 기호를 선택하고 이를 그대로 사용하거나 필요에 따라 사용자화할 수 있습니다. 인터페이스 아이콘과 기호 모두 검은색과 투명색을 사용하여 모양을 정의하며, 시스템은 각 이미지의 검은색 영역에 다른 색상을 적용할 수 있습니다. 지침을 보려면 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)의 내용을 참조하십시오.

## 모범 사례

**알아보기 쉬우며 매우 간소화된 디자인을 만드십시오.** 세부사항이 너무 많으면 인터페이스 아이콘을 이해하거나 읽기 어려울 수 있습니다. 대부분의 사람들이 빠르게 알아볼 수 있는 간단하고 일반적인 디자인을 사용하도록 하십시오. 일반적으로 아이콘은 아이콘이 실행하는 동작 또는 표시하는 콘텐츠와 직접적으로 연관되어 있으면서 친숙한 시각적 은유를 사용할 때 가장 잘 활용됩니다.

**앱의 모든 인터페이스 아이콘에서 시각적 일관성을 유지하십시오.** 사용자 설정 아이콘만 사용하거나 사용자 설정 아이콘과 시스템 제공 아이콘을 함께 사용하는 여부에 상관없이, 앱의 모든 인터페이스 아이콘은 일관된 크기, 세부 정보, 선 두께(또는 굵기) 및 시점을 사용해야 합니다. 아이콘의 시각적 무게감에 따라 해당 아이콘이 다른 아이콘과 시각적으로 일관성 있게 나타나도록 이 아이콘의 크기를 조절해야 할 수 있습니다.

![한 행에 네 개의 글리프가 있는 다이어그램. 글리프는 왼쪽부터 카메라, 하트, 봉투, 알람 시계임. 두 개의 수평 파선이 행의 하단과 상단을 표시하고, 한 개의 빨간색 수평선이 중간을 표시함. 네 개의 모든 글리프는 검은색이고 일부는 안에 흰색의 세부 선이 있음. 알람 시계의 시각적 무게감이 더 가벼워서 다른 글리프와 균형을 이루려면 더 높은 높이가 필요하기 때문에 알람 시계의 일부가 상단의 파선 위로 확장되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/custom-icon-sizes@2x.png)

![위에 표시된 것과 동일한 네 개의 글리프가 있고, 동일한 두 개의 수평 파선이 행의 하단과 상단에 있으며 한 개의 빨간색 수평선이 중간에 있는 다이어그램. 이 다이어그램에서 네 개의 모든 글리프는 회색이며, 모든 선이 동일한 굵기임을 강조하기 위해 안에 있는 세부 선이 검은색으로 되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/custom-icon-line-weights@2x.png)

**일반적으로 인터페이스 아이콘과 주변 텍스트의 굵기를 맞추십시오.** 아이콘 또는 텍스트 중 하나를 강조하려는 경우가 아니라면 모두에 동일한 굵기를 사용하여 콘텐츠가 일관된 모양과 강조 수준을 갖도록 할 수 있습니다.

**가능할 경우, 사용자 설정 인터페이스 아이콘에 패딩을 추가하여 시각적 정렬을 이루십시오.** 일부 아이콘, 특히 비대칭 아이콘의 경우 시각적이 아니라 기하하적으로 중앙에 맞추면 균형이 맞지 않아 보일 수 있습니다. 예를 들어, 아래에 표시된 다운로드 아이콘은 상단보다 하단에 더 많은 시각적으로 무게가 있어서 기하학적으로 중앙 정렬할 경우 너무 아래에 배치된 것처럼 보일 수 있습니다.

![검은색 원반 안에 흰색 화살표가 있고 그 아래의 흰색 수평 직선을 향하고 있는 이미지 두 개. 오른쪽의 이미지에는 수평으로 된 두 개의 분홍색 막대가 글리프 상단과 원반 상단 사이에 하나, 글리프 하단과 원반 하단 사이에 하나씩 있으며 글리프가 원반 안에서 기하학적으로 중앙 정렬되어 있음을 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/asymmetric-glyph@2x.png)

이러한 경우, 시각적으로 중앙 정렬될 때까지 아이콘의 위치를 살짝 조절할 수 있습니다. 조절한 값을 인터페이스 아이콘 주위에 패딩 형태로 포함하는 애셋을 생성하면(아래 오른쪽 그림처럼) 애셋을 기하학적으로 중앙 정렬하여 아이콘을 시각적으로 중앙 정렬할 수 있습니다.

![검은색 원반 안에 흰색 화살표가 있고 그 아래의 흰색 수평 직선을 향하고 있는 이미지 두 개. 왼쪽 이미지는 이전 일러스트와 동일한 위치에 두 개의 분홍색 수평 막대를 포함하고 있지만 글리프가 몇 픽셀 위로 이동되어 있음. 오른쪽 이미지에는 글리프 위로 오버레이된 분홍색 직사각형이 패딩 영역을 나타내고 있으며 글리프 아래에 픽셀이 추가로 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/asymmetric-glyph-optically-centered@2x.png)

시각적으로 중앙 정렬하기 위해 조절하는 값은 매우 작지만 앱의 모양에 큰 영향을 줄 수 있습니다.

![검은색 원반 안에 흰색 화살표가 있고 그 아래의 흰색 수평 직선을 향하고 있는 이미지 두 개. 왼쪽의 글리프는 기하학적으로 중앙 정렬되고 오른쪽의 글리프는 시각적으로 중앙 정렬됨.](https://developer.apple.com/images/com.apple.HIG/kr/asymmetric-glyph-before-and-after@2x.png)

**필요한 경우에만 인터페이스 아이콘의 선택 상태 버전을 제공하십시오.** 도구 막대, 탭 막대 및 버튼 등 표준 시스템 구성요소에 사용되는 아이콘의 경우 선택 및 미선택 모양을 제공할 필요는 없습니다. 시스템에서 선택 상태의 시각적 모양을 자동으로 업데이트합니다.

![배경을 공유하는 두 개의 도구 막대 버튼 이미지. 왼쪽 버튼은 선택 상태의 필터 아이콘을 표시하며, 배경에 파란색 색조 색상을 사용함. 오른쪽 버튼은 미선택 상태의 더 보기 아이콘을 표시하며, 도구 막대 버튼에 기본 모양을 사용함.](https://developer.apple.com/images/com.apple.HIG/kr/icons-selection-correct@2x.png)

**포용적인 이미지를 사용하십시오.** 아이콘이 모든 사람에게 이해하기 쉽고 친근하게 다가갈 수 있도록 고려하십시오. 가급적 성별 구분 없는 사람의 모습을 나타내고, 문화나 언어에 따라 인식하기 어려울 수 있는 이미지는 피하십시오. 지침을 보려면 [포용성](https://developer.apple.com/kr/design/human-interface-guidelines/inclusion)의 내용을 참조하십시오.

**의미를 전달하는 데 꼭 필요한 경우에만 디자인에 텍스트를 포함하십시오.** 예를 들어, 텍스트 포맷을 나타내는 인터페이스 아이콘에 문자를 사용하는 것은 개념을 전달하는 가장 직접적인 방법이 될 수 있습니다. 아이콘에 개별 문자를 표시해야 하는 경우, 해당 문자를 현지화해야 합니다. 텍스트 구절을 나타내야 하는 경우, 텍스트를 추상적으로 디자인하고, 오른쪽에서 왼쪽 방식일 때 사용할 반대 버전의 아이콘을 포함하십시오. 지침을 보려면 [오른쪽에서 왼쪽](https://developer.apple.com/kr/design/human-interface-guidelines/right-to-left)의 내용을 참조하십시오.

![문자 기호의 정보 패널이 표시된 SF Symbols 앱의 부분적인 스크린샷이 있으며, 대문자 A처럼 보임. 이미지 아래에는 다음과 같은 여덟 개의 현지화된 버전의 기호가 나열되어 있음. 라틴어, 아랍어, 히브리어, 힌디어, 일본어, 한국어, 태국어 및 중국어.](https://developer.apple.com/images/com.apple.HIG/kr/character-in-glyph@2x.png)

![SF Symbols 앱이 일부 표시된 스크린샷. 모서리가 둥근 직사각형 안에 왼쪽 정렬된 세 개의 수평 직선처럼 보이는 텍스트 도트 페이지 기호의 정보 패널이 표시됨. 이미지 아래에는 왼쪽에서 오른쪽 및 오른쪽에서 왼쪽의 현지화된 버전이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/abstract-text-in-glyph@2x.png)

**사용자 설정 인터페이스 아이콘을 생성하는 경우, PDF 또는 SVG와 같은 벡터 포맷을 사용하십시오.** 시스템은 벡터 기반 인터페이스 아이콘을 고해상도 디스플레이에 맞게 자동으로 크기 조절하므로 고해상도 버전의 아이콘을 따로 제공할 필요가 없습니다. 이와 반대로 음영, 텍스처, 하이라이트와 같은 효과를 포함하는 앱 아이콘과 기타 이미지에 사용되는 PNG의 경우, 크기 조절을 지원하지 않으므로 각 PNG 기반 인터페이스 아이콘별로 여러 버전을 제공해야 합니다. 또는 사용자 설정 SF Symbol을 생성하고, 주변의 텍스트와 어울리도록 기호를 강조하는 크기 조절 값을 지정할 수 있습니다. 지침을 보려면 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)의 내용을 참조하십시오.

**사용자 설정 인터페이스 아이콘에 대체 텍스트 레이블을 제공하십시오.** 대체 텍스트 레이블(또는 손쉬운 사용 설명)은 시각적으로 표시되지 않지만 이를 사용하면 VoiceOver가 화면의 내용을 소리 내어 설명해 시각 장애가 있는 사람들이 더 간편하게 탐색할 수 있게 해줍니다. 지침을 보려면 [VoiceOver](https://developer.apple.com/kr/design/human-interface-guidelines/voiceover)의 내용을 참조하십시오.

**Apple 하드웨어 제품의 모형을 사용하지 마십시오.** 하드웨어 디자인은 자주 변경되므로 인터페이스 아이콘과 기타 콘텐츠가 오래돼 보이게 만들 수 있습니다. Apple 하드웨어를 꼭 표시해야 하는 경우, 다양한 Apple 제품을 나타내는 [Apple Design Resources](https://developer.apple.com/design/resources/)의 이미지 또는 SF Symbols를 사용하십시오.

## 표준 아이콘

Apple 플랫폼 전반의 인터페이스에서 [메뉴](https://developer.apple.com/kr/design/human-interface-guidelines/menus), [도구 막대](https://developer.apple.com/kr/design/human-interface-guidelines/toolbars), [버튼](https://developer.apple.com/kr/design/human-interface-guidelines/buttons) 및 기타 위치에서 자주 쓰는 동작을 나타내는 아이콘의 경우, 이러한 [SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)를 사용할 수 있습니다.

### 편집

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 오려두기 | ![가위가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-cut@2x.png) | `scissors` |
| 복사하기 | ![두 개의 문서 복사본이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-copy@2x.png) | `document.on.document` |
| 붙여넣기 | ![클립보드 앞에 있는 문서가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-paste@2x.png) | `document.on.clipboard` |
| 완료 | ![체크표시가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-done-save@2x.png) | `checkmark ` |
| 저장 |  |  |
| 취소 | ![X가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-close-cancel@2x.png) | `xmark` |
| 닫기 |  |  |
| 삭제 | ![휴지통이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-delete@2x.png) | `trash` |
| 실행 취소 | ![왼쪽 상단으로 꺾인 화살표가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-undo@2x.png) | `arrow.uturn.backward` |
| 실행 복귀 | ![오른쪽 상단으로 꺾인 화살표가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-redo@2x.png) | `arrow.uturn.forward` |
| 작성 | ![정사각형 위에 있는 연필이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-compose@2x.png) | `square.and.pencil` |
| 복제 | ![다른 정사각형 위에 더하기 기호가 있는 정사각형이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-duplicate@2x.png) | `plus.square.on.square` |
| 이름 변경 | ![연필이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-rename@2x.png) | `pencil` |
| 다음으로 이동 | ![폴더가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-move-to-folder@2x.png) | `folder` |
| 폴더 |  |  |
| 첨부 | ![종이 클립이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-attach@2x.png) | `paperclip` |
| 추가 | ![더하기 기호가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-add@2x.png) | `plus` |
| 더 보기 | ![생략 부호가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-more@2x.png) | `ellipsis` |

### 선택

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 선택 | ![원 안에 체크표시가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-select-all@2x.png) | `checkmark.circle` |
| 선택 해제 | ![X가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-deselect-close@2x.png) | `xmark` |
| 닫기 |  |  |
| 삭제 | ![휴지통이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-delete@2x.png) | `trash` |

### 텍스트 포맷

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 위 첨자 | ![오른쪽 상단 모서리에 숫자 1이 있는 대문자 A가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-superscript@2x.png) | `textformat.superscript` |
| 아래 첨자 | ![오른쪽 하단 모서리에 숫자 1이 있는 대문자 A가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-subscript@2x.png) | `textformat.subscript` |
| 볼드체 | ![볼드체로 대문자 B가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-bold@2x.png) | `bold` |
| 이탤릭체 | ![이탤릭체로 대문자 I가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-italic@2x.png) | `italic` |
| 밑줄체 | ![밑줄체로 대문자 U가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-underline@2x.png) | `underline` |
| 왼쪽 정렬 | ![왼쪽 가장자리에 정렬된 상태에서 너비가 각각 다른 네 개의 수평선이 쌓여 있는 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-align-left@2x.png) | `text.alignleft` |
| 중앙 정렬 | ![중앙에 정렬된 상태에서 너비가 각각 다른 네 개의 수평선이 쌓여 있는 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-align-center@2x.png) | `text.aligncenter` |
| 좌우 정렬 | ![너비가 동일한 네 개의 수평선이 쌓여 있는 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-align-justified@2x.png) | `text.justify` |
| 오른쪽 정렬 | ![오른쪽 가장자리에 정렬된 상태에서 너비가 각각 다른 네 개의 수평선이 쌓여 있는 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-align-right@2x.png) | `text.alignright` |

### 검색

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 검색 | ![돋보기가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-search@2x.png) | `magnifyingglass` |
| 찾기 | ![문서 위에 돋보기가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-find@2x.png) | `text.page.badge.magnifyingglass` |
| 찾기 및 대치 |  |  |
| 다음 찾기 |  |  |
| 이전 찾기 |  |  |
| 선택 부분으로 찾기 |  |  |
| 필터 | ![상단에서 하단으로 갈수록 너비가 줄어드는 세 개의 수평선이 쌓여 있는 모습이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-filter@2x.png) | `line.3.horizontal.decrease` |

### 공유 및 내보내기

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 공유 | ![정사각형 중앙에서 위쪽을 가리키는 화살표가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-sharing@2x.png) | `square.and.arrow.up` |
| 내보내기 |  |  |
| 프린트 | ![프린터가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-print@2x.png) | `printer` |

### 사용자 및 계정

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 계정 | ![원형 윤곽선 안에 사람의 머리 및 어깨가 추상적으로 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-account-user@2x.png) | `person.crop.circle` |
| 사용자 |  |  |
| 프로필 |  |  |

### 평가

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 별로예요 | ![엄지 내림 제스처를 취하는 손이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-dislike@2x.png) | `hand.thumbsdown` |
| 좋아요 | ![엄지 올림 제스처를 취하는 손이 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-like@2x.png) | `hand.thumbsup` |

### 레이어 순서

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 맨 앞으로 가져오기 | ![서로 겹치는 세 개의 정사각형이 쌓여 있는 아이콘으로, 상단 정사각형은 단색 채우기 스타일을 사용하고 다른 정사각형은 윤곽으로 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-bring-to-front@2x.png) | `square.3.layers.3d.top.filled` |
| 맨 뒤로 보내기 | ![서로 겹치는 세 개의 정사각형이 쌓여 있는 아이콘으로, 하단 정사각형은 단색 채우기 스타일을 사용하고 다른 정사각형은 윤곽으로 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-send-to-back@2x.png) | `square.3.layers.3d.bottom.filled` |
| 앞으로 가져오기 | ![서로 겹치는 두 개의 정사각형이 쌓여 있는 아이콘으로, 상단 정사각형은 단색 채우기 스타일을 사용하고 다른 정사각형은 윤곽으로 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-bring-forward@2x.png) | `square.2.layers.3d.top.filled` |
| 뒤로 보내기 | ![서로 겹치는 두 개의 정사각형이 쌓여 있는 아이콘으로, 하단 정사각형은 단색 채우기 스타일을 사용하고 다른 정사각형은 윤곽으로 표시되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-send-backwards@2x.png) | `square.2.layers.3d.bottom.filled` |

### 기타

| 동작 | 아이콘 | 기호 이름 |
| --- | --- | --- |
| 알람 | ![알람 시계가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-alarm@2x.png) | `alarm` |
| 아카이브 | ![파일 박스가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-archive@2x.png) | `archivebox` |
| 캘린더 | ![캘린더가 표시된 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/icons-symbols-meaning-calendar@2x.png) | `calendar` |

## 플랫폼 고려 사항

*iOS, iPadOS, tvOS, visionOS 또는 watchOS에 대한 추가 고려 사항은 없습니다.*

### macOS

#### 문서 아이콘

macOS 앱이 사용자 설정 문서 유형을 사용할 수 있는 경우, 이를 나타내는 문서 아이콘을 생성할 수 있습니다. 흔히 볼 수 있는 문서 아이콘은 오른쪽 상단 모서리가 아래로 접혀 있는 종이 모양을 하고 있습니다. 이 독특한 모양을 통해 아이콘 크기가 작은 경우에도 문서를 앱 및 기타 콘텐츠와 구별할 수 있습니다.

지원하는 파일 유형에 대한 문서 아이콘을 제공하지 않는 경우, macOS는 앱 아이콘과 파일 확장자를 캔버스 위에 합성하여 아이콘을 대신 생성합니다. 예를 들어, 미리보기 앱은 시스템 생성 문서 아이콘을 사용하여 JPG 파일을 나타냅니다.

![JPG 파일에 대한 미리보기 앱의 문서 아이콘 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-generated@2x.png)

어떤 경우에는 앱에서 지원하는 다양한 파일 유형을 나타내기 위해 문서 아이콘 세트를 생성하는 것이 적합합니다. 예를 들어 Xcode는 프로젝트, AR 대상체, Swift 코드 파일을 구별할 수 있도록 사용자 설정 문서 아이콘을 사용합니다.

![Xcode 프로젝트 문서 아이콘의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-custom-1@2x.png)

![AR 대상체 문서 아이콘의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-custom-2@2x.png)

![Swift 파일 문서 아이콘의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-custom-3@2x.png)

사용자 설정 문서 아이콘을 생성하도록 배경 채우기, 중앙 이미지, 텍스트의 조합을 제공할 수 있습니다. 시스템은 필요에 따라 이러한 요소를 쌓고, 위치 지정하고, 마스킹하여 모서리가 접혀 있는 친숙한 아이콘 모양으로 합성합니다.

![분홍색 그리드 선과 가운데를 가로지르는 들쭉날쭉한 흰색 심전도 선이 있는 직사각형 캔버스. 분홍색 그리드는 하단 가장자리로 갈수록 색상이 옅어짐.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-parts-background-fill@2x.png)

![분홍색 단색으로 된 하트.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-parts-center-image@2x.png)

![모두 대문자로 된 HEART 단어.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-parts-text@2x.png)

![분홍색 그리드와 흰색 심전도 선 위에 분홍색 하트와 HEART 단어가 표시된 사용자 설정 문서 아이콘.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-parts@2x.png)

[Apple Design Resources](https://developer.apple.com/design/resources/#macos-apps)는 문서 아이콘의 사용자 설정 배경 채우기 및 중앙 이미지를 생성하는 데 사용할 수 있는 템플릿을 제공합니다. 이 템플릿을 사용할 때 아래의 지침을 따르십시오.

**문서 유형을 명백하게 나타내는 간단한 이미지를 디자인하십시오.** 배경 채우기 또는 중앙 이미지를 사용하거나 모두 사용하는지 여부와 상관없이 복잡하지 않은 모양과 뚜렷한 색상으로 구성된 제한된 팔레트를 가급적 사용하십시오. 문서 아이콘은 최소 16x16px 크기로 작게 표시될 수 있으므로 모든 크기에서 알아볼 수 있는 디자인을 생성하는 것이 좋습니다.

**배경 채우기에 하나의 표현적인 이미지를 디자인하면 문서 유형을 이해하고 알아볼 수 있습니다.** 예를 들어 Xcode와 텍스트 편집기는 모두 중앙 이미지를 포함하지 않는 풍부한 배경 이미지를 사용합니다.

![Xcode 프로젝트 문서 아이콘의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-custom-1@2x.png)

![텍스트 편집기의 풍부한 텍스트 문서 아이콘 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-fill-only@2x.png)

**작은 크기 버전의 문서 아이콘에서 복잡성을 줄이는 것을 고려하십시오.** 큰 크기 버전에서 뚜렷하게 보이는 아이콘 세부사항은 작은 크기 버전에서 흐릿하게 보이거나 알아보기 어려울 수 있습니다. 예를 들어, 중간 크기에서 사용자 설정된 하트 문서 아이콘의 그리드 선을 계속 뚜렷하게 표시하려면 줄어든 픽셀 그리드에 맞춰 더 적은 선을 사용하고 선을 두껍게 만드십시오. 16x16px 크기에서는 선을 완전히 제거할 수도 있습니다.

![하트 문서 아이콘의 픽셀 이미지. 그리드, 심전도 선, 하트 모양 및 HEART라는 단어가 보이지만 흐리게 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-fewer-details-1@2x.png)

![흐리게 표시된 하트 모양과 심전도 선만 보이는 하트 문서 아이콘의 픽셀 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-fewer-details-2@2x.png)

![흐리게 표시된 하트 모양만 보이는 하트 문서 아이콘의 픽셀 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-fewer-details-3@2x.png)

**배경 채우기의 오른쪽 상단 모서리에 중요한 콘텐츠를 배치하지 마십시오.** 시스템은 문서 아이콘 모양에 맞추기 위해 자동으로 이미지를 가리고 채우기의 상단에 접혀 있는 흰색 모서리를 그립니다. 아래 나열된 크기로 배경 이미지 세트를 생성하십시오.

- 512x512px @1x, 1024x1024px @2x
- 256x256px @1x, 512x512px @2x
- 128x128px @1x, 256x256px @2x
- 32x32px @1x, 64x64px @2x
- 16x16px @1x, 32x32px @2x

**친숙한 대상체가 문서의 유형 또는 앱과의 관계를 나타낼 수 있는 경우, 이를 묘사하는 중앙 이미지를 생성하는 것을 고려하십시오.** 모든 크기에서 뚜렷하게 표시되고 알아볼 수 있는 간단하고 분명한 이미지를 디자인하십시오. 중앙 이미지는 전체 문서 아이콘 캔버스의 절반 크기입니다. 예를 들어, 32x32px 문서 아이콘의 중앙 이미지를 생성하려면 16x16px 크기의 이미지 캔버스를 사용하십시오. 다음과 같은 크기로 중앙 이미지를 제공할 수 있습니다.

- 256x256px @1x, 512x512px @2x
- 128x128px @1x, 256x256px @2x
- 32x32px @1x, 64x64px @2x
- 16x16px @1x, 32x32px @2x

**이미지 캔버스의 약 10%에 해당하는 여백을 정의하고 이미지의 대부분을 여백의 경계 안쪽에 포함하십시오.** 시각적 정렬을 위해 이미지의 일부를 이 여백까지 확장할 수 있지만 이미지가 이미지 캔버스의 약 80%를 차지하는 것이 가장 좋습니다. 예를 들어, 256x256px 캔버스에서 대부분의 중앙 이미지는 205x205px 크기의 영역이 적합합니다.

![캔버스 너비의 10%에 해당하는 파란색 여백의 경계 안쪽에 있는 분홍색 단색 하트 모양의 다이어그램.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-parts-margins@2x.png)

**문서 유형을 파악하는 데 도움이 된다면 간결한 용어를 지정하십시오.** 기본적으로 시스템은 문서의 확장자를 문서 아이콘의 하단 가장자리에 표시하지만, 확장자가 친숙하지 않다면 더 자세히 설명하는 용어를 제공할 수 있습니다. 예를 들어, SceneKit 장면 파일의 문서 아이콘은 *scn*이라는 확장자 대신 *scene*이라는 용어를 사용합니다. 문서 아이콘에 맞게 시스템이 자동으로 확장자 텍스트의 크기를 조절하므로 작은 크기에서도 글자를 잘 알아볼 수 있도록 충분히 짧은 용어를 사용하십시오. 기본적으로 시스템은 텍스트의 모든 글자를 대문자로 만듭니다.

![SceneKit 장면 문서 아이콘의 이미지.](https://developer.apple.com/images/com.apple.HIG/kr/doc-icon-custom-extension@2x.png)

## 리소스

#### 관련 콘텐츠

[앱 아이콘](https://developer.apple.com/kr/design/human-interface-guidelines/app-icons)

[SF Symbols](https://developer.apple.com/kr/design/human-interface-guidelines/sf-symbols)

#### 비디오

- [글리프 디자인하기](https://developer.apple.com/kr/videos/play/wwdc2017/823) — 글리프는 강력한 커뮤니케이션 도구이자 앱 디자인 언어의 기본 요소입니다. 글리프를 개념화할 때 고려해야 할 주요 사항과 앱 내부 및 외부 공간에 효과적인 글리프 세트를 만들기 위한 주요 디자인 원칙을 알아보세요.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2025년 6월 9일 | 자주 쓰는 동작을 나타내는 SF Symbols 표가 추가됨. |
| 2023년 6월 21일 | visionOS 지침을 포함하기 위해 업데이트됨. |
