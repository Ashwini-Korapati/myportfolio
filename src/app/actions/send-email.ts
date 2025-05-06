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

  // Ensure environment variables are set, otherwise log an error and return failure
  // For local development, you might hardcode these or use a .env.local file
  const emailServerUser = process.env.EMAIL_SERVER_USER;
  const emailServerPassword = process.env.EMAIL_SERVER_PASSWORD;
  const emailServerHost = process.env.EMAIL_SERVER_HOST;
  const emailServerPort = process.env.EMAIL_SERVER_PORT || '587';
  const emailServerSecure = process.env.EMAIL_SERVER_SECURE === 'true';

  if (!emailServerUser || !emailServerPassword || !emailServerHost) {
    console.error('Email server credentials or host not configured in environment variables.');
    // Consider providing a more user-friendly message in a real application
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
    // Adding timeout options
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 10000, // 10 seconds
  });

  const mailOptions = {
    from: `"${name}" <${emailServerUser}>`, // Use authenticated user as sender for better deliverability
    to: 'aashv143@gmail.com', // Receiver's email address
    replyTo: email, // Set Reply-To to the user's email
    subject: `New Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    // Verify connection configuration
    // await transporter.verify(); // Optional: verify connection, can be removed if causing issues
    // console.log("Nodemailer transporter verified successfully.");

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { success: true, message: "Thank you for your message. I'll get back to you soon!" };
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error);
    let errorMessage = 'There was a problem sending your message. Please try again later.';
    if (error instanceof Error) {
        // More specific error handling based on Nodemailer error codes/messages
        if ((error as any).code === 'ECONNREFUSED' || (error as any).code === 'ENOTFOUND') {
            errorMessage = 'Could not connect to the email server. Please check the server configuration.';
        } else if ((error as any).responseCode === 535 || (error as any).code === 'EAUTH') { // Authentication error
            errorMessage = 'Email server authentication failed. Please check server credentials.';
        } else if (error.message.includes('Timeout')) {
            errorMessage = 'The email server timed out. Please try again later.';
        }
    }
    return { success: false, message: errorMessage };
  }
}
