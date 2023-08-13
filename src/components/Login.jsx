import React, { useContext } from 'react'
import { useForm, Controller,FormProvider } from "react-hook-form"
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import {LoadingButton} from '@mui/lab'
import AuthContext  from './shared/AuthContext'

const Login = () => {
  const {login,isLoading} = useContext(AuthContext)

    const {import React, { useContext } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import Input from "@mui/joy/Input";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import AuthContext from "./shared/AuthContext";
import {
  Avatar,
  Box,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(4),
});

const Login = () => {
  const { login, isLoading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("loginData", JSON.stringify(data));
    return new Promise((resolve, reject) => {
      login(data)
        .then(() => {
          toast.success("successfully logedin");
          resolve();
        })
        .catch(() => {
          toast.error("something went wrong");
          reject();
        });

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
    });
  };

  if (isLoading) {
    return <div>loading</div>;
  }

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
              Agent Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                {...register("username", { required: true })}
                error={errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: true })}
                error={errors.password}
                helperText={errors.password?.message}
              />
              <LoadingButton
                type="submit"
                color="secondary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </LoadingButton>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
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

        login(data)
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
        return <div>loading</div>
      }

  return (
    <>
    <Toaster />
    <div className='mx-auto w-full md:w-2/3 md:max-w-2xl md:shadow-xl md:rounded-lg p-5'>

        <h1 className='font-bold text-center text-lg'>Agent login page</h1>
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
    </>
  )
}

export default Login
