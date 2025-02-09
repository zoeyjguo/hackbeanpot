# How to run project

1. Clone the repository
2. In the root directory of the project, run the following command to install the dependencies:
   `npm run setup`
3. Make a `.env` file in `/frontend` containing API keys named `VITE_SPOTIFY_CLIENT_ID` and `VITE_GOOGLE_MAP_API_KEY`. If the file does not contain keys for the Spotify API and Google Maps API, the project will break.
4. Make a `.env` file in `/backend` containing a Gemini API key and `SPOTIFY_CLIENT_SECRET`.
5. Run the following command to start the project:
   `npm run start`
6. Open your browser and navigate to http://localhost:5173
