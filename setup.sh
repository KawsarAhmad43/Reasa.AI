#!/bin/bash

# Agentic RAG Setup Script

echo "Initializing Agentic RAG System..."

# 1. Check Prerequisites
if ! command -v python &> /dev/null; then
    echo "Error: Python is not installed."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    exit 1
fi

# 2. Setup Backend
echo "Setting up Backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python -m venv venv
fi

# Activate venv (Git Bash / Linux style)
source venv/Scripts/activate || source venv/bin/activate

echo "Installing backend dependencies..."
pip install -r requirements.txt

cd ..

# 3. Setup Frontend
echo "Setting up Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
cd ..

echo "------------------------------------------------"
echo "Setup Complete!"
echo "To run the system:"
echo "1. Backend: cd backend && source venv/Scripts/activate && uvicorn app.main:app --reload"
echo "2. Frontend: cd frontend && npm run dev"
echo "------------------------------------------------"
