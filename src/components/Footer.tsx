import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { colors, fonts, pixelShadow } from '../theme/tokens';
import { site, navLinks } from '../data/site';

const headingSx = {
  color: colors.yellow,
  fontFamily: fonts.pixel,
  fontSize: '0.75rem',
  lineHeight: 1.8,
} as const;

const socialButtonSx = {
  color: colors.text,
  border: `1px solid ${colors.border}`,
  borderRadius: 0,
  boxShadow: pixelShadow(3),
  '&:hover': {
    color: colors.cyan,
    borderColor: colors.cyan,
  },
} as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: colors.surface,
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid ${colors.border}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom className="pixel-title" sx={headingSx}>
              {site.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 340 }}>
              Full Stack Developer specializing in React, Node.js, Azure, and Babylon.js.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton
                component="a"
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label="GitHub profile"
                sx={socialButtonSx}
              >
                <GitHub />
              </IconButton>
              <IconButton
                component="a"
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label="LinkedIn profile"
                sx={socialButtonSx}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom className="pixel-title" sx={headingSx}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {navLinks.map((link) => (
                <Box component="li" sx={{ mb: 1 }} key={link.id}>
                  <Typography
                    component="a"
                    href={`#${link.id}`}
                    sx={{
                      color: colors.muted,
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      '&:hover': {
                        color: colors.cyan,
                      },
                    }}
                  >
                    {link.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom className="pixel-title" sx={headingSx}>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Email: {site.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Phone: {site.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {site.location}
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: `1px solid ${colors.border}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} {site.name}. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Designed and built with React, Material UI, and Framer Motion.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
