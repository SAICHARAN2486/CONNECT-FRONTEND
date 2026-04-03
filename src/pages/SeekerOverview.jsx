import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Clock } from 'lucide-react';
import RecommendedJobs from '../components/RecommendedJobs';

import API from '../utils/api';

const SeekerOverview = () => {
    const { user } = useSelector((state) => state.auth);
    const [applications, setApplications] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await API.get('/applications/my-applications');
                setApplications(res.data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const stats = [
        { label: 'Applied Jobs', value: applications.length.toString(), icon: <Briefcase />, color: 'text-primary' },
        { label: 'Interviews', value: applications.filter(a => a.status === 'Interviewing').length.toString(), icon: <Users />, color: 'text-secondary' },
        { label: 'Profile Views', value: '85', icon: <TrendingUp />, color: 'text-green-400' },
    ];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Hello, {user?.name.split(' ')[0]}! 👋</h2>
                    <p className="text-slate-400">Here's what's happening with your job applications.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-slate-400">Profile Completion</span>
                        <span className="font-bold text-primary">75%</span>
                    </div>
                    <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <div className="bg-gradient-to-r from-primary to-secondary h-full w-[75%]"></div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card flex items-center gap-4"
                    >
                        <div className={`p-4 rounded-xl bg-white bg-opacity-5 ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity & Recommendations */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card min-h-[400px]">
                        <h3 className="text-xl font-bold mb-6">Recent Application Activity</h3>
                        <div className="space-y-4">
                            {!loading && applications.slice(0, 5).map((app) => (
                                <div key={app._id} className="glass flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center font-bold text-primary uppercase">
                                            {app.jobId?.title?.[0] || 'J'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{app.jobId?.title || 'Unknown Position'}</h4>
                                            <p className="text-sm text-slate-400">{app.jobId?.employerId?.name || 'Unknown Company'} • Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-xs rounded-full font-bold ${app.status === 'Under Review' ? 'bg-primary/20 text-primary' :
                                            app.status === 'Shortlisted' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            ))}
                            {!loading && applications.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="flex justify-center mb-4"><Clock className="text-slate-600" size={48} /></div>
                                    <p className="text-slate-400">No applications yet. Start your journey today!</p>
                                </div>
                            )}
                            {loading && [1, 2, 3].map(i => (
                                <div key={i} className="h-16 glass animate-pulse rounded-xl mb-4"></div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button className="text-primary font-bold hover:underline">View All Applications</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <RecommendedJobs />

                    <div className="glass-card bg-secondary/5 border-secondary/20">
                        <h4 className="font-bold flex items-center gap-2 mb-2">
                            <TrendingUp size={16} className="text-secondary" /> Profile Boost
                        </h4>
                        <p className="text-xs text-slate-400 mb-4">Users with 90%+ completion get 4x more interview invites.</p>
                        <button className="w-full py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary text-xs font-bold rounded-lg transition-all">
                            Complete Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeekerOverview;
