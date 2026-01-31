Write-Host "Initializing Agentic RAG System for Windows..." -ForegroundColor Cyan

# 1. Check Prerequisites
if (-not (Get-Command "python" -ErrorAction SilentlyContinue)) {
    Write-Error "Python is not installed or not in PATH."
    exit 1
}

if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is not installed or not in PATH."
    exit 1
}

# 2. Setup Backend
Write-Host "Setting up Backend..." -ForegroundColor Yellow
Set-Location "backend"

if (-not (Test-Path "venv")) {
    Write-Host "Creating Python virtual environment..."
    python -m venv venv
}

# Install dependencies (Using the Python executable inside venv directly ensures correct target)
.\venv\Scripts\python.exe -m pip install -r requirements.txt

Set-Location ".."

# 3. Setup Frontend
Write-Host "Setting up Frontend..." -ForegroundColor Yellow
Set-Location "frontend"

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..."
    npm install
}

Set-Location ".."

Write-Host "------------------------------------------------" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "To run the system:"
Write-Host "1. Backend: cd backend; .\venv\Scripts\activate; uvicorn app.main:app --reload"
Write-Host "2. Frontend: cd frontend; npm run dev"
Write-Host "------------------------------------------------"
