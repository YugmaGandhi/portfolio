import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';

const Hero = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0e5ec 0%, #f0f3f7 100%)',
        position: 'relative',
        overflow: 'hidden',
        pt: 12,
        pb: 12,
      }}
    >
      {/* Neumorphic background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: '#f0f3f7',
          boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.08), -8px -8px 20px rgba(255, 255, 255, 0.9)',
          opacity: 0.4,
          zIndex: 0,
          animation: 'softFloat 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: '#e8eef7',
          boxShadow: 'inset 6px 6px 12px rgba(0, 0, 0, 0.06), inset -6px -6px 12px rgba(255, 255, 255, 0.8)',
          opacity: 0.3,
          zIndex: 0,
          animation: 'softFloat 8s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%' }}
        >
          {/* Greeting */}
          <motion.div variants={textVariants}>
            <Typography
              sx={{
                fontSize: { xs: '0.85rem', md: '0.95rem' },
                fontWeight: 600,
                color: '#8b9aaf',
                mb: 1,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Hello, Welcome
            </Typography>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={textVariants}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                color: '#5a6b7f',
                letterSpacing: '-0.02em',
              }}
            >
              I'm <Box component="span" sx={{ color: '#8b9aaf', fontWeight: 900 }}>Yugma Gandhi</Box>
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={textVariants}>
            <Typography
              sx={{
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                fontWeight: 500,
                color: '#8b9aaf',
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Full Stack Developer • Creative Problem Solver
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div variants={textVariants}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                mb: 6,
                maxWidth: '550px',
                lineHeight: 1.8,
                color: '#7a8da0',
                fontWeight: 400,
              }}
            >
              I create elegant, functional digital experiences using modern technologies. Specializing in React, Node.js, and full-stack solutions that blend technical excellence with beautiful design.
            </Typography>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={containerVariants}
            sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}
          >
            <motion.div variants={textVariants}>
              <Button
                variant="contained"
                size="large"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 5,
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 700,
                  backgroundColor: '#e0e5ec',
                  color: '#5a6b7f',
                  boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.08), -8px -8px 16px rgba(255, 255, 255, 0.8)',
                  borderRadius: '16px',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  border: 'none',
                  '&:hover': {
                    backgroundColor: '#e0e5ec',
                    boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.06), -6px -6px 12px rgba(255, 255, 255, 0.7)',
                    transform: 'translateY(-4px)',
                  },
                  '&:active': {
                    boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.08), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div variants={textVariants}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 5,
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#5a6b7f',
                  borderColor: '#c5cce0',
                  backgroundColor: '#e0e5ec',
                  boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.08), -8px -8px 16px rgba(255, 255, 255, 0.8)',
                  borderRadius: '16px',
                  border: '1px solid rgba(139, 154, 175, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    backgroundColor: '#e0e5ec',
                    borderColor: '#8b9aaf',
                    boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.06), -6px -6px 12px rgba(255, 255, 255, 0.7)',
                    transform: 'translateY(-4px)',
                  },
                  '&:active': {
                    boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.08), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
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
