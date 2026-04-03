import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    User,
    MessageSquare,
    Settings,
    PlusCircle,
    Users,
    Calendar as CalendarIcon,
    Zap,
    Mic
} from 'lucide-react';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const seekerLinks = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
        { icon: <Briefcase size={20} />, label: 'Applications', path: '/dashboard/applications' },
        { icon: <User size={20} />, label: 'My Profile', path: '/dashboard/profile' },
        { icon: <Zap size={20} />, label: 'AI Coach', path: '/dashboard/interview-prep' },
        { icon: <Mic size={20} />, label: 'Voice AI', path: '/dashboard/assistant' },
        { icon: <MessageSquare size={20} />, label: 'Messages', path: '/dashboard/chat' },
    ];

    const adminLinks = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
        { icon: <Users size={20} />, label: 'All Users', path: '/dashboard/admin/users' },
        { icon: <Briefcase size={20} />, label: 'All Jobs', path: '/dashboard/admin/jobs' },
    ];

    const employerLinks = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
        { icon: <PlusCircle size={20} />, label: 'Post a Job', path: '/dashboard/post-job' },
        { icon: <Users size={20} />, label: 'Applicants', path: '/dashboard/applicants' },
        { icon: <CalendarIcon size={20} />, label: 'Interviews', path: '/dashboard/schedule' },
        { icon: <Mic size={20} />, label: 'Voice AI', path: '/dashboard/assistant' },
        { icon: <MessageSquare size={20} />, label: 'Chat', path: '/dashboard/chat' },
    ];

    const links = user?.role === 'admin' || user?.role === 'superadmin' ? adminLinks : 
                  user?.role === 'employer' ? employerLinks : seekerLinks;

    return (
        <div className="w-64 glass h-[calc(100vh-120px)] rounded-2xl p-4 flex flex-col gap-2">
            <div className="px-4 py-6 mb-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Main Menu</p>
            </div>
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(link.path)
                        ? 'bg-primary bg-opacity-20 text-primary border-l-4 border-primary'
                        : 'hover:bg-white hover:bg-opacity-5 text-slate-400 hover:text-white'
                        }`}
                >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                </Link>
            ))}
            <div className="mt-auto pt-6 border-t border-white border-opacity-10">
                <Link
                    to="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white"
                >
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
