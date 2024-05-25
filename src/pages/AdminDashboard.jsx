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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Hard-coded admin IDs and passwords for now
        const admins = [
            { id: '1234', password: '1234' },
            { id: '88226934', password: 'fI6hkRuXIj' },
            { id: '83001513', password: '3cmvu9VBHF' },
            { id: '89278566', password: 'HfIvO3BcSH' },
            { id: '85036902', password: 'iLnnOPgvjn' }

        ];

        // Check if the provided admin ID and password match any in the list
        const matchedAdmin = admins.find(admin => admin.id === adminId && admin.password === password);

        if (matchedAdmin) {
            setIsLoggedIn(true);
        } else {
            alert('Invalid admin ID or password');
        }
    };


    return (
        <div className="admin-container">
            {!isLoggedIn ? (
                <div className="login-container">
                    <h1 className="admin-heading">Sign in to Admin Dashboard</h1>
                    <div className="admin-form-group">
                        <label htmlFor="adminId">Admin ID</label>
                        <input type="text" id="adminId" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="admin-btn-login" onClick={handleLogin}>Sign In</button>
                </div>
            ) : (
                <>
                    <h1 className="admin-heading">Admin Dashboard</h1>
                    <div className="admin-inside-container">
                        <div className="admin-tabs_wrapper">
                            <input type="radio" name="tabs" id="admin_tab_1" checked={selectedTab === 'booksSold'} onChange={() => setSelectedTab('booksSold')} />
                            <label className="admin-tab" htmlFor="admin_tab_1">
                                <span className="title">Books Sold</span>
                            </label>
                            <input type="radio" name="tabs" id="admin_tab_2" checked={selectedTab === 'reportedBooks'} onChange={() => setSelectedTab('reportedBooks')} />
                            <label className="admin-tab" htmlFor="admin_tab_2">
                                <span className="title">Reported Books</span>
                            </label>
                            <input type="radio" name="tabs" id="admin_tab_3" checked={selectedTab === 'searchUsers'} onChange={() => setSelectedTab('searchUsers')} />
                            <label className="admin-tab" htmlFor="admin_tab_3">
                                <span className="title">Search Listing</span>
                            </label>
                            <input type="radio" name="tabs" id="admin_tab_4" checked={selectedTab === 'fundedStudents'} onChange={() => setSelectedTab('fundedStudents')} />
                            <label className="admin-tab" htmlFor="admin_tab_4">
                                <span className="title">Funded Students</span>
                            </label>
                            <span className="admin-shape"></span>
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
                </>
            )}
        </div>
    );
}

export default AdminDashboard;



