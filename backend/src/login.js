document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        // Replace the inline onclick with proper event listener
        const loginButton = loginForm.querySelector('.sup-btn');
        if (loginButton) {
            loginButton.removeAttribute('onclick');
            loginButton.addEventListener('click', validateLogin);
        }
        
        // Add form submission handler
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateLogin();
        });
    }
    
    // Handle forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password a');
    if (forgotPasswordLink) {
        forgotPasswordLink.removeAttribute('onclick');
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            forgotPassword();
        });
    }
});

function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (username === "" || password === "") {
        errorMessage.textContent = "Please enter both username and password.";
        return;
    }
    
    // Clear previous error messages
    errorMessage.textContent = "";
    
    // Show loading state
    const loginButton = document.querySelector('.sup-btn');
    const originalText = loginButton.textContent;
    loginButton.textContent = 'Logging in...';
    loginButton.disabled = true;
    
    // Call API to validate login
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        // For a real app, you would store the authentication token here
        // localStorage.setItem('authToken', data.token);
        
        // Redirect to the recipe page
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = "Invalid username or password.";
    })
    .finally(() => {
        // Reset button state
        loginButton.textContent = originalText;
        loginButton.disabled = false;
    });
}

function forgotPassword() {
    alert("Password recovery feature is not implemented yet.");
    // In a real app, this would redirect to a password recovery page or form
}