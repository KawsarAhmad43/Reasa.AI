import React from 'react';
import { motion } from 'framer-motion';

const AIAvatar = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">

            {/* Core Glowing Orb */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full mix-blend-screen"
            />

            {/* Rotating Neural Rings */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[600px] h-[600px] rounded-full border border-cyan-500/10 border-t-cyan-500/30 border-r-cyan-500/30 blur-sm"
            />

            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[700px] h-[700px] rounded-full border border-purple-500/10 border-b-purple-500/30 border-l-purple-500/30 blur-sm"
            />

            {/* Floating Particles / Energy Blobs */}
            <motion.div
                animate={{
                    rotate: 180,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400/10 via-transparent to-purple-400/10 blur-[80px] rounded-full mix-blend-screen"
            />

            {/* Inner "Eye" Pulse */}
            <div className="absolute w-[100px] h-[100px] bg-white/5 blur-[50px] rounded-full animate-pulse" />

        </div>
    );
};

export default AIAvatar;
