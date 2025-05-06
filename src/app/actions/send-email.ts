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

  if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
    console.error('Email server credentials not configured.');
    return { success: false, message: 'Email server not configured.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
    secure: process.env.EMAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`, // sender address (appears as sender in the inbox)
    to: 'aashv143@gmail.com', // list of receivers
    replyTo: email, // Reply-To header
    subject: `New Portfolio Contact from ${name}`, // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`, // html body
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Thank you for your message. I'll get back to you soon!" };
  } catch (error) {
    console.error('Error sending email:', error);
    // It's important not to expose detailed error messages to the client for security reasons.
    // Log the full error on the server.
    let errorMessage = 'There was a problem sending your message. Please try again later.';
    if (error instanceof Error) {
        if (error.message.includes('Invalid login') || error.message.includes('Authentication unsuccessful')) {
            errorMessage = 'Email server authentication failed. Please check server credentials.';
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
            errorMessage = 'Could not connect to email server. Please check server host/port.';
        }
    }
    return { success: false, message: errorMessage };
  }
}
