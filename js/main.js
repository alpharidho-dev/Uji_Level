async function init() {
  const product = await fetchProduct();
  if (product) {
    renderProduct(product);
  }
}

async function fetchProduct() {
  try {
    const response = await fetch("product.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    console.log("Response OK");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
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
    // Gunakan class Tailwind standar (agar aman) + beberapa kustom kalau ada
    card.className =
      "w-full max-w-sm bg-gray-50 p-6 border border-gray-200 rounded-lg shadow";

    card.innerHTML = `
      <a href="#">
        <img class="rounded-lg mb-6 w-full h-48 object-cover" src="${product.image}" alt="${product.title}" />
      </a>
      <div>
        <div class="flex items-center space-x-3 mb-6">
          <div class="flex items-center space-x-1">
            <svg class="w-5 h-5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
            <svg class="w-5 h-5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
            <svg class="w-5 h-5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
            <svg class="w-5 h-5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
            <svg class="w-5 h-5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
          </div>
          <span class="bg-blue-100 border border-blue-200 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded">4.8 out of 5</span>
        </div>
        <a href="#">
          <h5 class="text-xl text-gray-900 font-semibold tracking-tight">${product.title}</h5>
        </a>
        <div class="flex items-center justify-between mt-6">
          <span class="text-3xl font-extrabold text-gray-900">Rp ${product.price.toLocaleString("id-ID")}</span>
          <button type="button" class="add-to-cart-btn inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow font-medium rounded-lg text-sm px-3 py-2 focus:outline-none" data-id="${product.id}">
            <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/></svg>
            Add to cart
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(btn.getAttribute("data-id"));
      console.log("Add to cart:", productId);
      alert("Produk ditambahkan ke keranjang (simulasi)");
    });
  });
} 

init();