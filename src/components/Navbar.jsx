import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/slices/authSlice';
import { Briefcase, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth || {});

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className="glass-nav sticky top-0 z-50 py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                        <Briefcase className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">
                        Career<span className="gradient-text">Connect</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="hover:text-primary transition-colors">Find Jobs</Link>
                    <Link to="/" className="hover:text-primary transition-colors">Companies</Link>
                    <Link to="/jobs" className="text-slate-300 hover:text-white font-medium">Search Jobs</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-slate-300 hover:text-white font-medium">Dashboard</Link>
                            <button onClick={onLogout} className="btn-primary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-300 hover:text-white font-medium">Login</Link>
                            <Link to="/register" className="btn-primary">Get Started</Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass mt-4 mx-4 rounded-2xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            <Link to="/" onClick={() => setIsOpen(false)}>Find Jobs</Link>
                            <Link to="/" onClick={() => setIsOpen(false)}>Companies</Link>
                            {user ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                    <button onClick={onLogout} className="text-left text-red-400">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" className="btn-primary text-center" onClick={() => setIsOpen(false)}>Register</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
