document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const country = document.getElementById('country').value;
  
    axios.post('http://127.0.0.1:5000/api/register', {
        name,
        email,
        password,
        phone,
        address,
        city,
        district,
        country
      })
      .then(function (response) {
        console.log('Đăng ký thành công');
        // Chuyển hướng đến trang thành công (hoặc trang đăng nhập)
        alert("Đăng ký tài khoản thành công.")
        
      })
      .catch(function (error) {
        console.error(error.response.data);
      });
  });
  