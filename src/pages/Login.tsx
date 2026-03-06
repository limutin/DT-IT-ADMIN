import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { User, Lock } from 'lucide-react';

const Login: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Hardcoded Credentials Check
        if (email === 'support@dtitsc.com' && password === 'supportdtit2026') {
            localStorage.setItem('dt_admin_session', 'true');
            window.location.href = '/';
        } else {
            setError('Invalid admin credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Animated background particles */}
            <div className="particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            <div className={`login-card ${mounted ? 'login-card--visible' : ''}`}>
                {/* Left Side - Login Form */}
                <div className="login-form-section">
                    <h1 className="login-title">Login</h1>

                    {error && (
                        <div className="login-error">
                            <span className="login-error-icon">!</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <label className="input-label">Username</label>
                            <div className="input-wrapper">
                                <input
                                    id="login-email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="login-input"
                                    placeholder=""
                                    autoComplete="email"
                                />
                                <User className="input-icon" size={18} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <div className="input-wrapper">
                                <input
                                    id="login-password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="login-input"
                                    placeholder=""
                                    autoComplete="current-password"
                                />
                                <Lock className="input-icon" size={18} />
                            </div>
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="login-button"
                        >
                            {loading ? (
                                <div className="login-spinner" />
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>


                </div>

                {/* Right Side - Welcome Section */}
                <div className="login-welcome-section">
                    <div className="welcome-content">
                        <h2 className="welcome-title">
                            WELCOME<br />BACK!
                        </h2>
                    </div>
                </div>

                {/* Neon glow border effect */}
                <div className="neon-border neon-border--top" />
                <div className="neon-border neon-border--right" />
                <div className="neon-border neon-border--bottom" />
                <div className="neon-border neon-border--left" />
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #050510;
                    font-family: 'Inter', sans-serif;
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                }

                /* Ambient background glow */
                .login-page::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 800px;
                    height: 600px;
                    background: radial-gradient(
                        ellipse at center,
                        rgba(0, 210, 211, 0.08) 0%,
                        rgba(0, 210, 211, 0.03) 40%,
                        transparent 70%
                    );
                    pointer-events: none;
                }

                /* Floating particles */
                .particles {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    overflow: hidden;
                }

                .particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(0, 210, 211, 0.4);
                    border-radius: 50%;
                    animation: floatParticle 5s ease-in-out infinite;
                }

                @keyframes floatParticle {
                    0%, 100% {
                        opacity: 0;
                        transform: translateY(0) scale(0.5);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(-40px) scale(1);
                    }
                }

                /* Login Card */
                .login-card {
                    position: relative;
                    display: flex;
                    width: 100%;
                    max-width: 750px;
                    min-height: 420px;
                    background: rgba(8, 12, 24, 0.95);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow:
                        0 0 30px rgba(0, 210, 211, 0.15),
                        0 0 60px rgba(0, 210, 211, 0.05),
                        inset 0 1px 0 rgba(0, 210, 211, 0.1);
                    border: 1px solid rgba(0, 210, 211, 0.3);
                    opacity: 0;
                    transform: translateY(30px) scale(0.95);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .login-card--visible {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                /* Neon border animation */
                .neon-border {
                    position: absolute;
                    pointer-events: none;
                }

                .neon-border--top {
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #00d2d3, transparent);
                    animation: neonSlideH 3s ease-in-out infinite;
                }

                .neon-border--bottom {
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #00d2d3, transparent);
                    animation: neonSlideH 3s ease-in-out infinite reverse;
                }

                .neon-border--left {
                    top: 0;
                    left: 0;
                    width: 1px;
                    height: 100%;
                    background: linear-gradient(180deg, transparent, #00d2d3, transparent);
                    animation: neonSlideV 3s ease-in-out infinite;
                }

                .neon-border--right {
                    top: 0;
                    right: 0;
                    width: 1px;
                    height: 100%;
                    background: linear-gradient(180deg, transparent, #00d2d3, transparent);
                    animation: neonSlideV 3s ease-in-out infinite reverse;
                }

                @keyframes neonSlideH {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                @keyframes neonSlideV {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                /* Left Side - Form */
                .login-form-section {
                    flex: 1;
                    padding: 48px 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .login-title {
                    font-size: 28px;
                    font-weight: 800;
                    color: #ffffff;
                    margin-bottom: 36px;
                    letter-spacing: -0.5px;
                }

                .login-error {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    padding: 12px 16px;
                    background: rgba(255, 59, 48, 0.1);
                    border: 1px solid rgba(255, 59, 48, 0.3);
                    border-radius: 8px;
                    color: #ff6b6b;
                    font-size: 13px;
                    font-weight: 500;
                    animation: shakeError 0.5s ease-in-out;
                }

                .login-error-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 22px;
                    height: 22px;
                    background: rgba(255, 59, 48, 0.2);
                    border-radius: 50%;
                    font-size: 12px;
                    font-weight: 800;
                    color: #ff6b6b;
                }

                @keyframes shakeError {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    60% { transform: translateX(-4px); }
                    80% { transform: translateX(4px); }
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                }

                .input-label {
                    font-size: 13px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 4px;
                    letter-spacing: 0.3px;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .login-input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1.5px solid rgba(255, 255, 255, 0.15);
                    padding: 10px 40px 10px 0;
                    font-size: 15px;
                    font-family: 'Inter', sans-serif;
                    color: #ffffff;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .login-input:focus {
                    border-bottom-color: #00d2d3;
                    box-shadow: 0 2px 8px rgba(0, 210, 211, 0.15);
                }

                .login-input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }

                .input-icon {
                    position: absolute;
                    right: 4px;
                    color: rgba(255, 255, 255, 0.35);
                    transition: color 0.3s ease;
                }

                .input-wrapper:focus-within .input-icon {
                    color: #00d2d3;
                }

                /* Login Button */
                .login-button {
                    margin-top: 8px;
                    width: 100%;
                    padding: 14px 24px;
                    background: linear-gradient(135deg, #00b4b5, #00d2d3, #00e5c7);
                    border: none;
                    border-radius: 50px;
                    color: #050510;
                    font-family: 'Inter', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .login-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.25),
                        transparent
                    );
                    transition: left 0.5s ease;
                }

                .login-button:hover::before {
                    left: 100%;
                }

                .login-button:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 4px 20px rgba(0, 210, 211, 0.4),
                        0 0 40px rgba(0, 210, 211, 0.15);
                }

                .login-button:active {
                    transform: translateY(0);
                }

                .login-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .login-spinner {
                    width: 22px;
                    height: 22px;
                    border: 2.5px solid rgba(5, 5, 16, 0.2);
                    border-top-color: #050510;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    margin: 0 auto;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                /* Sign Up Link */
                .login-signup {
                    margin-top: 24px;
                    text-align: center;
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.4);
                }

                .login-signup-link {
                    color: #00d2d3;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .login-signup-link:hover {
                    color: #00e5c7;
                    text-shadow: 0 0 10px rgba(0, 210, 211, 0.5);
                }

                /* Right Side - Welcome Section */
                .login-welcome-section {
                    position: relative;
                    width: 280px;
                    min-width: 280px;
                    background: linear-gradient(
                        135deg,
                        rgba(0, 180, 181, 0.15) 0%,
                        rgba(0, 210, 211, 0.35) 50%,
                        rgba(0, 210, 211, 0.55) 100%
                    );
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                /* Diagonal slant overlay */
                .login-welcome-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -60px;
                    width: 100%;
                    height: 100%;
                    background: rgba(8, 12, 24, 0.4);
                    transform: skewX(-8deg);
                    transform-origin: top;
                }

                /* Moving gradient animation */
                .login-welcome-section::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        180deg,
                        transparent 0%,
                        rgba(0, 210, 211, 0.1) 50%,
                        transparent 100%
                    );
                    animation: shimmerWelcome 3s ease-in-out infinite;
                }

                @keyframes shimmerWelcome {
                    0%, 100% {
                        transform: translateY(-100%);
                    }
                    50% {
                        transform: translateY(100%);
                    }
                }

                .welcome-content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                }

                .welcome-title {
                    font-size: 32px;
                    font-weight: 900;
                    color: #ffffff;
                    letter-spacing: 2px;
                    line-height: 1.2;
                    text-shadow:
                        0 0 20px rgba(0, 210, 211, 0.6),
                        0 0 40px rgba(0, 210, 211, 0.3);
                }

                /* Responsive Design */
                @media (max-width: 680px) {
                    .login-card {
                        flex-direction: column;
                        max-width: 420px;
                    }

                    .login-welcome-section {
                        width: 100%;
                        min-width: unset;
                        min-height: 120px;
                        order: -1;
                    }

                    .login-welcome-section::before {
                        transform: skewY(-4deg);
                        left: 0;
                        top: -30px;
                    }

                    .welcome-title {
                        font-size: 24px;
                    }

                    .login-form-section {
                        padding: 32px 28px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;
