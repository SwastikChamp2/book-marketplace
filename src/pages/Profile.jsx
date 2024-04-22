import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { BsPencilSquare } from 'react-icons/bs';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Johnatan Smith',
    email: 'example@example.com',
    mobile: '(098) 765-4321',
    addressFirstLine: 'Gardenia Complex',
    addressSecondLine: 'Everest World Society',
    streetName: 'Kolshet Road',
    landmark: 'Opposite to Buyer Company',
    district: 'Raigad',
    city: 'Panvel',
    state: 'Maharashtra',
    bankAccountNo: '5674563345',
    bankIFSCCode: 'HDFC76453223',
    upiID: 'swastik@okhdfc.co',
    upiMobileNumber: '8779405144'
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // Add logic to save form data here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-1">
        <h2 className="mb-3 listing-form-heading">
          Profile Page &nbsp; &nbsp;
          <span>
            <a href="#" onClick={handleEditClick}>
              <BsPencilSquare className="text-secondary pencil-icon" size={24} />
            </a>
          </span>
        </h2>
        <MDBRow>
          <MDBCol lg="8" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBInput
                      type="text"
                      name="fullName"
                      label="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="email"
                      label="Email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBInput
                      type="text"
                      name="mobile"
                      label="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="addressFirstLine"
                      label="Address First Line"
                      value={formData.addressFirstLine}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBInput
                      type="text"
                      name="addressSecondLine"
                      label="Address Second Line"
                      value={formData.addressSecondLine}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="streetName"
                      label="Street Name"
                      value={formData.streetName}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBInput
                      type="text"
                      name="landmark"
                      label="Landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="district"
                      label="District"
                      value={formData.district}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBInput
                      type="text"
                      name="city"
                      label="City"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="state"
                      label="State/Union Territory"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBInput
                      type="text"
                      name="bankAccountNo"
                      label="Bank Account No."
                      value={formData.bankAccountNo}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="bankIFSCCode"
                      label="Bank IFSC Code"
                      value={formData.bankIFSCCode}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBInput
                      type="text"
                      name="upiID"
                      label="UPI ID"
                      value={formData.upiID}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="upiMobileNumber"
                      label="UPI Mobile Number"
                      value={formData.upiMobileNumber}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </MDBCol>
                </MDBRow>
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
