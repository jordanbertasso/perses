import React, { createContext, useContext, useMemo } from 'react';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { getDarkTheme, getLightTheme } from '@perses-ui/core';
import { useLocalStorage } from '../utils/browser-storage';
// import { gql, useQuery, useMutation, OperationContext, fetch, useLocalStorage } from '../utils';
// import {
//   SchemaTypenames,
//   DarkModeSettingQuery,
//   DarkModeSettingQueryContext,
//   SaveThemePreferenceMutation,
//   SaveThemePreferenceMutationVariables,
// } from '../generated/graphql';

// import { useIsAuthenticated } from './AuthenticationContext';

// const LOAD_DARK_MODE = gql`
//   query DarkModeSettingQuery {
//     userSettings {
//       darkMode
//     }
//   }
// `;

// const SAVE_THEME_PREFERENCE = gql`
//   mutation SaveThemePreferenceMutation($input: DarkModeInput!) {
//     setDarkMode(input: $input)
//   }
// `;

// // setDarkMode returns a boolean and we need to invalidate UserSettings
// const SAVE_THEME_PREFERENCE_CONTEXT: Partial<OperationContext> = {
//   additionalTypenames: [SchemaTypenames.UserSettings],
// };

// function updateGrafanaPreference(preference: boolean) {
//   const newThemePreference = preference ? 'dark' : 'light';
//   return fetch('/grafana/api/user/preferences', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       theme: newThemePreference,
//     }),
//   });
// }

// const DARK_MODE_PREFERENCE_KEY = 'CHRONOSPHERE_ENABLE_DARK_MODE';
const DARK_MODE_PREFERENCE_KEY = 'PERSES_ENABLE_DARK_MODE';

interface DarkModeContext {
  isDarkModeEnabled: boolean;
  setDarkMode: (pref: boolean) => Promise<void>;
}

export const DarkModeContext = createContext<DarkModeContext>({
  isDarkModeEnabled: false,
  setDarkMode: () => {
    throw new Error('Error: Dark mode not implemented');
  },
});

/**
 * Acts as theme provider for MUI and allows switching to dark mode.
 */
export function DarkModeContextProvider(props: { children: React.ReactNode }) {
  // const isAuthenticated = useIsAuthenticated();
  // const [{ data }] = useQuery<DarkModeSettingQuery, never>({
  //   query: LOAD_DARK_MODE,
  //   context: DarkModeSettingQueryContext,
  //   pause: !isAuthenticated,
  // });
  // const [, saveThemePreference] = useMutation<
  //   SaveThemePreferenceMutation,
  //   SaveThemePreferenceMutationVariables
  // >(SAVE_THEME_PREFERENCE);
  const browserPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [isDarkModeEnabled] = useLocalStorage<boolean>(DARK_MODE_PREFERENCE_KEY, browserPrefersDarkMode);

  /**
   * To ensure user doesn't see a flash of the wrong state, store the dark mode preference in local storage
   */
  // useEffect(() => {
  //   console.log('DarkMode -> localStorage - useEffect...');
  //   // if (data === undefined) {
  //   //   return;
  //   // }
  //   window.localStorage.setItem(DARK_MODE_PREFERENCE_KEY, data.userSettings.darkMode.toString());
  // }, []);
  // // }, [data]);

  const darkModeContext: DarkModeContext = useMemo(
    () => ({
      isDarkModeEnabled,
      setDarkMode: async (preference: boolean) => {
        console.log('setDarkMode -> preference: ', preference);
        // // Save on the server and sync to storage immediately if successful
        // await Promise.all([saveThemePreference({ input: { darkMode: preference } }, SAVE_THEME_PREFERENCE_CONTEXT)]);
        window.localStorage.setItem(DARK_MODE_PREFERENCE_KEY, preference.toString());
        location.reload();
      },
    }),
    [isDarkModeEnabled]
    // [isDarkModeEnabled, saveThemePreference]
  );

  return (
    <ThemeProvider theme={isDarkModeEnabled ? getDarkTheme() : getLightTheme()}>
      <CssBaseline />

      <DarkModeContext.Provider value={darkModeContext}>{props.children}</DarkModeContext.Provider>
    </ThemeProvider>
  );
}

export function useDarkMode(): DarkModeContext {
  const darkModeContext = useContext(DarkModeContext);
  console.log('useDarkMode -> darkModeContext: ', darkModeContext);
  return darkModeContext;
}
