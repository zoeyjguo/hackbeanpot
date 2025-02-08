import './App.css'
import logo from './assets/Primary_Logo_green_RGB.svg'
import Navbar from './components/navbar'

function App() {
      return (
        <><Navbar /><div className="App">
          <header className="App-header">
            <img src={logo} width="200" height="200" alt="Spotify Logo" />
            <h1>Road Trip Tunes</h1>
          </header>
        </div></>
      );
  }

export default App;