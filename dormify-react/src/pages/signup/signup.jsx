import './signup.css'
import BtnSmall from '../../modules/buttons/small/btn-small'
import {useNavigate} from 'react-router-dom';
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
const Signup = () =>{
    const nav = useNavigate();
    function onLoginClick() {
        nav('/login');
    }
    return(
        <>
        <div className="background-img">
            <form id="signuphtmlForm" className="signup-body" autoComplete='on' onSubmit={validateSignupForm}>
                <div className="signup-container">
                    <h1>Sign Up</h1>
                    <label htmlFor="email">User information</label>
                    <input type="email" id = "user_email" placeholder="Type your email..." name="email" required/>
                    <div id="user_name_input">
                        <label htmlFor="fname" style={{width:'48%',marginRight:'10px'}}>First Name</label>
                        <label htmlFor="lname" style={{width:'40%'}}>Last Name</label>
                        <input type="text" placeholder="First name" style={{width:'40%', marginRight:'10px'}} id="fname" name="fname" required/>
                        <input type="text" style={{width:'40%'}} placeholder="Last name" id="lname" name="lname" required/>
                    </div>
                    <label htmlFor="roomnumber">Room number</label>
                    <input type="number" placeholder="Type your room number..." id="roomnumber" name="roomnumber" required/>
                    <label htmlFor="password">Password</label>
                    <input id ="user_password" type="password" placeholder="Type your password..." name="password" required/>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" placeholder="Type the same password again..." name="confirm_password" required/>
                    <input type="checkbox" name="remember"/> Remember password
                    <button type="submit" className="signupbtn" >Sign Up</button>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <p>Already have an account? </p><BtnSmall onClick={onLoginClick}>Login here</BtnSmall>
                    </div>
                    <div id="signupError" className="error-message"></div>
                </div>
            </form>
        </div>
        </>
    );
};
export default Signup;