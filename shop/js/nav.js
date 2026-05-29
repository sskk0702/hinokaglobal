/**
 * nav.js — HINOKA 共通ナビゲーション
 * 全ページの </body> 直前で読み込む
 */

(function () {
  // ── 1. ナビゲーションHTMLを動的に挿入 ──────────────────────────
  const NAV_HTML = `
  <!-- ナビゲーションバー -->
  <nav id="main-nav" role="navigation" aria-label="メインナビゲーション">
    <!-- 左：ハンバーガー -->
    <div class="nav-left">
      <button class="hamburger-btn" id="hamburgerBtn" aria-label="メニューを開く">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- 中央：ロゴ -->
    <div class="nav-center">
      <a href="store.html" class="nav-logo">HINOKA</a>
    </div>

    <!-- 右：アイコン -->
    <div class="nav-right">
      <button class="nav-icon-btn" id="searchBtn" aria-label="検索">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
      </button>
      <a class="nav-icon-btn" href="wishlist.html" aria-label="ウィッシュリスト">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </a>
      <a class="nav-icon-btn" href="account.html" aria-label="マイアカウント">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
      <a class="nav-icon-btn" href="cart.html" aria-label="ショッピングカート" id="cartNavBtn">
        <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="cart-badge" id="cartBadge">0</span>
      </a>
    </div>
  </nav>

  <!-- サイドメニューオーバーレイ -->
  <div class="menu-overlay" id="menuOverlay"></div>

  <!-- サイドメニュー -->
  <aside class="side-menu" id="sideMenu" aria-label="カテゴリーメニュー">
    <div class="side-menu-header">
      <span class="side-menu-logo">HINOKA</span>
      <button class="close-menu-btn" id="closeMenuBtn" aria-label="メニューを閉じる">×</button>
    </div>

    <!-- ペット用品 -->
    <div class="menu-category" data-cat="pet">
      <div class="menu-category-header">
        <span>ペット用品</span>
        <span class="menu-plus">+</span>
      </div>
      <div class="menu-subcategory">
        <a href="product-list.html?category=dog-food">ドッグフード</a>
        <a href="product-list.html?category=cat-food">キャットフード</a>
        <a href="product-list.html?category=pet-toys">おもちゃ</a>
        <a href="product-list.html?category=pet-bed">ベッド・ハウス</a>
        <a href="product-list.html?category=pet-collar">首輪・リード</a>
      </div>
    </div>

    <!-- ファッション -->
    <div class="menu-category" data-cat="fashion">
      <div class="menu-category-header">
        <span>ファッション</span>
        <span class="menu-plus">+</span>
      </div>
      <div class="menu-subcategory">
        <a href="product-list.html?category=tops">トップス</a>
        <a href="product-list.html?category=bottoms">ボトムス</a>
        <a href="product-list.html?category=outer">アウター</a>
        <a href="product-list.html?category=accessories">アクセサリー</a>
        <a href="product-list.html?category=shoes">シューズ</a>
      </div>
    </div>

    <!-- 生活雑貨 -->
    <div class="menu-category" data-cat="daily">
      <div class="menu-category-header">
        <span>生活雑貨</span>
        <span class="menu-plus">+</span>
      </div>
      <div class="menu-subcategory">
        <a href="product-list.html?category=kitchen">キッチン用品</a>
        <a href="product-list.html?category=interior">インテリア</a>
        <a href="product-list.html?category=bath">バス・トイレ</a>
        <a href="product-list.html?category=storage">収納・整理</a>
        <a href="product-list.html?category=aroma">アロマ・キャンドル</a>
      </div>
    </div>
  </aside>

  <!-- 検索モーダル -->
  <div class="search-modal" id="searchModal" role="dialog" aria-label="検索">
    <button class="search-modal-close" id="closeSearchBtn" aria-label="閉じる">×</button>
    <div class="search-modal-inner">
      <input type="text" id="searchInput" placeholder="キーワードを入力" aria-label="検索キーワード">
    </div>
  </div>

  <!-- カートトースト -->
  <div class="cart-toast" id="cartToast" role="status" aria-live="polite"></div>
  `;

  // bodyの先頭に挿入
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // ── 2. スクロール連動：ナビ自動隠し ───────────────────────────
  const nav = document.getElementById('main-nav');
  let lastScrollY = 0;
  let scrollTimer = null;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    clearTimeout(scrollTimer);

    if (currentY > lastScrollY && currentY > 80) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }

    // スクロール停止1秒後に再表示
    scrollTimer = setTimeout(() => {
      nav.classList.remove('hidden');
    }, 1000);

    lastScrollY = currentY;
  }, { passive: true });

  // ── 3. ハンバーガーメニュー ───────────────────────────────────
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sideMenu     = document.getElementById('sideMenu');
  const menuOverlay  = document.getElementById('menuOverlay');
  const closeMenuBtn = document.getElementById('closeMenuBtn');

  function openMenu() {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // アコーディオン
  document.querySelectorAll('.menu-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const cat = header.parentElement;
      const isOpen = cat.classList.contains('open');
      // 他を閉じる
      document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('open'));
      if (!isOpen) cat.classList.add('open');
    });
  });

  // ── 4. 検索モーダル ──────────────────────────────────────────
  const searchBtn    = document.getElementById('searchBtn');
  const searchModal  = document.getElementById('searchModal');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput  = document.getElementById('searchInput');

  function openSearch() {
    searchModal.classList.add('open');
    setTimeout(() => searchInput.focus(), 100);
  }

  function closeSearch() {
    searchModal.classList.remove('open');
  }

  searchBtn.addEventListener('click', openSearch);
  closeSearchBtn.addEventListener('click', closeSearch);

  searchModal.addEventListener('click', e => {
    if (e.target === searchModal) closeSearch();
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      location.href = `product-list.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
    if (e.key === 'Escape') closeSearch();
  });

  // ── 5. カートバッジ更新 ──────────────────────────────────────
  function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const total = items.reduce((sum, item) => sum + (item.qty || 1), 0);
    badge.textContent = total;
    badge.classList.toggle('visible', total > 0);
  }

  updateCartBadge();

  // 他のページからカート更新イベントを受け取る
  window.addEventListener('cartUpdated', updateCartBadge);

  // ── 6. カートトースト表示（グローバル関数） ──────────────────
  window.showCartToast = function () {
    const toast = document.getElementById('cartToast');
    toast.innerHTML = `このクリエイションをショッピングバッグに追加しました。
      <a href="cart.html">ショッピングバッグを表示</a>、または
      <a href="checkout.html">お会計</a>に移動`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
    updateCartBadge();
  };

  // ── 7. ESCキー共通処理 ───────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu();
      closeSearch();
    }
  });

})();
