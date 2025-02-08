import { colors, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';


const Navbar = () => {
    const [username, setUsername] = useState("");
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:5173"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = [
        "playlist-modify-private",
    ]

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token"); 
    };

    const login = () => { 
        fetch('http://localhost:8080/username', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => setUsername(data.username));
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`
    }

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
    
    const [token, setToken] = useState("");

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: colors.green[500]}}>
            <Toolbar>
            {token && (
                <Box>
                <Typography color='#000000' fontWeight={'bold'} fontSize={16} fontFamily={"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"}>
                    Hi {username}!
                </Typography>
                </Box>
            )}
            <Box sx={{ marginLeft: 'auto' }}>
                {!token ? (
                <a className="App-link" rel="noopener noreferrer">
                    <button onClick={login}>Login with Spotify</button>
                </a>
                ) : (
                <button onClick={logout}>Logout</button>
                )}
            </Box>
            </Toolbar>
        </AppBar>
        </Box>
    )
}

export default Navbar;