import { colors, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';


const Navbar = () => {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token"); 
    };

    const login = () => { 
        fetch('http://localhost:8080/login')
            .then(response => response.json())
            .then(data => {
                window.location.href = data.url;  // Redirect the user
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        // const hash = window.location.hash
        // let token = window.localStorage.getItem("token")

        // if (!token && hash) {
        //     token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))!.split("=")[1]

        //     window.location.hash = ""
        //     window.localStorage.setItem("token", token)
        // }

        // setToken(token!)
        fetch('http://localhost:8080/username', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(data => {
                setUsername(data.username);
                console.log('Username:', data.username);
            })
            .catch(error => console.error('Error:', error));
        // api call and response
        // store response in a state variable
        console.log("end api call")
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: colors.green[500]}}>
            <Toolbar>
            {username && (
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