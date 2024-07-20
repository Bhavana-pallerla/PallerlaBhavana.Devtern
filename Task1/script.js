document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Hardcoded credentials for demonstration
    const validUsername = 'user';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
        alert('Login successful!');
        errorMessage.textContent = '';
        // Redirect or do something upon successful login
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});
