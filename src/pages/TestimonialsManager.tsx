import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, User, Briefcase } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    text: string;
    company: string;
}

const TestimonialsManager: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        text: '',
        company: ''
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setTestimonials(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (editingItem) {
            const { error } = await supabase
                .from('testimonials')
                .update(formData)
                .eq('id', editingItem.id);
            if (!error) {
                setIsModalOpen(false);
                setEditingItem(null);
                fetchTestimonials();
            } else {
                console.error('Update Error:', error);
                alert('Error updating testimonial: ' + error.message);
            }
        } else {
            const { error } = await supabase
                .from('testimonials')
                .insert([formData]);
            if (!error) {
                setIsModalOpen(false);
                setFormData({ name: '', role: '', text: '', company: '' });
                fetchTestimonials();
            } else {
                console.error('Insert Error:', error);
                alert('Error adding testimonial: ' + error.message);
            }
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', id);
            if (!error) fetchTestimonials();
        }
    };

    const openModal = (item?: Testimonial) => {
        if (item) {
            setEditingItem(item);
            setFormData({ name: item.name, role: item.role, text: item.text, company: item.company });
        } else {
            setEditingItem(null);
            setFormData({ name: '', role: '', text: '', company: '' });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-primary uppercase">Manage Testimonials</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-sm font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                    <Plus size={18} />
                    Add Testimonial
                </button>
            </div>

            {loading && !isModalOpen ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 p-8 flex flex-col justify-between group hover:shadow-xl transition-all shadow-sm">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-full text-blue-600">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-primary uppercase leading-tight">{item.name}</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => openModal(item)} className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                                            <Pencil size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <svg className="absolute -top-2 -left-4 h-8 w-8 text-slate-50 italic" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M10 8v8H6c0 4.418 3.582 8 8 8v4c-6.627 0-12-5.373-12-12V8h8zm18 0v8h-4c0 4.418 3.582 8 8 8v4c-6.627 0-12-5.373-12-12V8h8z" />
                                    </svg>
                                    <p className="text-gray-600 italic leading-relaxed relative z-10 pl-6 border-l-2 border-blue-100 mb-6">
                                        "{item.text}"
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-blue-600 font-black uppercase tracking-widest bg-blue-50 px-3 py-1 w-fit">
                                <Briefcase size={12} />
                                {item.company}
                            </div>
                        </div>
                    ))}
                    {testimonials.length === 0 && (
                        <div className="col-span-full bg-white border-2 border-dashed border-gray-200 p-12 text-center">
                            <p className="text-gray-400 font-bold uppercase tracking-widest">No testimonials found. Add your first client feedback!</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-2xl p-8 rounded-sm shadow-2xl">
                        <h2 className="text-xl font-black text-primary uppercase mb-6 tracking-tight">
                            {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-1">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Client Name</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Kerby S. Cruz"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Role / Title</label>
                                    <input
                                        required
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Operations Manager"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Company / Industry</label>
                                    <input
                                        required
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Retail Industry"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Testimonial Text</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.text}
                                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                        placeholder="Type client feedback here..."
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all"
                                >
                                    {loading ? 'Saving...' : editingItem ? 'Update Testimonial' : 'Save Testimonial'}
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

export default TestimonialsManager;
