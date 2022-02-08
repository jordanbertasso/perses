// Copyright 2021 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { enableMapSet } from 'immer';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { getDarkTheme, getLightTheme } from '@perses-ui/core';
import App from './App';
import { SnackbarProvider } from './context/SnackbarProvider';
import { DarkModeContextProvider } from './context/DarkMode';

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });
// const isDarkModeEnabled = true;

function renderApp() {
  console.log('renderApp...');
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <DarkModeContextProvider>
          <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </DarkModeContextProvider>
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

enableMapSet();
renderApp();
