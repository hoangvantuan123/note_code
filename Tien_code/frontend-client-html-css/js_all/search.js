function searchProducts() {
    const searchTerm = document.getElementById("searchTerm").value;
  
    fetch("http://localhost:5000/api/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    })
      .then((response) => response.json())
      .then((products) => {
        if (products.length === 0) {
          displayProducts(); // Hiển thị lại danh sách sản phẩm gốc nếu không có kết quả tìm kiếm
        } else {
          displaySearchResults(products); // Hiển thị kết quả tìm kiếm nếu có kết quả
        }
        console.log(products);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      });
  }
  
  function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.style.display = 'block'; // Hiển thị danh sách sản phẩm
    const searchResultsContainer = document.getElementById('search_products');
    searchResultsContainer.style.display = 'none'; // Ẩn kết quả tìm kiếm
  }
  
  function displaySearchResults(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.style.display = 'none'; // Ẩn danh sách sản phẩm
    const searchResultsContainer = document.getElementById('search_products');
    searchResultsContainer.innerHTML = '';
  
    if (products.length === 0) {
      searchResultsContainer.innerHTML = 'Không tìm thấy sản phẩm.';
    } else {
      products.forEach(function (product) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-box');
        productDiv.innerHTML = `
          <div class="">
            <div class="product-wrapper1">
              <div class="imager">
                <a href="#">
                  <img src="${product.image_url}" style="width:100%; height: 100%;" alt="Product Image">
                </a>
              </div>
              <div class="product-in4 py-3">
                <div>
                  <div class="rating">
                    <i class="fa-solid fa-star" style=" color: rgb(235, 235, 33)"></i>
                    <i class="fa-solid fa-star" style=" color:rgb(235, 235, 33)"></i>
                    <i class="fa-solid fa-star" style=" color: rgb(235, 235, 33)"></i>
                    <i class="fa-solid fa-star" style=" color: rgb(235, 235, 33)"></i>
                    <i class="fa-solid fa-star" style=" color: rgb(235, 235, 33)"></i>
                  </div>
                  <div class="name">
                    <a href="#">${product.name}</a>
                  </div>
                  <div class="price">
                    <p> $${product.price}</p>
                  </div>
                  <div class="button-group">
                    <button type="button" class="btn btn-danger">
                      <i class="fa-solid fa-bag-shopping"></i>
                      Mua Hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        searchResultsContainer.appendChild(productDiv);
      });
      searchResultsContainer.style.display = 'block'; // Hiển thị kết quả tìm kiếm
    }
  }