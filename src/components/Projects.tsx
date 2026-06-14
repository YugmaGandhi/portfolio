import { Box, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, Stack } from '@mui/material';
import { GitHub, Launch, Bolt } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionFrame from './common/SectionFrame';
import { projects, featuredProject, Project, ProjectLink, FeaturedProject } from '../data/projects';
import { site, scrollToSection } from '../data/site';

/** Classify a boot-log line by its prefix so we can colour it like a real terminal. */
const lineKind = (line: string) => {
  if (line.startsWith('$')) return 'cmd';
  if (line.startsWith('[ok]')) return 'ok';
  if (line.startsWith('>')) return 'out';
  return 'info';
};

const ProjectTerminal = ({ lines }: { lines: string[] }) => (
  <Box className="project-terminal">
    <Box className="project-terminal__bar">
      <Box component="span" className="project-terminal__dot" />
      <Box component="span" className="project-terminal__dot" />
      <Box component="span" className="project-terminal__dot" />
    </Box>
    <Box className="project-terminal__body">
      {lines.map((line, i) => (
        <Typography key={i} component="div" className={`project-terminal__line is-${lineKind(line)}`}>
          {line}
        </Typography>
      ))}
    </Box>
  </Box>
);

const linkIcon = (label: string) => (/demo|live/i.test(label) ? <Launch /> : <GitHub />);

const ProjectLinks = ({ links }: { links: ProjectLink[] }) => (
  <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: 'auto', pt: 2 }}>
    {links.map((link) => (
      <Button
        key={link.url}
        component="a"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={linkIcon(link.label)}
        size="small"
        variant={link.primary ? 'contained' : 'outlined'}
      >
        {link.label}
      </Button>
    ))}
  </Stack>
);

const FeaturedMission = ({ project }: { project: FeaturedProject }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55 }}
    viewport={{ once: true }}
  >
    <Card className="featured-card">
      <Box className="featured-card__header">
        <Typography component="span" className="featured-card__badge">
          <Bolt sx={{ fontSize: '0.9rem' }} /> {project.badge}
        </Typography>
        <Typography component="span" className="mission-card__status">
          {project.status}
        </Typography>
      </Box>

      <Box className="featured-card__body">
        <Box className="featured-card__visual">
          <ProjectTerminal lines={project.terminal} />
        </Box>

        <Box className="featured-card__content">
          <Box>
            <Typography variant="h4" className="featured-card__title">
              {project.name}
            </Typography>
            <Typography className="featured-card__tagline">{project.tagline}</Typography>
          </Box>

          <Box className="mission-field">
            <Typography component="span" className="mission-field__label">OBJECTIVE</Typography>
            <Typography variant="body2">{project.objective}</Typography>
          </Box>

          <Box className="mission-field">
            <Typography component="span" className="mission-field__label">ROLE</Typography>
            <Typography variant="body2">{project.role}</Typography>
          </Box>

          <Box className="mission-field">
            <Typography component="span" className="mission-field__label">CAPABILITIES</Typography>
            <Box component="ul" className="featured-card__features">
              {project.features.map((feature) => (
                <Box component="li" key={feature}>{feature}</Box>
              ))}
            </Box>
          </Box>

          <Box className="mission-card__tags">
            {project.stack.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>

          <ProjectLinks links={project.links} />
        </Box>
      </Box>
    </Card>
  </motion.div>
);

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
        {project.image ? (
          <CardMedia component="img" image={project.image} alt={project.name} className="mission-card__image" />
        ) : (
          <ProjectTerminal lines={project.terminal ?? []} />
        )}
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
        <ProjectLinks links={project.links} />
      </CardContent>
    </Card>
  </motion.div>
);

const Projects = () => (
  <SectionFrame
    id="projects"
    code="03"
    fileLabel="MISSIONS.EXE"
    status={`${projects.length + 1} MISSIONS`}
    title="Mission"
    accent="Select"
    description="Select a build mission to inspect the objective, stack, role, and current deployment status."
  >
    <FeaturedMission project={featuredProject} />

    <Box className="missions-divider">
      <Typography component="span">// MORE MISSIONS</Typography>
    </Box>

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
