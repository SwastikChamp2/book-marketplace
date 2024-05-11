import { useState } from 'react';
import './BookSoldCard.css'
import { FaRegCopy } from "react-icons/fa6";
import { toast } from "react-toastify";

// Card component for Book Sold tab
function BookSoldCard() {
    // Sample data
    const bookDetails = {
        bookTitle: "Sample Book Title",
        bookID: "109302",
        orderID: "679083",
        price: "500",
        boughtBy: "John Doe",
        date: "11 May 2024",
        time: "03:54"
    };

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Text Copied")
    };

    return (
        <div className="book-card">
            <h2 className="card-heading">{bookDetails.bookTitle}</h2>
            <div className="card-info">
                <div className="info-row">
                    <span className="secondary-text">BookID:</span>
                    <span>{bookDetails.bookID}</span>
                    <button className="icon-button" onClick={() => copyToClipboard(bookDetails.bookID)}>
                        <FaRegCopy className="grey-copy-icon" />
                    </button>
                </div>
                <div className="info-row">
                    <span className="secondary-text">OrderID:</span>
                    <span>{bookDetails.orderID}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Price:</span>
                    <span>&#8377;{bookDetails.price}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Bought By:</span>
                    <span>{bookDetails.boughtBy}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Date:</span>
                    <span>{bookDetails.date}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Time:</span>
                    <span>{bookDetails.time}</span>
                </div>
            </div>
        </div>
    );
}

export default BookSoldCard;





