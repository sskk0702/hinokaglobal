// ── HINOKA SHOP ENGINE ─────────────────────────
// Cart state
let cart = JSON.parse(localStorage.getItem('hinoka_cart') || '[]');

// Save cart
function saveCart() {
  localStorage.setItem('hinoka_cart', JSON.stringify(cart));
  updateCartUI();
}

// Add to cart
function addToCart(id, name, price, image, qty = 1) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, price, image, qty });
  }
  saveCart();
  showCartToast(name);
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCartDrawer();
}

// Update quantity
function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else { saveCart(); renderCartDrawer(); }
  }
}

// Get totals
function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

// Update all cart UI elements
function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Toast notification
function showCartToast(name) {
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.style.cssText = `
      position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(80px);
      background:#1a1a18;color:#fff;padding:14px 24px;border-radius:4px;
      font-size:13px;font-family:'Montserrat',sans-serif;letter-spacing:0.05em;
      z-index:9999;transition:transform 0.3s ease;white-space:nowrap;
      box-shadow:0 8px 24px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = `✓ カートに追加しました`;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(80px)'; }, 2500);
}

// ── CART DRAWER ──────────────────────────────────
function renderCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  const body = drawer.querySelector('.cart-drawer-body');
  const footer = drawer.querySelector('.cart-drawer-footer');

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;color:#9a9490;">
        <div style="font-size:40px;">🛒</div>
        <div style="font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:0.15em;">カートは空です</div>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
        <div class="cart-item-qty">
          <button onclick="updateQty('${item.id}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty('${item.id}', 1)">＋</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">×</button>
    </div>
  `).join('');

  const total = getCartTotal();
  footer.innerHTML = `
    <div class="cart-total">
      <span>合計（税込）</span>
      <span>¥${total.toLocaleString()}</span>
    </div>
    <a href="checkout.html" class="btn-solid" style="width:100%;text-align:center;justify-content:center;">
      レジに進む
    </a>
    <div style="font-size:11px;color:#9a9490;text-align:center;margin-top:8px;font-family:'Montserrat',sans-serif;letter-spacing:0.05em;">
      送料は次のステップで計算されます
    </div>
  `;
}

function openCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer) { drawer.classList.add('open'); renderCartDrawer(); }
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ── INJECT CART UI ────────────────────────────────
function injectCartUI() {
  // Cart button in header
  const nav = document.querySelector('.main-nav');
  if (nav) {
    const cartBtn = document.createElement('button');
    cartBtn.className = 'cart-btn';
    cartBtn.onclick = openCart;
    cartBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      <span class="cart-count" style="display:none">0</span>
    `;
    nav.appendChild(cartBtn);
  }

  // Overlay
  const overlay = document.createElement('div');
  overlay.id = 'cart-overlay';
  overlay.onclick = closeCart;
  document.body.appendChild(overlay);

  // Drawer
  const drawer = document.createElement('div');
  drawer.id = 'cart-drawer';
  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <div class="cart-drawer-title">
        ショッピングカート
        <span class="cart-count" style="display:none">0</span>
      </div>
      <button class="cart-close" onclick="closeCart()">×</button>
    </div>
    <div class="cart-drawer-body"></div>
    <div class="cart-drawer-footer"></div>
  `;
  document.body.appendChild(drawer);

  updateCartUI();
}

// ── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectCartUI();
});
