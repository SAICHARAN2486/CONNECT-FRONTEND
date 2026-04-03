import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, HelpCircle, User, Briefcase, Loader2, Play, CheckCircle } from 'lucide-react';

const InterviewPrep = () => {
    const [generating, setGenerating] = useState(false);
    const [questions, setQuestions] = useState(null);
    const [jobRole, setJobRole] = useState('Senior Frontend Developer');

    const onGenerate = async () => {
        setGenerating(true);
        try {
            const res = await API.post('/ai/interview-questions', { role: jobRole });
            setQuestions(res.data.questions);
        } catch (error) {
            toast.error('Question generation failed');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="flex justify-between items-center text-center flex-col md:flex-row md:text-left gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Zap className="text-primary animate-pulse" /> AI Interview Coach
                    </h2>
                    <p className="text-slate-400">Personalized interview questions tailored to your profile and target role.</p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="input-glass text-sm"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        placeholder="Target Job Role"
                    />
                    <button
                        onClick={onGenerate}
                        disabled={generating}
                        className="btn-primary whitespace-nowrap flex items-center gap-2"
                    >
                        {generating ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
                        Generate Questions
                    </button>
                </div>
            </div>

            {!questions && !generating && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card flex flex-col items-center justify-center py-20 gap-6 border-dashed border-primary/20"
                >
                    <div className="p-6 bg-primary bg-opacity-10 rounded-full text-primary">
                        <HelpCircle size={60} />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold">Ready to practice?</h3>
                        <p className="text-slate-400">Click generate to receive 5 expert-level questions for your next interview.</p>
                    </div>
                </motion.div>
            )}

            {generating && (
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass-card animate-pulse flex items-center gap-4 h-24">
                            <div className="w-10 h-10 bg-white/5 rounded-full"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
                                <div className="h-3 bg-white/5 rounded-full w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {questions && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="glass-card bg-primary bg-opacity-5 border-primary/20 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary rounded-xl text-white">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Interview Guide for {jobRole}</h4>
                                    <p className="text-sm text-slate-400 italic">Curated by CareerConnect AI</p>
                                </div>
                            </div>
                            <CheckCircle className="text-green-400" size={32} />
                        </div>

                        <div className="space-y-4">
                            {questions.map((q, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-8 group hover:bg-white/5 cursor-default transition-all"
                                >
                                    <div className="flex gap-6 items-start">
                                        <span className="text-4xl font-black text-white/5 group-hover:text-primary transition-colors">0{i + 1}</span>
                                        <div className="space-y-4">
                                            <p className="text-xl font-medium leading-relaxed">{q}</p>
                                            <button className="text-sm text-primary font-bold hover:underline">View Suggested Answer Tips →</button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center pt-8">
                            <p className="text-slate-400 mb-4">Want more practice? Connect with a mentor on our platform.</p>
                            <button
                                onClick={() => setQuestions(null)}
                                className="px-8 py-3 glass rounded-xl hover:bg-white/5"
                            >
                                Reset Coach
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InterviewPrep;
