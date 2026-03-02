import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn } from 'lucide-react';
import logo from '../assets/logo.png';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Hardcoded Credentials Check
        if (email === 'support@dtitsc.com' && password === 'supportdtit2026') {
            localStorage.setItem('dt_admin_session', 'true');
            // Force a reload or handle state change to let App.tsx know
            window.location.href = '/';
        } else {
            setError('Invalid admin credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050C15] p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
                <div className="mb-8 text-center flex flex-col items-center text-primary">
                    <img src={logo} alt="DreamTeam Logo" className="h-32 w-auto mb-4" />
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Admin Login</h1>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">DreamTeam Solutions & Consultancy</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="admin@dreamteam.com"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#050C15] text-white py-4 rounded-sm font-black uppercase text-sm tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <LogIn size={18} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
