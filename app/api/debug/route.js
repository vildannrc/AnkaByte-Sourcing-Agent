import { getGeminiApiKey } from '../../lib/gemini.js';

export async function GET() {
  try {
    const key = getGeminiApiKey();
    const masked = `${key.slice(0, 4)}...${key.slice(-4)}`;
    return Response.json({
      geminiKeyLoaded: true,
      geminiKeyMasked: masked
    });
  } catch (error) {
    return Response.json({
      geminiKeyLoaded: false,
      error: error.message
    }, { status: 500 });
  }
}
