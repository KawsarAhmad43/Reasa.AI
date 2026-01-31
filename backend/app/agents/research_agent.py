from app.tools.web_search import search_web
from app.agents.paper_agent import analyze_paper
from app.core.llm import get_llm
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import time

# --- Prompts ---

TOPIC_FILTER_PROMPT = """
You are a Senior Research Navigator.
You have been given a list of raw search results for the research topic: "{topic}".
Your goal is to curate a highly relevant list of papers/articles from these results.

Criteria for selection:
1. **Relevance**: Must strongly match the topic and keywords.
2. **Recency**: Prioritize works from 2023, 2024, 2025.
3. **Quality**: Prioritize known journals/conferences (IEEE, ACM, Springer, Nature, CVPR, NeurIPS) if mentioned.

Input Data:
{search_results}

Output a VALID JSON list of objects. Each object must have:
- "title": Paper title
- "link": URL
- "year": Estimated year (or "Unknown")
- "snippet": Brief summary
- "journal": Estimated journal/conference (or "Unknown")

Sort the list by Quality (High to Low) and then by Recency (Newest first).
"""

def find_paper_and_analyze(paper_name: str):
    """
    Feature 2: Searches for a paper and analyzes it.
    """
    # 1. Search for the paper 
    results = search_web(paper_name, search_type="scholar")
    
    if not results:
        return {"error": "Paper not found."}
        
    # Pick best result
    paper = results[0]
    
    # Check if we have a URL to a PDF?
    # Scholar often gives 'pub_url'.
    
    return {
        "status": "Found",
        "paper_info": paper,
        "message": "Paper metadata found via Google Scholar.",
        "simple_analysis": f"Found: {paper.get('title')}\nAuthors: {paper.get('author')}\nAbstract: {paper.get('abstract')}\nLink: {paper.get('url')}"
    }

def research_topic_agent(topic: str, keywords: str):
    """
    Feature 3: Topic Research
    """
    full_query = f"{topic} {keywords}"
    
    # 1. Search (Scholar preferred)
    print(f"Searching for topic: {topic}")
    raw_results = search_web(full_query, search_type="scholar")
    
    # Reuse raw results if they are already structured from Scholar
    formatted_results = []
    for res in raw_results:
        # Check if it has 'source': 'Google Scholar'
        if res.get("source") == "Google Scholar":
             formatted_results.append({
                 "title": res.get("title"),
                 "link": res.get("url"),
                 "year": str(res.get("pub_year")),
                 "snippet": res.get("abstract")[:200] + "...",
                 "journal": res.get("venue")
             })
        else:
            # Fallback for DDG/Serper results (needs LLM parsing, but skipping for speed/robustness if scholar works)
             pass

    if formatted_results:
        return formatted_results

    # If no scholar results, fall back to LLM parsing of generic search
    llm = get_llm()
    chain = ChatPromptTemplate.from_template(TOPIC_FILTER_PROMPT) | llm | JsonOutputParser()
    try:
        return chain.invoke({
            "topic": topic,
            "search_results": str(raw_results)
        })
    except:
        return []
