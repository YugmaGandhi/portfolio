import { Box, Typography, Tooltip, Zoom, keyframes, Paper, alpha } from '@mui/material';
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

const floatUpDown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

const ArchitectureDiagram = ({ isDarkMode, muiTheme }: ArchitectureDiagramProps) => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Start animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Highlight colors based on theme
  const getLayerColors = (layerKey: string) => {
    // Use activeLayer if set, else hoveredLayer
    const isActive = hoveredLayer === layerKey;
    
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

  // Style for the inner components (React UI, 3D Canvas, etc.)
  const getInnerComponentStyle = (layerKey: string) => ({
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

  // SVG cloud background
  const CloudBackground = () => (
    <svg
      width="100%"
      height="220"
      viewBox="0 0 900 220"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isDarkMode ? '#1e2a3a' : '#e6f2fc'} stopOpacity="0.7" />
          <stop offset="100%" stopColor={isDarkMode ? '#162635' : '#b3e0ff'} stopOpacity="0.3" />
        </linearGradient>
        <filter id="cloudBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <ellipse
        cx="450"
        cy="110"
        rx="420"
        ry="90"
        fill="url(#cloudGradient)"
        filter="url(#cloudBlur)"
      />
    </svg>
  );

  // --- Reusable LayerInnerItem component ---
  const LayerInnerItem = ({
    title,
    subtitle,
    tooltip,
    sx,
    onMouseEnter,
    onMouseLeave,
    children
  }: {
    title: string;
    subtitle?: string;
    tooltip?: string;
    sx?: any;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    children?: React.ReactNode;
  }) => (
    <Tooltip title={tooltip || ''} arrow placement="top">
      <Box sx={sx} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Typography variant="caption" fontWeight="bold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
            {subtitle}
          </Typography>
        )}
        {children}
      </Box>
    </Tooltip>
  );

  // --- Reusable LayerCard component ---
  const LayerCard = ({
    icon,
    title,
    subtitle,
    color,
    width,
    background,
    borderColor,
    shadow,
    animation,
    hovered,
    onMouseEnter,
    onMouseLeave,
    children
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    color: string;
    width: string;
    background: string;
    borderColor: string;
    shadow: string;
    animation: string;
    hovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    children: React.ReactNode;
  }) => (
    <Paper elevation={0} sx={{
      width,
      borderRadius: 3,
      p: 2,
      background,
      backdropFilter: 'blur(6px)',
      border: '1px solid',
      borderColor,
      boxShadow: `0 4px 24px ${shadow}`,
      transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1)',
      cursor: 'pointer',
      opacity: 1,
      animation,
      '&:hover': {
        boxShadow: `0 15px 30px ${shadow}`,
        background,
        zIndex: 20,
        transform: hovered ? 'perspective(600px) rotateY(6deg) scale(1.03)' : undefined,
      },
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ color, display: 'flex', alignItems: 'center', gap: 0.8 }}>
          {icon} {title}
        </Typography>
        {hovered && subtitle && (
          <Typography variant="caption" sx={{ color }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {children}
    </Paper>
  );

  return (
    <Box sx={{
      width: '100%',
      my: 2,
      overflow: 'visible',
      px: { xs: 0.5, sm: 1 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      position: 'relative',
      minHeight: 420,
    }}>
      {/* Animated SVG cloud background */}
      <CloudBackground />
      {/* Azure Cloud Environment - Outer Wrapper */}
      <Box
        sx={{
          width: '98%',
          borderRadius: 4,
          border: '2px dashed',
          borderColor: getLayerColors('cloud').border,
          background: isDarkMode
            ? 'rgba(22,38,53,0.7)'
            : 'rgba(230,242,252,0.7)',
          backdropFilter: 'blur(8px)', // Glassmorphism
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s ease-in, opacity 0.5s ease-in',
          cursor: 'pointer',
          mb: 2,
          position: 'relative',
        }}
        onMouseEnter={() => setHoveredLayer('cloud')}
        onMouseLeave={() => setHoveredLayer(null)}
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
        {/* Stack layers vertically inside the cloud wrapper */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          py: 4,
        }}>
          {/* Frontend Layer */}
          <LayerCard
            icon={<Code fontSize="small" />}
            title="Frontend Layer"
            subtitle="User Interface"
            color={getLayerColors('frontend').text}
            width="92%"
            background={isDarkMode ? 'rgba(51,38,22,0.6)' : 'rgba(255,245,235,0.6)'}
            borderColor={getLayerColors('frontend').border}
            shadow={alpha('#000', 0.12)}
            animation={`${floatUpDown} 3.5s ease-in-out infinite`}
            hovered={hoveredLayer === 'frontend'}
            onMouseEnter={() => setHoveredLayer('frontend')}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <LayerInnerItem
                title="React UI"
                subtitle="UI Components"
                tooltip="UI components built with React and Material UI"
                sx={{ ...getInnerComponentStyle('frontend'), flex: 1 }}
              />
              <LayerInnerItem
                title="3D Canvas"
                subtitle="3D Visualization"
                tooltip="3D rendering engine for 2D/3D visualization"
                sx={{ ...getInnerComponentStyle('frontend'), flex: 1 }}
              />
            </Box>
          </LayerCard>
          {/* State Management Layer */}
          <LayerCard
            icon={<DataObject fontSize="small" />}
            title="State Management"
            subtitle="Data Flow Control"
            color={getLayerColors('state').text}
            width="84%"
            background={isDarkMode ? 'rgba(42,25,48,0.6)' : 'rgba(247,235,250,0.6)'}
            borderColor={getLayerColors('state').border}
            shadow={alpha('#000', 0.12)}
            animation={`${floatUpDown} 3.7s ease-in-out infinite`}
            hovered={hoveredLayer === 'state'}
            onMouseEnter={() => setHoveredLayer('state')}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <Tooltip title="Global state management for consistent data access" arrow placement="top">
              <Box sx={{ 
                ...getInnerComponentStyle('state'),
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
          </LayerCard>
          {/* API Layer */}
          <LayerCard
            icon={<SettingsEthernet fontSize="small" />}
            title="API Layer"
            subtitle="Business Logic"
            color={getLayerColors('api').text}
            width="76%"
            background={isDarkMode ? 'rgba(21,45,54,0.6)' : 'rgba(230,248,255,0.6)'}
            borderColor={getLayerColors('api').border}
            shadow={alpha('#000', 0.12)}
            animation={`${floatUpDown} 3.9s ease-in-out infinite`}
            hovered={hoveredLayer === 'api'}
            onMouseEnter={() => setHoveredLayer('api')}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <Tooltip title="Backend APIs handling business logic and data processing" arrow placement="top">
              <Box sx={{ ...getInnerComponentStyle('api') }}>
                <Typography variant="body2" fontWeight="medium" sx={{ color: muiTheme.palette.text.primary }}>
                  RESTful APIs
                </Typography>
              </Box>
            </Tooltip>
          </LayerCard>
          {/* Services Layer */}
          <LayerCard
            icon={<Cloud fontSize="small" />}
            title="Cloud Services"
            subtitle="Infrastructure"
            color={getLayerColors('services').text}
            width="68%"
            background={isDarkMode ? 'rgba(22,38,53,0.6)' : 'rgba(230,242,252,0.6)'}
            borderColor={getLayerColors('services').border}
            shadow={alpha('#000', 0.12)}
            animation={`${floatUpDown} 4.1s ease-in-out infinite`}
            hovered={hoveredLayer === 'services'}
            onMouseEnter={() => setHoveredLayer('services')}
            onMouseLeave={() => setHoveredLayer(null)}
          >
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
                    ...getInnerComponentStyle('services'), 
                    flex: 1,
                  }}>
                    <Typography variant="caption" fontWeight="medium" sx={{ color: muiTheme.palette.text.secondary }}>
                      {service}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </LayerCard>
          {/* Storage Layer */}
          <LayerCard
            icon={<Storage fontSize="small" />}
            title="Data Storage"
            subtitle="Persistence Layer"
            color={getLayerColors('storage').text}
            width="60%"
            background={isDarkMode ? 'rgba(26,46,27,0.6)' : 'rgba(232,245,233,0.6)'}
            borderColor={getLayerColors('storage').border}
            shadow={alpha('#000', 0.12)}
            animation={`${floatUpDown} 4.3s ease-in-out infinite`}
            hovered={hoveredLayer === 'storage'}
            onMouseEnter={() => setHoveredLayer('storage')}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
            }}>
              {storageOptions.map((storage, index) => (
                <Tooltip key={index} title={storage.description} arrow placement="top">
                  <Box 
                    sx={{ 
                      ...getInnerComponentStyle('storage'),
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
          </LayerCard>
        </Box>
      </Box>
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