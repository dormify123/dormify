import React, { useState } from "react";
import './forgotPassword.css';
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../../utils/services/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the function to send the password recovery email
            await resetPassword(email);
            // Show success message
            setSuccessMessage('Password recovery email sent successfully. Please check your inbox.');
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
                {successMessage && <p id="successMessage">{successMessage}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
