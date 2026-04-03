import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Star, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendedJobs = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Simulate AI recommendations
        setRecommendations([
            { id: '1', title: 'Senior React Developer', company: 'Google', location: 'Remote', salary: '$120k - $180k', score: 98, type: 'Full-time' },
            { id: '2', title: 'Full Stack Engineer', company: 'Amazon', location: 'Seattle, WA', salary: '$140k - $200k', score: 92, type: 'Full-time' },
            { id: '3', title: 'Frontend Lead', company: 'Netflix', location: 'Remote', salary: '$160k - $220k', score: 87, type: 'Full-time' },
        ]);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Zap className="text-primary" size={20} /> AI Recommendations
                </h3>
                <Link to="/" className="text-sm text-primary hover:underline font-medium">Explore all jobs</Link>
            </div>

            <div className="grid gap-4">
                {recommendations.map((job, i) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card hover:bg-white/5 transition-colors group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-slate-500 uppercase font-black">Match</span>
                                <span className="text-xl font-black text-primary">{job.score}%</span>
                            </div>
                        </div>

                        <div className="flex gap-6 items-center">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
                                {job.company[0]}
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <h4 className="font-bold group-hover:text-primary transition-colors">{job.title}</h4>
                                    <p className="text-xs text-slate-400 font-medium">{job.company}</p>
                                </div>
                                <div className="flex gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                    <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                                    <span className="flex items-center gap-1"><DollarSign size={10} /> {job.salary}</span>
                                    <span className="flex items-center gap-1"><Briefcase size={10} /> {job.type}</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to={`/jobs/${job.id}`}
                            className="mt-4 w-full py-2 glass rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-primary hover:text-white transition-all"
                        >
                            Apply with AI Score <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedJobs;
