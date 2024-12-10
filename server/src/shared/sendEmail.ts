// import { Request, Response } from "express";

import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "farhan.adnan1952@gmail.com",
    pass: "odogzppnxqlrgqjr",
  },
});

const sendMail = asyncHandler(async (req, res) => {
  const { email, subject, message } = req?.body || {};
  console.log(email, subject, message);

  var mailOptions = {
    from: "farhan.adnan1952@gmail.com",
    to: email, // list of receivers
    subject: subject, // Subject line
    message: message, // plain text body
    html: message, // html body
  };
  transporter.sendMail(mailOptions, function (error: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("email gone");
    }
  });
});
// module.exports = sendMail;
export default sendMail;
