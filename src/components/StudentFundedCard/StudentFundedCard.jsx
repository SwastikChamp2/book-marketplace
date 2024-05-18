import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import './StudentFundedCard.css';
import { toast } from 'react-toastify';

// Card component for Book Sold tab
function StudentFundedCard({ ID, Name, Age, SchoolName, FundingAmount, BeneficiaryName, AccountNumber, IFSCCode, contactNumber, contactEmail, investorName, investorEmail, investorMobile }) {
    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Text Copied');
    };

    return (
        <div className="student-funded-card">
            <h2 className="card-heading">{Name}</h2>
            <div className="card-info">
                <div className="info-row">
                    <span className="secondary-text">ID:</span>
                    <span>{ID}</span>
                    <button className="icon-button" onClick={() => copyToClipboard(ID)}>
                        <FaRegCopy className="grey-copy-icon" />
                    </button>
                </div>
                <div className="info-row">
                    <span className="secondary-text">School Name:</span>
                    <span>{SchoolName}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Funding Amount:</span>
                    <span>&#8377;{FundingAmount}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Contact Number:</span>
                    <span>{contactNumber}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Contact Email:</span>
                    <span>{contactEmail}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Beneficiary Name:</span>
                    <span>{BeneficiaryName}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Account Number</span>
                    <span>{AccountNumber}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">IFSC Code</span>
                    <span>{IFSCCode}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Investor Name:</span>
                    <span>{investorName}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Investor Email:</span>
                    <span>{investorEmail}</span>
                </div>
                <div className="info-row">
                    <span className="secondary-text">Investor Number:</span>
                    <span>{investorMobile}</span>
                </div>
            </div>
        </div>
    );
}

export default StudentFundedCard;
