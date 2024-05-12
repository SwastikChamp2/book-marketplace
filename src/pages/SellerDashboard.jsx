import React, { useState } from 'react';
import './PagesCSS/SellerDashboard.css';
import BookSoldCard from '../components/BookSoldCard/BookSoldCard';
import SellerDashboardBookListing from '../components/SellerDashboardComponents/SellerDashboardBookListing';
import SellerDashboardBookSold from '../components/SellerDashboardComponents/SellerDashboardBookSold';

function SellerDashboard() {
    const [selectedTab, setSelectedTab] = useState('myBookListing');


    return (
        <div className="seller-container">
            <h1 className="dashboard-heading">Seller Dashboard</h1>
            <div className="seller-inside-container">
                <div className="tabs_wrapper">
                    <input type="radio" name="tabs" id="tab_1" checked={selectedTab === 'myBookListing'} onChange={() => setSelectedTab('myBookListing')} />
                    <label className="tab" htmlFor="tab_1">
                        <span className="title">My Book Listings</span>
                    </label>
                    <input type="radio" name="tabs" id="tab_2" checked={selectedTab === 'booksSold'} onChange={() => setSelectedTab('booksSold')} />
                    <label className="tab" htmlFor="tab_2">
                        <span className="title">Books Sold</span>
                    </label>
                    <span className="shape"></span>
                </div>
            </div>
            <div className="tab-content">
                {selectedTab === 'myBookListing' && <SellerDashboardBookListing />}
                <div className="centered-container">
                    {selectedTab === 'booksSold' && <SellerDashboardBookSold />}
                </div>
            </div>
        </div>
    );
}

export default SellerDashboard;
