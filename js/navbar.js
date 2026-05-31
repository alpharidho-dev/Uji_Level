function navbar() {
  const navbarContainer = document.getElementById("navbar-container");

  if (!navbarContainer) {
    console.error("Elemen dengan ID 'navbar-container' tidak ditemukan!");
    return;
  }

  // 1. KUNCI UTAMA: Paksa kontainer paling luar di HTML menjadi sticky lewat JS
  navbarContainer.className = "sticky top-0 z-50 w-full";

  // Bersihkan konten lama
  navbarContainer.innerHTML = "";

  // Buat elemen nav baru
  const navbarElement = document.createElement("nav");
  // 2. PERBAIKAN: Hapus 'sticky', 'top-0', dan 'z-50' dari sini agar tidak tabrakan
  navbarElement.className =
    "flex items-center justify-center px-6 py-4 bg-white shadow w-full";

  navbarElement.innerHTML = `
    <!-- SEMUANYA MENYATU DI DALAM SATU CONTAINER DAN JARAK GAP SAMA RATA (gap-6) -->
    <div class="flex items-center gap-6 font-semibold text-sm text-gray-700">
        
        <!-- 1. LOGO UTAMA -->
        <div class="text-xl font-bold text-blue-600 shrink-0 mr-2">MWURAH</div>

        <!-- 2. KATEGORI UNGGULAN -->
        <div class="flex items-center gap-3 shrink-0">
            <div class="flex items-center gap-1.5 bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                <i data-lucide="sparkles" class="w-4 h-4"></i> Terbaik
            </div>
            <div class="flex items-center gap-1.5 bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                <i data-lucide="tags" class="w-4 h-4"></i> Termurah
            </div>
            <div class="flex items-center gap-1.5 bg-red-100 text-red-800 px-2.5 py-1 rounded-full">
                <i data-lucide="flame" class="w-4 h-4"></i> Terlaris
            </div>
            <div class="flex items-center gap-1.5 bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                <i data-lucide="zap" class="w-4 h-4"></i> Tercepat
            </div>
            <div class="flex items-center gap-1.5 bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full cursor-pointer hover:bg-purple-200 transition">
                <i data-lucide="help-circle" class="w-4 h-4"></i> Support
            </div>
        </div>

        <!-- 3. IKON FITUR (SEARCH & CART) -->
        <div class="flex items-center gap-2 text-gray-600 shrink-0">
            <button class="p-2 hover:bg-gray-100 rounded-full transition flex items-center justify-center" aria-label="Search">
                <i data-lucide="search" class="w-5 h-5"></i>
            </button>
            <button class="p-2 hover:bg-gray-100 rounded-full transition relative flex items-center justify-center" aria-label="Cart">
                <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                <span id="cart-badge" class="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </button>
        </div>

        <!-- 4. TOMBOL LOGIN & REGISTER -->
        <div class="flex items-center gap-3 shrink-0 ml-2">
            <a href="#" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">Login</a>
            <a href="#" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm">Register</a>
        </div>
    </div>
  `;

  // Masukkan elemen ke dalam container di HTML
  navbarContainer.appendChild(navbarElement);

  // Jalankan render ulang ikon Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Gunakan event listener agar fungsi berjalan setelah seluruh HTML selesai dibaca browser
document.addEventListener("DOMContentLoaded", () => {
  navbar();
});
