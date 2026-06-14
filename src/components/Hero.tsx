import { Box, Typography, Button, Container, Chip, Stack } from '@mui/material';
import { ArrowForward, Code, GitHub, LinkedIn, Storage, Terminal } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { colors, pixelShadow, withAlpha } from '../theme/tokens';
import { site, scrollToSection } from '../data/site';

const questLog = [
  { icon: <Code />, title: 'Frontend', body: 'React interfaces with Material UI and animation polish.' },
  { icon: <Storage />, title: 'Backend', body: 'APIs, auth, data models, and cloud integrations.' },
  { icon: <Terminal />, title: 'Delivery', body: 'Azure DevOps pipelines and maintainable releases.' },
];

const Hero = () => (
  <Box
    sx={{
      minHeight: { xs: 'auto', md: '100vh' },
      pt: { xs: 14, md: 10 },
      pb: { xs: 8, md: 6 },
      display: 'flex',
      alignItems: 'center',
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundImage:
          `linear-gradient(${withAlpha(colors.cyan, 0.055)} 1px, transparent 1px), linear-gradient(90deg, ${withAlpha(colors.cyan, 0.055)} 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: 0.72,
        zIndex: 0,
      },
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
          gap: { xs: 6, md: 8 },
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="PLAYER 1 READY"
              size="small"
              className="pixel-chip"
              sx={{
                borderRadius: 0,
                color: colors.green,
                backgroundColor: withAlpha(colors.green, 0.1),
              }}
            />
          </Stack>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontSize: { xs: '1.35rem', sm: '1.8rem', md: '2.2rem' },
              lineHeight: 1.25,
              color: colors.text,
              textTransform: 'uppercase',
              textShadow: pixelShadow(4),
            }}
          >
            Yugma <Box component="span" sx={{ color: colors.yellow }}>Gandhi</Box>
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 3,
              color: colors.muted,
              fontSize: { xs: '0.7rem', md: '0.85rem' },
              lineHeight: 1.9,
              textTransform: 'uppercase',
            }}
          >
            {site.tagline}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: 660,
              color: colors.body,
              fontSize: '1.05rem',
              lineHeight: 1.75,
            }}
          >
            {site.summary}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => scrollToSection('projects')}
              sx={{ px: 4, py: 1.45, alignSelf: { xs: 'stretch', sm: 'center' } }}
            >
              Start ▸ Projects
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollToSection('contact')}
              sx={{
                px: 4,
                py: 1.45,
                alignSelf: { xs: 'stretch', sm: 'center' },
                color: colors.yellow,
                borderColor: colors.yellow,
                '&:hover': { borderColor: colors.cyan, color: colors.cyan },
              }}
            >
              Insert Coin ▸ Contact
            </Button>
          </Stack>

          <Stack direction="row" spacing={1.25} sx={{ flexWrap: 'wrap', gap: 1.25 }}>
            {site.highlights.map((label) => (
              <Chip
                key={label}
                label={label}
                size="small"
                className="pixel-chip"
                sx={{
                  borderRadius: 0,
                  backgroundColor: withAlpha(colors.cyan, 0.08),
                  color: colors.text,
                }}
              />
            ))}
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: 420, md: 540 },
              overflow: 'hidden',
              border: '1px solid',
              borderColor: colors.border,
              boxShadow: `0 0 0 2px ${colors.shadow}, ${pixelShadow(10)}`,
              backgroundColor: withAlpha(colors.surface, 0.92),
            }}
          >
            <Box sx={{ position: 'absolute', inset: 0, backgroundColor: withAlpha(colors.bg, 0.82) }} />

            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, sm: 4 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: { xs: 420, md: 540 },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: colors.red }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                </Box>
                <Typography variant="caption" sx={{ color: colors.muted }}>
                  QUEST.LOG
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gap: 2 }}>
                {questLog.map((item) => (
                  <Box
                    key={item.title}
                    sx={{
                      p: 2.25,
                      backgroundColor: withAlpha(colors.bg, 0.72),
                      border: `2px solid ${colors.border}`,
                      boxShadow: pixelShadow(4),
                      display: 'flex',
                      gap: 2,
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box sx={{ color: colors.cyan, lineHeight: 0 }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.body}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Stack direction="row" spacing={1.5}>
                <Button component="a" href={site.social.github} target="_blank" rel="noopener noreferrer" variant="text" startIcon={<GitHub />}>
                  GitHub
                </Button>
                <Button component="a" href={site.social.linkedin} target="_blank" rel="noopener noreferrer" variant="text" startIcon={<LinkedIn />}>
                  LinkedIn
                </Button>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Container>
  </Box>
);

export default Hero;
