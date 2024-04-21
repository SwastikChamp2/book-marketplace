import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Login.css';
import googleLogo from '../../Images/google-logo.png';
import loginImage from '../../Images/login-pic.svg';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase authentication modules

function ForgotPassword() {
    const auth = getAuth(); // Get the authentication service
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [showResetModal, setShowResetModal] = useState(false);

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent successfully
                setShowResetModal(true); // Show the reset password modal
            })
            .catch((error) => {
                // Handle errors
                setError(error.message);
                console.error(error);
            });
    };

    const handleCloseResetModal = () => {
        setShowResetModal(false);
    };

    return (
        <div className="container-fluid p-3 my-5">
            <div className="row d-flex align-items-stretch justify-content-center flex-grow-1">
                <div className="col-6 d-flex align-items-center justify-content-center flex-grow-1">
                    <img src={loginImage} className="img-fluid" alt="Phone image" />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center flex-grow-1">
                    <h1 className="text-center mb-4 align-items-start">Forgot Password</h1>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="center-the-button">
                        <Button className="listing-submit-button" type="button" onClick={handleResetPassword}>Reset Password</Button>
                    </div>
                </div>
            </div>
            <Modal show={showResetModal} onHide={handleCloseResetModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Reset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>A password reset email has been sent to your email address.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseResetModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ForgotPassword;
