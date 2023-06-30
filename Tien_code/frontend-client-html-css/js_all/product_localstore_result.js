  // Hàm tính tổng quantity của mảng
  function sumQuantity(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i].quantity;
    }
    return total;
}

// Lấy giá trị từ localStorage
const value = JSON.parse(localStorage.getItem("cartItems"));

// Tính toán tổng quantity
const result = sumQuantity(value);

// Cập nhật giá trị vào phần tử HTML

const quantityElement = document.getElementById("quantity_shopping");
console.log(quantityElement)
quantityElement.innerHTML = `
    <a href="thanhtoan.html" class="menu-shopping " >
                                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor"
                                    class="bi bi-cart2" viewBox="0 0 16 16">
                                    <path
                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg>
                                <span >${result}</span>
                            </a>
`;

// Hiển thị tổng quantity ngay từ đầu
console.log("Tổng quantity: ", result);

// Hàm xử lý sự kiện thay đổi localStorage
function handleStorageChange(event) {
    if (event.key === "cartItems") {
        const value = JSON.parse(event.newValue);
        const result = sumQuantity(value);
        console.log("Tổng quantity: ", result);
const quantityElement = document.getElementById("quantity_shopping");
console.log(quantityElement)
        // Cập nhật giá trị vào phần tử HTML khi có sự thay đổi
        quantityElement.innerHTML = `
        <a href="thanhtoan.html" class="menu-shopping " >
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor"
            class="bi bi-cart2" viewBox="0 0 16 16">
            <path
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
        </svg>
        <span >${result}</span>
    </a>
        `;
    }
}

// Đăng ký sự kiện "storage" để lắng nghe thay đổi của localStorage
window.addEventListener("storage", handleStorageChange);
