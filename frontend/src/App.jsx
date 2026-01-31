import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundEntity from './components/BackgroundEntity';
import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import TopicResearch from './pages/TopicResearch';

function App() {
    return (
        <Router>
            <div className="relative min-h-screen">
                <BackgroundEntity />
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/analyze" element={<Analyzer />} />
                        <Route path="/search" element={<TopicResearch />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
