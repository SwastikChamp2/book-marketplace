import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import './BookSoldCardSeller.css';
import { toast } from 'react-toastify';

// Card component for Book Sold tab
function BookSoldCardSeller({ bookTitle, bookID, orderID, price, boughtBy, soldBy, date, time, isPaid }) {
    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Text Copied');
    };

    return (
        <div className="book-card">
            {isPaid ? (
                <div className="paid-chip">PAID</div>
            ) : (
                <div className="pending-chip">PENDING</div>
            )}
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
            </div>
        </div>
    );
}

export default BookSoldCardSeller;
