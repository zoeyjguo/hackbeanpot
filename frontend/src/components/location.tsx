import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Autocomplete from "react-google-autocomplete";
import { Box, Button, TextField, Typography, AutocompleteRenderInputParams } from "@mui/material";

const Location = () => {
    const [startingLocation, setStartingLocation] = useState("");
    const [endingLocation, setEndingLocation] = useState("");
    const [startingCoordinates, setStartingCoordinates] = useState<{ lat: number, lng: number } | null>(null);
    const [endingCoordinates, setEndingCoordinates] = useState<{ lat: number, lng: number } | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

    const getRoute = () => {
        if (!startingCoordinates || !endingCoordinates) return;
        
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: startingCoordinates,
                destination: endingCoordinates,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error("Error fetching directions:", status);
                }
            }
        );
    };

    useEffect(() => {
        if (!directions) return; // Ensure directions are available

        console.log("Directions:", directions);

        const routePath = directions.routes[0].overview_path;
        const service = new google.maps.places.PlacesService(document.createElement("div"));

        for (let j = 0; j < routePath.length; j += 40) {
            service.nearbySearch(
                {
                    location: { lat: routePath[j].lat(), lng: routePath[j].lng() },
                    radius: 400,
                    type: "tourist_attraction",
                },
                (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        console.log("Results:", results);
                    }
                }
            );
        }
    }, [directions]);

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
                    onClick={() => getRoute()}
                    style={{ marginTop: 10, background: "green", color: "white" }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default Location;
