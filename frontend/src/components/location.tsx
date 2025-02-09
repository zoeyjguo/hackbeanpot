import Navbar from "./navbar";
import TravelPage from "./TravelPage";

const Location = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10">
          <TravelPage />
        </div>
        </div>
    )
}

export default Location;