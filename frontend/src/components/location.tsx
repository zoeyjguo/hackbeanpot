import { useState } from "react";
import Navbar from "./navbar";
import Autocomplete from "react-google-autocomplete";
import { Box, Button, TextField, Typography, AutocompleteRenderInputParams } from "@mui/material";

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
                    boxShadow: "0px 10px 50px 10px rgba(9, 115, 32, 0.5)"

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
                    }}
                >
                    <Box sx={{ width: "50%" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "500", marginBottom: 1}}>
                            Starting Location:
                        </Typography>
                        <Autocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                            onPlaceSelected={handleStartingLocationChange}
                            style={{ width: 300, border: '2px solid #75ba81'}}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                                <TextField {...params} label="Starting location" variant="outlined" />
                            )}
                        />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "500",  marginBottom: 1 }}>
                            Ending Location:
                        </Typography>
                        <Autocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                            onPlaceSelected={handleEndingLocationChange}
                            style={{ width: 300, border: '2px solid #75ba81'}}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                                <TextField {...params} label="Ending location" variant="outlined" />
                            )}
                        />
                    </Box>
                </Box>
                <Button
                    disabled={startingLocation === "" || endingLocation === ""}
                    onClick={() => {
                        console.log(startingCoordinates, endingCoordinates);
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
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default Location;