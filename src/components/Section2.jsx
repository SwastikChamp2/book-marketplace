import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PeopleCard from "./PeopleCard/PeopleCard";
import { getFirestore, doc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from '../components/Loader/Loader';

const Section2 = ({ title, bgColor }) => {

    const [studentList, setStudentList] = useState([]);
    const auth = getAuth();
    const db = getFirestore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const q = query(collection(db, 'Students'));
                const querySnapshot = await getDocs(q);
                const students = [];
                querySnapshot.forEach((doc) => {
                    students.push(doc.data());
                });
                setStudentList(students);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book sold list:', error);
                setLoading(false);
            }
        };
        fetchStudents();
    }, [db]);


    if (loading) {
        return <Loader />;
    }


    return (
        <section style={{ background: bgColor }}>
            <Container>
                <div className="heading">
                    <h1>{title}</h1>
                </div>
                <Row className="justify-content-center">

                    {studentList.map((student) => (

                        <PeopleCard

                            key={student.ProfileID}
                            studentData={{
                                id: student.ProfileID,
                                profilePic: student.profilePicture,
                                Name: student.Name,
                                caste: student.caste,
                                religion: student.religion,
                                tenthMarks: student.tenthMarks,
                                twelvethMarks: student.twelvethMarks,
                            }}

                        />

                    ))}

                </Row>
            </Container>
        </section>
    );
};

export default Section2;
