import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

const Analyzer = () => {
    const [file, setFile] = useState(null);
    const [paperFormat, setPaperFormat] = useState("1");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = (acceptedFiles) => setFile(acceptedFiles[0]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });

    const handleAnalyze = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('paper_format', paperFormat);
        try {
            const response = await axios.post('http://localhost:8000/api/v1/analyze', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setResult(response.data);
        } catch (err) { setError(err.response?.data?.detail || "Analysis failed."); }
        finally { setLoading(false); }
    };

    return (
        <div className="pt-32 pb-12 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
            {/* Left Panel: Controls */}
            <div className="lg:col-span-4 space-y-6">
                <div className="glass-morphism rounded-[2rem] p-8 space-y-8 sticky top-24">
                    <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">
                        Upload Matrix
                    </h2>

                    <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/20 hover:border-white/40 hover:bg-white/5'}`}>
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center gap-4">
                            {file ? (
                                <div className="text-cyan-300 font-mono text-sm">{file.name}</div>
                            ) : (
                                <div className="text-white/50">Drop PDF Source</div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-1 bg-black/40 rounded-xl">
                        {['1', '2'].map(fmt => (
                            <button key={fmt} onClick={() => setPaperFormat(fmt)} className={`py-3 rounded-lg font-bold transition-all ${paperFormat === fmt ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}>
                                {fmt === "1" ? "Single Col" : "Two Cols"}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!file || loading}
                        className={`w-full py-4 rounded-xl font-bold tracking-wider uppercase transition-all ${!file || loading ? 'bg-white/5 text-white/20' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] text-white'}`}
                    >
                        {loading ? "Processing..." : "Initiate Agent"}
                    </button>
                </div>
            </div>

            {/* Right Panel: Data Visualization */}
            <div className="lg:col-span-8 min-h-[60vh]">
                <AnimatePresence mode='wait'>
                    {result ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="glass-morphism rounded-[2rem] p-10 border-l-4 border-l-cyan-400">
                                <h1 className="text-4xl font-black text-white mb-2">{result.paper_name}</h1>
                                <p className="text-cyan-300 font-mono mb-8">{result.authors}</p>
                                <div className="bg-black/30 p-8 rounded-2xl border border-white/10 text-white/90 leading-loose italic">
                                    "{result.literature_review}"
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {Object.entries(result.eagle_eye_summary).map(([key, value]) => {
                                    if (key === 'paper_name' || key === 'authors') return null;
                                    return (
                                        <div key={key} className="glass-morphism rounded-2xl p-6 hover:bg-white/10 transition-colors">
                                            <div className="text-xs font-bold text-white/40 uppercase mb-2 tracking-widest">{key.replace(/_/g, " ")}</div>
                                            <div className="text-white font-light">{typeof value === 'object' ? JSON.stringify(value) : value}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center glass-morphism rounded-[2rem] border-dashed border-2 border-white/10">
                            <div className="text-white/20 text-xl font-light">Awaiting Data Input</div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Analyzer;
