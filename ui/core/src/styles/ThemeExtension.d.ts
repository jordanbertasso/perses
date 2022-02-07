// Allows extending Lab types/components also
import type {} from '@mui/lab/themeAugmentation';

// Use Typescript interface augmentation to extend the theme type definition
declare module '@mui/material/styles' {
  interface Palette {
    // The color MUI uses internally for outlined input borders
    inputBorder: string;

    pageSection: {
      borderRadius: string;
      borderStyle: string;
      borderWidth: string;
      hoverColor: string;
    };
    // TODO: Remove this once we have a proper fix for "default" button color
    // from MUI v4
    defaultV4: {
      main: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    inputBorder?: Palette['inputBorder'];
    pageSection?: Partial<Palette['pageSection']>;
    defaultV4?: Palette['defaultV4'];
  }

  interface Theme {
    chart: {
      backgroundColor: string;
    };
  }

  interface ThemeOptions {
    chart?: {
      backgroundColor?: string;
    };
  }
}

// declare module '@mui/material/styles' {
//   interface Chart {
//     backgroundColor: string;
//   }

//   interface ChartOptions {
//     backgroundColor: '#FFFFFF';
//   }
// }

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    visibleScrollbar: CSSProperties;
  }

  interface MixinsOptions {
    visibleScrollbar?: Mixins['visibleScrollbar'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    defaultV4: true;
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    defaultV4: true;
  }
}
