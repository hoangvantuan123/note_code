// Lấy các phần tử DOM
const editProductDialog = document.getElementById('editProductDialog');
const editProductForm = document.getElementById('editProductForm');
const editNameInput = document.getElementById('editName');
const editDescriptionInput = document.getElementById('editDescription');
const editPriceInput = document.getElementById('editPrice');
const editCategoryInput = document.getElementById('editCategory');
const editBrandInput = document.getElementById('editBrand');
const editAvailabilityInput = document.getElementById('editAvailability');
const editRatingInput = document.getElementById('editRating');
const editImageInput = document.getElementById('editImage');

// Function to open the edit dialog and populate the form with product data
function editProduct(productId) {
    const product = products.find(p => p._id === productId);
    if (product) {
        editProductForm.editId.value = product._id;
        editNameInput.value = product.name;
        editDescriptionInput.value = product.description;
        editPriceInput.value = product.price;
        editCategoryInput.value = product.category;
        editBrandInput.value = product.brand;
        editAvailabilityInput.value = product.availability;
        editRatingInput.value = product.rating;
        // Đặt các giá trị khác tương ứng với model
        openEditDialog();
    }
}

// Function to submit the updated product data
async function updateProduct(event) {
    event.preventDefault();
    const productId = editProductForm.editId.value;
    const formData = new FormData(editProductForm);

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            editProductForm.reset();
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

// Function to open the edit dialog
function openEditDialog() {
    editProductDialog.style.display = 'block';
}

// Function to close the edit dialog
function closeEditDialog() {
    editProductDialog.style.display = 'none';
}

// Add event listener to the update button
editProductForm.addEventListener('submit', updateProduct);
