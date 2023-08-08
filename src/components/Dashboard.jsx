import { useContext } from 'react'
import AuthContext  from './shared/AuthContext'
import { useForm, Controller} from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Input from '@mui/joy/Input';
import {LoadingButton} from '@mui/lab'



const Dashboard = () => {

    const {logout,user, isLoading} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
      } = useForm({
        defaultValues: {
            firstName: user.firstName,
            middleName:user.middleName,
            lastName:user.lastName,
         
          
            
          },
        }
      )

      const onSubmit = (data) => {
        return new Promise((resolve, reject) => {
          //console.log(generateAgentId(data.agentType, data.firstName, data.lastName, data.phone));
          const formData = new FormData();
          for (let i = 0; i < data.id.length; i++) {
            formData.append('id', data.id[i]);
          }
          if(data.tradePermission){
            formData.append('tradePermission', data.tradePermission[0])
            }
            // data.agentId=generateAgentId(data.agentType, data.firstName, data.lastName,data.phone);
          //   data.region = data.city.value;
        //   delete data.city
          delete data.id;
          delete data.tradePermission
        //   delete data.terms
        formData.append("nonFileData", JSON.stringify(data));
        console.log(data);

        
          axios.patch(`https://localhost:3000/agents/edit/${user.id}`,formData,{withCredentials: true})
          .then((res) =>{
  
            toast.success('your data has been saved')
            console.log(res)
            resolve();
          }
          )
          .catch(() => {
  
            toast.error('something went wrong')
            console.log('error')
            reject()
          } 
          );

        })
          
      }

      if(isLoading) {
        return <div>loading</div>
      }

   
    return (
    <div className='mx-auto w-full md:w-2/3 md:max-w-2xl md:shadow-xl md:rounded-lg p-5'> 
      <nav className='flex flex-row justify-between bg-blue-300 p-4 mb-4 colo'>
      <div className='text-bold'>welcome to purpose black {user.firstName} </div>
        <button onClick={logout}>logout</button>

      </nav>

        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Your Code is: {user.userId}</h2>
          <br />
          </div>
          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center '>
           
            <label htmlFor="firstname" className='w-28'>First Name:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>
             
              <Input {...register("firstName", {required:true} )}   error={!!errors.firstName} placeholder={'firstname'} className={`ml-6 ${errors.firstName? 'border-red-500' : ''}`} id={'firstname'}/>
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
       
          <div className='mb-3'>
            <label htmlFor="phone">Phone Number</label>
             {/* <Input {...register("phone", {required:true})}   disabled={isSubmitting} placeholder={'phone'} className="w-1/2" id={'phone'}/> */}
            


          </div>
     

          <div>
        <img width={200} src={`${user.idUrl}`} alt="id photo" />
            <span>Upload your ID:</span>
            <label className="block">
    <span className="sr-only">Choose ID</span>
    <input type="file" disabled={isSubmitting} {...register('id', )} className="mb-3 block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>
  </div>

 {user.tradeUrl && 
 
 <div>
   <img width={200} src={`${user.tradeUrl}`} alt="trade url photo" />
            <span>Upload your Trade Url:</span>
            <label className="block">
    <span className="sr-only">Choose trade Url</span>
    <input type="file" disabled={isSubmitting} {...register('tradePermission', )} className="mb-3 block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>
  </div>}


            <div><LoadingButton type="submit" variant="outlined"  loading={isSubmitting} 
            >Submit</LoadingButton></div>
            
        </form>
       
    </div>
    )
  
}

export default Dashboard