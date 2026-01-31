Write-Host "Starting Agentic RAG Backend (Safe Mode)..." -ForegroundColor Green

Set-Location "backend"

# Run as module to avoid Windows multiprocessing issues with uvicorn reloader
.\venv\Scripts\python.exe -m app.main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend exited with error code $LASTEXITCODE" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
}
