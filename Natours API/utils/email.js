const nodemailer = require('nodemailer');

const sendEmail = options => {
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD
    }

    // less secure app option in gmail
  });

  const mailOptions = {
    from: 'Emmanuel.adeyemi40@gmail.com'
    // to: option
  };
};
