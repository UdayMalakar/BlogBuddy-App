const mongoose =require("mongoose");
const mailSender = require("../utiles/mailSender");
const otpSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

async function sendVerificationEmail(email,otp)
{
    try{
        await mailSender(email,"Verification email from BlogiBaba ",otp);
    }catch(error)
    {
        console.log("Error occured while sending Email")
        throw error;
    }

}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports=mongoose.model("otp",otpSchema);