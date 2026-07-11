require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID || process.env.CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendMailHelper = async (to, subject, text, html) => {
  try {
    if (
      !process.env.EMAIL_USER ||
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.REFRESH_TOKEN
    ) {
      throw new Error(
        "Email configuration is incomplete. Check EMAIL_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and REFRESH_TOKEN.",
      );
    }

    const info = await transporter.sendMail({
      from: `"Nova Coders" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMailHelper;
module.exports.sendMailHelper = sendMailHelper;
module.exports.transporter = transporter;
