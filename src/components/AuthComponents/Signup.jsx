import React from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Signup.css';


import signupImage from '../../Images/signup-pic.svg';
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
                    <img src={signupImage} class="img-fluid" alt="Phone image" />
                </MDBCol>

                <MDBCol col='6' md='6' className="d-flex flex-column justify-content-center flex-grow-1">

                    <h1 className="text-center mb-4 align-items-start">Signup</h1>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <MDBInput id="name" type="text" size="lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <MDBInput id="email" type="email" size="lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                        <MDBInput id="mobile" type="tel" size="lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <MDBInput id="password" type="password" size="lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <MDBInput id="confirmPassword" type="password" size="lg" />
                    </div>

                    <div className="center-the-button">

                        <Button className="listing-submit-button" type="submit">
                            Signup
                        </Button>

                    </div>


                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Signin;
