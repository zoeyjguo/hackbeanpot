import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/home';
import Location from './components/location';

function App() {

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/playlist" element={<Home />} />
        </Routes>
      </Router>
    );
  }


export default App;