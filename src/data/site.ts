/** Site-wide content. Edit here — components only render this data. */

export const site = {
  name: 'Yugma Gandhi',
  fullName: 'Yugma N. Gandhi',
  initials: 'YG',
  role: 'Full Stack Developer',
  tagline: 'Full Stack Developer // Cloud Builder // Search Systems',
  summary:
    'I design and ship fast, reliable web apps with React, Node.js, Azure, and intelligent search workflows.',
  email: 'yugmagandhi1805@gmail.com',
  phone: '+91 9586063713',
  phoneHref: 'tel:+919586063713',
  location: 'Gujarat, India',
  /** Month is 0-indexed: July 2022. Used to compute XP in About. */
  experienceStart: { year: 2022, month: 6 },
  social: {
    github: 'https://github.com/YugmaGandhi',
    linkedin: 'https://www.linkedin.com/in/yugma18/',
  },
  highlights: ['React', 'Node.js', 'Azure', 'AI Search'],
} as const;

export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
] as const;

/** Resolve a public/ asset against the Vite base path (works at /portfolio/ on GitHub Pages). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
