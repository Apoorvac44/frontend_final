import React from 'react';
import { Heart, Users, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import './LandingPage.css';

const STATS = [
    { value: '5L+', label: 'Profiles' },
    { value: '50K+', label: 'Marriages' },
    { value: '15+', label: 'Years' },
    { value: '98%', label: 'Verified' },
];

const LandingPage = ({ navigateTo }) => {
    return (
        <div className="lp-root">
            {/* Left Panel */}
            <div className="lp-left">
                <div className="lp-brand">
                    <Heart size={32} fill="white" color="white" />
                    <span>Milan Matrimony</span>
                </div>

                <div className="lp-left-content">
                    <div className="lp-tag">🇮🇳 India's Most Trusted Matrimony</div>
                    <h1>
                        Begin Your<br />
                        Journey to<br />
                        <span>Forever Love</span>
                    </h1>
                    <p>
                        Join over 5 lakh verified profiles and find your perfect life partner — someone who shares your values, dreams, and culture.
                    </p>
                    <div className="lp-stats-row">
                        {STATS.map((s, i) => (
                            <div key={i} className="lp-mini-stat">
                                <strong>{s.value}</strong>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lp-trust-row">
                    <span><ShieldCheck size={14} /> 100% Verified</span>
                    <span><Star size={14} /> Premium Matches</span>
                    <span><Users size={14} /> 50K+ Couples</span>
                </div>
            </div>

            {/* Right Panel */}
            <div className="lp-right">
                <div className="lp-card">
                    <div className="lp-card-icon">
                        <Heart size={40} fill="var(--primary-color)" color="var(--primary-color)" />
                    </div>
                    <h2>Find Your Match</h2>
                    <p className="lp-card-sub">Join free and start connecting with compatible profiles today.</p>

                    <div className="lp-card-actions">
                        <button
                            className="lp-reg-btn"
                            onClick={() => navigateTo('REGISTER')}
                        >
                            Create Free Profile <ArrowRight size={18} />
                        </button>
                        <div className="lp-divider"><span>Already a member?</span></div>
                        <button
                            className="lp-login-btn"
                            onClick={() => navigateTo('LOGIN')}
                        >
                            Sign In
                        </button>
                    </div>

                    <p className="lp-browse-link" onClick={() => navigateTo('LANDING')}>
                        Browse profiles without signing up →
                    </p>

                    <div className="lp-card-badges">
                        <span>✔ Free to join</span>
                        <span>✔ Privacy protected</span>
                        <span>✔ No spam</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
