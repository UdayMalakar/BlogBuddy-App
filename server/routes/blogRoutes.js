const express=require("express");
const router=express.Router();
const {createCategory,createBlog,deleteBlog,getAllBlogs,getAllUserBlogs,getCategoryBlogs,getAllCategory,getUserDetails,getBLog,findUserDetails} =require("../controllers/BLogs");
const {auth}=require("../middlewears/auth");
router.post("/createCategory",auth,createCategory);
router.post("/createBlog",auth,createBlog);
router.delete("/deleteBlog",auth,deleteBlog);
router.get("/getAllBlogs",getAllBlogs);
router.get("/getAllUserBlogs",auth,getAllUserBlogs);
router.get("/getAllCategoryBlogs/:id",getCategoryBlogs);
router.get("/getAllCategory",getAllCategory)
router.get("/getUser",auth,getUserDetails)
router.get("/getblog/:id",getBLog);
router.get("/testAuth",auth,(req,res)=>{
    res.status(200)
			.json({
				success:true,
				token:"token mil gya"
			})
})
router.get("/userDetailes/:id",findUserDetails);
module.exports=router;