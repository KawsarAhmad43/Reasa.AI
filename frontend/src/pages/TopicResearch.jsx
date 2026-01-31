import React, { useState } from 'react';
import axios from 'axios';
import { Search, ExternalLink, Filter, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopicResearch = () => {
    const [mode, setMode] = useState('research');
    const [query, setQuery] = useState('');
    const [keywords, setKeywords] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        setResults([]);
        try {
            let endpoint = mode === 'research' ? 'http://localhost:8000/api/v1/research_topic' : 'http://localhost:8000/api/v1/search_paper';
            const payload = mode === 'research' ? { topic: query, keywords: keywords } : { paper_name: query };
            const response = await axios.post(endpoint, payload);

            if (mode === 'research') setResults(response.data);
            else {
                if (response.data.status === 'Found') {
                    const info = response.data.paper_info || {};
                    const mockResult = { title: info.title || "Paper Found", link: info.url || response.data.url, year: info.pub_year || "Unknown", journal: info.venue || "Google Scholar", snippet: info.abstract || response.data.message };
                    setResults([mockResult]);
                } else alert(JSON.stringify(response.data));
            }
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    return (
        <div className="pt-8 pb-12 max-w-6xl mx-auto space-y-12">
            <div className="glass-morphism rounded-[3rem] p-12 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-5xl font-black text-white mb-6">Deep Knowledge Base</h1>

                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="flex gap-4 justify-center mb-8">
                            {['research', 'paper_search'].map(m => (
                                <button key={m} onClick={() => setMode(m)} className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${mode === m ? 'bg-white text-black' : 'bg-black/40 text-white hover:bg-white hover:text-black'}`}>
                                    {m.replace('_', ' ')}
                                </button>
                            ))}
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                placeholder={mode === 'research' ? "Research Topic..." : "Paper Title..."}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="input-liquid text-2xl font-light text-center"
                            />
                        </div>

                        {mode === 'research' && (
                            <input
                                type="text"
                                placeholder="Refinement Keywords..."
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                className="input-liquid text-center"
                            />
                        )}

                        <button onClick={handleSearch} disabled={loading} className="px-12 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50">
                            {loading ? "SEARCHING..." : "EXECUTE SEARCH"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                <AnimatePresence>
                    {results.map((paper, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-morphism rounded-[2rem] p-8 flex gap-8 items-center link-card hover:bg-white/10 transition-colors">
                            <div className="text-6xl font-black text-white/5">{idx + 1}</div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-2">{paper.title}</h3>
                                <div className="flex gap-4 text-sm text-cyan-300 font-mono mb-4">
                                    <span>{paper.year}</span>
                                    <span>{paper.journal || "SCHOLAR"}</span>
                                </div>
                                <p className="text-white/60 mb-6 line-clamp-2">{paper.snippet}</p>
                                <a href={paper.link} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 rounded-lg border border-white/20 text-white text-xs font-bold uppercase hover:bg-white hover:text-black transition-all">
                                    Access Source
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TopicResearch;
