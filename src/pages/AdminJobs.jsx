import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Briefcase, Search, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get('/jobs');
                setJobs(res.data);
            } catch (error) {
                toast.error('Failed to load jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            await API.delete(`/jobs/${id}`);
            setJobs(jobs.filter(j => j._id !== id));
            toast.success('Job deleted successfully');
        } catch (error) {
            toast.error('Failed to delete job');
        }
    };

    const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center bg-white/5 p-8 rounded-2xl border border-white/10">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Briefcase className="text-secondary" /> Platform Jobs
                    </h2>
                    <p className="text-slate-400">View and manage all jobs posted on the platform.</p>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search jobs..." 
                        className="input-glass pl-10 w-full" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="glass-card overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-xs text-slate-500 uppercase tracking-widest">
                            <th className="pb-4 pt-2 px-4 font-black">Job Title</th>
                            <th className="pb-4 pt-2 px-4 font-black">Company</th>
                            <th className="pb-4 pt-2 px-4 font-black">Location</th>
                            <th className="pb-4 pt-2 px-4 font-black">Posted</th>
                            <th className="pb-4 pt-2 px-4 font-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {!loading && filteredJobs.map(j => (
                            <tr key={j._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-4 font-bold">{j.title}</td>
                                <td className="py-4 px-4 text-slate-400">{j.company || j.employerId?.name || 'Unknown'}</td>
                                <td className="py-4 px-4 text-slate-400">{j.location}</td>
                                <td className="py-4 px-4 text-slate-400">{new Date(j.createdAt).toLocaleDateString()}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => handleDelete(j._id)} className="p-1.5 glass rounded-lg hover:text-red-500" title="Delete Job">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <div className="p-8 text-center animate-pulse text-slate-500">Loading jobs...</div>}
                {!loading && filteredJobs.length === 0 && <div className="p-8 text-center text-slate-500">No jobs found.</div>}
            </div>
        </div>
    );
};

export default AdminJobs;
