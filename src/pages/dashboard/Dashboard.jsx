import React from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>FlexiTrip Dashboard</h1>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Trips</h3>
                    <p>0</p>
                </div>
                <div className="stat-card">
                    <h3>Active Bookings</h3>
                    <p>0</p>
                </div>
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>0</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;