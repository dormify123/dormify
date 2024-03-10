import React from "react";
import './login.css';
import BtnSmall from '../../modules/buttons/small/btn-small';
import { useNavigate } from "react-router-dom";
import {userLogin} from '../../utils/services/auth';
const Login = () => {
  function form_submit() {
    userLogin(document.getElementById("user_email").value, document.getElementById("user_password").value);
  };
  const nav = useNavigate();
  function onSignupClick() {
    nav('/signup');
  }
  return (
    <>
    <div className="login-body">
      <form id="loginForm" autoComplete="on">
        <div className="container">
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Type your email"
            id="user_email"
            name="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="user_password"
            type="password"
            placeholder="Type your password..."
            name="password"
            required
          />
          <input type="checkbox" name="remember" /> Remember password
          <button type="submit" className="loginbtn" onClick={form_submit}>
            Login
          </button>
          <div style={{display:'flex', alignItems:'center'}}>
              <p>Dont have an account?</p><BtnSmall onClick={onSignupClick}>Signup</BtnSmall>
          </div>
          <div id="loginError" className="error-message"></div>
        </div>
      </form>
      </div>
    </>
  );
};

export default Login;
