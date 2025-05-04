import { createTheme, Theme } from '@mui/material/styles';

// Unified Anime Theme Colors
const animeColors = {
  // Naruto inspired colors
  energy: {
    main: '#FF6F00', // Brighter Naruto orange (outfit)
    light: '#FF9E40', // Lighter orange (Nine-Tails chakra)
    dark: '#E65100', // Darker orange (Kurama)
  },
  // Death Note inspired (death note red/black)
  shadow: {
    main: '#C62828', // Death Note red
    light: '#E53935',
    dark: '#B71C1C',
  },
  // Solo Leveling inspired (purple magic)
  power: {
    main: '#673AB7', // Solo Leveling purple/magic
    light: '#9575CD',
    dark: '#512DA8',
  },
  // Haikyuu inspired (team spirit)
  victory: {
    main: '#FFC107', // Haikyuu victory gold
    light: '#FFD54F',
    dark: '#FFA000',
  },
  // Utility colors - Updated with Naruto blue (Rasengan)
  accent: {
    main: '#1565C0', // Rasengan blue
    light: '#42A5F5',
    dark: '#0D47A1',
  },
  background: {
    dark: {
      default: '#121212', // Dark theme background
      paper: '#1E1E1E',
      card: '#2D2D2D',
    },
    light: {
      default: '#F5F5F5', // Light theme background
      paper: '#FFFFFF',
      card: '#FAFAFA',
    },
  },
};

// Create anime theme with light/dark mode
export const getAnimeTheme = (isDarkMode: boolean): Theme => {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: animeColors.energy.main,
        light: animeColors.energy.light,
        dark: animeColors.energy.dark,
        contrastText: '#000000',
      },
      secondary: {
        main: animeColors.power.main,
        light: animeColors.power.light,
        dark: animeColors.power.dark,
        contrastText: '#FFFFFF',
      },
      error: {
        main: animeColors.shadow.main,
        light: animeColors.shadow.light,
        dark: animeColors.shadow.dark,
      },
      warning: {
        main: animeColors.victory.main,
        light: animeColors.victory.light,
        dark: animeColors.victory.dark,
      },
      info: {
        main: animeColors.accent.main,
        light: animeColors.accent.light,
        dark: animeColors.accent.dark,
      },
      success: {
        main: '#43A047',
        light: '#66BB6A',
        dark: '#2E7D32',
      },
      background: {
        default: isDarkMode ? animeColors.background.dark.default : animeColors.background.light.default,
        paper: isDarkMode ? animeColors.background.dark.paper : animeColors.background.light.paper,
      },
      text: {
        primary: isDarkMode ? '#FFFFFF' : '#212121',
        secondary: isDarkMode ? '#B0B0B0' : '#757575',
      },
    },
    typography: {
      fontFamily: "'Poppins', 'Roboto', sans-serif",
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-0.005em',
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: isDarkMode 
              ? `linear-gradient(90deg, 
                  ${animeColors.energy.dark} 0%, 
                  ${animeColors.accent.dark} 100%)`
              : `linear-gradient(90deg, 
                  ${animeColors.energy.light} 0%, 
                  ${animeColors.accent.light} 100%)`,
            boxShadow: isDarkMode
              ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
              : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, 
                ${animeColors.energy.main}, 
                ${animeColors.shadow.main}, 
                ${animeColors.accent.main}, 
                ${animeColors.victory.main})`,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.1)',
              clipPath: 'circle(0% at center)',
              transition: 'clip-path 0.5s ease',
            },
            '&:hover::before': {
              clipPath: 'circle(100% at center)',
            },
          },
          containedPrimary: {
            background: isDarkMode
              ? `linear-gradient(135deg, ${animeColors.energy.main}, ${animeColors.energy.dark})`
              : `linear-gradient(135deg, ${animeColors.energy.light}, ${animeColors.energy.main})`,
            boxShadow: `0 4px 14px 0 ${isDarkMode 
              ? 'rgba(255, 111, 0, 0.4)'
              : 'rgba(255, 158, 64, 0.4)'}`,
            '&:hover': {
              background: isDarkMode
                ? `linear-gradient(135deg, ${animeColors.energy.dark}, ${animeColors.accent.dark})`
                : `linear-gradient(135deg, ${animeColors.energy.main}, ${animeColors.accent.main})`,
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 20px 0 ${isDarkMode 
                ? 'rgba(255, 111, 0, 0.5)'
                : 'rgba(255, 158, 64, 0.5)'}`,
            },
          },
          containedSecondary: {
            background: isDarkMode
              ? `linear-gradient(135deg, ${animeColors.accent.main}, ${animeColors.accent.dark})`
              : `linear-gradient(135deg, ${animeColors.accent.light}, ${animeColors.accent.main})`,
            boxShadow: `0 4px 14px 0 ${isDarkMode 
              ? 'rgba(21, 101, 192, 0.3)'
              : 'rgba(66, 165, 245, 0.3)'}`,
            '&:hover': {
              background: isDarkMode
                ? `linear-gradient(135deg, ${animeColors.accent.dark}, ${animeColors.power.dark})`
                : `linear-gradient(135deg, ${animeColors.accent.main}, ${animeColors.power.main})`,
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 20px 0 ${isDarkMode 
                ? 'rgba(21, 101, 192, 0.4)'
                : 'rgba(66, 165, 245, 0.4)'}`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'all 0.3s ease-in-out',
          },
          elevation1: {
            boxShadow: isDarkMode
              ? '0 2px 10px 0 rgba(0, 0, 0, 0.5)'
              : '0 2px 10px 0 rgba(0, 0, 0, 0.1)',
          },
          elevation2: {
            boxShadow: isDarkMode
              ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
              : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode 
              ? animeColors.background.dark.card
              : animeColors.background.light.card,
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, 
                ${animeColors.energy.main}, 
                ${animeColors.power.main})`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: isDarkMode
                ? '0 10px 30px 0 rgba(0, 0, 0, 0.6)'
                : '0 10px 30px 0 rgba(0, 0, 0, 0.15)',
              '&::before': {
                opacity: 1,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            '&.MuiChip-colorPrimary': {
              background: isDarkMode
                ? `linear-gradient(135deg, ${animeColors.energy.dark}, ${animeColors.energy.main})`
                : `linear-gradient(135deg, ${animeColors.energy.main}, ${animeColors.energy.light})`,
            },
            '&.MuiChip-colorSecondary': {
              background: isDarkMode
                ? `linear-gradient(135deg, ${animeColors.power.dark}, ${animeColors.power.main})`
                : `linear-gradient(135deg, ${animeColors.power.main}, ${animeColors.power.light})`,
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            boxShadow: isDarkMode
              ? '0 2px 10px 0 rgba(0, 0, 0, 0.4)'
              : '0 2px 10px 0 rgba(0, 0, 0, 0.1)',
          },
          colorDefault: {
            background: isDarkMode
              ? `linear-gradient(135deg, ${animeColors.energy.main}, ${animeColors.power.main})`
              : `linear-gradient(135deg, ${animeColors.energy.light}, ${animeColors.power.light})`,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            overflow: 'hidden',
            height: 6,
          },
          colorPrimary: {
            background: isDarkMode 
              ? 'rgba(255, 134, 20, 0.2)'
              : 'rgba(255, 166, 77, 0.2)',
          },
          barColorPrimary: {
            background: `linear-gradient(90deg, 
              ${animeColors.energy.main}, 
              ${animeColors.victory.main})`,
          },
          colorSecondary: {
            background: isDarkMode 
              ? 'rgba(103, 58, 183, 0.2)'
              : 'rgba(149, 117, 205, 0.2)',
          },
          barColorSecondary: {
            background: `linear-gradient(90deg, 
              ${animeColors.power.main}, 
              ${animeColors.accent.main})`,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            '&.MuiDivider-middle': {
              '&::before, &::after': {
                borderColor: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
              },
            },
          },
        },
      },
    },
  });
};

// Re-export as getNarutoTheme for backward compatibility
export const getNarutoTheme = getAnimeTheme; 