import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import AIAvatar from '../components/AIAvatar';

const Dashboard = () => {
    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center space-y-16 overflow-hidden">

            {/* Background AI Entity */}
            <AIAvatar />

            <div className="relative z-10 flex flex-col items-center justify-center py-10">
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-200 tracking-tighter mb-2">
                    Reasa<span className="text-cyan-400">.AI</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
                    Your advanced research assistant for deep analysis and discovery.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
                <Link to="/analyze" className="group">
                    <div className="glass-morphism liquid-card rounded-[2.5rem] p-10 h-full flex flex-col items-start justify-between min-h-[300px]">
                        <div className="space-y-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                                <BookOpen size={32} />
                            </div>
                            <div className="text-left">
                                <h2 className="text-3xl font-bold text-white mb-2">Paper Analyst</h2>
                                <p className="text-white/60 text-lg">Detailed critique and Eagle-Eye summarization.</p>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent my-6"></div>
                        <div className="flex items-center text-cyan-300 font-bold tracking-wide group-hover:text-white transition-colors">
                            INITIALIZE <ArrowRight size={18} className="ml-2" />
                        </div>
                    </div>
                </Link>

                <Link to="/search" className="group">
                    <div className="glass-morphism liquid-card rounded-[2.5rem] p-10 h-full flex flex-col items-start justify-between min-h-[300px]">
                        <div className="space-y-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                                <Search size={32} />
                            </div>
                            <div className="text-left">
                                <h2 className="text-3xl font-bold text-white mb-2">Deep Research</h2>
                                <p className="text-white/60 text-lg">Scholar-backed discovery and trend tracking.</p>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent my-6"></div>
                        <div className="flex items-center text-purple-300 font-bold tracking-wide group-hover:text-white transition-colors">
                            INITIALIZE <ArrowRight size={18} className="ml-2" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
