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

// import { Box, Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { JsonObject } from '@perses-ui/core';

interface ChartDetails extends JsonObject {
  width: number;
  height: number;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  chartOptions: any;
  showQuery?: boolean;
}

export function ChartDetails(props: ChartDetails) {
  const { height, chartOptions } = props;
  // TODO (sjcobb): filter out query object when showQuery false and hide debug boolean
  return (
    <Box
      sx={{
        height: height,
        overflowY: 'scroll',
        padding: '4px 5px',
        backgroundColor: '#333',
        color: '#FFF',
        fontSize: '10px',
      }}
    >
      <pre style={{ margin: '0', whiteSpace: 'break-spaces' }}>{JSON.stringify(chartOptions, null, 2)}</pre>
    </Box>
  );
}
