from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.youtube import get_youtube_transcript
from services.scraper import scrape_article_text

app = FastAPI()

class ExtractRequest(BaseModel):
    url: str

@app.post("/api/extract")
async def extract_content(payload: ExtractRequest):
    url = payload.url
    print(payload.url)
    try:
        if "youtube.com" in url or "youtu.be" in url:
            print("Youtube")
            raw_text = get_youtube_transcript(url)
            print("Youtube")
            source_type = "youtube"
        else:
            raw_text = scrape_article_text(url)
            source_type = "article"
            
        return {
            "status": "success",
            "source_type": source_type,
            "raw_text": raw_text[:10000] # Cap text length to stay within safe bounds
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))