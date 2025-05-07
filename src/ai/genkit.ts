import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey && process.env.NODE_ENV === 'production') {
  console.warn(
    'GEMINI_API_KEY environment variable is not set. Genkit AI features may not work in production.'
  );
}


export const ai = genkit({
  plugins: [googleAI({
    apiKey: geminiApiKey || 'AIzaSyDGZ2ln5MuyUX2cE6VTBgFr4nqz_HlZka8', // Fallback for local dev if not set, but GEMINI_API_KEY should be set in prod
  })],
  model: 'googleai/gemini-2.0-flash',
});
