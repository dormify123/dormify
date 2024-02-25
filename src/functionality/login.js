const {getUsers, userLogIn} = loadWrapperFunctions(supabase);
document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    validateLoginForm();
    console.log(window.globalVar);
});
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
        userLogIn();
    return isValid;
}