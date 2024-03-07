const {getUsers, userSignUp} = loadWrapperFunctions(supabase);
window.globalVar = "hello";
document.getElementById("signupForm").addEventListener("submit", function(event){
    event.preventDefault();
    if (validateSignupForm()) {
        console.log('Sign up successful');
    }
});
