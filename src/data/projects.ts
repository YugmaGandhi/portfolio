import { asset } from './site';

export interface Project {
  mission: string;
  name: string;
  status: 'PROTOTYPE' | 'ACTIVE' | 'IN BUILD' | 'DEPLOYED';
  objective: string;
  role: string;
  tags: string[];
  image: string;
  sourceCodeLink: string;
  liveDemoLink?: string;
}

export const projects: Project[] = [
  {
    mission: 'MISSION 01',
    name: 'Document Semantic Search',
    status: 'PROTOTYPE',
    objective:
      'Build a natural-language document discovery interface with semantic matching and ranked results.',
    role: 'Frontend + Search UX',
    tags: ['React', 'MUI', 'NLP', 'Search'],
    image: asset('images/projects/SemanticSearch.png'),
    sourceCodeLink: 'https://github.com/YugmaGandhi/semantic-search',
  },
  {
    mission: 'MISSION 02',
    name: 'Money Management App',
    status: 'ACTIVE',
    objective:
      'Track budgets, categorize expenses, and visualize personal finance patterns in a clean interface.',
    role: 'Full Stack UI',
    tags: ['React', 'TypeScript', 'Charts', 'MUI'],
    image: asset('images/projects/ecommerce.png'),
    sourceCodeLink: 'https://github.com/YugmaGandhi/money-management',
  },
  {
    mission: 'MISSION 03',
    name: 'Cloud Play Creator',
    status: 'IN BUILD',
    objective:
      'Create a cloud media workflow with asset handling, preview states, and production-friendly UI.',
    role: 'Workflow Builder',
    tags: ['React', 'Cloud', 'Media', 'Workflow'],
    image: asset('images/projects/CloudPlayCreator.png'),
    sourceCodeLink: 'https://github.com/YugmaGandhi/cloud-play-creator',
  },
  {
    mission: 'MISSION 04',
    name: 'Portfolio Website',
    status: 'DEPLOYED',
    objective:
      'Present projects and engineering profile through a custom responsive retro interface.',
    role: 'Design + Frontend',
    tags: ['React', 'Vite', 'MUI', 'Motion'],
    image: asset('images/projects/portfolio.png'),
    sourceCodeLink: 'https://github.com/YugmaGandhi/portfolio',
  },
];
