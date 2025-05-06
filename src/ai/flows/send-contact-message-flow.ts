
'use server';
/**
 * @fileOverview Handles sending contact messages, simulating forwarding to WhatsApp.
 *
 * - sendContactMessage - A function that processes the contact message.
 * - SendContactMessageInput - The input type for the sendContactMessage function.
 * - SendContactMessageOutput - The return type for the sendContactMessage function.
 *
 * IMPORTANT: This flow currently SIMULATES forwarding a message to WhatsApp.
 * It generates a confirmation using AI but DOES NOT actually send a WhatsApp message.
 * To send a real WhatsApp message, you would need to integrate a WhatsApp API service
 * (e.g., Twilio API for WhatsApp, Meta Business API) within this flow.
 * The user's email is still collected for record-keeping/fallback.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender (for record-keeping).'),
  messageBody: z.string().describe('The content of the message.'),
});
export type SendContactMessageInput = z.infer<typeof SendContactMessageInputSchema>;

const SendContactMessageOutputSchema = z.object({
  confirmationMessage: z.string().describe('A confirmation message to be shown to the user.'),
  status: z.enum(['success', 'error']).describe('The status of the message sending attempt.'),
});
export type SendContactMessageOutput = z.infer<typeof SendContactMessageOutputSchema>;


export async function sendContactMessage(input: SendContactMessageInput): Promise<SendContactMessageOutput> {
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
    The message should inform the user that their message has been successfully received.
    IMPORTANTLY, state that the process to forward this to the site owner via WhatsApp to the number +919513035255 is CURRENTLY A SIMULATION.
    Mention that this means a real WhatsApp message is NOT being sent at this moment, but their message is recorded.
    Inform the user that a response will be provided if needed once the site owner reviews the recorded message.
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
    const targetWhatsAppNumber = '+919513035255'; // User-specified WhatsApp number
    const targetEmail = 'aashv143@gmail.com'; // Target email for receiving messages

    // Log the received contact message details to the server console.
    // This SIMULATES forwarding the message to WhatsApp and email.
    console.log('Contact form submission received:');
    console.log('From Name:', input.name);
    console.log('From Email:', input.email);
    console.log('Message:', input.messageBody);
    console.log(`SIMULATING forwarding message to WhatsApp: ${targetWhatsAppNumber}`);
    console.log(`SIMULATING sending message to email: ${targetEmail}`);
    console.log('---');
    console.log('Reminder: This flow SIMULATES WhatsApp and Email sending. To send actual messages, integrate appropriate API services (e.g., Twilio, Meta Business API for WhatsApp; SendGrid, Mailgun for email).');
    console.log('User responses are logged to the server console. Check your server logs to see the "user response".');

    try {
      const {output} = await prompt(input);
      if (!output || !output.confirmationMessage) {
        console.warn('SendContactMessageFlow: Prompt did not return expected output, using fallback.');
        return {
            confirmationMessage: `Thank you for your message, ${input.name}. We have received it and it has been recorded. This is a simulated notification process. We'll get back to you if a response is needed.`,
            status: "success"
        };
      }
      return {
        confirmationMessage: output.confirmationMessage,
        status: output.status === 'error' ? 'error' : 'success',
      };
    } catch (error) {
      console.error('Error in sendContactMessageFlow:', error);
      return {
        confirmationMessage: 'We encountered an issue while processing your message. Please try again later.',
        status: 'error',
      };
    }
  }
);
