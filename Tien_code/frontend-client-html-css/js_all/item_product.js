const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");
console.log("slug_item", slug);
fetchProductDetails(slug);

async function fetchProductDetails(slug) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/products/${slug}`);
    if (!response.ok) {
      throw new Error("Error fetching product details");
    }

    const product = await response.json();
    console.log("Product:", product);

    displayProductDetails(product);
    // Lấy giá trị từ đối tượng product
    const name = product.name;
    const price = product.price;
    console.log("Price:", price);

    // Sử dụng giá trị trong hàm addToCart()
    addToCart(slug, quantity, product);
  } catch (error) {
    console.error(error);
  }
}

function displayProductDetails(product) {
  const productContainer = document.getElementById("item_product");
  productContainer.innerHTML = `
      <div class="row">
        <div class="col-lg-6 top-one">
          <div class="right">
            <a href="#">
              <img src="${product.image_url}" alt="">
            </a>
          </div>
        </div>
        <div class="col-lg-6 top-two">
          <h4><a href="#" data-slug="${product.slug}">${product.name}</a></h4>
          <div class="comment d-flex">
            <div class="rating">
              <i class="fa-solid fa-star" style="color:#f1c40f"></i>
              <i class="fa-solid fa-star" style="color:#f1c40f"></i>
              <i class="fa-solid fa-star" style="color:#f1c40f"></i>
              <i class="fa-solid fa-star" style="color:#f1c40f"></i>
              <i class="fa-solid fa-star" style="color:#f1c40f"></i>
            </div>
            <div class="com ps-2">
              <p>49 đánh giá/ Viết đánh giá</p>
            </div>
          </div>
          <p class="dola">$${product.price}</p>
          <hr>
          <div>
            <p>- Là loại mặt nạ từ thiên nhiên tuyệt vời.</p>
            <p>- Có nhiều loại, một loại tính năng.</p>
            <p>- Có cả 2 loại mặt nạ ngủ và mặt nạ thường.</p>
          </div>
          <hr>
          <div class="row-but">
            <div class="buttons_added">
              <input class="minus is-form" type="button" value="-">
              <input aria-label="quantity" class="input-qty" max="10" min="1" name="" type="number" value="1">
              <input class="plus is-form" type="button" value="+">
            </div>
            <div class="but d-flex">
              <button type="button" class="btn btn-success add-to-cart" id="button-add-to-cart" style="margin-right:5px ;">THÊM VÀO GIỎ HÀNG</button>
              <button type="button" class="btn btn-danger" id="button">MUA NGAY</button>
            </div>
          </div>
        </div>
      </div>
    `;
  // Gắn sự kiện click vào nút "THÊM VÀO GIỎ HÀNG"
  const addToCartButton = document.getElementById("button-add-to-cart");
  addToCartButton.addEventListener("click", () => {
    const quantityInput = document.querySelector(".input-qty");
    const quantity = parseInt(quantityInput.value);

    addToCart(slug, quantity, JSON.stringify(product));
  });
}
let cartItems = [];

// Kiểm tra xem cartItems đã lưu trong Local Storage chưa
const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
if (storedCartItems && Array.isArray(storedCartItems)) {
  // Nếu có giá trị và là một mảng trong Local Storage, gán lại cho cartItems
  cartItems = storedCartItems;
}

// Hàm tìm vị trí sản phẩm trong giỏ hàng
function findCartItemIndex(slug) {
  return cartItems.findIndex((item) => item.slug === slug);
}

/// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(slug, quantity, product) {
  const existingProductIndex = findCartItemIndex(slug);

  if (existingProductIndex !== -1) {
    // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
    cartItems[existingProductIndex].quantity += quantity;
  } else {
    // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào danh sách
    cartItems.push({
      slug: slug,
      quantity: quantity,
      product: JSON.parse(product),
    });
  }

  // Lưu giá trị cartItems lên Local Storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const quantityElement = document.getElementById("quantity_shopping");
  cartItemsContainer.innerHTML = "";
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    let totalPrice = 0;

    const itemElement = document.createElement("div");
    const price = item.product.price;
    const name = item.product.name;
    const quantity = item.quantity;
    const itemTotalPrice = price * quantity;
    totalPrice += itemTotalPrice;
    itemElement.textContent = `${name} - Quantity: ${
      item.quantity
    } - Total Price: $${itemTotalPrice.toFixed(2)}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editCartItem(item.slug);
    });
    itemElement.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteCartItem(item.slug);
      renderCart(); // Sau khi xoá, gọi lại hàm renderCart() để cập nhật lại nội dung
    });
    itemElement.appendChild(deleteButton);

    cartItemsContainer.appendChild(itemElement);

    totalQuantity += item.quantity;
  });

  // Cập nhật giá trị vào phần tử HTML khi có sự thay đổi
  quantityElement.innerHTML = `
    <a href="thanhtoan.html" class="menu-shopping">
      <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
      </svg>
      <span>${totalQuantity}</span>
    </a>
  `;
}

renderCart();

// Hàm sửa số lượng sản phẩm trong giỏ hàng
function editCartItem(slug) {
  const existingProductIndex = findCartItemIndex(slug);

  if (existingProductIndex !== -1) {
    const newQuantity = parseInt(prompt("Enter new quantity:"));
    if (!isNaN(newQuantity)) {
      cartItems[existingProductIndex].quantity = newQuantity;
      renderCart();
    } else {
      alert("Invalid quantity");
    }
  } else {
    alert("Product not found in cart");
  }

  // Lưu giá trị cartItems lên Local Storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function deleteCartItem(slug) {
  const existingProductIndex = findCartItemIndex(slug);

  if (existingProductIndex !== -1) {
    cartItems.splice(existingProductIndex, 1);
    renderCart();
  } else {
    alert("Product not found in cart");
  }

  // Lưu giá trị cartItems lên Local Storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
