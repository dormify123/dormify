import React from "react";
import './login.css';

const Login = () => {

  return (
    <>
    <div className="login-body">
      <form id="loginForm" autoComplete="on">
        <div className="container">
          <h1>Login</h1>
          <label htmlFor="enail">Email</label>
          <input
            type="text"
            placeholder="Type your email"
            id="email"
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
          <button type="submit" className="loginbtn">
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <a>Sign up here</a>.
          </p>
          <div id="loginError" className="error-message"></div>
        </div>
      </form>
      </div>
    </>
  );
};

export default Login;
