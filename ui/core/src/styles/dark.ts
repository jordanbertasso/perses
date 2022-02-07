import { alpha, ThemeOptions } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getTheme } from './common';
import { BespokeColors, BespokeGreys } from './bespoke-colors';

const chart: ThemeOptions['chart'] = {
  backgroundColor: '#6a0dad', // purple
};

export const getDarkTheme = () => {
  return getTheme({
    palette: {
      mode: 'dark',
      secondary: {
        main: BespokeGreys.COMET,
      },
      text: {
        primary: '#FFFFFF',
      },
      // Reverse greys from darkest to lightest for Dark mode
      grey: {
        100: grey[900],
        200: grey[800],
        300: grey[700],
        400: grey[600],
        500: grey[500],
        600: grey[400],
        700: grey[300],
        800: grey[200],
        900: grey[100],
      },
      background: {
        default: BespokeColors.BLACK_PEARL,
        paper: BespokeColors.BLACK_PEARL,
      },
      action: {
        disabledBackground: alpha(BespokeGreys.SANTAS_GRAY, 0.35),
        disabled: alpha(BespokeGreys.SANTAS_GRAY, 0.5),
        hover: alpha(BespokeGreys.SANTAS_GRAY, 0.2),
        selected: alpha(BespokeGreys.SANTAS_GRAY, 0.35),
      },

      // Custom Colors
      inputBorder: 'rgba(255, 255, 255, 0.23)',
      pageSection: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '8px',
        hoverColor: '#ffffff1a',
      },

      defaultV4: {
        main: grey[700],
        dark: grey[600],
      },
    },

    components: {
      MuiChip: {
        styleOverrides: {
          deleteIcon: {
            color: BespokeGreys.SANTAS_GRAY,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedSecondary: {
            color: BespokeGreys.SOLITUDE,
            backgroundColor: alpha(BespokeGreys.COMET, 0.5),
            borderBottomColor: BespokeGreys.SOLITUDE,
            '&:hover': {
              backgroundColor: BespokeGreys.SOLITUDE,
              color: '#000000',
            },
          },
          disabled: {
            color: alpha(BespokeGreys.SANTAS_GRAY, 0.5),
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            // In Dark mode, MUI v5 adds background image with opacity that
            // matches the elevation, so turn that off for dialogs
            backgroundImage: 'unset',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: BespokeGreys.EBONY_CLAY,
          },
        },
      },
    },

    chart: chart,
  });
};
