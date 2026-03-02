import type { FC } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Quote, LogOut, ExternalLink } from 'lucide-react';
import logo from '../assets/logo.png';

const AdminLayout: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('dt_admin_session');
        navigate('/login');
    };

    const navItems = [
        { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/news', icon: <Newspaper size={20} />, label: 'News & Updates' },
        { path: '/testimonials', icon: <Quote size={20} />, label: 'Testimonials' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-[#050C15] text-white flex flex-col">
                <div className="p-6 border-b border-white/10 flex flex-col items-center">
                    <img src={logo} alt="DreamTeam Logo" className="w-full h-40 object-contain" />
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-blue-600 text-white'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span className="font-bold text-sm uppercase tracking-wider">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <a
                        href="https://dtitsc.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                    >
                        <ExternalLink size={20} />
                        View Site
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors text-sm font-bold uppercase tracking-wider text-left"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 overflow-auto bg-slate-100">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8">
                    <h2 className="text-lg font-black text-primary uppercase tracking-tight">
                        {navItems.find(i => i.path === location.pathname)?.label || 'Admin Panel'}
                    </h2>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
