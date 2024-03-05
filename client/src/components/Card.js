import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Card = (props) => {
    const data=props.data;
    const firstName =data.user.firstName
    let string=data.description;
    let navigate =useNavigate();
    

    function readMoreHandler(id)
    {
        navigate(`/getBlog/${id}`)

    }
    

    function profileClickHandller(id)
    {
        console.log("this Is User Id ",id);
    }

  return (
    <div className='sm:w-[250px] sm:h-[400px] bg-white text-black  mb-10 rounded-md w-full h-[400px]  sm:mx-5'>
        <img src={data.blogImgUrl} className='w-full h-[150px] object-cover'></img>
        <div className='w-full h-[60%] flex flex-col items-start mt-5 ml-2 gap-y-1 relative '>
            <h1 className='ml-1 font-sans text-xl'>{`${data.title.substring(0,20)}......`}</h1>
            <div className='w-full h-[20%]  flex  items-center justify-between flex-wrap'>
                <div className='flex items-center justify-center gap-x-2'>
                <img onClick={()=>{profileClickHandller(data.user._id)}} src={data.user.profileImgUrl} className='w-[35px] h-[35px] object-cover rounded-full cursor-pointer'></img>
                <p className='text-sm uppercase'>{`${firstName} ${data.user.lastName}`}</p>
                </div>

            </div>
            <p className='text-[0.8rem]'>{

             (data.description.length >=150) ? (
              <p>{`${string.substring(0,150)}......`}</p>
             ) : (
              <p>{`${data.description}`}</p>
             )

            }</p>
            <button onClick={()=>{readMoreHandler(data._id)}} className='w-[100px] h-[30px] bg-[rgb(0,7,38)] hover:rounded-full   hover:bg-red-500 text-white absolute bottom-4 '>Read Post</button>
        </div>
    </div>
  )
}

export default Card;