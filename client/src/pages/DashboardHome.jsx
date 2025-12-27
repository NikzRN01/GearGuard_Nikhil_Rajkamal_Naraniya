import React from 'react';

const DashboardHome = () => {
  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>Operations Dashboard</h1>
          <p className="muted">At-a-glance status for assets, teams, and maintenance.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <p className="muted">Active assets</p>
          <h2>--</h2>
        </div>
        <div className="card">
          <p className="muted">Open requests</p>
          <h2>--</h2>
        </div>
        <div className="card">
          <p className="muted">Teams on shift</p>
          <h2>--</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
