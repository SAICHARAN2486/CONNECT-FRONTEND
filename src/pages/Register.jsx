import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset } from '../store/slices/authSlice';
import API from '../utils/api';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Briefcase, Building, Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'jobseeker',
    });
    const [loading, setLoading] = useState(false);
    const { name, email, password, role } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) navigate('/dashboard');
        dispatch(reset());
    }, [user, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post('/auth/register', formData);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success('Registration successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card space-y-8"
            >
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">Create Account</h2>
                    <p className="text-slate-400">Join CareerConnect AI today</p>
                </div>

                {/* Role Selection */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setFormData({ ...formData, role: 'jobseeker' })}
                        className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === 'jobseeker' ? 'border-primary bg-primary bg-opacity-10' : 'border-white border-opacity-10'
                            }`}
                    >
                        <Briefcase size={24} className={role === 'jobseeker' ? 'text-primary' : 'text-slate-400'} />
                        <span className="font-semibold text-sm">Job Seeker</span>
                    </button>
                    <button
                        onClick={() => setFormData({ ...formData, role: 'employer' })}
                        className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === 'employer' ? 'border-primary bg-primary bg-opacity-10' : 'border-white border-opacity-10'
                            }`}
                    >
                        <Building size={24} className={role === 'employer' ? 'text-primary' : 'text-slate-400'} />
                        <span className="font-semibold text-sm">Employer</span>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                                className="input-glass w-full pl-10"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="input-glass w-full pl-10"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="input-glass w-full pl-10"
                                placeholder="Min 6 characters"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={18} />}
                        Create Account
                    </button>
                </form>

                <p className="text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-semibold">
                        Login here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
