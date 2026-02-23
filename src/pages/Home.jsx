import React, { useState } from 'react';
import { MapPin, Briefcase, Heart } from 'lucide-react';
import './Home.css';

import { MOCK_PROFILES } from '../data/profiles';

const Home = ({ navigateTo, sentInterests, onSendInterest, isLoggedIn }) => {
    // Only show first 6 on home page
    const homeMatches = MOCK_PROFILES.slice(0, 6);
    return (
        <div className="home-page">
            <section className="hero">
                <div className="container">
                    <h1>Find Your Perfect Match</h1>
                    <p>The Most Trusted Matrimony Service for Professionals.</p>
                    <div className="hero-cta">
                        {isLoggedIn ? (
                            <button onClick={() => navigateTo('DASHBOARD')} className="btn btn-primary btn-large">Browse Matches</button>
                        ) : (
                            <button onClick={() => navigateTo('REGISTER')} className="btn btn-primary btn-large">Register Now</button>
                        )}
                    </div>
                </div>
            </section>

            <section className="matches-preview container">
                <div className="section-header">
                    <h2>Profiles for You</h2>
                    <p>Handpicked matches based on your interest.</p>
                </div>

                <div className="match-grid">
                    {homeMatches.map((profile) => (
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
                                <button onClick={() => navigateTo('DETAIL', profile.id)} className="view-link-btn">View Full Profile</button>
                                <button
                                    className={`btn ${sentInterests.includes(profile.id) ? 'btn-primary' : 'btn-outline'} interest-btn`}
                                    onClick={() => onSendInterest(profile.id)}
                                >
                                    <Heart size={18} fill={sentInterests.includes(profile.id) ? 'white' : 'none'} />
                                    {sentInterests.includes(profile.id) ? 'Interest Sent' : 'Send Interest'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="why-us">
                <div className="container">
                    <h2>Why Choose Milan Matrimony?</h2>
                    <div className="features-grid">
                        <div className="feature">
                            <h3>Verified Profiles</h3>
                            <p>Manual verification of every registered user.</p>
                        </div>
                        <div className="feature">
                            <h3>Privacy Control</h3>
                            <p>You decide who sees your photos and details.</p>
                        </div>
                        <div className="feature">
                            <h3>Professional Match</h3>
                            <p>Connect with like-minded educated professionals.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
