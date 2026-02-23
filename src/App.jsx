import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ProfileCreation from './pages/ProfileCreation';
import Dashboard from './pages/Dashboard';
import ProfileDetail from './pages/ProfileDetail';
import UserDashboard from './pages/UserDashboard';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import MessageModal from './components/MessageModal';

function App() {
    const [view, setView] = useState('SPLASH');
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [sentInterests, setSentInterests] = useState([]);
    const [messagingProfile, setMessagingProfile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const navigateTo = (newView, id = null) => {
        setView(newView);
        if (id) setSelectedProfileId(id);
        window.scrollTo(0, 0);
    };

    const handleLogin = (profileData = null) => {
        setIsLoggedIn(true);
        if (profileData) setUserProfile(profileData);
        navigateTo('USER_DASHBOARD');
    };

    const handleRegister = (profileData = null) => {
        setIsLoggedIn(true);
        if (profileData) setUserProfile(profileData);
        navigateTo('LANDING');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserProfile(null);
        setSentInterests([]);
        navigateTo('LANDING');
    };

    const handleOpenMessage = (profile) => {
        setMessagingProfile(profile);
    };

    const handleSendInterest = async (id) => {
        const isCurrentlySent = sentInterests.includes(id);

        try {
            const response = await fetch('http://localhost:5000/api/interests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profileId: id, action: isCurrentlySent ? 'unsend' : 'send' })
            });
            const data = await response.json();

            if (data.success) {
                if (isCurrentlySent) {
                    setSentInterests(sentInterests.filter(i => i !== id));
                    // alert('Interest unsent!');
                } else {
                    setSentInterests([...sentInterests, id]);
                    alert('Interest sent successfully!');
                }
            }
        } catch (error) {
            console.error('Error toggling interest:', error);
            // Fallback for demo
            if (isCurrentlySent) {
                setSentInterests(sentInterests.filter(i => i !== id));
            } else {
                setSentInterests([...sentInterests, id]);
                alert('Interest recorded!');
            }
        }
    };

    return (
        <div className="app-container">
            <Navbar currentView={view} navigateTo={navigateTo} isLoggedIn={isLoggedIn} />
            <main>
                {view === 'SPLASH' && <LandingPage navigateTo={navigateTo} />}
                {view === 'LANDING' && <Home navigateTo={navigateTo} sentInterests={sentInterests} onSendInterest={handleSendInterest} isLoggedIn={isLoggedIn} />}
                {view === 'LOGIN' && <Login onLogin={handleLogin} />}
                {view === 'REGISTER' && <ProfileCreation navigateTo={navigateTo} onLogin={handleRegister} />}
                {view === 'DASHBOARD' && <Dashboard navigateTo={navigateTo} sentInterests={sentInterests} onSendInterest={handleSendInterest} onMessage={handleOpenMessage} />}
                {view === 'DETAIL' && <ProfileDetail navigateTo={navigateTo} id={selectedProfileId} sentInterests={sentInterests} onSendInterest={handleSendInterest} onMessage={handleOpenMessage} />}
                {view === 'USER_DASHBOARD' && <UserDashboard navigateTo={navigateTo} sentInterests={sentInterests} onLogout={handleLogout} userProfile={userProfile} />}
            </main>
            {messagingProfile && (
                <MessageModal
                    profile={messagingProfile}
                    onClose={() => setMessagingProfile(null)}
                />
            )}
        </div>
    );
}

export default App;
