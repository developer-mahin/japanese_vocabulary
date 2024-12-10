import nodemailer from "nodemailer";
import config from "../config";

type TMailData = {
  email: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.smtp_email,
    pass: config.smtp_pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (mailData: TMailData) => {
  try {
    const mailOption = {
      from: config.smtp_email,
      to: mailData.email,
      subject: mailData.subject,
      html: mailData.html,
    };

    const info = await transporter.sendMail(mailOption);
    console.log("message %s", info.messageId);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default sendMail;
