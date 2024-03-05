import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const BlogUploadPage = () => {
  let navigate =useNavigate()
  const [category, setCategory] = useState([]);
  const [baba,setBaba]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/blog/getAllCategory');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategory(data.GetAllCategory);// Update the state with fetched data
        setBaba(true)
      } catch (error) {
        console.error('There was a problem fetching data:', error);
      }
    };

    fetchData(); // Call the async function
  }, []);
  
  const [blogData,setBlogData] = useState({
    categoryId:"",
    title:"",
    description:"",
    blogImgUrl:"",
    categoryName:"Select Category"
  }) 
  function changeHadler(event)
  {
      setBlogData((prevData)=>(
         { ...prevData,
          [event.target.name]:event.target.value
         }
      ))
      console.log(blogData);
  }
  
  async function submitHandler(event)
  {
    const token =localStorage.getItem('accessToken');
    try{
    
        event.preventDefault();
        const response=await  fetch('http://localhost:5000/api/v1/blog/createBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(blogData),
        })
        
        console.log(response)
        if(response.status===200)
        {
          toast.success("Blog Created successfully ",{
            position:'top-center'
          })
          navigate("/blogUpload");
        }
    }
    catch(error)
    {
        console.log("register",error);
    }
  }
  return (
    <div className='w-[100vw] min-h-screen bg-[rgb(0,7,38)] flex items-center justify-center text-black '>
         <div className='w-[80vw] h-[80vh] flex items-center justify-center'>
         <form className=' w-full h-full flex flex-col gap-10 items-center uppercase' onSubmit={submitHandler}>
          {
            baba ? ( 
              <div className='flex gap-10'>
                <label id='category' className='text-white'>
                       Select Category
                </label>
                <select className='sm:w-[250px] w-full text-black' onChange={changeHadler} name='categoryId' id='category' value={blogData.categoryId}>
                <option name="categoryName" value={blogData.categoryName} className='text-black uppercase'>{blogData.categoryName}</option>
            {
              category.map((data)=>{
                return (
                <option value={data._id} className='text-black uppercase'>{data.categoryName}</option>)
              })
            }
           </select>
              </div>
              
           ):
           (
            <div></div>
           )
          }
          <label className='w-full text-white'>Title : <input onChange={changeHadler} type='text' name='title' value={blogData.title} className='w-full h-[40px] border-none outline-none text-black '></input></label>
          <label id='textArea' className='w-full text-white'>Description :</label>
          <textarea onChange={changeHadler} id='textArea' type='text' name='description' value={blogData.description} className='w-full h-[30vh] border-none outline-none text-black'></textarea>
          <label className='w-full text-white'>ImgUrl: <input onChange={changeHadler} type='text' name='blogImgUrl' value={blogData.blogImgUrl} className='w-full h-[40px] border-none outline-none text-black'></input></label>
          <button className='w-[200px] h-[50px] bg-[rgb(25,60,216)] rounded-xl text-white'>Upload</button>
         </form>
         </div>
    </div>
  )
}

export default BlogUploadPage;