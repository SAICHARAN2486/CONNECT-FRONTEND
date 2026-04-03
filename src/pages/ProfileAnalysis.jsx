import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Zap, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

const ProfileAnalysis = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onAnalyze = async () => {
        if (!file) {
            toast.info("Please upload a resume first");
            return;
        }
        setAnalyzing(true);
        try {
            const formData = new FormData();
            formData.append('resume', file);

            const res = await API.post('/ai/analyze-resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data);
        } catch (error) {
            toast.error('AI analysis failed');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <Sparkles className="text-primary" /> AI Profile Optimizer
                </h2>
                <p className="text-slate-400">Upload your resume to get instant AI-driven improvements and matching scores.</p>
            </div>

            {!result ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card border-dashed border-2 p-20 flex flex-col items-center gap-6 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => document.getElementById('resume-upload').click()}
                >
                    <div className="p-6 bg-primary bg-opacity-10 rounded-full text-primary">
                        {analyzing ? <Loader2 className="animate-spin" size={48} /> : <FileUp size={48} />}
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold">{file ? file.name : "Select your Resume"}</p>
                        <p className="text-slate-400 mt-2">PDF or DOCX (Max 5MB)</p>
                    </div>
                    <input
                        id="resume-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={onFileChange}
                    />
                    {file && !analyzing && (
                        <button
                            className="btn-primary flex items-center gap-2 mt-4 px-10"
                            onClick={(e) => { e.stopPropagation(); onAnalyze(); }}
                        >
                            <Zap size={18} /> Start AI Analysis
                        </button>
                    )}
                </motion.div>
            ) : (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Analysis Results */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="glass-card flex flex-col items-center justify-center gap-4 py-10">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64" cy="64" r="58"
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            className="text-white text-opacity-10"
                                        />
                                        <circle
                                            cx="64" cy="64" r="58"
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            strokeDasharray={364}
                                            strokeDashoffset={364 * (1 - result.score / 100)}
                                            className="text-primary"
                                        />
                                    </svg>
                                    <span className="absolute text-3xl font-bold">{result.score}%</span>
                                </div>
                                <h4 className="font-bold">Overall Score</h4>
                            </div>

                            <div className="md:col-span-2 glass-card space-y-4">
                                <h4 className="text-xl font-bold border-b border-white border-opacity-10 pb-4">AI Summary</h4>
                                <p className="text-slate-300 leading-relaxed italic">"{result.summary}"</p>
                                <div className="flex flex-wrap gap-2 pt-4">
                                    {result.skills.map(s => (
                                        <span key={s} className="px-3 py-1 bg-white bg-opacity-5 rounded text-xs text-slate-300">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="glass-card space-y-6">
                            <h4 className="text-xl font-bold flex items-center gap-2">
                                <AlertCircle className="text-secondary" /> Profile Improvement Tips
                            </h4>
                            <div className="space-y-4">
                                {result.suggestions.map((s, i) => (
                                    <div key={i} className="flex gap-3 p-4 bg-white bg-opacity-5 rounded-xl border-l-4 border-secondary">
                                        <CheckCircle className="text-slate-500 shrink-0" size={20} />
                                        <p className="text-slate-300">{s}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    className="px-6 py-2 glass rounded-xl hover:bg-white hover:bg-opacity-5 transition-colors"
                                    onClick={() => setResult(null)}
                                >
                                    Analyze New Resume
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default ProfileAnalysis;
