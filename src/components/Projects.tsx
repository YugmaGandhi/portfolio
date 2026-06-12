import { Box, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, Stack } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionFrame from './common/SectionFrame';
import { projects, Project } from '../data/projects';
import { site, scrollToSection } from '../data/site';

const MissionCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    viewport={{ once: true }}
    style={{ height: '100%', display: 'flex' }}
  >
    <Card className="mission-card">
      <Box className="mission-card__header">
        <Typography component="span">{project.mission}</Typography>
        <Typography component="span" className="mission-card__status">
          {project.status}
        </Typography>
      </Box>

      <Box className="mission-card__image-wrap">
        <CardMedia component="img" image={project.image} alt={project.name} className="mission-card__image" />
      </Box>

      <CardContent className="mission-card__content">
        <Typography variant="h5" className="mission-card__title">
          {project.name}
        </Typography>
        <Box className="mission-field">
          <Typography component="span" className="mission-field__label">OBJECTIVE</Typography>
          <Typography variant="body2">{project.objective}</Typography>
        </Box>
        <Box className="mission-field">
          <Typography component="span" className="mission-field__label">ROLE</Typography>
          <Typography variant="body2">{project.role}</Typography>
        </Box>
        <Box className="mission-card__tags">
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
          <Button component="a" href={project.sourceCodeLink} target="_blank" rel="noopener noreferrer" startIcon={<GitHub />} size="small">
            Source
          </Button>
          {project.liveDemoLink && (
            <Button component="a" href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" startIcon={<Launch />} size="small" variant="outlined">
              Demo
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  </motion.div>
);

const Projects = () => (
  <SectionFrame
    id="projects"
    code="03"
    fileLabel="MISSIONS.EXE"
    status={`${projects.length} MISSIONS`}
    title="Mission"
    accent="Select"
    description="Select a build mission to inspect the objective, stack, role, and current deployment status."
  >
    <Grid container spacing={4} alignItems="stretch">
      {projects.map((project, index) => (
        <Grid item xs={12} md={6} key={project.name} sx={{ display: 'flex' }}>
          <MissionCard project={project} index={index} />
        </Grid>
      ))}
    </Grid>

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 6 }}>
      <Button component="a" href={site.social.github} target="_blank" rel="noopener noreferrer" startIcon={<GitHub />} size="large">
        View More Missions
      </Button>
      <Button onClick={() => scrollToSection('contact')} size="large" variant="outlined">
        Start Co-op
      </Button>
    </Stack>
  </SectionFrame>
);

export default Projects;
