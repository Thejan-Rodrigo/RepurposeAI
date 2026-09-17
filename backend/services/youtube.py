import re
from youtube_transcript_api import YouTubeTranscriptApi

def extract_video_id(url: str) -> str | None:
    regex = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
    match = re.search(regex, url)
    return match.group(1) if match else None

def get_youtube_transcript(url: str) -> str:
    video_id = extract_video_id(url)
    if not video_id:
        raise ValueError("Invalid YouTube URL")

    # Fetches transcript entries
    api = YouTubeTranscriptApi()
    
    fetched = api.fetch(video_id).to_raw_data()

    full_text = " ".join(entry["text"] for entry in fetched)

    return full_text