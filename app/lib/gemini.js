import { GoogleGenerativeAI } from '@google/generative-ai';

export function getGeminiApiKey() {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    throw new Error('GEMINI_API_KEY environment variable is not set or empty.');
  }
  return key;
}

export function createGeminiClient() {
  return new GoogleGenerativeAI(getGeminiApiKey());
}

export function isTooManyRequestsError(error) {
  return error?.status === 429 || error?.response?.status === 429 || String(error?.message || '').includes('Too Many Requests');
}
