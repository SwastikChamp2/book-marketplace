import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import Loader from "../Loader/Loader";
import ProductCardforAdmin from "./ProductCardforAdmin";

const AdminDashboardBookReported = () => {
    const auth = getAuth();
    const db = getFirestore();
    const [reportedBooks, setReportedBooks] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchReportedBooks = async () => {
            try {
                const q = query(
                    collection(db, "BookListing"),
                    where("bookReported", ">", 0),
                    orderBy("bookReported", "desc")
                );
                const querySnapshot = await getDocs(q);
                console.log("Query Snapshot:", querySnapshot);
                const books = [];
                querySnapshot.forEach((doc) => {
                    books.push({ id: doc.id, ...doc.data() });
                });
                setReportedBooks(books);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reported books:", error);
                setLoading(false);
            }
        };
        fetchReportedBooks();
    }, [db]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            <h1 className="mt-5">Reported Books</h1>
            <Row>
                {reportedBooks.map((book) => (
                    <ProductCardforAdmin
                        key={book.bookID}
                        title="Reported Books"
                        productItem={{
                            id: book.bookID,
                            discount: (parseInt(((parseInt(book.marketPrice) - parseInt(book.sellingPrice)) / book.marketPrice) * 100)),
                            imgUrl: book.bookPicture,
                            productName: book.bookName,
                            opticalPrice: book.marketPrice,
                            price: book.sellingPrice,
                            bookQuantity: book.bookQuantity,
                            category: book.genre,
                            shortDesc: book.bookDescription,
                            selfPickupOption: book.selfPickupOption,
                            city: book.address.city,
                        }}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default AdminDashboardBookReported;
