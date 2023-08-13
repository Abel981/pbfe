import { useForm, Controller, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import { Avatar, Grid, Modal, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { FormControlLabel } from "@mui/material";
// import Select from 'react-select';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("ET");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
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


      setCountries(africanCountries);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    fetchStates(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    fetchCities(selectedState);
  }, [selectedState, selectedCountry]);

  const fetchCities = async () => {
    if (selectedState == "") {
      setValue("city", "");
      setValue("state", "");
      setCities([]);
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

  const fetchStates = async () => {
    setValue("city", "");
    setValue("state", "");

    setCities([]);


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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
    setIsSubmitting,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      username: "",
      password: "",
      gender: "",
      phone: "",
      country: "ET",
      state: "",
      city: "",
      agentType: "",
      propertySize: "",

      terms: false,
    },
  });


  function handlePolicyDownload() {
    const link = document.createElement("a");
    link.href = `${
      watch("agentType") == "simple"
        ? "../../public/privacyPolicy/EcoAgentFinal.docx"
        : "../../public/privacyPolicy/ProductDistrbutors.docx"
    }`;
    link.download = "privacy-policy.docx";
    link.click();
  }

  const onSubmit = (data) => {
    return new Promise((resolve, reject) => {
      //console.log(generateAgentId(data.agentType, data.firstName, data.lastName, data.phone));

      const idPrefix = data.agentType === "simple" ? "in" : "dis";
      const idSuffix =
        data.firstName.slice(0, 2) +
        data.lastName.slice(0, 2) +
        data.phone.slice(-2) +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0");
      const id1 = idPrefix + idSuffix;
      console.log("Generated ID:", id1);

      const formData = new FormData();
      for (let i = 0; i < data.id.length; i++) {
        formData.append("id", data.id[i]);
      }
      if (data.tradePermission) {
        formData.append("tradePermission", data.tradePermission[0]);
      }

      data.userId = id1;

      // data.agentId=generateAgentId(data.agentType, data.firstName, data.lastName,data.phone);
      console.log(data);

      delete data.id;
      delete data.tradePermission;
      delete data.terms;
      formData.append("nonFileData", JSON.stringify(data));

      axios
        .post("https://localhost:3000/register", formData)
        .then((res) => {
          toast.success("your data has been saved");
          console.log(res);
          document.write(
            "Your Code is: " +
              id1 +
              " .....redirecting to your dashboard in 5 sec"
          );
          setTimeout(() => {
            window.location.href = "http://127.0.0.1:3000/agent/login";
          }, 5000);
          resolve();
        })
        .catch(() => {
          toast.error("something went wrong");

          reject();
        });
    });
  };

  return (
    <>
      <Toaster />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Agent Registration Form
            </Typography>
            <form
              className="flex flex-col gap-2 py-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                {...register("firstName", { required: true })}
                error={errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                id="middlename"
                label="Middle Name"
                variant="outlined"
                {...register("middleName", { required: true })}
                error={errors.middleName}
                helperText={errors.middleName?.message}
              />
              <TextField
                id="lastname"
                label="Last Name"
                variant="outlined"
                {...register("lastName", { required: true })}
                error={errors.lastName}
                helperText={errors.lastName?.message}
              />
              <Typography variant="body2">
                This info will inable you to loggin
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  id="username"
                  label="Username"
                  variant="filled"
                  {...register("username", { required: true })}
                  error={errors.username}
                  helperText={errors.username?.message}
                  fullWidth
                />
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  variant="filled"
                  {...register("password", { required: true })}
                  error={errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                />
              </Box>

              <div className="mb-5">
                <Typography variant="body1" gutterBottom>
                  Gender:
                </Typography>
                <Controller
                  name="gender"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Radio
                        value="male"
                        label="Male"
                        variant="outlined"
                        className=" w-fit"
                      />
                      <Radio
                        value="female"
                        label="Female"
                        variant="outlined"
                        className=" w-fit"
                      />
                    </RadioGroup>
                  )}
                />
              </div>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                variant="outlined"
                {...register("phone", { required: true })}
                error={errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />
              <Typography variant="body2" gutterBottom>
                Country Data
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="country">Country</InputLabel>
                <Controller
                  name="country"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="country"
                      id="country"
                      value={watch("country")}
                      label="country"
                    >
                      {countries.map((country) => (
                        <MenuItem
                          key={country.key}
                          value={country.key}
                          onClick={() => {
                            setSelectedState("");
                            setSelectedCountry(`${country.key}`);
                          }}
                        >
                          {country.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="state">State</InputLabel>
                <Controller
                  name="state"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="state"
                      id="state"
                      value={watch("state")}
                      label="state"
                    >
                      {states.map((state) => (
                        <MenuItem
                          key={state.key}
                          value={state.key}
                          onClick={() => {
                            setSelectedState(`${state.key}`);
                          }}
                        >
                          {state.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="city">City</InputLabel>
                  <Controller
                    name="city"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="city"
                        id="city"
                        value={watch("city")}
                        label="city"
                      >
                        {cities.map((city) => (
                          <MenuItem key={city.key} value={city.key}>
                            {city.value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </div>

              <div className="mb-3">
                <span>Agent Type:</span>
                <Controller
                  name="agentType"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} disabled={isSubmitting}>
                      <Radio
                        value="simple"
                        label="Individual"
                        variant="outlined"
                        className=" w-fit"
                      />
                      <Radio
                        value="detailed"
                        label="Distribution agent"
                        variant="outlined"
                        className=" w-fit"
                      />
                    </RadioGroup>
                  )}
                />
              </div>
              {watch("agentType") == "detailed" && (
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="sizeid">size in meter square</InputLabel>
                    <Controller
                      name="propertySize"
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          id="sizeid"
                          value={watch("propertySize")}
                          label="size in meter square"
                        >
                          <MenuItem value={"0-10"}>&lt Ten</MenuItem>
                          <MenuItem value={"10-20"}>Ten - Twenty</MenuItem>
                          <MenuItem value={"20-30"}>Twenty - Thirty</MenuItem>
                          <MenuItem value={"30-40"}>Thirty - Fourty</MenuItem>
                          <MenuItem value={"40-50"}>Fourty - Fifty</MenuItem>
                          <MenuItem value={"51"}>&gt Fifty</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <div>
                    <span>Upload your Trade permission:</span>
                    <label className="block">
                      <span className="sr-only">Choose trade permission</span>
                      <input
                        type="file"
                        disabled={isSubmitting}
                        {...register("tradePermission", {
                          required: watch("agentType") == "detailed",
                        })}
                        className="mb-3 block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-violet-50 file:text-violet-700
hover:file:bg-violet-100
"
                      />
                    </label>
                  </div>
                </div>
              )}
              <div>
                <span>Upload your ID:</span>
                <label className="block">
                  <span className="sr-only">Choose ID</span>
                  <input
                    type="file"
                    disabled={isSubmitting}
                    {...register("id", { required: true })}
                    className="mb-3 block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                  />
                </label>
              </div>
              <FormControlLabel
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
                control={
                  <Checkbox {...register("terms", { required: true })} />
                }
                label={
                  <Box ml={1}>
                    By selecting this, you agree to our{" "}
                    <Button
                      variant="text"
                      className="text-violet-700"
                      size="small"
                      onClick={handlePolicyDownload}
                    >
                      privacy policy
                    </Button>
                    .
                  </Box>
                }
              />

              <div>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  disabled={!watch("terms")}
                  loading={isSubmitting}
                >
                  Submit
                </LoadingButton>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
