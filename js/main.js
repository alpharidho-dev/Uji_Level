// ==========================================
// main.js — Render produk di dashboard
// Fix: DOMContentLoaded, warna hijau
// ==========================================

async function init() {
  const products = await fetchProduct();
  if (products) {
    saveProductsToStorage(products); // simpan agar cart.js bisa akses
    renderProduct(products);
    updateCartBadge(); // tampilkan badge saat load
  }
}

async function fetchProduct() {
  try {
    const response = await fetch("product.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

function renderProduct(products) {
  const container = document.getElementById("product-container");
  if (!container) {
    console.error("Element #product-container tidak ditemukan!");
    return;
  }

  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "w-full max-w-sm bg-white p-5 border border-emerald-100 rounded-xl shadow-sm hover:shadow-md transition-shadow";

    // Tentukan warna badge kondisi
    let condBadgeClass = "bg-emerald-100 text-emerald-800";
    if (product.condition === "Sangat Baik") {
      condBadgeClass = "bg-emerald-200 text-emerald-900";
    } else if (product.condition === "Cukup") {
      condBadgeClass = "bg-amber-100 text-amber-800";
    }

    card.innerHTML = `
      <div class="relative">
        <img class="rounded-lg mb-4 w-full h-48 object-cover" src="${product.image}" alt="${product.title}" />
        <span class="absolute top-2 left-2 ${condBadgeClass} text-xs font-medium px-2 py-0.5 rounded-full">${product.condition || 'Bekas'}</span>
      </div>
      <div>
        <div class="flex items-center space-x-3 mb-3">
          <div class="flex items-center space-x-0.5">
            ${generateStars(5)}
          </div>
          <span class="bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-medium px-1.5 py-0.5 rounded">4.8</span>
        </div>
        <h5 class="text-lg text-gray-900 font-semibold tracking-tight leading-tight mb-1">${product.title}</h5>
        <p class="text-xs text-gray-500 mb-3">${product.category || ''}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="text-2xl font-extrabold text-emerald-700">${formatPrice(product.price)}</span>
          <button type="button" class="add-to-cart-btn inline-flex items-center text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 shadow-sm font-medium rounded-lg text-sm px-3 py-2 focus:outline-none transition-colors" data-id="${product.id}">
            <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/></svg>
            Tambah
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Event listener untuk tombol Add to Cart
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(btn.getAttribute("data-id"));
      addToCart(productId); // dari cart.js
    });
  });
}

// Helper: generate star SVGs
function generateStars(count) {
  let stars = "";
  for (let i = 0; i < count; i++) {
    stars += `<svg class="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>`;
  }
  return stars;
}

// Init saat DOM siap
document.addEventListener("DOMContentLoaded", init);