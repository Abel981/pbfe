import { useContext, useState, useEffect } from 'react'
import { useForm, Controller} from "react-hook-form"
import { redirect } from 'react-router-dom';
import SidebarContext from './shared/SidebarContext';
import AdminAuthContext from './shared/AdminAuthContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Input from '@mui/joy/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import {LoadingButton} from '@mui/lab'
import { Button } from '@mui/material';
import SearchAppBar from './SearchAppBar';
import SearchFilter from './SearchFilter';
import AgentsDisplay from './AgentsDisplay';



const AdminDashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAgent, setSelectedAgent] = useState('');
    const {adminLogout,admin, isLoading} = useContext(AdminAuthContext);

    useEffect(() => {
      if(admin) {
        setInterval(async () => {
          await axios.get('http://localhost:3000/refresh', {withCredentials:true})
          console.log('new refresh token provided')
        },660000)
      }
    }, [])

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const handleGenderChange = gender => {
            setSelectedGender(gender)
      }

      const handleAgentTypeChange = agentType => {
        setSelectedAgent(agentType)
      }

      const handleCountryChange = country => {
        setSelectedCountry(country);
      };

      const handleStateChange = state => {
        setSelectedState(state);
      };

      const handleCityChange = city => {
        setSelectedCity(city);
      };
      
    
      console.log(selectedCountry)
      if(isLoading) {
        return <div>Loading</div>
      }



    return (
        
<>
                <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
                        <SearchAppBar />
            </SidebarContext.Provider>

            <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <List>
          <ListItem>
            <Button onClick={adminLogout}>

            <ListItemText primary="logout" />
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText primary="Item 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Item 3" />
          </ListItem>
        </List>
      </Drawer>
      

      <SearchFilter onCountryChange={handleCountryChange} onStateChange={handleStateChange} onCityChange={handleCityChange} onGenderChange={handleGenderChange} onAgentChange={handleAgentTypeChange} />
    <AgentsDisplay country={selectedCountry} state={selectedState} city={selectedCity} gender={selectedGender} agentType={selectedAgent} />
</>
    )
    
  
}

export default AdminDashboard