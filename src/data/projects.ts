import { asset } from './site';

export type ProjectStatus = 'PROTOTYPE' | 'ACTIVE' | 'IN BUILD' | 'DEPLOYED';

export interface ProjectLink {
  /** Short button label ("Source", "Backend", "Demo"). */
  label: string;
  url: string;
  /** Render as the primary (filled) action vs an outlined secondary. */
  primary?: boolean;
}

export interface Project {
  mission: string;
  name: string;
  status: ProjectStatus;
  objective: string;
  role: string;
  tags: string[];
  /** Screenshot path. Omit to fall back to the retro terminal-boot visual. */
  image?: string;
  /** Faux boot log shown when there is no screenshot. */
  terminal?: string[];
  links: ProjectLink[];
}

export interface FeaturedProject {
  /** Codename badge shown above the title ("FEATURED BUILD"). */
  badge: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  objective: string;
  role: string;
  /** Headline capabilities rendered as a labelled grid. */
  features: string[];
  stack: string[];
  terminal: string[];
  links: ProjectLink[];
}

/** The flagship build, rendered in its own spotlight panel. */
export const featuredProject: FeaturedProject = {
  badge: 'FEATURED BUILD',
  name: 'Griffon',
  tagline: 'Self-hosted authentication infrastructure',
  status: 'IN BUILD',
  objective:
    'Open-source, self-hostable auth service that gives teams production-grade identity and access management — without vendor lock-in or per-user fees.',
  role: 'Architect + Full Stack',
  features: [
    'Email + password auth with Argon2id hashing',
    'OAuth2 — Google, GitHub, Microsoft (extensible)',
    'TOTP MFA with QR enrollment & recovery codes',
    'RS256 JWT signing with refresh-token rotation',
    'RBAC with scoped API keys and multi-org support',
    'Webhooks, audit logs & Prometheus metrics',
  ],
  stack: ['TypeScript', 'Node.js 20', 'PostgreSQL', 'Redis', 'Docker', 'JWT'],
  terminal: [
    '$ griffon up',
    '[ok] postgres connected',
    '[ok] redis connected',
    '[ok] rs256 keys loaded',
    '[ok] oauth providers: 3',
    '> listening on :8080',
  ],
  links: [
    { label: 'Source', url: 'https://github.com/YugmaGandhi/griffon', primary: true },
  ],
};

export const projects: Project[] = [
  {
    mission: 'MISSION 01',
    name: 'Bidify',
    status: 'ACTIVE',
    objective:
      'Real-time bidding & auction platform — auction listings, live bid engine, and authenticated user flows across a TypeScript stack.',
    role: 'Full Stack',
    tags: ['Next.js', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    terminal: [
      '$ bidify dev',
      '[ok] prisma migrate',
      '[ok] auction service',
      '[ok] bid engine live',
      '> api ready on :4000',
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/YugmaGandhi/bidify-backend', primary: true },
      { label: 'Frontend', url: 'https://github.com/YugmaGandhi/bidify-frontend' },
    ],
  },
  {
    mission: 'MISSION 02',
    name: 'Portfolio Website',
    status: 'DEPLOYED',
    objective:
      'Present projects and engineering profile through a custom responsive retro game-console interface.',
    role: 'Design + Frontend',
    tags: ['React', 'Vite', 'MUI', 'Framer Motion'],
    image: asset('images/projects/portfolio.png'),
    links: [
      { label: 'Source', url: 'https://github.com/YugmaGandhi/portfolio', primary: true },
    ],
  },
];
