import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import BookSoldCard from '../BookSoldCard/BookSoldCard';

const AdminDashboardBookSold = () => {

    const auth = getAuth();
    const db = getFirestore();
    const [bookSoldList, setBookSoldList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookSoldList = async () => {
            try {
                const q = query(collection(db, 'PurchasedBooks'));
                const querySnapshot = await getDocs(q);
                const booksSold = [];
                querySnapshot.forEach((doc) => {
                    booksSold.push(doc.data());
                });
                setBookSoldList(booksSold);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book sold list:', error);
                setLoading(false);
            }
        };
        fetchBookSoldList();
    }, [db]);

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="book-sold-list">
            <div className="container">
                <div className="row">
                    {bookSoldList.length === 0 && <h1 className="no-items product">No books sold yet</h1>}

                    {bookSoldList.map((bookSold) => (
                        <div className="col-md-6 mb-6" key={bookSold.bookID}>
                            <BookSoldCard
                                bookTitle={bookSold.bookName}
                                bookID={bookSold.bookID}
                                orderID={bookSold.orderID}
                                price={bookSold.bookPrice}
                                boughtBy={bookSold.bookbuyer}
                                date={new Date(bookSold.timestamp?.toDate()).toLocaleDateString()}
                                time={new Date(bookSold.timestamp?.toDate()).toLocaleTimeString()}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdminDashboardBookSold;
