import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Global Background Blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="blob w-[500px] h-[500px] bg-primary -top-40 -left-40 animate-float opacity-20"></div>
                <div className="blob w-[500px] h-[500px] bg-secondary -bottom-40 -right-40 animate-float opacity-20" style={{ animationDelay: '2s' }}></div>
                <div className="blob w-96 h-96 bg-accent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-10"></div>
            </div>

            <Navbar />
            
            <main className="flex-grow page-container py-16 relative z-10 w-full">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
