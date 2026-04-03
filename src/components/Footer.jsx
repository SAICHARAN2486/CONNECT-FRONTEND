import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-white border-opacity-10 py-12 backdrop-blur-md bg-black bg-opacity-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4 col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <Briefcase className="text-white" size={18} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Career<span className="gradient-text">Connect</span> AI
                        </span>
                    </div>
                    <p className="text-slate-400 max-w-sm leading-relaxed">
                        Next-generation AI recruitment ecosystem helping professionals find their dream jobs 
                        and companies discover top-tier talent with machine intelligence.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="p-2 glass rounded-lg hover:text-primary transition-colors"><Github size={18}/></a>
                        <a href="#" className="p-2 glass rounded-lg hover:text-primary transition-colors"><Twitter size={18}/></a>
                        <a href="#" className="p-2 glass rounded-lg hover:text-primary transition-colors"><Linkedin size={18}/></a>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-lg">Quick Links</h4>
                    <ul className="space-y-2 text-slate-400">
                        <li><Link to="/jobs" className="hover:text-primary transition-colors">Find Jobs</Link></li>
                        <li><Link to="/login" className="hover:text-primary transition-colors">Talent Pool</Link></li>
                        <li><Link to="/register" className="hover:text-primary transition-colors">Post a Job</Link></li>
                        <li><Link to="/jobs" className="hover:text-primary transition-colors">AI Services</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-lg">Contact Us</h4>
                    <ul className="space-y-3 text-slate-400">
                        <li className="flex items-center gap-2">
                            <Mail size={16} className="text-primary" />
                            <span>support@careerconnect.ai</span>
                        </li>
                        <li className="text-sm">
                            Bengaluru, Karnataka Hub<br />
                            India • Global Support
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="container mx-auto px-6 pt-12 mt-12 border-t border-white border-opacity-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
                <p>© 2026 CareerConnect AI. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
