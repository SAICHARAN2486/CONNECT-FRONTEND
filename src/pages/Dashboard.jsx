import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SeekerOverview from './SeekerOverview';
import EmployerOverview from './EmployerOverview';
import PostJob from './PostJob';
import ProfileAnalysis from './ProfileAnalysis';
import Chat from './Chat';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminJobs from './AdminJobs';
import InterviewPrep from './InterviewPrep';
import InterviewScheduler from './InterviewScheduler';
import Applicants from './Applicants';
import MyJobs from './MyJobs';
import MyApplications from './MyApplications';
import VoiceAssistant from './VoiceAssistant';
import Settings from './Settings';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Global Background Blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="blob w-[500px] h-[500px] bg-primary -top-40 -left-40 animate-float opacity-20"></div>
                <div className="blob w-[500px] h-[500px] bg-secondary -bottom-40 -right-40 animate-float opacity-20" style={{ animationDelay: '2s' }}></div>
                <div className="blob w-96 h-96 bg-accent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-10"></div>
            </div>

            <Navbar />

            <div className="page-container py-12 relative z-10 flex flex-col md:flex-row gap-10">
                <Sidebar />
                <div className="flex-1 min-h-[calc(100vh-200px)]">
                <Routes>
                    <Route
                        path="/"
                        element={
                            user?.role === 'admin' || user?.role === 'superadmin' ? <AdminDashboard /> :
                                user?.role === 'employer' ? <EmployerOverview /> : <SeekerOverview />
                        }
                    />
                    
                    {/* Admin Specific */}
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/jobs" element={<AdminJobs />} />

                    {/* Employer Specific */}
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/my-jobs" element={<MyJobs />} />
                    <Route path="/applicants" element={<Applicants />} />
                    <Route path="/schedule" element={<InterviewScheduler />} />

                    {/* Seeker Specific */}
                    <Route path="/profile" element={<ProfileAnalysis />} />
                    <Route path="/interview-prep" element={<InterviewPrep />} />
                    <Route path="/applications" element={<MyApplications />} />

                    {/* Common */}
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/assistant" element={<VoiceAssistant />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    </div>
);
};

export default Dashboard;
