import React from 'react';
import { MapPin, Briefcase, Heart, MessageSquare, ShieldCheck, Info } from 'lucide-react';
import './ProfileDetail.css';

import { MOCK_PROFILES } from '../data/profiles';

const ProfileDetail = ({ id, navigateTo, sentInterests, onSendInterest, onMessage }) => {
    // In a real app, fetch by id. Using index 0 for demo if id matches or default.
    const profile = MOCK_PROFILES.find(p => p.id === id) || MOCK_PROFILES[0];

    return (
        <div className="profile-detail-page container">
            <div className="detail-header">
                <button onClick={() => navigateTo('DASHBOARD')} className="back-link-btn">← Back to Dashboard</button>
            </div>

            <div className="detail-layout">
                <div className="detail-main">
                    <div className="profile-hero card">
                        <div className="hero-img">
                            <img src={profile.photo} alt={profile.name} />
                        </div>
                        <div className="hero-content">
                            <div className="name-status">
                                <h1>{profile.name}, {profile.age}</h1>
                                <span className="verified-badge"><ShieldCheck size={16} /> Verified</span>
                            </div>
                            <div className="quick-info">
                                <div className="info-item"><MapPin size={18} /> {profile.location}</div>
                                <div className="info-item"><Briefcase size={18} /> {profile.profession}</div>
                                <div className="info-item"><Info size={18} /> {profile.religion}</div>
                            </div>
                            <div className="hero-actions">
                                <button
                                    className={`btn ${sentInterests.includes(profile.id) ? 'btn-primary' : 'btn-outline'} btn-large`}
                                    onClick={() => onSendInterest(profile.id)}
                                >
                                    <Heart size={20} fill={sentInterests.includes(profile.id) ? 'white' : 'none'} />
                                    {sentInterests.includes(profile.id) ? 'Interest Sent' : 'Send Interest'}
                                </button>
                                <button className="btn btn-outline btn-large" onClick={() => onMessage(profile)}>
                                    <MessageSquare size={20} /> Message
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="detail-sections">
                        <div className="section card">
                            <h3>About Me</h3>
                            <p>{profile.about}</p>
                        </div>

                        <div className="section card">
                            <h3>Lifestyle & Education</h3>
                            <div className="info-grid">
                                <div className="grid-item">
                                    <label>Education</label>
                                    <span>{profile.education}</span>
                                </div>
                                <div className="grid-item">
                                    <label>Height</label>
                                    <span>{profile.height}</span>
                                </div>
                                <div className="grid-item">
                                    <label>Hobbies</label>
                                    <div className="hobby-tags">
                                        {profile.hobbies.map(h => <span key={h} className="tag">{h}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="detail-sidebar">
                    <div className="safety-card card">
                        <h3>Safety Tips</h3>
                        <ul>
                            <li>Never share your password</li>
                            <li>Always meet in public places</li>
                            <li>Report suspicious behavior</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ProfileDetail;
