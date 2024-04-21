import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Login.css';
import googleLogo from '../../Images/google-logo.png';
import loginImage from '../../Images/login-pic.svg';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import Firebase authentication modules

function Signin() {
    const auth = getAuth(); // Get the authentication service
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                setShowWelcomeModal(true); // Show the welcome modal
            })
            .catch((error) => {
                // Handle errors
                if (error.code === 'auth/wrong-password') {
                    setError('Wrong password. Please try again.');
                } else {
                    setError(error.message);
                }
                console.error(error);
            });
    };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider(); // Create Google authentication provider
        signInWithPopup(auth, provider) // Sign in with Google
            .then((result) => {
                // Handle successful login
                const user = result.user;
                console.log(user);
                setShowWelcomeModal(true); // Show the welcome modal
            })
            .catch((error) => {
                // Handle errors
                console.error(error);
            });
    };

    const handleCloseWelcomeModal = () => {
        setShowWelcomeModal(false);
    };

    return (
        <div className="container-fluid p-3 my-5">
            <div className="row d-flex align-items-stretch justify-content-center flex-grow-1">
                <div className="col-6 d-flex align-items-center justify-content-center flex-grow-1">
                    <img src={loginImage} className="img-fluid" alt="Phone image" />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center flex-grow-1">
                    <h1 className="text-center mb-4 align-items-start">Login</h1>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="d-flex justify-content-between mx-4 mb-4">
                        <Link to="/signup">Create an Account</Link>
                        <Link to="/Forgotpassword">Forgot Password?</Link>
                    </div>
                    <div className="center-the-button">
                        <Button className="listing-submit-button" type="button" onClick={handleLogin}>Sign in</Button>
                    </div>
                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">OR</p>
                    </div>
                    <div className="center-the-button">
                        <Button className="google-btn" type="button" onClick={handleGoogleSignIn}>
                            <img src={googleLogo} alt="Google Logo" className="google-logo" />
                            Sign in with Google
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={showWelcomeModal} onHide={handleCloseWelcomeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome back!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You have successfully logged in.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseWelcomeModal}>
                    <Link to="/"> Close </Link>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Signin;
