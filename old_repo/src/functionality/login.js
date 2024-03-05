const {getUsers, userLogIn} = loadWrapperFunctions(supabase);
document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    if (validateLoginForm()) {
        console.log('Login successful');
    }
});
function validateLoginForm() {
    var fname = document.getElementById('loginForm').elements['fname'];
    var lname = document.getElementById('loginForm').elements['lname'];
    var password = document.getElementById('loginForm').elements['password'];
    var remember = document.getElementById('loginForm').elements['remember'];
    var isValid = true;
    var errorMessage = document.getElementById('loginError');
    
    fname.style.borderColor = '';
    lname.style.borderColor = '';
    password.style.borderColor = '';
    errorMessage.textContent = '';

    if (fname.value.trim() === '') {
        fname.style.borderColor = 'red';
        errorMessage.textContent = 'Username is required';
        isValid = false;
    }
    if (lname.value.trim() === '') {
        lname.style.borderColor = 'red';
        errorMessage.textContent = 'Username is required';
        isValid = false;
    }

    if (password.value.trim() === '' || password.value.length < 8) {
        password.style.borderColor = 'red';
        errorMessage.textContent = 'Your password must include at least 8 charachters';
        isValid = false;
    }
    if (isValid && remember.checked) {
        localStorage.setItem('fname', fname.value);
        localStorage.setItem('lname', lname.value);
        localStorage.setItem('password', password.value);
    } else {
        localStorage.removeItem('fname');
        localStorage.removeItem('lname');
        localStorage.removeItem('password');
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