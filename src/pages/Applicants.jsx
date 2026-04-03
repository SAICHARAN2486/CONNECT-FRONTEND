import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Check, X, Download, ShieldCheck, Zap, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API from '../utils/api';

const Applicants = () => {
    const { token } = useSelector((state) => state.auth);
    const [applicants, setApplicants] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get('/jobs/my-jobs');
                setJobs(res.data);
                if (res.data.length > 0) {
                    setSelectedJob(res.data[0]);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                toast.error('Failed to load jobs');
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        if (!selectedJob) return;
        const fetchApplicants = async () => {
            setLoading(true);
            try {
                const res = await API.get(`/applications/job/${selectedJob._id}`);
                setApplicants(res.data.sort((a, b) => b.aiMatchScore - a.aiMatchScore));
            } catch (err) {
                toast.error('Failed to load applicants');
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [selectedJob]);

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/applications/${id}/status`, { status });
            setApplicants(prev => prev.map(a => a._id === id ? { ...a, status } : a));
            toast.success(`Candidate status updated to ${status}`);
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center bg-white/5 p-8 rounded-2xl border border-white/10">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Zap className="text-primary" /> AI Candidate Ranking
                    </h2>
                    <p className="text-slate-400">Manage applicants for: <span className="text-white font-bold">{selectedJob?.title || 'No Jobs Posted'}</span></p>
                </div>
                <div className="flex gap-4">
                    <select
                        className="input-glass"
                        value={selectedJob?._id || ''}
                        onChange={(e) => setSelectedJob(jobs.find(j => j._id === e.target.value))}
                    >
                        {jobs.map(j => (
                            <option key={j._id} value={j._id}>{j.title}</option>
                        ))}
                        {jobs.length === 0 && <option value="">No jobs found</option>}
                    </select>
                    <select
                        className="input-glass"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-6">
                {!loading && applicants
                    .filter(a => filter === 'all' || a.status === filter)
                    .map((app, i) => (
                        <motion.div
                            key={app._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-card flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 ${app.status === 'Shortlisted' ? 'border-primary' :
                                    app.status === 'Rejected' ? 'border-red-500/50' : 'border-slate-500/50'
                                }`}
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-2xl uppercase">
                                    {app.applicantId?.name?.[0] || 'U'}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-lg">{app.applicantId?.name || 'Unknown'}</h4>
                                        {app.aiMatchScore > 80 && <ShieldCheck className="text-primary" size={16} />}
                                    </div>
                                    <p className="text-sm text-slate-400">{app.applicantId?.email || 'No email'}</p>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {(app.applicantId?.skills || []).slice(0, 4).map(s => (
                                            <span key={s} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-slate-300">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 text-center">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">AI Score</p>
                                    <div className="text-xl font-black text-primary flex items-center gap-1">
                                        {app.aiMatchScore}% <Zap size={14} className="animate-pulse" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Status</p>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'Shortlisted' ? 'bg-primary/20 text-primary' :
                                            app.status === 'Rejected' ? 'bg-red-500/20 text-red-500' : 'bg-slate-500/20 text-slate-400'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <a 
                                    href={app.resume ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${app.resume}` : '#'} 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 glass rounded-xl text-slate-400 hover:text-white" 
                                    title="Download Resume"
                                >
                                    <Download size={20} />
                                </a>
                                <button
                                    onClick={() => updateStatus(app._id, 'Shortlisted')}
                                    className="p-3 bg-primary bg-opacity-10 rounded-xl text-primary hover:bg-opacity-20 transition-all"
                                    title="Shortlist"
                                >
                                    <Check size={20} />
                                </button>
                                <button
                                    onClick={() => updateStatus(app._id, 'Rejected')}
                                    className="p-3 bg-red-500 bg-opacity-10 rounded-xl text-red-500 hover:bg-opacity-20 transition-all"
                                    title="Reject"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                {!loading && applicants.length === 0 && (
                    <div className="text-center py-20 glass-card">
                        <Users size={64} className="mx-auto text-slate-700 mb-4" />
                        <h3 className="text-xl font-bold">No applicants found for this job</h3>
                        <p className="text-slate-400">Share your job post to start receiving applications!</p>
                    </div>
                )}
                {loading && [1, 2, 3].map(i => (
                    <div key={i} className="h-32 glass animate-pulse rounded-2xl mb-4"></div>
                ))}
            </div>
        </div>
    );
};

export default Applicants;
