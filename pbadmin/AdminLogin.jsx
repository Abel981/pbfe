import React, { useContext } from 'react'
import { useForm, Controller,FormProvider } from "react-hook-form"
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import axios from "axios";
import {LoadingButton} from '@mui/lab'
import AdminAuthContext  from './shared/AdminAuthContext'

// +import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//   },
//   image: {
//     backgroundImage: 'url(https://source.unsplash.com/random)',
//     backgroundRepeat: 'no-repeat',
//     backgroundColor:
//       theme.palette.type === 'light'
//         ? theme.palette.grey[50]
//         : theme.palette.grey[900],
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));
const AdminLogin = () => {


  


  const {adminLogin, admin, isLoading} = useContext(AdminAuthContext)

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
      } = useForm({
        defaultValues: {
            username:"",
            password:""
        
          },
        }
      )

      const onSubmit = (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append("loginData", JSON.stringify(data));
        return new Promise((resolve, reject) => {

        adminLogin(data)
        .then(() => {
            toast.success('successfully logedin')
          resolve()
        })
        .catch(() => {
            toast.error('something went wrong')
          reject()
        })

        
        // .then((res) =>{
  
          //   console.log(res)
            // resolve();
          // }
          // )
          // .catch(() => {
  
          //   console.log('error')
            // reject()
          // } 
          // );

        })
          
      }
      if(isLoading) {
        return <div>loading</div>;
      }

  return (
    <div className='h-full w-full bg-black'>
    <Toaster />
    <div className='mx-auto w-full md:w-2/3 md:max-w-2xl md:shadow-xl md:rounded-lg p-5'>
    <div >


        <h1 className='font-bold text-center text-lg'>Admin login page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center '>
            <label htmlFor="username" className='w-28'>username:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>

              <Input {...register("username", {required:true})}  error={!!errors.username} placeholder={'username'} className={`ml-6 ${errors.username? 'border-red-500' : ''}`} id={'username'}/>
              {errors.username ? <span className='text-pink-600 inline'>Required</span>:''}

          </div>
     </div>
          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center'>
            <label htmlFor="password" className='w-28'>Password:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>
            <Input {...register("password")} disabled={isSubmitting} error={!!errors.password} type='password' placeholder={'password'} className={`ml-6 ${errors.password? 'border-red-500' : ''}`} id={'password'}/>
          
                      {errors.password ? <span className='text-pink-600 inline'>Required</span>:''}
          </div>
          <div><LoadingButton type="submit" variant="outlined" disabled={isSubmitting} loading={isSubmitting} 
            >login</LoadingButton></div>
    </div>   
    </form>
    </div>
    </div>
    </div>
  )
}

export default AdminLogin