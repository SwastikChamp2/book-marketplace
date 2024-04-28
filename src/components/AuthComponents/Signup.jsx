import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import signupImage from '../../Images/signup-pic.svg';
import { MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { setPersistence, browserLocalPersistence } from "firebase/auth";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const auth = getAuth(); // Get the authentication service
    const db = getFirestore(); // Initialize Firestore
    const navigate = useNavigate();

    // Set the persistence to LOCAL when the component mounts
    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .catch((error) => {
                // Handle any errors in setting persistence
                console.error("Error setting persistence:", error);
            });
    }, []);

    const handleSignup = () => {
        // Regular expression to enforce password criteria
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Check if the password meets the criteria
        if (!passwordRegex.test(password)) {
            setError('Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check if the mobile number has exactly 10 digits
        if (!/^\d{10}$/.test(mobile)) {
            setError('Mobile number must have exactly 10 digits');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Signed up successfully
                setShowSuccessModal(true);
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent
                        // console.log('Email verification sent');

                        // Create user document in Firestore
                        const userDocRef = doc(db, 'Users', email);
                        setDoc(userDocRef, {
                            email: email,
                            password: password, // Empty string in case of Google Sign In
                            name: name, // Empty string in case of Google Sign In
                            mobile: mobile, // Empty string in case of Google Sign In
                            addressFirstLine: '',
                            addressSecondLine: '',
                            streetName: '',
                            landmark: '',
                            district: '',
                            city: '',
                            state: '',
                            bankAccountNo: '',
                            bankIFSCCode: '',
                            upiID: '',
                            upiMobileNumber: '',
                            isBookSeller: false,
                            cart: {},
                        });
                    })
                    .catch((error) => {
                        // Handle errors
                        console.error(error);
                    });
            })
            .catch((error) => {
                // Handle errors
                setError(error.message);
                console.error(error);
            });
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        navigate("/login");

    };

    return (
        <MDBContainer fluid className="p-3 my-5">
            <MDBRow className="d-flex align-items-stretch justify-content-center flex-grow-1">
                <MDBCol col='6' md='6' className="d-flex align-items-center justify-content-center flex-grow-1">
                    <img src={signupImage} className="img-fluid" alt="Phone image" />
                </MDBCol>
                <MDBCol col='6' md='6' className="d-flex flex-column justify-content-center flex-grow-1">
                    <h1 className="text-center mb-4 align-items-start">Signup</h1>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <MDBInput id="name" type="text" size="lg" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <MDBInput id="email" type="email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                        <MDBInput id="mobile" type="tel" size="lg" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <MDBInput id="password" type="password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <MDBInput id="confirmPassword" type="password" size="lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="center-the-button">
                        <Button className="listing-submit-button" type="button" onClick={handleSignup}>Signup</Button>
                    </div>
                    <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                    </div>
                </MDBCol>
            </MDBRow>
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your account has been successfully created.</p>
                    <p>Please check your email for verification instructions.</p>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuccessModal}>
                        <Link to="/login"> Close </Link>
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </MDBContainer>
    );
}

export default Signup;
