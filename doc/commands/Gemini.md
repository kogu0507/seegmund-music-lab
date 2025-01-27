以下の index.html から /lang/en/index.json を作成してください。テンプレートは以下の通りです。

index.html:
```html
<!DOCTYPE html>
<html lang="ja" data-i18n-page="index">
<head>...</head>
<body>
    <h1 data-i18n="intro_title">音楽受験生のための学習ツール</h1>
    <p data-i18n="intro_description_1">Seegmund music labは、音楽受験生や音楽学習者に向けた学習コンテンツを提供しています。</p>
    <footer data-i18n="footer_copyright">© 2024 Seegmund music lab</footer>
    <script type="module" src="/static/js/base.js"></script>
</body>
</html>
```

/lang/en/index.json のテンプレート:
```json
{
    "intro_title": "",
    "intro_description_1": "",
    "footer_copyright": ""
}

出力は JSON 形式のみでお願いします。