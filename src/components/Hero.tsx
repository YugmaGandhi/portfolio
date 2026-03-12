import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';

const Hero = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: muiTheme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        pt: 8,
      }}
    >
      {/* Animated gradient background elements */}
      <>
        <Box
          sx={{
            position: 'absolute',
            top: '-5%',
            right: '5%',
            width: '500px',
            height: '500px',
            opacity: 0.15,
            background: `radial-gradient(circle, ${muiTheme.palette.primary.main} 0%, transparent 70%)`,
            zIndex: 0,
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translate(0, 0)' },
              '25%': { transform: 'translate(20px, -20px)' },
              '50%': { transform: 'translate(10px, 30px)' },
              '75%': { transform: 'translate(-20px, 10px)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '5%',
            width: '400px',
            height: '400px',
            opacity: 0.1,
            background: `radial-gradient(circle, ${muiTheme.palette.info.main} 0%, transparent 70%)`,
            zIndex: 0,
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            width: '2px',
            height: '200px',
            background: `linear-gradient(180deg, transparent, ${muiTheme.palette.primary.main}, transparent)`,
            opacity: 0.3,
            zIndex: 0,
          }}
        />
      </>

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4.5rem' },
                fontWeight: 800,
                mb: 1,
                letterSpacing: '-0.02em',
                background: isDarkMode
                  ? 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
                  : 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              Yugma Gandhi
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2.2rem' },
                fontWeight: 600,
                mb: 3,
                background: isDarkMode
                  ? 'linear-gradient(135deg, #fdb833 0%, #10b981 100%)'
                  : 'linear-gradient(135deg, #f7931e 0%, #10b981 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Full Stack Developer & Creative Problem Solver
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                mb: 5,
                maxWidth: 600,
                lineHeight: 1.7,
                color: isDarkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)',
              }}
            >
              I craft engaging digital experiences with modern web technologies. Specialized in React, Node.js, and cloud architecture.
              Let's build something amazing together.
            </Typography>
          </motion.div>

          <motion.div
            variants={itemVariants}
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              View My Work
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero; 
