import { BespokeColors, BespokeGreys } from './bespoke-colors';
import { getTheme } from './common';

/**
 * Need to reinstantiate the theme everytime to support switching between light and dark themes
 * https://github.com/mui-org/material-ui/issues/18831
 */
export const getLightTheme = () => {
  return getTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          a: {
            color: BespokeColors.MEDIUM_BLUE,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedSecondary: {
            color: BespokeGreys.EBONY_CLAY,
            backgroundColor: BespokeGreys.SOLITUDE,
            borderBottomColor: BespokeGreys.EBONY_CLAY,
            '&:hover': {
              color: '#FFFFFF',
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: BespokeColors.MEDIUM_BLUE,
          },
        },
      },
    },
  });
};
