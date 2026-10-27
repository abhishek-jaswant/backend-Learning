require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});

app.get('/sendmail', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: [process.env.MY_EMAIL, "venugopal.burli@masaischool.com"],
      subject: 'Testing mail -new Student',
      text: 'This is a testing Mail sent by NEM student, no need to reply.',
    });
    console.log("this is infomation ---->", info);
    return res.status(200).json({msg:"Email sent successfully",msgId:info.messageId});
  }catch(err){
    console.log(err.message);

    return res.status(500).json({msg:"Error occured while sending email",err:err.message});
  }
});
 const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port localhost:${port}/sendmail`);
});