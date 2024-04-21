import React from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Login.css';
import googleLogo from '../../Images/google-logo.png';

import loginImage from '../../Images/login-pic.svg';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';

function Signin() {
    return (
        <MDBContainer fluid className="p-3 my-5">

            <MDBRow className="d-flex align-items-stretch justify-content-center flex-grow-1">

                <MDBCol col='6' md='6' className="d-flex align-items-center justify-content-center flex-grow-1">
                    <img src={loginImage} class="img-fluid" alt="Phone image" />
                </MDBCol>

                <MDBCol col='6' md='6' className="d-flex flex-column justify-content-center flex-grow-1">

                    <h1 className="text-center mb-4 align-items-start">Login</h1>

                    <div className="mb-4">

                        <label htmlFor="email" className="form-label">Email address</label>
                        <MDBInput id="email" type="email" size="lg" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <MDBInput id="password" type="password" size="lg" />
                    </div>

                    <div className="d-flex justify-content-between mx-4 mb-4">
                        <Link to="/signup">Create an Account</Link>
                        <a href="!#">Forgot password?</a>
                    </div>

                    <div className="center-the-button">

                        <Button className="listing-submit-button" type="submit">
                            Sign in
                        </Button>

                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">OR</p>
                    </div>

                    <div className="center-the-button">

                        <Button className="google-btn" type="submit">
                            <img src={googleLogo} alt="Google Logo" className="google-logo" />
                            Sign in with Google
                        </Button>

                    </div>

                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Signin;
