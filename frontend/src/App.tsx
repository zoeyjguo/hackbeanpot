//import { useState } from 'react'
import './App.css'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Places from './places';

type Poi = { key: string, location: google.maps.LatLngLiteral }
const start: Poi = {key: "", location: {lat: 40.45169670885332, lng: -96.67690877146124}};

function App() {
  //const input = document.getElementById("pac-input") as HTMLInputElement;

  return (
    <>
      <Places />
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
    </>
  )
}

export default App
