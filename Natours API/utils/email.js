const nodemailer = require('nodemailer');
const pug = require('pug');
const htmToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Emmanuel Adeyemi <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  //send the actual mail
  async send(template, subject) {
    // less secure app option in gmail
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmToText.fromString(html)
    };

    await this.newTransport().sendEmail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome', 'Welcome to the Natours Family');
  }
};
