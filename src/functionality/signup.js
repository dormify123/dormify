const {getUsers, userSignUp} = loadWrapperFunctions(supabase);
window.globalVar = "hello";
document.getElementById("signupForm").addEventListener("submit", function(event){
    event.preventDefault();
    if (validateSignupForm()) {
        console.log('Sign up successful');
    }
});
function validateSignupForm() {
    var fname = document.getElementById('signupForm').elements['fname'];
    var lname = document.getElementById('signupForm').elements['lname'];
    var password = document.getElementById('signupForm').elements['password'];
    var confirmPassword = document.getElementById('signupForm').elements['confirm_password'];
    var isValid = true;
    var errorMessage = document.getElementById('signupError');

    fname.style.borderColor = '';
    lname.style.borderColor = '';
    password.style.borderColor = '';
    confirmPassword.style.borderColor = '';
    errorMessage.textContent = '';

    if (fname.value.trim() === '' || password.value.trim() === '' || confirmPassword.value.trim() === '') {
        errorMessage.textContent = 'Missing fields';
        if (fname.value.trim() === '') {
            fname.style.borderColor = 'red';
        }
        if (password.value.trim() === '') {
            password.style.borderColor = 'red';
        }
        if (confirmPassword.value.trim() === '') {
            confirmPassword.style.borderColor = 'red';
        }
        isValid = false;
    }
    if (lname.value.trim() === '' || password.value.trim() === '' || confirmPassword.value.trim() === '') {
        errorMessage.textContent = 'Missing fields';
        if (lname.value.trim() === '') {
            lname.style.borderColor = 'red';
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
    {
        userSignUp();
    }
    return isValid;
}

function loadStoredCredentials() {
    var fname = localStorage.getItem('fname');
    var lname = localStorage.getItem('lname');
    var password = localStorage.getItem('password');
    if (fname && lname && password) {
        document.getElementById('loginForm').elements['fname'].value = fname;
        document.getElementById('loginForm').elements['lname'].value = lname;
        document.getElementById('loginForm').elements['password'].value = password;
        document.getElementById('loginForm').elements['remember'].checked = true;
    }
}

window.onload = loadStoredCredentials;