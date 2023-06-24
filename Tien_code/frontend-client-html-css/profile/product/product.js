let products = []; // Lưu trữ danh sách sản phẩm

// Function to fetch and display products
async function fetchProducts() {
  const response = await fetch("http://127.0.0.1:5000/api/products");
  products = await response.json();

  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <button onclick="editProduct('${product._id}')">Edit</button>
    <button onclick="deleteProduct('${product._id}')">Delete</button>
`;
    productsContainer.appendChild(productDiv);
  });
}

// Function to add a new product
async function addProduct(event) {
  event.preventDefault();
  const form = document.getElementById("addProductForm");
  const formData = new FormData(form);

  const response = await fetch("http://127.0.0.1:5000/api/products", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    form.reset();
    fetchProducts();
  } else {
    const error = await response.json();
    console.log(error.message);
  }
}

// Function to update a product
async function updateProduct(event) {
  event.preventDefault();
  const editForm = document.getElementById("editProductForm");
  const formData = new FormData(editForm);
  const productId = formData.get("editId");

  formData.set("description", editForm.elements.editDescription.value);
  formData.set("price", editForm.elements.editPrice.value);
  formData.set("category", editForm.elements.editCategory.value);
  formData.set("brand", editForm.elements.editBrand.value);
  formData.set("availability", editForm.elements.editAvailability.value);
  formData.set("rating", editForm.elements.editRating.value);

  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/products/${productId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response.ok) {
      editForm.reset();
      closeEditDialog();
      fetchProducts();
    } else {
      const error = await response.json();
      console.log(error.message);
    }
  } catch (error) {
    console.error(error);
  }
}

function editProduct(productId) {
  const product = products.find((p) => p._id === productId);
  if (product) {
    const editForm = document.getElementById("editProductForm");
    editForm.elements.editId.value = product._id;
    editForm.elements.editName.value = product.name;
    editForm.elements.editDescription.value = product.description;
    editForm.elements.editPrice.value = product.price;
    editForm.elements.editCategory.value = product.category;
    editForm.elements.editBrand.value = product.brand;
    editForm.elements.editAvailability.value = product.availability;
    editForm.elements.editRating.value = product.rating;
    // Set other corresponding values according to your model
    openEditDialog();
  }
}
async function updateProduct(event) {
  event.preventDefault();
  const editForm = document.getElementById("editProductForm");
  const formData = new FormData(editForm);
  const productId = formData.get("editId");

  formData.set("description", editForm.elements.editDescription.value);
  formData.set("price", editForm.elements.editPrice.value);
  formData.set("category", editForm.elements.editCategory.value);
  formData.set("brand", editForm.elements.editBrand.value);
  formData.set("availability", editForm.elements.editAvailability.value);
  formData.set("rating", editForm.elements.editRating.value);

  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/products/${productId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response.ok) {
      editForm.reset();
      closeEditDialog();
      fetchProducts();
    } else {
      const error = await response.json();
      console.log(error.message);
    }
  } catch (error) {
    console.error(error);
  }
}

function editProduct(productId) {
  const product = products.find((p) => p._id === productId);
  if (product) {
    const editForm = document.getElementById("editProductForm");
    editForm.elements.editId.value = product._id;
    editForm.elements.editName.value = product.name;
    editForm.elements.editDescription.value = product.description;
    editForm.elements.editPrice.value = product.price;
    editForm.elements.editCategory.value = product.category;
    editForm.elements.editBrand.value = product.brand;
    editForm.elements.editAvailability.value = product.availability;
    editForm.elements.editRating.value = product.rating;
    // Set other corresponding values according to your model
    openEditDialog();
  }
}

// Lắng nghe sự kiện submit của form và gọi hàm updateProduct
const editForm = document.getElementById("editProductForm");
editForm.addEventListener("submit", updateProduct);

// Function to open the edit dialog
function openEditDialog() {
  editProductDialog.style.display = "block";
}

// Function to close the edit dialog
function closeEditDialog() {
  editProductDialog.style.display = "none";
}

// Add event listener to the update button
editProductForm.addEventListener("submit", updateProduct);

// Function to delete a product
async function deleteProduct(productId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this product?"
  );
  if (confirmDelete) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      fetchProducts();
    } else {
      const error = await response.json();
      console.log(error.message);
    }
  }
}

// Attach event listeners to forms
const addProductForm = document.getElementById("addProductForm");
addProductForm.addEventListener("submit", addProduct);

// Fetch and display products when the page loads
window.addEventListener("load", () => {
  fetchProducts();
});
