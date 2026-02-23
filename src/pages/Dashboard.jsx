import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, Heart } from 'lucide-react';
import './Dashboard.css';

import { MOCK_PROFILES } from '../data/profiles';

const Dashboard = ({ navigateTo, sentInterests, onSendInterest, onMessage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        minAge: 18,
        maxAge: 40,
        location: '',
        religion: ''
    });
    const [appliedFilters, setAppliedFilters] = useState({ ...filters });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleApplyFilters = () => {
        setAppliedFilters({ ...filters });
    };

    const filteredProfiles = MOCK_PROFILES.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.profession.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAge = p.age >= appliedFilters.minAge && p.age <= appliedFilters.maxAge;
        const matchesLocation = !appliedFilters.location || p.location.toLowerCase() === appliedFilters.location.toLowerCase();
        const matchesReligion = !appliedFilters.religion || p.religion.toLowerCase() === appliedFilters.religion.toLowerCase();

        return matchesSearch && matchesAge && matchesLocation && matchesReligion;
    });

    return (
        <div className="dashboard-page container">
            <aside className="sidebar">
                <div className="filter-card card">
                    <div className="sidebar-header">
                        <Filter size={20} />
                        <h3>Filters</h3>
                    </div>

                    <div className="filter-group">
                        <label>Age Range</label>
                        <div className="range-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.minAge}
                                onChange={(e) => handleFilterChange('minAge', parseInt(e.target.value) || 0)}
                            />
                            <span>to</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.maxAge}
                                onChange={(e) => handleFilterChange('maxAge', parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Location</label>
                        <select value={filters.location} onChange={(e) => handleFilterChange('location', e.target.value)}>
                            <option value="">All Locations</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="pune">Pune</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="jaipur">Jaipur</option>
                            <option value="lucknow">Lucknow</option>
                            <option value="ahmedabad">Ahmedabad</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Religion</label>
                        <select value={filters.religion} onChange={(e) => handleFilterChange('religion', e.target.value)}>
                            <option value="">All Religions</option>
                            <option value="hindu">Hindu</option>
                            <option value="muslim">Muslim</option>
                            <option value="sikh">Sikh</option>
                            <option value="christian">Christian</option>
                            <option value="jain">Jain</option>
                        </select>
                    </div>

                    <button className="btn btn-primary w-full" onClick={handleApplyFilters}>Apply Filters</button>
                    <button className="btn btn-outline w-full mt-2" onClick={() => {
                        const resetFactors = { minAge: 18, maxAge: 40, location: '', religion: '' };
                        setFilters(resetFactors);
                        setAppliedFilters(resetFactors);
                    }}>Reset All</button>
                </div>
            </aside>

            <main className="dashboard-content">
                <div className="search-bar card">
                    <Search size={20} color="var(--text-secondary)" />
                    <input
                        type="text"
                        placeholder="Search by name, profession or interests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="results-info">
                    <h2>Matches for You</h2>
                    <p>Showing {filteredProfiles.length} potential matches</p>
                </div>

                <div className="dashboard-grid">
                    {filteredProfiles.map(profile => (
                        <div key={profile.id} className="profile-card card">
                            <div className="profile-image">
                                <img src={profile.photo} alt={profile.name} />
                            </div>
                            <div className="profile-info">
                                <h3>{profile.name}, {profile.age}</h3>
                                <div className="info-item">
                                    <MapPin size={16} />
                                    <span>{profile.location}</span>
                                </div>
                                <div className="info-item">
                                    <Briefcase size={16} />
                                    <span>{profile.profession}</span>
                                </div>
                                <div className="info-item">
                                    <span className="tag">{profile.religion}</span>
                                </div>
                                <div className="card-actions">
                                    <button onClick={() => navigateTo('DETAIL', profile.id)} className="btn btn-outline btn-sm">View</button>
                                    <button
                                        className={`btn ${sentInterests.includes(profile.id) ? 'btn-primary' : 'btn-outline'} btn-sm`}
                                        onClick={() => onSendInterest(profile.id)}
                                    >
                                        <Heart size={14} fill={sentInterests.includes(profile.id) ? 'white' : 'none'} />
                                        {sentInterests.includes(profile.id) ? 'Sent' : 'Interest'}
                                    </button>
                                    <button className="btn btn-outline btn-sm" onClick={() => onMessage(profile)}>Message</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
