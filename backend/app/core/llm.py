from langchain_ollama import ChatOllama
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings

def get_llm():
    """
    Factory function to return the configured LLM instance.
    """
    if settings.llm.provider == "ollama":
        return ChatOllama(
            model=settings.llm.model_name,
            base_url=settings.llm.base_url,
            temperature=settings.llm.temperature
        )
    elif settings.llm.provider == "gemini":
        return ChatGoogleGenerativeAI(
            model=settings.llm.model_name,
            temperature=settings.llm.temperature,
            convert_system_message_to_human=True
        )
    else:
        raise ValueError(f"Unsupported LLM provider: {settings.llm.provider}")
