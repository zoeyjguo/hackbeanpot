import requests

url = "http://localhost:2025/generate_playlist"
data = {
    "location": "Paris",
    "mood": "romantic",
    "activity": "dining and sightseeing"
}

response = requests.post(url, json=data)

print(response.json())