import React, { useState } from 'react';
import { Heart, User, MessageCircle, Settings, Bell, Edit3, MapPin, Phone, Mail } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = ({ navigateTo, sentInterests, onLogout, userProfile }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [settings, setSettings] = useState({
        privacyMode: false,
        emailNotifications: true
    });
    const [saveStatus, setSaveStatus] = useState(null);

    const handleDeleteProfile = () => {
        if (window.confirm('Are you ABSOLUTELY sure you want to delete your profile? This action is irreversible.')) {
            setSaveStatus('saving');
            // Simulate deletion
            setTimeout(() => {
                alert('Your profile has been deleted.');
                onLogout();
            }, 1000);
        }
    };

    const handleSaveSettings = () => {
        setSaveStatus('saving');
        // Simulate API call
        setTimeout(() => {
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
        }, 800);
    };

    // User data state — initialized from the real profile if available
    const [userData, setUserData] = useState({
        name: userProfile?.name || 'My Profile',
        completion: userProfile ? 100 : 60,
        location: userProfile?.location || 'Not set',
        profileId: 'MM' + Math.floor(10000 + Math.random() * 90000),
        phone: '+91 XXXXXXXXXX',
        email: userProfile?.interests ? '' : 'Not set',
        religion: userProfile?.religion || 'Not set',
        profession: userProfile?.profession || 'Not set',
        photoUrl: userProfile?.photoUrl || null,
        gender: userProfile?.gender || 'Not set',
        age: userProfile?.age || '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...userData });

    const handleEditToggle = () => {
        setEditData({ ...userData });
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            setUserData({ ...editData });
            setIsEditing(false);
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
        }, 800);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="tab-content card animate-fade-in">
                        <div className="section-header">
                            <h3>{isEditing ? 'Edit Profile Details' : 'My Profile Details'}</h3>
                            {!isEditing && (
                                <button className="edit-icon-btn" onClick={handleEditToggle}>
                                    <Edit3 size={15} /> Edit
                                </button>
                            )}
                        </div>
                        <div className="profile-details-grid">
                            <div className="detail-item">
                                <label>Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    />
                                ) : (
                                    <span>{userData.name}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Profile ID</label>
                                <span>{userData.profileId}</span>
                            </div>
                            <div className="detail-item">
                                <label><Phone size={14} /> Phone</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={editData.phone}
                                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    />
                                ) : (
                                    <span>{userData.phone}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label><Mail size={14} /> Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={editData.email}
                                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    />
                                ) : (
                                    <span>{userData.email}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label><MapPin size={14} /> Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={editData.location}
                                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                    />
                                ) : (
                                    <span>{userData.location}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Religion</label>
                                {isEditing ? (
                                    <select
                                        className="form-input"
                                        value={editData.religion}
                                        onChange={(e) => setEditData({ ...editData, religion: e.target.value })}
                                    >
                                        <option value="Hindu">Hindu</option>
                                        <option value="Muslim">Muslim</option>
                                        <option value="Sikh">Sikh</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Jain">Jain</option>
                                    </select>
                                ) : (
                                    <span>{userData.religion}</span>
                                )}
                            </div>
                        </div>
                        {isEditing && (
                            <div className="edit-actions mt-6">
                                <button
                                    className={`btn btn-primary ${saveStatus === 'saving' ? 'loading' : ''}`}
                                    onClick={handleSaveProfile}
                                    disabled={saveStatus === 'saving'}
                                >
                                    {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button className="btn btn-text ml-4" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        )}
                        {saveStatus === 'success' && !isEditing && (
                            <p className="success-text mt-4 animate-fade-in">Profile updated successfully!</p>
                        )}

                        {!isEditing && (
                            <div className="danger-zone animate-fade-in">
                                <h4>Danger Zone</h4>
                                <p>Once you delete your account, there is no going back. Please be certain.</p>
                                <button className="btn btn-outline btn-sm danger" onClick={handleDeleteProfile}>
                                    Delete My Account
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 'interests':
                return (
                    <div className="tab-content card animate-fade-in">
                        <h3>My Interests Sent ({sentInterests.length})</h3>
                        <div className="interests-list">
                            {sentInterests.length === 0 ? (
                                <div className="empty-state">
                                    <p>You haven't sent any interests yet.</p>
                                    <button className="btn btn-primary" onClick={() => navigateTo('DASHBOARD')}>Find Matches</button>
                                </div>
                            ) : (
                                <div className="sent-interests-grid">
                                    {sentInterests.map(id => (
                                        <div key={id} className="mini-profile-item">
                                            <span>Profile User #{id}</span>
                                            <button className="btn-text danger" onClick={() => {/* handle unsend */ }}>Unsend</button>
                                        </div>
                                    ))}
                                    <button className="btn btn-outline w-full mt-4" onClick={() => navigateTo('DASHBOARD')}>Find More Matches</button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'messages':
                return (
                    <div className="tab-content card animate-fade-in">
                        <h3>My Messages</h3>
                        <div className="empty-state">
                            <MessageCircle size={48} color="#ccc" />
                            <p>No active conversations yet.</p>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="tab-content card animate-fade-in">
                        <h3>Notifications</h3>
                        <div className="notification-item">
                            <Bell size={18} />
                            <div>
                                <p>Welcome to Milan Matrimony! Complete your profile to get better matches.</p>
                                <span className="time">2 hours ago</span>
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="tab-content card animate-fade-in">
                        <h3>Account Settings</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div>
                                    <p className="setting-label">Privacy Mode</p>
                                    <p className="setting-desc">Only visible to premium members</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.privacyMode}
                                    onChange={(e) => setSettings({ ...settings, privacyMode: e.target.checked })}
                                />
                            </div>
                            <div className="setting-item">
                                <div>
                                    <p className="setting-label">Email Notifications</p>
                                    <p className="setting-desc">Get match alerts in your inbox</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                />
                            </div>
                        </div>
                        <div className="settings-footer">
                            <button
                                className={`btn btn-primary mt-4 ${saveStatus === 'saving' ? 'loading' : ''}`}
                                onClick={handleSaveSettings}
                                disabled={saveStatus === 'saving'}
                            >
                                {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
                            </button>
                            {saveStatus === 'success' && (
                                <p className="save-message success-text animate-fade-in">Settings saved successfully!</p>
                            )}
                        </div>

                        <div className="logout-section">
                            <p>Want to take a break?</p>
                            <button className="btn btn-outline logout-btn" onClick={onLogout}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="user-dashboard-page container">
            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <div className="user-profile-card card">
                        <div className="user-avatar">
                            {userData.photoUrl ? (
                                <img src={userData.photoUrl} alt="Avatar" />
                            ) : (
                                <div className="avatar-initials">
                                    {userData.name ? userData.name.charAt(0).toUpperCase() : '?'}
                                </div>
                            )}
                        </div>
                        <h3>{userData.name}</h3>
                        <p className="profile-id">ID: {userData.profileId}</p>
                        <div className="completion-bar">
                            <div className="completion-progress" style={{ width: `${userData.completion}%` }}></div>
                        </div>
                        <p className="completion-text">Profile {userData.completion}% Complete</p>
                        <button className="btn btn-primary w-full mt-4" onClick={handleEditToggle}>Edit Profile</button>
                    </div>

                    <nav className="dashboard-nav">
                        <button
                            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <User size={20} /> My Profile
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'interests' ? 'active' : ''}`}
                            onClick={() => setActiveTab('interests')}
                        >
                            <Heart size={20} /> My Interests ({sentInterests.length})
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                            onClick={() => setActiveTab('messages')}
                        >
                            <MessageCircle size={20} /> Messages
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell size={20} /> Notifications
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            <Settings size={20} /> Settings
                        </button>
                    </nav>
                </aside>

                <main className="dashboard-main-content">
                    <div className="stats-grid">
                        <div className="stat-card card" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
                            <span className="stat-value">124</span>
                            <span className="stat-label">Profile Views</span>
                        </div>
                        <div className="stat-card card" onClick={() => setActiveTab('interests')} style={{ cursor: 'pointer' }}>
                            <span className="stat-value">{sentInterests.length}</span>
                            <span className="stat-label">Interests Sent</span>
                        </div>
                        <div className="stat-card card">
                            <span className="stat-value">5</span>
                            <span className="stat-label">Interests Received</span>
                        </div>
                        <div className="stat-card card">
                            <span className="stat-value">12</span>
                            <span className="stat-label">Shortlisted</span>
                        </div>
                    </div>

                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
