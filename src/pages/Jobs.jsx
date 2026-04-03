import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Filter, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState({ keyword: '', location: '', type: 'all' });

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (search.keyword) query.append('keyword', search.keyword);
            if (search.location) query.append('location', search.location);
            if (search.type !== 'all') query.append('type', search.type);

            const res = await API.get(`/jobs?${query.toString()}`);
            setJobs(res.data);
        } catch (error) {
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="space-y-12 pb-20">
            {/* Search Hero */}
            <div className="glass-card bg-primary/5 border-primary/20 p-10 text-center space-y-8">
                <h2 className="text-4xl font-black">Browse <span className="text-primary">Opportunities</span></h2>
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Job title or keywords"
                            className="input-glass w-full pl-12 h-12"
                            value={search.keyword}
                            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
                        />
                    </div>
                    <div className="flex-1 relative">
                        <MapPin className="absolute left-4 top-3.5 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Location"
                            className="input-glass w-full pl-12 h-12"
                            value={search.location}
                            onChange={(e) => setSearch({ ...search, location: e.target.value })}
                        />
                    </div>
                    <button
                        onClick={fetchJobs}
                        className="btn-primary px-10 h-12 flex items-center gap-2"
                    >
                        <Search size={18} /> Search
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="space-y-6">
                    <div className="glass-card">
                        <h4 className="font-bold flex items-center gap-2 mb-6 text-primary">
                            <Filter size={18} /> Filters
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black uppercase text-slate-500 mb-2 block">Job Type</label>
                                <select
                                    className="input-glass w-full text-sm"
                                    value={search.type}
                                    onChange={(e) => setSearch({ ...search, type: e.target.value })}
                                >
                                    <option value="all">All Types</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Jobs Feed */}
                <div className="lg:col-span-3 space-y-6">
                    {loading ? (
                        <div className="text-center py-20 opacity-50">Searching for matches...</div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-20 glass-card">
                            <p className="text-xl font-bold">No jobs found matching your criteria</p>
                            <button onClick={() => { setSearch({ keyword: '', location: '', type: 'all' }); fetchJobs(); }} className="text-primary mt-2">Clear all filters</button>
                        </div>
                    ) : (
                        jobs.map((job, i) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="glass-card group hover:bg-white/5 transition-all"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-primary text-2xl">
                                            {job.title[0]}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h4>
                                                {job.isPremium && <Zap className="text-primary" size={16} fill="currentColor" />}
                                            </div>
                                            <p className="text-slate-400 font-medium">{job.employerId?.name} • {job.location}</p>
                                            <div className="flex gap-3 text-xs text-slate-500 font-bold uppercase tracking-wider">
                                                <span className="flex items-center gap-1"><Briefcase size={12} /> {job.jobType}</span>
                                                <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-4">
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase font-black">Salary</p>
                                            <p className="font-bold">${job.salaryRange.min / 1000}k - ${job.salaryRange.max / 1000}k</p>
                                        </div>
                                        <Link
                                            to={`/job/${job._id}`}
                                            className="px-6 py-2 glass rounded-xl flex items-center gap-2 group-hover:bg-primary group-hover:text-white transition-all font-bold"
                                        >
                                            View Details <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
