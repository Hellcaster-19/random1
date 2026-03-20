import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const AuthPage = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.tab || 'login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');
        setError('');
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        resetForm();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);
        if (result.success) {
            navigate('/home');
        } else {
            setError(result.message || 'Failed to login');
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setIsLoading(true);

        const result = await register(name, email, password);
        if (result.success) {
            navigate('/home');
        } else {
            setError(result.message || 'Failed to register');
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Background decorative elements */}
            <div className="auth-glow auth-glow-1"></div>
            <div className="auth-glow auth-glow-2"></div>
            <div className="auth-glow auth-glow-3"></div>

            {/* Auth Card */}
            <div className="auth-glass-card">
                {/* Logo & Title */}
                <div className="auth-brand">
                    <span className="auth-brand-icon">🎉</span>
                    <h1 className="auth-brand-title">Happiness Campaign</h1>
                    <p className="auth-brand-subtitle">Spread joy. Join the ride.</p>
                </div>

                {/* Tab Switcher */}
                <div className="auth-tab-switcher">
                    <button
                        className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => switchTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => switchTab('register')}
                    >
                        Register
                    </button>
                </div>

                {/* Error Display */}
                {error && <div className="auth-error">{error}</div>}

                {/* Login Form */}
                {activeTab === 'login' && (
                    <form onSubmit={handleLogin} className="auth-premium-form">
                        <div className="auth-input-group">
                            <label>Email</label>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">✉️</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                        <div className="auth-input-group">
                            <div className="auth-input-label-row">
                                <label>Password</label>
                                <a href="#" className="auth-forgot-link">Forgot Password?</a>
                            </div>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">🔒</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                            {!isLoading && <span className="auth-btn-arrow">→</span>}
                        </button>
                    </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                    <form onSubmit={handleRegister} className="auth-premium-form">
                        <div className="auth-input-group">
                            <label>Name</label>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">👤</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>
                        <div className="auth-input-group">
                            <label>Email</label>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">✉️</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                        <div className="auth-input-group">
                            <label>Password</label>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">🔒</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>
                        <div className="auth-input-group">
                            <label>Confirm Password</label>
                            <div className="auth-input-wrapper">
                                <span className="auth-input-icon">🔒</span>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>
                        <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                            {!isLoading && <span className="auth-btn-arrow">→</span>}
                        </button>
                    </form>
                )}

                {/* Social Login Divider */}
                <div className="auth-divider">
                    <div className="auth-divider-line"></div>
                    <span className="auth-divider-text">Or continue with</span>
                    <div className="auth-divider-line"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="auth-social-grid">
                    <button className="auth-social-btn" type="button">
                        <svg className="auth-social-icon" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </button>
                    <button className="auth-social-btn" type="button">
                        <svg className="auth-social-icon" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#ffffff"/>
                        </svg>
                        GitHub
                    </button>
                </div>

                {/* Footer */}
                <p className="auth-card-footer">
                    © 2024 Happiness Campaign. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
