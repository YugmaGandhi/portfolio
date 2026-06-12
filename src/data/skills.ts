export interface SkillNode {
  name: string;
  /** 0–100; rendered as a 10-segment arcade meter. */
  level: number;
}

export interface SkillGroup {
  title: string;
  type: string;
  /** Key into the icon map in Skills.tsx — keeps this module renderer-free. */
  icon: 'code' | 'api' | 'cloud' | 'search';
  skills: SkillNode[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    type: 'UI ENGINE',
    icon: 'code',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'TypeScript', level: 70 },
      { name: 'Material UI', level: 85 },
      { name: 'Framer Motion', level: 70 },
    ],
  },
  {
    title: 'Backend',
    type: 'API CORE',
    icon: 'api',
    skills: [
      { name: 'Node.js', level: 70 },
      { name: 'Express.js', level: 75 },
      { name: 'REST APIs', level: 90 },
      { name: 'Authentication', level: 80 },
    ],
  },
  {
    title: 'Cloud',
    type: 'DEPLOY OPS',
    icon: 'cloud',
    skills: [
      { name: 'Azure DevOps', level: 85 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Azure Storage', level: 75 },
      { name: 'Git/GitHub', level: 90 },
    ],
  },
  {
    title: 'Data + Search',
    type: 'INTEL SYSTEM',
    icon: 'search',
    skills: [
      { name: 'Azure AI Search', level: 70 },
      { name: 'Semantic Search', level: 72 },
      { name: 'Cosmos DB', level: 80 },
      { name: 'MongoDB', level: 60 },
    ],
  },
];

export const certifications = ['AZ-900 Azure Fundamentals', 'AZ-104 Azure Administrator'];
