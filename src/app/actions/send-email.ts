
'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

const SendEmailInputSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
});

export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export interface SendEmailResult {
  success: boolean;
  message: string;
}

export async function sendEmailAction(input: SendEmailInput): Promise<SendEmailResult> {
  const validation = SendEmailInputSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { name, email, message } = validation.data;

  const emailServerUser = process.env.EMAIL_SERVER_USER;
  const emailServerPassword = process.env.EMAIL_SERVER_PASSWORD;
  const emailServerHost = process.env.EMAIL_SERVER_HOST;
  const emailServerPortEnv = process.env.EMAIL_SERVER_PORT;
  const emailTo = process.env.EMAIL_TO || 'aashv143@gmail.com'; // Default receiver

  if (!emailServerUser || !emailServerPassword || !emailServerHost || !emailServerPortEnv || !emailTo) {
    console.error('Email server configuration incomplete. Check .env file for EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_TO.');
    return { success: false, message: 'The email service is not configured. Please ensure all required email environment variables are set.' };
  }

  const emailServerPort = parseInt(emailServerPortEnv, 10);
  if (isNaN(emailServerPort)) {
    console.error('Invalid EMAIL_SERVER_PORT in .env file. It must be a number.');
    return { success: false, message: 'The email service port is misconfigured.' };
  }
  
  let emailServerSecure = process.env.EMAIL_SERVER_SECURE === 'true';
  if (process.env.EMAIL_SERVER_SECURE === undefined) {
    // Autodetect secure based on port if not explicitly set
    emailServerSecure = emailServerPort === 465;
  }


  console.log(`Attempting to send email. To: ${emailTo}, From (config): ${emailServerUser}, Host: ${emailServerHost}, Port: ${emailServerPort}, Secure: ${emailServerSecure}`);


  const transporter = nodemailer.createTransport({
    host: emailServerHost,
    port: emailServerPort,
    secure: emailServerSecure, 
    auth: {
      user: emailServerUser,
      pass: emailServerPassword,
    },
    connectionTimeout: 10000, 
    socketTimeout: 10000,
    debug: process.env.NODE_ENV === 'development', // Enable SMTP logs in dev for more details
    logger: process.env.NODE_ENV === 'development', // Enable SMTP logs in dev
  });

  const mailOptions = {
    from: `"${name}" <${emailServerUser}>`, 
    to: emailTo, 
    replyTo: email,
    subject: `New Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    // console.log('Attempting to send email with options:', mailOptions);
    // console.log('Using transporter config:', { host: emailServerHost, port: emailServerPort, secure: emailServerSecure, user: emailServerUser ? '******' : undefined });
    
    // Optional: Verify connection configuration - can be helpful for debugging
    // await transporter.verify();
    // console.log("Nodemailer transporter verified successfully.");

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
    return { success: true, message: "Thank you for your message. I'll get back to you soon!" };
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error);
    let errorMessage = 'There was a problem sending your message. Please check server logs for Nodemailer error details.';
    
    if (error instanceof Error) {
        const nodemailerError = error as any; 
        if (nodemailerError.code === 'ECONNREFUSED' || nodemailerError.code === 'ENOTFOUND' || nodemailerError.code === 'EHOSTUNREACH') {
            errorMessage = `Could not connect to email server at ${emailServerHost}:${emailServerPort}. Please check server address, port, and network.`;
        } else if (nodemailerError.responseCode === 535 || nodemailerError.code === 'EAUTH') { 
            errorMessage = 'Email server authentication failed. Please check your email credentials (EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD) in environment variables.';
        } else if (nodemailerError.code === 'ETIMEDOUT' || error.message.toLowerCase().includes('timeout')) {
            errorMessage = `The email server at ${emailServerHost} timed out. Please try again later or check server status.`;
        } else if (nodemailerError.code === 'EENVELOPE') {
            errorMessage = 'There was an issue with the email recipient or sender addresses. Please check them.';
        } else if (nodemailerError.code === 'ESOCKET') {
             errorMessage = `A socket error occurred while connecting to ${emailServerHost}:${emailServerPort}. This could be a TLS/SSL issue or network problem. Ensure 'EMAIL_SERVER_SECURE' is set correctly.`;
        } else {
            // For other errors, include the error message if it's informative
             errorMessage = `Failed to send email: ${error.message || 'Unknown Nodemailer error'}. Check server logs.`;
        }
    }
    console.error(`Detailed error message for client: ${errorMessage}`);
    return { success: false, message: errorMessage };
  }
}

