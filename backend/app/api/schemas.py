from pydantic import BaseModel
from typing import Optional, Literal, List

class AnalysisRequest(BaseModel):
    paper_format: Literal["1", "2"] = "1"
    
class AnalysisResponse(BaseModel):
    paper_name: str
    authors: str
    eagle_eye_summary: dict
    literature_review: str

class SearchRequest(BaseModel):
    paper_name: str

class TopicRequest(BaseModel):
    topic: str
    keywords: str

class PaperResult(BaseModel):
    title: str
    link: str
    year: str
    snippet: str
    journal: str
