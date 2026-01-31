# Agentic RAG Research Pipeline

## Project Overview
This project is a highly efficient, advanced architectural Agentic RAG (Retrieval-Augmented Generation) system designed for researchers. It leverages **LangChain** and **FastAPI** for the backend and a minimalistic **React** frontend. The core purpose is to alleviate the time constraints researchers face by providing autonomous agents that can analyze papers, perform literature reviews, and conduct topic-based research with human-like professional quality.

## Features

### 1. Deep Paper Analysis & Literature Review
- **Upload & Format Handling**: Users can upload research papers (PDF). The system intelligently adapts to single-column or double-column layouts.
- **Eagle Eye Analysis**: Generates a structured summary including:
    - Paper Name & Author List
    - Main Theme & Objectives
    - Methodology & Mechanisms
    - Achievements & Accuracy Data
    - Limitations & Drawbacks
    - Algorithms Used
- **Professional Literature Review**: Auto-generates a short, dense paragraph suitable for direct inclusion in a new research paper (e.g., "Mr. X proposed xx...").
- **Downloadable Reports**: Users can download the generated analysis.

### 2. Google Scholar Search & Analysis
- **Search Integration**: Users provide a paper name.
- **Agentic Retrieval**: The system finds the paper via Google Scholar.
- **Auto-Analysis**: Applies the same deep analysis (Feature 1) to the retrieved paper.

### 3. Smart Topic Research
- **Topic Filtering**: User inputs a research topic (e.g., "Diabetes detection using ML") and keywords.
- **Ranked Results**: Returns a list of relevant papers sorted by recency and venue impact (High Impact Journals/Conferences).
- **Interactive Exploration**: Options to "Visit" (redirect to source) or "Analyze" (trigger Feature 1/2).

## Tech Stack
- **Backend**: Python, FastAPI, LangChain, LangGraph.
- **Frontend**: React, Vite, TailwindCSS.
- **LLM Support**:
    - **Local**: Ollama (Llama 3.2).
    - **Cloud**: Gemini 2.5 Flash (via API).
- **Configuration**: `config.yaml` for easy model switching.

## Requirements
- **OS**: Windows (supported via `setup.ps1` or `setup.sh`), Linux, or Mac.
- **Python**: 3.10+
- **Node.js**: 16+
- **Ollama**: Installed and running (for local mode).

---

## Project Folder Structure

This project follows a clean architecture pattern to separate concerns between the API, the Agentic logic, and the UI.

```
agentic-rag-research/
├── config.yaml                     # Global configuration (LLM selection, API keys)
├── setup.sh                        # Setup script (Linux/Mac/Git Bash)
├── setup.ps1                       # Setup script (Windows PowerShell)
├── README.md                       # This file
│
├── backend/                        # FastAPI Backend
│   ├── main.py                     # Application Entry Point
│   ├── requirements.txt            # Python dependencies
│   ├── app/
│   │   ├── __init__.py
│   │   ├── core/
│   │   │   ├── config.py           # Loads config.yaml
│   │   │   └── llm.py              # LLM Factory (Ollama vs Gemini)
│   │   ├── api/
│   │   │   ├── routes.py           # API Endpoints (Upload, Search, Topic)
│   │   │   └── schemas.py          # Pydantic models for request/response
│   │   ├── agents/
│   │   │   ├── workflow.py         # LangGraph workflow definitions
│   │   │   ├── paper_agent.py      # Logic for PDF parsing & analysis
│   │   │   └── research_agent.py   # Logic for Scholar search & topic filtering
│   │   ├── tools/
│   │   │   ├── pdf_parser.py       # Custom tool for column-aware PDF reading
│   │   │   └── web_search.py       # wrapper for Google Scholar / Search tools
│   │   └── services/
│   │       └── report_generator.py # Generates downloadable reports
│
└── frontend/                       # React Frontend
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx                 # Routing logic
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── FileUpload.jsx      # Drag & drop PDF zone
    │   │   └── ResultCard.jsx      # Reusable card for paper results
    │   ├── pages/
    │   │   ├── Dashboard.jsx       # Home
    │   │   ├── Analyzer.jsx        # Feature 1 & 2 view
    │   │   └── TopicResearch.jsx   # Feature 3 view
    │   └── services/
    │       └── api.js              # Axios calls to backend
```
