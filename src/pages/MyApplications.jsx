import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import API from '../utils/api';

const MyApplications = () => {
    const { token } = useSelector((state) => state.auth);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await API.get('/applications/my-applications');
                setApps(res.data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Track Applications</h2>
                    <p className="text-slate-400">Manage and monitor your job searching progress.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                        <input type="text" placeholder="Search applications..." className="input-glass pl-10" />
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {!loading && apps.map((app, i) => (
                    <motion.div
                        key={app._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold uppercase">
                                {app.jobId?.employerId?.name?.[0] || 'J'}
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-lg">{app.jobId?.title || 'Unknown Position'}</h4>
                                <p className="text-sm text-slate-400 font-medium">{app.jobId?.employerId?.name || 'Unknown Company'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-12 text-center">
                            <div>
                                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1 justify-center"><Clock size={12} /> Applied on</p>
                                <p className="text-sm font-bold">{new Date(app.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Status</p>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                                        app.status === 'Shortlisted' ? 'bg-primary/20 text-primary' :
                                        app.status === 'Rejected' ? 'bg-red-500/20 text-red-500' :
                                        app.status === 'Under Review' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-slate-500/20 text-slate-400'
                                    }`}>
                                    {app.status === 'Shortlisted' ? <CheckCircle size={14} /> : app.status === 'Rejected' ? <XCircle size={14} /> : <Clock size={14} />}
                                    {app.status}
                                </div>
                            </div>
                        </div>

                        <button className="px-6 py-2 glass rounded-xl hover:bg-white/5 text-sm">View Details</button>
                    </motion.div>
                ))}
                {!loading && apps.length === 0 && (
                    <div className="text-center py-20 glass-card">
                        <div className="flex justify-center mb-6 text-slate-700"><Search size={64} /></div>
                        <h3 className="text-xl font-bold mb-2">No applications found</h3>
                        <p className="text-slate-500 mb-8">You haven't applied to any jobs yet. Browse available positions to get started!</p>
                        <button className="btn-primary" onClick={() => window.location.href = '/jobs'}>Browse Jobs</button>
                    </div>
                )}
                {loading && [1, 2, 3].map(i => (
                    <div key={i} className="h-24 glass animate-pulse rounded-2xl mb-4"></div>
                ))}
            </div>
        </div>
    );
};

export default MyApplications;
