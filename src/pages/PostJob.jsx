import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilePlus, MapPin, DollarSign, Briefcase, Zap, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salaryRange: { min: '', max: '' },
        jobType: 'Full-time',
        skillsRequired: '',
        isPremium: false,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const jobData = {
                ...formData,
                skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()),
                salaryRange: {
                    min: Number(formData.salaryRange.min),
                    max: Number(formData.salaryRange.max)
                }
            };

            await API.post('/jobs', jobData);
            toast.success('Job posted successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Post a New Opportunity</h2>
                    <p className="text-slate-400">Find the best talent using our AI-driven matching.</p>
                </div>
            </div>

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Briefcase size={20} className="text-primary" /> Basic Info
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Job Title</label>
                            <input
                                type="text"
                                required
                                className="input-glass w-full"
                                placeholder="e.g. Senior Backend Engineer"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Job Type</label>
                            <select
                                className="input-glass w-full bg-[#1e293b]"
                                value={formData.jobType}
                                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Remote</option>
                                <option>Contract</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    required
                                    className="input-glass w-full pl-10"
                                    placeholder="City, Remote, etc."
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <DollarSign size={20} className="text-secondary" /> Details & Salary
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Min Salary (Annual)</label>
                                <input
                                    type="number"
                                    required
                                    className="input-glass w-full"
                                    placeholder="50000"
                                    value={formData.salaryRange.min}
                                    onChange={(e) => setFormData({ ...formData, salaryRange: { ...formData.salaryRange, min: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Max Salary (Annual)</label>
                                <input
                                    type="number"
                                    required
                                    className="input-glass w-full"
                                    placeholder="120000"
                                    value={formData.salaryRange.max}
                                    onChange={(e) => setFormData({ ...formData, salaryRange: { ...formData.salaryRange, max: e.target.value } })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Required Skills (Comma separated)</label>
                            <input
                                type="text"
                                required
                                className="input-glass w-full"
                                placeholder="React, Node.js, AWS"
                                value={formData.skillsRequired}
                                onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 glass-card space-y-6">
                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border border-primary/20">
                        <div className="flex items-center gap-3">
                            <Zap className="text-primary" />
                            <div>
                                <h4 className="font-bold">Premium Job Post</h4>
                                <p className="text-xs text-slate-400">Boost visibility, add AI ranking, and get 10x more applicants.</p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            className="toggle-glass"
                            checked={formData.isPremium}
                            onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Job Description</label>
                        <textarea
                            required
                            rows="5"
                            className="input-glass w-full"
                            placeholder="Describe the role, responsibilities, and benefits..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <div className="text-sm text-slate-400 italic">
                            {formData.isPremium ? (
                                <span className="text-primary font-bold">Total: $49.00 (Powered by Stripe)</span>
                            ) : (
                                "Standard Post: Free"
                            )}
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-8 py-3 glass rounded-xl hover:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex items-center gap-2 px-12 py-3"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
                                {formData.isPremium ? "Pay & Publish" : "Publish Job Post"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default PostJob;
