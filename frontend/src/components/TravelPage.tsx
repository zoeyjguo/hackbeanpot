import { useState } from 'react';
import styled from 'styled-components';
import Autocomplete from "react-google-autocomplete";
import { TextField } from "@mui/material";
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

const TravelPage = () => {
  const [mood, setMood] = useState('');
  const [activity, setActivity] = useState('');
  const [startingLocation, setStartingLocation] = useState("");
    const [endingLocation, setEndingLocation] = useState("");

    const handleStartingLocationChange = (place: google.maps.places.PlaceResult) => {
        setStartingLocation(place.formatted_address || "");
    };

    const handleEndingLocationChange = (place: google.maps.places.PlaceResult) => {
        setEndingLocation(place.formatted_address || "");
    };

  const handleSearch = () => {
    alert(`Searching for mood: ${mood}, activity: ${activity}`);
  };
  

  return (
    <HomepageContainer>
      <HomepageBox1>
        <WideBlackBox />
      </HomepageBox1>
      <HomepageBox1>
        <FormContainer>
          <h2>Travel</h2>
          <InputGroup>
            {/* <LocationInput placeholder="Starting location" />
            <LocationInput placeholder="Ending location" />
            <DateInput type="date" />
            <DateInput type="date" /> */}
            <Autocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                                onPlaceSelected={handleStartingLocationChange}
                                style={{ width: 300 }}
                                renderInput={(params: AutocompleteRenderInputParams) => (
                                    <TextField {...params} label="Starting location" variant="outlined" />
                                )}
                            />
            <Autocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                                onPlaceSelected={handleEndingLocationChange}
                                style={{ width: 300 }}
                                renderInput={(params: AutocompleteRenderInputParams) => (
                                    <TextField {...params} label="Ending location" variant="outlined" />
                                )}
                            />
          </InputGroup>

          {/* <MoodAndActivity>
            <InputGroup>
              <MoodInput
                placeholder="Enter mood/vibe"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              />
              <ActivityInput
                placeholder="Enter activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            </InputGroup>
          </MoodAndActivity> */}

          {/* Button that says next and it only works when both locations are filled in */}
          <SearchButton
                    disabled={startingLocation === "" || endingLocation === ""}
                    onClick={() => {
                        console.log(startingLocation, endingLocation);
                    }}
                >
                    Next
                </SearchButton>
        </FormContainer>
      </HomepageBox1>

    </HomepageContainer>
  );
};

// Styled components
const HomepageContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const HomepageBox1 = styled.div`
  width: 160%;
  max-width: 1200px;
  display: flex;
  justify-content: center; 
  border: 1px solid #caccd2;
  border-radius: 10px;
  padding: 20px;
  margin-top: 40px;
`;

const WideBlackBox = styled.div`
  width: 80%;
  max-width: 800px; 
  height: 150px;
  background-color: black;
  border-radius: 10px;
  margin: 0 auto; 
`;

const FormContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 800px; /* Keep form centered */
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const LocationInput = styled.input`
  padding: 10px 30px;
  border: 1px solid #64666a;
  border-radius: 8px;
  flex: 1;
`;

const DateInput = styled.input`
  padding: 10px;
  border: 1px solid #64666a;
  border-radius: 8px;
`;

const MoodAndActivity = styled.div`
  margin-top: 20px;
`;

const MoodInput = styled.input`
  padding: 10px 30px;
  border: 1px solid #64666a;
  border-radius: 8px;
  flex: 1;
`;

const ActivityInput = styled.input`
  padding: 10px 30px;
  border: 1px solid #64666a;
  border-radius: 8px;
  flex: 1;
`;

const SearchButton = styled.button`
  background-color: #3662d8;
  color: white;
  border: none;
  padding: 13px 60px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  display: block;
  margin: 20px auto 0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2f3aa0;
  }
`;

export default TravelPage;
