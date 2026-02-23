import React from 'react';
import { Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ currentView, navigateTo, isLoggedIn }) => {

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <div onClick={() => navigateTo('LANDING')} className="logo" style={{ cursor: 'pointer' }}>
                    <Heart size={28} fill="var(--primary-color)" color="var(--primary-color)" />
                    <span>Milan Matrimony</span>
                </div>
                <div className="nav-links">
                    <button className="nav-btn" onClick={() => navigateTo('LANDING')}>Home</button>
                    <button className="nav-btn" onClick={() => navigateTo('DASHBOARD')}>Search</button>
                    {isLoggedIn ? (
                        <button className="btn btn-primary" onClick={() => navigateTo('USER_DASHBOARD')}>My Dashboard</button>
                    ) : (
                        <>
                            <button className="nav-btn login-link" onClick={() => navigateTo('LOGIN')}>Login</button>
                            <button className="btn btn-primary" onClick={() => navigateTo('REGISTER')}>Register Now</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
