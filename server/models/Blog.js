const mongoose =require("mongoose");
const blogSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    blogImgUrl:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});


blogSchema.pre("find", function (next) {
    this.populate("user");
    next();
});
blogSchema.pre("findByIdAndUpdate", function (next) {
   
    this.populate("category");
    next();
});

module.exports=mongoose.model("Blog",blogSchema)