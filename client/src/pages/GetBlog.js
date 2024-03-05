import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TrendingCardSection from '../components/TrendingCardSection';

const GetBlog = () => {
    const id=useParams().id;
    const [loader,setLoader] =useState(false)
    const [data,setData] =useState();
    useEffect (
        ()=>{
            const fetchData = async () => {

                try {
                 setLoader(false)
                  const response = await fetch(`http://localhost:5000/api/v1/blog/getBlog/${id}`);
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  const dataAgain = await response.json();
                  console.log(dataAgain);
                  setData(dataAgain.findBlog);// Update the state with fetched data
                  setLoader(true)
                } catch (error) {
                  console.error('There was a problem fetching data:', error);
                }
              };
          
              fetchData(); 
        },[]
    )
  return (
    <div className='bg-white w-full min-h-screen overflow-x-hidden'>
         {
            loader ? (<div>
                <div className='bg-white flex flex-col w-screen min-h-screen items-center gap-y-5 mt-10 mb-20'>
                
                   <img src={data.blogImgUrl} className='sm:w-[60%] sm:h-[300px] object-cover'></img>
                
                   <h1 className='w-[60%] text-xl text-black'>{data.title}</h1>
                   <pre className='w-[60%] text-md text-start whitespace-pre-wrap '>
      {data.description}
    </pre>

                   <p className='text-md w-[60%]'>Dhanyavaad! Main khushi hoon ki aapko mera jawab pasand aaya aur aapko isse kuch naya sikha. Agar aapko koi aur madad chahiye ho ya koi aur prashna ho, toh hamesha puchh sakte hain. Keep up the good work with your blog!</p>
                   
                   <TrendingCardSection></TrendingCardSection>
                </div>
            </div>) :(<div>Blog nhi hai</div>)
         }
    </div>
  )
}

export default GetBlog;