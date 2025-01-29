# **GitHub Pages 多言語対応サイト仕様書（SEO最適化版）**

## **1. プロジェクト概要**
### **1.1. 目的**
GitHub Pages 上でホスティングする静的サイトに多言語対応を導入し、SEO に優れた構成を実現する。


### **1.2. 想定ユーザー**
- 多言語で情報を提供したいウェブサイト運営者
- 英語・日本語のユーザー
- 検索エンジン経由での訪問者（SEO を考慮）

### **1.3. 要求仕様**
- **GitHub Pages に対応する静的サイト構成**（カスタムドメイン seegmund-music-lab.com を使用）
- **SEO に配慮した URL 構造**（言語別ディレクトリ `/en/`, `/ja/` など）
- **`localStorage` によるユーザーの言語設定記憶（Cookie は使用しない）**
- **リロードを伴う言語切り替え方式の採用（UX考慮）**
- **`hreflang` や `canonical` タグによる SEO 最適化**
- **拡張性を考慮した言語管理の仕組み（`VALID_LANGS` を拡張可能に設計）**
- **Google Search Console での検証対応**
- **サイト速度の最適化（画像圧縮、CDN活用、キャッシュ最適化、`srcset` の活用）**
- **メタディスクリプションの最適化**
- **内部リンクと構造化データの活用 (`Organization`, `BreadcrumbList`)**
- **言語ごとの 404 ページの提供（トップページへのリンク追加）**
- **ローカライズ対応（日時・通貨表記の最適化）**
- **セキュリティ強化（CSP の適用、XSS/CSRF 対策）**
- **テストと品質管理（言語切り替え・SEOテストの手法を明記、テストツールの活用）**

### **新しい言語の追加方法**
1. `/新言語コード/` ディレクトリを作成し、以下のファイルを追加する:
   - `/新言語コード/index.html`
   - `/新言語コード/about.html`
   - `/新言語コード/contact.html`
   - `/errors/404-新言語コード.html`
2. `VALID_LANGS` に新しい言語コードを追加する。
3. `sitemap.xml` に新しい言語のエントリを追加する。
4. `hreflang` を適切に設定し、Google Search Console でインデックス登録を確認する。

---
## **2. サイト構成**

### **2.1. URL 構造**
| 言語   | URL                                |
| ------ | ---------------------------------- |
| 英語   | https://seegmund-music-lab.com/en/ |
| 日本語 | https://seegmund-music-lab.com/ja/ |

- 言語ごとに個別の HTML ファイルを管理。
- ルート (/) にアクセスした場合、言語選択ページ (/index.html) を表示。
+ ルート (/) にアクセスした場合、ユーザーの言語設定に基づいて適切な言語ページへ自動リダイレクトする。
+ ただし、明示的に言語を選択できるオプションも提供する。


### **2.2. ディレクトリ構造**
/               (ルート: 言語選択ページ index.html)
/en/            (英語ページ)
  ├── index.html
  ├── about.html
  ├── contact.html
/ja/            (日本語ページ)
  ├── index.html
  ├── about.html
  ├── contact.html
/errors/        (404 ページ用ディレクトリ)
  ├── 404-en.html
  ├── 404-ja.html
/assets/        (CSS, JS, 画像ファイル)


```html

```
---

## **3. 実装方針**
### **3.1. 言語選択とリダイレクト**
#### **概要**
- index.html で言語選択ページを表示。
- localStorage に保存された言語または navigator.language を基にデフォルト言語を提案。
- DEFAULT_LANG は ja（日本語）。

#### **スクリプト（リダイレクト処理）**
```javascript
const VALID_LANGS = ['en', 'ja'];
const DEFAULT_LANG = 'ja';

document.addEventListener("DOMContentLoaded", () => {
    // URLから言語パラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    let urlLang = urlParams.get('lang');

    let browserLang = navigator.language ? navigator.language.slice(0, 2) : null;
    let targetLang = VALID_LANGS.includes(urlLang) ? urlLang : 
                     (VALID_LANGS.includes(browserLang) ? browserLang : DEFAULT_LANG);

    if (!urlLang) {
        // 言語指定がない場合は適切な言語ページにリダイレクト
        window.location.href = `/${targetLang}/?lang=${targetLang}`;
    }

    const formatter = new Intl.DateTimeFormat(navigator.language, { dateStyle: "long" });
    document.getElementById("date-display").textContent = formatter.format(new Date());

    const currencyFormatter = new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: navigator.language.startsWith('ja') ? "JPY" : "USD"
    });
    document.getElementById("price-display").textContent = currencyFormatter.format(1000);
});


function setLanguagePreference(lang) {
    localStorage.setItem('preferredLang', lang);
}

```

```html
<noscript>
    <meta http-equiv="refresh" content="0;url=/ja/">
</noscript>

<!--または-->
<noscript>
    <p>JavaScript が無効化されています。手動で <a href="/ja/">日本語ページ</a> へ移動してください。</p>
</noscript>

```


### **3.2. 言語切り替え処理（UX向上）**
```javascript
export function langSwitcher() {
    document.querySelectorAll('.lang-switch').forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const targetLang = link.dataset.lang;
            if (!VALID_LANGS.includes(targetLang)) {
                console.error(`Invalid language selection: ${targetLang}`);
                return;
            }

            setLanguagePreference(targetLang);

            // ローディングアニメーションを表示
            document.getElementById("loading").style.display = "block";

            try {
                const response = await fetch(`/${targetLang}/index.html`);
                const text = await response.text();

                document.querySelector("main").innerHTML = text;
                document.title = `Title in ${targetLang}`;
                history.pushState({}, "", `/${targetLang}/`);
            } catch (error) {
                console.error("Failed to load page:", error);
            } finally {
                document.getElementById("loading").style.display = "none";
            }
        });
    });
}


```
```css
#loading {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
}
```


### **3.3. 言語選択 UI（視認性向上）**
```html
<div class="language-selector">
    <button data-lang="en" class="lang-switch" aria-label="Switch to English">
        <img src="/assets/flags/en.png" alt="English flag"> English
    </button>
    <button data-lang="ja" class="lang-switch selected" aria-label="日本語に切り替え">
        <img src="/assets/flags/ja.png" alt="Japanese flag"> 日本語
    </button>
</div>
```

```css
.language-selector .selected {
  font-weight: bold;
  border: 2px solid #000;
}

/* アクセシビリティ強化 */
.language-selector button {
  cursor: pointer;
  padding: 10px;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.language-selector img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
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
## **4. SEO 最適化**
## **4. SEO 最適化**

### **SEO最適化のためのメタ情報設定**
- 各言語ごとに `title` と `meta description` を静的にHTMLに記述する。
- JavaScript による `title` / `meta description` の変更は行わない（SEO の確実性を優先）。
- 各ページの `meta description` は、検索意図に合わせたキーワードを含め、ユーザーにとって分かりやすい内容にする。


### **4.1. hreflang と canonical タグの最適化**
```html
<link rel="canonical" href="https://example.com/ja/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/" />
<link rel="alternate" hreflang="ja" href="https://example.com/ja/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />


<!-- 画像のレスポンシブ対応 -->
<picture>
    <source srcset="/assets/sample-480w.webp" type="image/webp" media="(max-width: 480px)">
    <source srcset="/assets/sample-1024w.webp" type="image/webp" media="(max-width: 1024px)">
    <source srcset="/assets/sample-480w.jpg" media="(max-width: 480px)">
    <source srcset="/assets/sample-1024w.jpg" media="(max-width: 1024px)">
    <img src="/assets/sample.jpg" alt="Sample Image">
</picture>


<!-- Lazy loading 対応 -->
<img src="/assets/sample.jpg" loading="lazy" alt="Sample Image">


```

### **4.2. サイトマップ (sitemap.xml) の設定**
```xml

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>https://example.com/en/</loc>
        <xhtml:link rel="alternate" hreflang="ja" href="https://example.com/ja/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/index.html"/>
    </url>
    <url>
        <loc>https://example.com/ja/</loc>
        <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/index.html"/>
    </url>
</urlset>


```

---

## **5. 404 ページの最適化**
- GitHub Pages の仕様に従い、ルートに `404.html` を配置。
- 言語ごとに適切な 404 ページへリダイレクトする処理を追加。
- 404 ページには、ホームへ戻るボタンを追加。
```html

<div class="not-found">
    <h1>Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <input type="text" id="search-box" placeholder="Search this site...">
    <button onclick="searchSite()">Search</button>
    <br>
    <a href="/">Go to Homepage</a>
    <h3>Suggested Pages:</h3>
    <ul>
        <li><a href="/en/index.html">Home (English)</a></li>
        <li><a href="/ja/index.html">ホーム (日本語)</a></li>
    </ul>
    <div class="not-found">
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/?lang=en">Go to Homepage (English)</a>
        <a href="/?lang=ja">ホームページへ戻る (日本語)</a>
    </div>

</div>

<script>
function searchSite() {
    const query = document.getElementById("search-box").value.trim();
    if (!query) {
        alert("Please enter a search term.");
        return;
    }
    window.location.href = `https://www.google.com/search?q=site:example.com+${encodeURIComponent(query)}`;
}
</script>

```


---

## **6. セキュリティ強化**
```html

<meta http-equiv="Content-Security-Policy" content="
    default-src 'self'; 
    img-src 'self' https://example.com; 
    script-src 'self' 'nonce-randomstring' https://trusted-cdn.com;
    style-src 'self' 'sha256-xyz' 'unsafe-inline';
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
">

<!-- CSRF トークンをフォームに追加 -->
<form method="post">
    <input type="hidden" name="csrf_token" value="YOUR_CSRF_TOKEN">
    <button type="submit">Submit</button>
</form>


<!-- CSS と JavaScript の minify -->
<link rel="stylesheet" href="/assets/styles.min.css">
<script src="/assets/script.min.js" defer></script>

<!-- 重要なリソースの事前読み込み -->
<link rel="preload" href="/assets/styles.min.css" as="style">
<link rel="preload" href="/assets/script.min.js" as="script">


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

## **8. デプロイ手順**
1. `GitHub Pages` の設定を開き、公開ブランチを `main` または `gh-pages` に指定。
2. `sitemap.xml` を最新の状態に保つ。
3. `robots.txt` に `sitemap.xml` のパスを記述。
4. `Google Search Console` で新しいページをインデックスさせる。
5. パフォーマンステストを実施し、`Lighthouse` で評価。


## **9. まとめ**
この仕様書は、GitHub Pages での多言語対応サイトの構築を効率化し、SEO に強い設計を実現するためのガイドラインとなる。