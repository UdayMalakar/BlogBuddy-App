import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const SignUp= () => {
  const [signUpData,setsignUpData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    otp:"",
})
let navigate=useNavigate();
function changeHandler(event)
{
    setsignUpData((prevData)=>(
       { ...prevData,
        [event.target.name]:event.target.value
       }
    ))
}
console.log(signUpData)
const signUpHandler= async (event)=>
{
  //  try{
  //   if(signUpData.password===signUpData.confirmPassword)
  //   {
  //     event.preventDefault();
  //     // Pass signUpData as state while navigating
      
  //     navigate("/otp", { state: { signUpData } });
  //   }
  //   else{
  //     alert("password not macthed")
  //   }
  //  }
  //  catch(error)
  //  {
  //   console.log(error)
  if(signUpData.password===signUpData.confirmPassword)
    {
      event.preventDefault();
      // Pass signUpData as state while navigating
    }
    else{
      
      toast.warning("please check password again")
    }
   
  try{
    if(signUpData.password===signUpData.confirmPassword)
    {
      event.preventDefault();
      const response=await  fetch('http://localhost:5000/api/v1/auth/sendotp', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer yourAccessToken', // Include your actual token here
          },
          body: JSON.stringify(signUpData),
      })
      
      console.log(response)
      if(response.status===400)
      {
        toast.warning("User already registered!",{
          position:"top-center"
        });
        navigate("/login");
      }

      if(response.status===200)
      {
        
        toast.success("OTP sent successfully",{
          position:"top-center"
        })
        navigate("/otp", { state: { signUpData } });
      }
      
    }
  }
  catch(error)
  {
      console.log("register",error);
  }
}

  return (
    <div className='w-screen h-screen flex items-center justify-center gap-x-5 bg-[rgb(0,7,38)]   text-white overflow-hidden'>
   
    <div className='flex flex-col items-center justify-center gap-y-5 sm:w-[500px] sm:h-[400px] w-full'>
        <p className='sm:text-xl text-[15px]'>Log in or create a new account</p>
        <form onSubmit={signUpHandler} className='flex flex-col gap-y-5 w-[80%] '>
            <label className='flex items-center justify-between'>firstName<input onChange={changeHandler} required type='text'  id="firstName" name="firstName" value={signUpData.firstName} className='border-none bg-transparent outline-none ml-4 sm:w-[80%] w-full'></input></label>
            <div className='w-full h-[2px] bg-white'></div>
            <label className='flex items-center justify-between'>lastName<input onChange={changeHandler} required type='text'  id="lastName" name="lastName" value={signUpData.lastName} className='border-none bg-transparent outline-none ml-4 sm:w-[80%] w-full'></input></label>
            <div className='w-full h-[2px] bg-white'></div>
            <label className='flex items-center justify-between'>Email<input onChange={changeHandler} required type='email' id="email" name="email" value={signUpData.email} className='border-none bg-transparent outline-none ml-4 sm:w-[80%] w-full'></input></label>
            <div className='w-full h-[2px] bg-white'></div>
            <label className='flex items-center justify-between'>password<input onChange={changeHandler} required type='password'  id="password" name="password" value={signUpData.password} className='border-none bg-transparent outline-none ml-1 sm:w-[80%] w-full '></input></label>
            <div className='w-full h-[2px] bg-white'></div>
            <label className='flex items-center justify-between'>Confirm Password<input onChange={changeHandler} type='password' required id="confirmPassword" name="confirmPassword" value={signUpData.confirmPassword} className='border-none bg-transparent outline-none  sm:w-[80%] w-full'></input></label>
            <div className='w-full h-[2px] bg-white'></div>
            <button className='sm:w-[250px] sm:h-[35px] w-[100px] h-[30px]  self-center bg-red-500 rounded-2xl'>Send OTP</button>
        </form>
        <button className='text-xl'><NavLink to="/login" >Already have an account?</NavLink></button>
    </div>
    <div className='sm:w-[500px] w-0 sm:h-[400px] flex items-center justify-center '>
        <img className='w-[90%] h-[90%] object-cover rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbvJLIk7K6iDHXlwjVy7oml6j8dbGcc2obHQ&usqp=CAU"></img>
    </div>
    </div>
  )
}

export default SignUp;