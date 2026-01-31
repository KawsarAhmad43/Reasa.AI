from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from app.core.llm import get_llm

# --- Prompts ---

EAGLE_EYE_PROMPT = """
You are a professional research assistant acting as an expert reviewer.
Analyze the following research paper text and provide a structured "Eagle Eye" summary.
The paper is from the Computer Science / Engineering (CSE) domain.

Extract and summarize the following details accurately:
1. **Paper Name**: The full title of the paper.
2. **Authors**: List of authors in order.
3. **Main Theme**: What implies the core subject?
4. **What was Done**: Briefly explain the work undertaken.
5. **Achievement**: What was achieved? (Results, improvements).
6. **Mechanism/Process**: How was it done? (Methodology).
7. **Accuracy/Performance**: Quantitative metrics mentioned (e.g., 98% accuracy, F1-score).
8. **Drawbacks/Limitations**: What are the stated or implied limitations?
9. **Algorithms Used**: List specific algorithms or models used.

Output the result as a VALID JSON object with keys corresponding to the bolded terms above (snake_case keys: paper_name, authors, main_theme, what_was_done, achievement, mechanism, accuracy, drawbacks, algorithms).

Paper Text:
{text}
"""

LIT_REVIEW_PROMPT = """
You are a professional researcher writing a Literature Review for a new paper.
Based on the following analysis of a research paper, write a short, high-density paragraph.

Format:
"Mr. [First Author Last Name] et al. proposed [Methodology/Model] for [Problem Domain] where [Brief Explanation of Mechanism]. They achieved [Accuracy/Performance] using [Algorithms]. However, [Limitations/Drawbacks]..."

Do not explicitly state "Here is the review". Just write the paragraph. Keep it professional and concise.

Paper Analysis Data:
{analysis_json}
"""

def analyze_paper(text: str):
    """
    Orchestrates the analysis flow.
    """
    llm = get_llm()
    
    # 1. Eagle Eye Analysis
    eagle_eye_chain = ChatPromptTemplate.from_template(EAGLE_EYE_PROMPT) | llm | JsonOutputParser()
    
    print("Running Eagle Eye Analysis...")
    try:
        # Chunk text if too large? 
        # For now assuming context window supports it (Gemini does, Llama3.2 might struggle with huge papers)
        # simplistic truncation for safety on local models:
        truncated_text = text[:30000] # approx 7-8k tokens, safe for many contexts, maybe small for Llama3.2 8k?
        # Llama 3.2 supports 128k context, so we are good if user runs compatible version.
        # But base llama3.2 is often 128k.
        
        analysis_result = eagle_eye_chain.invoke({"text": truncated_text})
    except Exception as e:
        print(f"Error in analysis: {e}")
        return None

    # 2. Literature Review Generation
    lit_review_chain = ChatPromptTemplate.from_template(LIT_REVIEW_PROMPT) | llm | StrOutputParser()
    
    print("Generating Literature Review...")
    lit_review = lit_review_chain.invoke({"analysis_json": analysis_result})
    
    return {
        "analysis": analysis_result,
        "literature_review": lit_review
    }
