from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.api.schemas import AnalysisResponse, SearchRequest, TopicRequest, PaperResult
from app.tools.pdf_parser import extract_text_from_pdf
from app.agents.paper_agent import analyze_paper
from app.agents.research_agent import find_paper_and_analyze, research_topic_agent
import shutil
import os
import uuid

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_uploaded_paper(
    file: UploadFile = File(...),
    paper_format: str = Form("1") # "1" or "2"
):
    # 1. Save File
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # 2. Extract Text
    try:
        text = extract_text_from_pdf(file_path, columns=paper_format)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF Parsing Failed: {str(e)}")
        
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF. It might be an image scan.")

    # 3. Run Agent Analysis
    result = analyze_paper(text)
    
    if not result:
        raise HTTPException(status_code=500, detail="Analysis failed to generate output.")
        
    # 4. Format Response
    return AnalysisResponse(
        paper_name=result["analysis"].get("paper_name", "Unknown"),
        authors=result["analysis"].get("authors", "Unknown"),
        eagle_eye_summary=result["analysis"],
        literature_review=result["literature_review"]
    )

@router.post("/search_paper")
async def search_paper(request: SearchRequest):
    """
    Feature 2: Search for a paper by name.
    """
    result = find_paper_and_analyze(request.paper_name)
    return result

@router.post("/research_topic", response_model=list[PaperResult])
async def research_topic(request: TopicRequest):
    """
    Feature 3: Topic research and filtering.
    """
    results = research_topic_agent(request.topic, request.keywords)
    return results
