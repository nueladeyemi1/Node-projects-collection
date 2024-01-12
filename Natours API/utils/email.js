const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD
    }

    // less secure app option in gmail
  });

  const mailOptions = {
    from: 'Emmanuel Adeyemi <hello@emmanueladeyemi.com>',
    to: option.email,
    subject: option.subject,
    text: option.message
  };

  // TRANSPORTER

  await transporter.sendEmail(mailOptions);
};

module.exports = sendEmail;
