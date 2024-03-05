import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card';
import CardAgain from '../components/CardAgain';

const Profile = () => {
    const [baba,setBaba]=useState(false);
    const [data,setData]=useState([])
    const [getData,setGetData]=useState()
    const [loader,setLoader]=useState(false);
    useEffect(() => {
      const fetchData = async () => {
        const token =localStorage.getItem('accessToken');
        console.log(token)
        try {
            const response = await  fetch('http://localhost:5000/api/v1/blog/getAllUserBlogs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
                     })
            console.log(response)


          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const dataAgain = await response.json();
          console.log(dataAgain.userBLogArray)
          setData(dataAgain.userBLogArray);// Update the state with fetched data
        } catch (error) {
          console.error('There was a problem fetching data:', error);
        }
      };
  
      fetchData(); // Call the async function
    }, [baba]);






    useEffect(() => {
      const fetchData = async () => {
        const token =localStorage.getItem('accessToken');
        console.log(token)
        try {
            const response = await  fetch('http://localhost:5000/api/v1/blog/getUser', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            })
        

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const dataAgain = await response.json();
          console.log("Get User",dataAgain.getUser)
          setGetData(dataAgain.getUser)
          console.log("baba ka Data",getData)
          setLoader(true)
         
        } catch (error) {
          console.error('There was a problem fetching data:', error);
        }
      };
  
      fetchData(); // Call the async function
    },[]);



    async function deleteHandler(Bid,Cid)
    {
       const obj ={
        blogId:Bid,
        categoryId:Cid
       }
      const token =localStorage.getItem('accessToken');
      console.log(token)
      try {
          const response = await  fetch('http://localhost:5000/api/v1/blog/deleteBlog', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(obj)
          })
          console.log(response)


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      
        setBaba(!baba)
      } catch (error) {
        console.error('There was a problem fetching data:', error);
      }
    }

    const [valueIndex,setValueIndex] = useState([
    ]);
    const [dada,setDada] =useState(false);
    function deleteClickHandelr(index)
    {   
        valueIndex[index]=!valueIndex[index];
        console.log(index)
        console.log(valueIndex)
        setDada(!dada);
      }
  return (
      !loader ? (<div></div>) : (
        <div className='bg-[rgb(0,7,38)] text-white  min-w-[screen] min-h-[100vh]  p-10'>
    <div className='w-full h-max flex items-center flex-wrap justify-center sm:p-10 gap-5 text-black  '>
            <img src={getData.profileImgUrl} className='sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] object-cover rounded-full'></img>

            <div className='flex flex-col mt-10 gap-5 text-white sm:w-max w-full ' >
                <h2 className='sm:text-start sm:text-xl text-md uppercase font-semibold text-center'>{`${getData.firstName} ${getData.lastName}`}</h2>
                <p className='sm:text-md  sm:text-start text-center text-sm'>Passionate daily blogger sharing captivating stories and insights. Join me on a journey of daily exploration, as I unfold unique perspectives and interesting narratives. Follow for a daily dose of inspiration!</p>
            </div>
    </div>
    <div className='w-full h-max  text-black mt-10'>
        {
             
             data.map((data,index)=>{
               let blogId=data._id;
               let categoryId=data.category;
               if (valueIndex[index] === undefined) {
                 valueIndex[index] = false;
                 }

                return (
                      <div className='flex flex-col gap-y-2 '>
                     <div className='w-full flex flex-wrap gap-y-2'>
                     <CardAgain data={data}  ></CardAgain>
                     {

                      !valueIndex[index] && (

                        <button  onClick={()=>{deleteClickHandelr(index)}} className='w-[100px] h-[30px] bg-white self-center text-center'>Delete</button>
                      )
                     }
                     
                      </div>
                      <div className='w-full h-max '>
                      {
                        
                        valueIndex[index] && (
                          <div className='w-full flex'>
                          <div className='w-max  sm:w-[80%] flex flex-wrap items-center sm:justify-end justify-start sm:pr-20 gap-5'>
                          <button  onClick={()=>{deleteClickHandelr(index)}} className=' w-[100px] h-[30px] bg-white text-black self-center text-center'>Cancel</button>
                        </div>
                        <button  onClick={ ()=>{deleteHandler(blogId,categoryId)}}  className='w-[100px] h-[30px] bg-white text-black self-center text-center mx-3 text-sm'>ConfirmDelete</button>
                          </div>
                        )
          
                      }
                      </div>
                      </div>
                )
             })
        }
    </div>
    
    </div>
      )
  )
}

export default Profile;