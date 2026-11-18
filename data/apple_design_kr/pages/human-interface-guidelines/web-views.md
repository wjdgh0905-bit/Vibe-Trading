# 웹 뷰

Source: https://developer.apple.com/kr/design/human-interface-guidelines/web-views

> 웹 뷰는 내장 HTML 및 웹사이트와 같은 풍부한 웹 콘텐츠를 앱에 직접 로드하고 표시합니다.

![스타일화된 나침반 아이콘 모양이 표시되어 있음. 여섯 가지 색상으로 된 기존 Apple 로고의 빨간색을 은은하게 반영하는 빨간색 색조가 이미지에 적용됨.](https://developer.apple.com/images/com.apple.HIG/components-web-view-intro@2x.png)

예를 들어, Mail은 웹 뷰를 사용하여 메시지의 HTML 콘텐츠를 표시합니다.

## 모범 사례

**적합할 경우, 이전 및 다음 페이지 탐색을 지원하십시오.** 웹 뷰는 이전 및 다음 페이지 탐색을 지원하지만, 이 동작은 기본적으로 사용되지 않습니다. 사람들이 웹 뷰를 사용하여 여러 페이지에 방문할 가능성이 있는 경우, 이전 및 다음 페이지 탐색을 허용하고 이 기능을 실행할 해당 제어기를 제공하십시오.

**웹 뷰를 사용하여 웹 브라우저를 빌드하지 마십시오.** 웹 뷰를 사용하여 사람들이 앱의 맥락을 벗어나지 않고 웹사이트에 잠시 접근하도록 하는 것은 좋지만, 사람들이 웹을 브라우징하는 기본적인 방식은 Safari입니다. 앱에서 Safari의 기능을 복제하려는 시도는 불필요하며 권장되지 않습니다.

## 플랫폼 고려 사항

*iOS, iPadOS, macOS 또는 visionOS에 대한 추가 고려 사항은 없습니다. tvOS 또는 watchOS에서는 지원되지 않습니다.*

## 리소스

#### 관련 콘텐츠

[Webkit.org](https://webkit.org/)

#### Developer 문서

[WKWebView](https://developer.apple.com/documentation/webkit/wkwebview) — WebKit

#### 비디오

- [WKWebView에 추가된 사항 살펴보기](https://developer.apple.com/kr/videos/play/wwdc2021/10032) — WKWebView의 최신 업데이트를 살펴봅니다. API를 사용하여 JavaScript 없이 웹 콘텐츠를 조작하는 방법, WebRTC 및 다운로드에 도움이 되는 위임을 살펴보고 앱 내에서 풍부한 웹 경험을 쉽게 만드는 방법을 알려 드립니다.
