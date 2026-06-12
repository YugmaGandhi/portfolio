import { createTheme, Theme } from '@mui/material/styles';
import { colors, fonts } from './tokens';

const FONT_PIXEL = fonts.pixel;
const FONT_MONO = fonts.mono;

// Map design tokens onto the arcade palette roles
const animeColors = {
  energy: {
    main: colors.cyan,
    light: colors.cyanLight,
    dark: colors.cyanDark,
  },
  power: {
    main: colors.pink,
    light: colors.pinkLight,
    dark: colors.pinkDark,
  },
  accent: {
    main: colors.yellow,
    light: colors.yellowLight,
    dark: colors.yellowDark,
  },
  victory: {
    main: colors.green,
    light: colors.greenLight,
    dark: colors.greenDark,
  },
  background: {
    default: colors.bg,
    paper: colors.surface,
    card: colors.card,
  },
};

const pixelHeading = (fontSize: string) => ({
  fontFamily: FONT_PIXEL,
  fontWeight: 400, // Press Start 2P has a single weight
  fontSize,
  lineHeight: 1.35,
  letterSpacing: 0,
});

// The portfolio ships dark-only: the arcade design language (hard shadows,
// scanlines, neon palette) has no light counterpart.
export const getAnimeTheme = (): Theme => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: animeColors.energy.main,
        light: animeColors.energy.light,
        dark: animeColors.energy.dark,
        contrastText: '#020617',
      },
      secondary: {
        main: animeColors.power.main,
        light: animeColors.power.light,
        dark: animeColors.power.dark,
        contrastText: '#020617',
      },
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#b91c1c',
      },
      warning: {
        main: animeColors.accent.main,
        light: animeColors.accent.light,
        dark: animeColors.accent.dark,
      },
      info: {
        main: animeColors.energy.main,
        light: animeColors.energy.light,
        dark: animeColors.energy.dark,
      },
      success: {
        main: animeColors.victory.main,
        light: animeColors.victory.light,
        dark: animeColors.victory.dark,
      },
      background: {
        default: animeColors.background.default,
        paper: animeColors.background.paper,
      },
      text: {
        primary: '#f8fafc',
        secondary: '#9fb3c8',
      },
    },
    typography: {
      fontFamily: FONT_MONO,
      h1: pixelHeading('2rem'),
      h2: pixelHeading('1.6rem'),
      h3: pixelHeading('1.15rem'),
      h4: pixelHeading('0.9rem'),
      h5: {
        fontWeight: 700,
        letterSpacing: 0,
      },
      h6: {
        fontWeight: 700,
        letterSpacing: 0,
      },
      button: {
        fontFamily: FONT_PIXEL,
        fontWeight: 400,
        fontSize: '0.65rem',
        lineHeight: 1.8,
        textTransform: 'uppercase' as const,
      },
    },
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              display: 'none',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            letterSpacing: 0,
            transition: 'all 0.15s ease',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid currentColor',
            boxShadow: '4px 4px 0 #020617',
            '&::before': {
              display: 'none',
            },
            '&:hover': {
              transform: 'translate(2px, 2px)',
              boxShadow: '2px 2px 0 #020617',
            },
          },
          containedPrimary: {
            background: animeColors.energy.main,
            color: '#020617',
            '&:hover': {
              background: animeColors.accent.main,
              color: '#020617',
            },
          },
          containedSecondary: {
            background: animeColors.accent.main,
            color: '#020617',
            '&:hover': {
              background: animeColors.energy.main,
              color: '#020617',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'all 0.18s ease-in-out',
          },
          elevation1: {
            boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.5)',
          },
          elevation2: {
            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: animeColors.background.card,
            borderRadius: 0,
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.3s ease',
            '&::before': {
              display: 'none',
            },
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px 0 rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            fontWeight: 700,
            '&.MuiChip-colorPrimary': {
              background: animeColors.energy.main,
            },
            '&.MuiChip-colorSecondary': {
              background: animeColors.power.main,
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.4)',
          },
          colorDefault: {
            background: animeColors.energy.main,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            overflow: 'hidden',
            height: 6,
          },
          colorPrimary: {
            background: 'rgba(0, 229, 255, 0.15)',
          },
          barColorPrimary: {
            background: animeColors.energy.main,
          },
          colorSecondary: {
            background: 'rgba(255, 79, 216, 0.15)',
          },
          barColorSecondary: {
            background: animeColors.power.main,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            '&.MuiDivider-middle': {
              '&::before, &::after': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
            },
          },
        },
      },
    },
  });
};
