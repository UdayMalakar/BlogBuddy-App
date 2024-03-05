import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../components/Card';


const Category = () => {
    const id=useParams().id;
    const name=useParams().name.toUpperCase();
    const [data,setData]=useState([]);
    const [loader,setLoader]=useState(false);
     useEffect (()=>{
         const fetchdata = async ()=>{
            try {
                const response = await  fetch(`http://localhost:5000/api/v1/blog/getAllCategoryBlogs/${id}`, {
                method: 'GET',
                headers: {

                },
                })
            
    
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const dataAgain = await response.json();
              console.log("Get User",dataAgain.categoryArray)
              setData(dataAgain.categoryArray)
              console.log("baba ka Data",data)
              setLoader(true)
             
            } catch (error) {
              console.error('There was a problem fetching data:', error);
            }

         }

         fetchdata();

     },[])
  return (
    <div className='w-full h-max flex flex-col items-center'>
    <h1 className='text-[rgb(145,105,255)] text-center sm:text-3xl text-xl mb-10 mt-10'>{`${name} Blog's On BuddyBlog`}</h1>
    <div className='w-[80%] h-max flex flex-wrap items-center justify-center'>
        {
          loader && (
            data.map((data)=>{
             
            
             return (<Card data={data}></Card>)
           
           
         })
          )
        }
        {
            data.length===0 && (<div>{`Currently No ${name} Blog's are Available`}</div>)
        }
        
    </div>
   
</div>
  )
}

export default Category;