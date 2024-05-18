import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import StudentFundedCard from '../StudentFundedCard/StudentFundedCard';

const FundedStudent = () => {

    const auth = getAuth();
    const db = getFirestore();
    const [fundedStudentList, setfundedStudentList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFundedStudentList = async () => {
            try {
                const q = query(collection(db, 'Students'), where('isFunded', '==', true));
                const querySnapshot = await getDocs(q);
                const students = [];
                querySnapshot.forEach((doc) => {
                    students.push(doc.data());
                });
                setfundedStudentList(students);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Student Data:', error);
                setLoading(false);
            }
        };
        fetchFundedStudentList();
    }, [db]);

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="book-sold-list">
            <div className="container">
                <div className="row">
                    {fundedStudentList.length === 0 && <h1 className="no-items product">No Students Funded yet</h1>}

                    {fundedStudentList.map((fundedStudent) => (
                        <div className="col-md-6 mb-6" key={fundedStudent.ProfileID}>
                            <StudentFundedCard
                                ID={fundedStudent.ProfileID}
                                Name={fundedStudent.Name}
                                Age={fundedStudent.age}
                                SchoolName={fundedStudent.SchoolName}
                                FundingAmount={fundedStudent.moneyRequired}
                                BeneficiaryName={fundedStudent.BeneficiaryName}
                                AccountNumber={fundedStudent.BankAccountNumber}
                                IFSCCode={fundedStudent.IFSCCode}
                                contactNumber={fundedStudent.contactNumber}
                                contactEmail={fundedStudent.contactEmail}
                                investorName={fundedStudent.InvestorName}
                                investorEmail={fundedStudent.InvestorEmail}
                                investorMobile={fundedStudent.InvestorMobile}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FundedStudent;
