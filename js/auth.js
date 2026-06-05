// ==========================================
// auth.js — Sistem autentikasi MWURAH
// Register, Login, Logout untuk semua user
// Admin account: admin / admin123
// ==========================================

// Seed akun admin saat pertama kali
function seedAdminAccount() {
  const users = getUsers();
  const adminExists = users.find(u => u.username === "admin");
  if (!adminExists) {
    users.push({
      username: "admin",
      password: "admin123",
      fullName: "Administrator",
      role: "admin",
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
  }
}

// Ambil semua user dari localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("mwurah_users")) || [];
}

// Simpan semua user ke localStorage
function saveUsers(users) {
  localStorage.setItem("mwurah_users", JSON.stringify(users));
}

// Ambil user yang sedang login
function getCurrentUser() {
  const data = localStorage.getItem("mwurah_currentUser");
  return data ? JSON.parse(data) : null;
}

// Simpan session user
function setCurrentUser(user) {
  // Jangan simpan password di session
  const safeUser = {
    username: user.username,
    fullName: user.fullName,
    role: user.role || "user"
  };
  localStorage.setItem("mwurah_currentUser", JSON.stringify(safeUser));
}

// Hapus session
function clearCurrentUser() {
  localStorage.removeItem("mwurah_currentUser");
}

// Cek apakah user sudah login
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Cek apakah user adalah admin
function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === "admin";
}

// Register user baru
function registerUser(username, password, fullName) {
  username = username.trim().toLowerCase();
  password = password.trim();
  fullName = fullName.trim();

  if (!username || !password || !fullName) {
    return { success: false, message: "Semua field wajib diisi." };
  }

  if (username.length < 3) {
    return { success: false, message: "Username minimal 3 karakter." };
  }

  if (password.length < 6) {
    return { success: false, message: "Password minimal 6 karakter." };
  }

  const users = getUsers();
  const exists = users.find(u => u.username === username);
  if (exists) {
    return { success: false, message: "Username sudah digunakan." };
  }

  const newUser = {
    username,
    password,
    fullName,
    role: "user",
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: "Registrasi berhasil! Silakan login.", user: newUser };
}

// Login user
function loginUser(username, password) {
  username = username.trim().toLowerCase();
  password = password.trim();

  if (!username || !password) {
    return { success: false, message: "Username dan password wajib diisi." };
  }

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return { success: false, message: "Username atau password salah." };
  }

  setCurrentUser(user);
  return { success: true, message: `Selamat datang, ${user.fullName}!`, user };
}

// Logout
function logoutUser() {
  clearCurrentUser();
}

// Init: seed admin account
seedAdminAccount();
