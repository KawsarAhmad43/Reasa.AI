from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import routes

app = FastAPI(
    title="Reasa.AI - Agentic RAG Research System",
    description="Advanced RAG pipeline for research paper analysis and literature review.",
    version="1.0.0"
)

# CORS Middleware (Allowing frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "message": "Agentic RAG System is Running",
        "config": {
            "llm_provider": settings.llm.provider,
            "model": settings.llm.model_name
        }
    }

if __name__ == "__main__":
    import uvicorn
    # reload=True can cause multiprocessing issues on Windows in some envs unless run as module 
    # Use workers=1 for stability.
    uvicorn.run(app, host="0.0.0.0", port=8000)
