import React, { useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phone.length === 10) {
            setStep(2);
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp === '123456') { // Mock OTP
            onLogin();
        } else {
            alert('Invalid OTP. Use 123456 for demo.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Login to find your perfect match.</p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handlePhoneSubmit}>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <div className="input-with-icon">
                                <Phone size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter 10 digit number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    maxLength={10}
                                    required
                                    className="phone-input"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Get OTP <ArrowRight size={18} />
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="form-group">
                            <label>Verify OTP</label>
                            <input
                                type="text"
                                placeholder="6-digit OTP (Try 123456)"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                maxLength={6}
                                required
                                className="otp-input"
                            />
                            <p className="resend">Didn't get it? <span>Resend OTP</span></p>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Verify & Login
                        </button>
                        <button type="button" className="btn-text" onClick={() => setStep(1)}>
                            Change Phone Number
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
