import os
from google import genai
from google.genai import types
from schemas.ai import GeneratedAssetsSchema
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
You are an expert digital marketer and content strategist. 
Your job is to analyze raw transcripts/articles and repurpose them into highly engaging social media assets.

Guidelines:
1. Twitter Thread: Start with a strong hook tweet, followed by 5-7 concise, actionable tweets.
2. LinkedIn Post: Focus on a professional narrative, key takeaways with bullet points, and a call-to-action.
3. Newsletter Summary: Provide a 3-bullet summary followed by a brief key takeaway section.
"""

def generate_social_assets(raw_text: str) -> GeneratedAssetsSchema:
    prompt = f"Repurpose the following content into social assets:\n\n{raw_text}"

    # Force Gemini to conform strictly to our Pydantic JSON Schema
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            response_mime_type="application/json",
            response_schema=GeneratedAssetsSchema,
            temperature=0.7,
        ),
    )
    
    # Returns fully parsed Pydantic object
    return response.parsed