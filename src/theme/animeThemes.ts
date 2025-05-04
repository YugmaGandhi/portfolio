import { createTheme, Theme } from '@mui/material/styles';

// Unified Anime Theme Colors
const animeColors = {
  energy: {
    main: '#2563eb',    // Professional blue
    light: '#60a5fa',   // Lighter blue
    dark: '#1d4ed8',    // Darker blue
  },
  power: {
    main: '#6366f1',    // Indigo
    light: '#818cf8',   // Lighter indigo
    dark: '#4f46e5',    // Darker indigo
  },
  accent: {
    main: '#0ea5e9',    // Sky blue
    light: '#38bdf8',   // Lighter sky blue
    dark: '#0284c7',    // Darker sky blue
  },
  victory: {
    main: '#14b8a6',    // Teal
    light: '#2dd4bf',   // Lighter teal
    dark: '#0d9488',    // Darker teal
  },
  shadow: {
    main: '#6b7280',    // Gray
    light: '#9ca3af',   // Lighter gray
    dark: '#4b5563',    // Darker gray
  },
  background: {
    dark: {
      default: '#111827',
      paper: '#1f2937',
      card: '#1f2937',
    },
    light: {
      default: '#f9fafb',
      paper: '#ffffff',
      card: '#ffffff',
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
              ? 'rgba(37, 99, 235, 0.4)'
              : 'rgba(96, 165, 250, 0.4)'}`,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 20px 0 ${isDarkMode 
                ? 'rgba(37, 99, 235, 0.5)'
                : 'rgba(96, 165, 250, 0.5)'}`,
            },
          },
          containedSecondary: {
            background: isDarkMode
              ? `linear-gradient(135deg, ${animeColors.accent.main}, ${animeColors.accent.dark})`
              : `linear-gradient(135deg, ${animeColors.accent.light}, ${animeColors.accent.main})`,
            boxShadow: `0 4px 14px 0 ${isDarkMode 
              ? 'rgba(14, 165, 233, 0.3)'
              : 'rgba(56, 189, 248, 0.3)'}`,
            '&:hover': {
              background: isDarkMode
                ? `linear-gradient(135deg, ${animeColors.accent.dark}, ${animeColors.power.dark})`
                : `linear-gradient(135deg, ${animeColors.accent.main}, ${animeColors.power.main})`,
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 20px 0 ${isDarkMode 
                ? 'rgba(14, 165, 233, 0.4)'
                : 'rgba(56, 189, 248, 0.4)'}`,
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
                ? '0 10px 30px 0 rgba(0, 0, 0, 0.3)'
                : '0 10px 30px 0 rgba(0, 0, 0, 0.1)',
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
              ? 'rgba(37, 99, 235, 0.2)'
              : 'rgba(96, 165, 250, 0.2)',
          },
          barColorPrimary: {
            background: `linear-gradient(90deg, 
              ${animeColors.energy.main}, 
              ${animeColors.power.main})`,
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