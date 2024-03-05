const nodemailer =require("nodemailer");
require("dotenv").config();
const mailSender = async(email,title,body)=>{
    try{
        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });

        let info =await transpoter.sendMail({
            from: 'BlogBaba || UdayMalakar - from BlogBaba',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });

        return info;

    }catch(error)
    {
        console.log(error.message);

    }
};

module.exports =mailSender;