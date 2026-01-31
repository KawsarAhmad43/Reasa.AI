import yaml
import os
from functools import lru_cache
from pydantic import BaseModel
from typing import Optional

CONFIG_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../config.yaml"))

class LLMConfig(BaseModel):
    provider: str
    model_name: str
    temperature: float
    base_url: Optional[str] = None

class APIKeys(BaseModel):
    google_api_key: Optional[str] = None
    serper_api_key: Optional[str] = None

class SearchConfig(BaseModel):
    max_results: int

class Settings(BaseModel):
    llm: LLMConfig
    api_keys: APIKeys
    search: SearchConfig

@lru_cache()
def get_settings() -> Settings:
    if not os.path.exists(CONFIG_PATH):
        raise FileNotFoundError(f"Config file not found at {CONFIG_PATH}")
    
    with open(CONFIG_PATH, "r") as f:
        config_data = yaml.safe_load(f)
        
    return Settings(**config_data)

settings = get_settings()

if settings.api_keys.google_api_key:
    os.environ["GOOGLE_API_KEY"] = settings.api_keys.google_api_key

if settings.api_keys.serper_api_key:
    os.environ["SERPER_API_KEY"] = settings.api_keys.serper_api_key
