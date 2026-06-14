# Yugma Gandhi — Portfolio Website

A retro **arcade / pixel game-console** themed portfolio, built with React, TypeScript, Vite,
and Material UI. Its standout feature is **BYTE.EXE**, an interactive pixel-art dog who lives on
the page — he greets you, plays fetch, eats treats, remembers your name, and chats to guide you
through the site.

🔗 **Live:** https://yugma-gandhi.vercel.app/

## Features

- 8-bit retro arcade aesthetic — neon-on-dark palette, "Press Start 2P" pixel font, hard pixel
  shadows, faux boot-log terminals, and arcade stat meters
- Gamified sections: **Character Profile** (About), **Skill Tree** (Skills),
  **Mission Select** (Projects), **Comms Terminal** (Contact)
- **BYTE.EXE**, an autonomous pixel dog: roams, sleeps, plays fetch (drag-and-throw physics),
  eats treats, can be petted and dragged, parachutes when dropped, and remembers visitors via
  `localStorage`
- Hybrid pet chat: scripted keyword intents + page actions, with an optional LLM fallback via a
  provider-agnostic serverless proxy (the site works fully without any AI backend)
- Live-synthesized 8-bit sound effects (WebAudio — no audio assets)
- Fully responsive; respects `prefers-reduced-motion`

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** (build/dev)
- **Material UI 6** + **Emotion**
- **Framer Motion 12** (animations)
- **gh-pages** (deployment)
- Optional **Vercel Edge Function** (`/api/pet-chat`) for the pet's LLM fallback

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/YugmaGandhi/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server                |
| `npm run build`   | Type-check and build for production       |
| `npm run preview` | Preview the production build locally      |
| `npm run lint`    | Run ESLint                               |
| `npm run deploy`  | Publish `dist/` to GitHub Pages          |

## Project Structure

```
src/
├─ components/
│  ├─ pet/            # BYTE.EXE — sprite system, chat UI, chat engine, memory, sounds
│  └─ common/         # Shared layout pieces (e.g. SectionFrame)
├─ data/              # Site content & pet knowledge (site.ts, projects.ts, skills.ts, pet*)
├─ theme/             # Design tokens & theme config
└─ utils/             # Helpers
api/
└─ pet-chat.ts        # Optional serverless LLM proxy (Vercel Edge)
```

## Customization

- **Content** lives in `src/data/` — edit `site.ts`, `projects.ts`, and `skills.ts`; components
  only render this data.
- **Theme** (colors, fonts, shadows) is centralized in `src/theme/tokens.ts`.
- **The pet's personality and facts** live in `src/data/petContext.ts` and
  `src/data/petKnowledge.ts`.

### Enabling the pet's LLM chat (optional)

Deploy `api/pet-chat.ts` (e.g. on Vercel) and set these env vars. Without a key the endpoint
returns 503 and the pet falls back to scripted answers.

| Variable          | Required | Default                      |
| ----------------- | -------- | ---------------------------- |
| `PET_AI_API_KEY`  | yes      | —                            |
| `PET_AI_BASE_URL` | no       | `https://api.openai.com/v1`  |
| `PET_AI_MODEL`    | no       | `gpt-4o-mini`                |

Works with any OpenAI-compatible chat API (OpenAI, Groq, Together, DeepSeek, OpenRouter, …).

## Credits

- UI framework: Material UI
- Animation: Framer Motion
- Pixel art, pet behavior, and sound: custom-built

## License

MIT

---

Made with love by Yugma Gandhi
