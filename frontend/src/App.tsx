import './App.css'

function App() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPES = [
    "playlist-modify-private",
  ]

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Login with Spotify
        </a>        
      </header>
    </div>
  )
}

export default App
