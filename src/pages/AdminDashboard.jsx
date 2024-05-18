import React, { useState } from 'react';
import './PagesCSS/AdminDashboard.css';
import BookSoldCard from '../components/BookSoldCard/BookSoldCard';
import SellerDashboardBookListing from '../components/SellerDashboardComponents/SellerDashboardBookListing';
import AdminDashboardBookSold from '../components/AdminDashboardComponents/AdminDashboardBookSold';
import AdminDashboardBookReported from '../components/AdminDashboardComponents/AdminDashboardBookReported';
import SearchUsers from '../components/AdminDashboardComponents/SearchBookListing';
import FundedStudent from '../components/AdminDashboardComponents/StudentFunded';

function AdminDashboard() {
    const [selectedTab, setSelectedTab] = useState('booksSold');

    return (
        <div className="admin-container">
            <h1 className="dashboard-heading">Admin Dashboard</h1>
            <div className="admin-inside-container">
                <div className="tabs_wrapper">
                    <input type="radio" name="tabs" id="tab_1" checked={selectedTab === 'booksSold'} onChange={() => setSelectedTab('booksSold')} />
                    <label className="tab" htmlFor="tab_1">
                        <span className="title">Books Sold</span>
                    </label>
                    <input type="radio" name="tabs" id="tab_2" checked={selectedTab === 'reportedBooks'} onChange={() => setSelectedTab('reportedBooks')} />
                    <label className="tab" htmlFor="tab_2">
                        <span className="title">Reported Books</span>
                    </label>
                    <input type="radio" name="tabs" id="tab_3" checked={selectedTab === 'searchUsers'} onChange={() => setSelectedTab('searchUsers')} />
                    <label className="tab" htmlFor="tab_3">
                        <span className="title">Search Listing</span>
                    </label>
                    <input type="radio" name="tabs" id="tab_4" checked={selectedTab === 'fundedStudents'} onChange={() => setSelectedTab('fundedStudents')} />
                    <label className="tab" htmlFor="tab_4">
                        <span className="title">Funded Students</span>
                    </label>
                    <span className="shape"></span>
                </div>
            </div>
            <div className="tab-content">
                {selectedTab === 'booksSold' && <AdminDashboardBookSold />}
                <div className="centered-container">
                    {selectedTab === 'reportedBooks' && <AdminDashboardBookReported />}
                </div>
                {selectedTab === 'searchUsers' && <SearchUsers />}
                {selectedTab === 'fundedStudents' && <FundedStudent />}
            </div>
        </div>
    );
}

export default AdminDashboard;
