import { Box, Container, Typography, Grid, Paper, Avatar, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';
import { Person } from '@mui/icons-material';
import { differenceInMonths } from 'date-fns';

const About = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();

  const experienceMonths = differenceInMonths(new Date(), new Date(2022, 6));

  const experienceYears = Math.floor(experienceMonths / 12);
  const remainingMonths = experienceMonths % 12;

  return (
    <Box
      id="about"
      sx={{
        py: 10,
        background: isDarkMode 
          ? 'linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))'
          : 'linear-gradient(to bottom, rgba(249, 250, 251, 0.95), rgba(255, 255, 255, 0.95))',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: isDarkMode
            ? 'radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.07) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.07) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(129, 140, 248, 0.05) 0%, transparent 50%)',
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
          opacity: 0.015,
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: muiTheme.palette.text.primary, position: 'relative', zIndex: 2 }}
          >
            About <Box component="span" sx={{ color: muiTheme.palette.primary.main }}>Me</Box>
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: muiTheme.palette.primary.main,
              margin: '0 auto 40px',
              borderRadius: 2,
              position: 'relative',
              zIndex: 2,
            }}
          />
        </motion.div>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box
                component="div"
                sx={{
                  position: 'relative',
                  mb: 4,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 250,
                    height: 250,
                    borderRadius: 3,
                    boxShadow: isDarkMode
                      ? '0 10px 30px -10px rgba(37, 99, 235, 0.3)'
                      : '0 10px 30px -10px rgba(96, 165, 250, 0.3)',
                    border: '4px solid',
                    borderColor: isDarkMode
                      ? 'rgba(37, 99, 235, 0.5)'
                      : 'rgba(96, 165, 250, 0.5)',
                    zIndex: 2,
                    position: 'relative',
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                      : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                    fontSize: '5rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: isDarkMode
                        ? '0 15px 35px -10px rgba(37, 99, 235, 0.4)'
                        : '0 15px 35px -10px rgba(96, 165, 250, 0.4)',
                      borderColor: isDarkMode
                        ? 'rgba(37, 99, 235, 0.8)'
                        : 'rgba(96, 165, 250, 0.8)',
                    },
                  }}
                >
                  <Person fontSize="inherit" />
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '270px',
                    height: '270px',
                    bottom: -15,
                    right: { xs: 'auto', md: 50 },
                    border: '2px solid',
                    borderColor: isDarkMode
                      ? 'rgba(37, 99, 235, 0.2)'
                      : 'rgba(96, 165, 250, 0.2)',
                    borderRadius: 3,
                    zIndex: 1,
                    display: { xs: 'none', sm: 'block' },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: isDarkMode 
                    ? 'rgba(31, 41, 55, 0.8)'
                    : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: isDarkMode
                    ? 'rgba(37, 99, 235, 0.2)'
                    : 'rgba(96, 165, 250, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: isDarkMode
                      ? 'rgba(37, 99, 235, 0.5)'
                      : 'rgba(96, 165, 250, 0.5)',
                    boxShadow: isDarkMode
                      ? '0 10px 30px -10px rgba(37, 99, 235, 0.3)'
                      : '0 10px 30px -10px rgba(96, 165, 250, 0.3)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, 
                      ${muiTheme.palette.primary.main}, 
                      ${muiTheme.palette.secondary.main})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
                  I'm Yugma Gandhi
                </Typography>
                
                <Typography variant="h6" sx={{ 
                  mb: 3, 
                  color: muiTheme.palette.primary.main,
                  fontWeight: 500,
                }}>
                  Full Stack Developer
                </Typography>

                <Typography variant="body1" paragraph sx={{ color: muiTheme.palette.text.primary }}>
                  With {experienceYears} {experienceYears === 1 ? 'year' : 'years'} and {remainingMonths} {remainingMonths === 1 ? 'month' : 'months'} of development experience, I specialize in building efficient and scalable web applications. I enjoy solving complex problems and bringing ideas to life through clean, efficient code, focusing on robust logic and system architecture.
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ color: muiTheme.palette.text.primary }}>
                My expertise includes back-end technologies like Node.js, front-end frameworks like React, and 3D visualization with Babylon.js.
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ 
                        mb: 2,
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: isDarkMode 
                          ? 'rgba(31, 41, 55, 0.4)'
                          : 'rgba(255, 255, 255, 0.7)',
                        border: '1px solid',
                        borderColor: isDarkMode
                          ? 'rgba(37, 99, 235, 0.1)'
                          : 'rgba(96, 165, 250, 0.1)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: isDarkMode 
                            ? 'rgba(31, 41, 55, 0.6)'
                            : 'rgba(255, 255, 255, 0.9)',
                          borderColor: isDarkMode
                            ? 'rgba(37, 99, 235, 0.3)'
                            : 'rgba(96, 165, 250, 0.3)',
                        },
                      }}>
                        <Typography variant="body2" fontWeight="medium" color="text.secondary">
                          Name:
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          Yugma N. Gandhi
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        mb: 2,
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: isDarkMode 
                          ? 'rgba(31, 41, 55, 0.4)'
                          : 'rgba(255, 255, 255, 0.7)',
                        border: '1px solid',
                        borderColor: isDarkMode
                          ? 'rgba(37, 99, 235, 0.1)'
                          : 'rgba(96, 165, 250, 0.1)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: isDarkMode 
                            ? 'rgba(31, 41, 55, 0.6)'
                            : 'rgba(255, 255, 255, 0.9)',
                          borderColor: isDarkMode
                            ? 'rgba(37, 99, 235, 0.3)'
                            : 'rgba(96, 165, 250, 0.3)',
                        },
                      }}>
                        <Typography variant="body2" fontWeight="medium" color="text.secondary">
                          Email:
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          Yugmagandhi1805@gmail.com
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ 
                        mb: 2,
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: isDarkMode 
                          ? 'rgba(31, 41, 55, 0.4)'
                          : 'rgba(255, 255, 255, 0.7)',
                        border: '1px solid',
                        borderColor: isDarkMode
                          ? 'rgba(37, 99, 235, 0.1)'
                          : 'rgba(96, 165, 250, 0.1)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: isDarkMode 
                            ? 'rgba(31, 41, 55, 0.6)'
                            : 'rgba(255, 255, 255, 0.9)',
                          borderColor: isDarkMode
                            ? 'rgba(37, 99, 235, 0.3)'
                            : 'rgba(96, 165, 250, 0.3)',
                        },
                      }}>
                        <Typography variant="body2" fontWeight="medium" color="text.secondary">
                          Phone:
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          +91 9586063713
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        mb: 2,
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: isDarkMode 
                          ? 'rgba(31, 41, 55, 0.4)'
                          : 'rgba(255, 255, 255, 0.7)',
                        border: '1px solid',
                        borderColor: isDarkMode
                          ? 'rgba(37, 99, 235, 0.1)'
                          : 'rgba(96, 165, 250, 0.1)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: isDarkMode 
                            ? 'rgba(31, 41, 55, 0.6)'
                            : 'rgba(255, 255, 255, 0.9)',
                          borderColor: isDarkMode
                            ? 'rgba(37, 99, 235, 0.3)'
                            : 'rgba(96, 165, 250, 0.3)',
                        },
                      }}>
                        <Typography variant="body2" fontWeight="medium" color="text.secondary">
                          Location:
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          Gujarat, India
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;