// ==========================================
// navbar.js — Auth section & dynamic features
// Navbar structure is now in HTML (Flowbite)
// ==========================================

function initNavbar() {
  const authContainer = document.getElementById("navbar-auth");
  if (!authContainer) return;

  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  const loggedIn = user !== null;

  if (loggedIn) {
    // User sudah login: tampilkan avatar + nama + logout
    authContainer.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-700 font-bold text-sm">${user.fullName.charAt(0).toUpperCase()}</span>
        </div>
        <div class="text-left hidden sm:block">
          <p class="text-xs font-semibold text-gray-800 leading-tight">${user.fullName}</p>
          <p class="text-[10px] text-gray-400 leading-tight">@${user.username}</p>
        </div>
      </div>
      <button id="navbar-logout-btn" class="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">Logout</button>
    `;

    // Logout handler
    const logoutBtn = document.getElementById("navbar-logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        logoutUser();
        window.location.reload();
      });
    }
  } else {
    // Belum login: tampilkan tombol Login & Register
    authContainer.innerHTML = `
      <a href="login.html" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Login</a>
      <a href="register.html" class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm">Register</a>
    `;
  }

  // Init Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  // Update badge setelah navbar siap
  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }
});