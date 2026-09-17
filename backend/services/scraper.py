import requests
from bs4 import BeautifulSoup


def scrape_article_text(url: str) -> str:
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0 Safari/537.36"
        )
    }

    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    # Remove elements that usually don't contain article content
    for element in soup(["script", "style", "nav", "footer", "header"]):
        element.decompose()

    paragraphs = soup.find_all("p")

    article_text = " ".join(
        p.get_text(" ", strip=True)
        for p in paragraphs
    )

    if not article_text.strip():
        raise ValueError("No readable text found on page")

    return article_text
