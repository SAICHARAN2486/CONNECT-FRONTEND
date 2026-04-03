import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ExternalLink, Trash2, Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { useSelector } from 'react-redux';

const MyJobs = () => {
    const { token } = useSelector((state) => state.auth);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyJobs = async () => {
            try {
                const res = await API.get('/jobs/my-jobs');
                // Fetch applicants count for each job
                const jobsWithCounts = await Promise.all(
                    res.data.map(async (job) => {
                        try {
                            const appRes = await API.get(`/applications/job/${job._id}`);
                            return { ...job, applicants: appRes.data.length };
                        } catch (err) {
                            return { ...job, applicants: 0 };
                        }
                    })
                );
                setJobs(jobsWithCounts);
            } catch (error) {
                toast.error('Failed to load posted jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchMyJobs();
    }, []);

    const deleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            await API.delete(`/jobs/${id}`);
            setJobs(jobs.filter(j => j._id !== id));
            toast.success('Job deleted successfully');
        } catch (error) {
            toast.error('Failed to delete job');
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Manage Posted Jobs</h2>
                    <p className="text-slate-400">Track and edit your active job listings.</p>
                </div>
                <button className="btn-primary">Post New Job</button>
            </div>

            <div className="grid gap-6">
                {loading ? (
                    [1, 2].map(i => (
                        <div key={i} className="h-24 glass animate-pulse rounded-2xl mb-4"></div>
                    ))
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 glass-card">
                        <Briefcase size={64} className="mx-auto text-slate-700 mb-4" />
                        <h3 className="text-xl font-bold">No jobs posted yet</h3>
                        <p className="text-slate-400">Post your first job to start hiring!</p>
                    </div>
                ) : (
                    jobs.map((job, i) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                                    <Briefcase size={28} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg">{job.title}</h4>
                                    <div className="flex gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> Added {new Date(job.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 text-center">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Applicants</p>
                                    <p className="text-xl font-bold">{job.applicants || 0}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Status</p>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${job.status === 'Open' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                        }`}>
                                        {job.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 glass rounded-lg hover:text-primary transition-all"><Edit size={18} /></button>
                                <button className="p-2 glass rounded-lg hover:text-primary transition-all"><ExternalLink size={18} /></button>
                                <button onClick={() => deleteJob(job._id)} className="p-2 glass rounded-lg hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyJobs;
