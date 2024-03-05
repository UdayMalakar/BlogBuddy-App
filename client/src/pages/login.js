import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setIsLoggedIn}) => {
   
    const [loginData,setLoginData]=useState({
        email:"",
        password:"",
    })
    const navigate =useNavigate();
    function changeHandler(event)
    {
        setLoginData((prevData)=>(
           { ...prevData,
            [event.target.name]:event.target.value
           }
        ))
    }
    console.log(loginData)
   async function logInHandler(event)
    {

        event.preventDefault();
        const response=await  fetch('http://localhost:5000/api/v1/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer yourAccessToken', // Include your actual token here
          },
          body: JSON.stringify(loginData),
      })
      
      console.log(response)
      console.log("kkkkkkkkkkkkk")
      const responseData = await response.json();

      localStorage.setItem('accessToken', responseData.token);
      console.log(localStorage.getItem('accessToken'))
      if(response.status===403)
      {
        toast.warning("enter correct email")
        navigate("/login");
      }
      if(response.status===402)
      {
        toast.warning("enter correct password")
        navigate("/login");
      }
      if(response.status===200)
      {
        toast.success("Logged In successfully", {
          position:"top-center", // Set the position to TOP_CENTER
        });
        setIsLoggedIn(true);
        navigate("/");
      }
        
    }

  return (
    <div className='w-screen h-screen flex items-center justify-center gap-x-5 bg-[rgb(0,7,38)] text-white overflow-hidden'>
   
    <div className='flex flex-col items-center justify-center gap-y-5 sm:w-[500px] sm:h-[400px] w-full'>
        <p className='sm:text-xl text-[15px]'>Log in or create a new account</p>
        <form onSubmit={logInHandler} className='flex flex-col gap-y-5 w-[80%] '>
            <label className='flex items-center justify-between'>Email<input onChange={changeHandler} type='email' required value={loginData.email} name="email" className='border-none bg-transparent text-white outline-none ml-4 sm:w-[80%] w-full'></input></label>
            <div className='w-full h-[2px] bg-white'></div>
            <label className='flex items-center justify-between'>password<input onChange={changeHandler} type='password' required value={loginData.password} name="password" className='border-none bg-transparent text-white outline-none ml-1 sm:w-[80%] w-full '></input></label>
            <div className='w-full h-[2px] bg-white'></div>
            <button className='sm:w-[250px] sm:h-[35px] w-[100px] h-[30px]  self-center bg-red-500 rounded-2xl'>Log In</button>
        </form>
        <button className='text-xl'><NavLink to="/signup" >Don't have an account ?</NavLink></button>
    </div>
    <div className='sm:w-[500px] w-0 sm:h-[400px] flex items-center justify-center '>
        <img className='w-[90%] h-[90%] object-cover rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbvJLIk7K6iDHXlwjVy7oml6j8dbGcc2obHQ&usqp=CAU"></img>
    </div>
    </div>
  )
}

export default Login;