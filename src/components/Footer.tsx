import { Box, Container, Typography, Grid, IconButton, useTheme } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';

const Footer = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        background: isDarkMode
          ? 'linear-gradient(to bottom, #121212, #0A0A0A)'
          : 'linear-gradient(to bottom, #F5F5F5, #FAFAFA)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(103, 58, 183, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(103, 58, 183, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          backgroundImage: `url('/icons/anime-pattern.svg')`,
          backgroundSize: '600px',
          opacity: 0.02,
          pointerEvents: 'none',
          animation: 'floatBackground 60s linear infinite',
        },
        '@keyframes floatBackground': {
          '0%': {
            backgroundPosition: '0 0',
          },
          '100%': {
            backgroundPosition: '600px 600px',
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Yugma Gandhi
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Full Stack Developer specializing in React, Node.js, and Babylon.js.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <IconButton
                  component="a"
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: muiTheme.palette.text.primary,
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: muiTheme.palette.text.primary,
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography
                  component="a"
                  href="#about"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  About
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography
                  component="a"
                  href="#experience"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  Experience
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography
                  component="a"
                  href="#skills"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  Skills
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography
                  component="a"
                  href="#projects"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  Projects
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  component="a"
                  href="#contact"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  Contact
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Email: Yugmagandhi1805@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Phone: +91 9586063713
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: Gujarat, India
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Yugma Gandhi. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Designed and built with{' '}
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                mx: 0.5,
                animation: 'pulse 2s infinite',
                color: muiTheme.palette.primary.main,
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                },
              }}
            >
              ❤
            </Box>{' '}
            using React, Material UI, and Framer Motion
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 