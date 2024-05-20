import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import './BookSoldCardAdmin.css';
import { toast } from 'react-toastify';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

// Card component for Book Sold tab
function BookSoldCardAdmin({ bookTitle, bookID, orderID, price, boughtBy, soldBy, date, time, isPaid }) {


    const db = getFirestore();
    const [buttonState, setButtonState] = useState(isPaid);


    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Text Copied');
    };


    const handleButtonClick = async () => {
        try {
            // Create a query to find the document with the given bookID
            const q = query(collection(db, 'PurchasedBooks'), where('bookID', '==', bookID));
            const querySnapshot = await getDocs(q);

            // Check if a matching document is found
            if (!querySnapshot.empty) {
                // Assuming bookID is unique, so we can take the first result
                const docRef = querySnapshot.docs[0].ref;

                // Update the isPaid field to true
                await updateDoc(docRef, {
                    isPaid: true
                });

                setButtonState(true);
                toast.success('Payment marked as completed.');
            } else {
                toast.error('Book not found.');
            }
        } catch (error) {
            toast.error('Failed to update payment status.');
            console.error("Error updating payment status: ", error);
        }
    };


    return (
        <div className="book-card">
            <h2 className="card-heading">{bookTitle}</h2>
            <div className="card-info">
                <div className="info-row">
                    <span className="secondary-text">BookID:</span>
                    <span>{bookID}</span>
                    <button className="icon-button" onClick={() => copyToClipboard(bookID)}>
                        <FaRegCopy className="grey-copy-icon" />
                    </button>
                </div>
                <div className="info-row">
                    <span className="secondary-text">OrderID:</span>
                    <span>{orderID}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Price:</span>
                    <span>&#8377;{price}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Bought By:</span>
                    <span>{boughtBy}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Sold By:</span>
                    <span>{soldBy}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Date:</span>
                    <span>{date}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Time:</span>
                    <span>{time}</span>
                </div>
                <div className="button-container">
                    <button
                        className={`green-button ${buttonState ? 'disabled' : ''}`}
                        onClick={handleButtonClick}
                        disabled={buttonState}
                    >
                        {buttonState ? 'PAID' : 'PAY'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookSoldCardAdmin;
