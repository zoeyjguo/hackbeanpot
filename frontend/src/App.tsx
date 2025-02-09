import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/home';
import Location from './components/location';
import TravelPage from './components/TravelPage.tsx';

function App() {

    return (
      <><Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Location />} />
        </Routes>
      </Router><div className="min-h-screen bg-gray-100 py-10">
          <TravelPage />
        </div></>
    );
  }


export default App;