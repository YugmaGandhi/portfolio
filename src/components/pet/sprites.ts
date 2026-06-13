import { colors } from '../../theme/tokens';

/**
 * Composable pixel sprite system for the pet — the classic 14x13 chibi BYTE.
 * Frames are composed from independent parts (eyes, ears, mouth, legs);
 * '.' = transparent; all other chars map through PET_PALETTE.
 */

export const PET_PALETTE: Record<string, string> = {
  k: colors.shadow, // outline / eyes / nose
  b: '#d9a066', // tan coat
  d: '#b8824f', // coat shading (inner ears, closed eyes)
  c: colors.cyan, // collar
  y: colors.yellow, // collar tag / ball
  p: colors.pink, // tongue
};

export const PET_COLS = 14;
export const PET_ROWS = 13;

const EMPTY = '..............';

export type Eyes = 'center' | 'left' | 'right' | 'closed' | 'wide';
export type Ears = 'normal' | 'droop';
export type Mouth = 'normal' | 'tongue' | 'open' | 'ball';
export type Legs = 'sit' | 'walkA' | 'walkB';
export type Pose = 'sit' | 'lying' | 'side';
export type Facing = 'left' | 'right';

export interface FrameSpec {
  pose?: Pose;
  eyes?: Eyes;
  ears?: Ears;
  mouth?: Mouth;
  legs?: Legs;
  /** Accepted for API compatibility — the chibi is symmetric, so unused. */
  facing?: Facing;
  /** Lying-pose breathing: body slightly contracted on the in-breath. */
  inhale?: boolean;
}

const EYE_ROWS: Record<Eyes, string> = {
  center: '.kbbkbbbbkbbk.',
  left: '.kbkbbbbkbbbk.',
  right: '.kbbbkbbbbkbk.',
  closed: '.kbbdbbbbdbbk.',
  wide: '.kbkkbbbbkkbk.',
};

// [muzzle, mouth, chin]
const MOUTH_ROWS: Record<Mouth, [string, string, string]> = {
  normal: ['.kbbbbkkbbbbk.', '.kbbbbbbbbbbk.', '..kbbbbbbbbk..'],
  tongue: ['.kbbbbkkbbbbk.', '.kbbbbppbbbbk.', '..kbbbppbbbk..'],
  open: ['.kbbbbkkbbbbk.', '.kbbbkkkkbbbk.', '..kbbbbbbbbk..'],
  ball: ['.kbbbbkkbbbbk.', '.kbbbyyyybbbk.', '..kbbyyyybbk..'],
};

const EAR_ROWS: Record<Ears, [string, string]> = {
  normal: ['.kk........kk.', '.kdk......kdk.'],
  droop: [EMPTY, '.kk........kk.'],
};

const LEG_ROWS: Record<Legs, [string, string]> = {
  sit: ['.kbbkbbbbkbbk.', '.kkkkkkkkkkkk.'],
  walkA: ['.kbbkbbbbkbbk.', '.kkk...kkkkkk.'],
  walkB: ['.kbbkbbbbkbbk.', '.kkkkkk...kkk.'],
};

/** Striped canopy + strings, rendered above the dog during high drops. */
export const PARACHUTE_GRID = [
  '...kkkkkkkk...',
  '..kyyccyycck..',
  '.kyyccyyccyyk.',
  '.kkkkkkkkkkkk.',
  '..k...kk...k..',
  '...k..kk..k...',
  '....k.kk.k....',
];
export const PARACHUTE_ROWS = PARACHUTE_GRID.length;

const composeFrame = (spec: FrameSpec): string[] => {
  const {
    pose = 'sit',
    eyes = 'center',
    ears = 'normal',
    mouth = 'normal',
    legs = 'sit',
    inhale = false,
  } = spec;

  // The classic BYTE has no profile view — he waddles front-facing.
  if (pose === 'side') {
    return composeFrame({
      ...spec,
      pose: 'sit',
      legs: legs === 'sit' ? 'walkA' : legs,
    });
  }

  const head = [
    ...EAR_ROWS[ears],
    '.kbbkkkkkkbbk.',
    '.kbbbbbbbbbbk.',
    EYE_ROWS[eyes],
    ...MOUTH_ROWS[mouth],
  ]; // 8 rows

  if (pose === 'lying') {
    return [
      EMPTY,
      EMPTY,
      EMPTY,
      ...head,
      inhale ? '.kbbbbbbbbbbk.' : 'kbbbbbbbbbbbbk',
      'kkkkkkkkkkkkkk',
    ];
  }

  return [
    ...head,
    '..kcccyyccck..', // collar
    '.kbbbbbbbbbbk.',
    '.kbbbbbbbbbbk.',
    ...LEG_ROWS[legs],
  ];
};

const frameCache = new Map<string, string[]>();

export const getFrame = (spec: FrameSpec = {}): string[] => {
  const key = JSON.stringify(spec);
  let frame = frameCache.get(key);
  if (!frame) {
    frame = composeFrame(spec);
    if (import.meta.env.DEV) {
      frame.forEach((row, i) => {
        if (row.length !== PET_COLS) {
          console.warn(`[pet sprite] row ${i} is ${row.length} cols (want ${PET_COLS})`, spec);
        }
      });
    }
    frameCache.set(key, frame);
  }
  return frame;
};
