import React from 'react'

const CardAgain = (props) => {
    const data=props.data;
    console.log(data)
  return (
    <div className='sm:w-[80%] w-full flex items-center justify-center gap-5 mt-10 flex-wrap text-white'>
        <img className='sm:w-[100px] sm:h-[100px] w-full h-[20vh] sm:rounded-xl' src={data.blogImgUrl}></img>
        <div className='flex sm:w-[70%] w-full'>
        <div className='flex flex-col gap-2 sm:justify-between text-[1rem]'>
            <p>Category </p>
            <p>Title </p>
            <p>Description</p>
        </div>
        <div className='flex flex-col gap-2 justify-between text-[0.8rem]'>
            <p className=' uppercase'>:{`${data.category.categoryName}`}</p>
            <p>:{data.title}</p>
            <p className='text-[0.8rem]'>:{`${data.description.substring(0,100)}......`}</p>
        </div>
        </div>
    </div>
    
  )
}

export default CardAgain;