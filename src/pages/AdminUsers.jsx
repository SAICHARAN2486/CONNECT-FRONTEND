import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Users, Search, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get('/admin/users');
                setUsers(res.data);
            } catch (error) {
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await API.put(`/admin/users/${id}`, { status });
            setUsers(users.map(u => u._id === id ? { ...u, status } : u));
            toast.success(`User marked as ${status}`);
        } catch (error) {
            toast.error('Failed to update user status');
        }
    };

    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center bg-white/5 p-8 rounded-2xl border border-white/10">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Users className="text-primary" /> User Management
                    </h2>
                    <p className="text-slate-400">View and manage all registered platform users.</p>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
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
                            <th className="pb-4 pt-2 px-4 font-black">User</th>
                            <th className="pb-4 pt-2 px-4 font-black">Email</th>
                            <th className="pb-4 pt-2 px-4 font-black">Role</th>
                            <th className="pb-4 pt-2 px-4 font-black">Status</th>
                            <th className="pb-4 pt-2 px-4 font-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {!loading && filteredUsers.map(u => (
                            <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-4 font-bold">{u.name}</td>
                                <td className="py-4 px-4 text-slate-400">{u.email}</td>
                                <td className="py-4 px-4 font-medium capitalize">{u.role}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        u.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                                        u.status === 'Blocked' ? 'bg-red-500/20 text-red-500' : 'bg-slate-500/20 text-slate-300'
                                    }`}>
                                        {u.status || 'Active'}
                                    </span>
                                </td>
                                <td className="py-4 px-4 flex gap-2">
                                    <button onClick={() => handleStatusUpdate(u._id, 'Active')} className="p-1.5 glass rounded-lg hover:text-green-400" title="Approve"><CheckCircle size={16} /></button>
                                    <button onClick={() => handleStatusUpdate(u._id, 'Blocked')} className="p-1.5 glass rounded-lg hover:text-red-500" title="Block"><XCircle size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <div className="p-8 text-center animate-pulse text-slate-500">Loading users...</div>}
                {!loading && filteredUsers.length === 0 && <div className="p-8 text-center text-slate-500">No users found.</div>}
            </div>
        </div>
    );
};

export default AdminUsers;
