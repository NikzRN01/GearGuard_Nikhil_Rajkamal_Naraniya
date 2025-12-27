import React, { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../services/api';

export default function Teams() {
    const [showForm, setShowForm] = useState(false);

    const [rows, setRows] = useState([]);

    const [form, setForm] = useState({
        name: '',
        members: '',
        company: 'My Company (San Francisco)',
    });

    // Fetch teams from backend on component mount
    useEffect(() => {
        fetchTeams();
    }, []);

    async function fetchTeams() {
        try {
            const { data } = await api.get('/teams');
            if (data?.success) {
                setRows(data.data);
            }
        } catch (err) {
            console.error('Error fetching teams:', err);
        }
    }

    function openNew() {
        setForm({ name: '', members: '', company: 'My Company (San Francisco)' });
        setShowForm(true);
    }

    function closeNew() {
        setShowForm(false);
    }

    function onChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        try {
            // Create team in backend
            const { data } = await api.post('/teams', {
                name: form.name.trim()
            });

            if (data?.success) {
                // Refresh teams list from backend
                await fetchTeams();
                setShowForm(false);
            }
        } catch (err) {
            console.error('Error creating team:', err);
            alert(err?.response?.data?.message || 'Failed to create team');
        }
    }

    return (
        <div className="container">
            <div className="page-header">
                <div>
                    <h1>Teams</h1>
                    <p className="muted">Manage maintenance teams and members.</p>
                </div>

                <div className="page-actions">
                    <button className="btn-accent" type="button" onClick={openNew}>
                        New
                    </button>
                </div>
            </div>

            <div className="table-wrap">
                <table className="table" style={{ minWidth: 720 }}>
                    <thead>
                        <tr>
                            <th scope="col">Team Name</th>
                            <th scope="col">Team Members</th>
                            <th scope="col">Company</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.id}>
                                <td>{r.name}</td>
                                <td>{r.members || 'No members yet'}</td>
                                <td>{r.company || 'My Company (San Francisco)'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && 
                createPortal(
                <div className="modal-overlay" onMouseDown={closeNew}>
                    <div className="modal-content" onMouseDown={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
                        <h3>New Team</h3>
                        <p>Create a maintenance team.</p>

                        <form id="teamForm" onSubmit={onSubmit}>
                            <div className="input-group">
                                <label>Team Name *</label>
                                <input
                                    className="modal-input"
                                    name="name"
                                    value={form.name}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g., Internal Maintenance"
                                />
                            </div>

                            <div className="input-group">
                                <label>Company *</label>
                                <input
                                    className="modal-input"
                                    name="company"
                                    value={form.company}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g., My Company (San Francisco)"
                                />
                            </div>

                            <div className="input-group">
                                <label>Team Members *</label>
                                <input
                                    className="modal-input"
                                    name="members"
                                    value={form.members}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g., Marc Demo, Maggie Davidson"
                                />
                            </div>

                            <div className="modal-actions">
                                <button className="btn-secondary" type="button" onClick={closeNew}>
                                    Cancel
                                </button>
                                <button className="btn-accent" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

        </div>
    );
}
