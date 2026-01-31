from langchain_community.utilities import GoogleSerperAPIWrapper
from langchain_community.tools import DuckDuckGoSearchRun
from app.core.config import settings
import os

# Try importing scholarly safely
try:
    from scholarly import scholarly
    SCHOLARY_AVAILABLE = True
except ImportError:
    scholarly = None
    SCHOLARY_AVAILABLE = False
    print("Warning: 'scholarly' module not found. Google Scholar search will be disabled.")

def search_google_scholar(query: str):
    """
    Search Google Scholar specifically using the scholarly library.
    Returns structured citation data.
    """
    if not SCHOLARY_AVAILABLE:
        print("Scholarly not available.")
        return []

    print(f"Searching Scholar for: {query}")
    results = []
    try:
        search_query = scholarly.search_pubs(query)
        # Fetch top 5 results
        for _ in range(5):
            try:
                item = next(search_query)
                results.append({
                    "title": item.get('bib', {}).get('title', 'Unknown'),
                    "author": item.get('bib', {}).get('author', ['Unknown']),
                    "pub_year": item.get('bib', {}).get('pub_year', 'Unknown'),
                    "venue": item.get('bib', {}).get('venue', 'Unknown'),
                    "abstract": item.get('bib', {}).get('abstract', 'No abstract available.'),
                    "url": item.get('pub_url', ''),
                    "source": "Google Scholar"
                })
            except StopIteration:
                break
    except Exception as e:
        print(f"Scholar search failed: {e}")
        
    return results

def search_web(query: str, search_type: str = "search"):
    """
    Executes a web search.
    """
    # If the intent is explicitly scholar or paper search, try scholarly first
    if "scholar" in search_type or "paper" in search_type:
        scholar_results = search_google_scholar(query)
        if scholar_results:
            return scholar_results

    # Fallback to Serper (Google Search API)
    if os.environ.get("SERPER_API_KEY"):
        try:
            search = GoogleSerperAPIWrapper(type="search", k=settings.search.max_results)
            results = search.results(query)
            if "organic" in results:
                return [
                    {
                        "title": item.get("title"),
                        "link": item.get("link"),
                        "snippet": item.get("snippet"),
                        "source": "Google"
                    }
                    for item in results["organic"]
                ]
        except Exception as e:
            print(f"Serper search failed: {e}")

    # Fallback to DuckDuckGo
    try:
        from langchain_community.tools import DuckDuckGoSearchResults
        ddg_structured = DuckDuckGoSearchResults()
        return [{"raw_content": ddg_structured.invoke(query), "source": "DuckDuckGo"}]
    except Exception as e:
         return []
