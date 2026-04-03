import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, User, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const InterviewScheduler = () => {
    const [selectedDay, setSelectedDay] = useState(24);

    const interviews = [
        { id: 1, candidate: "Alex Johnson", role: "Frontend Dev", time: "10:00 AM", status: "Upcoming", type: "Video Call" },
        { id: 2, candidate: "Sarah Smith", role: "UI Designer", time: "2:00 PM", status: "Pending Response", type: "In-person" },
        { id: 3, candidate: "Michael Brown", role: "Backend Architect", time: "4:30 PM", status: "Upcoming", type: "Video Call" },
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Interview Hub</h2>
                    <p className="text-slate-400">Manage your interview pipeline and scheduling.</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <CalendarIcon size={18} /> Connect Calendar
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Calendar Sidebar */}
                <div className="glass-card p-6 h-fit space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold">May 2024</h4>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-white/5 rounded"><ChevronLeft size={18} /></button>
                            <button className="p-1 hover:bg-white/5 rounded"><ChevronRight size={18} /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 text-center text-xs text-slate-500 mb-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`p-2 rounded-lg text-sm transition-all ${selectedDay === day
                                        ? 'bg-primary text-white font-bold'
                                        : 'hover:bg-white/5 text-slate-400'
                                    } ${[12, 18, 24, 25].includes(day) && day !== selectedDay ? 'border-b-2 border-accent' : ''}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                    <div className="pt-4 space-y-2 border-t border-white/10">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-accent"></div> Upcoming Interview
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-primary"></div> Selected Day
                        </div>
                    </div>
                </div>

                {/* Schedule List */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold">Interviews on May {selectedDay}</h3>
                    <div className="space-y-4">
                        {interviews.map((int, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={int.id}
                                className="glass-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                                        {int.candidate[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{int.candidate}</h4>
                                        <p className="text-sm text-slate-400">{int.role} • Application Received</p>
                                    </div>
                                </div>

                                <div className="flex gap-8">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500 flex items-center gap-1"><Clock size={14} /> Time</p>
                                        <p className="text-sm font-semibold">{int.time}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500 flex items-center gap-1"><Video size={14} /> Type</p>
                                        <p className="text-sm font-semibold">{int.type}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${int.status === 'Upcoming' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'
                                        }`}>
                                        {int.status}
                                    </span>
                                    <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
                                        <Check size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        {selectedDay !== 24 && (
                            <div className="text-center py-20 glass rounded-2xl border-dashed border-white/10">
                                <p className="text-slate-500">No interviews scheduled for this day.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewScheduler;
