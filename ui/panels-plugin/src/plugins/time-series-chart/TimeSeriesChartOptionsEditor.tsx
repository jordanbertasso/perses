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

import { produce } from 'immer';
import {
  Grid,
  Stack,
  Box,
  Typography,
  Switch,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
} from '@mui/material';
import { TimeSeriesQueryDefinition } from '@perses-dev/core';
import { OptionsEditorProps, TimeSeriesQueryEditor } from '@perses-dev/plugin-system';
import { TimeSeriesChartOptions } from './time-series-chart-model';

export type TimeSeriesChartOptionsEditorProps = OptionsEditorProps<TimeSeriesChartOptions>;

// TODO: reorg supported options
const legendPositionValues = ['bottom', 'right'] as const;

type LegendPositionOptions = {
  position: typeof legendPositionValues[number];
};

export function TimeSeriesChartOptionsEditor(props: TimeSeriesChartOptionsEditorProps) {
  const { onChange, value } = props;
  const { queries } = value;

  const handleQueryChange = (index: number, queryDef: TimeSeriesQueryDefinition) => {
    onChange(
      produce(value, (draft: TimeSeriesChartOptions) => {
        draft.queries[index] = queryDef;
      })
    );
  };

  function updateLegendShow(show: boolean) {
    onChange(
      produce(value, (draft: TimeSeriesChartOptions) => {
        draft.legend.show = show;
      })
    );
  }

  function updateLegendPosition(position: LegendPositionOptions['position']) {
    onChange(
      produce(value, (draft: TimeSeriesChartOptions) => {
        draft.legend.position = position;
      })
    );
  }

  return (
    <Stack spacing={1}>
      {/* TODO: Deal with user deleting all queries */}
      {queries.map((query, i) => (
        <Box key={i}>
          <Typography variant="overline" component="h3">
            Query {i + 1}
          </Typography>
          <TimeSeriesQueryEditor value={query} onChange={(next) => handleQueryChange(i, next)} />
        </Box>
      ))}
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12}>
          <Typography variant="overline" component="h3">
            Legend
          </Typography>
          <FormControlLabel
            label="Show"
            control={
              <Switch
                checked={value.legend.show}
                onChange={(e) => {
                  updateLegendShow(e.target.checked);
                }}
              />
            }
          />
        </Grid>
        <Grid>
          <FormControl fullWidth>
            <InputLabel id="legend-position-select-label">Position</InputLabel>
            <Select
              labelId="legend-position-select-label"
              id="legend-position-select"
              label="Position"
              value={value.legend.position}
              onChange={(e) => {
                updateLegendPosition(e.target.value as LegendPositionOptions['position']);
              }}
            >
              {legendPositionValues.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
}
