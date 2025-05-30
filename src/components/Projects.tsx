import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, IconButton, useTheme, Collapse, Paper } from '@mui/material';
import { GitHub, Launch, Work, Business, ExpandMore, ExpandLess, Architecture } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/redux';
import { useState } from 'react';
import ArchitectureDiagram from './ArchitectureDiagram';

interface ProjectData {
  name: string;
  description: string;
  tags: string[];
  image: string;
  source_code_link: string;
  live_demo_link?: string;
  type: 'personal' | 'professional';
  company?: string;
  techStack?: {category: string; items: string[]}[];
}

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
          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid',
          borderColor: isDarkMode
            ? 'rgba(37, 99, 235, 0.2)'
            : 'rgba(96, 165, 250, 0.2)',
          '&:hover': {
            transform: 'translateY(-5px)',
            borderColor: isDarkMode
              ? 'rgba(37, 99, 235, 0.5)'
              : 'rgba(96, 165, 250, 0.5)',
            boxShadow: isDarkMode
              ? '0 10px 30px -10px rgba(37, 99, 235, 0.3)'
              : '0 10px 30px -10px rgba(96, 165, 250, 0.3)',
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
            backgroundImage: `radial-gradient(circle at 30% 20%, ${isDarkMode ? 'rgba(37, 99, 235, 0.08)' : 'rgba(96, 165, 250, 0.08)'}, transparent 50%)`,
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
            disabled //once you have a link, remove this line
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
              disabled //once you have a link, remove this line
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
                    ? 'rgba(37, 99, 235, 0.1)'
                    : 'rgba(96, 165, 250, 0.1)',
                  color: isDarkMode 
                    ? muiTheme.palette.primary.light 
                    : muiTheme.palette.primary.main,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: isDarkMode
                    ? 'rgba(37, 99, 235, 0.2)'
                    : 'rgba(96, 165, 250, 0.2)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode
                      ? 'rgba(37, 99, 235, 0.2)'
                      : 'rgba(96, 165, 250, 0.2)',
                    transform: 'translateY(-1px)',
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// New component for professional projects
interface ProfessionalProjectCardProps {
  name: string;
  description: string;
  tags: string[];
  image: string;
  company: string;
  techStack: {category: string; items: string[]}[];
  index: number;
}

const ProfessionalProjectCard = ({ name, description, tags, image, company, techStack, index }: ProfessionalProjectCardProps) => {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const muiTheme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleArchitectureClick = () => {
    setShowArchitecture(!showArchitecture);
  };

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
          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid',
          borderColor: isDarkMode
            ? 'rgba(37, 99, 235, 0.2)'
            : 'rgba(96, 165, 250, 0.2)',
          '&:hover': {
            transform: 'translateY(-5px)',
            borderColor: isDarkMode
              ? 'rgba(37, 99, 235, 0.5)'
              : 'rgba(96, 165, 250, 0.5)',
            boxShadow: isDarkMode
              ? '0 10px 30px -10px rgba(37, 99, 235, 0.3)'
              : '0 10px 30px -10px rgba(96, 165, 250, 0.3)',
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
            backgroundImage: `radial-gradient(circle at 30% 20%, ${isDarkMode ? 'rgba(37, 99, 235, 0.08)' : 'rgba(96, 165, 250, 0.08)'}, transparent 50%)`,
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
          
          {/* Professional Project Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: muiTheme.palette.secondary.main,
              color: '#fff',
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
          >
            <Business fontSize="small" />
            <Typography variant="caption" fontWeight="bold">
              Professional Project
            </Typography>
          </Box>
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Work sx={{ color: muiTheme.palette.secondary.main, fontSize: 18, mr: 1 }} />
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: muiTheme.palette.text.secondary }}>
              {company}
            </Typography>
          </Box>
          
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

          {/* Architecture Diagram Button */}
          <Box sx={{ mb: 1 }}>
            <Button 
              onClick={handleArchitectureClick}
              size="small"
              startIcon={<Architecture fontSize="small" />} // Added icon
              endIcon={showArchitecture ? <ExpandLess /> : <ExpandMore />}
              sx={{ 
                textTransform: 'none',
                color: muiTheme.palette.secondary.main,
                borderRadius: 2,
                px: 2,
                py: 0.75,
                backgroundColor: isDarkMode
                  ? 'rgba(37, 99, 235, 0.1)'
                  : 'rgba(96, 165, 250, 0.1)',
                border: '1px solid',
                borderColor: isDarkMode
                  ? 'rgba(37, 99, 235, 0.2)'
                  : 'rgba(96, 165, 250, 0.2)',
                '&:hover': {
                  backgroundColor: isDarkMode 
                    ? 'rgba(37, 99, 235, 0.2)'
                    : 'rgba(96, 165, 250, 0.2)',
                }
              }}
            >
              {showArchitecture ? "Hide Architecture" : "View Architecture"}
            </Button>
            
            <Collapse in={showArchitecture} timeout="auto" unmountOnExit>
              <Box sx={{ mb: 2 }}>
                <ArchitectureDiagram isDarkMode={isDarkMode} muiTheme={muiTheme} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1, fontSize: '0.7rem' }}>
                  Complex data flow between React components and Babylon.js canvas with 2D/3D elements and file format support
                </Typography>
              </Box>
            </Collapse>
          </Box>
          
          {/* Expandable Tech Stack Section */}
          <Box sx={{ mb: 2 }}>
            <Button 
              onClick={handleExpandClick}
              size="small"
              startIcon={<Architecture fontSize="small" />}
              endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
              sx={{ 
                textTransform: 'none',
                color: muiTheme.palette.primary.main,
                borderRadius: 2,
                px: 2,
                py: 0.75,
                backgroundColor: isDarkMode
                  ? 'rgba(37, 99, 235, 0.1)'
                  : 'rgba(96, 165, 250, 0.1)',
                border: '1px solid',
                borderColor: isDarkMode
                  ? 'rgba(37, 99, 235, 0.2)'
                  : 'rgba(96, 165, 250, 0.2)',
                '&:hover': {
                  backgroundColor: isDarkMode 
                    ? 'rgba(37, 99, 235, 0.2)'
                    : 'rgba(96, 165, 250, 0.2)',
                }
              }}
            >
              {expanded ? "Hide Technical Details" : "View Technical Details"}
            </Button>
            
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box sx={{ 
                mt: 2,
                backgroundColor: isDarkMode 
                  ? 'rgba(31, 41, 55, 0.4)'
                  : 'rgba(255, 255, 255, 0.7)',
                borderRadius: 3,
                p: 3,
                border: '1px solid',
                borderColor: isDarkMode
                  ? 'rgba(37, 99, 235, 0.2)'
                  : 'rgba(96, 165, 250, 0.2)',
                transition: 'all 0.2s ease',
              }}>
                <Grid container spacing={3}>
                  {techStack.map((category, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: '100%',
                          backgroundColor: isDarkMode 
                            ? 'rgba(31, 41, 55, 0.6)'
                            : 'rgba(255, 255, 255, 0.9)',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: isDarkMode
                            ? 'rgba(37, 99, 235, 0.15)'
                            : 'rgba(96, 165, 250, 0.15)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: isDarkMode 
                              ? 'rgba(31, 41, 55, 0.7)'
                              : 'rgba(255, 255, 255, 1)',
                            borderColor: isDarkMode
                              ? 'rgba(37, 99, 235, 0.3)'
                              : 'rgba(96, 165, 250, 0.3)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Typography 
                          variant="subtitle2" 
                          fontWeight="bold" 
                          sx={{ 
                            color: isDarkMode 
                              ? muiTheme.palette.primary.light 
                              : muiTheme.palette.primary.main,
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            mb: 2,
                            pb: 1,
                            borderBottom: '1px solid',
                            borderColor: isDarkMode
                              ? 'rgba(37, 99, 235, 0.1)'
                              : 'rgba(96, 165, 250, 0.1)',
                          }}
                        >
                          <Architecture fontSize="small" />
                          {category.category}
                        </Typography>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 1,
                            '& > *': { // This ensures even spacing between chips
                              mb: 0.5,
                              mr: 0.5,
                              flexGrow: 0,
                            }
                          }}
                        >
                          {category.items.map((item, itemIdx) => (
                            <Chip
                              key={itemIdx}
                              label={item}
                              size="small"
                              sx={{
                                backgroundColor: isDarkMode
                                  ? 'rgba(37, 99, 235, 0.1)'
                                  : 'rgba(96, 165, 250, 0.1)',
                                color: isDarkMode 
                                  ? muiTheme.palette.primary.light 
                                  : muiTheme.palette.primary.main,
                                borderRadius: '6px',
                                border: '1px solid',
                                borderColor: isDarkMode
                                  ? 'rgba(37, 99, 235, 0.2)'
                                  : 'rgba(96, 165, 250, 0.2)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: isDarkMode
                                    ? 'rgba(37, 99, 235, 0.2)'
                                    : 'rgba(96, 165, 250, 0.2)',
                                  transform: 'translateY(-1px)',
                                  borderColor: isDarkMode
                                    ? 'rgba(37, 99, 235, 0.3)'
                                    : 'rgba(96, 165, 250, 0.3)',
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Collapse>
          </Box>
          
          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: isDarkMode
                    ? 'rgba(37, 99, 235, 0.1)'
                    : 'rgba(96, 165, 250, 0.1)',
                  color: isDarkMode 
                    ? muiTheme.palette.primary.light 
                    : muiTheme.palette.primary.main,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: isDarkMode
                    ? 'rgba(37, 99, 235, 0.2)'
                    : 'rgba(96, 165, 250, 0.2)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode
                      ? 'rgba(37, 99, 235, 0.2)'
                      : 'rgba(96, 165, 250, 0.2)',
                    transform: 'translateY(-1px)',
                  },
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

  const projects: ProjectData[] = [
    {
      name: "Document Semantic Search",
      description: "Custom document search engine with natural language processing capabilities. Built with React and TensorFlow.js for intelligent semantic text analysis and retrieval across document collections.",
      tags: ["React", "Material UI", "TensorFlow.js", "NLP", "State Management"],
      image: "/images/projects/SemanticSearch.png", 
      source_code_link: "https://github.com/yourusername/semantic-search",
      live_demo_link: "https://semantic-search-demo.com",
      type: "personal"
    },
    {
      name: "Money Management App",
      description: "Personal finance application with budget tracking, expense categorization, and visualization tools to help users manage their finances effectively.",
      tags: ["React", "TypeScript", "Material UI", "Chart.js"],
      image: "/images/projects/ecommerce.png",
      source_code_link: "https://github.com/yourusername/money-management",
      live_demo_link: "https://money-management-app.com",
      type: "personal"
    },
    {
      name: "Cloud Play Creator",
      description: "Professional 3D visualization platform enabling users to create, manipulate and export interactive cloud-based 3D scenes. Features include real-time collaboration, 2D/3D rendering with DXF and GLB file support, and dynamic document generation.",
      tags: ["React", "Babylon.js", ".NET", "Azure", "Cosmos DB"],
      image: "/images/projects/CloudPlayCreator.png",
      source_code_link: "", // Empty but required by the type
      company: "Ansibyte Code LLP",
      techStack: [
        {
          category: "Frontend",
          items: ["React.js", "TypeScript", "Babylon.js", "Blueprint.js", "React Hook Form"]
        },
        {
          category: "3D/2D Capabilities",
          items: ["DXF Import", "GLB Models", "Position Accuracy", "Lines", "Rectangles", "Polygons"]
        },
        {
          category: "Backend",
          items: [".NET Core", "RESTful APIs", "Azure Services", "Authentication"]
        },
        {
          category: "Database & Storage",
          items: ["Cosmos DB", "Azure Blob Storage", "Queue Storage", "Table Storage"]
        },
        {
          category: "Document Generation",
          items: ["jsPDF", "HTML Canvas", "Custom PDF Templates"]
        },
        {
          category: "State Management",
          items: ["Redux", "Redux Toolkit", "Context API"]
        }
      ],
      type: "professional"
    }
  ];

  // Filter personal and professional projects
  const personalProjects = projects.filter(project => project.type === "personal");
  const professionalProjects = projects.filter(project => project.type === "professional") as Array<ProjectData & {
    company: string;
    techStack: {category: string; items: string[]}[];
  }>;

  return (
    <Box
      id="projects"
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

        {/* Personal Projects Section */}
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          {personalProjects.map((project, index) => (
            <Grid item xs={12} sm={10} md={6} lg={5} key={index} sx={{ display: 'flex' }}>
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

        {/* Professional Projects Section */}
        {professionalProjects.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h4"
                align="center"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  color: muiTheme.palette.text.primary, 
                  position: 'relative', 
                  zIndex: 1,
                  mb: 3
                }}
              >
                Professional <Box component="span" sx={{ color: muiTheme.palette.secondary.main }}>Experience</Box>
              </Typography>
            </motion.div>

            <Grid container spacing={4} alignItems="stretch" justifyContent="center">
              {professionalProjects.map((project, index) => (
                <Grid item xs={12} sm={10} md={8} key={index} sx={{ display: 'flex' }}>
                  <ProfessionalProjectCard
                    name={project.name}
                    description={project.description}
                    tags={project.tags}
                    image={project.image}
                    company={project.company}
                    techStack={project.techStack}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

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
                background: isDarkMode
                  ? `linear-gradient(135deg, ${muiTheme.palette.primary.dark}, ${muiTheme.palette.primary.main})`
                  : `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.light})`,
                boxShadow: `0 4px 14px ${isDarkMode 
                  ? 'rgba(37, 99, 235, 0.4)'
                  : 'rgba(96, 165, 250, 0.4)'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  background: isDarkMode
                    ? `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.primary.dark})`
                    : `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.main})`,
                  boxShadow: `0 6px 20px ${isDarkMode 
                    ? 'rgba(37, 99, 235, 0.5)'
                    : 'rgba(96, 165, 250, 0.5)'}`,
                },
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