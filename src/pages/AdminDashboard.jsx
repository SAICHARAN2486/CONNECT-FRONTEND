import React from 'react';
import { motion } from 'framer-motion';
import {
    Users, Briefcase, TrendingUp, AlertCircle, ShieldAlert,
    Settings, CheckCircle, XCircle, Search, MoreVertical,
    BarChart4, DollarSign, Activity
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import API from '../utils/api';

const AdminDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [stats, setStats] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    API.get('/admin/stats'),
                    API.get('/admin/users')
                ]);
                setStats(statsRes.data.stats);
                setUsers(usersRes.data);
            } catch (error) {
                console.error('Fetch Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Platform Activity',
            data: [35, 42, 38, 56, 61, 85],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <ShieldAlert className={user?.role === 'superadmin' ? 'text-primary' : 'text-red-500'} />
                        {user?.role === 'superadmin' ? 'Enterprise Control Center' : 'Admin Control Center'}
                    </h2>
                    <p className="text-slate-400">
                        Full platform orchestration and production analytics.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2 glass rounded-xl text-red-400 border-red-500/20 hover:bg-red-500/10">System Lockdown</button>
                    <button className="btn-primary">Generate Report</button>
                </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {!loading && stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card flex items-center gap-4 relative overflow-hidden"
                    >
                        <div className={`p-4 rounded-xl bg-white bg-opacity-5 ${stat.color}`}>
                            {stat.icon === 'Users' ? <Users /> :
                             stat.icon === 'Briefcase' ? <Briefcase /> :
                             stat.icon === 'FilePlus' ? <FilePlus /> : <Activity />}
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <span className="text-[10px] text-green-400 font-bold">{stat.change} vs last month</span>
                        </div>
                    </motion.div>
                ))}
                {loading && [1, 2, 3, 4].map(i => (
                    <div key={i} className="glass-card h-24 animate-pulse bg-white/5"></div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Real-time Logs */}
                <div className="lg:col-span-1 glass-card space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Activity className="text-primary" size={20} /> System Logs
                        <span className="ml-auto text-[10px] font-mono text-slate-500 animate-pulse">LIVE</span>
                    </h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {[1, 2, 3, 4, 5, 6, 7].map(log => (
                            <div key={log} className="text-[10px] font-mono p-3 bg-black/30 rounded-lg border-l-2 border-primary/50">
                                <div className="flex justify-between mb-1 opacity-50">
                                    <span>[2024-05-22 15:02:{log > 9 ? log : '0' + log}]</span>
                                    <span className="text-primary">INFO</span>
                                </div>
                                <p className="text-slate-300">USER_LOGIN: user_{Math.random().toString(36).substr(2, 6)} successfully authenticated via JWT</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Management Table */}
                <div className="lg:col-span-2 glass-card space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Recent User Activity</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                            <input type="text" placeholder="Filter users..." className="input-glass pl-9 py-1.5 text-sm" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 text-xs text-slate-500 uppercase tracking-widest">
                                    <th className="pb-4 font-black">User</th>
                                    <th className="pb-4 font-black">Role</th>
                                    <th className="pb-4 font-black">Status</th>
                                    <th className="pb-4 font-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {!loading && users.map(u => (
                                    <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs uppercase">
                                                    {u.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold">{u.name}</p>
                                                    <p className="text-[10px] text-slate-500">Joined {new Date(u.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 font-medium capitalize">{u.role}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${u.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                                                    u.status === 'Blocked' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                                                }`}>
                                                {u.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex gap-2">
                                                <button className="p-1.5 glass rounded-lg hover:text-primary" title="Approve"><CheckCircle size={14} /></button>
                                                <button className="p-1.5 glass rounded-xl hover:text-red-500" title="Block"><XCircle size={14} /></button>
                                                <button className="p-1.5 glass rounded-lg"><MoreVertical size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {loading && [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse"><td colSpan="4" className="h-12 bg-white/5 rounded my-1"></td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center pt-4">
                        <button className="text-xs text-primary font-bold hover:underline">View All Users & Statistics</button>
                    </div>
                </div>
            </div>

            {/* Financial Analytics */}
            <div className="glass-card">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <BarChart4 className="text-secondary" /> Revenue & Subscription Analytics
                    </h3>
                    <select className="input-glass py-1 text-xs">
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                    </select>
                </div>
                <div className="h-[300px]">
                    <Line
                        data={lineData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
