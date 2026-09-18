from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.youtube import get_youtube_transcript
from services.scraper import scrape_article_text
from services.ai import generate_social_assets

app = FastAPI()

class GenerateRequest(BaseModel):
    url: str

@app.post("/api/generate")
async def generate_content(payload: GenerateRequest):
    try:
        # Step 1: Extract text
        if "youtube.com" in payload.url or "youtu.be" in payload.url:
            raw_text = get_youtube_transcript(payload.url)
        else:
            raw_text = scrape_article_text(payload.url)

        # Step 2: Generate structured content
        social_assets = generate_social_assets(
            raw_text[:12000]
        )

        return {
            "status": "success",
            "data": social_assets.model_dump()
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
