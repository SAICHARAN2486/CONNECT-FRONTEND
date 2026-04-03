import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';

const LanguageDisplayCard = ({ title, text, langLabel, flag, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="glass-card flex-1 min-w-[280px] space-y-4 border-l-4 border-l-primary"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{flag}</span>
                    <h4 className="font-black text-sm uppercase tracking-widest text-slate-500">{title}</h4>
                </div>
                <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-primary border border-primary/20">
                    {langLabel}
                </div>
            </div>

            <p className="text-lg font-medium leading-relaxed min-h-[60px]">
                {text || <span className="opacity-20">Waiting for input...</span>}
            </p>
        </motion.div>
    );
};

export default LanguageDisplayCard;
