import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, BookOpen, Activity } from 'lucide-react';
import logo from '../assets/logo.png';


const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path
        ? "text-blue-400 bg-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        : "text-slate-300 hover:text-white hover:bg-white/5";

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={logo} alt="Logo" className="h-10 w-10 object-contain rounded-xl" />
                        <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Reasa.AI
                        </span>
                    </Link>

                    <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/5 backdrop-blur-sm">
                        <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive('/')}`}>
                            <Activity size={18} /> <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                        <Link to="/analyze" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive('/analyze')}`}>
                            <BookOpen size={18} /> <span className="hidden sm:inline">Analyst</span>
                        </Link>
                        <Link to="/search" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive('/search')}`}>
                            <Search size={18} /> <span className="hidden sm:inline">Search</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
