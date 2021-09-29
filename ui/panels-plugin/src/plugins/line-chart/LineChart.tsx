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
  AnyChartQueryDefinition,
  JsonObject,
  PanelProps,
} from '@perses-ui/core';
import { useEffect, useRef } from 'react';

import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

export const LineChartKind = 'LineChart' as const;

type LineChartKind = typeof LineChartKind;

export type LineChartProps = PanelProps<LineChartKind, LineChartOptions>;

interface LineChartOptions extends JsonObject {
  query: AnyChartQueryDefinition;
  show_legend?: boolean;
}

export function LineChart(props: LineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const uplotRef = useRef<uPlot | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      throw new Error('no current ref');
    }

    const opts = {
      title: 'My Chart',
      id: 'chart1',
      class: 'my-chart',
      width: 1450,
      height: 450,
      series: [], //getSeries(props.data),
    };

    const data: uPlot.AlignedData = [[], []]; //getData(props);

    uplotRef.current = new uPlot(opts, data, chartRef.current);

    return () => {
      uplotRef.current?.destroy();
    };
  });

  return (
    <div>
      fooab
      {/* {JSON.stringify(props)} */}
      <div ref={chartRef}></div>
    </div>
  );
}
