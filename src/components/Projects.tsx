import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, IconButton, useTheme } from '@mui/material';
import { GitHub, Launch, Code, WebAsset, Star, Visibility } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { ThemeState } from '../redux/slices/themeSlice';

interface ProjectCardProps {
  name: string;
  description: string;
  tags: string[];
  image: string;
  source_code_link: string;
  live_demo_link?: string;
  index: number;
}

const ProjectCard = ({ name, description, tags, image, source_code_link, live_demo_link, index }: ProjectCardProps) => {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const muiTheme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ height: '100%', display: 'flex' }}
    >
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          backgroundColor: isDarkMode ? 'rgba(35, 35, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.3s',
          border: '1px solid',
          borderColor: isDarkMode
            ? 'rgba(255, 111, 0, 0.2)'
            : 'rgba(255, 158, 64, 0.2)',
          '&:hover': {
            transform: 'translateY(-5px)',
            borderColor: isDarkMode
              ? 'rgba(255, 111, 0, 0.5)'
              : 'rgba(255, 158, 64, 0.5)',
            '&::before': {
              opacity: 1,
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `radial-gradient(circle at 30% 20%, ${isDarkMode ? 'rgba(255, 111, 0, 0.05)' : 'rgba(255, 158, 64, 0.05)'}, transparent 50%)`,
            opacity: 0.5,
            zIndex: 0,
            transition: 'opacity 0.3s',
          },
        }}
      >
        {/* Project Image */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={name}
            sx={{
              objectFit: 'cover',
              borderBottom: '1px solid',
              borderColor: isDarkMode
                ? 'rgba(255, 111, 0, 0.2)'
                : 'rgba(255, 158, 64, 0.2)',
              filter: isDarkMode ? 'brightness(0.8)' : 'none'
            }}
          />
          
          {/* GitHub Link */}
          <IconButton
            aria-label="github"
            component="a"
            href={source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              color: muiTheme.palette.primary.main,
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(245, 245, 245, 0.9)',
              },
            }}
          >
            <GitHub />
          </IconButton>
          
          {/* Live Demo Link */}
          {live_demo_link && (
            <IconButton
              aria-label="live demo"
              component="a"
              href={live_demo_link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                position: 'absolute',
                top: 8,
                right: 56,
                backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                color: muiTheme.palette.info.main,
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(245, 245, 245, 0.9)',
                },
              }}
            >
              <Launch />
            </IconButton>
          )}
        </Box>
        
        {/* Content */}
        <CardContent sx={{ 
          flexGrow: 1, 
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3
        }}>
          <Typography 
            variant="h6" 
            component="h3" 
            fontWeight="bold" 
            gutterBottom
            sx={{ color: muiTheme.palette.text.primary }}
          >
            {name}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2,
              flexGrow: 1,
              color: muiTheme.palette.text.secondary
            }}
          >
            {description}
          </Typography>
          
          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: isDarkMode
                    ? 'rgba(255, 111, 0, 0.1)'
                    : 'rgba(255, 158, 64, 0.1)',
                  color: muiTheme.palette.primary.main,
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const muiTheme = useTheme();

  const projects = [
    {
      name: "3D Portfolio Website",
      description: "A modern portfolio website featuring 3D animations, interactive elements, and responsive design. Built with React, Three.js, and Material UI.",
      tags: ["React", "Three.js", "Material UI", "Framer Motion"],
      image: "/images/projects/portfolio.jpg",
      source_code_link: "https://github.com/yourusername/portfolio",
      live_demo_link: "https://yourportfolio.com",
    },
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce platform with user authentication, product management, and payment integration using Stripe.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/images/projects/ecommerce.jpg",
      source_code_link: "https://github.com/yourusername/ecommerce",
      live_demo_link: "https://yourecommerce.com",
    },
    {
      name: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tags: ["React", "Firebase", "Material UI", "Redux"],
      image: "/images/projects/taskapp.jpg",
      source_code_link: "https://github.com/yourusername/taskapp",
    },
  ];

  return (
    <Box
      id="projects"
      sx={{
        py: 10,
        background: isDarkMode
          ? 'linear-gradient(to bottom, #1A1A1A, #121212)'
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
          <Typography
            variant="h3"
            component="h2"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: muiTheme.palette.text.primary, position: 'relative', zIndex: 1 }}
          >
            Featured <Box component="span" sx={{ color: muiTheme.palette.primary.main }}>Projects</Box>
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: muiTheme.palette.primary.main,
              margin: '0 auto 40px',
              borderRadius: 2,
              position: 'relative',
              zIndex: 1,
            }}
          />
        </motion.div>

        <Grid container spacing={4} alignItems="stretch">
          {projects.map((project, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <ProjectCard
                name={project.name}
                description={project.description}
                tags={project.tags}
                image={project.image}
                source_code_link={project.source_code_link}
                live_demo_link={project.live_demo_link}
                index={index}
              />
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
              mt: 6, 
              position: 'relative', 
              zIndex: 1 
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component="a"
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHub />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                fontWeight: 'bold',
                boxShadow: isDarkMode 
                  ? '0 8px 20px rgba(255, 111, 0, 0.3)'
                  : '0 8px 20px rgba(255, 158, 64, 0.3)',
              }}
            >
              View More Projects
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Projects; 