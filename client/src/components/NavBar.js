import React, { useState } from 'react'
import { useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const NavBar = ({setIsLoggedIn}) => {
  
  const [click,setClick]=useState(false);
  const [baba,setBaba] =useState(false);
  const [category,setCategory] =useState([]);
  const [loader,setLoader] =useState(false);
  const navigate =useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/blog/getAllCategory');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategory(data.GetAllCategory);// Update the state with fetched data
        setLoader(true)
      } catch (error) {
        console.error('There was a problem fetching data:', error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch('http://localhost:5000/api/v1/blog/testAuth', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        console.log(response);
        if(response.status===200)
        {
          setBaba(true)
        }
      } catch (error) {
        console.error('There was a problem fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function clickHandler()
  {
    setClick(!click)
  }
  async function logOutHandler()
  {
    try {
      console.log("logOut")
      const response = await fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'GET',
        headers: {
          
        },
      });
      console.log(response);
      if(response.status===200)
      {
        toast.success("logOut successfully ",{
          position:'top-center'
        })
        setIsLoggedIn(false)
        setBaba(!baba)
      }
    } catch (error) {
      console.error('There was a problem fetching data:', error);
    }
  }


  function moveCategory(id,name)
  {
     navigate(`/category/${name}/${id}`);
  }
  return (
        <div className='w-full'>
            <div className='w-full h-max text-white flex items-center justify-between px-5 py-3'>
           <i>BlogBuddy</i>
            <div className='w-0 overflow-hidden md:w-[70%] md:h-[10vh] flex items-center justify-between'>
              
              {
                loader && (
                <ul className='flex items-center gap-x-5 uppercase'>
                   {
                     category.map((data)=>{
                      return ( <li onClick={()=>{moveCategory(data._id,data.categoryName)}} className=' cursor-pointer '>{data.categoryName}</li>)
                   })
                   }
              </ul>
              )
              }
             
             {
              
              
               !baba ? (<button className=' uppercase'> <NavLink to="/login" >Login</NavLink></button> 
              ) 
              :
              (
                <div className='flex gap-3'>
                <button onClick={logOutHandler} className=' uppercase' >logout</button> 
                <button className=' uppercase' > <NavLink to="/profile">Profile</NavLink></button> 
                </div>
              )
             
             }
             {/* <button > <NavLink to="/login" >Login</NavLink></button>  */}
            </div>
            <button onClick={clickHandler} className='md:hidden'><GiHamburgerMenu /></button>
          </div>
          {
            click ? <div className=' w-full h-max flex flex-col items-center justify-between text-white'>
              <ul className='flex items-center flex-col gap-y-5 uppercase'>
                  {
                     category.map((data)=>{
                      return ( <li onClick={()=>{moveCategory(data._id,data.categoryName)}} className=' cursor-pointer '>{data.categoryName}</li>)
                   })
                   }
                {
               !baba ? (<li > <NavLink to="/login" >Login</NavLink></li> 
              ) 
              :
              (
                <div className='flex flex-col gap-3'>
                <li onClick={logOutHandler} className=' cursor-pointer'> LogOut</li> 
                <li > <NavLink to="/profile">Profile</NavLink></li> 
                </div>
              )
             }
              </ul>
            
            </div> : <div></div>
          }
        </div>
  )
}

export default NavBar;