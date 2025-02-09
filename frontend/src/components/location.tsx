import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Autocomplete from "react-google-autocomplete";
import { Box, Button, TextField, Typography, AutocompleteRenderInputParams, Snackbar, Alert, IconButton, CircularProgress } from "@mui/material";
import Attraction from "./attraction";
import CloseIcon from "@mui/icons-material/Close";

const Location = () => {
    const [startingLocation, setStartingLocation] = useState("");
    const [endingLocation, setEndingLocation] = useState("");
    const [startingCoordinates, setStartingCoordinates] = useState<{ lat: number, lng: number } | null>(null);
    const [endingCoordinates, setEndingCoordinates] = useState<{ lat: number, lng: number } | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [attractions, setAttractions] = useState<google.maps.places.PlaceResult[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingPlaylist, setLoadingPlaylist] = useState(false);

    const getRoute = () => {
        setLoading(true);
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
                    setOpenSnackbar(true);
                    setLoading(false);
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
            setLoading(true);
            while (attractions.length < totalAttractions && tries < maxTries) {
                tries++;
                const j = Math.floor(Math.random() * routePath.length);
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
                console.log(attraction);
            }
            console.log("FINISHED")
            setAttractions(attractions);
            setLoading(false);
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
        <Box sx={{ minHeight: "100vh", padding: 3 }}>
            <Navbar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    maxWidth: 800,
                    margin: "100px auto 0",
                    padding: 4,
                    borderRadius: 4,
                    boxShadow: "0px 10px 50px 10px rgba(9, 115, 32, 0.25)", // Default box shadow
                    "&:hover": { // On hover
                        boxShadow: "0px 10px 50px 10px rgba(9, 115, 32, 0.5)", // Lighter shadow for glow effect
                    },
                    "@media (max-width: 600px)": {
                        padding: 2, // Adjust padding for smaller screens
                        margin: "50px auto 0", // Adjust margin for smaller screens
                    },
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                    Enter Locations
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 4,
                        width: "100%",
                        "@media (max-width: 800px)": {
                            flexDirection: "column", // Stack them vertically on small screens
                            gap: 2, // Adjust the gap between the fields for smaller screens
                            flexWrap: "wrap", // Wrap the fields to the next line if they don't fit
                            alignItems: "center", // Center the fields horizontally
                        },
                    }}
                >
                    <Box sx={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "500", marginBottom: 1}}>
                            Starting Location:
                        </Typography>
                        <Autocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                            onPlaceSelected={handleStartingLocationChange}
                            options={{ types: ["geocode"] }}
                            style={{ width: 300, border: '2px solid #75ba81'}}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                                <TextField {...params} label="Starting location" variant="outlined" />
                            )}
                        />
                    </Box>
                    <Box sx={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "500",  marginBottom: 1 }}>
                            Ending Location:
                        </Typography>
                        <Autocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                            onPlaceSelected={handleEndingLocationChange}
                            options={{ types: ["geocode"] }}
                            style={{ width: 300, border: '2px solid #75ba81'}}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                                <TextField {...params} label="Ending location" variant="outlined" />
                            )}
                        />
                    </Box>
                </Box>
                <Button
                    disabled={startingLocation === "" || endingLocation === "" || loading}
                    onClick={() => {
                        getRoute();
                    }}
                    sx={{
                        marginTop: 3,
                        padding: "10px 20px",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: startingLocation === "" || endingLocation === "" ? "#e0e0e0" : "#388e3c",
                        "&:hover": {
                            backgroundColor: startingLocation === "" || endingLocation === "" ? "#e0e0e0" : "#2c6a2f",
                        },
                        "&:disabled": {
                            backgroundColor: "#e0e0e0",
                        },
                        "&:focus": {
                            outline: "none",
                        },
                    }}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Generate Attractions"}
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Closes automatically after 6 seconds
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity="error"
                    sx={{ display: "flex", alignItems: "center" }}
                    action={
                        <IconButton size="small" onClick={() => setOpenSnackbar(false)} color="inherit">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    Route not found. Try different locations.
                </Alert>
            </Snackbar>
            {attractions.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3,
                        maxWidth: 800,
                        margin: "50px auto 0",
                        padding: 4,
                        borderRadius: 4,
                        boxShadow: "0px 10px 50px 10px rgba(9, 115, 32, 0.25)", // Default box shadow
                        "&:hover": { // On hover
                            boxShadow: "0px 10px 50px 10px rgba(9, 115, 32, 0.5)", // Lighter shadow for glow effect
                        },
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Attractions
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column", // Ensures a single column layout
                            alignItems: "center", // Centers all items horizontally
                            gap: 2,
                            width: "100%",
                        }}
                    >
                        {attractions.map((attraction, index) => (
                            <Attraction key={index} place={attraction} onRemove={() => 
                                {setAttractions(attractions.filter((_, i) => i !== index))}} />
                        ))}
                    </Box>
                    <Button
                        disabled={loadingPlaylist}
                        onClick={() => {
                            setLoadingPlaylist(true);
                            setTimeout(() => {
                                window.location.href = "/playlist";
                            }, 5000);
                        }}
                        sx={{
                            marginTop: 3,
                            padding: "10px 20px",
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: startingLocation === "" || endingLocation === "" ? "#e0e0e0" : "#388e3c",
                            "&:hover": {
                                backgroundColor: startingLocation === "" || endingLocation === "" ? "#e0e0e0" : "#2c6a2f",
                            },
                            "&:disabled": {
                                backgroundColor: "#e0e0e0",
                            },
                            "&:focus": {
                                outline: "none",
                            },
                        }}
                    >
                        {loadingPlaylist ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Generate Playlist"}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Location;