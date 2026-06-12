import { Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { Person } from '@mui/icons-material';
import { differenceInMonths } from 'date-fns';
import SectionFrame from './common/SectionFrame';
import { site } from '../data/site';

const StatBlock = ({ label, value }: { label: string; value: string }) => (
  <Box className="stat-block">
    <Typography variant="caption" className="stat-block__label">
      {label}
    </Typography>
    <Typography variant="body1" className="stat-block__value">
      {value}
    </Typography>
  </Box>
);

const About = () => {
  const { year, month } = site.experienceStart;
  const experienceMonths = differenceInMonths(new Date(), new Date(year, month));
  const xp = `${Math.floor(experienceMonths / 12)}Y ${experienceMonths % 12}M`;

  const stats = [
    { label: 'CLASS', value: site.role },
    { label: 'XP', value: xp },
    { label: 'BASE', value: site.location },
    { label: 'SPECIALTY', value: 'React / Node / Azure' },
    { label: 'SIDE SKILL', value: 'Babylon.js 3D' },
    { label: 'CONTACT', value: site.email },
  ];

  return (
    <SectionFrame id="about" code="01" fileLabel="PLAYER.DAT" status="ONLINE" title="Character" accent="Profile">
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            style={{ height: '100%' }}
          >
            <Paper className="profile-card" elevation={0}>
              <Box className="profile-card__topbar">PLAYER CARD</Box>
              <Avatar className="profile-avatar">
                <Person fontSize="inherit" />
              </Avatar>
              <Typography variant="h5" className="profile-name">
                {site.fullName}
              </Typography>
              <Typography variant="body2" className="profile-role">
                {site.role}
              </Typography>
              <Box className="profile-badge">READY FOR NEXT QUEST</Box>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            style={{ height: '100%' }}
          >
            <Paper className="profile-terminal" elevation={0}>
              <Box className="terminal-line">
                <Typography component="span" className="terminal-prompt">&gt;</Typography>
                <Typography component="span">LOAD_PROFILE YUGMA_GANDHI</Typography>
              </Box>
              <Typography variant="body1" className="terminal-copy">
                I build efficient, scalable web applications with a focus on clean architecture,
                robust APIs, cloud workflows, and polished React interfaces.
              </Typography>
              <Typography variant="body1" className="terminal-copy">
                Current toolkit includes React, Node.js, Azure services, AI search workflows,
                and 3D visualization with Babylon.js.
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {stats.map((stat) => (
                  <Grid item xs={12} sm={6} key={stat.label}>
                    <StatBlock label={stat.label} value={stat.value} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </SectionFrame>
  );
};

export default About;
