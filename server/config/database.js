const mongoose=require("mongoose");

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>
    {
        console.log("DB Connected Succesfully")
    })
    .catch((error)=>{
        console.log(error)
    })
};

module.exports = dbConnect;