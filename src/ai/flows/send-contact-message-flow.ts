
'use server';
/**
 * @fileOverview Handles sending contact messages via AI.
 *
 * - sendContactMessage - A function that processes the contact message.
 * - SendContactMessageInput - The input type for the sendContactMessage function.
 * - SendContactMessageOutput - The return type for the sendContactMessage function.
 *
 * IMPORTANT: This flow currently SIMULATES sending a message.
 * It generates a confirmation using AI but DOES NOT actually send an email.
 * To send a real email, you would need to integrate an email service
 * (e.g., Nodemailer, SendGrid, Resend) within this flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender.'),
  messageBody: z.string().describe('The content of the message.'),
});
export type SendContactMessageInput = z.infer<typeof SendContactMessageInputSchema>;

const SendContactMessageOutputSchema = z.object({
  confirmationMessage: z.string().describe('A confirmation message to be shown to the user.'),
  status: z.enum(['success', 'error']).describe('The status of the message sending attempt.'),
});
export type SendContactMessageOutput = z.infer<typeof SendContactMessageOutputSchema>;


export async function sendContactMessage(input: SendContactMessageInput): Promise<SendContactMessageOutput> {
  // This flow is intended to simulate sending a message and generate a confirmation.
  // It does not actually send an email with the current Genkit setup.
  // For actual email sending, a dedicated email service/tool would be needed.
  return sendContactMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sendContactMessagePrompt',
  input: {schema: SendContactMessageInputSchema},
  output: {schema: SendContactMessageOutputSchema},
  prompt: `
    You are a helpful assistant for a personal portfolio website.
    A user named {{name}} (contact email: {{email}}) has submitted a contact form with the following message:
    "{{messageBody}}"

    Please generate a polite confirmation message acknowledging receipt of their message.
    The message should inform the user that their message has been successfully received and someone will get back to them if a response is needed.
    Ensure the tone is professional and friendly.
    Set the status output field to "success".
  `,
});

const sendContactMessageFlow = ai.defineFlow(
  {
    name: 'sendContactMessageFlow',
    inputSchema: SendContactMessageInputSchema,
    outputSchema: SendContactMessageOutputSchema,
  },
  async (input: SendContactMessageInput) => {
    // Log the received contact message details to the server console.
    // This is where you can "see" the user's response on the server side.
    // This does NOT send an email.
    console.log('New contact message received:');
    console.log('Name:', input.name);
    console.log('Email:', input.email);
    console.log('Message:', input.messageBody);
    console.log('---');
    console.log('Reminder: This flow SIMULATES email sending. To receive actual emails, integrate an email service.');


    try {
      const {output} = await prompt(input);
      if (!output || !output.confirmationMessage) {
        // Fallback in case the prompt fails to generate structured output or an empty confirmation
        console.warn('SendContactMessageFlow: Prompt did not return expected output, using fallback.');
        return {
            confirmationMessage: `Thank you for your message, ${input.name}. We have received it and will get back to you shortly if a response is needed.`,
            status: "success"
        };
      }
      // Ensure status is set, even if prompt doesn't explicitly set it (though it should based on instructions)
      return {
        confirmationMessage: output.confirmationMessage,
        status: output.status === 'error' ? 'error' : 'success',
      };
    } catch (error) {
      console.error('Error in sendContactMessageFlow:', error);
      return {
        confirmationMessage: 'We encountered an issue while processing your message. Please try again later or contact us directly at aashv143@gmail.com.',
        status: 'error',
      };
    }
  }
);

