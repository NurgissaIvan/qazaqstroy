document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    if (!login || !password) {
      errorMessage.textContent = 'Пожалуйста, заполните все поля';
      errorMessage.style.display = 'block';
      return;
    }

    if (login === 'admin' && password === 'admin') {
      window.location.href = '../documents/documents.html';
    } else {
      try {
        const response = await fetch('http://localhost:3000/login_form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ login, password })
        });

        if (response.ok) {
          window.location.href = '../documents/documents.html';
        } else {
          const errorText = await response.text();
          if (errorText === 'Login failed') {
            errorMessage.textContent = 'Неправильный логин или пароль';
          } else {
            errorMessage.textContent = 'Произошла ошибка, пожалуйста, попробуйте еще раз';
          }
          errorMessage.style.display = 'block';
        }
      } catch (err) {
        console.error('Error:', err);
        errorMessage.textContent = 'Произошла ошибка, пожалуйста, попробуйте еще раз';
        errorMessage.style.display = 'block';
      }
    }
  });
});
