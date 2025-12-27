import React, { useState } from 'react';

export default function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 18)); // December 18, 2025
	const [view, setView] = useState('week');

	// Sample scheduled requests
	const scheduledRequests = [
		{
			id: 1,
			title: 'Competent Mink',
			date: new Date(2025, 11, 18),
			startTime: '14:00',
			endTime: '15:00',
			equipment: 'CNC Machine #3',
			priority: 'medium'
		}
	];

	const getWeekDays = () => {
		const start = new Date(currentDate);
		const day = start.getDay();
		const diff = start.getDate() - day + (day === 0 ? -6 : 1);
		start.setDate(diff);
		
		const days = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(start);
			date.setDate(start.getDate() + i);
			days.push(date);
		}
		return days;
	};

	const getMonthDays = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const days = [];
		
		const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
		for (let i = 0; i < startDay; i++) {
			days.push(null);
		}
		
		for (let i = 1; i <= lastDay.getDate(); i++) {
			days.push(new Date(year, month, i));
		}
		
		return days;
	};

	const timeSlots = Array.from({ length: 15 }, (_, i) => {
		const hour = (i + 6).toString().padStart(2, '0');
		return `${hour}:00`;
	});

	const weekDays = getWeekDays();
	const monthDays = getMonthDays();
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

	const goToToday = () => setCurrentDate(new Date());
	const goToPrevious = () => {
		const newDate = new Date(currentDate);
		if (view === 'week') {
			newDate.setDate(newDate.getDate() - 7);
		} else {
			newDate.setMonth(newDate.getMonth() - 1);
		}
		setCurrentDate(newDate);
	};
	const goToNext = () => {
		const newDate = new Date(currentDate);
		if (view === 'week') {
			newDate.setDate(newDate.getDate() + 7);
		} else {
			newDate.setMonth(newDate.getMonth() + 1);
		}
		setCurrentDate(newDate);
	};

	const goToPreviousMonth = () => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() - 1);
		setCurrentDate(newDate);
	};

	const goToNextMonth = () => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() + 1);
		setCurrentDate(newDate);
	};

	const isToday = (date) => {
		const today = new Date();
		return date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear();
	};

	const getEventPosition = (event) => {
		const [startHour] = event.startTime.split(':').map(Number);
		const [endHour] = event.endTime.split(':').map(Number);
		const top = (startHour - 6) * 50; // Offset by 6 hours (business hours start), 50px per hour
		const height = (endHour - startHour) * 50;
		return { top: `${top}px`, height: `${height}px` };
	};

	return (
		<div className="container">
			<div className="calendar-header">
				<h1>Maintenance Calendar</h1>
				<div className="calendar-controls">
					<button className="calendar-nav-btn" onClick={goToPrevious}>←</button>
					<button className="calendar-nav-btn" onClick={goToToday}>Today</button>
					<button className="calendar-nav-btn" onClick={goToNext}>→</button>
					<select 
						className="calendar-view-select"
						value={view}
						onChange={(e) => setView(e.target.value)}
					>
						<option value="week">Week</option>
						<option value="month">Month</option>
					</select>
				</div>
			</div>

			<div className="calendar-content">
				<div className="calendar-main">
					<div className="calendar-week-info">
						<span className="calendar-month-year">
							{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
						</span>
						<span className="calendar-week-number">Week 51</span>
					</div>

					<div className="calendar-grid">
						<div className="calendar-time-column">
							{timeSlots.map((time) => (
								<div key={time} className="time-slot">{time}</div>
							))}
						</div>

						<div className="calendar-days-grid">
							<div className="calendar-day-headers">
								{weekDays.map((day, idx) => (
									<div key={idx} className="day-header">
										<div className="day-name">{dayNames[day.getDay()]}</div>
										<div className={`day-number ${isToday(day) ? 'today' : ''}`}>
											{day.getDate()}
										</div>
									</div>
								))}
							</div>

							<div className="calendar-week-body">
								{weekDays.map((day, idx) => (
									<div key={idx} className="calendar-day-column">
										{timeSlots.map((time) => (
											<div key={time} className="calendar-time-cell"></div>
										))}
										{scheduledRequests
											.filter(req => 
												req.date.getDate() === day.getDate() &&
												req.date.getMonth() === day.getMonth()
											)
											.map(event => (
												<div
													key={event.id}
													className={`calendar-event priority-${event.priority}`}
													style={getEventPosition(event)}
												>
													{event.title}
												</div>
											))
										}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="calendar-mini">
					<div className="mini-calendar-header">
						<button className="mini-nav-btn" onClick={goToPreviousMonth}>←</button>
						<span className="mini-month-year">
							{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
						</span>
						<button className="mini-nav-btn" onClick={goToNextMonth}>→</button>
					</div>

					<div className="mini-calendar-grid">
						<div className="mini-day-names">
							{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
								<div key={idx} className="mini-day-name">{day}</div>
							))}
						</div>
						<div className="mini-days">
							{monthDays.map((day, idx) => (
								<div 
									key={idx} 
									className={`mini-day ${day ? '' : 'empty'} ${day && isToday(day) ? 'today' : ''} ${day && day.getDate() === currentDate.getDate() ? 'selected' : ''}`}
								>
									{day ? day.getDate() : ''}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

