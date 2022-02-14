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

import {
  AnyGraphQueryDefinition,
  GraphData,
  useGraphQuery,
  JsonObject,
  PanelProps,
  usePanelState,
} from '@perses-ui/core';
import { Box, Skeleton } from '@mui/material';
import { mapKeys, camelCase, rearg } from 'lodash-es';
// import { LineSeriesOption } from 'echarts/charts';
import { useMemo } from 'react';
import { CalculationsMap, CalculationType } from '../../model/calculations';
import { UnitOptions } from '../../model/units';
import { ThresholdOptions, defaultThresholdInput } from '../../model/thresholds';
import { StatChartData, StatChart } from '../../components/stat-chart/StatChart';

export const StatChartKind = 'StatChart' as const;

export type StatChartPanelProps = PanelProps<StatChartOptions>;

interface StatChartOptions extends JsonObject {
  name: string;
  query: AnyGraphQueryDefinition;
  calculation: CalculationType;
  unit: UnitOptions;
  thresholds?: ThresholdOptions;
  sparkline?: {
    show: boolean;
    line_color?: string;
    line_width?: number;
    area_color?: string;
  };
}

export function StatChartPanel(props: StatChartPanelProps) {
  const {
    definition: {
      display: { name },
      options: { query, calculation, unit, sparkline },
    },
  } = props;

  // TODO (sjcobb): how to handle thresholds? is convertThresholds needed?
  // - probably not for StatChart but GaugeChart needs to move convertThresholds to GaugeChartPanel

  // const showSparkline = sparkline && sparkline.show === true ? true : false;
  const thresholds = props.definition.options.thresholds ?? defaultThresholdInput;
  const { contentDimensions } = usePanelState();
  const { data, loading, error } = useGraphQuery(query);
  const chartData = useChartData(data, calculation, name);

  if (error) throw error;

  if (contentDimensions === undefined) return null;

  if (loading === true) {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        width={contentDimensions.width}
        height={contentDimensions.height}
      >
        <Skeleton variant="text" width={contentDimensions.width - 20} height={contentDimensions.height / 2} />
      </Box>
    );
  }

  // TODO (sjcobb): perses sparkline snake_case -> StatChart camelCase ECharts LineSeriesOption conversion
  // https://stackoverflow.com/questions/40710628/how-to-convert-snake-case-to-camelcase-in-my-app/40710684#40710684
  console.log('(perses format) sparkline: ', sparkline);
  const sparklineOption = mapKeys(sparkline, rearg(camelCase, 1));
  console.log('(converted) sparklineOption: ', sparklineOption);

  // // https://echarts.apache.org/en/option.html#series-line
  // const mockSparklineOption: LineSeriesOption = {
  //   name: 'line series 1',
  //   lineStyle: {
  //     color: '#000',
  //     width: 2,
  //   },
  //   areaStyle: {
  //     color: '#FF0000', // red
  //     opacity: 0.5,
  //   },
  // };

  return (
    <StatChart
      width={contentDimensions.width}
      height={contentDimensions.height}
      data={chartData}
      unit={unit}
      thresholds={thresholds}
      sparkline={sparklineOption}
    />
  );
}

const useChartData = (data: GraphData | undefined, calculation: CalculationType, name: string): StatChartData => {
  return useMemo(() => {
    const loadingData = {
      calculatedValue: undefined,
      seriesData: undefined,
    };
    if (data === undefined) return loadingData;

    const seriesData = Array.from(data.series)[0] ?? null;
    const calculate = CalculationsMap[calculation];
    const calculatedValue = seriesData !== null ? calculate(Array.from(seriesData.values)) : null;

    return {
      calculatedValue,
      seriesData,
      name,
    };
  }, [data, calculation, name]);
};
