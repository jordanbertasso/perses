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

import { ChangeEvent, useState } from 'react';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
// import { TimeSeriesQueryDefinition } from '@perses-dev/core';
import { Stack, Box, TextField, Switch } from '@mui/material';
import { TimeSeriesChartOptions } from './time-series-chart-model';
import { TimeSeriesChartPanel, TimeSeriesChartProps } from './TimeSeriesChartPanel';

export type TimeSeriesChartOptionsEditorProps = OptionsEditorProps<TimeSeriesChartOptions>;

export function TimeSeriesChartOptionsEditor(props: TimeSeriesChartOptionsEditorProps) {
  const { onChange, value } = props;

  const [showLegend, setShowLegend] = useState(true);

  const panelPreviewProps: TimeSeriesChartProps = {
    definition: {
      kind: 'Panel',
      spec: {
        display: { name: 'Single Query' },
        plugin: {
          kind: 'TimeSeriesChart',
          spec: {
            queries: [
              {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'PrometheusTimeSeriesQuery',
                    spec: {
                      query: 'node_load15{instance="demo.do.prometheus.io:9100",job="node"}',
                      // query: 'node_load15{instance="$instance",job="node"}',
                    },
                  },
                },
              },
            ],
            unit: { kind: 'Percent' },
            show_legend: showLegend,
          },
        },
      },
    },
    contentDimensions: { width: 500, height: 250 },
  };
  const [currentOptions, setCurrentOptions] = useState(panelPreviewProps.definition.spec.plugin.spec);

  const staticQuery = 'node_load15{instance="demo.do.prometheus.io:9100",job="node"}';

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleQueryChange -> e.target.value: ', e.target.value);
    // onChange({ text: e.target.value });
  };

  const handleLegendChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowLegend(e.target.checked);
    setCurrentOptions(currentOptions);
    onChange(currentOptions);
  };

  return (
    <>
      <TimeSeriesChartPanel {...panelPreviewProps} />
      <Stack spacing={1}>
        <Box>{JSON.stringify(value)}</Box>
        <TextField label="Query" value={staticQuery} onChange={handleQueryChange} />
        <Switch checked={showLegend} onChange={handleLegendChange} inputProps={{ 'aria-label': 'controlled' }} />
      </Stack>
    </>
  );
}
