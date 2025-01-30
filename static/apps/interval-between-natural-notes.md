


## js
◆ページ読み込み時
・idをシャッフル
・シャッフル準に要素を並べ替え


◆もう一問ボタンが押されたら
リロード






---





<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Seegmund Music Lab - 音楽理論、音楽アプリ、技術ノートなどのリソースを提供します。">
  <meta name="keywords" content="音楽アプリ, 音楽理論, 技術ノート, Seegmund Music Lab">
  <meta name="robots" content="index, follow">

  <title>Seegmund Music Lab - 日本語版</title>
  <link rel="icon" href="/static/images/favicon.ico">
  <link rel="alternate" href="https://seegmund-music-lab.com/en/" hreflang="en" />
  <link rel="alternate" href="https://seegmund-music-lab.com/ja/" hreflang="ja" />

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

</head>

<body class="bg-light">
  <header class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom py-3">
      <div class="container-fluid">
        <a class="navbar-brand fs-4" href="/" aria-label="Seegmund Music Labのホームページ">Seegmund Music Lab</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="ナビゲーションの切り替え">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="/ja/music-apps/" aria-label="音楽アプリのページ">音楽アプリ</a></li>
            <li class="nav-item"><a class="nav-link" href="/ja/theory-notes/" aria-label="音楽理論ノートのページ">音楽理論ノート</a></li>
            <li class="nav-item"><a class="nav-link" href="/ja/technical-notes/" aria-label="技術ノートのページ">技術ノート</a></li>
            <li class="nav-item"><a class="nav-link" href="/ja/about/" aria-label="概要のページ">概要</a></li>
            <li class="nav-item"><a class="nav-link" href="/ja/contact/" aria-label="お問い合わせページ">お問い合わせ</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="container mt-4">
    
  </main>

  <footer class="container py-3 border-top">
    <div class="d-flex justify-content-between flex-wrap">
      <p class="mb-0">© 2024 Seegmund Music Lab</p>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">
          <a href="/ja/privacy-policy.html" class="text-decoration-none" aria-label="プライバシーポリシー">プライバシーポリシー</a>
        </li>
        <li class="list-inline-item">
          <a href="/ja/disclaimer.html" class="text-decoration-none" aria-label="免責事項">免責事項</a>
        </li>
      </ul>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="langDropdown" data-bs-toggle="dropdown">
          🌍 日本語
        </button>
        <ul class="dropdown-menu" aria-labelledby="langDropdown">
          <li><a class="dropdown-item lang-switch" href="/en/" data-lang="en" aria-label="English">English</a></li>
          <li><a class="dropdown-item lang-switch" href="/ja/" data-lang="ja" aria-label="日本語">日本語</a></li>
        </ul>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script type="module" src="/static/js/base.js" defer></script>
</body>

</html>
