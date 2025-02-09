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
        const totalAttractions = Math.floor(routePath.length / 50);
        const attractions : google.maps.places.PlaceResult[] = [];
        const service = new google.maps.places.PlacesService(document.createElement("div"));
        const maxTries = 5;
        let tries = 0;

        // Function to fetch a single nearby attraction
        const fetchAttraction = (location: google.maps.LatLngLiteral) => {
            return new Promise<google.maps.places.PlaceResult | null>((resolve) => {
                service.nearbySearch(
                    {
                        location,
                        type: "tourist_attraction",
                        rankBy: google.maps.places.RankBy.DISTANCE,
                    },
                    (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                            resolve(results[0]);
                            console.log("Attraction Found");
                        } else {
                            resolve(null);
                        }
                    }
                );
            });
        };

        // Function to fetch attractions asynchronously
        const fetchAttractions = async () => {
            while (attractions.length < totalAttractions && tries < maxTries) {
                tries++;
                let j = Math.floor(Math.random() * routePath.length);
                const location = { lat: routePath[j].lat(), lng: routePath[j].lng() };
                const attraction = await fetchAttraction(location);
                if (attraction) {
                    attractions.push(attraction);
                } else {
                    console.log("No attraction found");
                }
            }
            // Now attractions are fully populated, and we can safely iterate over them
            for (const attraction of attractions) {
                console.log(attraction.name);
            }
            console.log("FINISHED")
        };
        // Call the function to fetch attractions
        fetchAttractions();
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
                    options={{ types: ["geocode"] }}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField {...params} label="Starting location" variant="outlined" />
                    )}
                />
                <Typography >Ending Location</Typography>
                <Autocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                    onPlaceSelected={handleEndingLocationChange}
                    style={{ width: 300 }}
                    options={{ types: ["geocode"] }}
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
