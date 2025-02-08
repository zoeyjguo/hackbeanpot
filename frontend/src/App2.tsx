import { useState } from 'react'
import './App.css'

function App() {
    const [username, setUsername] = useState<string>("")


    // Load all partners on initial page load
    // useEffect(() => {
    //
    // }, [])



    const makeAPICall = () => {
        console.log("made api call?")

        fetch('http://localhost:8080/login')
          .then(response => response.json())
          .then(data => {
              window.location.href = data.url;  // Redirect the user
          })
          .catch(error => console.error('Error:', error));
        // api call and response
        // store response in a state variable
        console.log("end api call")
    }

    const getDisplayname = () => {
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
    }

    const createPlaylist = () => {
        fetch('http://localhost:8080/createPlaylist', {
            method: 'POST'
        })
            .then((res) => {
                if (res.ok) {
                    console.log("Created playlist")
                    console.log(res.status)
                } else {
                    console.log("Failure to create playlist")
                    console.log(res.status)
                }
            })
            .catch(error => console.error('Error:', error));
        // api call and response
        // store response in a state variable
        console.log("end create playlist")
    }

    // useEffect(()=>{
    //     makeAPICall();
    // }, [])

    const handleClickEvent = () => {
        makeAPICall();
        // window.location.href = 'http://localhost:8080/createPlaylist';
    }

    const handleGetUsername = () => {
        getDisplayname();
    }

    const handleCreatePlaylist = () => {
        createPlaylist();
    }

    return (
    <div className="App">
      <header className="App-header">
        <button type={"button"} onClick={handleClickEvent}>Login!</button>
          <button type={"button"} onClick={handleCreatePlaylist}>Create playlist!</button>
          <button type={"button"} onClick={handleGetUsername}>Show username: {username}</button>


        {/*<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>*/}
      </header>
    </div>
  )
}

export default App
