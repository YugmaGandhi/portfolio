import { matchIntent, PetAction, PET_FALLBACKS } from '../../data/petKnowledge';
import { loadProfile, saveProfile } from './petMemory';

export interface ChatMessage {
  role: 'user' | 'pet';
  text: string;
}

export interface PetReply {
  text: string;
  action?: PetAction;
}

export interface ChatContext {
  currentSection: string | null;
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** Intents already answered this session — lets him acknowledge repeats. */
const askedIntents = new Set<string>();

const SECTION_INFO: Record<string, string> = {
  about:
    "THIS IS THE CHARACTER PROFILE! All about my human — who he is, his XP, and where he's based. *proud sniff*",
  skills:
    'THE SKILL TREE! His abilities, with arcade meters. React is the big one — LVL 95! WOOF!',
  projects:
    'MISSION SELECT! These are the things he built. My favorite is the search one. It FETCHES documents. Like me, but for files!',
  contact:
    'THE COMMS TERMINAL! Type a message here and it goes straight to my human. I will personally supervise delivery. WOOF.',
};

const NAME_PATTERNS = [/(?:my name is|call me)\s+([a-z][a-z'-]{1,15})/i, /^i'?m\s+([a-z][a-z'-]{1,15})\s*[.!]?$/i];

/** Remembered across calls so we only probe the LLM endpoint once when it's unconfigured. */
let llmAvailable: boolean | null = null;

const askLlm = async (history: ChatMessage[], message: string): Promise<string | null> => {
  if (llmAvailable === false) return null;
  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);
    const response = await fetch('/api/pet-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        messages: [
          ...history.slice(-8).map((m) => ({
            role: m.role === 'pet' ? 'assistant' : 'user',
            content: m.text,
          })),
          { role: 'user', content: message },
        ],
      }),
    });
    window.clearTimeout(timeout);

    if (response.status === 503) {
      llmAvailable = false; // endpoint exists but no API key configured
      return null;
    }
    if (!response.ok) return null;
    const data = await response.json();
    llmAvailable = true;
    return typeof data.reply === 'string' && data.reply.trim() ? data.reply.trim() : null;
  } catch {
    if (llmAvailable === null) llmAvailable = false;
    return null;
  }
};

/**
 * Hybrid brain: name learning and page-aware answers first, then scripted
 * intents (with page actions), then the LLM proxy, then an in-character
 * fallback.
 */
export const getReply = async (
  history: ChatMessage[],
  message: string,
  context: ChatContext
): Promise<PetReply> => {
  // Learn the visitor's name
  for (const pattern of NAME_PATTERNS) {
    const match = message.match(pattern);
    if (match) {
      const name = match[1][0].toUpperCase() + match[1].slice(1).toLowerCase();
      saveProfile({ name });
      return {
        text: `${name.toUpperCase()}! *sniffs hand politely* GREAT NAME. I will remember it FOREVER. Or at least until someone clears localStorage. WOOF!`,
      };
    }
  }

  // "What is this section?" — answered from what's actually on screen
  if (/\b(this|current)\s+(section|page|part|screen)\b|where am i/i.test(message)) {
    const info = context.currentSection ? SECTION_INFO[context.currentSection] : null;
    return {
      text:
        info ??
        "*looks around* We're at the top! The hero screen. Scroll down or ask me to show you something!",
    };
  }

  const intent = matchIntent(message);
  if (intent) {
    const repeat = askedIntents.has(intent.id);
    askedIntents.add(intent.id);
    const profileName = loadProfile().name;
    let text = pick(intent.replies);
    if (repeat && intent.id !== 'play-fetch' && intent.id !== 'treat' && intent.id !== 'greeting') {
      text = `ASKING AGAIN? OK OK! *happy spin* ${text}`;
    }
    if (profileName && intent.id === 'greeting') {
      text = `WOOF WOOF, ${profileName.toUpperCase()}! *tail wag* What can I sniff out for you?`;
    }
    return { text, action: intent.action };
  }

  const llmReply = await askLlm(history, message);
  if (llmReply) {
    return { text: llmReply };
  }

  return { text: pick(PET_FALLBACKS) };
};
