import React from 'react';
import { motion } from 'framer-motion';

const WaveAnimation = ({ isActive, color = "bg-primary" }) => {
    if (!isActive) return <div className="h-10" />;

    return (
        <div className="flex items-center justify-center gap-1 h-10">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        height: [10, 30, 10],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: i * 0.05,
                        ease: "easeInOut"
                    }}
                    className={`w-1 rounded-full ${color}`}
                />
            ))}
        </div>
    );
};

export default WaveAnimation;
