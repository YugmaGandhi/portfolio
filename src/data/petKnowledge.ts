import { site } from './site';

/**
 * BYTE's scripted brain: intents matched by keywords, each with
 * in-character reply variants and an optional page action.
 * Unmatched messages fall through to the LLM proxy (api/pet-chat.ts).
 */

export type PetAction =
  | { type: 'scroll'; target: 'about' | 'skills' | 'projects' | 'contact' }
  | { type: 'fetch' }
  | { type: 'treat' }
  | { type: 'link'; href: string };

export interface PetIntent {
  id: string;
  /** Lowercase keywords/phrases; a message matches by hitting the most keywords. */
  patterns: string[];
  replies: string[];
  action?: PetAction;
}

export interface QuickChip {
  label: string;
  message: string;
}

export const QUICK_CHIPS: QuickChip[] = [
  { label: 'WHO IS YUGMA?', message: 'Who is Yugma?' },
  { label: 'PROJECTS', message: 'Show me the projects' },
  { label: 'SKILLS', message: 'What are his skills?' },
  { label: 'CONTACT', message: 'How can I contact him?' },
  { label: 'PLAY FETCH', message: 'Let’s play fetch!' },
  { label: 'TREAT', message: 'Want a treat?' },
];

export const PET_GREETING =
  'WOOF! I’M BYTE, THE SITE DOG. 🐾 Ask me anything about Yugma — or pick a button below. I can also FETCH and eat TREATS!';

export const PET_FALLBACKS = [
  '*tilts head* WOOF? I dunno that one... I’m just a dog. Try asking about projects, skills, or contact!',
  'Hmm, that’s beyond my pixel brain. *scratches ear* Ask me about Yugma’s work or how to reach him!',
];

export const PET_INTENTS: PetIntent[] = [
  {
    id: 'greeting',
    patterns: ['hello', 'hi', 'hey', 'yo', 'good morning', 'good evening', 'woof'],
    replies: ['WOOF WOOF! Hi there! *wags tail* What can I sniff out for you?', 'HI HUMAN! *excited tail wag* Ask me anything about this site!'],
  },
  {
    
    id: 'about-owner',
    patterns: ['who', 'yugma', 'about', 'owner', 'developer', 'him', 'human', 'experience', 'background'],
    replies: [
      `That’s MY human! ${site.name} — a Full Stack Developer from ${site.location}, building web apps since 2022. React, Node, Azure... he’s a good boy too. FOLLOW ME!`,
    ],
    action: { type: 'scroll', target: 'about' },
  },
  {
    id: 'projects',
    patterns: ['project', 'projects', 'work', 'portfolio', 'missions', 'mission', 'built', 'apps', 'show'],
    replies: [
      'OOH! THE MISSIONS! *runs in a circle* He built a semantic document search, a money manager, a cloud media tool, and this very site. FOLLOW ME! 🦴',
    ],
    action: { type: 'scroll', target: 'projects' },
  },
  {
    id: 'skills',
    patterns: ['skill', 'skills', 'stack', 'tech', 'technologies', 'react', 'azure', 'node', 'typescript', 'know'],
    replies: [
      'He’s LVL 95 at React! WOOF! Also TypeScript, Node.js, Azure DevOps, AI Search, Cosmos DB... and he has TWO Azure certifications. *proud tail wag* THIS WAY!',
    ],
    action: { type: 'scroll', target: 'skills' },
  },
  {
    id: 'contact',
    patterns: ['contact', 'email', 'mail', 'phone', 'reach', 'hire', 'hiring', 'job', 'message', 'talk', 'recruit'],
    replies: [
      `WANT ME TO FETCH THE EMAIL? It’s ${site.email} — or use the comms terminal, I’ll take you there! *grabs your sleeve gently*`,
    ],
    action: { type: 'scroll', target: 'contact' },
  },
  {
    id: 'github',
    patterns: ['github', 'code', 'source', 'repo', 'repository'],
    replies: ['His code lives at GitHub! *digs up a link* Opening it for you. WOOF!'],
    action: { type: 'link', href: site.social.github },
  },
  {
    id: 'linkedin',
    patterns: ['linkedin', 'connect', 'network'],
    replies: ['LinkedIn! The human social network. *opens it with my nose*'],
    action: { type: 'link', href: site.social.linkedin },
  },
  {
    id: 'play-fetch',
    patterns: ['play', 'fetch', 'ball', 'game', 'throw'],
    replies: ['BALL?! BALL BALL BALL!! *vibrates with excitement* THROW IT!!'],
    action: { type: 'fetch' },
  },
  {
    id: 'treat',
    patterns: ['treat', 'food', 'cookie', 'feed', 'hungry', 'snack', 'eat', 'bone'],
    replies: ['T-T-TREAT?? *sits perfectly* I AM THE GOODEST BOY. NOM INCOMING!'],
    action: { type: 'treat' },
  },
  {
    id: 'good-boy',
    patterns: ['good boy', 'good dog', 'cute', 'pet', 'love you', 'adorable', 'goodboy'],
    replies: ['*MAXIMUM TAIL WAG* WOOF WOOF! You can also pet me by hovering over my head!'],
  },
  {
    id: 'who-are-you',
    patterns: ['who are you', 'what are you', 'your name', 'byte', 'dog', 'bot', 'ai', 'chatbot'],
    replies: [
      'I’m BYTE.EXE! A pixel dog, NOT a boring chat widget. *offended sniff* I live in this corner and help visitors find things. WOOF!',
    ],
  },
  {
    id: 'help',
    patterns: ['help', 'lost', 'stuck', 'confused', 'navigate', 'where', 'find', 'guide'],
    replies: [
      'I GOT YOU! *alert ears* Ask me about: WHO Yugma is, his PROJECTS, his SKILLS, or how to CONTACT him. Or use the buttons below!',
    ],
  },
  {
    id: 'thanks',
    patterns: ['thanks', 'thank you', 'thx', 'appreciated', 'awesome', 'great'],
    replies: ['*happy spin* WOOF! Anytime! That’s what site dogs are for!'],
  },
  {
    id: 'bye',
    patterns: ['bye', 'goodbye', 'see you', 'later', 'cya', 'good night'],
    replies: ['BYE HUMAN! *sad ears, then immediately distracted by a pixel* Come back soon! WOOF!'],
  },
];

/** Score a message against an intent: number of pattern hits. */
const scoreIntent = (message: string, intent: PetIntent): number =>
  intent.patterns.reduce((score, pattern) => (message.includes(pattern) ? score + 1 : score), 0);

export const matchIntent = (rawMessage: string): PetIntent | null => {
  const message = rawMessage.toLowerCase().trim();
  let best: PetIntent | null = null;
  let bestScore = 0;
  for (const intent of PET_INTENTS) {
    const score = scoreIntent(message, intent);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return best;
};
