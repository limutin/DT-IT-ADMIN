import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Newspaper, Quote, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        newsCount: 0,
        testimonialsCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true });
            const { count: testimonialsCount } = await supabase.from('testimonials').select('*', { count: 'exact', head: true });

            setStats({
                newsCount: newsCount || 0,
                testimonialsCount: testimonialsCount || 0,
            });
            setLoading(false);
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total News', value: stats.newsCount, icon: <Newspaper size={24} />, color: 'bg-blue-500' },
        { label: 'Total Testimonials', value: stats.testimonialsCount, icon: <Quote size={24} />, color: 'bg-emerald-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{card.label}</p>
                            <p className="text-3xl font-black text-primary">{loading ? '...' : card.value}</p>
                        </div>
                        <div className={`${card.color} text-white p-3 rounded-lg shadow-lg`}>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 p-8 shadow-sm">
                <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                    <TrendingUp size={16} className="text-blue-500" />
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => navigate('/news')}
                        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 hover:bg-white hover:border-blue-500 transition-all text-left"
                    >
                        <span className="font-bold text-sm uppercase tracking-wider">Publish New Article</span>
                        <div className="text-blue-500 bg-blue-50 p-2 rounded">
                            <Newspaper size={16} />
                        </div>
                    </button>
                    <button
                        onClick={() => navigate('/testimonials')}
                        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 hover:bg-white hover:border-emerald-500 transition-all text-left"
                    >
                        <span className="font-bold text-sm uppercase tracking-wider">Add Client Feedback</span>
                        <div className="text-emerald-500 bg-emerald-50 p-2 rounded">
                            <Quote size={16} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
