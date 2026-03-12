import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0e27',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      {/* Subtle gradient background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0, 102, 204, 0.1) 0%, transparent 50%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '700px' }}
        >
          {/* Small label */}
          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#0066cc',
                mb: 2,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Full Stack Developer
            </Typography>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 3,
                color: '#ffffff',
                letterSpacing: '-0.015em',
              }}
            >
              Yugma Gandhi
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 400,
                color: '#d1d5db',
                mb: 4,
                lineHeight: 1.6,
                maxWidth: '600px',
              }}
            >
              Building robust full-stack applications with React, Node.js, and modern web technologies. Focused on clean code, scalability, and exceptional user experiences.
            </Typography>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={containerVariants}
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 5 }}
          >
            <motion.div variants={itemVariants}>
              <Button
                variant="contained"
                size="large"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: '#0066cc',
                  color: '#ffffff',
                  borderRadius: '6px',
                  textTransform: 'none',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#0052a3',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  borderColor: '#374151',
                  borderRadius: '6px',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: '#0066cc',
                    color: '#0066cc',
                  },
                }}
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero; 
