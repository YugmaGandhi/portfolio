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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
    hover: { y: -3 },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDarkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1a202c 100%)'
          : 'linear-gradient(135deg, #f8f9fa 0%, #f0f4f8 100%)',
        position: 'relative',
        overflow: 'hidden',
        pt: 10,
        pb: 10,
      }}
    >
      {/* Subtle background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(167, 139, 250, 0.05) 0%, transparent 70%)',
          zIndex: 0,
          animation: 'float-slow 8s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-5%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(96, 165, 250, 0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(96, 165, 250, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          animation: 'float-slow 10s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', maxWidth: '720px' }}
        >
          {/* Greeting text */}
          <motion.div variants={textVariants}>
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 500,
                color: isDarkMode ? '#a78bfa' : '#7c3aed',
                mb: 2,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Welcome to my portfolio
            </Typography>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={textVariants}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 3,
                color: isDarkMode ? '#ffffff' : '#0f172a',
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ color: '#a78bfa' }}>Yugma Gandhi</span>
              <br />
              Full Stack Developer
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div variants={textVariants}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                mb: 5,
                maxWidth: '500px',
                lineHeight: 1.8,
                color: isDarkMode ? '#cbd5e1' : '#334155',
                fontWeight: 400,
              }}
            >
              Building beautiful, functional digital experiences with React, Node.js, and modern web technologies. I craft solutions that are both technically sound and visually compelling.
            </Typography>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={containerVariants}
            sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}
          >
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                variant="contained"
                size="large"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 6,
                  py: 1.75,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'
                    : 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: isDarkMode
                    ? '0 10px 40px rgba(167, 139, 250, 0.3)'
                    : '0 10px 40px rgba(124, 58, 237, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    boxShadow: isDarkMode
                      ? '0 15px 50px rgba(167, 139, 250, 0.5)'
                      : '0 15px 50px rgba(124, 58, 237, 0.4)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                variant="outlined"
                size="large"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 6,
                  py: 1.75,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: isDarkMode ? '#a78bfa' : '#7c3aed',
                  borderColor: isDarkMode ? '#a78bfa' : '#7c3aed',
                  borderWidth: 2,
                  borderRadius: '8px',
                  textTransform: 'none',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    backgroundColor: isDarkMode
                      ? 'rgba(167, 139, 250, 0.1)'
                      : 'rgba(124, 58, 237, 0.08)',
                    borderColor: isDarkMode ? '#c4b5fd' : '#a78bfa',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero; 
