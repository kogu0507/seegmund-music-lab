# **GitHub Pages 多言語対応サイト仕様書（SEO最適化版）**

## **1. プロジェクト概要**
### **1.1. 目的**
GitHub Pages 上でホスティングする静的サイトに多言語対応を導入し、SEO に優れた構成を実現する。

### **1.2. 想定ユーザー**
- 多言語で情報を提供したいウェブサイト運営者
- 英語・日本語のユーザー
- 検索エンジン経由での訪問者（SEO を考慮）

### **1.3. 要求仕様**
- **GitHub Pages に対応する静的サイト構成**
- **SEO に配慮した URL 構造**（言語別ディレクトリ `/en/`, `/ja/` など）
- **`localStorage` および `Cookie` によるユーザーの言語設定記憶**
- **リロードを伴う言語切り替え方式の採用（UX考慮）**
- **`hreflang` や `canonical` タグによる SEO 最適化**
- **拡張性を考慮した言語管理の仕組み**
- **Google Search Console での検証対応**
- **サイト速度の最適化（画像圧縮、CDN活用、キャッシュ最適化、`srcset` の活用）**
- **メタディスクリプションの最適化**
- **内部リンクと構造化データの活用 (`Organization`, `BreadcrumbList`)**
- **言語ごとの 404 ページの提供（トップページへのリンク追加）**
- **ローカライズ対応（日時・通貨表記の最適化）**
- **セキュリティ強化（CSP の適用、XSS/CSRF 対策）**
- **テストと品質管理（言語切り替え・SEOテストの手法を明記、テストツールの活用）**

---

## **3. 実装方針**

### **3.2. 言語切り替え処理（UX向上）**
```javascript
export function langSwitcher() {
    document.querySelectorAll('.lang-switch').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetLang = link.dataset.lang;
            if (!VALID_LANGS.includes(targetLang)) {
                console.error(`Invalid language selection: ${targetLang}`);
                window.location.href = `/${DEFAULT_LANG}/`;
                return;
            }

            let currentPath = window.location.pathname;
            let newPath = currentPath.replace(/^\/(lang\/)?(en|ja)(-us)?\//, `/${targetLang}/`);

            setLanguagePreference(targetLang);
            window.location.href = newPath;
        });
    });
}
```

### **3.3. 言語選択 UI（視認性向上）**
```html
<div class="language-selector">
  <button data-lang="en" role="button" aria-label="Switch to English" class="lang-switch"><img src="/assets/flags/en.png" alt="English"> English</button>
  <button data-lang="ja" role="button" aria-label="日本語に切り替え" class="lang-switch selected"><img src="/assets/flags/ja.png" alt="日本語"> 日本語</button>
</div>
```

```css
.language-selector .selected {
  font-weight: bold;
  border: 2px solid #000;
}
```

```javascript
document.querySelectorAll(".lang-switch").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".lang-switch").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    });
});
```

---

## **5. サイト速度の最適化**
- **推奨 CDN**: Cloudflare, jsDelivr
- **キャッシュ戦略**:
  ```html
  <meta http-equiv="Cache-Control" content="max-age=31536000, must-revalidate">
  ```

---

## **6. セキュリティ強化**
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' https://example.com; script-src 'self' 'unsafe-inline';">
```

---

## **7. テストと品質管理**
- **推奨テストツール:**
  - Google Search Console
  - Lighthouse
  - WebPageTest
  - axe（アクセシビリティテスト）
- **テストケース:**
  - 言語切り替えが正しく動作するか
  - `hreflang` の設定が正しいか
  - 構造化データの JSON-LD 検証（Schema.org）
  - SEO パフォーマンス（Lighthouse）

---

## **8. まとめ**
この仕様書は、GitHub Pages での多言語対応サイトの構築を効率化し、SEO に強い設計を実現するためのガイドラインとなる。