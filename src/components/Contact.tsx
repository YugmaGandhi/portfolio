import { useState, FormEvent } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper, IconButton, CircularProgress, Alert, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Reset the form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <Box
      id="contact"
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
            sx={{ color: muiTheme.palette.text.primary }}
          >
            Get in <Box component="span" sx={{ color: muiTheme.palette.primary.main }}>Touch</Box>
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: muiTheme.palette.primary.main,
              margin: '0 auto 40px',
              borderRadius: 2,
            }}
          />

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  height: '100%',
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
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
                    Contact Information
                  </Typography>
                  
                  <Box sx={{ mt: 4 }}>
                    {/* Email Box */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
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
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <IconButton 
                        sx={{ 
                          mr: 2,
                          background: isDarkMode
                            ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                            : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                          color: '#fff',
                          '&:hover': {
                            background: isDarkMode
                              ? `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.dark})`
                              : `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.main})`,
                          },
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          Yugmagandhi1805@gmail.com
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Phone Box */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
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
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <IconButton 
                        sx={{ 
                          mr: 2,
                          background: isDarkMode
                            ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                            : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                          color: '#fff',
                          '&:hover': {
                            background: isDarkMode
                              ? `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.dark})`
                              : `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.main})`,
                          },
                        }}
                      >
                        <PhoneIcon />
                      </IconButton>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Phone
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          +91 9586063713
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Location Box */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
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
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <IconButton 
                        sx={{ 
                          mr: 2,
                          background: isDarkMode
                            ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                            : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                          color: '#fff',
                          '&:hover': {
                            background: isDarkMode
                              ? `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.dark})`
                              : `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.main})`,
                          },
                        }}
                      >
                        <LocationOnIcon />
                      </IconButton>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body1" sx={{ color: muiTheme.palette.text.primary }}>
                          Gujarat, India
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Social Links */}
                  <Box sx={{ 
                    mt: 4, 
                    display: 'flex', 
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: isDarkMode 
                      ? 'rgba(31, 41, 55, 0.4)'
                      : 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid',
                    borderColor: isDarkMode
                      ? 'rgba(37, 99, 235, 0.1)'
                      : 'rgba(96, 165, 250, 0.1)',
                  }}>
                    <IconButton 
                      component="a" 
                      href="https://github.com/yourname" 
                      target="_blank"
                      sx={{ 
                        background: isDarkMode
                          ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                          : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                        color: '#fff',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          background: isDarkMode
                            ? `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.dark})`
                            : `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.main})`,
                        },
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                    <IconButton 
                      component="a" 
                      href="https://www.linkedin.com/in/yugma18/" 
                      target="_blank"
                      sx={{ 
                        background: isDarkMode
                          ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                          : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                        color: '#fff',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          background: isDarkMode
                            ? `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.dark})`
                            : `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.main})`,
                        },
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
                  Send Me a Message
                </Typography>
                
                {success && (
                  <Alert 
                    severity="success" 
                    sx={{ mb: 3 }}
                  >
                    Your message has been sent successfully! I'll get back to you soon.
                  </Alert>
                )}
                
                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 3 }}
                  >
                    {error}
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: isDarkMode 
                              ? 'rgba(31, 41, 55, 0.4)'
                              : 'rgba(255, 255, 255, 0.7)',
                            '& fieldset': {
                              borderColor: isDarkMode
                                ? 'rgba(37, 99, 235, 0.2)'
                                : 'rgba(96, 165, 250, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: muiTheme.palette.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: muiTheme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: isDarkMode 
                              ? 'rgba(31, 41, 55, 0.4)'
                              : 'rgba(255, 255, 255, 0.7)',
                            '& fieldset': {
                              borderColor: isDarkMode
                                ? 'rgba(37, 99, 235, 0.2)'
                                : 'rgba(96, 165, 250, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: muiTheme.palette.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: muiTheme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: isDarkMode 
                              ? 'rgba(31, 41, 55, 0.4)'
                              : 'rgba(255, 255, 255, 0.7)',
                            '& fieldset': {
                              borderColor: isDarkMode
                                ? 'rgba(37, 99, 235, 0.2)'
                                : 'rgba(96, 165, 250, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: muiTheme.palette.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: muiTheme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                        sx={{ 
                          py: 1.5,
                          px: 4,
                          position: 'relative',
                          overflow: 'hidden',
                          background: isDarkMode
                            ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                            : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            background: isDarkMode
                              ? `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.dark})`
                              : `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.main})`,
                            boxShadow: `0 6px 20px ${isDarkMode 
                              ? 'rgba(37, 99, 235, 0.4)'
                              : 'rgba(96, 165, 250, 0.4)'}`,
                          },
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;