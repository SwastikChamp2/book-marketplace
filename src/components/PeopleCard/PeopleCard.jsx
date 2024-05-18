import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function PeopleCard({ studentData }) {

    const router = useNavigate();

    const handleCardClick = (studentid) => {
        router(`/StudentProfile/${studentid}`);
    };

    const getReligionIcon = (religion) => {
        switch (religion) {
            case 'Hindu':
                return 'fas fa-om';
            case 'Muslim':
                return 'fas fa-star-and-crescent';
            case 'Christian':
                return 'fas fa-cross';
            case 'Sikh':
                return 'fas fa-khanda';
            case 'Jew':
                return 'fas fa-star-of-david';
            case 'Parsi':
                return 'fas fa-fire';
            case 'Atheist':
                return 'fas fa-atom';
            default:
                return 'fas fa-question'; // default icon if religion is not matched
        }
    };


    return (
        <MDBContainer className="py-1" style={{ maxWidth: '280px' }}>

            <MDBRow>
                <MDBCol >
                    <MDBCard className="mb-4">
                        <MDBCardBody className="text-center" onClick={() => handleCardClick(studentData.id)} >
                            <MDBCardImage
                                src={studentData.profilePic}
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid />
                            <p className=" mb-1 mt-1"><b>{studentData.Name}</b></p>

                            <div className="d-flex justify-content-center pt-1">
                                <MDBCardText className="mb-0">
                                    <span className="text-muted small me-2" > <b>10 th:</b></span>
                                    <span className="">{studentData.tenthMarks}</span>
                                </MDBCardText>
                                <MDBCardText className="mb-0">
                                    <span className="text-muted small ms-4 me-2" > <b>12 th:</b></span>
                                    <span className="">{studentData.twelvethMarks}</span>
                                </MDBCardText>
                            </div>

                            <div className="religionAndCasteLabel d-flex justify-content-center pt-1">
                                <MDBCardText className="mb-0">
                                    <MDBIcon fas icon={`${getReligionIcon(studentData.religion)} me-2`} />
                                    <span className="text-muted small">{studentData.religion}</span>
                                </MDBCardText>
                                <MDBCardText className="mb-0">
                                    <span className="ms-4 me-2 small"><b>Caste:</b></span>
                                    <span className="text-muted small">{studentData.caste}</span>
                                </MDBCardText>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>
        </MDBContainer>

    );
}

