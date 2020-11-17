import express from 'express';
const router = express.Router();
import multer from 'multer';

import nodemailer from 'nodemailer';
function mailsend(userDetail){
  let success ;
  let err ='';
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  //true for 465 port, false for other ports
        auth: {
          user: userDetail.email,
          pass: userDetail.password,
        } 
      });
               
      const mailOptions = {
        from: userDetail.email, // sender address
        to: "shopattrinkets@gmail.com", // list of receivers
        subject: "Custom Trinket Request", // Subject line
        html:"<h4>"+userDetail.message+"</h4>",
        attachments:[{path:'uploads/'+userDetail.image}]
    };
   
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
             console.log(error);
        } else {
             console.log('Success');  
        }
      });
}




router.post('/makeRequest', (req,res)=>{


  const data = {
    email : req.body.email,
    password : req.body.password,
    image : req.body.image.split("\\")[1],
    message : req.body.message
  }
  mailsend(data);
 // console.log(response);
  //console.log(mailsend(data));
  // if(mailse
  //     res.send({success:true, message:"Request sent Successfuly."})
  // else
  //     res.send({success:false, message:"Request Sent Failed"})

});





export default router;