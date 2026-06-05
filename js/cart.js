// Simpan data produk yang sudah di-fetch (dipanggil oleh main.js)
function saveProductsToStorage(products) {
  localStorage.setItem("products_data", JSON.stringify(products));
}

// Ambil data produk dari localStorage
function getProductsData() {
  return JSON.parse(localStorage.getItem("products_data")) || [];
}

// Ambil keranjang
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Simpan keranjang
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Tambah ke keranjang
function addToCart(productId) {
  const products = getProductsData();
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.error("Produk tidak ditemukan");
    return;
  }

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  saveCart(cart);
  updateCartBadge();
  alert(`${product.title} ditambahkan ke keranjang!`);
}

// Hapus item dari keranjang
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

// Ubah kuantitas item (+1 / -1)
function updateQuantity(productId, delta) {
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }
  saveCart(cart);
  updateCartBadge();
}

// Perbarui badge jumlah item di ikon keranjang
function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "flex" : "none";
  }
}