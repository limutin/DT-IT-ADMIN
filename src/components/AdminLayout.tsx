import { useState } from 'react';
import type { FC } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Quote, LogOut, ExternalLink, AlertTriangle, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const AdminLayout: FC = () => {
    const location = useLocation();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleConfirmLogout = () => {
        localStorage.removeItem('dt_admin_session');
        window.location.href = '/login';
    };

    const navItems = [
        { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/news', icon: <Newspaper size={20} />, label: 'News & Updates' },
        { path: '/testimonials', icon: <Quote size={20} />, label: 'Testimonials' },
    ];

    return (
        <div className="admin-layout">
            {/* Mobile menu toggle */}
            <button
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
                {/* Animated glow accents */}
                <div className="sidebar-glow sidebar-glow--1" />
                <div className="sidebar-glow sidebar-glow--2" />

                <div className="sidebar-logo-section">
                    <img src={logo} alt="DreamTeam Logo" className="sidebar-logo" />
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={`sidebar-nav-item ${isActive ? 'sidebar-nav-item--active' : ''}`}
                            >
                                <span className="sidebar-nav-icon">{item.icon}</span>
                                <span className="sidebar-nav-label">{item.label}</span>
                                {isActive && <span className="sidebar-nav-indicator" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-bottom">
                    <a
                        href="https://dtitsc.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="sidebar-nav-item sidebar-nav-item--external"
                    >
                        <span className="sidebar-nav-icon"><ExternalLink size={20} /></span>
                        <span className="sidebar-nav-label">View Site</span>
                    </a>
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="sidebar-nav-item sidebar-nav-item--logout"
                    >
                        <span className="sidebar-nav-icon"><LogOut size={20} /></span>
                        <span className="sidebar-nav-label">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h2 className="admin-header-title">
                        {navItems.find(i => i.path === location.pathname)?.label || 'Admin Panel'}
                    </h2>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-icon-wrap">
                            <AlertTriangle size={32} />
                        </div>
                        <h2 className="modal-title">Confirm Logout</h2>
                        <p className="modal-text">Are you sure you want to log out from the admin panel?</p>
                        <div className="modal-actions">
                            <button
                                onClick={handleConfirmLogout}
                                className="modal-btn modal-btn--danger"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="modal-btn modal-btn--cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

                /* ===== Layout ===== */
                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background: #0a0f1c;
                    font-family: 'Inter', sans-serif;
                }

                /* ===== Sidebar ===== */
                .sidebar {
                    position: relative;
                    width: 260px;
                    min-width: 260px;
                    display: flex;
                    flex-direction: column;
                    background: rgba(5, 12, 21, 0.92);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-right: 1px solid rgba(255, 255, 255, 0.06);
                    overflow: hidden;
                    z-index: 50;
                }

                /* Animated glow blobs inside sidebar */
                .sidebar-glow {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(60px);
                    opacity: 0.35;
                }

                .sidebar-glow--1 {
                    width: 180px;
                    height: 180px;
                    top: -40px;
                    left: -40px;
                    background: radial-gradient(circle, rgba(0, 210, 211, 0.5), transparent 70%);
                    animation: glowFloat1 6s ease-in-out infinite;
                }

                .sidebar-glow--2 {
                    width: 160px;
                    height: 160px;
                    bottom: 40px;
                    right: -60px;
                    background: radial-gradient(circle, rgba(0, 180, 220, 0.4), transparent 70%);
                    animation: glowFloat2 7s ease-in-out infinite;
                }

                @keyframes glowFloat1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, 30px) scale(1.1); }
                }

                @keyframes glowFloat2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-15px, -25px) scale(1.15); }
                }

                /* Logo Section */
                .sidebar-logo-section {
                    padding: 24px 20px 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-bottom: 1px solid rgba(0, 210, 211, 0.1);
                    position: relative;
                    z-index: 1;
                }

                .sidebar-logo {
                    width: 100%;
                    max-height: 130px;
                    object-fit: contain;
                }

                /* Navigation */
                .sidebar-nav {
                    flex: 1;
                    padding: 16px 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    position: relative;
                    z-index: 1;
                }

                .sidebar-nav-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    color: rgba(255, 255, 255, 0.45);
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    border: 1px solid transparent;
                    background: transparent;
                    width: 100%;
                    text-align: left;
                }

                .sidebar-nav-item:hover {
                    color: rgba(255, 255, 255, 0.85);
                    background: rgba(0, 210, 211, 0.06);
                    border-color: rgba(0, 210, 211, 0.08);
                }

                .sidebar-nav-item--active {
                    color: #ffffff !important;
                    background: rgba(0, 210, 211, 0.12) !important;
                    border-color: rgba(0, 210, 211, 0.25) !important;
                    box-shadow:
                        0 0 20px rgba(0, 210, 211, 0.08),
                        inset 0 0 20px rgba(0, 210, 211, 0.04);
                }

                .sidebar-nav-item--active .sidebar-nav-icon {
                    color: #00d2d3;
                    filter: drop-shadow(0 0 6px rgba(0, 210, 211, 0.5));
                }

                .sidebar-nav-indicator {
                    position: absolute;
                    right: -13px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 3px;
                    height: 24px;
                    border-radius: 3px 0 0 3px;
                    background: linear-gradient(180deg, #00d2d3, #00b4b5);
                    box-shadow: 0 0 10px rgba(0, 210, 211, 0.6);
                }

                .sidebar-nav-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .sidebar-nav-label {
                    white-space: nowrap;
                }

                /* Bottom section */
                .sidebar-bottom {
                    padding: 12px;
                    border-top: 1px solid rgba(0, 210, 211, 0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    position: relative;
                    z-index: 1;
                }

                .sidebar-nav-item--external:hover {
                    color: #00d2d3;
                }

                .sidebar-nav-item--logout {
                    color: rgba(255, 100, 100, 0.6) !important;
                    font-family: 'Inter', sans-serif;
                }

                .sidebar-nav-item--logout:hover {
                    color: #ff6b6b !important;
                    background: rgba(255, 100, 100, 0.08) !important;
                    border-color: rgba(255, 100, 100, 0.15) !important;
                }

                /* ===== Main Content ===== */
                .admin-main {
                    flex: 1;
                    overflow: auto;
                    background: #f1f5f9;
                    position: relative;
                }

                .admin-header {
                    position: sticky;
                    top: 0;
                    z-index: 40;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    padding: 0 32px;
                    background: #ffffff;
                    border-bottom: 1px solid #e2e8f0;
                }

                .admin-header-title {
                    font-size: 16px;
                    font-weight: 800;
                    color: #0f172a;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .admin-content {
                    padding: 32px;
                }

                /* ===== Modal ===== */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    padding: 16px;
                    animation: fadeIn 0.2s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal-card {
                    width: 100%;
                    max-width: 380px;
                    background: rgba(15, 22, 40, 0.95);
                    border: 1px solid rgba(0, 210, 211, 0.2);
                    border-radius: 16px;
                    padding: 36px 32px;
                    text-align: center;
                    box-shadow:
                        0 0 40px rgba(0, 210, 211, 0.08),
                        0 25px 50px rgba(0, 0, 0, 0.4);
                    animation: modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .modal-icon-wrap {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    background: rgba(255, 100, 100, 0.1);
                    border: 1px solid rgba(255, 100, 100, 0.2);
                    color: #ff6b6b;
                }

                .modal-title {
                    font-size: 18px;
                    font-weight: 800;
                    color: #ffffff;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                }

                .modal-text {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.45);
                    margin-bottom: 28px;
                    line-height: 1.5;
                }

                .modal-actions {
                    display: flex;
                    gap: 12px;
                }

                .modal-btn {
                    flex: 1;
                    padding: 12px 16px;
                    border-radius: 10px;
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    border: 1px solid transparent;
                }

                .modal-btn--danger {
                    background: linear-gradient(135deg, #ff4757, #ff6b6b);
                    color: #ffffff;
                    border-color: rgba(255, 71, 87, 0.3);
                }

                .modal-btn--danger:hover {
                    box-shadow: 0 0 20px rgba(255, 71, 87, 0.3);
                    transform: translateY(-1px);
                }

                .modal-btn--cancel {
                    background: rgba(255, 255, 255, 0.06);
                    color: rgba(255, 255, 255, 0.5);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                .modal-btn--cancel:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.8);
                }

                /* ===== Mobile ===== */
                .mobile-menu-btn {
                    display: none;
                    position: fixed;
                    top: 14px;
                    left: 14px;
                    z-index: 60;
                    width: 44px;
                    height: 44px;
                    border-radius: 10px;
                    background: rgba(8, 14, 28, 0.85);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(0, 210, 211, 0.2);
                    color: #00d2d3;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .mobile-menu-btn:hover {
                    background: rgba(0, 210, 211, 0.1);
                }

                .mobile-overlay {
                    display: none;
                    position: fixed;
                    inset: 0;
                    z-index: 45;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                }

                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: flex;
                    }

                    .mobile-overlay {
                        display: block;
                    }

                    .sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        transform: translateX(-100%);
                        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 4px 0 30px rgba(0, 0, 0, 0.5);
                    }

                    .sidebar--open {
                        transform: translateX(0);
                    }

                    .admin-header {
                        padding-left: 68px;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
