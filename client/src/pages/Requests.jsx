import React from 'react';

export default function Requests() {
	return (
		<div className="container">
			<div className="page-header">
				<div>
					<h1>Requests</h1>
					<p className="muted">Submit, triage, and track maintenance work.</p>
				</div>
			</div>

			<div className="card-grid">
				<div className="card">
					<p className="muted">Open</p>
					<p>Queue of pending requests.</p>
				</div>
				<div className="card">
					<p className="muted">In progress</p>
					<p>Live work with assignees and ETAs.</p>
				</div>
				<div className="card">
					<p className="muted">Completed</p>
					<p>Closed requests history.</p>
				</div>
			</div>
		</div>
	);
}

