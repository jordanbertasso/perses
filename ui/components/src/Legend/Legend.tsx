// Copyright 2022 The Perses Authors
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

import { Box } from '@mui/material';
import { LegendItem } from '../model';
import { ListLegend } from './ListLegend';

interface LegendProps {
  data: LegendItem[];
}

export function Legend({ data }: LegendProps) {
  return (
    <Box
      sx={{ height: 50, overflowY: 'scroll' }}
      // width={contentDimensions.width}
      // height={contentDimensions.height}
    >
      <ListLegend items={data} />
    </Box>
  );
}
