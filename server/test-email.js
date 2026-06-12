require('dotenv').config({ path: './.env' });
const nodemailer = require('nodemailer');

async function testMail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_SENDER,
      to: 'karanvir2146@gmail.com', // sending to self to test
      subject: 'Test Email from Nodemailer',
      text: 'This is a test email to verify SMTP configuration.'
    });
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testMail();
