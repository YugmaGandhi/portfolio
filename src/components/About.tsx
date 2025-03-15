import { Box, Container, Typography, Grid, Paper, Avatar, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';
import { Person } from '@mui/icons-material';

const About = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();

  return (
    <Box
      id="about"
      sx={{
        py: 10,
        background: isDarkMode 
          ? 'linear-gradient(to bottom, #1A1A1A, #252525)' 
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
          backgroundImage: `url('/icons/anime-pattern.svg')`,
          backgroundSize: '600px',
          opacity: 0.03,
          pointerEvents: 'none',
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
                    boxShadow: `0 10px 30px 0 ${isDarkMode 
                      ? 'rgba(0, 0, 0, 0.5)' 
                      : 'rgba(0, 0, 0, 0.1)'}`,
                    border: '4px solid',
                    borderColor: muiTheme.palette.primary.main,
                    zIndex: 2,
                    position: 'relative',
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                      : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                    fontSize: '5rem',
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
                    borderColor: muiTheme.palette.info.main,
                    borderRadius: 3,
                    zIndex: 1,
                    display: { xs: 'none', sm: 'block' },
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
                  borderRadius: 3,
                  backgroundColor: isDarkMode ? 'rgba(35, 35, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '4px',
                    background: `linear-gradient(to bottom, ${muiTheme.palette.primary.main}, ${muiTheme.palette.info.main})`,
                    borderTopLeftRadius: 3,
                    borderBottomLeftRadius: 3,
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
                  With over 3 years of development experience, I specialize in creating engaging and responsive web applications. My expertise includes front-end frameworks like React, back-end technologies such as Node.js, and 3D visualization libraries like Babylon.js.
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ color: muiTheme.palette.text.primary }}>
                  I enjoy solving complex problems and turning ideas into reality through clean, efficient code. My approach combines technical excellence with a keen eye for design and user experience.
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="medium" color="text.secondary">
                          Name:
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          Yugma N. Gandhi
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="medium" color="text.secondary">
                          Email:
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          Yugmagandhi1805@gmail.com
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="medium" color="text.secondary">
                          Phone:
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          +91 9586063713
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
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