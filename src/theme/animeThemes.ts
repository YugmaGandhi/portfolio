import { createTheme, Theme } from '@mui/material/styles';

// Unified Anime Theme Colors - Creative & Playful
const animeColors = {
  energy: {
    main: '#ff6b35',    // Vibrant orange
    light: '#ff8c5a',   // Lighter orange
    dark: '#e55100',    // Darker orange
  },
  power: {
    main: '#f7931e',    // Bright yellow-orange
    light: '#fbb040',   // Lighter golden
    dark: '#e68a0c',    // Darker golden
  },
  accent: {
    main: '#fdb833',    // Sunny yellow
    light: '#fdc966',   // Lighter yellow
    dark: '#f0a000',    // Darker yellow
  },
  victory: {
    main: '#10b981',    // Fresh emerald
    light: '#34d399',   // Lighter emerald
    dark: '#059669',    // Darker emerald
  },
  shadow: {
    main: '#64748b',    // Slate gray
    light: '#94a3b8',   // Lighter slate
    dark: '#475569',    // Darker slate
  },
  background: {
    dark: {
      default: '#0f172a',
      paper: '#1e293b',
      card: '#1e293b',
    },
    light: {
      default: '#f8fafc',
      paper: '#ffffff',
      card: '#f1f5f9',
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
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative',
            overflow: 'hidden',
            letterSpacing: '0.3px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.15)',
              clipPath: 'circle(0% at center)',
              transition: 'clip-path 0.6s ease',
            },
            '&:hover::before': {
              clipPath: 'circle(100% at center)',
            },
          },
          containedPrimary: {
            background: isDarkMode
              ? `linear-gradient(135deg, ${animeColors.energy.main}, ${animeColors.power.main})`
              : `linear-gradient(135deg, ${animeColors.energy.main}, ${animeColors.power.light})`,
            boxShadow: `0 4px 20px 0 ${isDarkMode 
              ? 'rgba(255, 107, 53, 0.4)'
              : 'rgba(255, 107, 53, 0.3)'}`,
            color: '#ffffff',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: `0 8px 30px 0 ${isDarkMode 
                ? 'rgba(255, 107, 53, 0.6)'
                : 'rgba(255, 107, 53, 0.5)'}`,
            },
          },
          containedSecondary: {
            background: isDarkMode
              ? `linear-gradient(135deg, ${animeColors.victory.main}, ${animeColors.victory.dark})`
              : `linear-gradient(135deg, ${animeColors.victory.main}, ${animeColors.victory.light})`,
            boxShadow: `0 4px 20px 0 ${isDarkMode 
              ? 'rgba(16, 185, 129, 0.3)'
              : 'rgba(16, 185, 129, 0.25)'}`,
            color: '#ffffff',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: `0 8px 30px 0 ${isDarkMode 
                ? 'rgba(16, 185, 129, 0.5)'
                : 'rgba(16, 185, 129, 0.4)'}`,
            },
          },
          outlinedPrimary: {
            borderColor: animeColors.energy.main,
            color: animeColors.energy.main,
            borderWidth: 2,
            '&:hover': {
              backgroundColor: isDarkMode
                ? 'rgba(255, 107, 53, 0.1)'
                : 'rgba(255, 107, 53, 0.08)',
              borderColor: animeColors.energy.main,
              transform: 'translateY(-2px)',
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
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: isDarkMode
              ? '1px solid rgba(255, 107, 53, 0.1)'
              : '1px solid rgba(255, 107, 53, 0.08)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, 
                ${animeColors.energy.main}, 
                ${animeColors.power.main})`,
              opacity: 0,
              transition: 'opacity 0.4s ease',
            },
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: isDarkMode
                ? '0 20px 40px 0 rgba(0, 0, 0, 0.4)'
                : '0 20px 40px 0 rgba(0, 0, 0, 0.12)',
              borderColor: isDarkMode
                ? 'rgba(255, 107, 53, 0.2)'
                : 'rgba(255, 107, 53, 0.15)',
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
