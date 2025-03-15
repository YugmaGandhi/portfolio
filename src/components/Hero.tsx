import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';

const Hero = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: muiTheme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Anime-themed background elements */}
      <>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            opacity: 0.1,
            background: `radial-gradient(circle at 70% 30%, ${muiTheme.palette.primary.main} 0%, transparent 50%)`,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 100,
            height: 100,
            backgroundImage: `url('/icons/anime-symbol.svg')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2,
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
          }}
        />
      </>

      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Hi, I'm <Box component="span" sx={{ color: muiTheme.palette.primary.main }}>Yugma Gandhi</Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 4, fontWeight: 500 }}
            >
              Full Stack Developer
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              variant="body1"
              sx={{ mb: 4, maxWidth: 600 }}
            >
              I create engaging digital experiences with modern web technologies.
              Specialized in React, Node.js, and cloud architecture.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                mr: 2,
                px: 4,
                py: 1.5,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isDarkMode
                  ? '0 0 20px rgba(100, 181, 246, 0.4)'
                  : '0 0 20px rgba(144, 202, 249, 0.4)',
              }}
            >
              View My Work
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                px: 4,
                py: 1.5,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Contact Me
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero; 