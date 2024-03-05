import React from 'react'
import ComunitySection from '../components/ComunitySection';
import TrendingCardSection from '../components/TrendingCardSection';
import NavBar from '../components/NavBar';
//icons import 
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const Home = ({isLoggedIn,setIsLoggedIn}) => {
 
  return ( 
    <div className='w-full h-full  bg-[rgb(0,7,38)]'>
        <div className='w-full h-full  flex flex-col  '>
            <NavBar setIsLoggedIn={setIsLoggedIn} ></NavBar>
            <div className='w-full min-h-[30rem] mt-10  flex flex-col items-center justify-center text-white'>
              <h1 className='text-4xl uppercase text-center font-bold'>Personal blog for friends</h1>
              <p className='text-xl text-center'>Your companion for sharing Your stories</p>
              <button className=' md:w-[250px] md:h-[40px] w-[150px] h-[30px] mt-10 bg-red-500 rounded-sm'><NavLink to="/blogUpload">Start sharing blogs</NavLink></button>
            </div>
        </div>
        <TrendingCardSection></TrendingCardSection>
        <ComunitySection></ComunitySection>
        <footer className='text-white mt-10 w-full'>
          <div className=' w-full flex flex-wrap items-center justify-between sm:justify-between sm:items-center  px-5 md:px-20'>
            <div className='text-center mb-10'>
              <p className='text-sm'>Design & Devloped By</p>
              <p className='text-sm'>Uday Malakar</p>
            </div>
            <div className='flex gap-x-5 sm:mb-0 mb-5'>
            <FaInstagramSquare className='w-[20px] h-[20px]' />
            <FaFacebook className='w-[20px] h-[20px]' />
            <FaLinkedin className='w-[20px] h-[20px]' />
            <FaGithub className='w-[20px] h-[20px]' />
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Home;