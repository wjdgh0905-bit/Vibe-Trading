# 지도

Source: https://developer.apple.com/kr/design/human-interface-guidelines/maps

> 지도는 앱 또는 웹사이트에 실외 또는 실내 지리적 데이터를 표시합니다.

![세 번 접힌 지도의 스케치가 탐색을 나타냄. 이미지에 직사각형 및 원형 그리드 선이 겹쳐져 있고, 여섯 가지 색상으로 된 기존 Apple 로고의 파란색을 은은하게 반영하는 파란색 색조가 적용됨.](https://developer.apple.com/images/com.apple.HIG/technologies-maps-intro@2x.png)

지도는 확대/축소, 패닝 및 회전 등 시스템 제공 지도 앱과 동일한 많은 기능을 지원하는 친숙한 인터페이스를 사용합니다. 또한 지도에는 주석 및 오버레이가 포함되고 경로 찾기 정보가 표시될 수 있으며, 표준 그래픽 보기, 위성 이미지 기반 보기 또는 둘 다 가능한 하이브리드 보기를 사용하도록 구성할 수 있습니다.

## 모범 사례

**일반적으로 지도를 상호작용할 수 있도록 만드십시오.** 사람들은 친숙한 방식으로 지도를 확대/축소하고, 패닝하고, 상호작용할 수 있기를 기대합니다. 지도를 가리는 비상호작용 요소는 지도가 동작하는 방식에 대한 사람들의 기대를 방해할 수 있습니다.

**앱의 필요에 따라 지도 강조 스타일을 선택하십시오.** 선택할 수 있는 두 가지 강조 스타일이 있습니다.

- *기본(default)* 스타일은 완전히 진한 색상의 지도 버전을 표시하며, 사용자 설정 요소가 많이 없는 대부분의 표준 지도 응용 프로그램에 적합한 옵션입니다. 이 스타일은 또한 사람들이 지도와 지도 앱 간에 전환할 수 있는 상황에서 시각적 정렬을 유지하는 데 유용합니다.
- 이와 반대로, *채도가 낮은(muted)* 스타일은 연한 색상의 지도 버전을 표시합니다. 이 스타일은 정보가 풍부한 콘텐츠가 많고 지도에 눈에 띄게 만들려는 경우에 좋습니다.

![기본 강조 스타일로 코이트 타워가 표시된 iPhone의 지도 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/maps-default-appearance@2x.png)

![연한 색상으로 코이트 타워를 표현하여 채도가 낮은 스타일이 표시된 iPhone의 지도 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/maps-muted-appearance@2x.png)

개발자 지침을 보려면 [MKStandardMapConfiguration.EmphasisStyle](https://developer.apple.com/documentation/mapkit/mkstandardmapconfiguration/emphasisstyle-swift.enum)의 내용을 참조하십시오.

**사람들이 지도에서 장소를 찾을 수 있도록 도와주십시오.** 카테고리별로 위치를 필터링하는 방법과 결합된 검색 기능을 제공하는 것을 고려하십시오. 예를 들어, 쇼핑몰 지도의 검색 필드에는 의류, 가정용품, 전자 제품, 보석류 및 장난감과 같은 일반적인 상점 유형을 쉽게 찾을 수 있는 필터가 포함될 수 있습니다.

**사람들이 선택하는 요소를 명확하게 식별하십시오.** 누군가가 지도에서 특정 영역이나 다른 요소를 선택하면 윤곽 및 색상 변형과 같은 구별된 스타일을 사용하여 선택 항목에 집중하도록 만드십시오.

**지도의 가독성을 향상하기 위해 겹치는 관심 지점을 클러스터로 설정하십시오.** *클러스터*는 근접한 곳에서 여러 관심 지점을 나타내기 위해 단일 핀을 사용합니다. 사람들이 지도를 확대/축소하면 클러스터가 확장되어 개별 관심 지점이 점진적으로 표시됩니다.

![근접한 세 개의 관심 지점을 나타내는 하나의 핀이 숫자 3과 함께 표시된 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/maps-points-of-interest-cluster@2x.png)

![확대된 상태에서 세 개의 주황색 핀이 세 개의 관심 지점을 나타내는 스크린샷.](https://developer.apple.com/images/com.apple.HIG/kr/maps-points-of-interest-individual@2x.png)

**사람들이 Apple 로고 및 법적 링크를 볼 수 있도록 도와주십시오.** 인터페이스의 일부가 일시적으로 로고 및 링크를 가리는 것은 괜찮지만, 해당 요소를 항상 가리지는 마십시오. 다음 지침을 따라 Apple 로고 및 법적 링크가 계속 표시되도록 하십시오.

- 적절한 패딩을 사용하여 지도 경계와 사용자 설정 제어기에서 로고 및 링크를 분리하십시오. 예를 들어, 요소의 측면에 7포인트의 패딩을 사용하고 그 위와 아래에 10포인트의 패딩을 사용하는 것이 좋습니다.
- 로고 및 링크가 인터페이스와 함께 움직이지 않도록 하십시오. Apple 로고 및 법적 링크가 지도에 고정된 것처럼 나타날 때 가장 좋습니다.
- 사용자 설정 인터페이스가 지도를 기준으로 이동할 수 있는 경우, 사용자 설정 요소의 가장 낮은 위치를 사용하여 로고 및 링크의 배치를 결정하십시오. 예를 들어, 앱에서 사람들이 사용자 설정 카드를 화면 하단에서 위로 끌어올릴 수 있는 경우, Apple 로고 및 법적 링크를 카드의 가장 낮은 위치에서 10포인트 위에 배치하십시오.

> **참고:** Apple 로고 및 법적 링크는 200x100픽셀보다 작은 지도에 표시되지 않습니다.

## 사용자 설정 정보

**앱의 시각적 스타일과 일치하는 주석을 사용하십시오.** 주석은 지도에서 사용자 설정 관심 지점을 식별합니다. 기본 주석 마커에는 빨간색 색조 및 흰색 핀 아이콘이 있습니다. 앱의 색상 체계와 일치하도록 색조를 변경할 수 있습니다. 아이콘을 문자열이나 로고와 같은 이미지로 변경할 수도 있습니다. 아이콘 문자열은 유니코드 문자를 비롯해 모든 문자를 포함할 수 있지만, 가독성을 위해 길이를 2~3자로 유지하십시오. 개발자 지침을 보려면 [MKAnnotationView](https://developer.apple.com/documentation/mapkit/mkannotationview)의 내용을 참조하십시오.

**표준 지도 기능과 관련된 사용자 설정 정보를 표시하려는 경우, 개별적으로 선택 가능하도록 만드는 것을 고려하십시오.** 선택 가능한 지도 기능을 지원하는 경우, 시스템은 Apple 제공 기능(관심 지점, 지역 및 물리적 기능 등)을 추가되는 다른 주석과 개별적으로 처리합니다. 사람들이 해당 기능을 선택하면 이러한 특성을 나타내도록 사용자 설정 모양 및 메시지를 구성할 수 있습니다. 개발자 지침을 보려면 [MKMapFeatureOptions](https://developer.apple.com/documentation/mapkit/mkmapfeatureoptions)의 내용을 참조하십시오.

**오버레이를 사용하여 콘텐츠와 특정 관계가 있는 지도 영역을 정의하십시오.**

- 기본 레벨인 *도로 위*는 도로 위에 오버레이를 배치하지만 건물, 나무 및 기타 요소 아래에 있습니다. 이는 사람들이 오버레이 아래에 무엇이 있는지 파악하면서도 정의된 공간임을 명확하게 이해할 수 있도록 하는 경우에 적합합니다.
- *레이블 위*는 도로 및 레이블 모두 위에 오버레이를 배치하여 그 아래의 모든 것을 가립니다. 이는 지도의 기능에서 콘텐츠를 완전히 추출하려는 경우 또는 지도에서 관련 없는 영역을 가리려는 경우에 유용합니다.

개발자 지침을 보려면 [Displaying overlays on a map](https://developer.apple.com/documentation/mapkit/displaying-overlays-on-a-map) 및 [MKOverlayLevel](https://developer.apple.com/documentation/mapkit/mkoverlaylevel)의 내용을 참조하십시오.

**사용자 설정 제어기와 지도 사이에 충분한 대비가 있는지 확인하십시오.** 대비가 충분하지 않으면 제어기를 보기 어렵게 만들고 제어기가 지도와 혼합될 수 있습니다. 사용자 설정 제어기를 눈에 띄게 만들도록 얇은 선 또는 가벼운 드롭 그림자를 사용하거나, 지도 영역에 혼합 모드를 적용하여 상단의 제어기와의 대비를 높이는 것을 고려하십시오.

## 장소 카드

장소 카드는 앱 또는 웹사이트에서 운영 시간, 전화번호, 주소 등 자세한 장소 정보를 표시합니다. 이를 통해 지정된 장소에 관한 구조화된 최신 정보를 제공하고, 더 상세하게 검색 결과를 제공할 수 있습니다.

### 지도에서 장소 카드 표시하기

언제든지 사람들이 장소를 선택할 때 지도에 바로 나타나는 장소 카드를 표시할 수 있습니다. 이는 지정된 여러 장소에 대한 장소 정보를 지도에 표시하는 좋은 방법입니다. 예를 들어, 어떤 작가가 저자 서명회를 진행하는 경우 이에 관한 서점 지도를 표시할 수 있습니다. 개발자 지침을 보려면 [mapItemDetailSelectionAccessory(_:)](https://developer.apple.com/documentation/mapkit/mapcontent/mapitemdetailselectionaccessory(_:)), [mapView(_:selectionAccessoryFor:)](https://developer.apple.com/documentation/mapkit/mkmapviewdelegate/mapview(_:selectionaccessoryfor:)) 및 [selectionAccessory](https://developer.apple.com/documentation/mapkitjs/annotation/selectionaccessory)의 내용을 참조하십시오.

또한 관심 지점, 지역, 물리적인 형체 등 지도의 다른 장소에 대한 장소 카드를 표시하여 근처 장소와 관련된 중요 정보를 사람들에게 제공할 수도 있습니다. 개발자 지침을 보려면 [mapFeatureSelectionAccessory(_:)](https://developer.apple.com/documentation/swiftui/view/mapfeatureselectionaccessory(_:)), [mapView(_:selectionAccessoryFor:)](https://developer.apple.com/documentation/mapkit/mkmapviewdelegate/mapview(_:selectionaccessoryfor:)) 및 [selectableMapFeatureSelectionAccessory](https://developer.apple.com/documentation/mapkitjs/map/selectablemapfeatureselectionaccessory)의 내용을 참조하십시오.

> **개발자 참고 사항:** 지정된 단일 장소에 대한 장소 카드를 기본적으로 표시하는 사용자 설정 지도를 웹사이트에 포함할 수 있습니다. 개발자 지침을 보려면 [Displaying place information using the Maps Embed API](https://developer.apple.com/documentation/mapkitjs/displaying-place-information-using-the-maps-embed-api)의 내용을 참조하십시오.

시스템은 여러 가지 장소 카드 스타일을 정의하며, 이를 통해 크기, 모양 및 장소 카드에 포함되는 정보가 지정됩니다.

- *자동(automatic)* 스타일은 지도 보기의 크기를 기반으로 시스템이 장소 카드 스타일을 결정하도록 합니다.
- *콜아웃(callout)* 스타일은 장소 카드를 선택된 장소 옆에 팝오버 스타일로 표시합니다. 콜아웃 스타일을 더 세부적으로 선택할 수 있습니다. *전체(full)* 콜아웃 스타일은 크고 자세한 장소 카드를 표시하며, *축소(compact)* 콜아웃 스타일은 공간을 절약하고 더 간결한 장소 카드를 표시합니다. 콜아웃 스타일을 지정하지 않으면 시스템은 기본적으로 *자동(automatic)* 콜아웃 스타일을 사용하며 지도의 보기 크기를 기반으로 콜아웃 스타일이 결정됩니다.
- *캡션(caption)* 스타일은 ‘Apple 지도에서 열기’ 링크를 표시합니다.
- *시트(sheet)* 스타일은 장소 카드를 [시트](https://developer.apple.com/kr/design/human-interface-guidelines/sheets)로 표시합니다.

개발자 지침을 보려면 [MapItemDetailSelectionAccessoryStyle](https://developer.apple.com/documentation/mapkit/mapitemdetailselectionaccessorystyle), [MKSelectionAccessory.MapItemDetailPresentationStyle](https://developer.apple.com/documentation/mapkit/mkselectionaccessory/mapitemdetailpresentationstyle) 및 [PlaceSelectionAccessoryStyle](https://developer.apple.com/documentation/mapkitjs/placeselectionaccessorystyle)의 내용을 참조하십시오.

**전체 콜아웃**

![iPad의 지도에서 전체 콜아웃 스타일 장소 카드가 표시된 스크린샷. 장소 카드 상단에는 머리말 이미지 및 장소 이름, 카테고리, 평가가 포함되어 있음. 또한 장소 카드에 운영 시간이 있는 타일, 웹사이트, 전화번호, 주소가 있는 타일, ‘Apple 지도에서 열기’ 링크가 있는 타일이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/maps-place-card-ipad-full@2x.png)

**축소 콜아웃**

![iPad의 지도에서 축소 콜아웃 스타일 장소 카드가 표시된 스크린샷. 장소 카드에 장소 이름, 카테고리, 짧은 주소, 평가, ‘Apple 지도에서 열기’ 링크가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/maps-place-card-ipad-compact@2x.png)

**캡션**

![iPad의 지도에서 캡션 스타일 장소 카드가 표시된 스크린샷. 장소 카드에 ‘Apple 지도에서 열기’ 링크가 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/maps-place-card-ipad-link@2x.png)

**시트**

![iPad의 지도에서 시트 스타일 장소 카드가 지도 보기 위에 표시된 스크린샷. 장소 카드 상단에는 머리말 이미지 및 장소 이름, 카테고리, 평가가 포함되어 있음. 또한 장소 카드에 운영 시간이 있는 타일, 웹사이트, 전화번호, 주소가 있는 타일, ‘Apple 지도에서 열기’ 링크가 있는 타일이 포함되어 있음.](https://developer.apple.com/images/com.apple.HIG/kr/maps-place-card-ipad-sheet@2x.png)

전체 콜아웃 스타일 장소 카드는 개인의 기기에 따라 다르게 나타납니다. 시스템은 전체 콜아웃 스타일 장소 카드를 iPadOS 및 macOS에서는 팝오버 스타일로, iOS에서는 [시트](https://developer.apple.com/kr/design/human-interface-guidelines/sheets)로 표시합니다.

![iPhone의 지도에서 전체 콜아웃 스타일 장소 카드가 표시된 스크린샷. 기기의 하단 가장자리에서 장소 카드가 시트로 나타남.](https://developer.apple.com/images/com.apple.HIG/kr/maps-place-card-iphone-full@2x.png)

**스타일을 선택할 때 지도의 표시 방법을 고려하십시오.** 전체 콜아웃 스타일 장소 카드는 장소에 관한 최대한의 정보를 지도에 바로 표시하여 가장 풍부한 경험을 제공합니다. 하지만 지도의 맥락에 맞는 장소 카드 스타일을 선택하는 것이 중요합니다. 예를 들어 앱에서 여러 주석이 있는 작은 지도를 표시하는 경우, 축소 콜아웃 스타일로 공간을 절약하여 표시하는 것을 고려하십시오. 이렇게 하면 지도에 지정된 다른 장소의 설명을 유지하면서 장소 정보를 표시할 수 있습니다.

**장소 카드가 다양한 기기 및 윈도우 크기에서 잘 표시되도록 하십시오.** 스타일을 지정하는 경우, 장소 카드의 콘텐츠가 다양한 기기 및 윈도우 크기에서 잘 표시되도록 해야 합니다. 전체 콜아웃 스타일 장소 카드의 경우, 최소 너비를 설정하여 작은 기기에서 텍스트가 초과되지 않도록 할 수 있습니다.

**정보가 중복되지 않도록 하십시오.** 장소 카드 스타일을 선택할 때 앱 또는 웹사이트에 어떤 정보가 이미 표시되어 있는지 참조하십시오. 예를 들어, 앱에 이미 표시된 정보가 전체 콜아웃 스타일 장소 카드에 나타날 수 있습니다. 이 경우, 축소 콜아웃 또는 캡션 스타일이 더 적합할 수 있습니다.

**장소 카드를 표시할 때 지도의 위치가 계속 보이도록 하십시오.** 이렇게 하면 사람들이 자세한 장소 정보를 확인하면서 해당 위치가 지도의 어디에 있는지 계속 알 수 있습니다. 장소 카드에 오프셋 거리를 설정하고 선택한 위치를 향하도록 할 수 있습니다. 개발자 지침을 보려면 [offset(_:)](https://developer.apple.com/documentation/swiftui/view/offset(_:)), [accessoryOffset](https://developer.apple.com/documentation/mapkit/mkannotationview/accessoryoffset) 및 [selectionAccessoryOffset](https://developer.apple.com/documentation/mapkitjs/annotation/selectionaccessoryoffset)의 내용을 참조하십시오.

### 지도 밖에 장소 카드 추가하기

앱 또는 웹사이트에서 지도 밖에 장소 정보를 표시할 수도 있습니다. 예를 들어, 검색 결과 또는 매장 검색기 등과 같이 지도 대신 장소 목록을 표시하고, 항목이 선택되면 장소 카드를 표시하고 싶을 수 있습니다. 개발자 지침을 보려면 [mapItemDetailSelectionAccessory(_:)](https://developer.apple.com/documentation/mapkit/mapcontent/mapitemdetailselectionaccessory(_:)), [mapItemDetail(_:)](https://developer.apple.com/documentation/mapkit/mkselectionaccessory/mapitemdetail(_:)) 및 [PlaceDetail](https://developer.apple.com/documentation/mapkitjs/placedetail)의 내용을 참조하십시오.

> **중요:** 장소 카드를 지도 보기에서 바로 표시하지 않는 경우, 장소 카드에 지도를 포함해야 합니다. 개발자 지침을 보려면 [mapItemDetailSheet(item:displaysMap:)](https://developer.apple.com/documentation/swiftui/view/mapitemdetailsheet(item:displaysmap:)) 및 [init(mapItem:displaysMap:)](https://developer.apple.com/documentation/mapkit/mkmapitemdetailviewcontroller/init(mapitem:displaysmap:))의 내용을 참조하십시오.

**주변 콘텐츠에 위치 관련 신호를 사용하여 장소 카드를 여는 것이 가능하다는 사실을 나타내십시오.** 예를 들어, 자세한 정보를 확인하는 버튼 옆에 장소 이름 및 주소를 표시하여 이를 통해 장소 정보를 확인할 수 있음을 나타내십시오. 공간을 효율적으로 사용해야 하는 디자인의 경우, 장소 이름이 있는 지도 핀 아이콘을 포함하여 장소 카드를 열 수 있다는 것을 나타낼 수 있습니다.

## 실내 지도

쇼핑몰 및 경기장과 같은 특정 장소와 연결된 앱에서는 사람들이 실내 관심 지점을 찾고 탐색하는 데 도움이 되는 사용자 설정 상호작용 지도를 디자인할 수 있습니다. 실내 지도에는 방, 키오스크 및 기타 위치와 같은 특정 영역을 하이라이트하는 오버레이가 포함될 수 있습니다. 여기에는 또한 텍스트 레이블, 아이콘 및 경로가 포함될 수 있습니다.

**예시 1**

![iPhone의 지도 스크린샷으로, 새너제이 국제 공항 및 주변 지역을 표시함. 화면 하반부의 카드에는 공항 이름을 비롯하여 카드 공유 및 닫기, 공항으로 이동, 공항에 전화, 공항 웹사이트 방문 등의 작업을 수행하는 버튼을 포함하여 정보 및 옵션이 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/indoor-maps-example1@2x.png)

**예시 2**

![iPhone의 지도 스크린샷으로, 새너제이 국제 공항의 터미널 B를 표시함. 게이트 번호가 지도의 터미널 위에 표시됨. 공항에 대한 정보 및 옵션이 포함된 최소화된 카드가 화면 하단에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/indoor-maps-example2@2x.png)

**예시 3**

![iPhone의 지도 스크린샷으로, 새너제이 국제 공항의 터미널 클로즈업 보기를 표시함. 보안 검문소, 응급 처치소, 화장실, 에스컬레이터 및 게이트 번호가 지도에 표시됨. 검색 필드 및 SJC 둘러보기 버튼이 포함된 최소화된 카드가 화면 하단에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/indoor-maps-example3@2x.png)

**확대/축소 레벨에 따라 지도 세부사항을 조절하십시오.** 세부사항이 너무 많으면 지도가 복잡하게 보일 수 있습니다. 모든 확대/축소 레벨에서 방 및 건물과 같은 넓은 영역을 표시하십시오. 그런 다음, 지도를 확대하면서 더 자세한 기능 및 레이블을 점진적으로 추가하십시오. 공항 지도를 축소하면 터미널 및 게이트만 표시될 수 있지만, 이를 확대하면 개별 상점 및 화장실을 표시할 수 있습니다.

![iPhone의 지도 스크린샷으로, 새너제이 국제 공항에서 엘리베이터의 위치를 표시하기 위해 확대됨. 엘리베이터에 대한 정보가 포함된 최소화된 카드가 화면 하단에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/indoor-maps-elevator@2x.png)

**지도의 기능을 구분하기 위해 구별된 스타일을 사용하십시오.** 아이콘과 함께 색상을 사용하면 다양한 유형의 영역, 상점 및 서비스를 구별하며, 사람들이 찾고 있는 내용을 쉽고 빠르게 찾을 수 있습니다.

**장소가 여러 층으로 구성되는 경우 층수 선택기를 제공하십시오.** 층수 선택기를 사용하면 사람들이 층 사이를 빠르게 이동할 수 있습니다. 이 기능을 구현하는 경우 간결성을 위해 층 번호를 간결하게 유지하십시오. 대부분의 경우, 층 이름이 아닌 층 번호 목록이면 충분합니다.

**맥락을 제공하기 위해 주변 지역을 포함하십시오.** 인접한 거리, 놀이터 및 기타 근처 위치는 모두 사람들이 지도를 사용할 때 자신의 위치를 파악하는 데 도움이 될 수 있습니다. 이러한 영역들이 비상호작용 요소인 경우, 해당 영역을 어둡게 표시하거나 구별된 색상을 사용하여 추가 정보로 표시되도록 하십시오.

![iPhone의 지도 스크린샷으로, 새너제이 국제 공항의 터미널에서 일부 게이트의 숫자 및 위치를 표시하기 위해 확대됨. 주차장을 포함하여 다른 영역은 세부사항 없이 표시됨. 검색 필드 및 SJC 둘러보기 버튼이 포함된 최소화된 카드가 화면 하단에 표시됨.](https://developer.apple.com/images/com.apple.HIG/kr/indoor-maps-surroundings@2x.png)

**장소와 근처 대중교통 사이에 탐색을 지원하는 것을 고려하십시오.** 근처 버스 정류장, 기차역, 주차장, 차고 및 기타 대중교통을 오가는 경로를 제공하여 장소에 쉽게 드나들 수 있도록 하십시오. 또한 사람들이 추가 탐색 옵션을 사용하기 위해 Apple 지도로 빠르게 전환할 수 있는 방법을 제공할 수도 있습니다.

**장소 바깥에서는 스크롤을 제한하십시오.** 이는 사람들이 지도에서 너무 많이 쓸어넘길 때 길을 잃는 것을 방지하는 데 도움이 될 수 있습니다. 가능하다면, 항상 실내 지도의 일부라도 화면상에 표시하십시오. 사람들이 위치를 파악할 수 있도록 확대/축소 레벨에 따라 허용되는 스크롤의 양을 조절해야 할 수 있습니다.

**앱이 확장하는 것처럼 자연스럽게 느껴지도록 실내 지도를 디자인하십시오.** Apple 지도의 모양을 복제하려고 하지 마십시오. 그 대신, 영역 오버레이, 아이콘 및 텍스트가 앱의 시각적 스타일과 일치하는지 확인하십시오. 지침을 보려면 [Indoor Mapping Data Format](https://register.apple.com/resources/imdf/)의 내용을 참조하십시오.

![iPhone 앱의 사용자 설정 지도 스크린샷으로, 공항 중앙 홀을 표시함. 지도의 요소에는 앱의 UI에 맞게 초록색 색조가 적용되어 있고, 사용자 설정 아이콘은 게이트, 보안 검문소 및 안내소를 나타냄.](https://developer.apple.com/images/com.apple.HIG/kr/indoor-maps-custom-map-design@2x.png)

## 플랫폼 고려 사항

*iOS, iPadOS, macOS, tvOS 또는 visionOS에 대한 추가 고려 사항은 없습니다.*

### watchOS

Apple Watch에서 지도는 지리적 위치의 정적 스냅샷입니다. 디자인 시점에 인터페이스에 지도를 배치하고 런타임 시 적절한 지역을 표시하십시오. 표시된 지역은 상호작용 요소가 아니며, 이를 탭하면 Apple Watch에서 지도 앱이 열립니다. 관심 지점이나 기타 관련 정보를 하이라이트하기 위해 지도에 최대 다섯 개의 주석을 달 수 있습니다. 개발자 지침을 보려면 [WKInterfaceMap](https://developer.apple.com/documentation/watchkit/wkinterfacemap)의 내용을 참조하십시오.

![Apple Watch의 지도 스크린샷으로, Apple Park 및 일부 주변 지역을 표시함.](https://developer.apple.com/images/com.apple.HIG/kr/maps-watch1@2x.png)

**지도 인터페이스 요소를 화면에 맞추십시오.** 전체 요소는 스크롤할 필요 없이 Apple Watch 디스플레이에 표시되어야 합니다.

**관심 지점을 포함하는 가장 작은 지역을 표시하십시오.** 지도 인터페이스 요소 내의 콘텐츠는 스크롤되지 않으므로 모든 주요 콘텐츠는 표시된 지역 내에서 보여야 합니다.

개발자 지침을 보려면 [WKInterfaceMap](https://developer.apple.com/documentation/watchkit/wkinterfacemap)의 내용을 참조하십시오.

## 리소스

#### Developer 문서

[MapKit](https://developer.apple.com/documentation/mapkit)

[MapKit JS](https://developer.apple.com/documentation/mapkitjs)

[Indoor Mapping Data Format](https://register.apple.com/resources/imdf/)

#### 비디오

- [MapKit에 고급 기능 추가하기](https://developer.apple.com/kr/videos/play/wwdc2025/204) — MapKit 및 MapKit JS의 최신 업데이트를 확인하세요. 새로운 유형의 방향인 순환 방식을 소개하고 웹에서 3D Look Around 이미지를 설정하는 방법을 보여드립니다. 새로운 Geocoding API가 좌표 및 주소 변환 기능을 지원하는 방법과 Address Representations API를 사용하여 한 지역에서 가장 적절한 주소를 찾는 방법을 학습하세요. 그런 다음 앱이 앱 인텐트와 원활하게 작동하도록 보장하는 새로운 장소 참조 방법을 소개하며 마무리하겠습니다.
- [MapKit으로 장소 정보를 효과적으로 활용하기](https://developer.apple.com/kr/videos/play/wwdc2024/10097) — MapKit 및 MapKit JS로 지도를 앱과 웹사이트에 통합하는 새롭고 효과적인 방법을 확인해 보세요.  Place ID를 사용하여 특정 장소를 저장하고 참조할 수 있습니다. 관련성 높은 장소를 더욱 효율적으로 찾을 수 있도록 해주는 향상된 검색 기능에 대해서도 알아보세요.  새로운 Place Card API를 사용하면 고객이 앱에서 바로 목적지를 살펴볼 수 있도록 자세한 장소 정보를 표시할 수 있습니다. 또한 Apple의 간소화된 토큰 권한 설정과 Web Embed API로 웹사이트에 지도를 임베드하는 간단한 방법을 소개합니다.

## 변경 기록

| 날짜 | 변경 사항 |
| --- | --- |
| 2024년 12월 18일 | 장소 카드에 대한 지침이 추가되고 추가 아트워크가 포함됨. |
| 2023년 9월 12일 | 아트워크가 추가됨. |
| 2022년 9월 23일 | 사용자 설정 정보를 표시하기 위한 지침이 추가되고, 모범 사례가 수정되고, 지침이 한 페이지로 통합됨. |
