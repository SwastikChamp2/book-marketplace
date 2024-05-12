import React, { useState } from 'react';
import './PagesCSS/SellerDashboard.css';
import BookSoldCard from '../components/BookSoldCard/BookSoldCard';
import SellerDashboardBookListing from '../components/SellerDashboardComponents/SellerDashboardBookListing';
import AdminDashboardBookSold from '../components/AdminDashboardComponents/AdminDashboardBookSold';
import AdminDashboardBookReported from '../components/AdminDashboardComponents/AdminDashboardBookReported';

function AdminDashboard() {
    const [selectedTab, setSelectedTab] = useState('booksSold');

    return (
        <div className="seller-container">
            <h1 className="dashboard-heading">Admin Dashboard</h1>
            <div className="seller-inside-container">
                <div className="tabs_wrapper">
                    <input type="radio" name="tabs" id="tab_1" checked={selectedTab === 'booksSold'} onChange={() => setSelectedTab('booksSold')} />
                    <label className="tab" htmlFor="tab_1">
                        <span className="title">Books Sold</span>
                    </label>
                    <input type="radio" name="tabs" id="tab_2" checked={selectedTab === 'reportedBooks'} onChange={() => setSelectedTab('reportedBooks')} />
                    <label className="tab" htmlFor="tab_2">
                        <span className="title">Reported Books</span>
                    </label>
                    <span className="shape"></span>
                </div>
            </div>
            <div className="tab-content">
                {selectedTab === 'booksSold' && <AdminDashboardBookSold />}
                <div className="centered-container">
                    {selectedTab === 'reportedBooks' && <AdminDashboardBookReported />}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
