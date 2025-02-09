import Navbar from "./navbar";
import Autocomplete from 'react-google-autocomplete';


const Location = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10">
                {/* <TravelPage /> */}
                <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
                <div style={{ width: "300px" }}>
                    <Autocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                        onPlaceSelected={(place) => console.log("Selected Place:", place)}
                        options={{ types: ["geocode"] }}
                        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                    />
                </div>
            </div>
            </div>
        </div>
    )
}

export default Location;