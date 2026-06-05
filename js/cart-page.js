// ==========================================
// cart-page.js — Render halaman keranjang
// Fix: event listener duplikasi, links, warna
// ==========================================

// BUG 8 FIX: Event delegation dipasang sekali saja, di luar renderCartPage
let cartEventsBound = false;

function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  const waLink = document.getElementById("whatsapp-link");

  if (cart.length === 0) {
    // BUG 5 FIX: link ke dashboard.html, bukan index.html
    container.innerHTML = `<p class="text-gray-500 text-center py-8">Keranjang kosong. <a href="dashboard.html" class="text-emerald-600 hover:underline font-medium">Mulai belanja</a></p>`;
    totalEl.textContent = "Rp 0";
    if (waLink) waLink.classList.add("hidden");
    return;
  }

  container.innerHTML = "";
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    const row = document.createElement("div");
    row.className = "flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-lg">
      <div class="flex-1 min-w-[200px]">
        <h4 class="font-medium text-gray-800">${item.title}</h4>
        <p class="text-sm text-emerald-600 font-medium">${formatPrice(item.price)}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="qty-dec bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1 rounded-lg font-bold transition-colors" data-id="${item.id}">−</button>
        <span class="w-8 text-center font-semibold text-gray-800">${item.quantity}</span>
        <button class="qty-inc bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1 rounded-lg font-bold transition-colors" data-id="${item.id}">+</button>
      </div>
      <p class="font-semibold text-emerald-700 w-28 text-right">${formatPrice(subtotal)}</p>
      <button class="remove-btn text-red-400 hover:text-red-600 ml-2 transition-colors" data-id="${item.id}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    `;
    container.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalEl.textContent = formatPrice(total);

  // BUG 8 FIX: Bind event hanya sekali
  if (!cartEventsBound) {
    container.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = parseInt(btn.getAttribute("data-id"));
      if (isNaN(id)) return;
      if (btn.classList.contains("qty-inc")) {
        updateQuantity(id, 1);
        renderCartPage();
      } else if (btn.classList.contains("qty-dec")) {
        updateQuantity(id, -1);
        renderCartPage();
      } else if (btn.classList.contains("remove-btn")) {
        removeFromCart(id);
        renderCartPage();
      }
    });
    cartEventsBound = true;
  }
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }
  // Simpan ke riwayat
  const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
  history.push({
    items: cart,
    date: new Date().toISOString()
  });
  localStorage.setItem("orderHistory", JSON.stringify(history));

  // Kosongkan keranjang
  localStorage.removeItem("cart");
  const waLink = document.getElementById("whatsapp-link");
  if (waLink) waLink.classList.remove("hidden");
  alert("Pesanan berhasil! Silakan hubungi penjual via WhatsApp untuk detail transaksi.");
  renderCartPage();
  updateCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout);
  }
});