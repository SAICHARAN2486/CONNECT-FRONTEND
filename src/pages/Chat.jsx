import React, { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { motion } from 'framer-motion';
import { Send, User, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

const Chat = () => {
    const { user } = useSelector((state) => state.auth);
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat('general-room'); // In a real app, room ID would be dynamic

    const onSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage({
                roomId: 'general-room',
                senderId: user?._id,
                senderName: user?.name,
                message: input,
                timestamp: new Date().toISOString(),
            });
            setInput('');
        }
    };

    return (
        <div className="glass-card flex flex-col h-[calc(100vh-140px)] p-0 overflow-hidden">
            <div className="flex bg-white bg-opacity-5 border-b border-white border-opacity-10">
                {/* Contact List */}
                <div className="w-80 border-r border-white border-opacity-10 flex flex-col">
                    <div className="p-4 space-y-4">
                        <h3 className="font-bold text-lg">Messages</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                            <input
                                type="text"
                                className="input-glass w-full pl-9 py-2 text-sm"
                                placeholder="Search chats..."
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {[1, 2, 3].map(c => (
                            <div key={c} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-white hover:bg-opacity-5 ${c === 1 ? 'bg-primary bg-opacity-10 border-r-2 border-primary' : ''}`}>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                                <div>
                                    <h5 className="text-sm font-bold">TechCorp HR</h5>
                                    <p className="text-xs text-slate-400">Hey Alex, we saw your...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    <div className="p-4 flex items-center justify-between border-b border-white border-opacity-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                            <div>
                                <h5 className="font-bold">TechCorp HR</h5>
                                <span className="text-xs text-green-400">Online</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                        {messages.map((msg, i) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={i}
                                className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] p-4 rounded-2xl ${msg.senderId === user?._id
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'glass text-slate-200 rounded-tl-none'
                                    }`}>
                                    <p className="text-sm">{msg.message}</p>
                                    <span className="text-[10px] opacity-50 mt-1 block">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <form onSubmit={onSend} className="p-4 bg-white bg-opacity-5 flex gap-2">
                        <input
                            type="text"
                            className="input-glass flex-1"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="btn-primary p-3 rounded-xl">
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
