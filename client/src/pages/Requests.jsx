import React, { useState } from 'react';

export default function Requests() {
	const [activeTab, setActiveTab] = useState('notes');
	const [showWorksheet, setShowWorksheet] = useState(false);
	const [currentStatus, setCurrentStatus] = useState('in-progress');
	const [alertStatus, setAlertStatus] = useState('in-progress');
	const [formData, setFormData] = useState({
		subject: 'Test activity',
		createdBy: 'Maintenance Forum',
		maintenanceFor: 'equipment',
		equipment: 'Acer Laptop/LP/203/19281928',
		workCenter: '',
		category: 'Computers',
		requestDate: '12/18/2025',
		maintenanceType: 'corrective',
		team: 'Technician',
		internalMaintenance: 'Aka Foster',
		scheduledDate: '12/28/2025 14:30:00',
		duration: '00:00',
		priority: 'medium',
		company: 'My Company (San Francisco)',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const statusPhases = [
		{ id: 'new-request', label: 'New Request' },
		{ id: 'in-progress', label: 'In Progress' },
		{ id: 'repaired', label: 'Repaired' },
		{ id: 'scraped', label: 'Scraped' }
	];

	const getStatusIndex = (statusId) => statusPhases.findIndex(p => p.id === statusId);
	const currentIndex = getStatusIndex(currentStatus);

	return (
		<div className="container">
			<div className="page-header">
				<div>
					<h1>Requests</h1>
					<p className="muted">Submit, triage, and track maintenance work.</p>
				</div>
			</div>

			{/* Top action bar with status timeline */}
			<div className="request-top-bar">
				<button className="btn-new">+ New</button>
				
				<div className="status-timeline">
					{statusPhases.map((phase, idx) => (
						<div key={phase.id} className={`status-phase ${phase.id === currentStatus ? 'active' : idx < currentIndex ? 'completed' : 'pending'}`}>
							<div className="status-phase-dot"></div>
							<span className="status-phase-label">{phase.label}</span>
						</div>
					))}
				</div>

				<button 
					className={`worksheet-btn ${showWorksheet ? 'active' : ''}`}
					onClick={() => setShowWorksheet(!showWorksheet)}
					title="Toggle worksheet comments"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
				</button>
			</div>

			<div className="status-alert-dots">
				<div 
					className={`alert-dot ${alertStatus === 'in-progress' ? 'active' : ''}`}
					onClick={() => setAlertStatus('in-progress')}
					title="In Progress"
					style={{ background: alertStatus === 'in-progress' ? '#ffffff' : 'rgba(255, 255, 255, 0.25)' }}
				></div>
				<div 
					className={`alert-dot ${alertStatus === 'blocked' ? 'active' : ''}`}
					onClick={() => setAlertStatus('blocked')}
					title="Blocked"
					style={{ background: alertStatus === 'blocked' ? '#ff5f52' : 'rgba(255, 95, 82, 0.25)' }}
				></div>
				<div 
					className={`alert-dot ${alertStatus === 'ready' ? 'active' : ''}`}
					onClick={() => setAlertStatus('ready')}
					title="Ready for Next Stage"
					style={{ background: alertStatus === 'ready' ? '#4cd964' : 'rgba(76, 217, 100, 0.25)' }}
				></div>
			</div>

			<div className="request-layout">
				{/* Left panel - Form */}
				<div className="request-form-panel">
					<h2 className="request-title">{formData.subject}</h2>

					<div className="form-section">
						<label>Created By</label>
						<input
							type="text"
							name="createdBy"
							value={formData.createdBy}
							onChange={handleChange}
							className="form-input"
							disabled
						/>
					</div>

					<div className="form-section">
						<label>Maintenance For</label>
						<select
							name="maintenanceFor"
							value={formData.maintenanceFor}
							onChange={handleChange}
							className="form-input"
						>
							<option value="equipment">Equipment</option>
							<option value="work-center">Work Center</option>
						</select>
					</div>

					{formData.maintenanceFor === 'equipment' ? (
						<div className="form-section">
							<label>Equipment</label>
							<input
								type="text"
								name="equipment"
								value={formData.equipment}
								onChange={handleChange}
								className="form-input"
							/>
						</div>
					) : (
						<div className="form-section">
							<label>Work Center</label>
							<select
								name="workCenter"
								value={formData.workCenter}
								onChange={handleChange}
								className="form-input"
							>
								<option value="">Select Work Center</option>
								<option value="assembly-line-1">Assembly Line 1</option>
								<option value="assembly-line-2">Assembly Line 2</option>
								<option value="packaging-unit">Packaging Unit</option>
								<option value="quality-control">Quality Control</option>
								<option value="warehouse">Warehouse</option>
							</select>
						</div>
					)}

					<div className="form-section">
						<label>Category</label>
						<input
							type="text"
							name="category"
							value={formData.category}
							onChange={handleChange}
							className="form-input"
						/>
					</div>

					<div className="form-section">
						<label>Request Date</label>
						<input
							type="text"
							name="requestDate"
							value={formData.requestDate}
							onChange={handleChange}
							className="form-input"
						/>
					</div>

					<div className="form-section">
						<label>Maintenance Type</label>
						<div className="radio-group">
							<label className="radio-label">
								<input
									type="radio"
									name="maintenanceType"
									value="corrective"
									checked={formData.maintenanceType === 'corrective'}
									onChange={handleChange}
								/>
								Corrective
							</label>
							<label className="radio-label">
								<input
									type="radio"
									name="maintenanceType"
									value="preventive"
									checked={formData.maintenanceType === 'preventive'}
									onChange={handleChange}
								/>
								Preventive
							</label>
						</div>
					</div>
				</div>

				{/* Right panel - Details */}
				<div className="request-details-panel">
					<div className="form-section">
						<label>Team</label>
						<input
							type="text"
							name="team"
							value={formData.team}
							onChange={handleChange}
							className="form-input"
						/>
					</div>

					<div className="form-section">
						<label>Internal Maintenance</label>
						<input
							type="text"
							name="internalMaintenance"
							value={formData.internalMaintenance}
							onChange={handleChange}
							className="form-input"
						/>
					</div>

					<div className="form-section">
						<label>Scheduled Date</label>
						<input
							type="datetime-local"
							name="scheduledDate"
							value={formData.scheduledDate}
							onChange={handleChange}
							className="form-input"
						/>
					</div>

					<div className="form-section">
						<label>Duration (hours)</label>
						<input
							type="text"
							name="duration"
							value={formData.duration}
							onChange={handleChange}
							className="form-input"
						/>
					</div>

					<div className="form-section">
						<label>Priority</label>
						<div className="priority-selector">
							<div 
								className={`priority-diamond ${formData.priority === 'low' ? 'active' : ''}`}
								onClick={() => setFormData(prev => ({ ...prev, priority: 'low' }))}
								title="Low Priority"
							></div>
							<div 
								className={`priority-diamond ${formData.priority === 'medium' ? 'active' : ''}`}
								onClick={() => setFormData(prev => ({ ...prev, priority: 'medium' }))}
								title="Medium Priority"
							></div>
							<div 
								className={`priority-diamond ${formData.priority === 'high' ? 'active' : ''}`}
								onClick={() => setFormData(prev => ({ ...prev, priority: 'high' }))}
								title="High Priority"
							></div>
						</div>
					</div>

					<div className="form-section">
						<label>Company</label>
						<input
							type="text"
							name="company"
							value={formData.company}
							onChange={handleChange}
							className="form-input"
						/>
					</div>
				</div>
			</div>

			{/* Worksheet comments section */}
			{showWorksheet && (
				<div className="worksheet-section">
					<div className="worksheet-header">
						<h3>Worksheet Comments</h3>
						<button 
							className="close-btn"
							onClick={() => setShowWorksheet(false)}
							aria-label="Close worksheet"
						>
							×
						</button>
					</div>
					<textarea
						className="worksheet-textarea"
						placeholder="Add worksheet comments here..."
						defaultValue=""
					/>
				</div>
			)}

			{/* Tabs */}
			<div className="tabs-section">
				<div className="tabs-header">
					<button
						className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
						onClick={() => setActiveTab('notes')}
					>
						Notes
					</button>
					<button
						className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
						onClick={() => setActiveTab('instructions')}
					>
						Instructions
					</button>
				</div>
				<div className="tab-content">
					{activeTab === 'notes' && (
						<textarea
							className="notes-textarea"
							placeholder="Add notes here..."
							defaultValue=""
						/>
					)}
					{activeTab === 'instructions' && (
						<textarea
							className="notes-textarea"
							placeholder="Add instructions here..."
							defaultValue=""
						/>
					)}
				</div>
			</div>
		</div>
	);
}


