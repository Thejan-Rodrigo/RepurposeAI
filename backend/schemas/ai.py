from pydantic import BaseModel, Field
from typing import List

class TwitterThread(BaseModel):
    hook: str = Field(description="Attention-grabbing first tweet")
    tweets: List[str] = Field(description="5 to 7 sequential tweets continuing the thread")

class GeneratedAssetsSchema(BaseModel):
    twitter: TwitterThread
    linkedin: str = Field(description="Professional LinkedIn post with hook, body, and bullet points")
    newsletter: str = Field(description="Clean 3-bullet executive summary and deep dive section")