import { useMemo, useState } from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps';
//import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';

export default function Places() {
    useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        libraries: ["places"]
    })

    // if (isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
        return <MyMap />;
    //}
}

function MyMap() {
    const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
    const [selected, setSelected] = useState<{ lat: number, lng: number } | null> (null);
  
    return (
      <>
        <div className="places-container">
            <PlacesAutocomplete setSelected={setSelected}/>
        </div>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
            <Map
            style={{width: '50vw', height: '50vh'}}
            defaultCenter={{lat: 40.45169670885332, lng: -96.67690877146124}}
            defaultZoom={5}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            />
        </APIProvider>
      </>
    );
}



  const PlacesAutocomplete = ({ setSelected }: {setSelected: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>}) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleSelect = async (address:string) => {
      setValue(address, false);
      clearSuggestions();
  
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    };
  
    return (
      <div>
        {/* Basic input field */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="input"
          placeholder="Search an address"
        />
  
        {/* Suggestions List */}
        {status === "OK" && (
          <ul className="suggestions-list">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                className="suggestion-item"
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };