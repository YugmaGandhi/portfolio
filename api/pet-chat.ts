import { PET_SYSTEM_PROMPT } from '../src/data/petContext';

/**
 * Provider-agnostic LLM proxy for BYTE's chat (Vercel Edge Function).
 * Works with any OpenAI-compatible chat API (OpenAI, Groq, Together,
 * DeepSeek, OpenRouter, ...). Configure via Vercel env vars:
 *   PET_AI_API_KEY   - required; without it the endpoint returns 503 and
 *                      the client quietly uses scripted answers only
 *   PET_AI_BASE_URL  - default https://api.openai.com/v1
 *   PET_AI_MODEL     - default gpt-4o-mini
 */

export const config = { runtime: 'edge' };

const MAX_HISTORY = 8;
const MAX_MESSAGE_CHARS = 500;

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const sanitizeMessages = (raw: unknown): IncomingMessage[] | null => {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const messages: IncomingMessage[] = [];
  for (const item of raw.slice(-MAX_HISTORY)) {
    if (
      !item ||
      (item.role !== 'user' && item.role !== 'assistant') ||
      typeof item.content !== 'string'
    ) {
      return null;
    }
    messages.push({ role: item.role, content: item.content.slice(0, MAX_MESSAGE_CHARS) });
  }
  return messages;
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.PET_AI_API_KEY;
  if (!apiKey) {
    return Response.json({ configured: false }, { status: 503 });
  }

  let messages: IncomingMessage[] | null = null;
  try {
    const body = await req.json();
    messages = sanitizeMessages(body?.messages);
  } catch {
    /* fall through to 400 */
  }
  if (!messages) {
    return Response.json({ error: 'Invalid messages' }, { status: 400 });
  }

  const baseUrl = (process.env.PET_AI_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = process.env.PET_AI_MODEL ?? 'gpt-4o-mini';

  const upstream = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: PET_SYSTEM_PROMPT }, ...messages],
      max_tokens: 160,
      temperature: 0.8,
    }),
  });

  if (!upstream.ok) {
    return Response.json({ error: 'Upstream error' }, { status: 502 });
  }

  const data = await upstream.json();
  const reply = data?.choices?.[0]?.message?.content;
  return Response.json({ reply: typeof reply === 'string' ? reply : 'WOOF...?' });
}
