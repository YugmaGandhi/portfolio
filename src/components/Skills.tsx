import { Box, Container, Typography, Grid, Paper, LinearProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';
import { 
  Code, Storage, Cloud, Security, Speed, Devices, 
  BugReport, Architecture, CollectionsBookmark,
  DataObject, Web, Language
} from '@mui/icons-material';
import React from 'react';

interface SkillProps {
  name: string;
  icon: string;
  level: number;
  index: number;
}

const SkillCard = ({ name, icon, level, index }: SkillProps) => {
  const muiTheme = useTheme();
  const { isDarkMode } = useAppSelector((state) => state.theme);

  const getIcon = () => {
    switch (name) {
      case "React.js":
        return <Web sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Babylon.js":
        return <DataObject sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Node.js":
        return <Storage sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "TypeScript":
        return <Code sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Redux":
        return <Storage sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Azure DevOps":
        return <Cloud sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "React Hook Form":
        return <Architecture sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
      case "Material UI":
        return <Devices sx={{ fontSize: 40, color: muiTheme.palette.primary.main }} />;
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
            ? 'rgba(35, 35, 35, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: `linear-gradient(90deg, 
              ${muiTheme.palette.primary.main}, 
              ${muiTheme.palette.primary.light})`,
            zIndex: 1,
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

  const skillsData = [
    {
      name: "React.js",
      icon: "/icons/react.svg",
      level: 95,
    },
    {
      name: "Babylon.js",
      icon: "/icons/babylon.svg",
      level: 90,
    },
    {
      name: "Node.js",
      icon: "/icons/node.svg",
      level: 85,
    },
    {
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      level: 90,
    },
    {
      name: "Redux",
      icon: "/icons/redux.svg",
      level: 85,
    },
    {
      name: "Azure DevOps",
      icon: "/icons/azure.svg",
      level: 80,
    },
    {
      name: "React Hook Form",
      icon: "/icons/form.svg",
      level: 90,
    },
    {
      name: "Material UI",
      icon: "/icons/mui.svg",
      level: 85,
    },
  ];

  return (
    <Box
      id="skills"
      sx={{
        py: 10,
        background: isDarkMode 
          ? 'linear-gradient(to bottom, #252525, #1A1A1A)' 
          : 'linear-gradient(to bottom, #FAFAFA, #F5F5F5)',
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
            ? 'radial-gradient(circle at 20% 30%, rgba(255, 111, 0, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 111, 0, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 30%, rgba(255, 158, 64, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 158, 64, 0.05) 0%, transparent 50%)',
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
          opacity: 0.02,
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
            My expertise includes modern frontend and backend technologies with a focus on creating 
            efficient and scalable applications.
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {skillsData.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <SkillCard
                name={skill.name}
                icon={skill.icon}
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
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
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
                  ? 'radial-gradient(circle at top right, rgba(255, 134, 20, 0.1), transparent 70%)'
                  : 'radial-gradient(circle at top right, rgba(230, 28, 43, 0.1), transparent 70%)',
                zIndex: 0,
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Speed sx={{ color: muiTheme.palette.primary.main }} />
                <Typography variant="h5" fontWeight="bold" sx={{ color: muiTheme.palette.text.primary }}>
                  Additional Skills
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {[
                  { name: "Express.js", icon: <Storage /> },
                  { name: "REST APIs", icon: <Architecture /> },
                  { name: "CI/CD Pipelines", icon: <Speed /> },
                  { name: "Git/GitHub", icon: <Code /> },
                  { name: "Cosmos DB", icon: <Storage /> },
                  { name: "Azure Services", icon: <Cloud /> },
                  { name: "Testing", icon: <BugReport /> },
                  { name: "Agile Development", icon: <Architecture /> },
                ].map((skill, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Paper
                      sx={{
                        py: 1.5,
                        px: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                      }}
                    >
                      {React.cloneElement(skill.icon, { 
                        sx: { fontSize: 20, color: muiTheme.palette.primary.main }
                      })}
                      <Typography variant="body2" sx={{ color: muiTheme.palette.text.primary }}>
                        {skill.name}
                      </Typography>
                    </Paper>
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
                      backgroundColor: muiTheme.palette.primary.main,
                      color: '#fff',
                      borderRadius: 6,
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
                      backgroundColor: muiTheme.palette.primary.main,
                      color: '#fff',
                      borderRadius: 6,
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