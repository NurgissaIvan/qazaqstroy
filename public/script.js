document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/login_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });

      if (response.ok) {
        window.location.href = './documents.html';
      } else {
        const errorText = await response.text();
        if (errorText === 'Login failed') {
          errorMessage.textContent = 'Неправильный логин или пароль';
        } else {
          errorMessage.textContent = 'Неправильный пароль';
        }
        errorMessage.style.display = 'block';
      }
    } catch (err) {
      console.error('Error:', err);
      errorMessage.textContent = 'Ошибка сервера';
      errorMessage.style.display = 'block';
    }
  });
});
