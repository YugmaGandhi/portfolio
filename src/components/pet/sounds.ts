import { loadProfile, saveProfile } from './petMemory';

/**
 * Tiny 8-bit sound effects, synthesized with WebAudio — no audio assets.
 * Off by default; toggled from the chat header (a user gesture, which also
 * satisfies browser autoplay policies).
 */

export type PetSound = 'woof' | 'nom' | 'squeak' | 'boing' | 'pop';

let ctx: AudioContext | null = null;
let enabled = loadProfile().sound;

const ensureContext = () => {
  if (!ctx) {
    ctx = new AudioContext();
  }
  if (ctx.state === 'suspended') {
    void ctx.resume();
  }
  return ctx;
};

export const isSoundOn = () => enabled;

export const setSoundOn = (on: boolean) => {
  enabled = on;
  saveProfile({ sound: on });
  if (on) ensureContext();
};

const blip = (
  audio: AudioContext,
  freq: number,
  duration: number,
  delay = 0,
  type: OscillatorType = 'square',
  volume = 0.035
) => {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const start = audio.currentTime + delay;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
};

export const playSound = (name: PetSound) => {
  if (!enabled) return;
  let audio: AudioContext;
  try {
    audio = ensureContext();
  } catch {
    return;
  }
  switch (name) {
    case 'woof':
      blip(audio, 170, 0.07);
      blip(audio, 110, 0.1, 0.07);
      break;
    case 'nom':
      blip(audio, 240, 0.05, 0, 'triangle', 0.05);
      break;
    case 'squeak':
      blip(audio, 950, 0.06);
      blip(audio, 1250, 0.05, 0.06);
      break;
    case 'boing':
      blip(audio, 180, 0.06);
      blip(audio, 330, 0.09, 0.06);
      break;
    case 'pop':
      blip(audio, 520, 0.04, 0, 'triangle', 0.05);
      break;
  }
};
