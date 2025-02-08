import { useEffect, useState } from 'react';
import './App.css'
import logo from './assets/Primary_Logo_green_RGB.svg'

function App() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPES = [
    "playlist-modify-private",
  ]

  const [token, setToken] = useState("")

      useEffect(() => {
          const hash = window.location.hash
          let token = window.localStorage.getItem("token")

          if (!token && hash) {
              token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))!.split("=")[1]

              window.location.hash = ""
              window.localStorage.setItem("token", token)
          }

          setToken(token!)

      }, [])

      const logout = () => {
        setToken("");
        window.localStorage.removeItem("token"); 
      };

      const login = () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`
      }

      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} width="200" height="200" alt="Spotify Logo" />
                  <h1>Spotify React</h1>
                  {!token ?
                      <a className = "App-link" rel="noopener noreferrer">
                        <button onClick={login}>Login with Spotify</button>
                      </a>
                      : <><h3> Hi {CLIENT_ID}! </h3><button onClick={logout}>Logout</button></>}
              </header>
          </div>
      );
  }

export default App;