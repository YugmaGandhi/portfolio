import { Box, Typography, useTheme, Tooltip, Zoom, keyframes, Paper, alpha } from '@mui/material';
import { Cloud, Code, DataObject, SettingsEthernet, Storage, Info } from '@mui/icons-material';
import { useState, useEffect } from 'react';

interface ArchitectureDiagramProps {
  isDarkMode: boolean;
  muiTheme: any;
}

// Technical descriptions for tooltips
const layerDescriptions = {
  cloud: "Azure Cloud Environment hosts all services securely with scalability and high availability.",
  frontend: "User interface layer built with React.js, providing responsive UI components and 3D rendering capabilities.",
  state: "Centralized state management using Redux and Context API to handle application data flow.",
  api: "RESTful API layer built with .NET Core, handling client requests and business logic.",
  services: "Cloud services providing authentication, function execution, and application hosting.",
  storage: "Database and storage solutions for structured and unstructured data persistence."
};

// Animation keyframes
const pulse = keyframes`
  0% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.03); }
  100% { opacity: 0.8; transform: scale(1); }
`;

const floatUpDown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ArchitectureDiagram = ({ isDarkMode, muiTheme }: ArchitectureDiagramProps) => {
  // State for active/focused layer
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Start animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Layer configuration with fixed positions
  const layerConfig = {
    frontend: { top: 25, height: 80, zIndex: 5 },
    state: { top: 115, height: 80, zIndex: 4 },
    api: { top: 205, height: 80, zIndex: 3 },
    services: { top: 295, height: 80, zIndex: 2 },
    storage: { top: 385, height: 80, zIndex: 1 }
  };

  // Common styles for layer boxes with fixed positioning
  const getLayerStyle = (layer: string) => ({
    position: 'absolute',
    top: layerConfig[layer as keyof typeof layerConfig].top,
    left: '50%',
    transform: activeLayer === layer ? 
      'translateX(-50%) translateY(-8px)' : 
      'translateX(-50%)',
    width: (() => {
      switch(layer) {
        case 'frontend': return '92%';
        case 'state': return '84%';
        case 'api': return '76%';
        case 'services': return '68%';
        case 'storage': return '60%';
        default: return '70%';
      }
    })(),
    height: layerConfig[layer as keyof typeof layerConfig].height,
    borderRadius: 3,
    p: 2,
    backgroundColor: isDarkMode ? 
      alpha(getLayerColors(layer).bgDark, activeLayer === layer ? 0.95 : 0.85) : 
      alpha(getLayerColors(layer).bgLight, activeLayer === layer ? 0.95 : 0.85),
    border: '1px solid',
    borderColor: getLayerColors(layer).border,
    zIndex: activeLayer === layer ? 20 : layerConfig[layer as keyof typeof layerConfig].zIndex,
    boxShadow: activeLayer === layer ? 
      `0 12px 24px ${alpha('#000', 0.15)}, 0 8px 20px ${alpha(getLayerColors(layer).shadow, 0.4)}` : 
      `0 4px 12px ${alpha('#000', 0.1)}`,
    transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1)',
    cursor: 'pointer',
    animation: !activeLayer && isVisible ? `${floatUpDown} 8s ease-in-out infinite` : 'none',
    animationDelay: (() => {
      switch(layer) {
        case 'frontend': return '0s';
        case 'state': return '1s';
        case 'api': return '2s';
        case 'services': return '3s';
        case 'storage': return '4s';
        default: return '0s';
      }
    })(),
    opacity: isVisible ? 1 : 0,
    '&:hover': {
      transform: 'translateX(-50%) translateY(-8px)',
      boxShadow: `0 15px 30px ${alpha('#000', 0.2)}, 0 8px 25px ${alpha(getLayerColors(layer).shadow, 0.5)}`,
      backgroundColor: isDarkMode ? 
        alpha(getLayerColors(layer).bgDark, 0.95) : 
        alpha(getLayerColors(layer).bgLight, 0.95),
      zIndex: 20,
    },
  });

  // Highlight colors based on theme
  const getLayerColors = (layerKey: string) => {
    const isActive = activeLayer === layerKey;
    
    const colors = {
      cloud: {
        border: isDarkMode ? 
          isActive ? 'rgba(0, 161, 255, 0.8)' : 'rgba(0, 120, 212, 0.6)' : 
          isActive ? 'rgba(0, 145, 255, 0.8)' : 'rgba(80, 162, 221, 0.6)',
        text: isDarkMode ? 
          isActive ? '#00a1ff' : '#0078d4' : 
          isActive ? '#0091ff' : '#50a2dd',
        shadow: 'rgba(0, 120, 212, 0.4)',
        bgDark: '#162635',
        bgLight: '#e6f2fc'
      },
      frontend: {
        border: isDarkMode ? 
          isActive ? 'rgba(255, 140, 33, 0.8)' : 'rgba(255, 111, 0, 0.6)' : 
          isActive ? 'rgba(255, 177, 99, 0.8)' : 'rgba(255, 158, 64, 0.6)',
        text: isDarkMode ? 
          isActive ? '#ff8c21' : '#ff6f00' : 
          isActive ? '#ffb163' : '#ff9e40',
        shadow: 'rgba(255, 111, 0, 0.4)',
        bgDark: '#332616',
        bgLight: '#fff5eb'
      },
      state: {
        border: isDarkMode ? 
          isActive ? 'rgba(211, 68, 227, 0.8)' : 'rgba(156, 39, 176, 0.6)' : 
          isActive ? 'rgba(206, 131, 221, 0.8)' : 'rgba(186, 104, 200, 0.6)',
        text: isDarkMode ? 
          isActive ? '#d344e3' : '#9c27b0' : 
          isActive ? '#ce83dd' : '#ba68c8',
        shadow: 'rgba(156, 39, 176, 0.4)',
        bgDark: '#2a1930',
        bgLight: '#f7ebfa'
      },
      api: {
        border: isDarkMode ? 
          isActive ? 'rgba(24, 198, 255, 0.8)' : 'rgba(3, 169, 244, 0.6)' : 
          isActive ? 'rgba(89, 208, 255, 0.8)' : 'rgba(41, 182, 246, 0.6)',
        text: isDarkMode ? 
          isActive ? '#18c6ff' : '#03a9f4' : 
          isActive ? '#59d0ff' : '#29b6f6',
        shadow: 'rgba(3, 169, 244, 0.4)',
        bgDark: '#152d36',
        bgLight: '#e6f8ff'
      },
      services: {
        border: isDarkMode ? 
          isActive ? 'rgba(0, 161, 255, 0.8)' : 'rgba(0, 120, 212, 0.6)' : 
          isActive ? 'rgba(0, 145, 255, 0.8)' : 'rgba(80, 162, 221, 0.6)',
        text: isDarkMode ? 
          isActive ? '#00a1ff' : '#0078d4' : 
          isActive ? '#0091ff' : '#50a2dd',
        shadow: 'rgba(0, 120, 212, 0.4)',
        bgDark: '#162635',
        bgLight: '#e6f2fc'
      },
      storage: {
        border: isDarkMode ? 
          isActive ? 'rgba(102, 187, 106, 0.8)' : 'rgba(76, 175, 80, 0.6)' : 
          isActive ? 'rgba(129, 199, 132, 0.8)' : 'rgba(102, 187, 106, 0.6)',
        text: isDarkMode ? 
          isActive ? '#66bb6a' : '#4caf50' : 
          isActive ? '#81c784' : '#66bb6a',
        shadow: 'rgba(76, 175, 80, 0.4)',
        bgDark: '#1a2e1b',
        bgLight: '#e8f5e9'
      }
    };
    
    return colors[layerKey as keyof typeof colors];
  };

  const storageOptions = [
    { name: "Document DB", description: "NoSQL document database for storing JSON data" },
    { name: "Blob Storage", description: "Storage for binary and text data like files and images" },
    { name: "Queue Storage", description: "Messaging queue for reliable message delivery between components" }
  ];

  // Style for connection lines
  const getConnectionStyle = (fromLayer: string, toLayer: string, position: 'left' | 'right' | 'center') => {
    const fromTop = layerConfig[fromLayer as keyof typeof layerConfig].top + layerConfig[fromLayer as keyof typeof layerConfig].height;
    const toTop = layerConfig[toLayer as keyof typeof layerConfig].top;
    const height = toTop - fromTop;
    
    return {
      position: 'absolute',
      top: fromTop,
      ...(position === 'left' ? { left: '35%' } : 
         position === 'right' ? { right: '35%' } : 
         { left: '50%', transform: 'translateX(-50%)' }),
      width: 2,
      height: height,
      backgroundImage: `linear-gradient(to bottom, ${getLayerColors(fromLayer).text}, ${getLayerColors(toLayer).text})`,
      opacity: (activeLayer === fromLayer || activeLayer === toLayer) ? 0.9 : 0.5,
      transition: 'opacity 0.3s ease',
      zIndex: 1,
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: -4,
        left: -4,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: getLayerColors(toLayer).text,
        opacity: activeLayer === toLayer ? 1 : 0.7,
        transition: 'all 0.3s ease',
        transform: activeLayer === toLayer ? 'scale(1.3)' : 'scale(1)',
        boxShadow: activeLayer === toLayer ? `0 0 10px ${getLayerColors(toLayer).text}` : 'none'
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: -4,
        left: -4,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: getLayerColors(fromLayer).text,
        opacity: activeLayer === fromLayer ? 1 : 0.7,
        transition: 'all 0.3s ease',
        transform: activeLayer === fromLayer ? 'scale(1.3)' : 'scale(1)',
        boxShadow: activeLayer === fromLayer ? `0 0 10px ${getLayerColors(fromLayer).text}` : 'none'
      }
    };
  };

  // Style for the inner components (React UI, 3D Canvas, etc.)
  const getInnerComponentStyle = (layerKey: string, isActive: boolean) => ({
    border: '1px solid',
    borderColor: isDarkMode ? 
      alpha(getLayerColors(layerKey).text, 0.3) : 
      alpha(getLayerColors(layerKey).text, 0.2),
    borderRadius: 2,
    p: 1,
    height: 42,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? 
      alpha(getLayerColors(layerKey).bgDark, 0.5) : 
      alpha(getLayerColors(layerKey).bgLight, 0.5),
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: isDarkMode ? 
        alpha(getLayerColors(layerKey).bgDark, 0.8) : 
        alpha(getLayerColors(layerKey).bgLight, 0.8),
      transform: 'translateY(-3px)',
      boxShadow: `0 5px 10px ${alpha('#000', 0.1)}`,
      borderColor: getLayerColors(layerKey).text,
    },
  });

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: 520,
      my: 2,
      overflow: 'visible',
      px: { xs: 0.5, sm: 1 },
    }}>
      {/* Azure Cloud Environment - Outer Wrapper */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '98%',
          height: 505,
          borderRadius: 4,
          border: '2px dashed',
          borderColor: getLayerColors('cloud').border,
          backgroundColor: 'transparent',
          zIndex: 0,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s ease-in, opacity 0.5s ease-in',
          cursor: 'pointer',
          '&:hover': {
            borderColor: getLayerColors('cloud').text,
            boxShadow: `0 0 40px ${alpha(getLayerColors('cloud').shadow, 0.15)}`,
          },
        }}
        onClick={() => setActiveLayer(activeLayer === 'cloud' ? null : 'cloud')}
        onMouseEnter={() => !activeLayer && setActiveLayer('cloud')}
        onMouseLeave={() => !activeLayer && setActiveLayer(null)}
      >
        {/* Azure Label */}
        <Tooltip 
          title={
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">Azure Cloud Environment</Typography>
              <Typography variant="body2">{layerDescriptions.cloud}</Typography>
            </Box>
          }
          arrow
          placement="top"
          TransitionComponent={Zoom}
        >
          <Box sx={{
            position: 'absolute',
            top: -14,
            left: { xs: 20, sm: 30 },
            px: 2,
            py: 0.5,
            backgroundColor: isDarkMode ? alpha('#162635', 0.95) : alpha('#e6f2fc', 0.95),
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            zIndex: 5,
            boxShadow: `0 3px 8px ${alpha('#000', 0.1)}`,
            border: '1px solid',
            borderColor: getLayerColors('cloud').border,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: `0 6px 15px ${alpha('#000', 0.15)}`,
              borderColor: getLayerColors('cloud').text,
            },
          }}>
            <Cloud fontSize="small" sx={{ color: getLayerColors('cloud').text }} />
            <Typography variant="body2" fontWeight="bold" sx={{ color: getLayerColors('cloud').text }}>
              Azure Cloud Environment
            </Typography>
          </Box>
        </Tooltip>
      </Box>
      
      {/* Connection Lines */}
      {isVisible && (
        <>
          <Box sx={getConnectionStyle('frontend', 'state', 'left')} />
          <Box sx={getConnectionStyle('frontend', 'state', 'right')} />
          <Box sx={getConnectionStyle('state', 'api', 'center')} />
          <Box sx={getConnectionStyle('api', 'services', 'center')} />
          <Box sx={getConnectionStyle('services', 'storage', 'center')} />
        </>
      )}

      {/* Frontend Layer */}
      <Paper elevation={0} sx={getLayerStyle('frontend')} 
             onClick={() => setActiveLayer(activeLayer === 'frontend' ? null : 'frontend')}
             onMouseEnter={() => !activeLayer && setActiveLayer('frontend')}
             onMouseLeave={() => !activeLayer && setActiveLayer(null)}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ 
            color: getLayerColors('frontend').text, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.8,
          }}>
            <Code fontSize="small" /> Frontend Layer
          </Typography>
          {activeLayer === 'frontend' && (
            <Typography variant="caption" sx={{ color: getLayerColors('frontend').text }}>
              User Interface
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Tooltip title="UI components built with React and Material UI" arrow placement="top">
            <Box sx={{ ...getInnerComponentStyle('frontend', activeLayer === 'frontend'), flex: 1 }}>
              <Typography variant="caption" fontWeight="bold" sx={{ color: muiTheme.palette.text.primary }}>
                React UI
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: muiTheme.palette.text.secondary }}>
                UI Components
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="3D rendering engine for 2D/3D visualization" arrow placement="top">
            <Box sx={{ ...getInnerComponentStyle('frontend', activeLayer === 'frontend'), flex: 1 }}>
              <Typography variant="caption" fontWeight="bold" sx={{ color: muiTheme.palette.text.primary }}>
                3D Canvas
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: muiTheme.palette.text.secondary }}>
                3D Visualization
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Paper>

      {/* State Management Layer */}
      <Paper elevation={0} sx={getLayerStyle('state')}
             onClick={() => setActiveLayer(activeLayer === 'state' ? null : 'state')}
             onMouseEnter={() => !activeLayer && setActiveLayer('state')}
             onMouseLeave={() => !activeLayer && setActiveLayer(null)}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ 
            color: getLayerColors('state').text, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.8,
          }}>
            <DataObject fontSize="small" /> State Management
          </Typography>
          {activeLayer === 'state' && (
            <Typography variant="caption" sx={{ color: getLayerColors('state').text }}>
              Data Flow Control
            </Typography>
          )}
        </Box>
        <Tooltip title="Global state management for consistent data access" arrow placement="top">
          <Box sx={{ 
            ...getInnerComponentStyle('state', activeLayer === 'state'),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2
          }}>
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 'medium', color: muiTheme.palette.text.secondary }}>
              Redux Store
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 'medium', color: muiTheme.palette.text.secondary }}>
              Context API
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 'medium', color: muiTheme.palette.text.secondary }}>
              Toolkit
            </Typography>
          </Box>
        </Tooltip>
      </Paper>

      {/* API Layer */}
      <Paper elevation={0} sx={getLayerStyle('api')}
             onClick={() => setActiveLayer(activeLayer === 'api' ? null : 'api')}
             onMouseEnter={() => !activeLayer && setActiveLayer('api')}
             onMouseLeave={() => !activeLayer && setActiveLayer(null)}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ 
            color: getLayerColors('api').text, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.8,
          }}>
            <SettingsEthernet fontSize="small" /> API Layer
          </Typography>
          {activeLayer === 'api' && (
            <Typography variant="caption" sx={{ color: getLayerColors('api').text }}>
              Business Logic
            </Typography>
          )}
        </Box>
        <Tooltip title="Backend APIs handling business logic and data processing" arrow placement="top">
          <Box sx={{ ...getInnerComponentStyle('api', activeLayer === 'api') }}>
            <Typography variant="body2" fontWeight="medium" sx={{ color: muiTheme.palette.text.primary }}>
              RESTful APIs
            </Typography>
          </Box>
        </Tooltip>
      </Paper>

      {/* Services Layer */}
      <Paper elevation={0} sx={getLayerStyle('services')}
             onClick={() => setActiveLayer(activeLayer === 'services' ? null : 'services')}
             onMouseEnter={() => !activeLayer && setActiveLayer('services')}
             onMouseLeave={() => !activeLayer && setActiveLayer(null)}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ 
            color: getLayerColors('services').text, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.8,
          }}>
            <Cloud fontSize="small" /> Cloud Services
          </Typography>
          {activeLayer === 'services' && (
            <Typography variant="caption" sx={{ color: getLayerColors('services').text }}>
              Infrastructure
            </Typography>
          )}
        </Box>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}>
          {['App Services', 'Functions', 'Authentication'].map((service, index) => (
            <Tooltip
              key={index}
              title={
                index === 0 ? "Web hosting and app scaling services" :
                index === 1 ? "Serverless function execution" :
                "User authentication and authorization"
              }
              arrow
              placement="top"
            >
              <Box sx={{ 
                ...getInnerComponentStyle('services', activeLayer === 'services'), 
                flex: 1,
              }}>
                <Typography variant="caption" fontWeight="medium" sx={{ color: muiTheme.palette.text.secondary }}>
                  {service}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Paper>

      {/* Storage Layer */}
      <Paper elevation={0} sx={getLayerStyle('storage')}
             onClick={() => setActiveLayer(activeLayer === 'storage' ? null : 'storage')}
             onMouseEnter={() => !activeLayer && setActiveLayer('storage')}
             onMouseLeave={() => !activeLayer && setActiveLayer(null)}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ 
            color: getLayerColors('storage').text, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.8,
          }}>
            <Storage fontSize="small" /> Data Storage
          </Typography>
          {activeLayer === 'storage' && (
            <Typography variant="caption" sx={{ color: getLayerColors('storage').text }}>
              Persistence Layer
            </Typography>
          )}
        </Box>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}>
          {storageOptions.map((storage, index) => (
            <Tooltip key={index} title={storage.description} arrow placement="top">
              <Box 
                sx={{ 
                  ...getInnerComponentStyle('storage', activeLayer === 'storage'),
                  flex: 1,
                }}
              >
                <Typography variant="caption" fontWeight="medium" sx={{ color: muiTheme.palette.text.secondary }}>
                  {storage.name}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Paper>
      
      {/* Info notice */}
      <Box sx={{
        position: 'absolute',
        bottom: -15,
        right: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-in 0.8s',
      }}>
        <Info sx={{ fontSize: 14, color: muiTheme.palette.text.secondary }} />
        <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, fontSize: '0.7rem' }}>
          Hover over components to explore the architecture
        </Typography>
      </Box>
    </Box>
  );
};

export default ArchitectureDiagram; 