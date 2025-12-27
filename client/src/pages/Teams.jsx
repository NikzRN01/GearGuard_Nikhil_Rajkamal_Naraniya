import React from 'react';

export default function Teams() {
	return (
		<div className="container">
			<div className="page-header">
				<div>
					<h1>Teams</h1>
					<p className="muted">Organize crews, roles, and availability.</p>
				</div>
			</div>

			<div className="card-grid">
				<div className="card">
					<p className="muted">Rosters</p>
					<p>Add technicians and managers here.</p>
				</div>
				<div className="card">
					<p className="muted">Assignments</p>
					<p>Map teams to equipment and shifts.</p>
				</div>
			</div>
		</div>
	);
}

