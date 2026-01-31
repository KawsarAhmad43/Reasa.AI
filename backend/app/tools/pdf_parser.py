import pdfplumber
from typing import Literal

def extract_text_from_pdf(file_path: str, columns: Literal["1", "2"] = "1") -> str:
    """
    Extracts text from a PDF file, handling single or double column layouts.

    Args:
        file_path: Path to the PDF file.
        columns: "1" for single column, "2" for double column.
                 Note: pdfplumber generally handles standard double-column papers 
                 well by default (reading logical flow), but we can explicitly 
                 tweak implementation if needed. 
                 For this implementation, we rely on pdfplumber's robust 
                 extraction which respects layout flow better than pypdf.
    
    Returns:
        Extracted text string.
    """
    text_content = []
    
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            # For 2-column papers, properly detecting layout is crucial.
            # pdfplumber.extract_text(layout=True) helps preserve spatial layout,
            # but sometimes simple stream extraction is better for RAG if 
            # we just want the content in order.
            # However, for 2-column, reading left-column then right-column is essential.
            
            # Defaults usually work well, but let's be explicit if needed.
            # "x_tolerance" can be adjusted for column separation.
            
            if columns == "2":
                # stricter x_tolerance to avoid merging columns
                text = page.extract_text(x_tolerance=2, y_tolerance=3) 
            else:
                text = page.extract_text()
                
            if text:
                text_content.append(text)
                
    return "\n\n".join(text_content)
