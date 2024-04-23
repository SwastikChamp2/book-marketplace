import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { BsPencilSquare } from 'react-icons/bs';
import { MdLogout } from "react-icons/md";
import { MdSave } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { stateOptions } from '../components/Listing/Listing';
import './PagesCSS/Profile.css';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

export default function ProfilePage() {
  const auth = getAuth(); // Get the authentication service
  const db = getFirestore(); // Initialize Firestore
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Johnatan Smith',
    email: 'example@example.com',
    mobile: '8779405144',
    addressFirstLine: 'Gardenia Complex',
    addressSecondLine: 'Everest World Society',
    streetName: 'Kolshet Road',
    landmark: 'Opposite to Buyer Company',
    district: 'Raigad',
    city: 'Panvel',
    state: 'Maharashtra',
    bankAccountNo: '567456334532',
    bankIFSCCode: 'HDFC76453223',
    upiID: 'swastik@okhdfc.co',
    upiMobileNumber: '8779405144'
  });

  const [state, setState] = useState("");
  const pageTitle = editMode ? "Edit Profile Page" : "Profile Page";

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Check if any required field is empty in edit mode
    if (editMode && Object.values(formData).some(value => value.trim() === '')) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Validation checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    const upimobileRegex = /^\d{10}$/;
    const bankAccountRegex = /^\d{11,17}$/;
    const ifscRegex = /^[A-Za-z]{4}[A-Za-z0-9]{7,13}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!mobileRegex.test(formData.mobile)) {
      toast.error('Please enter a valid mobile number.');
      return;
    }

    if (!bankAccountRegex.test(formData.bankAccountNo)) {
      toast.error('Please enter a valid bank account number.');
      return;
    }

    if (!ifscRegex.test(formData.bankIFSCCode)) {
      toast.error('Please enter a valid IFSC code.');
      return;
    }

    if (!upimobileRegex.test(formData.upiMobileNumber)) {
      toast.error('Please enter a valid UPI mobile number.');
      return;
    }

    // After saving, set edit mode to false
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Logout successful
        alert('Logged out successfully');
      })
      .catch((error) => {
        // Handle logout error
        alert('Error logging out:', error);
      });
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setRegisterAsSeller(value);
    setUserData(prevData => ({
      ...prevData,
      isBookSeller: value === 'yes'
    }));
  };


  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-1">


        <MDBRow className="align-items-spaced-between">
          <MDBCol>
            <h2 className="mb-3 listing-form-heading">
              {pageTitle} &nbsp; &nbsp;
              <span>
                {editMode ? (
                  <a href="#" onClick={handleSaveClick} className="edit-button">
                    <BsPencilSquare className="text-secondary pencil-icon" size={24} />
                  </a>
                ) : (
                  <a href="#" onClick={handleEditClick} className="edit-button">
                    <BsPencilSquare className="text-secondary pencil-icon" size={24} />
                  </a>
                )}
              </span>
            </h2>
          </MDBCol>
          <MDBCol className="text-end">
            <a href="#" onClick={handleLogout} className="logout-button">
              <MdLogout size={24} className="logout-icon" />
              <span className="logout-text">Logout</span>
            </a>

          </MDBCol>
        </MDBRow>

        {/* <div>
          <label>
            Register As a Book Seller:
            <input
              type="radio"
              value="yes"
              checked={registerAsSeller === 'yes'}
              onChange={handleRadioChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={registerAsSeller === 'no'}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div> */}

        <Form.Label>Do you want to Register as Book Seller?</Form.Label>
        <div>
          <div className="custom-radio">
            <input
              type="radio"
              value="yes"
              checked={registerAsSeller === 'yes'}
              onChange={handleRadioChange}
              id="yes"
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="custom-radio">
            <input
              type="radio"
              value="no"
              checked={registerAsSeller === 'no'}
              onChange={handleRadioChange}
              id="no"
            />
            <label htmlFor="no">No</label>
          </div>
        </div>

        <br /> <br />


        <MDBRow>
          <MDBCol lg="8" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="fullName"

                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="email"
                      name="email"

                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile Number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput

                      inputMode="text"
                      name="mobile"

                      value={formData.mobile}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                      pattern="[0-9]*" // Use a regex pattern to accept only numbers
                      onInvalid={() => {
                        if (editMode) {
                          alert('Please enter a valid number.');
                        }
                      }}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address First Line</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="addressFirstLine"

                      value={formData.addressFirstLine}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address Second Line</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="addressSecondLine"

                      value={formData.addressSecondLine}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Street Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="streetName"

                      value={formData.streetName}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Landmark</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="landmark"

                      value={formData.landmark}
                      onChange={handleChange}
                      disabled={!editMode}

                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>District</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="district"

                      value={formData.district}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>City</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="city"

                      value={formData.city}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>State/Union Territory</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {editMode ? (
                      <Form.Group className="mb-3" controlId="formAddressState">
                        <Form.Select onChange={(e) => setState(e.target.value)} required value={state}>
                          {stateOptions.map((option, index) => (
                            <option key={index} value={option}>{option || 'Select State/Union Territory'}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    ) : (
                      <Form.Control type="text" value={state} readOnly style={{ backgroundColor: '#e9ecef' }} />
                    )}
                  </MDBCol>
                </MDBRow>


                {/* FOR BOOK SELLERS ONLY STARTS*/}

                {isBookSeller && (
                  <>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Bank Account No.</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="bankAccountNo"

                      value={formData.bankAccountNo}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Bank IFSC Code</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="bankIFSCCode"

                      value={formData.bankIFSCCode.toUpperCase()}
                      onChange={handleChange}
                      disabled={!editMode}
                      required={editMode}
                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>UPI ID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="upiID"

                      value={formData.upiID}
                      onChange={handleChange}
                      disabled={!editMode}

                    />

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>UPI Mobile Number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="number"
                      name="upiMobileNumber"

                      value={formData.upiMobileNumber}
                      onChange={handleChange}
                      disabled={!editMode}

                    />

                  </MDBCol>
                </MDBRow>

                    {/* FOR BOOK SELLERS ONLY ENDS*/}

                  </>
                )}
                <br />
                <p>Authenticated User: {auth.currentUser.email}</p>

              </MDBCardBody>
            </MDBCard>

            {editMode && (
              <div className="text-center">
                <Button className="listing-submit-button" onClick={handleSaveClick}>
                  Save
                </Button>
              </div>
            )}



          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );

}