import { useState } from 'react'
import './App.css'

function App() {
    const [data, setData] = useState<string>("")


    // Load all partners on initial page load
    // useEffect(() => {
    //
    // }, [])



    const makeAPICall = () => {
        console.log("made api call?")

        fetch('http://localhost:8080/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then(data => setData(data))
        // api call and response
        // store response in a state variable
        console.log("end api call")
    }

    // useEffect(()=>{
    //     makeAPICall();
    // }, [])

    const handleClickEvent = () => {
        makeAPICall();
        // window.location.href = 'http://localhost:8080/createPlaylist';
    }

    return (
    <div className="App">
      <header className="App-header">
        <button type={"button"} onClick={handleClickEvent}>Click me! {data}</button>

        {/*<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>*/}
      </header>
    </div>
  )
}

export default App
