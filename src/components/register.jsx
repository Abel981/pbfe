import { useForm, Controller,FormProvider  } from "react-hook-form"
import { useState, useEffect } from "react";
import Input from '@mui/joy/Input';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/joy/Button';
import {Modal} from "@mui/material";
import Box from '@mui/material/Box';
import {LoadingButton} from '@mui/lab'
import {InputLabel} from "@mui/material";
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { FormControlLabel } from '@mui/material';
// import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";





const Register = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry ] = useState('ET')
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([])
  useEffect(() => {
    const fetchCountries = async () => {

      let africanCountries = []
    const options = {
      method: 'GET',
      url: 'https://referential.p.rapidapi.com/v1/country',
      params: {
        fields: 'currency,currency_num_code,currency_code,continent_code,currency,iso_a3,dial_code',
        limit: '250'
      },
      headers: {
        'X-RapidAPI-Key': '0a1ef31241msh1e8e97acd59df84p14d0c4jsn6f343fd09c01',
        'X-RapidAPI-Host': 'referential.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      africanCountries = response.data.filter(country => {
        return country.continent_code == 'AF';  
      });
      africanCountries.sort((a, b) => a.value.localeCompare(b.value));

    } catch (error) {
      console.error(error);
    }
     
    // setStates(fetchState('ET'))
      setCountries(africanCountries);
    }

    fetchCountries();
  }, [])

  useEffect(() => {

    fetchStates(selectedCountry);  
  }, [selectedCountry]);

  useEffect(() => {
    fetchCities(selectedState);  
  }, [selectedState,selectedCountry]);

    const fetchCities = async () => {

      if(selectedState == "") {
        setValue("city", "");
        setValue("state", "")
        setCities([])
        console.log('irun')
        return;
      }
     

const options = {
  method: 'GET',
  url: 'https://referential.p.rapidapi.com/v1/city',
  params: {
    iso_a2: `${selectedCountry}`,
    state_code: `${selectedState}`,
    lang: 'en',
    limit: '250'
  },
  headers: {
    'X-RapidAPI-Key': '0a1ef31241msh1e8e97acd59df84p14d0c4jsn6f343fd09c01',
    'X-RapidAPI-Host': 'referential.p.rapidapi.com'
  }
};

try {
	 await axios.request(options)
    .then((res) => {setCities(res.data)})

} catch (error) {
	console.error(error);
}
    }

    const fetchStates = async () => {

     
        setValue("city", "");
        setValue("state", "")
       
        setCities([]);
        console.log('irunnn');
       
      
    
      const options = {
        method: 'GET',
        url: 'https://referential.p.rapidapi.com/v1/state',
        params: {
          iso_a2: `${selectedCountry}`,
          limit: '250'
        },
        headers: {
          'X-RapidAPI-Key': '0a1ef31241msh1e8e97acd59df84p14d0c4jsn6f343fd09c01',
          'X-RapidAPI-Host': 'referential.p.rapidapi.com'
        }
      };
      
      
      try {
        await axios.request(options).then(res => setStates(res.data))

        
      } catch (error) {
        console.error(error);
      }

    
    }


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors, isSubmitting },
        setIsSubmitting
      } = useForm({
        defaultValues: {
            firstName: "",
            middleName:"",
            lastName:"",
            username:"",
            password:"",
            gender:"",
            phone:"",
            country:"ET",
            state:"",
            city:"",
            agentType:"",
            propertySize:"",
            
            terms:false
          
            
          },
        }
      )
      const [openTerms, setOpenTerms] = useState(false);

     function handlePolicyDownload() {
      const link = document.createElement('a');
      link.href = `${watch('agentType') == 'simple' ? 
      '../../public/privacyPolicy/EcoAgentFinal.docx' :
      '../../public/privacyPolicy/ProductDistrbutors.docx'
    }`;
      link.download = 'privacy-policy.docx';
      link.click();
     }
  
      
      const onSubmit = (data) => {
        return new Promise((resolve, reject) => {
          //console.log(generateAgentId(data.agentType, data.firstName, data.lastName, data.phone));
         
          const idPrefix = data.agentType === 'simple' ? 'in' : 'dis';
          const idSuffix = data.firstName.slice(0, 2) + data.lastName.slice(0, 2) + data.phone.slice(-2) + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
          const id1 = idPrefix + idSuffix;
          console.log('Generated ID:', id1);

          const formData = new FormData();
          for (let i = 0; i < data.id.length; i++) {
            formData.append('id', data.id[i]);
          }
          if(data.tradePermission){
          formData.append('tradePermission', data.tradePermission[0])
          }

          data.userId = id1
   
          // data.agentId=generateAgentId(data.agentType, data.firstName, data.lastName,data.phone);
          console.log(data);
      
          delete data.id;
          delete data.tradePermission
          delete data.terms
    formData.append("nonFileData", JSON.stringify(data));
        
          axios.post('https://localhost:3000/register',formData)
          .then((res) =>{
  
            toast.success('your data has been saved')
            console.log(res)
            document.write("Your Code is: " + id1 + " .....redirecting to your dashboard in 5 sec")
            setTimeout(() => {
              window.location.href = 'http://127.0.0.1:3000/agent/login';
            }, 5000);
            resolve();
          }
          )
          .catch(() => {
  
            toast.error('something went wrong')
          
            reject()
          } 
          );

        })
          
      }

          
  
      return (
        <>
      
      <Toaster />
   

        <div className='mx-auto w-full md:w-2/3 md:max-w-2xl md:shadow-xl md:rounded-lg p-5'>
        <Typography sx={{ fontSize: '1rem',fontWeight: 'bold' }} style={{ textAlign: 'center' }} variant="h1">Agent Registration Form</Typography>
        <Typography sx={{ fontSize: '1rem',fontWeight: 'semi-bold' }} variant="h1">Please fill in the form below</Typography>


        <div className='mb-3'><span className='text-red-700'>*</span>Required</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center '>
            <label htmlFor="firstname" className='w-28'>First Name:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>

              <Input {...register("firstName", {required:true})}  error={!!errors.firstName} placeholder={'firstname'} className={`ml-6 ${errors.firstName? 'border-red-500' : ''}`} id={'firstname'}/>
              {errors.firstName ? <span className='text-pink-600 inline'>Required</span>:''}

          </div>


          </div>
          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center'>
            <label htmlFor="middlename" className='w-28'>Middle Name:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>
             <Input {...register("middleName", {required:true})}  disabled={isSubmitting} error={!!errors.middleName} placeholder={'middlename'} className={`ml-6 ${errors.middleName? 'border-red-500' : ''}`} id={'middlename'}/>
          
                      {errors.middleName ? <span className='text-pink-600 inline'>Required</span>:''}
          </div>

          </div>
          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center'>

            <label htmlFor="lastName" className='w-28'>Last Name:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>

            <Input {...register("lastName", {required:true})}  disabled={isSubmitting} error={!!errors.lastName} placeholder={'lastname'} className={`ml-6 ${errors.lastName? 'border-red-500' : ''}`} id={'lastName'}/>
                     {errors.lastName ? <span className='text-pink-600 inline'>Required</span>:''}
            </div>

          </div>

          <label htmlFor="firstname" className='w-28'>Username:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>

              <Input {...register("username", {required:true})}  error={!!errors.username} placeholder={'username'} className={`ml-6 ${errors.username? 'border-red-500' : ''}`} id={'username'}/>
              {errors.firstName ? <span className='text-pink-600 inline'>Required</span>:''}

          </div>
          <label htmlFor="password" className='w-28'>Password:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>

              <Input type="password" {...register("password", {required:true})}  error={!!errors.password} placeholder={'password'} className={`ml-6 ${errors.password? 'border-red-500' : ''}`} id={'password'}/>
              {errors.firstName ? <span className='text-pink-600 inline'>Required</span>:''}

          </div>
          <div className='mb-3'>
            <span>Gender:</span>
            <Controller
            name="gender"
            rules={{ required: true }}
            control={control}
            render={({ field }) => <RadioGroup {...field}>
            
            <Radio value="male" label="Male" variant="outlined" className=' w-fit' />
            <Radio value="female" label="Female" variant="outlined" className=' w-fit' />
          
          </RadioGroup>}
          />
      
          
          </div>
          <div className='mb-3'>
            <label htmlFor="phone">Phone Number</label>
             <Input {...register("phone", {required:true})}   disabled={isSubmitting} placeholder={'phone'} className="w-1/2" id={'phone'}/>
            


          </div>

          <FormControl fullWidth>
        <InputLabel id="country">Country</InputLabel>
<Controller
            name="country"
            rules={{ required: true }}
            control={control}
            render={({ field }) =>
        <Select {...field}
          labelId="country"
          id="country"
          value={watch('country')}
          label="country"
          
        >
          {countries.map(country => (
          <MenuItem key={country.key} value={country.key}  onClick={() => {
            setSelectedState("")
            setSelectedCountry(`${country.key}`)}}
            >{country.value}</MenuItem>
        )) }
        </Select>}
      />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="state">State</InputLabel>
<Controller
            name="state"
            rules={{ required: true }}
            control={control}
            render={({ field }) =>
        <Select {...field}
          labelId="state"
          id="state"
          value={watch('state')}
          label="state"
          
        >
          {states.map(state => (
          <MenuItem key={state.key} value={state.key} onClick={() => {setSelectedState(`${state.key}`)}}>{state.value}</MenuItem>
        )) }
        </Select>}
      />
      </FormControl>
          <div className='mb-3'>
          
          <FormControl fullWidth>
        <InputLabel id="city">City</InputLabel>
<Controller
            name="city"
            rules={{ required: true }}
            control={control}
            render={({ field }) =>
        <Select {...field}
          labelId="city"
          id="city"
          value={watch('city')}
          label="city"
          
        >
          {cities.map(city => (
          <MenuItem key={city.key} value={city.key} >{city.value}</MenuItem>
        )) }
        </Select>}
      />
      </FormControl>
        
        </div>
        

        <div className='mb-3'>
            <span>Agent Type:</span>
            <Controller
            name="agentType"
            rules={{ required: true }}
            control={control}
            render={({ field }) => <RadioGroup {...field} disabled={isSubmitting} >
            <Radio value="simple" label="Individual" variant="outlined" className=' w-fit'/>
            <Radio value="detailed" label="Distribution agent" variant="outlined" className=' w-fit'/>
          </RadioGroup>}
          />
          
          </div>
{(watch('agentType') == 'detailed') &&  
<div>


<FormControl fullWidth>
        <InputLabel id="sizeid">size in meter square</InputLabel>
<Controller
            name="propertySize"
            rules={{ required: true }}
            control={control}
            render={({ field }) =>
        <Select {...field}
          labelId="demo-simple-select-label"
          id="sizeid"
          value={watch('propertySize')}
          label="size in meter square"
          
        >
          <MenuItem value={"0-10"}>&lt Ten</MenuItem>
          <MenuItem value={"10-20"}>Ten - Twenty</MenuItem>
          <MenuItem value={"20-30"}>Twenty - Thirty</MenuItem>
          <MenuItem value={"30-40"}>Thirty - Fourty</MenuItem>
          <MenuItem value={"40-50"}>Fourty - Fifty</MenuItem>
          <MenuItem value={"51"}>&gt Fifty</MenuItem>
        </Select>}
      />
      </FormControl>
      <div>
          
      <span>Upload your Trade permission:</span>
      <label className="block">
<span className="sr-only">Choose trade permission</span>
<input type="file" disabled={isSubmitting} {...register('tradePermission', {required:watch('agentType')== 'detailed'})} className="mb-3 block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-violet-50 file:text-violet-700
hover:file:bg-violet-100
"/>
    </label>
  </div>
</div>
}
          <div>
          
            <span>Upload your ID:</span>
            <label className="block">
    <span className="sr-only">Choose ID</span>
    <input type="file" disabled={isSubmitting} {...register('id', {required:true})} className="mb-3 block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>
  </div>
  <FormControlLabel
    style={{
  display:"flex",     
  alignItems: 'flex-start'}}
      control={<Checkbox {...register("terms" , {required:true})} />}
      label={<Box ml={1}>By selecting this, you agree to our <Button 
        variant="text" 
        className="text-violet-700" 
        size="small" 
        onClick={handlePolicyDownload}>
            privacy policy</Button>.</Box>}
    />

            <div><LoadingButton type="submit" variant="outlined" disabled={!watch('terms')} loading={isSubmitting} 
            >Submit</LoadingButton></div>

            
            
        </form>
   
   
    
            </div>
           
        </>

  )
}

export default Register
