
'use server';
/**
 * @fileOverview Handles sending contact messages via a Genkit flow.
 *
 * - sendContactMessage - A function that processes the contact form submission.
 * - SendContactMessageInput - The input type for the sendContactMessage function.
 * - SendContactMessageOutput - The return type for the sendContactMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The full name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender.'),
  messageBody: z.string().describe('The content of the message.'),
});
export type SendContactMessageInput = z.infer<typeof SendContactMessageInputSchema>;

const SendContactMessageOutputSchema = z.object({
  confirmationMessage: z.string().describe('A confirmation message to be displayed to the user.'),
});
export type SendContactMessageOutput = z.infer<typeof SendContactMessageOutputSchema>;

export async function sendContactMessage(input: SendContactMessageInput): Promise<SendContactMessageOutput> {
  return sendContactMessageFlow(input);
}

const contactPrompt = ai.definePrompt({
  name: 'contactFormPrompt',
  input: {schema: SendContactMessageInputSchema},
  output: {schema: SendContactMessageOutputSchema},
  prompt: `You are a helpful virtual assistant for Ashwini M.'s personal portfolio website.
A user has submitted the contact form with the following details:
Name: {{{name}}}
Email: {{{email}}}
Message:
{{{messageBody}}}

This message needs to be recorded and Ashwini M. (aashv143@gmail.com) should be notified.

Your primary task is to generate a brief, polite, and reassuring confirmation message for the user.
This confirmation message should acknowledge receipt of their message and state that Ashwini will review it and respond if necessary.
Example confirmation message: "Thank you for your message, {{{name}}}! Ashwini has received it and will get back to you if a response is needed."
Do NOT include Ashwini's email address (aashv143@gmail.com) in the confirmation message sent back to the user.
Do NOT mention anything about forwarding the email in the confirmation message.
Keep the confirmation message concise and professional.
`,
});

const sendContactMessageFlow = ai.defineFlow(
  {
    name: 'sendContactMessageFlow',
    inputSchema: SendContactMessageInputSchema,
    outputSchema: SendContactMessageOutputSchema,
  },
  async (input: SendContactMessageInput) => {
    // **IMPORTANT: Email Sending Simulation**
    // The following console.log simulates sending an email.
    // In a real-world application, you would replace this with actual email sending logic
    // using a service like SendGrid, Nodemailer with an SMTP provider, AWS SES, or a Firebase Extension.
    // This functionality is NOT currently implemented beyond this simulation.
    console.log('\n--- SIMULATING EMAIL SEND ---');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('Recipient: aashv143@gmail.com'); // Updated email address
    console.log('Sender Name:', input.name);
    console.log('Sender Email:', input.email);
    console.log('Message Body:\n', input.messageBody);
    console.log('--- END OF EMAIL SIMULATION ---\n');
    console.log('NOTE: To send actual emails, integrate an email service provider here.');


    const {output} = await contactPrompt(input);
    if (!output) {
      // This is a fallback, should ideally not happen if the prompt is well-defined.
      return { confirmationMessage: `Thank you for your message, ${input.name}. It has been received.`};
    }
    return output;
  }
);

