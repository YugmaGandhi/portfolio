import { Box, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Api, Cloud, Code, Dataset, Search } from '@mui/icons-material';
import type { ReactElement } from 'react';
import SectionFrame from './common/SectionFrame';
import { skillGroups, certifications, SkillGroup } from '../data/skills';

const groupIcons: Record<SkillGroup['icon'], ReactElement> = {
  code: <Code />,
  api: <Api />,
  cloud: <Cloud />,
  search: <Search />,
};

const meter = (level: number) => {
  const filled = Math.round(level / 10);
  return '■'.repeat(filled).padEnd(10, '□');
};

const SkillTreeCard = ({ group, index }: { group: SkillGroup; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    viewport={{ once: true }}
    style={{ height: '100%' }}
  >
    <Paper className="skill-tree-card" elevation={0}>
      <Box className="skill-tree-card__header">
        <Box className="skill-tree-card__icon">{groupIcons[group.icon]}</Box>
        <Box>
          <Typography variant="h5" className="skill-tree-card__title">
            {group.title}
          </Typography>
          <Typography variant="caption" className="skill-tree-card__type">
            TYPE: {group.type}
          </Typography>
        </Box>
      </Box>

      <Box className="skill-tree-card__nodes">
        {group.skills.map((skill) => (
          <Box className="skill-node" key={skill.name}>
            <Box className="skill-node__meta">
              <Typography variant="body2" className="skill-node__name">
                {skill.name}
              </Typography>
              <Typography variant="caption" className="skill-node__level">
                LVL {skill.level}
              </Typography>
            </Box>
            <Typography component="div" className="skill-node__meter" aria-label={`${skill.name} level ${skill.level}`}>
              {meter(skill.level)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  </motion.div>
);

const Skills = () => (
  <SectionFrame
    id="skills"
    code="02"
    fileLabel="SKILLS.SYS"
    status="LEVELING"
    title="Skill"
    accent="Tree"
    description="Core abilities grouped by build area, with levels shown as segmented arcade meters."
  >
    <Grid container spacing={3}>
      {skillGroups.map((group, index) => (
        <Grid item xs={12} md={6} key={group.title}>
          <SkillTreeCard group={group} index={index} />
        </Grid>
      ))}
    </Grid>

    <Paper className="cert-strip" elevation={0}>
      <Box className="cert-strip__label">
        <Dataset fontSize="small" />
        CERTIFICATIONS
      </Box>
      <Box className="cert-strip__items">
        {certifications.map((cert) => (
          <Box className="cert-token" key={cert}>
            {cert}
          </Box>
        ))}
      </Box>
    </Paper>
  </SectionFrame>
);

export default Skills;
