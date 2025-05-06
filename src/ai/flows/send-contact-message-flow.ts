
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
  prompt: `You are a virtual assistant for Ashwini M.'s personal portfolio website.
A user has submitted the contact form with the following details:
Name: {{{name}}}
Email: {{{email}}}
Message:
{{{messageBody}}}

This message should be forwarded to Ashwini M. at korapatiashwini@gmail.com.

Please generate a brief, polite confirmation message for the user, acknowledging that their message has been received and will be reviewed by Ashwini.
Example: "Thank you for your message, {{{name}}}! Ashwini will review it and get back to you soon."
Do not include any information about forwarding to the email address in the confirmation message to the user.
`,
});

const sendContactMessageFlow = ai.defineFlow(
  {
    name: 'sendContactMessageFlow',
    inputSchema: SendContactMessageInputSchema,
    outputSchema: SendContactMessageOutputSchema,
  },
  async (input: SendContactMessageInput) => {
    const {output} = await contactPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);
