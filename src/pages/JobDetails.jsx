import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Briefcase, MapPin, DollarSign, Clock,
    ChevronLeft, Send, Zap, ShieldCheck, FileText, Loader2, Copy
} from 'lucide-react';
import API from '../utils/api';
import { toast } from 'react-toastify';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isGenerating, setIsGenerating] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');

    const handleApply = async () => {
        try {
            await API.post('/applications', { jobId: id });
            toast.success('Application submitted successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to apply');
        }
    };

    const handleGenerateCoverLetter = async () => {
        setIsGenerating(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await API.post('/ai/generate-cover-letter', {
                jobTitle: job.title,
                company: 'TechCorp Inc.', // Using the placeholder from UI
                description: job.description,
                userName: user?.name || 'Applicant',
                skills: job.skillsRequired // Using job skills for better context
            });
            setCoverLetter(res.data.coverLetter);
            toast.success('AI Cover Letter generated!');
        } catch (error) {
            toast.error('Failed to generate cover letter');
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(coverLetter);
        toast.info('Copied to clipboard!');
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await API.get(`/jobs/${id}`);
                setJob(res.data);
            } catch (error) {
                toast.error('Failed to load job details');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!job) return <div className="text-center py-20">Job not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto space-y-8"
        >
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ChevronLeft size={20} /> Back to Jobs
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-20 h-20 bg-white rounded-2xl shrink-0"></div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <h1 className="text-4xl font-bold">{job.title}</h1>
                                <p className="text-xl text-slate-400 font-medium">TechCorp Inc. • {job.location}</p>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <span className="flex items-center gap-1 px-3 py-1 bg-white bg-opacity-5 rounded-full">
                                    <Briefcase size={14} className="text-primary" /> {job.jobType}
                                </span>
                                <span className="flex items-center gap-1 px-3 py-1 bg-white bg-opacity-5 rounded-full">
                                    <DollarSign size={14} className="text-secondary" /> ${job.salaryRange.min / 1000}k - ${job.salaryRange.max / 1000}k
                                </span>
                                <span className="flex items-center gap-1 px-3 py-1 bg-white bg-opacity-5 rounded-full">
                                    <Clock size={14} className="text-accent" /> Posted 2 days ago
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card space-y-6">
                        <h3 className="text-2xl font-bold">Job Description</h3>
                        <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {job.description}
                        </div>

                        <h3 className="text-2xl font-bold pt-4">Skills Required</h3>
                        <div className="flex flex-wrap gap-3">
                            {job.skillsRequired.map(s => (
                                <span key={s} className="px-4 py-2 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20 rounded-xl font-medium">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <FileText size={24} className="text-secondary" /> AI Cover Letter
                            </h3>
                            <button
                                onClick={handleGenerateCoverLetter}
                                disabled={isGenerating}
                                className="px-4 py-2 glass rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-secondary hover:bg-opacity-20 transition-all border border-secondary border-opacity-20"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" /> Generating...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={16} /> Generate with AI
                                    </>
                                )}
                            </button>
                        </div>
                        
                        {coverLetter ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="p-6 bg-white bg-opacity-5 rounded-2xl text-slate-300 leading-relaxed whitespace-pre-wrap border border-white border-opacity-5 relative group">
                                    {coverLetter}
                                    <button 
                                        onClick={copyToClipboard}
                                        className="absolute top-4 right-4 p-2 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Copy to clipboard"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 text-center">
                                    AI-generated content should be reviewed before submission.
                                </p>
                            </div>
                        ) : (
                            <div className="p-12 text-center space-y-4 bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-5 border-dashed">
                                <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                                    <Zap size={24} className="text-secondary" />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-lg">Need a cover letter?</p>
                                    <p className="text-sm text-slate-400 max-w-xs mx-auto">
                                        Let our AI write a personalized cover letter for you based on this job description.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card p-8 text-center space-y-6">
                        <h3 className="text-xl font-bold">Interested in this role?</h3>
                        <p className="text-sm text-slate-400">Apply now and get an AI matching score instantly!</p>
                        <button
                            onClick={handleApply}
                            disabled={loading}
                            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                        >
                            <Send size={18} /> Apply for Job
                        </button>
                        <button className="w-full py-4 glass rounded-xl font-bold hover:bg-white hover:bg-opacity-5">
                            Save Job
                        </button>
                    </div>

                    <div className="glass-card bg-primary bg-opacity-5 border-primary border-opacity-20 space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold">
                            <Zap size={20} /> AI Insights
                        </div>
                        <p className="text-sm text-slate-300">
                            Your profile has a <span className="text-primary font-bold">88% match</span> with this role's requirements.
                        </p>
                        <div className="w-full bg-white bg-opacity-10 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[88%]"></div>
                        </div>
                        <p className="text-xs text-slate-400 italic">
                            * Based on your listed skills: React, Node.js, and CSS.
                        </p>
                    </div>

                    <div className="glass-card space-y-4">
                        <div className="flex items-center gap-2 text-green-400 font-bold">
                            <ShieldCheck size={20} /> Trusted Employer
                        </div>
                        <ul className="text-sm text-slate-400 space-y-2">
                            <li>• Verified Company Identity</li>
                            <li>• Over 50 active hires</li>
                            <li>• Rapid response time</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default JobDetails;
