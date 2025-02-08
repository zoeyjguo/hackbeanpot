import { useState } from 'react'
import './App.css'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type Poi = { key: string, location: google.maps.LatLngLiteral }
const start: Poi = {key: "", location: {lat: 40.45169670885332, lng: -96.67690877146124}};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <Map
          style={{width: '50vw', height: '50vh'}}
          defaultCenter={{lat: 40.45169670885332, lng: -96.67690877146124}}
          defaultZoom={5}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          <Marker key={start.key} position={start.location} />
        </Map>
      </APIProvider>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
