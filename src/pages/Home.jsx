import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Zap, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-32 pb-20">
            {/* Hero Section */}
            <section className="text-center space-y-12 pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-primary text-sm font-bold tracking-wide animate-pulse">
                        <Zap size={16} />
                        NEW: AI-POWERED JOB MATCHING IS LIVE
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
                        Shape Your Future with <br />
                        <span className="gradient-text">Machine Intelligence</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        The elite career platform for the AI era. We bridge the gap between 
                        top-tier tech talent and visionary companies using neural matching.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-5xl mx-auto glass rounded-[32px] p-3 flex flex-col md:flex-row gap-3 mt-16 shadow-inner"
                >
                    <div className="flex-[1.5] flex items-center gap-4 px-6 py-4 bg-white bg-opacity-[0.03] rounded-[24px] border border-white border-opacity-[0.05] focus-within:border-primary/40 transition-all">
                        <Search className="text-primary" size={24} />
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company..."
                            className="bg-transparent w-full focus:outline-none text-lg"
                        />
                    </div>
                    <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-white bg-opacity-[0.03] rounded-[24px] border border-white border-opacity-[0.05] focus-within:border-secondary/40 transition-all">
                        <MapPin className="text-secondary" size={24} />
                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="bg-transparent w-full focus:outline-none text-lg"
                        />
                    </div>
                    <Link to="/jobs" className="btn-primary px-12 text-lg">
                        Search Jobs
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: <Briefcase />, label: 'Active Opportunities', value: '18,400+' },
                    { icon: <Zap />, label: 'Neural Matches', value: '920K+' },
                    { icon: <Star />, label: 'Fortune 500 Partners', value: '450+' },
                    { icon: <ShieldCheck />, label: 'Avg. Hiring Time', value: '3.5 Days' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="glass-card text-center flex flex-col items-center gap-4 p-12"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center text-primary mb-2 shadow-lg border border-white border-opacity-[0.05]">
                            {stat.icon}
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-4xl font-black tracking-tight">{stat.value}</h3>
                            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Featured Section */}
            <section className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4">
                        <h2 className="section-title">High-Growth <span className="gradient-text">Opportunities</span></h2>
                        <p className="section-subtitle">Hand-picked roles from the world's most innovative tech ecosystems.</p>
                    </div>
                    <Link to="/jobs" className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                        View Ecosystem
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3].map((j) => (
                        <motion.div
                            key={j}
                            whileHover={{ y: -5 }}
                            className="glass-card space-y-8 group border-opacity-[0.05]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl p-3 glass border-opacity-20 flex items-center justify-center text-primary">
                                    <Briefcase size={28} />
                                </div>
                                <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary-light text-xs font-bold rounded-full uppercase tracking-wider">
                                    Priority Hire
                                </span>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">Neural Network Architect</h4>
                                <p className="text-slate-400 font-medium">DeepMind Labs • London / Remote</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {['PyTorch', 'Rust', 'NLP', 'Scaling'].map(s => (
                                    <span key={s} className="px-3 py-1 bg-white bg-opacity-[0.03] rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 border border-white border-opacity-[0.05]">
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <div className="pt-6 border-t border-white border-opacity-[0.05] flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">Annual Package</span>
                                    <span className="font-black text-2xl tracking-tighter">$180k - $240k</span>
                                </div>
                                <Link to={`/job/${j}`} className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-white transition-all">
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="glass rounded-[40px] p-16 text-center space-y-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black max-w-2xl mx-auto leading-tight">
                        Ready to join the <span className="gradient-text">Top 1%</span> of global talent?
                    </h2>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">
                        Connect your profile and let our AI agents find the perfect synergy for your career trajectory.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Link to="/register" className="btn-primary text-xl px-12 py-5">
                            Initialize Career Profile
                        </Link>
                        <Link to="/login" className="btn-secondary text-xl px-12 py-5">
                            Partner Login
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
