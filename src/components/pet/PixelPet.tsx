import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getFrame,
  FrameSpec,
  Facing,
  PET_PALETTE,
  PET_COLS,
  PET_ROWS,
  PARACHUTE_GRID,
  PARACHUTE_ROWS,
} from './sprites';
import PetChat from './PetChat';
import { PetAction } from '../../data/petKnowledge';
import { scrollToSection } from '../../data/site';
import { saveProfile, recordVisit } from './petMemory';
import { playSound } from './sounds';

const PET_NAME = 'BYTE.EXE';
const SCALE = 5; // 14x13 grid at 5px/pixel = 70x65 on screen
const PET_WIDTH = PET_COLS * SCALE;
const PET_HEIGHT = PET_ROWS * SCALE;
const EDGE_PADDING = 16;
const GROUND_BOTTOM = 10;

const TICK_MS = 320;
const HAPPY_MS = 2_000;
const GREET_MS = 2_200;
const EAT_MS = 1_700;
const SNIFF_MS = 750;
const LICK_MS = 850;
const SHAKE_TOY_MS = 550;
const SHAKE_OFF_MS = 600;
const CIRCLE_MS = 1_400;
const STRETCH_MS = 1_200;
const STARTLE_MS = 1_800;
const SPIN_MS = 950;
const HOWL_MS = 1_600;
const CROUCH_MS = 380;
const BUBBLE_MS = 1_600;

const PET_HOVER_DELAY_MS = 450;
const PAMPER_HEART_EVERY_TICKS = 4;
const TOUCH_HOLD_MS = 450;
const STARTLE_COOLDOWN_MS = 10_000;
const POUNCE_COOLDOWN_MS = 7_000;
const SECTION_BARK_COOLDOWN_MS = 8_000;

const WALK_SPEED = 40;
const RUN_SPEED = 175;
const GRAVITY = 900;
const POUNCE_VY = -320;
const PARACHUTE_MIN_DROP_PX = 200;
const PARACHUTE_FALL_SPEED = 95;
const PARACHUTE_DRIFT = 26;
const FAST_SCROLL_PX_PER_S = 3_200;
const SHAKE_ACCEL_THRESHOLD = 20;

const BLINK_CHANCE = 0.12;
const BARK_CHANCE = 0.01;
const TAIL_CHASE_CHANCE = 0.002;
const HOWL_CHANCE = 0.0008;
const NIGHT_YAWN_CHANCE = 0.02;
const DRAG_THRESHOLD_PX = 8;

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
];

type Activity =
  | { kind: 'idle' }
  | { kind: 'happy'; until: number }
  | { kind: 'greet'; until: number }
  | { kind: 'pampered' }
  | { kind: 'anticipate' }
  | { kind: 'walk'; targetX: number; thenBark?: boolean }
  | { kind: 'lead'; until: number }
  | { kind: 'fetchRun'; targetX: number }
  | { kind: 'shakeToy'; until: number; returnX: number }
  | { kind: 'carry'; targetX: number }
  | { kind: 'eatRun'; targetX: number }
  | { kind: 'sniff'; until: number }
  | { kind: 'eat'; until: number }
  | { kind: 'lick'; until: number }
  | { kind: 'circle'; until: number }
  | { kind: 'sleep' }
  | { kind: 'stretch'; until: number }
  | { kind: 'held' }
  | { kind: 'falling' }
  | { kind: 'shakeOff'; until: number }
  | { kind: 'parachute' }
  | { kind: 'crouch'; until: number; vx: number }
  | { kind: 'pounce'; vx: number }
  | { kind: 'startled'; until: number }
  | { kind: 'spin'; until: number }
  | { kind: 'howl'; until: number };

interface Heart {
  id: number;
  offset: number;
}

interface Particle {
  id: number;
  x: number;
}

interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  resting: boolean;
  /** Already retrieved (e.g. the ball he just dropped at his feet) — not worth chasing again. */
  claimed?: boolean;
}

const SECTION_BARKS: Record<string, string> = {
  about: "THAT'S MY HUMAN!",
  skills: 'HE IS LVL 95 AT REACT!',
  projects: 'OOH! THE MISSIONS!',
  contact: 'NEED HELP? CLICK ME!',
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const clampPetX = (x: number) => clamp(x, EDGE_PADDING, window.innerWidth - PET_WIDTH - EDGE_PADDING);

const PixelPet = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chuteCanvasRef = useRef<HTMLCanvasElement>(null);
  const petRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLSpanElement>(null);
  const treatRef = useRef<HTMLSpanElement>(null);

  const profile = useRef(recordVisit()).current;
  const isShy = profile.visits <= 1;
  const hour = useRef(new Date().getHours()).current;
  const isNight = hour >= 21 || hour < 6;
  const isMorning = hour >= 6 && hour < 10;
  const sleepAfterMs = isNight ? 22_000 : 45_000;
  const checkOnUserAfterMs = isShy ? 40_000 : 20_000;
  const wanderChance = isShy ? 0.006 : isMorning ? 0.03 : 0.015;

  const lastActivityRef = useRef(Date.now());
  const cursorRef = useRef({ x: 0, y: 0 });
  const posXRef = useRef(clampPetX(window.innerWidth - PET_WIDTH - 18));
  const liftYRef = useRef(0);
  const fallVyRef = useRef(0);
  const homeXRef = useRef(posXRef.current);
  const facingRef = useRef<Facing>('left');
  const activityRef = useRef<Activity>({ kind: 'idle' });
  const ballPhysRef = useRef<Projectile | null>(null);
  const treatPhysRef = useRef<Projectile | null>(null);
  const stepToggleRef = useRef(false);
  const heartIdRef = useRef(0);
  const heartCountRef = useRef(profile.hearts);
  const chatOpenRef = useRef(false);
  const currentSectionRef = useRef<string | null>(null);

  const hoverSinceRef = useRef<number | null>(null);
  const pamperTicksRef = useRef(0);
  const lastStartleRef = useRef(0);
  const lastPounceRef = useRef(0);
  const lastSectionBarkRef = useRef(0);
  const checkedOnUserRef = useRef(false);
  const barkedSectionsRef = useRef(new Set<string>());
  const recentClicksRef = useRef<{ t: number; x: number; y: number }[]>([]);
  const scrollSamplesRef = useRef<{ t: number; y: number }[]>([]);
  const wiggleRef = useRef<{ t: number; dx: number }[]>([]);
  const lastCursorXRef = useRef(0);
  const dragRef = useRef<{ startX: number; startY: number; dragging: boolean } | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const holdPettingRef = useRef(false);
  const konamiRef = useRef(0);

  const [, setVersion] = useState(0);
  const [spec, setSpec] = useState<FrameSpec>({});
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [crumbs, setCrumbs] = useState<Particle[]>([]);
  const [heartCount, setHeartCount] = useState(profile.hearts);
  const [ballVisible, setBallVisible] = useState(false);
  const [treatVisible, setTreatVisible] = useState(false);
  const [doingTrick, setDoingTrick] = useState(false);
  const [struggling, setStruggling] = useState(false);
  const [landing, setLanding] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTyping, setChatTyping] = useState(false);
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const setActivity = useCallback((a: Activity) => {
    activityRef.current = a;
    setVersion((v) => v + 1);
  }, []);

  const say = useCallback((text: string, ms = BUBBLE_MS) => {
    setBubbleText(text);
    window.setTimeout(() => setBubbleText((current) => (current === text ? null : current)), ms);
  }, []);

  const spawnHeart = useCallback(() => {
    const id = heartIdRef.current++;
    setHearts((prev) => [...prev, { id, offset: Math.floor(Math.random() * 30) - 15 }]);
    window.setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), 1100);
    setHeartCount((count) => {
      const next = count + 1;
      heartCountRef.current = next;
      saveProfile({ hearts: next });
      if (next % 10 === 0 && !reducedMotion) {
        setDoingTrick(true);
        window.setTimeout(() => setDoingTrick(false), 700);
      }
      return next;
    });
  }, [reducedMotion]);

  const celebrate = useCallback(
    (text?: string) => {
      setActivity({ kind: 'happy', until: Date.now() + HAPPY_MS });
      setSpec({ mouth: 'tongue' });
      if (text) say(text);
      spawnHeart();
    },
    [say, setActivity, spawnHeart]
  );

  const sideStep = useCallback(
    (extra: Partial<FrameSpec> = {}): FrameSpec => ({
      pose: 'side',
      legs: stepToggleRef.current ? 'walkA' : 'walkB',
      facing: facingRef.current,
      ...extra,
    }),
    []
  );

  // ---------------------------------------------------------------- rendering

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, PET_COLS * SCALE, PET_ROWS * SCALE);
    getFrame(spec).forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const color = PET_PALETTE[row[x]];
        if (!color) continue;
        ctx.fillStyle = color;
        ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
    });
  }, [spec]);

  useEffect(() => {
    if (activityRef.current.kind !== 'parachute') return;
    const ctx = chuteCanvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, PET_COLS * SCALE, PARACHUTE_ROWS * SCALE);
    PARACHUTE_GRID.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const color = PET_PALETTE[row[x]];
        if (!color) continue;
        ctx.fillStyle = color;
        ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
    });
  });

  const applyTransform = useCallback(() => {
    if (petRef.current) {
      petRef.current.style.transform = `translate(${posXRef.current}px, ${liftYRef.current}px)`;
    }
  }, []);

  // ------------------------------------------------------------- page sensors

  useEffect(() => {
    const markActivity = () => {
      lastActivityRef.current = Date.now();
      checkedOnUserRef.current = false;
    };

    const tryPounce = (cursorX: number, cursorY: number) => {
      // "Laser pointer": rapid horizontal wiggling near the floor, close to him
      if (cursorY < window.innerHeight - 170) return;
      const now = performance.now();
      const dx = cursorX - lastCursorXRef.current;
      lastCursorXRef.current = cursorX;
      if (Math.abs(dx) < 3) return;
      const wiggles = wiggleRef.current.filter((w) => now - w.t < 900);
      wiggles.push({ t: now, dx });
      wiggleRef.current = wiggles;
      let reversals = 0;
      for (let i = 1; i < wiggles.length; i++) {
        if (Math.sign(wiggles[i].dx) !== Math.sign(wiggles[i - 1].dx)) reversals++;
      }
      const petCenter = posXRef.current + PET_WIDTH / 2;
      const kind = activityRef.current.kind;
      if (
        reversals >= 3 &&
        Math.abs(cursorX - petCenter) < 280 &&
        liftYRef.current === 0 &&
        (kind === 'idle' || kind === 'pampered') &&
        Date.now() - lastPounceRef.current > POUNCE_COOLDOWN_MS
      ) {
        lastPounceRef.current = Date.now();
        wiggleRef.current = [];
        const flightVx = clamp((cursorX - petCenter) / 0.55, -320, 320);
        facingRef.current = flightVx >= 0 ? 'right' : 'left';
        setActivity({ kind: 'crouch', until: Date.now() + CROUCH_MS, vx: flightVx });
        setSpec({ pose: 'lying', eyes: 'wide' });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      markActivity();
      if (!reducedMotion) tryPounce(e.clientX, e.clientY);
    };

    const onScroll = () => {
      markActivity();
      const now = performance.now();
      const samples = scrollSamplesRef.current;
      samples.push({ t: now, y: window.scrollY });
      while (samples.length > 2 && now - samples[0].t > 160) samples.shift();
      if (samples.length >= 2) {
        const dt = (now - samples[0].t) / 1000;
        const speed = Math.abs(window.scrollY - samples[0].y) / Math.max(dt, 0.016);
        const kind = activityRef.current.kind;
        if (
          speed > FAST_SCROLL_PX_PER_S &&
          Date.now() - lastStartleRef.current > STARTLE_COOLDOWN_MS &&
          kind !== 'held' && kind !== 'falling' && kind !== 'parachute' &&
          !reducedMotion
        ) {
          lastStartleRef.current = Date.now();
          setActivity({ kind: 'startled', until: Date.now() + STARTLE_MS });
          setSpec({ pose: 'lying', eyes: 'wide' });
          say('WOAH!!');
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      markActivity();
      if ((e.target as HTMLElement).closest?.('.pixel-pet, .pet-chat')) return;
      const now = Date.now();
      const clicks = recentClicksRef.current.filter(
        (c) => now - c.t < 800 && Math.hypot(c.x - e.clientX, c.y - e.clientY) < 70
      );
      clicks.push({ t: now, x: e.clientX, y: e.clientY });
      recentClicksRef.current = clicks;
      if (clicks.length >= 3 && !chatOpenRef.current) {
        recentClicksRef.current = [];
        setIndicator('?');
        say('STUCK? CLICK ME FOR HELP!', 2400);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      markActivity();
      // Konami code easter egg
      const expected = KONAMI[konamiRef.current];
      konamiRef.current = e.key === expected ? konamiRef.current + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (konamiRef.current === KONAMI.length) {
        konamiRef.current = 0;
        if (!reducedMotion) {
          setDoingTrick(true);
          window.setTimeout(() => setDoingTrick(false), 700);
          say("CHEAT CODE? I'M ALREADY A GOOD BOY!", 2600);
          for (let i = 0; i < 6; i++) window.setTimeout(spawnHeart, i * 160);
        }
      }
    };

    // Device shake (mobile) — makes him dizzy
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const magnitude = Math.abs(a.x ?? 0) + Math.abs(a.y ?? 0) - 9.8;
      const kind = activityRef.current.kind;
      if (
        magnitude > SHAKE_ACCEL_THRESHOLD &&
        Date.now() - lastStartleRef.current > STARTLE_COOLDOWN_MS &&
        kind !== 'held' && kind !== 'falling' && kind !== 'parachute' &&
        !reducedMotion
      ) {
        lastStartleRef.current = Date.now();
        setActivity({ kind: 'startled', until: Date.now() + STARTLE_MS });
        setSpec({ pose: 'lying', eyes: 'wide' });
        say('D-DIZZY...');
      }
    };

    // Glancing up at content the visitor inspects
    const onMouseOver = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest?.('.mission-card, .skill-tree-card');
      if (card) {
        const rect = (card as HTMLElement).getBoundingClientRect();
        cursorRef.current = { x: rect.left + rect.width / 2, y: rect.top };
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', markActivity, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('devicemotion', onMotion);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', markActivity);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('devicemotion', onMotion);
    };
  }, [reducedMotion, say, setActivity, spawnHeart]);

  // Section awareness — track current section + one remark per section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        const id = visible?.target.id;
        if (!id) return;
        currentSectionRef.current = id;
        if (
          reducedMotion ||
          !SECTION_BARKS[id] ||
          barkedSectionsRef.current.has(id) ||
          chatOpenRef.current ||
          Date.now() - lastSectionBarkRef.current < SECTION_BARK_COOLDOWN_MS ||
          activityRef.current.kind !== 'idle'
        ) {
          return;
        }
        barkedSectionsRef.current.add(id);
        lastSectionBarkRef.current = Date.now();
        say(SECTION_BARKS[id], 2200);
      },
      { threshold: 0.4 }
    );
    Object.keys(SECTION_BARKS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [reducedMotion, say]);

  useEffect(() => {
    const onResize = () => {
      posXRef.current = clampPetX(posXRef.current);
      applyTransform();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [applyTransform]);

  // Greet on arrival / tab return — shy on a first visit, by name for regulars
  useEffect(() => {
    if (reducedMotion) return;
    const arrivalText = isShy
      ? 'woof? *peeks*'
      : profile.name
        ? `${profile.name.toUpperCase()}! YOU'RE BACK!`
        : isMorning
          ? 'MORNING! WOOF!'
          : 'HI! WOOF!';
    const greet = (text: string) => {
      setActivity({ kind: 'greet', until: Date.now() + GREET_MS });
      say(text);
      playSound('woof');
    };
    greet(arrivalText);
    const onVisibility = () => {
      if (!document.hidden) greet(profile.name ? `HI AGAIN, ${profile.name.toUpperCase()}!` : 'HI AGAIN!');
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [isMorning, isShy, profile.name, reducedMotion, say, setActivity]);

  // ------------------------------------------------------------ movement loop

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let last = performance.now();

    const simulate = (proj: Projectile, dt: number) => {
      if (proj.resting) return;
      proj.x += proj.vx * dt;
      proj.y += proj.vy * dt;
      proj.vy -= GRAVITY * dt;
      proj.x = clamp(proj.x, EDGE_PADDING, window.innerWidth - EDGE_PADDING - 14);
      if (proj.y <= 0 && proj.vy < 0) {
        proj.y = 0;
        proj.vy = -proj.vy * 0.5;
        proj.vx *= 0.72;
        playSound('boing');
        if (proj.vy < 70) {
          proj.vy = 0;
          proj.vx = 0;
          proj.resting = true;
        }
      }
    };

    const isAirborneKind = (k: Activity['kind']) =>
      k === 'held' || k === 'falling' || k === 'parachute' || k === 'pounce';

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      let activity = activityRef.current;

      // Safety net: never leave him hanging mid-air in a grounded state
      if (liftYRef.current < 0 && !isAirborneKind(activity.kind) && activity.kind !== 'crouch') {
        fallVyRef.current = 0;
        const rescue: Activity =
          -liftYRef.current > PARACHUTE_MIN_DROP_PX ? { kind: 'parachute' } : { kind: 'falling' };
        setActivity(rescue);
        activity = rescue;
      }

      const ball = ballPhysRef.current;
      if (ball && ballRef.current) {
        const wasResting = ball.resting;
        simulate(ball, dt);
        ballRef.current.style.transform = `translate(${ball.x}px, ${-ball.y}px)`;
        if (ball.resting && !wasResting && !isAirborneKind(activity.kind)) {
          facingRef.current = ball.x > posXRef.current + PET_WIDTH / 2 ? 'right' : 'left';
          setActivity({ kind: 'fetchRun', targetX: clampPetX(ball.x - PET_WIDTH / 2 + 7) });
        }
      }

      const treat = treatPhysRef.current;
      if (treat && treatRef.current) {
        const wasResting = treat.resting;
        simulate(treat, dt);
        treatRef.current.style.transform = `translate(${treat.x}px, ${-treat.y}px)`;
        if (treat.resting && !wasResting && !isAirborneKind(activity.kind)) {
          facingRef.current = treat.x > posXRef.current + PET_WIDTH / 2 ? 'right' : 'left';
          setActivity({ kind: 'eatRun', targetX: clampPetX(treat.x - PET_WIDTH / 2 + 7) });
        }
      }

      if (activity.kind === 'falling') {
        fallVyRef.current += GRAVITY * dt;
        liftYRef.current += fallVyRef.current * dt;
        if (liftYRef.current >= 0) {
          liftYRef.current = 0;
          fallVyRef.current = 0;
          setLanding(true);
          window.setTimeout(() => setLanding(false), 450);
          setActivity({ kind: 'shakeOff', until: Date.now() + SHAKE_OFF_MS });
          setSpec({ eyes: 'closed' });
        }
        applyTransform();
      }

      if (activity.kind === 'pounce') {
        fallVyRef.current += GRAVITY * dt;
        liftYRef.current += fallVyRef.current * dt;
        posXRef.current = clampPetX(posXRef.current + activity.vx * dt);
        if (liftYRef.current >= 0) {
          liftYRef.current = 0;
          fallVyRef.current = 0;
          setLanding(true);
          window.setTimeout(() => setLanding(false), 450);
          playSound('pop');
          celebrate('GOTCHA!');
        }
        applyTransform();
      }

      if (activity.kind === 'parachute') {
        liftYRef.current += PARACHUTE_FALL_SPEED * dt;
        posXRef.current = clampPetX(posXRef.current + Math.sin(now / 320) * PARACHUTE_DRIFT * dt);
        if (liftYRef.current >= 0) {
          liftYRef.current = 0;
          homeXRef.current = posXRef.current;
          say('PHEW!');
          setActivity({ kind: 'happy', until: Date.now() + 1200 });
          setSpec({ mouth: 'tongue' });
        }
        applyTransform();
      }

      if (
        activity.kind === 'walk' ||
        activity.kind === 'fetchRun' ||
        activity.kind === 'carry' ||
        activity.kind === 'eatRun'
      ) {
        const delta = activity.targetX - posXRef.current;
        // lazy stroll for short hops, a trot when there's real ground to cover
        let speed =
          activity.kind !== 'walk' ? RUN_SPEED : Math.abs(delta) > 250 ? RUN_SPEED * 0.7 : WALK_SPEED;
        // Cautious final approach to food: slow down and sniff the air
        if (activity.kind === 'eatRun' && Math.abs(delta) < 50) speed *= 0.45;
        if (Math.abs(delta) > 1) facingRef.current = delta > 0 ? 'right' : 'left';
        const move = Math.sign(delta) * speed * dt;

        if (Math.abs(delta) <= Math.abs(move)) {
          posXRef.current = activity.targetX;
          if (activity.kind === 'fetchRun') {
            ballPhysRef.current = null;
            setBallVisible(false);
            playSound('squeak');
            // shake the prize, then bring it to wherever the visitor's cursor is
            const returnX = clampPetX(cursorRef.current.x - PET_WIDTH / 2);
            setActivity({ kind: 'shakeToy', until: Date.now() + SHAKE_TOY_MS, returnX });
            setSpec({ mouth: 'ball', eyes: 'closed' });
          } else if (activity.kind === 'carry') {
            const dropX = clamp(
              posXRef.current + (facingRef.current === 'right' ? PET_WIDTH + 2 : -16),
              EDGE_PADDING,
              window.innerWidth - EDGE_PADDING - 14
            );
            ballPhysRef.current = { x: dropX, y: 0, vx: 0, vy: 0, resting: true, claimed: true };
            setBallVisible(true);
            if (ballRef.current) {
              ballRef.current.style.transform = `translate(${dropX}px, 0px)`;
            }
            window.setTimeout(() => {
              ballPhysRef.current = null;
              setBallVisible(false);
            }, 1400);
            homeXRef.current = posXRef.current;
            celebrate('AGAIN?');
          } else if (activity.kind === 'eatRun') {
            setActivity({ kind: 'sniff', until: Date.now() + SNIFF_MS });
            setSpec({ eyes: 'closed', ears: 'normal' });
            say('*SNIFF SNIFF*', SNIFF_MS);
          } else {
            if (activity.kind === 'walk' && activity.thenBark) {
              setIndicator('?');
              say('WOOF! NEED HELP? CLICK ME!', 2600);
              playSound('woof');
            }
            setActivity({ kind: 'idle' });
          }
        } else {
          posXRef.current += move;
        }
        applyTransform();
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [applyTransform, celebrate, reducedMotion, say, setActivity]);

  // ------------------------------------------------------------ behavior loop

  useEffect(() => {
    if (reducedMotion) return;
    const tick = window.setInterval(() => {
      const now = Date.now();
      const activity = activityRef.current;
      stepToggleRef.current = !stepToggleRef.current;
      const stepLegs = stepToggleRef.current ? 'walkA' : 'walkB';

      switch (activity.kind) {
        case 'held':
          setSpec({ eyes: 'wide', legs: stepLegs });
          return;
        case 'falling':
        case 'pounce':
          setSpec({ eyes: 'wide', legs: 'walkA' });
          return;
        case 'crouch':
          if (now > activity.until) {
            fallVyRef.current = POUNCE_VY;
            setActivity({ kind: 'pounce', vx: activity.vx });
            playSound('boing');
            return;
          }
          setSpec({ pose: 'lying', eyes: 'wide' });
          return;
        case 'parachute':
          setSpec({ eyes: 'center', legs: stepLegs });
          return;
        case 'shakeOff':
          if (now > activity.until) break;
          setSpec({ eyes: 'closed', ears: stepToggleRef.current ? 'normal' : 'droop' });
          return;
        case 'startled':
          if (now > activity.until) break;
          setSpec({ pose: 'lying', eyes: 'wide' });
          return;
        case 'spin':
          if (now > activity.until) break;
          facingRef.current = stepToggleRef.current ? 'left' : 'right';
          setSpec(sideStep());
          return;
        case 'howl':
          if (now > activity.until) break;
          setSpec({ mouth: 'open', eyes: 'closed' });
          return;
        case 'greet':
        case 'happy':
          if (now > activity.until) break;
          setSpec({ mouth: chatTyping ? (stepToggleRef.current ? 'open' : 'normal') : 'tongue' });
          return;
        case 'pampered': {
          if (hoverSinceRef.current === null) break; // hand left — back to idle
          // blissful lean: closed eyes + hind-leg thump
          setSpec({ eyes: 'closed', legs: stepLegs });
          pamperTicksRef.current++;
          if (pamperTicksRef.current % PAMPER_HEART_EVERY_TICKS === 0) {
            spawnHeart();
            navigator.vibrate?.(20);
          }
          return;
        }
        case 'anticipate': {
          // watch the ball fly
          const ball = ballPhysRef.current;
          if (!ball) break;
          const dx = ball.x - (posXRef.current + PET_WIDTH / 2);
          setSpec({ eyes: dx < -30 ? 'left' : dx > 30 ? 'right' : 'wide' });
          return;
        }
        case 'shakeToy':
          if (now > activity.until) {
            facingRef.current = activity.returnX > posXRef.current ? 'right' : 'left';
            setActivity({ kind: 'carry', targetX: activity.returnX });
            return;
          }
          setSpec({ mouth: 'ball', eyes: 'closed' });
          return;
        case 'sniff':
          if (now > activity.until) {
            setActivity({ kind: 'eat', until: now + EAT_MS });
            const treatX = treatPhysRef.current?.x ?? posXRef.current;
            const ids = [heartIdRef.current + 1000, heartIdRef.current + 1001, heartIdRef.current + 1002];
            setCrumbs(ids.map((id, i) => ({ id, x: treatX + (i - 1) * 9 })));
            window.setTimeout(() => setCrumbs([]), 1000);
            return;
          }
          setSpec({ eyes: 'closed', ears: 'droop' });
          return;
        case 'eat':
          if (now > activity.until) {
            treatPhysRef.current = null;
            setTreatVisible(false);
            setActivity({ kind: 'lick', until: now + LICK_MS });
            setSpec({ mouth: 'tongue', eyes: 'closed' });
            return;
          }
          if (stepToggleRef.current) playSound('nom');
          setSpec({ mouth: stepToggleRef.current ? 'open' : 'normal' });
          return;
        case 'lick':
          if (now > activity.until) {
            celebrate('MORE?');
            return;
          }
          setSpec({ mouth: 'tongue', eyes: 'closed' });
          return;
        case 'walk':
          // a stroll is happily abandoned for pets
          if (hoverSinceRef.current !== null && now - hoverSinceRef.current > PET_HOVER_DELAY_MS) {
            pamperTicksRef.current = 0;
            setActivity({ kind: 'pampered' });
            setSpec({ eyes: 'closed' });
            spawnHeart();
            return;
          }
          setSpec(sideStep());
          return;
        case 'eatRun':
        case 'fetchRun':
          setSpec(sideStep());
          return;
        case 'lead':
          if (now > activity.until) {
            setIndicator('▲');
            window.setTimeout(() => setIndicator(null), 1600);
            break;
          }
          setSpec(sideStep());
          return;
        case 'carry':
          setSpec(sideStep({ mouth: 'ball' }));
          return;
        case 'circle':
          if (now > activity.until) {
            setActivity({ kind: 'sleep' });
            setSpec({ pose: 'lying', eyes: 'closed' });
            return;
          }
          facingRef.current = stepToggleRef.current ? 'left' : 'right';
          setSpec(sideStep());
          return;
        case 'sleep': {
          if (now - lastActivityRef.current < 2000) {
            // waking up: stand, stretch, yawn
            setActivity({ kind: 'stretch', until: now + STRETCH_MS });
            setSpec({ mouth: 'open', eyes: 'closed' });
            say('YAAAWN...', STRETCH_MS);
            return;
          }
          // dream twitch
          if (Math.random() < 0.06) say('wrf...', 700);
          setSpec({ pose: 'lying', eyes: 'closed', inhale: stepToggleRef.current });
          return;
        }
        case 'stretch':
          if (now > activity.until) break;
          setSpec({ mouth: 'open', eyes: 'closed', ears: 'droop' });
          return;
      }

      // --- idle ---
      if (activityRef.current.kind !== 'idle') setActivity({ kind: 'idle' });

      // Unfinished business: resume an abandoned treat or ball. Food first.
      const waitingTreat = treatPhysRef.current;
      if (waitingTreat?.resting) {
        facingRef.current = waitingTreat.x > posXRef.current ? 'right' : 'left';
        setActivity({ kind: 'eatRun', targetX: clampPetX(waitingTreat.x - PET_WIDTH / 2 + 7) });
        setSpec(sideStep());
        return;
      }
      const waitingBall = ballPhysRef.current;
      if (waitingBall?.resting && !waitingBall.claimed) {
        facingRef.current = waitingBall.x > posXRef.current ? 'right' : 'left';
        setActivity({ kind: 'fetchRun', targetX: clampPetX(waitingBall.x - PET_WIDTH / 2 + 7) });
        setSpec(sideStep());
        return;
      }
      if (waitingBall && !waitingBall.resting) {
        setActivity({ kind: 'anticipate' });
        return;
      }

      // Sustained hover = being petted
      if (hoverSinceRef.current !== null && now - hoverSinceRef.current > PET_HOVER_DELAY_MS) {
        pamperTicksRef.current = 0;
        setActivity({ kind: 'pampered' });
        setSpec({ eyes: 'closed' });
        spawnHeart();
        navigator.vibrate?.(20);
        return;
      }

      const idleFor = now - lastActivityRef.current;

      if (chatTyping) {
        setSpec({ mouth: stepToggleRef.current ? 'open' : 'normal' });
        return;
      }

      if (
        idleFor > checkOnUserAfterMs &&
        !checkedOnUserRef.current &&
        !chatOpenRef.current &&
        document.hasFocus()
      ) {
        checkedOnUserRef.current = true;
        const targetX = clampPetX(cursorRef.current.x - PET_WIDTH / 2);
        facingRef.current = targetX > posXRef.current ? 'right' : 'left';
        setActivity({ kind: 'walk', targetX, thenBark: true });
        setSpec(sideStep());
        return;
      }

      if (idleFor > sleepAfterMs && !chatOpenRef.current) {
        // bedtime ritual: circle a couple times, then plop down
        setActivity({ kind: 'circle', until: now + CIRCLE_MS });
        setSpec(sideStep());
        return;
      }

      const petCenter = posXRef.current + PET_WIDTH / 2;
      const cursor = cursorRef.current;
      const cursorNear =
        Math.abs(cursor.x - petCenter) < 130 && cursor.y > window.innerHeight - 220;
      const dx = cursor.x - petCenter;
      const gaze = dx < -40 ? 'left' : dx > 40 ? 'right' : 'center';

      if (indicator && !cursorNear) setIndicator(null);
      if (cursorNear && hoverSinceRef.current === null) setIndicator('!');

      if (!cursorNear && !chatOpenRef.current) {
        if (Math.random() < HOWL_CHANCE) {
          setActivity({ kind: 'howl', until: now + HOWL_MS });
          say('AWOOOO!', HOWL_MS);
          playSound('woof');
          return;
        }
        if (Math.random() < TAIL_CHASE_CHANCE) {
          setActivity({ kind: 'spin', until: now + SPIN_MS });
          return;
        }
        if (isNight && Math.random() < NIGHT_YAWN_CHANCE) {
          setActivity({ kind: 'stretch', until: now + STRETCH_MS });
          say('*yawn*', STRETCH_MS);
          return;
        }
        if (Math.random() < BARK_CHANCE) {
          say('WOOF?');
          playSound('woof');
        }
        if (Math.random() < wanderChance) {
          const targetX = clampPetX(
            EDGE_PADDING + Math.random() * (window.innerWidth - PET_WIDTH - EDGE_PADDING * 2)
          );
          facingRef.current = targetX > posXRef.current ? 'right' : 'left';
          setActivity({ kind: 'walk', targetX });
          setSpec(sideStep());
          return;
        }
      }

      setSpec({ eyes: Math.random() < BLINK_CHANCE ? 'closed' : gaze });
    }, TICK_MS);

    return () => window.clearInterval(tick);
  }, [
    celebrate, chatTyping, checkOnUserAfterMs, indicator, isNight, reducedMotion,
    say, setActivity, sideStep, sleepAfterMs, spawnHeart, wanderChance,
  ]);

  // ------------------------------------------------- drag / click / hover

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (reducedMotion) return;
      dragRef.current = { startX: e.clientX, startY: e.clientY, dragging: false };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      // touch-and-hold = petting (mobile has no hover)
      holdTimerRef.current = window.setTimeout(() => {
        if (dragRef.current && !dragRef.current.dragging) {
          holdPettingRef.current = true;
          hoverSinceRef.current = Date.now() - PET_HOVER_DELAY_MS - 1;
          navigator.vibrate?.(25);
        }
      }, TOUCH_HOLD_MS);
    },
    [reducedMotion]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      if (
        !drag.dragging &&
        Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > DRAG_THRESHOLD_PX
      ) {
        drag.dragging = true;
        if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
        holdPettingRef.current = false;
        hoverSinceRef.current = null;
        setActivity({ kind: 'held' });
        setSpec({ eyes: 'wide', legs: 'walkA' });
        setStruggling(true);
        window.setTimeout(() => setStruggling(false), 550);
        say('WOAH—');
        playSound('squeak');
      }
      if (drag.dragging) {
        const groundTop = window.innerHeight - GROUND_BOTTOM - PET_HEIGHT;
        posXRef.current = clampPetX(e.clientX - PET_WIDTH / 2);
        liftYRef.current = Math.min(0, e.clientY - PET_HEIGHT * 0.35 - groundTop);
        applyTransform();
      }
    },
    [applyTransform, say, setActivity]
  );

  const handlePointerUp = useCallback(() => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
    if (holdPettingRef.current) {
      holdPettingRef.current = false;
      hoverSinceRef.current = null;
      setActivity({ kind: 'idle' });
      return;
    }
    if (drag?.dragging) {
      const dropHeight = -liftYRef.current;
      homeXRef.current = posXRef.current;
      if (dropHeight > PARACHUTE_MIN_DROP_PX) {
        say('CHUTE OUT!');
        setActivity({ kind: 'parachute' });
        setSpec({ eyes: 'center', legs: 'walkA' });
      } else {
        fallVyRef.current = 0;
        setActivity({ kind: 'falling' });
      }
      return;
    }
    const kind = activityRef.current.kind;
    if (kind === 'falling' || kind === 'parachute' || kind === 'held' || kind === 'pounce') return;
    lastActivityRef.current = Date.now();
    setChatOpen((open) => {
      const next = !open;
      chatOpenRef.current = next;
      if (next) {
        homeXRef.current = clampPetX(window.innerWidth - PET_WIDTH - 18);
        facingRef.current = homeXRef.current > posXRef.current ? 'right' : 'left';
        setActivity({ kind: 'walk', targetX: homeXRef.current });
      }
      return next;
    });
  }, [say, setActivity]);

  const handleMouseEnter = useCallback(() => {
    if (liftYRef.current < 0) return;
    hoverSinceRef.current = Date.now();
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverSinceRef.current = null;
    if (activityRef.current.kind === 'pampered') {
      setActivity({ kind: 'idle' });
    }
  }, [setActivity]);

  // ----------------------------------------------------------- chat actions

  const throwBall = useCallback(() => {
    if (ballPhysRef.current || treatPhysRef.current || reducedMotion) return;
    homeXRef.current = posXRef.current;
    const fromX = posXRef.current + PET_WIDTH / 2;
    const direction = fromX > window.innerWidth / 2 ? -1 : 1;
    ballPhysRef.current = {
      x: fromX,
      y: 36,
      vx: direction * (260 + Math.random() * 160),
      vy: 300 + Math.random() * 80,
      resting: false,
    };
    setBallVisible(true);
    setActivity({ kind: 'anticipate' });
    setSpec({ eyes: 'wide' });
  }, [reducedMotion, setActivity]);

  const dropTreat = useCallback(() => {
    if (treatPhysRef.current || ballPhysRef.current || reducedMotion) {
      if (reducedMotion) celebrate();
      return;
    }
    const side = posXRef.current > window.innerWidth / 2 ? -1 : 1;
    treatPhysRef.current = {
      x: clamp(
        posXRef.current + PET_WIDTH / 2 + side * (60 + Math.random() * 60),
        EDGE_PADDING,
        window.innerWidth - EDGE_PADDING - 14
      ),
      y: 240,
      vx: 0,
      vy: 0,
      resting: false,
    };
    setTreatVisible(true);
  }, [celebrate, reducedMotion]);

  const handleChatAction = useCallback(
    (action: PetAction) => {
      switch (action.type) {
        case 'scroll':
          scrollToSection(action.target);
          if (!reducedMotion) {
            facingRef.current = 'right';
            setActivity({ kind: 'lead', until: Date.now() + 1300 });
          }
          break;
        case 'fetch':
          throwBall();
          break;
        case 'treat':
          dropTreat();
          break;
        case 'link':
          window.open(action.href, '_blank', 'noopener,noreferrer');
          break;
      }
    },
    [dropTreat, reducedMotion, setActivity, throwBall]
  );

  const closeChat = useCallback(() => {
    chatOpenRef.current = false;
    setChatOpen(false);
  }, []);

  const getCurrentSection = useCallback(() => currentSectionRef.current, []);

  // ------------------------------------------------------------------- render

  const kind = activityRef.current.kind;
  const moodAttr =
    kind === 'happy' || kind === 'greet' || kind === 'lick'
      ? 'happy'
      : kind === 'walk' || kind === 'eatRun' || kind === 'circle' || kind === 'lead'
        ? 'walk'
        : kind === 'fetchRun' || kind === 'carry' || kind === 'spin'
          ? 'fetch'
          : kind === 'shakeToy' || kind === 'shakeOff'
            ? 'shake'
            : kind;

  const bubble =
    bubbleText ?? (kind === 'eat' ? 'NOM NOM' : kind === 'fetchRun' ? 'BALL!!' : null);

  return (
    <>
      {chatOpen && (
        <PetChat
          heartCount={heartCount}
          onAction={handleChatAction}
          onClose={closeChat}
          onTypingChange={setChatTyping}
          getCurrentSection={getCurrentSection}
        />
      )}

      <div
        ref={petRef}
        className={`pixel-pet${doingTrick ? ' pixel-pet--trick' : ''}${landing ? ' pixel-pet--landing' : ''}${struggling ? ' pixel-pet--struggle' : ''}`}
        data-mood={moodAttr}
        style={{ transform: `translate(${posXRef.current}px, ${liftYRef.current}px)` }}
      >
        {bubble && <span className="pixel-pet__bubble">{bubble}</span>}
        {indicator && (
          <span className="pixel-pet__indicator" aria-hidden="true">
            {indicator}
          </span>
        )}
        {kind === 'sleep' && !reducedMotion && (
          <span className="pixel-pet__zzz" aria-hidden="true">
            z Z
          </span>
        )}

        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="pixel-pet__heart"
            style={{ marginLeft: heart.offset }}
            aria-hidden="true"
          >
            ♥
          </span>
        ))}

        <button
          type="button"
          className="pixel-pet__body"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={reducedMotion ? () => setChatOpen((o) => ((chatOpenRef.current = !o), !o)) : undefined}
          aria-label={`${PET_NAME}, the site dog. Click to chat, hover or hold to pet, drag to move him.`}
        >
          {kind === 'parachute' && (
            <canvas
              ref={chuteCanvasRef}
              width={PET_COLS * SCALE}
              height={PARACHUTE_ROWS * SCALE}
              className="pixel-pet__chute"
              aria-hidden="true"
            />
          )}
          <canvas
            ref={canvasRef}
            width={PET_COLS * SCALE}
            height={PET_ROWS * SCALE}
            className="pixel-pet__canvas"
          />
        </button>
      </div>

      {ballVisible && <span ref={ballRef} className="pixel-pet__ball" aria-hidden="true" />}
      {treatVisible && <span ref={treatRef} className="pixel-pet__treat" aria-hidden="true" />}
      {crumbs.map((crumb) => (
        <span
          key={crumb.id}
          className="pixel-pet__crumb"
          style={{ transform: `translateX(${crumb.x}px)` }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

export default PixelPet;
