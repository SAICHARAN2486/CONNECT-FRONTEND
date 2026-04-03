import { motion } from 'framer-motion';
import { Users, FilePlus, MessageSquare, DollarSign } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import API from '../utils/api';

const EmployerOverview = () => {
    const { user } = useSelector((state) => state.auth);
    const [jobs, setJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [recentApplicants, setRecentApplicants] = React.useState([]);

    React.useEffect(() => {
        const fetchEmployerData = async () => {
            try {
                const jobsRes = await API.get('/jobs/my-jobs');
                setJobs(jobsRes.data);
                
                // Fetch applicants for recently posted jobs (simplified for overview)
                if (jobsRes.data.length > 0) {
                    const latestJobId = jobsRes.data[0]._id;
                    const appRes = await API.get(`/applications/job/${latestJobId}`);
                    setRecentApplicants(appRes.data);
                }
            } catch (error) {
                console.error('Fetch Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployerData();
    }, []);

    const stats = [
        { label: 'Active Jobs', value: jobs.length.toString(), icon: <FilePlus />, color: 'text-primary' },
        { label: 'Total Applicants', value: '142', icon: <Users />, color: 'text-secondary' }, // Simulated aggregation
        { label: 'Unread Messages', value: '5', icon: <MessageSquare />, color: 'text-accent' },
        { label: 'Monthly Hires', value: '12', icon: <DollarSign />, color: 'text-green-400' },
    ];

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Applicants',
                data: [30, 45, 60, 55, 80, 95],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Employer Terminal</h2>
                    <p className="text-slate-400">Manage your company's hiring flow and analytics.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2 glass rounded-xl">View Plans</button>
                    <button className="btn-primary">Post New Job</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card h-[400px]">
                    <h3 className="text-xl font-bold mb-6">Candidate Growth</h3>
                    <Line data={chartData} options={{ maintainAspectRatio: false }} />
                </div>
                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Recent Applicants</h3>
                    <div className="space-y-4">
                        {!loading && recentApplicants.slice(0, 4).map(app => (
                            <div key={app._id} className="glass p-3 rounded-xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white uppercase">
                                    {app.applicantId?.name?.[0] || 'U'}
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-sm font-bold">{app.applicantId?.name || 'Unknown'}</h5>
                                    <p className="text-xs text-slate-400">{app.jobId?.title || 'Job'} • {app.aiMatchScore}% Match</p>
                                </div>
                                <button className="text-primary text-xs font-bold">View</button>
                            </div>
                        ))}
                        {!loading && recentApplicants.length === 0 && (
                            <div className="text-center py-6 glass rounded-xl border-dashed border-white/10">
                                <p className="text-xs text-slate-500 italic">No recent applicants found.</p>
                            </div>
                        )}
                        {loading && [1, 2, 3].map(i => (
                            <div key={i} className="h-12 glass animate-pulse rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerOverview;
