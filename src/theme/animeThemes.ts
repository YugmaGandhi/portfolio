import { createTheme, Theme } from '@mui/material/styles';

// Neumorphism Theme Colors - Soft, Minimal, Elegant
const animeColors = {
  energy: {
    main: '#e0e5ec',    // Soft light gray - primary
    light: '#f0f3f7',   // Very light gray
    dark: '#c5cce0',    // Slightly darker gray
  },
  power: {
    main: '#e0e5ec',    // Same soft gray for cohesion
    light: '#f0f3f7',   // Light variant
    dark: '#c5cce0',    // Dark variant
  },
  accent: {
    main: '#8b9aaf',    // Muted blue accent
    light: '#b8c5d6',   // Light muted blue
    dark: '#5a6b7f',    // Dark muted blue
  },
  victory: {
    main: '#8b9aaf',    // Same muted tone
    light: '#b8c5d6',   // Light variant
    dark: '#5a6b7f',    // Dark variant
  },
  shadow: {
    main: '#0000000d',  // Subtle soft shadow
    light: '#00000005', // Very light shadow
    dark: '#00000019',  // Deeper shadow
  },
  background: {
    dark: {
      default: '#e0e5ec',
      paper: '#e8eef7',
      card: '#e8eef7',
    },
    light: {
      default: '#e0e5ec',
      paper: '#e8eef7',
      card: '#e8eef7',
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
            backgroundColor: '#e0e5ec',
            boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.08), -8px -8px 16px rgba(255, 255, 255, 0.8)',
            position: 'relative',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            textTransform: 'none',
            fontWeight: 600,
            transition: 'all 0.4s ease',
            border: 'none',
            padding: '12px 32px',
            fontSize: '1rem',
            letterSpacing: '0.5px',
            position: 'relative',
          },
          containedPrimary: {
            backgroundColor: '#e0e5ec',
            color: '#5a6b7f',
            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.08), -6px -6px 12px rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: '#e0e5ec',
              boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.06), -3px -3px 8px rgba(255, 255, 255, 0.7)',
              transform: 'scale(1.02)',
            },
            '&:active': {
              boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.06), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
            },
          },
          outlined: {
            backgroundColor: '#e0e5ec',
            borderColor: '#c5cce0',
            color: '#5a6b7f',
            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.08), -6px -6px 12px rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(139, 154, 175, 0.2)',
            '&:hover': {
              backgroundColor: '#e0e5ec',
              boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.06), -3px -3px 8px rgba(255, 255, 255, 0.7)',
              borderColor: '#8b9aaf',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#e8eef7',
            backgroundImage: 'none',
            transition: 'all 0.4s ease',
            boxShadow: 'none',
          },
          elevation0: {
            boxShadow: 'none',
          },
          elevation1: {
            boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.08), -8px -8px 16px rgba(255, 255, 255, 0.8)',
          },
          elevation2: {
            boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1), -10px -10px 20px rgba(255, 255, 255, 0.8)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#e8eef7',
            borderRadius: 20,
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            border: 'none',
            boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.08), -8px -8px 16px rgba(255, 255, 255, 0.8)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.12), -12px -12px 24px rgba(255, 255, 255, 0.8)',
            },
            '&:active': {
              boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.08), inset -4px -4px 8px rgba(255, 255, 255, 0.7)',
              transform: 'translateY(-2px)',
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
