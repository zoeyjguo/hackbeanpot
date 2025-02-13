// import { useState } from 'react';
import '../App.css'
import Box from '@mui/material/Box';
import logo from '../assets/Primary_Logo_Green_RGB.svg'
import Navbar from './navbar';

function Home() {
    // const [playlistName, setPlaylistName] = useState("");
    // const [numSongs, setNumSongs] = useState(1);
    
    // const createPlaylist = () => {
    //   console.log("Creating playlist");
    //   console.log(playlistName);
    //   console.log(numSongs);
    // }

    // const checkValidity = () => {
    //   return numSongs > 3 || numSongs < 1 || playlistName.trim() === "";
    // }

    return (
        <Box sx={{ minHeight: "100vh", padding: 3 }}>
            <Navbar />
            <div className="App">
              <header className="App-header">
                <img src={logo} width="200" height="200" alt="Spotify Logo" />
                <h1>Road Trip Tunes</h1>
                <div className="App-body">
                <p>
                  Welcome to Road Trip Tunes! This app will help you create the perfect playlist for your next road trip.
                </p>
                <p>
                  To get started, click the "Login with Spotify" button above.
                </p>
                </div>
                {/* <div className="App-form" style={{ gap: "10px" }}>
                  Playlist name: <input type="text" id={playlistName} maxLength={200} style={{ marginRight: "10px" }}
                  onChange={event => setPlaylistName(event.target.value)} />
                  Number of songs per attraction: <input type="number" id={numSongs.toString()} min="1" max="3"
                    onChange={event => setNumSongs(Number(event.target.value))} defaultValue="1"/>
                </div>
                <button onClick={createPlaylist} disabled={checkValidity()}>Create Playlist</button> */}
              </header>
            </div>
      </Box>
    );
  }

export default Home;