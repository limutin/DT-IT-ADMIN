import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, Calendar } from 'lucide-react';

interface NewsItem {
    id: string;
    date: string;
    title: string;
    description: string;
    category: string;
}

const NewsManager: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Product Update',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching news:', error);

        if (data) setNews(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (editingItem) {
            const { error } = await supabase
                .from('news')
                .update(formData)
                .eq('id', editingItem.id);
            if (!error) {
                setIsModalOpen(false);
                setEditingItem(null);
                fetchNews();
            } else {
                console.error('Update Error:', error);
                alert('Error updating news: ' + error.message);
            }
        } else {
            const { error } = await supabase
                .from('news')
                .insert([formData]);
            if (!error) {
                setIsModalOpen(false);
                setFormData({ title: '', description: '', category: 'Product Update', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
                fetchNews();
            } else {
                console.error('Insert Error:', error);
                alert('Error adding news: ' + error.message);
            }
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this news item?')) {
            const { error } = await supabase
                .from('news')
                .delete()
                .eq('id', id);
            if (!error) fetchNews();
        }
    };

    const openModal = (item?: NewsItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({ title: item.title, description: item.description, category: item.category, date: item.date });
        } else {
            setEditingItem(null);
            setFormData({ title: '', description: '', category: 'Product Update', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-primary uppercase">Manage News</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-sm font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                    <Plus size={18} />
                    Add News
                </button>
            </div>

            {loading && !isModalOpen ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 p-6 flex flex-col justify-between group hover:shadow-xl transition-all h-full">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 uppercase tracking-widest">{item.category}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal(item)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-black text-primary uppercase leading-tight mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest border-t border-gray-100 pt-4">
                                <Calendar size={12} />
                                {item.date}
                            </div>
                        </div>
                    ))}
                    {news.length === 0 && (
                        <div className="col-span-full bg-white border-2 border-dashed border-gray-200 p-12 text-center">
                            <p className="text-gray-400 font-bold uppercase tracking-widest">No news items found. Add your first update!</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-xl p-8 rounded-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-black text-primary uppercase mb-6 tracking-tight">
                            {editingItem ? 'Edit News' : 'Add New News'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Title</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Category</label>
                                    <input
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Product Update, Events, Service..."
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Date String</label>
                                    <input
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2"
                                >
                                    {loading ? 'Saving...' : editingItem ? 'Update News' : 'Save News'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-100 text-gray-500 px-8 py-3 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsManager;
