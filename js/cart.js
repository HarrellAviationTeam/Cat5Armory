/**
 * Cat-5 Armory - Inquiry Cart
 * Manages the inquiry list (cart) stored in localStorage.
 * Items in this cart are used to generate quote requests to Cat-5 Armory.
 */

const Cart = (() => {
  const STORAGE_KEY = 'cat5_inquiry_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function add(product) {
    // product can be a string (JSON) or object
    if (typeof product === 'string') {
      try { product = JSON.parse(product); } catch { return; }
    }
    const items = load();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    save(items);
    render();
    openCart();
    showAddedToast(product.name);
  }

  function remove(productId) {
    const items = load().filter(i => i.id !== productId);
    save(items);
    render();
  }

  function updateQty(productId, qty) {
    if (qty < 1) { remove(productId); return; }
    const items = load();
    const item = items.find(i => i.id === productId);
    if (item) item.qty = qty;
    save(items);
    render();
  }

  function clear() {
    save([]);
    render();
  }

  function getTotal() {
    return load().reduce((sum, i) => sum + ((i.salePrice || i.price) * i.qty), 0);
  }

  function getCount() {
    return load().reduce((sum, i) => sum + i.qty, 0);
  }

  function render() {
    const items = load();
    const count = getCount();
    const total = getTotal();

    // Update badge
    const badge = document.getElementById('cartBadgeEl');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }

    // Update count/total displays
    const countEl = document.getElementById('cartCountEl');
    if (countEl) countEl.textContent = count;
    const totalEl = document.getElementById('cartTotalEl');
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);

    // Render items list
    const listEl = document.getElementById('cartItemsEl');
    if (!listEl) return;

    if (items.length === 0) {
      listEl.innerHTML = `
        <div class="cart-empty-msg">
          <p>Your inquiry list is empty.</p>
          <p style="margin-top:8px;font-size:.8rem">Add items to request a quote from Cat-5 Armory.</p>
          <a href="shop.html" class="btn btn-outline btn-sm" style="margin-top:14px" onclick="toggleCart()">Browse Products</a>
        </div>`;
      return;
    }

    listEl.innerHTML = items.map(item => `
      <div class="cart-item" id="ci-${item.id}">
        <img src="${item.image || 'assets/accessories.png'}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.brand}${item.caliber ? ' · ' + item.caliber : ''}</div>
          <div class="cart-item-price">$${((item.salePrice || item.price) * item.qty).toFixed(2)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}', ${item.qty - 1})">&#x2212;</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}', ${item.qty + 1})">&#x2B;</button>
            <span class="cart-item-del" onclick="Cart.remove('${item.id}')">Remove</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  function showAddedToast(name) {
    const existing = document.getElementById('addToast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'addToast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#fff;padding:12px 20px;border-radius:4px;z-index:3000;font-size:.88rem;box-shadow:0 4px 20px rgba(0,0,0,.3);border-left:4px solid #c41e3a;max-width:360px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    toast.textContent = '✓ Added to inquiry: ' + name.slice(0, 50);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // Build cart summary for inquiry form
  function getInquirySummary() {
    const items = load();
    if (items.length === 0) return '';
    return 'INQUIRY LIST:\n' + items.map(i => `- ${i.name} (Qty: ${i.qty}) @ $${(i.salePrice || i.price).toFixed(2)} each`).join('\n') + `\n\nEst. Total: $${getTotal().toFixed(2)}`;
  }

  // Initialize
  function init() {
    render();
  }

  return { add, remove, updateQty, clear, getTotal, getCount, render, openCart, closeCart, getInquirySummary, init, load };
})();

// Global toggle function
function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    Cart.closeCart();
  } else {
    Cart.openCart();
  }
  Cart.render();
}

// Init on load
document.addEventListener('DOMContentLoaded', () => Cart.init());
