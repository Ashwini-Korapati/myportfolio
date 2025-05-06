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
  const emailServerPort = process.env.EMAIL_SERVER_PORT || '587'; // Default to 587 for STARTTLS
  const emailTo = process.env.EMAIL_TO || 'aashv143@gmail.com'; // Receiver's email address

  // Determine 'secure' based on port, typical for 465 (SSL) vs 587 (STARTTLS)
  // process.env.EMAIL_SERVER_SECURE can override this logic if explicitly set
  let emailServerSecure = process.env.EMAIL_SERVER_SECURE === 'true';
  if (process.env.EMAIL_SERVER_SECURE === undefined) {
    emailServerSecure = parseInt(emailServerPort, 10) === 465;
  }


  if (!emailServerUser || !emailServerPassword || !emailServerHost) {
    console.error('Email server credentials or host not configured in environment variables.');
    return { success: false, message: 'The email service is not configured correctly. Please contact support.' };
  }

  const transporter = nodemailer.createTransport({
    host: emailServerHost,
    port: parseInt(emailServerPort, 10),
    secure: emailServerSecure, 
    auth: {
      user: emailServerUser,
      pass: emailServerPassword,
    },
    connectionTimeout: 10000, 
    socketTimeout: 10000, 
    // requireTLS: true, // Often useful for port 587
    // logger: process.env.NODE_ENV === 'development', // Enable SMTP logs in dev
    // debug: process.env.NODE_ENV === 'development', // Enable SMTP logs in dev
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
    console.log('Email sent: %s', info.messageId);
    return { success: true, message: "Thank you for your message. I'll get back to you soon!" };
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error);
    let errorMessage = 'There was a problem sending your message. Please check server logs for Nodemailer error details.'; // More specific default
    if (error instanceof Error) {
        const nodemailerError = error as any; // Type assertion for Nodemailer specific codes
        if (nodemailerError.code === 'ECONNREFUSED' || nodemailerError.code === 'ENOTFOUND') {
            errorMessage = 'Could not connect to the email server. Please check the server configuration and network.';
        } else if (nodemailerError.responseCode === 535 || nodemailerError.code === 'EAUTH') { 
            errorMessage = 'Email server authentication failed. Please check your email credentials in environment variables.';
        } else if (nodemailerError.code === 'ETIMEDOUT' || error.message.includes('Timeout')) {
            errorMessage = 'The email server timed out. Please try again later.';
        } else if (nodemailerError.code === 'EENVELOPE') {
            errorMessage = 'There was an issue with the email recipient or sender addresses. Please check them.';
        }
    }
    return { success: false, message: errorMessage };
  }
}
