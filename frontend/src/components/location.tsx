import { useState } from "react";
import Navbar from "./navbar";
import Autocomplete from "react-google-autocomplete";
import { Box, Button, TextField, Typography, AutocompleteRenderInputParams } from "@mui/material";
import TravelPage from "./TravelPage";

const Location = () => {
    const [startingLocation, setStartingLocation] = useState("");
    const [endingLocation, setEndingLocation] = useState("");
    const [startingCoordinates, setStartingCoordinates] = useState<{ lat: number, lng: number } | null>(null);
    const [endingCoordinates, setEndingCoordinates] = useState<{ lat: number, lng: number } | null>(null);

    const handleStartingLocationChange = (place: google.maps.places.PlaceResult) => {
        setStartingLocation(place.formatted_address || "");
        if (place.geometry && place.geometry.location) {
            setStartingCoordinates({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        }
    };

    const handleEndingLocationChange = (place: google.maps.places.PlaceResult) => {
        setEndingLocation(place.formatted_address || "");
        if (place.geometry && place.geometry.location) {
            setEndingCoordinates({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        }
    };

    return (
        <Box>
            <Navbar />
            {/* box container that has items horzizontall center and stacked vertically */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Typography variant="h5">
                    Enter Locations
                </Typography>
                <Typography >Starting Location</Typography>
                <Autocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                    onPlaceSelected={handleStartingLocationChange}
                    style={{ width: 300 }}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField {...params} label="Starting location" variant="outlined" />
                    )}
                />
                <Typography >Ending Location</Typography>
                <Autocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                    onPlaceSelected={handleEndingLocationChange}
                    style={{ width: 300 }}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField {...params} label="Ending location" variant="outlined" />
                    )}
                />
                <Button
                    disabled={startingLocation === "" || endingLocation === ""}
                    onClick={() => {
                        console.log(startingCoordinates, endingCoordinates);
                    }}
                    style={{ marginTop: 10, background: "green", color: "white" }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default Location;
