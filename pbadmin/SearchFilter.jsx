import { useState, useEffect } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function SearchFilter({
  onCountryChange,
  onStateChange,
  onCityChange,
  onGenderChange,
  onAgentChange,
}) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedgender, setSelectedGender] = useState("");
  const [selectedAgentType, setSelectedAgentType] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      let africanCountries = [];
      const options = {
        method: "GET",
        url: "https://referential.p.rapidapi.com/v1/country",
        params: {
          fields:
            "currency,currency_num_code,currency_code,continent_code,currency,iso_a3,dial_code",
          limit: "250",
        },
        headers: {
          "X-RapidAPI-Key":
            "0a1ef31241msh1e8e97acd59df84p14d0c4jsn6f343fd09c01",
          "X-RapidAPI-Host": "referential.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        africanCountries = response.data.filter((country) => {
          return country.continent_code == "AF";
        });
        africanCountries.sort((a, b) => a.value.localeCompare(b.value));
      } catch (error) {
        console.error(error);
      }

      // setStates(fetchState('ET'))
      setCountries(africanCountries);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    fetchStates(selectedCountry);
  }, [selectedCountry]);

  const fetchStates = async () => {
    if (selectedCountry == "") {
      setStates([]);
      setSelectedState("");
      return;
    }

    const options = {
      method: "GET",
      url: "https://referential.p.rapidapi.com/v1/state",
      params: {
        iso_a2: `${selectedCountry}`,
        limit: "250",
      },
      headers: {
        "X-RapidAPI-Key": "0a1ef31241msh1e8e97acd59df84p14d0c4jsn6f343fd09c01",
        "X-RapidAPI-Host": "referential.p.rapidapi.com",
      },
    };

    try {
      await axios.request(options).then((res) => setStates(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCities(selectedState);
  }, [selectedState, selectedCountry]);

  const fetchCities = async () => {
    if (selectedState == "") {
      setCities([]);
      setSelectedCity("");
      return;
    }

    const options = {
      method: "GET",
      url: "https://referential.p.rapidapi.com/v1/city",
      params: {
        iso_a2: `${selectedCountry}`,
        state_code: `${selectedState}`,
        lang: "en",
        limit: "250",
      },
      headers: {
        "X-RapidAPI-Key": "0a1ef31241msh1e8e97acd59df84p14d0c4jsn6f343fd09c01",
        "X-RapidAPI-Host": "referential.p.rapidapi.com",
      },
    };

    try {
      await axios.request(options).then((res) => {
        setCities(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    onCityChange(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    onStateChange(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    onCountryChange(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    onGenderChange(event.target.value);
  };

  const handleAgentTypeChange = (event) => {
    setSelectedAgentType(event.target.value);
    onAgentChange(event.target.value);
  };

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="country">Country</InputLabel>
            <Select value={selectedCountry} onChange={handleCountryChange}>
              <MenuItem value="">All Countries</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.key} value={country.key}>
                  {country.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="state">State</InputLabel>
            <Select value={selectedState} onChange={handleStateChange}>
              <MenuItem value="" onClick={() => setSelectedCountry("")}>
                States
              </MenuItem>
              {states.map((state) => (
                <MenuItem key={state.key} value={state.key}>
                  {state.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="city">City</InputLabel>
            <Select value={selectedCity} onChange={handleCityChange}>
              <MenuItem value="">Cities</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.key} value={city.key}>
                  {city.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          width: 300,
          backgroundColor: "white",
          marginTop: 2,
          color: "black",
        }}
      >
        <FormControl>
          <FormLabel id="gender">Gender</FormLabel>
          <RadioGroup
            value={selectedgender}
            onChange={handleGenderChange}
            aria-labelledby="gender select radio button"
            name="gender"
          >
            <FormControlLabel value="" control={<Radio />} label="all" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="agentType">Agent Type</FormLabel>
          <RadioGroup
            value={selectedAgentType}
            onChange={handleAgentTypeChange}
            aria-labelledby="agent select radio button"
            name="agentType"
          >
            <FormControlLabel
              value="simple"
              control={<Radio />}
              label="individual"
            />
            <FormControlLabel
              value="detailed"
              control={<Radio />}
              label="distributed"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </div>
  );
}

export default SearchFilter;
