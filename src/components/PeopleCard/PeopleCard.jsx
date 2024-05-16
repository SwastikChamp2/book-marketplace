import { Col } from "react-bootstrap";
// import "./PeopleCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBIcon } from 'mdb-react-ui-kit';

export default function PeopleCard() {
    return (
        <MDBContainer style={{ maxWidth: '500px' }}>
            <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="p-4">
                    <div className="d-flex text-black">
                        <div className="flex-shrink-0">
                            <MDBCardImage
                                style={{ width: '180px', borderRadius: '10px' }}
                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                                alt='Generic placeholder image'
                                fluid />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <MDBCardTitle>Danny McLoan</MDBCardTitle>
                            <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                <span style={{ marginRight: '20px' }}>18 years</span>
                                <span>Male</span>
                            </div>

                            <div className="d-flex justify-content-center align-items-center rounded-3 p-3 mb-2" style={{ backgroundColor: '#efefef' }}>
                                {/* div1 */}
                                <div className="text-center">
                                    <p className="small text-muted mb-1">Class 10</p>
                                    <p className="mb-0">96%</p>
                                </div>

                                {/* div2 */}
                                <div className="px-3 text-center">
                                    <p className="small text-muted mb-1">Class 12</p>
                                    <p className="mb-0">92%</p>
                                </div>
                            </div>

                            <div className="d-flex pt-1">
                                <MDBCardText className="mb-0">
                                    <MDBIcon fas icon="fas fa-om" /> <span className="text-muted small">Hindu</span>
                                </MDBCardText>

                                <MDBCardText className="mb-0">
                                    <span className="ms-4 me-2 small"><b>Caste:</b></span> <span className="text-muted small">General</span>
                                </MDBCardText>

                            </div>
                        </div>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}