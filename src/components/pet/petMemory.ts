/** Persistent pet/visitor relationship memory (localStorage). */

const STORAGE_KEY = 'pixel-pet-v2';
const SESSION_KEY = 'pixel-pet-session';

export interface PetProfile {
  hearts: number;
  visits: number;
  name: string | null;
  sound: boolean;
  ts: number;
}

const DEFAULTS: PetProfile = { hearts: 0, visits: 0, name: null, sound: false, ts: 0 };

export const loadProfile = (): PetProfile => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return {
      hearts: Number.isFinite(raw.hearts) && raw.hearts > 0 ? Number(raw.hearts) : 0,
      visits: Number.isFinite(raw.visits) && raw.visits > 0 ? Number(raw.visits) : 0,
      name: typeof raw.name === 'string' && raw.name.length <= 24 ? raw.name : null,
      sound: raw.sound === true,
      ts: Number.isFinite(raw.ts) ? raw.ts : 0,
    };
  } catch {
    return { ...DEFAULTS };
  }
};

export const saveProfile = (patch: Partial<PetProfile>): PetProfile => {
  const next = { ...loadProfile(), ...patch, ts: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

/** Count a visit once per browser session; returns the up-to-date profile. */
export const recordVisit = (): PetProfile => {
  try {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      sessionStorage.setItem(SESSION_KEY, '1');
      return saveProfile({ visits: loadProfile().visits + 1 });
    }
  } catch {
    /* sessionStorage unavailable — treat as a repeat visit */
  }
  return loadProfile();
};
