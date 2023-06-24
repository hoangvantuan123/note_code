document.getElementById("logout-btn").addEventListener("click", function () {
  // Xoá token
  localStorage.removeItem("token");
  // Chuyển đến trang đăng nhập hoặc trang chính
  window.location.href = "http://127.0.0.1:5500/frontend-client-html-css/index.html"; // Thay đổi đường dẫn theo nhu cầu
});
