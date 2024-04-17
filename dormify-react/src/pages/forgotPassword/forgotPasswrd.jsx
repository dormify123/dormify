import React, { useState } from "react";
import './forgotPassword.css';
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../../utils/services/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the function to reset the password
            await resetPassword(email);
            // Navigate back to the login page after successful reset
            nav('/login');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="forgot-password-body">
            <form onSubmit={handleSubmit} className="container">
                <h1>Forgot Password</h1>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="reset-btn">
                    Reset Password
                </button>
                {errorMessage && <p id="errorMessage">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
