import React, { useState } from 'react'
import Card from './Card';
import { useEffect } from 'react';
const TrendingCardSection = () => {
  const [baba,setBaba]=useState(false);
  const [data,setData]=useState([])
  const [count,setCount]=useState(3);
  let cnt=0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/blog/getAllBlogs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataAgain = await response.json();
        console.log(dataAgain);
        setData(dataAgain.GetAllBlogs);// Update the state with fetched data
        setBaba(true)
      } catch (error) {
        console.error('There was a problem fetching data:', error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  function viewHandler()
  {
     var newCount =count+3;
     if(newCount<data.length)
     {
      setCount(newCount);
     }
     else
     {
      newCount=data.length;
      setCount(newCount)
     }
  }
  return (
    <div className='w-full h-max flex flex-col items-center'>
        <h1 className='text-[rgb(145,105,255)] text-center text-3xl mb-10 mt-10'>Trending On BuddyBlog</h1>
        <div className='w-[80%] h-max flex flex-wrap items-center justify-center'>
            {
              data.map((data)=>{
                 
                if(cnt<count)
                {
                  cnt++;
                  return <Card data={data}></Card>
                }
                
              })
            }
            
        </div>
        {
              cnt<data.length && (<button onClick={viewHandler} className='w-[150px] h-[30px] bg-red-500 rounded-full text-white uppercase hover:bg-blue-700 hover:w-[160px] hover:h-[35px] '>View More</button>)
        }
    </div>
  )
}

export default TrendingCardSection;