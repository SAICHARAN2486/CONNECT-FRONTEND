import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

const MicrophoneButton = ({ isListening, onClick }) => {
    return (
        <div className="relative flex items-center justify-center">
            {/* Pulsing Rings */}
            {isListening && (
                <>
                    <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                        className="absolute w-32 h-32 rounded-full bg-primary/30"
                    />
                    <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
                        className="absolute w-32 h-32 rounded-full bg-secondary/20"
                    />
                </>
            )}

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isListening
                        ? 'bg-red-500 shadow-red-500/50'
                        : 'bg-gradient-to-br from-primary to-secondary shadow-primary/50'
                    }`}
            >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity" />
                <Mic size={36} className="text-white" />

                {/* Glowing Border */}
                <div className={`absolute -inset-1 rounded-full blur opacity-40 animate-pulse ${isListening ? 'bg-red-400' : 'bg-primary'
                    }`} />
            </motion.button>
        </div>
    );
};

export default MicrophoneButton;
