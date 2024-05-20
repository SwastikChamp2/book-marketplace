import React, { useState } from 'react';
import './PagesCSS/SellerDashboard.css';
import BookSoldCard from '../components/BookSoldCard/BookSoldCard';
import SellerDashboardBookListing from '../components/SellerDashboardComponents/SellerDashboardBookListing';
import SellerDashboardBookSold from '../components/SellerDashboardComponents/SellerDashboardBookSold';

function SellerDashboard() {
    const [selectedTab, setSelectedTab] = useState('myBookListing');

    return (
        <div className="seller-dashboard-container">
            <h1 className="seller-dashboard-heading">Seller Dashboard</h1>
            <div className="seller-dashboard-inside-container">
                <div className="seller-dashboard-tabs-wrapper">
                    <input type="radio" name="seller-dashboard-tabs" id="seller-dashboard-tab-1" checked={selectedTab === 'myBookListing'} onChange={() => setSelectedTab('myBookListing')} />
                    <label className="seller-dashboard-tab" htmlFor="seller-dashboard-tab-1">
                        <span className="title">My Book Listings</span>
                    </label>
                    <input type="radio" name="seller-dashboard-tabs" id="seller-dashboard-tab-2" checked={selectedTab === 'booksSold'} onChange={() => setSelectedTab('booksSold')} />
                    <label className="seller-dashboard-tab" htmlFor="seller-dashboard-tab-2">
                        <span className="title">Books Sold</span>
                    </label>
                    <span className="seller-dashboard-shape"></span>
                </div>
            </div>
            <div className="seller-dashboard-tab-content">
                {selectedTab === 'myBookListing' && <SellerDashboardBookListing />}
                <div className="seller-dashboard-centered-container">
                    {selectedTab === 'booksSold' && <SellerDashboardBookSold />}
                </div>
            </div>
        </div>
    );
}

export default SellerDashboard;
