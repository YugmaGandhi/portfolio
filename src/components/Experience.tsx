import { Box, Container, Typography, Paper, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';

// Experience data
const experienceData = [
  {
    title: "Senior Software Developer",
    company: "Ansibyte Code LLP",
    date: "Sep 2023 - Present",
    points: [
      "Working on Cloud Play Creator project built with React.js and Babylon.js",
      "Migrated entire frontend libraries to their latest versions including React, React Hook Form, Blueprint.js, and Babylon.js",
      "Leading client calls and mentoring team members",
      "Built CI/CD pipelines for frontend in Azure",
      "Provided internal and external training on various technologies"
    ],
  },
  {
    title: "Software Developer",
    company: "Infosys",
    date: "Jul 2022 - Sep 2023",
    points: [
      "Worked on Node.js and Express.js backend development",
      "Responsible for making changes to APIs and data models based on frontend requirements",
      "Collaborated with cross-functional teams for project delivery",
      "Gained experience with JavaScript fundamentals and backend development"
    ],
  }
];

const Experience = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();

  return (
    <Box
      id="experience"
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
            sx={{ color: muiTheme.palette.text.primary }}
          >
            Work <Box component="span" sx={{ color: muiTheme.palette.primary.main }}>Experience</Box>
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: muiTheme.palette.primary.main,
              margin: '0 auto 60px',
              borderRadius: 2,
            }}
          />
        </motion.div>

        <Grid container spacing={4}>
          {experienceData.map((experience, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: isDarkMode 
                      ? 'rgba(35, 35, 35, 0.8)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderTop: `4px solid ${muiTheme.palette.primary.main}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      background: isDarkMode
                        ? 'radial-gradient(circle at top right, rgba(255, 111, 0, 0.1), transparent 70%)'
                        : 'radial-gradient(circle at top right, rgba(255, 158, 64, 0.1), transparent 70%)',
                      zIndex: 0,
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
                      {experience.title}
                    </Typography>
                    
                    <Box 
                      sx={{ 
                        display: 'inline-block',
                        px: 2,
                        py: 0.5, 
                        mb: 2,
                        borderRadius: 5,
                        backgroundColor: muiTheme.palette.primary.main,
                        color: '#fff'
                      }}
                    >
                      <Typography variant="body2" fontWeight="medium">
                        {experience.company}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      color="textSecondary" 
                      sx={{ mb: 3, display: 'block' }}
                    >
                      {experience.date}
                    </Typography>
                    
                    <Box component="ul" sx={{ pl: 2 }}>
                      {experience.points.map((point, i) => (
                        <Box 
                          component="li" 
                          key={i} 
                          sx={{ 
                            mb: 1.5,
                            color: muiTheme.palette.text.secondary
                          }}
                        >
                          <Typography variant="body2">
                            {point}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box 
            sx={{ 
              textAlign: 'center', 
              maxWidth: 700,
              mx: 'auto',
              mt: 6,
              px: 2
            }}
          >
            <Typography color="textSecondary">
              With expertise in both frontend and backend technologies, I bring a comprehensive skill set
              to solve complex development challenges efficiently.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Experience;