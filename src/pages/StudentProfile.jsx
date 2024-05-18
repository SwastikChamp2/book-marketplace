import React, { useEffect, useState } from 'react';
import { Form, Alert, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
} from 'mdb-react-ui-kit';

export default function StudentProfile() {

    const db = getFirestore();
    const { id } = useParams();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const docRef = doc(db, "Students", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSelectedStudent(docSnap.data());
                    setLoading(false);
                } else {
                    console.log("No such document!");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching product: ", error);
                setLoading(false);
            }
        };

        fetchStudent();
        console.log(id);
    }, [db, id]);

    if (loading) {
        return <Loader />;
    }

    const handleFundEducation = async () => {
        try {
            const docRef = doc(db, "Students", id);
            await updateDoc(docRef, {
                isFunded: true
            });
            toast.success("Funding Made Sucessfully");
        } catch (error) {
            console.error("Error funding education: ", error);
        }
    };

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-1">
                <MDBRow>
                    <MDBCol>
                        <h1 className="dashboard-heading">Student Profile</h1>
                        <div style={{ marginBottom: "30px" }}></div>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4" style={{ maxWidth: '300px', margin: 'auto' }}>
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={selectedStudent?.profilePicture || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className=" mb-3"><b>{selectedStudent?.name}</b></p>
                                <p className=" text-muted mb-1"> Amount Needed</p>
                                <p className=" mb-3"> ₹ {selectedStudent?.moneyRequired}</p>

                            </MDBCardBody>
                        </MDBCard>

                        <div className="d-grid gap-2 btn-container">
                            <Button className="listing-submit-button" type="submit" onClick={handleFundEducation}>
                                Fund Education
                            </Button>
                        </div>

                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{selectedStudent?.Name}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Age</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{selectedStudent?.age}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Standard</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{selectedStudent?.standard}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>School/College</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{selectedStudent?.schoolName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>10th Marks</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{selectedStudent?.tenthMarks}%</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>12th Marks</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{selectedStudent?.twelvethMarks}%</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Religion</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{selectedStudent?.religion}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Caste</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{selectedStudent?.caste}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><b>About Me</b> </MDBCardText>
                                        <p>{selectedStudent?.aboutDescription}</p>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><b>Need for Money</b></MDBCardText>
                                        <p>{selectedStudent?.needForMoney}</p>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}