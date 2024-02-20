function validateLoginForm() {
    var username = document.getElementById('loginForm').elements['username'];
    var password = document.getElementById('loginForm').elements['password'];
    var isValid = true;
    var errorMessage = document.getElementById('loginError');
    
    username.style.borderColor = '';
    password.style.borderColor = '';
    errorMessage.textContent = '';

    if (username.value.trim() === '') {
        username.style.borderColor = 'red';
        errorMessage.textContent = 'Username is required';
        isValid = false;
    }

    if (password.value.trim() === '' || password.value.length < 8) {
        password.style.borderColor = 'red';
        errorMessage.textContent = 'Your password must include at least 8 charachters';
        isValid = false;
    }
    if(isValid)
        alert('Successfully logged in');
    return isValid;
}

function validateSignupForm() {
    var username = document.getElementById('signupForm').elements['username'];
    var password = document.getElementById('signupForm').elements['password'];
    var confirmPassword = document.getElementById('signupForm').elements['confirm_password'];
    var isValid = true;
    var errorMessage = document.getElementById('signupError');

    username.style.borderColor = '';
    password.style.borderColor = '';
    confirmPassword.style.borderColor = '';
    errorMessage.textContent = '';

    if (username.value.trim() === '' || password.value.trim() === '' || confirmPassword.value.trim() === '') {
        errorMessage.textContent = 'Missing fields';
        if (username.value.trim() === '') {
            username.style.borderColor = 'red';
        }
        if (password.value.trim() === '') {
            password.style.borderColor = 'red';
        }
        if (confirmPassword.value.trim() === '') {
            confirmPassword.style.borderColor = 'red';
        }
        isValid = false;
    }

    if (password.value.length < 8) {
        password.style.borderColor = 'red';
        errorMessage.textContent = 'Your password must include at least 8 charachters';
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        password.style.borderColor = 'red';
        confirmPassword.style.borderColor = 'red';
        errorMessage.textContent = 'Passwords do not match';
        isValid = false;
    }
    if(isValid)
        alert('Successfully signed up');
    return isValid;
}
