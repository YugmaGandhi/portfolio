import { Box, Container, Typography, Grid, Paper, LinearProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';
import { 
  Code, Storage, Cloud, Speed, 
  BugReport, Architecture, CollectionsBookmark,
  Web, Api, Security,
  Search, Dataset, Storage as StorageIcon,
  IntegrationInstructions
} from '@mui/icons-material';
import React from 'react';

interface SkillProps {
  name: string;
  level: number;
  index: number;
}

const SkillCard = ({ name, level, index }: SkillProps) => {
  const muiTheme = useTheme();
  const { isDarkMode } = useAppSelector((state) => state.theme);

  const getIcon = () => {
    switch (name) {
      case "React.js":
        return <Web sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Node.js":
        return <Storage sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Express.js":
        return <Speed sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "MongoDB":
        return <Dataset sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "TypeScript":
        return <Code sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Azure DevOps":
        return <Cloud sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "CI/CD Pipelines":
        return <Architecture sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Git/GitHub":
        return <IntegrationInstructions sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "AI Indexing":
        return <Search sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Semantic Search":
        return <Search sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Azure AI Search":
        return <Search sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Cosmos DB":
        return <StorageIcon sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Azure Storage":
        return <StorageIcon sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "REST APIs":
        return <Api sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Authentication":
        return <Security sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      default:
        return <CollectionsBookmark sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ height: '100%' }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            mr: 2, 
            width: 40, 
            height: 40, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            {getIcon()}
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: muiTheme.palette.text.primary }}>
            {name}
          </Typography>
        </Box>
        
        <Box sx={{ width: '100%', mt: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Proficiency
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {level}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={level} 
            sx={{ 
              height: 8, 
              borderRadius: 5,
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                borderRadius: 5,
              },
            }} 
          />
        </Box>
      </Paper>
    </motion.div>
  );
};

const Skills = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme) as ThemeState;
  const muiTheme = useTheme();

  // Main top skill cards
  const skillsData = [
    {
      name: "React.js",
      level: 95,
    },
    {
      name: "Node.js",
      level: 70,
    },
    {
      name: "TypeScript",
      level: 70,
    },
    {
      name: "MongoDB",
      level: 60,
    },
    {
      name: "Azure DevOps",
      level: 85,
    },
    {
      name: "REST APIs",
      level: 90,
    },
    {
      name: "Cosmos DB",
      level: 80,
    },
    {
      name: "Azure AI Search",
      level: 70,
    },
  ];

  // Skill categories for the sections below
  const skillCategories = [
    {
      title: "Full-Stack Development",
      icon: <Code />,
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Babylon.js"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud />,
      skills: ["Azure DevOps", "Azure Portal", "CI/CD Pipelines", "Git/GitHub"]
    },
    {
      title: "AI & Search",
      icon: <Search />,
      skills: ["AI Indexing", "Semantic Search", "Azure AI Search"]
    },
    {
      title: "Storage & Databases",
      icon: <Dataset />,
      skills: ["Cosmos DB", "Azure Blobs", "Azure Queues", "Azure Tables"]
    },
    {
      title: "Backend Services",
      icon: <Api />,
      skills: ["REST APIs", "Authentication", "Authorization"]
    },
    {
      title: "Testing & Development",
      icon: <BugReport />,
      skills: ["Unit Testing", "Integration Testing", "Agile Development"]
    }
  ];

  return (
    <Box
      id="skills"
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
          <Box sx={{ position: 'relative', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              fontWeight="bold"
              gutterBottom
              sx={{ color: muiTheme.palette.text.primary }}
            >
              Technical <Box component="span" sx={{ color: muiTheme.palette.primary.main }}>Skills</Box>
            </Typography>

            <Box
              sx={{
                width: 60,
                height: 4,
                backgroundColor: muiTheme.palette.primary.main,
                margin: '0 auto 12px',
                borderRadius: 2,
                position: 'relative',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: muiTheme.palette.primary.main,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  boxShadow: isDarkMode
                    ? '0 0 10px rgba(255, 134, 20, 0.5)'
                    : '0 0 10px rgba(230, 28, 43, 0.5)',
                },
                '&::before': {
                  left: -12,
                },
                '&::after': {
                  right: -12,
                },
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                top: -30,
                right: 20,
                width: 50,
                height: 50,
                backgroundImage: isDarkMode
                  ? 'url("/icons/naruto-icon.png")'
                  : 'url("/icons/onepiece-icon.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                opacity: 0.7,
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': {
                    transform: 'translateY(0) rotate(0deg)',
                  },
                  '50%': {
                    transform: 'translateY(-10px) rotate(5deg)',
                  },
                },
              }}
            />
          </Box>

          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            My expertise includes modern full-stack development, cloud services, AI solutions, and DevOps practices
            with a focus on creating efficient and scalable applications.
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {skillsData.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <SkillCard
                name={skill.name}
                level={skill.level}
                index={index}
              />
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={4}
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 2,
              backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: isDarkMode
                ? 'rgba(37, 99, 235, 0.2)'
                : 'rgba(96, 165, 250, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Speed sx={{ color: muiTheme.palette.primary.main }} />
                <Typography variant="h5" fontWeight="bold" sx={{ color: muiTheme.palette.text.primary }}>
                  Core Skill Areas
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {skillCategories.map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          height: '100%',
                          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                          borderRadius: 2,
                          position: 'relative',
                          overflow: 'hidden',
                          border: '1px solid',
                          borderColor: isDarkMode
                            ? 'rgba(37, 99, 235, 0.2)'
                            : 'rgba(96, 165, 250, 0.2)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: isDarkMode
                              ? 'rgba(37, 99, 235, 0.5)'
                              : 'rgba(96, 165, 250, 0.5)',
                            boxShadow: isDarkMode
                              ? '0 4px 12px -4px rgba(37, 99, 235, 0.3)'
                              : '0 4px 12px -4px rgba(96, 165, 250, 0.3)',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          {React.cloneElement(category.icon, { 
                            sx: { fontSize: 24, color: muiTheme.palette.primary.main }
                          })}
                          <Typography variant="h6" fontWeight="bold" sx={{ color: muiTheme.palette.text.primary }}>
                            {category.title}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {category.skills.map((skill, skillIndex) => (
                            <Paper
                              key={skillIndex}
                              sx={{
                                py: 1,
                                px: 2,
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: isDarkMode 
                                  ? 'rgba(31, 41, 55, 0.4)'
                                  : 'rgba(255, 255, 255, 0.7)',
                                borderRadius: 1,
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
                              }}
                            >
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: muiTheme.palette.text.primary,
                                  fontWeight: skillsData.some(s => s.name === skill) ? 'bold' : 'normal'
                                }}
                              >
                                {skill}
                              </Typography>
                            </Paper>
                          ))}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
                  Certifications
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                  <Paper
                    sx={{
                      py: 1.5,
                      px: 3,
                      background: isDarkMode
                        ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                        : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                      color: '#fff',
                      borderRadius: 6,
                      boxShadow: `0 4px 14px ${isDarkMode 
                        ? 'rgba(37, 99, 235, 0.4)'
                        : 'rgba(96, 165, 250, 0.4)'}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 20px ${isDarkMode 
                          ? 'rgba(37, 99, 235, 0.5)'
                          : 'rgba(96, 165, 250, 0.5)'}`,
                      },
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      AZ-900 (Azure Fundamentals)
                    </Typography>
                  </Paper>
                  <Paper
                    sx={{
                      py: 1.5,
                      px: 3,
                      background: isDarkMode
                        ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                        : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                      color: '#fff',
                      borderRadius: 6,
                      boxShadow: `0 4px 14px ${isDarkMode 
                        ? 'rgba(37, 99, 235, 0.4)'
                        : 'rgba(96, 165, 250, 0.4)'}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 20px ${isDarkMode 
                          ? 'rgba(37, 99, 235, 0.5)'
                          : 'rgba(96, 165, 250, 0.5)'}`,
                      },
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      AZ-104 (Azure Administrator)
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills;