import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import { createTheme, ThemeOptions, alpha, buttonClasses, toggleButtonClasses } from '@mui/material';
import { grey } from '@mui/material/colors';
import merge from 'lodash/merge';
import { BespokeGreys } from './bespoke-colors';

const BUTTON_BOTTOM_BORDER = 3;

// Latest colors from design

/**
 * Element ID used for the application root.
 */
export const ROOT_ID = 'root';

/**
 * Material UI theme used by all components. For more details, see:
 *   - defaults: https://material-ui.com/customization/default-theme/
 *   - variables: https://material-ui.com/customization/theming/#theme-configuration-variables
 *   - global overrides and default props: https://material-ui.com/customization/globals/#css
 */
export function getTheme(overrides: ThemeOptions = {}) {
  const palette: ThemeOptions['palette'] = {
    primary: {
      main: '#1ED998',
      dark: '#0D8359',
      light: '#D1F5D8',
    },

    secondary: {
      main: BespokeGreys.SANTAS_GRAY,
    },

    background: {
      default: '#f0f2f5',
      paper: '#FFFFFF',
    },

    common: {
      white: '#FFFFFF',
      black: '#000000',
    },

    text: {
      secondary: BespokeGreys.SANTAS_GRAY,
    },

    action: {
      disabledBackground: alpha(BespokeGreys.SANTAS_GRAY, 0.5),
      disabled: alpha(BespokeGreys.COMET, 0.6),
      hover: alpha(BespokeGreys.SANTAS_GRAY, 0.2),
      selected: alpha(BespokeGreys.SANTAS_GRAY, 0.35),
    },

    error: {
      main: '#F05C59',
    },

    warning: {
      main: '#D69A00',
    },

    // Custom Colors
    inputBorder: 'rgba(0, 0, 0, 0.23)',

    pageSection: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '8px',
      hoverColor: '#0000001A',
    },
    defaultV4: {
      main: grey[300],
      dark: grey[400],
    },
  };

  const theme = createTheme({
    palette: merge(palette, overrides.palette),

    typography: {
      fontFamily: '"Lato", sans-serif',

      // Font weights need to correspond with the imports at the top of the file
      // (Lato supports 100, 300, 400, 700, 900)
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 700,
      fontWeightBold: 900,

      button: {
        textTransform: 'none',
      },
    },

    mixins: {
      // TODO: Should this be customized based on dark/light theme?
      visibleScrollbar: {
        // this is to make the scroll bar always visible.
        // it will hide if there is no overflow.
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '8px',
          border: '2px solid #ffffff00',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        '&::-webkit-scrollbar:horizontal': {
          height: '11px',
        },
        '&::-webkit-scrollbar:vertical': {
          width: '8px',
        },
      },
    },
  });

  // Overrides for component default prop values and styles go here
  const components: ThemeOptions['components'] = {
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          alignItems: 'baseline',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        color: 'primary',
        size: 'small',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          lineHeight: '1.2rem',

          [`&.${buttonClasses.disabled}`]: {
            border: `1px solid ${alpha(BespokeGreys.SANTAS_GRAY, 0.35)}`,
          },
        },
        contained: {
          borderTop: `${BUTTON_BOTTOM_BORDER}px solid transparent`,
          borderBottom: `${BUTTON_BOTTOM_BORDER}px solid transparent`,
        },

        containedPrimary: {
          borderBottomColor: theme.palette.primary.dark,
          '&:hover': {
            color: theme.palette.common.white,
          },
        },
      },
      variants: [
        // Adds 'grey' color option which matches MUI v4 'default' styling
        {
          props: { variant: 'contained', color: 'defaultV4' },
          style: {
            color: theme.palette.getContrastText(theme.palette.defaultV4.main),
          },
        },
        {
          props: { variant: 'outlined', color: 'defaultV4' },
          style: {
            color: theme.palette.text.primary,
            borderColor: theme.palette.inputBorder,
            [`&.${buttonClasses.disabled}`]: {
              border: `1px solid ${theme.palette.action.disabledBackground}`,
            },
            '&:hover': {
              borderColor: theme.palette.inputBorder,
              backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
            },
          },
        },
        {
          props: { variant: 'text', color: 'defaultV4' },
          style: {
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
            },
          },
        },
      ],
    },
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        size: 'small',
      },
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Example global style rules added to the CSS baseline
        [`html, body, #${ROOT_ID}`]: {
          width: '100%',
          height: '100%',
        },
        a: {
          color: theme.palette.primary.main,
          textDecoration: 'none',
          cursor: 'pointer',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          background: theme.palette.grey[100],
          padding: theme.spacing(1, 2),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          background: theme.palette.grey[100],
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'primary',
        underline: 'none',
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          overflowWrap: 'break-word',
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        nextIconButtonProps: {
          size: 'small',
        },
        backIconButtonProps: {
          size: 'small',
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
        },
        toolbar: {
          // This is approximately the height of the other size=small header row
          minHeight: 36,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        hover: {
          cursor: 'pointer',
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        indicatorColor: 'primary',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        size: 'small',
        exclusive: true,
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          // For some reason the selected override doesn't work at the moment, so
          // target it this way instead
          [`&.${toggleButtonClasses.selected}, &.${toggleButtonClasses.selected}:not(:first-of-type)`]: {
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: theme.typography.caption.fontSize,
        },
      },
    },
  };

  theme.components = merge(components, overrides.components);
  return theme;
}
