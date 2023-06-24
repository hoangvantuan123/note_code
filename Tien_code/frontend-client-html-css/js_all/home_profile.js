document.addEventListener("DOMContentLoaded", function() {
    var token = localStorage.getItem("token");

    if (token) {
        // Token exists in local storage, show profile section
        document.getElementById("profileSection").style.display = "block";
    } else {
        // Token doesn't exist in local storage, show login section
        document.getElementById("loginSection").style.display = "block";
    }
});