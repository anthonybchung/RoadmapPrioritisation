const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${process.env.FROM_NAME},<${process.env.FROM_EMAIL}>`, // sender address
      to: options.email, // receivers
      subject: options.subject, // Subject line
      text: options.message, // plain text body
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmail;
