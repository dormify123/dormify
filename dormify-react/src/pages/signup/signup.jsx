import './signup.css'
import {validateSignupForm,loadStoredCredentials} from './signup-validate.jsx'
import {userSignUp} from '../../utils/services/auth';
import BtnSmall from '../../modules/buttons/small/btn-small'
import {useNavigate} from 'react-router-dom';

const Signup = () =>{
    const nav = useNavigate();
    async function form_submit(event){
        event.preventDefault();
        let isValid = validateSignupForm();
        if(isValid){
            let error = await userSignUp(document.getElementById("user_email").value, document.getElementById("user_password").value, document.getElementById("fname").value, document.getElementById("lname").value, document.getElementById("user_location").value);
            console.log(error);
            if(error)
                document.getElementById("signupError").textContent = error.message;
            else 
                nav('/');
        }
    };
    function onLoginClick() {
        nav('/login');
    }
    return(
        <>
        <div className="background-img">
            <form id="signupForm" className="signup-body" autoComplete='on'>
                <div className="container">
                    <h1>Sign Up</h1>
                    <label htmlFor="email">Email </label>
                    <input type="email" id = "user_email" placeholder="Type your email..." name="email" required/>
                    <div id="user_name_input">
                        <label htmlFor="fname" style={{width:'48%',marginRight:'10px'}}>First Name</label>
                        <label htmlFor="lname" style={{width:'40%'}}>Last Name</label>
                        <input type="text" placeholder="First name" style={{width:'40%', marginRight:'10px'}} id="fname" name="fname" required/>
                        <input type="text" style={{width:'40%'}} placeholder="Last name" id="lname" name="lname" required/>
                    </div>
                    <label htmlFor="location">Location</label>
                    <input type = "text" id = "user_location" placeholder='type your location' required></input>
                    <label htmlFor="password">Password</label>
                    <input id ="user_password" type="password" placeholder="Type your password..." name="password" required/>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" placeholder="Type the same password again..." name="confirm_password" required/>
                    {/* <input type="checkbox" name="remember"/> Remember password */}
                    <button type="submit" className="signupbtn" onClick={form_submit} >Sign Up</button>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <p>Already have an account? </p><p className = "routing-button" onClick={onLoginClick}>Login here</p>
                    </div>
                    <p id="signupError" className="error-message"></p>
                </div>
            </form>
        </div>
        </>
    );
};
export default Signup;