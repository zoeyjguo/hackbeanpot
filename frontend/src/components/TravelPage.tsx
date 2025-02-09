import { useState } from 'react';
import styled from 'styled-components';

const TravelPage = () => {
  const [mood, setMood] = useState('');
  const [activity, setActivity] = useState('');

  const handleSearch = () => {
    alert(`Searching for mood: ${mood}, activity: ${activity}`);
  };

  return (
    <HomepageContainer>
      <HomepageBox1>
        <FormContainer>
          <h2>Travel</h2>
          <InputGroup>
            <LocationInput placeholder="Where are you going?" />
            <DateInput type="date" />
            <DateInput type="date" />
          </InputGroup>

          <MoodAndActivity>
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
          </MoodAndActivity>

          <CheckboxGroup>
            <CheckboxLabel>
              <input type="checkbox" /> Add a flight
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" /> Add a car
            </CheckboxLabel>
          </CheckboxGroup>

          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </FormContainer>
      </HomepageBox1>

      <PromoSection>
        <PromoContent>
          <h1>Save instantly with Expedia Rewards</h1>
          <p>You can enjoy access to perks like Member Prices, saving you 10% or more on select hotels.</p>
          <PromoButton>See Member Prices</PromoButton>
        </PromoContent>
      </PromoSection>
    </HomepageContainer>
  );
};

// Styled components
const HomepageContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
`;

const HomepageBox1 = styled.div`
  border: 1px solid #caccd2;
  border-radius: 10px;
  padding: 20px;
  margin-top: 40px;
`;

const FormContainer = styled.div`
  padding: 20px;
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

const CheckboxGroup = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 20px;
`;

const CheckboxLabel = styled.label`
  font-size: 15px;
  color: #454649;
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

const PromoSection = styled.div`
  background-image: url('img/travel.jpg');
  border-radius: 10px;
  margin: 50px 0;
  padding: 120px 60px;
  color: white;
`;

const PromoContent = styled.div`
  max-width: 30%;
`;

const PromoButton = styled.button`
  background-color: #3662d8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2f3aa0;
  }
`;

export default TravelPage;
