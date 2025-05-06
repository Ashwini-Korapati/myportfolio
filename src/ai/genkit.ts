import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({
    apiKey: 'AIzaSyDGZ2ln5MuyUX2cE6VTBgFr4nqz_HlZka8', // Replace with your actual API key
  })],
  model: 'googleai/gemini-2.0-flash',
});