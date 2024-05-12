import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from '../Loader/Loader';

const SellerDashboardBookListing = () => {

    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();
    const [bookListings, setBookListings] = useState([]);
    const [loading, setLoading] = useState(true);



    const fetchBookListings = async () => {
        try {
            // Get the current user's email
            const currentUserEmail = auth.currentUser.email;
            if (!currentUserEmail) {
                throw new Error("User email not found");
            }

            // Query the BookListing collection to find documents where the bookseller field matches the current user's email
            const q = query(collection(db, "BookListing"), where("bookseller", "==", currentUserEmail));
            const querySnapshot = await getDocs(q);

            // Store the fetched book listings in state
            const bookListingsData = [];
            querySnapshot.forEach((doc) => {
                bookListingsData.push({ id: doc.id, ...doc.data() });
            });
            setBookListings(bookListingsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching book listings:", error);
            setLoading(false);
            toast.error("Failed to fetch book listings");
        }
    };



    useEffect(() => {
        // Check if the user is authenticated
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Fetch user data from Firestore
                fetchBookListings();
            } else {
                // Redirect to login page if user is not authenticated
                navigate('/login');
            }
        });

        // Clean up the subscription
        return () => unsubscribe();
    }, [auth, navigate, db]);


    const handleDeleteBookListing = async (bookId) => {
        try {
            // Delete the document from the BookListing collection
            await deleteDoc(doc(db, "BookListing", bookId));
            // Remove the deleted book listing from the state
            setBookListings(prevBookListings => prevBookListings.filter(item => item.id !== bookId));
            toast.success("Book listing deleted successfully!");
        } catch (error) {
            console.error("Error deleting book listing:", error);
            toast.error("Failed to delete book listing");
        }
    };

    return (
        <section className="cart-items">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        {!loading && bookListings.length === 0 && (
                            <h1 className="no-items product">No book listings found</h1>
                        )}
                        {loading && (
                            <h1 className="no-items product">Loading....</h1>
                        )}
                        {bookListings.map((item) => (
                            <div className="cart-list" key={item.id}>
                                <Row>
                                    <Col className="image-holder" sm={4} md={3}>
                                        <img src={item.bookPicture} alt="" />
                                    </Col>
                                    <Col sm={8} md={9}>
                                        <Row className="cart-content justify-content-center">
                                            <Col xs={12} sm={9} className="cart-details">
                                                <h3>{item.bookName}</h3>
                                                <h4>₹{item.sellingPrice}.00</h4>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <button className="delete" onClick={() => handleDeleteBookListing(item.id)}>
                                        <ion-icon name="close"></ion-icon>
                                    </button>
                                </Row>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SellerDashboardBookListing;
