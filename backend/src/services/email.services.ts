import transporter from "../config/nodemailer.config";
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

// export const sendResetEmail = async (email: string, resetCode: string) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your Password Reset Code',
//     text: `Your password reset code is: ${resetCode}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Error sending reset email');
//   }
// };


/**
 * Function to send a registration email
 * @param email 
 * @param name 
 */
export const sendRegistrationEmail = async (email: string, name: string) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Set email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Your Password Reset Code',
     text: `Your password reset code is: ${resetCode}`,
};

// Send email
await transporter.sendMail(mailOptions);
};

export sendMail(mailOptions);
