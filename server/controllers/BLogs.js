const User =require("../models/User");
const Blog =require("../models/Blog");
const category =require("../models/category");
exports.createCategory =async(req,res)=>{
    try{
        const {categoryName} = req.body;
        
        if(!category)
        {
            return res.status(403)
            .json({
                success:false,
                message:"please enter all the details"
            })
        };

        const categoryExist = await category.findOne({categoryName})
        
        if(categoryExist)
        {
            return res.status(400)
            .json({
                success:false,
                message:"category already exist"
            })
        }

        const createNewcategory =await category.create({
            categoryName,
        })

        return res.status(200)
        .json({
            success:true,
            message:"category created successfully"
        })
    }catch(error)
    {
        return res.status(500)
        .json({
            success:false,
            message:"somthing went wrong while creating category"
        })
    }
}






exports.createBlog =async(req,res)=>{
    try{
        const{title,description, blogImgUrl,categoryId}=req.body;
        const userId=req.user.id;
        console.log(title);
        console.log(description);
        console.log(blogImgUrl);
        console.log(categoryId)
        if(!title || !description || !blogImgUrl || !categoryId)
        {
            return res.status(400)
            .json({
                success:false,
                message:"Please enter all the details !"
            })
        };
         const newUser =await User.findById(userId);
        const categoryExist = await category.findById(categoryId);
        console.log(categoryExist)
         console.log("hello")
        if(!categoryExist)
        {
            return res.status(403)
            .json({
                success:false,
                message:"Category Not Exist please select correct category"
            })
        };

        const createBLog =await Blog.create({
            title,
            description,
            blogImgUrl,
            category:categoryExist,
            user:newUser
        })
        
       const updateUser = await User.findByIdAndUpdate(userId,
              {
                $push: {
                  blog:createBLog._id,
                },
              },
              { new: true }
        ).populate().exec();

        const updateCategory = await category.findByIdAndUpdate(categoryId,
            {
              $push: {
                blog:createBLog._id,
              },
            },
            { new: true }
      ).populate().exec();
        return res.status(200)
        .json({
            success:true,
            message:"Blog created successfully",
            updateUser,
            updateCategory
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing Went Wrong in Creating BLogs"
        })
    }
};

exports.deleteBlog =async(req,res)=>{
    try{
        const {blogId,categoryId} =req.body;
        const userId=req.user.id;
        console.log(userId);
       const deletBLog =await Blog.findByIdAndDelete(blogId)
        console.log(deletBLog)
       const updateUser = await User.findByIdAndUpdate(userId,
              {
                $pull: {
                  blog:deletBLog._id,
                },
              },
              { new: true }
        ).populate().exec();

        const updateCategory = await category.findByIdAndUpdate(categoryId,
            {
              $pull: {
                blog:deletBLog._id,
              },
            },
            { new: true }
      ).populate().exec();
        return res.status(200)
        .json({
            success:true,
            message:"Blog deleted successfully",
            updateUser,
            updateCategory
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing Went Wrong in Creating BLogs"
        })
    }
};


exports.getAllBlogs =async (req,res)=>
{
    try{

        const GetAllBlogs = await Blog.find({}).populate("user");
          console.log("hwelooooooooo")
        return res.status(200)
        .json({
            success:true,
            message:"SAbhi blog mil gaye hai",
            GetAllBlogs:GetAllBlogs
        })

    }catch(error)
    {
        return res.status(500)
        .json({
            success:false,
            message:"Something went wrong in getting all blogs !"
        })
    }
};


exports.getAllUserBlogs = async (req,res)=>
{
    try{
        const userId=req.user.id;
        console.log(userId)
        const GetAllUserBlogs = await User.findById(userId);
        const blogs =GetAllUserBlogs.blog;
        let userBLogArray=[];
        for(let i=0;i<blogs.length;i++)
        {
            var a = await Blog.findById(blogs[i]._id).populate("category").exec();
            console.log(a)
            userBLogArray.push(a);
            
        }
        return res.status(200)
        .json({
            success:true,
            message:" User ke SAbhi blog mil gaye hai",
            userBLogArray
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Something went wrong in getting all blogs !"
        })
    }
};

exports.getCategoryBlogs = async (req,res)=>
{
    try{
        const id=req.params.id;
        const GetAllCategoryBlogs = await category.findById(id);
        const blogs =GetAllCategoryBlogs.blog;
        console.log(blogs)
        let categoryArray=[];
        for(let i=0;i<blogs.length;i++)
        {
            var a = await Blog.findByIdAndUpdate(blogs[i]._id,{new:true}).populate("user").exec();
            console.log(a);
            categoryArray.push(a);
            
        }
        return res.status(200)
        .json({
            success:true,
            message:" Category ke SAbhi blog mil gaye hai",
            categoryArray
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Something went wrong in getting all blogs !"
        })
    }
};



exports.getAllCategory= async (req,res)=>
{
    try{
       
        const GetAllCategory= await category.find({});
        return res.status(200)
        .json({
            success:true,
            message:" Category ke SAbhi blog mil gaye hai",
            GetAllCategory
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Something went wrong in getting all blogs !"
        })
    }
};


exports.getUserDetails = async (req, res) => {
    try {
        const email = req.user.email;
        const getUser = await User.findOne({ email: email });

        if (!getUser) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }

        // If the user is found, send a single response
        return res.status(200).json({
            success: true,
            message: "User found",
            getUser,
        });

    } catch (error) {
        console.error(error);
        // Handle other errors with a single response
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}



exports.getBLog =async (req,res)=>{
    const id=req.params.id;
    console.log(id);
    try{
        const findBlog = await Blog.findById(id);
        return res.status(200)
        .json({
            success:true,
            message:"Blog MIl Gya",
            findBlog
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            "message":"Somthing Went wrong to get Blog"
        })
    }
};


exports.findUserDetails = async (req,res)=>{
    try{

        const id =req.params.id;
         console.log(id)
        const findUser = await User.findById(id);

        return res.status(200)
        .json({
            success:true,
            message:"User details are got ",
            findUser
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing Went Wrong in this Controller !"
        })
    }
};