import React from 'react';

export default function WorkCenter() {
    return (
        <div className="container">
            <div className="page-header">
                <div>
                    <h1>Work Center</h1>
                    <p className="muted">Overview of cells, lines, and key assets.</p>
                </div>
            </div>

            <div className="card-grid">
                <div className="card">
                    <p className="muted">Production lines</p>
                    <p>Group related equipment into work centers.</p>
                </div>
                <div className="card">
                    <p className="muted">Status</p>
                    <p>Show uptime, downtime, and alerts here.</p>
                </div>
            </div>
        </div>
    );
}
