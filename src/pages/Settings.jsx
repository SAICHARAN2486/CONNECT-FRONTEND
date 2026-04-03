import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Lock, User, Mail, Shield } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { updateUser } from '../store/slices/authSlice';

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password && formData.password !== formData.confirmPassword) {
            return toast.error("Passwords don't match");
        }

        setLoading(true);
        try {
            const dataToUpdate = {
                name: formData.name,
                email: formData.email
            };
            if (formData.password) {
                dataToUpdate.password = formData.password;
            }

            const res = await API.put('/auth/profile', dataToUpdate);
            // Updating local auth state
            dispatch(updateUser(res.data));
            toast.success("Profile updated successfully!");
            
            // clear passwords
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <SettingsIcon className="text-primary" /> Account Settings
                </h2>
                <p className="text-slate-400">Update your profile details and security preferences.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto glass-card flex flex-col gap-6"
            >
                <div>
                    <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Profile Information</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <User size={16} /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input-glass w-full"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <Mail size={16} /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-glass w-full"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <Shield size={16} /> Account Role
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.role?.toUpperCase() || ''}
                                        className="input-glass w-full opacity-50 cursor-not-allowed"
                                        disabled
                                    />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Lock size={20} className="text-primary" /> Security
                            </h3>
                            <p className="text-sm text-slate-400 mb-2">Leave blank if you don't want to change your password.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-300">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="input-glass w-full"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-300">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="input-glass w-full"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex items-center gap-2"
                            >
                                {loading ? "Saving..." : <><Save size={20} /> Save Changes</>}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
