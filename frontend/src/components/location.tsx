import { useState } from "react";
import Navbar from "./navbar";
import Autocomplete from "react-google-autocomplete";

const Location = () => {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
                <div style={{ width: "300px" }}>
                    <Autocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                        onPlaceSelected={(place) => {
                            if (place.geometry) {
                                const lat = place.geometry.location.lat();
                                const lng = place.geometry.location.lng();
                                console.log("Latitude:", lat, "Longitude:", lng);
                                setCoordinates({ lat, lng });
                            }
                        }}
                        options={{ types: ["geocode"] }}
                        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                    />
                </div>
                {coordinates.lat && coordinates.lng && (
                    <div className="mt-4 p-4 bg-white shadow-md rounded">
                        <p><strong>Latitude:</strong> {coordinates.lat}</p>
                        <p><strong>Longitude:</strong> {coordinates.lng}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Location;
